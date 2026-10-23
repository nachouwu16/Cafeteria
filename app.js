/*
 * Interfaz: dibuja categorías y tarjetas, y conecta buscador y filtros.
 * La lógica de stock y de filtrado vive en stock.js y catalogo.js.
 */
(async function () {
  const $ = (id) => document.getElementById(id);
  const el = (etiqueta, clase, texto) => {
    const nodo = document.createElement(etiqueta);
    if (clase) nodo.className = clase;
    if (texto !== undefined) nodo.textContent = texto;
    return nodo;
  };

  const ICONOS = {
    disponible: "M5 12.5l4.5 4.5L19 7.5",
    ultimas: "M12 7v6m0 4h.01",
    agotado: "M7 7l10 10M17 7L7 17",
  };

  function insignia(estado, etiqueta) {
    const nodo = el("span", `insignia insignia--${estado}`);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "14");
    svg.setAttribute("height", "14");
    svg.setAttribute("aria-hidden", "true");
    const trazo = document.createElementNS("http://www.w3.org/2000/svg", "path");
    trazo.setAttribute("d", ICONOS[estado]);
    trazo.setAttribute("fill", "none");
    trazo.setAttribute("stroke", "currentColor");
    trazo.setAttribute("stroke-width", "3");
    trazo.setAttribute("stroke-linecap", "round");
    trazo.setAttribute("stroke-linejoin", "round");
    svg.appendChild(trazo);
    nodo.append(svg, document.createTextNode(etiqueta));
    return nodo;
  }

  function tarjeta(producto, config) {
    const estado = Stock.estadoStock(producto.stock, config.umbralUltimas);
    const etiqueta = Stock.etiquetaEstado(estado);

    const li = el("li", `tarjeta tarjeta--${estado}`);
    li.dataset.id = producto.id;
    li.dataset.estado = estado;

    const figura = el("div", "tarjeta-imagen");
    const img = el("img");
    img.src = producto.imagen;
    img.alt = estado === "agotado" ? `${producto.nombre} (agotado)` : producto.nombre;
    img.width = 400;
    img.height = 300;
    img.loading = "lazy";
    img.decoding = "async";
    figura.appendChild(img);
    if (estado === "agotado") figura.appendChild(el("span", "cinta", "Agotado"));

    const cuerpo = el("div", "tarjeta-cuerpo");
    cuerpo.appendChild(el("h3", "tarjeta-nombre", producto.nombre));
    cuerpo.appendChild(el("p", "tarjeta-desc", producto.descripcion));

    const pie = el("div", "tarjeta-pie");
    pie.appendChild(el("span", "precio", Catalogo.formatearPrecio(producto.precio, config)));
    pie.appendChild(insignia(estado, etiqueta));
    cuerpo.appendChild(pie);

    li.append(figura, cuerpo);
    return li;
  }

  let catalogo;
  try {
    catalogo = await Datos.cargarCatalogo();
  } catch (e) {
    console.error(e);
    const caja = $("error");
    caja.textContent = "No pudimos cargar el menú. Probá recargar la página.";
    caja.hidden = false;
    return;
  }

  const { config, productos } = catalogo;
  const problemas = Catalogo.validarProductos(productos, config.categorias);
  problemas.forEach((p) => console.warn("[Menú] " + p));

  document.title = `${config.nombre} · Menú`;
  $("nombre-negocio").textContent = config.nombre;
  $("frase-negocio").textContent = config.frase;
  if (config.actualizado) $("actualizado").textContent = config.actualizado;
  else $("actualizado").hidden = true;

  const estado = { categoria: Catalogo.TODAS, texto: "" };
  const nombreCategoria = (id) => (config.categorias.find((c) => c.id === id) || {}).nombre || "";

  // Botones de categoría
  const listaCategorias = $("categorias");
  const botones = [{ id: Catalogo.TODAS, nombre: "Todo" }, ...config.categorias].map((c) => {
    const li = el("li");
    const b = el("button", "chip", c.nombre);
    b.type = "button";
    b.dataset.categoria = c.id;
    b.addEventListener("click", () => {
      estado.categoria = c.id;
      dibujar();
      b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    });
    li.appendChild(b);
    listaCategorias.appendChild(li);
    return b;
  });

  function dibujar() {
    botones.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.categoria === estado.categoria)));

    const visibles = Catalogo.filtrar(productos, estado);
    const lista = $("productos");
    lista.replaceChildren(...visibles.map((p) => tarjeta(p, config)));

    const vacio = visibles.length === 0;
    $("vacio").hidden = !vacio;
    lista.hidden = vacio;

    const buscando = estado.texto.trim() !== "";
    if (vacio) {
      $("vacio-mensaje").textContent = buscando
        ? `No encontramos productos que coincidan con “${estado.texto.trim()}”${estado.categoria === Catalogo.TODAS ? "" : ` en ${nombreCategoria(estado.categoria)}`}.`
        : "Por ahora no hay productos en esta categoría.";
      $("resumen").textContent = "Sin resultados";
    } else {
      const n = visibles.length;
      $("resumen").textContent = `${n} ${n === 1 ? "producto" : "productos"}`;
    }
  }

  $("buscador").addEventListener("input", (e) => {
    estado.texto = e.target.value;
    dibujar();
  });
  $("vacio-limpiar").addEventListener("click", () => {
    estado.categoria = Catalogo.TODAS;
    estado.texto = "";
    $("buscador").value = "";
    dibujar();
  });

  dibujar();
})();
