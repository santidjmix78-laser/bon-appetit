import { DEFAULT_FOODS } from '../data/foods';
import type { AppState, MealEntry, MealType } from '../types';
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

function migrateMealEntries(entries: MealEntry[] | undefined): MealEntry[] {
  if (!entries) return [];
  return entries.map((e) => ({
    ...e,
    mealType: VALID_MEALS.includes(e.mealType) ? e.mealType : 'comida',
  }));
}

/**
 * Carga estado desde localStorage con migración compatible v1 → v1.1.
 * Conserva alimentos, favoritos, historial y valoraciones existentes.
 */
export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getDefaultState();
    }
    const parsed = JSON.parse(raw) as Partial<AppState> & {
      availableFoodIds?: string[];
    };

    return {
      availableFoodIds: parsed.availableFoodIds ?? [...DEFAULT_AVAILABLE],
      // Nuevos en 1.1: si no existe, lista vacía (todos los defaults visibles)
      hiddenFoodIds: Array.isArray(parsed.hiddenFoodIds) ? parsed.hiddenFoodIds : [],
      customFoods: parsed.customFoods ?? [],
      favoriteRecipeIds: parsed.favoriteRecipeIds ?? [],
      mealEntries: migrateMealEntries(parsed.mealEntries),
      recipeFeelings: parsed.recipeFeelings ?? {},
      appearance: {
        theme: parsed.appearance?.theme ?? DEFAULT_APPEARANCE.theme,
        accent: parsed.appearance?.accent ?? DEFAULT_APPEARANCE.accent,
      },
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
  };
}

/** Solo vacía la biblioteca de cocina; conserva historial, favoritos, etc. */
export function emptyKitchenLibrary(prev: AppState): AppState {
  return {
    ...prev,
    availableFoodIds: [],
    customFoods: [],
    hiddenFoodIds: DEFAULT_FOODS.map((f) => f.id),
  };
}

/** Restaura la biblioteca predeterminada sin tocar historial/favoritos. */
export function restoreKitchenLibrary(prev: AppState): AppState {
  return {
    ...prev,
    availableFoodIds: [...DEFAULT_AVAILABLE],
    customFoods: [],
    hiddenFoodIds: [],
  };
}

export function getDefaultAvailableIds(): string[] {
  return [...DEFAULT_AVAILABLE];
}
