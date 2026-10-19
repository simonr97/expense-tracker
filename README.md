# GastoPro — Expense Tracker

Full-stack personal expense management app. Built to explore Angular 22's signal-first model and a NestJS API.

## Stack

**Frontend**
- Angular 22 (zoneless, signal-first, standalone components)
- Signals: `signal`, `computed`, `linkedSignal`, `httpResource`, Signal Forms
- Tailwind CSS v4, with design tokens defined in `@theme`
- AG Grid (expenses grid), Angular CDK Dialog (modals), Lucide (icons)

**Backend**
- NestJS
- Prisma ORM 7 with the PostgreSQL driver adapter (`@prisma/adapter-pg`)
- PostgreSQL (Neon), case-insensitive unique names with `citext`
- Request validation with `class-validator` + global `ValidationPipe`
- Global exception filters with a shared error contract

**Testing**
- Playwright (API testing via `APIRequestContext`)
- Jest (API unit tests) · Vitest (web unit tests)

**Infra**
- pnpm workspace (monorepo)
- Frontend: Vercel · Backend: Render · DB: Neon

## Structure

A pnpm workspace with two applications:

| Path | Description |
|------|-------------|
| `apps/web` | Angular 22 frontend |
| `apps/api` | NestJS backend |

The backend is organized by **feature modules**. Each domain module encapsulates its own controller, service and DTOs:

    apps/api/src/
    ├── expenses/
    ├── categories/
    ├── accounts/
    ├── merchants/
    ├── exception-filter/   # global error handling
    └── prisma/

The frontend follows the same split by feature (`expenses/`, `categories/`, `accounts/`, `merchants/`), plus `shell/` (sidebar, topbar, month selector, search) and `shared/` (reusable components).

## Requirements

- Node.js 22+
- pnpm 11+

## Running locally

```bash
pnpm install
```

Backend (`localhost:3000`):
```bash
pnpm api
```

Frontend (`localhost:4200`):
```bash
pnpm web
```

The backend requires an `apps/api/.env` file with the database connection: `DATABASE_URL="postgresql://..."`

## Tests

API tests with Playwright (backend must be running):
```bash
pnpm --filter api test:pw
```

## Roadmap

The full roadmap (epics, user stories and decisions, in Spanish) lives in [`gastopro-roadmap.md`](gastopro-roadmap.md). The visual spec lives in [`design-system.md`](design-system.md).

**Done**
- Data model: `Expense` with notes, status, date and account; `Category` with color and icon
- `Account` and `Merchant` entities with create/list endpoints
- Case-insensitive unique names for categories, accounts and merchants (`citext`)
- Date range endpoint to bound month navigation
- Global exception filters: Prisma errors mapped to HTTP codes (409, 404, 400) with a shared `ApiErrorResponse` contract
- Design system as Tailwind tokens: palette, radii, shadows, typography, spacing
- App shell: floating sidebar, topbar with search input, month selector and "Add Expense" button
- Month selector with arrows and a dropdown, bounded to real data
- Icon system with Lucide and a reusable `IconRenderer`
- Expenses grid with real data, category badges and single-row selection
- Create-expense modal (CDK Dialog) with Signal Forms validation and inline quick-create for accounts and merchants

**In progress**
- Grid columns from the mockup (date, payment method, formatted amounts)
- Error messages in the create-expense form

**Next: Alpha 1.0**
- Expense detail side panel with edit, duplicate and delete
- Payment methods per account (including a system "Cash" account)
- Currencies per movement, with totals shown separately per currency
- Income: entity, form, Income tab and side panel
- Summary dashboard: income, monthly spending and net balance cards; spending charts
- Search suggestions and a filter panel

## Architecture decisions

- **Signals for state, RxJS for async orchestration**: `computed` for derived values (totals, summaries); RxJS with `debounceTime`/`switchMap` where timing matters. `toSignal`/`toObservable` as bridges between both.
- **Shared state in singleton services**: for example, the selected expense lives in `ExpensesService` as a private signal, exposed read-only and written through a single method.
- **Declarative validation**: a global `ValidationPipe` validates the incoming request against the DTO before it reaches the controller, keeping business logic free of validation branching.
- **Uniqueness enforced by the database**, not by "find then insert" checks, which have race conditions.
- **One error contract**: every API error has the shape `{ statusCode, error, code, message, details? }`. Database internals (index names, Postgres messages, stack traces) never reach the client; they are logged on the server.
- **Design tokens only**: UI colors, radii and shadows come from the design system tokens, not hard-coded values.
- **Layered testing**: Jest for isolated units (with mocks); Playwright for the end-to-end API contract.
