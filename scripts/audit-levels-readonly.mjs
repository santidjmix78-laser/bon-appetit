/**
 * SOLO LECTURA: audita telegramas, genéricos y desajustes método/texto.
 * Requiere bundle previo:
 *   npx esbuild src/data/recipeOverrides.ts --bundle --format=esm --platform=neutral --outfile=scripts/_ov_audit.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const bundlePath = path.join(__dirname, '_ov_audit.mjs');
if (!fs.existsSync(bundlePath)) {
  console.error('Falta scripts/_ov_audit.mjs. Genera con esbuild primero.');
  process.exit(1);
}

const VERB_RE =
  /\b(corta|cortar|pela|pelar|lava|lavar|seca|secar|añade|añadir|incorpora|calienta|calentar|cocina|cocinar|cuece|freír|fríe|sofre|sofríe|saltea|saltear|pocha|pochar|mezcla|mezclar|bate|batir|vierte|tapa|tapar|destapa|remueve|remover|gira|girar|voltea|voltear|agita|sirve|servir|coloca|colocar|extiende|precalienta|precalentar|programa|hornea|asa|unta|sazona|sazonar|comprueba|deja|reposa|escurr|pincha|abre|monta|aliña|hidrata|hierve|lleva|baja|sube|aparta|retira|integra|prueba|saca|dispone|distribuye|reparte|cuaja|dobla|enrolla|tuesta|trocea|lamina|casca|sella|sellar|descongela)\w*\b/i;

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
  if (/;/.test(t) && !VERB_RE.test(t)) return true;
  if (!VERB_RE.test(t) && wc(t) <= 14) return true;
  if (/Prepara y cocina .+ según el método/i.test(t)) return true;
  return false;
}

function methodKind(method) {
  const blob = `${method.id || ''} ${method.label || ''} ${(method.equipmentIds || []).join(' ')}`.toLowerCase();
  const hasAir = /air|airfryer/.test(blob);
  const hasHorno = /horno/.test(blob);
  const hasMicro = /micro/.test(blob);
  const hasSarten = /sarten|sartén|plancha/.test(blob);
  const hasOlla = /olla/.test(blob);
  if ((hasAir || hasHorno || hasMicro) && (hasSarten || hasOlla)) return 'combo';
  if (hasAir) return 'air';
  if (hasHorno) return 'horno';
  if (hasMicro) return 'micro';
  return 'other';
}

function mismatch(text, kind) {
  const t = (text || '').toLowerCase();
  if (kind === 'air' || kind === 'horno' || kind === 'micro') {
    if (/sartén|sarten|fuego medio|fuego alto|fuego bajo/.test(t)) {
      if (/air fryer|airfryer|cesta|horno|microondas|bandeja/.test(t)) return false;
      return true;
    }
  }
  return false;
}

const catSrc = fs.readFileSync(path.join(root, 'src/data/recipes.catalog.ts'), 'utf8');
const match = catSrc.match(/export const RECIPE_CATALOG: Recipe\[\] = (\[[\s\S]*\])\s*;/);
const catalog = JSON.parse(match[1]);
const ovMod = await import(`file://${bundlePath.replace(/\\/g, '/')}?t=${Date.now()}`);
const overrides = ovMod.RECIPE_QUALITY_OVERRIDES || {};

function effective(r) {
  const p = overrides[r.id];
  if (!p) return r;
  return { ...r, ...p, methods: p.methods ?? r.methods, steps: p.steps ?? r.steps };
}

const telegram = [];
const mismatches = [];
const generics = [];
const identicalAB = [];
let stepsB = 0, stepsI = 0, stepsA = 0;

for (const raw of catalog) {
  const r = effective(raw);
  for (const meth of r.methods || []) {
    const kind = methodKind(meth);
    for (const step of meth.steps || []) {
      const t = typeof step.text === 'string'
        ? { beginner: step.text, intermediate: step.text, advanced: step.text }
        : { ...(step.text || {}) };
      if (t.beginner?.trim()) stepsB++;
      if (t.intermediate?.trim()) stepsI++;
      if (t.advanced?.trim()) stepsA++;
      for (const lv of ['beginner', 'intermediate', 'advanced']) {
        const text = t[lv] || '';
        if (!text && lv !== 'beginner') continue;
        if (/Prepara y cocina .+ según el método/i.test(text)) {
          generics.push(`${r.id}/${meth.id}/${step.id}/${lv}`);
        }
        if ((lv === 'intermediate' || lv === 'advanced') && isTelegram(text)) {
          if (/^sirve\b/i.test(text.trim()) && wc(text) <= 12) continue;
          telegram.push(`${r.id}/${meth.id}/${step.id}/${lv}: ${text.slice(0, 80)}`);
        }
        if (mismatch(text, kind)) {
          mismatches.push(`${r.id}/${meth.id}/${step.id}/${lv}`);
        }
      }
      if (
        t.beginner && t.advanced &&
        t.beginner.trim() === t.advanced.trim() &&
        wc(t.beginner) > 25
      ) {
        identicalAB.push(`${r.id}/${meth.id}/${step.id}`);
      }
    }
  }
}

console.log(JSON.stringify({
  recipes: catalog.length,
  overrideIds: Object.keys(overrides),
  stepTexts: { beginner: stepsB, intermediate: stepsI, advanced: stepsA },
  telegramCount: telegram.length,
  telegramSample: telegram.slice(0, 40),
  genericJunk: generics,
  methodMismatches: mismatches,
  identicalABCount: identicalAB.length,
  identicalABSample: identicalAB.slice(0, 25),
}, null, 2));
