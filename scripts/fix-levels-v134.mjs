/**
 * Corrección v1.3.4 (post-pruebas): elimina telegramas I/A y desajustes método/texto.
 *
 * CAUSA REAL de los telegramas:
 * 1) recipeOverrides.ts escribió Intermedio/Avanzado como notas ("Cebolla en juliana; …").
 * 2) culinary-v134-quality.mjs "arreglaba" Avanzado telegráfico copiando Principiante
 *    (fallback) o dejando Intermedio nominal sin verbo.
 * 3) expandShortProteinBeginner inyectó texto de SARTÉN en métodos Air Fryer/horno/micro.
 *
 * Este script:
 * - Reescribe I/A en español natural completo (NO truncado de Principiante).
 * - Corrige cocciones cuyo texto habla de sartén/fuego cuando el método es air/horno/micro.
 * - Nunca deja advanced === beginner como "solución".
 *
 * Ejecutar (escribe catálogo): CONFIRM_CATALOG_WRITE=1 node scripts/fix-levels-v134.mjs
 * Dry-run (solo conteo): node scripts/fix-levels-v134.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WRITE = process.env.CONFIRM_CATALOG_WRITE === '1';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.join(__dirname, '../src/data/recipes.catalog.ts');
const src = fs.readFileSync(catalogPath, 'utf8');
const match = src.match(
  /export const RECIPE_CATALOG: Recipe\[\] = (\[[\s\S]*\])\s*;/,
);
if (!match) throw new Error('No se pudo leer RECIPE_CATALOG');
const catalog = JSON.parse(match[1]);

/** Overrides runtime: no tocar su base en catálogo si el override manda (igual reescribimos catálogo). */
const OVERRIDE_IDS = new Set([
  'tortilla-patata',
  'patatas-sartén-huevo',
  'pollo-ajos',
  'salmon-plancha-simple',
  'pollo-horno-air',
  'ternera-cebolla',
  'pollo-patatas-combo',
  'salmon-micro',
  'pollo-congelado-air',
]);

const VERB_RE =
  /\b(corta|cortar|pela|pelar|lava|lavar|seca|secar|añade|añadir|incorpora|calienta|calentar|cocina|cocinar|cuece|freír|fríe|sofre|sofríe|saltea|saltear|pocha|pochar|mezcla|mezclar|bate|batir|vierte|tapa|tapar|destapa|remueve|remover|gira|girar|voltea|agita|sirve|servir|coloca|colocar|extiende|precalienta|precalentar|programa|hornea|asa|unta|sazona|sazonar|comprueba|deja|reposa|escurr|pincha|abre|monta|aliña|hidrata|hierve|lleva|baja|sube|aparta|retira|integra|prueba|saca|dispone|reparte|cuaja|dobla|enrolla|tuesta)\w*\b/i;

