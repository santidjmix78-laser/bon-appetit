/**
 * Informe muestra ≥10 recetas con textos EFECTIVOS (catálogo + overrides).
 * Requiere: scripts/_ov_audit.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const bundlePath = path.join(__dirname, '_ov_audit.mjs');
if (!fs.existsSync(bundlePath)) {
  console.error('Falta scripts/_ov_audit.mjs');
  process.exit(1);
}

const VERB_RE =
  /\b(corta|cortar|pela|pelar|lava|lavar|seca|secar|añade|añadir|incorpora|calienta|calentar|cocina|cocinar|cuece|freír|fríe|sofre|sofríe|saltea|saltear|pocha|pochar|mezcla|mezclar|bate|batir|vierte|tapa|tapar|destapa|remueve|remover|gira|girar|voltea|voltear|agita|sirve|servir|coloca|colocar|extiende|precalienta|precalentar|programa|hornea|asa|unta|sazona|sazonar|comprueba|deja|reposa|escurr|pincha|abre|monta|aliña|hidrata|hierve|lleva|baja|sube|aparta|retira|integra|prueba|saca|dispone|distribuye|reparte|cuaja|dobla|enrolla|tuesta|trocea|lamina|casca|sella|sellar|descongela|escurre)\w*\b/i;

function wc(t) {
  return String(t || '').trim().split(/\s+/).filter(Boolean).length;
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

const SAMPLE = [
  'ternera-cebolla',
  'salmon-micro',
  'pollo-congelado-air',
  'arroz-huevo-simple',
  'pasta-atun-tomate',
  'merluza-sarten',
  'pimientos-horno',
  'huevos-fritos-pan',
  'pasta-brocoli',
  'pollo-patatas-combo',
];

const ALT = {};

function findRecipe(id) {
  for (const c of ALT[id] || [id]) {
    const r = catalog.find((x) => x.id === c);
    if (r) return r;
  }
  return null;
}

const lines = [`Catálogo: ${catalog.length} recetas (textos efectivos = catálogo + overrides)`, ''];

for (const want of SAMPLE) {
  const raw = findRecipe(want);
  if (!raw) {
    lines.push(`## ${want}: NO ENCONTRADA`);
    continue;
  }
  const r = effective(raw);
  const via = overrides[r.id] ? ' [override]' : '';
  lines.push(`## ${r.name} (${r.id})${via}`);
  for (const meth of r.methods || []) {
    lines.push(`### ${meth.label} (${meth.id}) · ${(meth.equipmentIds || []).join('+')}`);
    for (const s of meth.steps || []) {
      const t = typeof s.text === 'string'
        ? { beginner: s.text, intermediate: s.text, advanced: s.text }
        : s.text || {};
      const flags = [];
      for (const lv of ['intermediate', 'advanced']) {
        if (isTelegram(t[lv] || '')) flags.push(`${lv}=TELEGRAMA`);
      }
      if ((t.beginner || '').trim() === (t.advanced || '').trim() && wc(t.beginner) > 20) {
        flags.push('A===B');
      }
      const pureAf =
        /air|airfryer/.test(`${meth.id} ${(meth.equipmentIds || []).join(' ')}`) &&
        !/sarten|sartén/.test(`${meth.id} ${(meth.equipmentIds || []).join(' ')}`);
      const stove =
        /sartén|sarten|fuego medio/.test(`${t.beginner} ${t.intermediate} ${t.advanced}`);
      if (pureAf && stove && !/air fryer|airfryer|cesta/.test(`${t.beginner} ${t.intermediate} ${t.advanced}`.toLowerCase())) {
        flags.push('MISMATCH_SARTEN');
      }
      lines.push(`- **${s.id}** ${flags.length ? `⚠ ${flags.join(', ')}` : '✓'}`);
      lines.push(`  - B: ${t.beginner || '(vacío)'}`);
      lines.push(`  - I: ${t.intermediate || '(vacío)'}`);
      lines.push(`  - A: ${t.advanced || '(vacío)'}`);
    }
  }
  lines.push('');
}

console.log(lines.join('\n'));
