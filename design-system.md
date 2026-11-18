# GastoPro — Design System

**Fuente de la verdad para todo el trabajo visual de `apps/web`.** Spec original provisto por Simón (2026-09-24), inspirado en Apple HIG. Reconciliado con el código el 2026-10-10: desde esa fecha, si el código y este documento no coinciden, manda este documento — salvo que se decida explícitamente cambiarlo (y entonces se actualiza acá primero).

Usar los valores tal cual. No reinterpretarlos.

## Filosofía
"La interfaz acompaña al contenido, no compite con él." Claridad antes que decoración, datos fáciles de leer, acciones primarias evidentes, uso moderado del color, profundidad sutil, diseño consistente desktop/mobile.

## Idioma
Toda la UI está en **inglés** por ahora: textos, placeholders, `aria-label`, estados vacíos y locale de `Intl` (`'en'`; ver la decisión abierta en "Formato de valores"). Los mockups pueden venir con textos en español — se copia el diseño, no el idioma.

## Cómo se usan los tokens
Los tokens viven en el bloque `@theme` de [`apps/web/src/styles.css`](apps/web/src/styles.css) (Tailwind v4). Tailwind genera las utilidades a partir del nombre de la variable:

| Variable | Utilidad |
|---|---|
| `--color-X` | `bg-X`, `text-X`, `border-X`, `ring-X`, `divide-X`… |
| `--radius-X` | `rounded-X` |
| `--shadow-X` | `shadow-X` |
| `--text-X` | `text-X` (tamaño) |

Por eso algunos nombres se duplican: `--color-bg-surface` → `bg-bg-surface`, `--color-text-primary` → `text-text-primary`.

Reglas:
- Usar siempre el token. No escribir hex a mano en templates (`bg-[#…]`) si existe un token; si un color se repite y no tiene token, se agrega al `@theme`.
- Excepciones aceptadas: valores que una librería pide en TypeScript (tema de AG Grid) y la sombra del botón primario (ver Botones).

## Paleta de colores

**Fondo**
```
--color-bg-app:          #E4E8EE   → canvas (2026-10-10: oscurecido desde #F5F7FA para que el gris sea evidente, ver "Superficies y composición")
--color-bg-surface:      #FFFFFF
--color-bg-surface-soft: #F8FAFC
--color-bg-muted:        #EEF2F7
--color-bg-hover:        #F1F6FF   → hover de filas, items de dropdown, items de navegación
```

**Azul principal**
```
--color-primary:        #0A84FF
--color-primary-hover:  #0071E3
--color-primary-soft:     #E8F2FF   → fondos azules suaves
--color-primary-selected: #D6E9FF   → fondo de elemento seleccionado (sidebar, opciones de dropdown, fila seleccionada de AG Grid). Agregado 2026-10-10: primary-soft no se distinguía sobre blanco
--color-primary-border: #B9D8FF   → solo bordes (hover de inputs/botones); no como fondo
```

**Texto**
```
--color-text-primary:   #111827
--color-text-secondary: #475569
--color-text-tertiary:  #94A3B8
--color-text-disabled:  #CBD5E1
```

**Bordes**
```
--color-border-light:  #E5EAF1   → divisores, bordes de cards y dropdowns
--color-border-medium: #D7DEE8   → bordes de inputs y botones
--color-border-focus:  #0A84FF
```

**Estados**
```
--color-success: #22C55E / --color-success-soft: #DCFCE7
--color-danger:  #EF4444 / --color-danger-soft:  #FEE2E2
--color-warning: #F59E0B / --color-warning-soft: #FEF3C7
```

**Categorías — paleta fija**
```
Food:          --color-cat-food: #F43F5E          / soft: #FFE4EA
Transport:     --color-cat-transport: #3B82F6     / soft: #DBEAFE
Home:          --color-cat-home: #10B981          / soft: #D1FAE5
Subscriptions: --color-cat-subscriptions: #8B5CF6 / soft: #EDE9FE
Entertainment: --color-cat-entertainment: #F59E0B / soft: #FEF3C7
Health:        --color-cat-health: #14B8A6        / soft: #CCFBF1
Other:         --color-cat-other: #64748B         / soft: #E2E8F0
```
Las categorías del usuario guardan su propio `color` e `icon` en la base de datos, así que **el badge no usa esta paleta**: deriva los tonos del color guardado (ver CategoryBadge). Esta paleta queda para colores por defecto/sugeridos y para gráficos de categorías fijas.

**Paleta del selector de color de categoría** *(decidido 2026-11-02)*: **10 colores** — los 7 de arriba más **fucsia `#D946EF`, lima `#84CC16` y marrón `#92400E`**, elegidos por huecos de matiz y de luminosidad respecto de los existentes. Cada uno lleva su nombre como etiqueta accesible (rose, blue, emerald, violet, amber, teal, slate, fuchsia, lime, brown). Pendiente: probar el contraste del lima en `CategoryBadge` y `CategoryAvatar` (si no alcanza, reemplazarlo por un naranja `#F97316`) y agregar los tres nuevos al `@theme` con su `-soft`. La lista vive como pares **nombre + hex** (el nombre es la etiqueta accesible de cada círculo) dentro de `CategoryQuickCreate` por ahora. Sin hex personalizado en esta versión.

