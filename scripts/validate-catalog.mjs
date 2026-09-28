/**
 * Valida src/data/recipes.catalog.ts — falla (exit 1) si hay problemas de calidad (§16).
 * Ejecutar: node scripts/validate-catalog.mjs
 * Las revisiones clave viven también en recipeOverrides.ts (runtime).
 */
import { readFileSync } from 'fs';

const ALLOWED_TERMS = new Set([
  'marinar',
  'pochar',
  'sofreir',
  'sellar',
  'reducir',
  'saltear',
  'blanquear',
  'gratinar',
  'al-dente',
  'reposar',
  'juliana',
  'confitar',
  'rehogar',
  'emulsionar',
]);

const TERM_ROOTS = {
  marinar: /marin/i,
  pochar: /poch/i,
  sofreir: /sofr[íi]/i,
  sellar: /sell/i,
  reducir: /reduc/i,
  saltear: /salte/i,
  blanquear: /blanque/i,
  gratinar: /gratin/i,
  'al-dente': /al dente/i,
  reposar: /repos/i,
  juliana: /juliana/i,
  confitar: /confit/i,
  rehogar: /rehog/i,
  emulsionar: /emulsion/i,
};

const BANNED = [
  /componentes principales/i,
  /carnes y pescados/i,
  /si hay guarnición/i,
  /cocina o monta y sirve/i,
  /^prepara los ingredientes\.?$/i,
  /^mise en place\.?$/i,
  /Haz cortes de tamaño uniforme/i,
  /Gestiona la potencia para dorar/i,
  /Ordena la preparación y homogeneiza el corte/i,
];

const FLUFF_APPEND = [
  /Comprueba textura y sazón antes de pasar a la fase siguiente/i,
  /Ajusta el punto por señales visuales y textura, no solo por el reloj/i,
];

const TOO_SHORT =
  /^(Huevos|Patatas|Cocinar|Servir|Prep\.?|Micro\.?|Mezclar\.?|Tostar\.?|Montar\.?|Emplata\.?|Integrar\.?|Sirve\.?)\.?$/i;

const PROTEIN_FOODS = new Set([
  'pollo',
  'pavo',
  'ternera',
  'salmon',
  'merluza',
  'pescado-congelado',
  'pollo-congelado',
]);

