/*
 * Lógica del catálogo: búsqueda, filtro por categoría, formato de precio
 * y validación de datos. Sin DOM, para poder probarla en Node.
 */
(function (raiz, fabrica) {
  const api = fabrica();
  if (typeof module === "object" && module.exports) module.exports = api;
  else raiz.Catalogo = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const TODAS = "todas";

  /** Minúsculas y sin tildes: "Cañoncito" y "canoncito" coinciden. */
  function normalizar(texto) {
    return String(texto ?? "")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim();
  }

  /**
   * Filtra por categoría y por nombre.
   * - categoria: id de categoría o "todas".
   * - texto: todas las palabras escritas deben aparecer en el nombre.
   * Los productos agotados NO se excluyen: siguen apareciendo en el menú.
   */
  function filtrar(productos, { categoria = TODAS, texto = "" } = {}) {
    const palabras = normalizar(texto).split(/\s+/).filter(Boolean);
    return productos.filter((p) => {
      if (categoria !== TODAS && p.categoria !== categoria) return false;
      const nombre = normalizar(p.nombre);
      return palabras.every((palabra) => nombre.includes(palabra));
    });
  }

  /** Cantidad de productos por categoría (para chequeos y mensajes). */
  function contarPorCategoria(productos) {
    const cuenta = {};
    for (const p of productos) cuenta[p.categoria] = (cuenta[p.categoria] || 0) + 1;
    return cuenta;
  }

  /** Precio en pesos argentinos, ej. 3500 -> "$ 3.500" (según el navegador). */
  function formatearPrecio(valor, { locale = "es-AR", moneda = "ARS" } = {}) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: moneda,
      maximumFractionDigits: 0,
    }).format(valor);
  }

  /**
   * Revisa los datos y devuelve una lista de problemas (vacía = todo bien).
   * Sirve para detectar errores de tipeo al editar data/productos.js.
   */
  function validarProductos(productos, categorias) {
    const errores = [];
    if (!Array.isArray(productos)) return ["productos no es una lista"];
    const idsCategoria = new Set((categorias || []).map((c) => c.id));
    const idsVistos = new Set();

    productos.forEach((p, i) => {
      const donde = `Producto #${i + 1} (${p && p.id ? p.id : "sin id"})`;
      if (!p || typeof p !== "object") return errores.push(`${donde}: no es un objeto`);
      if (!p.id || typeof p.id !== "string") errores.push(`${donde}: falta "id"`);
      else if (idsVistos.has(p.id)) errores.push(`${donde}: "id" repetido`);
      else idsVistos.add(p.id);
      if (!p.nombre) errores.push(`${donde}: falta "nombre"`);
      if (!p.descripcion) errores.push(`${donde}: falta "descripcion"`);
      if (!Number.isFinite(p.precio) || p.precio < 0) errores.push(`${donde}: "precio" debe ser un número`);
      if (!idsCategoria.has(p.categoria)) errores.push(`${donde}: categoría "${p.categoria}" no existe en config.js`);
      if (!p.imagen) errores.push(`${donde}: falta "imagen"`);
      if (!Number.isInteger(p.stock) || p.stock < 0) errores.push(`${donde}: "stock" debe ser un entero de 0 o más`);
    });
    return errores;
  }

  return { TODAS, normalizar, filtrar, contarPorCategoria, formatearPrecio, validarProductos };
});
