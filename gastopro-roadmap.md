# GastoPro — Roadmap de Producto

Organización completa del proyecto en Epics → Features → User Stories con Acceptance Criteria. Incluye el trabajo ya hecho (marcado ✅) para no perder trazabilidad.

> **Renumeración (2026-10-13):** se intercambiaron las Epics C y E para seguir el orden de trabajo (de la B a la gestión de gastos, sin saltos). Ahora **C = Gestión de gastos** (antes E; por ejemplo el panel de detalle pasó de E.2.1 a **C.2.1**) y **E = Presupuestos, balances y cuotas** (antes C). Los IDs de las demás Epics no cambian. Si en otra nota aparece "E.2.1", equivale a C.2.1.

---

## Hito 1 — Resumen completo = **Alpha 1.0** *(definido 2026-10-13; nombrado y ampliado con ingresos el 2026-10-18)*
- **Alpha 1.0** es el nombre de la primera release oficial y equivale al Hito 1. Su alcance incluye ahora la **Epic M (Ingresos)**.
- **Definición de terminado:** todas las US de las Epics A, B, C, D, **M** (ingresos) y **N** (monedas), ambas agregadas el 2026-10-18, están hechas, más la Feature **E.1** (cuentas con métodos de pago, adelantada desde la Epic E el 2026-10-18). Después, el resto de las pestañas (Epics E en adelante) se construyen reutilizando lo aprendido y los componentes del resumen.
- **Decisión (2026-10-18): los métodos de pago (E.1.1–E.1.4) entran en Alpha 1.0.** Motivo: cambiar el modelo de `Expense` después de construir columnas y panel obliga a rehacerlos. Se hace antes de C.1.2 y C.2.1. Las decisiones de detalle (tipo de método, obligatoriedad, marca de cuenta de sistema) siguen abiertas dentro de E.1.1 y E.1.3.
- **Decisión (2026-10-18): monedas en Alpha 1.0 (Epic N).** Cada movimiento tiene su moneda; los montos de monedas distintas **no se suman**, se muestran separados (una línea por moneda en las cards). Sin conversión. El modelo y los formularios van antes de C.1.2 y C.2.1 por la misma razón que los métodos de pago.
- **Decisión (2026-10-18), amplía la opción (a):** Alpha 1.0 incluye los **ingresos** (Epic M). En el Resumen, las cards pasan a ser: **Ingresos del mes** (real), **Gasto mensual** (real), **Net balance** del mes = ingresos − gastos (real) y **Facturas recurrentes** (placeholder). "Presupuesto restante" y "Ahorro estimado" salen de Alpha 1.0 (se solapan con el balance; se reevalúan en la Epic E). Sigue siendo una grilla de cuatro cards, sin cambio de layout.
- **Decisión (2026-10-13): opción (a).** US D.1.1 se recorta dentro del Hito 1 a la card de **"Gasto mensual" con datos reales**; las cards de "Presupuesto restante", "Ahorro estimado" y "Facturas recurrentes" se muestran como placeholders etiquetados (por ejemplo "Próximamente") hasta la Epic E. El resto de D.1.1 queda abierto y se cierra cuando exista la Epic E.
- **Decisión (2026-10-13): se desarrolla primero la funcionalidad completa y después se restringe por plan.** C.4.1 y C.4.2 (comparar gastos) y B.2.2 (card "Versión Pro") entran en el Hito 1 **sin el límite por plan**; los topes del plan gratuito se agregan después con H.3. Para que la restricción posterior sea barata, el límite se consulta en **un solo lugar** (un servicio/constante de "permisos del plan") y no se escribe `if (free)` repartido por los componentes.
- **Orden de trabajo propuesto (2026-10-13, sin confirmar del todo):** (1) A.6.1 filtro global (409); (2a, agregado 2026-10-18) métodos de pago y moneda: E.1.1–E.1.4 y N.1.1–N.2.1 (modelo y formularios), antes de las columnas y el panel porque cambian el modelo de `Expense`; (2) grilla funcional: C.1.2 y C.1.3; (3) panel de detalle C.2.1 (destraba B.3.4, B.2.3 y B.3.7; ahí se decide cómo se ve la app con el panel abierto); (4) buscador y topbar: B.3.4, B.3.6, B.2.3; (5) editar y eliminar: C.3.1 y C.3.2; (5b, agregado 2026-10-18) ingresos: Epic M (usa el contenedor del panel de C.2.1 y los patrones de C.3); (6) resumen: D.2.1, D.3.1 y D.1.1 recortada, con la librería de gráficos y el contrato de filtros; (7) filtro B.3.5 al final, cuando ya hay qué filtrar.
- **Decisión sobre el servicio de plan:** un servicio de "permisos del plan" que se crea al construir C.4.1 (primera función que lo consulta); aprobado por el usuario.
- **Decisión de filtrado:** los gráficos y cards deben poder filtrarse según lo que elija el usuario (B.3.5); se necesita un contrato de filtros único entre cliente y servidor. Dónde se agrega (cliente vs endpoints de agregación) queda pendiente.
- **Librería de gráficos:** decisión pendiente (se decide al llegar a D.2.1; criterios: tema oscuro, tooltips, tamaño del bundle, accesibilidad).
- **Componentes a diseñar como reutilizables** (criterio: se usan en más de un lugar con datos o configuración distintos, no solo "se ven siempre"): grilla, cards de métrica, contenedor de gráfico (título + selector de período + estado cargando/vacío/error), gráficos y panel de detalle del gasto. Regla de abstracción: solo cuando el código es grande, idéntico y evoluciona junto.


## EPIC A — Fundación de datos

### Feature A.1 — Modelo extendido de Expense/Category
- ✅ **US A.1.1**: Como sistema, necesito que `Expense` tenga `notes`, `status` y `accountId`, y que `Category` tenga `color`/`icon`, para soportar la UI del dashboard.
  - AC: Migración aplicada sin pérdida de datos existentes. `status` usa enum `ExpenseStatus` (`Completed`/`Pending`) con default `Completed`. `notes` opcional.

### Feature A.2 — Entidad Account (versión simple)
- ✅ **US A.2.1**: Como sistema, necesito una tabla `Account` con `id`, `name` único, `createdAt`, `updatedAt`.
  - AC: Migración aplicada. Relación `Expense.accountId` con FK a `Account`.
- ✅ **US A.2.2**: Como usuario, quiero un CRUD completo de cuentas (crear, listar) vía API.
  - AC: `POST /accounts`, `GET /accounts` — mismo patrón que `categories`. DTO validado (`name` string no vacío). *(Hecho: además, `AccountQuickCreate` embebido en `ExpenseForm`, mismo patrón que `CategoryQuickCreate`.)*

### Feature A.3 — Consistencia frontend/backend
- ✅ **US A.3.1**: Como desarrollador, necesito que las interfaces de Angular reflejen exactamente el schema real, para evitar bugs silenciosos.
  - AC: `category.model.ts` sin typos (`icon`, no `icont`). `ExpensesForm` incluye `accountId` obligatorio. `Expense.status` tipado con el enum, no `string` genérico. *(Hecho: `status` usa el tipo literal `'Completed' | 'Pending'` propio del frontend, sin importar el enum generado por Prisma, para no acoplar frontend/backend.)*

### Feature A.4 — Campo `date` propio en Expense + rango de fechas
- ✅ **US A.4.1**: Como sistema, necesito que `Expense` tenga un campo `date` propio (distinto de `createdAt`), para poder cargar gastos con fecha retroactiva sin pisar el timestamp de auditoría.
  - AC: `date DateTime @default(now())` agregado al modelo — no nullable, con default a la fecha actual si no se especifica. Migración aplicada.
  - AC: DTO de creación (`date`) opcional para el cliente, con la cadena de decoradores correcta: `@IsOptional()` + `@Type(() => Date)` (de `class-transformer`, convierte el string ISO entrante en instancia real de `Date`) + `@IsDate()` (valida que la conversión haya dado una fecha válida, no un `Invalid Date`). Requiere `transform: true` en el `ValidationPipe` global — *(nota: este flag es global, afecta la validación de todos los DTOs de la app; se verificó que no rompió los existentes)*.
  - Pendiente: agregar el campo `Fecha` (opcional) al `ExpenseForm` del frontend.
- ✅ **US A.4.2**: Como sistema, necesito exponer el rango de fechas (primer/último gasto) para que la UI pueda acotar la navegación por mes a datos reales.
  - AC: `GET /expenses/date-range` implementado vía `prisma.expense.aggregate({ _min: { date: true }, _max: { date: true } })`, con el resultado remapeado a una forma propia (`{ min, max }`) en vez de exponer la forma cruda `_min`/`_max` de Prisma. Probado con `curl` contra Neon.
  - AC: Tipo `ExpenseDateRange` en frontend honesto respecto al wire format — `min`/`max` tipados `string | null` (JSON no tiene tipo fecha nativo, viaja como string), contemplando el caso de tabla vacía (`null`).

### Feature A.5 — Entidad Merchant (Comercio) *(agregada 2026-10-07)*
- ✅ **US A.5.1**: Como sistema, necesito una tabla `Merchant` con `id`, `name` único, `createdAt`, `updatedAt`, para asignar cada gasto a un comercio reutilizable en vez de texto libre.
  - AC: Migración aplicada. Mismo patrón que `Category`/`Account` (mismo tipo de `id`).
  - Decisión (2026-10-08): `Merchant` **no tiene `description`** por ahora. Se puede agregar más adelante si hace falta; no es necesario para asignar comercios.
- ✅ **US A.5.2**: Como sistema, necesito que `Expense` tenga un campo `merchantId` con FK a `Merchant`.
  - Hecho (2026-10-08): `merchantId` obligatorio con la relación en el schema de Prisma, migración `add-merchant` aplicada tras `migrate reset` de la base de desarrollo. DTO de creación de gastos con `merchantId`. `GET /expenses` incluye el comercio (`merchant.name`), probado con `curl` contra Neon. Backend de A.5.2 cerrado. Frontend: modelo `Expense` (`merchantId`/`merchant`) y columna "Comercio" de la grilla hechos. Pendiente (no bloquea el cierre): el formulario de creación sigue sin enviar `merchantId`, así que crear un gasto desde la UI falla con 400 hasta el refactor del formulario (Feature F).
  - AC: Migración aplicada. `GET /expenses` incluye el comercio resuelto a nombre legible, igual que `category` y `account` (US C.1.2).
  - Decisión (2026-10-08): `merchantId` es **obligatorio**. Los datos actuales de desarrollo se descartan y se recrean desde cero, así que no hace falta comercio de relleno ni migración de datos existentes.
  - Decisión (2026-10-08, corregida): `Expense.description` **se mantiene**. Responde "qué fue el gasto" (ej. "compra semanal"); `notes` es para especificaciones adicionales; `Merchant` responde "quién". Son tres datos distintos. Lo que se descartó fue la `description` del **Merchant**, no la del gasto.
- ✅ **US A.5.3**: Como usuario, quiero crear y listar comercios vía API.
  - AC: `POST /merchants`, `GET /merchants`, DTO validado — mismo patrón que `categories` y `accounts`. Hecho y probado con `curl`.
  - Decisión (2026-10-08): el `name` se **normaliza** en el DTO (`@Transform`: `trim` + minúsculas, solo si `value` es un string), en lugar de validar y rechazar. Probado: espacios solos, número, `null` y campo ausente responden 400.
  - **Revisada el 2026-10-10 (ver US A.5.5):** el nombre ya no se pasa a minúsculas al guardar. Se conserva como lo escribe el usuario (con `trim`), y la unicidad pasa a ser insensible a mayúsculas.
  - Pendiente: el nombre repetido responde 500; se resuelve con el filtro global de la Feature A.6 (US A.6.1), que lo convierte en 409.