const foodsSrc = readFileSync('./src/data/foods.ts', 'utf8');
const foodIds = new Set([...foodsSrc.matchAll(/id: '([^']+)'/g)].map((m) => m[1]));

const catSrc = readFileSync('./src/data/recipes.catalog.ts', 'utf8');
const catMatch = catSrc.match(
  /export const RECIPE_CATALOG: Recipe\[\] = (\[[\s\S]*\])\s*;/,
);
if (!catMatch) {
  console.error('No se pudo parsear RECIPE_CATALOG como JSON.');
  process.exit(1);
}
/** @type {import('../src/types').Recipe[]} */
const catalog = JSON.parse(catMatch[1]);

/** Overrides runtime: validar catálogo base; overrides se validan aparte si hay patch embebido */
const overrideIds = new Set();
try {
  const ov = readFileSync('./src/data/recipeOverrides.ts', 'utf8');
  for (const m of ov.matchAll(/^\s*'([^']+)':\s*\{/gm)) overrideIds.add(m[1]);
} catch {
  /* ignore */
}

const errors = [];
const warnings = [];

function stepTexts(step) {
  if (typeof step.text === 'string') return { beginner: step.text, intermediate: step.text, advanced: step.text };
  const t = step.text || {};
  return { beginner: t.beginner, intermediate: t.intermediate, advanced: t.advanced };
}

function wordCount(s) {
  return (s || '').trim().split(/\s+/).filter(Boolean).length;
}

function checkBanned(text, ctx) {
  for (const re of BANNED) {
    if (re.test(text.trim())) {
      errors.push(`${ctx}: frase genérica prohibida (${re})`);
    }
  }
  for (const re of FLUFF_APPEND) {
    if (re.test(text.trim())) {
      errors.push(`${ctx}: muletilla de relleno prohibida (${re})`);
    }
  }
}

function timerLooksHeuristic(timerSeconds, timeMinutes) {
  if (timerSeconds == null || timeMinutes == null) return false;
  const target = timeMinutes * 40;
  return Math.abs(timerSeconds - target) <= 2;
}

function recipeHasProtein(r) {
  return (r.ingredients || []).some((i) => PROTEIN_FOODS.has(i.foodId));
}

function stepMentionsProteinCook(text) {
  return /pollo|pavo|ternera|salmón|salmon|merluza|pescado|filete|pechuga/i.test(text || '');
}

function hasDonenessCue(text) {
  return /74\s*°|52|55|60|63|rosad|jugos claros|lascas|opaco|pincha|cuajad|centro|°C|termómetro|sonda/i.test(
    text || '',
  );
}

function isVagueProteinOnly(text) {
  return (
    /debe quedar caliente/i.test(text || '') &&
    !hasDonenessCue(text) &&
    !/dorad|crisp|tiern|al dente/i.test(text || '')
  );
}

function levelTooShort(text, level, isCookStep, hasProtein, stepId) {
  const t = (text || '').trim();
  if (!t) return level !== 'beginner' || isCookStep;
  if (TOO_SHORT.test(t)) return true;
  if (wordCount(t) <= 2) return true;
  const isServe =
    /^(serve|finish|bowl|top)$/i.test(stepId) &&
    /sirve|emplat|monta|servir/i.test(t);
  if (level === 'advanced' && wordCount(t) <= 2) return true;
  // Avanzado conciso OK si tiene acción/tiempo/utensilio (≥4 palabras o dígito)
  if (
    level === 'advanced' &&
    wordCount(t) <= 4 &&
    !/\d|°|min|fuego|sartén|olla|plancha|micro|horno|air|seco|tiras|cubos|rodajas|sazon|escurr|listo|troce|lamin|aliñ|montar|servir/i.test(
      t,
    ) &&
    !isServe
  ) {
    return true;
  }
  if (level === 'beginner' && isCookStep && wordCount(t) < 8 && hasProtein && !isServe) {
    return true;
  }
  if (
    level === 'intermediate' &&
    isCookStep &&
    wordCount(t) < 6 &&
    hasProtein &&
    stepMentionsProteinCook(t) &&
    !hasDonenessCue(t)
  ) {
    return true;
  }
  if (
    level === 'intermediate' &&
    isCookStep &&
    wordCount(t) < 5 &&
    !/\d|min|°/i.test(t)
  ) {
    return true;
  }
  return false;
}

const seenIds = new Set();

for (const r of catalog) {
  const rctx = `Receta "${r.id}"`;
  const skipStrictLevels = overrideIds.has(r.id);

  if (seenIds.has(r.id)) errors.push(`${rctx}: id duplicado`);
  seenIds.add(r.id);

  if (!r.difficulty) errors.push(`${rctx}: falta difficulty`);
  else if (!['fácil', 'media', 'avanzada'].includes(r.difficulty)) {
    errors.push(`${rctx}: difficulty inválida "${r.difficulty}"`);
  }

  if (!r.dishRole) errors.push(`${rctx}: falta dishRole`);

  if (r.fodmap?.note && /demostrativa/i.test(r.fodmap.note)) {
    errors.push(`${rctx}: nota FODMAP contiene "demostrativa"`);
  }

  for (const ing of r.ingredients || []) {
    if (!foodIds.has(ing.foodId)) {
      errors.push(`${rctx}: foodId desconocido "${ing.foodId}"`);
    }
    if (ing.amountPerServing != null && ing.amountPerServing <= 0) {
      errors.push(`${rctx}: amountPerServing inválido en ${ing.foodId}`);
    }
  }

  const methods = r.methods || [];
  if (!methods.length) errors.push(`${rctx}: sin methods`);

  const hasProtein = recipeHasProtein(r);

  for (const method of methods) {
    const mctx = `${rctx} método "${method.id}"`;
    const steps = method.steps || [];
    if (!steps.length) errors.push(`${mctx}: sin pasos`);

    const phaseKeys = new Set();
    for (const step of steps) {
      const sctx = `${mctx} paso "${step.id}"`;
      const pk = `${method.id}::${step.id}`;
      if (phaseKeys.has(pk)) errors.push(`${sctx}: id de paso duplicado`);
      phaseKeys.add(pk);

      if (!step.phaseId) errors.push(`${sctx}: falta phaseId`);

      const texts = stepTexts(step);
      const isCookStep = /cook|boil|roast|airfry|fry|scramble|salmon|chicken|beef|sarten|plancha|simmer|garlic|sauce|finish|set-tortilla|wilt|omelette/i.test(
        step.id,
      );

      for (const [level, text] of Object.entries(texts)) {
        if (!text) {
          if (!skipStrictLevels && level !== 'beginner') {
            errors.push(`${sctx}: falta texto ${level}`);
          }
          continue;
        }
        checkBanned(text, `${sctx} (${level})`);

        if (!skipStrictLevels && levelTooShort(text, level, isCookStep, hasProtein, step.id)) {
          errors.push(`${sctx} (${level}): instrucción demasiado corta «${text.trim()}»`);
        } else if (!skipStrictLevels && wordCount(text) <= 5 && level === 'intermediate') {
          warnings.push(`${sctx} (${level}): texto muy corto «${text.trim()}»`);
        }

        if (
          !skipStrictLevels &&
          hasProtein &&
          isCookStep &&
          stepMentionsProteinCook(text) &&
          isVagueProteinOnly(text)
        ) {
          errors.push(`${sctx} (${level}): proteína sin señales de punto («debe quedar caliente»)`);
        }

        if (/\/\d{1,2}\b/.test(text) && /placa|potencia/i.test(text)) {
          warnings.push(`${sctx}: posible "/máximo" en texto de potencia`);
        }
      }

      for (const tid of step.termIds || []) {
        if (!ALLOWED_TERMS.has(tid)) {
          errors.push(`${sctx}: termId desconocido "${tid}"`);
        } else {
          const all = Object.values(texts).filter(Boolean).join(' ');
          if (!TERM_ROOTS[tid]?.test(all)) {
            errors.push(`${sctx}: termId "${tid}" no aparece en el texto del paso`);
          }
        }
      }

      if (step.temperatureC != null) {
        if (step.temperatureC < 120 || step.temperatureC > 260) {
          errors.push(`${sctx}: temperatureC fuera de rango (${step.temperatureC})`);
        }
      }

      if (step.timerSeconds != null) {
        if (!step.timerLabel) errors.push(`${sctx}: timerSeconds sin timerLabel`);
        if (timerLooksHeuristic(step.timerSeconds, r.timeMinutes)) {
          errors.push(
            `${sctx}: timerSeconds parece timeMinutes×40 (${step.timerSeconds})`,
          );
        }
        if (step.timerSeconds < 30 || step.timerSeconds > 7200) {
          errors.push(`${sctx}: timerSeconds absurdo (${step.timerSeconds})`);
        }
      }
    }
  }
}

const difficulty = { fácil: 0, media: 0, avanzada: 0 };
const dishRole = {};
for (const r of catalog) {
  difficulty[r.difficulty] = (difficulty[r.difficulty] || 0) + 1;
  dishRole[r.dishRole] = (dishRole[r.dishRole] || 0) + 1;
}

const summary = {
  recipes: catalog.length,
  errors: errors.length,
  warnings: warnings.length,
  difficulty,
  dishRole,
  overrideIdsSkippedStrict: [...overrideIds],
};

if (errors.length) {
  console.error(JSON.stringify(summary, null, 2));
  console.error('\nErrores:');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, ...summary }, null, 2));
if (warnings.length) {
  console.log('\nAvisos:');
  for (const w of warnings) console.log(' -', w);
}
