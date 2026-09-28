import type {
  AppState,
  Difficulty,
  DishRole,
  EquipmentId,
  Recipe,
  RecipeMatch,
} from '../types';
import { equipmentLabel } from '../data/equipment';
import {
  countLikedOverlap,
  getFoodName,
  isFreePreferenceKey,
  normalizeSearch,
  preferenceDisplayName,
  recipeUsesAvoidedFood,
} from './helpers';
import { buildMatch } from './recommend';

export type ChefBrowseDifficulty = 'all' | Difficulty;
export type ChefBrowseRole = 'all' | DishRole;

export interface ChefSearchMatch extends RecipeMatch {
  /** Alimentos de «Prefiero evitar» presentes en la receta (nombres). */
  avoidedFoods: string[];
  searchScore: number;
  nameHit: boolean;
  ingredientHit: boolean;
  methodHit: boolean;
  tagHit: boolean;
}

export interface ChefSearchFilters {
  difficulty?: ChefBrowseDifficulty;
  dishRole?: ChefBrowseRole;
}

/** Sinónimos / aliases de equipamiento para búsqueda. */
const EQUIPMENT_ALIASES: Array<{ id: EquipmentId; aliases: string[] }> = [
  { id: 'airfryer', aliases: ['air fryer', 'airfryer', 'freidora de aire', 'air-fryer'] },
  { id: 'horno', aliases: ['horno', 'oven'] },
  { id: 'sarten', aliases: ['sarten', 'sartén'] },
  { id: 'plancha', aliases: ['plancha'] },
  { id: 'microondas', aliases: ['microondas', 'micro'] },
  { id: 'olla', aliases: ['olla'] },
  { id: 'tostadora', aliases: ['tostadora', 'toaster'] },
  { id: 'freidora', aliases: ['freidora', 'freidora de aceite'] },
  { id: 'vitro', aliases: ['vitro', 'vitroceramica', 'fogones', 'induccion'] },
  { id: 'batidora', aliases: ['batidora'] },
];

