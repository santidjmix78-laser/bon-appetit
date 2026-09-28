/**
 * Segunda pasada culinaria v1.3.2: expande recetas de cocción aún demasiado
 * pobres (1 frase / sin utensilio / sin punto) a fases pedagógicas reales.
 * No usa truncado ni coletillas genéricas.
 * Ejecutar: node scripts/culinary-family-deep-fix.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.join(__dirname, '../src/data/recipes.catalog.ts');

const src = fs.readFileSync(catalogPath, 'utf8');
const match = src.match(
  /export const RECIPE_CATALOG: Recipe\[\] = (\[[\s\S]*\])\s*;/,
);
if (!match) throw new Error('No se pudo leer RECIPE_CATALOG');
const catalog = JSON.parse(match[1]);

function L(beginner, intermediate, advanced) {
  return { beginner, intermediate, advanced };
}

function S(id, phaseId, text, opts = {}) {
  return { id, phaseId, text, ...opts };
}

/** Reescrituras sustanciales por id. */
const FIXES = {
  'pavo-sarten': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Corta {qty:pavo} en tiras o dados similares. Lava el pimiento, quita semillas y córtalo en tiras. Ten {qty:aceite} y sal a mano.',
              'Trocea pavo y pimiento en tiras.',
              'Pavo y pimiento en tiras.',
            ),
          ),
          S(
            'cook-pavo',
            'cook-protein',
            L(
              'Calienta una sartén con aceite a fuego medio-alto. Añade el pavo en una sola capa. Cocina 4 min removiendo hasta que deje de verse rosa por fuera.',
              'Saltea pavo 4 min a fuego medio-alto hasta opaco por fuera.',
              'Saltear pavo 4 min a fuego medio-alto.',
            ),
            {
              heatLevel: 'medio-alto',
              termIds: ['saltear'],
              timerSeconds: 240,
              timerLabel: 'Pavo',
            },
          ),
          S(
            'cook-pepper',
            'cook-veg',
            L(
              'Añade el pimiento. Cocina 3–4 min más removiendo. El pavo debe estar opaco por dentro (abre un trozo) y el pimiento tierno-crujiente. Sala y sirve.',
              'Añade pimiento 3–4 min; salar. Pavo opaco por dentro.',
              'Pimiento 3–4 min; salar; pavo al punto.',
            ),
            {
              heatLevel: 'medio-alto',
              timerSeconds: 210,
              timerLabel: 'Pimiento',
            },
          ),
        ],
      },
    ];
  },

  'merluza-sarten': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Si el pescado está congelado, descongélalo antes (nevera o agua fría en bolsa). Sécalo con papel. Sala ligeramente por ambos lados. Ten {qty:aceite} listo.',
              'Descongela si hace falta; seca y sala el filete.',
              'Filete seco y sazonado.',
            ),
          ),
          S(
            'heat',
            'heat',
            L(
              'Calienta una sartén con 1–2 cucharadas de aceite a fuego medio-alto 1 min. El aceite debe brillar sin humear.',
              'Sartén con aceite a fuego medio-alto.',
              'Aceite a fuego medio-alto.',
            ),
            { heatLevel: 'medio-alto' },
          ),
          S(
            'cook',
            'cook',
            L(
              'Coloca el pescado. Cocina 3–4 min por el primer lado sin mover. Dale la vuelta y cocina 3–4 min más. Está listo cuando se desmenuza fácil con un tenedor y la carne ya no está traslúcida. Sirve.',
              '3–4 min por lado hasta desmenuzar fácil y opaco; servir.',
              '3–4 min/lado al punto (opaco, se desmenuza); servir.',
            ),
            {
              heatLevel: 'medio-alto',
              timerSeconds: 420,
              timerLabel: 'Pescado',
            },
          ),
        ],
      },
    ];
  },

  'garbanzos-tomate': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Abre el bote de garbanzos, escúrrelos en un colador y acláralos con agua. Ten {qty:tomate-frito} y {qty:aceite} a mano.',
              'Escurre y aclara los garbanzos.',
              'Garbanzos escurridos.',
            ),
          ),
          S(
            'cook',
            'cook',
            L(
              'En una sartén, calienta el aceite a fuego medio. Añade garbanzos y tomate frito. Remueve 5–6 min hasta que hierva suave y los garbanzos estén calientes de dentro. Prueba sal y sirve.',
              'Saltea garbanzos con tomate 5–6 min a fuego medio; salar.',
              'Garbanzos + tomate 5–6 min a fuego medio; salar.',
            ),
            {
              heatLevel: 'medio',
              termIds: ['saltear'],
              timerSeconds: 300,
              timerLabel: 'Garbanzos',
            },
          ),
        ],
      },
    ];
  },

  'garbanzos-espinacas': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Escurre y aclara los garbanzos. Lava las espinacas si hace falta. Ten aceite y sal listos.',
              'Escurre garbanzos; espinacas listas.',
              'Garbanzos y espinacas listos.',
            ),
          ),
          S(
            'wilt',
            'wilt',
            L(
              'Sartén con un chorrito de aceite a fuego medio. Añade espinacas: en 1–2 min menguarán. Remueve.',
              'Saltea espinacas 1–2 min hasta que mengüen.',
              'Espinacas 1–2 min hasta menguar.',
            ),
            { heatLevel: 'medio', termIds: ['saltear'], timerSeconds: 90, timerLabel: 'Espinacas' },
          ),
          S(
            'finish',
            'finish',
            L(
              'Añade los garbanzos escurridos. Cocina 4 min removiendo hasta calientes. Sala y sirve.',
              'Garbanzos 4 min con las espinacas; salar.',
              'Garbanzos 4 min; salar; servir.',
            ),
            { heatLevel: 'medio', timerSeconds: 240, timerLabel: 'Garbanzos' },
          ),
        ],
      },
    ];
  },

  'lentejas-tomate': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Escurre las lentejas de bote y acláralas. Ten tomate frito, aceite y sal.',
              'Escurre lentejas; tomate listo.',
              'Lentejas escurridas.',
            ),
          ),
          S(
            'cook',
            'cook',
            L(
              'Sartén con aceite a fuego medio: añade lentejas y tomate frito. Remueve 6 min hasta que burbujee suave y esté bien caliente. Prueba sal y sirve.',
              'Lentejas con tomate 6 min a fuego medio; salar.',
              'Lentejas + tomate 6 min; salar.',
            ),
            { heatLevel: 'medio', timerSeconds: 360, timerLabel: 'Lentejas' },
          ),
        ],
      },
    ];
  },

  'guisantes-jamon': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Si los guisantes son congelados, no hace falta descongelarlos. Trocea el jamón en daditos. Aceite y sal a mano.',
              'Trocea jamón; guisantes listos.',
              'Jamón troceado; guisantes.',
            ),
          ),
          S(
            'cook',
            'cook',
            L(
              'Sartén con aceite a fuego medio: saltea guisantes 5 min removiendo. Añade jamón 2 min más. Deben quedar calientes y el jamón ligeramente dorado. Sala poco (el jamón ya aporta sal) y sirve.',
              'Guisantes 5 min; jamón 2 min a fuego medio.',
              'Guisantes 5 min + jamón 2 min; salar con tiento.',
            ),
            {
              heatLevel: 'medio',
              termIds: ['saltear'],
              timerSeconds: 420,
              timerLabel: 'Guisantes',
            },
          ),
        ],
      },
    ];
  },

  'guisantes-huevo': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'peas',
            'peas',
            L(
              'Sartén con aceite a fuego medio: saltea {qty:guisantes} 4–5 min hasta calientes y de color vivo.',
              'Saltea guisantes 4–5 min a fuego medio.',
              'Guisantes 4–5 min a fuego medio.',
            ),
            { heatLevel: 'medio', termIds: ['saltear'], timerSeconds: 270, timerLabel: 'Guisantes' },
          ),
          S(
            'eggs',
            'eggs',
            L(
              'Aparta los guisantes a un lado de la sartén (o usa otra). Bate {qty:huevos} con sal. Vierte a fuego bajo-medio y remueve 1–2 min hasta cuajado cremoso. Mezcla con los guisantes y sirve.',
              'Revuelve huevos 1–2 min a fuego bajo-medio; mezcla con guisantes.',
              'Huevos revueltos 1–2 min; integrar con guisantes.',
            ),
            { heatLevel: 'medio-bajo', timerSeconds: 120, timerLabel: 'Huevos' },
          ),
        ],
      },
    ];
  },

  'verduras-mixtas-salteado': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Si las verduras son grandes, córtalas en trozos similares (2–3 cm). Ten {qty:aceite} y sal.',
              'Trocea verduras de tamaño uniforme.',
              'Verduras en trozos uniformes.',
            ),
          ),
          S(
            'cook',
            'cook',
            L(
              'Sartén amplia con aceite a fuego medio-alto. Añade verduras. Remueve cada minuto. Cocina 6–8 min hasta tiernas al pincho pero no pastosas. Sala y sirve.',
              'Saltea verduras 6–8 min a fuego medio-alto hasta tiernas.',
              'Saltear verduras 6–8 min al dente-tierno.',
            ),
            {
              heatLevel: 'medio-alto',
              termIds: ['saltear'],
              timerSeconds: 420,
              timerLabel: 'Verduras',
            },
          ),
        ],
      },
    ];
  },

  'pimiento-sarten': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Lava el pimiento, quita el pedúnculo y las semillas. Córtalo en tiras de 1 cm.',
              'Pimiento en tiras de 1 cm.',
              'Pimiento en tiras.',
            ),
          ),
          S(
            'cook',
            'cook',
            L(
              'Sartén con aceite a fuego medio-alto. Saltea las tiras 6–8 min removiendo hasta blando y algo dorado en bordes. Sala y sirve.',
              'Saltea pimiento 6–8 min a fuego medio-alto hasta tierno.',
              'Pimiento 6–8 min a fuego medio-alto.',
            ),
            {
              heatLevel: 'medio-alto',
              termIds: ['saltear'],
              timerSeconds: 420,
              timerLabel: 'Pimiento',
            },
          ),
        ],
      },
    ];
  },

  'zanahoria-salteada': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Pela la zanahoria y córtala en rodajas finas (2–3 mm) para que se cocine antes.',
              'Zanahoria en rodajas finas.',
              'Zanahoria en rodajas.',
            ),
          ),
          S(
            'cook',
            'cook',
            L(
              'Sartén con aceite a fuego medio, tapa: cocina 8–10 min removiendo a mitad. Debe pincharse fácil. Sala y sirve.',
              'Zanahoria tapada 8–10 min a fuego medio hasta tierna.',
              'Zanahoria 8–10 min tapada a fuego medio.',
            ),
            { heatLevel: 'medio', timerSeconds: 540, timerLabel: 'Zanahoria' },
          ),
        ],
      },
    ];
  },

  'brocoli-ajos': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Separa el brócoli en ramos pequeños. Pela el ajo y lámina fino. Aceite y sal listos.',
              'Ramos de brócoli; ajo laminado.',
              'Brócoli en ramos; ajo laminado.',
            ),
          ),
          S(
            'cook',
            'cook',
            L(
              'Sartén con aceite a fuego medio: sofríe el ajo 30–40 s (dorado claro). Añade brócoli y 2 cucharadas de agua. Tapa 5–6 min removiendo a mitad. Debe quedar tierno-crujiente (verde vivo, no gris). Sala y sirve. Sofreír = cocinar en poco aceite removiendo sin quemar.',
              'Sofríe ajo; brócoli tapado 5–6 min hasta tierno-crujiente.',
              'Ajo sofrito; brócoli 5–6 min tapado al punto.',
            ),
            {
              heatLevel: 'medio',
              termIds: ['sofreir'],
              timerSeconds: 360,
              timerLabel: 'Brócoli',
            },
          ),
        ],
      },
    ];
  },

  'calabacin-tomate': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Lava calabacín y tomate. Corta el calabacín en cubos de 1–2 cm y el tomate en cubos.',
              'Calabacín y tomate en cubos.',
              'Calabacín y tomate troceados.',
            ),
          ),
          S(
            'cook',
            'cook',
            L(
              'Sartén con aceite a fuego medio: saltea calabacín 5 min. Añade tomate 4 min más hasta que suelte jugo y el calabacín esté tierno. Sala y sirve.',
              'Calabacín 5 min + tomate 4 min a fuego medio.',
              'Calabacín 5 min; tomate 4 min; salar.',
            ),
            {
              heatLevel: 'medio',
              termIds: ['saltear'],
              timerSeconds: 540,
              timerLabel: 'Verduras',
            },
          ),
        ],
      },
    ];
  },

  'calabacin-relleno-simple': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'veg',
            'veg',
            L(
              'Corta el calabacín en cubos pequeños. Sartén con aceite a fuego medio: saltea 6 min hasta empezar a ablandarse.',
              'Saltea calabacín en cubos 6 min.',
              'Calabacín 6 min a fuego medio.',
            ),
            {
              heatLevel: 'medio',
              termIds: ['saltear'],
              timerSeconds: 360,
              timerLabel: 'Calabacín',
            },
          ),
          S(
            'egg',
            'egg',
            L(
              'Bate {qty:huevos} con sal. Vierte sobre el calabacín. Cocina 3–4 min a fuego medio-bajo hasta que la clara cuaje. Puedes tapar 1 min. Sirve en porciones.',
              'Huevo batido encima; cuaja 3–4 min a fuego medio-bajo.',
              'Huevo sobre calabacín; cuajar 3–4 min.',
            ),
            {
              heatLevel: 'medio-bajo',
              timerSeconds: 210,
              timerLabel: 'Huevo',
            },
          ),
        ],
      },
    ];
  },

  'pisto-rapido': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Corta pimiento y calabacín en cubos de 1–2 cm. Ten tomate frito, aceite y sal.',
              'Pimiento y calabacín en cubos.',
              'Verduras en cubos.',
            ),
          ),
          S(
            'veg',
            'veg',
            L(
              'Sartén amplia con aceite a fuego medio: saltea pimiento y calabacín 8 min removiendo hasta que empiecen a ablandarse.',
              'Saltea pimiento y calabacín 8 min a fuego medio.',
              'Verduras 8 min a fuego medio.',
            ),
            {
              heatLevel: 'medio',
              termIds: ['saltear'],
              timerSeconds: 480,
              timerLabel: 'Verduras',
            },
          ),
          S(
            'tomato',
            'finish',
            L(
              'Añade el tomate frito. Cocina 5 min más hasta salsa espesa y verduras tiernas. Prueba sal y sirve.',
              'Tomate frito 5 min hasta pisto espeso; salar.',
              'Tomate 5 min; espesar; salar.',
            ),
            { heatLevel: 'medio', timerSeconds: 300, timerLabel: 'Tomate' },
          ),
        ],
      },
    ];
  },

  'patatas-ajos': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Pela las patatas y córtalas en cubos pequeños (1–1,5 cm) para que se hagan antes. Lamina el ajo. Aceite y sal.',
              'Patata en cubos pequeños; ajo laminado.',
              'Patata en cubos; ajo laminado.',
            ),
          ),
          S(
            'cook',
            'cook',
            L(
              'Sartén con 2–3 cucharadas de aceite a fuego medio. Añade patata, tapa y cocina 12–15 min removiendo cada 3–4 min. Cuando se pinchen fáciles, añade ajo 1–2 min sin quemar. Sala y sirve.',
              'Patata tapada 12–15 min a fuego medio; ajo 1–2 min al final.',
              'Patata 12–15 min tapada; ajo final 1–2 min.',
            ),
            {
              heatLevel: 'medio',
              timerSeconds: 780,
              timerLabel: 'Patatas',
            },
          ),
        ],
      },
    ];
  },

  'salmon-verduras': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Corta calabacín y zanahoria en cubos pequeños. Seca el salmón y sálalo. Aceite listo.',
              'Verduras en cubos; salmón seco y sazonado.',
              'Verduras troceadas; salmón sazonado.',
            ),
          ),
          S(
            'veg',
            'veg',
            L(
              'Sartén con aceite a fuego medio: saltea verduras 6–7 min hasta tiernas al pincho. Apártalas a un lado de la sartén.',
              'Saltea verduras 6–7 min; aparta.',
              'Verduras 6–7 min; reservar en sartén.',
            ),
            {
              heatLevel: 'medio',
              termIds: ['saltear'],
              timerSeconds: 390,
              timerLabel: 'Verduras',
            },
          ),
          S(
            'salmon',
            'salmon',
            L(
              'Sube a fuego medio-alto. En el espacio libre (añade aceite si hace falta) coloca el salmón. Cocina 3–4 min por lado hasta que la carne pase a opaco-rosado y se separe en lascas. Sirve con las verduras.',
              'Salmón 3–4 min/lado a fuego medio-alto hasta lascas; servir con verduras.',
              'Salmón 3–4 min/lado al punto; emplatar con verduras.',
            ),
            {
              heatLevel: 'medio-alto',
              timerSeconds: 420,
              timerLabel: 'Salmón',
            },
          ),
        ],
      },
    ];
  },

  'pollo-pimiento': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Corta {qty:pollo} y el pimiento en tiras similares. Seca el pollo. Mezcla el pollo con un chorrito de aceite y sal (sazonar = repartir sal/aceite sobre la carne).',
              'Tiras de pollo y pimiento; sazona el pollo.',
              'Pollo y pimiento en tiras; pollo sazonado.',
            ),
          ),
          S(
            'chicken',
            'chicken',
            L(
              'Sartén caliente con aceite a fuego medio-alto. Saltea el pollo 5–6 min hasta opaco por fuera. Remueve.',
              'Saltea pollo 5–6 min a fuego medio-alto.',
              'Pollo 5–6 min a fuego medio-alto.',
            ),
            {
              heatLevel: 'medio-alto',
              termIds: ['saltear'],
              timerSeconds: 330,
              timerLabel: 'Pollo',
            },
          ),
          S(
            'pepper',
            'pepper',
            L(
              'Añade pimiento 4–5 min. El pollo debe estar sin rosa dentro (abre un trozo); el pimiento tierno. Prueba sal y sirve.',
              'Pimiento 4–5 min; pollo sin rosa interior; salar.',
              'Pimiento 4–5 min; pollo al punto; salar.',
            ),
            { heatLevel: 'medio-alto', timerSeconds: 270, timerLabel: 'Pimiento' },
          ),
        ],
      },
    ];
  },

  'pollo-plancha-ensalada': (r) => {
    r.methods = [
      {
        id: 'plancha',
        label: 'Plancha',
        equipmentIds: ['plancha', 'vitro'],
        steps: [
          S(
            'salad',
            'salad',
            L(
              'Lava lechuga y tomate. Trocea la lechuga y corta el tomate en gajos. Reserva en un bol sin aliñar todavía.',
              'Prepara lechuga y tomate; reserva.',
              'Ensalada troceada en espera.',
            ),
          ),
          S(
            'prep-chicken',
            'prep-chicken',
            L(
              'Seca {qty:pollo}. Úntalo con {qty:aceite} y sal por ambos lados.',
              'Seca y sazona el pollo.',
              'Pollo seco y sazonado.',
            ),
          ),
          S(
            'cook',
            'cook',
            L(
              'Calienta plancha o sartén a fuego medio-alto con un hilo de aceite. Cocina el pollo 5–6 min por lado. Está listo sin rosa en el centro y con jugos claros (o ~74 °C). Reposa 2 min, corta en tiras.',
              'Pollo 5–6 min/lado a fuego medio-alto hasta punto seguro; reposar 2 min.',
              'Pollo 5–6 min/lado al punto; reposar; cortar.',
            ),
            {
              heatLevel: 'medio-alto',
              termIds: ['reposar'],
              timerSeconds: 660,
              timerLabel: 'Pollo',
            },
          ),
          S(
            'serve',
            'serve',
            L(
              'Aliña la ensalada con un chorrito de aceite y sal. Coloca el pollo encima y sirve.',
              'Aliña ensalada; pollo encima; servir.',
              'Ensalada aliñada + pollo.',
            ),
          ),
        ],
      },
    ];
  },

  'salmon-micro': (r) => {
    r.methods = [
      {
        id: 'micro',
        label: 'Microondas',
        equipmentIds: ['microondas'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Coloca {qty:salmon} en un plato apto para microondas. Sala. Tapa parcialmente (papel film agujereado o tapa entreabierta) para que no salpique.',
              'Salmón en plato, sazonado, tapado parcialmente.',
              'Salmón sazonado, tapado parcial.',
            ),
          ),
          S(
            'cook',
            'cook',
            L(
              'Microondas a potencia media 2 min. Comprueba: si el centro sigue muy traslúcido, 30–60 s más. Está listo cuando se separa en lascas y el centro está opaco-rosado, no crudo rojo. Deja 1 min en reposo y sirve.',
              'Potencia media 2–3 min hasta lascas; reposo 1 min.',
              'Media 2–3 min al punto; reposar 1 min.',
            ),
            { timerSeconds: 150, timerLabel: 'Salmón micro', termIds: ['reposar'] },
          ),
        ],
      },
    ];
  },

  'espinacas-ajos-huevo': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'garlic',
            'garlic',
            L(
              'Lamina el ajo. Sartén con aceite a fuego medio: sofríe el ajo 30–40 s hasta dorado claro (no negro).',
              'Sofríe ajo 30–40 s a fuego medio.',
              'Ajo sofrito 30–40 s.',
            ),
            { heatLevel: 'medio', termIds: ['sofreir'] },
          ),
          S(
            'spinach',
            'spinach',
            L(
              'Añade espinacas. En 1–2 min menguarán. Remueve.',
              'Espinacas 1–2 min hasta menguar.',
              'Espinacas 1–2 min.',
            ),
            { heatLevel: 'medio', timerSeconds: 90, timerLabel: 'Espinacas' },
          ),
          S(
            'eggs',
            'eggs',
            L(
              'Bate huevos con sal. Baja a fuego medio-bajo, vierte y remueve 2 min hasta cuajado cremoso. Sirve.',
              'Huevos revueltos 2 min a fuego medio-bajo sobre espinacas.',
              'Revuelto 2 min; servir.',
            ),
            { heatLevel: 'medio-bajo', timerSeconds: 120, timerLabel: 'Huevos' },
          ),
        ],
      },
    ];
  },

  'nuggets-caseros-estilo': (r) => {
    r.methods = [
      {
        id: 'air',
        label: 'Air Fryer',
        equipmentIds: ['airfryer'],
        timeMinutes: 12,
        temperature: '190 °C',
        temperatureC: 190,
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Saca los nuggets del congelador. Precalienta Air Fryer a 190 °C 3 min si tu modelo lo indica. Colócalos en una sola capa en la cestilla.',
              'Capa única; precalienta 190 °C.',
              'Capa única a 190 °C.',
            ),
          ),
          S(
            'cook',
            'cook',
            L(
              'Cocina 12 min a 190 °C; agita o da la vuelta a los 6 min. Deben quedar dorados y crujientes por fuera; el interior bien caliente (abre uno: sin zonas frías/gelatinosas). Sirve.',
              '12 min a 190 °C con volteo a mitad; dorados y calientes por dentro.',
              '12 min @ 190 °C; volteo; dorado y caliente interior.',
            ),
            { timerSeconds: 720, timerLabel: 'Nuggets AF', temperatureC: 190 },
          ),
        ],
      },
      {
        id: 'horno',
        label: 'Horno',
        equipmentIds: ['horno'],
        timeMinutes: 18,
        temperature: '200 °C',
        temperatureC: 200,
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Precalienta el horno a 200 °C. Coloca los nuggets congelados en bandeja en una sola capa.',
              'Horno 200 °C; capa única en bandeja.',
              '200 °C; capa única.',
            ),
            { temperatureC: 200 },
          ),
          S(
            'cook',
            'cook',
            L(
              'Hornea 18 min; da la vuelta a mitad. Dorados por fuera e interior caliente al cortar uno. Sirve.',
              '18 min a 200 °C con volteo; dorados y calientes dentro.',
              '18 min @ 200 °C; volteo; al punto.',
            ),
            { timerSeconds: 1080, timerLabel: 'Nuggets horno', temperatureC: 200 },
          ),
        ],
      },
    ];
  },

  'verduras-air-horno': (r) => {
    const vegCook = (temp, mins, appliance, halfLabel) => [
      S(
        'prep',
        'prep',
        L(
          `Corta las verduras en trozos similares si hace falta. Mézclalas con {qty:aceite} y sal. Precalienta ${appliance} a ${temp} °C. Extiende en una sola capa sin amontonar.`,
          `Verduras con aceite y sal; capa única; ${temp} °C.`,
          `Capa única, aceite y sal; ${temp} °C.`,
        ),
        { temperatureC: temp },
      ),
      S(
        'cook',
        'cook',
        L(
          `Cocina ${mins} min a ${temp} °C; ${halfLabel}. Están listas cuando estén doradas en bordes y tiernas al pinchar. Sirve al momento.`,
          `${mins} min a ${temp} °C con volteo a mitad; doradas y tiernas.`,
          `${mins} min @ ${temp} °C; volteo; dorado y tierno.`,
        ),
        {
          timerSeconds: mins * 60,
          timerLabel: appliance,
          temperatureC: temp,
        },
      ),
    ];
    r.methods = [
      {
        id: 'air',
        label: 'Air Fryer',
        equipmentIds: ['airfryer'],
        timeMinutes: 15,
        temperature: '180 °C',
        temperatureC: 180,
        steps: vegCook(180, 15, 'Air Fryer', 'agita o voltea a los 7–8 min'),
      },
      {
        id: 'horno',
        label: 'Horno',
        equipmentIds: ['horno'],
        timeMinutes: 25,
        temperature: '200 °C',
        temperatureC: 200,
        steps: vegCook(200, 25, 'Horno', 'da la vuelta a mitad'),
      },
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        timeMinutes: 12,
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Trocea las verduras si hace falta. Ten aceite y sal.',
              'Verduras troceadas; aceite listo.',
              'Verduras listas.',
            ),
          ),
          S(
            'cook',
            'cook',
            L(
              'Sartén con aceite a fuego medio-alto: saltea 10–12 min removiendo hasta doradas y tiernas. Sala y sirve.',
              'Saltea 10–12 min a fuego medio-alto hasta tiernas.',
              'Saltear 10–12 min al punto.',
            ),
            {
              heatLevel: 'medio-alto',
              termIds: ['saltear'],
              timerSeconds: 660,
              timerLabel: 'Verduras',
            },
          ),
        ],
      },
    ];
  },

  'ternera-plancha': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Saca la ternera del frío 5–10 min. Sécala muy bien con papel (si está húmeda no dora). Sala justo antes de cocinar. Aceite listo.',
              'Atempera y seca la ternera; sala al cocinar.',
              'Ternera seca; salar al momento.',
            ),
          ),
          S(
            'heat',
            'heat',
            L(
              'Calienta plancha o sartén fuerte con un hilo de aceite a fuego alto 1–2 min hasta muy caliente.',
              'Plancha muy caliente con aceite, fuego alto.',
              'Plancha al máximo con aceite.',
            ),
            { heatLevel: 'alto' },
          ),
          S(
            'cook',
            'cook',
            L(
              'Coloca la carne. No la muevas 2–3 min por el primer lado (según grosor). Da la vuelta otros 2–3 min. Para punto jugoso el centro sigue rosado; si la quieres más hecha, 1 min más. Reposa 2 min antes de cortar (reposar = dejar que los jugos se asienten). Sirve.',
              '2–3 min/lado a fuego alto; reposar 2 min antes de cortar.',
              '2–3 min/lado al punto; reposar 2 min.',
            ),
            {
              heatLevel: 'alto',
              termIds: ['reposar'],
              timerSeconds: 300,
              timerLabel: 'Ternera',
            },
          ),
        ],
      },
    ];
  },

  'bowl-lechuga-pollo': (r) => {
    r.methods = [
      {
        id: 'combo',
        label: 'Sartén + bol',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Lava lechuga y tomate; trocea. Corta el pollo en dados. Sazónalo con aceite y sal.',
              'Ensalada troceada; pollo en dados sazonado.',
              'Ensalada lista; pollo sazonado.',
            ),
          ),
          S(
            'chicken',
            'chicken',
            L(
              'Sartén con aceite a fuego medio-alto: cocina el pollo 8–10 min removiendo hasta sin rosa dentro y jugos claros. Reposa 1 min.',
              'Pollo 8–10 min a fuego medio-alto al punto seguro.',
              'Pollo 8–10 min al punto.',
            ),
            {
              heatLevel: 'medio-alto',
              timerSeconds: 540,
              timerLabel: 'Pollo',
              termIds: ['reposar'],
            },
          ),
          S(
            'bowl',
            'bowl',
            L(
              'En un bol: lechuga, tomate, pollo encima. Aliña con aceite y sal. Sirve.',
              'Monta bol: ensalada + pollo; aliñar.',
              'Bol ensalada + pollo aliñado.',
            ),
          ),
        ],
      },
    ];
  },

  'hot-dog-simple': (r) => {
    r.methods = [
      {
        id: 'olla',
        label: 'Olla',
        equipmentIds: ['olla', 'vitro'],
        steps: [
          S(
            'boil',
            'boil',
            L(
              'Llena una olla con agua y llévala a hervor a fuego alto. Introduce las salchichas y cuece 5 min. Escurre.',
              'Hierve salchichas 5 min; escurre.',
              'Salchichas 5 min en agua hirviendo.',
            ),
            { heatLevel: 'alto', timerSeconds: 300, timerLabel: 'Salchichas' },
          ),
          S(
            'bun',
            'bun',
            L(
              'Calienta el pan 1 min en sartén seca o micro. Coloca la salchicha dentro y sirve caliente.',
              'Calienta pan; monta el perrito; servir.',
              'Pan caliente + salchicha; servir.',
            ),
          ),
        ],
      },
    ];
  },

  'sarten-mix-pavo-verdura': (r) => {
    r.methods = [
      {
        id: 'sarten',
        label: 'Sartén',
        equipmentIds: ['sarten', 'vitro'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Corta el pavo en dados. Si las verduras son grandes, trocéalas. Aceite y sal.',
              'Pavo en dados; verduras troceadas.',
              'Pavo y verduras listos.',
            ),
          ),
          S(
            'pavo',
            'pavo',
            L(
              'Sartén con aceite a fuego medio-alto: saltea pavo 4–5 min hasta opaco.',
              'Saltea pavo 4–5 min.',
              'Pavo 4–5 min.',
            ),
            {
              heatLevel: 'medio-alto',
              termIds: ['saltear'],
              timerSeconds: 270,
              timerLabel: 'Pavo',
            },
          ),
          S(
            'veg',
            'veg',
            L(
              'Añade verduras 5–6 min removiendo hasta tiernas. El pavo sin rosa dentro. Sala y sirve.',
              'Verduras 5–6 min; pavo al punto; salar.',
              'Verduras 5–6 min; salar; servir.',
            ),
            { heatLevel: 'medio-alto', timerSeconds: 330, timerLabel: 'Verduras' },
          ),
        ],
      },
    ];
  },

  'patata-micro': (r) => {
    r.methods = [
      {
        id: 'micro',
        label: 'Microondas',
        equipmentIds: ['microondas'],
        steps: [
          S(
            'prep',
            'prep',
            L(
              'Lava la patata. Pínchala varias veces con un tenedor (para que no explote). Opcional: un hilo de aceite y sal en la piel.',
              'Lava y pincha la patata.',
              'Patata lavada y pinchada.',
            ),
          ),
          S(
            'cook',
            'cook',
            L(
              'Microondas a potencia alta 4–5 min. Dale la vuelta a mitad. Está lista cuando un cuchillo entre fácil hasta el centro. Si no, 1 min más. Abre con cuidado (sale vapor).',
              'Alta 4–5 min volteando; lista al pincho fácil.',
              'Alta 4–5 min; comprobar pincho.',
            ),
            { timerSeconds: 270, timerLabel: 'Patata micro' },
          ),
        ],
      },
    ];
  },
};

let fixed = 0;
for (const r of catalog) {
  const fn = FIXES[r.id];
  if (!fn) continue;
  fn(r);
  // summary steps from first method
  const first = r.methods?.[0]?.steps || [];
  r.steps = first.map((s) => {
    const t = s.text;
    return typeof t === 'string' ? t : t.intermediate || t.beginner || t.advanced || '';
  });
  fixed++;
}

const header = src.slice(0, match.index);
fs.writeFileSync(
  catalogPath,
  `${header}export const RECIPE_CATALOG: Recipe[] = ${JSON.stringify(catalog, null, 2)};\n`,
);
console.log(JSON.stringify({ fixed, total: catalog.length, ids: Object.keys(FIXES) }, null, 2));