## Sombras (muy sutiles, nunca duras/negras)
```
--shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.04)   → cards, inputs, botones
--shadow-sm: 0 4px 12px rgba(15, 23, 42, 0.06)  → cards destacadas, logo
--shadow-md: 0 12px 28px rgba(15, 23, 42, 0.10) → dropdowns/popovers
--shadow-lg: 0 24px 60px rgba(15, 23, 42, 0.16) → modals/bottom sheets
```
Con el canvas más oscuro (ver "Superficies y composición") las cards pasan de `shadow-xs` a `shadow-sm`; `shadow-xs` queda para inputs, botones y controles. Los valores de `--shadow-*` se calibran mirando la pantalla con el canvas nuevo y se ajustan en el `@theme`; **no se agregan niveles nuevos**. Se mantiene el tinte frío `rgba(15, 23, 42, …)`.

## Radios
Reemplazan la escala por defecto de Tailwind — **`rounded-xl` es 24px, no 12px**.
```
--radius-sm: 8px    → rounded-sm
--radius-md: 12px   → rounded-md   → inputs, botones, logo
--radius-lg: 16px   → rounded-lg   → cards, formularios, category badge
--radius-xl: 24px   → rounded-xl   → modals, bottom sheets (24px 24px 0 0)
pills: rounded-full (default de Tailwind, no es token)
```
Valores fuera de escala usados a propósito:
- `rounded-[14px]` → contenedor de dropdown.
- `rounded-[10px]` → items de lista de 44px (items de dropdown, items del sidebar).

## Tipografía
Font stack (`--font-sans`): `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Segoe UI", sans-serif`.

Escala desktop (reemplaza la de Tailwind; `text-md` es agregado):
```
text-xs 12 / text-sm 14 / text-md 15 / text-base 16 / text-lg 18 / text-xl 22 / text-2xl 28 / text-3xl 34
```
Uso:
- Labels de formulario: 13px → `text-[13px] text-text-secondary`
- Inputs, items de lista, navegación: 14px → `text-sm`
- Valor del selector de mes: 15px `font-medium` → `text-md`
- Tabla: 13px
- Título de card 13px, monto de card 24px, título de sección 18-22px, título de modal 20-22px.

Escala mobile: label 12 / body 14 / input 14 / title 20 / amount 24 / large-amount 28. No bajar de 12px.

## Espaciado (escala de 4px)
`--spacing: 0.25rem` está fijado en el `@theme`, así que las utilidades de Tailwind siguen la escala: `p-1` = 4px … `p-10` = 40px.

Reglas: label→input 6px (`gap-1.5`); padding horizontal de input 12px (`px-3`); padding card 16-20px (`p-4`/`p-5`); separación entre cards 12-16px; separación entre controles de una misma barra 8px (`gap-2`); padding modal desktop 24px; padding bottom sheet mobile 20px.

## Estados de interacción
Regla común para todo elemento interactivo (navegación, opciones de lista, botones de ícono, inputs):

| Estado | Estilo |
|---|---|
| Normal | texto/ícono `text-text-secondary` (opciones de dropdown: `text-text-primary`) |
| Hover | fondo `bg-bg-hover` + `text-primary`. En controles con borde: `border-primary-border` |
| Seleccionado | `bg-primary-selected` + `text-primary` + `font-semibold` (+ check de 16px en dropdowns) |
| Abierto (dropdown) | borde `border-border-focus` |
| Foco de teclado | `focus-visible:outline-none` + `ring-4 ring-primary/12` (+ `border-border-focus` si tiene borde) |
| Foco dentro de un input | el ícono que lo acompaña pasa a `text-primary` (`group` + `group-focus-within:text-primary`) |
| Deshabilitado | `text-text-disabled`, sin hover, `cursor-default` |

`ring-primary/12` equivale al `box-shadow: 0 0 0 4px rgba(10,132,255,0.12)` del spec original.

Accesibilidad: botones sin texto llevan `aria-label`; el item de navegación activo lleva `aria-current="page"`; listas de opciones usan `role="listbox"` / `role="option"` + `aria-selected`.

## Botones
- **Primario** (Add Expense, Create Expense, Create Category): `h-11 rounded-md bg-primary px-4 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(10,132,255,0.22)] hover:bg-primary-hover`. Deshabilitado (ej. mientras guarda): `disabled:cursor-default disabled:opacity-60 disabled:hover:bg-primary`, y el texto cambia a la acción en curso ("Saving..."). Con ícono (ej. Add Expense): `flex items-center gap-2`, ícono de 20px con `currentColor` a la izquierda del texto; foco `focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/12`.
- **Secundario** (Cancel, Duplicate, Export) — aún no implementado: `background: #FFF; color: #1E293B; border: 1px solid #D7DEE8; border-radius: 12px; height: 40px; font-weight: 500`.
- **Destructivo** (Delete expense) — aún no implementado: `background: #FFF5F5; color: #EF4444; border: 1px solid #FECACA; border-radius: 12px`.
- **Link / acción de texto**: `text-sm font-medium text-primary hover:text-primary-hover hover:underline`.
- **Acción de creación de campo ("+ Create X")** *(implementado 2026-11-02; con `aria-pressed`, `label for`/`id`)*: pill a la derecha del label del campo, en la misma fila. `inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary-selected`, ícono `plus` 16px. Reemplaza al link "Create New X".
- **Botón de ícono**: `h-10 w-10`, mismo borde/radio/sombra que un input, ícono de 16px. Dos o más relacionados se agrupan en un **segmented control** (ver Shell).

