/**
 * Parche quirúrgico del catálogo: NO inventa recetas.
 * - Eleva textos avanzados/intermedios demasiado truncados (usa el nivel superior).
 * - Elimina pasos serve-only vacíos fusionando "sirve" en el paso previo cuando es solo eso.
 * Ejecutar: node scripts/patch-catalog-quality.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.join(__dirname, '../src/data/recipes.catalog.ts');

const BANNED_ONLY =
  /^(Huevos|Patatas|Cocinar|Servir|Emplata|Sirve|Prep\.?|Micro\.?|Montar\.?|Mezclar\.?|Enrollar\.?|Bowl desayuno\.?|Overnight style rápido\.?)\.?$/i;

function wordCount(s) {
  return (s || '').trim().split(/\s+/).filter(Boolean).length;
}

function isTooShort(s) {
  const t = (s || '').trim();
  if (!t) return true;
  if (BANNED_ONLY.test(t)) return true;
  if (wordCount(t) <= 3) return true;
  if (wordCount(t) <= 5 && !/\d/.test(t) && !/min|°|fuego|sartén|olla/i.test(t)) {
    return true;
  }
  return false;
}

function isServeOnly(s) {
  return /^(sirve|emplata|disfruta|montar|servir)(\s+caliente)?\.?$/i.test(
    (s || '').trim(),
  );
}

const src = fs.readFileSync(catalogPath, 'utf8');
const catMatch = src.match(
  /export const RECIPE_CATALOG: Recipe\[\] = (\[[\s\S]*\])\s*;/,
);
if (!catMatch) {
  console.error('No se pudo parsear RECIPE_CATALOG');
  process.exit(1);
}
const catalog = JSON.parse(catMatch[1]);

let upgraded = 0;
let serveMerged = 0;
let recipesTouched = new Set();

// Skip recipes that have curated overrides (handled in recipeOverrides.ts)
const SKIP = new Set([
  'tortilla-patata',
  'patatas-sartén-huevo',
  'pollo-ajos',
]);

for (const r of catalog) {
  if (SKIP.has(r.id)) continue;
  for (const m of r.methods || []) {
    const steps = m.steps || [];
    // Upgrade truncated texts
    for (const s of steps) {
      if (!s.text || typeof s.text === 'string') continue;
      const t = s.text;
      let changed = false;
      if (isTooShort(t.advanced) && t.intermediate && !isTooShort(t.intermediate)) {
        t.advanced = t.intermediate;
        changed = true;
      } else if (isTooShort(t.advanced) && t.beginner && !isTooShort(t.beginner)) {
        // Compact beginner lightly for advanced: keep essential clauses
        t.advanced = t.beginner
          .replace(/\s+/g, ' ')
          .replace(/\([^)]{40,}\)/g, '')
          .slice(0, 220)
          .trim();
        if (isTooShort(t.advanced)) t.advanced = t.beginner;
        changed = true;
      }
      if (isTooShort(t.intermediate) && t.beginner && !isTooShort(t.beginner)) {
        t.intermediate = t.beginner
          .replace(/\s+/g, ' ')
          .slice(0, 180)
          .trim();
        if (isTooShort(t.intermediate)) t.intermediate = t.beginner;
        changed = true;
      }
      if (changed) {
        upgraded += 1;
        recipesTouched.add(r.id);
      }
      // Ensure phaseId
      if (!s.phaseId) s.phaseId = s.id;
    }

    // Merge trailing serve-only steps into previous (any level)
    while (steps.length >= 2) {
      const last = steps[steps.length - 1];
      const texts =
        typeof last.text === 'string'
          ? [last.text]
          : [last.text?.beginner, last.text?.intermediate, last.text?.advanced].filter(
              Boolean,
            );
      const allServe =
        texts.length > 0 && texts.every((x) => isServeOnly(x));
      const mostlyServe =
        texts.filter((x) => isServeOnly(x)).length >= Math.ceil(texts.length * 0.5);
      if (!allServe && !mostlyServe) break;

      const prev = steps[steps.length - 2];
      if (prev && typeof prev.text === 'object' && prev.text) {
        for (const lv of ['beginner', 'intermediate', 'advanced']) {
          if (prev.text[lv] && !/sirve|emplata/i.test(prev.text[lv])) {
            prev.text[lv] = `${prev.text[lv].replace(/\.$/, '')}. Sirve.`;
          }
        }
      }
      steps.pop();
      serveMerged += 1;
      recipesTouched.add(r.id);
    }
  }
}

const header = `import type { Recipe } from '../types';

/**
 * Catálogo Bon Appetit v1.3 — platos DISTINTOS.
 * Parches de calidad en recipeOverrides.ts (no regenerar a ciegas).
 * Generado/normalizado; editar overrides para revisiones culinarias clave.
 */
export const RECIPE_CATALOG: Recipe[] = `;

fs.writeFileSync(
  catalogPath,
  `${header}${JSON.stringify(catalog, null, 2)};\n`,
  'utf8',
);

console.log(
  JSON.stringify(
    {
      recipesTouched: recipesTouched.size,
      textsUpgraded: upgraded,
      serveStepsMerged: serveMerged,
      total: catalog.length,
    },
    null,
    2,
  ),
);
