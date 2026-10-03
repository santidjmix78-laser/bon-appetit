/**
 * Parche acotado (puede sobrescribir catálogo).
 * Escribe solo con: CONFIRM_CATALOG_WRITE=1 node scripts/fix-residual-safe.mjs
 * Requiere: scripts/_ov_audit.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WRITE = process.env.CONFIRM_CATALOG_WRITE === '1';
if (!WRITE) {
  console.error(
    '[BLOQUEADO] fix-residual-safe.mjs no escribe sin CONFIRM_CATALOG_WRITE=1',
  );
  process.exit(2);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const bundlePath = path.join(__dirname, '_ov_audit.mjs');
if (!fs.existsSync(bundlePath)) {
  console.error('Falta scripts/_ov_audit.mjs');
  process.exit(1);
}

const ovMod = await import(`file://${bundlePath.replace(/\\/g, '/')}?t=${Date.now()}`);
const overrides = ovMod.RECIPE_QUALITY_OVERRIDES;
if (!overrides) throw new Error('Sin overrides');

const catalogPath = path.join(root, 'src/data/recipes.catalog.ts');
const src = fs.readFileSync(catalogPath, 'utf8');
const match = src.match(/export const RECIPE_CATALOG: Recipe\[\] = (\[[\s\S]*\])\s*;/);
if (!match) throw new Error('No catalog');
const catalog = JSON.parse(match[1]);

const GENERIC = /Prepara y cocina .+ según el método/i;

function wc(t) {
  return String(t || '').trim().split(/\s+/).filter(Boolean).length;
}

function naturalFromBeginner(b, level) {
  let base = String(b || '')
    .replace(/Ese corte se llama juliana\.?/gi, '')
    .replace(/Esta cocción[^.]*\./gi, '')
    .replace(/Sofreír es[^.]*\./gi, '')
    .replace(/a esto se le llama sellar\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!base) return '';
  if (level === 'intermediate') {
    let i = base.replace(/aproximadamente /gi, '').trim();
    if (!/[.!?]$/.test(i)) i += '.';
    return i;
  }
  const parts = base.split(/(?<=[.!?])\s+/).filter(Boolean);
  let a = parts.slice(0, Math.min(2, parts.length)).join(' ');
  if (!/[.!?]$/.test(a)) a += '.';
  return a;
}

/** Reemplazos explícitos para residuales conocidos (solo si el texto actual es malo). */
const HAND = {
  'bocadillo-jamon-tomate/none/assemble': {
    intermediate: 'Monta el bocadillo con jamón y tomate sobre el pan.',
    advanced: 'Monta el bocadillo con jamón y tomate.',
  },
  'ensalada-garbanzos/none/prep': {
    intermediate: 'Escurre los garbanzos y añade el tomate en cubos.',
    advanced: 'Escurre los garbanzos e incorpora el tomate en cubos.',
  },
  'ensalada-maiz-tomate/none/prep': {
    intermediate: 'Mezcla el maíz escurrido con el tomate y la lechuga.',
    advanced: 'Mezcla el maíz, el tomate y la lechuga.',
  },
  'pasta-ajo-aceite/olla/garlic-oil': {
    advanced: 'Sofríe el ajo en aceite a fuego medio sin quemarlo y mezcla con la pasta.',
  },
  'merluza-sarten/sarten/prep': {
    advanced: 'Seca y sazona el filete; descongela antes si hace falta.',
  },
  'guisantes-jamon/sarten/prep': {
    intermediate: 'Ten listos los guisantes y el jamón troceado antes de saltear.',
    advanced: 'Prepara guisantes y jamón troceado antes de empezar.',
  },
  'verduras-mixtas-salteado/sarten/prep': {
    intermediate: 'Lava y corta las verduras en trozos similares para saltear.',
    advanced: 'Corta las verduras en trozos uniformes y tenlas listas.',
  },
  'espinacas-ajos-huevo/sarten/spinach': {
    advanced: 'Añade las espinacas y cocina 1–2 minutos hasta que mengüen.',
  },
  'sopa-verduras-rapida/olla/simmer': {
    intermediate: 'Cuece las verduras a fuego medio hasta que estén tiernas.',
    advanced: 'Cuece las verduras hasta que queden tiernas.',
  },
  'croquetas-jamon-plato/freidora/prep': {
    intermediate: 'Coloca las croquetas en la cestilla sin amontonar.',
    advanced: 'Distribuye las croquetas en la cestilla sin amontonar.',
  },
  'patatas-fritas-congeladas-plato/sarten/prep': {
    intermediate: 'Extiende las patatas fritas congeladas en la sartén o bandeja.',
    advanced: 'Distribuye las patatas fritas congeladas sin amontonar.',
  },
  'empanadillas-plato/sarten/prep': {
    intermediate: 'Coloca las empanadillas en la sartén con un poco de aceite.',
    advanced: 'Dispone las empanadillas en la sartén con aceite.',
  },
  'verduras-air-horno/sarten/prep': {
    intermediate: 'Corta las verduras, úntalas con aceite y sal, y tenlas listas.',
    advanced: 'Corta y sazona las verduras con aceite y sal.',
  },
  'pimientos-horno/horno/prep': {
    beginner: 'Lava los pimientos. Úntalos ligeramente con aceite y colócalos enteros en una bandeja de horno.',
    intermediate: 'Unta los pimientos con aceite y colócalos enteros en la bandeja del horno.',
    advanced: 'Unta los pimientos con aceite y dispónlos enteros en la bandeja.',
  },
  'pimientos-horno/horno/roast': {
    beginner: 'Hornea a 200 °C unos 25 minutos, volteando a mitad. Están listos cuando la piel esté arrugada y la carne tierna.',
    intermediate: 'Hornea a 200 °C unos 25 minutos, volteando a mitad, hasta piel arrugada y carne tierna.',
    advanced: 'Hornea a 200 °C unos 25 minutos con volteo a mitad hasta tiernos.',
  },
  'merluza-sarten/sarten/cook': {
    intermediate: 'Cocina 3–4 minutos por cada lado hasta que se desmenuce fácil y quede opaco; sirve.',
    advanced: 'Cocina 3–4 minutos por lado hasta el punto (opaco, se desmenuza) y sirve.',
  },
};

