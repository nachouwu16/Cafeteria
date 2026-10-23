/*
 * ÚNICO punto por donde la web obtiene sus datos.
 *
 * Hoy lee data/config.js y data/productos.js (archivos estáticos que edita
 * el dueño y se publican con GitHub Pages).
 *
 * Para pasar a una base de datos más adelante (ver README, sección
 * "Stock en tiempo real") solo hay que reemplazar el cuerpo de
 * cargarCatalogo() por un fetch a la API. El resto de la web no cambia,
 * siempre que devuelva { config, productos } con el mismo formato.
 */
(function (raiz) {
  async function cargarCatalogo() {
    const config = raiz.CAFE_CONFIG;
    const productos = raiz.CAFE_PRODUCTOS;
    if (!config || !Array.isArray(productos)) {
      throw new Error("No se pudieron cargar data/config.js o data/productos.js");
    }
    return { config, productos };
  }

  raiz.Datos = { cargarCatalogo };
})(globalThis);