## Inputs
```
h-10 rounded-md border border-border-medium bg-bg-surface px-3 text-sm text-text-primary
focus:border-primary focus:ring-4 focus:ring-primary/12 focus:outline-none
placeholder:text-text-tertiary
```
Mismo estilo para `<input>` y `<select>`.

**Input con ícono** (ej. búsqueda): el borde, la sombra y el foco van en un `<label>` contenedor (`group … focus-within:border-border-focus focus-within:ring-4 focus-within:ring-primary/12`), con el ícono de 20px a la izquierda (`gap-3`) y el `<input>` sin borde ni outline (`bg-transparent outline-none`). Al ser `<label>`, el click en cualquier parte enfoca el campo. En `type="search"` se oculta la "×" nativa (`[&::-webkit-search-cancel-button]:appearance-none`).

## Superficies y composición *(agregado 2026-10-10)*
Estética "soft dashboard" inspirada en Apple HIG/macOS. La app no es plana: hay un **canvas** gris azulado y, encima, **superficies** blancas elevadas con sombra suave.

**Principios**
1. **Canvas** (`bg-bg-app`, `#E4E8EE`): gris evidente, ligeramente azulado, frío y limpio; más oscuro que el valor original. Ni blanco puro, ni oscuro, ni saturado. El layout deja `p-4` de canvas alrededor de las superficies y `gap-4` entre ellas.
2. **Un card por bloque padre.** Los hijos se acoplan al padre y **no son cards propias**: dentro de una card se separan con divisores (`border-border-light`) o con fondo `bg-bg-surface-soft`, nunca con otra card con sombra. Regla práctica: una sombra por rama del árbol.
3. **Padres (son card):** tabla de gastos, contenedores de gráficos, formularios, summary cards, panel de detalle, drawers, modals y sidebar. **Hijos (no son card):** filas, campos, items de lista, segmentos.
   **Controles sueltos sobre el canvas** (búsqueda y filtro de mes de la topbar): no van dentro de una card; cada uno es su propia card compacta (ver tabla).
4. **Profundidad sutil:** contraste entre canvas y superficie + borde `border-light` + sombra fría. Sin sombras pesadas ni contraste excesivo; no todo debe mezclarse con el fondo.
5. **Color:** el azul se reserva para acción primaria, foco, selección y elementos activos. Los colores de categoría son acentos, no fondos grandes saturados.
6. **Todo por tokens.** Ningún hex suelto en templates (ver "Cómo se usan los tokens").

**Superficies**

| Superficie | Fondo | Radio | Sombra | Padding |
|---|---|---|---|---|
| Card padre de contenido (tabla, formulario, gráfico) | `bg-bg-surface` | `rounded-lg` (16px) | `shadow-sm` | `p-5` |
| Card padre de barra (sidebar) | `bg-bg-surface` | `rounded-lg` (16px) | `shadow-sm` | `p-4` |
| Control suelto sobre el canvas (búsqueda, filtro de mes) | `bg-bg-surface` + `border-border-light` | `rounded-md` (12px) | `shadow-sm` | el del control (`h-10 px-3`) |
| Fondo secundario dentro de una card | `bg-bg-surface-soft` | `rounded-md` | — | `p-4` |
| Panel de detalle / drawer *(2026-11-09: igual que las demás cards, ver "Expense Detail como card")* | `bg-bg-surface`, separado del canvas con margen | `rounded-lg` (16px) | `shadow-sm` | `p-5` |
| Dropdown / popover | `bg-bg-surface` | `rounded-[14px]` | `shadow-md` | `p-1.5` |
| Modal / bottom sheet | `bg-bg-surface` | `rounded-xl` | `shadow-lg` | `p-6` desktop / `p-5` mobile |

Separación entre cards: `gap-4` (16px). Cada superficie lleva `border border-border-light`; el fondo secundario no lleva borde ni sombra.

**Contraste:** se evalúa componente por componente durante el desarrollo; se consulta cuando haga falta (inputs, bordes de controles).

**Modo oscuro (futuro, B.5):** no es un cambio de blanco a negro. Se piensa como un tema sutil con superficies en tonalidades violeta/púrpura, para que sombra y contraste sigan siendo visibles. Se logra redefiniendo los tokens en un bloque de tema oscuro, por eso no hay hex sueltos. Valores a definir cuando se aborde B.5.

## Cards y formularios
Una card padre sigue la tabla de "Superficies y composición": `rounded-lg border border-border-light bg-bg-surface p-5 shadow-sm`. Un formulario anidado dentro de otro (ej. creación rápida) es hijo: `rounded-md bg-bg-surface-soft p-4`, sin borde ni sombra. Campos en columna con `gap-3`/`gap-4`; cada campo es `<label class="flex flex-col gap-1.5">` con el texto del label encima. Secciones internas separadas con `border-t border-border-light pt-3`.

## Dropdowns / Popovers

**Estilo** (implementado en el selector de mes):
```
contenedor: absolute top-full mt-2 z-20 rounded-[14px] border border-border-light bg-bg-surface p-1.5 shadow-md max-h-72 overflow-y-auto
item:       h-11 rounded-[10px] px-2.5 text-sm hover:bg-bg-hover
seleccionado: bg-primary-selected text-primary font-semibold + ícono check 16px a la derecha
creación:   text-primary font-semibold, separado con border-t border-border-light
```
Se cierran con click afuera (`host: { '(document:click)': … }`) y con Escape (`(document:keydown.escape)`).

