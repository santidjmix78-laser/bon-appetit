/**
 * Parches culinarios revisados a mano (v1.3.2).
 * Se fusionan SOBRE el catálogo en runtime.
 * Placeholders {qty:foodId} se interpolan con servings.
 */
import type { Recipe } from '../types';
import type { RecipeStep } from '../types/recipe';

type MethodPatch = NonNullable<Recipe['methods']>[number];

function L(beginner: string, intermediate: string, advanced: string) {
  return { beginner, intermediate, advanced };
}

const tortillaSteps: RecipeStep[] = [
  {
    id: 'prep-potato-b',
    phaseId: 'prep-potato',
    levels: ['beginner'],
    termIds: ['juliana'],
    text: L(
      'Pela {qty:patatas}. Córtalas en rodajas finas de unos 2–3 mm (como fichas de póker finas). Si usas cebolla: córtala por la mitad, apoya la parte plana en la tabla y haz tiras finas de 2–3 mm. Ese corte se llama juliana.',
      '',
      '',
    ),
  },
  {
    id: 'prep-potato',
    phaseId: 'prep-potato',
    levels: ['intermediate', 'advanced'],
    termIds: ['juliana'],
    text: L(
      '',
      'Pela y corta la patata en rodajas finas (2–3 mm). Cebolla opcional en juliana fina.',
      'Patata en rodajas finas 2–3 mm; cebolla en juliana (opcional).',
    ),
  },
  {
    id: 'fry-potato',
    phaseId: 'cook-potato',
    termIds: ['pochar', 'confitar'],
    heatLevel: 'medio-bajo',
    timerSeconds: 660,
    timerLabel: 'Patatas',
    text: L(
      'Usa una sartén amplia. Añade unas 3 cucharadas de aceite y caliéntalo a fuego medio-bajo. Incorpora patata (y cebolla). Remueve cada 2–3 min. Cocina 10–12 min hasta que la patata se deje pinchar fácilmente con un tenedor y esté blanda, no crujiente. Escurre el exceso de aceite dejando solo un velo.',
      'Pochar/confitar la patata en aceite a fuego medio-bajo 10–12 min hasta tierna; escurrir exceso de aceite.',
      'Pochar patata 10–12 min a fuego medio-bajo hasta tierna; escurrir aceite sobrante.',
    ),
  },
  {
    id: 'mix-egg',
    phaseId: 'mix-eggs',
    termIds: ['reposar'],
    text: L(
      'En un bol, bate {qty:huevos} con una pizca de sal. Añade las patatas calientes (y cebolla). Remueve con cuidado y deja reposar 1 minuto para que el huevo se impregne.',
      'Bate huevos con sal, mezcla con patatas calientes y reposa 1 min.',
      'Huevo batido + patata; reposar 1 min.',
    ),
  },
  {
    id: 'set-tortilla',
    phaseId: 'set-tortilla',
    heatLevel: 'medio-bajo',
    text: L(
      'Limpia o usa sartén antiadherente con un hilo de aceite a fuego medio-bajo. Vierte la mezcla. Cuaja 4–5 min hasta que los bordes estén firmes y se despegue. Coloca un plato encima, dale la vuelta de un golpe y cocina 3–4 min más. El centro puede quedar jugoso o más cuajado, como prefieras. Sirve en trozos.',
      'Cuaja 4–5 min a fuego medio-bajo, gira con un plato y termina 3–4 min. Sirve.',
      'Cuaja 4–5 min a fuego medio-bajo, gira y termina 3–4 min; sirve.',
    ),
  },
];

const patatasHuevoSteps: RecipeStep[] = [
  {
    id: 'prep-b',
    phaseId: 'prep',
    levels: ['beginner'],
    text: L(
      'Lava {qty:patatas}. Pélalas si la piel es gruesa o está dañada. Córtalas en rodajas de unos 3–4 mm. Casca {qty:huevos} en un bol aparte y ten sal a mano.',
      '',
      '',
    ),
  },
  {
    id: 'prep',
    phaseId: 'prep',
    levels: ['intermediate', 'advanced'],
    text: L(
      '',
      'Patata en rodajas de 3–4 mm; huevos listos.',
      'Patata en rodajas 3–4 mm; huevos preparados.',
    ),
  },
  {
    id: 'cook-potato',
    phaseId: 'cook-potato',
    heatLevel: 'medio',
    timerSeconds: 720,
    timerLabel: 'Patatas',
    text: L(
      'Calienta una sartén mediana con 2 cucharadas de aceite a fuego medio. Extiende las rodajas en una sola capa (o casi). Cocina unos 12 min, dándoles la vuelta a mitad. Están listas cuando se pinchan fáciles con un tenedor y empiezan a dorarse. Sala ligeramente.',
      'Saltea la patata en aceite a fuego medio ~12 min hasta tierna y algo dorada; salpimienta.',
      'Patata en sartén a fuego medio ~12 min hasta tierna/dorada; salar.',
    ),
  },
  {
    id: 'eggs-b',
    phaseId: 'eggs',
    levels: ['beginner'],
    heatLevel: 'medio-bajo',
    timerSeconds: 180,
    timerLabel: 'Huevos',
    text: L(
      'Baja a fuego medio-bajo. Con una cuchara abre huecos entre las patatas y casca un huevo en cada hueco (o encima, sin romper la yema si puedes). Tapa la sartén 3 min aproximadamente. La clara debe cuajarse (ponerse blanca y firme) y la yema puede quedar cremosa. Sirve en el plato con cuidado.',
      '',
      '',
    ),
  },
  {
    id: 'eggs',
    phaseId: 'eggs',
    levels: ['intermediate', 'advanced'],
    heatLevel: 'medio-bajo',
    timerSeconds: 180,
    timerLabel: 'Huevos',
    text: L(
      '',
      'A fuego medio-bajo, casca los huevos sobre las patatas, tapa ~3 min hasta clara cuajada y sirve.',
      'Huevos sobre patata a fuego medio-bajo, tapa 3 min hasta clara cuajada; servir.',
    ),
  },
];

