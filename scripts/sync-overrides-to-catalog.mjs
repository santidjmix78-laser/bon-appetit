/**
 * Copia methods/steps de recipeOverrides al catálogo via esbuild bundle.
 * Escribe solo con: CONFIRM_CATALOG_WRITE=1 node scripts/sync-overrides-to-catalog.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const WRITE = process.env.CONFIRM_CATALOG_WRITE === '1';
if (!WRITE) {
  console.error(
    '[BLOQUEADO] sync-overrides-to-catalog.mjs no escribe sin CONFIRM_CATALOG_WRITE=1',
  );
  process.exit(2);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const bundlePath = path.join(__dirname, '_ov_bundle.mjs');

const build = spawnSync(
  'npx',
  [
    '--yes',
    'esbuild',
    'src/data/recipeOverrides.ts',
    '--bundle',
    '--format=esm',
    '--platform=neutral',
    `--outfile=${bundlePath}`,
  ],
  { cwd: root, encoding: 'utf8', shell: true },
);
if (build.status !== 0) {
  console.error(build.stderr || build.stdout);
  process.exit(1);
}

const mod = await import(`file://${bundlePath.replace(/\\/g, '/')}?t=${Date.now()}`);
const overrides = mod.RECIPE_QUALITY_OVERRIDES;
if (!overrides) throw new Error('No RECIPE_QUALITY_OVERRIDES in bundle');

const catalogPath = path.join(root, 'src/data/recipes.catalog.ts');
const src = fs.readFileSync(catalogPath, 'utf8');
const match = src.match(
  /export const RECIPE_CATALOG: Recipe\[\] = (\[[\s\S]*\])\s*;/,
);
if (!match) throw new Error('No se pudo leer RECIPE_CATALOG');
const catalog = JSON.parse(match[1]);

let synced = 0;
for (const r of catalog) {
  const patch = overrides[r.id];
  if (!patch) continue;
  if (patch.name) r.name = patch.name;
  if (patch.steps) r.steps = patch.steps;
  if (patch.methods) r.methods = JSON.parse(JSON.stringify(patch.methods));
  synced += 1;
}

const header = src.slice(0, match.index);
fs.writeFileSync(
  catalogPath,
  `${header}export const RECIPE_CATALOG: Recipe[] = ${JSON.stringify(catalog, null, 2)};\n`,
);
try {
  fs.unlinkSync(bundlePath);
} catch {
  /* ignore */
}
console.log(JSON.stringify({ synced, recipes: catalog.length }, null, 2));