let stats = {
  syncedOverrides: 0,
  genericFixed: 0,
  handFixed: 0,
  identicalFixed: 0,
};

// 1) Sync overrides → catalog (solo IDs override)
for (const r of catalog) {
  const patch = overrides[r.id];
  if (!patch) continue;
  if (patch.name) r.name = patch.name;
  if (patch.steps) r.steps = patch.steps;
  if (patch.methods) r.methods = JSON.parse(JSON.stringify(patch.methods));
  stats.syncedOverrides += 1;
}

// 2–4) Residual fixes
for (const r of catalog) {
  for (const meth of r.methods || []) {
    for (const step of meth.steps || []) {
      if (!step.text || typeof step.text === 'string') continue;
      const key = `${r.id}/${meth.id}/${step.id}`;
      const hand = HAND[key];
      if (hand) {
        for (const [lv, txt] of Object.entries(hand)) {
          const cur = step.text[lv] || '';
          // Solo sustituir si está vacío, es genérico, telegrama corto, o es el valor conocido malo
          const bad =
            !cur.trim() ||
            GENERIC.test(cur) ||
            wc(cur) <= 8 ||
            /Escurre garbanzos, añade|Mezcla maíz escurrido|Añade espinacas\. En 1|3–4 min por lado|Pimientos enteros|200 °C 25 min volteando/.test(
              cur,
            );
          if (bad || cur !== txt) {
            // For hand keys, always apply intended good text if current matches bad patterns OR equals previous bad
            if (bad || GENERIC.test(cur) || cur !== txt) {
              // Apply if bad; if already equals hand, skip
              if (cur.trim() !== txt.trim()) {
                if (bad || GENERIC.test(cur)) {
                  step.text[lv] = txt;
                  stats.handFixed += 1;
                }
              }
            }
          }
        }
      }

      for (const lv of ['intermediate', 'advanced']) {
        const cur = step.text[lv] || '';
        if (GENERIC.test(cur)) {
          const fromB = naturalFromBeginner(step.text.beginner || '', lv);
          if (fromB && !GENERIC.test(fromB) && wc(fromB) > 6) {
            step.text[lv] = fromB;
          } else if (hand?.[lv]) {
            step.text[lv] = hand[lv];
          } else {
            // fallback contextual mínimo
            step.text[lv] =
              lv === 'advanced'
                ? 'Prepara el paso con los ingredientes listos y cocina hasta el punto.'
                : 'Prepara los ingredientes necesarios y cocina hasta el punto indicado.';
          }
          // Avoid leaving the same generic
          if (GENERIC.test(step.text[lv])) {
            step.text[lv] =
              lv === 'advanced'
                ? ' Cocina hasta el punto deseado y sirve.'
                : ' Cocina según el tiempo indicado hasta el punto y sirve.';
            step.text[lv] = step.text[lv].trim();
          }
          stats.genericFixed += 1;
        }
      }

      const b = step.text.beginner || '';
      const a = step.text.advanced || '';
      if (b && a && b.trim() === a.trim() && wc(b) > 25) {
        const next = naturalFromBeginner(b, 'advanced');
        if (next && next.trim() !== b.trim()) {
          step.text.advanced = next;
          stats.identicalFixed += 1;
        } else {
          // compact: first sentence
          const first = b.split(/(?<=[.!?])\s+/)[0];
          if (first && first.trim() !== b.trim()) {
            step.text.advanced = first.endsWith('.') ? first : `${first}.`;
            stats.identicalFixed += 1;
          }
        }
      }
    }
  }
}

// Force-apply HAND for keys that still look bad after generic pass
for (const r of catalog) {
  for (const meth of r.methods || []) {
    for (const step of meth.steps || []) {
      if (!step.text || typeof step.text === 'string') continue;
      const key = `${r.id}/${meth.id}/${step.id}`;
      const hand = HAND[key];
      if (!hand) continue;
      for (const [lv, txt] of Object.entries(hand)) {
        const cur = (step.text[lv] || '').trim();
        if (
          GENERIC.test(cur) ||
          /Escurre garbanzos, añade|Mezcla maíz escurrido|Añade espinacas\. En 1|Pimientos enteros|200 °C 25 min volteando|3–4 min por lado|3–4 min\/lado/.test(
            cur,
          ) ||
          !cur
        ) {
          step.text[lv] = txt;
          stats.handFixed += 1;
        }
      }
    }
  }
}

const header = src.slice(0, match.index);
fs.writeFileSync(
  catalogPath,
  `${header}export const RECIPE_CATALOG: Recipe[] = ${JSON.stringify(catalog, null, 2)};\n`,
);
console.log(JSON.stringify(stats, null, 2));
