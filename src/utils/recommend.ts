import { ALWAYS_AVAILABLE } from '../data/foods';
import type {
  CookingMethod,
  EquipmentId,
  FoodItem,
  MealType,
  Recipe,
  RecipeMatch,
  RecommendMode,
  RecommendResult,
  TimeOption,
} from '../types';
import { getFoodName, countLikedOverlap, recipeUsesAvoidedFood } from './helpers';

function isCondiment(foodId: string): boolean {
  return ALWAYS_AVAILABLE.has(foodId);
}

/** Solo IDs marcados como disponibles (+ condimentos básicos). Sin inferencia por texto. */
export function isFoodAvailable(
  foodId: string,
  availableFoodIds: string[],
): boolean {
  return isCondiment(foodId) || availableFoodIds.includes(foodId);
}

export function pickCookingMethod(
  recipe: Recipe,
  equipmentIds: EquipmentId[],
): { method: CookingMethod | null; missingEquipment: EquipmentId[] } {
  const owned = new Set(equipmentIds);
  const methods = recipe.methods?.length
    ? recipe.methods
    : [
        {
          id: 'default',
          label: 'Método habitual',
          equipmentIds: [] as EquipmentId[],
          steps: recipe.steps,
        },
      ];

  for (const method of methods) {
    const missing = method.equipmentIds.filter((id) => !owned.has(id));
    if (missing.length === 0) {
      return { method, missingEquipment: [] };
    }
  }

  // Ningún método compatible: reportar el del primer método
  const first = methods[0];
  return {
    method: null,
    missingEquipment: first.equipmentIds.filter((id) => !owned.has(id)),
  };
}

export function buildMatch(
  recipe: Recipe,
  availableFoodIds: string[],
  customFoods: FoodItem[],
  equipmentIds: EquipmentId[],
): RecipeMatch {
  const required = recipe.ingredients.filter((i) => !i.optional);
  const available: string[] = [];
  const missing: string[] = [];
  let mainAvailableCount = 0;

  for (const ing of required) {
    const name = getFoodName(ing.foodId, customFoods);
    if (isFoodAvailable(ing.foodId, availableFoodIds)) {
      available.push(name);
      if (!isCondiment(ing.foodId)) mainAvailableCount += 1;
    } else {
      missing.push(name);
    }
  }

  for (const ing of recipe.ingredients.filter((i) => i.optional)) {
    if (isFoodAvailable(ing.foodId, availableFoodIds)) {
      available.push(getFoodName(ing.foodId, customFoods));
    }
  }

  const { method, missingEquipment } = pickCookingMethod(recipe, equipmentIds);

  return {
    recipe,
    available,
    missing,
    hasAll: missing.length === 0,
    mainAvailableCount,
    selectedMethod: method,
    missingEquipment,
    equipmentOk: missingEquipment.length === 0 && method !== null,
  };
}

function sortMatches(
  a: RecipeMatch,
  b: RecipeMatch,
  likedFoodIds: string[] = [],
): number {
  const likedSet = new Set(likedFoodIds);
  const likedA =
    a.likedOverlap ??
    a.recipe.ingredients.filter((i) => !i.optional && likedSet.has(i.foodId))
      .length;
  const likedB =
    b.likedOverlap ??
    b.recipe.ingredients.filter((i) => !i.optional && likedSet.has(i.foodId))
      .length;

  if (a.missing.length !== b.missing.length) {
    return a.missing.length - b.missing.length;
  }
  if (likedB !== likedA) return likedB - likedA;
  if (b.mainAvailableCount !== a.mainAvailableCount) {
    return b.mainAvailableCount - a.mainAvailableCount;
  }
  return a.recipe.timeMinutes - b.recipe.timeMinutes;
}

/**
 * Motor de recomendaciones.
 * - strict ("Cocinar con lo que tengo"): exige relación real con lo disponible.
 * - flexible ("Planificar"): prioriza completas, luego 1, luego pocas faltas.
 * Preferencias: "liked" prioriza; "avoided" excluye de recomendaciones automáticas.
 * Nunca usa liked como disponibilidad.
 */
export function recommendRecipes(options: {
  recipes: Recipe[];
  availableFoodIds: string[];
  customFoods: FoodItem[];
  equipmentIds: EquipmentId[];
  maxMinutes: TimeOption;
  mealType?: MealType | null;
  mode: RecommendMode;
  likedFoodIds?: string[];
  avoidedFoodIds?: string[];
  preferenceLabels?: Record<string, string>;
}): RecommendResult {
  const {
    recipes,
    availableFoodIds,
    customFoods,
    equipmentIds,
    maxMinutes,
    mealType,
    mode,
    likedFoodIds = [],
    avoidedFoodIds = [],
    preferenceLabels = {},
  } = options;

  const candidates: RecipeMatch[] = [];

  for (const recipe of recipes) {
    if (recipe.timeMinutes > maxMinutes) continue;
    if (mealType && !recipe.mealTypes.includes(mealType)) continue;

    // Prefiero evitar (por id o nombre libre) — distinto de "ingrediente que falta"
    if (
      recipeUsesAvoidedFood(
        recipe,
        avoidedFoodIds,
        preferenceLabels,
        customFoods,
      )
    ) {
      continue;
    }

    const match = buildMatch(
      recipe,
      availableFoodIds,
      customFoods,
      equipmentIds,
    );

    // Equipamiento = restricción dura (no se muestra como "te falta")
    if (!match.equipmentOk) continue;

    match.likedOverlap = countLikedOverlap(
      recipe,
      likedFoodIds,
      preferenceLabels,
      customFoods,
    );

    // Sin ningún ingrediente principal disponible → no recomendar
    if (match.mainAvailableCount === 0) continue;

    candidates.push(match);
  }

  candidates.sort((a, b) => sortMatches(a, b, likedFoodIds));

  const ready = candidates.filter((m) => m.hasAll);

  const needOne = candidates.filter(
    (m) => m.missing.length === 1 && m.mainAvailableCount >= 1,
  );

  const needTwo = candidates.filter(
    (m) => m.missing.length === 2 && m.mainAvailableCount >= 1,
  );

  if (mode === 'strict') {
    return {
      ready: ready.slice(0, 8),
      needOne: ready.length >= 3 ? [] : needOne.slice(0, 5),
      needTwo:
        ready.length + needOne.length >= 3 ? [] : needTwo.slice(0, 3),
    };
  }

  const flexReady = ready.slice(0, 5);
  const flexOne = needOne
    .filter((m) => !flexReady.some((r) => r.recipe.id === m.recipe.id))
    .slice(0, flexReady.length >= 3 ? 3 : 5);
  const flexTwo =
    flexReady.length + flexOne.length >= 4
      ? []
      : needTwo
          .filter(
            (m) =>
              !flexReady.some((r) => r.recipe.id === m.recipe.id) &&
              !flexOne.some((r) => r.recipe.id === m.recipe.id),
          )
          .slice(0, 3);

  return {
    ready: flexReady,
    needOne: flexOne,
    needTwo: flexTwo,
  };
}

export function resolveRecipeSteps(
  recipe: Recipe,
  equipmentIds: EquipmentId[],
): { steps: string[]; methodLabel: string | null; missingEquipment: EquipmentId[] } {
  const { method, missingEquipment } = pickCookingMethod(recipe, equipmentIds);
  if (method) {
    return {
      steps: method.steps.length ? method.steps : recipe.steps,
      methodLabel: method.id === 'default' ? null : method.label,
      missingEquipment: [],
    };
  }
  return {
    steps: recipe.steps,
    methodLabel: null,
    missingEquipment,
  };
}
