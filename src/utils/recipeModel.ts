import type { CookingLevel, CookingMethod, Recipe } from '../types';
import type { CookingMethodV2, RecipeStep, RecipeV2 } from '../types/recipe';
import { CULINARY_TERMS } from '../data/culinaryTerms';

function nonEmpty(s: string | undefined): string | undefined {
  const t = (s || '').trim();
  return t.length ? t : undefined;
}

/**
 * Resuelve el texto del nivel pedido.
 *
 * Orden: nivel pedido → intermediate → beginner → advanced.
 * Esto SOLO aplica si el campo del nivel está vacío en el MISMO paso.
 * Los pasos partidos por `levels: ['beginner']` / `levels: ['intermediate','advanced']`
 * no se mezclan aquí: `getStepsForLevel` filtra antes por `levels`.
 *
 * Importante: si un paso compartido deja `advanced: ''` y tiene beginner,
 * el usuario avanzado verá el texto de principiante (fallback). Por eso los
 * pasos compartidos deben tener los tres niveles rellenados con prosa propia.
 */
function resolveStepText(
  text: string | Partial<Record<CookingLevel, string>>,
  level: CookingLevel,
): string {
  if (typeof text === 'string') return text;
  const direct = nonEmpty(text[level]);
  if (direct) return direct;
  return (
    nonEmpty(text.intermediate) ||
    nonEmpty(text.beginner) ||
    nonEmpty(text.advanced) ||
    ''
  );
}

export function stepPhaseId(step: RecipeStep): string {
  return step.phaseId || step.id;
}

export function normalizeSteps(
  steps: Array<string | RecipeStep>,
): RecipeStep[] {
  return steps.map((s, i) => {
    if (typeof s === 'string') {
      return { id: `step-${i + 1}`, phaseId: `step-${i + 1}`, text: s };
    }
    return {
      ...s,
      id: s.id || `step-${i + 1}`,
      phaseId: s.phaseId || s.id || `step-${i + 1}`,
    };
  });
}

/** Adapta recetas legacy (steps string[]) al modelo con RecipeStep. */
export function getMethodSteps(
  method: CookingMethod | CookingMethodV2 | undefined,
  recipe: Recipe | RecipeV2,
): RecipeStep[] {
  if (method && 'steps' in method && method.steps?.length) {
    const first = method.steps[0];
    if (typeof first === 'string') {
      return normalizeSteps(method.steps as string[]);
    }
    return normalizeSteps(method.steps as RecipeStep[]);
  }
  return normalizeSteps(recipe.steps ?? []);
}

export function getStepsForLevel(
  steps: RecipeStep[],
  level: CookingLevel,
): Array<RecipeStep & { resolvedText: string; phaseId: string }> {
  return steps
    .filter((s) => !s.levels || s.levels.includes(level))
    .map((s) => ({
      ...s,
      phaseId: stepPhaseId(s),
      resolvedText: resolveStepText(s.text, level),
    }))
    .filter((s) => s.resolvedText.trim().length > 0);
}

/**
 * Al cambiar de nivel, conserva la fase culinaria (phaseId).
 * Devuelve el índice del primer paso del nuevo nivel con la misma fase.
 */
export function mapStepIndexToLevel(
  fromSteps: Array<{ phaseId: string }>,
  fromIndex: number,
  toSteps: Array<{ phaseId: string }>,
): number {
  if (toSteps.length === 0) return 0;
  const phase =
    fromSteps[fromIndex]?.phaseId ||
    fromSteps[Math.min(fromIndex, fromSteps.length - 1)]?.phaseId;
  if (!phase) return Math.min(fromIndex, toSteps.length - 1);
  const idx = toSteps.findIndex((s) => s.phaseId === phase);
  if (idx >= 0) return idx;
  for (let i = fromIndex - 1; i >= 0; i--) {
    const p = fromSteps[i]?.phaseId;
    if (!p) continue;
    const j = toSteps.findIndex((s) => s.phaseId === p);
    if (j >= 0) return j;
  }
  return Math.min(fromIndex, toSteps.length - 1);
}

export function scaleAmount(
  amountPerServing: number | undefined,
  baseServings: number,
  servings: number,
): number | null {
  if (amountPerServing == null || !Number.isFinite(amountPerServing)) return null;
  const base = baseServings > 0 ? baseServings : 1;
  return Math.round(((amountPerServing * servings) / base) * 10) / 10;
}

export function formatScaledQuantity(
  amount: number | null,
  unit: string | undefined,
  fallbackQuantity: string,
): string {
  if (amount == null) return fallbackQuantity;
  const u = unit ? ` ${unit}` : '';
  return `aprox. ${amount}${u}`;
}

/**
 * Placeholders seguros en textos de paso:
 * - {qty:foodId} → cantidad escalada (p. ej. "aprox. 300 g")
 * - {amount:foodId} → solo el número escalado
 * - {unit:foodId} → unidad
 * Si no hay amountPerServing, usa quantity literal del ingrediente.
 */
export function interpolateStepQuantities(
  text: string,
  recipe: Recipe | RecipeV2,
  servings: number,
): string {
  if (!text || !recipe) return text;
  const base = recipe.baseServings ?? 1;
  return text.replace(
    /\{(qty|amount|unit):([a-z0-9-]+)\}/gi,
    (_full, kind: string, foodId: string) => {
      const ing = (recipe.ingredients || []).find((i) => i.foodId === foodId);
      if (!ing) return foodId;
      const scaled = scaleAmount(ing.amountPerServing, base, servings);
      if (kind.toLowerCase() === 'unit') return ing.unit || '';
      if (kind.toLowerCase() === 'amount') {
        if (scaled != null) return String(scaled);
        return ing.quantity;
      }
      if (scaled != null) {
        return formatScaledQuantity(scaled, ing.unit, ing.quantity);
      }
      return ing.quantity;
    },
  );
}

/** Solo mostrar ⓘ si el término aparece o se enseña en el texto del paso. */
export function filterTermIdsForText(
  termIds: string[] | undefined,
  text: string,
): string[] | undefined {
  if (!termIds?.length) return termIds;
  const lower = (text || '').toLowerCase();
  const kept = termIds.filter((id) => {
    const term = CULINARY_TERMS.find((t) => t.id === id);
    if (!term) return false;
    const name = term.name.toLowerCase();
    if (lower.includes(name)) return true;
    const bare = id.replace(/-/g, ' ');
    if (lower.includes(bare)) return true;
    if (id === 'sofreir' && /sofri/i.test(lower)) return true;
    if (id === 'al-dente' && /al dente/i.test(lower)) return true;
    if (id === 'juliana' && /juliana/i.test(lower)) return true;
    if (new RegExp(`llama[dn]?\\s+${name}`, 'i').test(text)) return true;
    return false;
  });
  return kept.length ? kept : undefined;
}

/** Métodos del usuario compatibles (OR entre métodos). */
export function compatibleMethods(
  recipe: Recipe,
  equipmentIds: string[],
): CookingMethod[] {
  const owned = new Set(equipmentIds);
  const methods = recipe.methods?.length
    ? recipe.methods
    : [
        {
          id: 'default',
          label: 'Método habitual',
          equipmentIds: [] as EquipmentIdCompat,
          steps: recipe.steps,
        } as CookingMethod,
      ];

  return methods.filter((m) =>
    (m.equipmentIds ?? []).every((id) => owned.has(id)),
  );
}

type EquipmentIdCompat = import('../types').EquipmentId[];
