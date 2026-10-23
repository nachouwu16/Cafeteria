/*
 * Genera las ilustraciones SVG de demostración que hay en /img.
 * Son dibujos originales y livianos (unos pocos KB) que sirven de reemplazo
 * hasta que tengas tus propias fotos. Uso:  node tools/generar-imagenes.js
 *
 * Para usar fotos reales: guardalas en /img (JPG/WebP de unos 800x600 px,
 * menos de 150 KB) y cambiá el campo "imagen" en data/productos.js.
 */
const fs = require("fs");
const path = require("path");
const salida = path.join(__dirname, "..", "img");

const envolver = (fondo, contenido) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">` +
  `<rect width="400" height="300" fill="${fondo}"/>${contenido}</svg>\n`;

const sombra = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx / 8}" fill="#3b2417" opacity=".12"/>`;

// ---- Piezas reutilizables (cada una devuelve un grupo SVG) ----
function taza({ liquido = "#4a2b1b", pocillo = "#ffffff", espuma = null, vapor = true } = {}) {
  return `
  ${sombra(200, 246, 125)}
  <ellipse cx="200" cy="232" rx="112" ry="16" fill="#f0e4cf"/>
  <path d="M278 138h14a26 26 0 0 1 0 52h-22" fill="none" stroke="${pocillo}" stroke-width="13" stroke-linecap="round"/>
  <path d="M120 120h160v42c0 40-34 68-80 68s-80-28-80-68z" fill="${pocillo}"/>
  <path d="M120 120h160v8c0 3-2 5-5 5H125c-3 0-5-2-5-5z" fill="#000" opacity=".05"/>
  <ellipse cx="200" cy="121" rx="80" ry="13" fill="#e9dcc6"/>
  <ellipse cx="200" cy="123" rx="72" ry="10" fill="${liquido}"/>
  ${espuma ? `<ellipse cx="200" cy="122" rx="58" ry="7" fill="${espuma}"/><path d="M200 117c-8 3-8 8 0 10 8-2 8-7 0-10z" fill="${liquido}" opacity=".55"/>` : ""}
  ${vapor ? `<g fill="none" stroke="#a88f7c" stroke-width="5" stroke-linecap="round" opacity=".55">
    <path d="M170 96c-10-12 10-18 0-32"/><path d="M200 92c-10-12 10-18 0-32"/><path d="M230 96c-10-12 10-18 0-32"/></g>` : ""}`;
}

function vaso({ liquido, hielo = true, guarnicion = null, popote = "#b9803f", crema = null } = {}) {
  const cubos = hielo
    ? `<g fill="#fff" opacity=".6"><rect x="165" y="116" width="34" height="34" rx="7" transform="rotate(-12 182 133)"/>
       <rect x="205" y="150" width="34" height="34" rx="7" transform="rotate(10 222 167)"/>
       <rect x="170" y="190" width="30" height="30" rx="7" transform="rotate(8 185 205)"/></g>` : "";
  return `
  ${sombra(200, 252, 78)}
  <path d="M232 40l22 -14" stroke="${popote}" stroke-width="9" stroke-linecap="round"/>
  <path d="M232 40L206 200" stroke="${popote}" stroke-width="9" stroke-linecap="round"/>
  <path d="M143 78h114l-11 168c-.6 6-5 10-11 10h-70c-6 0-10.400-4-11-10z" fill="#fff" opacity=".55"/>
  <path d="M147 112h106l-8 134c-.5 6-5 10-11 10h-68c-6 0-10.500-4-11-10z" fill="${liquido}"/>
  ${crema ? `<path d="M147 112h106l-1 14c-30 8-74 8-104 0z" fill="${crema}"/>` : ""}
  ${cubos}
  <path d="M143 78h114l-11 168c-.6 6-5 10-11 10h-70c-6 0-10.400-4-11-10z" fill="none" stroke="#d9c9ae" stroke-width="3"/>
  <path d="M158 92l8 140" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".5"/>
  ${guarnicion || ""}`;
}

function medialuna({ masa = "#d9913f", brillo = "#f1b866", sombraTono = "#a8651f" } = {}) {
  return `
  ${sombra(200, 232, 135)}
  <path d="M62 196C74 118 134 72 200 72s126 46 138 124c-22-18-40-20-58-6-18-22-42-26-80-26s-62 4-80 26c-18-14-36-12-58 6z" fill="${masa}"/>
  <path d="M62 196C74 118 134 72 200 72s126 46 138 124c-4-3-8-6-12-8-10-60-62-98-126-98S84 128 74 188c-4 2-8 5-12 8z" fill="${sombraTono}" opacity=".25"/>
  <g fill="none" stroke="${sombraTono}" stroke-width="5" stroke-linecap="round" opacity=".6">
    <path d="M160 82c-6 28-8 56-6 84"/><path d="M200 76v92"/><path d="M240 82c6 28 8 56 6 84"/></g>
  <path d="M110 128c16-28 46-42 78-44" fill="none" stroke="${brillo}" stroke-width="9" stroke-linecap="round" opacity=".75"/>`;
}

