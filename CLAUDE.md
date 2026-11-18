# GastoPro

## Forma de trabajo
- No escribir ni modificar código del proyecto salvo que el usuario lo pida explícitamente ("hacé", "completalo", "aplicá"). Frases como "arranquemos" o "ayudame a armar el camino" piden guía: explicar los pasos, qué va en cada pieza y por qué, y esperar.
- Excepción: la estructura HTML y los estilos (Tailwind/CSS) de un componente que ya existe se pueden escribir directamente, sin esperar el pedido. Todo lo que es Angular queda para el usuario: bindings e interpolaciones, `@if`/`@for`/`@switch`, eventos, imports en el `.ts`, inputs, outputs, signals y cualquier lógica. Donde falte, dejar texto de ejemplo y un `<!-- TODO(simon): ... -->` que diga qué va.
- No generar componentes, services ni ningún otro archivo con `ng generate` (ni crearlos a mano) salvo que el usuario lo pida directamente. Pasarle el comando para que lo ejecute él, y esperar a que diga si quiere que se complete con el código.
- Los comandos de `ng generate` se pasan para ejecutar desde `apps/web`, con la ruta relativa a `src/app` (por ejemplo, `pnpm ng generate component shared/side-panel`). El CLI crea la carpeta con el nombre del componente.

## Convenciones del frontend

### Lectura de resources (`httpResource` / `resource`)
- No leer `.value()` sin comprobar antes `hasValue()`. Con la request en error, `value()` lanza `ResourceValueError`, y ni `??` ni `?.` lo atrapan. `defaultValue` tampoco lo evita: solo cubre el caso en que todavía no hay respuesta (verificado en Angular 22.0.4).
- Si el valor se lee en más de un lugar, el service expone un `computed` seguro junto al resource (por ejemplo, `expensesOfMonth` en `ExpensesService`). Los componentes leen ese `computed`; `reload()`, `isLoading()` y `error()` se siguen usando desde el resource.
- Para no repetir el chequeo, usar el helper `valueOr(resource, fallback)` de `shared/` (pendiente de crear).
- Fallback según el dato: `[]` para listas y `undefined` para un objeto suelto (por ejemplo, el rango de fechas).
- Esto evita que se rompa la pantalla, pero no reemplaza avisar del error: para eso se usa `error()`.
