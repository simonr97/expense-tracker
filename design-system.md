# GastoPro — Design System

**Fuente de la verdad para todo el trabajo visual de `apps/web`.** Spec original provisto por Simón (2026-09-24), inspirado en Apple HIG. Reconciliado con el código el 2026-10-10: desde esa fecha, si el código y este documento no coinciden, manda este documento — salvo que se decida explícitamente cambiarlo (y entonces se actualiza acá primero).

Usar los valores tal cual. No reinterpretarlos.

## Filosofía
"La interfaz acompaña al contenido, no compite con él." Claridad antes que decoración, datos fáciles de leer, acciones primarias evidentes, uso moderado del color, profundidad sutil, diseño consistente desktop/mobile.

## Idioma
Toda la UI está en **inglés** por ahora: textos, placeholders, `aria-label`, estados vacíos y locale de `Intl` (`'en'`). Los mockups pueden venir con textos en español — se copia el diseño, no el idioma.

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
| Panel de detalle / drawer | `bg-bg-surface`, separado del canvas con margen | `rounded-xl` (24px) | `shadow-md` | `p-5`–`p-6` |
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

**Patrón de creación inline — objetivo (Feature F.2, US F.2.1/F.2.2)**
Cada dropdown extensible (Category, Account, Merchant, Tags) sigue:
1. Opciones existentes.
2. Divisor.
3. Acción fija de creación al final ("+ New category >", "+ New account >") — estilo de acción secundaria, no una opción más.
4. Al presionarla se abre un **submenú lateral o popup contextual dentro del mismo dropdown** (no un modal aparte).
5. La entidad recién creada queda **autoseleccionada**.

Regla UX: **"Primero seleccionar. Crear solo si no existe."** Nunca botones externos permanentes fuera del dropdown para crear.

Submenú "New category": Name, selector de Color (fila de círculos), selector de Icon (grilla), botones Cancel / Create category.
Submenú "New account": Name, Type (Bank / Cash / Virtual wallet), sin color ni ícono. Botones Cancel / Create account.

> **Estado actual (provisorio):** el formulario de gastos usa `<select>` nativos con un link "Create New Category/Account" arriba que despliega un formulario rápido (`CategoryQuickCreate` / `AccountQuickCreate`) como bloque hijo `bg-bg-surface-soft`. Se reemplaza por el patrón de arriba al implementar F.2.

## Shell

**Layout** (`app.html`): `flex min-h-screen gap-4 p-4` sobre el canvas; a la izquierda la sidebar, a la derecha un `<main class="flex min-w-0 flex-1 flex-col gap-4">` con la topbar y las cards de contenido.

**Sidebar**: card flotante de barra, `h-full w-64 rounded-lg border border-border-light bg-bg-surface p-4 shadow-sm`. El host (`<app-sidebar>`) es `sticky top-4 h-[calc(100vh-2rem)] shrink-0`, así queda fija al scrollear. Pendiente: sidebar colapsable (B.2.3).
- Logo: cuadrado `h-10 w-10 rounded-md bg-primary text-white shadow-sm` con ícono de 20px; nombre `text-base font-semibold`, subtítulo `text-xs text-text-tertiary`; separado del menú con `border-b border-border-medium` (más oscuro que los divisores normales para marcar el encabezado de la app).
- Item de navegación: `h-11 rounded-[10px] px-3 gap-3 text-sm`, ícono de 20px, estados según la tabla de Estados de interacción.

**Topbar**: no es card. Es una fila `flex items-center gap-4` sobre el canvas con dos controles sueltos, cada uno con su propia card compacta: la búsqueda (`max-w-md flex-1`) a la izquierda y el selector de mes (`ml-auto`) a la derecha.

**Selector de mes**: trigger con forma de input, como control suelto (`h-10 rounded-md border border-border-light shadow-sm px-3 gap-3`): ícono calendario 20px `text-text-secondary`, label `text-md font-medium` (formato `"October 2023"`), chevron 16px `text-text-tertiary` que rota 180° al abrir. Abre un dropdown con los meses (más reciente primero).

**Segmented control** (flechas anterior/siguiente): un único contenedor `h-10 rounded-md border border-border-light bg-bg-surface shadow-sm overflow-hidden divide-x divide-border-light` (control suelto); cada segmento `w-10` sin borde propio, ícono 16px. El foco de teclado se muestra en el contenedor (`has-focus-visible:border-border-focus has-focus-visible:ring-4 has-focus-visible:ring-primary/12`).

**Búsqueda**: input con ícono (ver Inputs), como control suelto: `border-border-light shadow-sm` en vez de `border-border-medium shadow-xs`, ícono `search` 20px, `w-full`. Placeholder y `aria-label` configurables por `input()`.

## CategoryBadge
Toma `color` e `icon` de la categoría (base de datos):
```
contenedor: inline-flex items-center gap-1.5 rounded-lg px-3 py-1
fondo:      color-mix(in srgb, <color> 15%, white)
texto/ícono: color-mix(in srgb, <color> 80%, black 20%)
texto:      13px font-medium; ícono 15px
```

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
Implementados: AppShell (parcial), Sidebar, Topbar, MonthSelector, SearchInput, CategoryBadge, ExpensesGrid (TransactionTable), ExpenseForm, CategoryQuickCreate, AccountQuickCreate.
Pendientes: SummaryCard, ChartCard, TransactionRow, InspectorPanel, AddExpenseModal, SelectDropdown, CreateNestedSubmenu, MobileBottomSheet, MobileTabBar.
