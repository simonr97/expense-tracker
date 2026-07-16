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