const polloAjillosSteps: RecipeStep[] = [
  {
    id: 'prep-b',
    phaseId: 'prep',
    levels: ['beginner'],
    text: L(
      'Corta {qty:pollo} en trozos del tamaño de un bocado. Pela {qty:ajo} y láminalos (rodajas finas). Ten sal y {qty:aceite} listos.',
      '',
      '',
    ),
  },
  {
    id: 'prep',
    phaseId: 'prep',
    levels: ['intermediate', 'advanced'],
    text: L(
      '',
      'Trocea el pollo; lamina el ajo.',
      'Pollo en dados; ajo laminado.',
    ),
  },
  {
    id: 'cook-garlic',
    phaseId: 'cook',
    levels: ['beginner'],
    heatLevel: 'medio',
    termIds: ['sofreir'],
    text: L(
      'En una sartén, pon el aceite y el ajo laminado EN FRÍO. Enciende a fuego medio y sofríe 1–2 min removiendo hasta que el ajo esté dorado claro (no negro: si se quema, amarga). Retira el ajo a un plato si se dora muy rápido y sigue con el pollo en el mismo aceite. Esta cocción suave en aceite se llama sofreír.',
      '',
      '',
    ),
  },
  {
    id: 'cook-chicken',
    phaseId: 'cook',
    heatLevel: 'medio-alto',
    termIds: ['saltear'],
    timerSeconds: 600,
    timerLabel: 'Pollo',
    text: L(
      'Sube a fuego medio-alto. Añade el pollo en una sola capa. Cocina 8–10 min removiendo de vez en cuando (saltear: mover a fuego vivo). Está listo cuando el interior ya no está rosado (abre un trozo) y los jugos salen claros. Vuelve a poner el ajo, mezcla 30 s, prueba la sal y sirve caliente con el aceite de la sartén.',
      'Sofríe el ajo sin quemar; saltea el pollo 8–10 min a fuego medio-alto hasta cocinado por dentro; salar y servir con el ajo.',
      'Ajo sofrito sin quemar; saltear pollo 8–10 min a fuego medio-alto al punto; salar y servir.',
    ),
  },
];

