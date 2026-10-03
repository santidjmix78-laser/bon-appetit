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
      'Pela y corta la patata en rodajas finas (2–3 mm). Si usas cebolla, córtala en juliana fina.',
      'Corta la patata en rodajas finas (2–3 mm) y la cebolla en juliana, si la usas.',
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
      'Pocha/confita la patata en aceite a fuego medio-bajo 10–12 minutos hasta que quede tierna; escurre el exceso de aceite.',
      'Pocha la patata 10–12 minutos a fuego medio-bajo hasta tierna y escurre el aceite sobrante.',
    ),
  },
  {
    id: 'mix-egg',
    phaseId: 'mix-eggs',
    termIds: ['reposar'],
    text: L(
      'En un bol, bate {qty:huevos} con una pizca de sal. Añade las patatas calientes (y cebolla). Remueve con cuidado y deja reposar 1 minuto para que el huevo se impregne.',
      'Bate los huevos con sal, mézclalos con las patatas calientes y deja reposar 1 minuto.',
      'Bate el huevo con sal, integra la patata y reposa 1 minuto.',
    ),
  },
  {
    id: 'set-tortilla',
    phaseId: 'set-tortilla',
    heatLevel: 'medio-bajo',
    text: L(
      'Limpia o usa sartén antiadherente con un hilo de aceite a fuego medio-bajo. Vierte la mezcla. Cuaja 4–5 min hasta que los bordes estén firmes y se despegue. Coloca un plato encima, dale la vuelta de un golpe y cocina 3–4 min más. El centro puede quedar jugoso o más cuajado, como prefieras. Sirve en trozos.',
      'Cuaja la tortilla 4–5 minutos a fuego medio-bajo, gírala con un plato y termina 3–4 minutos más. Sirve.',
      'Cuaja 4–5 minutos a fuego medio-bajo, gira y termina 3–4 minutos; sirve.',
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
      'Corta las patatas en rodajas de 3–4 mm y deja los huevos listos para cascar.',
      'Corta las patatas en rodajas de 3–4 mm y ten los huevos preparados.',
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
      'Saltea la patata en aceite a fuego medio unos 12 minutos hasta que quede tierna y algo dorada; salpimienta.',
      'Saltea la patata a fuego medio unos 12 minutos hasta tierna y dorada; sala.',
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
      'A fuego medio-bajo, casca los huevos sobre las patatas, tapa unos 3 minutos hasta que la clara cuaje y sirve.',
      'Casca los huevos sobre la patata a fuego medio-bajo, tapa 3 minutos hasta clara cuajada y sirve.',
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
      'Trocea el pollo en dados y lamina el ajo.',
      'Trocea el pollo y lamina el ajo.',
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
      'Sofríe el ajo sin quemarlo y saltea el pollo 8–10 minutos a fuego medio-alto hasta que esté cocinado por dentro; sala y sirve con el ajo.',
      'Sofríe el ajo sin quemarlo, saltea el pollo 8–10 minutos a fuego medio-alto al punto, sala y sirve.',
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
      'Seca el salmón bien, sazónalo y ten el aceite a mano.',
      'Seca y sazona el salmón; deja el aceite listo.',
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
      'Precalienta la sartén o plancha con aceite a fuego medio-alto.',
      'Calienta la plancha con aceite a fuego medio-alto.',
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
      'Cocina el salmón piel abajo unos 4 minutos a fuego medio-alto sin moverlo hasta que dore.',
      'Cocina piel abajo unos 4 minutos hasta que dore y se suelte.',
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
      'Da la vuelta y cocina 2–3 minutos a fuego medio hasta opaco-rosado en el centro; sirve.',
      'Da la vuelta 2–3 minutos al punto (opaco, centro jugoso) y sirve.',
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
      'Trocea el pollo y úntalo con aceite, sal y pimienta.',
      'Trocea el pollo y sazónalo con aceite y sal.',
    ),
  },
  {
    id: 'preheat',
    phaseId: 'preheat',
    temperatureC: 200,
    text: L(
      'Enciende el horno a 200 °C (calor arriba y abajo si puedes). Espera a que alcance temperatura: muchas puertas tienen un piloto o pitido. Mientras, forra una bandeja con papel o unge ligeramente.',
      'Precalienta el horno a 200 °C y prepara la bandeja.',
      'Precalienta el horno a 200 °C y deja la bandeja lista.',
    ),
  },
  {
    id: 'arrange',
    phaseId: 'arrange',
    text: L(
      'Extiende el pollo en una sola capa sin amontonar (si se apila, se cuece al vapor y no dora). Deja un poco de espacio entre trozos.',
      'Extiende el pollo en una sola capa sobre la bandeja.',
      'Distribuye el pollo en capa única sobre la bandeja.',
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
      'Hornea 15 minutos a 200 °C y voltea los trozos.',
      'Hornea 15 minutos a 200 °C y voltea.',
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
      'Hornea 12–15 minutos más a 200 °C hasta interior sin rosa y jugos claros (~75 °C); sirve.',
      'Termina 12–15 minutos a 200 °C al punto (~75 °C interior) y sirve.',
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
      'Trocea el pollo y sazónalo con aceite y sal.',
    ),
  },
  {
    id: 'preheat',
    phaseId: 'preheat',
    temperatureC: 180,
    text: L(
      'Precalienta el Air Fryer a 180 °C unos 3 min si tu modelo lo recomienda (muchos van mejor en caliente).',
      'Precalienta el Air Fryer a 180 °C.',
      'Precalienta el Air Fryer a 180 °C.',
    ),
  },
  {
    id: 'arrange',
    phaseId: 'arrange',
    text: L(
      'Coloca el pollo en la cestilla en una sola capa. No llenes de más: cocina en dos tandas si hace falta.',
      'Coloca el pollo en capa única en la cestilla.',
      'Distribuye el pollo en capa única; no sobrecargues.',
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
      'Cocina 12 minutos a 180 °C y agita o voltea la cestilla.',
      'Cocina 12 minutos a 180 °C y voltea.',
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
      'Cocina 10–13 minutos más a 180 °C hasta punto seguro y sirve.',
      'Termina 10–13 minutos a 180 °C al punto y sirve.',
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
  'ternera-cebolla': {
    name: 'Ternera encebollada sencilla',
    steps: [
      'Cortar cebolla en juliana y ternera en tiras.',
      'Pochar cebolla 8 min.',
      'Saltear ternera 4–5 min; integrar y servir.',
    ],
    methods: [
      method('sarten', 'Sartén', ['sarten', 'vitro'], [
        {
          id: 'prep-b',
          phaseId: 'prep',
          levels: ['beginner'],
          termIds: ['juliana'],
          text: L(
            'Pela {qty:cebolla}. Córtala por la mitad, apoya la parte plana en la tabla y haz tiras finas de unos 2–3 mm. Ese corte se llama juliana. Corta {qty:ternera} en tiras del tamaño de un bocado. Ten {qty:aceite} y sal a mano.',
            '',
            '',
          ),
        },
        {
          id: 'prep',
          phaseId: 'prep',
          levels: ['intermediate', 'advanced'],
          termIds: ['juliana'],
          text: L(
            '',
            'Corta la cebolla en juliana fina y prepara la ternera en tiras de tamaño uniforme para que se cocine de forma homogénea.',
            'Corta la cebolla en juliana y la ternera en tiras uniformes. Déjalas preparadas antes de empezar la cocción.',
          ),
        },
        {
          id: 'onion',
          phaseId: 'onion',
          heatLevel: 'medio',
          termIds: ['sofreir', 'juliana'],
          timerSeconds: 480,
          timerLabel: 'Cebolla',
          text: L(
            'Usa una sartén amplia. Añade 2 cucharadas de aceite y caliéntalo a fuego medio. Incorpora la cebolla en juliana. Remueve cada minuto. Cocina unos 8 min hasta que esté blanda, translúcida y algo dorada en los bordes (no negra). Si se tuesta demasiado rápido, baja el fuego. Sofreír es cocinar en poco aceite removiendo sin quemar.',
            'Sofríe la cebolla en juliana a fuego medio unos 8 minutos hasta que quede blanda y ligeramente dorada.',
            'Sofríe la cebolla en juliana a fuego medio hasta que quede tierna y ligeramente dorada.',
          ),
        },
        {
          id: 'beef',
          phaseId: 'beef',
          heatLevel: 'medio-alto',
          termIds: ['saltear'],
          timerSeconds: 300,
          timerLabel: 'Ternera',
          text: L(
            'Sube a fuego medio-alto. Aparta la cebolla a un lado de la sartén (o retírala un momento). Añade un poco más de aceite si hace falta y coloca la ternera en una sola capa. Cocina 4–5 min removiendo: primero se dora por fuera; abre un trozo — el interior puede quedar rosado-jugoso o más hecho, según prefieras. Mezcla con la cebolla 30 s, prueba la sal y sirve caliente.',
            'Sube a fuego medio-alto y saltea la ternera en tiras 4–5 minutos hasta el punto deseado. Intégrala con la cebolla, sala y sirve.',
            'Saltea la ternera 4–5 minutos a fuego medio-alto hasta el punto, intégrala con la cebolla, sala y sirve.',
          ),
        },
      ]),
    ],
  },
  'pollo-patatas-combo': {
    steps: [
      'Patatas en Air Fryer.',
      'Coordinar pollo en sartén.',
      'Servir juntos.',
    ],
    methods: [
      method(
        'combo',
        'Sartén + Air Fryer',
        ['sarten', 'vitro', 'airfryer'],
        [
          {
            id: 'prep-potatoes',
            phaseId: 'prep-potatoes',
            text: L(
              'Empieza por las patatas (tardan más). Pela {qty:patatas}, córtalas en gajos, sécalas con papel y mézclalas con 1 cucharada de aceite y sal. Extiéndelas en la cesta del Air Fryer sin amontonar.',
              'Prepara los gajos de patata con aceite y sal y colócalos en una sola capa en el Air Fryer.',
              'Prepara los gajos de patata con aceite y sal y dispónlos en una sola capa en el Air Fryer.',
            ),
          },
          {
            id: 'airfry-potatoes',
            phaseId: 'airfry-potatoes',
            timerSeconds: 1080,
            timerLabel: 'Patatas Air Fryer',
            temperatureC: 190,
            similarKey: 'patatas_gajo+airfryer+190C',
            text: L(
              'Cocina las patatas a 190 °C unos 18 minutos. A mitad de tiempo, abre y agita la cesta. Están listas cuando estén doradas por fuera y tiernas al pinchar.',
              'Cocina las patatas en Air Fryer a 190 °C unos 18 minutos, agitando a mitad, hasta doradas y tiernas.',
              'Cocina las patatas en Air Fryer a 190 °C unos 18 minutos, agitando a mitad, hasta doradas y tiernas.',
            ),
          },
          {
            id: 'cook-chicken',
            phaseId: 'cook-chicken',
            heatLevel: 'medio-alto',
            termIds: ['sellar'],
            timerSeconds: 600,
            timerLabel: 'Pollo en sartén',
            text: L(
              'Cuando queden unos 10 minutos de las patatas, seca el pollo y sálalo. Calienta una sartén con 1 cucharada de aceite a fuego medio-alto. Cocina el pollo 4–5 minutos por cada lado sin moverlo al principio (así se dora; a esto se le llama sellar). Comprueba el centro: no debe quedar rosado; los jugos deben salir claros.',
              'Cuando queden unos 10 minutos de las patatas, cocina el pollo en una sartén a fuego medio-alto, unos 4–5 minutos por cada lado, hasta que esté cocinado por dentro.',
              'Empieza el pollo cuando queden unos 10 minutos de las patatas. Cocínalo a fuego medio-alto, 4–5 minutos por lado, hasta el punto seguro.',
            ),
          },
          {
            id: 'serve',
            phaseId: 'serve',
            text: L(
              'Sirve el pollo caliente junto a las patatas recién salidas del Air Fryer; procura que lleguen a la mesa a la vez.',
              'Sirve el pollo con las patatas en cuanto salgan del Air Fryer.',
              'Sirve el pollo y las patatas juntos, bien calientes.',
            ),
          },
        ],
        { temperature: 'Air Fryer 190 °C', timeMinutes: 30 },
      ),
    ],
  },
  'salmon-micro': {
    name: 'Salmón al microondas',
    steps: [
      'Coloca el salmón en plato apto, sazona y tapa parcialmente.',
      'Cocina a potencia media 2–3 min hasta lascas; reposa 1 min.',
    ],
    methods: [
      method('micro', 'Microondas', ['microondas'], [
        {
          id: 'prep',
          phaseId: 'prep',
          text: L(
            'Coloca {qty:salmon} en un plato apto para microondas. Sala. Tapa parcialmente (papel film agujereado o tapa entreabierta) para que no salpique.',
            'Coloca el salmón en un plato apto para microondas, sazónalo y cúbrelo parcialmente para evitar salpicaduras.',
            'Coloca el salmón en un recipiente apto para microondas, sazónalo y cúbrelo parcialmente.',
          ),
        },
        {
          id: 'cook',
          phaseId: 'cook',
          timerSeconds: 150,
          timerLabel: 'Salmón micro',
          termIds: ['reposar'],
          text: L(
            'Microondas a potencia media 2 min. Comprueba: si el centro sigue muy traslúcido, 30–60 s más. Está listo cuando se separa en lascas y el centro está opaco-rosado, no crudo rojo. Deja 1 min en reposo y sirve.',
            'Cocina a potencia media 2–3 minutos hasta que se separe en lascas; deja reposar 1 minuto y sirve.',
            'Cocina a potencia media 2–3 minutos hasta lascas; reposa 1 minuto y sirve.',
          ),
        },
      ]),
    ],
  },
  'pollo-congelado-air': {
    name: 'Pollo congelado en Air Fryer',
    steps: [
      'Unta el pollo congelado con aceite y sal.',
      'Cocina en Air Fryer a 180 °C ~22 min con volteo a mitad.',
    ],
    methods: [
      method(
        'air',
        'Air Fryer',
        ['airfryer'],
        [
          {
            id: 'prep',
            phaseId: 'prep',
            text: L(
              'Saca el pollo congelado del envase. Úntalo ligeramente con aceite y sal (aunque esté congelado). Ten lista la cestilla del Air Fryer.',
              'Unta el pollo congelado con aceite y sal y prepara la cestilla del Air Fryer.',
              'Unta el pollo congelado con aceite y sal y déjalo listo para la cestilla.',
            ),
          },
          {
            id: 'cook',
            phaseId: 'cook',
            timerSeconds: 1320,
            timerLabel: 'Air Fryer',
            temperatureC: 180,
            similarKey: 'pollo-congelado+airfryer+180C',
            text: L(
              'Si tu Air Fryer lo recomienda, precalienta a 180 °C unos 3 minutos. Coloca el pollo en una sola capa en la cestilla (sin amontonar). Cocina unos 22 minutos a 180 °C; a mitad de tiempo, dale la vuelta o agita. Está listo cuando esté bien caliente por dentro y dorado por fuera (abre el trozo más grueso: sin zonas frías ni rosadas).',
              'Cocina el pollo en Air Fryer a 180 °C unos 22 minutos en una sola capa, volteando a mitad, hasta dorado y cocinado por dentro.',
              'Cocina el pollo en Air Fryer a 180 °C unos 22 minutos en capa única, con volteo a mitad, hasta dorado y punto seguro por dentro.',
            ),
          },
        ],
        { temperature: '180 °C', timeMinutes: 25 },
      ),
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