**Dropdown de categoría con `CategoryBadge`** *(implementado 2026-11-02 como `CategorySelect`; informado por el usuario)*: el campo Category muestra la categoría elegida y cada opción como `CategoryBadge`. Un `<select>` nativo no puede mostrar íconos ni colores, así que es un **control propio**:
- Implementa la interfaz de control de Signal Forms (`FormValueControl<string>`), para usarse con `[formField]` como un input.
- Patrón listbox: disparador con `aria-haspopup="listbox"` y `aria-expanded`; lista `role="listbox"`, opciones `role="option"` + `aria-selected`. Teclado: flechas, Enter, Escape; el foco vuelve al disparador al cerrar.
- Disparador con forma de input y lista con el estilo de arriba (igual que el selector de mes). Posicionado con `@angular/cdk/overlay` para que no lo corte el `overflow` del modal.
- Genérico (opciones + template por opción), para reutilizarlo después en Account, Paid To y Payment Method.

**Creación de entidades: ya no hay submenú dentro del dropdown** *(decidido 2026-11-01)*. El patrón anterior (acción "+ New X" al final del dropdown con submenú lateral) queda descartado. La creación se hace en la **columna derecha del modal** (ver "Modal Add Expense"), con el formulario de cada entidad (sin marco compartido), abierta desde la acción "+ Create X" junto al label del campo. Se mantienen:
- Regla UX: **"Primero seleccionar. Crear solo si no existe."**
- La entidad recién creada queda **autoseleccionada**.

> **Estado actual (provisorio):** el formulario de gastos usa `<select>` nativos con un link "Create New X" arriba que despliega un formulario rápido como bloque hijo `bg-bg-surface-soft`, dentro del mismo `<form>`. Se reemplaza por el patrón de "Modal Add Expense".

## Shell

**Layout** (`app.html`) *(actualizado 2026-11-09, ver "Layout de tres columnas")*: grid `h-dvh min-h-180 overflow-hidden p-4` sobre el canvas, con columnas sidebar | contenido | Expense Detail y filas topbar | contenido.
- Columnas `auto minmax(0,1fr) 0rem`; la tercera pasa a `25rem` cuando el host `<app-expense-detail-panel>` tiene contenido (`has-[>app-expense-detail-panel:not(:empty)]`), sin un signal en `App`. Transición de `grid-template-columns` de 250 ms, desactivada con `motion-reduce`.
- Sin separación entre columnas (una columna de 0 igual sumaría el espacio): la sidebar lleva `mr-4` y el panel `pl-4`. Entre filas, `gap-y-4`.
- La sidebar ocupa las dos filas; la topbar abarca contenido y panel; el panel arranca debajo de la topbar, con ancho fijo `w-100` para no comprimirse durante la animación.
- `<main class="flex min-h-0 min-w-0 flex-col gap-4">` contiene las cards de contenido.
- Provisorios: `min-h-180` (720px) y el ancho del panel (25rem con el `pl-4`).

**Sidebar**: card flotante de barra, `h-full w-64 rounded-lg border border-border-light bg-bg-surface p-4 shadow-sm`. El host (`<app-sidebar>`) lleva `min-h-0` y toma el alto de la fila del grid; ya no es `sticky`, porque la página no scrollea. Pendiente: sidebar colapsable (B.2.3).
- Logo: cuadrado `h-10 w-10 rounded-md bg-primary text-white shadow-sm` con ícono de 20px; nombre `text-base font-semibold`, subtítulo `text-xs text-text-tertiary`; separado del menú con `border-b border-border-medium` (más oscuro que los divisores normales para marcar el encabezado de la app).
- Item de navegación: `h-11 rounded-[10px] px-3 gap-3 text-sm`, ícono de 20px, estados según la tabla de Estados de interacción.

**Topbar**: no es card. Es una fila `flex items-center gap-4` sobre el canvas con dos controles sueltos, cada uno con su propia card compacta: la búsqueda (`max-w-md flex-1`) a la izquierda y el selector de mes (`ml-auto`) a la derecha.

**Selector de mes**: trigger con forma de input, como control suelto (`h-10 rounded-md border border-border-light shadow-sm px-3 gap-3`): ícono calendario 20px `text-text-secondary`, label `text-md font-medium` (formato `"October 2023"`), chevron 16px `text-text-tertiary` que rota 180° al abrir. Abre un dropdown con los meses (más reciente primero).

**Segmented control** (flechas anterior/siguiente): un único contenedor `h-10 rounded-md border border-border-light bg-bg-surface shadow-sm overflow-hidden divide-x divide-border-light` (control suelto); cada segmento `w-10` sin borde propio, ícono 16px. El foco de teclado se muestra en el contenedor (`has-focus-visible:border-border-focus has-focus-visible:ring-4 has-focus-visible:ring-primary/12`).

**Búsqueda**: input con ícono (ver Inputs), como control suelto: `border-border-light shadow-sm` en vez de `border-border-medium shadow-xs`, ícono `search` 20px, `w-full`. Placeholder y `aria-label` configurables por `input()`.

## Layout de tres columnas y alto de pantalla *(decidido 2026-11-09; implementados el alto fijo, la grilla sin alto fijo y las columnas sidebar | contenido; falta la columna del panel, la transición y la sidebar colapsable)*

