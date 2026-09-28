import type {
  CookingLevel,
  Difficulty,
  DishRole,
  EquipmentId,
  FodmapLevel,
  MealType,
  PepperTag,
} from './index';

/** Término culinario consultable con ⓘ */
export interface CulinaryTerm {
  id: string;
  name: string;
  definition: string;
}

/**
 * Paso estructurado. `text` puede ser string (todos los niveles)
 * o mapa por cookingLevel del usuario.
 */
export interface RecipeStep {
  id: string;
  /**
   * Fase culinaria estable para mapear entre niveles con distinto nº de pasos.
   * Por defecto = id.
   */
  phaseId?: string;
  /**
   * Si se indica, el paso solo aparece en esos niveles.
   * Si falta, aparece en todos.
   */
  levels?: CookingLevel[];
  text: string | Partial<Record<CookingLevel, string>>;
  timerSeconds?: number;
  timerLabel?: string;
  termIds?: string[];
  temperatureC?: number;
  similarKey?: string;
  /** Nivel de fuego estructurado (evita bugs de texto medio/medio-alto). */
  heatLevel?: import('../utils/cookAssist').HeatLevel;
}

export interface CookingMethodV2 {
  id: string;
  label: string;
  equipmentIds: EquipmentId[];
  timeMinutes?: number;
  temperature?: string;
  temperatureC?: number;
  steps: RecipeStep[];
}

export interface RecipeIngredientV2 {
  foodId: string;
  quantity: string;
  optional?: boolean;
  amountPerServing?: number;
  unit?: string;
}

export interface RecipeV2 {
  id: string;
  name: string;
  timeMinutes: number;
  difficulty: Difficulty;
  ingredients: RecipeIngredientV2[];
  steps: string[];
  mealTypes: MealType[];
  methods?: CookingMethodV2[];
  fodmap: {
    level: FodmapLevel;
    note?: string;
  };
  tags?: string[];
  dishRole?: DishRole;
  imageUrl?: string;
  imageHue?: number;
  custom?: boolean;
  baseServings?: number;
  pepperTags?: PepperTag[];
}

export type { RecipeV2 as RichRecipe };
