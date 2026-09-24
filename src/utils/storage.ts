import type { AppState } from '../types';

const STORAGE_KEY = 'bon-appetit-v1';

const DEFAULT_STATE: AppState = {
  availableFoodIds: [
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
  ],
  customFoods: [],
  favoriteRecipeIds: [],
  mealEntries: [],
  recipeFeelings: {},
};

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE, availableFoodIds: [...DEFAULT_STATE.availableFoodIds] };
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      availableFoodIds: parsed.availableFoodIds ?? [...DEFAULT_STATE.availableFoodIds],
      customFoods: parsed.customFoods ?? [],
      favoriteRecipeIds: parsed.favoriteRecipeIds ?? [],
      mealEntries: parsed.mealEntries ?? [],
      recipeFeelings: parsed.recipeFeelings ?? {},
    };
  } catch {
    return { ...DEFAULT_STATE, availableFoodIds: [...DEFAULT_STATE.availableFoodIds] };
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getDefaultState(): AppState {
  return {
    ...DEFAULT_STATE,
    availableFoodIds: [...DEFAULT_STATE.availableFoodIds],
    customFoods: [],
    favoriteRecipeIds: [],
    mealEntries: [],
    recipeFeelings: {},
  };
}
