import { DEFAULT_FOODS } from '../data/foods';
import { DEFAULT_EQUIPMENT } from '../data/equipment';
import type { AppState, EquipmentId, MealEntry, MealType, Recipe } from '../types';
import { DEFAULT_APPEARANCE } from './appearance';

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

const VALID_MEALS: MealType[] = ['desayuno', 'comida', 'merienda', 'cena'];
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

function migrateCustomRecipes(raw: unknown): Recipe[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((r) => r && typeof r === 'object' && typeof (r as Recipe).id === 'string') as Recipe[];
}

/**
 * Carga estado con migración compatible (v1 → 1.1 → 1.1.1).
 * Conserva cocina, favoritos, historial, valoraciones y apariencia.
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
