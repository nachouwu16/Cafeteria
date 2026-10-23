/*
 * Lógica de stock. Sin DOM: funciona igual en el navegador y en las pruebas (Node).
 */
(function (raiz, fabrica) {
  const api = fabrica();
  if (typeof module === "object" && module.exports) module.exports = api;
  else raiz.Stock = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const UMBRAL_POR_DEFECTO = 5;

  const ESTADOS = {
    disponible: { clave: "disponible", etiqueta: "Disponible" },
    ultimas: { clave: "ultimas", etiqueta: "Últimas unidades" },
    agotado: { clave: "agotado", etiqueta: "Agotado" },
  };

  /**
   * Devuelve el estado ("disponible" | "ultimas" | "agotado") para una cantidad.
   * Ante un dato inválido (vacío, texto, negativo) se considera agotado:
   * es preferible no prometer un producto que quizá no hay.
   */
  function estadoStock(cantidad, umbralUltimas = UMBRAL_POR_DEFECTO) {
    const n = typeof cantidad === "string" && cantidad.trim() !== "" ? Number(cantidad) : cantidad;
    if (typeof n !== "number" || !Number.isFinite(n) || n < 1) return "agotado";

    const umbral = Number.isFinite(umbralUltimas) && umbralUltimas >= 0 ? umbralUltimas : UMBRAL_POR_DEFECTO;
    return n <= umbral ? "ultimas" : "disponible";
  }

  function etiquetaEstado(estado) {
    return (ESTADOS[estado] || ESTADOS.agotado).etiqueta;
  }

  return { estadoStock, etiquetaEstado, ESTADOS, UMBRAL_POR_DEFECTO };
});