- ✅ **US A.5.4** *(agregada y cerrada 2026-10-09)*: Como desarrollador, necesito en el frontend la carpeta `merchants/` con su servicio y su modelo, para consumir `GET`/`POST /merchants`, con el mismo patrón que `categories`.
  - AC: `Merchants` (servicio singleton con `@Service()`): `httpResource` para el `GET` y método que devuelve el `Observable` del `POST` sin suscribirse. Modelo `Merchant` y `MerchantForm` (solo `name`, como el DTO del backend) — escritos.
  - AC: verificar el servicio contra la API real — **hecho (2026-10-09)**: el usuario confirmó que `GET` y `POST` funcionan desde el servicio de Angular contra el backend.
  - Nota: el modelo `Merchant` del frontend omite `createdAt`/`updatedAt` que devuelve la API; subconjunto aceptable si es intencional (confirmar la decisión).
- ✅ **US A.5.5** *(agregada 2026-10-10, cerrada 2026-10-11; el AC del 409 queda en A.6.1)*: Como usuario, quiero que el nombre del comercio se guarde tal como lo escribo (por ejemplo "Carrefour"), pero que no se puedan crear dos comercios que solo difieran en mayúsculas ("Carrefour" y "carrefour").
  - AC: El DTO deja de pasar el nombre a minúsculas: conserva el formato del usuario y solo aplica `trim` (solo si `value` es un string).
  - AC: La unicidad es **insensible a mayúsculas y minúsculas** y la garantiza la **base de datos**, no solo una consulta previa en el servicio (una comprobación "buscar y luego insertar" tiene condición de carrera). Opciones a evaluar: columna auxiliar normalizada con `@unique`, índice único sobre `lower(name)` con migración SQL, o tipo `citext`. Decisión pendiente.
  - AC: Un nombre repetido responde **409** (depende de A.6.1; hasta entonces responde 500).
  - Pendiente de decisión: aplicar la misma regla a `Category` y `Account` (hoy su `name` es `@unique` sensible a mayúsculas y sin normalización).
  - Nota: los datos de desarrollo se recrean (la base se puede resetear); no hace falta migrar los nombres ya guardados en minúsculas.
  - Avance (2026-10-11): decisión **`citext`** tomada. Extensión instalada en Neon mediante migración vacía (`--create-only` + `CREATE EXTENSION IF NOT EXISTS citext;` + `migrate deploy`), verificada con `SELECT * FROM pg_extension` (citext 1.8). `@db.Citext` validado con `prisma validate` y aplicado a `name` de `Merchant`, `Category` y `Account` en una sola migración (`ALTER COLUMN ... SET DATA TYPE CITEXT`, conversión en el lugar, sin pérdida de datos), aplicada en Neon. `CreateMerchantsDTO` sin `toLowerCase`, con `@Transform` de `trim` solo si es string. DTOs de `Category` y `Account` con el mismo `@Transform` de `trim`. Pruebas OK (2026-10-11): `"  Carrefour "` se guarda recortado, `"carrefour"` duplicado es rechazado (500 hasta A.6.1), `"   "` responde 400. Pendiente: el 409, que depende de A.6.1.
  - Nota técnica: el `ValidationPipe` global se registra con `whitelist: true, transform: true` (`main.ts`), por lo que los `@Transform` de los DTOs corren. Se usa **pnpm** (`pnpm prisma ...`), no `npx`.
- ⬜ **US A.5.6** *(agregada 2026-10-16, replanteada el mismo día; cambio próximo, sin fecha)*: Como usuario, quiero ver un término general (no "Merchant") en la interfaz para el destinatario de un gasto, porque no todos los gastos son hacia un comercio: también pueden ser hacia un amigo o un familiar (gastos hechos en conjunto que luego se dividen).
  - **Decisión (2026-10-16):** `Merchant` se queda como nombre interno (schema, DTOs, API, código) y `merchantId` sigue **obligatorio** (A.5.2 no se revierte). Cambia solo el **texto visible** en el frontend, con una palabra general. Por ahora solo en inglés; el español queda para cuando se implemente i18n.
  - **Etiqueta elegida (2026-10-16, provisoria): "Paid to".** Descartadas por ahora: "Recipient" (suena a transferencia; desparejo con "Paid by" de Epic J) y "Payee" (jerga financiera de EE. UU., queda como alternativa para la columna de la grilla). Misma etiqueta en todos lados.
  - Alcance en el front: etiqueta del campo en `ExpenseForm`, textos del quick-create, encabezado de la columna (C.1.2), placeholders/tooltips/validaciones, y mensajes de error que hoy dependen de `details.resource` (F.1.2).
  - Criterio de implementación: centralizar las etiquetas en un solo lugar (constantes o archivo de textos) en vez de hardcodearlas, así el día de i18n se traduce sin tocar componentes.
  - Pendiente a revisar: si las personas (amigo/familiar) conviven en la misma tabla que los comercios es una decisión de producto aparte; evaluarla junto con Epic J (modo compartido), que probablemente necesite su propio modelo (participantes, quién pagó, cuánto debe cada uno).
- Relacionadas: selector creatable de Comercio en el modal (extiende Feature F.2 con el mismo `SearchableSelect`; el design system ya lo prevé como dropdown extensible), columna "Comercio" de la grilla (US C.1.2) (la búsqueda de B.3.2 / B.3.4 es solo de gastos, no de comercios).

### Feature A.6 — Manejo de errores en la API *(agregada 2026-10-08)*
- ✅ **US A.6.1** *(cerrada el 2026-10-14 con pruebas parciales; recibe el AC de 409 de A.5.5)*: Como sistema, necesito un filtro de excepciones global de NestJS que traduzca los errores conocidos de Prisma a respuestas HTTP correctas, en lugar de responder 500 genérico.
  - AC: `P2002` (violación de unicidad, por ejemplo un nombre repetido en `Category`, `Account` o `Merchant`) responde **409 Conflict** con un mensaje claro.
  - AC: Se evalúan también `P2025` (registro no encontrado, para los futuros `PATCH`/`DELETE`, respondería 404) y `P2003` (violación de clave foránea, por ejemplo borrar un comercio con gastos asociados, respondería 409).
  - AC: Registrado una sola vez de forma global, de modo que aplique a todos los módulos sin repetir `try/catch` en cada servicio.
  - Origen: al probar `POST /merchants` con un nombre repetido, la API respondió 500.
  - Decisiones (2026-10-13): (1) filtro registrado con `APP_FILTER` en `AppModule` (permite inyectar dependencias, a diferencia de `useGlobalFilters`); (2) en Prisma 7 con `PrismaPg` el `meta` de `P2002` **no trae `target`**: trae `modelName` y `driverAdapterError.cause.constraint.index` (por ejemplo `Merchant_name_key`); (3) el 409 sale siempre que el código sea `P2002`; el mensaje tiene dos niveles: base con `modelName`, y el campo solo si el nombre de la restricción coincide con `<Modelo>_<campo>_key` con un único campo (lectura defensiva, sin romper si falta algún nivel); (4) el cliente nunca recibe nombre de índice, mensaje de Postgres ni stack; (5) se loguea el error original en el servidor con el `Logger`; (6) códigos no manejados se delegan al comportamiento por defecto de Nest (500); (7) respuesta con `statusCode: 409`, `message` como **string** y `error: 'Conflict'`.
  - Decisión (2026-10-13): **contrato de error** para errores controlados del backend: `{ statusCode, error, code, message, details? }`. `code` es un identificador estable en mayúsculas (para este caso `RESOURCE_ALREADY_EXISTS`); `details` lleva `{ resource, field? }`; `message` es un texto para desarrolladores y respaldo, no para mostrar. El **texto amigable lo decide el frontend** mapeando `code` + `details` en un solo lugar (componente de errores de F.1.2). Logging: el filtro registra el error original en el servidor con el `Logger`: `warn` para errores esperados del cliente (409), `error` con stack solo para 5xx inesperados; nada de eso viaja al cliente.
  - Decisión (2026-10-13): alcance ampliado de A.6.1 a `P2002`, `P2025`, `P2003` y `P2000`, con **dos filtros**: un catch-all (conserva el cuerpo de las `HttpException`; errores desconocidos → 500 genérico con log `error`) y uno específico de Prisma (`P2xxx`), registrados con `APP_FILTER` con el catch-all declarado primero. Los `P1xxx` (inicialización) caen en el catch-all como 500 por ahora. Los códigos se resuelven con una **tabla indexada por el código de Prisma**:

| Prisma | HTTP | `code` del contrato | `message` base (desarrollador) |
|---|---|---|---|
| `P2002` | 409 | `RESOURCE_ALREADY_EXISTS` | A record with the same unique value already exists |
| `P2025` | 404 | `RESOURCE_NOT_FOUND` | The requested record was not found |
| `P2003` | 409 | `RELATED_RESOURCE_CONFLICT` | The operation conflicts with a related record |
| `P2000` | 400 | `VALUE_TOO_LONG` | A provided value exceeds the allowed length |

  - Notas: `P2003` no distingue "borrar algo en uso" de "referenciar algo inexistente"; se acepta 409 para ambos. `P2025` se podrá probar recién en C.3 (`PATCH`/`DELETE`). Usar el enum `HttpStatus` y derivar el texto de `error` del estado.
  - Avance (2026-10-13): implementados `CatchEverythingFilter` (catch-all) y `PrismaErrorCatch` (`P2002`, `P2025`, `P2003`, `P2000`), tipo común `ApiErrorResponse`, tabla `prismaErrors` con `satisfies` y `Object.hasOwn` para la pertenencia. `details` lleva solo `resource` (de `meta.modelName`) y `field` (deducido del índice, que nunca sale al cliente); log `warn` para los códigos mapeados y `error` con stack para los no mapeados o desconocidos. Probado `P2002` en `POST /merchants`. **Pendiente:** probar el catch-all (400 de validación, ruta inexistente 404, error forzado → 500 genérico) y confirmar el orden de registro en `AppModule` (catch-all primero).
  - Cierre (2026-10-14): `getUniqueField` ahora omite `field` si el índice es compuesto. Verificado: `P2002` en `POST /merchants` (409 con `details`), y el catch-all con `HttpException` 400, 404, 409 y 500 (formato del contrato). Orden en `AppModule`: catch-all primero, Prisma después. Decisión aceptada: conviven `INTERNAL_SERVER_ERROR` (de `HttpException` 500) e `INTERNAL_ERROR` (error desconocido y código de Prisma no mapeado), y `NOT_FOUND` / `RESOURCE_NOT_FOUND`; el mapeo del frontend debe cubrir ambos.
  - **Sin probar (anotado a propósito):** (1) el 400 de `ValidationPipe` con lista (`VALIDATION_FAILED` + `details.errors`); (2) un error que no es `HttpException` (500 genérico + stack en el log); (3) el 409 de Prisma con los dos filtros registrados a la vez. Probar cuando haya tiempo, o al construir F.1.2.
  - Pendiente: alinear versiones de Prisma (`@prisma/client`, `prisma`, `@prisma/adapter-pg`) y repetir la prueba del 409 como control.
  - **Cambio de contrato (decidido por el usuario, 2026-10-13):** los 400 de `ValidationPipe` ahora se responden con `code: 'VALIDATION_FAILED'`, `message` string fijo (`The request contains invalid fields`) y la lista en `details.errors: string[]`. Por eso `message` es siempre un string: el tipo `ErrorMessage` del frontend (`message: string[]`) debe actualizarse (afecta F.1.2) y `ApiErrorResponse.details` debe incluir `errors?: string[]`.
  - Mejora pendiente (menor): `getUniqueField` devuelve `userId_name` para un índice compuesto; omitir `field` si lo extraído contiene `_`.
  - Consecuencia en el frontend: los 400 de `ValidationPipe` traen `message` como array y el 409 como string; (reemplazado por el cambio de contrato de arriba: `message` pasa a ser siempre string; F.1.2 debe actualizar `ErrorMessage` y contemplar `details.errors`).
  - Deuda detectada: versiones de Prisma desalineadas (`@prisma/client` 7.8.0, `prisma` ^7.8.0, `@prisma/adapter-pg` ^7.10.0); alinear tras esta US.
  - Pendiente relacionado (ver "On the horizon"): mostrar estos errores en la UI, hoy solo hay `console.error`.

