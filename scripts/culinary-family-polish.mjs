/**
 * Repara textos intermediate/advanced truncados o con muletillas prohibidas.
 * No añade frases genéricas al final: reescribe el nivel completo.
 */

const LEVELS = ['beginner', 'intermediate', 'advanced'];

export const BANNED_FLUFF = [
  'Haz cortes de tamaño uniforme',
  'Ordena la preparación y homogeneiza el corte',
  'Gestiona la potencia para dorar',
  'Comprueba textura y sazón antes de pasar a la fase siguiente',
  'Ajusta el punto por señales visuales y textura, no solo por el reloj',
  'Comprueba la textura antes de continuar con el paso siguiente',
  'Prueba una pieza un minuto antes: debe ofrecer una resistencia ligera',
  'Controla el punto al dente por textura y liga con agua de cocción antes de servir',
  'Comprueba la pieza más gruesa: centro opaco, jugos claros y 74 °C',
  'Retira al alcanzar 74 °C en el centro y deja un reposo breve para conservar jugosidad',
];

const ONE_WORD = /^(Tostar|Montar|Mezclar|Servir|Emplata|Prep|Micro|Salmón|Pollo|Pisto|Pasta|Arroz|Huevos|Revuelto|Tortilla|Integrar|Sirve)\.?$/i;

function words(text) {
  return String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function hasFluff(text) {
  const t = String(text || '');
  return BANNED_FLUFF.some((p) => t.includes(p));
}

function stripFluff(text) {
  let t = String(text || '').trim();
  for (const p of BANNED_FLUFF) {
    t = t.replace(new RegExp(`\\s*${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^.!?]*[.!?]?`, 'g'), '');
  }
  return t.replace(/\s+/g, ' ').trim();
}

function firstSentences(text, n) {
  const parts = String(text || '').match(/[^.!?]+[.!?]+/g) || [text];
  return parts
    .slice(0, n)
    .join(' ')
    .trim();
}

function proteinIds(recipe) {
  return new Set((recipe.ingredients || []).map((i) => i.foodId));
}

function isProteinRecipe(recipe) {
  const p = proteinIds(recipe);
  return ['pollo', 'pavo', 'ternera', 'salmon', 'merluza', 'pescado-congelado'].some(
    (id) => p.has(id),
  );
}

function levelTooShort(text, level, step, recipe) {
  const t = (text || '').trim();
  if (!t) return true;
  if (ONE_WORD.test(t)) return true;
  if (words(t) <= 3) return true;
  if (level === 'beginner' && words(t) < 5 && /tost|sirv|mezcl/i.test(t)) return true;
  if (
    level !== 'beginner' &&
    words(t) <= 5 &&
    !/\d|min|°|fuego|sartén|olla|plancha|micro|horno|air/i.test(t)
  ) {
    return true;
  }
  if (
    isProteinRecipe(recipe) &&
    step.id === 'cook' &&
    /debe quedar caliente/i.test(t) &&
    !/74|°C|rosad|jugos|lascas|opaco|pincha/i.test(t)
  ) {
    return true;
  }
  return false;
}

function synthesizeIntermediate(beginner, step, _recipe) {
  const b = stripFluff(beginner);
  if (step.id === 'boil-pasta') {
    return firstSentences(b, 2) || b;
  }
  if (step.id === 'prep-rice' || step.id === 'cook-rice') {
    return firstSentences(b, 2) || b;
  }
  if (step.id === 'toast') {
    return 'Tuesta el pan hasta dorado uniforme y crujiente.';
  }
  if (words(b) >= 12) return firstSentences(b, 2);
  return b;
}

function synthesizeAdvanced(beginner, intermediate, _step) {
  const i = stripFluff(intermediate);
  const b = stripFluff(beginner);
  if (words(i) >= 6 && !hasFluff(i)) return i;
  if (words(b) >= 8) {
    const compact = b.length > 150 ? `${b.slice(0, 147).trim()}…` : b;
    if (words(compact) >= 6) return compact;
  }
  if (words(i) >= 4) return i;
  return b;
}

export function polishStep(step, recipe) {
  if (!step.text || typeof step.text === 'string') return false;
  let changed = false;
  const t = step.text;

  for (const level of LEVELS) {
    if (hasFluff(t[level])) {
      t[level] = stripFluff(t[level]);
      changed = true;
    }
  }

  const b = t.beginner || '';
  if (levelTooShort(t.intermediate, 'intermediate', step, recipe) || hasFluff(t.intermediate)) {
    const next = synthesizeIntermediate(b, step, recipe);
    if (next && next !== t.intermediate) {
      t.intermediate = next;
      changed = true;
    }
  }
  if (levelTooShort(t.advanced, 'advanced', step, recipe) || hasFluff(t.advanced)) {
    const next = synthesizeAdvanced(b, t.intermediate, step);
    if (next && next !== t.advanced) {
      t.advanced = next;
      changed = true;
    }
  }

  if (levelTooShort(t.beginner, 'beginner', step, recipe)) {
    /* keep beginner from source; polish only elevates upper levels */
  }

  return changed;
}

export function polishCatalog(catalog, { skipRecipeIds = new Set() } = {}) {
  let stepsPolished = 0;
  let recipesPolished = 0;
  for (const recipe of catalog) {
    if (skipRecipeIds.has(recipe.id)) continue;
    let touched = false;
    for (const method of recipe.methods || []) {
      for (const step of method.steps || []) {
        if (polishStep(step, recipe)) {
          stepsPolished += 1;
          touched = true;
        }
      }
    }
    if (touched) recipesPolished += 1;
  }
  return { stepsPolished, recipesPolished };
}
