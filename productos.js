/*
 * CATÁLOGO DE PRODUCTOS (datos de demostración, precios ficticios en ARS)
 *
 * Para actualizar el stock, cambiá solamente el número de "stock".
 * Para agregar un producto, copiá una línea y cambiá sus datos.
 *
 *   id          texto único, sin espacios (ej. "cookie-chips")
 *   nombre      lo que ve el cliente
 *   descripcion frase breve
 *   precio      número entero en pesos, sin puntos ni símbolo (ej. 3500)
 *   categoria   uno de los ids de data/config.js (cafes, frias, medialunas...)
 *   imagen      ruta de la foto, ej. "img/mi-foto.jpg"
 *   stock       unidades disponibles (el cliente NO ve el número, solo el estado)
 */
globalThis.CAFE_PRODUCTOS = [
  // --- Cafés y bebidas calientes ---
  { id: "espresso", nombre: "Espresso", descripcion: "Café intenso de tueste medio, doble carga.", precio: 2500, categoria: "cafes", imagen: "img/espresso.svg", stock: 40 },
  { id: "cortado", nombre: "Cortado", descripcion: "Espresso con un toque de leche texturizada.", precio: 2800, categoria: "cafes", imagen: "img/cortado.svg", stock: 40 },
  { id: "cappuccino", nombre: "Cappuccino", descripcion: "Espresso, leche vaporizada y espuma cremosa.", precio: 3600, categoria: "cafes", imagen: "img/cappuccino.svg", stock: 30 },
  { id: "latte", nombre: "Latte vainilla", descripcion: "Suave y dulce, con syrup artesanal de vainilla.", precio: 3900, categoria: "cafes", imagen: "img/latte.svg", stock: 4 },
  { id: "chocolate-caliente", nombre: "Chocolate caliente", descripcion: "Chocolate semiamargo derretido con leche.", precio: 4200, categoria: "cafes", imagen: "img/chocolate-caliente.svg", stock: 12 },
  { id: "te", nombre: "Té de hebras", descripcion: "Selección de tés en hebras: negro, verde o menta.", precio: 2700, categoria: "cafes", imagen: "img/te.svg", stock: 25 },

  // --- Bebidas frías ---
  { id: "cafe-helado", nombre: "Café helado", descripcion: "Espresso sobre hielo con leche fría.", precio: 4000, categoria: "frias", imagen: "img/cafe-helado.svg", stock: 15 },
  { id: "limonada", nombre: "Limonada con menta", descripcion: "Limón exprimido, menta fresca y jengibre.", precio: 3800, categoria: "frias", imagen: "img/limonada.svg", stock: 3 },
  { id: "jugo-naranja", nombre: "Jugo de naranja", descripcion: "Exprimido en el momento, sin azúcar agregada.", precio: 3500, categoria: "frias", imagen: "img/jugo-naranja.svg", stock: 0 },
  { id: "licuado-frutilla", nombre: "Licuado de frutilla", descripcion: "Frutillas frescas con leche o agua.", precio: 4300, categoria: "frias", imagen: "img/licuado-frutilla.svg", stock: 8 },

  // --- Medialunas y facturas ---
  { id: "medialuna-manteca", nombre: "Medialuna de manteca", descripcion: "Hojaldrada, tierna y con brillo de almíbar.", precio: 1400, categoria: "medialunas", imagen: "img/medialuna-manteca.svg", stock: 24 },
  { id: "medialuna-grasa", nombre: "Medialuna de grasa", descripcion: "La clásica de panadería, más crocante.", precio: 1200, categoria: "medialunas", imagen: "img/medialuna-grasa.svg", stock: 5 },
  { id: "canoncito", nombre: "Cañoncito de dulce de leche", descripcion: "Hojaldre crujiente relleno de dulce de leche.", precio: 1800, categoria: "medialunas", imagen: "img/canoncito.svg", stock: 0 },
  { id: "palmerita", nombre: "Palmerita", descripcion: "Hojaldre caramelizado, dulce y crocante.", precio: 1300, categoria: "medialunas", imagen: "img/palmerita.svg", stock: 18 },

  // --- Cookies y alfajores ---
  { id: "cookie-chips", nombre: "Cookie de chips de chocolate", descripcion: "Borde crocante, centro húmedo y mucho chocolate.", precio: 2600, categoria: "cookies", imagen: "img/cookie-chips.svg", stock: 14 },
  { id: "cookie-avena", nombre: "Cookie de avena y pasas", descripcion: "Con avena, canela y pasas de uva.", precio: 2400, categoria: "cookies", imagen: "img/cookie-avena.svg", stock: 2 },
  { id: "alfajor-maicena", nombre: "Alfajor de maicena", descripcion: "Dulce de leche y coco rallado.", precio: 2200, categoria: "cookies", imagen: "img/alfajor-maicena.svg", stock: 20 },
  { id: "alfajor-chocolate", nombre: "Alfajor de chocolate", descripcion: "Bañado en chocolate semiamargo.", precio: 2800, categoria: "cookies", imagen: "img/alfajor-chocolate.svg", stock: 0 },

  // --- Tortas y porciones ---
  { id: "torta-chocolate", nombre: "Torta de chocolate", descripcion: "Bizcocho húmedo con ganache de chocolate.", precio: 5200, categoria: "tortas", imagen: "img/torta-chocolate.svg", stock: 9 },
  { id: "cheesecake", nombre: "Cheesecake de frutos rojos", descripcion: "Base de galletas y cobertura de frutos rojos.", precio: 5800, categoria: "tortas", imagen: "img/cheesecake.svg", stock: 4 },
  { id: "lemon-pie", nombre: "Lemon pie", descripcion: "Crema de limón y merengue flameado.", precio: 5400, categoria: "tortas", imagen: "img/lemon-pie.svg", stock: 7 },
  { id: "brownie", nombre: "Brownie con nuez", descripcion: "Intenso, con nueces y corazón cremoso.", precio: 3900, categoria: "tortas", imagen: "img/brownie.svg", stock: 0 },

  // --- Combos ---
  { id: "combo-desayuno", nombre: "Combo desayuno", descripcion: "Café a elección + 2 medialunas de manteca.", precio: 5600, categoria: "combos", imagen: "img/combo-desayuno.svg", stock: 12 },
  { id: "combo-merienda", nombre: "Combo merienda", descripcion: "Té o café + cookie del día.", precio: 5000, categoria: "combos", imagen: "img/combo-merienda.svg", stock: 5 },
  { id: "combo-dos", nombre: "Merienda para dos", descripcion: "2 bebidas calientes + porción de torta para compartir.", precio: 11500, categoria: "combos", imagen: "img/combo-dos.svg", stock: 6 },
];
