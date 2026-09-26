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

/** Dificultad objetiva aproximada de la receta (no confundir con cookingLevel). */
export type Difficulty = 'fácil' | 'media';

/**
 * Nivel de explicación que necesita el usuario.
 * No se usa para filtrar recetas; prepara instrucciones adaptadas en el futuro.
 */
export type CookingLevel = 'beginner' | 'intermediate' | 'advanced';

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
  /** Texto de cantidad mostrado (compatible con recetas actuales). */
  quantity: string;
  optional?: boolean;
  /**
   * Cantidad numérica por 1 ración/persona (opcional).
   * Preparado para escalar a N comensales sin reescribir ya todas las recetas.
   */
  amountPerServing?: number;
  unit?: string;
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
  steps: string[];
  mealTypes: MealType[];
  methods?: CookingMethod[];
  fodmap: {
    level: FodmapLevel;
    note?: string;
  };
  tags?: string[];
  imageHue?: number;
  custom?: boolean;
  /** Raciones de referencia de la receta (por defecto 1). */
  baseServings?: number;
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

export interface FoodPreferences {
  /** Priorizar en recomendaciones (no implica disponibilidad). IDs de catálogo o claves pref:… */
  likedFoodIds: string[];
  /** Evitar normalmente en recomendaciones automáticas. IDs de catálogo o claves pref:… */
  avoidedFoodIds: string[];
  /** Etiquetas para preferencias libres (claves pref:…). No forman parte de Mi cocina. */
  labels: Record<string, string>;
}

export interface AppState {
  availableFoodIds: string[];
  hiddenFoodIds: string[];
  customFoods: FoodItem[];
  favoriteRecipeIds: string[];
  mealEntries: MealEntry[];
  recipeFeelings: Record<string, Feeling>;
  appearance: AppearancePrefs;
  equipmentIds: EquipmentId[];
  customRecipes: Recipe[];
  /** Preferencias alimentarias (independientes de Mi cocina). */
  foodPreferences: FoodPreferences;
  /** Comensales habituales (mín. 1). */
  defaultServings: number;
  /** Nivel de detalle de instrucciones del usuario. */
  cookingLevel: CookingLevel;
}

export interface RecipeMatch {
  recipe: Recipe;
  available: string[];
  missing: string[];
  hasAll: boolean;
  mainAvailableCount: number;
  selectedMethod: CookingMethod | null;
  missingEquipment: EquipmentId[];
  equipmentOk: boolean;
  likedOverlap?: number;
}

export interface RecommendResult {
  ready: RecipeMatch[];
  needOne: RecipeMatch[];
  needTwo: RecipeMatch[];
}
