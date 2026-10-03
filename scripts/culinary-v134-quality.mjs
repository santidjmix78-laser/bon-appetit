/**
 * Pasada de calidad culinaria v1.3.4.
 * - Reescribe Intermedio/Avanzado telegráficos en español natural (sin truncar Principiante).
 * - Añade método sartén (OR) a arroces solo-olla.
 * - Expande principiantes demasiado cortos en cocciones de proteína.
 * BLOQUEADO: generaba telegramas y desajustes método/texto.
 * Usar: node scripts/fix-levels-v134.mjs
 * Solo con FORCE_LEGACY_V134=1 se puede forzar este legado.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

if (process.env.FORCE_LEGACY_V134 !== '1') {
  console.error(
    '[BLOQUEADO] culinary-v134-quality.mjs desactivado. Usa: node scripts/fix-levels-v134.mjs',
  );
  process.exit(2);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.join(__dirname, '../src/data/recipes.catalog.ts');
const src = fs.readFileSync(catalogPath, 'utf8');
const match = src.match(
  /export const RECIPE_CATALOG: Recipe\[\] = (\[[\s\S]*\])\s*;/,
);
if (!match) throw new Error('No se pudo leer RECIPE_CATALOG');
const catalog = JSON.parse(match[1]);

const SKIP = new Set([
  'tortilla-patata',
  'patatas-sartén-huevo',
  'pollo-ajos',
  'salmon-plancha-simple',
  'pollo-horno-air',
  'ternera-cebolla',
  'pollo-patatas-combo',
]);

function wc(t) {
  return String(t || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function looksTelegram(text) {
  const t = String(text || '').trim();
  if (!t) return true;
  if (wc(t) <= 5) return true;
  if (/^(Pollo|Huevos|Patatas|Arroz|Pasta|Coordina|Sellar|Saltear|Micro)\b/i.test(t)) {
    return true;
  }
  if (/;\s*coordina/i.test(t)) return true;
  if (/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9 °~\-–]+;\s*[a-z].{0,20}$/.test(t) && wc(t) <= 8) {
    return true;
  }
  return false;
}

function naturalFromBeginner(beginner, level) {
  let t = String(beginner || '').trim();
  if (!t) return t;

  // Quitar explicaciones muy pedagógicas para avanzado/intermedio
  t = t
    .replace(/Ese corte se llama juliana\.?/gi, '')
    .replace(/Sofreír es cocinar[^.]*\./gi, '')
    .replace(/\(como fichas de póker finas\)/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (level === 'intermediate') {
    // Compactar sin telegráfos: conservar tiempos, fuego y punto
    return t
      .replace(/unos /gi, '')
      .replace(/aproximadamente /gi, '')
      .replace(/Ten [^.]*a mano\.?/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // advanced: más conciso pero frases completas
  let adv = t
    .replace(/Usa una sartén amplia\.?/gi, '')
    .replace(/Calienta[^.]*\.\s*/i, '')
    .replace(/Si se tuesta demasiado rápido, baja el fuego\.?/gi, '')
    .replace(/Prueba la sal y /gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Si quedó demasiado corto o sin verbo conjugado útil, volver al intermedio
  if (wc(adv) < 8 || looksTelegram(adv)) {
    adv = t;
  }
  // Asegurar cierre con punto
  if (adv && !/[.!?]$/.test(adv)) adv += '.';
  return adv;
}

