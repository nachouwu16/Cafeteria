# Café & Dulce · Menú digital con stock

Página informativa (sin compras ni pedidos) para consultar el menú y la disponibilidad desde el celular, entrando con un código QR. Hecha con HTML, CSS y JavaScript, sin dependencias ni instalación.

## 1. Organización de archivos

```
cafe-y-dulce/
├── index.html            Estructura de la página
├── css/styles.css        Estilos (colores en las variables de :root)
├── js/
│   ├── app.js            Interfaz (dibuja tarjetas, conecta buscador y filtros)
│   ├── stock.js          Lógica de Disponible / Últimas unidades / Agotado
│   ├── catalogo.js       Búsqueda, filtros, precios y validación de datos
│   └── datos.js          ÚNICO punto de entrada de datos (se cambia al usar base de datos)
├── data/
│   ├── config.js         Nombre, frase, categorías y umbral de stock   ← EDITÁS
│   └── productos.js      Productos y cantidades                        ← EDITÁS
├── img/                  Fotos o ilustraciones de los productos
├── tests/menu.test.js    Pruebas automáticas
└── tools/generar-imagenes.js   Genera las ilustraciones de demostración
```

## 2. Probarlo en tu computadora

- **Más simple:** hacé doble clic en `index.html`. Funciona sin servidor.
- **Con servidor local** (recomendado, se parece más a la publicación): en la carpeta ejecutá `python3 -m http.server 8080` y abrí http://localhost:8080.
- Para ver cómo queda en el celular: abrí esa dirección desde el celular conectado al mismo Wi‑Fi, usando la IP de tu computadora (ej. `http://192.168.0.15:8080`).

## 3. Cómo actualizar productos y stock

Todo se hace en **`data/productos.js`**. Cada producto es una línea:

```js
{ id: "latte", nombre: "Latte vainilla", descripcion: "Suave y dulce.", precio: 3900, categoria: "cafes", imagen: "img/latte.svg", stock: 4 },
```

| Quiero… | Qué hago |
|---|---|
| Actualizar el stock | Cambiar el número de `stock` (el cliente ve solo el estado) |
| Marcar algo como agotado | Poner `stock: 0` (sigue apareciendo, marcado como Agotado) |
| Cambiar un precio | Cambiar `precio` (número sin puntos ni `$`) |
| Agregar un producto | Copiar una línea, cambiar el `id` (único) y los datos |
| Quitar un producto | Borrar su línea |
| Usar mi foto | Guardarla en `img/` y poner su ruta en `imagen` |

**Estados** (reglas en `data/config.js`, `umbralUltimas: 5`):
- `stock` 0 → **Agotado**
- `stock` de 1 a 5 → **Últimas unidades**
- `stock` mayor que 5 → **Disponible**

Para cambiar el límite, modificá `umbralUltimas`. Nombre, frase y categorías también están en `data/config.js`. Opcionalmente, `actualizado: "Stock actualizado 16:00"` muestra una nota al pie (la escribís vos a mano).

**Después de editar:** ejecutá `npm test` (necesita Node.js). Si escribiste mal una categoría, repetiste un `id` o falta una imagen, el test te lo indica. Si no tenés Node, abrí la consola del navegador (F12): la página muestra los mismos avisos.

**Fotos:** usá JPG o WebP de unos 800×600 px y menos de 150 KB cada una (con apps como Squoosh.app) para que cargue rápido con datos móviles. Las ilustraciones SVG incluidas son de demostración.

## 4. Subirlo a GitHub y publicar con GitHub Pages

1. Creá una cuenta en https://github.com si no tenés.
2. **New repository** → nombre, por ejemplo, `menu-cafe-y-dulce` → **Public** → Create.
3. Subí los archivos:
   - *Sin comandos:* en el repositorio, **Add file → Upload files**, arrastrá **el contenido** de la carpeta (que `index.html` quede en la raíz) y **Commit changes**.
   - *Con Git:*
     ```bash
     git init
     git add .
     git commit -m "Menú inicial"
     git branch -M main
     git remote add origin https://github.com/TU-USUARIO/menu-cafe-y-dulce.git
     git push -u origin main
     ```