---

## EPIC B — Shell visual (layout base)

### Feature B.1 — Sistema de diseño
- ✅ **US B.1.1**: Como desarrollador, quiero variables CSS globales (colores, radios, sombras, tipografía) para no repetir estilos sueltos por componente.
  - AC: Archivo de variables CSS global importado en `styles.css` — hecho, vía `@theme` de Tailwind v4 en `styles.css`, con los valores exactos del design system (paleta completa, `--color-cat-*`, radios, sombras, tipografía, espaciado).
  - AC: Paleta y radios consistentes con el mockup — hecho.
  - Detalle técnico resuelto en el camino: `--spacing` fijado explícitamente en `0.25rem` (Tailwind v4 deriva toda la escala de espaciado de un único multiplicador, no de valores fijos por paso — pinearlo evita drift silencioso si Tailwind cambia su default). Escala tipográfica completa overrideada (`--text-xs` a `--text-3xl`, más `--text-md` agregado ya que no existe en el theme default de Tailwind), incluyendo `--text-md--line-height` explícito porque una clave nueva no hereda line-height default de Tailwind, mientras que las claves ya existentes sí conservan su line-height default aunque se les overridee el tamaño.
- ✅ **US B.1.2** *(agregada y cerrada 2026-10-10; implementada con el asistente del editor, sin revisión de código en esta sesión)*: Como usuario, quiero que la app tenga un canvas gris azulado con superficies blancas elevadas (estética "soft dashboard"), para que la jerarquía visual sea clara y se sienta cercana a macOS.
  - AC: El fondo de la app (`bg-bg-app`) se oscurece respecto del valor actual; el valor final se decide mirando la pantalla (candidatos `#F1F4F8`, `#EEF2F7`). Los colores nuevos se toman con cautela: no se cambia la paleta completa, solo el canvas.
  - AC: Cada bloque funcional **padre** es una card (`rounded-lg`, `border-border-light`, `shadow-sm`, `p-5`); los hijos se acoplan al padre sin card ni sombra propia. Separación entre cards `gap-4`.
  - AC: Sombras recalibradas para el canvas nuevo reutilizando los niveles existentes (`--shadow-*`); no se agregan niveles nuevos.
  - AC: Todo por tokens del `@theme`; sin hex sueltos en templates.
  - AC: `AppShell` con margen alrededor; topbar, tabla y sidebar como superficies sobre el canvas. La tabla dentro de su card necesita `overflow-hidden` para respetar el radio.
  - Decisión: el contraste de bordes y controles lo revisa el usuario durante el desarrollo. El modo oscuro (B.5) será un tema sutil con tonalidades violeta/púrpura, no blanco↔negro; por eso los tokens deben cubrir todos los colores.
  - Hecho (2026-10-10): cambió el color de fondo y el layout. El componente `Topbar` agrupa ahora el buscador (`SearchInput`) con el selector de mes (`MonthSelector`), y la sidebar quedó pegada al costado izquierdo.
  - Sincronizado con `design-system.md` (2026-10-10): `bg-app` = `#E4E8EE`; sidebar flotante (`sticky top-4 h-[calc(100vh-2rem)]`); `Topbar` marcado como implementado.
  - Limpieza menor (no bloqueante): el `2rem` de la altura de la sidebar repite a mano el `top-4`, y `100vh` en mobile no descuenta las barras del navegador (usar `dvh`). Se revisa con B.2.3.
  - Especificación: sección "Superficies y composición" del `design-system.md`.
  - Relacionada: B.2.3 (sidebar colapsable) y C.2.1 (panel de detalle) se apoyan en estas superficies; conviene cerrar B.1.2 antes de construirlas.

### Feature B.2 — Sidebar de navegación
- ✅ **US B.2.1**: Como usuario, quiero una sidebar izquierda con logo, nombre de app y navegación vertical (Resumen, Gastos, Presupuestos, Categorías, Reportes, Ajustes).
  - AC: Ítem activo con fondo azul claro — hecho, vía `bg-primary-border` (se probó `bg-primary-soft` primero, pero resultó visualmente insuficiente contra el fondo blanco; `bg-primary-border` da el contraste correcto sin llegar al azul sólido) + `text-primary` compartido entre ícono y label, mismo patrón que `CategoryBadge`.
  - AC: Navegación sin funcionalidad real en secciones no implementadas aún — hecho, vía signal local `selectedOption` (sin rutas reales todavía; migrable a `routerLinkActive` cuando existan las páginas).
  - Detalle técnico: `sidebarOptions` tipado con `satisfies Record<string, SidebarOption>` (una sola validación de forma para todo el objeto, sin repetir por ítem) en vez de castear el ícono campo por campo. Estructura del sidebar: `<aside>` como contenedor único (ancho, fondo, padding, borde derecho separador de la página) con el bloque de header (logo/nombre/subtítulo, con borde inferior separador) y el `<nav>` semántico (solo los ítems de navegación) anidados dentro.
  - Cambio planeado (2026-10-18): se agrega el ítem **Income** a la navegación (ver US M.3.1).
  - Pendiente de limpieza menor (no bloqueante): sacar el `console.log`/`effect()` de debug del componente antes de considerar el código final.
- ⬜ **US B.2.2**: Como usuario, quiero ver una card de "Versión Pro" al pie de la sidebar con botón "Actualizar".
  - AC: Visual únicamente, sin lógica de suscripción todavía.
  - Decisión de secuencia (2026-09-24): pospuesta a propósito hasta abordar Epic H (plan premium), en vez de construirla como placeholder visual desacoplado. B.2.1 (header + nav) queda cerrada sin esta pieza.
- ⬜ **US B.2.3** *(agregada 2026-10-09)*: Como usuario, quiero que la sidebar se achique a solo íconos, con una transición animada, mientras el panel de detalle de un gasto está abierto, para que el panel tenga espacio sin perder la navegación.
  - AC: Al abrirse el panel de detalle (US C.2.1) la sidebar pasa de expandida a **colapsada** (solo íconos, sin texto); al cerrarse el panel vuelve a expandirse. Transición animada en ambos sentidos.
  - AC: Estado colapsado: cada ítem muestra un **tooltip** con su nombre al hacer hover, y conserva su nombre accesible (`aria-label`) aunque el texto no se vea. El ítem activo sigue distinguiéndose.
  - AC: La transición respeta `prefers-reduced-motion` (sin animación si el usuario lo pide).
  - Decisión (2026-10-09): el colapso es **solo automático**, derivado de la apertura del panel. No hay botón manual de colapsar/expandir ni preferencia persistente "mantener cerrada" (por ahora, sin planes). Al cerrar el panel siempre vuelve a expandirse.
  - Decisión de arquitectura (a confirmar al implementar): la sidebar deriva su estado del `selectedExpense` compartido (panel abierto = sidebar colapsada), sin conocer el panel. Si en el futuro se agrega botón manual, se revisa esta decisión (¿estado propio de la sidebar?).
  - Detalle técnico a evaluar: cómo animar el ancho sin recalcular el layout en cada fotograma (comparar `width` con alternativas).
  - Depende de: US B.2.1 (sidebar) y US C.2.1 (panel de detalle). Interacción con B.2.2: la card "Versión Pro" no cabe en el modo colapsado; decidir si se oculta o se reduce a un ícono.
  - Mobile: no aplica el colapso. Ver nota en US G.1.

### Feature B.3 — Topbar
- ✅ **US B.3.1**: Como usuario, quiero un selector de mes con flechas de navegación en la topbar, y además un dropdown para saltar directo a un mes/año específico.
  - AC: Cambiar de mes filtra los datos del dashboard/grilla visibles (conectado cuando existan datos reales).
  - AC pendiente (no bloquea el cierre de esta US): conectar `selectedMonth` con el filtrado real de la grilla/dashboard — se resuelve al construir la historia que consuma el mes elegido (Epics D/C).
  - Hecho (2026-10-07): componente `MonthSelector` con dropdown de todos los meses del rango + flechas Previous/Next. `selectedMonth` es un `linkedSignal` con `previous` (conserva la elección del usuario si el mes sigue existiendo tras recargar, si no cae al más reciente). Flechas por índice sobre `monthOptions` (ordenado del más nuevo al más viejo: Previous = `i + 1`, Next = `i - 1`), deshabilitadas en cada extremo con `computed()` (`isOldestMonth`/`isLatestMonth`). Comparación de meses por `getTime()` (valor primitivo), no por `label` ni por referencia de objeto. Verificado manualmente: mes más reciente, más antiguo, mes del medio desde el dropdown y sin datos.
  - AC agregado (2026-09-29): el rango navegable de mes/año está acotado al rango real de fechas existentes en `Expense` — no se puede navegar antes del primer gasto ni después del último. Requiere el endpoint `GET /expenses/date-range` (Feature nueva, ver A.4 más abajo).
  - AC agregado (2026-09-30): el selector combina dos formas de navegar — flechas para avanzar/retroceder un mes a la vez (navegación rápida), y un dropdown para saltar directo a cualquier mes dentro del rango disponible (búsqueda completa). Decisión de producto explícita: **se muestran todos los meses del rango, incluidos los que no tienen ningún gasto cargado** (Modelo "calendario", no "solo meses con datos") — un mes vacío es información válida ("no gasté nada este mes"), no un estado a ocultar. El dropdown tiene tamaño acotado (no ocupa toda la pantalla), con scroll si el rango de meses es largo.
  - Detalle técnico: el dropdown necesita la lista completa de meses entre `min` y `max` (generada en el frontend iterando mes a mes, sin pedirle nada nuevo al backend — sigue alcanzando con `GET /expenses/date-range`); las flechas en cambio no necesitan esa lista, les alcanza con comparar el mes/año actual contra `min`/`max` directamente.
  - Decisiones técnicas previas: estado de mes/año como dos signals separados (no un solo `Date`), pensando en poder filtrar por año solo a futuro. Mes indexado 0-11 (igual que `Date.getMonth()`) en vez de 1-12, ya que se descartó armar un array `Month` manual a favor de `Intl.DateTimeFormat` para el nombre — sin ese array, no había razón real para el indexado 1-12. Para el rollover de fin/inicio de año y para comparar el mes/año actual contra el rango mínimo/máximo del backend, se prefirió construir objetos `Date` reales y compararlos directamente (`<`/`<=`, que JS resuelve vía el timestamp interno) en vez de armar a mano una fórmula de comparación tipo `year * 12 + month`.
