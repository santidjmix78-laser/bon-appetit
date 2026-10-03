/** Muestra final controlada (read-only). Requiere scripts/_ov_audit.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bundlePath = path.join(__dirname, '_ov_audit.mjs');
const cat = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/recipes.catalog.ts'), 'utf8').match(
    /export const RECIPE_CATALOG: Recipe\[\] = (\[[\s\S]*\])\s*;/,
  )[1],
);
const ov = (await import(`file://${bundlePath.replace(/\\/g, '/')}?t=${Date.now()}`))
  .RECIPE_QUALITY_OVERRIDES;

function eff(id) {
  const r = cat.find((x) => x.id === id);
  if (!r) return null;
  const p = ov[id];
  return p ? { ...r, ...p, methods: p.methods ?? r.methods } : r;
}

const IDS = [
  'huevos-patata-micro',
  'arroz-atun',
  'ternera-cebolla',
  'salmon-micro',
  'pollo-congelado-air',
  'brocoli-micro-huevo',
  'arroz-garbanzos',
  'merluza-sarten',
  'pimientos-horno',
  'pasta-atun-tomate',
];

for (const id of IDS) {
  const r = eff(id);
  if (!r) {
    console.log('\n## MISSING', id);
    continue;
  }
  console.log(`\n## ${r.name} (${r.id})`);
  for (const m of r.methods || []) {
    console.log(`### ${m.label} (${m.id})`);
    for (const s of m.steps || []) {
      const t = s.text || {};
      console.log(`- ${s.id}${s.timerLabel ? ` · timer=${s.timerLabel}` : ''}`);
      console.log(`  B: ${t.beginner || '(vacío)'}`);
      console.log(`  I: ${t.intermediate || '(vacío)'}`);
      console.log(`  A: ${t.advanced || '(vacío)'}`);
    }
  }
}
console.log('\nTOTAL_RECIPES', cat.length);
