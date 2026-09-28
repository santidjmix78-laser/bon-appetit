/**
 * Revisión culinaria v1.3.2.
 * Regenera el catálogo desde register-recipes, aplica bloques curados y
 * normaliza tokens, fases, fuegos y términos. Sin culinaryCue append.
 * Ejecutar: node scripts/culinary-v132-rewrite.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildBaseCatalog } from './catalog-build-core.mjs';
import { polishCatalog, BANNED_FLUFF } from './culinary-family-polish.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.join(__dirname, '../src/data/recipes.catalog.ts');

const LEVELS = ['beginner', 'intermediate', 'advanced'];
const HANDCRAFTED_IDS = new Set(['salmon-plancha-simple', 'pollo-horno-air']);

function words(text) {
  return String(text || '').trim().split(/\s+/).filter(Boolean).length;
}

function sentence(text) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  return /[.!?]$/.test(clean) ? clean : `${clean}.`;
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function addQuantityTokens(text, recipe) {
  let result = String(text || '');
  const candidates = (recipe.ingredients || [])
    .filter((ing) => ing.amountPerServing != null)
    .flatMap((ing) => {
      const values = new Set([String(ing.quantity || '').trim()]);
      if (ing.unit) {
        values.add(`${ing.amountPerServing} ${ing.unit}`);
        if (ing.amountPerServing !== 1 && !ing.unit.endsWith('s')) {
          values.add(`${ing.amountPerServing} ${ing.unit}s`);
        }
      }
      return [...values]
        .filter((value) => value && /\d/.test(value))
        .map((value) => ({ value, token: `{qty:${ing.foodId}}` }));
    })
    .sort((a, b) => b.value.length - a.value.length);

  for (const { value, token } of candidates) {
    result = result.replace(
      new RegExp(`(?<![\\d/])${escapeRegExp(value)}(?![\\d])`, 'gi'),
      token,
    );
  }
  return result;
}

function applyQuantityTokens(recipe) {
  for (const method of recipe.methods || []) {
    for (const step of method.steps || []) {
      if (typeof step.text === 'string') {
        step.text = sentence(addQuantityTokens(step.text, recipe));
        continue;
      }
      for (const level of LEVELS) {
        if (step.text[level]) {
          step.text[level] = sentence(addQuantityTokens(step.text[level], recipe));
        }
      }
    }
  }
}

const TERM_ROOTS = {
  marinar: /marin/i,
  pochar: /poch/i,
  sofreir: /sofr[íi]/i,
  sellar: /sell/i,
  reducir: /reduc/i,
  saltear: /salte/i,
  blanquear: /blanque/i,
  gratinar: /gratin/i,
  'al-dente': /al dente/i,
  reposar: /repos/i,
  juliana: /juliana/i,
  confitar: /confit/i,
  rehogar: /rehog/i,
  emulsionar: /emulsion/i,
};

function keepMentionedTerms(step) {
  const allText =
    typeof step.text === 'string'
      ? step.text
      : LEVELS.map((level) => step.text?.[level] || '').join(' ');
  const filtered = (step.termIds || []).filter((id) => TERM_ROOTS[id]?.test(allText));
  if (filtered.length) step.termIds = filtered;
  else delete step.termIds;
}

function inferHeat(step, method) {
  const stove = (method.equipmentIds || []).some((id) =>
    ['sarten', 'plancha', 'vitro', 'olla', 'freidora'].includes(id),
  );
  const text = LEVELS.map((level) => step.text?.[level] || '').join(' ').toLowerCase();
  const heatApplies =
    stove &&
    /fuego|sartén|plancha|salte|sofr|frí|hierve|hervor|cuece|cocina|calienta|pocha|confita/.test(
      text,
    );
  if (!heatApplies) {
    delete step.heatLevel;
    return;
  }
  if (/medio-bajo|fuego suave|fuego bajo|potencia baja|muy bajo/.test(text)) {
    step.heatLevel = /medio-bajo/.test(text) ? 'medio-bajo' : 'bajo';
  } else if (/medio-alto/.test(text)) {
    step.heatLevel = 'medio-alto';
  } else if (/fuego (?:muy )?alto|plancha (?:muy )?caliente|hervor fuerte/.test(text)) {
    step.heatLevel = 'alto';
  } else if (/fuego medio|potencia media|hierve|hervor|sartén|plancha|salte/.test(text)) {
    step.heatLevel = 'medio';
  } else {
    step.heatLevel = 'medio';
  }
}

function ensurePhaseIds(recipe) {
  for (const method of recipe.methods || []) {
    for (const step of method.steps || []) {
      step.phaseId ||= step.id;
    }
  }
}

function setSalmonPlancha(recipe) {
  recipe.methods = [
    {
      id: 'plancha',
      label: 'Plancha',
      equipmentIds: ['plancha', 'vitro'],
      steps: [
        {
          id: 'temper-and-dry',
          phaseId: 'prep',
          text: {
            beginner:
              'Saca {qty:salmon} del frío 10 minutos antes. Seca muy bien la piel con papel, revisa que no queden espinas y sazona justo antes de cocinar.',
            intermediate:
              'Templa {qty:salmon}, retira espinas y seca la piel por completo para favorecer el dorado.',
            advanced:
              'Atempera {qty:salmon}, desespina y deja la piel totalmente seca; sala en el último momento.',
          },
        },
        {
          id: 'heat-plancha',
          phaseId: 'preheat',
          levels: ['beginner'],
          text: {
            beginner:
              'Calienta la plancha a fuego medio-alto durante 2 minutos y reparte {qty:aceite}; debe brillar sin humear.',
            intermediate:
              'Precalienta la plancha a fuego medio-alto y extiende {qty:aceite} en una película fina.',
            advanced:
              'Estabiliza la plancha a fuego medio-alto con una película de {qty:aceite}, sin llegar al humo.',
          },
          timerSeconds: 120,
          timerLabel: 'Precalentar plancha',
          heatLevel: 'medio-alto',
        },
        {
          id: 'crisp-skin',
          phaseId: 'cook-skin',
          text: {
            beginner:
              'Coloca el salmón con la piel hacia abajo. Presiona suavemente 20 segundos para que no se arquee y cocina 4 minutos sin mover, hasta que el cambio de color alcance dos tercios del grosor.',
            intermediate:
              'Sella por la piel 4 minutos sin mover; presiona al inicio y deja que el calor ascienda por dos tercios de la pieza.',
            advanced:
              'Sella la piel 4 minutos, plana y en contacto continuo, hasta observar cocción en dos tercios del lomo.',
          },
          timerSeconds: 240,
          timerLabel: 'Salmón por la piel',
          termIds: ['sellar'],
          heatLevel: 'medio-alto',
        },
        {
          id: 'finish-and-rest',
          phaseId: 'finish',
          text: {
            beginner:
              'Da la vuelta, baja a fuego medio y cocina 2-3 minutos. Retira cuando se separe en lascas y el centro aún esté jugoso; deja reposar 2 minutos.',
            intermediate:
              'Termina 2-3 minutos por la cara de la carne a fuego medio; retira a 52-55 °C para un centro jugoso y reposa 2 minutos.',
            advanced:
              'Acaba por la cara de la carne hasta 52-55 °C —o 60-63 °C bien hecho— y deja reposar 2 minutos.',
          },
          timerSeconds: 150,
          timerLabel: 'Terminar salmón',
          termIds: ['reposar'],
          heatLevel: 'medio',
        },
      ],
    },
  ];
}

function setPolloHornoAir(recipe) {
  recipe.name = 'Pollo asado sencillo';
  recipe.methods = [
    {
      id: 'horno',
      label: 'Horno',
      equipmentIds: ['horno'],
      timeMinutes: 30,
      temperature: '200 °C',
      temperatureC: 200,
      steps: [
        {
          id: 'preheat-season',
          phaseId: 'prep',
          text: {
            beginner:
              'Precalienta el horno a 200 °C. Seca {qty:pollo}, mézclalo con {qty:aceite} y sal, y distribúyelo en una bandeja dejando espacio entre piezas.',
            intermediate:
              'Precalienta a 200 °C; seca y sazona {qty:pollo} con {qty:aceite}, separando las piezas en la bandeja.',
            advanced:
              'Horno a 200 °C; pollo seco, sazonado y espaciado sobre bandeja para favorecer el asado.',
          },
          temperatureC: 200,
        },
        {
          id: 'roast',
          phaseId: 'cook',
          text: {
            beginner:
              'Asa 25-30 minutos y gira las piezas a mitad. Comprueba la más gruesa: debe alcanzar 74 °C en el centro, sin zonas rosadas y con jugos claros.',
            intermediate:
              'Asa 25-30 minutos, gira a mitad y retira cuando el centro de la pieza más gruesa llegue a 74 °C.',
            advanced:
              'Asa con volteo a mitad hasta 74 °C internos; prolonga solo lo necesario para dorar sin resecar.',
          },
          timerSeconds: 1650,
          timerLabel: 'Pollo al horno',
          temperatureC: 200,
          similarKey: 'pollo+horno+200C',
        },
        {
          id: 'rest',
          phaseId: 'rest',
          text: {
            beginner:
              'Pasa el pollo a un plato y déjalo reposar 3 minutos antes de cortar para que conserve sus jugos.',
            intermediate: 'Deja reposar el pollo 3 minutos antes de servir.',
            advanced: 'Reposa 3 minutos fuera de la bandeja y sirve con sus jugos.',
          },
          timerSeconds: 180,
          timerLabel: 'Reposo del pollo',
          termIds: ['reposar'],
        },
      ],
    },
    {
      id: 'air',
      label: 'Air Fryer',
      equipmentIds: ['airfryer'],
      timeMinutes: 25,
      temperature: '180 °C',
      temperatureC: 180,
      steps: [
        {
          id: 'preheat-season',
          phaseId: 'prep',
          text: {
            beginner:
              'Precalienta la Air Fryer a 180 °C durante 3 minutos. Seca {qty:pollo}, mézclalo con {qty:aceite} y sal, y colócalo en una sola capa sin tapar la circulación de aire.',
            intermediate:
              'Precalienta a 180 °C; seca y sazona {qty:pollo} con {qty:aceite}, formando una sola capa en la cesta.',
            advanced:
              'Air Fryer a 180 °C; pollo seco, sazonado y espaciado para maximizar la convección.',
          },
          timerSeconds: 180,
          timerLabel: 'Precalentar Air Fryer',
          temperatureC: 180,
        },
        {
          id: 'airfry',
          phaseId: 'cook',
          text: {
            beginner:
              'Cocina 20-25 minutos y gira las piezas a los 12 minutos. Comprueba la pieza más gruesa: centro a 74 °C, sin zonas rosadas y con jugos claros.',
            intermediate:
              'Cocina 20-25 minutos, gira a mitad y retira al alcanzar 74 °C en el centro.',
            advanced:
              'Cocina con volteo a mitad hasta 74 °C internos; evita prolongar el ciclo una vez alcanzado el punto.',
          },
          timerSeconds: 1320,
          timerLabel: 'Pollo en Air Fryer',
          temperatureC: 180,
          similarKey: 'pollo+airfryer+180C',
        },
        {
          id: 'rest',
          phaseId: 'rest',
          text: {
            beginner:
              'Deja reposar el pollo 3 minutos fuera de la cesta antes de cortarlo; así pierde menos jugo.',
            intermediate: 'Reposa el pollo 3 minutos fuera de la cesta antes de servir.',
            advanced: 'Reposa 3 minutos fuera de la cesta y sirve de inmediato.',
          },
          timerSeconds: 180,
          timerLabel: 'Reposo del pollo',
          termIds: ['reposar'],
        },
      ],
    },
  ];
}

function flattenSteps(recipe) {
  recipe.steps = (recipe.methods?.[0]?.steps || [])
    .filter((step) => !step.levels || step.levels.includes('intermediate'))
    .map((step) =>
      typeof step.text === 'string'
        ? step.text
        : step.text.intermediate || step.text.beginner || step.text.advanced,
    );
}

function catalogContainsFluff(recipe) {
  for (const method of recipe.methods || []) {
    for (const step of method.steps || []) {
      const texts =
        typeof step.text === 'string'
          ? [step.text]
          : LEVELS.map((l) => step.text?.[l]).filter(Boolean);
      if (texts.some((t) => BANNED_FLUFF.some((p) => t.includes(p)))) return true;
    }
  }
  return false;
}

function classifyRewrite(recipe) {
  if (HANDCRAFTED_IDS.has(recipe.id)) return 'substantial';
  let maxBeginner = 0;
  let badUpper = 0;
  for (const method of recipe.methods || []) {
    for (const step of method.steps || []) {
      if (typeof step.text !== 'object') continue;
      maxBeginner = Math.max(maxBeginner, words(step.text.beginner));
      for (const lv of ['intermediate', 'advanced']) {
        if (levelTooShortForStats(step.text[lv], lv)) badUpper += 1;
      }
    }
  }
  if (badUpper >= 2 || maxBeginner >= 18) return 'substantial';
  if (badUpper >= 1) return 'light';
  return 'unchanged';
}

function levelTooShortForStats(text, level) {
  const t = (text || '').trim();
  if (!t) return true;
  if (words(t) <= 4) return true;
  if (level === 'advanced' && words(t) <= 6 && !/\d/.test(t)) return true;
  return false;
}

const catalog = buildBaseCatalog(path.join(__dirname, '..'));

const polishStats = polishCatalog(catalog, { skipRecipeIds: HANDCRAFTED_IDS });

let substantial = 0;
let light = 0;
let unchanged = 0;
let multimethodCount = 0;

for (const recipe of catalog) {
  if (recipe.id === 'salmon-plancha-simple') setSalmonPlancha(recipe);
  if (recipe.id === 'pollo-horno-air') setPolloHornoAir(recipe);
  if ((recipe.methods || []).length > 1) multimethodCount += 1;

  ensurePhaseIds(recipe);
  applyQuantityTokens(recipe);

  for (const method of recipe.methods || []) {
    for (const step of method.steps || []) {
      keepMentionedTerms(step);
      inferHeat(step, method);
    }
  }

  flattenSteps(recipe);

  const kind = classifyRewrite(recipe);
  if (kind === 'substantial') substantial += 1;
  else if (kind === 'light') light += 1;
  else unchanged += 1;
}

const header = `import type { Recipe } from '../types';

/**
 * Catálogo Bon Appetit v1.3.2 — revisión culinaria integral.
 * Fuente de verdad: scripts/culinary-v132-rewrite.mjs y overrides manuales.
 * No ejecutar build-quality-catalog.mjs sin confirmar: sobrescribe esta revisión.
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
      total: catalog.length,
      substantialRewrite: substantial,
      lightlyAdjusted: light,
      unchanged,
      handcraftedIds: [...HANDCRAFTED_IDS],
      polishStepsTouched: polishStats.stepsPolished,
      multimethodCount,
      fluffRemaining: catalog.filter(catalogContainsFluff).map((r) => r.id),
    },
    null,
    2,
  ),
);
