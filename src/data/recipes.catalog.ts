import type { Recipe } from '../types';

/**
 * Catálogo Bon Appetit v1.3.2 — revisión culinaria integral.
 * Fuente de verdad: scripts/culinary-v132-rewrite.mjs y overrides manuales.
 * No ejecutar build-quality-catalog.mjs sin confirmar: sobrescribe esta revisión.
 */
export const RECIPE_CATALOG: Recipe[] = [
  {
    "id": "pollo-patatas-combo",
    "name": "Pollo a la sartén con patatas air fryer",
    "timeMinutes": 30,
    "difficulty": "avanzada",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo",
      "especial"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pollo",
        "quantity": "180 g",
        "amountPerServing": 180,
        "unit": "g"
      },
      {
        "foodId": "patatas",
        "quantity": "2 medianas",
        "amountPerServing": 2,
        "unit": "unidades"
      },
      {
        "foodId": "aceite",
        "quantity": "2 cucharadas",
        "amountPerServing": 2,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 148,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Patatas en Air Fryer.",
      "Coordinar pollo en sartén.",
      "Servir juntos."
    ],
    "methods": [
      {
        "id": "combo",
        "label": "Sartén + Air Fryer",
        "equipmentIds": [
          "sarten",
          "vitro",
          "airfryer"
        ],
        "steps": [
          {
            "id": "prep-potatoes",
            "phaseId": "prep-potatoes",
            "text": {
              "beginner": "Empieza por las patatas (tardan más). Pela {qty:patatas}, córtalas en gajos, sécalas con papel y mézclalas con 1 cucharada de aceite y sal. Extiéndelas en la cesta del Air Fryer sin amontonar.",
              "intermediate": "Prepara los gajos de patata con aceite y sal y colócalos en una sola capa en el Air Fryer.",
              "advanced": "Prepara los gajos de patata con aceite y sal y dispónlos en una sola capa en el Air Fryer."
            }
          },
          {
            "id": "airfry-potatoes",
            "phaseId": "airfry-potatoes",
            "timerSeconds": 1080,
            "timerLabel": "Patatas Air Fryer",
            "temperatureC": 190,
            "similarKey": "patatas_gajo+airfryer+190C",
            "text": {
              "beginner": "Cocina las patatas a 190 °C unos 18 minutos. A mitad de tiempo, abre y agita la cesta. Están listas cuando estén doradas por fuera y tiernas al pinchar.",
              "intermediate": "Cocina las patatas en Air Fryer a 190 °C unos 18 minutos, agitando a mitad, hasta doradas y tiernas.",
              "advanced": "Cocina las patatas en Air Fryer a 190 °C unos 18 minutos, agitando a mitad, hasta doradas y tiernas."
            }
          },
          {
            "id": "cook-chicken",
            "phaseId": "cook-chicken",
            "heatLevel": "medio-alto",
            "termIds": [
              "sellar"
            ],
            "timerSeconds": 600,
            "timerLabel": "Pollo en sartén",
            "text": {
              "beginner": "Cuando queden unos 10 minutos de las patatas, seca el pollo y sálalo. Calienta una sartén con 1 cucharada de aceite a fuego medio-alto. Cocina el pollo 4–5 minutos por cada lado sin moverlo al principio (así se dora; a esto se le llama sellar). Comprueba el centro: no debe quedar rosado; los jugos deben salir claros.",
              "intermediate": "Cuando queden unos 10 minutos de las patatas, cocina el pollo en una sartén a fuego medio-alto, unos 4–5 minutos por cada lado, hasta que esté cocinado por dentro.",
              "advanced": "Empieza el pollo cuando queden unos 10 minutos de las patatas. Cocínalo a fuego medio-alto, 4–5 minutos por lado, hasta el punto seguro."
            }
          },
          {
            "id": "serve",
            "phaseId": "serve",
            "text": {
              "beginner": "Sirve el pollo caliente junto a las patatas recién salidas del Air Fryer; procura que lleguen a la mesa a la vez.",
              "intermediate": "Sirve el pollo con las patatas en cuanto salgan del Air Fryer.",
              "advanced": "Sirve el pollo y las patatas juntos, bien calientes."
            }
          }
        ],
        "temperature": "Air Fryer 190 °C",
        "timeMinutes": 30
      }
    ]
  },
  {
    "id": "pollo-arroz-calabacin",
    "name": "Pollo con arroz y calabacín",
    "timeMinutes": 25,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pollo",
        "quantity": "1 pechuga (~180 g)",
        "amountPerServing": 180,
        "unit": "g"
      },
      {
        "foodId": "arroz",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "calabacin",
        "quantity": "1 pequeño",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 8,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Trocea calabacín y pollo; pon agua a hervir.",
      "Cuece arroz 10-12 min; escurre.",
      "Saltea pollo 6-7 min hasta cocinado.",
      "Saltea calabacín; integra pollo y arroz."
    ],
    "methods": [
      {
        "id": "sarten",
        "label": "Sartén + olla",
        "equipmentIds": [
          "sarten",
          "vitro",
          "olla"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Lava el calabacín y córtalo en cubitos de 1 cm. Corta el pollo en dados del tamaño de un bocado. Pon a hervir una olla con agua salada para el arroz.",
              "intermediate": "Lava el calabacín y córtalo en cubitos de 1 cm. Corta el pollo en dados del tamaño de un bocado. Pon a hervir una olla con agua salada para el arroz.",
              "advanced": "Lava el calabacín y córtalo en cubitos de 1 cm. Corta el pollo en dados del tamaño de un bocado."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Cuando hierva, echa {qty:arroz} de arroz y cuece 10-12 min removiendo de vez en cuando hasta tierno. Escurre si queda agua.",
              "intermediate": "Cuando hierva, echa {qty:arroz} de arroz y cuece 10-12 min removiendo de vez en cuando hasta tierno. Escurre si queda agua.",
              "advanced": "Cuando hierva, echa {qty:arroz} de arroz y cuece 10-12 min removiendo de vez en cuando hasta tierno. Escurre si queda agua."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz",
            "phaseId": "cook-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-chicken",
            "text": {
              "beginner": "En sartén con aceite a fuego medio-alto, saltea el pollo removiendo 6-7 min hasta que no esté rosado por dentro.",
              "intermediate": "En sartén con aceite a fuego medio-alto, saltea el pollo removiendo 6-7 min hasta que no esté rosado por dentro.",
              "advanced": "Saltea el pollo a fuego medio-alto 6-7 min hasta que no esté rosado por dentro."
            },
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 420,
            "timerLabel": "Pollo",
            "phaseId": "cook-chicken",
            "heatLevel": "medio-alto"
          },
          {
            "id": "finish",
            "text": {
              "beginner": "Retira el pollo. En la misma sartén, saltea el calabacín 4-5 min. Vuelve el pollo y el arroz, mezcla 1 min y sirve.",
              "intermediate": "Retira el pollo. En la misma sartén, saltea el calabacín 4-5 min. Vuelve el pollo y el arroz, mezcla 1 min y sirve.",
              "advanced": "Retira el pollo. En la misma sartén, saltea el calabacín 4-5 min."
            },
            "termIds": [
              "saltear"
            ],
            "phaseId": "finish",
            "heatLevel": "medio"
          }
        ]
      }
    ]
  },
  {
    "id": "calabacin-plancha",
    "name": "Calabacín a la plancha / sartén",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "guarnicion",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
    "mealTypes": [
      "comida",
      "cena",
      "merienda"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "calabacin",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 92,
    "steps": [
      "Rodajas 1 cm; aceite y sal.",
      "Plancha 3-4 min por lado."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Lava el calabacín y córtalo en rodajas de 1 cm. Sécalo. Aceite y sal a mano.",
              "intermediate": "Lava el calabacín y córtalo en rodajas de 1 cm. Sécalo. Aceite y sal a mano.",
              "advanced": "Lava el calabacín y córtalo en rodajas de 1 cm. Sécalo."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "heatLevel": "medio-alto",
            "timerSeconds": 420,
            "timerLabel": "Calabacín",
            "text": {
              "beginner": "Calienta plancha o sartén con aceite a fuego medio-alto. Cocina 3–4 min por lado hasta marcas doradas y tierno al pincho. Sala y sirve.",
              "intermediate": "Calienta plancha o sartén con aceite a fuego medio-alto. Cocina 3–4 min por lado hasta marcas doradas y tierno al pincho. Sala y sirve.",
              "advanced": "Cocina 3–4 min por lado hasta marcas doradas y tierno al pincho. Sala y sirve."
            }
          }
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Lava el calabacín y córtalo en rodajas de 1 cm. Sécalo. Aceite y sal a mano.",
              "intermediate": "Lava el calabacín y córtalo en rodajas de 1 cm. Sécalo. Aceite y sal a mano.",
              "advanced": "Lava el calabacín y córtalo en rodajas de 1 cm. Sécalo."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "heatLevel": "medio-alto",
            "timerSeconds": 420,
            "timerLabel": "Calabacín",
            "text": {
              "beginner": "Calienta plancha o sartén con aceite a fuego medio-alto. Cocina 3–4 min por lado hasta marcas doradas y tierno al pincho. Sala y sirve.",
              "intermediate": "Calienta plancha o sartén con aceite a fuego medio-alto. Cocina 3–4 min por lado hasta marcas doradas y tierno al pincho. Sala y sirve.",
              "advanced": "Cocina 3–4 min por lado hasta marcas doradas y tierno al pincho. Sala y sirve."
            }
          }
        ]
      },
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "timeMinutes": 12,
        "temperature": "180 °C",
        "temperatureC": 180,
        "steps": [
          {
            "id": "prep",
            "phaseId": "prep",
            "temperatureC": 180,
            "text": {
              "beginner": "Corta rodajas de 1 cm. Mézclalas con aceite y sal. Precalienta Air Fryer a 180 °C. Capa única en la cestilla.",
              "intermediate": "Corta rodajas de 1 cm. Mézclalas con aceite y sal. Precalienta Air Fryer a 180 °C. Capa única en la cestilla.",
              "advanced": "Distribuye calabacin en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "temperatureC": 180,
            "timerSeconds": 720,
            "timerLabel": "Air Fryer",
            "text": {
              "beginner": "Cocina 10–12 min a 180 °C; agita a mitad. Debe quedar dorado en bordes y tierno. Sirve.",
              "intermediate": "10–12 min a 180 °C con agitado; dorado y tierno.",
              "advanced": "10–12 min @ 180 °C; agitar; al punto."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tortilla-patata",
    "name": "Tortilla de patata sencilla",
    "timeMinutes": 30,
    "difficulty": "avanzada",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo",
      "comfort"
    ],
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "3 unidades",
        "amountPerServing": 3,
        "unit": "unidades"
      },
      {
        "foodId": "patatas",
        "quantity": "2 medianas",
        "amountPerServing": 2,
        "unit": "unidades"
      },
      {
        "foodId": "aceite",
        "quantity": "3 cucharadas",
        "amountPerServing": 3,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      },
      {
        "foodId": "cebolla",
        "quantity": "1/2 (opcional)",
        "amountPerServing": 0.5,
        "unit": "unidad",
        "optional": true
      }
    ],
    "baseServings": 1,
    "imageHue": 235,
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Patata en rodajas finas; cebolla en juliana opcional.",
      "Pochar patata 10–12 min a fuego medio-bajo.",
      "Mezclar con huevo batido; reposar 1 min.",
      "Cuajar, girar y terminar."
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
          {
            "id": "prep-potato-b",
            "phaseId": "prep-potato",
            "levels": [
              "beginner"
            ],
            "termIds": [
              "juliana"
            ],
            "text": {
              "beginner": "Pela {qty:patatas}. Córtalas en rodajas finas de unos 2–3 mm (como fichas de póker finas). Si usas cebolla: córtala por la mitad, apoya la parte plana en la tabla y haz tiras finas de 2–3 mm. Ese corte se llama juliana.",
              "intermediate": "",
              "advanced": ""
            }
          },
          {
            "id": "prep-potato",
            "phaseId": "prep-potato",
            "levels": [
              "intermediate",
              "advanced"
            ],
            "termIds": [
              "juliana"
            ],
            "text": {
              "beginner": "",
              "intermediate": "Pela y corta la patata en rodajas finas (2–3 mm). Si usas cebolla, córtala en juliana fina.",
              "advanced": "Corta la patata en rodajas finas (2–3 mm) y la cebolla en juliana, si la usas."
            }
          },
          {
            "id": "fry-potato",
            "phaseId": "cook-potato",
            "termIds": [
              "pochar",
              "confitar"
            ],
            "heatLevel": "medio-bajo",
            "timerSeconds": 660,
            "timerLabel": "Patatas",
            "text": {
              "beginner": "Usa una sartén amplia. Añade unas 3 cucharadas de aceite y caliéntalo a fuego medio-bajo. Incorpora patata (y cebolla). Remueve cada 2–3 min. Cocina 10–12 min hasta que la patata se deje pinchar fácilmente con un tenedor y esté blanda, no crujiente. Escurre el exceso de aceite dejando solo un velo.",
              "intermediate": "Pocha/confita la patata en aceite a fuego medio-bajo 10–12 minutos hasta que quede tierna; escurre el exceso de aceite.",
              "advanced": "Pocha la patata 10–12 minutos a fuego medio-bajo hasta tierna y escurre el aceite sobrante."
            }
          },
          {
            "id": "mix-egg",
            "phaseId": "mix-eggs",
            "termIds": [
              "reposar"
            ],
            "text": {
              "beginner": "En un bol, bate {qty:huevos} con una pizca de sal. Añade las patatas calientes (y cebolla). Remueve con cuidado y deja reposar 1 minuto para que el huevo se impregne.",
              "intermediate": "Bate los huevos con sal, mézclalos con las patatas calientes y deja reposar 1 minuto.",
              "advanced": "Bate el huevo con sal, integra la patata y reposa 1 minuto."
            }
          },
          {
            "id": "set-tortilla",
            "phaseId": "set-tortilla",
            "heatLevel": "medio-bajo",
            "text": {
              "beginner": "Limpia o usa sartén antiadherente con un hilo de aceite a fuego medio-bajo. Vierte la mezcla. Cuaja 4–5 min hasta que los bordes estén firmes y se despegue. Coloca un plato encima, dale la vuelta de un golpe y cocina 3–4 min más. El centro puede quedar jugoso o más cuajado, como prefieras. Sirve en trozos.",
              "intermediate": "Cuaja la tortilla 4–5 minutos a fuego medio-bajo, gírala con un plato y termina 3–4 minutos más. Sirve.",
              "advanced": "Cuaja 4–5 minutos a fuego medio-bajo, gira y termina 3–4 minutos; sirve."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "arroz-atun",
    "name": "Arroz con atún",
    "timeMinutes": 20,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido",
      "completo"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "arroz",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "atun",
        "quantity": "1 lata escurrida",
        "amountPerServing": 1,
        "unit": "lata"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 293,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Olla: arroz {qty:arroz}, agua ~2:1, sal. Abre la lata de atún y escúrrela en un colador; reserva (no la mezcles hasta que el arroz esté cocido).",
      "Hierve, tapa, 12 min a fuego bajo; reposa 3 min.",
      "Incorpora atún escurrido y aceite fuera del fuego.",
      "Prueba sal y sirve al momento en un plato hondo. Si queda seco, un poco más de aceite."
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
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal. Abre la lata de atún y escúrrela en un colador; reserva (no la mezcles hasta que el arroz esté cocido).",
              "intermediate": "Pon {qty:arroz} de arroz en una olla con aproximadamente el doble de agua y una pizca de sal. Escurre el atún y resérvalo hasta que el arroz esté cocido.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "mix-tuna",
            "text": {
              "beginner": "Con la olla apagada y el arroz ya suelto, añade el atún escurrido y un chorrito de aceite. Mezcla con cuidado con tenedor; el atún debe calentarse solo con el calor residual, sin volver a cocinar.",
              "intermediate": "Incorpora el atún escurrido y un poco de aceite fuera del fuego.",
              "advanced": "Con la olla apagada, añade el atún escurrido y un chorrito de aceite al arroz."
            },
            "phaseId": "mix-tuna",
            "heatLevel": "medio"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Prueba sal y sirve al momento en un plato hondo. Si queda seco, un poco más de aceite.",
              "intermediate": "Prueba sal y sirve al momento en un plato hondo. Si queda seco, un poco más de aceite.",
              "advanced": "Prueba sal y sirve al momento en un plato hondo."
            },
            "phaseId": "serve"
          }
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén / cazo",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una sartén honda o cazo amplio vierte 160 ml de agua fría, el arroz y una pizca de sal. Abre la lata de atún y escúrrela en un colador; reserva (no la mezcles hasta que el arroz esté cocido).",
              "intermediate": "Pon {qty:arroz} de arroz en una sartén honda o cazo con aproximadamente el doble de agua y una pizca de sal. Escurre el atún y resérvalo hasta que el arroz esté cocido.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una sartén honda o cazo amplio vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "mix-tuna",
            "text": {
              "beginner": "Con el fuego apagado y el arroz ya suelto, añade el atún escurrido y un chorrito de aceite. Mezcla con cuidado con tenedor; el atún debe calentarse solo con el calor residual, sin volver a cocinar.",
              "intermediate": "Incorpora el atún escurrido y un poco de aceite fuera del fuego.",
              "advanced": "Con el fuego apagado, añade el atún escurrido y un chorrito de aceite al arroz."
            },
            "phaseId": "mix-tuna",
            "heatLevel": "medio"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Prueba sal y sirve al momento en un plato hondo. Si queda seco, un poco más de aceite.",
              "intermediate": "Prueba sal y sirve al momento en un plato hondo. Si queda seco, un poco más de aceite.",
              "advanced": "Prueba sal y sirve al momento en un plato hondo."
            },
            "phaseId": "serve"
          }
        ]
      }
    ]
  },
  {
    "id": "huevos-fritos-pan",
    "name": "Huevos fritos con pan",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido"
    ],
    "mealTypes": [
      "desayuno",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "pan",
        "quantity": "2 rebanadas",
        "amountPerServing": 2,
        "unit": "rebanada"
      },
      {
        "foodId": "aceite",
        "quantity": "2 cucharadas",
        "amountPerServing": 2,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 238,
    "steps": [
      "Tuesta el pan hasta dorado uniforme y crujiente.",
      "Fríe huevos 2-3 min.",
      "Sirve un huevo sobre cada rebanada."
    ],
    "methods": [
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro",
          "tostadora"
        ],
        "steps": [
          {
            "id": "toast",
            "text": {
              "beginner": "Tuesta el pan en tostadora o sartén seca hasta crujiente.",
              "intermediate": "Tuesta el pan hasta dorado uniforme y crujiente.",
              "advanced": "Tuesta el pan en tostadora o sartén seca hasta crujiente."
            },
            "phaseId": "toast",
            "heatLevel": "medio"
          },
          {
            "id": "fry-egg",
            "text": {
              "beginner": "Aceite en sartén a fuego medio: casca los huevos y fríe 2-3 min hasta clara cuajada y yema blanda. Salpica sal.",
              "intermediate": "Fríe los huevos en aceite a fuego medio 2–3 minutos hasta clara cuajada y yema blanda; sala.",
              "advanced": "Fríe los huevos 2–3 minutos a fuego medio hasta clara cuajada; sala."
            },
            "timerSeconds": 180,
            "timerLabel": "Huevos",
            "phaseId": "fry-egg",
            "heatLevel": "medio"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve un huevo sobre cada rebanada.",
              "intermediate": "Sirve un huevo sobre cada rebanada.",
              "advanced": "Sirve un huevo sobre cada rebanada."
            },
            "phaseId": "serve"
          }
        ]
      }
    ]
  },
  {
    "id": "tortilla-francesa",
    "name": "Tortilla francesa",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido"
    ],
    "mealTypes": [
      "desayuno",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 345,
    "steps": [
      "Bate huevos con sal en un bol hasta homogéneo.",
      "Tortilla francesa 2 min."
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
          {
            "id": "beat",
            "text": {
              "beginner": "Bate huevos con sal en un bol hasta homogéneo.",
              "intermediate": "Bate huevos con sal en un bol hasta homogéneo.",
              "advanced": "Bate huevos con sal en un bol hasta homogéneo."
            },
            "phaseId": "beat"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Sartén antiadherente con aceite a fuego medio-bajo: vierte huevo, empuja bordes y inclina. Cuaja 2 min, pliega en tercios y sirve.",
              "intermediate": "Sartén antiadherente con aceite a fuego medio-bajo: vierte huevo, empuja bordes y inclina. Cuaja 2 min, pliega en tercios y sirve.",
              "advanced": "Sartén antiadherente con aceite a fuego medio-bajo: vierte huevo, empuja bordes y inclina. Cuaja 2 min, pliega en tercios y sirve."
            },
            "timerSeconds": 120,
            "timerLabel": "Tortilla",
            "phaseId": "cook",
            "heatLevel": "medio-bajo"
          }
        ]
      }
    ]
  },
  {
    "id": "huevos-revueltos-jamon",
    "name": "Huevos revueltos con jamón",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "jamon",
        "quantity": "2 lonchas",
        "amountPerServing": 2,
        "unit": "loncha"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 100,
    "steps": [
      "Trocea el jamón. Bate los huevos con sal.",
      "Revuelve a fuego bajo 2-3 min."
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
          {
            "id": "prep",
            "text": {
              "beginner": "Trocea el jamón. Bate los huevos con sal.",
              "intermediate": "Trocea el jamón. Bate los huevos con sal.",
              "advanced": "Trocea el jamón. Bate los huevos con sal."
            },
            "phaseId": "prep"
          },
          {
            "id": "scramble",
            "text": {
              "beginner": "Sartén con aceite a fuego bajo: añade jamón 30 s, vierte huevo y remueve suave 2-3 min hasta cuajado cremoso.",
              "intermediate": "Sartén con aceite a fuego bajo: añade jamón 30 s, vierte huevo y remueve suave 2-3 min hasta cuajado cremoso.",
              "advanced": "Sartén con aceite a fuego bajo: añade jamón 30 s, vierte huevo y remueve suave 2-3 min hasta cuajado cremoso."
            },
            "timerSeconds": 180,
            "timerLabel": "Revuelto",
            "phaseId": "scramble",
            "heatLevel": "bajo"
          }
        ]
      }
    ]
  },
  {
    "id": "omelette-queso",
    "name": "Omelette de queso",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "queso",
        "quantity": "40 g",
        "amountPerServing": 40,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 85,
    "steps": [
      "Ralla o trocea el queso. Bate huevos con sal.",
      "Omelette con queso 2 min."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Ralla o trocea el queso. Bate los huevos con una pizca de sal en un bol.",
              "intermediate": "Ralla o trocea el queso. Bate los huevos con una pizca de sal en un bol.",
              "advanced": "Ralla o trocea el queso. Bate los huevos con una pizca de sal en un bol."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "heatLevel": "medio",
            "timerSeconds": 180,
            "timerLabel": "Omelette",
            "text": {
              "beginner": "Sartén antiadherente con un hilo de aceite a fuego medio. Vierte el huevo. Cuando empiece a cuajar, reparte el queso. Dobla y cocina 1 min más hasta queso fundido. Sirve.",
              "intermediate": "Omelette a fuego medio; queso al cuajar; doblar 1 min.",
              "advanced": "Sartén antiadherente con un hilo de aceite a fuego medio. Vierte el huevo."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "omelette-espinacas",
    "name": "Omelette de espinacas",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
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
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "espinacas",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 299,
    "steps": [
      "Saltea espinacas 1-2 min.",
      "Omelette espinacas 3 min."
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
          {
            "id": "wilt",
            "text": {
              "beginner": "Saltea espinacas en sartén con un poco de aceite 1-2 min hasta que mengüen. Escurre líquido.",
              "intermediate": "Saltea espinacas en sartén con un poco de aceite 1-2 min hasta que mengüen. Escurre líquido.",
              "advanced": "Saltea espinacas en sartén con un poco de aceite 1-2 min hasta que mengüen. Escurre líquido."
            },
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 120,
            "timerLabel": "Espinacas",
            "phaseId": "wilt",
            "heatLevel": "medio"
          },
          {
            "id": "omelette",
            "text": {
              "beginner": "Bate huevos, vierte sobre espinacas a fuego medio-bajo, pliega cuando cuaje 3 min.",
              "intermediate": "Bate huevos, vierte sobre espinacas a fuego medio-bajo, pliega cuando cuaje 3 min.",
              "advanced": "Bate huevos, vierte sobre espinacas a fuego medio-bajo, pliega cuando cuaje 3 min."
            },
            "timerSeconds": 180,
            "timerLabel": "Omelette",
            "phaseId": "omelette",
            "heatLevel": "medio-bajo"
          }
        ]
      }
    ]
  },
  {
    "id": "huevo-micro",
    "name": "Huevo al microondas",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      }
    ],
    "baseServings": 1,
    "imageHue": 24,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Rompe el huevo en un bol apto micro, pincha yema 2 veces, tapa parcialmente. Potencia media 45-60 s; reposa 30 s."
    ],
    "methods": [
      {
        "id": "micro",
        "label": "Microondas",
        "equipmentIds": [
          "microondas"
        ],
        "steps": [
          {
            "id": "cook",
            "text": {
              "beginner": "Rompe el huevo en un bol apto micro, pincha yema 2 veces, tapa parcialmente. Potencia media 45-60 s; reposa 30 s. Clara cuajada.",
              "intermediate": "Rompe el huevo en un bol apto micro, pincha yema 2 veces, tapa parcialmente. Potencia media 45-60 s; reposa 30 s.",
              "advanced": "Coloca huevos en un recipiente apto para microondas, sazónalo y cúbrelo parcialmente. Cocina a potencia media hasta el punto y deja reposar un minuto."
            },
            "timerSeconds": 60,
            "timerLabel": "Huevo micro",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook"
          }
        ]
      }
    ]
  },
  {
    "id": "avena-leche-micro",
    "name": "Avena con leche",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "40 g",
        "amountPerServing": 40,
        "unit": "g"
      },
      {
        "foodId": "leche",
        "quantity": "200 ml",
        "amountPerServing": 200,
        "unit": "ml"
      }
    ],
    "baseServings": 1,
    "imageHue": 164,
    "steps": [
      "Micro 2+1 min removiendo."
    ],
    "methods": [
      {
        "id": "micro",
        "label": "Microondas",
        "equipmentIds": [
          "microondas"
        ],
        "steps": [
          {
            "id": "cook",
            "text": {
              "beginner": "Mezcla avena y leche en bol alto. Microondas media potencia 2 min, remueve, otros 1 min hasta espesar.",
              "intermediate": "Mezcla avena y leche en bol alto. Microondas media potencia 2 min, remueve, otros 1 min hasta espesar.",
              "advanced": "Coloca avena en un recipiente apto para microondas, sazónalo y cúbrelo parcialmente. Cocina a potencia media hasta el punto y deja reposar un minuto."
            },
            "timerSeconds": 180,
            "timerLabel": "Avena",
            "phaseId": "cook"
          }
        ]
      }
    ]
  },
  {
    "id": "avena-leche-fria",
    "name": "Avena con leche fría",
    "timeMinutes": 3,
    "difficulty": "fácil",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido"
    ],
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
        "foodId": "avena",
        "quantity": "40 g",
        "amountPerServing": 40,
        "unit": "g"
      },
      {
        "foodId": "leche",
        "quantity": "150 ml",
        "amountPerServing": 150,
        "unit": "ml"
      }
    ],
    "baseServings": 1,
    "imageHue": 164,
    "steps": [
      "Avena + leche fría; reposar 2 min."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "assemble",
            "text": {
              "beginner": "Mezcla avena y leche fría en un bol; deja 2 min para hidratar y come.",
              "intermediate": "Avena + leche fría; reposar 2 min.",
              "advanced": "Mezcla avena y leche fría en un bol; deja 2 min para hidratar y come."
            },
            "phaseId": "assemble"
          }
        ]
      }
    ]
  },
  {
    "id": "yogur-fresas",
    "name": "Yogur con fresas",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
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
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "fresas",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      }
    ],
    "baseServings": 1,
    "imageHue": 235,
    "steps": [
      "Lava fresas, córtalas en rodajas y mézclalas con el yogur en un bol."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "assemble",
            "text": {
              "beginner": "Lava fresas, córtalas en rodajas y mézclalas con el yogur en un bol.",
              "intermediate": "Lava fresas, córtalas en rodajas y mézclalas con el yogur en un bol.",
              "advanced": "Lava fresas, córtalas en rodajas y mézclalas con el yogur en un bol."
            },
            "phaseId": "assemble"
          }
        ]
      }
    ]
  },
  {
    "id": "manzana-yogur",
    "name": "Manzana con yogur",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
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
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "yogur",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      }
    ],
    "baseServings": 1,
    "imageHue": 333,
    "steps": [
      "Corta la manzana en cubos y sirve con yogur encima o mezclado."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "assemble",
            "text": {
              "beginner": "Corta la manzana en cubos y sirve con yogur encima o mezclado.",
              "intermediate": "Corta la manzana en cubos y sirve con yogur encima o mezclado.",
              "advanced": "Corta la manzana en cubos y sirve con yogur encima o mezclado."
            },
            "phaseId": "assemble"
          }
        ]
      }
    ]
  },
  {
    "id": "yogur-platano-avena",
    "name": "Bowl de yogur, plátano y avena",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "platano",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "avena",
        "quantity": "2 cucharadas",
        "amountPerServing": 2,
        "unit": "cucharada"
      }
    ],
    "baseServings": 1,
    "imageHue": 250,
    "steps": [
      "Corta plátano en rodajas. En un bol: yogur, plátano y espolvorea avena."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "assemble",
            "text": {
              "beginner": "Corta plátano en rodajas. En un bol: yogur, plátano y espolvorea avena.",
              "intermediate": "Corta plátano en rodajas. En un bol: yogur, plátano y espolvorea avena.",
              "advanced": "Corta plátano en rodajas. En un bol: yogur, plátano y espolvorea avena."
            },
            "phaseId": "assemble"
          }
        ]
      }
    ]
  },
  {
    "id": "yogur-miel-estilo",
    "name": "Yogur con plátano",
    "timeMinutes": 3,
    "difficulty": "fácil",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
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
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "platano",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      }
    ],
    "baseServings": 1,
    "imageHue": 145,
    "steps": [
      "Machaca o corta medio plátano y mezcla con yogur."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "assemble",
            "text": {
              "beginner": "Machaca o corta medio plátano y mezcla con yogur.",
              "intermediate": "Machaca o corta medio plátano y mezcla con yogur.",
              "advanced": "Machaca o corta medio plátano y mezcla con yogur."
            },
            "phaseId": "assemble"
          }
        ]
      }
    ]
  },
  {
    "id": "naranja-fresca",
    "name": "Naranja fresca",
    "timeMinutes": 3,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
    "mealTypes": [
      "desayuno",
      "merienda"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "naranja",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      }
    ],
    "baseServings": 1,
    "imageHue": 114,
    "steps": [
      "Pela la naranja en gajos o córtala en rodajas y come."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "assemble",
            "text": {
              "beginner": "Pela la naranja en gajos o córtala en rodajas y come.",
              "intermediate": "Pela la naranja en gajos o córtala en rodajas y come.",
              "advanced": "Pela la naranja en gajos o córtala en rodajas y come."
            },
            "phaseId": "assemble"
          }
        ]
      }
    ]
  },
  {
    "id": "tostada-tomate-queso",
    "name": "Tostada de tomate y queso",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "2 rebanadas",
        "amountPerServing": 2,
        "unit": "rebanada"
      },
      {
        "foodId": "tomate",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "queso",
        "quantity": "2 lonchas",
        "amountPerServing": 2,
        "unit": "loncha"
      }
    ],
    "baseServings": 1,
    "imageHue": 339,
    "steps": [
      "Tuesta el pan hasta dorado uniforme y crujiente.",
      "Tomate y queso sobre pan caliente; gratinar 1 min si quieres queso fundido."
    ],
    "methods": [
      {
        "id": "tostadora",
        "label": "Tostadora",
        "equipmentIds": [
          "tostadora"
        ],
        "steps": [
          {
            "id": "toast",
            "text": {
              "beginner": "Tuesta el pan en tostadora o sartén seca hasta dorado y crujiente por fuera, sin quemar los bordes.",
              "intermediate": "Tuesta el pan hasta dorado uniforme y crujiente.",
              "advanced": "Tuesta el pan en tostadora o sartén seca hasta dorado y crujiente por fuera, sin quemar los bordes."
            },
            "phaseId": "toast"
          },
          {
            "id": "top",
            "text": {
              "beginner": "Ralla o corta tomate fino, colócalo sobre pan caliente y cubre con queso. Opcional: gratinar 1 min en sartén tapada hasta que el queso se derrita.",
              "intermediate": "Ralla o corta tomate fino, colócalo sobre pan caliente y cubre con queso. Opcional: gratinar 1 min en sartén tapada hasta que el queso se derrita.",
              "advanced": "Ralla o corta tomate fino, colócalo sobre pan caliente y cubre con queso."
            },
            "phaseId": "top",
            "timerSeconds": 60,
            "timerLabel": "Gratinar queso"
          }
        ]
      }
    ]
  },
  {
    "id": "tostada-atun",
    "name": "Tostada de atún y tomate",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "2 rebanadas",
        "amountPerServing": 2,
        "unit": "rebanada"
      },
      {
        "foodId": "atun",
        "quantity": "1/2 lata",
        "amountPerServing": 0.5,
        "unit": "lata"
      },
      {
        "foodId": "tomate",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      }
    ],
    "baseServings": 1,
    "imageHue": 247,
    "steps": [
      "Tuesta el pan hasta dorado uniforme y crujiente.",
      "Atún escurrido con tomate sobre pan tostado."
    ],
    "methods": [
      {
        "id": "tostadora",
        "label": "Tostadora",
        "equipmentIds": [
          "tostadora"
        ],
        "steps": [
          {
            "id": "toast",
            "text": {
              "beginner": "Tuesta el pan en tostadora o sartén seca hasta dorado y crujiente por fuera, sin quemar los bordes.",
              "intermediate": "Tuesta el pan hasta dorado uniforme y crujiente.",
              "advanced": "Tuesta el pan en tostadora o sartén seca hasta dorado y crujiente por fuera, sin quemar los bordes."
            },
            "phaseId": "toast"
          },
          {
            "id": "top",
            "text": {
              "beginner": "Escurre el atún, mezcla con tomate troceado y extiende sobre las tostadas calientes.",
              "intermediate": "Atún escurrido con tomate sobre pan tostado.",
              "advanced": "Montar atún y tomate en tostada caliente."
            },
            "phaseId": "top"
          }
        ]
      }
    ]
  },
  {
    "id": "tostada-platano-queso",
    "name": "Tostada de plátano y queso",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "2 rebanadas",
        "amountPerServing": 2,
        "unit": "rebanada"
      },
      {
        "foodId": "platano",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "queso",
        "quantity": "1 loncha",
        "amountPerServing": 1,
        "unit": "loncha"
      }
    ],
    "baseServings": 1,
    "imageHue": 320,
    "steps": [
      "Tuesta el pan hasta dorado uniforme y crujiente.",
      "Plátano y queso sobre tostada caliente."
    ],
    "methods": [
      {
        "id": "tostadora",
        "label": "Tostadora",
        "equipmentIds": [
          "tostadora"
        ],
        "steps": [
          {
            "id": "toast",
            "text": {
              "beginner": "Tuesta el pan en tostadora o sartén seca hasta dorado y crujiente por fuera, sin quemar los bordes.",
              "intermediate": "Tuesta el pan hasta dorado uniforme y crujiente.",
              "advanced": "Tuesta el pan en tostadora o sartén seca hasta dorado y crujiente por fuera, sin quemar los bordes."
            },
            "phaseId": "toast"
          },
          {
            "id": "top",
            "text": {
              "beginner": "Coloca rodajas finas de plátano y queso encima del pan caliente; come templado.",
              "intermediate": "Coloca rodajas finas de plátano y queso encima del pan caliente; come templado.",
              "advanced": "Montar plátano + queso en pan tostado."
            },
            "phaseId": "top"
          }
        ]
      }
    ]
  },
  {
    "id": "tostada-pavo",
    "name": "Tostada de pavo",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "2 rebanadas",
        "amountPerServing": 2,
        "unit": "rebanada"
      },
      {
        "foodId": "pavo",
        "quantity": "2 lonchas",
        "amountPerServing": 2,
        "unit": "loncha"
      }
    ],
    "baseServings": 1,
    "imageHue": 125,
    "steps": [
      "Tuesta el pan hasta dorado uniforme y crujiente.",
      "Coloca lonchas de pavo sobre el pan caliente y sirve al momento."
    ],
    "methods": [
      {
        "id": "tostadora",
        "label": "Tostadora",
        "equipmentIds": [
          "tostadora"
        ],
        "steps": [
          {
            "id": "toast",
            "text": {
              "beginner": "Tuesta el pan en tostadora o sartén seca hasta dorado y crujiente por fuera, sin quemar los bordes.",
              "intermediate": "Tuesta el pan hasta dorado uniforme y crujiente.",
              "advanced": "Tuesta el pan en tostadora o sartén seca hasta dorado y crujiente por fuera, sin quemar los bordes."
            },
            "phaseId": "toast"
          },
          {
            "id": "top",
            "text": {
              "beginner": "Coloca lonchas de pavo sobre el pan caliente y sirve al momento.",
              "intermediate": "Coloca lonchas de pavo sobre el pan caliente y sirve al momento.",
              "advanced": "Coloca lonchas de pavo sobre el pan caliente y sirve al momento."
            },
            "phaseId": "top"
          }
        ]
      }
    ]
  },
  {
    "id": "tostada-jamon",
    "name": "Tostada de jamón",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "2 rebanadas",
        "amountPerServing": 2,
        "unit": "rebanada"
      },
      {
        "foodId": "jamon",
        "quantity": "2 lonchas",
        "amountPerServing": 2,
        "unit": "loncha"
      }
    ],
    "baseServings": 1,
    "imageHue": 10,
    "steps": [
      "Tuesta el pan hasta dorado uniforme y crujiente.",
      "Coloca el jamón sobre el pan caliente y sirve al momento."
    ],
    "methods": [
      {
        "id": "tostadora",
        "label": "Tostadora",
        "equipmentIds": [
          "tostadora"
        ],
        "steps": [
          {
            "id": "toast",
            "text": {
              "beginner": "Tuesta el pan en tostadora o sartén seca hasta dorado y crujiente por fuera, sin quemar los bordes.",
              "intermediate": "Tuesta el pan hasta dorado uniforme y crujiente.",
              "advanced": "Tuesta el pan en tostadora o sartén seca hasta dorado y crujiente por fuera, sin quemar los bordes."
            },
            "phaseId": "toast"
          },
          {
            "id": "top",
            "text": {
              "beginner": "Coloca el jamón sobre el pan caliente y sirve al momento.",
              "intermediate": "Coloca el jamón sobre el pan caliente y sirve al momento.",
              "advanced": "Coloca el jamón sobre el pan caliente y sirve al momento."
            },
            "phaseId": "top"
          }
        ]
      }
    ]
  },
  {
    "id": "tostada-huevo-tomate",
    "name": "Tostada con huevo y tomate",
    "timeMinutes": 10,
    "difficulty": "media",
    "dishRole": "desayuno",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "2 rebanadas",
        "amountPerServing": 2,
        "unit": "rebanada"
      },
      {
        "foodId": "huevos",
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "tomate",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 303,
    "steps": [
      "Tuesta pan; fríe huevos 2-3 min; tomate en rodajas.",
      "Monta tostada con tomate y huevo; sal y servir."
    ],
    "methods": [
      {
        "id": "combo",
        "label": "Tostadora + sartén",
        "equipmentIds": [
          "tostadora",
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "parallel",
            "text": {
              "beginner": "Tuesta el pan. En sartén con aceite a fuego medio fríe los huevos 2-3 min hasta clara cuajada. Corta tomate en rodajas.",
              "intermediate": "Tuesta pan; fríe huevos 2-3 min; tomate en rodajas.",
              "advanced": "Tuesta el pan. En sartén con aceite a fuego medio fríe los huevos 2-3 min hasta clara cuajada."
            },
            "phaseId": "prep",
            "heatLevel": "medio"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Coloca tomate sobre el pan, encima el huevo frito; salpica sal y sirve al momento.",
              "intermediate": "Monta tostada con tomate y huevo; sal y servir.",
              "advanced": "Coloca tomate sobre el pan, encima el huevo frito; salpica sal y sirve al momento."
            },
            "phaseId": "serve"
          }
        ]
      }
    ]
  },
  {
    "id": "bocadillo-pavo",
    "name": "Bocadillo de pavo y queso",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "1 bollo",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "pavo",
        "quantity": "2 lonchas",
        "amountPerServing": 2,
        "unit": "loncha"
      },
      {
        "foodId": "queso",
        "quantity": "1 loncha",
        "amountPerServing": 1,
        "unit": "loncha"
      }
    ],
    "baseServings": 1,
    "imageHue": 160,
    "steps": [
      "Abre el pan, coloca pavo y queso; cierra y corta si quieres."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "assemble",
            "text": {
              "beginner": "Abre el pan, coloca pavo y queso; cierra y corta si quieres.",
              "intermediate": "Abre el pan, coloca pavo y queso; cierra y corta si quieres.",
              "advanced": "Abre el pan, coloca pavo y queso; cierra y corta si quieres."
            },
            "phaseId": "assemble"
          }
        ]
      }
    ]
  },
  {
    "id": "bocadillo-jamon-tomate",
    "name": "Bocadillo de jamón y tomate",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "1 bollo",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "jamon",
        "quantity": "2 lonchas",
        "amountPerServing": 2,
        "unit": "loncha"
      },
      {
        "foodId": "tomate",
        "quantity": "2 rodajas",
        "amountPerServing": 2,
        "unit": "rodaja"
      }
    ],
    "baseServings": 1,
    "imageHue": 230,
    "steps": [
      "Pan, jamón y rodajas de tomate; opcional un hilo de aceite."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "assemble",
            "text": {
              "beginner": "Pan, jamón y rodajas de tomate; opcional un hilo de aceite.",
              "intermediate": "Monta el bocadillo con jamón y tomate sobre el pan.",
              "advanced": "Monta el bocadillo con jamón y tomate."
            },
            "phaseId": "assemble"
          }
        ]
      }
    ]
  },
  {
    "id": "hummus-pan",
    "name": "Hummus con pan",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
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
        "quantity": "3 cucharadas",
        "amountPerServing": 3,
        "unit": "cucharada"
      },
      {
        "foodId": "pan",
        "quantity": "2 rebanadas",
        "amountPerServing": 2,
        "unit": "rebanada"
      }
    ],
    "baseServings": 1,
    "imageHue": 195,
    "steps": [
      "Unta hummus generoso en pan o usa pan para mojar."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "assemble",
            "text": {
              "beginner": "Unta hummus generoso en pan o usa pan para mojar.",
              "intermediate": "Unta hummus generoso en pan o usa pan para mojar.",
              "advanced": "Unta hummus generoso en pan o usa pan para mojar."
            },
            "phaseId": "assemble"
          }
        ]
      }
    ]
  },
  {
    "id": "wrap-pavo-queso",
    "name": "Wrap de pavo y queso",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "pavo",
        "quantity": "2 lonchas",
        "amountPerServing": 2,
        "unit": "loncha"
      },
      {
        "foodId": "queso",
        "quantity": "1 loncha",
        "amountPerServing": 1,
        "unit": "loncha"
      }
    ],
    "baseServings": 1,
    "imageHue": 117,
    "steps": [
      "Calienta la tortilla 15 s en sartén seca. Rellena con pavo y queso, enrolla apretando bordes."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "warm",
            "phaseId": "warm",
            "text": {
              "beginner": "Calienta la tortilla de trigo 15–20 s en sartén seca o micro para que no se rompa al enrollar.",
              "intermediate": "Calienta la tortilla de trigo 15–20 s en sartén seca o micro para que no se rompa al enrollar.",
              "advanced": "Calienta la tortilla de trigo 15–20 s en sartén seca o micro para que no se rompa al enrollar."
            }
          },
          {
            "id": "fill",
            "phaseId": "fill",
            "text": {
              "beginner": "Coloca pavo y queso en el centro. Enrolla apretado, metiendo los laterales si puedes. Corta por la mitad si quieres y sirve.",
              "intermediate": "Coloca pavo y queso en el centro. Enrolla apretado, metiendo los laterales si puedes. Corta por la mitad si quieres y sirve.",
              "advanced": "Coloca pavo y queso en el centro. Enrolla apretado, metiendo los laterales si puedes."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "pan-tomate-aceite",
    "name": "Pan con tomate",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "2 rebanadas",
        "amountPerServing": 2,
        "unit": "rebanada"
      },
      {
        "foodId": "tomate",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 268,
    "steps": [
      "Tuesta pan si quieres, frota tomate y añade aceite y sal."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "assemble",
            "text": {
              "beginner": "Tuesta pan si quieres, frota tomate y añade aceite y sal.",
              "intermediate": "Tuesta pan si quieres, frota tomate y añade aceite y sal.",
              "advanced": "Tuesta pan si quieres, frota tomate y añade aceite y sal."
            },
            "phaseId": "assemble"
          }
        ]
      }
    ]
  },
  {
    "id": "queso-aceitunas",
    "name": "Queso con aceitunas",
    "timeMinutes": 3,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido"
    ],
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
        "quantity": "50 g",
        "amountPerServing": 50,
        "unit": "g"
      },
      {
        "foodId": "aceitunas",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      }
    ],
    "baseServings": 1,
    "imageHue": 209,
    "steps": [
      "Corta queso en cubos y sirve con aceitunas escurridas."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "assemble",
            "text": {
              "beginner": "Corta queso en cubos y sirve con aceitunas escurridas.",
              "intermediate": "Corta queso en cubos y sirve con aceitunas escurridas.",
              "advanced": "Corta queso en cubos y sirve con aceitunas escurridas."
            },
            "phaseId": "assemble"
          }
        ]
      }
    ]
  },
  {
    "id": "rollito-pavo",
    "name": "Rollito de pavo y lechuga",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "dishRole": "entrante",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
    "mealTypes": [
      "merienda",
      "cena"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pavo",
        "quantity": "2 lonchas",
        "amountPerServing": 2,
        "unit": "loncha"
      },
      {
        "foodId": "lechuga",
        "quantity": "2 hojas",
        "amountPerServing": 2,
        "unit": "hoja"
      }
    ],
    "baseServings": 1,
    "imageHue": 176,
    "steps": [
      "Enrolla lonchas de pavo con hojas de lechuga crujiente."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "assemble",
            "text": {
              "beginner": "Enrolla lonchas de pavo con hojas de lechuga crujiente.",
              "intermediate": "Enrolla lonchas de pavo con hojas de lechuga crujiente.",
              "advanced": "Enrolla lonchas de pavo con hojas de lechuga crujiente."
            },
            "phaseId": "assemble"
          }
        ]
      }
    ]
  },
  {
    "id": "jamon-melon-estilo",
    "name": "Jamón con tomate",
    "timeMinutes": 5,
    "difficulty": "fácil",
    "dishRole": "entrante",
    "pepperTags": [
      "rapido"
    ],
    "mealTypes": [
      "merienda"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "jamon",
        "quantity": "2 lonchas",
        "amountPerServing": 2,
        "unit": "loncha"
      },
      {
        "foodId": "tomate",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      }
    ],
    "baseServings": 1,
    "imageHue": 48,
    "steps": [
      "Corta tomate en gajos y enróllalo con jamón."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "assemble",
            "text": {
              "beginner": "Corta tomate en gajos y enróllalo con jamón.",
              "intermediate": "Corta tomate en gajos y enróllalo con jamón.",
              "advanced": "Corta tomate en gajos y enróllalo con jamón."
            },
            "phaseId": "assemble"
          }
        ]
      }
    ]
  },
  {
    "id": "ensalada-atun",
    "name": "Ensalada de atún",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "entrante",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
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
        "foodId": "atun",
        "quantity": "1 lata",
        "amountPerServing": 1,
        "unit": "lata"
      },
      {
        "foodId": "lechuga",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "tomate",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 320,
    "steps": [
      "Escurre atún. Lava lechuga y tomate, trocea y mezcla en bol.",
      "Aceite y sal al final; mezcla y sirve."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Escurre atún. Lava lechuga y tomate, trocea y mezcla en bol.",
              "intermediate": "Escurre atún. Lava lechuga y tomate, trocea y mezcla en bol.",
              "advanced": "Escurre atún. Lava lechuga y tomate, trocea y mezcla en bol."
            },
            "phaseId": "prep"
          },
          {
            "id": "dress",
            "text": {
              "beginner": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande.",
              "intermediate": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande.",
              "advanced": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande."
            },
            "phaseId": "dress"
          }
        ]
      }
    ]
  },
  {
    "id": "ensalada-tomate-pepino",
    "name": "Ensalada de tomate y pepino",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "entrante",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
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
        "foodId": "tomate",
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "pepino",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 56,
    "steps": [
      "Corta tomate en gajos y pepino en medias lunas finas..",
      "Aceite y sal al final; mezcla y sirve."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Corta tomate en gajos y pepino en medias lunas finas.",
              "intermediate": "Corta tomate en gajos y pepino en medias lunas finas..",
              "advanced": "Corta tomate en gajos y pepino en medias lunas finas."
            },
            "phaseId": "prep"
          },
          {
            "id": "dress",
            "text": {
              "beginner": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande.",
              "intermediate": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande.",
              "advanced": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande."
            },
            "phaseId": "dress"
          }
        ]
      }
    ]
  },
  {
    "id": "maiz-atun",
    "name": "Ensalada de maíz y atún",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "entrante",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
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
        "foodId": "maiz",
        "quantity": "1/2 lata",
        "amountPerServing": 0.5,
        "unit": "lata"
      },
      {
        "foodId": "atun",
        "quantity": "1/2 lata",
        "amountPerServing": 0.5,
        "unit": "lata"
      },
      {
        "foodId": "lechuga",
        "quantity": "hojas",
        "amountPerServing": 1,
        "unit": "puñado"
      }
    ],
    "baseServings": 1,
    "imageHue": 348,
    "steps": [
      "Escurre maíz y atún; mezcla con lechuga troceada..",
      "Aceite y sal al final; mezcla y sirve."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Escurre maíz y atún; mezcla con lechuga troceada.",
              "intermediate": "Escurre maíz y atún; mezcla con lechuga troceada..",
              "advanced": "Escurre maíz y atún; mezcla con lechuga troceada."
            },
            "phaseId": "prep"
          },
          {
            "id": "dress",
            "text": {
              "beginner": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande.",
              "intermediate": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande.",
              "advanced": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande."
            },
            "phaseId": "dress"
          }
        ]
      }
    ]
  },
  {
    "id": "ensalada-garbanzos",
    "name": "Ensalada de garbanzos",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "entrante",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
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
        "foodId": "garbanzos",
        "quantity": "1/2 lata",
        "amountPerServing": 0.5,
        "unit": "lata"
      },
      {
        "foodId": "tomate",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 187,
    "steps": [
      "Escurre garbanzos, añade tomate en cubos..",
      "Aceite y sal al final; mezcla y sirve."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Escurre garbanzos, añade tomate en cubos.",
              "intermediate": "Escurre los garbanzos y añade el tomate en cubos.",
              "advanced": "Escurre los garbanzos e incorpora el tomate en cubos."
            },
            "phaseId": "prep"
          },
          {
            "id": "dress",
            "text": {
              "beginner": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande.",
              "intermediate": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande.",
              "advanced": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande."
            },
            "phaseId": "dress"
          }
        ]
      }
    ]
  },
  {
    "id": "ensalada-maiz-tomate",
    "name": "Ensalada de maíz y tomate",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "entrante",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
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
        "foodId": "maiz",
        "quantity": "1/2 lata",
        "amountPerServing": 0.5,
        "unit": "lata"
      },
      {
        "foodId": "tomate",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "lechuga",
        "quantity": "hojas",
        "amountPerServing": 1,
        "unit": "puñado"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      }
    ],
    "baseServings": 1,
    "imageHue": 228,
    "steps": [
      "Mezcla maíz escurrido, tomate y lechuga..",
      "Aceite y sal al final; mezcla y sirve."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Mezcla maíz escurrido, tomate y lechuga.",
              "intermediate": "Mezcla el maíz escurrido con el tomate y la lechuga.",
              "advanced": "Mezcla el maíz, el tomate y la lechuga."
            },
            "phaseId": "prep"
          },
          {
            "id": "dress",
            "text": {
              "beginner": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande.",
              "intermediate": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande.",
              "advanced": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande."
            },
            "phaseId": "dress"
          }
        ]
      }
    ]
  },
  {
    "id": "ensalada-pepino-atun",
    "name": "Ensalada de pepino y atún",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "entrante",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
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
        "foodId": "pepino",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "atun",
        "quantity": "1/2 lata",
        "amountPerServing": 0.5,
        "unit": "lata"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 206,
    "steps": [
      "Pepino en rodajas finas y atún escurrido..",
      "Aceite y sal al final; mezcla y sirve."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Pepino en rodajas finas y atún escurrido.",
              "intermediate": "Pepino en rodajas finas y atún escurrido..",
              "advanced": "Pepino en rodajas finas y atún escurrido."
            },
            "phaseId": "prep"
          },
          {
            "id": "dress",
            "text": {
              "beginner": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande.",
              "intermediate": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande.",
              "advanced": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande."
            },
            "phaseId": "dress"
          }
        ]
      }
    ]
  },
  {
    "id": "ensalada-lechuga-maiz",
    "name": "Ensalada de lechuga y maíz",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "entrante",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
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
        "foodId": "lechuga",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "maiz",
        "quantity": "1/2 lata",
        "amountPerServing": 0.5,
        "unit": "lata"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 277,
    "steps": [
      "Lava y trocea la lechuga; escurre el maíz y mezcla ambos en un bol..",
      "Aceite y sal al final; mezcla y sirve."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Lava y trocea la lechuga; escurre el maíz y mezcla ambos en un bol.",
              "intermediate": "Lava y trocea la lechuga; escurre el maíz y mezcla ambos en un bol..",
              "advanced": "Lava y trocea la lechuga; escurre el maíz y mezcla ambos en un bol."
            },
            "phaseId": "prep"
          },
          {
            "id": "dress",
            "text": {
              "beginner": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande.",
              "intermediate": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande.",
              "advanced": "Aliña con aceite y sal justo antes de comer para que la lechuga no se ablande."
            },
            "phaseId": "dress"
          }
        ]
      }
    ]
  },
  {
    "id": "pasta-atun-tomate",
    "name": "Pasta con atún y tomate",
    "timeMinutes": 15,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido",
      "completo"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pasta",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      },
      {
        "foodId": "atun",
        "quantity": "1 lata",
        "amountPerServing": 1,
        "unit": "lata"
      },
      {
        "foodId": "tomate-frito",
        "quantity": "100 g",
        "amountPerServing": 100,
        "unit": "g"
      }
    ],
    "baseServings": 1,
    "imageHue": 307,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
      "En sartén calienta tomate frito 2 min. Escurre atún y añade sin cocinar mucho.",
      "Mezcla pasta escurrida con la salsa; si está seca, un poco de agua de cocción."
    ],
    "methods": [
      {
        "id": "olla",
        "label": "Olla + sartén",
        "equipmentIds": [
          "olla",
          "vitro",
          "sarten"
        ],
        "steps": [
          {
            "id": "boil-pasta",
            "text": {
              "beginner": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro. Reserva 2 cucharadas del agua de cocción y escurre.",
              "intermediate": "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
              "advanced": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro."
            },
            "phaseId": "boil-pasta",
            "timerSeconds": 660,
            "timerLabel": "Pasta",
            "termIds": [
              "al-dente"
            ],
            "heatLevel": "medio"
          },
          {
            "id": "sauce",
            "text": {
              "beginner": "En sartén calienta tomate frito 2 min. Escurre atún y añade sin cocinar mucho.",
              "intermediate": "En sartén calienta tomate frito 2 min. Escurre atún y añade sin cocinar mucho.",
              "advanced": "Calienta el tomate frito 2 minutos, añade el atún escurrido sin cocinarlo mucho."
            },
            "timerSeconds": 120,
            "timerLabel": "Salsa",
            "phaseId": "sauce",
            "heatLevel": "medio"
          },
          {
            "id": "finish",
            "text": {
              "beginner": "Mezcla pasta escurrida con la salsa; si está seca, un poco de agua de cocción.",
              "intermediate": "Mezcla pasta escurrida con la salsa; si está seca, un poco de agua de cocción.",
              "advanced": "Mezcla pasta escurrida con la salsa; si está seca, un poco de agua de cocción."
            },
            "phaseId": "finish"
          }
        ]
      }
    ]
  },
  {
    "id": "pasta-atun-simple",
    "name": "Pasta con atún",
    "timeMinutes": 12,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pasta",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      },
      {
        "foodId": "atun",
        "quantity": "1 lata",
        "amountPerServing": 1,
        "unit": "lata"
      }
    ],
    "baseServings": 1,
    "imageHue": 277,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
      "Escurre atún, mezcla con pasta caliente, aceite y sal fuera del fuego."
    ],
    "methods": [
      {
        "id": "olla",
        "label": "Olla + sartén",
        "equipmentIds": [
          "olla",
          "vitro"
        ],
        "steps": [
          {
            "id": "boil-pasta",
            "text": {
              "beginner": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro. Reserva 2 cucharadas del agua de cocción y escurre.",
              "intermediate": "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
              "advanced": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro."
            },
            "phaseId": "boil-pasta",
            "timerSeconds": 660,
            "timerLabel": "Pasta",
            "termIds": [
              "al-dente"
            ],
            "heatLevel": "medio"
          },
          {
            "id": "finish",
            "text": {
              "beginner": "Escurre atún, mezcla con pasta caliente, aceite y sal fuera del fuego.",
              "intermediate": "Escurre atún, mezcla con pasta caliente, aceite y sal fuera del fuego.",
              "advanced": "Escurre atún, mezcla con pasta caliente, aceite y sal fuera del fuego."
            },
            "phaseId": "finish",
            "heatLevel": "medio"
          }
        ]
      }
    ]
  },
  {
    "id": "pasta-queso-espinacas",
    "name": "Pasta con queso y espinacas",
    "timeMinutes": 15,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido",
      "comfort"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pasta",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      },
      {
        "foodId": "queso",
        "quantity": "50 g",
        "amountPerServing": 50,
        "unit": "g"
      },
      {
        "foodId": "espinacas",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      }
    ],
    "baseServings": 1,
    "imageHue": 5,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
      "Saltea espinacas 1 min en sartén con aceite hasta menguar.",
      "Mezcla pasta con espinacas y queso rallado; el calor derrite el queso."
    ],
    "methods": [
      {
        "id": "olla",
        "label": "Olla + sartén",
        "equipmentIds": [
          "olla",
          "vitro",
          "sarten"
        ],
        "steps": [
          {
            "id": "boil-pasta",
            "text": {
              "beginner": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro. Reserva 2 cucharadas del agua de cocción y escurre.",
              "intermediate": "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
              "advanced": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro."
            },
            "phaseId": "boil-pasta",
            "timerSeconds": 660,
            "timerLabel": "Pasta",
            "termIds": [
              "al-dente"
            ],
            "heatLevel": "medio"
          },
          {
            "id": "veg",
            "text": {
              "beginner": "Saltea espinacas 1 min en sartén con aceite hasta menguar.",
              "intermediate": "Saltea espinacas 1 min en sartén con aceite hasta menguar.",
              "advanced": "Saltea espinacas 1 min en sartén con aceite hasta menguar."
            },
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 60,
            "timerLabel": "Espinacas",
            "phaseId": "veg",
            "heatLevel": "medio"
          },
          {
            "id": "finish",
            "text": {
              "beginner": "Mezcla pasta con espinacas y queso rallado; el calor derrite el queso.",
              "intermediate": "Mezcla pasta con espinacas y queso rallado; el calor derrite el queso.",
              "advanced": "Mezcla pasta con espinacas y queso rallado; el calor derrite el queso."
            },
            "phaseId": "finish"
          }
        ]
      }
    ]
  },
  {
    "id": "pasta-ajo-aceite",
    "name": "Pasta con ajo y aceite",
    "timeMinutes": 15,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pasta",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      },
      {
        "foodId": "ajo",
        "quantity": "2 dientes",
        "amountPerServing": 2,
        "unit": "diente"
      }
    ],
    "baseServings": 1,
    "imageHue": 180,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
      "Sofríe ajo laminado en aceite frío a fuego muy bajo 2 min, dorado claro sin quemar.",
      "Pasta escurrida a la sartén del ajo; ligar con agua de cocción si está seca; servir."
    ],
    "methods": [
      {
        "id": "olla",
        "label": "Olla + sartén",
        "equipmentIds": [
          "olla",
          "vitro",
          "sarten"
        ],
        "steps": [
          {
            "id": "boil-pasta",
            "text": {
              "beginner": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro. Reserva 2 cucharadas del agua de cocción y escurre.",
              "intermediate": "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
              "advanced": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro."
            },
            "phaseId": "boil-pasta",
            "timerSeconds": 660,
            "timerLabel": "Pasta",
            "termIds": [
              "al-dente"
            ],
            "heatLevel": "medio"
          },
          {
            "id": "garlic-oil",
            "text": {
              "beginner": "En sartén, aceite frío con ajo laminado a fuego muy bajo 2 min removiendo hasta dorado claro, sin quemar.",
              "intermediate": "Sofríe ajo laminado en aceite frío a fuego muy bajo 2 min, dorado claro sin quemar.",
              "advanced": "Sofríe el ajo en aceite a fuego medio sin quemarlo y mezcla con la pasta."
            },
            "phaseId": "garlic-oil",
            "termIds": [
              "sofreir"
            ],
            "timerSeconds": 120,
            "timerLabel": "Ajo",
            "heatLevel": "bajo"
          },
          {
            "id": "finish",
            "text": {
              "beginner": "Vierte pasta escurrida en la sartén del ajo, mezcla con un chorrito de agua de cocción si hace falta y sirve.",
              "intermediate": "Vierte pasta escurrida en la sartén del ajo, mezcla con un chorrito de agua de cocción si hace falta y sirve.",
              "advanced": "Integrar pasta con ajo y aceite; hidratar con agua de cocción si hace falta; servir."
            },
            "phaseId": "finish",
            "heatLevel": "medio"
          }
        ]
      }
    ]
  },
  {
    "id": "pasta-tomate-simple",
    "name": "Pasta con tomate frito",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido",
      "comfort"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pasta",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      },
      {
        "foodId": "tomate-frito",
        "quantity": "150 g",
        "amountPerServing": 150,
        "unit": "g"
      }
    ],
    "baseServings": 1,
    "imageHue": 337,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
      "Tomate frito 3 min.",
      "Integra pasta escurrida con salsa caliente y sirve."
    ],
    "methods": [
      {
        "id": "olla",
        "label": "Olla + sartén",
        "equipmentIds": [
          "olla",
          "vitro",
          "sarten"
        ],
        "steps": [
          {
            "id": "boil-pasta",
            "text": {
              "beginner": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro. Reserva 2 cucharadas del agua de cocción y escurre.",
              "intermediate": "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
              "advanced": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro."
            },
            "phaseId": "boil-pasta",
            "timerSeconds": 660,
            "timerLabel": "Pasta",
            "termIds": [
              "al-dente"
            ],
            "heatLevel": "medio"
          },
          {
            "id": "sauce",
            "text": {
              "beginner": "Calienta tomate frito en sartén 3 min removiendo.",
              "intermediate": "Calienta tomate frito en sartén 3 min removiendo.",
              "advanced": "Calienta tomate frito en sartén 3 min removiendo."
            },
            "timerSeconds": 180,
            "timerLabel": "Tomate",
            "phaseId": "sauce",
            "heatLevel": "medio"
          },
          {
            "id": "finish",
            "text": {
              "beginner": "Mezcla pasta escurrida con la salsa caliente hasta cubrir; sirve al momento.",
              "intermediate": "Integra pasta escurrida con salsa caliente y sirve.",
              "advanced": "Ligar pasta con salsa caliente y servir al momento."
            },
            "phaseId": "finish"
          }
        ]
      }
    ]
  },
  {
    "id": "pasta-brocoli",
    "name": "Pasta con brócoli",
    "timeMinutes": 18,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo",
      "ligero"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pasta",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      },
      {
        "foodId": "brocoli",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      }
    ],
    "baseServings": 1,
    "imageHue": 218,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
      "Cuece brócoli troceado en la misma olla 4 min antes de sacar pasta; o blanquea aparte.",
      "Mezcla pasta y brócoli con aceite y sal."
    ],
    "methods": [
      {
        "id": "olla",
        "label": "Olla + sartén",
        "equipmentIds": [
          "olla",
          "vitro",
          "sarten"
        ],
        "steps": [
          {
            "id": "boil-pasta",
            "text": {
              "beginner": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro. Reserva 2 cucharadas del agua de cocción y escurre.",
              "intermediate": "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
              "advanced": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro."
            },
            "phaseId": "boil-pasta",
            "timerSeconds": 660,
            "timerLabel": "Pasta",
            "termIds": [
              "al-dente"
            ],
            "heatLevel": "medio"
          },
          {
            "id": "broccoli",
            "text": {
              "beginner": "Cuece brócoli troceado en la misma olla 4 min antes de sacar pasta; o blanquea aparte.",
              "intermediate": "Cuece brócoli troceado en la misma olla 4 min antes de sacar pasta; o blanquea aparte.",
              "advanced": "Cuece brócoli troceado en la misma olla 4 min antes de sacar pasta; o blanquea aparte."
            },
            "timerSeconds": 240,
            "timerLabel": "Brócoli",
            "phaseId": "broccoli",
            "heatLevel": "medio"
          },
          {
            "id": "finish",
            "text": {
              "beginner": "Mezcla pasta y brócoli con aceite y sal.",
              "intermediate": "Mezcla pasta y brócoli con aceite y sal.",
              "advanced": "Mezcla pasta y brócoli con aceite y sal."
            },
            "phaseId": "finish"
          }
        ]
      }
    ]
  },
  {
    "id": "pasta-maiz-atun",
    "name": "Pasta con maíz y atún",
    "timeMinutes": 15,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pasta",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      },
      {
        "foodId": "maiz",
        "quantity": "1/2 lata",
        "amountPerServing": 0.5,
        "unit": "lata"
      },
      {
        "foodId": "atun",
        "quantity": "1/2 lata",
        "amountPerServing": 0.5,
        "unit": "lata"
      }
    ],
    "baseServings": 1,
    "imageHue": 270,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
      "Escurre maíz y atún; mezcla con pasta caliente y aceite."
    ],
    "methods": [
      {
        "id": "olla",
        "label": "Olla + sartén",
        "equipmentIds": [
          "olla",
          "vitro"
        ],
        "steps": [
          {
            "id": "boil-pasta",
            "text": {
              "beginner": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro. Reserva 2 cucharadas del agua de cocción y escurre.",
              "intermediate": "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
              "advanced": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro."
            },
            "phaseId": "boil-pasta",
            "timerSeconds": 660,
            "timerLabel": "Pasta",
            "termIds": [
              "al-dente"
            ],
            "heatLevel": "medio"
          },
          {
            "id": "finish",
            "text": {
              "beginner": "Escurre maíz y atún; mezcla con pasta caliente y aceite.",
              "intermediate": "Escurre maíz y atún; mezcla con pasta caliente y aceite.",
              "advanced": "Escurre maíz y atún; mezcla con pasta caliente y aceite."
            },
            "phaseId": "finish"
          }
        ]
      }
    ]
  },
  {
    "id": "pasta-pavo",
    "name": "Pasta con pavo salteado",
    "timeMinutes": 20,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pasta",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      },
      {
        "foodId": "pavo",
        "quantity": "100 g",
        "amountPerServing": 100,
        "unit": "g"
      }
    ],
    "baseServings": 1,
    "imageHue": 0,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
      "Saltea tiras de pavo en sartén 4-5 min hasta cocinado.",
      "Mezcla pasta con pavo y un chorrito de aceite."
    ],
    "methods": [
      {
        "id": "olla",
        "label": "Olla + sartén",
        "equipmentIds": [
          "olla",
          "vitro",
          "sarten"
        ],
        "steps": [
          {
            "id": "boil-pasta",
            "text": {
              "beginner": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro. Reserva 2 cucharadas del agua de cocción y escurre.",
              "intermediate": "Cuece {qty:pasta} de pasta en agua con sal 9-11 min al dente; reserva 2 cucharadas del agua y escurre.",
              "advanced": "En una olla grande con agua hirviendo y sal, cuece {qty:pasta} de pasta 9-11 min. Para al dente, prueba 1 min antes del fin: debe resistir un poco en el centro."
            },
            "phaseId": "boil-pasta",
            "timerSeconds": 660,
            "timerLabel": "Pasta",
            "termIds": [
              "al-dente"
            ],
            "heatLevel": "medio"
          },
          {
            "id": "pavo",
            "text": {
              "beginner": "Calienta la sartén con aceite a fuego medio-alto. Cocina el pavo removiendo hasta que no quede rosado por dentro (abre un trozo; los jugos deben salir claros). Sala y continúa con el siguiente paso o sirve. Remueve con frecuencia (saltear).",
              "intermediate": "Cocina el pavo a fuego medio-alto hasta que esté hecho por dentro; sala, salteando.",
              "advanced": "Cocina el pavo a fuego medio-alto al punto seguro; sala, salteando."
            },
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 300,
            "timerLabel": "Pavo",
            "phaseId": "pavo",
            "heatLevel": "medio"
          },
          {
            "id": "finish",
            "text": {
              "beginner": "Mezcla pasta con pavo y un chorrito de aceite.",
              "intermediate": "Mezcla pasta con pavo y un chorrito de aceite.",
              "advanced": "Mezcla pasta con pavo y un chorrito de aceite."
            },
            "phaseId": "finish"
          }
        ]
      }
    ]
  },
  {
    "id": "arroz-tomate",
    "name": "Arroz con tomate frito",
    "timeMinutes": 20,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "comfort"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "arroz",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "tomate-frito",
        "quantity": "100 g",
        "amountPerServing": 100,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 353,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Olla: arroz {qty:arroz}, agua ~2:1, sal. Ten tomate frito listo.",
      "Hierve, tapa, 12 min a fuego bajo; reposa 3 min.",
      "Tras reposar arroz, incorpora tomate frito calentado en sartén 2 min y mezcla.",
      "Ajusta sal y emplata el arroz caliente."
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
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal. Ten tomate frito listo.",
              "intermediate": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal. Ten tomate frito listo.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "mix",
            "text": {
              "beginner": "Tras reposar arroz, incorpora tomate frito calentado en sartén 2 min y mezcla.",
              "intermediate": "Tras reposar arroz, incorpora tomate frito calentado en sartén 2 min y mezcla.",
              "advanced": "Tras reposar arroz, incorpora tomate frito calentado en sartén 2 min y mezcla."
            },
            "timerSeconds": 120,
            "timerLabel": "Tomate",
            "phaseId": "mix",
            "heatLevel": "medio"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Prueba sal y sirve el arroz caliente en un plato hondo.",
              "intermediate": "Prueba sal y sirve el arroz caliente en un plato hondo.",
              "advanced": "Prueba sal y sirve el arroz caliente en un plato hondo."
            },
            "phaseId": "serve"
          }
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén / cazo",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una sartén honda o cazo amplio vierte 160 ml de agua fría, el arroz y una pizca de sal. Ten tomate frito listo.",
              "intermediate": "Mide {qty:arroz} de arroz en un bol. En una sartén honda o cazo amplio vierte 160 ml de agua fría, el arroz y una pizca de sal. Ten tomate frito listo.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una sartén honda o cazo amplio vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "mix",
            "text": {
              "beginner": "Tras reposar arroz, incorpora tomate frito calentado en sartén 2 min y mezcla.",
              "intermediate": "Tras reposar arroz, incorpora tomate frito calentado en sartén 2 min y mezcla.",
              "advanced": "Tras reposar arroz, incorpora tomate frito calentado en sartén 2 min y mezcla."
            },
            "timerSeconds": 120,
            "timerLabel": "Tomate",
            "phaseId": "mix",
            "heatLevel": "medio"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Prueba sal y sirve el arroz caliente en un plato hondo.",
              "intermediate": "Prueba sal y sirve el arroz caliente en un plato hondo.",
              "advanced": "Prueba sal y sirve el arroz caliente en un plato hondo."
            },
            "phaseId": "serve"
          }
        ]
      }
    ]
  },
  {
    "id": "arroz-garbanzos",
    "name": "Arroz con garbanzos",
    "timeMinutes": 25,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo",
      "comfort"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "arroz",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "garbanzos",
        "quantity": "1/2 lata",
        "amountPerServing": 0.5,
        "unit": "lata"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 70,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Olla: arroz {qty:arroz}, agua ~2:1, sal. Escurre garbanzos.",
      "Hierve, tapa, 12 min a fuego bajo; reposa 3 min.",
      "Mezcla garbanzos escurridos con arroz cocido y aceite.",
      "Sirve el arroz con garbanzos caliente en un plato hondo."
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
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal. Escurre garbanzos.",
              "intermediate": "Olla: arroz {qty:arroz}, agua ~2:1, sal. Escurre garbanzos.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "mix",
            "text": {
              "beginner": "Mezcla garbanzos escurridos con arroz cocido y aceite.",
              "intermediate": "Mezcla garbanzos escurridos con arroz cocido y aceite.",
              "advanced": "Mezcla garbanzos escurridos con arroz cocido y aceite."
            },
            "phaseId": "mix"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve el arroz con garbanzos caliente en un plato hondo.",
              "intermediate": "Sirve el arroz con garbanzos caliente en un plato hondo.",
              "advanced": "Sirve el arroz con garbanzos caliente en un plato hondo."
            },
            "phaseId": "serve"
          }
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén / cazo",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una sartén honda o cazo amplio vierte 160 ml de agua fría, el arroz y una pizca de sal. Escurre garbanzos.",
              "intermediate": "Pon {qty:arroz} de arroz en una sartén honda o cazo con aproximadamente el doble de agua y una pizca de sal. Escurre los garbanzos.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una sartén honda o cazo amplio vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "mix",
            "text": {
              "beginner": "Mezcla garbanzos escurridos con arroz cocido y aceite.",
              "intermediate": "Mezcla garbanzos escurridos con arroz cocido y aceite.",
              "advanced": "Mezcla garbanzos escurridos con arroz cocido y aceite."
            },
            "phaseId": "mix"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve el arroz con garbanzos caliente en un plato hondo.",
              "intermediate": "Sirve el arroz con garbanzos caliente en un plato hondo.",
              "advanced": "Sirve el arroz con garbanzos caliente en un plato hondo."
            },
            "phaseId": "serve"
          }
        ]
      }
    ]
  },
  {
    "id": "arroz-verduras-huevo",
    "name": "Arroz salteado con verduras y huevo",
    "timeMinutes": 20,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "arroz",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "huevos",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "zanahoria",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 245,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Olla: arroz {qty:arroz}, agua ~2:1, sal.",
      "Hierve, tapa, 12 min a fuego bajo; reposa 3 min.",
      "Saltea zanahoria en cubos 4 min; empuja a un lado, casca huevo y revuelve 1 min. Mezcla con arroz."
    ],
    "methods": [
      {
        "id": "combo",
        "label": "Olla + sartén",
        "equipmentIds": [
          "olla",
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal.",
              "intermediate": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "veg-egg",
            "text": {
              "beginner": "Bate los huevos con una pizca de sal. Vierte en la sartén a fuego medio-bajo y remueve (o cuaja sin remover, según el plato) hasta el punto deseado. Sirve al momento. Remueve con frecuencia (saltear).",
              "intermediate": "Cocina los huevos a fuego medio-bajo hasta el punto deseado y sirve, salteando.",
              "advanced": "Cocina los huevos a fuego medio-bajo al punto y sirve, salteando."
            },
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 300,
            "timerLabel": "Salteado",
            "phaseId": "veg-egg",
            "heatLevel": "medio"
          }
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén / cazo",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal.",
              "intermediate": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "veg-egg",
            "text": {
              "beginner": "Bate los huevos con una pizca de sal. Vierte en la sartén a fuego medio-bajo y remueve (o cuaja sin remover, según el plato) hasta el punto deseado. Sirve al momento. Remueve con frecuencia (saltear).",
              "intermediate": "Cocina los huevos a fuego medio-bajo hasta el punto deseado y sirve, salteando.",
              "advanced": "Cocina los huevos a fuego medio-bajo al punto y sirve, salteando."
            },
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 300,
            "timerLabel": "Salteado",
            "phaseId": "veg-egg",
            "heatLevel": "medio"
          }
        ]
      }
    ]
  },
  {
    "id": "arroz-verduras-mixtas",
    "name": "Arroz con verduras mixtas",
    "timeMinutes": 20,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "arroz",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "verduras-mixtas",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 86,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Olla: arroz {qty:arroz}, agua ~2:1, sal. Descongela verduras si hace falta.",
      "Hierve, tapa, 12 min a fuego bajo; reposa 3 min.",
      "Saltea verduras mixtas 5 min, incorpora arroz y mezcla 1 min."
    ],
    "methods": [
      {
        "id": "combo",
        "label": "Olla + sartén",
        "equipmentIds": [
          "olla",
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal. Descongela verduras si hace falta.",
              "intermediate": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal. Descongela verduras si hace falta.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "veg",
            "text": {
              "beginner": "Saltea verduras mixtas 5 min, incorpora arroz y mezcla 1 min.",
              "intermediate": "Saltea verduras mixtas 5 min, incorpora arroz y mezcla 1 min.",
              "advanced": "Saltea verduras mixtas 5 min, incorpora arroz y mezcla 1 min."
            },
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 300,
            "timerLabel": "Verduras",
            "phaseId": "veg",
            "heatLevel": "medio"
          }
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén / cazo",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal. Descongela verduras si hace falta.",
              "intermediate": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal. Descongela verduras si hace falta.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "veg",
            "text": {
              "beginner": "Saltea verduras mixtas 5 min, incorpora arroz y mezcla 1 min.",
              "intermediate": "Saltea verduras mixtas 5 min, incorpora arroz y mezcla 1 min.",
              "advanced": "Saltea verduras mixtas 5 min, incorpora arroz y mezcla 1 min."
            },
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 300,
            "timerLabel": "Verduras",
            "phaseId": "veg",
            "heatLevel": "medio"
          }
        ]
      }
    ]
  },
  {
    "id": "arroz-huevo-simple",
    "name": "Arroz con huevo frito",
    "timeMinutes": 20,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo",
      "comfort"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "arroz",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "huevos",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 199,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Olla: arroz {qty:arroz}, agua ~2:1, sal.",
      "Hierve, tapa, 12 min a fuego bajo; reposa 3 min.",
      "Fríe huevo en sartén 2-3 min. Sirve sobre arroz."
    ],
    "methods": [
      {
        "id": "combo",
        "label": "Olla + sartén",
        "equipmentIds": [
          "olla",
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal.",
              "intermediate": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "egg",
            "text": {
              "beginner": "Bate los huevos con una pizca de sal. Vierte en la sartén a fuego medio-bajo y remueve (o cuaja sin remover, según el plato) hasta el punto deseado. Sirve al momento.",
              "intermediate": "Cocina los huevos a fuego medio-bajo hasta el punto deseado y sirve.",
              "advanced": "Cocina los huevos a fuego medio-bajo al punto y sirve."
            },
            "timerSeconds": 180,
            "timerLabel": "Huevo",
            "phaseId": "egg",
            "heatLevel": "medio"
          }
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén / cazo",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal.",
              "intermediate": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "egg",
            "text": {
              "beginner": "Bate los huevos con una pizca de sal. Vierte en la sartén a fuego medio-bajo y remueve (o cuaja sin remover, según el plato) hasta el punto deseado. Sirve al momento.",
              "intermediate": "Cocina los huevos a fuego medio-bajo hasta el punto deseado y sirve.",
              "advanced": "Cocina los huevos a fuego medio-bajo al punto y sirve."
            },
            "timerSeconds": 180,
            "timerLabel": "Huevo",
            "phaseId": "egg",
            "heatLevel": "medio"
          }
        ]
      }
    ]
  },
  {
    "id": "arroz-pollo-curry-suave",
    "name": "Arroz con pollo suave",
    "timeMinutes": 30,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "especial",
      "completo"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "arroz",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "pollo",
        "quantity": "180 g",
        "amountPerServing": 180,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 106,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Olla: arroz {qty:arroz}, agua ~2:1, sal. Corta pollo en dados.",
      "Hierve, tapa, 12 min a fuego bajo; reposa 3 min.",
      "Saltea pollo en sartén 8 min hasta cocinado. Mezcla con arroz."
    ],
    "methods": [
      {
        "id": "combo",
        "label": "Olla + sartén",
        "equipmentIds": [
          "olla",
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal. Corta pollo en dados.",
              "intermediate": "Olla: arroz {qty:arroz}, agua ~2:1, sal. Corta pollo en dados.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "chicken",
            "text": {
              "beginner": "Calienta la sartén con aceite a fuego medio-alto. Cocina el pollo removiendo hasta que no quede rosado por dentro (abre un trozo; los jugos deben salir claros). Sala y continúa con el siguiente paso o sirve. Remueve con frecuencia (saltear).",
              "intermediate": "Cocina el pollo a fuego medio-alto hasta que esté hecho por dentro; sala, salteando.",
              "advanced": "Cocina el pollo a fuego medio-alto al punto seguro; sala, salteando."
            },
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 480,
            "timerLabel": "Pollo",
            "phaseId": "chicken",
            "heatLevel": "medio"
          }
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén / cazo",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal. Corta pollo en dados.",
              "intermediate": "Pon {qty:arroz} de arroz en una sartén honda o cazo con aproximadamente el doble de agua y una pizca de sal. Corta el pollo en dados.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "chicken",
            "text": {
              "beginner": "Calienta la sartén con aceite a fuego medio-alto. Cocina el pollo removiendo hasta que no quede rosado por dentro (abre un trozo; los jugos deben salir claros). Sala y continúa con el siguiente paso o sirve. Remueve con frecuencia (saltear).",
              "intermediate": "Cocina el pollo a fuego medio-alto hasta que esté hecho por dentro; sala, salteando.",
              "advanced": "Cocina el pollo a fuego medio-alto al punto seguro; sala, salteando."
            },
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 480,
            "timerLabel": "Pollo",
            "phaseId": "chicken",
            "heatLevel": "medio"
          }
        ]
      }
    ]
  },
  {
    "id": "pollo-arroz",
    "name": "Pollo con arroz blanco",
    "timeMinutes": 25,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pollo",
        "quantity": "180 g",
        "amountPerServing": 180,
        "unit": "g"
      },
      {
        "foodId": "arroz",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 223,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Olla: arroz {qty:arroz}, agua ~2:1, sal. Sazona pollo.",
      "Hierve, tapa, 12 min a fuego bajo; reposa 3 min.",
      "Saltea pollo 8 min. Sirve junto a arroz o mezcla."
    ],
    "methods": [
      {
        "id": "combo",
        "label": "Olla + sartén",
        "equipmentIds": [
          "sarten",
          "olla",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal. Sazona pollo.",
              "intermediate": "Olla: arroz {qty:arroz}, agua ~2:1, sal. Sazona pollo.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "chicken",
            "text": {
              "beginner": "Calienta la sartén con aceite a fuego medio-alto. Cocina el pollo removiendo hasta que no quede rosado por dentro (abre un trozo; los jugos deben salir claros). Sala y continúa con el siguiente paso o sirve. Remueve con frecuencia (saltear).",
              "intermediate": "Cocina el pollo a fuego medio-alto hasta que esté hecho por dentro; sala, salteando.",
              "advanced": "Cocina el pollo a fuego medio-alto al punto seguro; sala, salteando."
            },
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 480,
            "timerLabel": "Pollo",
            "phaseId": "chicken",
            "heatLevel": "medio"
          }
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén / cazo",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal. Sazona pollo.",
              "intermediate": "Pon {qty:arroz} de arroz en una sartén honda o cazo con aproximadamente el doble de agua y una pizca de sal. Sazona el pollo.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "chicken",
            "text": {
              "beginner": "Calienta la sartén con aceite a fuego medio-alto. Cocina el pollo removiendo hasta que no quede rosado por dentro (abre un trozo; los jugos deben salir claros). Sala y continúa con el siguiente paso o sirve. Remueve con frecuencia (saltear).",
              "intermediate": "Cocina el pollo a fuego medio-alto hasta que esté hecho por dentro; sala, salteando.",
              "advanced": "Cocina el pollo a fuego medio-alto al punto seguro; sala, salteando."
            },
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 480,
            "timerLabel": "Pollo",
            "phaseId": "chicken",
            "heatLevel": "medio"
          }
        ]
      }
    ]
  },
  {
    "id": "bowl-arroz-salmon",
    "name": "Bowl de arroz y salmón",
    "timeMinutes": 25,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "especial",
      "completo"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "arroz",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "salmon",
        "quantity": "150 g",
        "amountPerServing": 150,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 114,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Olla: arroz {qty:arroz}, agua ~2:1, sal.",
      "Hierve, tapa, 12 min a fuego bajo; reposa 3 min.",
      "Sella salmón 3-4 min por lado a fuego medio-alto hasta opaco y lascas fáciles; centro jugoso.",
      "Arroz en bol con salmón encima; servir."
    ],
    "methods": [
      {
        "id": "combo",
        "label": "Olla + sartén",
        "equipmentIds": [
          "olla",
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal.",
              "intermediate": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una olla mediana vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "salmon",
            "text": {
              "beginner": "Seca el salmón. Sartén con aceite a fuego medio-alto: cocina 3-4 min por lado hasta opaco por fuera y que se separe en lascas; centro aún jugoso.",
              "intermediate": "Seca el salmón y cocínalo en sartén con aceite a fuego medio-alto, 3–4 minutos por lado, hasta opaco y en lascas; deja el centro jugoso.",
              "advanced": "Sella el salmón 3–4 minutos por lado a fuego medio-alto hasta opaco y lascas, dejando el centro jugoso."
            },
            "phaseId": "cook-salmon",
            "termIds": [
              "sellar"
            ],
            "timerSeconds": 420,
            "timerLabel": "Salmón",
            "heatLevel": "medio-alto"
          },
          {
            "id": "bowl",
            "text": {
              "beginner": "Pon arroz en un bol, coloca el salmón encima y sirve al momento.",
              "intermediate": "Pon arroz en un bol, coloca el salmón encima y sirve al momento.",
              "advanced": "Pon arroz en un bol, coloca el salmón encima y sirve al momento."
            },
            "phaseId": "serve"
          }
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén / cazo",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-rice",
            "text": {
              "beginner": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal.",
              "intermediate": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal.",
              "advanced": "Mide {qty:arroz} de arroz en un bol. En una sartén honda vierte 160 ml de agua fría, el arroz y una pizca de sal."
            },
            "phaseId": "prep-rice",
            "heatLevel": "medio"
          },
          {
            "id": "cook-rice",
            "text": {
              "beginner": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar. Apaga y reposa 3 min; luego suelta con tenedor.",
              "intermediate": "Cuando hierva, tapa y cuece 12 minutos a fuego bajo; reposa 3 minutos.",
              "advanced": "Lleva a fuego fuerte hasta que hierva con la tapa al lado. Baja a fuego mínimo, tapa y cuece 12 min sin destapar."
            },
            "timerSeconds": 720,
            "timerLabel": "Arroz a fuego lento",
            "termIds": [
              "reposar"
            ],
            "phaseId": "cook-rice",
            "heatLevel": "bajo"
          },
          {
            "id": "salmon",
            "text": {
              "beginner": "Seca el salmón. Sartén con aceite a fuego medio-alto: cocina 3-4 min por lado hasta opaco por fuera y que se separe en lascas; centro aún jugoso.",
              "intermediate": "Seca el salmón y cocínalo en sartén con aceite a fuego medio-alto, 3–4 minutos por lado, hasta opaco y en lascas; deja el centro jugoso.",
              "advanced": "Sella el salmón 3–4 minutos por lado a fuego medio-alto hasta opaco y lascas, dejando el centro jugoso."
            },
            "phaseId": "cook-salmon",
            "termIds": [
              "sellar"
            ],
            "timerSeconds": 420,
            "timerLabel": "Salmón",
            "heatLevel": "medio-alto"
          },
          {
            "id": "bowl",
            "text": {
              "beginner": "Pon arroz en un bol, coloca el salmón encima y sirve al momento.",
              "intermediate": "Pon arroz en un bol, coloca el salmón encima y sirve al momento.",
              "advanced": "Pon arroz en un bol, coloca el salmón encima y sirve al momento."
            },
            "phaseId": "serve"
          }
        ]
      }
    ]
  },
  {
    "id": "pollo-pimiento",
    "name": "Salteado de pollo y pimiento",
    "timeMinutes": 20,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "mealTypes": [
      "comida",
      "cena"
    ],
    "ingredients": [
      {
        "foodId": "pollo",
        "quantity": "180 g",
        "amountPerServing": 180,
        "unit": "g"
      },
      {
        "foodId": "pimiento",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 54,
    "steps": [
      "Tiras de pollo y pimiento; sazona el pollo.",
      "Saltea pollo 5–6 min a fuego medio-alto.",
      "Pimiento 4–5 min; pollo sin rosa interior; salar."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Corta {qty:pollo} y el pimiento en tiras similares. Seca el pollo. Mezcla el pollo con un chorrito de aceite y sal (sazonar = repartir sal/aceite sobre la carne).",
              "intermediate": "Corta {qty:pollo} y el pimiento en tiras similares. Seca el pollo. Mezcla el pollo con un chorrito de aceite y sal (sazonar = repartir sal/aceite sobre la carne).",
              "advanced": "Corta {qty:pollo} y el pimiento en tiras similares. Seca el pollo."
            }
          },
          {
            "id": "chicken",
            "phaseId": "chicken",
            "text": {
              "beginner": "Calienta la sartén con aceite a fuego medio-alto. Cocina el pollo removiendo hasta que no quede rosado por dentro (abre un trozo; los jugos deben salir claros). Sala y continúa con el siguiente paso o sirve. Remueve con frecuencia (saltear).",
              "intermediate": "Cocina el pollo a fuego medio-alto hasta que esté hecho por dentro; sala, salteando.",
              "advanced": "Cocina el pollo a fuego medio-alto al punto seguro; sala, salteando."
            },
            "heatLevel": "medio-alto",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 330,
            "timerLabel": "Pollo"
          },
          {
            "id": "pepper",
            "phaseId": "pepper",
            "text": {
              "beginner": "Añade pimiento 4–5 min. El pollo debe estar sin rosa dentro (abre un trozo); el pimiento tierno. Prueba sal y sirve.",
              "intermediate": "Añade pimiento 4–5 min. El pollo debe estar sin rosa dentro (abre un trozo); el pimiento tierno. Prueba sal y sirve.",
              "advanced": "Añade pimiento 4–5 min. El pollo debe estar sin rosa dentro (abre un trozo); el pimiento tierno."
            },
            "heatLevel": "medio-alto",
            "timerSeconds": 270,
            "timerLabel": "Pimiento"
          }
        ]
      }
    ]
  },
  {
    "id": "pollo-ajos",
    "name": "Pollo al ajillo sencillo",
    "timeMinutes": 25,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "especial",
      "completo"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "mealTypes": [
      "comida",
      "cena"
    ],
    "ingredients": [
      {
        "foodId": "pollo",
        "quantity": "180 g",
        "amountPerServing": 180,
        "unit": "g"
      },
      {
        "foodId": "ajo",
        "quantity": "3 dientes",
        "amountPerServing": 3,
        "unit": "diente"
      },
      {
        "foodId": "aceite",
        "quantity": "2 cucharadas",
        "amountPerServing": 2,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 274,
    "steps": [
      "Trocear pollo; laminar ajo.",
      "Sofreír ajo; saltear pollo 8–10 min; servir."
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
          {
            "id": "prep-b",
            "phaseId": "prep",
            "levels": [
              "beginner"
            ],
            "text": {
              "beginner": "Corta {qty:pollo} en trozos del tamaño de un bocado. Pela {qty:ajo} y láminalos (rodajas finas). Ten sal y {qty:aceite} listos.",
              "intermediate": "",
              "advanced": ""
            }
          },
          {
            "id": "prep",
            "phaseId": "prep",
            "levels": [
              "intermediate",
              "advanced"
            ],
            "text": {
              "beginner": "",
              "intermediate": "Trocea el pollo en dados y lamina el ajo.",
              "advanced": "Trocea el pollo y lamina el ajo."
            }
          },
          {
            "id": "cook-garlic",
            "phaseId": "cook",
            "levels": [
              "beginner"
            ],
            "heatLevel": "medio",
            "termIds": [
              "sofreir"
            ],
            "text": {
              "beginner": "En una sartén, pon el aceite y el ajo laminado EN FRÍO. Enciende a fuego medio y sofríe 1–2 min removiendo hasta que el ajo esté dorado claro (no negro: si se quema, amarga). Retira el ajo a un plato si se dora muy rápido y sigue con el pollo en el mismo aceite. Esta cocción suave en aceite se llama sofreír.",
              "intermediate": "",
              "advanced": ""
            }
          },
          {
            "id": "cook-chicken",
            "phaseId": "cook",
            "heatLevel": "medio-alto",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 600,
            "timerLabel": "Pollo",
            "text": {
              "beginner": "Sube a fuego medio-alto. Añade el pollo en una sola capa. Cocina 8–10 min removiendo de vez en cuando (saltear: mover a fuego vivo). Está listo cuando el interior ya no está rosado (abre un trozo) y los jugos salen claros. Vuelve a poner el ajo, mezcla 30 s, prueba la sal y sirve caliente con el aceite de la sartén.",
              "intermediate": "Sofríe el ajo sin quemarlo y saltea el pollo 8–10 minutos a fuego medio-alto hasta que esté cocinado por dentro; sala y sirve con el ajo.",
              "advanced": "Sofríe el ajo sin quemarlo, saltea el pollo 8–10 minutos a fuego medio-alto al punto, sala y sirve."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "pollo-limon-sarten",
    "name": "Pollo al limón",
    "timeMinutes": 25,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "especial",
      "completo"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "mealTypes": [
      "comida",
      "cena"
    ],
    "ingredients": [
      {
        "foodId": "pollo",
        "quantity": "180 g",
        "amountPerServing": 180,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 156,
    "steps": [
      "Trocea pollo; calienta aceite en sartén a fuego medio-alto.",
      "Cocina pollo 8 min a fuego medio-alto hasta cocinado por dentro; comprueba corte y jugos claros; sirve."
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
          {
            "id": "prep",
            "text": {
              "beginner": "Seca y trocea el pollo en piezas uniformes. Calienta una sartén con aceite a fuego medio-alto hasta que brille sin humear.",
              "intermediate": "Trocea pollo; calienta aceite en sartén a fuego medio-alto.",
              "advanced": "Seca y trocea el pollo en piezas uniformes."
            },
            "phaseId": "prep",
            "heatLevel": "medio-alto"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Calienta la sartén con aceite a fuego medio-alto. Cocina el pollo removiendo hasta que no quede rosado por dentro (abre un trozo; los jugos deben salir claros). Sala y continúa con el siguiente paso o sirve. Remueve con frecuencia (saltear).",
              "intermediate": "Cocina el pollo a fuego medio-alto hasta que esté hecho por dentro; sala, salteando.",
              "advanced": "Cocina el pollo a fuego medio-alto al punto seguro; sala, salteando."
            },
            "phaseId": "cook",
            "heatLevel": "medio-alto",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 480,
            "timerLabel": "Pollo"
          }
        ]
      }
    ]
  },
  {
    "id": "pollo-plancha-ensalada",
    "name": "Pollo a la plancha con ensalada",
    "timeMinutes": 20,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo",
      "ligero"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pollo",
        "quantity": "180 g",
        "amountPerServing": 180,
        "unit": "g"
      },
      {
        "foodId": "lechuga",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "tomate",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 272,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Prepara lechuga y tomate; reserva.",
      "Seca el pollo y sazona con aceite y sal.",
      "Pollo 5–6 min/lado a fuego medio-alto hasta punto seguro; reposar 2 min.",
      "Aliña ensalada; pollo encima; servir."
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
          {
            "id": "salad",
            "phaseId": "salad",
            "text": {
              "beginner": "Lava lechuga y tomate. Trocea la lechuga y corta el tomate en gajos. Reserva en un bol sin aliñar todavía.",
              "intermediate": "Lava lechuga y tomate. Trocea la lechuga y corta el tomate en gajos. Reserva en un bol sin aliñar todavía.",
              "advanced": "Lava lechuga y tomate. Trocea la lechuga y corta el tomate en gajos."
            }
          },
          {
            "id": "prep-chicken",
            "phaseId": "prep-chicken",
            "text": {
              "beginner": "Calienta la sartén con aceite a fuego medio-alto. Cocina el pollo removiendo hasta que no quede rosado por dentro (abre un trozo; los jugos deben salir claros). Sala y continúa con el siguiente paso o sirve.",
              "intermediate": "Cocina el pollo a fuego medio-alto hasta que esté hecho por dentro; sala.",
              "advanced": "Cocina el pollo a fuego medio-alto al punto seguro; sala."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Calienta plancha o sartén a fuego medio-alto con un hilo de aceite. Cocina el pollo 5–6 min por lado. Está listo sin rosa en el centro y con jugos claros (o ~74 °C). Reposa 2 min, corta en tiras.",
              "intermediate": "Calienta plancha o sartén a fuego medio-alto con un hilo de aceite. Cocina el pollo 5–6 min por lado. Está listo sin rosa en el centro y con jugos claros (o ~74 °C). Reposa 2 min, corta en tiras.",
              "advanced": "Cocina el pollo 5–6 min por lado. Está listo sin rosa en el centro y con jugos claros (o ~74 °C). Reposa 2 min, corta en tiras."
            },
            "heatLevel": "medio-alto",
            "termIds": [
              "reposar"
            ],
            "timerSeconds": 660,
            "timerLabel": "Pollo"
          },
          {
            "id": "serve",
            "phaseId": "serve",
            "text": {
              "beginner": "Aliña la ensalada con un chorrito de aceite y sal. Coloca el pollo encima y sirve.",
              "intermediate": "Aliña la ensalada con un chorrito de aceite y sal. Coloca el pollo encima y sirve.",
              "advanced": "Aliña la ensalada con un chorrito de aceite y sal. Coloca el pollo encima y sirve."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "salmon-verduras",
    "name": "Salmón con verduras",
    "timeMinutes": 20,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "especial",
      "completo"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "salmon",
        "quantity": "150 g",
        "amountPerServing": 150,
        "unit": "g"
      },
      {
        "foodId": "calabacin",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "zanahoria",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 191,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Verduras en cubos; salmón seco y sazonado.",
      "Saltea verduras 6–7 min; aparta.",
      "Salmón 3–4 min/lado a fuego medio-alto hasta lascas; servir con verduras."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Corta calabacín y zanahoria en cubos pequeños. Seca el salmón y sálalo. Aceite listo.",
              "intermediate": "Verduras en cubos; salmón seco y sazonado.",
              "advanced": "Corta calabacín y zanahoria en cubos pequeños. Seca el salmón y sálalo."
            }
          },
          {
            "id": "veg",
            "phaseId": "veg",
            "text": {
              "beginner": "Sartén con aceite a fuego medio: saltea verduras 6–7 min hasta tiernas al pincho. Apártalas a un lado de la sartén.",
              "intermediate": "Sartén con aceite a fuego medio: saltea verduras 6–7 min hasta tiernas al pincho. Apártalas a un lado de la sartén.",
              "advanced": "Sartén con aceite a fuego medio: saltea verduras 6–7 min hasta tiernas al pincho. Apártalas a un lado de la sartén."
            },
            "heatLevel": "medio",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 390,
            "timerLabel": "Verduras"
          },
          {
            "id": "salmon",
            "phaseId": "salmon",
            "text": {
              "beginner": "Sube a fuego medio-alto. En el espacio libre (añade aceite si hace falta) coloca el salmón. Cocina 3–4 min por lado hasta que la carne pase a opaco-rosado y se separe en lascas. Sirve con las verduras.",
              "intermediate": "Salmón 3–4 min/lado a fuego medio-alto hasta lascas; servir con verduras.",
              "advanced": "Sube a fuego medio-alto. En el espacio libre (añade aceite si hace falta) coloca el salmón."
            },
            "heatLevel": "medio-alto",
            "timerSeconds": 420,
            "timerLabel": "Salmón"
          }
        ]
      }
    ]
  },
  {
    "id": "ternera-plancha",
    "name": "Ternera a la plancha",
    "timeMinutes": 15,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "especial"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "mealTypes": [
      "comida",
      "cena"
    ],
    "ingredients": [
      {
        "foodId": "ternera",
        "quantity": "180 g",
        "amountPerServing": 180,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 325,
    "steps": [
      "Atempera y seca la ternera; sala al cocinar.",
      "Plancha muy caliente con aceite, fuego alto.",
      "2–3 min/lado a fuego alto; reposar 2 min antes de cortar."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Saca la ternera del frío 5–10 min. Sécala muy bien con papel (si está húmeda no dora). Sala justo antes de cocinar. Aceite listo.",
              "intermediate": "Saca la ternera del frío 5–10 min. Sécala muy bien con papel (si está húmeda no dora). Sala justo antes de cocinar. Aceite listo.",
              "advanced": "Saca la ternera del frío 5–10 min. Sécala muy bien con papel (si está húmeda no dora)."
            }
          },
          {
            "id": "heat",
            "phaseId": "heat",
            "text": {
              "beginner": "Sube a fuego medio-alto. Añade la ternera en tiras en una sola capa. Cocina 4–5 min removiendo. Está lista cuando se dore por fuera; el centro puede quedar jugoso. Sala y sirve.",
              "intermediate": "A fuego medio-alto, cocina la ternera en tiras 4–5 min hasta el punto deseado; sala y sirve.",
              "advanced": "Saltea la ternera 4–5 min a fuego medio-alto al punto; sala y sirve."
            },
            "heatLevel": "alto"
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Coloca la carne. No la muevas 2–3 min por el primer lado (según grosor). Da la vuelta otros 2–3 min. Para punto jugoso el centro sigue rosado; si la quieres más hecha, 1 min más. Reposa 2 min antes de cortar (reposar = dejar que los jugos se asienten). Sirve.",
              "intermediate": "2–3 min/lado a fuego alto; reposar 2 min antes de cortar.",
              "advanced": "2–3 min/lado al punto; reposar 2 min."
            },
            "heatLevel": "alto",
            "termIds": [
              "reposar"
            ],
            "timerSeconds": 300,
            "timerLabel": "Ternera"
          }
        ]
      }
    ]
  },
  {
    "id": "ternera-cebolla",
    "name": "Ternera encebollada sencilla",
    "timeMinutes": 25,
    "difficulty": "avanzada",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "especial",
      "comfort"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "ternera",
        "quantity": "180 g",
        "amountPerServing": 180,
        "unit": "g"
      },
      {
        "foodId": "cebolla",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 140,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Cortar cebolla en juliana y ternera en tiras.",
      "Pochar cebolla 8 min.",
      "Saltear ternera 4–5 min; integrar y servir."
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
          {
            "id": "prep-b",
            "phaseId": "prep",
            "levels": [
              "beginner"
            ],
            "termIds": [
              "juliana"
            ],
            "text": {
              "beginner": "Pela {qty:cebolla}. Córtala por la mitad, apoya la parte plana en la tabla y haz tiras finas de unos 2–3 mm. Ese corte se llama juliana. Corta {qty:ternera} en tiras del tamaño de un bocado. Ten {qty:aceite} y sal a mano.",
              "intermediate": "",
              "advanced": ""
            }
          },
          {
            "id": "prep",
            "phaseId": "prep",
            "levels": [
              "intermediate",
              "advanced"
            ],
            "termIds": [
              "juliana"
            ],
            "text": {
              "beginner": "",
              "intermediate": "Corta la cebolla en juliana fina y prepara la ternera en tiras de tamaño uniforme para que se cocine de forma homogénea.",
              "advanced": "Corta la cebolla en juliana y la ternera en tiras uniformes. Déjalas preparadas antes de empezar la cocción."
            }
          },
          {
            "id": "onion",
            "phaseId": "onion",
            "heatLevel": "medio",
            "termIds": [
              "sofreir",
              "juliana"
            ],
            "timerSeconds": 480,
            "timerLabel": "Cebolla",
            "text": {
              "beginner": "Usa una sartén amplia. Añade 2 cucharadas de aceite y caliéntalo a fuego medio. Incorpora la cebolla en juliana. Remueve cada minuto. Cocina unos 8 min hasta que esté blanda, translúcida y algo dorada en los bordes (no negra). Si se tuesta demasiado rápido, baja el fuego. Sofreír es cocinar en poco aceite removiendo sin quemar.",
              "intermediate": "Sofríe la cebolla en juliana a fuego medio unos 8 minutos hasta que quede blanda y ligeramente dorada.",
              "advanced": "Sofríe la cebolla en juliana a fuego medio hasta que quede tierna y ligeramente dorada."
            }
          },
          {
            "id": "beef",
            "phaseId": "beef",
            "heatLevel": "medio-alto",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 300,
            "timerLabel": "Ternera",
            "text": {
              "beginner": "Sube a fuego medio-alto. Aparta la cebolla a un lado de la sartén (o retírala un momento). Añade un poco más de aceite si hace falta y coloca la ternera en una sola capa. Cocina 4–5 min removiendo: primero se dora por fuera; abre un trozo — el interior puede quedar rosado-jugoso o más hecho, según prefieras. Mezcla con la cebolla 30 s, prueba la sal y sirve caliente.",
              "intermediate": "Sube a fuego medio-alto y saltea la ternera en tiras 4–5 minutos hasta el punto deseado. Intégrala con la cebolla, sala y sirve.",
              "advanced": "Saltea la ternera 4–5 minutos a fuego medio-alto hasta el punto, intégrala con la cebolla, sala y sirve."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "pavo-plancha",
    "name": "Pavo a la plancha",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "mealTypes": [
      "comida",
      "cena"
    ],
    "ingredients": [
      {
        "foodId": "pavo",
        "quantity": "120 g",
        "amountPerServing": 120,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 40,
    "steps": [
      "Trocea pavo; calienta aceite en sartén a fuego medio-alto.",
      "Cocina pavo 8 min a fuego medio-alto hasta cocinado por dentro; comprueba corte y jugos claros; sirve."
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
          {
            "id": "prep",
            "text": {
              "beginner": "Seca y trocea el pavo en piezas uniformes. Calienta una sartén con aceite a fuego medio-alto hasta que brille sin humear.",
              "intermediate": "Trocea pavo; calienta aceite en sartén a fuego medio-alto.",
              "advanced": "Seca y trocea el pavo en piezas uniformes. Calienta una sartén con aceite a fuego medio-alto hasta que brille sin humear."
            },
            "phaseId": "prep",
            "heatLevel": "medio-alto"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Calienta la sartén con aceite a fuego medio-alto. Cocina el pavo removiendo hasta que no quede rosado por dentro (abre un trozo; los jugos deben salir claros). Sala y continúa con el siguiente paso o sirve. Remueve con frecuencia (saltear).",
              "intermediate": "Cocina el pavo a fuego medio-alto hasta que esté hecho por dentro; sala, salteando.",
              "advanced": "Cocina el pavo a fuego medio-alto al punto seguro; sala, salteando."
            },
            "phaseId": "cook",
            "heatLevel": "medio-alto",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 180,
            "timerLabel": "Pavo"
          }
        ]
      }
    ]
  },
  {
    "id": "pavo-sarten",
    "name": "Pavo salteado con pimiento",
    "timeMinutes": 15,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pavo",
        "quantity": "120 g",
        "amountPerServing": 120,
        "unit": "g"
      },
      {
        "foodId": "pimiento",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 236,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Trocea pavo y pimiento en tiras.",
      "Saltea pavo 4 min a fuego medio-alto hasta opaco por fuera.",
      "Añade pimiento 3–4 min; salar. Pavo opaco por dentro."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Corta {qty:pavo} en tiras o dados similares. Lava el pimiento, quita semillas y córtalo en tiras. Ten {qty:aceite} y sal a mano.",
              "intermediate": "Corta {qty:pavo} en tiras o dados similares. Lava el pimiento, quita semillas y córtalo en tiras.",
              "advanced": "Corta {qty:pavo} en tiras o dados similares. Lava el pimiento, quita semillas y córtalo en tiras."
            }
          },
          {
            "id": "cook-pavo",
            "phaseId": "cook-protein",
            "text": {
              "beginner": "Calienta una sartén con aceite a fuego medio-alto. Añade el pavo en una sola capa. Cocina 4 min removiendo hasta que deje de verse rosa por fuera.",
              "intermediate": "Saltea pavo 4 min a fuego medio-alto hasta opaco por fuera.",
              "advanced": "Añade el pavo en una sola capa. Cocina 4 min removiendo hasta que deje de verse rosa por fuera."
            },
            "heatLevel": "medio-alto",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 240,
            "timerLabel": "Pavo"
          },
          {
            "id": "cook-pepper",
            "phaseId": "cook-veg",
            "text": {
              "beginner": "Añade el pimiento. Cocina 3–4 min más removiendo. El pavo debe estar opaco por dentro (abre un trozo) y el pimiento tierno-crujiente. Sala y sirve.",
              "intermediate": "Añade pimiento 3–4 min; salar. Pavo opaco por dentro.",
              "advanced": "Añade el pimiento. Cocina 3–4 min más removiendo."
            },
            "heatLevel": "medio-alto",
            "timerSeconds": 210,
            "timerLabel": "Pimiento"
          }
        ]
      }
    ]
  },
  {
    "id": "salmon-plancha-simple",
    "name": "Salmón a la plancha",
    "timeMinutes": 15,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "especial",
      "ligero"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "salmon",
        "quantity": "150 g",
        "amountPerServing": 150,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 347,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Secar y salar salmón.",
      "Plancha caliente.",
      "Piel abajo ~4 min; vuelta 2–3 min al punto."
    ],
    "methods": [
      {
        "id": "plancha",
        "label": "Plancha / sartén",
        "equipmentIds": [
          "plancha",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep-b",
            "phaseId": "prep",
            "levels": [
              "beginner"
            ],
            "text": {
              "beginner": "Saca el salmón ({qty:salmon}) de la nevera 5–10 min. Sécalo bien con papel de cocina por ambos lados (si está húmedo no dora). Si tiene piel, déjala: ayuda a que no se rompa. Espolvorea sal por encima (y un poco de pimienta si tienes). Ten {qty:aceite} a mano.",
              "intermediate": "",
              "advanced": ""
            }
          },
          {
            "id": "prep",
            "phaseId": "prep",
            "levels": [
              "intermediate",
              "advanced"
            ],
            "text": {
              "beginner": "",
              "intermediate": "Seca el salmón bien, sazónalo y ten el aceite a mano.",
              "advanced": "Seca y sazona el salmón; deja el aceite listo."
            }
          },
          {
            "id": "heat-pan-b",
            "phaseId": "heat",
            "levels": [
              "beginner"
            ],
            "heatLevel": "medio-alto",
            "text": {
              "beginner": "Usa una sartén o plancha antiadherente (o bien caliente). Pon 1 cucharada de aceite y caliéntala a fuego medio-alto 1–2 min. El aceite debe brillar y chisporrotear suavemente al echar una gota de agua; si humea mucho, baja un poco el fuego.",
              "intermediate": "",
              "advanced": ""
            }
          },
          {
            "id": "heat-pan",
            "phaseId": "heat",
            "levels": [
              "intermediate",
              "advanced"
            ],
            "heatLevel": "medio-alto",
            "text": {
              "beginner": "",
              "intermediate": "Precalienta la sartén o plancha con aceite a fuego medio-alto.",
              "advanced": "Calienta la plancha con aceite a fuego medio-alto."
            }
          },
          {
            "id": "side1",
            "phaseId": "side1",
            "heatLevel": "medio-alto",
            "timerSeconds": 240,
            "timerLabel": "Salmón lado 1",
            "text": {
              "beginner": "Coloca el salmón: si tiene piel, piel abajo primero. No lo muevas los primeros minutos. Cocina unos 4 min (filete de ~2 cm; si es más grueso, 5 min). Debe formarse una costra dorada y despegarse con facilidad.",
              "intermediate": "Cocina el salmón piel abajo unos 4 minutos a fuego medio-alto sin moverlo hasta que dore.",
              "advanced": "Cocina piel abajo unos 4 minutos hasta que dore y se suelte."
            }
          },
          {
            "id": "side2",
            "phaseId": "side2",
            "heatLevel": "medio",
            "timerSeconds": 150,
            "timerLabel": "Salmón lado 2",
            "text": {
              "beginner": "Dale la vuelta con cuidado (espátula ancha). Baja un poco a fuego medio. Cocina 2–3 min más. Está listo cuando la carne pasa de rojo/translúcido a tono rosado-opaco y se abre en escamas al pinchar el centro; el centro puede quedar ligeramente jugoso. Si prefieres más hecho, 1 min extra. Sirve.",
              "intermediate": "Da la vuelta y cocina 2–3 minutos a fuego medio hasta opaco-rosado en el centro; sirve.",
              "advanced": "Da la vuelta 2–3 minutos al punto (opaco, centro jugoso) y sirve."
            }
          }
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
          {
            "id": "prep-b",
            "phaseId": "prep",
            "levels": [
              "beginner"
            ],
            "text": {
              "beginner": "Saca el salmón ({qty:salmon}) de la nevera 5–10 min. Sécalo bien con papel de cocina por ambos lados (si está húmedo no dora). Si tiene piel, déjala: ayuda a que no se rompa. Espolvorea sal por encima (y un poco de pimienta si tienes). Ten {qty:aceite} a mano.",
              "intermediate": "",
              "advanced": ""
            }
          },
          {
            "id": "prep",
            "phaseId": "prep",
            "levels": [
              "intermediate",
              "advanced"
            ],
            "text": {
              "beginner": "",
              "intermediate": "Seca el salmón bien, sazónalo y ten el aceite a mano.",
              "advanced": "Seca y sazona el salmón; deja el aceite listo."
            }
          },
          {
            "id": "heat-pan-b",
            "phaseId": "heat",
            "levels": [
              "beginner"
            ],
            "heatLevel": "medio-alto",
            "text": {
              "beginner": "Usa una sartén o plancha antiadherente (o bien caliente). Pon 1 cucharada de aceite y caliéntala a fuego medio-alto 1–2 min. El aceite debe brillar y chisporrotear suavemente al echar una gota de agua; si humea mucho, baja un poco el fuego.",
              "intermediate": "",
              "advanced": ""
            }
          },
          {
            "id": "heat-pan",
            "phaseId": "heat",
            "levels": [
              "intermediate",
              "advanced"
            ],
            "heatLevel": "medio-alto",
            "text": {
              "beginner": "",
              "intermediate": "Precalienta la sartén o plancha con aceite a fuego medio-alto.",
              "advanced": "Calienta la plancha con aceite a fuego medio-alto."
            }
          },
          {
            "id": "side1",
            "phaseId": "side1",
            "heatLevel": "medio-alto",
            "timerSeconds": 240,
            "timerLabel": "Salmón lado 1",
            "text": {
              "beginner": "Coloca el salmón: si tiene piel, piel abajo primero. No lo muevas los primeros minutos. Cocina unos 4 min (filete de ~2 cm; si es más grueso, 5 min). Debe formarse una costra dorada y despegarse con facilidad.",
              "intermediate": "Cocina el salmón piel abajo unos 4 minutos a fuego medio-alto sin moverlo hasta que dore.",
              "advanced": "Cocina piel abajo unos 4 minutos hasta que dore y se suelte."
            }
          },
          {
            "id": "side2",
            "phaseId": "side2",
            "heatLevel": "medio",
            "timerSeconds": 150,
            "timerLabel": "Salmón lado 2",
            "text": {
              "beginner": "Dale la vuelta con cuidado (espátula ancha). Baja un poco a fuego medio. Cocina 2–3 min más. Está listo cuando la carne pasa de rojo/translúcido a tono rosado-opaco y se abre en escamas al pinchar el centro; el centro puede quedar ligeramente jugoso. Si prefieres más hecho, 1 min extra. Sirve.",
              "intermediate": "Da la vuelta y cocina 2–3 minutos a fuego medio hasta opaco-rosado en el centro; sirve.",
              "advanced": "Da la vuelta 2–3 minutos al punto (opaco, centro jugoso) y sirve."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "salmon-micro",
    "name": "Salmón al microondas",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "salmon",
        "quantity": "150 g",
        "amountPerServing": 150,
        "unit": "g"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 333,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Coloca el salmón en plato apto, sazona y tapa parcialmente.",
      "Cocina a potencia media 2–3 min hasta lascas; reposa 1 min."
    ],
    "methods": [
      {
        "id": "micro",
        "label": "Microondas",
        "equipmentIds": [
          "microondas"
        ],
        "steps": [
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Coloca {qty:salmon} en un plato apto para microondas. Sala. Tapa parcialmente (papel film agujereado o tapa entreabierta) para que no salpique.",
              "intermediate": "Coloca el salmón en un plato apto para microondas, sazónalo y cúbrelo parcialmente para evitar salpicaduras.",
              "advanced": "Coloca el salmón en un recipiente apto para microondas, sazónalo y cúbrelo parcialmente."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "timerSeconds": 150,
            "timerLabel": "Salmón micro",
            "termIds": [
              "reposar"
            ],
            "text": {
              "beginner": "Microondas a potencia media 2 min. Comprueba: si el centro sigue muy traslúcido, 30–60 s más. Está listo cuando se separa en lascas y el centro está opaco-rosado, no crudo rojo. Deja 1 min en reposo y sirve.",
              "intermediate": "Cocina a potencia media 2–3 minutos hasta que se separe en lascas; deja reposar 1 minuto y sirve.",
              "advanced": "Cocina a potencia media 2–3 minutos hasta lascas; reposa 1 minuto y sirve."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "merluza-sarten",
    "name": "Pescado a la sartén",
    "timeMinutes": 15,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo",
      "ligero"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pescado-congelado",
        "quantity": "1 filete",
        "amountPerServing": 1,
        "unit": "filete"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 116,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Descongela si hace falta; seca y sala el filete.",
      "Sartén con aceite a fuego medio-alto.",
      "3–4 min por lado hasta desmenuzar fácil y opaco; servir."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Si el pescado está congelado, descongélalo antes (nevera o agua fría en bolsa). Sécalo con papel. Sala ligeramente por ambos lados. Ten {qty:aceite} listo.",
              "intermediate": "Descongela si hace falta; seca y sala el filete.",
              "advanced": "Seca y sazona el filete; descongela antes si hace falta."
            }
          },
          {
            "id": "heat",
            "phaseId": "heat",
            "text": {
              "beginner": "Calienta una sartén con 1–2 cucharadas de aceite a fuego medio-alto 1 min. El aceite debe brillar sin humear.",
              "intermediate": "Calienta una sartén con 1–2 cucharadas de aceite a fuego medio-alto 1 min. El aceite debe brillar sin humear.",
              "advanced": "Calienta una sartén con 1–2 cucharadas de aceite a fuego medio-alto 1 min. El aceite debe brillar sin humear."
            },
            "heatLevel": "medio-alto"
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Coloca el pescado. Cocina 3–4 min por el primer lado sin mover. Dale la vuelta y cocina 3–4 min más. Está listo cuando se desmenuza fácil con un tenedor y la carne ya no está traslúcida. Sirve.",
              "intermediate": "Cocina 3–4 minutos por cada lado hasta que se desmenuce fácil y quede opaco; sirve.",
              "advanced": "Cocina 3–4 minutos por lado hasta el punto (opaco, se desmenuza) y sirve."
            },
            "heatLevel": "medio-alto",
            "timerSeconds": 420,
            "timerLabel": "Pescado"
          }
        ]
      }
    ]
  },
  {
    "id": "bowl-lechuga-pollo",
    "name": "Bowl de lechuga y pollo",
    "timeMinutes": 20,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "ligero",
      "completo"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "lechuga",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "pollo",
        "quantity": "180 g",
        "amountPerServing": 180,
        "unit": "g"
      },
      {
        "foodId": "tomate",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 305,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Ensalada troceada; pollo en dados sazonado.",
      "Pollo 8–10 min a fuego medio-alto al punto seguro.",
      "Monta bol: ensalada + pollo; aliñar."
    ],
    "methods": [
      {
        "id": "combo",
        "label": "Sartén + bol",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Lava lechuga y tomate; trocea. Corta el pollo en dados. Sazónalo con aceite y sal.",
              "intermediate": "Lava lechuga y tomate; trocea. Corta el pollo en dados. Sazónalo con aceite y sal.",
              "advanced": "Lava lechuga y tomate; trocea. Corta el pollo en dados."
            }
          },
          {
            "id": "chicken",
            "phaseId": "chicken",
            "text": {
              "beginner": "Sartén con aceite a fuego medio-alto: cocina el pollo 8–10 min removiendo hasta sin rosa dentro y jugos claros. Reposa 1 min.",
              "intermediate": "Sartén con aceite a fuego medio-alto: cocina el pollo 8–10 min removiendo hasta sin rosa dentro y jugos claros. Reposa 1 min.",
              "advanced": "Sartén con aceite a fuego medio-alto: cocina el pollo 8–10 min removiendo hasta sin rosa dentro y jugos claros. Reposa 1 min."
            },
            "heatLevel": "medio-alto",
            "timerSeconds": 540,
            "timerLabel": "Pollo",
            "termIds": [
              "reposar"
            ]
          },
          {
            "id": "bowl",
            "phaseId": "bowl",
            "text": {
              "beginner": "En un bol: lechuga, tomate, pollo encima. Aliña con aceite y sal. Sirve.",
              "intermediate": "En un bol: lechuga, tomate, pollo encima. Aliña con aceite y sal. Sirve.",
              "advanced": "En un bol: lechuga, tomate, pollo encima. Aliña con aceite y sal."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "salteado-ternera-verduras",
    "name": "Salteado de ternera y verduras",
    "timeMinutes": 20,
    "difficulty": "avanzada",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "especial",
      "completo"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "ternera",
        "quantity": "180 g",
        "amountPerServing": 180,
        "unit": "g"
      },
      {
        "foodId": "verduras-mixtas",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 134,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Fuego alto: ternera 2 min, verduras 5 min removiendo constante."
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
          {
            "id": "cook",
            "text": {
              "beginner": "Sube a fuego medio-alto. Añade la ternera en tiras en una sola capa. Cocina 4–5 min removiendo. Está lista cuando se dore por fuera; el centro puede quedar jugoso. Sala y sirve.",
              "intermediate": "A fuego medio-alto, cocina la ternera en tiras 4–5 min hasta el punto deseado; sala y sirve.",
              "advanced": "Saltea la ternera 4–5 min a fuego medio-alto al punto; sala y sirve."
            },
            "timerSeconds": 420,
            "timerLabel": "Salteado",
            "phaseId": "cook",
            "heatLevel": "alto"
          }
        ]
      }
    ]
  },
  {
    "id": "hot-dog-simple",
    "name": "Perrito caliente",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "hot-dog",
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "pan",
        "quantity": "1 bollo",
        "amountPerServing": 1,
        "unit": "unidad"
      }
    ],
    "baseServings": 1,
    "imageHue": 275,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Hierve salchichas 5 min; escurre.",
      "Calienta pan; monta el perrito; servir."
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
          {
            "id": "boil",
            "phaseId": "boil",
            "text": {
              "beginner": "Llena una olla con agua y llévala a hervor a fuego alto. Introduce las salchichas y cuece 5 min. Escurre.",
              "intermediate": "Llena una olla con agua y llévala a hervor a fuego alto. Introduce las salchichas y cuece 5 min. Escurre.",
              "advanced": "Llena una olla con agua y llévala a hervor a fuego alto. Introduce las salchichas y cuece 5 min."
            },
            "heatLevel": "alto",
            "timerSeconds": 300,
            "timerLabel": "Salchichas"
          },
          {
            "id": "bun",
            "phaseId": "bun",
            "text": {
              "beginner": "Calienta el pan 1 min en sartén seca o micro. Coloca la salchicha dentro y sirve caliente.",
              "intermediate": "Calienta el pan 1 min en sartén seca o micro. Coloca la salchicha dentro y sirve caliente.",
              "advanced": "Calienta el pan 1 min en sartén seca o micro. Coloca la salchicha dentro y sirve caliente."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "garbanzos-tomate",
    "name": "Garbanzos con tomate frito",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido",
      "comfort"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "garbanzos",
        "quantity": "1/2 lata",
        "amountPerServing": 0.5,
        "unit": "lata"
      },
      {
        "foodId": "tomate-frito",
        "quantity": "100 g",
        "amountPerServing": 100,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 222,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Escurre y aclara los garbanzos.",
      "Saltea garbanzos con tomate 5–6 min a fuego medio; salar."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Abre el bote de garbanzos, escúrrelos en un colador y acláralos con agua. Ten {qty:tomate-frito} y {qty:aceite} a mano.",
              "intermediate": "Abre el bote de garbanzos, escúrrelos en un colador y acláralos con agua.",
              "advanced": "Abre el bote de garbanzos, escúrrelos en un colador y acláralos con agua."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "En una sartén, calienta el aceite a fuego medio. Añade garbanzos y tomate frito. Remueve 5–6 min hasta que hierva suave y los garbanzos estén calientes de dentro. Prueba sal y sirve.",
              "intermediate": "Saltea garbanzos con tomate 5–6 min a fuego medio; salar.",
              "advanced": "En una sartén, calienta el aceite a fuego medio. Añade garbanzos y tomate frito."
            },
            "heatLevel": "medio",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 300,
            "timerLabel": "Garbanzos"
          }
        ]
      }
    ]
  },
  {
    "id": "garbanzos-espinacas",
    "name": "Garbanzos con espinacas",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo",
      "ligero"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "garbanzos",
        "quantity": "1/2 lata",
        "amountPerServing": 0.5,
        "unit": "lata"
      },
      {
        "foodId": "espinacas",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 253,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Escurre garbanzos; espinacas listas.",
      "Saltea espinacas 1–2 min hasta que mengüen.",
      "Garbanzos 4 min con las espinacas; salar."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Escurre y aclara los garbanzos. Lava las espinacas si hace falta. Ten aceite y sal listos.",
              "intermediate": "Escurre y aclara los garbanzos. Lava las espinacas si hace falta. Ten aceite y sal listos.",
              "advanced": "Escurre y aclara los garbanzos. Lava las espinacas si hace falta."
            }
          },
          {
            "id": "wilt",
            "phaseId": "wilt",
            "text": {
              "beginner": "Sartén con un chorrito de aceite a fuego medio. Añade espinacas: en 1–2 min menguarán. Remueve.",
              "intermediate": "Saltea espinacas 1–2 min hasta que mengüen.",
              "advanced": "Sartén con un chorrito de aceite a fuego medio. Añade espinacas: en 1–2 min menguarán."
            },
            "heatLevel": "medio",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 90,
            "timerLabel": "Espinacas"
          },
          {
            "id": "finish",
            "phaseId": "finish",
            "text": {
              "beginner": "Añade los garbanzos escurridos. Cocina 4 min removiendo hasta calientes. Sala y sirve.",
              "intermediate": "Añade los garbanzos escurridos. Cocina 4 min removiendo hasta calientes. Sala y sirve.",
              "advanced": "Añade los garbanzos escurridos. Cocina 4 min removiendo hasta calientes."
            },
            "heatLevel": "medio",
            "timerSeconds": 240,
            "timerLabel": "Garbanzos"
          }
        ]
      }
    ]
  },
  {
    "id": "lentejas-tomate",
    "name": "Lentejas con tomate frito",
    "timeMinutes": 20,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "comfort",
      "completo"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "lentejas",
        "quantity": "1/2 lata",
        "amountPerServing": 0.5,
        "unit": "lata"
      },
      {
        "foodId": "tomate-frito",
        "quantity": "100 g",
        "amountPerServing": 100,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 319,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Escurre lentejas; tomate listo.",
      "Lentejas con tomate 6 min a fuego medio; salar."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Escurre las lentejas de bote y acláralas. Ten tomate frito, aceite y sal.",
              "intermediate": "Escurre las lentejas de bote y acláralas. Ten tomate frito, aceite y sal.",
              "advanced": "Escurre las lentejas de bote y acláralas. Ten tomate frito, aceite y sal."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Sartén con aceite a fuego medio: añade lentejas y tomate frito. Remueve 6 min hasta que burbujee suave y esté bien caliente. Prueba sal y sirve.",
              "intermediate": "Sartén con aceite a fuego medio: añade lentejas y tomate frito. Remueve 6 min hasta que burbujee suave y esté bien caliente. Prueba sal y sirve.",
              "advanced": "Sartén con aceite a fuego medio: añade lentejas y tomate frito. Remueve 6 min hasta que burbujee suave y esté bien caliente."
            },
            "heatLevel": "medio",
            "timerSeconds": 360,
            "timerLabel": "Lentejas"
          }
        ]
      }
    ]
  },
  {
    "id": "guisantes-jamon",
    "name": "Guisantes con jamón",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "guarnicion",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "guisantes",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      },
      {
        "foodId": "jamon",
        "quantity": "2 lonchas",
        "amountPerServing": 2,
        "unit": "loncha"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 357,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Trocea jamón; guisantes listos.",
      "Guisantes 5 min; jamón 2 min a fuego medio."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Si los guisantes son congelados, no hace falta descongelarlos. Trocea el jamón en daditos. Aceite y sal a mano.",
              "intermediate": "Ten listos los guisantes y el jamón troceado antes de saltear.",
              "advanced": "Prepara guisantes y jamón troceado antes de empezar."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Sartén con aceite a fuego medio: saltea guisantes 5 min removiendo. Añade jamón 2 min más. Deben quedar calientes y el jamón ligeramente dorado. Sala poco (el jamón ya aporta sal) y sirve.",
              "intermediate": "Sartén con aceite a fuego medio: saltea guisantes 5 min removiendo. Añade jamón 2 min más. Deben quedar calientes y el jamón ligeramente dorado. Sala poco (el jamón ya aporta sal) y sirve.",
              "advanced": "Sartén con aceite a fuego medio: saltea guisantes 5 min removiendo. Añade jamón 2 min más."
            },
            "heatLevel": "medio",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 420,
            "timerLabel": "Guisantes"
          }
        ]
      }
    ]
  },
  {
    "id": "guisantes-huevo",
    "name": "Guisantes con huevo",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "guisantes",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      },
      {
        "foodId": "huevos",
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 225,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Saltea guisantes 4–5 min a fuego medio.",
      "Revuelve huevos 1–2 min a fuego bajo-medio; mezcla con guisantes."
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
          {
            "id": "peas",
            "phaseId": "peas",
            "text": {
              "beginner": "Sartén con aceite a fuego medio: saltea {qty:guisantes} 4–5 min hasta calientes y de color vivo.",
              "intermediate": "Saltea guisantes 4–5 min a fuego medio.",
              "advanced": "Sartén con aceite a fuego medio: saltea {qty:guisantes} 4–5 min hasta calientes y de color vivo."
            },
            "heatLevel": "medio",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 270,
            "timerLabel": "Guisantes"
          },
          {
            "id": "eggs",
            "phaseId": "eggs",
            "text": {
              "beginner": "Aparta los guisantes a un lado de la sartén (o usa otra). Bate {qty:huevos} con sal. Vierte a fuego bajo-medio y remueve 1–2 min hasta cuajado cremoso. Mezcla con los guisantes y sirve.",
              "intermediate": "Revuelve huevos 1–2 min a fuego bajo-medio; mezcla con guisantes.",
              "advanced": "Aparta los guisantes a un lado de la sartén (o usa otra). Bate {qty:huevos} con sal."
            },
            "heatLevel": "medio-bajo",
            "timerSeconds": 120,
            "timerLabel": "Huevos"
          }
        ]
      }
    ]
  },
  {
    "id": "verduras-mixtas-salteado",
    "name": "Verduras mixtas salteadas",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "guarnicion",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "verduras-mixtas",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 163,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Trocea verduras de tamaño uniforme.",
      "Saltea verduras 6–8 min a fuego medio-alto hasta tiernas."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Si las verduras son grandes, córtalas en trozos similares (2–3 cm). Ten {qty:aceite} y sal.",
              "intermediate": "Lava y corta las verduras en trozos similares para saltear.",
              "advanced": "Corta las verduras en trozos uniformes y tenlas listas."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Sartén amplia con aceite a fuego medio-alto. Añade verduras. Remueve cada minuto. Cocina 6–8 min hasta tiernas al pincho pero no pastosas. Sala y sirve.",
              "intermediate": "Saltea verduras 6–8 min a fuego medio-alto hasta tiernas.",
              "advanced": "Sartén amplia con aceite a fuego medio-alto. Añade verduras. Cocina 6–8 min hasta tiernas al pincho pero no pastosas. Sala y sirve."
            },
            "heatLevel": "medio-alto",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 420,
            "timerLabel": "Verduras"
          }
        ]
      }
    ]
  },
  {
    "id": "espinacas-ajos-huevo",
    "name": "Espinacas salteadas con huevo",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "espinacas",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      },
      {
        "foodId": "huevos",
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "ajo",
        "quantity": "1 diente",
        "amountPerServing": 1,
        "unit": "diente"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 11,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Sofríe ajo 30–40 s a fuego medio.",
      "Espinacas 1–2 min hasta menguar.",
      "Huevos revueltos 2 min a fuego medio-bajo sobre espinacas."
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
          {
            "id": "garlic",
            "phaseId": "garlic",
            "text": {
              "beginner": "Lamina el ajo. Sartén con aceite a fuego medio: sofríe el ajo 30–40 s hasta dorado claro (no negro).",
              "intermediate": "Sofríe ajo 30–40 s a fuego medio.",
              "advanced": "Lamina el ajo. Sartén con aceite a fuego medio: sofríe el ajo 30–40 s hasta dorado claro (no negro)."
            },
            "heatLevel": "medio",
            "termIds": [
              "sofreir"
            ]
          },
          {
            "id": "spinach",
            "phaseId": "spinach",
            "text": {
              "beginner": "Añade espinacas. En 1–2 min menguarán. Remueve.",
              "intermediate": "Añade espinacas. En 1–2 min menguarán. Remueve.",
              "advanced": "Añade las espinacas y cocina 1–2 minutos hasta que mengüen."
            },
            "heatLevel": "medio",
            "timerSeconds": 90,
            "timerLabel": "Espinacas"
          },
          {
            "id": "eggs",
            "phaseId": "eggs",
            "text": {
              "beginner": "Bate los huevos con una pizca de sal. Vierte en la sartén a fuego medio-bajo y remueve (o cuaja sin remover, según el plato) hasta el punto deseado. Sirve al momento.",
              "intermediate": "Cocina los huevos a fuego medio-bajo hasta el punto deseado y sirve.",
              "advanced": "Cocina los huevos a fuego medio-bajo al punto y sirve."
            },
            "heatLevel": "medio-bajo",
            "timerSeconds": 120,
            "timerLabel": "Huevos"
          }
        ]
      }
    ]
  },
  {
    "id": "pimiento-sarten",
    "name": "Pimiento salteado",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "guarnicion",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pimiento",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 277,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Pimiento en tiras de 1 cm.",
      "Saltea pimiento 6–8 min a fuego medio-alto hasta tierno."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Lava el pimiento, quita el pedúnculo y las semillas. Córtalo en tiras de 1 cm.",
              "intermediate": "Lava el pimiento, quita el pedúnculo y las semillas. Córtalo en tiras de 1 cm.",
              "advanced": "Lava el pimiento, quita el pedúnculo y las semillas. Córtalo en tiras de 1 cm."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Sartén con aceite a fuego medio-alto. Saltea las tiras 6–8 min removiendo hasta blando y algo dorado en bordes. Sala y sirve.",
              "intermediate": "Saltea pimiento 6–8 min a fuego medio-alto hasta tierno.",
              "advanced": "Sartén con aceite a fuego medio-alto. Saltea las tiras 6–8 min removiendo hasta blando y algo dorado en bordes."
            },
            "heatLevel": "medio-alto",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 420,
            "timerLabel": "Pimiento"
          }
        ]
      }
    ]
  },
  {
    "id": "zanahoria-salteada",
    "name": "Zanahoria salteada",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "guarnicion",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "zanahoria",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 123,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Zanahoria en rodajas finas.",
      "Zanahoria tapada 8–10 min a fuego medio hasta tierna."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Pela la zanahoria y córtala en rodajas finas (2–3 mm) para que se cocine antes.",
              "intermediate": "Pela la zanahoria y córtala en rodajas finas (2–3 mm) para que se cocine antes.",
              "advanced": "Pela la zanahoria y córtala en rodajas finas (2–3 mm) para que se cocine antes."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Sartén con aceite a fuego medio, tapa: cocina 8–10 min removiendo a mitad. Debe pincharse fácil. Sala y sirve.",
              "intermediate": "Zanahoria tapada 8–10 min a fuego medio hasta tierna.",
              "advanced": "Zanahoria 8–10 min tapada a fuego medio."
            },
            "heatLevel": "medio",
            "timerSeconds": 540,
            "timerLabel": "Zanahoria"
          }
        ]
      }
    ]
  },
  {
    "id": "brocoli-ajos",
    "name": "Brócoli salteado con ajo",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "guarnicion",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "brocoli",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "ajo",
        "quantity": "2 dientes",
        "amountPerServing": 2,
        "unit": "diente"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 50,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Ramos de brócoli; ajo laminado.",
      "Sofríe ajo; brócoli tapado 5–6 min hasta tierno-crujiente."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Separa el brócoli en ramos pequeños. Pela el ajo y lámina fino. Aceite y sal listos.",
              "intermediate": "Separa el brócoli en ramos pequeños. Pela el ajo y lámina fino. Aceite y sal listos.",
              "advanced": "Separa el brócoli en ramos pequeños. Pela el ajo y lámina fino."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Sartén con aceite a fuego medio: sofríe el ajo 30–40 s (dorado claro). Añade brócoli y 2 cucharadas de agua. Tapa 5–6 min removiendo a mitad. Debe quedar tierno-crujiente (verde vivo, no gris). Sala y sirve. Sofreír = cocinar en poco aceite removiendo sin quemar.",
              "intermediate": "Sofríe ajo; brócoli tapado 5–6 min hasta tierno-crujiente.",
              "advanced": "Ajo sofrito; brócoli 5–6 min tapado al punto."
            },
            "heatLevel": "medio",
            "termIds": [
              "sofreir"
            ],
            "timerSeconds": 360,
            "timerLabel": "Brócoli"
          }
        ]
      }
    ]
  },
  {
    "id": "calabacin-tomate",
    "name": "Calabacín con tomate",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "dishRole": "guarnicion",
    "pepperTags": [
      "ligero"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "calabacin",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "tomate",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 135,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Calabacín y tomate en cubos.",
      "Calabacín 5 min + tomate 4 min a fuego medio."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Lava calabacín y tomate. Corta el calabacín en cubos de 1–2 cm y el tomate en cubos.",
              "intermediate": "Lava calabacín y tomate. Corta el calabacín en cubos de 1–2 cm y el tomate en cubos.",
              "advanced": "Lava calabacín y tomate. Corta el calabacín en cubos de 1–2 cm y el tomate en cubos."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Sartén con aceite a fuego medio: saltea calabacín 5 min. Añade tomate 4 min más hasta que suelte jugo y el calabacín esté tierno. Sala y sirve.",
              "intermediate": "Sartén con aceite a fuego medio: saltea calabacín 5 min. Añade tomate 4 min más hasta que suelte jugo y el calabacín esté tierno. Sala y sirve.",
              "advanced": "Sartén con aceite a fuego medio: saltea calabacín 5 min. Añade tomate 4 min más hasta que suelte jugo y el calabacín esté tierno."
            },
            "heatLevel": "medio",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 540,
            "timerLabel": "Verduras"
          }
        ]
      }
    ]
  },
  {
    "id": "calabacin-relleno-simple",
    "name": "Calabacín salteado con huevo",
    "timeMinutes": 15,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "calabacin",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "huevos",
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 3,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Saltea calabacín en cubos 6 min.",
      "Huevo batido encima; cuaja 3–4 min a fuego medio-bajo."
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
          {
            "id": "veg",
            "phaseId": "veg",
            "text": {
              "beginner": "Corta el calabacín en cubos pequeños. Sartén con aceite a fuego medio: saltea 6 min hasta empezar a ablandarse.",
              "intermediate": "Corta el calabacín en cubos pequeños. Sartén con aceite a fuego medio: saltea 6 min hasta empezar a ablandarse.",
              "advanced": "Corta el calabacín en cubos pequeños. Sartén con aceite a fuego medio: saltea 6 min hasta empezar a ablandarse."
            },
            "heatLevel": "medio",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 360,
            "timerLabel": "Calabacín"
          },
          {
            "id": "egg",
            "phaseId": "egg",
            "text": {
              "beginner": "Bate {qty:huevos} con sal. Vierte sobre el calabacín. Cocina 3–4 min a fuego medio-bajo hasta que la clara cuaje. Puedes tapar 1 min. Sirve en porciones.",
              "intermediate": "Huevo batido encima; cuaja 3–4 min a fuego medio-bajo.",
              "advanced": "Bate {qty:huevos} con sal. Vierte sobre el calabacín."
            },
            "heatLevel": "medio-bajo",
            "timerSeconds": 210,
            "timerLabel": "Huevo"
          }
        ]
      }
    ]
  },
  {
    "id": "pisto-rapido",
    "name": "Pisto rápido de pimiento y calabacín",
    "timeMinutes": 20,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo",
      "comfort"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pimiento",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "calabacin",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "tomate-frito",
        "quantity": "100 g",
        "amountPerServing": 100,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 43,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Pimiento y calabacín en cubos.",
      "Saltea pimiento y calabacín 8 min a fuego medio.",
      "Tomate frito 5 min hasta pisto espeso; salar."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Corta pimiento y calabacín en cubos de 1–2 cm. Ten tomate frito, aceite y sal.",
              "intermediate": "Corta pimiento y calabacín en cubos de 1–2 cm. Ten tomate frito, aceite y sal.",
              "advanced": "Corta pimiento y calabacín en cubos de 1–2 cm. Ten tomate frito, aceite y sal."
            }
          },
          {
            "id": "veg",
            "phaseId": "veg",
            "text": {
              "beginner": "Sartén amplia con aceite a fuego medio: saltea pimiento y calabacín 8 min removiendo hasta que empiecen a ablandarse.",
              "intermediate": "Saltea pimiento y calabacín 8 min a fuego medio.",
              "advanced": "Sartén amplia con aceite a fuego medio: saltea pimiento y calabacín 8 min removiendo hasta que empiecen a ablandarse."
            },
            "heatLevel": "medio",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 480,
            "timerLabel": "Verduras"
          },
          {
            "id": "tomato",
            "phaseId": "finish",
            "text": {
              "beginner": "Añade el tomate frito. Cocina 5 min más hasta salsa espesa y verduras tiernas. Prueba sal y sirve.",
              "intermediate": "Añade el tomate frito. Cocina 5 min más hasta salsa espesa y verduras tiernas. Prueba sal y sirve.",
              "advanced": "Añade el tomate frito. Cocina 5 min más hasta salsa espesa y verduras tiernas."
            },
            "heatLevel": "medio",
            "timerSeconds": 300,
            "timerLabel": "Tomate"
          }
        ]
      }
    ]
  },
  {
    "id": "patatas-ajos",
    "name": "Patatas salteadas con ajo",
    "timeMinutes": 20,
    "difficulty": "media",
    "dishRole": "guarnicion",
    "pepperTags": [
      "comfort"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "patatas",
        "quantity": "2 medianas",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "ajo",
        "quantity": "2 dientes",
        "amountPerServing": 2,
        "unit": "diente"
      },
      {
        "foodId": "aceite",
        "quantity": "2 cucharadas",
        "amountPerServing": 2,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 114,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Patata en cubos pequeños; ajo laminado.",
      "Patata tapada 12–15 min a fuego medio; ajo 1–2 min al final."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Pela las patatas y córtalas en cubos pequeños (1–1,5 cm) para que se hagan antes. Lamina el ajo. Aceite y sal.",
              "intermediate": "Pela las patatas y córtalas en cubos pequeños (1–1,5 cm) para que se hagan antes. Lamina el ajo. Aceite y sal.",
              "advanced": "Pela las patatas y córtalas en cubos pequeños (1–1,5 cm) para que se hagan antes. Lamina el ajo."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Sartén con 2–3 cucharadas de aceite a fuego medio. Añade patata, tapa y cocina 12–15 min removiendo cada 3–4 min. Cuando se pinchen fáciles, añade ajo 1–2 min sin quemar. Sala y sirve.",
              "intermediate": "Patata tapada 12–15 min a fuego medio; ajo 1–2 min al final.",
              "advanced": "Sartén con 2–3 cucharadas de aceite a fuego medio. Añade patata, tapa y cocina 12–15 min removiendo cada 3–4 min."
            },
            "heatLevel": "medio",
            "timerSeconds": 780,
            "timerLabel": "Patatas"
          }
        ]
      }
    ]
  },
  {
    "id": "patatas-sartén-huevo",
    "name": "Patatas a la sartén con huevo",
    "timeMinutes": 20,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo",
      "comfort"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "patatas",
        "quantity": "2 medianas",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "huevos",
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "2 cucharadas",
        "amountPerServing": 2,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 46,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Patata en rodajas; freír ~12 min.",
      "Huevos encima, tapa ~3 min; servir."
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
          {
            "id": "prep-b",
            "phaseId": "prep",
            "levels": [
              "beginner"
            ],
            "text": {
              "beginner": "Lava {qty:patatas}. Pélalas si la piel es gruesa o está dañada. Córtalas en rodajas de unos 3–4 mm. Casca {qty:huevos} en un bol aparte y ten sal a mano.",
              "intermediate": "",
              "advanced": ""
            }
          },
          {
            "id": "prep",
            "phaseId": "prep",
            "levels": [
              "intermediate",
              "advanced"
            ],
            "text": {
              "beginner": "",
              "intermediate": "Corta las patatas en rodajas de 3–4 mm y deja los huevos listos para cascar.",
              "advanced": "Corta las patatas en rodajas de 3–4 mm y ten los huevos preparados."
            }
          },
          {
            "id": "cook-potato",
            "phaseId": "cook-potato",
            "heatLevel": "medio",
            "timerSeconds": 720,
            "timerLabel": "Patatas",
            "text": {
              "beginner": "Calienta una sartén mediana con 2 cucharadas de aceite a fuego medio. Extiende las rodajas en una sola capa (o casi). Cocina unos 12 min, dándoles la vuelta a mitad. Están listas cuando se pinchan fáciles con un tenedor y empiezan a dorarse. Sala ligeramente.",
              "intermediate": "Saltea la patata en aceite a fuego medio unos 12 minutos hasta que quede tierna y algo dorada; salpimienta.",
              "advanced": "Saltea la patata a fuego medio unos 12 minutos hasta tierna y dorada; sala."
            }
          },
          {
            "id": "eggs-b",
            "phaseId": "eggs",
            "levels": [
              "beginner"
            ],
            "heatLevel": "medio-bajo",
            "timerSeconds": 180,
            "timerLabel": "Huevos",
            "text": {
              "beginner": "Baja a fuego medio-bajo. Con una cuchara abre huecos entre las patatas y casca un huevo en cada hueco (o encima, sin romper la yema si puedes). Tapa la sartén 3 min aproximadamente. La clara debe cuajarse (ponerse blanca y firme) y la yema puede quedar cremosa. Sirve en el plato con cuidado.",
              "intermediate": "",
              "advanced": ""
            }
          },
          {
            "id": "eggs",
            "phaseId": "eggs",
            "levels": [
              "intermediate",
              "advanced"
            ],
            "heatLevel": "medio-bajo",
            "timerSeconds": 180,
            "timerLabel": "Huevos",
            "text": {
              "beginner": "",
              "intermediate": "A fuego medio-bajo, casca los huevos sobre las patatas, tapa unos 3 minutos hasta que la clara cuaje y sirve.",
              "advanced": "Casca los huevos sobre la patata a fuego medio-bajo, tapa 3 minutos hasta clara cuajada y sirve."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "patata-micro",
    "name": "Patata al microondas",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "dishRole": "guarnicion",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "patatas",
        "quantity": "1 mediana",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 18,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Lava y pincha la patata.",
      "Alta 4–5 min volteando; lista al pincho fácil."
    ],
    "methods": [
      {
        "id": "micro",
        "label": "Microondas",
        "equipmentIds": [
          "microondas"
        ],
        "steps": [
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Lava la patata. Pínchala varias veces con un tenedor (para que no explote). Opcional: un hilo de aceite y sal en la piel.",
              "intermediate": "Lava la patata. Pínchala varias veces con un tenedor (para que no explote). Opcional: un hilo de aceite y sal en la piel.",
              "advanced": "Coloca patatas en un recipiente apto para microondas, sazónalo y cúbrelo parcialmente. Cocina a potencia media hasta el punto y deja reposar un minuto."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Microondas a potencia alta 4–5 min. Dale la vuelta a mitad. Está lista cuando un cuchillo entre fácil hasta el centro. Si no, 1 min más. Abre con cuidado (sale vapor).",
              "intermediate": "Alta 4–5 min volteando; lista al pincho fácil.",
              "advanced": "Microondas a potencia alta 4–5 min. Dale la vuelta a mitad. Está lista cuando un cuchillo entre fácil hasta el centro. Abre con cuidado (sale vapor)."
            },
            "timerSeconds": 270,
            "timerLabel": "Patata micro"
          }
        ]
      }
    ]
  },
  {
    "id": "huevos-patata-micro",
    "name": "Huevo y patata exprés",
    "timeMinutes": 12,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "patatas",
        "quantity": "1 mediana",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 189,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Patata al microondas unos 4 min hasta tierna.",
      "Huevo sobre la patata al microondas hasta clara cuajada."
    ],
    "methods": [
      {
        "id": "combo",
        "label": "Microondas",
        "equipmentIds": [
          "microondas"
        ],
        "steps": [
          {
            "id": "potato",
            "phaseId": "potato",
            "timerSeconds": 240,
            "timerLabel": "Patata",
            "text": {
              "beginner": "Lava bien la patata y pincha la piel varias veces con un tenedor (así no explota). Colócala en un plato apto para microondas. Cocina a potencia alta unos 4 minutos; a mitad de tiempo, dale la vuelta con cuidado. Está lista cuando se pincha fácilmente con el tenedor. Si sigue dura, añade 30–60 segundos más.",
              "intermediate": "Lava y pincha la patata varias veces. Cocínala en el microondas a potencia alta durante unos 4 minutos, dándole la vuelta a mitad, hasta que esté tierna al pincharla.",
              "advanced": "Pincha la patata y cocínala en el microondas a potencia alta unos 4 minutos, girándola a mitad, hasta que esté tierna."
            }
          },
          {
            "id": "egg",
            "phaseId": "egg",
            "timerSeconds": 90,
            "timerLabel": "Huevo",
            "text": {
              "beginner": "Corta la patata caliente en rodajas sobre un plato apto para microondas. Casca un huevo encima (puedes pinchar la yema con cuidado). Cocina a potencia media-alta 45–90 segundos hasta que la clara esté cuajada. Sala y sirve.",
              "intermediate": "Corta la patata en rodajas, casca el huevo encima y cocina al microondas 45–90 segundos hasta que la clara cuaje; sala y sirve.",
              "advanced": "Coloca el huevo sobre la patata en rodajas y cocina al microondas hasta clara cuajada; sala y sirve."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "brocoli-micro-huevo",
    "name": "Brócoli al microondas con huevo",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "brocoli",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "huevos",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 275,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Brócoli al microondas unos 3 min.",
      "Huevo sobre el brócoli al microondas hasta clara cuajada."
    ],
    "methods": [
      {
        "id": "combo",
        "label": "Microondas",
        "equipmentIds": [
          "microondas"
        ],
        "steps": [
          {
            "id": "broccoli",
            "phaseId": "broccoli",
            "timerSeconds": 180,
            "timerLabel": "Brócoli",
            "text": {
              "beginner": "Lava el brócoli y córtalo en floretes. Ponlo en un bol apto para microondas con 2 cucharadas de agua, tapa y cocina a potencia alta unos 3 minutos hasta que quede tierno-crujiente. Escurre el exceso de agua.",
              "intermediate": "Cocina el brócoli en el microondas con un poco de agua unos 3 minutos, tapado, hasta tierno-crujiente; escurre.",
              "advanced": "Cocina el brócoli al microondas con un poco de agua unos 3 minutos hasta tierno-crujiente; escurre."
            }
          },
          {
            "id": "egg",
            "phaseId": "egg",
            "timerSeconds": 120,
            "timerLabel": "Huevo",
            "text": {
              "beginner": "Deja el brócoli en el bol. Casca un huevo encima (puedes pinchar la yema). Cocina a potencia media-alta 45–90 segundos hasta que la clara esté cuajada. Sala y sirve.",
              "intermediate": "Casca el huevo sobre el brócoli y cocina al microondas 45–90 segundos hasta clara cuajada; sala y sirve.",
              "advanced": "Casca el huevo sobre el brócoli y cocina al microondas hasta clara cuajada; sala y sirve."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "sopa-verduras-rapida",
    "name": "Caldo de verduras rápido",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "dishRole": "entrante",
    "pepperTags": [
      "ligero",
      "comfort"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "verduras-mixtas",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 226,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Caldo verduras 10 min."
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
          {
            "id": "simmer",
            "text": {
              "beginner": "Olla con agua: verduras 10 min hasta tiernas; tritura si quieres.",
              "intermediate": "Cuece las verduras a fuego medio hasta que estén tiernas.",
              "advanced": "Cuece las verduras hasta que queden tiernas."
            },
            "timerSeconds": 620,
            "timerLabel": "Caldo",
            "phaseId": "simmer"
          }
        ]
      }
    ]
  },
  {
    "id": "cuscus-verduras",
    "name": "Cuscús con verduras",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido",
      "ligero"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "cuscus",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "calabacin",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "zanahoria",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 53,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Saltea calabacín y zanahoria 6 min.",
      "Hidratar cuscús 5 min."
    ],
    "methods": [
      {
        "id": "combo",
        "label": "Sartén + bol",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "veg",
            "phaseId": "veg",
            "heatLevel": "medio",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 360,
            "timerLabel": "Verduras",
            "text": {
              "beginner": "Corta calabacín y zanahoria en cubos pequeños. Sartén con aceite a fuego medio: saltea 6 min hasta tiernos.",
              "intermediate": "Corta calabacín y zanahoria en cubos pequeños. Sartén con aceite a fuego medio: saltea 6 min hasta tiernos.",
              "advanced": "Corta calabacín y zanahoria en cubos pequeños. Sartén con aceite a fuego medio: saltea 6 min hasta tiernos."
            }
          },
          {
            "id": "cuscus",
            "phaseId": "cuscus",
            "timerSeconds": 300,
            "timerLabel": "Cuscús",
            "text": {
              "beginner": "Pon el cuscús en un bol. Vierte el mismo volumen de agua hirviendo (1:1), un chorrito de aceite y sal. Tapa 5 min. Suelta con tenedor, mezcla con verduras y sirve.",
              "intermediate": "Hidratar cuscús 1:1 agua hirviendo 5 min; mezclar con verduras.",
              "advanced": "Cuscús 1:1 / 5 min; integrar verduras."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "cuscus-atun",
    "name": "Cuscús con atún",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido",
      "completo"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "cuscus",
        "quantity": "80 g",
        "amountPerServing": 80,
        "unit": "g"
      },
      {
        "foodId": "atun",
        "quantity": "1/2 lata",
        "amountPerServing": 0.5,
        "unit": "lata"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 217,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Hidrata cuscús 5 min; mezcla atún escurrido y aceite.",
      "Sirve el cuscús templado en un bol."
    ],
    "methods": [
      {
        "id": "none",
        "label": "Sin cocción",
        "equipmentIds": [],
        "steps": [
          {
            "id": "assemble",
            "text": {
              "beginner": "Hidrata cuscús con agua hirviendo 1:1, tapa 5 min. Escurre atún y mezcla con aceite y sal.",
              "intermediate": "Hidrata cuscús 5 min; mezcla atún escurrido y aceite.",
              "advanced": "Cuscús hidratado con atún, aceite y sal mezclados."
            },
            "phaseId": "assemble"
          },
          {
            "id": "finish",
            "text": {
              "beginner": "Sirve el cuscús templado en un bol.",
              "intermediate": "Sirve el cuscús templado en un bol.",
              "advanced": "Sirve el cuscús templado en un bol."
            },
            "phaseId": "finish"
          }
        ]
      }
    ]
  },
  {
    "id": "revuelto-espinacas",
    "name": "Revuelto de espinacas",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "espinacas",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 202,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Esp. 1 min, huevo revuelto 2 min a fuego bajo."
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
          {
            "id": "cook",
            "text": {
              "beginner": "Bate los huevos con una pizca de sal. Vierte en la sartén a fuego medio-bajo y remueve (o cuaja sin remover, según el plato) hasta el punto deseado. Sirve al momento.",
              "intermediate": "Cocina los huevos a fuego medio-bajo hasta el punto deseado y sirve.",
              "advanced": "Cocina los huevos a fuego medio-bajo al punto y sirve."
            },
            "timerSeconds": 180,
            "timerLabel": "Revuelto",
            "phaseId": "cook",
            "heatLevel": "bajo"
          }
        ]
      }
    ]
  },
  {
    "id": "revuelto-setas-estilo",
    "name": "Revuelto de calabacín",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "calabacin",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 256,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Calabacín cubos 4 min; huevos revueltos 2 min."
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
          {
            "id": "cook",
            "text": {
              "beginner": "Bate los huevos con una pizca de sal. Vierte en la sartén a fuego medio-bajo y remueve (o cuaja sin remover, según el plato) hasta el punto deseado. Sirve al momento.",
              "intermediate": "Cocina los huevos a fuego medio-bajo hasta el punto deseado y sirve.",
              "advanced": "Cocina los huevos a fuego medio-bajo al punto y sirve."
            },
            "timerSeconds": 360,
            "timerLabel": "Revuelto",
            "phaseId": "cook"
          }
        ]
      }
    ]
  },
  {
    "id": "tortilla-pimiento",
    "name": "Tortilla de pimiento",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "pimiento",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 289,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Saltea pimiento 4 min; añade huevo batido, cuaja 3 min por lado."
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
          {
            "id": "pepper",
            "phaseId": "pepper",
            "heatLevel": "medio",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 240,
            "timerLabel": "Pimiento",
            "text": {
              "beginner": "Corta el pimiento en tiras finas. Sartén con aceite a fuego medio: saltea 4–5 min hasta tierno.",
              "intermediate": "Saltea pimiento en tiras 4–5 min a fuego medio.",
              "advanced": "Corta el pimiento en tiras finas. Sartén con aceite a fuego medio: saltea 4–5 min hasta tierno."
            }
          },
          {
            "id": "egg",
            "phaseId": "egg",
            "heatLevel": "medio-bajo",
            "timerSeconds": 360,
            "timerLabel": "Tortilla",
            "text": {
              "beginner": "Bate huevos con sal. Vierte sobre el pimiento. Cuaja 3 min, despega bordes, gira o dobla y termina 2–3 min. Sirve.",
              "intermediate": "Huevo batido sobre pimiento; cuaja 3 min, gira/dobla 2–3 min.",
              "advanced": "Huevo sobre pimiento; cuajar, girar y terminar."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tortilla-cebolla",
    "name": "Tortilla con cebolla",
    "timeMinutes": 15,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "huevos",
        "quantity": "3 unidades",
        "amountPerServing": 3,
        "unit": "unidad"
      },
      {
        "foodId": "cebolla",
        "quantity": "1/2 unidad",
        "amountPerServing": 0.5,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 82,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Pochar cebolla 8 min.",
      "Huevo batido, mezcla, cuaja 4 min y voltea."
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
          {
            "id": "onion",
            "text": {
              "beginner": "Cebolla en juliana a fuego bajo 8 min Cocínala despacio (pochar) hasta blanda.",
              "intermediate": "Cebolla en juliana a fuego bajo 8 min Pochar hasta blanda.",
              "advanced": "Cebolla en juliana a fuego bajo 8 min Cocínala despacio (pochar) hasta blanda."
            },
            "termIds": [
              "pochar"
            ],
            "timerSeconds": 480,
            "timerLabel": "Cebolla",
            "phaseId": "onion",
            "heatLevel": "bajo"
          },
          {
            "id": "egg",
            "text": {
              "beginner": "Bate los huevos con una pizca de sal. Vierte en la sartén a fuego medio-bajo y remueve (o cuaja sin remover, según el plato) hasta el punto deseado. Sirve al momento.",
              "intermediate": "Cocina los huevos a fuego medio-bajo hasta el punto deseado y sirve.",
              "advanced": "Cocina los huevos a fuego medio-bajo al punto y sirve."
            },
            "timerSeconds": 240,
            "timerLabel": "Tortilla",
            "phaseId": "egg"
          }
        ]
      }
    ]
  },
  {
    "id": "sarten-mix-pavo-verdura",
    "name": "Pavo con verduras mixtas",
    "timeMinutes": 18,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pavo",
        "quantity": "120 g",
        "amountPerServing": 120,
        "unit": "g"
      },
      {
        "foodId": "verduras-mixtas",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 221,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Pavo en dados; verduras troceadas.",
      "Saltea pavo 4–5 min.",
      "Verduras 5–6 min; pavo al punto; salar."
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
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Corta el pavo en dados. Si las verduras son grandes, trocéalas. Aceite y sal.",
              "intermediate": "Corta el pavo en dados. Si las verduras son grandes, trocéalas. Aceite y sal.",
              "advanced": "Corta el pavo en dados. Aceite y sal."
            }
          },
          {
            "id": "pavo",
            "phaseId": "pavo",
            "text": {
              "beginner": "Calienta la sartén con aceite a fuego medio-alto. Cocina el pavo removiendo hasta que no quede rosado por dentro (abre un trozo; los jugos deben salir claros). Sala y continúa con el siguiente paso o sirve. Remueve con frecuencia (saltear).",
              "intermediate": "Cocina el pavo a fuego medio-alto hasta que esté hecho por dentro; sala, salteando.",
              "advanced": "Cocina el pavo a fuego medio-alto al punto seguro; sala, salteando."
            },
            "heatLevel": "medio-alto",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 270,
            "timerLabel": "Pavo"
          },
          {
            "id": "veg",
            "phaseId": "veg",
            "text": {
              "beginner": "Añade verduras 5–6 min removiendo hasta tiernas. El pavo sin rosa dentro. Sala y sirve.",
              "intermediate": "Añade verduras 5–6 min removiendo hasta tiernas. El pavo sin rosa dentro. Sala y sirve.",
              "advanced": "Añade verduras 5–6 min removiendo hasta tiernas. El pavo sin rosa dentro."
            },
            "heatLevel": "medio-alto",
            "timerSeconds": 330,
            "timerLabel": "Verduras"
          }
        ]
      }
    ]
  },
  {
    "id": "queso-plancha-pan",
    "name": "Queso a la plancha con pan",
    "timeMinutes": 8,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "queso",
        "quantity": "2 lonchas",
        "amountPerServing": 2,
        "unit": "loncha"
      },
      {
        "foodId": "pan",
        "quantity": "2 rebanadas",
        "amountPerServing": 2,
        "unit": "rebanada"
      }
    ],
    "baseServings": 1,
    "imageHue": 43,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Plancha queso 1 min/lado hasta fundir; acompaña con pan."
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
          {
            "id": "heat",
            "phaseId": "heat",
            "heatLevel": "medio",
            "text": {
              "beginner": "Calienta plancha o sartén a fuego medio. Ten el queso en lonchas y el pan listos.",
              "intermediate": "Calienta plancha o sartén a fuego medio. Ten el queso en lonchas y el pan listos.",
              "advanced": "Calienta plancha o sartén a fuego medio. Ten el queso en lonchas y el pan listos."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "heatLevel": "medio",
            "timerSeconds": 120,
            "timerLabel": "Queso",
            "text": {
              "beginner": "Coloca el queso 1 min por lado hasta que empiece a fundir y dorar. Sirve inmediatamente con el pan (tostado si quieres).",
              "intermediate": "Queso 1 min/lado hasta fundir; servir con pan.",
              "advanced": "Queso 1 min/lado fundido; servir con pan."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "patatas-doradas",
    "name": "Patatas doradas",
    "timeMinutes": 25,
    "difficulty": "fácil",
    "dishRole": "guarnicion",
    "pepperTags": [
      "comfort",
      "ligero"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "patatas",
        "quantity": "2 medianas",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 359,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Gajos de patata con aceite y sal; capa única.",
      "Air Fryer 18 min."
    ],
    "methods": [
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "timeMinutes": 18,
        "temperature": "180 °C",
        "temperatureC": 180,
        "steps": [
          {
            "id": "prep",
            "phaseId": "prep",
            "temperatureC": 180,
            "text": {
              "beginner": "Corta las patatas en gajos. Mézclalas con aceite y sal. Precalienta Air Fryer a 180 °C. Extiende en una sola capa.",
              "intermediate": "Corta las patatas en gajos. Mézclalas con aceite y sal. Precalienta Air Fryer a 180 °C. Extiende en una sola capa.",
              "advanced": "Distribuye patatas en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "temperatureC": 180,
            "timerSeconds": 1080,
            "timerLabel": "Air Fryer",
            "text": {
              "beginner": "Cocina 18 min a 180 °C; agita a mitad. Listas cuando estén doradas por fuera y tiernas al pincho. Sirve.",
              "intermediate": "Cocina 18 min a 180 °C; agita a mitad. Listas cuando estén doradas por fuera y tiernas al pincho. Sirve.",
              "advanced": "Distribuye patatas en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            }
          }
        ]
      },
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "timeMinutes": 30,
        "temperature": "200 °C",
        "temperatureC": 200,
        "steps": [
          {
            "id": "prep",
            "phaseId": "prep",
            "temperatureC": 200,
            "text": {
              "beginner": "Corta las patatas en gajos. Mézclalas con aceite y sal. Precalienta Horno a 200 °C. Extiende en una sola capa.",
              "intermediate": "Corta las patatas en gajos. Mézclalas con aceite y sal. Precalienta Horno a 200 °C. Extiende en una sola capa.",
              "advanced": "Hornea patatas a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "temperatureC": 200,
            "timerSeconds": 1800,
            "timerLabel": "Horno",
            "text": {
              "beginner": "Cocina 30 min a 200 °C; da la vuelta a mitad. Listas cuando estén doradas por fuera y tiernas al pincho. Sirve.",
              "intermediate": "Cocina 30 min a 200 °C; da la vuelta a mitad. Listas cuando estén doradas por fuera y tiernas al pincho. Sirve.",
              "advanced": "Hornea patatas a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            }
          }
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "timeMinutes": 20,
        "steps": [
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Corta patatas en gajos o rodajas. Aceite y sal a mano.",
              "intermediate": "Corta patatas en gajos o rodajas. Aceite y sal a mano.",
              "advanced": "Corta patatas en gajos o rodajas. Aceite y sal a mano."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "heatLevel": "medio",
            "timerSeconds": 1200,
            "timerLabel": "Patatas",
            "text": {
              "beginner": "Sartén con aceite a fuego medio: cocina 15–20 min removiendo, tapado a ratos, hasta doradas y tiernas al pincho. Sala y sirve.",
              "intermediate": "Sartén con aceite a fuego medio: cocina 15–20 min removiendo, tapado a ratos, hasta doradas y tiernas al pincho. Sala y sirve.",
              "advanced": "Sartén con aceite a fuego medio: cocina 15–20 min removiendo, tapado a ratos, hasta doradas y tiernas al pincho. Sala y sirve."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "nuggets-caseros-estilo",
    "name": "Nuggets de pollo",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "nuggets",
        "quantity": "1 ración",
        "amountPerServing": 1,
        "unit": "ración"
      }
    ],
    "baseServings": 1,
    "imageHue": 253,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Capa única; precalienta 190 °C.",
      "12 min a 190 °C con volteo a mitad; dorados y calientes por dentro."
    ],
    "methods": [
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "timeMinutes": 12,
        "temperature": "190 °C",
        "temperatureC": 190,
        "steps": [
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Saca los nuggets del congelador. Precalienta Air Fryer a 190 °C 3 min si tu modelo lo indica. Colócalos en una sola capa en la cestilla.",
              "intermediate": "Saca los nuggets del congelador. Precalienta Air Fryer a 190 °C 3 min si tu modelo lo indica. Colócalos en una sola capa en la cestilla.",
              "advanced": "Saca los nuggets del congelador. PreColócalos en una sola capa en la cestilla."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Cocina 12 min a 190 °C; agita o da la vuelta a los 6 min. Deben quedar dorados y crujientes por fuera; el interior bien caliente (abre uno: sin zonas frías/gelatinosas). Sirve.",
              "intermediate": "Cocina 12 min a 190 °C; agita o da la vuelta a los 6 min. Deben quedar dorados y crujientes por fuera; el interior bien caliente (abre uno: sin zonas frías/gelatinosas). Sirve.",
              "advanced": "Distribuye nuggets en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "timerSeconds": 720,
            "timerLabel": "Nuggets AF",
            "temperatureC": 190
          }
        ]
      },
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "timeMinutes": 18,
        "temperature": "200 °C",
        "temperatureC": 200,
        "steps": [
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Precalienta el horno a 200 °C. Coloca los nuggets congelados en bandeja en una sola capa.",
              "intermediate": "Precalienta el horno a 200 °C. Coloca los nuggets congelados en bandeja en una sola capa.",
              "advanced": "Hornea nuggets a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "temperatureC": 200
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Hornea 18 min; da la vuelta a mitad. Dorados por fuera e interior caliente al cortar uno. Sirve.",
              "intermediate": "Hornea 18 min; da la vuelta a mitad. Dorados por fuera e interior caliente al cortar uno. Sirve.",
              "advanced": "Hornea nuggets a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "timerSeconds": 1080,
            "timerLabel": "Nuggets horno",
            "temperatureC": 200
          }
        ]
      }
    ]
  },
  {
    "id": "croquetas-jamon-plato",
    "name": "Croquetas de jamón",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido",
      "comfort"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "croquetas-jamon",
        "quantity": "1 ración",
        "amountPerServing": 1,
        "unit": "ración"
      }
    ],
    "baseServings": 1,
    "imageHue": 320,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Capa única sin amontonar; 180 °C.",
      "10 min a 180 °C con volteo a mitad; dorado por fuera y cocido por dentro.",
      "Sirve al momento en plato caliente."
    ],
    "methods": [
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón croquetas en una sola capa sin amontonar. Precalienta Air Fryer a 180 °C si el aparato lo indica.",
              "intermediate": "Dispón croquetas en una sola capa sin amontonar. Precalienta Air Fryer a 180 °C si el aparato lo indica.",
              "advanced": "Distribuye croquetas jamon en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 10 min a 180 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 10 min a 180 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Distribuye croquetas jamon en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "timerSeconds": 600,
            "timerLabel": "Air Fryer",
            "temperatureC": 180,
            "similarKey": "croquetas+airfryer+180C",
            "phaseId": "cook"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Coloca croquetas jamon en una sola capa en el Air Fryer. Cocina a la temperatura indicada, agita o voltea a mitad, y comprueba que quede dorado por fuera y cocinado por dentro.",
              "advanced": "Distribuye croquetas jamon en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 10,
        "temperature": "180 °C",
        "temperatureC": 180
      },
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón croquetas en una sola capa sin amontonar. Precalienta Horno a 200 °C si el aparato lo indica.",
              "intermediate": "Dispón croquetas en una sola capa sin amontonar. Precalienta Horno a 200 °C si el aparato lo indica.",
              "advanced": "Hornea croquetas jamon a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 14 min a 200 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 14 min a 200 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Hornea croquetas jamon a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "timerSeconds": 840,
            "timerLabel": "Horno",
            "temperatureC": 200,
            "phaseId": "cook"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Precalienta el horno si hace falta, dispone croquetas jamon en bandeja y hornea a la temperatura indicada hasta el punto, volteando a mitad cuando corresponda.",
              "advanced": "Hornea croquetas jamon a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 14,
        "temperature": "200 °C",
        "temperatureC": 200
      },
      {
        "id": "freidora",
        "label": "Freidora",
        "equipmentIds": [
          "freidora"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón croquetas en una sola capa sin amontonar.",
              "intermediate": "Coloca las croquetas en la cestilla sin amontonar.",
              "advanced": "Distribuye las croquetas en la cestilla sin amontonar."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 5 min; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 5 min; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Cocina 5 min; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas)."
            },
            "timerSeconds": 300,
            "timerLabel": "Freidora",
            "phaseId": "cook",
            "heatLevel": "medio"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Sirve al momento en plato caliente.",
              "advanced": "Sirve al momento en plato caliente."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 5
      }
    ]
  },
  {
    "id": "patatas-fritas-congeladas-plato",
    "name": "Patatas fritas congeladas",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "dishRole": "guarnicion",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "patatas-fritas-congeladas",
        "quantity": "1 ración",
        "amountPerServing": 1,
        "unit": "ración"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 59,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Capa única sin amontonar; 200 °C.",
      "15 min a 200 °C con volteo a mitad; dorado por fuera y cocido por dentro.",
      "Sirve al momento en plato caliente."
    ],
    "methods": [
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón patatas fritas congeladas en una sola capa sin amontonar. Precalienta Air Fryer a 200 °C si el aparato lo indica.",
              "intermediate": "Dispón patatas fritas congeladas en una sola capa sin amontonar. Precalienta Air Fryer a 200 °C si el aparato lo indica.",
              "advanced": "Distribuye patatas fritas congeladas en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 15 min a 200 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 15 min a 200 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Distribuye patatas fritas congeladas en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "timerSeconds": 900,
            "timerLabel": "Air Fryer",
            "temperatureC": 200,
            "similarKey": "patatas_fritas+airfryer+200C",
            "phaseId": "cook"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Coloca patatas fritas congeladas en una sola capa en el Air Fryer. Cocina a la temperatura indicada, agita o voltea a mitad, y comprueba que quede dorado por fuera y cocinado por dentro.",
              "advanced": "Distribuye patatas fritas congeladas en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 15,
        "temperature": "200 °C",
        "temperatureC": 200
      },
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón patatas fritas congeladas en una sola capa sin amontonar. Precalienta Horno a 220 °C si el aparato lo indica.",
              "intermediate": "Dispón patatas fritas congeladas en una sola capa sin amontonar. Precalienta Horno a 220 °C si el aparato lo indica.",
              "advanced": "Hornea patatas fritas congeladas a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 20 min a 220 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 20 min a 220 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Hornea patatas fritas congeladas a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "timerSeconds": 1200,
            "timerLabel": "Horno",
            "temperatureC": 220,
            "phaseId": "cook"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Precalienta el horno si hace falta, dispone patatas fritas congeladas en bandeja y hornea a la temperatura indicada hasta el punto, volteando a mitad cuando corresponda.",
              "advanced": "Hornea patatas fritas congeladas a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 20,
        "temperature": "220 °C",
        "temperatureC": 220
      },
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón patatas fritas congeladas en una sola capa sin amontonar.",
              "intermediate": "Extiende las patatas fritas congeladas en la sartén o bandeja.",
              "advanced": "Distribuye las patatas fritas congeladas sin amontonar."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 12 min; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 12 min; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Cocina 12 min; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas)."
            },
            "timerSeconds": 720,
            "timerLabel": "Sartén",
            "phaseId": "cook",
            "heatLevel": "medio"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Sirve al momento en plato caliente.",
              "advanced": "Sirve al momento en plato caliente."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 12
      }
    ]
  },
  {
    "id": "pizza-congelada-plato",
    "name": "Pizza congelada",
    "timeMinutes": 15,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido",
      "comfort"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pizza-congelada",
        "quantity": "1 unidad",
        "amountPerServing": 1,
        "unit": "unidad"
      }
    ],
    "baseServings": 1,
    "imageHue": 168,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Capa única sin amontonar; 210 °C.",
      "15 min a 210 °C con volteo a mitad; dorado por fuera y cocido por dentro.",
      "Sirve al momento en plato caliente."
    ],
    "methods": [
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón pizza congelada en una sola capa sin amontonar. Precalienta Horno a 210 °C si el aparato lo indica.",
              "intermediate": "Dispón pizza congelada en una sola capa sin amontonar. Precalienta Horno a 210 °C si el aparato lo indica.",
              "advanced": "Hornea pizza congelada a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 15 min a 210 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 15 min a 210 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Hornea pizza congelada a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "timerSeconds": 900,
            "timerLabel": "Horno",
            "temperatureC": 210,
            "similarKey": "pizza+horno+210C",
            "phaseId": "cook"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Precalienta el horno si hace falta, dispone pizza congelada en bandeja y hornea a la temperatura indicada hasta el punto, volteando a mitad cuando corresponda.",
              "advanced": "Hornea pizza congelada a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 15,
        "temperature": "210 °C",
        "temperatureC": 210
      },
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón pizza congelada en una sola capa sin amontonar. Precalienta Air Fryer a 180 °C si el aparato lo indica.",
              "intermediate": "Dispón pizza congelada en una sola capa sin amontonar. Precalienta Air Fryer a 180 °C si el aparato lo indica.",
              "advanced": "Distribuye pizza congelada en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 9 min a 180 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 9 min a 180 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Distribuye pizza congelada en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "timerSeconds": 540,
            "timerLabel": "Air Fryer",
            "temperatureC": 180,
            "phaseId": "cook"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Coloca pizza congelada en una sola capa en el Air Fryer. Cocina a la temperatura indicada, agita o voltea a mitad, y comprueba que quede dorado por fuera y cocinado por dentro.",
              "advanced": "Distribuye pizza congelada en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 9,
        "temperature": "180 °C",
        "temperatureC": 180
      }
    ]
  },
  {
    "id": "lasana-preparada-plato",
    "name": "Lasaña preparada",
    "timeMinutes": 10,
    "difficulty": "fácil",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "rapido",
      "comfort"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "lasana-preparada",
        "quantity": "1 ración",
        "amountPerServing": 1,
        "unit": "ración"
      }
    ],
    "baseServings": 1,
    "imageHue": 132,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Dispón lasaña en una sola capa sin amontonar.",
      "6 min con volteo a mitad; dorado por fuera y cocido por dentro.",
      "Sirve al momento en plato caliente."
    ],
    "methods": [
      {
        "id": "micro",
        "label": "Microondas",
        "equipmentIds": [
          "microondas"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón lasaña en una sola capa sin amontonar.",
              "intermediate": "Coloca lasana preparada en un plato apto para microondas, sazona y tapa parcialmente. Cocina a potencia media hasta el punto deseado y deja reposar 1 minuto.",
              "advanced": "Coloca lasana preparada en un recipiente apto para microondas, sazónalo y cúbrelo parcialmente. Cocina a potencia media hasta el punto y deja reposar un minuto."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 6 min; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 6 min; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Coloca lasana preparada en un recipiente apto para microondas, sazónalo y cúbrelo parcialmente. Cocina a potencia media hasta el punto y deja reposar un minuto."
            },
            "timerSeconds": 360,
            "timerLabel": "Microondas",
            "phaseId": "cook"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Coloca lasana preparada en un plato apto para microondas, sazona y tapa parcialmente. Cocina a potencia media hasta el punto deseado y deja reposar 1 minuto.",
              "advanced": "Coloca lasana preparada en un recipiente apto para microondas, sazónalo y cúbrelo parcialmente. Cocina a potencia media hasta el punto y deja reposar un minuto."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 6
      },
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón lasaña en una sola capa sin amontonar. Precalienta Horno a 180 °C si el aparato lo indica.",
              "intermediate": "Dispón lasaña en una sola capa sin amontonar. Precalienta Horno a 180 °C si el aparato lo indica.",
              "advanced": "Hornea lasana preparada a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 20 min a 180 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 20 min a 180 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Hornea lasana preparada a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "timerSeconds": 1200,
            "timerLabel": "Horno",
            "temperatureC": 180,
            "phaseId": "cook"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Precalienta el horno si hace falta, dispone lasana preparada en bandeja y hornea a la temperatura indicada hasta el punto, volteando a mitad cuando corresponda.",
              "advanced": "Hornea lasana preparada a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 20,
        "temperature": "180 °C",
        "temperatureC": 180
      }
    ]
  },
  {
    "id": "empanadillas-plato",
    "name": "Empanadillas",
    "timeMinutes": 12,
    "difficulty": "fácil",
    "dishRole": "snack",
    "pepperTags": [
      "rapido"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "empanadillas",
        "quantity": "1 ración",
        "amountPerServing": 1,
        "unit": "ración"
      }
    ],
    "baseServings": 1,
    "imageHue": 198,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Capa única sin amontonar; 180 °C.",
      "10 min a 180 °C con volteo a mitad; dorado por fuera y cocido por dentro.",
      "Sirve al momento en plato caliente."
    ],
    "methods": [
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón empanadillas en una sola capa sin amontonar. Precalienta Air Fryer a 180 °C si el aparato lo indica.",
              "intermediate": "Dispón empanadillas en una sola capa sin amontonar. Precalienta Air Fryer a 180 °C si el aparato lo indica.",
              "advanced": "Distribuye empanadillas en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 10 min a 180 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 10 min a 180 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Distribuye empanadillas en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "timerSeconds": 600,
            "timerLabel": "Air Fryer",
            "temperatureC": 180,
            "phaseId": "cook"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Coloca empanadillas en una sola capa en el Air Fryer. Cocina a la temperatura indicada, agita o voltea a mitad, y comprueba que quede dorado por fuera y cocinado por dentro.",
              "advanced": "Distribuye empanadillas en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 10,
        "temperature": "180 °C",
        "temperatureC": 180
      },
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón empanadillas en una sola capa sin amontonar. Precalienta Horno a 200 °C si el aparato lo indica.",
              "intermediate": "Dispón empanadillas en una sola capa sin amontonar. Precalienta Horno a 200 °C si el aparato lo indica.",
              "advanced": "Hornea empanadillas a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 14 min a 200 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 14 min a 200 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Hornea empanadillas a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "timerSeconds": 840,
            "timerLabel": "Horno",
            "temperatureC": 200,
            "phaseId": "cook"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Precalienta el horno si hace falta, dispone empanadillas en bandeja y hornea a la temperatura indicada hasta el punto, volteando a mitad cuando corresponda.",
              "advanced": "Hornea empanadillas a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 14,
        "temperature": "200 °C",
        "temperatureC": 200
      },
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón empanadillas en una sola capa sin amontonar.",
              "intermediate": "Coloca las empanadillas en la sartén con un poco de aceite.",
              "advanced": "Dispone las empanadillas en la sartén con aceite."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 7 min; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 7 min; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Cocina 7 min; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas)."
            },
            "timerSeconds": 420,
            "timerLabel": "Sartén",
            "phaseId": "cook",
            "heatLevel": "medio"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Sirve al momento en plato caliente.",
              "advanced": "Sirve al momento en plato caliente."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 7
      }
    ]
  },
  {
    "id": "pescado-horno-air",
    "name": "Pescado congelado",
    "timeMinutes": 20,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo",
      "ligero"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pescado-congelado",
        "quantity": "1 filete",
        "amountPerServing": 1,
        "unit": "filete"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 251,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Capa única sin amontonar; 200 °C.",
      "22 min a 200 °C con volteo a mitad; dorado por fuera y cocido por dentro.",
      "Sirve al momento en plato caliente."
    ],
    "methods": [
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón filete de pescado congelado en una sola capa sin amontonar. Precalienta Horno a 200 °C si el aparato lo indica.",
              "intermediate": "Dispón filete de pescado congelado en una sola capa sin amontonar. Precalienta Horno a 200 °C si el aparato lo indica.",
              "advanced": "Hornea pescado congelado a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 22 min a 200 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 22 min a 200 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Hornea pescado congelado a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "timerSeconds": 1320,
            "timerLabel": "Horno",
            "temperatureC": 200,
            "similarKey": "pescado+horno+200C",
            "phaseId": "cook"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Precalienta el horno si hace falta, dispone pescado congelado en bandeja y hornea a la temperatura indicada hasta el punto, volteando a mitad cuando corresponda.",
              "advanced": "Hornea pescado congelado a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 22,
        "temperature": "200 °C",
        "temperatureC": 200
      },
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Dispón filete de pescado congelado en una sola capa sin amontonar. Precalienta Air Fryer a 180 °C si el aparato lo indica.",
              "intermediate": "Dispón filete de pescado congelado en una sola capa sin amontonar. Precalienta Air Fryer a 180 °C si el aparato lo indica.",
              "advanced": "Distribuye pescado congelado en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "phaseId": "prep"
          },
          {
            "id": "cook",
            "text": {
              "beginner": "Cocina 15 min a 180 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "intermediate": "Cocina 15 min a 180 °C; voltea o agita a mitad de tiempo. Por fuera dorado; por dentro bien caliente y cocido (abre uno si dudas).",
              "advanced": "Distribuye pescado congelado en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "timerSeconds": 900,
            "timerLabel": "Air Fryer",
            "temperatureC": 180,
            "phaseId": "cook"
          },
          {
            "id": "serve",
            "text": {
              "beginner": "Sirve al momento en plato caliente.",
              "intermediate": "Coloca pescado congelado en una sola capa en el Air Fryer. Cocina a la temperatura indicada, agita o voltea a mitad, y comprueba que quede dorado por fuera y cocinado por dentro.",
              "advanced": "Distribuye pescado congelado en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "phaseId": "serve"
          }
        ],
        "timeMinutes": 15,
        "temperature": "180 °C",
        "temperatureC": 180
      }
    ]
  },
  {
    "id": "pollo-horno-air",
    "name": "Pollo asado sencillo",
    "timeMinutes": 30,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo",
      "especial"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pollo",
        "quantity": "180 g",
        "amountPerServing": 180,
        "unit": "g"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 156,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Sazonar pollo.",
      "Capa única.",
      "Cocinar y voltear a mitad hasta punto seguro."
    ],
    "methods": [
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          {
            "id": "prep-b",
            "phaseId": "prep",
            "levels": [
              "beginner"
            ],
            "text": {
              "beginner": "Corta {qty:pollo} en trozos similares (dados o tiras de bocado). Sécalos con papel. En un bol: mezcla el pollo con {qty:aceite}, una pizca generosa de sal y pimienta si tienes. Remueve hasta que cada trozo quede untado (sazonar = sal + oil / especias sobre el alimento).",
              "intermediate": "",
              "advanced": ""
            }
          },
          {
            "id": "prep",
            "phaseId": "prep",
            "levels": [
              "intermediate",
              "advanced"
            ],
            "text": {
              "beginner": "",
              "intermediate": "Trocea el pollo y úntalo con aceite, sal y pimienta.",
              "advanced": "Trocea el pollo y sazónalo con aceite y sal."
            }
          },
          {
            "id": "preheat",
            "phaseId": "preheat",
            "temperatureC": 200,
            "text": {
              "beginner": "Enciende el horno a 200 °C (calor arriba y abajo si puedes). Espera a que alcance temperatura: muchas puertas tienen un piloto o pitido. Mientras, forra una bandeja con papel o unge ligeramente.",
              "intermediate": "Precalienta el horno a 200 °C y prepara la bandeja.",
              "advanced": "Precalienta el horno a 200 °C y deja la bandeja lista."
            }
          },
          {
            "id": "arrange",
            "phaseId": "arrange",
            "text": {
              "beginner": "Extiende el pollo en una sola capa sin amontonar (si se apila, se cuece al vapor y no dora). Deja un poco de espacio entre trozos.",
              "intermediate": "Extiende el pollo en una sola capa sobre la bandeja.",
              "advanced": "Distribuye el pollo en capa única sobre la bandeja."
            }
          },
          {
            "id": "cook1",
            "phaseId": "cook",
            "timerSeconds": 900,
            "timerLabel": "Horno 1.ª mitad",
            "temperatureC": 200,
            "similarKey": "pollo+horno+200C",
            "text": {
              "beginner": "Mete la bandeja a media altura. Cocina 15 min a 200 °C. Cuando suene el temporizador, saca con cuidado (usa manoplas) y da la vuelta a cada trozo.",
              "intermediate": "Hornea 15 minutos a 200 °C y voltea los trozos.",
              "advanced": "Hornea 15 minutos a 200 °C y voltea."
            }
          },
          {
            "id": "cook2",
            "phaseId": "finish",
            "timerSeconds": 900,
            "timerLabel": "Horno 2.ª mitad",
            "temperatureC": 200,
            "text": {
              "beginner": "Vuelve a meter 12–15 min más. El pollo está listo cuando el interior ya no está rosado (abre el trozo más grueso) y los jugos salen claros; si tienes termómetro, apunta a ~75 °C en el centro. Sirve caliente.",
              "intermediate": "Hornea 12–15 minutos más a 200 °C hasta interior sin rosa y jugos claros (~75 °C); sirve.",
              "advanced": "Termina 12–15 minutos a 200 °C al punto (~75 °C interior) y sirve."
            }
          }
        ],
        "timeMinutes": 30,
        "temperature": "200 °C",
        "temperatureC": 200
      },
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          {
            "id": "prep-b",
            "phaseId": "prep",
            "levels": [
              "beginner"
            ],
            "text": {
              "beginner": "Corta {qty:pollo} en trozos similares. Sécalos. Mézclalos en un bol con {qty:aceite}, sal y pimienta hasta que queden bien untados.",
              "intermediate": "",
              "advanced": ""
            }
          },
          {
            "id": "prep",
            "phaseId": "prep",
            "levels": [
              "intermediate",
              "advanced"
            ],
            "text": {
              "beginner": "",
              "intermediate": "Trocea y sazona el pollo con aceite y sal.",
              "advanced": "Trocea el pollo y sazónalo con aceite y sal."
            }
          },
          {
            "id": "preheat",
            "phaseId": "preheat",
            "temperatureC": 180,
            "text": {
              "beginner": "Precalienta el Air Fryer a 180 °C unos 3 min si tu modelo lo recomienda (muchos van mejor en caliente).",
              "intermediate": "Precalienta el Air Fryer a 180 °C.",
              "advanced": "Precalienta el Air Fryer a 180 °C."
            }
          },
          {
            "id": "arrange",
            "phaseId": "arrange",
            "text": {
              "beginner": "Coloca el pollo en la cestilla en una sola capa. No llenes de más: cocina en dos tandas si hace falta.",
              "intermediate": "Coloca el pollo en capa única en la cestilla.",
              "advanced": "Distribuye el pollo en capa única; no sobrecargues."
            }
          },
          {
            "id": "cook1",
            "phaseId": "cook",
            "timerSeconds": 720,
            "timerLabel": "Air Fryer 1.ª mitad",
            "temperatureC": 180,
            "similarKey": "pollo+airfryer+180C",
            "text": {
              "beginner": "Programa 12 min a 180 °C. Cuando termine, agita la cestilla o da la vuelta a los trozos.",
              "intermediate": "Cocina 12 minutos a 180 °C y agita o voltea la cestilla.",
              "advanced": "Cocina 12 minutos a 180 °C y voltea."
            }
          },
          {
            "id": "cook2",
            "phaseId": "finish",
            "timerSeconds": 780,
            "timerLabel": "Air Fryer 2.ª mitad",
            "temperatureC": 180,
            "text": {
              "beginner": "Otros 10–13 min a 180 °C. Comprueba el trozo más grueso: sin rosa dentro, jugos claros (o ~75 °C). Si falta, 2–3 min más. Sirve.",
              "intermediate": "Cocina 10–13 minutos más a 180 °C hasta punto seguro y sirve.",
              "advanced": "Termina 10–13 minutos a 180 °C al punto y sirve."
            }
          }
        ],
        "timeMinutes": 25,
        "temperature": "180 °C",
        "temperatureC": 180
      }
    ]
  },
  {
    "id": "verduras-air-horno",
    "name": "Verduras asadas",
    "timeMinutes": 20,
    "difficulty": "fácil",
    "dishRole": "guarnicion",
    "pepperTags": [
      "ligero"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "verduras-mixtas",
        "quantity": "1 puñado",
        "amountPerServing": 1,
        "unit": "puñado"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 212,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Verduras con aceite y sal; capa única; 180 °C.",
      "15 min a 180 °C con volteo a mitad; doradas y tiernas."
    ],
    "methods": [
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "timeMinutes": 15,
        "temperature": "180 °C",
        "temperatureC": 180,
        "steps": [
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Corta las verduras en trozos similares si hace falta. Mézclalas con {qty:aceite} y sal. Precalienta Air Fryer a 180 °C. Extiende en una sola capa sin amontonar.",
              "intermediate": "Corta las verduras en trozos similares si hace falta. Mézclalas con {qty:aceite} y sal. Precalienta Air Fryer a 180 °C. Extiende en una sola capa sin amontonar.",
              "advanced": "Distribuye verduras mixtas en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "temperatureC": 180
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Cocina 15 min a 180 °C; agita o voltea a los 7–8 min. Están listas cuando estén doradas en bordes y tiernas al pinchar. Sirve al momento.",
              "intermediate": "Cocina 15 min a 180 °C; agita o voltea a los 7–8 min. Están listas cuando estén doradas en bordes y tiernas al pinchar. Sirve al momento.",
              "advanced": "Distribuye verduras mixtas en una sola capa en la cestilla y cocina en Air Fryer a la temperatura indicada, volteando a mitad, hasta dorado y hecho por dentro."
            },
            "timerSeconds": 900,
            "timerLabel": "Air Fryer",
            "temperatureC": 180
          }
        ]
      },
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "timeMinutes": 25,
        "temperature": "200 °C",
        "temperatureC": 200,
        "steps": [
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Corta las verduras en trozos similares si hace falta. Mézclalas con {qty:aceite} y sal. Precalienta Horno a 200 °C. Extiende en una sola capa sin amontonar.",
              "intermediate": "Corta las verduras en trozos similares si hace falta. Mézclalas con {qty:aceite} y sal. Precalienta Horno a 200 °C. Extiende en una sola capa sin amontonar.",
              "advanced": "Hornea verduras mixtas a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "temperatureC": 200
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Cocina 25 min a 200 °C; da la vuelta a mitad. Están listas cuando estén doradas en bordes y tiernas al pinchar. Sirve al momento.",
              "intermediate": "Cocina 25 min a 200 °C; da la vuelta a mitad. Están listas cuando estén doradas en bordes y tiernas al pinchar. Sirve al momento.",
              "advanced": "Hornea verduras mixtas a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "timerSeconds": 1500,
            "timerLabel": "Horno",
            "temperatureC": 200
          }
        ]
      },
      {
        "id": "sarten",
        "label": "Sartén",
        "equipmentIds": [
          "sarten",
          "vitro"
        ],
        "timeMinutes": 12,
        "steps": [
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Trocea las verduras si hace falta. Ten aceite y sal.",
              "intermediate": "Corta las verduras, úntalas con aceite y sal, y tenlas listas.",
              "advanced": "Corta y sazona las verduras con aceite y sal."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "text": {
              "beginner": "Sartén con aceite a fuego medio-alto: saltea 10–12 min removiendo hasta doradas y tiernas. Sala y sirve.",
              "intermediate": "Saltea 10–12 min a fuego medio-alto hasta tiernas.",
              "advanced": "Sartén con aceite a fuego medio-alto: saltea 10–12 min removiendo hasta doradas y tiernas. Sala y sirve."
            },
            "heatLevel": "medio-alto",
            "termIds": [
              "saltear"
            ],
            "timerSeconds": 660,
            "timerLabel": "Verduras"
          }
        ]
      }
    ]
  },
  {
    "id": "pollo-congelado-air",
    "name": "Pollo congelado en Air Fryer",
    "timeMinutes": 25,
    "difficulty": "media",
    "dishRole": "platoPrincipal",
    "pepperTags": [
      "completo"
    ],
    "fodmap": {
      "level": "low",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pollo-congelado",
        "quantity": "1 pieza",
        "amountPerServing": 1,
        "unit": "pieza"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 216,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Unta el pollo congelado con aceite y sal.",
      "Cocina en Air Fryer a 180 °C ~22 min con volteo a mitad."
    ],
    "methods": [
      {
        "id": "air",
        "label": "Air Fryer",
        "equipmentIds": [
          "airfryer"
        ],
        "steps": [
          {
            "id": "prep",
            "phaseId": "prep",
            "text": {
              "beginner": "Saca el pollo congelado del envase. Úntalo ligeramente con aceite y sal (aunque esté congelado). Ten lista la cestilla del Air Fryer.",
              "intermediate": "Unta el pollo congelado con aceite y sal y prepara la cestilla del Air Fryer.",
              "advanced": "Unta el pollo congelado con aceite y sal y déjalo listo para la cestilla."
            }
          },
          {
            "id": "cook",
            "phaseId": "cook",
            "timerSeconds": 1320,
            "timerLabel": "Air Fryer",
            "temperatureC": 180,
            "similarKey": "pollo-congelado+airfryer+180C",
            "text": {
              "beginner": "Si tu Air Fryer lo recomienda, precalienta a 180 °C unos 3 minutos. Coloca el pollo en una sola capa en la cestilla (sin amontonar). Cocina unos 22 minutos a 180 °C; a mitad de tiempo, dale la vuelta o agita. Está listo cuando esté bien caliente por dentro y dorado por fuera (abre el trozo más grueso: sin zonas frías ni rosadas).",
              "intermediate": "Cocina el pollo en Air Fryer a 180 °C unos 22 minutos en una sola capa, volteando a mitad, hasta dorado y cocinado por dentro.",
              "advanced": "Cocina el pollo en Air Fryer a 180 °C unos 22 minutos en capa única, con volteo a mitad, hasta dorado y punto seguro por dentro."
            }
          }
        ],
        "temperature": "180 °C",
        "timeMinutes": 25
      }
    ]
  },
  {
    "id": "pimientos-horno",
    "name": "Pimientos al horno",
    "timeMinutes": 25,
    "difficulty": "fácil",
    "dishRole": "guarnicion",
    "pepperTags": [
      "especial",
      "ligero"
    ],
    "fodmap": {
      "level": "moderate",
      "note": "Puede depender de la cantidad y tolerancia personal."
    },
    "ingredients": [
      {
        "foodId": "pimiento",
        "quantity": "2 unidades",
        "amountPerServing": 2,
        "unit": "unidad"
      },
      {
        "foodId": "aceite",
        "quantity": "1 cucharada",
        "amountPerServing": 1,
        "unit": "cucharada"
      },
      {
        "foodId": "sal",
        "quantity": "al gusto"
      }
    ],
    "baseServings": 1,
    "imageHue": 49,
    "mealTypes": [
      "comida",
      "cena"
    ],
    "steps": [
      "Pimientos enteros en bandeja con aceite.",
      "200 °C 25 min volteando; piel arrugada y carne tierna."
    ],
    "methods": [
      {
        "id": "horno",
        "label": "Horno",
        "equipmentIds": [
          "horno"
        ],
        "steps": [
          {
            "id": "prep",
            "text": {
              "beginner": "Lava los pimientos. Úntalos ligeramente con aceite y colócalos enteros en una bandeja de horno.",
              "intermediate": "Unta los pimientos con aceite y colócalos enteros en la bandeja del horno.",
              "advanced": "Unta los pimientos con aceite y dispónlos enteros en la bandeja."
            },
            "phaseId": "prep"
          },
          {
            "id": "roast",
            "text": {
              "beginner": "Hornea a 200 °C unos 25 minutos, volteando a mitad. Están listos cuando la piel esté arrugada y la carne tierna.",
              "intermediate": "Hornea a 200 °C unos 25 minutos, volteando a mitad, hasta piel arrugada y carne tierna.",
              "advanced": "Hornea pimiento a la temperatura indicada, volteando a mitad si procede, hasta el punto de cocción."
            },
            "timerSeconds": 1500,
            "timerLabel": "Pimientos",
            "temperatureC": 200,
            "phaseId": "roast"
          }
        ],
        "temperature": "200 °C",
        "timeMinutes": 25
      }
    ]
  }
];
