// Pruebas del menú. Ejecutar con:  npm test   (o: node --test tests/*.test.js)
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const raiz = path.join(__dirname, "..");
require(path.join(raiz, "data/config.js"));
require(path.join(raiz, "data/productos.js"));
const Stock = require(path.join(raiz, "js/stock.js"));
const Catalogo = require(path.join(raiz, "js/catalogo.js"));

const config = globalThis.CAFE_CONFIG;
const productos = globalThis.CAFE_PRODUCTOS;

// ---------- Estados de stock ----------
test("stock: 0 unidades es Agotado", () => {
  assert.equal(Stock.estadoStock(0, 5), "agotado");
  assert.equal(Stock.etiquetaEstado("agotado"), "Agotado");
});

test("stock: de 1 a 5 unidades es Últimas unidades (límites incluidos)", () => {
  for (const n of [1, 2, 3, 4, 5]) assert.equal(Stock.estadoStock(n, 5), "ultimas", `con ${n}`);
  assert.equal(Stock.etiquetaEstado("ultimas"), "Últimas unidades");
});

test("stock: más de 5 unidades es Disponible", () => {
  for (const n of [6, 7, 50, 1000]) assert.equal(Stock.estadoStock(n, 5), "disponible", `con ${n}`);
  assert.equal(Stock.etiquetaEstado("disponible"), "Disponible");
});

test("stock: el umbral es configurable", () => {
  assert.equal(Stock.estadoStock(8, 10), "ultimas");
  assert.equal(Stock.estadoStock(11, 10), "disponible");
  assert.equal(Stock.estadoStock(2, 1), "disponible");
  assert.equal(Stock.estadoStock(1, 1), "ultimas");
});

test("stock: si no se pasa umbral usa 5", () => {
  assert.equal(Stock.estadoStock(5), "ultimas");
  assert.equal(Stock.estadoStock(6), "disponible");
});

test("stock: datos inválidos se tratan como Agotado, nunca como Disponible", () => {
  for (const malo of [undefined, null, NaN, -3, "", "abc", Infinity, {}]) {
    assert.equal(Stock.estadoStock(malo, 5), "agotado", `con ${String(malo)}`);
  }
});

test("stock: un número escrito como texto funciona", () => {
  assert.equal(Stock.estadoStock("3", 5), "ultimas");
  assert.equal(Stock.estadoStock("20", 5), "disponible");
});

test("stock: la configuración real usa los umbrales pedidos (5)", () => {
  assert.equal(config.umbralUltimas, 5);
});

// ---------- Búsqueda ----------
test("búsqueda: ignora mayúsculas y tildes", () => {
  const r = Catalogo.filtrar(productos, { texto: "CAÑONCITO" });
  assert.deepEqual(r.map((p) => p.id), ["canoncito"]);
  assert.deepEqual(Catalogo.filtrar(productos, { texto: "canoncito" }).map((p) => p.id), ["canoncito"]);
  assert.deepEqual(Catalogo.filtrar(productos, { texto: "te de hebras" }).map((p) => p.id), ["te"]);
});

test("búsqueda: coincide con parte del nombre y con varias palabras", () => {
  const medialunas = Catalogo.filtrar(productos, { texto: "medialuna" }).map((p) => p.id);
  assert.deepEqual(medialunas.sort(), ["medialuna-grasa", "medialuna-manteca"]);
  assert.deepEqual(Catalogo.filtrar(productos, { texto: "medialuna manteca" }).map((p) => p.id), ["medialuna-manteca"]);
  assert.deepEqual(Catalogo.filtrar(productos, { texto: "manteca medialuna" }).map((p) => p.id), ["medialuna-manteca"]);
});

test("búsqueda: texto vacío o con solo espacios devuelve todo", () => {
  assert.equal(Catalogo.filtrar(productos, { texto: "" }).length, productos.length);
  assert.equal(Catalogo.filtrar(productos, { texto: "   " }).length, productos.length);
  assert.equal(Catalogo.filtrar(productos).length, productos.length);
});

test("búsqueda: sin coincidencias devuelve lista vacía", () => {
  assert.deepEqual(Catalogo.filtrar(productos, { texto: "pizza" }), []);
});

test("búsqueda: busca por nombre, no por descripción", () => {
  // "dulce de leche" está en descripciones, no en nombres, salvo "Cañoncito de dulce de leche".
  const r = Catalogo.filtrar(productos, { texto: "dulce de leche" }).map((p) => p.id);
  assert.deepEqual(r, ["canoncito"]);
});

// ---------- Categorías ----------
test("categorías: cada categoría devuelve solo sus productos", () => {
  for (const c of config.categorias) {
    const r = Catalogo.filtrar(productos, { categoria: c.id });
    assert.ok(r.length > 0, `la categoría ${c.id} está vacía en la demo`);
    assert.ok(r.every((p) => p.categoria === c.id));
  }
});