4. En el repositorio: **Settings → Pages**. En *Build and deployment* elegí **Deploy from a branch**, rama **main**, carpeta **/ (root)** → **Save**.
5. Esperá 1–2 minutos y recargá. Arriba aparece la URL pública:
   `https://TU-USUARIO.github.io/menu-cafe-y-dulce/`
6. Cada cambio que subas (editar `data/productos.js` y hacer *Commit*) se publica solo en 1–2 minutos.

> En GitHub podés editar `data/productos.js` directamente desde el celular (ícono del lápiz → Commit). Esa es tu "administración" en esta primera versión.

## 5. Código QR

1. Copiá la URL pública del paso anterior.
2. Generá el QR en un sitio gratuito sin vencimiento (por ejemplo https://www.qrcode-monkey.com o https://qr.io/ en modo *URL estático*). Evitá los QR "dinámicos" de prueba que dejan de funcionar al vencer el plazo.
3. Descargalo en **SVG o PNG grande**, imprimilo mínimo de 3×3 cm y **probalo con dos celulares distintos** antes de imprimir en serie.
4. Si algún día cambiás la URL (por ejemplo, un dominio propio), el QR impreso deja de servir: por eso conviene decidir la URL definitiva antes de imprimir.

## 6. Qué puede y qué no puede hacer esta versión (importante)

- **GitHub Pages es un hosting estático:** sirve archivos, no guarda cambios. El stock **no se actualiza solo** ni se sincroniza entre dispositivos: se actualiza cuando vos editás `data/productos.js` y subís el cambio.
- Los clientes **no pueden modificar el stock**: el navegador solo lee los datos; no existe ninguna función de escritura.
- Los clientes pueden tardar hasta unos minutos en ver un cambio (caché del navegador y de GitHub).
- La página no muestra ni guarda cantidades exactas en pantalla, **pero el número de `stock` sí es visible para quien mire el código fuente** de la web (es un archivo público). Si no querés exponer cantidades reales, usá números "redondeados" a propósito, o pasá a la opción con base de datos de abajo, donde el servidor puede devolver solo el estado.

### Stock en tiempo real (versión futura)

Si querés que el stock se actualice al instante, desde el celular y sin republicar, hace falta una **fuente de datos compartida**, un servicio adicional. Opciones simples y con plan gratuito:

| Servicio | Cómo encaja |
|---|---|
| **Supabase** (base de datos Postgres) | Tabla `productos`. La web lee con permiso de solo lectura; vos editás desde su panel o una pantalla de administración protegida con login. |
| **Firebase Firestore** | Igual, con reglas de seguridad: lectura pública, escritura solo para tu usuario. |
| **Google Sheets publicado** | Planilla que editás desde el celular; la web la lee como CSV. Es lo más económico, pero cualquiera con el enlace puede ver los datos. |

Pasos: (1) crear el servicio y cargar los productos; (2) configurar permisos: **lectura pública, escritura solo con tu cuenta** (nunca dejes la escritura abierta); (3) reemplazar el cuerpo de `cargarCatalogo()` en `js/datos.js` para que haga `fetch` al servicio y devuelva `{ config, productos }` con el mismo formato; (4) opcional, calcular el estado en el servidor para no exponer cantidades. No hace falta tocar `app.js`, `stock.js`, `catalogo.js` ni el diseño.

## 7. Pruebas

```bash
npm test
```

Verifican (26 pruebas): estados de stock en cada límite (0, 1, 5, 6), umbral configurable, datos inválidos, búsqueda sin distinguir mayúsculas ni tildes, filtro por categoría, categoría vacía, combinación de filtros, que los agotados sigan en el menú, formato en pesos, validez de `data/productos.js` y que el código no escriba datos ni use almacenamiento del navegador.

Revisión manual recomendada tras cada cambio grande: abrir el sitio en el celular, tocar cada categoría, buscar un producto agotado y confirmar que se ve claramente "Agotado".