function expandShortProteinBeginner(step, recipe) {
  const id = `${step.id} ${step.phaseId || ''} ${step.timerLabel || ''}`.toLowerCase();
  const foods = (recipe.ingredients || []).map((i) => i.foodId).join(' ');
  if (wc(step.text?.beginner) >= 20) return false;

  if (/beef|ternera|salteado-ternera/.test(id + recipe.id)) {
    step.text = {
      beginner:
        'Sube a fuego medio-alto. Añade la ternera en tiras en una sola capa. Cocina 4–5 min removiendo. Está lista cuando se dore por fuera; el centro puede quedar jugoso. Sala y sirve.',
      intermediate:
        'A fuego medio-alto, cocina la ternera en tiras 4–5 min hasta el punto deseado; sala y sirve.',
      advanced:
        'Saltea la ternera 4–5 min a fuego medio-alto al punto; sala y sirve.',
    };
    return true;
  }
  if (/chicken|pollo|pavo/.test(id) && /pollo|pavo/.test(foods)) {
    const name = foods.includes('pavo') ? 'pavo' : 'pollo';
    step.text = {
      beginner: `Calienta la sartén con aceite a fuego medio-alto. Cocina el ${name} removiendo hasta que no quede rosado por dentro (abre un trozo; los jugos deben salir claros). Sala y continúa con el siguiente paso o sirve.`,
      intermediate: `Cocina el ${name} a fuego medio-alto hasta que esté hecho por dentro; sala.`,
      advanced: `Cocina el ${name} a fuego medio-alto al punto seguro; sala.`,
    };
    return true;
  }
  if (/egg|huevo|revuelto|tortilla/.test(id) && foods.includes('huevos')) {
    step.text = {
      beginner:
        'Bate los huevos con una pizca de sal. Vierte en la sartén a fuego medio-bajo y remueve (o cuaja sin remover, según el plato) hasta el punto deseado. Sirve al momento.',
      intermediate:
        'Cocina los huevos a fuego medio-bajo hasta el punto deseado y sirve.',
      advanced:
        'Cocina los huevos a fuego medio-bajo al punto y sirve.',
    };
    return true;
  }
  return false;
}

function fixStepLevels(step) {
  if (!step.text || typeof step.text === 'string') return false;
  const b = step.text.beginner || '';
  let i = step.text.intermediate || '';
  let a = step.text.advanced || '';
  let changed = false;

  if (!b) return false;

  if (!i || looksTelegram(i) || i === b) {
    const next = naturalFromBeginner(b, 'intermediate');
    if (next && next !== i && !looksTelegram(next)) {
      step.text.intermediate = next.endsWith('.') ? next : `${next}.`;
      changed = true;
      i = step.text.intermediate;
    }
  }

  if (!a || looksTelegram(a) || a === b || a === i) {
    const next = naturalFromBeginner(b, 'advanced');
    if (next && !looksTelegram(next)) {
      step.text.advanced = next.endsWith('.') ? next : `${next}.`;
      changed = true;
    } else if (i && !looksTelegram(i)) {
      // Avanzado = intermedio ligeramente más corto, no fragmento
      step.text.advanced = i;
      changed = true;
    }
  }

  return changed;
}

function cloneStepsForSarten(steps) {
  return JSON.parse(JSON.stringify(steps)).map((s) => {
    if (!s.text || typeof s.text === 'string') return s;
    const rewrite = (t) =>
      String(t || '')
        .replace(/\bola\b/gi, 'sartén o cazo amplio')
        .replace(/En una olla mediana/gi, 'En una sartén honda o cazo amplio')
        .replace(/olla mediana/gi, 'sartén honda');
    return {
      ...s,
      text: {
        beginner: rewrite(s.text.beginner),
        intermediate: rewrite(s.text.intermediate),
        advanced: rewrite(s.text.advanced),
      },
    };
  });
}

let levelFixes = 0;
let proteinFixes = 0;
let riceMethods = 0;

for (const recipe of catalog) {
  if (SKIP.has(recipe.id)) continue;

  for (const meth of recipe.methods || []) {
    for (const step of meth.steps || []) {
      if (expandShortProteinBeginner(step, recipe)) proteinFixes += 1;
      if (fixStepLevels(step)) levelFixes += 1;
    }
  }

  // Arroces solo-olla: añadir método sartén como alternativa OR
  if (
    /^arroz-/.test(recipe.id) &&
    (recipe.methods || []).length === 1 &&
    recipe.methods[0].id === 'olla'
  ) {
    const olla = recipe.methods[0];
    const sartenMethod = {
      id: 'sarten',
      label: 'Sartén / cazo',
      equipmentIds: ['sarten', 'vitro'],
      timeMinutes: olla.timeMinutes,
      steps: cloneStepsForSarten(olla.steps || []),
    };
    recipe.methods.push(sartenMethod);
    riceMethods += 1;
  }
}

const header = src.slice(0, match.index);
fs.writeFileSync(
  catalogPath,
  `${header}export const RECIPE_CATALOG: Recipe[] = ${JSON.stringify(catalog, null, 2)};\n`,
);

console.log(
  JSON.stringify(
    {
      recipes: catalog.length,
      levelFixes,
      proteinFixes,
      riceMethodsAdded: riceMethods,
    },
    null,
    2,
  ),
);