test("categorías: 'todas' devuelve el catálogo completo", () => {
  assert.equal(Catalogo.filtrar(productos, { categoria: Catalogo.TODAS }).length, productos.length);
});

test("categorías: la suma de todas las categorías es el total", () => {
  const cuenta = Catalogo.contarPorCategoria(productos);
  const suma = Object.values(cuenta).reduce((a, b) => a + b, 0);
  assert.equal(suma, productos.length);
});

test("categorías: una categoría sin productos devuelve lista vacía (la web muestra un mensaje)", () => {
  assert.deepEqual(Catalogo.filtrar(productos, { categoria: "no-existe" }), []);
  assert.deepEqual(Catalogo.filtrar([], { categoria: "cafes" }), []);
});

test("categorías + búsqueda se combinan", () => {
  const r = Catalogo.filtrar(productos, { categoria: "cookies", texto: "alfajor" }).map((p) => p.id);
  assert.deepEqual(r.sort(), ["alfajor-chocolate", "alfajor-maicena"]);
  assert.deepEqual(Catalogo.filtrar(productos, { categoria: "cafes", texto: "alfajor" }), []);
});

// ---------- Agotados siguen en el menú ----------
test("los productos agotados siguen apareciendo al listar y al buscar", () => {
  const agotados = productos.filter((p) => Stock.estadoStock(p.stock, config.umbralUltimas) === "agotado");
  assert.ok(agotados.length >= 3, "la demo debería tener varios agotados");
  const todos = Catalogo.filtrar(productos, {}).map((p) => p.id);
  for (const p of agotados) assert.ok(todos.includes(p.id), `${p.id} desapareció`);
  assert.deepEqual(Catalogo.filtrar(productos, { texto: "brownie" }).map((p) => p.id), ["brownie"]);
});

test("la demo muestra los tres estados", () => {
  const estados = new Set(productos.map((p) => Stock.estadoStock(p.stock, config.umbralUltimas)));
  assert.deepEqual([...estados].sort(), ["agotado", "disponible", "ultimas"]);
});

// ---------- Precio ----------
test("precio: formato en pesos argentinos sin decimales", () => {
  const norm = (s) => s.replace(/\s/g, " ");
  assert.equal(norm(Catalogo.formatearPrecio(3500)), "$ 3.500");
  assert.equal(norm(Catalogo.formatearPrecio(11500)), "$ 11.500");
  assert.equal(norm(Catalogo.formatearPrecio(0)), "$ 0");
});

// ---------- Datos reales del catálogo ----------
test("datos: data/productos.js no tiene errores de carga", () => {
  assert.deepEqual(Catalogo.validarProductos(productos, config.categorias), []);
});

test("datos: cada producto apunta a una imagen que existe", () => {
  for (const p of productos) assert.ok(fs.existsSync(path.join(raiz, p.imagen)), `falta ${p.imagen}`);
});

test("datos: el validador detecta errores comunes", () => {
  const base = { id: "a", nombre: "A", descripcion: "x", precio: 100, categoria: "cafes", imagen: "img/a.svg", stock: 3 };
  const cats = [{ id: "cafes" }];
  assert.deepEqual(Catalogo.validarProductos([base], cats), []);
  assert.equal(Catalogo.validarProductos([{ ...base, categoria: "cafe" }], cats).length, 1, "categoría mal escrita");
  assert.equal(Catalogo.validarProductos([base, base], cats).length, 1, "id repetido");
  assert.equal(Catalogo.validarProductos([{ ...base, precio: "100" }], cats).length, 1, "precio como texto");
  assert.equal(Catalogo.validarProductos([{ ...base, stock: -1 }], cats).length, 1, "stock negativo");
  assert.equal(Catalogo.validarProductos([{ ...base, stock: 2.5 }], cats).length, 1, "stock con decimales");
  assert.equal(Catalogo.validarProductos([{ ...base, nombre: "" }], cats).length, 1, "sin nombre");
});

test("datos: las categorías de config.js tienen id único", () => {
  const ids = config.categorias.map((c) => c.id);
  assert.equal(new Set(ids).size, ids.length);
});

// ---------- Seguridad: nada de edición desde el navegador ----------
test("seguridad: el código del sitio no escribe stock ni usa almacenamiento del navegador", () => {
  for (const archivo of ["js/app.js", "js/datos.js", "js/stock.js", "js/catalogo.js"]) {
    const codigo = fs.readFileSync(path.join(raiz, archivo), "utf8");
    assert.doesNotMatch(codigo, /localStorage|sessionStorage|indexedDB|method:\s*["'](POST|PUT|PATCH|DELETE)/i, archivo);
    assert.doesNotMatch(codigo, /innerHTML|eval\(|document\.write/, `${archivo} usa una API insegura`);
  }
});
