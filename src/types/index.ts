export type StorageZone = 'nevera' | 'congelador' | 'despensa';

export type FoodCategory =
  | 'verduras'
  | 'frutas'
  | 'proteinas'
  | 'lacteos'
  | 'cereales'
  | 'conservas'
  | 'otros';

export type FodmapLevel = 'low' | 'moderate' | 'high';

export type Difficulty = 'fácil' | 'media';

export type MealType = 'desayuno' | 'comida' | 'merienda' | 'cena';

export type Feeling = 'good' | 'ok' | 'bad';

export type TimeOption = 10 | 15 | 20 | 30 | 999;

export type ThemePreference = 'dark' | 'light' | 'system';

export type AccentColor =
  | 'lime'
  | 'blue'
  | 'purple'
  | 'orange'
  | 'pink'
  | 'turquoise';

export interface FoodItem {
  id: string;
  name: string;
  zone: StorageZone;
  category: FoodCategory;
  custom?: boolean;
}

export interface RecipeIngredient {
  foodId: string;
  quantity: string;
  optional?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  timeMinutes: number;
  difficulty: Difficulty;
  ingredients: RecipeIngredient[];
  steps: string[];
  /** Tipos de comida para los que encaja esta receta. */
  mealTypes: MealType[];
  /** Orientación FODMAP demostrativa; editable en el futuro. */
  fodmap: {
    level: FodmapLevel;
    note?: string;
  };
  tags?: string[];
  imageHue?: number;
}

export interface MealEntry {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  mealType: MealType;
  text: string;
  recipeId?: string;
  mainIngredients?: string[];
  feeling?: Feeling;
  createdAt: string;
}

export interface AppearancePrefs {
  theme: ThemePreference;
  accent: AccentColor;
}

export interface AppState {
  availableFoodIds: string[];
  /** Alimentos de la biblioteca por defecto ocultados por el usuario. */
  hiddenFoodIds: string[];
  customFoods: FoodItem[];
  favoriteRecipeIds: string[];
  mealEntries: MealEntry[];
  recipeFeelings: Record<string, Feeling>;
  appearance: AppearancePrefs;
}

export interface RecipeMatch {
  recipe: Recipe;
  available: string[];
  missing: string[];
  hasAll: boolean;
}
