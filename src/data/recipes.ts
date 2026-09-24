import type { Recipe } from '../types';

/**
 * Biblioteca local de recetas (V1.1.1).
 * FODMAP orientativo/de demostración.
 * Estructura preparada para ampliarse y complementar futuras propuestas dinámicas.
 */
export const RECIPES: Recipe[] = [
  {
    "id": "pollo-arroz-calabacin",
    "name": "Pollo con arroz y calabacín",
    "timeMinutes": 20,
    "difficulty": "fácil",
    "imageHue": 95,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pollo",
        "quantity": "1 pechuga (aprox. 200 g)"
      },
      {
        "foodId": "arroz",
        "quantity": "80 g"
      },
      {
        "foodId": "calabacin",
        "quantity": "1 pequeño"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Lava el calabacín y córtalo en cubitos.",
          "Corta el pollo en trozos pequeños.",
          "Pon una sartén a fuego medio-alto con aceite. Cocina el pollo 5-7 min removiendo hasta que no esté rosado.",
          "Retira el pollo. Saltea el calabacín 4-5 min.",
          "Cuece el arroz según el paquete. Escúrrelo.",
          "Mezcla pollo, calabacín y arroz. Ajusta la sal y sirve."
        ]
      }
    ],
    "steps": [
      "Lava el calabacín y córtalo en cubitos.",
      "Corta el pollo en trozos pequeños.",
      "Pon una sartén a fuego medio-alto con aceite. Cocina el pollo 5-7 min removiendo hasta que no esté rosado.",
      "Retira el pollo. Saltea el calabacín 4-5 min.",
      "Cuece el arroz según el paquete. Escúrrelo.",
      "Mezcla pollo, calabacín y arroz. Ajusta la sal y sirve."
    ]
  },
  {
    "id": "tortilla-patata",
    "name": "Tortilla de patata sencilla",
    "timeMinutes": 25,
    "difficulty": "fácil",
    "imageHue": 45,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "3 unidades"
      },
      {
        "foodId": "patatas",
        "quantity": "2 medianas"
      },
      {
        "foodId": "aceite",
        "quantity": "3 cucharadas"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      },
      {
        "foodId": "cebolla",
        "quantity": "1/2 (opcional)",
        "optional": true
      }
    ],
    "methods": [
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Pela y corta las patatas en rodajas finas.",
          "Fríe las patatas a fuego medio 10-12 min hasta que estén blandas.",
          "Bate los huevos con sal. Mezcla con las patatas.",
          "Cuaja a fuego medio-bajo 4-5 min por un lado, dale la vuelta y 3-4 min más."
        ]
      }
    ],
    "steps": [
      "Pela y corta las patatas en rodajas finas.",
      "Fríe las patatas a fuego medio 10-12 min hasta que estén blandas.",
      "Bate los huevos con sal. Mezcla con las patatas.",
      "Cuaja a fuego medio-bajo 4-5 min por un lado, dale la vuelta y 3-4 min más."
    ]
  },
  {
    "id": "pasta-atun-tomate",
    "name": "Pasta con atún y tomate",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "imageHue": 15,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pasta",
        "quantity": "80-100 g"
      },
      {
        "foodId": "atun",
        "quantity": "1 lata"
      },
      {
        "foodId": "tomate-frito",
        "quantity": "4 cucharadas"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "olla",
        "label": "Olla y sartén",
        "equipmentIds": [
          "olla",
          "sarten",
          "vitro"
        ],
        "steps": [
          "Cuece la pasta en agua con sal el tiempo del paquete.",
          "Calienta tomate frito con aceite. Añade el atún escurrido.",
          "Mezcla con la pasta escurrida y sirve."
        ]
      }
    ],
    "steps": [
      "Cuece la pasta en agua con sal el tiempo del paquete.",
      "Calienta tomate frito con aceite. Añade el atún escurrido.",
      "Mezcla con la pasta escurrida y sirve."
    ]
  },
  {
    "id": "huevos-revueltos-jamon",
    "name": "Huevos revueltos con jamón",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "imageHue": 35,
    "mealTypes": [
      "desayuno",
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "2-3 unidades"
      },
      {
        "foodId": "jamon",
        "quantity": "2 lonchas"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharadita"
      },
      {
        "foodId": "sal",
        "quantity": "una pizca"
      },
      {
        "foodId": "pan",
        "quantity": "1-2 rebanadas",
        "optional": true
      }
    ],
    "methods": [
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Bate los huevos con una pizca de sal.",
          "Corta el jamón en trocitos.",
          "En sartén a fuego medio-bajo con aceite, remueve los huevos 2-3 min.",
          "Añade el jamón, remueve unos segundos y sirve."
        ]
      }
    ],
    "steps": [
      "Bate los huevos con una pizca de sal.",
      "Corta el jamón en trocitos.",
      "En sartén a fuego medio-bajo con aceite, remueve los huevos 2-3 min.",
      "Añade el jamón, remueve unos segundos y sirve."
    ]
  },
  {
    "id": "salmon-verduras",
    "name": "Salmón a la plancha con verduras",
    "timeMinutes": 20,
    "difficulty": "fácil",
    "imageHue": 200,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "salmon",
        "quantity": "1 filete"
      },
      {
        "foodId": "calabacin",
        "quantity": "1 pequeño"
      },
      {
        "foodId": "zanahoria",
        "quantity": "1 unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "plancha",
        "label": "Plancha",
        "equipmentIds": [
          "plancha",
          "vitro"
        ],
        "steps": [
          "Saltea zanahoria y calabacín 6-8 min. Reserva.",
          "Cocina el salmón 4 min por lado hasta que el centro esté opaco.",
          "Sirve con las verduras."
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Saltea las verduras en sartén 6-8 min. Reserva.",
          "Cocina el salmón 4 min por lado. Sirve con las verduras."
        ]
      }
    ],
    "steps": [
      "Saltea zanahoria y calabacín 6-8 min. Reserva.",
      "Cocina el salmón 4 min por lado hasta que el centro esté opaco.",
      "Sirve con las verduras."
    ]
  },
  {
    "id": "wrap-pavo-queso",
    "name": "Wrap de pavo y queso",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "imageHue": 160,
    "mealTypes": [
      "comida",
      "merienda",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "tortillas-trigo",
        "quantity": "1-2 unidades"
      },
      {
        "foodId": "pavo",
        "quantity": "3-4 lonchas"
      },
      {
        "foodId": "queso",
        "quantity": "2 lonchas"
      },
      {
        "foodId": "lechuga",
        "quantity": "unas hojas",
        "optional": true
      },
      {
        "foodId": "tomate",
        "quantity": "2 rodajas",
        "optional": true
      }
    ],
    "methods": [
      {
        "id": "manual",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          "Extiende el pavo y el queso sobre la tortilla.",
          "Añade lechuga y tomate si los usas.",
          "Enrolla con firmeza y corta por la mitad."
        ]
      }
    ],
    "steps": [
      "Extiende el pavo y el queso sobre la tortilla.",
      "Añade lechuga y tomate si los usas.",
      "Enrolla con firmeza y corta por la mitad."
    ]
  },
  {
    "id": "arroz-verduras-huevo",
    "name": "Arroz salteado con verduras y huevo",
    "timeMinutes": 20,
    "difficulty": "fácil",
    "imageHue": 70,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "arroz",
        "quantity": "80 g"
      },
      {
        "foodId": "huevos",
        "quantity": "1-2 unidades"
      },
      {
        "foodId": "zanahoria",
        "quantity": "1 unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "olla",
          "vitro"
        ],
        "steps": [
          "Cuece el arroz y escúrrelo.",
          "Saltea la zanahoria 4-5 min.",
          "Revuelve el huevo en la sartén 1 min.",
          "Añade el arroz, mezcla 2-3 min y sirve."
        ]
      }
    ],
    "steps": [
      "Cuece el arroz y escúrrelo.",
      "Saltea la zanahoria 4-5 min.",
      "Revuelve el huevo en la sartén 1 min.",
      "Añade el arroz, mezcla 2-3 min y sirve."
    ]
  },
  {
    "id": "ensalada-atun",
    "name": "Ensalada rápida de atún",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "imageHue": 130,
    "mealTypes": [
      "comida",
      "merienda",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "atun",
        "quantity": "1 lata"
      },
      {
        "foodId": "lechuga",
        "quantity": "un puñado"
      },
      {
        "foodId": "tomate",
        "quantity": "1 unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "manual",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          "Lava y corta lechuga y tomate.",
          "Añade el atún escurrido.",
          "Aliña con aceite y sal. Mezcla y come."
        ]
      }
    ],
    "steps": [
      "Lava y corta lechuga y tomate.",
      "Añade el atún escurrido.",
      "Aliña con aceite y sal. Mezcla y come."
    ]
  },
  {
    "id": "patatas-sartén-huevo",
    "name": "Patatas a la sartén con huevo",
    "timeMinutes": 20,
    "difficulty": "fácil",
    "imageHue": 50,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "patatas",
        "quantity": "2 medianas"
      },
      {
        "foodId": "huevos",
        "quantity": "1-2 unidades"
      },
      {
        "foodId": "aceite",
        "quantity": "2 cucharadas"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Corta las patatas en cubitos.",
          "Fríelas 12-15 min hasta doradas y blandas.",
          "Haz un hueco, casca el huevo y tapa 2-3 min."
        ]
      }
    ],
    "steps": [
      "Corta las patatas en cubitos.",
      "Fríelas 12-15 min hasta doradas y blandas.",
      "Haz un hueco, casca el huevo y tapa 2-3 min."
    ]
  },
  {
    "id": "pollo-plancha-ensalada",
    "name": "Pollo a la plancha con ensalada",
    "timeMinutes": 20,
    "difficulty": "fácil",
    "imageHue": 110,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pollo",
        "quantity": "1 pechuga"
      },
      {
        "foodId": "lechuga",
        "quantity": "un puñado"
      },
      {
        "foodId": "tomate",
        "quantity": "1 unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "plancha",
        "label": "Plancha",
        "equipmentIds": [
          "plancha",
          "vitro"
        ],
        "steps": [
          "Salpimienta el pollo. Cocina 5-6 min por lado.",
          "Prepara ensalada de lechuga y tomate.",
          "Corta el pollo en tiras y sirve."
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Cocina el pollo en sartén 5-6 min por lado.",
          "Sirve con ensalada de lechuga y tomate."
        ]
      }
    ],
    "steps": [
      "Salpimienta el pollo. Cocina 5-6 min por lado.",
      "Prepara ensalada de lechuga y tomate.",
      "Corta el pollo en tiras y sirve."
    ]
  },
  {
    "id": "cuscus-verduras",
    "name": "Cuscús con verduras salteadas",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "imageHue": 40,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "cuscus",
        "quantity": "80 g"
      },
      {
        "foodId": "calabacin",
        "quantity": "1 pequeño"
      },
      {
        "foodId": "zanahoria",
        "quantity": "1 unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Hidrata el cuscús con agua caliente 5 min.",
          "Saltea las verduras 6-7 min.",
          "Mezcla con el cuscús esponjado y sirve."
        ]
      }
    ],
    "steps": [
      "Hidrata el cuscús con agua caliente 5 min.",
      "Saltea las verduras 6-7 min.",
      "Mezcla con el cuscús esponjado y sirve."
    ]
  },
  {
    "id": "tostada-aguacate-huevo",
    "name": "Tostada con huevo y tomate",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "imageHue": 25,
    "mealTypes": [
      "desayuno",
      "merienda"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pan",
        "quantity": "2 rebanadas"
      },
      {
        "foodId": "huevos",
        "quantity": "1-2 unidades"
      },
      {
        "foodId": "tomate",
        "quantity": "1 unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharadita"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "tostadora",
        "label": "Tostadora",
        "equipmentIds": [
          "tostadora",
          "sarten",
          "vitro"
        ],
        "steps": [
          "Tuesta el pan. Pon tomate rallado o en rodajas con sal.",
          "Fríe el huevo 2-3 min y colócalo encima."
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Tuesta el pan en sartén seca. Añade tomate.",
          "Fríe el huevo y sírvelo encima."
        ]
      }
    ],
    "steps": [
      "Tuesta el pan. Pon tomate rallado o en rodajas con sal.",
      "Fríe el huevo 2-3 min y colócalo encima."
    ]
  },
  {
    "id": "guisantes-jamon",
    "name": "Guisantes salteados con jamón",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "imageHue": 100,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "guisantes",
        "quantity": "200 g"
      },
      {
        "foodId": "jamon",
        "quantity": "2-3 lonchas"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Sofríe el jamón 1-2 min.",
          "Añade los guisantes y cocina 6-8 min. Sirve."
        ]
      }
    ],
    "steps": [
      "Sofríe el jamón 1-2 min.",
      "Añade los guisantes y cocina 6-8 min. Sirve."
    ]
  },
  {
    "id": "yogur-platano-avena",
    "name": "Bowl de yogur, plátano y avena",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "imageHue": 320,
    "mealTypes": [
      "desayuno",
      "merienda"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "yogur",
        "quantity": "1 vasito"
      },
      {
        "foodId": "platano",
        "quantity": "1 unidad"
      },
      {
        "foodId": "avena",
        "quantity": "3-4 cucharadas"
      }
    ],
    "methods": [
      {
        "id": "manual",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          "Pon el yogur en un bol.",
          "Añade rodajas de plátano y avena. Come."
        ]
      }
    ],
    "steps": [
      "Pon el yogur en un bol.",
      "Añade rodajas de plátano y avena. Come."
    ]
  },
  {
    "id": "pasta-queso-espinacas",
    "name": "Pasta con queso y espinacas",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "imageHue": 85,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pasta",
        "quantity": "80-100 g"
      },
      {
        "foodId": "queso",
        "quantity": "un puñado"
      },
      {
        "foodId": "espinacas",
        "quantity": "un puñado"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "olla",
        "label": "Olla",
        "equipmentIds": [
          "olla",
          "vitro"
        ],
        "steps": [
          "Cuece la pasta. El último minuto añade las espinacas.",
          "Escurre, mezcla con queso y aceite, y sirve."
        ]
      }
    ],
    "steps": [
      "Cuece la pasta. El último minuto añade las espinacas.",
      "Escurre, mezcla con queso y aceite, y sirve."
    ]
  },
  {
    "id": "airfryer-patatas-fritas",
    "name": "Patatas fritas congeladas",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "imageHue": 48,
    "mealTypes": [
      "comida",
      "cena",
      "merienda"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "patatas-fritas-congeladas",
        "quantity": "1 ración"
      }
    ],
    "methods": [
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          "Precalienta la freidora de aire a 200 °C si tu modelo lo permite.",
          "Coloca las patatas en una sola capa.",
          "Cocina 12-15 min, agitando a mitad, hasta doradas."
        ]
      },
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          "Precalienta el horno a 220 °C.",
          "Extiende las patatas en una bandeja.",
          "Hornea 18-22 min, removiendo a mitad."
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Calienta un poco de aceite en sartén.",
          "Fríe las patatas 10-12 min removiendo hasta doradas."
        ]
      }
    ],
    "steps": [
      "Precalienta la freidora de aire a 200 °C si tu modelo lo permite.",
      "Coloca las patatas en una sola capa.",
      "Cocina 12-15 min, agitando a mitad, hasta doradas."
    ]
  },
  {
    "id": "airfryer-croquetas",
    "name": "Croquetas de jamón",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "imageHue": 30,
    "mealTypes": [
      "comida",
      "cena",
      "merienda"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "croquetas-jamon",
        "quantity": "1 ración"
      }
    ],
    "methods": [
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          "Coloca las croquetas sin amontonar.",
          "Cocina a 180-190 °C unos 8-12 min hasta doradas."
        ]
      },
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          "Precalienta el horno a 200 °C.",
          "Hornea 12-15 min hasta doradas."
        ]
      },
      {
        "id": "freidora",
        "label": "Freidora de aceite",
        "equipmentIds": [
          "freidora"
        ],
        "steps": [
          "Calienta el aceite a temperatura media-alta.",
          "Fríe las croquetas 3-5 min hasta doradas. Escurre en papel."
        ]
      }
    ],
    "steps": [
      "Coloca las croquetas sin amontonar.",
      "Cocina a 180-190 °C unos 8-12 min hasta doradas."
    ]
  },
  {
    "id": "nuggets-airfryer",
    "name": "Nuggets de pollo",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "imageHue": 35,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "nuggets",
        "quantity": "1 ración"
      }
    ],
    "methods": [
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          "Coloca los nuggets en una sola capa.",
          "Cocina a 180-200 °C 10-14 min, dándoles la vuelta a mitad."
        ]
      },
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          "Hornea a 200 °C 15-18 min según el paquete."
        ]
      }
    ],
    "steps": [
      "Coloca los nuggets en una sola capa.",
      "Cocina a 180-200 °C 10-14 min, dándoles la vuelta a mitad."
    ]
  },
  {
    "id": "pizza-congelada-receta",
    "name": "Pizza congelada",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "imageHue": 10,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pizza-congelada",
        "quantity": "1 ración"
      }
    ],
    "methods": [
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          "Precalienta el horno según el paquete (suele ser 200-220 °C).",
          "Hornea el tiempo indicado hasta que el queso burbujee."
        ]
      },
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          "Si cabe en tu freidora, cocina a 180 °C 8-12 min controlando el dorado."
        ]
      }
    ],
    "steps": [
      "Precalienta el horno según el paquete (suele ser 200-220 °C).",
      "Hornea el tiempo indicado hasta que el queso burbujee."
    ]
  },
  {
    "id": "lasana-micro",
    "name": "Lasaña preparada",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "imageHue": 20,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "lasana-preparada",
        "quantity": "1 ración"
      }
    ],
    "methods": [
      {
        "id": "micro",
        "label": "Microondas",
        "equipmentIds": [
          "microondas"
        ],
        "steps": [
          "Retira el film si el envase lo indica.",
          "Calienta a potencia media-alta el tiempo del envase (suele ser 4-7 min).",
          "Deja reposar 1 min y sirve."
        ]
      },
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          "Hornea según instrucciones del envase hasta que esté caliente por dentro."
        ]
      }
    ],
    "steps": [
      "Retira el film si el envase lo indica.",
      "Calienta a potencia media-alta el tiempo del envase (suele ser 4-7 min).",
      "Deja reposar 1 min y sirve."
    ]
  },
  {
    "id": "empanadillas-air",
    "name": "Empanadillas",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "imageHue": 40,
    "mealTypes": [
      "comida",
      "cena",
      "merienda"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "empanadillas",
        "quantity": "1 ración"
      }
    ],
    "methods": [
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          "Coloca las empanadillas sin amontonar.",
          "Cocina a 180 °C 8-12 min hasta doradas."
        ]
      },
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          "Hornea a 200 °C 12-15 min."
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Fríe con un poco de aceite 3-4 min por lado."
        ]
      }
    ],
    "steps": [
      "Coloca las empanadillas sin amontonar.",
      "Cocina a 180 °C 8-12 min hasta doradas."
    ]
  },
  {
    "id": "huevos-fritos-pan",
    "name": "Huevos fritos con pan",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "imageHue": 28,
    "mealTypes": [
      "desayuno",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "pan",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Calienta aceite en sartén a fuego medio.",
          "Casca los huevos y fríe 2-3 min.",
          "Sirve con pan."
        ]
      }
    ],
    "steps": [
      "Calienta aceite en sartén a fuego medio.",
      "Casca los huevos y fríe 2-3 min.",
      "Sirve con pan."
    ]
  },
  {
    "id": "tortilla-francesa",
    "name": "Tortilla francesa",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "imageHue": 32,
    "mealTypes": [
      "desayuno",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Bate 2 huevos con sal.",
          "Cuaja en sartén antiadherente 2-3 min y dobla."
        ]
      }
    ],
    "steps": [
      "Bate 2 huevos con sal.",
      "Cuaja en sartén antiadherente 2-3 min y dobla."
    ]
  },
  {
    "id": "yogur-fresas",
    "name": "Yogur con fresas",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "imageHue": 340,
    "mealTypes": [
      "desayuno",
      "merienda"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "yogur",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "fresas",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "manual",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          "Lava las fresas y córtalas.",
          "Sirve sobre el yogur."
        ]
      }
    ],
    "steps": [
      "Lava las fresas y córtalas.",
      "Sirve sobre el yogur."
    ]
  },
  {
    "id": "avena-leche-micro",
    "name": "Avena con leche (microondas)",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "imageHue": 50,
    "mealTypes": [
      "desayuno"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "avena",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "leche",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Microondas",
        "equipmentIds": [
          "microondas"
        ],
        "steps": [
          "Mezcla avena y leche en un bol apto.",
          "Calienta 2-3 min a media potencia, remueve y sirve."
        ]
      }
    ],
    "steps": [
      "Mezcla avena y leche en un bol apto.",
      "Calienta 2-3 min a media potencia, remueve y sirve."
    ]
  },
  {
    "id": "tostada-platano-queso",
    "name": "Tostada de plátano y queso",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "imageHue": 55,
    "mealTypes": [
      "desayuno",
      "merienda"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pan",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "platano",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "queso",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Tostadora",
        "equipmentIds": [
          "tostadora"
        ],
        "steps": [
          "Tuesta el pan.",
          "Añade queso y rodajas de plátano."
        ]
      }
    ],
    "steps": [
      "Tuesta el pan.",
      "Añade queso y rodajas de plátano."
    ]
  },
  {
    "id": "bocadillo-pavo",
    "name": "Bocadillo de pavo y queso",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "imageHue": 150,
    "mealTypes": [
      "comida",
      "merienda"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pan",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "pavo",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "queso",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "manual",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          "Abre el pan.",
          "Coloca pavo y queso. Cierra y come."
        ]
      }
    ],
    "steps": [
      "Abre el pan.",
      "Coloca pavo y queso. Cierra y come."
    ]
  },
  {
    "id": "bocadillo-jamon-tomate",
    "name": "Bocadillo de jamón y tomate",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "imageHue": 12,
    "mealTypes": [
      "comida",
      "merienda"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pan",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "jamon",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "tomate",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "manual",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          "Unta tomate en el pan con un poco de sal.",
          "Añade el jamón."
        ]
      }
    ],
    "steps": [
      "Unta tomate en el pan con un poco de sal.",
      "Añade el jamón."
    ]
  },
  {
    "id": "hummus-pan",
    "name": "Hummus con pan",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "imageHue": 60,
    "mealTypes": [
      "merienda",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "hummus",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "pan",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "manual",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          "Sirve el hummus en un plato.",
          "Acompaña con pan."
        ]
      }
    ],
    "steps": [
      "Sirve el hummus en un plato.",
      "Acompaña con pan."
    ]
  },
  {
    "id": "hot-dog-simple",
    "name": "Perrito caliente sencillo",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "imageHue": 18,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "hot-dog",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "pan",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Olla",
        "equipmentIds": [
          "olla",
          "vitro"
        ],
        "steps": [
          "Calienta las salchichas en agua 5 min.",
          "Sírvelas en el pan."
        ]
      }
    ],
    "steps": [
      "Calienta las salchichas en agua 5 min.",
      "Sírvelas en el pan."
    ]
  },
  {
    "id": "pollo-arroz",
    "name": "Pollo con arroz blanco",
    "timeMinutes": 25,
    "difficulty": "fácil",
    "imageHue": 90,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pollo",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "arroz",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Sartén y olla",
        "equipmentIds": [
          "sarten",
          "olla",
          "vitro"
        ],
        "steps": [
          "Cuece el arroz.",
          "Saltea el pollo en cubos 8-10 min.",
          "Sirve juntos."
        ]
      }
    ],
    "steps": [
      "Cuece el arroz.",
      "Saltea el pollo en cubos 8-10 min.",
      "Sirve juntos."
    ]
  },
  {
    "id": "pollo-pimiento",
    "name": "Salteado de pollo y pimiento",
    "timeMinutes": 20,
    "difficulty": "fácil",
    "imageHue": 100,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pollo",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "pimiento",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Corta pollo y pimiento.",
          "Saltea el pollo 6 min, añade pimiento 5 min más."
        ]
      }
    ],
    "steps": [
      "Corta pollo y pimiento.",
      "Saltea el pollo 6 min, añade pimiento 5 min más."
    ]
  },
  {
    "id": "ternera-plancha",
    "name": "Ternera a la plancha",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "imageHue": 5,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "ternera",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Plancha",
        "equipmentIds": [
          "plancha",
          "vitro"
        ],
        "steps": [
          "Salpimienta la ternera.",
          "Cocina 3-4 min por lado según grosor."
        ]
      }
    ],
    "steps": [
      "Salpimienta la ternera.",
      "Cocina 3-4 min por lado según grosor."
    ]
  },
  {
    "id": "ternera-sarten",
    "name": "Ternera a la sartén",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "imageHue": 8,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "ternera",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Salpimienta la ternera.",
          "Cocina 3-4 min por lado."
        ]
      }
    ],
    "steps": [
      "Salpimienta la ternera.",
      "Cocina 3-4 min por lado."
    ]
  },
  {
    "id": "pescado-horno",
    "name": "Pescado congelado al horno",
    "timeMinutes": 25,
    "difficulty": "fácil",
    "imageHue": 210,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pescado-congelado",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          "Precalienta el horno a 200 °C.",
          "Coloca el pescado con aceite y sal.",
          "Hornea 18-22 min."
        ]
      }
    ],
    "steps": [
      "Precalienta el horno a 200 °C.",
      "Coloca el pescado con aceite y sal.",
      "Hornea 18-22 min."
    ]
  },
  {
    "id": "pescado-airfryer",
    "name": "Pescado en Air Fryer",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "imageHue": 205,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pescado-congelado",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          "Unta ligeramente con aceite.",
          "Cocina a 180 °C 12-15 min."
        ]
      }
    ],
    "steps": [
      "Unta ligeramente con aceite.",
      "Cocina a 180 °C 12-15 min."
    ]
  },
  {
    "id": "brocoli-micro-huevo",
    "name": "Brócoli al microondas con huevo",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "imageHue": 115,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "brocoli",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "huevos",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Microondas y sartén",
        "equipmentIds": [
          "microondas",
          "sarten",
          "vitro"
        ],
        "steps": [
          "Cocina el brócoli al microondas 4-5 min con un poco de agua.",
          "Fríe un huevo y sírvelo encima."
        ]
      }
    ],
    "steps": [
      "Cocina el brócoli al microondas 4-5 min con un poco de agua.",
      "Fríe un huevo y sírvelo encima."
    ]
  },
  {
    "id": "espinacas-ajos-huevo",
    "name": "Espinacas salteadas con huevo",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "imageHue": 120,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "espinacas",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "huevos",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "ajo",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Saltea el ajo 30 segundos.",
          "Añade espinacas 2-3 min.",
          "Haz un huevo y sirve."
        ]
      }
    ],
    "steps": [
      "Saltea el ajo 30 segundos.",
      "Añade espinacas 2-3 min.",
      "Haz un huevo y sirve."
    ]
  },
  {
    "id": "garbanzos-tomate",
    "name": "Garbanzos con tomate frito",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "imageHue": 25,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "garbanzos",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "tomate-frito",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Calienta los garbanzos escurridos con tomate frito 5-7 min.",
          "Ajusta sal y sirve."
        ]
      }
    ],
    "steps": [
      "Calienta los garbanzos escurridos con tomate frito 5-7 min.",
      "Ajusta sal y sirve."
    ]
  },
  {
    "id": "maiz-atun",
    "name": "Ensalada de maíz y atún",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "imageHue": 135,
    "mealTypes": [
      "comida",
      "merienda"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "maiz",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "atun",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "lechuga",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "manual",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          "Mezcla maíz, atún y lechuga.",
          "Aliña si quieres con aceite."
        ]
      }
    ],
    "steps": [
      "Mezcla maíz, atún y lechuga.",
      "Aliña si quieres con aceite."
    ]
  },
  {
    "id": "tostada-tomate-queso",
    "name": "Tostada de tomate y queso",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "imageHue": 22,
    "mealTypes": [
      "desayuno",
      "merienda"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pan",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "tomate",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "queso",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Tostadora",
        "equipmentIds": [
          "tostadora"
        ],
        "steps": [
          "Tuesta el pan.",
          "Añade tomate y queso."
        ]
      }
    ],
    "steps": [
      "Tuesta el pan.",
      "Añade tomate y queso."
    ]
  },
  {
    "id": "calabacin-plancha",
    "name": "Calabacín a la plancha",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "imageHue": 125,
    "mealTypes": [
      "comida",
      "cena",
      "merienda"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "calabacin",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Plancha",
        "equipmentIds": [
          "plancha",
          "vitro"
        ],
        "steps": [
          "Corta el calabacín en rodajas.",
          "Cocina 3-4 min por lado."
        ]
      }
    ],
    "steps": [
      "Corta el calabacín en rodajas.",
      "Cocina 3-4 min por lado."
    ]
  },
  {
    "id": "calabacin-sarten",
    "name": "Calabacín a la sartén",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "imageHue": 126,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "calabacin",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Corta el calabacín.",
          "Saltea 6-8 min."
        ]
      }
    ],
    "steps": [
      "Corta el calabacín.",
      "Saltea 6-8 min."
    ]
  },
  {
    "id": "arroz-tomate",
    "name": "Arroz con tomate frito",
    "timeMinutes": 20,
    "difficulty": "fácil",
    "imageHue": 15,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "arroz",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "tomate-frito",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Olla",
        "equipmentIds": [
          "olla",
          "vitro"
        ],
        "steps": [
          "Cuece el arroz.",
          "Méclalo con tomate frito caliente."
        ]
      }
    ],
    "steps": [
      "Cuece el arroz.",
      "Méclalo con tomate frito caliente."
    ]
  },
  {
    "id": "pasta-ajo-aceite",
    "name": "Pasta con ajo y aceite",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "imageHue": 55,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pasta",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "ajo",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Olla y sartén",
        "equipmentIds": [
          "olla",
          "sarten",
          "vitro"
        ],
        "steps": [
          "Cuece la pasta.",
          "Sofríe ajo en aceite 1 min.",
          "Mezcla y sirve."
        ]
      }
    ],
    "steps": [
      "Cuece la pasta.",
      "Sofríe ajo en aceite 1 min.",
      "Mezcla y sirve."
    ]
  },
  {
    "id": "omelette-queso",
    "name": "Omelette de queso",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "imageHue": 38,
    "mealTypes": [
      "desayuno",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "queso",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Bate huevos, cuaja en sartén.",
          "Añade queso, dobla y sirve."
        ]
      }
    ],
    "steps": [
      "Bate huevos, cuaja en sartén.",
      "Añade queso, dobla y sirve."
    ]
  },
  {
    "id": "omelette-espinacas",
    "name": "Omelette de espinacas",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "imageHue": 88,
    "mealTypes": [
      "desayuno",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "espinacas",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Saltea espinacas 1 min.",
          "Añade huevos batidos y cuaja."
        ]
      }
    ],
    "steps": [
      "Saltea espinacas 1 min.",
      "Añade huevos batidos y cuaja."
    ]
  },
  {
    "id": "manzana-yogur",
    "name": "Manzana con yogur",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "imageHue": 300,
    "mealTypes": [
      "desayuno",
      "merienda"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "manzana",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "yogur",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "manual",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          "Corta la manzana.",
          "Sirve con yogur."
        ]
      }
    ],
    "steps": [
      "Corta la manzana.",
      "Sirve con yogur."
    ]
  },
  {
    "id": "naranja-fresca",
    "name": "Naranja fresca",
    "timeMinutes": 3,
    "difficulty": "fácil",
    "imageHue": 35,
    "mealTypes": [
      "desayuno",
      "merienda"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "naranja",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "manual",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          "Pela la naranja o córtala en gajos y come."
        ]
      }
    ],
    "steps": [
      "Pela la naranja o córtala en gajos y come."
    ]
  },
  {
    "id": "verduras-mixtas-salteado",
    "name": "Verduras mixtas salteadas",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "imageHue": 105,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "verduras-mixtas",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Saltea las verduras congeladas 8-10 min.",
          "Salpimienta y sirve."
        ]
      }
    ],
    "steps": [
      "Saltea las verduras congeladas 8-10 min.",
      "Salpimienta y sirve."
    ]
  },
  {
    "id": "verduras-mixtas-air",
    "name": "Verduras mixtas en Air Fryer",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "imageHue": 108,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "verduras-mixtas",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          "Mezcla verduras con un chorrito de aceite.",
          "Cocina a 180 °C 12-15 min."
        ]
      }
    ],
    "steps": [
      "Mezcla verduras con un chorrito de aceite.",
      "Cocina a 180 °C 12-15 min."
    ]
  },
  {
    "id": "patatas-horno",
    "name": "Patatas al horno",
    "timeMinutes": 30,
    "difficulty": "fácil",
    "imageHue": 45,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "patatas",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          "Precalienta el horno a 200 °C.",
          "Corta patatas, unta aceite y sal.",
          "Hornea 25-30 min."
        ]
      }
    ],
    "steps": [
      "Precalienta el horno a 200 °C.",
      "Corta patatas, unta aceite y sal.",
      "Hornea 25-30 min."
    ]
  },
  {
    "id": "patatas-airfryer",
    "name": "Patatas en Air Fryer",
    "timeMinutes": 20,
    "difficulty": "fácil",
    "imageHue": 46,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "patatas",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          "Corta las patatas en gajos y úntalas con aceite y sal.",
          "Cocina a 180-190 °C 15-20 min, agitando a mitad."
        ]
      }
    ],
    "steps": [
      "Corta las patatas en gajos y úntalas con aceite y sal.",
      "Cocina a 180-190 °C 15-20 min, agitando a mitad."
    ]
  },
  {
    "id": "salmon-micro",
    "name": "Salmón al microondas",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "imageHue": 198,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "salmon",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Microondas",
        "equipmentIds": [
          "microondas"
        ],
        "steps": [
          "Coloca el salmón en un plato apto y tapa.",
          "Calienta 3-5 min a media potencia hasta opaco."
        ]
      }
    ],
    "steps": [
      "Coloca el salmón en un plato apto y tapa.",
      "Calienta 3-5 min a media potencia hasta opaco."
    ]
  },
  {
    "id": "tostada-atun",
    "name": "Tostada de atún y tomate",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "imageHue": 16,
    "mealTypes": [
      "merienda",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pan",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "atun",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "tomate",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Tostadora",
        "equipmentIds": [
          "tostadora"
        ],
        "steps": [
          "Tuesta el pan.",
          "Añade tomate y atún escurrido."
        ]
      }
    ],
    "steps": [
      "Tuesta el pan.",
      "Añade tomate y atún escurrido."
    ]
  },
  {
    "id": "queso-plancha-pan",
    "name": "Queso a la plancha con pan",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "imageHue": 42,
    "mealTypes": [
      "merienda",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "queso",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "pan",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Plancha",
        "equipmentIds": [
          "plancha",
          "vitro"
        ],
        "steps": [
          "Calienta el queso a la plancha hasta fundir un poco.",
          "Sirve con pan."
        ]
      }
    ],
    "steps": [
      "Calienta el queso a la plancha hasta fundir un poco.",
      "Sirve con pan."
    ]
  },
  {
    "id": "rollito-pavo",
    "name": "Rollito de pavo y lechuga",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "imageHue": 155,
    "mealTypes": [
      "merienda",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pavo",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "lechuga",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "manual",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          "Envuelve lonchas de pavo con lechuga.",
          "Come como snack."
        ]
      }
    ],
    "steps": [
      "Envuelve lonchas de pavo con lechuga.",
      "Come como snack."
    ]
  },
  {
    "id": "garbanzos-espinacas",
    "name": "Garbanzos con espinacas",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "imageHue": 80,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "garbanzos",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "espinacas",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Calienta garbanzos.",
          "Añade espinacas 2-3 min. Salpimienta."
        ]
      }
    ],
    "steps": [
      "Calienta garbanzos.",
      "Añade espinacas 2-3 min. Salpimienta."
    ]
  },
  {
    "id": "pollo-congelado-air",
    "name": "Pollo congelado en Air Fryer",
    "timeMinutes": 25,
    "difficulty": "fácil",
    "imageHue": 95,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pollo-congelado",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          "Cocina a 180 °C 20-25 min según grosor.",
          "Comprueba que el interior no esté rosado."
        ]
      }
    ],
    "steps": [
      "Cocina a 180 °C 20-25 min según grosor.",
      "Comprueba que el interior no esté rosado."
    ]
  },
  {
    "id": "aceitunas-queso",
    "name": "Queso con aceitunas",
    "timeMinutes": 3,
    "difficulty": "fácil",
    "imageHue": 70,
    "mealTypes": [
      "merienda"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "queso",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceitunas",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "manual",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          "Sirve trozos de queso con aceitunas."
        ]
      }
    ],
    "steps": [
      "Sirve trozos de queso con aceitunas."
    ]
  },
  {
    "id": "avena-leche-fria",
    "name": "Avena con leche fría",
    "timeMinutes": 3,
    "difficulty": "fácil",
    "imageHue": 52,
    "mealTypes": [
      "desayuno"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "avena",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "leche",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "manual",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          "Mezcla avena y leche fría.",
          "Espera 2 min si quieres más blanda."
        ]
      }
    ],
    "steps": [
      "Mezcla avena y leche fría.",
      "Espera 2 min si quieres más blanda."
    ]
  },
  {
    "id": "huevo-micro",
    "name": "Huevo cocido al microondas",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "imageHue": 33,
    "mealTypes": [
      "desayuno",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "1 ración / al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Microondas",
        "equipmentIds": [
          "microondas"
        ],
        "steps": [
          "Casca el huevo en un bol apto untado.",
          "Cubre y calienta a intervalos de 30 s hasta cuajar (aprox. 1 min)."
        ]
      }
    ],
    "steps": [
      "Casca el huevo en un bol apto untado.",
      "Cubre y calienta a intervalos de 30 s hasta cuajar (aprox. 1 min)."
    ]
  },
  {
    "id": "pimiento-sarten",
    "name": "Pimiento salteado",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "imageHue": 102,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pimiento",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          "Corta el pimiento en tiras.",
          "Saltea 7-8 min."
        ]
      }
    ],
    "steps": [
      "Corta el pimiento en tiras.",
      "Saltea 7-8 min."
    ]
  },
  {
    "id": "pasta-atun-simple",
    "name": "Pasta con atún",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "imageHue": 14,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pasta",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "atun",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Olla",
        "equipmentIds": [
          "olla",
          "vitro"
        ],
        "steps": [
          "Cuece la pasta.",
          "Mezcla con atún escurrido y aceite."
        ]
      }
    ],
    "steps": [
      "Cuece la pasta.",
      "Mezcla con atún escurrido y aceite."
    ]
  },
  {
    "id": "arroz-atun",
    "name": "Arroz con atún",
    "timeMinutes": 20,
    "difficulty": "fácil",
    "imageHue": 75,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "arroz",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "atun",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Olla",
        "equipmentIds": [
          "olla",
          "vitro"
        ],
        "steps": [
          "Cuece el arroz.",
          "Mezcla con atún escurrido."
        ]
      }
    ],
    "steps": [
      "Cuece el arroz.",
      "Mezcla con atún escurrido."
    ]
  },
  {
    "id": "ensalada-tomate-pepino",
    "name": "Ensalada de tomate y pepino",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "imageHue": 128,
    "mealTypes": [
      "comida",
      "merienda"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "tomate",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "pepino",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "manual",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          "Corta tomate y pepino.",
          "Aliña con aceite y sal."
        ]
      }
    ],
    "steps": [
      "Corta tomate y pepino.",
      "Aliña con aceite y sal."
    ]
  },
  {
    "id": "pollo-horno",
    "name": "Pollo al horno sencillo",
    "timeMinutes": 30,
    "difficulty": "fácil",
    "imageHue": 98,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Orientación demostrativa. Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pollo",
        "quantity": "1 ración / al gusto"
      },
      {
        "foodId": "aceite",
        "quantity": "al gusto"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "methods": [
      {
        "id": "main",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          "Precalienta el horno a 200 °C.",
          "Unta el pollo con aceite y sal.",
          "Hornea 25-30 min hasta que no esté rosado."
        ]
      }
    ],
    "steps": [
      "Precalienta el horno a 200 °C.",
      "Unta el pollo con aceite y sal.",
      "Hornea 25-30 min hasta que no esté rosado."
    ]
  }
];

export function getBuiltinRecipeById(id: string): Recipe | undefined {
  return RECIPES.find((r) => r.id === id);
}
