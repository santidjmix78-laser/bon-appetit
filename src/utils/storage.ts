import { DEFAULT_FOODS } from '../data/foods';
import { DEFAULT_EQUIPMENT } from '../data/equipment';
import type {
  AppState,
  CookingLevel,
  CookTweaks,
  EquipmentId,
  FoodPreferences,
  MealEntry,
  MealType,
  Recipe,
  StovePowerPrefs,
} from '../types';
import { DEFAULT_APPEARANCE } from './appearance';
import { normalizeDifficulty } from './cookAssist';

const STORAGE_KEY = 'bon-appetit-v1';

const DEFAULT_AVAILABLE = [
  'pollo',
  'huevos',
  'arroz',
  'pasta',
  'patatas',
  'tomate',
  'calabacin',
  'zanahoria',
  'queso',
  'yogur',
  'pan',
  'atun',
  'aceite',
  'sal',
  'pimienta',
  'jamon',
  'lechuga',
];

const VALID_MEALS: MealType[] = [
  'desayuno',
  'almuerzo',
  'comida',
  'merienda',
  'cena',
];
const VALID_EQUIPMENT = new Set<EquipmentId>([
  'horno',
  'microondas',
  'airfryer',
  'freidora',
  'vitro',
  'sarten',
  'olla',
  'plancha',
  'batidora',
  'tostadora',
]);
const VALID_COOKING_LEVELS = new Set<CookingLevel>([
  'beginner',
  'intermediate',
  'advanced',
]);

export const DEFAULT_FOOD_PREFERENCES: FoodPreferences = {
  likedFoodIds: [],
  avoidedFoodIds: [],
  labels: {},
};

function migrateMealEntries(entries: MealEntry[] | undefined): MealEntry[] {
  if (!entries) return [];
  return entries.map((e) => ({
    ...e,
    mealType: VALID_MEALS.includes(e.mealType) ? e.mealType : 'comida',
  }));
}

function migrateEquipment(ids: unknown): EquipmentId[] {
  if (!Array.isArray(ids)) return [...DEFAULT_EQUIPMENT];
  return ids.filter((id): id is EquipmentId => VALID_EQUIPMENT.has(id as EquipmentId));
}

function migrateCookTweaks(raw: unknown): CookTweaks {
  const empty: CookTweaks = { byRecipeStep: {}, bySimilar: {} };
  if (!raw || typeof raw !== 'object') return empty;
  const obj = raw as Partial<CookTweaks>;
  const map = (v: unknown): Record<string, { seconds?: number; temperatureC?: number }> => {
    if (!v || typeof v !== 'object') return {};
    const out: Record<string, { seconds?: number; temperatureC?: number }> = {};
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      if (!val || typeof val !== 'object') continue;
      const t = val as { seconds?: unknown; temperatureC?: unknown };
      const entry: { seconds?: number; temperatureC?: number } = {};
      if (typeof t.seconds === 'number' && t.seconds > 0) entry.seconds = Math.round(t.seconds);
      if (typeof t.temperatureC === 'number' && t.temperatureC > 0) {
        entry.temperatureC = Math.round(t.temperatureC);
      }
      if (entry.seconds != null || entry.temperatureC != null) out[k] = entry;
    }
    return out;
  };
  return {
    byRecipeStep: map(obj.byRecipeStep),
    bySimilar: map(obj.bySimilar),
  };
}

function migrateStovePower(raw: unknown): StovePowerPrefs | null {
  if (!raw || typeof raw !== 'object') return null;
  const s = raw as { min?: unknown; max?: unknown };
  const min = typeof s.min === 'number' ? s.min : Number(s.min);
  const max = typeof s.max === 'number' ? s.max : Number(s.max);
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return null;
  return { min: Math.floor(min), max: Math.floor(max) };
}

function migrateCustomRecipes(raw: unknown): Recipe[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((r) => r && typeof r === 'object' && typeof (r as Recipe).id === 'string')
    .map((r) => {
      const recipe = r as Recipe;
      return {
        ...recipe,
        difficulty: normalizeDifficulty(recipe.difficulty as string),
      };
    });
}