function canoncito() {
  return `
  ${sombra(200, 232, 135)}
  <g transform="rotate(-18 200 150)">
    <path d="M70 120c0-18 10-30 22-30h216c12 0 22 12 22 30v60c0 18-10 30-22 30H92c-12 0-22-12-22-30z" fill="#d9913f"/>
    <g fill="none" stroke="#a8651f" stroke-width="5" opacity=".55"><path d="M120 95v110"/><path d="M165 92v116"/><path d="M210 92v116"/><path d="M255 92v116"/></g>
    <ellipse cx="318" cy="150" rx="20" ry="32" fill="#8a4b19"/>
    <ellipse cx="318" cy="150" rx="12" ry="22" fill="#b97a2b"/>
    <ellipse cx="82" cy="150" rx="20" ry="32" fill="#8a4b19"/>
    <ellipse cx="82" cy="150" rx="12" ry="22" fill="#b97a2b"/>
  </g>`;
}

function palmerita() {
  const corazon = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})">
    <path d="M0 -62c-34-48-98-20-82 34 10 32 52 56 82 70 30-14 72-38 82-70 16-54-48-82-82-34z" fill="#d9913f"/>
    <path d="M0 -50c-22-28-62-12-54 22 6 22 34 38 54 48" fill="none" stroke="#a8651f" stroke-width="6" stroke-linecap="round" opacity=".55"/>
    <path d="M0 -50c22-28 62-12 54 22-6 22-34 38-54 48" fill="none" stroke="#a8651f" stroke-width="6" stroke-linecap="round" opacity=".55"/>
    <path d="M-52 -34c10-10 24-12 34-4" fill="none" stroke="#f1b866" stroke-width="7" stroke-linecap="round"/></g>`;
  return `${sombra(200, 244, 120)}${corazon(140, 150, -12)}${corazon(268, 168, 14)}`;
}

function cookie({ masa = "#c98a4b", chips = "#3b2417", pasas = false } = {}) {
  const puntos = [[150, 120], [215, 105], [250, 160], [180, 170], [125, 180], [225, 215], [165, 230], [262, 118], [200, 138], [140, 150], [250, 200]];
  const puntosSvg = puntos
    .map(([x, y], i) => pasas
      ? `<ellipse cx="${x}" cy="${y}" rx="11" ry="8" fill="#5a2b4a" transform="rotate(${i * 37} ${x} ${y})"/>`
      : `<path d="M${x - 10} ${y}l10-10 11 8-3 12-14 2z" fill="${chips}" transform="rotate(${i * 29} ${x} ${y})"/>`)
    .join("");
  return `
  ${sombra(200, 252, 105)}
  <circle cx="200" cy="160" r="98" fill="${masa}"/>
  <path d="M110 128a98 98 0 0 1 180-8" fill="none" stroke="#e8b673" stroke-width="9" stroke-linecap="round" opacity=".6"/>
  <circle cx="200" cy="160" r="98" fill="none" stroke="#8a5224" stroke-width="5" opacity=".35"/>
  ${puntosSvg}`;
}

function alfajor({ tapa = "#e6c28b", cobertura = null, relleno = "#8a4b19", coco = false } = {}) {
  const col = cobertura || tapa;
  return `
  ${sombra(200, 250, 125)}
  <rect x="90" y="156" width="220" height="40" rx="18" fill="${relleno}"/>
  <path d="M86 196h228v14c0 22-24 38-114 38S86 232 86 210z" fill="${col}"/>
  <path d="M86 156v-14c0-22 24-38 114-38s114 16 114 38v14z" fill="${col}"/>
  <ellipse cx="200" cy="142" rx="114" ry="26" fill="${col}"/>
  ${coco
      ? `<g fill="#fff" opacity=".9"><circle cx="100" cy="176" r="4"/><circle cx="130" cy="188" r="4"/><circle cx="170" cy="182" r="4"/><circle cx="215" cy="190" r="4"/><circle cx="255" cy="182" r="4"/><circle cx="292" cy="176" r="4"/></g>`
      : ""}
  <path d="M120 128c28-12 80-14 120-4" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".3"/>`;
}

function torta({ capas = ["#5a2f1d", "#8a5236", "#5a2f1d"], cobertura = "#3b2417", decoracion = "" } = {}) {
  return `
  ${sombra(200, 252, 130)}
  <ellipse cx="200" cy="234" rx="120" ry="16" fill="#f0e4cf"/>
  <rect x="118" y="172" width="164" height="54" rx="10" fill="${capas[2]}"/>
  <rect x="118" y="142" width="164" height="30" fill="${capas[1]}"/>
  <rect x="118" y="108" width="164" height="36" fill="${capas[0]}"/>
  <path d="M112 104h176v12c-12 6-18-4-30 4s-20 0-32 6-20-2-32 4-20 0-32 6-22-6-34 2-14-4-16-4z" fill="${cobertura}"/>
  ${decoracion}`;
}

const frutos = `<g><circle cx="150" cy="98" r="13" fill="#b3203a"/><circle cx="182" cy="92" r="12" fill="#8a1530"/><circle cx="214" cy="98" r="13" fill="#c9304a"/><circle cx="246" cy="94" r="12" fill="#6b2a6e"/>
  <path d="M150 85l4-8M214 85l4-8" stroke="#2f6b2a" stroke-width="4" stroke-linecap="round"/></g>`;
const merengue = `<g fill="#fff6e0"><path d="M126 106c4-22 20-22 24-6 6-22 24-22 28-2 6-22 26-22 30-2 6-20 24-20 28 0 6-18 24-16 26 6z"/></g>
  <g fill="#f5d98a" opacity=".7"><circle cx="154" cy="92" r="4"/><circle cx="196" cy="88" r="4"/><circle cx="238" cy="90" r="4"/></g>`;
const nueces = `<g fill="#b98550"><path d="M140 100c6-10 18-10 22 0-6 8-16 8-22 0z"/><path d="M190 94c6-10 18-10 22 0-6 8-16 8-22 0z"/><path d="M236 100c6-10 18-10 22 0-6 8-16 8-22 0z"/></g>`;

function brownie() {
  return `
  ${sombra(200, 252, 120)}
  <ellipse cx="200" cy="236" rx="116" ry="16" fill="#f0e4cf"/>
  <path d="M110 150l86-34 96 28v60l-96 34-86-30z" fill="#3b2417"/>
  <path d="M110 150l86-34 96 28-92 32z" fill="#5a3322"/>
  <path d="M110 150l90 26v66l-90-30z" fill="#2a190f"/>
  <g fill="#b98550"><path d="M158 140c6-8 16-6 18 2-6 7-14 6-18-2z"/><path d="M210 136c6-8 16-6 18 2-6 7-14 6-18-2z"/><path d="M246 152c6-8 16-6 18 2-6 7-14 6-18-2z"/></g>
  <path d="M120 156l70 20" stroke="#8a5236" stroke-width="5" stroke-linecap="round" opacity=".6"/>`;
}

function cheesecake() {
  return torta({
    capas: ["#fbe7e0", "#fff3df", "#fff3df"],
    cobertura: "#b3203a",
    decoracion: frutos,
  }).replace('<rect x="118" y="172" width="164" height="54" rx="10" fill="#fff3df"/>',
    '<rect x="118" y="196" width="164" height="30" rx="8" fill="#a8651f"/><rect x="118" y="172" width="164" height="26" fill="#fff3df"/>');
}

const juntar = (...partes) => partes.join("");
const escala = (g, x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${g}</g>`;

