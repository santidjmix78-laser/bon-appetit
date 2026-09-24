export type StorageZone = 'nevera' | 'congelador' | 'despensa';

export type FoodCategory =
  | 'verduras'
  | 'frutas'
  | 'proteinas'
  | 'lacteos'
  | 'cereales'
  | 'conservas'
  | 'preparados'
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

/** Extensible: añadir IDs aquí y en EQUIPMENT_CATALOG. */
export type EquipmentId =
  | 'horno'
  | 'microondas'
  | 'airfryer'
  | 'freidora'
  | 'vitro'
  | 'sarten'
  | 'olla'
  | 'plancha'
  | 'batidora'
  | 'tostadora';

export type RecommendMode = 'strict' | 'flexible';

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

/** Un método de cocción (principal o alternativo). */
export interface CookingMethod {
  id: string;
  label: string;
  /** Equipamiento necesario para este método (todos). */
  equipmentIds: EquipmentId[];
  steps: string[];
}

export interface Recipe {
  id: string;
  name: string;
  timeMinutes: number;
  difficulty: Difficulty;
  ingredients: RecipeIngredient[];
  /**
   * Pasos por defecto si no hay methods o ninguno es compatible.
   * Preferir methods cuando existan alternativas.
   */
  steps: string[];
  mealTypes: MealType[];
  /** Métodos de cocción (el primero compatible con el equipamiento del usuario se usa). */
  methods?: CookingMethod[];
  fodmap: {
    level: FodmapLevel;
    note?: string;
  };
  tags?: string[];
  imageHue?: number;
  /** Receta creada por el usuario. */
  custom?: boolean;
}

export interface MealEntry {
  id: string;
  date: string;
  time: string;
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
  hiddenFoodIds: string[];
  customFoods: FoodItem[];
  favoriteRecipeIds: string[];
  mealEntries: MealEntry[];
  recipeFeelings: Record<string, Feeling>;
  appearance: AppearancePrefs;
  /** Equipamiento disponible en casa. */
  equipmentIds: EquipmentId[];
  /** Recetas creadas por el usuario. */
  customRecipes: Recipe[];
}

export interface RecipeMatch {
  recipe: Recipe;
  available: string[];
  missing: string[];
  hasAll: boolean;
  /** Nº de ingredientes principales (no condimento) que el usuario tiene. */
  mainAvailableCount: number;
  /** Método de cocción seleccionado según equipamiento. */
  selectedMethod: CookingMethod | null;
  /** Si falta equipamiento obligatorio (ningún método compatible). */
  missingEquipment: EquipmentId[];
  equipmentOk: boolean;
}

export interface RecommendResult {
  ready: RecipeMatch[];
  needOne: RecipeMatch[];
  needTwo: RecipeMatch[];
}
