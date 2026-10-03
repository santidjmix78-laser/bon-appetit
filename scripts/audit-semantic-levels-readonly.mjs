/**
 * Auditoría SEMÁNTICA read-only (no escribe catálogo).
 * Detecta desalineación entre niveles / timer / método / pasos vecinos.
 *
 *   npx esbuild src/data/recipeOverrides.ts --bundle --format=esm --platform=neutral --outfile=scripts/_ov_audit.mjs
 *   node scripts/audit-semantic-levels-readonly.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const bundlePath = path.join(__dirname, '_ov_audit.mjs');

const FOOD_ALIASES = {
  huevos: ['huevo', 'huevos', 'clara', 'yema'],
  patatas: ['patata', 'patatas', 'gajo', 'gajos'],
  arroz: ['arroz'],
  atun: ['atún', 'atun'],
  salmon: ['salmón', 'salmon'],
  pollo: ['pollo'],
  'pollo-congelado': ['pollo'],
  ternera: ['ternera'],
  cebolla: ['cebolla', 'juliana'],
  pasta: ['pasta', 'macarrón', 'espagueti', 'fideo'],
  pan: ['pan', 'rebanada', 'tostada'],
  brocoli: ['brócoli', 'brocoli'],
  pimiento: ['pimiento', 'pimientos'],
  ajo: ['ajo'],
  tomate: ['tomate'],
  lechuga: ['lechuga'],
  garbanzos: ['garbanzo', 'garbanzos'],
  maiz: ['maíz', 'maiz'],
  pavo: ['pavo'],
  merluza: ['merluza', 'pescado', 'filete'],
  'pescado-congelado': ['pescado', 'filete', 'merluza'],
  guisantes: ['guisante', 'guisantes'],
  espinacas: ['espinaca', 'espinacas'],
  calabacin: ['calabacín', 'calabacin'],
  zanahoria: ['zanahoria'],
  jamon: ['jamón', 'jamon'],
  queso: ['queso'],
  croquetas: ['croqueta', 'croquetas'],
  empanadillas: ['empanadilla', 'empanadillas'],
  'patatas-fritas-congeladas': ['patata', 'patatas', 'frita', 'fritas'],
};

const SKIP_FOOD = new Set(['aceite', 'sal', 'pimienta', 'agua']);

function tokensIn(text) {
  const t = (text || '').toLowerCase();
  const hits = new Set();
  for (const [foodId, aliases] of Object.entries(FOOD_ALIASES)) {
    for (const a of aliases) {
      const re = new RegExp(`\\b${a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\w*\\b`, 'i');
      if (re.test(t)) hits.add(foodId);
    }
  }
  return hits;
}

function methodKind(method) {
  const blob = `${method.id || ''} ${method.label || ''} ${(method.equipmentIds || []).join(' ')}`.toLowerCase();
  const hasAir = /air|airfryer/.test(blob);
  const hasHorno = /horno/.test(blob);
  const hasMicro = /micro/.test(blob);
  const hasSarten = /sarten|sartén|plancha|cazo/.test(blob);
  const hasOlla = /\bolla\b/.test(blob);
  if ((hasAir || hasHorno || hasMicro) && (hasSarten || hasOlla)) return 'combo';
  if (hasAir) return 'air';
  if (hasHorno) return 'horno';
  if (hasMicro) return 'micro';
  if (hasSarten && !hasOlla) return 'sarten';
  if (hasOlla && !hasSarten) return 'olla';
  return 'other';
}

function incompatibleEquip(text, kind) {
  const t = (text || '').toLowerCase();
  if (kind === 'micro' || kind === 'air' || kind === 'horno') {
    if (/sartén|sarten|fuego medio|fuego alto|fuego bajo|vitro/.test(t)) {
      if (/air fryer|airfryer|cesta|horno|microondas|bandeja|micro/.test(t)) return false;
      return true;
    }
  }
  if (kind === 'sarten') {
    // método sartén/cazo no debería exigir "olla" como utensilio principal
    if (/\bolla\b/.test(t) && !/sartén|sarten|cazo/.test(t)) return true;
    if (/^olla\s*:/i.test(text || '')) return true;
  }
  return false;
}

function timerFoodHints(label) {
  const t = (label || '').toLowerCase();
  const hits = new Set();
  for (const [foodId, aliases] of Object.entries(FOOD_ALIASES)) {
    for (const a of aliases) {
      if (t.includes(a)) hits.add(foodId);
    }
  }
  // labels genéricos
  if (/patata/.test(t)) hits.add('patatas');
  if (/huevo/.test(t)) hits.add('huevos');
  if (/arroz/.test(t)) hits.add('arroz');
  if (/pollo/.test(t)) hits.add('pollo');
  if (/salm|salmon/.test(t)) hits.add('salmon');
  return hits;
}

function stepIdFoodHints(id, phaseId) {
  const blob = `${id || ''} ${phaseId || ''}`.toLowerCase();
  const hits = new Set();
  if (/potato|patata/.test(blob)) hits.add('patatas');
  if (/egg|huevo/.test(blob)) hits.add('huevos');
  if (/rice|arroz/.test(blob)) hits.add('arroz');
  if (/tuna|atun|atún/.test(blob)) hits.add('atun');
  if (/salmon|salm/.test(blob)) hits.add('salmon');
  if (/chicken|pollo|beef|ternera|onion|cebolla/.test(blob)) {
    if (/chicken|pollo/.test(blob)) hits.add('pollo');
    if (/beef|ternera/.test(blob)) hits.add('ternera');
    if (/onion|cebolla/.test(blob)) hits.add('cebolla');
  }
  return hits;
}

if (!fs.existsSync(bundlePath)) {
  console.error('Falta scripts/_ov_audit.mjs (esbuild de recipeOverrides).');
  process.exit(1);
}

const catSrc = fs.readFileSync(path.join(root, 'src/data/recipes.catalog.ts'), 'utf8');
const match = catSrc.match(/export const RECIPE_CATALOG: Recipe\[\] = (\[[\s\S]*\])\s*;/);
const catalog = JSON.parse(match[1]);
const ov = (await import(`file://${bundlePath.replace(/\\/g, '/')}?t=${Date.now()}`))
  .RECIPE_QUALITY_OVERRIDES;

function effective(r) {
  const p = ov[r.id];
  if (!p) return r;
  return { ...r, ...p, methods: p.methods ?? r.methods, steps: p.steps ?? r.steps };
}

const findings = [];

for (const raw of catalog) {
  const r = effective(raw);
  const recipeFoods = (r.ingredients || [])
    .map((i) => i.foodId)
    .filter((id) => !SKIP_FOOD.has(id));

  for (const meth of r.methods || []) {
    const kind = methodKind(meth);
    const steps = meth.steps || [];

    for (let si = 0; si < steps.length; si++) {
      const step = steps[si];
      const t =
        typeof step.text === 'string'
          ? { beginner: step.text, intermediate: step.text, advanced: step.text }
          : { ...(step.text || {}) };
      const levels = ['beginner', 'intermediate', 'advanced'];
      const levelTokens = {};
      for (const lv of levels) {
        levelTokens[lv] = tokensIn(t[lv] || '');
      }

      const anchor = new Set([
        ...stepIdFoodHints(step.id, step.phaseId),
        ...timerFoodHints(step.timerLabel),
      ]);
      // Si no hay ancla, usar intersección de niveles no vacíos
      const nonempty = levels.filter((lv) => (t[lv] || '').trim());
      let core = new Set(anchor);
      if (core.size === 0 && nonempty.length) {
        core = new Set(levelTokens[nonempty[0]]);
        for (const lv of nonempty.slice(1)) {
          for (const x of [...core]) {
            if (!levelTokens[lv].has(x)) core.delete(x);
          }
        }
      }

      // A) Desalineación entre niveles: un nivel introduce food principal ausente en ancla/otros
      if (core.size > 0) {
        for (const lv of nonempty) {
          const toks = levelTokens[lv];
          if (toks.size === 0) continue;
          // Si el nivel no menciona NINGUNO del core pero menciona otro food de la receta
          const hitsCore = [...core].some((f) => toks.has(f));
          const otherRecipeFood = [...toks].filter(
            (f) => recipeFoods.includes(f) && !core.has(f),
          );
          if (!hitsCore && otherRecipeFood.length > 0) {
            findings.push({
              severity: 'critical',
              type: 'level_semantic_mismatch',
              recipeId: r.id,
              methodId: meth.id,
              stepId: step.id,
              detail: `${lv} habla de [${otherRecipeFood.join(',')}] pero el paso ancla es [${[...core].join(',')}]`,
              texts: { b: t.beginner, i: t.intermediate, a: t.advanced },
            });
          }
        }
      }

      // B) Timer vs texto
      const timerHints = timerFoodHints(step.timerLabel);
      if (timerHints.size > 0) {
        for (const lv of nonempty) {
          const toks = levelTokens[lv];
          if (toks.size === 0) continue;
          const ok = [...timerHints].some((f) => toks.has(f));
          const foreign = [...toks].filter((f) => recipeFoods.includes(f) && !timerHints.has(f));
          if (!ok && foreign.length > 0) {
            findings.push({
              severity: 'critical',
              type: 'timer_mismatch',
              recipeId: r.id,
              methodId: meth.id,
              stepId: step.id,
              detail: `timer "${step.timerLabel}" vs ${lv}→[${foreign.join(',')}]`,
            });
          }
        }
      }

      // C) Método vs equipo
      for (const lv of nonempty) {
        if (incompatibleEquip(t[lv], kind)) {
          findings.push({
            severity: 'high',
            type: 'method_equip_mismatch',
            recipeId: r.id,
            methodId: meth.id,
            stepId: step.id,
            detail: `${lv} incompatible con método ${kind}: «${(t[lv] || '').slice(0, 90)}»`,
          });
        }
      }

      // D) Texto avanzado parece copiado de otro paso (overlap fuerte con vecino, débil con ancla)
      if (si + 1 < steps.length && (t.advanced || '').trim()) {
        const next = steps[si + 1];
        const nt =
          typeof next.text === 'string'
            ? { beginner: next.text }
            : next.text || {};
        const nextAll = `${nt.beginner || ''} ${nt.intermediate || ''} ${nt.advanced || ''}`;
        const adv = t.advanced || '';
        const advTok = tokensIn(adv);
        const nextTok = tokensIn(nextAll);
        const selfTok = tokensIn(t.beginner || '');
        const overlapNext = [...advTok].filter((x) => nextTok.has(x) && recipeFoods.includes(x));
        const overlapSelf = [...advTok].filter((x) => selfTok.has(x) && recipeFoods.includes(x));
        if (
          overlapNext.length > 0 &&
          overlapSelf.length === 0 &&
          (anchor.size === 0 || ![...anchor].some((a) => advTok.has(a)))
        ) {
          findings.push({
            severity: 'critical',
            type: 'cross_step_copy_suspect',
            recipeId: r.id,
            methodId: meth.id,
            stepId: step.id,
            detail: `advanced parece del paso siguiente (${next.id}): foods=[${overlapNext.join(',')}]`,
          });
        }
      }

      // Plantilla genérica micro con food incorrecto
      if (
        /Coloca \w+ en un recipiente apto para microondas/i.test(t.advanced || '') &&
        anchor.size > 0 &&
        ![...anchor].some((a) => tokensIn(t.advanced).has(a))
      ) {
        findings.push({
          severity: 'critical',
          type: 'generic_micro_template',
          recipeId: r.id,
          methodId: meth.id,
          stepId: step.id,
          detail: `advanced parece plantilla micro genérica: «${(t.advanced || '').slice(0, 100)}»`,
        });
      }
    }
  }
}

const critical = findings.filter((f) => f.severity === 'critical');
const high = findings.filter((f) => f.severity === 'high');
const byRecipe = {};
for (const f of findings) {
  byRecipe[f.recipeId] = (byRecipe[f.recipeId] || 0) + 1;
}

console.log(
  JSON.stringify(
    {
      recipes: catalog.length,
      findings: findings.length,
      critical: critical.length,
      high: high.length,
      byRecipe,
      criticalList: critical,
      highList: high.slice(0, 40),
    },
    null,
    2,
  ),
);
