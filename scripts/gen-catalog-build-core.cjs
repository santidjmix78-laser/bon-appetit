const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(
  path.join(__dirname, 'build-quality-catalog.mjs'),
  'utf8',
);
const start = src.indexOf('const foodsSrc');
const end = src.indexOf('const catalogRaw = buildAllRecipes');
const body = src
  .slice(start, end)
  .replace(
    "path.join(ROOT, 'src/data/foods.ts')",
    "path.join(root, 'src/data/foods.ts')",
  );
const out = `/** Shared catalog builder for v1.3.2 culinary pipeline. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildAllRecipes } from './register-recipes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function buildBaseCatalog(root = path.join(__dirname, '..')) {
${body}
  const catalogRaw = buildAllRecipes({
    FOD_LOW,
    FOD_MOD,
    levels,
    step,
    m,
    ing,
    recipe,
    nm,
    riceBoilSteps,
    buildArrozAtun,
    buildPolloPatatasCombo,
    buildPolloArrozCalabacin,
    buildCalabacinPlancha,
    buildTortillaPatata,
  });

  const byId = new Map();
  for (const r of catalogRaw) {
    if (byId.has(r.id)) throw new Error(\`Duplicate recipe id: \${r.id}\`);
    byId.set(r.id, r);
  }
  const catalog = [...byId.values()];

  for (const r of catalog) {
    for (const method of r.methods || []) {
      method.steps = method.steps.map((s, i) => {
        if (typeof s === 'string') return { id: \`\${method.id}-\${i}\`, text: s };
        return { ...s, id: s.id || \`\${method.id}-\${i}\` };
      });
    }
    if (!r.steps?.length && r.methods?.[0]) {
      r.steps = r.methods[0].steps.map((s) =>
        typeof s.text === 'string'
          ? s.text
          : s.text?.intermediate || s.text?.beginner || '',
      );
    }
  }
  return catalog;
}
`;
fs.writeFileSync(path.join(__dirname, 'catalog-build-core.mjs'), out);
