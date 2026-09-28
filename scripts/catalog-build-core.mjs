/** Shared catalog builder for v1.3.2 culinary pipeline. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildAllRecipes } from './register-recipes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function buildBaseCatalog(root = path.join(__dirname, '..')) {
const foodsSrc = fs.readFileSync(path.join(root, 'src/data/foods.ts'), 'utf8');
const VALID_FOOD_IDS = new Set([...foodsSrc.matchAll(/id: '([^']+)'/g)].map((m) => m[1]));

const FOD_LOW = {
  level: 'low',
  note: 'Puede depender de la cantidad y tolerancia personal.',
};
const FOD_MOD = {
  level: 'moderate',
  note: 'Puede depender de la cantidad y tolerancia personal.',
};

const N = {
  tomate: 'tomate',
  calabacin: 'calabacín',
  zanahoria: 'zanahoria',
  lechuga: 'lechuga',
  pepino: 'pepino',
  pimiento: 'pimiento',
  cebolla: 'cebolla',
  ajo: 'ajo',
  espinacas: 'espinacas',
  brocoli: 'brócoli',
  platano: 'plátano',
  manzana: 'manzana',
  naranja: 'naranja',
  fresas: 'fresas',
  pollo: 'pollo',
  huevos: 'huevos',
  pavo: 'pavo',
  jamon: 'jamón',
  salmon: 'salmón',
  ternera: 'ternera',
  queso: 'queso',
  yogur: 'yogur',
  leche: 'leche',
  guisantes: 'guisantes',
  'verduras-mixtas': 'verduras mixtas',
  'pollo-congelado': 'pollo congelado',
  'pescado-congelado': 'pescado',
  arroz: 'arroz',
  pasta: 'pasta',
  patatas: 'patatas',
  pan: 'pan',
  cuscus: 'cuscús',
  avena: 'avena',
  'tortillas-trigo': 'tortilla de trigo',
  atun: 'atún',
  'tomate-frito': 'tomate frito',
  garbanzos: 'garbanzos',
  maiz: 'maíz',
  aceitunas: 'aceitunas',
  'croquetas-jamon': 'croquetas de jamón',
  'patatas-fritas-congeladas': 'patatas fritas congeladas',
  nuggets: 'nuggets',
  'pizza-congelada': 'pizza congelada',
  'lasana-preparada': 'lasaña preparada',
  empanadillas: 'empanadillas',
  'hot-dog': 'salchichas',
  lentejas: 'lentejas',
  hummus: 'hummus',
  aceite: 'aceite',
  sal: 'sal',
};

const levels = (beginner, intermediate, advanced) => ({ beginner, intermediate, advanced });

const step = (id, text, opts = {}) => ({ id, text, ...opts });

const m = (id, label, eq, steps, extra = {}) => ({
  id,
  label,
  equipmentIds: eq,
  steps,
  ...extra,
});

const ing = (foodId, quantity, amountPerServing, unit, optional) => {
  if (!VALID_FOOD_IDS.has(foodId)) throw new Error(`foodId inválido: ${foodId}`);
  return {
    foodId,
    quantity,
    ...(amountPerServing != null ? { amountPerServing, unit } : {}),
    ...(optional ? { optional: true } : {}),
  };
};

function recipe(def) {
  const {
    beginner: _b,
    intermediate: _i,
    advanced: _a,
    extraIng: _e,
    riceOpts: _r,
    sauceSteps: _s,
    pastaNote: _pn,
    pastaMin: _pm,
    doneness: _d,
    finishBeginner: _fb,
    finishMid: _fm,
    finishAdv: _fa,
    equipment: _eq,
    step2: _s2,
    productDesc: _pd,
    methods: methodsIn,
    steps: stepsIn,
    ...rest
  } = def;

  const methods = (methodsIn || []).map((method) => {
    const steps = (method.steps || []).map((s) => {
      const next = { ...s };
      if (next.similarKey == null) delete next.similarKey;
      if (next.temperatureC == null) delete next.temperatureC;
      return next;
    });
    const mNext = { ...method, steps };
    if (mNext.temperature == null) delete mNext.temperature;
    if (mNext.temperatureC == null) delete mNext.temperatureC;
    return mNext;
  });

  const flatSteps =
    stepsIn ||
    (methods[0]
      ? methods[0].steps.map((s) =>
          typeof s.text === 'string'
            ? s.text
            : s.text?.intermediate || s.text?.beginner || '',
        )
      : []);

  return {
    ...rest,
    baseServings: rest.baseServings ?? 1,
    pepperTags: rest.pepperTags || ['completo'],
    imageHue: rest.imageHue ?? stableHue(rest.id),
    difficulty: rest.difficulty,
    dishRole: rest.dishRole,
    fodmap: rest.fodmap || FOD_MOD,
    mealTypes: rest.mealTypes?.length ? rest.mealTypes : ['comida', 'cena'],
    steps: flatSteps,
    methods,
  };
}

function stableHue(id) {
  if (!id || typeof id !== 'string') return 90;
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
}

function nm(id) {
  return N[id] || id;
}

// ——— Familias culinarias ———

function riceBoilSteps({ riceG = 80, waterMl = 160, simmerMin = 12, addinLine, mixStep, finishStep }) {
  return [
    step(
      'prep-rice',
      levels(
        `Mide ${riceG} g de arroz en un bol. En una olla mediana vierte ${waterMl} ml de agua fría, el arroz y una pizca de sal. ${addinLine || ''}`.trim(),
        `Olla: arroz ${riceG} g, agua ~2:1, sal. ${addinLine ? addinLine.replace(/Ten a mano.*/, 'Prep add-in.') : ''}`.trim(),
        `Arroz ${riceG} g / ${waterMl} ml agua.`,
      ),
    ),
    step(
      'cook-rice',
      levels(
        `Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece ${simmerMin} min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.`,
        `Hierve, tapa, ${simmerMin} min a fuego bajo; reposa 3 min.`,
        `Cuece ${simmerMin} min tapado; reposar.`,
      ),
      { timerSeconds: simmerMin * 60, timerLabel: 'Arroz a fuego lento', termIds: ['reposar'] },
    ),
    ...(mixStep ? [mixStep] : []),
    ...(finishStep ? [finishStep] : []),
  ];
}

function buildArrozAtun() {
  return recipe({
    id: 'arroz-atun',
    name: 'Arroz con atún',
    timeMinutes: 20,
    difficulty: 'media',
    dishRole: 'platoPrincipal',
    pepperTags: ['rapido', 'completo'],
    fodmap: FOD_LOW,
    ingredients: [
      ing('arroz', '80 g', 80, 'g'),
      ing('atun', '1 lata escurrida', 1, 'lata'),
      ing('aceite', '1 cucharada', 1, 'cucharada'),
      ing('sal', 'al gusto'),
    ],
    methods: [
      m('olla', 'Olla', ['olla', 'vitro'], [
        ...riceBoilSteps({
          addinLine:
            'Abre la lata de atún y escúrrela en un colador; reserva (no la mezcles hasta que el arroz esté cocido).',
          mixStep: step(
            'mix-tuna',
            levels(
              'Con la olla apagada y el arroz ya suelto, añade el atún escurrido y un chorrito de aceite. Mezcla con cuidado con tenedor; el atún debe calentarse solo con el calor residual, sin volver a cocinar.',
              'Incorpora atún escurrido y aceite fuera del fuego.',
              'Mezcla atún escurrido off-heat.',
            ),
          ),
          finishStep: step(
            'serve',
            levels(
              'Prueba sal y sirve al momento en un plato hondo. Si queda seco, un poco más de aceite.',
              'Ajusta sal y emplata.',
              'Sirve.',
            ),
          ),
        }),
      ]),
    ],
  });
}

function buildPolloPatatasCombo() {
  return recipe({
    id: 'pollo-patatas-combo',
    name: 'Pollo a la sartén con patatas air fryer',
    timeMinutes: 30,
    difficulty: 'avanzada',
    dishRole: 'platoPrincipal',
    pepperTags: ['completo', 'especial'],
    fodmap: FOD_LOW,
    ingredients: [
      ing('pollo', '180 g', 180, 'g'),
      ing('patatas', '2 medianas', 2, 'unidades'),
      ing('aceite', '2 cucharadas', 2, 'cucharada'),
      ing('sal', 'al gusto'),
    ],
    methods: [
      m('combo', 'Sartén + Air Fryer', ['sarten', 'vitro', 'airfryer'], [
        step(
          'prep-potatoes',
          levels(
            'Primero las patatas (tardan más): pela, corta en gajos, seca con papel, mezcla con 1 cucharada de aceite y sal. Extiéndelas en la cesta del Air Fryer sin amontonar.',
            'Gajos de patata aceite+sal; capa única en Air Fryer.',
            'Patatas gajo → Air Fryer.',
          ),
        ),
        step(
          'airfry-potatoes',
          levels(
            'Precalienta el Air Fryer si hace falta y cocina a 190 °C unos 18 min; abre a mitad y agita. Deben quedar doradas por fuera y tiernas por dentro.',
            'Air Fryer 190 °C ~18 min, agitar a mitad.',
            '190 °C, 18 min.',
          ),
          {
            timerSeconds: 1080,
            timerLabel: 'Patatas Air Fryer',
            temperatureC: 190,
            similarKey: 'patatas_gajo+airfryer+190C',
          },
        ),
        step(
          'cook-chicken',
          levels(
            'Mientras las patatas avanzan (arranca el pollo cuando queden ~10 min de patatas): salpica el pollo. Sartén con 1 cucharada de aceite a fuego medio-alto; cocina 4-5 min por lado hasta que no quede rosado en el centro (corta un trozo para comprobar).',
            'Sella el pollo en sartén medio-alto; cocinado por dentro.',
            'Pollo sartén; coordina con patatas.',
          ),
          { termIds: ['sellar', 'saltear'], timerSeconds: 600, timerLabel: 'Pollo en sartén' },
        ),
        step(
          'serve',
          levels(
            'Sirve el pollo en caliente junto a las patatas recién salidas del Air Fryer; deben llegar a la mesa a la vez.',
            'Emplata pollo y patatas juntos.',
            'Emplata.',
          ),
        ),
      ], { temperature: 'Air Fryer 190 °C', timeMinutes: 30 }),
    ],
  });
}

function buildPolloArrozCalabacin() {
  return recipe({
    id: 'pollo-arroz-calabacin',
    name: 'Pollo con arroz y calabacín',
    timeMinutes: 25,
    difficulty: 'media',
    dishRole: 'platoPrincipal',
    pepperTags: ['completo'],
    fodmap: FOD_LOW,
    ingredients: [
      ing('pollo', '1 pechuga (~180 g)', 180, 'g'),
      ing('arroz', '80 g', 80, 'g'),
      ing('calabacin', '1 pequeño', 1, 'unidad'),
      ing('aceite', '1 cucharada', 1, 'cucharada'),
      ing('sal', 'al gusto'),
    ],
    methods: [
      m('sarten', 'Sartén + olla', ['sarten', 'vitro', 'olla'], [
        step(
          'prep',
          levels(
            'Lava el calabacín y córtalo en cubitos de 1 cm. Corta el pollo en dados del tamaño de un bocado. Pon a hervir una olla con agua salada para el arroz.',
            'Trocea calabacín y pollo; pon agua a hervir.',
            'Prep verdura y pollo; agua a hervir.',
          ),
        ),
        step(
          'cook-rice',
          levels(
            'Cuando hierva, echa 80 g de arroz y cuece 10-12 min removiendo de vez en cuando hasta tierno. Escurre si queda agua.',
            'Cuece arroz 10-12 min; escurre.',
            'Arroz 10-12 min.',
          ),
          { timerSeconds: 720, timerLabel: 'Arroz', termIds: ['al-dente'] },
        ),
        step(
          'cook-chicken',
          levels(
            'En sartén con aceite a fuego medio-alto, cocina el pollo removiendo 6-7 min hasta que no esté rosado por dentro.',
            'Saltea pollo 6-7 min hasta cocinado.',
            'Saltea pollo.',
          ),
          { termIds: ['saltear'], timerSeconds: 420, timerLabel: 'Pollo' },
        ),
        step(
          'finish',
          levels(
            'Retira el pollo. En la misma sartén, saltea el calabacín 4-5 min. Vuelve el pollo y el arroz, mezcla 1 min y sirve.',
            'Saltea calabacín; integra pollo y arroz.',
            'Integra y sirve.',
          ),
          { termIds: ['saltear'] },
        ),
      ]),
    ],
  });
}

function buildCalabacinPlancha() {
  return recipe({
    id: 'calabacin-plancha',
    name: 'Calabacín a la plancha / sartén',
    timeMinutes: 12,
    difficulty: 'fácil',
    dishRole: 'guarnicion',
    pepperTags: ['rapido', 'ligero'],
    mealTypes: ['comida', 'cena', 'merienda'],
    fodmap: FOD_LOW,
    ingredients: [
      ing('calabacin', '1 unidad', 1, 'unidad'),
      ing('aceite', '1 cucharada', 1, 'cucharada'),
      ing('sal', 'al gusto'),
    ],
    methods: [
      m('plancha', 'Plancha', ['plancha', 'vitro'], [
        step(
          'prep',
          levels(
            'Lava el calabacín y córtalo en rodajas de 1 cm. Seca ligeramente y unta una cara con aceite y sal.',
            'Rodajas 1 cm; aceite y sal.',
            'Rodajas 1 cm.',
          ),
        ),
        step(
          'cook',
          levels(
            'Plancha bien caliente: cocina 3-4 min el primer lado hasta marcas doradas; da la vuelta y otros 3-4 min hasta tierno al pinchar.',
            'Plancha 3-4 min por lado.',
            'Plancha hasta marcar.',
          ),
          { timerSeconds: 240, timerLabel: 'Primer lado' },
        ),
      ]),
      m('sarten', 'Sartén', ['sarten', 'vitro'], [
        step(
          'prep',
          levels(
            'Corta el calabacín en rodajas o medias lunas. Calienta una sartén con aceite a fuego medio.',
            'Corta calabacín; aceite en sartén.',
            'Prep; aceite caliente.',
          ),
        ),
        step(
          'cook',
          levels(
            'Saltea removiendo 6-8 min hasta que esté tierno y ligeramente dorado.',
            'Saltea 6-8 min.',
            'Saltea hasta tierno.',
          ),
          { termIds: ['saltear'], timerSeconds: 420, timerLabel: 'Calabacín' },
        ),
      ]),
      m('air', 'Air Fryer', ['airfryer'], [
        step(
          'prep',
          levels(
            'Corta rodajas, mezcla con aceite y sal. Capa única en la cesta.',
            'Rodajas aceite+sal; capa única.',
            'Rodajas aceite+sal.',
          ),
        ),
        step(
          'cook',
          levels(
            'Cocina a 180 °C unos 10-12 min; agita a mitad. Deben quedar tiernas por dentro.',
            '180 °C, 10-12 min, agitar.',
            '180 °C ~11 min.',
          ),
          {
            timerSeconds: 660,
            timerLabel: 'Air Fryer',
            temperatureC: 180,
            similarKey: 'calabacin+airfryer+180C',
          },
        ),
      ], { temperature: '180 °C', timeMinutes: 12 }),
    ],
  });
}

function buildTortillaPatata() {
  return recipe({
    id: 'tortilla-patata',
    name: 'Tortilla de patata sencilla',
    timeMinutes: 30,
    difficulty: 'avanzada',
    dishRole: 'platoPrincipal',
    pepperTags: ['completo', 'comfort'],
    ingredients: [
      ing('huevos', '3 unidades', 3, 'unidades'),
      ing('patatas', '2 medianas', 2, 'unidades'),
      ing('aceite', '3 cucharadas', 3, 'cucharada'),
      ing('sal', 'al gusto'),
      ing('cebolla', '1/2 (opcional)', 0.5, 'unidad', true),
    ],
    methods: [
      m('sarten', 'Sartén', ['sarten', 'vitro'], [
        step(
          'prep-potato',
          levels(
            'Pela las patatas y córtalas en rodajas finas (2-3 mm). Si usas cebolla, córtala en juliana fina.',
            'Patata en rodajas finas; cebolla opcional.',
            'Patata fina; cebolla opc.',
          ),
        ),
        step(
          'fry-potato',
          levels(
            'En sartén amplia con aceite a fuego medio-bajo, confita patata (y cebolla) 10-12 min removiendo hasta blandas, no crujientes. Escurre aceite sobrante.',
            'Pochar patata en aceite medio-bajo 10-12 min.',
            'Pochar patata 10-12 min.',
          ),
          { termIds: ['pochar'], timerSeconds: 660, timerLabel: 'Patatas confitadas' },
        ),
        step(
          'mix-egg',
          levels(
            'Bate los huevos con sal en un bol. Mezcla con las patatas calientes y deja reposar 1 min para que se impregnen.',
            'Huevo batido + patatas; reposar 1 min.',
            'Mezcla huevo y patata.',
          ),
        ),
        step(
          'set-tortilla',
          levels(
            'Vierte en sartén antiadherente con un poco de aceite a fuego medio-bajo. Cuaja 4-5 min hasta que bordes estén firmes; da la vuelta con un plato y cocina 3-4 min más. Centro ligeramente jugoso o más cuajado según prefieras.',
            'Cuaja 4-5 min, vuelta, 3-4 min.',
            'Cuaja y voltea.',
          ),
        ),
      ]),
    ],
  });
}


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
    if (byId.has(r.id)) throw new Error(`Duplicate recipe id: ${r.id}`);
    byId.set(r.id, r);
  }
  const catalog = [...byId.values()];

  for (const r of catalog) {
    for (const method of r.methods || []) {
      method.steps = method.steps.map((s, i) => {
        if (typeof s === 'string') return { id: `${method.id}-${i}`, text: s };
        return { ...s, id: s.id || `${method.id}-${i}` };
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
