# Expense Tracker

Full-stack personal expense management app. Built to explore Angular 22's signal-first model and a NestJS API.

## Stack

**Frontend**
- Angular 22 (zoneless, signal-first, standalone components)
- Tailwind CSS v4
- Signals: `signal`, `computed`, `httpResource`

**Backend**
- NestJS
- Prisma ORM
- PostgreSQL (Neon)
- Request validation with `class-validator` + global `ValidationPipe`

**Testing**
- Playwright (API testing via `APIRequestContext`)
- Jest (unit tests)

**Infra**
- pnpm workspace (monorepo)
- Frontend: Vercel · Backend: Render · DB: Neon

## Structure
expense-tracker/
├─ apps/
│  ├─ web/    → Angular 22
│  └─ api/    → NestJS
└─ pnpm-workspace.yaml

Organized by feature modules: each domain module encapsulates its controller, service and DTOs.

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

The backend requires an `apps/api/.env` file with the database connection: DATABASE_URL="postgresql://..."

## Tests

API tests with Playwright (backend must be running):
```bash
pnpm --filter api test:pw
```

## Architecture decisions

- **Signals for state, RxJS for async orchestration** — `computed` for derived values (totals, summaries); RxJS with `debounceTime`/`switchMap` where timing matters. `toSignal`/`toObservable` as bridges between both.
- **Declarative validation** — a global `ValidationPipe` validates the incoming request against the DTO before it reaches the controller, keeping business logic free of validation branching.
- **Layered testing** — Jest for isolated units (with mocks); Playwright for the end-to-end API contract.