- ✅ **US B.3.2** *(cerrada 2026-10-09)*: Como usuario, quiero un buscador de gastos en la topbar, con su placeholder.
  - AC: Input visual funcional (atajo de teclado real es opcional/futuro). Componente propio (`SearchInput`), sin lógica de búsqueda todavía y sin inyectar `ExpensesService` mientras no haga falta.
  - Hecho: `<label>` contenedor con estilos del design system y `focus-within`; ícono con `currentColor`; `<input type="search">` con `#searchInput` (variable de plantilla tipada, sin `$any`), `autocomplete="off"`, `[aria-label]`; `model<string>` `inputText`; placeholder como `input()` con default en inglés.
  - Pendiente de verificar en el navegador: `border-radius` real (el design system pide 12px; `rounded-md` puede dar 6px), existencia del token `primary-border`, y decisión sobre la "x" nativa (hoy oculta con `appearance-none`; sin botón propio de limpiar todavía — a decidir junto con B.3.4).
  - Decisión (2026-10-08): el buscador es **solo de gastos** (no de comercios ni categorías). Placeholder a definir en inglés, de acuerdo con la decisión de producto de mantener el contenido de la app en inglés por ahora.
  - Decisión (2026-10-07): el indicador visual "⌘K" **no es requisito** de esta US. Es solo una aclaración de que existen shortcuts, no una pieza que necesite verse hoy.
  - A futuro (junto con la card de "Versión Pro", B.2.2 / Epic H.3): evaluar mostrar el atajo según el sistema operativo del usuario (⌘K en macOS, Ctrl+K en Windows/Linux). Depende de poder detectar el OS en el cliente; se agenda con el resto de las mejoras de la sidebar/plan premium, no antes.
- ✅ **US B.3.3** *(cerrada el 2026-10-10: el botón abre y el formulario cierra el diálogo; limpieza hecha; lo restante pasó a F.1.2 y F.1.3)*: Como usuario, quiero un botón "Agregar gasto" que abra el modal correspondiente (Epic F).
  - Decisión (2026-10-10): el modal se implementa con **Angular CDK Dialog** (`@angular/cdk/dialog`), no con Material ni con `<dialog>` nativo. Motivos: comportamiento sin estilo propio (foco atrapado, Escape, restauración del foco) para aplicar los tokens del design system; la dependencia `@angular/cdk` se va a necesitar igual para `SearchableSelect` (F.2.1); y permite pasar datos al abrir y recibir un resultado al cerrar, útil para "Editar/Duplicar" desde el panel de detalle (C.2.1). Sin relación con SEO: el modal no es contenido indexable.
  - Decisión (2026-10-10): no hay estado `isOpen` que alguien posea; el botón abre el diálogo vía el servicio `Dialog` y recibe el resultado al cerrarse. El modal no es hijo de la topbar (el CDK lo renderiza en el contenedor del overlay).
  - Cambio planeado (2026-10-18): el botón pasa a ser "+ Add Expense | Income" y el modal gana un selector animado Expense | Income (ver US M.2.1). El texto exacto de la etiqueta se confirma al diseñarlo.
  - AC: el botón abre el modal con el formulario actual; al guardar con éxito, se cierra y la grilla se actualiza. Cierre con X, Escape y click en el overlay.
  - AC: el formulario envía `merchantId` (campo de comercio con creación rápida, reutilizando el componente de creación de nombre de `Account` de forma genérica — sin saber de Account ni de Merchant). Cierra la deuda pendiente de A.5.2. Alcance provisorio: `<select>` + quick-create; el `SearchableSelect` completo es F.2.
  - Decisión (2026-10-10): componente genérico `shared/name-quick-create` (usado por Account y Merchant; Category queda aparte por color e ícono). Recibe por `input` el texto de la etiqueta y una **función** `save` que devuelve el Observable del `POST`; el propio componente maneja los estados de "enviando" y de error, y emite por `output` el registro creado (con su `id`). El padre (el formulario de gasto) recarga la lista y asigna el `id` al campo; el componente no conoce la lista. Descartadas: un `kind` con `if` interno y un componente que solo emite el nombre.
  - Hecho (2026-10-10): botón `CreateExpenseBtn` que abre `ExpenseForm` con CDK `Dialog`; el formulario se cierra solo con su `DialogRef` en `next`; `merchantId` en el modelo del formulario; componente genérico `shared/quick-create-form` (input `saveNew` con la función del `POST`, `output` `created` con el registro) usado para Account y Merchant; al crear, el padre cierra el panel y asigna el `id` al campo. Probado: crear cuenta/comercio hace una sola llamada y el `<select>` queda con el valor asignado.
  - Hecho (2026-10-10, cierre): `quick-create-form` con foco automático en el input al abrirse (`viewChild.required` + `afterNextRender`, corre cada vez que el `@if` lo renderiza) y estilos con tokens del design system.
  - Limpieza hecha (2026-10-10): `required(f.merchantId)`; `AccountQuickCreate` borrado con su import y HTML comentado; `CreateExpenseBtn` sin `subscribe` ni genérico (solo abre); botón con tokens del botón primario (ícono `plus`, "Add Expense"); botón ubicado junto al searchbar.
  - Fuera de la US (se trabajan en otras): estado "enviando" y mensaje de error en `quick-create-form` y validación de nombre solo con espacios (F.1.2); mover los `reload()` de las listas a los servicios con `tap` tras el `POST` (US a agendar).
  - Nota (aceptada como riesgo bajo, 2026-10-10): los `<form>` anidados no dispararon doble envío en la prueba, pero es HTML inválido; si algún día falla, se cambia el hijo a un contenedor sin `<form>`.
  - Verificado (2026-10-10): prueba con Slow 3G de la asignación del `id` tras `reload`; funcionó como se esperaba, sin condición de carrera.
  - Fuera de alcance: F.2 (selects creatables con CDK Overlay) y el submenú de Category con color e ícono.
- ⬜ **US B.3.4** *(agregada 2026-10-07, recortada 2026-10-08)*: Como usuario, quiero que el buscador muestre debajo sugerencias de los gastos del mes seleccionado que coincidan con lo que escribo, y que al elegir una se abra el panel de detalle de ese gasto.
  - AC: Alcance de la búsqueda = **solo los gastos del mes elegido en el selector (B.3.1)**. El alcance tiene que ser visible para el usuario (por ejemplo en el placeholder o en el estado "sin resultados", con el nombre del mes).
  - AC: Mientras se escribe, aparece una lista de sugerencias bajo el input. Cada sugerencia muestra lo necesario para distinguir gastos parecidos (fecha, comercio, monto, categoría). Entre 5 y 8 resultados, pequeña espera antes de buscar.
  - AC: Estado sin resultados con un mensaje orientativo, solo texto (no funcional): "Expense not found. Try changing the month." Aclara el alcance sin agregar ninguna acción.
  - AC: Teclado: flechas para moverse, Enter para elegir, Esc para cerrar (patrón combobox, con los roles ARIA correspondientes).
  - AC: Elegir una sugerencia **solo abre el panel "Detalle del gasto"** (US C.2.1). No filtra la grilla ni la modifica: lo que se hace desde la grilla también se puede hacer desde el panel.
  - Decisión de arquitectura: un único estado compartido `selectedExpense`, escrito por la grilla (click en fila) y por el buscador, y leído por la grilla (resaltado si la fila está en el mes) y el panel. El buscador no conoce la grilla ni el panel.
  - Decisión (2026-10-08): si el usuario cambia de mes con el panel de detalle abierto, el panel **se cierra**.
  - Decisión pendiente: qué campos se buscan. Candidatos: `description`, comercio, notas y categoría; evaluar monto.
  - Decisión (2026-10-08): el filtrado de sugerencias se hace **en el cliente**, sobre los gastos del mes elegido que ya están cargados. Sin endpoint de búsqueda en el backend. Se revisa solo si el volumen de gastos por mes crece lo suficiente como para notarse o si la grilla pasa a paginar.
  - Depende de: US B.3.2 (input base), US B.3.1 (mes compartido) y US C.2.1 (panel de detalle). No se puede cerrar antes de que exista el panel.

