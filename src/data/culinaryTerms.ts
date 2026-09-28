import type { CulinaryTerm } from '../types/recipe';

export const CULINARY_TERMS: CulinaryTerm[] = [
  {
    id: 'marinar',
    name: 'Marinar',
    definition:
      'Dejar un alimento (carne, pescado o verdura) en un líquido aromatizado (aceite, limón, especias…) para que coja sabor y quede más jugoso.',
  },
  {
    id: 'pochar',
    name: 'Pochar',
    definition:
      'Cocinar a fuego suave en poco líquido o grasa, sin que hierva con fuerza. El alimento se cocina despacio y queda tierno.',
  },
  {
    id: 'sofreir',
    name: 'Sofreír',
    definition:
      'Cocinar a fuego medio en un poco de aceite removiendo, hasta que el alimento se ablande y tome color sin quemarse.',
  },
  {
    id: 'sellar',
    name: 'Sellar',
    definition:
      'Dorar la superficie de la carne a fuego vivo unos minutos por cada lado para concentrar jugos y crear una costra sabrosa.',
  },
  {
    id: 'reducir',
    name: 'Reducir',
    definition:
      'Dejar que un líquido hierva a fuego medio-alto hasta que baje de volumen y espese, concentrando el sabor.',
  },
  {
    id: 'saltear',
    name: 'Saltear',
    definition:
      'Cocinar a fuego medio-alto en poco aceite, moviendo o saltando los ingredientes para que se doren por fuera y queden al dente.',
  },
  {
    id: 'blanquear',
    name: 'Blanquear',
    definition:
      'Sumergir brevemente en agua hirviendo y luego en agua fría para fijar color o ablandar ligeramente (verduras, pasta…).',
  },
  {
    id: 'gratinar',
    name: 'Gratinar',
    definition:
      'Dorar la superficie de un plato (suele ser con queso) al grill o calor fuerte del horno hasta que quede crujiente y dorada.',
  },
  {
    id: 'al-dente',
    name: 'Al dente',
    definition:
      'Punto de cocción de la pasta: tierna al morder pero con un poco de resistencia en el centro, no pastosa.',
  },
  {
    id: 'reposar',
    name: 'Reposar',
    definition:
      'Dejar la carne o el plato unos minutos fuera del fuego para que los jugos se redistribuyan y quede más jugoso.',
  },
  {
    id: 'juliana',
    name: 'Juliana',
    definition:
      'Corte en tiras finas y alargadas (unos 2–3 mm de ancho). Se usa mucho con cebolla, zanahoria o pimiento.',
  },
  {
    id: 'confitar',
    name: 'Confitar',
    definition:
      'Cocinar despacio en abundante aceite o grasa a temperatura moderada, hasta que el alimento quede muy tierno sin dorarse demasiado.',
  },
  {
    id: 'rehogar',
    name: 'Rehogar',
    definition:
      'Cocinar a fuego suave en poco aceite, a menudo tapado, para que el alimento se ablande en su propio jugo.',
  },
  {
    id: 'emulsionar',
    name: 'Emulsionar',
    definition:
      'Mezclar un líquido graso (aceite) con otro acuoso hasta obtener una salsa homogénea y ligera.',
  },
];

export function getTerm(id: string): CulinaryTerm | undefined {
  return CULINARY_TERMS.find((t) => t.id === id);
}