**Regla de alto:** la aplicación entera **cabe en el alto del viewport, sin scroll de página**, a partir de **1920×1080** (y en pantallas más grandes). Solo scrollean regiones internas (la grilla, el panel de detalle). En pantallas con menos de 1080 px de alto se acepta el scroll de página, con un alto mínimo del shell para no comprimir el contenido (el valor se define al armar la pantalla real). No se diseña para pantallas más chicas que eso en esta etapa.
- Consecuencia: el shell pasa de `min-h-screen` a un alto fijo al viewport con `overflow-hidden` (y un `min-h` para pantallas chicas). La grilla deja de tener alto fijo (hoy `height: 500px` inline) y ocupa lo que sobra de la columna central (`flex-1 min-h-0`), con scroll vertical interno de AG Grid. Cartas y gráficos con alto propio.
- Verificar siempre a 1920×1080 y, como mínimo de referencia, a 1366×768.

**Estado normal (panel cerrado):** sidebar expandida, contenido central ocupa todo el ancho restante.

**Estado con Expense Detail abierto (se abre al seleccionar un gasto):**
1. Columna 1, sidebar: se minimiza sola a solo íconos (US B.2.3; tooltip y `aria-label` por ítem).
2. Columna 2, contenido central: ocupa el espacio entre ambas columnas laterales; la grilla se adapta sin comprimir las columnas más de la cuenta (`minWidth` por columna, scroll horizontal si hace falta).
3. Columna 3, Expense Detail: aparece a la derecha.
Al cerrar el panel (o limpiar la selección) la sidebar vuelve a expandirse y el contenido recupera el ancho.

**Mecanismo:** CSS Grid con `grid-template-columns` dinámicas (sidebar | central | panel), transición de **200 a 280 ms**, sin superposiciones ni escalado de componentes, y sin animación con `prefers-reduced-motion`. La columna central lleva `min-w-0` (sin eso un grid no deja que se achique por debajo de su contenido). Riesgo a medir con el panel real: animar columnas recalcula el layout en cada fotograma y AG Grid recalcula sus columnas con cada cambio de ancho.

**Expense Detail como card:** no es un panel de borde a borde. Es una card como la sidebar y la grilla: fondo blanco (`bg-bg-surface`), radio, borde y sombra de las demás cards, sobre el canvas gris.
- **Alto:** el mismo que el área de contenido bajo la topbar, es decir, la suma del alto de las cartas, los gráficos y la grilla. El alto lo dicta la columna central: el contenido del panel **no** agranda la fila; si no entra, scrollea por dentro.
- Como la página no scrollea, no hace falta `sticky`.
- Cabecera con el avatar de categoría y el botón de cerrar fija; los campos scrollean (a confirmar al construirlo). `SidePanel` (`shared/`) tiene un slot `[panelHeader]` debajo del título, fuera de la zona que scrollea, para esto.
- Mientras todavía no existan cartas y gráficos (Epic D), el panel tiene el alto de la grilla.

**Topbar:** sigue sobre el canvas (no es card). Con el panel abierto abarca la columna central y la del panel, que arranca debajo (a confirmar al implementar). La compactación de buscador, Add Expense, Filter, selector de mes y bloque de usuario con menos ancho se decide con la pantalla real (US B.3.7), usando *container queries* de Tailwind v4 (`@container`) porque dependen del ancho del contenedor y no de la ventana.

**Mobile:** no aplica este layout (ver sección Mobile).

## Escalabilidad responsive *(decidido 2026-11-09; los rangos son propuesta a confirmar; sin implementar)*

**Objetivo:** que la aplicación se vea bien en monitores de cualquier tipo, con **1920×1080 como base** de diseño y las demás resoluciones como casos que se adaptan, no como pantallas aparte. Todas las medidas son en **píxeles CSS**, no físicos: un monitor 4K con escala de 150 % ofrece 2560×1440, un notebook de 1920×1080 con escala de 125 % ofrece 1536×864, y el zoom del navegador también achica el ancho disponible. Diseñar con un layout fluido cubre todos esos casos a la vez.

**Principios técnicos**
- **Layout fluido, no de tamaños fijos:** anchos con `fr`, `minmax()` y `flex`, sin `px` fijos en contenedores (el `height: 500px` de la grilla es la excepción a eliminar). `min-w-0` en los hijos de un grid o flex que deban poder achicarse.
- **Container queries para componentes** (`@container` de Tailwind v4): los componentes se adaptan al **ancho de su contenedor**, no al de la ventana. Es lo que necesita este layout, porque abrir Expense Detail angosta la columna central sin que cambie el viewport.
- **Media queries solo para el shell:** cantidad de columnas, sidebar expandida o colapsada por defecto, y el paso a mobile.
- **Unidades:** `rem` para tipografía y espaciado, así respeta el tamaño de texto del usuario. Alto del shell con `dvh`, no `vh`. Ningún texto con tamaño fijo en píxeles que impida el zoom.
- **Anchos mínimos:** cada componente declara el mínimo con el que sigue siendo usable (columnas de la grilla con `minWidth`, cartas con `min-w`) y, por debajo, scroll horizontal interno o menos columnas; nunca solapamiento.
- **Cartas y gráficos:** fluidos. Las cartas usan columnas automáticas (`repeat(auto-fit, minmax(X, 1fr))`) y bajan de cantidad de columnas solo cuando no entran; los gráficos toman el ancho de su card y se redibujan al cambiar de tamaño.