/** Salmón a la plancha — reescritura culinaria completa. */
const salmonPlanchaSteps: RecipeStep[] = [
  {
    id: 'prep-b',
    phaseId: 'prep',
    levels: ['beginner'],
    text: L(
      'Saca el salmón ({qty:salmon}) de la nevera 5–10 min. Sécalo bien con papel de cocina por ambos lados (si está húmedo no dora). Si tiene piel, déjala: ayuda a que no se rompa. Espolvorea sal por encima (y un poco de pimienta si tienes). Ten {qty:aceite} a mano.',
      '',
      '',
    ),
  },
  {
    id: 'prep',
    phaseId: 'prep',
    levels: ['intermediate', 'advanced'],
    text: L(
      '',
      'Seca el salmón, sala. Aceite listo.',
      'Salmón seco y sazonado.',
    ),
  },
  {
    id: 'heat-pan-b',
    phaseId: 'heat',
    levels: ['beginner'],
    heatLevel: 'medio-alto',
    text: L(
      'Usa una sartén o plancha antiadherente (o bien caliente). Pon 1 cucharada de aceite y caliéntala a fuego medio-alto 1–2 min. El aceite debe brillar y chisporrotear suavemente al echar una gota de agua; si humea mucho, baja un poco el fuego.',
      '',
      '',
    ),
  },
  {
    id: 'heat-pan',
    phaseId: 'heat',
    levels: ['intermediate', 'advanced'],
    heatLevel: 'medio-alto',
    text: L(
      '',
      'Precalienta sartén/plancha con aceite a fuego medio-alto.',
      'Plancha caliente con aceite, fuego medio-alto.',
    ),
  },
  {
    id: 'side1',
    phaseId: 'side1',
    heatLevel: 'medio-alto',
    timerSeconds: 240,
    timerLabel: 'Salmón lado 1',
    text: L(
      'Coloca el salmón: si tiene piel, piel abajo primero. No lo muevas los primeros minutos. Cocina unos 4 min (filete de ~2 cm; si es más grueso, 5 min). Debe formarse una costra dorada y despegarse con facilidad.',
      'Salmón piel abajo 4 min a fuego medio-alto sin mover hasta dorar.',
      'Piel abajo ~4 min hasta dorar y soltar.',
    ),
  },
  {
    id: 'side2',
    phaseId: 'side2',
    heatLevel: 'medio',
    timerSeconds: 150,
    timerLabel: 'Salmón lado 2',
    text: L(
      'Dale la vuelta con cuidado (espátula ancha). Baja un poco a fuego medio. Cocina 2–3 min más. Está listo cuando la carne pasa de rojo/translúcido a tono rosado-opaco y se abre en escamas al pinchar el centro; el centro puede quedar ligeramente jugoso. Si prefieres más hecho, 1 min extra. Sirve.',
      'Vuelta 2–3 min a fuego medio hasta opaco/rosado en el centro; sirve.',
      'Vuelta 2–3 min al punto (opaco, centro jugoso); servir.',
    ),
  },
];

/** Pollo asado — horno y Air Fryer con instrucciones propias. */
const polloHornoSteps: RecipeStep[] = [
  {
    id: 'prep-b',
    phaseId: 'prep',
    levels: ['beginner'],
    text: L(
      'Corta {qty:pollo} en trozos similares (dados o tiras de bocado). Sécalos con papel. En un bol: mezcla el pollo con {qty:aceite}, una pizca generosa de sal y pimienta si tienes. Remueve hasta que cada trozo quede untado (sazonar = sal + oil / especias sobre el alimento).',
      '',
      '',
    ),
  },
  {
    id: 'prep',
    phaseId: 'prep',
    levels: ['intermediate', 'advanced'],
    text: L(
      '',
      'Trocea el pollo; úntalo con aceite, sal y pimienta.',
      'Pollo troceado, aceite y sal.',
    ),
  },
  {
    id: 'preheat',
    phaseId: 'preheat',
    temperatureC: 200,
    text: L(
      'Enciende el horno a 200 °C (calor arriba y abajo si puedes). Espera a que alcance temperatura: muchas puertas tienen un piloto o pitido. Mientras, forra una bandeja con papel o unge ligeramente.',
      'Precalienta horno a 200 °C; prepara bandeja.',
      'Horno 200 °C precalentado; bandeja lista.',
    ),
  },
  {
    id: 'arrange',
    phaseId: 'arrange',
    text: L(
      'Extiende el pollo en una sola capa sin amontonar (si se apila, se cuece al vapor y no dora). Deja un poco de espacio entre trozos.',
      'Pollo en una sola capa en la bandeja.',
      'Capa única en bandeja.',
    ),
  },
  {
    id: 'cook1',
    phaseId: 'cook',
    timerSeconds: 900,
    timerLabel: 'Horno 1.ª mitad',
    temperatureC: 200,
    similarKey: 'pollo+horno+200C',
    text: L(
      'Mete la bandeja a media altura. Cocina 15 min a 200 °C. Cuando suene el temporizador, saca con cuidado (usa manoplas) y da la vuelta a cada trozo.',
      '15 min a 200 °C; voltear.',
      '15 min @ 200 °C; voltear.',
    ),
  },
  {
    id: 'cook2',
    phaseId: 'finish',
    timerSeconds: 900,
    timerLabel: 'Horno 2.ª mitad',
    temperatureC: 200,
    text: L(
      'Vuelve a meter 12–15 min más. El pollo está listo cuando el interior ya no está rosado (abre el trozo más grueso) y los jugos salen claros; si tienes termómetro, apunta a ~75 °C en el centro. Sirve caliente.',
      '12–15 min más a 200 °C hasta interior sin rosa / jugos claros (~75 °C); sirve.',
      'Terminar 12–15 min @ 200 °C al punto (~75 °C interior); servir.',
    ),
  },
];

