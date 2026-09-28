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

/** Dificultad objetiva del plato (no confundir con cookingLevel). */
export type Difficulty = 'fácil' | 'media' | 'avanzada';

/**
 * Rol del plato en recomendaciones Pepper.
 * Independiente de mealTypes.
 */
export type DishRole =
  | 'platoPrincipal'
  | 'guarnicion'
  | 'entrante'
  | 'desayuno'
  | 'snack';

/**
 * Nivel de explicación que necesita el usuario.
 * No filtra recetas; solo adapta la profundidad de las instrucciones.
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
  /** Equipamiento necesario para este método (todos = AND). Métodos distintos = OR. */
  equipmentIds: EquipmentId[];
  timeMinutes?: number;
  temperature?: string;
  temperatureC?: number;
  /** Pasos como texto plano o estructurados (v1.3). */
  steps: string[] | import('./recipe').RecipeStep[];
}

export type PepperTag = 'rapido' | 'especial' | 'completo' | 'ligero' | 'comfort';

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
  pepperTags?: PepperTag[];
  /** Rol para recomendaciones Pepper (plato principal vs guarnición…). */
  dishRole?: DishRole;
  /** URL futura de foto del plato. Si falta, no se reserva espacio vacío. */
  imageUrl?: string;
  imageHue?: number;
  custom?: boolean;
  /** Raciones de referencia de la receta (por defecto 1). */
  baseServings?: number;
}

/** Ajuste personal de tiempo/temperatura para un paso concreto. */
export interface CookStepTweak {
  seconds?: number;
  temperatureC?: number;
}

export interface CookTweaks {
  /** Clave: recipeId::methodId::stepId */
  byRecipeStep: Record<string, CookStepTweak>;
  /** Clave semántica: p.ej. patatas_gajo+airfryer+190C */
  bySimilar: Record<string, CookStepTweak>;
}

/** Niveles numéricos opcionales de la placa (vitro/inducción). */
export interface StovePowerPrefs {
  min: number;
  max: number;
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
  likedFoodIds: string[];
  avoidedFoodIds: string[];
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
  foodPreferences: FoodPreferences;
  defaultServings: number;
  cookingLevel: CookingLevel;
  cookTweaks: CookTweaks;
  stovePower: StovePowerPrefs | null;
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
