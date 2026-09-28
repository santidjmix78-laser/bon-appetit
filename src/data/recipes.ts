import type { Recipe } from '../types';
import { RECIPE_CATALOG } from './recipes.catalog';

/**
 * Biblioteca local de recetas (v1.3).
 * Catálogo de platos DISTINTOS; métodos alternativos viven dentro de cada receta.
 * FODMAP orientativo/de demostración.
 */
export const RECIPES: Recipe[] = RECIPE_CATALOG;

export function getBuiltinRecipeById(id: string): Recipe | undefined {
  return RECIPES.find((r) => r.id === id);
}