const polloAirSteps: RecipeStep[] = [
  {
    id: 'prep-b',
    phaseId: 'prep',
    levels: ['beginner'],
    text: L(
      'Corta {qty:pollo} en trozos similares. Sécalos. Mézclalos en un bol con {qty:aceite}, sal y pimienta hasta que queden bien untados.',
      '',
      '',
    ),
  },
  {
    id: 'prep',
    phaseId: 'prep',
    levels: ['intermediate', 'advanced'],
    text: L(
      '',
      'Trocea y sazona el pollo con aceite y sal.',
      'Pollo troceado, aceite y sal.',
    ),
  },
  {
    id: 'preheat',
    phaseId: 'preheat',
    temperatureC: 180,
    text: L(
      'Precalienta el Air Fryer a 180 °C unos 3 min si tu modelo lo recomienda (muchos van mejor en caliente).',
      'Precalienta Air Fryer a 180 °C.',
      'AF 180 °C precalentado.',
    ),
  },
  {
    id: 'arrange',
    phaseId: 'arrange',
    text: L(
      'Coloca el pollo en la cestilla en una sola capa. No llenes de más: cocina en dos tandas si hace falta.',
      'Capa única en cestilla.',
      'Capa única; no sobrecargar.',
    ),
  },
  {
    id: 'cook1',
    phaseId: 'cook',
    timerSeconds: 720,
    timerLabel: 'Air Fryer 1.ª mitad',
    temperatureC: 180,
    similarKey: 'pollo+airfryer+180C',
    text: L(
      'Programa 12 min a 180 °C. Cuando termine, agita la cestilla o da la vuelta a los trozos.',
      '12 min a 180 °C; agitar/voltear.',
      '12 min @ 180 °C; voltear.',
    ),
  },
  {
    id: 'cook2',
    phaseId: 'finish',
    timerSeconds: 780,
    timerLabel: 'Air Fryer 2.ª mitad',
    temperatureC: 180,
    text: L(
      'Otros 10–13 min a 180 °C. Comprueba el trozo más grueso: sin rosa dentro, jugos claros (o ~75 °C). Si falta, 2–3 min más. Sirve.',
      '10–13 min más a 180 °C hasta punto seguro; sirve.',
      'Terminar 10–13 min @ 180 °C al punto; servir.',
    ),
  },
];

function method(
  id: string,
  label: string,
  equipmentIds: MethodPatch['equipmentIds'],
  steps: RecipeStep[],
  extra?: Partial<MethodPatch>,
): MethodPatch {
  return { id, label, equipmentIds, steps, ...extra };
}

/** Overrides por id de receta (sustituyen methods/steps/name si se indican). */
export const RECIPE_QUALITY_OVERRIDES: Record<string, Partial<Recipe>> = {
  'tortilla-patata': {
    steps: [
      'Patata en rodajas finas; cebolla en juliana opcional.',
      'Pochar patata 10–12 min a fuego medio-bajo.',
      'Mezclar con huevo batido; reposar 1 min.',
      'Cuajar, girar y terminar.',
    ],
    methods: [method('sarten', 'Sartén', ['sarten', 'vitro'], tortillaSteps)],
  },
  'patatas-sartén-huevo': {
    steps: [
      'Patata en rodajas; freír ~12 min.',
      'Huevos encima, tapa ~3 min; servir.',
    ],
    methods: [method('sarten', 'Sartén', ['sarten', 'vitro'], patatasHuevoSteps)],
  },
  'pollo-ajos': {
    steps: [
      'Trocear pollo; laminar ajo.',
      'Sofreír ajo; saltear pollo 8–10 min; servir.',
    ],
    methods: [method('sarten', 'Sartén', ['sarten', 'vitro'], polloAjillosSteps)],
  },
  'salmon-plancha-simple': {
    name: 'Salmón a la plancha',
    steps: [
      'Secar y salar salmón.',
      'Plancha caliente.',
      'Piel abajo ~4 min; vuelta 2–3 min al punto.',
    ],
    methods: [
      method('plancha', 'Plancha / sartén', ['plancha', 'vitro'], salmonPlanchaSteps),
      method('sarten', 'Sartén', ['sarten', 'vitro'], salmonPlanchaSteps),
    ],
  },
  'pollo-horno-air': {
    name: 'Pollo asado sencillo',
    steps: [
      'Sazonar pollo.',
      'Capa única.',
      'Cocinar y voltear a mitad hasta punto seguro.',
    ],
    methods: [
      method('horno', 'Horno', ['horno'], polloHornoSteps, {
        timeMinutes: 30,
        temperature: '200 °C',
        temperatureC: 200,
      }),
      method('air', 'Air Fryer', ['airfryer'], polloAirSteps, {
        timeMinutes: 25,
        temperature: '180 °C',
        temperatureC: 180,
      }),
    ],
  },
};

export function applyRecipeOverrides(recipe: Recipe): Recipe {
  const patch = RECIPE_QUALITY_OVERRIDES[recipe.id];
  if (!patch) return recipe;
  return {
    ...recipe,
    ...patch,
    methods: patch.methods ?? recipe.methods,
    steps: patch.steps ?? recipe.steps,
  };
}