**Rangos propuestos (ancho en píxeles CSS)**
- **1536 o más:** layout completo (sidebar expandida, cartas y gráficos en su disposición base).
- **1280 a 1535:** layout compacto: el panel de detalle algo más angosto y menos columnas de cartas con el panel abierto; la sidebar sigue colapsándose sola al abrirlo.
- **Menos de 1280:** tablet y mobile, Epic G (drawer o tab bar, lista de cards en lugar de grilla). Pendiente de diseño.
- **2560 o más (monitores grandes o ultrapanorámicos):** decisión abierta, ver abajo.

**Alto:** vale la regla de "sin scroll de página" a partir de 1080 px de alto. Con menos alto (768, 864, 900) se permite el scroll de página y el shell tiene un `min-h`; el panel de detalle conserva su alto igual al del contenido.

**Decisiones abiertas**
1. Ancho mínimo soportado del layout de escritorio (propuesta: 1280).
2. Monitores grandes: dejar que el contenido crezca (más columnas de cartas, la grilla muestra más columnas) o limitarlo con un ancho máximo centrado (propuesta a evaluar: tope alrededor de 2200 a 2400 px) para que las filas y las líneas no queden demasiado largas.

**Pruebas de referencia:** 1280×720, 1366×768, 1440×900, 1536×864, 1920×1080, 2560×1440 y 3440×1440 (ultrapanorámico), más zoom del navegador al 150 % y 200 %.

## CategoryBadge
Toma `color` e `icon` de la categoría (base de datos):
```
contenedor: inline-flex items-center gap-1.5 rounded-lg px-3 py-1
fondo:      color-mix(in srgb, <color> 15%, white)
texto/ícono: color-mix(in srgb, <color> 80%, black 20%)
texto:      13px font-medium; ícono 15px
```
Es la **pill con nombre**: se usa en la grilla, en la fila "Category" del preview, en el dropdown de categoría y como vista previa en el panel de creación de categoría.

## CategoryAvatar *(implementado 2026-11-01; compila, sin verificar visualmente)*
Imagen de categoría **cuadrada** con esquinas redondeadas (`rounded-md`), **sin nombre**. Se usa en `ExpensePreviewCard` y, a futuro, en el panel de detalle del gasto.
```
fondo / ícono: los mismos tonos que CategoryBadge (pastel 15% / ícono 80% + negro 20%)
tamaños:       input() con opciones fijas — sm 32px (ícono 16) / md 48px (ícono 24) / lg 64px (ícono 32)
```
- **Un solo cálculo de tonos:** `shared/color-calculation.ts` expone `colorCalculationForeground(color)` (80% color + 20% negro) y `colorCalculationBackground(color)` (15% color + blanco); `CategoryBadge` y `CategoryAvatar` las usan. No se duplican.
- **Sin categoría elegida el avatar sí se muestra**, con el valor por defecto: color `#768bad` e ícono `receipt-text` *(decidido 2026-11-01; reemplaza "sin categoría no se muestra avatar")*. Recibe `ExpenseCategory | undefined`. `CategoryBadge` acepta `Pick<Category, 'name' | 'color' | 'icon'>`.
- **Accesibilidad:** objetivo: `input()` opcional de etiqueta; con etiqueta → `role="img"` + `aria-label`, sin etiqueta → `aria-hidden="true"` (caso habitual: el nombre ya está al lado). **Hoy siempre es `aria-hidden="true"`; el `input()` de etiqueta está pendiente.**
- Revisar contraste del ícono en colores claros (amarillo).

## Modal Add Expense *(decidido 2026-11-01; layout de dos columnas y estado del panel implementados, compila, sin verificar visualmente; F.3.1 a F.3.6)*
Las imágenes de referencia del modal son **guía de composición**; los valores (colores, tipografía, radios, labels) salen de este documento.

**Estructura**
- Superficie de modal (ver "Superficies y composición"): `rounded-xl bg-bg-surface p-6 shadow-lg`, ancho `w-[min(880px,calc(100vw-2rem))]` *(implementado)*.
- Encabezado: cuadro de ícono `h-12 w-12 rounded-md bg-primary-soft text-primary` con `plus` 24px; título `text-xl font-semibold`; subtítulo `text-[13px] text-text-secondary`; botón de ícono de cerrar (`x`, `aria-label="Close"`) a la derecha.
- Cuerpo en **dos columnas**: `grid grid-cols-1 md:grid-cols-2 gap-5`. En mobile la columna derecha baja debajo.
  - **Izquierda:** el `<form id="expense-form">` con los campos, incluido el campo `date` (`<input type="date">`, requerido). Labels según "Cards y formularios" (`text-[13px] text-text-secondary`); cada campo con entidad creable lleva la acción "+ Create X" (ver Botones) a la derecha del label. Campo requerido: asterisco `text-danger` con `aria-hidden="true"`; el requisito lo anuncia el `required` del control.
  - **Derecha:** siempre visible. Por defecto muestra `ExpensePreviewCard`; al tocar "+ Create X" la reemplaza el formulario de creación de esa entidad. Al crear o cancelar vuelve al preview. Solo un panel de creación a la vez: el estado es **un único signal** `openCreationForm` con unión de literales `'category' | 'account' | 'merchant' | 'payment' | 'preview'` (inicial `'preview'`), mostrado con `@switch`; apretar el botón "Create" del panel activo vuelve a `'preview'`. La columna derecha queda **fuera** del `<form>` de la izquierda (no hay `<form>` anidados).
