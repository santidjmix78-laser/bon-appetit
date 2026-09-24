import type { FoodItem } from '../types';

export const DEFAULT_FOODS: FoodItem[] = [
  // Nevera - Verduras
  { id: 'tomate', name: 'Tomate', zone: 'nevera', category: 'verduras' },
  { id: 'calabacin', name: 'Calabacín', zone: 'nevera', category: 'verduras' },
  { id: 'zanahoria', name: 'Zanahoria', zone: 'nevera', category: 'verduras' },
  { id: 'lechuga', name: 'Lechuga', zone: 'nevera', category: 'verduras' },
  { id: 'pepino', name: 'Pepino', zone: 'nevera', category: 'verduras' },
  { id: 'pimiento', name: 'Pimiento', zone: 'nevera', category: 'verduras' },
  { id: 'cebolla', name: 'Cebolla', zone: 'nevera', category: 'verduras' },
  { id: 'ajo', name: 'Ajo', zone: 'nevera', category: 'verduras' },
  { id: 'espinacas', name: 'Espinacas', zone: 'nevera', category: 'verduras' },
  { id: 'brocoli', name: 'Brócoli', zone: 'nevera', category: 'verduras' },

  // Nevera - Frutas
  { id: 'platano', name: 'Plátano', zone: 'nevera', category: 'frutas' },
  { id: 'manzana', name: 'Manzana', zone: 'nevera', category: 'frutas' },
  { id: 'naranja', name: 'Naranja', zone: 'nevera', category: 'frutas' },
  { id: 'fresas', name: 'Fresas', zone: 'nevera', category: 'frutas' },

  // Nevera - Proteínas
  { id: 'pollo', name: 'Pollo', zone: 'nevera', category: 'proteinas' },
  { id: 'huevos', name: 'Huevos', zone: 'nevera', category: 'proteinas' },
  { id: 'pavo', name: 'Pavo', zone: 'nevera', category: 'proteinas' },
  { id: 'jamon', name: 'Jamón', zone: 'nevera', category: 'proteinas' },
  { id: 'salmon', name: 'Salmón', zone: 'nevera', category: 'proteinas' },
  { id: 'ternera', name: 'Ternera', zone: 'nevera', category: 'proteinas' },

  // Nevera - Lácteos
  { id: 'queso', name: 'Queso', zone: 'nevera', category: 'lacteos' },
  { id: 'yogur', name: 'Yogur', zone: 'nevera', category: 'lacteos' },
  { id: 'leche', name: 'Leche', zone: 'nevera', category: 'lacteos' },
  { id: 'mantequilla', name: 'Mantequilla', zone: 'nevera', category: 'lacteos' },

  // Congelador
  { id: 'guisantes', name: 'Guisantes', zone: 'congelador', category: 'verduras' },
  { id: 'verduras-mixtas', name: 'Verduras mixtas', zone: 'congelador', category: 'verduras' },
  { id: 'pollo-congelado', name: 'Pollo congelado', zone: 'congelador', category: 'proteinas' },
  { id: 'pescado-congelado', name: 'Pescado congelado', zone: 'congelador', category: 'proteinas' },
  { id: 'pan-congelado', name: 'Pan', zone: 'congelador', category: 'cereales' },

  // Despensa - Cereales
  { id: 'arroz', name: 'Arroz', zone: 'despensa', category: 'cereales' },
  { id: 'pasta', name: 'Pasta', zone: 'despensa', category: 'cereales' },
  { id: 'patatas', name: 'Patatas', zone: 'despensa', category: 'cereales' },
  { id: 'pan', name: 'Pan', zone: 'despensa', category: 'cereales' },
  { id: 'cuscus', name: 'Cuscús', zone: 'despensa', category: 'cereales' },
  { id: 'avena', name: 'Avena', zone: 'despensa', category: 'cereales' },
  { id: 'tortillas-trigo', name: 'Tortillas de trigo', zone: 'despensa', category: 'cereales' },

  // Despensa - Conservas
  { id: 'atun', name: 'Atún', zone: 'despensa', category: 'conservas' },
  { id: 'tomate-frito', name: 'Tomate frito', zone: 'despensa', category: 'conservas' },
  { id: 'garbanzos', name: 'Garbanzos', zone: 'despensa', category: 'conservas' },
  { id: 'maiz', name: 'Maíz', zone: 'despensa', category: 'conservas' },
  { id: 'aceitunas', name: 'Aceitunas', zone: 'despensa', category: 'conservas' },

  // Productos preparados (no se descomponen en ingredientes)
  { id: 'croquetas-jamon', name: 'Croquetas de jamón', zone: 'congelador', category: 'preparados' },
  { id: 'patatas-fritas-congeladas', name: 'Patatas fritas congeladas', zone: 'congelador', category: 'preparados' },
  { id: 'nuggets', name: 'Nuggets de pollo', zone: 'congelador', category: 'preparados' },
  { id: 'pizza-congelada', name: 'Pizza congelada', zone: 'congelador', category: 'preparados' },
  { id: 'lasana-preparada', name: 'Lasaña preparada', zone: 'congelador', category: 'preparados' },
  { id: 'empanadillas', name: 'Empanadillas', zone: 'congelador', category: 'preparados' },
  { id: 'hot-dog', name: 'Salchichas / frankfurts', zone: 'nevera', category: 'preparados' },
  { id: 'hummus', name: 'Hummus', zone: 'nevera', category: 'preparados' },

  // Despensa - Otros
  { id: 'aceite', name: 'Aceite de oliva', zone: 'despensa', category: 'otros' },
  { id: 'sal', name: 'Sal', zone: 'despensa', category: 'otros' },
  { id: 'pimienta', name: 'Pimienta', zone: 'despensa', category: 'otros' },
  { id: 'especias', name: 'Especias', zone: 'despensa', category: 'otros' },
];

export const ZONE_LABELS: Record<FoodItem['zone'], string> = {
  nevera: 'Nevera',
  congelador: 'Congelador',
  despensa: 'Despensa',
};

export const CATEGORY_LABELS: Record<FoodItem['category'], string> = {
  verduras: 'Verduras',
  frutas: 'Frutas',
  proteinas: 'Proteínas',
  lacteos: 'Lácteos',
  cereales: 'Cereales / carbohidratos',
  conservas: 'Conservas',
  preparados: 'Productos preparados',
  otros: 'Otros',
};

/** Ingredientes base que suelen considerarse siempre disponibles (condimentos). */
export const ALWAYS_AVAILABLE = new Set(['aceite', 'sal', 'pimienta', 'especias']);
