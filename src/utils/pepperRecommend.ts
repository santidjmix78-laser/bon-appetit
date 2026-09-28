import type {
  AppState,
  DishRole,
  PepperTag,
  Recipe,
  RecipeMatch,
} from '../types';
import { buildMatch } from './recommend';
import { recipeUsesAvoidedFood, countLikedOverlap } from './helpers';

export type PepperMode = 'quick' | 'cook' | 'special' | 'surprise';

const BATCH = 8;

function hasTag(recipe: Recipe, tag: PepperTag): boolean {
  return recipe.pepperTags?.includes(tag) ?? false;
}

function roleOf(recipe: Recipe): DishRole {
  return recipe.dishRole ?? 'platoPrincipal';
}

function recentlyUsedIds(state: AppState, days = 14): Set<string> {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const ids = new Set<string>();
  for (const e of state.mealEntries) {
    if (!e.recipeId) continue;
    const t = Date.parse(e.createdAt || e.date);
    if (!Number.isNaN(t) && t >= cutoff) ids.add(e.recipeId);
  }
  return ids;
}

function scoreRecipe(
  match: RecipeMatch,
  mode: PepperMode,
  recent: Set<string>,
): number {
  const r = match.recipe;
  const role = roleOf(r);
  let score = 0;

  score += (match.likedOverlap ?? 0) * 12;

  if (match.hasAll) score += 8;
  else score += Math.max(0, 5 - match.missing.length);

  if (recent.has(r.id)) score -= 25;

  // Guarniciones / snacks no compiten como plato principal
  if (mode === 'cook' || mode === 'special') {
    if (role === 'platoPrincipal') score += 16;
    else if (role === 'guarnicion' || role === 'snack') score -= 35;
    else if (role === 'entrante') score -= 10;
  }

  switch (mode) {
    case 'quick':
      if (r.timeMinutes <= 15) score += 20;
      else if (r.timeMinutes <= 20) score += 14;
      else if (r.timeMinutes <= 25) score += 4;
      else score -= 15;
      if (hasTag(r, 'rapido')) score += 10;
      if (role === 'desayuno' || role === 'snack') score += 4;
      break;
    case 'special':
      if (hasTag(r, 'especial')) score += 18;
      if (r.difficulty === 'media' || r.difficulty === 'avanzada') score += 14;
      if (r.difficulty === 'fácil') score -= 4;
      if (r.timeMinutes >= 25) score += 8;
      if (r.timeMinutes < 15) score -= 6;
      break;
    case 'surprise':
      if (recent.has(r.id)) score -= 40;
      score -= (match.likedOverlap ?? 0) * 3;
      score += Math.random() * 15;
      if (hasTag(r, 'ligero') || hasTag(r, 'completo')) score += 4;
      if (role === 'guarnicion') score -= 20;
      break;
    case 'cook':
    default:
      if (hasTag(r, 'completo')) score += 8;
      if (r.timeMinutes >= 15 && r.timeMinutes <= 40) score += 6;
      break;
  }

  score += Math.random() * 3;
  return score;
}

export interface PepperRecommendOptions {
  recipes: Recipe[];
  state: AppState;
  mode: PepperMode;
  excludeIds?: string[];
  limit?: number;
}

/**
 * Motor de recomendaciones de Pepper (local, sin IA externa).
 */
export function recommendWithPepper(
  options: PepperRecommendOptions,
): RecipeMatch[] {
  const {
    recipes,
    state,
    mode,
    excludeIds = [],
    limit = BATCH,
  } = options;

  const excluded = new Set(excludeIds);
  const recent = recentlyUsedIds(state);
  const labels = state.foodPreferences.labels ?? {};
  const scored: Array<{ match: RecipeMatch; score: number }> = [];

  for (const recipe of recipes) {
    if (excluded.has(recipe.id)) continue;

    if (
      recipeUsesAvoidedFood(
        recipe,
        state.foodPreferences.avoidedFoodIds,
        labels,
        state.customFoods,
      )
    ) {
      continue;
    }

    const match = buildMatch(
      recipe,
      state.availableFoodIds,
      state.customFoods,
      state.equipmentIds,
    );

    if (!match.equipmentOk) continue;

    match.likedOverlap = countLikedOverlap(
      recipe,
      state.foodPreferences.likedFoodIds,
      labels,
      state.customFoods,
    );

    const score = scoreRecipe(match, mode, recent);
    scored.push({ match, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.match);
}

export function pepperModeMeta(mode: PepperMode): {
  title: string;
  message: string;
  pepperSrc: string;
} {
  switch (mode) {
    case 'quick':
      return {
        title: 'Algo rápido',
        message: '¡Perfecto! Tengo algunas ideas rápidas para ti.',
        pepperSrc: '/assets/pepper/pepper-quick.png',
      };
    case 'special':
      return {
        title: 'Algo especial',
        message: 'Hoy vamos a preparar algo especial.',
        pepperSrc: '/assets/pepper/pepper-easy.png',
      };
    case 'surprise':
      return {
        title: 'Sorpréndeme',
        message: 'Vamos a salir un poco de lo habitual.',
        pepperSrc: '/assets/pepper/pepper-surprise.png',
      };
    case 'cook':
    default:
      return {
        title: 'Quiero cocinar',
        message: '¡Buena elección! Tengo varias ideas para cocinar.',
        pepperSrc: '/assets/pepper/pepper-medium.png',
      };
  }
}

export function summarizeIngredients(names: string[], max = 3): string {
  if (names.length === 0) return '';
  if (names.length <= max) return names.join(', ');
  const shown = names.slice(0, max);
  const rest = names.length - max;
  return `${shown.join(', ')} y ${rest} más`;
}