function migrateStringIdList(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const unique = new Set<string>();
  for (const id of raw) {
    if (typeof id === 'string' && id.trim()) unique.add(id);
  }
  return [...unique];
}

function migrateFoodPreferences(raw: unknown): FoodPreferences {
  if (!raw || typeof raw !== 'object') {
    return { likedFoodIds: [], avoidedFoodIds: [], labels: {} };
  }
  const pref = raw as Partial<FoodPreferences>;
  const liked = migrateStringIdList(pref.likedFoodIds);
  const avoided = migrateStringIdList(pref.avoidedFoodIds);
  const avoidedSet = new Set(avoided);
  const labels =
    pref.labels && typeof pref.labels === 'object' && !Array.isArray(pref.labels)
      ? Object.fromEntries(
          Object.entries(pref.labels as Record<string, unknown>).filter(
            (entry): entry is [string, string] =>
              typeof entry[0] === 'string' && typeof entry[1] === 'string',
          ),
        )
      : {};
  return {
    likedFoodIds: liked.filter((id) => !avoidedSet.has(id)),
    avoidedFoodIds: avoided,
    labels,
  };
}

function migrateServings(raw: unknown): number {
  const n = typeof raw === 'number' ? raw : Number(raw);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(20, Math.floor(n));
}

function migrateCookingLevel(raw: unknown): CookingLevel {
  if (typeof raw === 'string' && VALID_COOKING_LEVELS.has(raw as CookingLevel)) {
    return raw as CookingLevel;
  }
  return 'beginner';
}

/**
 * Carga estado con migración compatible (v1 → … → 1.2.1).
 * Conserva cocina, favoritos, historial, valoraciones, apariencia y equipamiento.
 */
export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw) as Partial<AppState>;

    return {
      availableFoodIds: parsed.availableFoodIds ?? [...DEFAULT_AVAILABLE],
      hiddenFoodIds: Array.isArray(parsed.hiddenFoodIds) ? parsed.hiddenFoodIds : [],
      customFoods: parsed.customFoods ?? [],
      favoriteRecipeIds: parsed.favoriteRecipeIds ?? [],
      mealEntries: migrateMealEntries(parsed.mealEntries),
      recipeFeelings: parsed.recipeFeelings ?? {},
      appearance: {
        theme: parsed.appearance?.theme ?? DEFAULT_APPEARANCE.theme,
        accent: parsed.appearance?.accent ?? DEFAULT_APPEARANCE.accent,
      },
      equipmentIds: migrateEquipment(parsed.equipmentIds),
      customRecipes: migrateCustomRecipes(parsed.customRecipes),
      foodPreferences: migrateFoodPreferences(parsed.foodPreferences),
      defaultServings: migrateServings(parsed.defaultServings),
      cookingLevel: migrateCookingLevel(parsed.cookingLevel),
      cookTweaks: migrateCookTweaks(
        (parsed as Partial<AppState>).cookTweaks,
      ),
      stovePower: migrateStovePower((parsed as Partial<AppState>).stovePower),
    };
  } catch {
    return getDefaultState();
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getDefaultState(): AppState {
  return {
    availableFoodIds: [...DEFAULT_AVAILABLE],
    hiddenFoodIds: [],
    customFoods: [],
    favoriteRecipeIds: [],
    mealEntries: [],
    recipeFeelings: {},
    appearance: { ...DEFAULT_APPEARANCE },
    equipmentIds: [...DEFAULT_EQUIPMENT],
    customRecipes: [],
    foodPreferences: {
      likedFoodIds: [],
      avoidedFoodIds: [],
      labels: {},
    },
    defaultServings: 1,
    cookingLevel: 'beginner',
    cookTweaks: { byRecipeStep: {}, bySimilar: {} },
    stovePower: null,
  };
}

export function emptyKitchenLibrary(prev: AppState): AppState {
  return {
    ...prev,
    availableFoodIds: [],
    customFoods: [],
    hiddenFoodIds: DEFAULT_FOODS.map((f) => f.id),
  };
}

export function restoreKitchenLibrary(prev: AppState): AppState {
  return {
    ...prev,
    availableFoodIds: [...DEFAULT_AVAILABLE],
    customFoods: [],
    hiddenFoodIds: [],
  };
}
