import { DEFAULT_FOODS } from '../data/foods';
import { RECIPES } from '../data/recipes';
import type { CookingLevel, FoodItem, MealType, Recipe } from '../types';

export function getAllFoods(
  customFoods: FoodItem[],
  hiddenFoodIds: string[] = [],
): FoodItem[] {
  const hidden = new Set(hiddenFoodIds);
  return [...DEFAULT_FOODS.filter((f) => !hidden.has(f.id)), ...customFoods];
}

export function getFoodName(foodId: string, customFoods: FoodItem[]): string {
  const food = [...DEFAULT_FOODS, ...customFoods].find((f) => f.id === foodId);
  return food?.name ?? foodId;
}

/** Biblioteca builtin + recetas personalizadas del usuario. */
export function getAllRecipes(customRecipes: Recipe[] = []): Recipe[] {
  return [...RECIPES, ...customRecipes];
}

export function getRecipeById(
  id: string,
  customRecipes: Recipe[] = [],
): Recipe | undefined {
  return getAllRecipes(customRecipes).find((r) => r.id === id);
}

export function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function nowTime(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40);
}

export function getCurrentWeekDates(): string[] {
  const now = new Date();
  const day = now.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  monday.setHours(12, 0, 0, 0);

  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dayNum = String(d.getDate()).padStart(2, '0');
    dates.push(`${y}-${m}-${dayNum}`);
  }
  return dates;
}

export const WEEKDAY_LABELS = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

export function isWeekend(dateISO: string): boolean {
  const d = new Date(dateISO + 'T12:00:00');
  const day = d.getDay();
  return day === 0 || day === 6;
}

export const MEAL_TYPE_OPTIONS: {
  id: MealType;
  label: string;
  emoji: string;
}[] = [
  { id: 'desayuno', label: 'Desayuno', emoji: '🌅' },
  { id: 'comida', label: 'Comida', emoji: '🍽️' },
  { id: 'merienda', label: 'Merienda', emoji: '🍎' },
  { id: 'cena', label: 'Cena', emoji: '🌙' },
];

export function mealTypeLabel(type: MealType): string {
  return MEAL_TYPE_OPTIONS.find((m) => m.id === type)?.label ?? type;
}

/** Normaliza texto para búsqueda (minúsculas + sin acentos). */
export function normalizeSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

/** Etiqueta visual limpia para preferencias libres. */
export function displayFoodLabel(name: string): string {
  const trimmed = name.trim().replace(/\s+/g, ' ');
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function freePreferenceKey(name: string): string {
  return `pref:${normalizeSearch(name)}`;
}

export function isFreePreferenceKey(key: string): boolean {
  return key.startsWith('pref:');
}

/** Catálogo completo para preferencias (incluye ocultos de Mi cocina). */
export function getPreferenceFoodCatalog(customFoods: FoodItem[]): FoodItem[] {
  return [...DEFAULT_FOODS, ...customFoods];
}

/**
 * Resuelve un nombre a foodId de catálogo o clave libre pref:…
 * No modifica Mi cocina.
 */
export function resolvePreferenceEntry(
  name: string,
  customFoods: FoodItem[],
): { key: string; label: string; foodId?: string } {
  const label = displayFoodLabel(name);
  const norm = normalizeSearch(name);
  if (!norm) return { key: '', label: '' };

  const catalog = getPreferenceFoodCatalog(customFoods);
  const found = catalog.find((f) => normalizeSearch(f.name) === norm);
  if (found) {
    return { key: found.id, label: found.name, foodId: found.id };
  }
  return { key: freePreferenceKey(name), label };
}

export function preferenceDisplayName(
  key: string,
  labels: Record<string, string>,
  customFoods: FoodItem[],
): string {
  if (labels[key]) return labels[key];
  if (isFreePreferenceKey(key)) {
    return displayFoodLabel(key.slice(5).replace(/-/g, ' '));
  }
  return getFoodName(key, customFoods);
}

/** ¿La receta usa un alimento evitado? (por id o por nombre normalizado). */
export function recipeUsesAvoidedFood(
  recipe: Recipe,
  avoidedKeys: string[],
  labels: Record<string, string>,
  customFoods: FoodItem[],
): boolean {
  const required = recipe.ingredients.filter((i) => !i.optional);
  const avoided = new Set(avoidedKeys);
  const avoidedNorms = new Set<string>();

  for (const key of avoidedKeys) {
    if (isFreePreferenceKey(key)) {
      avoidedNorms.add(key.slice(5));
    }
    const label = labels[key];
    if (label) avoidedNorms.add(normalizeSearch(label));
    if (!isFreePreferenceKey(key)) {
      avoidedNorms.add(normalizeSearch(getFoodName(key, customFoods)));
    }
  }

  for (const ing of required) {
    if (avoided.has(ing.foodId)) return true;
    const ingNorm = normalizeSearch(getFoodName(ing.foodId, customFoods));
    if (avoidedNorms.has(ingNorm)) return true;
  }
  return false;
}

export function countLikedOverlap(
  recipe: Recipe,
  likedKeys: string[],
  labels: Record<string, string>,
  customFoods: FoodItem[],
): number {
  const required = recipe.ingredients.filter((i) => !i.optional);
  const liked = new Set(likedKeys);
  const likedNorms = new Set<string>();
  for (const key of likedKeys) {
    if (isFreePreferenceKey(key)) likedNorms.add(key.slice(5));
    const label = labels[key];
    if (label) likedNorms.add(normalizeSearch(label));
    if (!isFreePreferenceKey(key)) {
      likedNorms.add(normalizeSearch(getFoodName(key, customFoods)));
    }
  }

  let n = 0;
  for (const ing of required) {
    if (liked.has(ing.foodId)) {
      n += 1;
      continue;
    }
    if (likedNorms.has(normalizeSearch(getFoodName(ing.foodId, customFoods)))) {
      n += 1;
    }
  }
  return n;
}

export const COOKING_LEVEL_OPTIONS: {
  id: CookingLevel;
  label: string;
}[] = [
  { id: 'beginner', label: 'Principiante' },
  { id: 'intermediate', label: 'Intermedio' },
  { id: 'advanced', label: 'Avanzado' },
];