- Pie: `border-t border-border-light pt-4 flex justify-end gap-3` con Cancel (secundario) y Save Expense (primario). El botón de envío está **fuera** del `<form>` y se asocia con `form="expense-form"`.
- **Escape y la X cierran todo el modal sin pedir confirmación** *(decidido 2026-11-01; se pierde lo escrito sin guardar)*.
- **Confirmación de descarte** *(F.3.6, decidido 2026-11-01, no implementado)*: si el panel de creación tiene cambios respecto de su valor inicial, Cancel y abrir otro "+ Create X" piden confirmación **dentro del propio panel**; no se abre un segundo modal. Los valores por defecto (color e ícono de Category) no cuentan como "escrito". La interfaz exacta de la confirmación sigue pendiente de decidir.
- Mientras se crea una entidad, su campo muestra el placeholder; al crearla, el valor nuevo queda autoseleccionado. *(Pendiente: si al cancelar se conserva la elección previa.)*
- **Selector Expense | Income** *(implementado 2026-11-02 en `AddTransactionDialog`)*: `fieldset` de radios arriba del cuerpo; el seleccionado es `bg-primary` (expense) o `bg-success` (income). El encabezado cambia con el tipo (título, subtítulo e ícono: expense usa el ícono por defecto de categoría, income `banknote-arrow-up`). `AddTransactionDialog` (`shell/`) es el padre; `ExpenseForm` e `IncomeQuickCreate` solo tienen el contenido. Notes lleva contador y tope de 200 caracteres.

**Paneles de creación (sin marco compartido)** *(decidido 2026-11-01; reemplaza a `PanelFrame`)*: no existe un componente marco entre `ExpenseForm` y los formularios de creación. Los formularios de la columna derecha (`QuickCreateForm` para Paid To, Account y Payment Method, y `CategoryQuickCreate`) se muestran directamente y cada uno lleva su propio encabezado y acciones, **con las mismas clases de Tailwind** para verse idénticos. Si aparece un tercer panel, se evalúa extraer el marco.
```
contenedor: rounded-md bg-bg-surface-soft p-4   (hijo: sin borde ni sombra)
encabezado: título text-base font-semibold · subtítulo text-[13px] text-text-secondary  (sin flecha de volver)
error:      mensaje del servidor, role="alert", rounded-md bg-danger-soft p-3 text-[13px] text-danger  (incluye el 409 por duplicado; se conservan los datos para reintentar)
acciones:   Cancel (secundario) a la izquierda, Create (primario) a la derecha, ambos flex-1
```
**Cancel es el único modo de volver al preview.** Estado: sin hacer (el estilo de los paneles de creación está pendiente).

**`Callout`** (`shared/` objetivo; hoy está **inline** en la vista previa y se extrae si se reutiliza): aviso informativo. `flex gap-2.5 rounded-md bg-primary-soft p-3 text-[13px] text-text-secondary`, ícono `info` 16px `text-primary`, contenido por `ng-content`.

**`ExpensePreviewCard`** *(implementada 2026-11-01 en `expenses/expense-form/expense-preview-card/`; compila, sin verificar visualmente)* (presentacional, solo lectura; no es el panel de detalle):
- Recibe por `input.required<ExpensePreview>()` un objeto ya resuelto (nombres, no ids) armado por el formulario con un `computed` (`previewData`) que resuelve los ids contra las listas cargadas y devuelve `undefined` si no hay selección o la lista no cargó.
- Encabezado "Expense Preview" + subtítulo sobre el fondo `bg-bg-surface-soft`; adentro, tarjeta blanca hija `rounded-md bg-bg-surface p-4` (sin sombra).
- Tarjeta: `CategoryAvatar` **lg** *(cambia el md anterior; a confirmar)* + nombre del gasto `text-base font-semibold` + monto `text-[24px] font-semibold`. **Sin categoría elegida el avatar se muestra con el valor por defecto** (ver CategoryAvatar). Monto 0 = faltante. Una caja "Start filling the form…" aparece solo con el formulario vacío.
- Datos (Date, Paid To, Account, Payment Method, Category, Notes) en `<dl>` con `divide-y divide-border-light`: ícono 16px `text-text-tertiary`, término `text-[13px] text-text-secondary`, valor `text-sm text-text-primary`. Category como `CategoryBadge`. Notas con `whitespace-pre-line`. La fecha `YYYY-MM-DD` se arma como fecha **local** (evita el corrimiento de un día en UTC-3).
- Valores faltantes: guion **"—"** en `text-text-tertiary`. Nunca datos ficticios.
- Sin `aria-live` (se anunciaría con cada tecla).

**`ColorSwatchPicker`**: grupo de radios estilizado — `<fieldset>` + `<legend>`, `<input type="radio">` ocultos (`sr-only`, `peer`) dentro de `<label>` que dibujan círculos `h-7 w-7 rounded-full`.
- Seleccionado: anillo `ring-2 ring-offset-2 ring-text-primary` + ícono `check` 16px (no solo color). Foco: `peer-focus-visible:ring-4 peer-focus-visible:ring-primary/12`.
- Nombre accesible = nombre del color. Muestra el hex del color elegido en un campo de **solo lectura** *(decidido 2026-11-01; sin hex personalizado en esta versión)*.