// ---- Catálogo de ilustraciones ----
const ilustraciones = {
  logo: null, // se genera aparte
  espresso: envolver("#f3e4cb", escala(taza({ liquido: "#3a1f12" }), 25, 20, 0.88)),
  cortado: envolver("#efe2cd", escala(taza({ liquido: "#6b4128", espuma: "#d9b78f" }), 25, 20, 0.9)),
  cappuccino: envolver("#f1e2c8", taza({ liquido: "#6b4128", espuma: "#f4e7d3" })),
  latte: envolver("#f5e8d0", taza({ liquido: "#a9794f", espuma: "#f7ecd9", pocillo: "#fdf9f1" })),
  "chocolate-caliente": envolver("#ecdcc5", taza({ liquido: "#3b1f14", espuma: "#f2e3cf", pocillo: "#e9c9a3" })),
  te: envolver("#e9eadb", taza({ liquido: "#c58a2e", pocillo: "#f7f4ea" })),
  "cafe-helado": envolver("#e9e0d0", vaso({ liquido: "#6b4128", crema: "#e7d2b0" })),
  limonada: envolver("#e8efd9", vaso({
    liquido: "#f1e27a",
    popote: "#7fae57",
    guarnicion: `<circle cx="258" cy="86" r="26" fill="#f4d94a"/><circle cx="258" cy="86" r="19" fill="#fbef9c"/><path d="M258 67v38M239 86h38M245 72l26 28M271 72l-26 28" stroke="#f4d94a" stroke-width="3"/>
      <path d="M150 74c-14-20 6-26 18-14 8 8-6 20-18 14z" fill="#4f9a4a"/><path d="M168 70c-6-24 20-26 24-10-4 10-18 14-24 10z" fill="#3f8a3c"/>`,
  })),
  "jugo-naranja": envolver("#f7e6c6", vaso({
    liquido: "#f08a1c", hielo: false, popote: "#f4d94a",
    guarnicion: `<circle cx="262" cy="84" r="28" fill="#f08a1c"/><circle cx="262" cy="84" r="21" fill="#f8b653"/><path d="M262 63v42M241 84h42M247 69l30 30M277 69l-30 30" stroke="#f08a1c" stroke-width="3"/>`,
  })),
  "licuado-frutilla": envolver("#f6e3e0", vaso({
    liquido: "#ee8fa3", hielo: false, popote: "#b3203a", crema: "#fbd3dc",
    guarnicion: `<path d="M262 84c-26 4-30 34-6 50 26-8 32-42 6-50z" fill="#c9304a"/><path d="M252 78l10-12 10 12" fill="#3f8a3c" stroke="#3f8a3c" stroke-width="4" stroke-linejoin="round"/>`,
  })),
  "medialuna-manteca": envolver("#f4e4c9", medialuna()),
  "medialuna-grasa": envolver("#efdcc0", medialuna({ masa: "#c77f2d", brillo: "#e3a95a", sombraTono: "#8f5316" })),
  canoncito: envolver("#f3e3c6", canoncito()),
  palmerita: envolver("#f2e2c8", palmerita()),
  "cookie-chips": envolver("#f1e1c7", cookie()),
  "cookie-avena": envolver("#efe2cb", cookie({ masa: "#d2a468", pasas: true })),
  "alfajor-maicena": envolver("#f4e6cd", alfajor({ tapa: "#f0d9a9", coco: true, relleno: "#b46a26" })),
  "alfajor-chocolate": envolver("#eadccb", alfajor({ cobertura: "#3b2417", relleno: "#b46a26" })),
  "torta-chocolate": envolver("#efe0cd", torta({ decoracion: nueces.replace(/#b98550/g, "#d9b78f") })),
  cheesecake: envolver("#f5e4e0", cheesecake()),
  "lemon-pie": envolver("#f6ecc9", torta({ capas: ["#f4e27a", "#f1d95a", "#f4e27a"], cobertura: "#fff3df", decoracion: merengue })),
  brownie: envolver("#eadccb", brownie()),
  "combo-desayuno": envolver("#f3e3c8", juntar(escala(taza({ liquido: "#4a2b1b", vapor: false }), -60, 40, 0.72), escala(medialuna(), 130, 90, 0.5), escala(medialuna(), 150, 150, 0.5))),
  "combo-merienda": envolver("#efe3cd", juntar(escala(taza({ liquido: "#c58a2e", pocillo: "#f7f4ea", vapor: false }), -60, 40, 0.72), escala(cookie(), 130, 56, 0.62))),
  "combo-dos": envolver("#f0e1cb", juntar(escala(taza({ liquido: "#6b4128", espuma: "#f4e7d3", vapor: false }), -90, 30, 0.6), escala(taza({ liquido: "#4a2b1b", vapor: false }), 40, 30, 0.6), escala(torta({ decoracion: frutos }).replace(/#3b2417/g, "#3b2417"), 50, 98, 0.62))),
};

const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <circle cx="32" cy="32" r="31" fill="#5b3a29"/>
  <circle cx="32" cy="32" r="27" fill="none" stroke="#e9d2a8" stroke-width="1.5"/>
  <path d="M19 30h24v6c0 7-5 12-12 12s-12-5-12-12z" fill="#fbf5ea"/>
  <path d="M43 32h3a4 4 0 0 1 0 8h-4" fill="none" stroke="#fbf5ea" stroke-width="3" stroke-linecap="round"/>
  <path d="M26 24c-3-3 3-5 0-9M33 24c-3-3 3-5 0-9M40 24c-3-3 3-5 0-9" fill="none" stroke="#e9d2a8" stroke-width="2.2" stroke-linecap="round"/>
</svg>\n`;

fs.mkdirSync(salida, { recursive: true });
fs.writeFileSync(path.join(salida, "logo.svg"), logo);
for (const [nombre, svg] of Object.entries(ilustraciones)) {
  if (svg) fs.writeFileSync(path.join(salida, `${nombre}.svg`), svg);
}
console.log(`Listo: ${Object.keys(ilustraciones).length} archivos en ${salida}`);
