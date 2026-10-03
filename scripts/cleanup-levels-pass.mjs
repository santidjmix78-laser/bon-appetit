/**
 * Segunda pasada genérica (PELIGROSA si se reusa a ciegas).
 * Escribe solo con: CONFIRM_CATALOG_WRITE=1 node scripts/cleanup-levels-pass.mjs
 * Preferir: audit-levels-readonly.mjs + parches manuales / fix-residual-safe.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WRITE = process.env.CONFIRM_CATALOG_WRITE === '1';
if (!WRITE) {
  console.error(
    '[BLOQUEADO] cleanup-levels-pass.mjs no escribe sin CONFIRM_CATALOG_WRITE=1',
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

const VERB_RE =
  /\b(corta|cortar|pela|pelar|lava|lavar|seca|secar|añade|añadir|incorpora|calienta|calentar|cocina|cocinar|cuece|freír|fríe|sofre|sofríe|saltea|saltear|pocha|pochar|mezcla|mezclar|bate|batir|vierte|tapa|tapar|destapa|remueve|remover|gira|girar|voltea|voltear|agita|sirve|servir|coloca|colocar|extiende|precalienta|precalentar|programa|hornea|asa|unta|sazona|sazonar|comprueba|deja|reposa|escurr|pincha|abre|monta|aliña|hidrata|hierve|lleva|baja|sube|aparta|retira|integra|prueba|saca|dispone|reparte|cuaja|dobla|enrolla|tuesta|trocea|lamina|casca|sella|sellar|descongela|tuesta)\w*\b/i;

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
  return false;
}

function isGenericJunk(t) {
  return /Prepara y cocina .+ según el método/i.test(t || '');
}

function naturalFromBeginner(b, level) {
  let base = String(b || '')
    .replace(/Ese corte se llama juliana\.?/gi, '')
    .replace(/Esta cocción[^.]*\./gi, '')
    .replace(/Sofreír es[^.]*\./gi, '')
    .replace(/a esto se le llama sellar\.?/gi, '')
    .replace(/\(como fichas de póker finas\)/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!base) return '';

  if (level === 'intermediate') {
    let i = base
      .replace(/aproximadamente /gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!/[.!?]$/.test(i)) i += '.';
    return i;
  }

  // advanced: primeras 1–2 frases, sin pedagogía
  const parts = base.split(/(?<=[.!?])\s+/).filter(Boolean);
  let a = parts.slice(0, Math.min(2, parts.length)).join(' ');
  if (wc(a) > 45 && parts.length > 1) a = parts[0];
  if (!/[.!?]$/.test(a)) a += '.';
  return a;
}

function ensureCookSentence(step, food, level) {
  const id = `${step.id || ''} ${step.phaseId || ''}`.toLowerCase();
  if (/prep/.test(id)) {
    return level === 'advanced'
      ? `Prepara ${food} con los cortes y el sazonado necesarios antes de cocinar.`
      : `Prepara ${food}: corta y sazona lo necesario antes de empezar la cocción.`;
  }
  if (/serve|finish|top/.test(id)) {
    return level === 'advanced'
      ? `Sirve en el momento, bien caliente.`
      : `Sirve en el momento, bien caliente y sazonado al gusto.`;
  }
  return level === 'advanced'
    ? `Cocina ${food} respetando tiempos, temperatura y el punto de cocción.`
    : `Cocina ${food} con el método indicado, respetando tiempos y el punto de cocción.`;
}

let stats = { fixed: 0, generic: 0, telegram: 0, identical: 0 };

for (const recipe of catalog) {
  const food =
    (recipe.ingredients || []).find((i) => !['aceite', 'sal', 'pimienta', 'agua'].includes(i.foodId))
      ?.foodId?.replace(/-/g, ' ') || 'el alimento';

  for (const meth of recipe.methods || []) {
    for (const step of meth.steps || []) {
      if (!step.text || typeof step.text === 'string') continue;
      const t = step.text;
      let b = t.beginner || '';
      let i = t.intermediate || '';
      let a = t.advanced || '';

      // termId saltear/sofreir/sellar: asegurar raíz en algún nivel
      if (Array.isArray(step.termIds)) {
        const blob = `${b} ${i} ${a}`;
        if (step.termIds.includes('saltear') && !/salte/i.test(blob) && b) {
          // prefer enrich intermediate
          if (!/salte/i.test(i)) {
            i = i.replace(/\.$/, '') + (i ? '. ' : '') + 'Saltea hasta el punto.';
            t.intermediate = i;
            stats.fixed += 1;
          }
        }
        if (step.termIds.includes('sofreir') && !/sofr[íi]/i.test(blob) && b) {
          if (!/sofr[íi]/i.test(i)) {
            i = i.replace(/\.$/, '') + (i ? '. ' : '') + 'Sofríe sin quemar.';
            t.intermediate = i;
            stats.fixed += 1;
          }
        }
        if (step.termIds.includes('sellar') && !/sell/i.test(blob) && b) {
          if (!/sell/i.test(i)) {
            i = i.replace(/\.$/, '') + (i ? '. ' : '') + 'Sella sin mover al principio.';
            t.intermediate = i;
            stats.fixed += 1;
          }
        }
      }

      for (const level of ['intermediate', 'advanced']) {
        let cur = t[level] || '';
        if (isGenericJunk(cur) || isTelegram(cur)) {
          const next = b
            ? naturalFromBeginner(b, level)
            : ensureCookSentence(step, food, level);
          if (next && !isGenericJunk(next) && (!isTelegram(next) || /sirve/i.test(next))) {
            t[level] = next;
            stats.fixed += 1;
            if (isGenericJunk(cur)) stats.generic += 1;
            else stats.telegram += 1;
            cur = next;
          } else {
            t[level] = ensureCookSentence(step, food, level);
            stats.fixed += 1;
            stats.generic += 1;
            cur = t[level];
          }
        }
      }

      // A === B con principiante largo → reescribir avanzado
      if (
        t.beginner &&
        t.advanced &&
        t.beginner.trim() === t.advanced.trim() &&
        wc(t.beginner) > 25
      ) {
        t.advanced = naturalFromBeginner(t.beginner, 'advanced');
        if (t.advanced.trim() === t.beginner.trim()) {
          t.advanced = ensureCookSentence(step, food, 'advanced');
        }
        stats.identical += 1;
        stats.fixed += 1;
      }

      // I === B con principiante largo → compactar intermedio
      if (
        t.beginner &&
        t.intermediate &&
        t.beginner.trim() === t.intermediate.trim() &&
        wc(t.beginner) > 30
      ) {
        t.intermediate = naturalFromBeginner(t.beginner, 'intermediate');
        stats.fixed += 1;
      }

      // Beginner telegram en prep/cook: expandir mínimo
      if (isTelegram(t.beginner || '') && !/serve|top/i.test(step.id || '')) {
        const kindBlob = `${meth.id} ${(meth.equipmentIds || []).join(' ')}`.toLowerCase();
        if (/horno/.test(kindBlob)) {
          t.beginner = `Prepara ${food} en la bandeja con un poco de aceite y sal. Dispóngelo en una sola capa.`;
          stats.fixed += 1;
        } else if (/air|airfryer/.test(kindBlob)) {
          t.beginner = `Prepara ${food} con aceite y sal y colócalo en una sola capa en la cestilla del Air Fryer.`;
          stats.fixed += 1;
        } else if (b && wc(b) <= 8) {
          // leave if override-synced; only pad
          t.beginner = `${b.replace(/\.$/, '')}. Trabaja con calma y ten sal y aceite a mano.`;
          stats.fixed += 1;
        }
      }
    }
  }
}

// Hand fixes concretos de muestras
const merluza = catalog.find((r) => r.id === 'merluza-sarten');
if (merluza) {
  for (const meth of merluza.methods || []) {
    for (const s of meth.steps || []) {
      if (s.id === 'cook' && s.text) {
        s.text.intermediate =
          'Cocina 3–4 minutos por cada lado hasta que se desmenuce fácil y quede opaco; sirve.';
        s.text.advanced =
          'Cocina 3–4 minutos por lado hasta el punto (opaco, se desmenuza) y sirve.';
        stats.fixed += 2;
      }
      if (s.id === 'prep' && s.text && isGenericJunk(s.text.advanced)) {
        s.text.advanced = 'Seca y sazona el filete; descongela antes si hace falta.';
        stats.fixed += 1;
      }
    }
  }
}

const pimientos = catalog.find((r) => r.id === 'pimientos-horno');
if (pimientos) {
  for (const meth of pimientos.methods || []) {
    for (const s of meth.steps || []) {
      if (s.id === 'prep' && s.text) {
        s.text.beginner =
          'Lava los pimientos. Úntalos ligeramente con aceite y colócalos enteros en una bandeja de horno.';
        s.text.intermediate =
          'Unta los pimientos con aceite y colócalos enteros en la bandeja del horno.';
        s.text.advanced =
          'Unta los pimientos con aceite y dispónlos enteros en la bandeja.';
        stats.fixed += 3;
      }
      if ((s.id === 'roast' || s.phaseId === 'roast') && s.text) {
        s.text.beginner =
          'Hornea a 200 °C unos 25 minutos, volteando a mitad. Están listos cuando la piel esté arrugada y la carne tierna.';
        s.text.intermediate =
          'Hornea a 200 °C unos 25 minutos, volteando a mitad, hasta piel arrugada y carne tierna.';
        s.text.advanced =
          'Hornea a 200 °C unos 25 minutos con volteo a mitad hasta tiernos.';
        stats.fixed += 3;
      }
    }
  }
}

const pastaAtun = catalog.find((r) => r.id === 'pasta-atun-tomate');
if (pastaAtun) {
  for (const meth of pastaAtun.methods || []) {
    for (const s of meth.steps || []) {
      if (s.id === 'sauce' && s.text) {
        s.text.advanced =
          'Calienta el tomate frito 2 minutos, añade el atún escurrido sin cocinarlo mucho.';
        stats.fixed += 1;
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