**`IconGridPicker`** *(implementado 2026-11-02)*: grilla de **5×2 con 10 íconos y sin celda "…"** *(decidido 2026-11-02; reemplaza "9 íconos + …")*; el catálogo completo queda fuera por ahora. `FormValueControl`. La lista de íconos (`preSetIcons`) entra por `input()`.
- Íconos: grupo de radios estilizado (igual que el de color); celda `aspect-square rounded-md border border-border-light`, ícono 20px `text-text-secondary`, hover `bg-bg-hover`.
- Seleccionada: fondo pastel + borde + ícono con los tonos del color de la categoría (misma función que `CategoryAvatar`).
- "…" es un **botón** aparte (no una opción), `aria-label="More icons"`; el catálogo completo queda para más adelante.
- Debajo, vista previa de la categoría con `CategoryBadge`.

## Formato de valores *(decidido 2026-11-01; locale de los montos reabierto)*
> **Decisión abierta:** el código ya usa `'es'` para los montos y `'en'` para la fecha; no está cerrado. Opciones evaluadas: `'es'` (`45.500,00 ARS` / `45.500,00 US$`; no agrupa números de 4 cifras: `1500,00`), `'es-AR'` (`$ 45.500,00` / `US$ 45.500,00`) y `'en'` con `currencyDisplay: 'code'` (`ARS 45,500.00` / `USD 45,500.00`). Hasta decidir, lo de abajo describe el criterio original.

Locale **inglés** (`'en'` en el criterio original) por ahora:
- Montos: `Intl.NumberFormat('en', { style: 'currency', currency })` → `ARS 45,500.00`. Formateador creado una sola vez.
- Fechas: `dateStyle: 'medium'` → `Dec 10, 2023` (evita la ambigüedad día/mes).
- Las validaciones y sus mensajes salen del código (por ejemplo `min 0.01`), no de los mockups.

## Charts
- **Donut**: un color por categoría. Centro: monto total, 22-24px, font-weight 700, label "Total" debajo.
- **Bar**: barra inactiva `#CFE3FF`, barra activa `#0A84FF`, grid lines `#E5EAF1`, tooltip blanco con `shadow-sm`.
- **Line**: línea `#0A84FF`, área bajo la curva `linear-gradient(to bottom, rgba(10,132,255,0.22), rgba(10,132,255,0.02))`, puntos `#0A84FF` con borde blanco 3px.

## Tabla / AG Grid desktop
Tema con `themeQuartz.withParams` en TypeScript (los colores van como hex porque AG Grid no lee los tokens de Tailwind):
```ts
backgroundColor: '#FFFFFF',
chromeBackgroundColor: '#F8FAFC',    // header
borderColor: '#E5EAF1',
rowHoverColor: '#F1F6FF',
selectedRowBackgroundColor: '#D6E9FF',  // primary-selected, como el resto de elementos seleccionados
fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'sans-serif'],
fontSize: 13,
rowHeight: 44,
headerHeight: 42,
wrapperBorder: false,                // el borde lo pone la card padre
```
La grilla va dentro de una card padre de contenido (`<section>` con `p-5 shadow-sm`).
Columnas objetivo: checkbox, Date, Merchant, Category, Account, Amount (alineado a la derecha, font-weight 600), Status, Notes. La celda de Category usa `CategoryBadge`.

## Mobile
No replicar AG Grid — usar cards, listas, bottom sheets, tab bar inferior, filtros como chips, gráficos compactos.

Pantallas sugeridas: Summary (header+avatar, selector de mes, búsqueda/filtros, summary cards, donut, bar chart, transacciones recientes, tab bar); Expenses (selector de mes, buscador/filtros, segmented control All/Income/Expense, chips de categoría, lista agrupada por fecha); Analytics/Budgets (tabs, donut, tendencia, barras de progreso de presupuesto); Add expense (bottom sheet, mismo patrón de dropdown con creación inline que desktop, botón primario full-width).

Bottom sheet: `border-radius: 24px 24px 0 0; box-shadow: 0 -16px 40px rgba(15,23,42,0.18); padding: 20px`. Overlay: `rgba(15,23,42,0.32)` + `backdrop-filter: blur(8px)`. Bottom tab: `height: 72px; background: rgba(255,255,255,0.92); backdrop-filter: blur(16px); border-top: 1px solid #E5EAF1`.

## Iconografía
Lucide (`@lucide/angular` + `@lucide/icons`), siempre a través de `<app-icon-renderer>`. Stroke 1.75px (default del componente).

Tamaños: sm 16 / md 20 / lg 24 / xl 32.
- 20px: íconos principales (navegación, logo, calendario, búsqueda).
- 16px: íconos secundarios (chevrons, check, botones de ícono).
- Excepción: CategoryBadge usa 15px.

Color: pasar `[iconColor]="'currentColor'"` y controlar el color con clases de texto en el contenedor, para que siga los estados de interacción.

## Componentes del sistema
Implementados: AddTransactionDialog, CategorySelect, ColorSwatchPicker, IconGridPicker, IncomeQuickCreate (2026-11-02, informados por el usuario), AppShell (parcial), Sidebar, Topbar, MonthSelector, SearchInput, CategoryBadge, ExpensesGrid (TransactionTable), ExpenseForm (dos columnas, 2026-11-01), CategoryQuickCreate, QuickCreateForm, CategoryAvatar y ExpensePreviewCard (2026-11-01, sin verificar visualmente).
Pendientes: Callout compartido (hoy duplicado en cuatro lugares), banner de error del servidor, SummaryCard, ChartCard, TransactionRow, InspectorPanel, MobileBottomSheet, MobileTabBar.
Descartados: CreateNestedSubmenu (2026-11-01: la creación pasa a la columna derecha del modal) y PanelFrame (2026-11-01: cada formulario de creación lleva su propio encabezado y acciones).