export function tokenizeQuery(query: string): string[] {
  return normalizeSearch(query)
    .split(/[\s,;/]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

/**
 * Si la consulta apunta a un aparato (p. ej. "air fryer"),
 * devuelve ese EquipmentId para filtrar/priorizar.
 */
export function detectEquipmentInQuery(query: string): EquipmentId | null {
  const norm = normalizeSearch(query);
  if (!norm) return null;

  const sorted = [...EQUIPMENT_ALIASES].sort(
    (a, b) =>
      Math.max(...b.aliases.map((x) => normalizeSearch(x).length)) -
      Math.max(...a.aliases.map((x) => normalizeSearch(x).length)),
  );

  for (const entry of sorted) {
    for (const alias of entry.aliases) {
      const a = normalizeSearch(alias);
      if (!a) continue;
      if (norm === a || norm.includes(a)) return entry.id;
    }
  }

  return null;
}

/** Nombres de ingredientes evitados que aparecen en la receta. */
export function getAvoidedFoodsInRecipe(
  recipe: Recipe,
  avoidedKeys: string[],
  labels: Record<string, string>,
  customFoods: AppState['customFoods'],
): string[] {
  if (!avoidedKeys.length) return [];
  const avoided = new Set(avoidedKeys);
  const found: string[] = [];
  const seen = new Set<string>();

  for (const ing of recipe.ingredients.filter((i) => !i.optional)) {
    let hit = false;
    let display = getFoodName(ing.foodId, customFoods);

    if (avoided.has(ing.foodId)) {
      hit = true;
      display = preferenceDisplayName(ing.foodId, labels, customFoods);
    } else {
      const ingNorm = normalizeSearch(getFoodName(ing.foodId, customFoods));
      for (const key of avoidedKeys) {
        if (isFreePreferenceKey(key)) {
          if (ingNorm === key.slice(5) || normalizeSearch(labels[key] || '') === ingNorm) {
            hit = true;
            display = preferenceDisplayName(key, labels, customFoods);
            break;
          }
        } else {
          const keyNorm = normalizeSearch(
            labels[key] || getFoodName(key, customFoods),
          );
          if (ingNorm === keyNorm) {
            hit = true;
            display = preferenceDisplayName(key, labels, customFoods);
            break;
          }
        }
      }
    }

    if (hit && !seen.has(normalizeSearch(display))) {
      seen.add(normalizeSearch(display));
      found.push(display);
    }
  }
  return found;
}

function recipeSearchBlob(
  recipe: Recipe,
  customFoods: AppState['customFoods'],
): {
  name: string;
  ingredients: string;
  methods: string;
  equipment: string;
  tags: string;
  all: string;
} {
  const name = normalizeSearch(recipe.name);
  const ingredients = normalizeSearch(
    recipe.ingredients
      .map((i) => `${i.foodId} ${getFoodName(i.foodId, customFoods)}`)
      .join(' '),
  );
  const methodParts: string[] = [];
  const equipParts: string[] = [];
  for (const m of recipe.methods || []) {
    methodParts.push(m.id, m.label || '');
    for (const eq of m.equipmentIds || []) {
      equipParts.push(eq, equipmentLabel(eq));
    }
  }
  const methods = normalizeSearch(methodParts.join(' '));
  const equipment = normalizeSearch(equipParts.join(' '));
  const tags = normalizeSearch(
    [...(recipe.pepperTags || []), ...(recipe.tags || []), recipe.dishRole || ''].join(
      ' ',
    ),
  );
  return {
    name,
    ingredients,
    methods,
    equipment,
    tags,
    all: `${name} ${ingredients} ${methods} ${equipment} ${tags}`,
  };
}

function tokensAllMatch(haystack: string, tokens: string[]): boolean {
  return tokens.every((t) => haystack.includes(t));
}

function scoreSearchHit(
  recipe: Recipe,
  tokens: string[],
  blob: ReturnType<typeof recipeSearchBlob>,
  match: RecipeMatch,
  equipmentFilter: EquipmentId | null,
): {
  score: number;
  nameHit: boolean;
  ingredientHit: boolean;
  methodHit: boolean;
  tagHit: boolean;
} | null {
  if (tokens.length === 0 && !equipmentFilter) return null;

  const nameHit = tokens.length > 0 && tokensAllMatch(blob.name, tokens);
  const ingredientHit =
    tokens.length > 0 && tokensAllMatch(blob.ingredients, tokens);
  const methodHit =
    tokens.length > 0 &&
    (tokensAllMatch(blob.methods, tokens) ||
      tokensAllMatch(blob.equipment, tokens));
  const tagHit = tokens.length > 0 && tokensAllMatch(blob.tags, tokens);
  const anyHit =
    nameHit ||
    ingredientHit ||
    methodHit ||
    tagHit ||
    (tokens.length > 0 && tokensAllMatch(blob.all, tokens));

  const hasEquipmentMethod =
    !equipmentFilter ||
    (recipe.methods || []).some((m) =>
      (m.equipmentIds || []).includes(equipmentFilter),
    ) ||
    blob.equipment.includes(normalizeSearch(equipmentFilter)) ||
    blob.equipment.includes(normalizeSearch(equipmentLabel(equipmentFilter)));

  if (equipmentFilter && !hasEquipmentMethod) return null;
  if (tokens.length > 0 && !anyHit) return null;
  if (tokens.length === 0 && equipmentFilter && hasEquipmentMethod) {
    // solo búsqueda de aparato
  } else if (!anyHit && !equipmentFilter) {
    return null;
  }

  let score = 0;
  if (nameHit) score += 100;
  else if (tokens.some((t) => blob.name.includes(t))) score += 40;

  if (ingredientHit) score += 60;
  else if (tokens.some((t) => blob.ingredients.includes(t))) score += 25;

  if (methodHit || (equipmentFilter && hasEquipmentMethod)) score += 35;
  if (tagHit) score += 15;

  // Todos los tokens en el blob (orden libre)
  if (tokens.length > 1 && tokensAllMatch(blob.all, tokens)) score += 20;

  // Preferencias blandas (no ocultan)
  if (match.equipmentOk) score += 8;
  if (match.hasAll) score += 6;
  else score += Math.max(0, 4 - match.missing.length);
  score += (match.likedOverlap ?? 0) * 4;

  return {
    score,
    nameHit,
    ingredientHit,
    methodHit: methodHit || Boolean(equipmentFilter && hasEquipmentMethod),
    tagHit,
  };
}

function toChefMatch(
  recipe: Recipe,
  state: AppState,
): ChefSearchMatch {
  const labels = state.foodPreferences.labels ?? {};
  const match = buildMatch(
    recipe,
    state.availableFoodIds,
    state.customFoods,
    state.equipmentIds,
  );
  match.likedOverlap = countLikedOverlap(
    recipe,
    state.foodPreferences.likedFoodIds,
    labels,
    state.customFoods,
  );

  // Si no hay método compatible, aún mostramos el primero para la etiqueta
  if (!match.selectedMethod && recipe.methods?.length) {
    match.selectedMethod = recipe.methods[0] ?? null;
  }

  return {
    ...match,
    avoidedFoods: getAvoidedFoodsInRecipe(
      recipe,
      state.foodPreferences.avoidedFoodIds,
      labels,
      state.customFoods,
    ),
    searchScore: 0,
    nameHit: false,
    ingredientHit: false,
    methodHit: false,
    tagHit: false,
  };
}

function passesBrowseFilters(
  recipe: Recipe,
  filters: ChefSearchFilters,
): boolean {
  const diff = filters.difficulty ?? 'all';
  const role = filters.dishRole ?? 'all';
  if (diff !== 'all' && recipe.difficulty !== diff) return false;
  if (role !== 'all' && (recipe.dishRole ?? 'platoPrincipal') !== role) {
    return false;
  }
  return true;
}

/**
 * Búsqueda local del catálogo (no aplica exclusiones de Pepper).
 * No oculta por ingredientes faltantes ni por «Prefiero evitar».
 */
export function searchChefRecipes(
  recipes: Recipe[],
  state: AppState,
  query: string,
  filters: ChefSearchFilters = {},
): ChefSearchMatch[] {
  const tokens = tokenizeQuery(query);
  const equipmentFilter = detectEquipmentInQuery(query);

  // Si la query es solo aparato, tokens pueden seguir conteniendo "air","fryer"
  // — para air fryer detectamos equipo y también dejamos tokens para matching.
  const results: ChefSearchMatch[] = [];

  for (const recipe of recipes) {
    if (!passesBrowseFilters(recipe, filters)) continue;

    const base = toChefMatch(recipe, state);
    const blob = recipeSearchBlob(recipe, state.customFoods);
    const scored = scoreSearchHit(
      recipe,
      tokens,
      blob,
      base,
      equipmentFilter,
    );
    if (!scored) continue;

    results.push({
      ...base,
      searchScore: scored.score,
      nameHit: scored.nameHit,
      ingredientHit: scored.ingredientHit,
      methodHit: scored.methodHit,
      tagHit: scored.tagHit,
    });
  }

  results.sort((a, b) => {
    if (b.searchScore !== a.searchScore) return b.searchScore - a.searchScore;
    if (Number(b.equipmentOk) !== Number(a.equipmentOk)) {
      return Number(b.equipmentOk) - Number(a.equipmentOk);
    }
    if (a.missing.length !== b.missing.length) {
      return a.missing.length - b.missing.length;
    }
    return a.recipe.name.localeCompare(b.recipe.name, 'es');
  });

  return results;
}

/** Catálogo completo con filtros ligeros (sin exclusiones de Pepper). */
export function browseChefRecipes(
  recipes: Recipe[],
  state: AppState,
  filters: ChefSearchFilters = {},
  query = '',
): ChefSearchMatch[] {
  const q = query.trim();
  if (q) return searchChefRecipes(recipes, state, q, filters);

  const results: ChefSearchMatch[] = [];
  for (const recipe of recipes) {
    if (!passesBrowseFilters(recipe, filters)) continue;
    const match = toChefMatch(recipe, state);
    let score = 0;
    if (match.equipmentOk) score += 8;
    if (match.hasAll) score += 6;
    score += (match.likedOverlap ?? 0) * 4;
    match.searchScore = score;
    results.push(match);
  }

  results.sort((a, b) => {
    if (b.searchScore !== a.searchScore) return b.searchScore - a.searchScore;
    return a.recipe.name.localeCompare(b.recipe.name, 'es');
  });
  return results;
}

/** Reexport útil para UI: ¿Pepper ocultaría esta receta por evitar? */
export function wouldPepperExcludeAvoided(
  recipe: Recipe,
  state: AppState,
): boolean {
  return recipeUsesAvoidedFood(
    recipe,
    state.foodPreferences.avoidedFoodIds,
    state.foodPreferences.labels ?? {},
    state.customFoods,
  );
}