- ⬜ **US B.3.5** *(agregada 2026-10-11)*: Como usuario, quiero un botón "Filter" (ícono de embudo/*funnel* a la izquierda del texto) en la topbar que me permita combinar varios filtros de gastos, y que esos filtros afecten a la grilla, a los gráficos del resumen y a los de las demás tabs, de modo que todo se recalcule solo con los gastos filtrados.
  - AC: Botón en la topbar con el ícono `funnel` (Lucide) y el texto "Filter"; abre un panel de filtros (CDK Overlay o Dialog, a decidir). Con filtros activos, el botón muestra cuántos hay (*badge*) y hay una forma visible de limpiarlos todos.
  - AC: Los filtros se **combinan** (AND entre dimensiones distintas; OR dentro de una misma dimensión multi-selección).
  - AC: Los gráficos y las cards de resumen (Epic D) y las demás tabs reflejan los gastos filtrados, no el total del mes.
  - Dimensiones de filtro candidatas (a priorizar): rango de fechas / mes (ya existe el selector B.3.1: decidir cómo conviven); categoría (multi); cuenta (multi); comercio (multi); estado (`Completed`/`Pending`); rango de monto (mín/máx); texto en descripción/notas (se solapa con el buscador B.3.2/B.3.4: decidir si se unifican); con/sin comercio asignado; solo gastos recurrentes o en cuotas cuando existan (Epic E).
  - Otras ideas a evaluar: filtros guardados con nombre (*presets*, por ejemplo "Comida del último trimestre"); filtros rápidos tipo *chip* (este mes, últimos 30 días, mayores a X); persistir los filtros activos en la URL (*query params*) para poder compartir y recargar sin perderlos; invertir el filtro (excluir una categoría).
  - Decisión técnica pendiente 1: **dónde vive el estado.** Igual que `selectedMonth`: un estado compartido por un servicio singleton (una *signal* de filtros), que leen la topbar, la grilla y los gráficos. Evaluar `linkedSignal`/`computed` derivados para no duplicar estado.
  - Decisión técnica pendiente 2: **dónde se filtra.** En cliente (rápido, ya se hace en el buscador) o en el servidor (los gráficos suelen agregar en SQL y no conviene traer todos los gastos). Los endpoints de agregación de Epic D deberían aceptar los mismos filtros; definir un contrato de filtros único (DTO de query) reutilizado por grilla y gráficos.
  - Decisión técnica pendiente 3: relación con el selector de mes B.3.1 (¿el mes es un filtro más o un contexto aparte?) y con el buscador B.3.2/B.3.4.
  - Depende de: Epic D (gráficos) y C.1 (grilla) para que el efecto sea visible; de B.4.1 (ícono `funnel`); posible dependencia de A.4 (rango de fechas ya disponible en backend). Hasta que existan los gráficos, se puede construir y probar el estado y el panel sobre la grilla.
  - Origen: pedido del usuario, 2026-10-11.

- ⬜ **US B.3.6** *(agregada 2026-10-13)*: Como usuario, quiero ver mi avatar y mi nombre en la topbar y, al hacer click, abrir un menú con la opción de cerrar sesión.
  - AC: Bloque de usuario en la topbar (avatar + nombre). Click abre un menú con "Log out" (CDK Overlay/Menu, con teclado y `aria`).
  - Decisiones pendientes: (1) autenticación: sin login hoy (Epic I.1); definir si esta US usa un usuario mock y el "Log out" queda visual hasta I.1; (2) foto de perfil: subir una imagen implica almacenamiento, validación de tipo/tamaño y un endpoint, bastante más grande; por ahora avatar por defecto con iniciales; (3) otras opciones del menú además de "Log out"; (4) nombres largos (truncar con puntos suspensivos).
  - Se puede hacer antes de C.2.1 con la topbar actual.
- ⬜ **US B.3.7** *(agregada 2026-10-13; decisión diferida)*: Como usuario, quiero que la aplicación se adapte cuando el panel de detalle del gasto está abierto (menos ancho disponible).
  - Idea original: Add Expense y Filter pasan a solo ícono, el bloque de usuario a solo avatar, el selector de mes igual, el buscador quizá más chico. Se evaluó que la sidebar colapsada (B.2.3) libera ancho pero puede no alcanzar.
  - **Decisión (2026-10-13): se decide cómo se ve la aplicación con el panel abierto recién cuando exista C.2.1**, mirando la pantalla real; no se diseña antes. Esta US queda como marcador.
  - Opciones a evaluar entonces: compactar la topbar, esconder gráficos o dejar uno centrado, y que la grilla se achique. Para el ancho dependiente del panel (no del viewport) usar *container queries* de Tailwind v4 (`@container`), no *media queries*.
  - Layout: con el panel de arriba a abajo, la topbar deja de ser de ancho completo (impacta en `AppShell`: grid o flex).
  - Depende de: C.2.1, B.2.3, B.3.5, B.3.6.
### Feature B.4 — Sistema de íconos
- ✅ **US B.4.1**: Como desarrollador, quiero elegir una librería de íconos lineales (Lucide/Heroicons/Tabler) consistente con el estilo Apple HIG del mockup.
  - AC: Decisión definitiva: **`@lucide/angular` + `@lucide/icons`** (no el paquete deprecado `lucide-angular`). Se evaluó y descartó `@tabler/icons-angular` (oficial, pero sin soporte de import dinámico por nombre sin registro previo — no servía para el selector con scroll infinito de F.2.1). Resolución vía `lucideDynamicIconImports` (`@lucide/icons/dynamic`) + componente dinámico `svg[lucideIcon]`. Instalación e ícono de prueba renderizado — hecho.
- ✅ **US B.4.2**: Como desarrollador, quiero un componente `IconRenderer` reusable que muestre un ícono dado su nombre (string) y opcionalmente un color de fondo.
  - AC: Recibe `iconName`/`color` como inputs — hecho, con resolución dinámica vía `lucideDynamicIconImports` (patrón `effect()` + IIFE async para manejar la promesa de import), sin necesidad de registro previo del ícono.
  - AC: Fallback visual si el nombre de ícono no existe en la librería — hecho.
  - AC: Usado en grilla de expenses (US C.1.2) — hecho, vía `CategoryBadge` (chip con fondo lavado usando `color-mix()` + ícono/texto en tono oscurecido con `computed()`) envuelto en `CategoryBadgeCellRenderer` (`ICellRendererAngularComp`) para integrarlo en AG Grid sin ensuciar el componente original.
  - AC pendiente (no bloquea el cierre de esta US): uso en dropdown de categoría (US F.2.1) y panel de detalle (US C.2.1) — se resuelve naturalmente al construir esas historias, ya que consumen el componente ya terminado, no lo reconstruyen.

### Feature B.5 — Tema oscuro *(futuro, no bloqueante)*
- ⬜ **US B.5.1**: Como usuario, quiero poder alternar entre modo claro y modo oscuro, manteniendo la misma identidad visual (Apple HIG) en ambos.
  - AC: Depende de que el sistema de diseño (Feature B.1) esté construido sobre variables CSS, no valores hardcodeados — condición ya cumplida por diseño desde el inicio. Definir set de variables `--*-dark` equivalente al set actual (fondo, texto, bordes, sombras, colores de categoría) respetando contraste accesible. Toggle persistente (localStorage o preferencia de usuario) y detección de `prefers-color-scheme` como default inicial.
  - AC: Los colores de categoría (pasteles) y los charts deben tener variante oscura coherente, no solo invertir el fondo.
  - Nota: se aborda después de que el shell visual (Epic B) y el modal con selects creatables (Epic F) estén cerrados en modo claro — evita rehacer trabajo dos veces.

---

## EPIC C — Gestión de gastos (grilla + inspector)

### Feature C.1 — Grilla de transacciones
- ✅ **US C.1.1**: Como usuario, quiero ver mis gastos en una grilla AG Grid conectada a datos reales.
  - AC: Columnas mostrando datos reales de `GET /expenses`, reflejando el schema actualizado (`description`, `amount`, `createdAt`, `notes`, `status`).
- 🟡 **US C.1.2** (parcial): Como usuario, quiero columnas completas: checkbox, Fecha, Comercio, Categoría (con color/ícono), Cuenta, Monto, Estado, Notas.
  - AC: `categoryId`/`accountId` resueltos a nombres legibles ✅ — resuelto vía `include`+`select` anidado en `ExpensesService.getExpenses()` (Nest) y dot notation en `ColDef.field` (`'category.name'`, `'account.name'`) del lado de AG Grid, sin aplanar la respuesta ni duplicar lógica de cruce en el frontend.
  - AC: color/ícono de categoría visibles en la columna (no solo el nombre) ✅ — resuelto vía `CategoryBadge` (chip con `color-mix()` + ícono, usando el `IconRenderer` de B.4.2) integrado en la grilla mediante `CategoryBadgeCellRenderer` (`ICellRendererAngularComp`). Detalle técnico resuelto en el camino: distinción correcta entre `params.value` y `params.data` dentro del cell renderer.
  - Cambio planeado (2026-10-18): se agrega la columna "Payment method" (ver US E.1.4).
  - Cambio planeado (2026-10-18): el monto se formatea según su moneda (ver US N.3.1).
  - AC pendiente: checkbox de selección de fila, formato de columnas según mockup (orden, anchos, estilo).
  - Decisión provisoria (2026-10-13): las columnas ocupan todo el ancho con **anchos relativos** (no fijos) y, si el panel de detalle achica la grilla, el texto largo se recorta (`truncate`, `min-width: 0`) con *tooltip* al pasar el mouse; el texto completo está en el panel. Pisos de ancho: monto y fecha nunca se recortan; comercio y descripción sí. Alinear montos a la derecha (revisar el design system en lugar de centrar todo). A revisar al terminar C.2.1.
- ✅ **US C.1.3** *(cerrada el 2026-10-16)*: Como usuario, quiero seleccionar una fila y ver su checkbox marcado.
  - Hecho: `rowSelection` con `mode: "singleRow"` y `RowSelectionModule`; handler `(selectionChanged)` que lee `const [selectedRow] = event.api.getSelectedRows()` y llama al servicio (sin riesgo de `TypeError` al deseleccionar); `getRowId` con el `id` para que la selección sobreviva a `reload()`.
  - Decisión (2026-10-16): el estado de selección vive en `ExpensesService`: signal **privada** con el `id` (`string | undefined`, inicia en `undefined`), versión de solo lectura `selectedId` (`asReadonly()`), método `modifySelectedRowId(id)` como única forma de escribir, y `expenseSelected` como `computed` que lee el `id` y busca en `getExpenses.value()` (devuelve `undefined` si no hay `id` o no existe). No se guarda una copia de la fila. Se evaluó `linkedSignal` y se descartó para el gasto (es escribible; el valor es puramente derivado); podría usarse para el `id` si se quiere limpiar al desaparecer de la lista (relevante en C.3.2).
  - Probado: la selección persiste tras crear un gasto desde el modal (`reload()`).
  - Pendiente menor: quitar `selectedRow`/`selectedRowId` de la grilla si siguen; renombrar a `selectedExpense`/`selectExpense` (preferencia); tipar el evento (`SelectionChangedEvent<Expense>`); quitar los strings viejos del tipo de `rowSelection`; confirmar selección simple como decisión definitiva.
- ⬜ **US C.2.1**: Como usuario, quiero un panel lateral que muestre el detalle completo del expense seleccionado en la grilla.
  - AC: Panel reactivo a la selección de fila. Incluye acciones: Editar, Duplicar, Eliminar gasto (Eliminar con confirmación).
  - AC (agregado 2026-10-18): el panel muestra **todos** los campos del gasto: descripción, monto, fecha, fecha de creación y de actualización, estado, cuenta, categoría, "Paid to" (A.5.6) y las notas en un área de texto más grande. Arriba lleva el avatar de categoría (US C.2.2). Sin gasto seleccionado no se muestra (`@if (selectedExpense(); as expense)` en el componente de la feature, no en el contenedor).
  - Cambio planeado (2026-10-18): el panel también muestra el método de pago (ver US E.1.4).
  - Decisiones (2026-10-18):
    - Comportamiento con el panel abierto: **opción a**, la grilla se achica (anchos relativos + `truncate` + tooltip). Se confirma lo decidido el 2026-10-13. B.3.7 sigue diferida.
    - El **contenedor** del panel es genérico y vive en `shared/` (marco con el estilo del design system: `bg-bg-surface`, `rounded-xl`, `shadow-md`, `p-5`–`p-6`; botón de cerrar; estado abierto/cerrado). Recibe el contenido por `ng-content` (con slots `select` si hacen falta). Se reutiliza en otros tabs (por ejemplo Category).
    - El **contenido** de cada entidad vive en su feature (`expenses/`, `categories/`). El `@if` va en el padre porque el contenido proyectado lo crea el padre aunque el contenedor esté cerrado.
    - Pendiente por decidir: cómo se controla abierto/cerrado (`input()`, `model()` o servicio).
    - Revisar al terminar: probar si el panel parpadea al cambiar de mes (el `value()` del recurso puede quedar en `undefined` mientras carga).
    - Nombre: el `computed` se llama hoy `selectExpense`; la preferencia es `selectedExpense`.
  - Depende de: US C.2.2 (avatar de categoría).
- ⬜ **US C.2.2** *(agregada 2026-10-18)*: Como usuario, quiero ver un avatar circular con el ícono de la categoría, más grande y sin el nombre, sobre el color de la categoría, para distinguir de un vistazo qué tipo de gasto es.
  - AC: componente propio (por ejemplo, `CategoryAvatar`) en `categories/`, compuesto de `IconRenderer`. Se usa en el panel de gastos (C.2.1) y en el panel de categorías.
  - AC: recibe solo lo que usa (color e ícono), no la categoría entera, y tiene un `input()` de tamaño con los tamaños que se necesitan hoy.
  - AC: el cálculo del color de fondo (`color-mix()`) se comparte con `CategoryBadge` en un solo lugar, para no duplicarlo.
  - Decisión: se descartó mostrar las iniciales del comercio (con "Paid to" el destinatario puede ser una persona) y se elige el ícono de la categoría como señal principal.

### Feature C.3 — Update y Delete
- ⬜ **US C.3.1**: Como usuario, quiero editar un expense existente.
  - AC: `PATCH /expenses/:id` — actualiza campos enviados, devuelve el registro actualizado. Editable desde la grilla o el panel de detalle.
- ⬜ **US C.3.2**: Como usuario, quiero eliminar un expense.
  - AC: `DELETE /expenses/:id` — con confirmación en UI antes de ejecutar.
- ⬜ **US C.3.3**: Mismo par de endpoints para `categories` y `accounts`.
  - AC: Considerar qué pasa al eliminar una categoría/cuenta con expenses asociados (bloquear, o reasignar).

### Feature C.4 — Comparar gastos *(agregada 2026-10-08)*
- ⬜ **US C.4.1**: Como usuario, quiero una acción "Comparar" en el panel de detalle del gasto, para comparar el gasto seleccionado con otros gastos y ver la diferencia de precio.
  - AC: La acción abre un submenú lateral del mismo estilo que el de creación (F.2.1). De un lado, el gasto seleccionado (base de la comparación). Del otro, un dropdown de mes y, una vez elegido, un dropdown o grilla con los gastos de ese mes para agregar a la comparación.
  - AC: El límite de gastos comparados depende del plan. **Sin versión Pro**: el gasto base se compara con **1 solo gasto** de otro mes. **Con versión Pro**: hasta **5 gastos en total**, de cualquier mes (del mismo o de meses distintos). Ambos límites son valores configurables y pueden cambiar en el futuro.
  - AC: Al llegar al límite del plan gratuito, el submenú indica que la versión Pro permite comparar hasta 5 gastos (solo mensaje; la lógica real de planes es la de Feature H.3, mockeada).
  - AC: Cada gasto comparado muestra la **diferencia de precio** y el **porcentaje de diferencia** contra el gasto base. Si el usuario gastó **menos** que en el gasto comparado, el resultado es positivo y se muestra en **verde**. Si gastó **más**, es negativo y se muestra en **rojo**. Ejemplo: base $80 contra comparado $100 = +$20, verde. Base $100 contra comparado $80 = -$20, rojo.
  - AC: Los gastos con distinto comercio o distinta categoría que el base también se pueden comparar, y se muestran con su comercio y categoría visibles para que el usuario sepa qué está comparando.
  - AC: El color no es la única señal: se acompaña con signo (+/-) y/o flecha, para que se entienda sin distinguir rojo de verde.
  - Decisión (2026-10-08): el porcentaje se calcula siempre sobre el gasto base, es decir (comparado - base) / base. Si el base es 0, se muestra "-" en lugar del porcentaje.
  - Depende de: Feature H.3 (distinción premium/free, mockeada) para el límite por plan, US C.2.1 (panel de detalle), Feature A.5 (comercio, para la similitud por comercio) y un acceso a gastos de otros meses (a diferencia del buscador de B.3.4, que se queda en el mes elegido). Decisión pendiente: cómo se cargan esos gastos (todos en el cliente o un endpoint por mes).
- ⬜ **US C.4.2**: Como usuario, quiero un botón que autocomplete la comparación con gastos similares de los meses anteriores, para no buscarlos uno por uno.
  - AC: El botón agrega, de los **5 meses anteriores** al mes del gasto seleccionado, **un solo gasto por mes**: el que más se parezca al base. Para ser candidato tiene que coincidir **en categoría y en comercio** (los dos, no uno solo).
  - AC: Si solo coinciden algunos meses, se agregan únicamente esos meses (puede ser uno, dos o ninguno). No se rellena con gastos que no coincidan. Si no hay ninguno, el usuario elige manualmente (US C.4.1).
  - Detalle menor, a confirmar al implementar: si en un mismo mes hay más de un gasto que coincide en categoría y comercio, se toma el más reciente de ese mes.
  - El usuario puede quitar o reemplazar cualquiera de los gastos agregados después.
  - Depende de: US C.4.1. Pendiente de definir: cómo se comporta el autocompletado en el plan gratuito, donde el límite es 1 gasto (por ejemplo, trae solo el más reciente que coincide). Se decide junto con la lógica de planes de Feature H.3.


---

## EPIC D — Dashboard financiero

### Feature D.1 — Cards de resumen
- ⬜ **US D.1.1**: Como usuario, quiero ver cards de "Gasto mensual", "Presupuesto restante", "Ahorro estimado" y "Facturas recurrentes" con datos reales del período seleccionado.
  - Con monedas (2026-10-18): cada card muestra un total por moneda (ver US N.3.2); nunca se suman montos de monedas distintas.
  - Reformulada (2026-10-18): las cards de Alpha 1.0 son **Ingresos del mes**, **Gasto mensual**, **Net balance** (ingresos − gastos del mes; no es el balance de una cuenta de E.3) y **Facturas recurrentes** (placeholder). "Presupuesto restante" y "Ahorro estimado" quedan para la Epic E. Los valores de ingresos y balance salen de la Epic M, no de la Epic E.
  - AC: Valores calculados desde Epic E. Comparación vs. mes anterior (ej. "-12% vs. $1,120 en septiembre").
  - Decisión (2026-10-13): dentro del Hito 1 solo la card "Gasto mensual" es real (incluida la comparación vs. mes anterior, que se calcula con gastos); las otras tres son placeholders etiquetados hasta la Epic E. La US D.1.1 se considera cerrada para el hito cuando la card real y los placeholders estén, y se reabre al construir la Epic E.

### Feature D.2 — Gráfico "Gastos en el tiempo"
- ⬜ **US D.2.1**: Como usuario, quiero un gráfico de barras de gastos mensuales con un selector de rango (últimos 3/6/10 meses).
  - AC: Cambiar el selector recalcula y re-renderiza el gráfico. Librería de charting — decisión pendiente al llegar a esta fase.

### Feature D.3 — Gráfico "Gastos por categoría"
- ⬜ **US D.3.1**: Como usuario, quiero un gráfico de dona con el desglose por categoría y un selector de período (este mes/mes anterior/histórico).
  - AC: Leyenda con color, nombre y porcentaje por categoría. Selector independiente del de D.2 (a confirmar si comparten estado).


---

## EPIC E — Presupuestos, balances y cuotas

> Nota (2026-10-18): la Feature **E.1** (métodos de pago) forma parte de **Alpha 1.0**; el resto de la Epic E queda después.

### Feature E.1 — Jerarquía real de cuentas y métodos de pago
- ⬜ **US E.1.1** *(ampliada 2026-10-18)*: Como sistema, necesito una entidad `PaymentMethod` (método de pago) asociada a una `Account`, y que `Expense` pueda referenciar un método de pago.
  - AC: tabla `PaymentMethod` con `id`, `name`, `accountId` (FK a `Account`), `createdAt`, `updatedAt`. `Expense` gana `paymentMethodId` (FK, nullable al inicio para no romper los gastos existentes). Migración de datos existentes sin pérdida.
  - AC (validación en el servidor): si el gasto trae `paymentMethodId`, el método debe pertenecer a la cuenta del gasto; si no, responde 400/422 con el contrato `ApiErrorResponse` (A.6.1). No alcanza con validarlo en el formulario.
  - **Decisión (2026-10-18): pago en efectivo = cuenta especial "Cash".** Existe siempre, con un único método de pago también llamado "Cash". Así `accountId` sigue obligatorio y el gasto en efectivo tiene `paymentMethodId` como cualquier otro. Ver E.3.1 (el efectivo descuenta del pool general).
  - Consecuencias de la cuenta "Cash": se crea por migración o seed (no la crea el usuario); no se puede borrar ni renombrar; el nombre "Cash" queda reservado (crear otra cuenta con ese nombre devuelve 409, ya que `Account.name` es único e insensible a mayúsculas por `citext`); su método tampoco se edita. Pendiente: cómo se marca como cuenta de sistema (campo booleano o identificar por nombre/id fijo).
  - Pendiente: el método es solo un nombre libre ("Visa débito") o lleva un tipo (débito/crédito). El tipo crédito se conecta con las cuotas (E.4).
- ⬜ **US E.1.2** *(agregada 2026-10-18)*: Como usuario, quiero agregar los métodos de pago de una cuenta cuando la creo.
  - AC: el formulario de creación de cuenta permite definir su lista de métodos de pago (nombre de la cuenta + uno o más métodos). Hoy el quick-create de cuenta pide solo el nombre (F.2.2); este flujo necesita un formulario más rico que el genérico `QuickCreateForm`.
  - AC: la API de creación de cuenta acepta los métodos en la misma operación, de forma atómica (una cuenta no queda creada sin sus métodos si falla alguno).
  - Pendiente: agregar, renombrar o quitar métodos de una cuenta ya creada (hoy fuera de este alcance).
  - Depende de: E.1.1.
- ⬜ **US E.1.3** *(agregada 2026-10-18)*: Como usuario, quiero elegir el método de pago al crear un gasto, con opciones que dependen de la cuenta seleccionada (salvo pago en efectivo).
  - AC: el campo "Payment method" del formulario de gasto se habilita al elegir cuenta y lista solo los métodos de esa cuenta. Si cambia la cuenta, el método elegido se limpia.
  - AC (decisión 2026-10-18): al elegir la cuenta "Cash", el método "Cash" se **autoselecciona** y el campo queda **bloqueado** (no editable). Es el único caso en que no se puede cambiar el método. Al volver a otra cuenta, el campo se desbloquea y se limpia.
  - AC: el payload de creación envía `paymentMethodId`; los errores del backend se muestran con el mapeo de F.1.2.
  - Pendiente: si es obligatorio cuando la cuenta tiene métodos, y qué pasa si la cuenta no tiene ninguno (con "Cash" autoseleccionado, el efectivo queda cubierto).
  - Depende de: E.1.1, E.1.2, F.1.1.
- ⬜ **US E.1.4** *(agregada 2026-10-18)*: Como usuario, quiero ver el método de pago de cada gasto en la grilla y en el panel de detalle.
  - AC: columna "Payment method" en la grilla (C.1.2) y campo en el panel de detalle (C.2.1). Los gastos sin método (anteriores o en efectivo) se muestran con un valor vacío claro.
  - Depende de: E.1.1.

### Feature E.2 — Carga de presupuesto por período
- ⬜ **US E.2.1** *(reformulada 2026-10-18)*: Como usuario, quiero ver cuánto ingresó a cada cuenta (por ejemplo sueldo → Santander).
  - Nota: la carga de ingresos pasó a la **Epic M**. Esta US usa el `accountId` opcional de `Income` (M.1.1) para agrupar ingresos por cuenta y alimentar el balance de cada cuenta (E.3).
  - Texto anterior: "cargar un monto de ingreso mensual asignado a una cuenta específica". Se reemplaza porque un ingreso es un movimiento con fecha, no un monto mensual.
- ⬜ **US E.2.2** *(reformulada 2026-10-18)*: Como usuario, quiero definir un presupuesto planificado del mes (por ejemplo límites por categoría), distinto de los ingresos cobrados.
  - AC: "Presupuesto restante" = presupuesto planificado − gastos del mes. Definición pendiente (por categoría o total).
  - Texto anterior: "presupuesto total = suma de todos los ingresos". Ese cálculo ahora lo cubre el Net balance de la Epic M.

### Feature E.3 — Débito automático por gasto
- ⬜ **US E.3.1**: Como sistema, al crear un expense con una cuenta asociada, debo descontar el monto del balance de esa cuenta.
  - AC: Balance de cuenta refleja el gasto inmediatamente. Gasto en efectivo descuenta del pool general, no de una cuenta específica.

### Feature E.4 — Gastos en cuotas
- ⬜ **US E.4.1**: Como usuario, quiero registrar un gasto en cuotas y que el sistema sepa cuánto compromete a futuro.
  - AC: Definición pendiente — decidir entre un registro único con `nroCuotas` vs. un registro por cuota. Afecta cálculo de balance disponible (dinero comprometido vs. disponible).


---

## EPIC F — Modal "Agregar gasto" con selects creatables

### Feature F.1 — Formulario base de creación
- ✅ **US F.1.1**: Como usuario, quiero un formulario para crear un expense con validaciones (Signal Forms) replicando las reglas del backend.
  - AC: *(Hecho, pendiente migrar a formato modal centrado con overlay — ver Feature F.3)*.
- 🟡 **US F.1.2** *(agregada 2026-10-10; parcial)*: Como usuario, quiero ver un mensaje claro cuando falla la creación de un gasto, para saber qué pasó sin perder lo que escribí.
  - AC: Si el `POST` falla, el diálogo **permanece abierto** con los datos cargados y se muestra un mensaje de error dentro del formulario (un `signal` local con el mensaje; el formulario es quien lo escribe y lo muestra, sin pasar por el botón).
  - AC: El mensaje depende del tipo de fallo: sin conexión (status 0), datos rechazados por el servidor (400), valor duplicado (409) y error genérico del servidor (5xx). Texto en inglés, orientado a la acción ("Couldn't save the expense. Check your connection and try again.").
  - AC: El mensaje se anuncia a lectores de pantalla (`role="alert"`), usa los tokens de estado de peligro del design system y se limpia al volver a enviar.
  - AC: Mientras el `POST` está en vuelo, el botón "Guardar" queda deshabilitado (evita el doble envío). No se envía si el formulario es inválido.
  - Hecho (2026-10-10): estado "enviando" (`savingExpense`) con botón deshabilitado y texto "Saving…"; el mensaje se limpia al iniciar el envío; el diálogo se cierra solo en `next` vía `DialogRef`; en 400 se muestra un mensaje genérico con `role="alert"`.
  - Pendiente (decisión del usuario: se resuelve con un componente de mensajes de error que cubra más casos, no solo el 400): sin conexión (status 0), 409 y 5xx hoy no muestran nada; comprobar validez del formulario antes de enviar; guarda al inicio del handler contra el doble envío; estilo del mensaje con tokens `danger`; modelar "sin error" como `null` en vez de un objeto con `statusCode: 0` (0 es también el status de un fallo de red); tipar `savingExpense` como `boolean` (no `Boolean`).
  - Detalle técnico: el resultado de una operación asíncrona se guarda en estado (`signal`), no se "retorna" del manejador del evento. El manejador no devuelve nada útil.
  - Depende de: US B.3.3 (diálogo con el formulario). Los mensajes específicos por 409 dependen de A.6.1 (cuerpo de error consistente); hasta entonces se muestra el mensaje por categoría de status.

- ⬜ **US F.1.3** *(agregada 2026-10-10)*: Como desarrollador, quiero que el `reload()` de las listas (gastos, cuentas, comercios, categorías) lo dispare el servicio tras el `POST` (operador `tap`), para que los componentes no tengan que acordarse de recargar.
  - AC: `ExpensesService`, `AccountsService`, `MerchantsService` y `CategoriesService` recargan su `httpResource` al completarse el `POST`; `ExpenseForm` y los handlers de creación rápida dejan de llamar `reload()`.
  - Nota: el `reload()` es global porque el `httpResource` vive en un servicio singleton; revisar que la asignación del `id` nuevo siga funcionando (repetir prueba Slow 3G).
  - Origen: B.3.3 (decisión de postergarlo, 2026-10-10).

### Feature F.2 — Selects creatables (Categoría, Cuenta)
- ⬜ **US F.2.1**: Como usuario, quiero un dropdown de categoría que, al final de la lista de opciones existentes, tenga una opción fija "+ Nueva categoría" con una flecha (›) que expande un panel anidado hacia la derecha, dentro del mismo contenedor del dropdown (no un popover flotante aparte).
  - AC: Componente `SearchableSelect` reusable con Angular CDK Overlay. Cada opción de la lista muestra su ícono (vía `IconRenderer`, US B.4.2) con su color, nombre, estilo de lista limpio. Click en una opción normal selecciona y cierra. Click en "+ Nueva categoría" expande el panel lateral con el formulario: Nombre, selector de Color (fila de círculos), selector de Ícono (grilla), botones Cancelar/Crear.
  - AC: Al crear la categoría, el panel se cierra, la lista se actualiza, y el valor nuevo queda **autoseleccionado** en el campo.
  - AC: A medida que el usuario escribe el Nombre, la grilla de íconos muestra hasta 9 sugerencias relevantes según un mapa curado de palabras clave (categorías típicas de gasto: Food, Transport, Home, Pets, Entertainment, Health, Shopping, Bills, etc.). Una décima opción fija ("···" o "Más íconos") abre un buscador/grilla completa con el catálogo entero de Lucide, para cuando la categoría no está cubierta por el mapa curado.
- ⬜ **US F.2.2**: Mismo patrón para el selector de Cuenta, con el panel de creación simplificado (solo campo Nombre, sin color ni ícono).
  - AC: Reuso de `SearchableSelect` parametrizado — el contenido del panel interno (formulario completo de categoría vs. formulario simple de cuenta) se pasa como contenido proyectado/parametrizable, no hardcodeado dentro del componente genérico.

### Feature F.3 — Modal centrado
- ⬜ **US F.3.1**: Como usuario, quiero que "Agregar gasto" abra un modal centrado sobre el dashboard, con overlay translúcido de fondo.
  - AC: Layout en 2 columnas. Botón X para cerrar. Footer con Cancelar/Guardar. Dashboard de fondo visible pero atenuado.

---

## EPIC G — Responsive (mobile)

- ⬜ **US G.1**: Como usuario en mobile, quiero que la sidebar se colapse en un drawer accesible desde un botón hamburguesa.
  - Decisión pendiente (2026-10-09): el usuario propuso que en mobile la navegación se ubique **como barra fija abajo de la pantalla** (tab bar inferior) en vez de un drawer con hamburguesa. Contradice el AC de esta US y se alinea con US L.2.1. Resolver antes de implementar: drawer vs tab bar inferior (con 6 ítems, evaluar si caben o si algunos van a un "Más"). El panel de detalle en mobile se abre sin tocar la navegación.
- ⬜ **US G.2**: Como usuario en mobile, quiero que la grilla de transacciones se muestre como una lista de cards apiladas en vez de columnas.
- ⬜ **US G.3**: Como usuario en mobile, quiero que el modal de "Agregar gasto" ocupe pantalla completa en vez de aparecer centrado.
- ⬜ **US G.4**: Como usuario en mobile, quiero que `SearchableSelect` se comporte como bottom-sheet en vez de popover flotante.

---

## EPIC H — Asistente financiero IA + extractos *(idea de producto 1)*

### Feature H.1 — Asistente de insights
- ⬜ **US H.1.1**: Como usuario premium, quiero recibir insights educativos sobre mis patrones de gasto (no recomendaciones de inversión prescriptivas).
  - AC: Requiere volumen mínimo de datos históricos. Output enmarcado como educativo (distribución tipo 50/30/20, capacidad de ahorro estimada) — no asesoramiento financiero real.

### Feature H.2 — Extractos mensuales descargables/editables
- ⬜ **US H.2.1**: Como usuario, quiero descargar un extracto mensual en PDF/Excel.
  - AC: Decisión de diseño pendiente: ¿el extracto es snapshot congelado o reflejo en vivo de los expenses del período?
- ⬜ **US H.2.2**: Como usuario, quiero poder editar los datos de un extracto ya generado.
  - AC: Depende de la decisión anterior — si es snapshot, la edición es independiente de los `Expense` reales.

### Feature H.3 — Plan premium (mockeado)
- ⬜ **US H.3.1**: Como sistema, necesito distinguir usuarios premium de free.
  - AC: Flag booleano en `User` — sin integración de pago real (fuera de scope de portfolio).

---

## EPIC I — Cuentas familiares *(idea de producto 2)*

**Prerequisito real: autenticación y modelo de `User` — no existe todavía en el proyecto.**

### Feature I.1 — Autenticación
- ⬜ **US I.1.1**: Como usuario, quiero registrarme e iniciar sesión.
  - AC: Modelo `User`, hash de contraseña, JWT o sesión — a definir cuando se aborde.

### Feature I.2 — Grupos familiares
- ⬜ **US I.2.1**: Como usuario, quiero crear un grupo familiar e invitar miembros.
  - AC: `Household`, tabla puente `HouseholdMember` con rol.
- ⬜ **US I.2.2**: Como usuario, quiero ver los gastos de otros miembros del grupo según mi rol.
  - AC: Definir reglas de visibilidad por rol (admin ve todo, hijo con permisos limitados, etc. — a decidir).

---

## EPIC J — Modo compartido tipo Tricount *(idea de producto 3)*

**Depende de Epic I (multi-usuario).**

### Feature J.1 — Gastos compartidos
- ⬜ **US J.1.1**: Como usuario, quiero marcar un gasto como compartido y dividirlo entre miembros del grupo.
  - AC: `ExpenseSplit` por persona (monto adeudado). Soporta división igual, por porcentaje, o montos fijos.

### Feature J.2 — Balance entre usuarios
- ⬜ **US J.2.1**: Como usuario, quiero ver cuánto le debo a cada persona y cuánto me deben a mí, simplificado.
  - AC: Algoritmo de simplificación de deudas circulares (A debe a B, B debe a C → A debe directo a C).

---

## EPIC K — Vinculación bancaria (simulada) *(idea de producto 4)*

**Nota: conexión bancaria real está fuera de scope por razones regulatorias/de seguridad, no solo técnicas. Se aborda como simulación.**

### Feature K.1 — Proveedor mock de transacciones
- ⬜ **US K.1.1**: Como sistema, quiero un servicio mock que simule transacciones entrantes con la forma de un webhook real (tipo Plaid/Belvo).
  - AC: Endpoint que recibe transacciones simuladas, las categoriza automáticamente, deduplica antes de insertar.

---

## EPIC L — Port a app móvil *(fase futura)*

**Prerequisito: Epic I (autenticación) resuelto — una app móvil sin backend de sesiones reales no tiene mucho sentido productivo.**

### Feature L.1 — Decisión de stack
- ⬜ **US L.1.1**: Como equipo, necesitamos decidir el approach técnico del port: Angular + Ionic/Capacitor (reuso máximo de lógica/componentes ya escritos) vs. React Native/Flutter (nativo desde cero, mayor costo pero mejor UX móvil real).
  - AC: Decisión documentada con trade-offs explícitos (tiempo de desarrollo, fidelidad visual al diseño Apple HIG ya definido, mantenimiento de dos codebases o uno solo).

### Feature L.2 — Adaptación del design system a mobile
- ⬜ **US L.2.1**: Como usuario, quiero que la experiencia mobile respete el mismo lenguaje visual (Apple HIG, cards, tipografía de sistema) pero con patrones nativos de navegación (tab bar inferior en vez de sidebar, bottom sheets en vez de popovers).
  - AC: Reuso de las decisiones de Epic G (responsive web) como base — sidebar→drawer, `SearchableSelect`→bottom-sheet, modal→pantalla completa — ya cubre buena parte del trabajo de adaptación conceptual.

### Feature L.3 — Funcionalidad offline-first (opcional, a evaluar)
- ⬜ **US L.3.1**: Como usuario, quiero poder registrar un gasto sin conexión y que se sincronice cuando vuelva a haber red.
  - AC: A definir si entra en scope — depende de si el objetivo es portfolio/demo o uso real diario.

---

## EPIC M — Ingresos (Income) *(agregada 2026-10-18; parte de Alpha 1.0)*

Origen: el usuario quiere cargar ingresos junto con los gastos para ver la diferencia entre lo que entra y lo que gasta en el mes. Un ingreso es un **movimiento con fecha** (no un monto mensual), con tabla propia `Income` separada de `Expense`. Los ingresos **no aparecen en la grilla de gastos**: se ven en su propio tab y en las cards del Resumen. Referencia de producto: Mujer Financiera ya registra ingresos y ahorros.

### Feature M.1 — Entidad Income (backend)
- ⬜ **US M.1.1**: Como sistema, necesito una tabla `Income` con `id`, `amount`, `date`, `description`, `accountId` opcional (FK a `Account`), `createdAt`, `updatedAt`.
  - AC: migración con Prisma. Monto positivo (validación en DTO). `date` obligatoria. Sin categoría ni comercio.
  - Decisión: entidad separada de `Expense` (no una tabla única con tipo). Evita refactorizar lo que ya funciona; se puede unificar más adelante con datos reales.
  - Pendiente: decidir si "de dónde viene" (sueldo, freelance) es un campo propio o va en `description`.
- ⬜ **US M.1.2**: Como usuario, quiero crear y listar ingresos vía API, filtrados por mes.
  - AC: `POST /incomes` y `GET /incomes` con rango de fechas (mismo criterio que gastos, A.4). Errores con el contrato `ApiErrorResponse` (A.6.1).
  - Pendiente: los límites del selector de mes (B.3.1, A.4.2) hoy salen solo de los gastos; decidir si deben considerar también los ingresos.

### Feature M.2 — Alta de ingresos
- ⬜ **US M.2.1**: Como usuario, quiero un botón azul "+ Add Expense | Income" en la topbar que abra el modal con un selector animado (slider) Expense | Income, para cargar cualquiera de los dos desde el mismo lugar.
  - AC: reemplaza el botón de B.3.3. El selector está arriba del formulario; al cambiar, el formulario cambia de tipo con animación.
  - AC: los campos comunes (monto, fecha, descripción) se conservan al cambiar de tipo.
  - AC: accesibilidad: el selector se comporta como grupo de radio (o tabs), con teclado, aunque se vea como un slider.
  - AC: al guardar con éxito, el modal se cierra y se refrescan los datos del tipo cargado.
  - Decisión pendiente: dos formularios distintos (`ExpenseForm`, `IncomeForm`) alternados por el contenedor del modal, o uno solo con campos condicionales (preferencia inicial: dos formularios, cada uno simple).
  - Depende de: B.3.3, F.1.1, M.1.2.
- ⬜ **US M.2.2**: Como usuario, quiero un formulario de ingreso con monto, fecha, descripción y cuenta (opcional).
  - AC: Signal Forms con validaciones (monto positivo, fecha obligatoria). Sin categoría ni "Paid to". El selector de cuenta reutiliza el de gastos (F.2.2).
  - AC: mensajes de error del backend con el mapeo central de F.1.2.

### Feature M.3 — Tab Income
- ⬜ **US M.3.1**: Como usuario, quiero un tab **Income** en la sidebar con la lista de ingresos del mes seleccionado.
  - AC: ítem nuevo en la navegación (B.2.1). Usa el selector de mes global. Lista simple de ingresos (fecha, descripción, monto, cuenta). Estado vacío cuando no hay ingresos.
  - Depende de: M.1.2.
- ⬜ **US M.3.2**: Como usuario, quiero un panel lateral de detalle de un ingreso, con acciones para **modificarlo** y **eliminarlo**.
  - AC: usa el contenedor genérico del panel de `shared/` (C.2.1) con el contenido de `incomes/` proyectado por `ng-content`. Mismo patrón de selección que gastos.
  - AC: editar abre el formulario de ingreso con los datos cargados. Eliminar pide confirmación; al eliminar, el panel se cierra (la selección deja de existir).
  - AC: endpoints `PATCH /incomes/:id` y `DELETE /incomes/:id` (mismo patrón que C.3).
  - Depende de: M.3.1, C.2.1, C.3.

### Feature M.4 — Resumen: ingresos y balance
- ⬜ **US M.4.1**: Como usuario, quiero ver en el Resumen una card de **Ingresos del mes** y una card de **Net balance** (ingresos − gastos) del mes seleccionado.
  - AC: valores reales del mes del selector global. Net balance puede ser negativo (estilo visual distinto). Etiqueta distinta de "balance de cuenta" (E.3).
  - Pendiente: cálculo en el cliente o endpoint de agregación (se decide junto con el contrato de filtros de B.3.5).
  - Depende de: M.1.2, D.1.1.

---

## EPIC N — Monedas *(agregada 2026-10-18; parte de Alpha 1.0)*

Origen: el usuario quiere elegir en qué moneda es cada gasto (e ingreso). **Regla de producto (decidida 2026-10-18): los montos en monedas distintas nunca se suman; se muestran separados, cada uno en su moneda.** No hay conversión entre monedas en Alpha 1.0 (queda para más adelante; en Argentina hay varias cotizaciones del dólar, así que es una decisión de producto aparte).

### Feature N.1 — Moneda en el modelo
- ⬜ **US N.1.1**: Como sistema, necesito que `Expense` e `Income` tengan un campo `currency` (código ISO, por ejemplo ARS, USD).
  - AC: migración con valor por defecto para los registros existentes (a decidir, probablemente ARS). Validación en el DTO contra la lista de monedas permitidas.
  - Decisión: la moneda vive en **cada movimiento**, no en la cuenta. Así una sola cuenta "Cash" sirve para efectivo en pesos y en dólares. La cuenta puede tener una moneda por defecto que preselecciona (opcional; pendiente de decidir).
  - Pendiente: lista de monedas. Preferencia inicial: lista fija corta (ARS, USD, EUR) antes que cualquier código ISO.
  - Pendiente: el monto sigue siendo `Decimal`; confirmar que el tipo de `amount` no pierde precisión.

### Feature N.2 — Selección de moneda en los formularios
- ⬜ **US N.2.1**: Como usuario, quiero elegir la moneda al crear un gasto o un ingreso.
  - AC: selector de moneda en `ExpenseForm` (F.1.1) e `IncomeForm` (M.2.2). Si la cuenta tiene moneda por defecto, se preselecciona y se puede cambiar.
  - Depende de: N.1.1.

### Feature N.3 — Visualización y totales por moneda
- ⬜ **US N.3.1**: Como usuario, quiero ver cada monto con el formato de su moneda en la grilla, el panel de detalle y la lista de ingresos.
  - AC: formato con `Intl.NumberFormat` según la moneda (símbolo y decimales). Columna de monto alineada a la derecha (C.1.2). Sin sumar nunca montos de monedas distintas.
- ⬜ **US N.3.2**: Como usuario, quiero que las cards del Resumen muestren los totales separados por moneda.
  - AC: las cards de Ingresos, Gasto mensual y Net balance muestran una línea por cada moneda con movimientos en el mes. El Net balance se calcula por moneda (ingresos − gastos de la misma moneda). La comparación contra el mes anterior (D.1.1) también es por moneda.
  - AC: la comparación de gastos (C.4) solo compara gastos de la misma moneda.
  - Depende de: N.1.1, M.4.1, D.1.1.
  - Pendiente: los balances por cuenta (E.3) también serán por moneda; se resuelve al llegar a E.3.

---

## Estado actual (resumen) — actualizado 2026-10-18
- **Epic A — fundación de datos: COMPLETA (2026-10-14).** A.1–A.6 cerradas: Merchant completo (A.5), unicidad insensible a mayúsculas con `citext` (A.5.5) y filtros globales de errores con contrato `ApiErrorResponse` (A.6.1, con tres ramas sin probar anotadas). Deuda técnica: alinear versiones de Prisma.
- **Epic B — shell visual, en curso.** B.3.1 ✅ (selector de mes con flechas y límites) y B.3.2 ✅ (`SearchInput` base, sin lógica de búsqueda) y B.3.3 ✅ (botón "Add Expense" junto al searchbar abre `ExpenseForm` en CDK Dialog; quick-create genérico de Account/Merchant con foco automático). B.3.4 ⬜ (sugerencias → panel de detalle) depende de C.2.1. **Epic C:** C.1.1 ✅, C.1.3 ✅ (selección de fila con estado compartido en `ExpensesService`, 2026-10-16), C.1.2 🟡 (faltan columnas del mockup). Agregadas el 2026-10-11/13: B.3.5 (botón Filter), B.3.6 (usuario + Log out) y B.3.7 (adaptación con el panel abierto, decisión diferida hasta C.2.1).
- **Otros avances**: C.1.1 (grilla básica) y C.1.2 parcial (nombres de categoría/cuenta/comercio resueltos vía `include`). F.1.1 (formulario de creación con Signal Forms).
- **Deuda conocida (no bloquea)**:
  - Error UX del formulario: solo se muestra el 400; resto de estados, guardas de doble envío y estado "enviando" en quick-create (F.1.2); `reload()` en servicios (F.1.3).
  - Nombre de comercio repetido responde 500 hasta A.6.1 (filtro global → 409).
  - Modelo `Expense` del frontend: `notes` debería ser `string | null`, `status` tipo literal, falta `date`.
  - Verificar en el navegador: radio real del `SearchInput` (12px del design system), token `primary-border`, y decidir qué pasa con la "x" nativa de limpiar.
  - Fila de desarrollo `Carrefour ` (mayúscula y espacio final) en `Merchant`; borrar con `npx prisma studio`.
- **Repaso conceptual pendiente (sin presionar)**: columna real vs campo virtual en Prisma; transformar vs validar en DTOs; `P2002` + filtro global; mecanismo para detectar click afuera de un componente (`host: '(document:click)'` + comprobar si el target está dentro); ~~función flecha como propiedad vs método suelto (`this`) y diferencia con una IIFE~~ ✅ resuelto el 2026-10-10 (la flecha captura el `this` léxico del padre al definirse; el método suelto lo decide quien lo llama; una IIFE se invoca al definirse). Agregado el 2026-10-11 (cierre de A.5.5, respuestas parciales): por qué la unicidad se garantiza en la base y no con "buscar y luego insertar" (condición de carrera); qué hace y qué no hace `citext` (ignora mayúsculas, no espacios; por eso el `trim`); por qué la extensión va en una migración (reproducibilidad: shadow database, CI, otros entornos). Agregado el 2026-10-16 (cierre de C.1.3): ~~signal como función (llamarla para leer) y `asReadonly()` como vista de solo lectura, no un valor~~ ✅ resuelto el mismo día.
- **Alpha 1.0 (2026-10-18):** el Hito 1 se llama ahora Alpha 1.0 e incluye la Epic M (ingresos): entidad `Income`, botón "+ Add Expense | Income" con selector animado, tab Income con editar/eliminar y cards de Ingresos y Net balance en el Resumen. Diseño del panel de detalle cerrado (C.2.1, C.2.2); falta construir el contenedor genérico en `shared/`.
- **Métodos de pago (2026-10-18):** anotados en E.1.1–E.1.4 (entidad `PaymentMethod`, creación de cuenta con métodos, selector dependiente de la cuenta en el formulario de gasto, columna en grilla y panel). Entran en Alpha 1.0. Efectivo = cuenta especial "Cash" con método "Cash" autoseleccionado y bloqueado en el formulario (decidido). Pendiente: tipo de método, obligatoriedad y cómo se marca la cuenta de sistema.
- **Monedas (2026-10-18):** Epic N en Alpha 1.0: campo `currency` por movimiento, selector en los formularios, formato por moneda y totales separados por moneda, sin conversión. Pendiente: lista de monedas y moneda por defecto de la cuenta.
- **Meta actual: Hito 1 — Resumen completo** (ver sección al inicio). **Próximo recomendado**: C.1.2 (columnas de la grilla) y C.2.1 (panel de detalle, ya con el estado de selección listo) (panel de detalle, desbloquea B.3.4 y B.2.3; recomendado). Epic E (presupuestos) sigue bloqueando a Epic D.
- **Sesión 2026-10-18**: diseño del panel de detalle cerrado (ver C.2.1 y C.2.2). Falta construir el contenedor en `shared/` (primer paso), después el contenido y el avatar.
- **Próxima sesión (actualizado 2026-10-18):** hoy no hubo código; fue una sesión de diseño de producto (ingresos, métodos de pago, monedas, avatar de categoría, panel genérico). Opciones para arrancar: (a) diseñar el modelo completo de `Expense` e `Income` (`merchantId`, `accountId`, `paymentMethodId`, `currency`) antes de escribir migraciones, o (b) construir el contenedor genérico del panel en `shared/` (no depende del modelo). Nota: el label "Paid to" (A.5.6) queda como cambio solo de frontend.
- **Pendiente de decisión**: librería de íconos ya resuelta (B.4.1: `@lucide/angular`); el selector visual de categoría se aborda en F.2.1.