function wc(t) {
  return String(t || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function isTelegram(text) {
  const t = String(text || '').trim();
  if (!t) return true;
  if (wc(t) <= 6) return true;
  // Nominal / lista con ;
  if (/;/.test(t) && !VERB_RE.test(t)) return true;
  if (!VERB_RE.test(t) && wc(t) <= 14) return true;
  // "Salmón en plato, sazonado, tapado."
  if (
    /^[A-ZÁÉÍÓÚÑ][\wáéíóúñÁÉÍÓÚÑ\s\-–~°/]+,\s*[\wáéíóúñ\s]+,\s*[\wáéíóúñ\s]+\.?$/i.test(
      t,
    ) &&
    !VERB_RE.test(t)
  ) {
    return true;
  }
  if (
    /^(Pollo|Huevos|Patatas|Arroz|Pasta|Salmón|Salmon|Cebolla|Ternera|Coordina)\b/i.test(
      t,
    ) &&
    wc(t) <= 10
  ) {
    return true;
  }
  return false;
}

function methodKind(method) {
  const id = (method.id || '').toLowerCase();
  const label = (method.label || '').toLowerCase();
  const eq = (method.equipmentIds || []).join(' ').toLowerCase();
  const blob = `${id} ${label} ${eq}`;
  const hasAir = /air|airfryer/.test(blob);
  const hasHorno = /horno/.test(blob);
  const hasMicro = /micro/.test(blob);
  const hasSarten = /sarten|sartén|plancha/.test(blob);
  const hasOlla = /olla/.test(blob);
  // Multi-equipo real (p. ej. patatas AF + pollo sartén): no forzar un solo aparato.
  if ((hasAir || hasHorno || hasMicro) && (hasSarten || hasOlla)) return 'combo';
  if (hasAir) return 'air';
  if (hasHorno) return 'horno';
  if (hasMicro) return 'micro';
  if (/plancha/.test(blob)) return 'plancha';
  if (hasOlla && !hasSarten) return 'olla';
  if (hasSarten || /combo/.test(blob)) return 'sarten';
  if (/tostadora|none|manual/.test(blob)) return 'other';
  return 'other';
}

function textMentionsWrongAppliance(text, kind) {
  const t = String(text || '').toLowerCase();
  if (kind === 'air' || kind === 'horno' || kind === 'micro') {
    if (/sartén|sarten|fuego medio|fuego alto|fuego bajo|plancha/.test(t)) {
      // Allow combo recipes that mention both intentionally
      if (/air fryer|airfryer|cesta|horno|microondas|microondas|bandeja/.test(t)) {
        return false;
      }
      return true;
    }
  }
  return false;
}

function rewriteNatural(beginner, level, ctx) {
  const b = String(beginner || '').trim();
  if (!b) return '';

  // Quitar pedagogía de principiante
  let base = b
    .replace(/Ese corte se llama juliana\.?/gi, '')
    .replace(/Esta cocción[^.]*\./gi, '')
    .replace(/Sofreír es[^.]*\./gi, '')
    .replace(/a esto se le llama sellar\.?/gi, '')
    .replace(/\(como fichas de póker finas\)/gi, '')
    .replace(/Ten [^.]*a mano\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (level === 'intermediate') {
    // Compactar levemente pero conservar verbos y datos
    let i = base
      .replace(/unos /gi, '')
      .replace(/aproximadamente /gi, '')
      .replace(/Si se tuesta demasiado rápido, baja el fuego\.?/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!/[.!?]$/.test(i)) i += '.';
    if (isTelegram(i) || !VERB_RE.test(i)) {
      i = ensureVerbSentence(base, ctx, 'intermediate');
    }
    return i;
  }

  // advanced: más corto, frases completas
  let a = base
    .replace(/Usa una sartén amplia\.?/gi, '')
    .replace(/Remueve cada minuto\.?/gi, '')
    .replace(/Remueve cada 2–3 min\.?/gi, '')
    .replace(/Si [^.]*\./g, '')
    .replace(/Prueba la sal y /gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Acortar pedagogía residual pero NO dejar nominal
  if (wc(a) > 40) {
    // quedarse con primeras 2 frases si hay punto
    const parts = a.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (parts.length >= 2) a = parts.slice(0, 2).join(' ');
  }
  if (!/[.!?]$/.test(a)) a += '.';
  if (isTelegram(a) || !VERB_RE.test(a) || a === b) {
    a = ensureVerbSentence(base, ctx, 'advanced');
  }
  // Nunca idéntico a beginner si beginner es largo pedagógico
  if (a === b && wc(b) > 25) {
    a = ensureVerbSentence(base, ctx, 'advanced');
  }
  return a;
}

function ensureVerbSentence(base, ctx, level) {
  const kind = ctx.kind;
  const food = ctx.mainFood || 'el alimento';
  const lower = base.toLowerCase();

  if (kind === 'micro') {
    if (level === 'advanced') {
      return `Coloca ${food} en un recipiente apto para microondas, sazónalo y cúbrelo parcialmente. Cocina a potencia media hasta el punto y deja reposar un minuto.`;
    }
    return `Coloca ${food} en un plato apto para microondas, sazona y tapa parcialmente. Cocina a potencia media hasta el punto deseado y deja reposar 1 minuto.`;
  }
  if (kind === 'air') {
    if (level === 'advanced') {
      return `Distribuye ${food} en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro.`;
    }
    return `Coloca ${food} en una sola capa en el Air Fryer. Cocina a la temperatura indicada, agita o voltea a mitad, y comprueba que quede dorado por fuera y cocinado por dentro.`;
  }
  if (kind === 'horno') {
    if (level === 'advanced') {
      return `Hornea ${food} a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción.`;
    }
    return `Precalienta el horno si hace falta, dispone ${food} en bandeja y hornea a la temperatura indicada hasta el punto, volteando a mitad cuando corresponda.`;
  }

  // genérico sartén/olla a partir del beginner
  if (VERB_RE.test(base)) {
    const short =
      level === 'advanced'
        ? base.split(/(?<=[.!?])\s+/).slice(0, 2).join(' ')
        : base;
    return short.endsWith('.') ? short : `${short}.`;
  }
  return `Prepara y cocina ${food} según el método, respetando tiempos y el punto de cocción.`;
}

function mainFood(recipe, step) {
  const skip = new Set(['aceite', 'sal', 'pimienta', 'agua']);
  // Preferir el alimento del paso (id/phase/timer), NO el primer ingrediente de la receta.
  // (Bug histórico: huevos-patata-micro/potato → plantilla micro con "huevos".)
  const blob = `${step?.id || ''} ${step?.phaseId || ''} ${step?.timerLabel || ''}`.toLowerCase();
  const byStep = [
    [/patata|potato/, 'patata'],
    [/huevo|egg/, 'huevo'],
    [/arroz|rice/, 'arroz'],
    [/salmon|salm/, 'salmón'],
    [/pollo|chicken/, 'pollo'],
    [/ternera|beef/, 'ternera'],
    [/pasta/, 'pasta'],
  ];
  for (const [re, name] of byStep) {
    if (re.test(blob)) return name;
  }
  const ing = (recipe.ingredients || []).find((i) => !skip.has(i.foodId));
  return ing ? ing.foodId.replace(/-/g, ' ') : 'el alimento';
}

function airFryerCookTexts(recipe, step) {
  const food = mainFood(recipe, step);
  const temp = 180;
  const mins = recipe.timeMinutes && recipe.timeMinutes <= 30 ? recipe.timeMinutes : 22;
  return {
    beginner: `Si tu Air Fryer lo recomienda, precalienta a ${temp} °C unos 3 minutos. Coloca el ${food} en una sola capa en la cestilla (sin amontonar). Cocina unos ${mins} minutos a ${temp} °C; a mitad de tiempo, dale la vuelta o agita. Está listo cuando esté bien caliente por dentro y dorado por fuera (abre el trozo más grueso: sin zonas frías ni rosadas en pollo).`,
    intermediate: `Cocina el ${food} en Air Fryer a ${temp} °C unos ${mins} minutos en una sola capa, volteando a mitad, hasta dorado y cocinado por dentro.`,
    advanced: `Cocina el ${food} en Air Fryer a ${temp} °C unos ${mins} minutos en capa única, con volteo a mitad, hasta dorado y punto seguro por dentro.`,
  };
}

function microSalmonTexts() {
  return {
    prep: {
      beginner:
        'Coloca {qty:salmon} en un plato apto para microondas. Sala. Tapa parcialmente (papel film agujereado o tapa entreabierta) para que no salpique.',
      intermediate:
        'Coloca el salmón en un plato apto para microondas, sazónalo y cúbrelo parcialmente para evitar salpicaduras.',
      advanced:
        'Coloca el salmón en un recipiente apto para microondas, sazónalo y cúbrelo parcialmente.',
    },
    cook: {
      beginner:
        'Microondas a potencia media 2 min. Comprueba: si el centro sigue muy traslúcido, 30–60 s más. Está listo cuando se separa en lascas y el centro está opaco-rosado, no crudo rojo. Deja 1 min en reposo y sirve.',
      intermediate:
        'Cocina a potencia media 2–3 minutos hasta que se separe en lascas; deja reposar 1 minuto y sirve.',
      advanced:
        'Cocina a potencia media 2–3 minutos hasta lascas; reposa 1 minuto y sirve.',
    },
  };
}

let stats = {
  intermediateFixed: 0,
  advancedFixed: 0,
  beginnerFixed: 0,
  methodMismatchFixed: 0,
  skippedOverrideBase: 0,
};

for (const recipe of catalog) {
  // Handcraft salmon-micro (también tiene override runtime)
  if (recipe.id === 'salmon-micro') {
    const m = microSalmonTexts();
    for (const meth of recipe.methods || []) {
      for (const s of meth.steps || []) {
        if (s.id === 'prep' || s.phaseId === 'prep') {
          s.text = { ...m.prep };
          stats.intermediateFixed += 1;
          stats.advancedFixed += 1;
        }
        if (s.id === 'cook' || s.phaseId === 'cook') {
          s.text = { ...m.cook };
          stats.intermediateFixed += 1;
          stats.advancedFixed += 1;
        }
      }
    }
    continue;
  }

  // Handcraft pollo-congelado-air
  if (recipe.id === 'pollo-congelado-air') {
    for (const meth of recipe.methods || []) {
      if (methodKind(meth) !== 'air') continue;
      for (const s of meth.steps || []) {
        if (s.id === 'prep' || s.phaseId === 'prep') {
          s.text = {
            beginner:
              'Saca el pollo congelado del envase. Úntalo ligeramente con aceite y sal (aunque esté congelado). Ten lista la cestilla del Air Fryer.',
            intermediate:
              'Unta el pollo congelado con aceite y sal y prepara la cestilla del Air Fryer.',
            advanced:
              'Unta el pollo congelado con aceite y sal; cestilla lista.',
          };
          // advanced still needs verb - fix
          s.text.advanced =
            'Unta el pollo congelado con aceite y sal y déjalo listo para la cestilla.';
          stats.beginnerFixed += 1;
          stats.intermediateFixed += 1;
          stats.advancedFixed += 1;
        }
        if (s.id === 'cook' || s.phaseId === 'cook') {
          s.text = airFryerCookTexts(recipe, s);
          s.temperatureC = s.temperatureC || 180;
          s.timerSeconds = s.timerSeconds || 1320;
          s.timerLabel = s.timerLabel || 'Air Fryer';
          s.similarKey = s.similarKey || 'pollo-congelado+airfryer+180C';
          delete s.heatLevel; // no stove heat for AF
          stats.methodMismatchFixed += 1;
          stats.intermediateFixed += 1;
          stats.advancedFixed += 1;
        }
      }
    }
    continue;
  }

  // Overrides runtime: fuente de verdad (salvo salmon/pollo AF ya tratados y ternera).
  if (
    OVERRIDE_IDS.has(recipe.id) &&
    recipe.id !== 'ternera-cebolla'
  ) {
    stats.skippedOverrideBase += 1;
    continue;
  }

  for (const meth of recipe.methods || []) {
    const kind = methodKind(meth);
    for (const step of meth.steps || []) {
      if (!step.text || typeof step.text === 'string') continue;
      const food = mainFood(recipe, step);
      let b = step.text.beginner || '';
      let i = step.text.intermediate || '';
      let a = step.text.advanced || '';

      // Method mismatch: AF/horno/micro PURO con texto de sartén/fuego
      if (
        kind !== 'combo' &&
        (textMentionsWrongAppliance(b, kind) ||
          textMentionsWrongAppliance(i, kind) ||
          textMentionsWrongAppliance(a, kind))
      ) {
        if (kind === 'air') {
          step.text = airFryerCookTexts(recipe, step);
          delete step.heatLevel;
          step.temperatureC = step.temperatureC || 180;
          stats.methodMismatchFixed += 1;
          b = step.text.beginner;
          i = step.text.intermediate;
          a = step.text.advanced;
        } else if (kind === 'horno') {
          const mins = recipe.timeMinutes || 25;
          step.text = {
            beginner: `Precalienta el horno a 200 °C. Coloca ${food} en una bandeja en una sola capa. Hornea unos ${mins} minutos; da la vuelta a mitad. Comprueba el punto (en pollo: sin rosa dentro / jugos claros).`,
            intermediate: `Hornea ${food} a 200 °C unos ${mins} minutos, volteando a mitad, hasta el punto de cocción.`,
            advanced: `Hornea ${food} a 200 °C unos ${mins} minutos con volteo a mitad hasta el punto.`,
          };
          delete step.heatLevel;
          step.temperatureC = step.temperatureC || 200;
          stats.methodMismatchFixed += 1;
          b = step.text.beginner;
          i = step.text.intermediate;
          a = step.text.advanced;
        } else if (kind === 'micro') {
          step.text = {
            beginner: `Coloca ${food} en un recipiente apto para microondas, sazona y tapa parcialmente. Cocina a potencia media por intervalos cortos hasta el punto.`,
            intermediate: `Cocina ${food} al microondas a potencia media, tapado parcialmente, hasta el punto deseado.`,
            advanced: `Cocina ${food} al microondas a potencia media hasta el punto.`,
          };
          delete step.heatLevel;
          stats.methodMismatchFixed += 1;
          b = step.text.beginner;
          i = step.text.intermediate;
          a = step.text.advanced;
        }
      }

      const ctx = { kind, mainFood: food };

      if (!b) continue;

      if (isTelegram(i) || i === b) {
        step.text.intermediate = rewriteNatural(b, 'intermediate', ctx);
        stats.intermediateFixed += 1;
        i = step.text.intermediate;
      }

      if (isTelegram(a) || a === b || a === i) {
        let next = rewriteNatural(b, 'advanced', ctx);
        // Evitar advanced === beginner
        if (next === b) {
          next = ensureVerbSentence(b, ctx, 'advanced');
        }
        step.text.advanced = next;
        stats.advancedFixed += 1;
      }

      // Última pasada: si intermediate sigue telegram
      if (isTelegram(step.text.intermediate)) {
        step.text.intermediate = ensureVerbSentence(b, ctx, 'intermediate');
        stats.intermediateFixed += 1;
      }
      if (isTelegram(step.text.advanced) || step.text.advanced === b) {
        step.text.advanced = ensureVerbSentence(b, ctx, 'advanced');
        stats.advancedFixed += 1;
      }
    }
  }

}

if (!WRITE) {
  console.log(
    JSON.stringify(
      { dryRun: true, write: false, hint: 'CONFIRM_CATALOG_WRITE=1 para escribir', ...stats },
      null,
      2,
    ),
  );
  process.exit(0);
}

const header = src.slice(0, match.index);
fs.writeFileSync(
  catalogPath,
  `${header}export const RECIPE_CATALOG: Recipe[] = ${JSON.stringify(catalog, null, 2)};\n`,
);
console.log(JSON.stringify({ dryRun: false, write: true, ...stats }, null, 2));
