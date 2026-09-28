import type { CookingLevel, StovePowerPrefs } from '../types';

export type HeatLevel =
  | 'bajo'
  | 'medio-bajo'
  | 'medio'
  | 'medio-alto'
  | 'alto';

const HEAT_LABEL: Record<HeatLevel, string> = {
  bajo: 'Fuego bajo',
  'medio-bajo': 'Fuego medio-bajo',
  medio: 'Fuego medio',
  'medio-alto': 'Fuego medio-alto',
  alto: 'Fuego alto',
};

const HEAT_FRACTION: Record<HeatLevel, number> = {
  bajo: 0.2,
  'medio-bajo': 0.35,
  medio: 0.5,
  'medio-alto': 0.7,
  alto: 0.9,
};

const HEAT_SIGNAL: Record<HeatLevel, string> = {
  bajo: 'Debe calentar sin burbujear con fuerza.',
  'medio-bajo': 'Debe burbujear suavemente o chisporrotear muy leve.',
  medio: 'El aceite debe chisporrotear suavemente sin humear.',
  'medio-alto': 'Debe chisporrotear con claridad; reduce si empieza a humear.',
  alto: 'Fuego vivo; no lo dejes sin vigilar.',
};

const HEAT_TOKEN: Record<HeatLevel, string> = {
  bajo: 'bajo',
  'medio-bajo': 'medio-bajo',
  medio: 'medio',
  'medio-alto': 'medio-alto',
  alto: 'alto',
};

/** Rango de potencia orientativo según la placa del usuario (sin mostrar el máximo). */
export function stovePowerRange(
  heat: HeatLevel,
  stove: StovePowerPrefs,
): { lo: number; hi: number } {
  const span = stove.max - stove.min;
  const center = stove.min + span * HEAT_FRACTION[heat];
  const half = Math.max(0.5, span * 0.08);
  let lo = Math.round(center - half);
  let hi = Math.round(center + half);
  lo = Math.max(stove.min, lo);
  hi = Math.min(stove.max, hi);
  if (hi < lo) hi = lo;
  return { lo, hi };
}

/**
 * Orientación de potencia para principiantes.
 * Formato: "Fuego medio · potencia 7–8. Señal…"
 * Nunca añade "/14" ni "/máximo".
 */
export function heatGuidance(
  heat: HeatLevel,
  stove: StovePowerPrefs | null | undefined,
  level: CookingLevel,
): string {
  if (level !== 'beginner') return '';
  const signal = HEAT_SIGNAL[heat];
  if (!stove || stove.max <= stove.min) {
    return ` (${signal})`;
  }
  const { lo, hi } = stovePowerRange(heat, stove);
  const range = lo === hi ? `${lo}` : `${lo}–${hi}`;
  return ` · potencia ${range} (orientativo). ${signal}`;
}

const HEAT_MENTION_RE =
  /\b((?:a\s+)?fuego\s+)(medio\s*-\s*alto|medio\s*-\s*bajo|medio|bajo|alto)\b/gi;

function normalizeHeatToken(rawLevel: string): HeatLevel {
  const compact = rawLevel.replace(/\s+/g, '').toLowerCase();
  if (
    compact === 'medio-alto' ||
    compact === 'medio-bajo' ||
    compact === 'medio' ||
    compact === 'bajo' ||
    compact === 'alto'
  ) {
    return compact;
  }
  return 'medio';
}

/**
 * Sustituye menciones de fuego de forma segura (medio-alto / medio-bajo ANTES que medio).
 * Solo enriquece la PRIMERA mención para no duplicar potencia/señal.
 */
export function injectHeatHints(
  text: string,
  level: CookingLevel,
  stove: StovePowerPrefs | null | undefined,
): string {
  if (level !== 'beginner' || !text) return text;

  const normalized = text.replace(/[\u2010-\u2015\u2212]/g, '-');
  let replaced = false;

  return normalized.replace(HEAT_MENTION_RE, (_full, prefix: string, rawLevel: string) => {
    const heat = normalizeHeatToken(rawLevel);
    const label = `${prefix.trimEnd()} ${HEAT_TOKEN[heat]}`;
    if (replaced) return label;
    replaced = true;
    return `${label}${heatGuidance(heat, stove, level)}`;
  });
}

/** Orientación de heatLevel cuando el texto NO menciona ya el fuego. */
export function renderStructuredHeat(
  heat: HeatLevel | undefined,
  level: CookingLevel,
  stove: StovePowerPrefs | null | undefined,
): string {
  if (!heat || level !== 'beginner') return '';
  if (!stove || stove.max <= stove.min) {
    return `${HEAT_LABEL[heat]}. ${HEAT_SIGNAL[heat]} `;
  }
  const { lo, hi } = stovePowerRange(heat, stove);
  const range = lo === hi ? `${lo}` : `${lo}–${hi}`;
  return `${HEAT_LABEL[heat]} · potencia ${range} (orientativo). ${HEAT_SIGNAL[heat]} `;
}

/**
 * Integra la orientación de potencia UNA sola vez.
 * Si el texto ya dice "fuego medio-bajo…", se enriquece esa frase.
 * Si no, y hay heatLevel, se antepone una sola línea.
 * Nunca prefijo + inyección a la vez.
 */
export function composeStepHeatText(
  text: string,
  heat: HeatLevel | undefined,
  level: CookingLevel,
  stove: StovePowerPrefs | null | undefined,
): string {
  if (level !== 'beginner' || !text) return text;
  const normalized = text.replace(/[\u2010-\u2015\u2212]/g, '-');
  HEAT_MENTION_RE.lastIndex = 0;
  if (HEAT_MENTION_RE.test(normalized)) {
    HEAT_MENTION_RE.lastIndex = 0;
    return injectHeatHints(normalized, level, stove);
  }
  if (heat) {
    return `${renderStructuredHeat(heat, level, stove)}${normalized}`.trim();
  }
  return normalized;
}

export function recipeStepKey(
  recipeId: string,
  methodId: string,
  stepId: string,
): string {
  return `${recipeId}::${methodId}::${stepId}`;
}

export function displayDifficulty(d: string): string {
  if (d === 'elaborada' || d === 'avanzada') return 'Avanzada';
  if (d === 'media') return 'Media';
  return 'Fácil';
}

export function normalizeDifficulty(
  d: string | undefined,
): 'fácil' | 'media' | 'avanzada' {
  if (d === 'media') return 'media';
  if (d === 'avanzada' || d === 'elaborada') return 'avanzada';
  return 'fácil';
}
