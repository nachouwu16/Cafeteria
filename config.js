/*
 * CONFIGURACIÓN DEL NEGOCIO
 * Editá este archivo para cambiar el nombre, la frase, las categorías
 * y los umbrales del stock. No hace falta tocar nada más.
 */
globalThis.CAFE_CONFIG = {
  nombre: "Café & Dulce",
  frase: "Café de especialidad y pastelería artesanal, hecho cada mañana.",

  // Texto opcional debajo del menú (ej. "Stock actualizado: 23/10 16:00").
  // Dejalo vacío ("") para no mostrar nada. Lo escribís vos a mano.
  actualizado: "",

  // --- Reglas de stock (ver README) ---
  // Cantidad 0                      -> "Agotado"
  // Cantidad entre 1 y umbralUltimas -> "Últimas unidades"
  // Cantidad mayor que umbralUltimas -> "Disponible"
  umbralUltimas: 5,

  // --- Formato de precios ---
  locale: "es-AR",
  moneda: "ARS",

  // Categorías, en el orden en que se muestran.
  // "id" es el que se usa en productos.js; "nombre" es lo que ve el cliente.
  categorias: [
    { id: "cafes", nombre: "Cafés y bebidas calientes" },
    { id: "frias", nombre: "Bebidas frías" },
    { id: "medialunas", nombre: "Medialunas y facturas" },
    { id: "cookies", nombre: "Cookies y alfajores" },
    { id: "tortas", nombre: "Tortas y porciones" },
    { id: "combos", nombre: "Combos" },
  ],
};
