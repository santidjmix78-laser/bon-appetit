import { getAllRecipes } from '../src/utils/helpers.ts';
import {
  browseChefRecipes,
  detectEquipmentInQuery,
  searchChefRecipes,
} from '../src/utils/chefSearch.ts';
import type { AppState } from '../src/types/index.ts';

const recipes = getAllRecipes([]);
const state = {
  availableFoodIds: ['arroz', 'pasta', 'huevos'],
  customFoods: [],
  customRecipes: [],
  equipmentIds: ['sarten', 'olla', 'vitro', 'tostadora', 'microondas'],
  foodPreferences: {
    likedFoodIds: [],
    avoidedFoodIds: ['cebolla'],
    labels: {},
  },
} as unknown as AppState;

function show(q: string) {
  const r = searchChefRecipes(recipes, state, q);
  console.log(`\n=== ${JSON.stringify(q)} → ${r.length}`);
  console.log(r.slice(0, 15).map((m) => m.recipe.id).join(', '));
}

show('pasta');
show('arroz');
show('salmón');
show('ajo pasta');
show('air fryer');
show('xyz123');
console.log('\nequipment detect', detectEquipmentInQuery('air fryer'));
const all = browseChefRecipes(recipes, state, {});
console.log('browse all', all.length);
console.log(
  'pasta-ajo in pasta?',
  searchChefRecipes(recipes, state, 'pasta').some(
    (m) => m.recipe.id === 'pasta-ajo-aceite',
  ),
);
console.log(
  'salmon in salmón?',
  searchChefRecipes(recipes, state, 'salmón').some(
    (m) => m.recipe.id === 'salmon-plancha-simple',
  ),
);
console.log(
  'ajo pasta hits pasta-ajo?',
  searchChefRecipes(recipes, state, 'ajo pasta').some(
    (m) => m.recipe.id === 'pasta-ajo-aceite',
  ),
);
