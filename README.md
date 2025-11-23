# Next Js TRPC Drizzle Starter Boilerplate

Opinionated starter kit for building full‑stack React apps with Next.js 16, React 19, Drizzle ORM, Better Auth, and tRPC. It ships with a typed database layer, authentication primitives, and tooling for a smooth DX.

## Highlights
- **App Router + React Server Components** with shared UI living under `src/app`.
- **tRPC 11 + SuperJSON** for fully typed procedures (`src/lib/server` + `src/app/api/trpc`).
- **Drizzle ORM + Neon Serverless** with example `users`/`posts` schema and generated migrations.
- **Better Auth** (email/password + Google OAuth) wired to the Drizzle adapter.
- **TanStack Query** client and React hooks in `src/lib/trpc/client.tsx`.
- **DX niceties**: TypeScript 5, Biome formatting/linting, Husky + Commitlint pre-commit checks.

## Project Layout
```
src/
├─ app/                # App Router routes, layouts, API handlers
│  ├─ api/auth         # Better Auth handler
│  ├─ api/trpc         # tRPC edge handler
│  ├─ dashboard        # Example protected page
│  └─ page.tsx         # Landing page
├─ components/auth     # Auth form & profile widgets
├─ lib/
│  ├─ auth             # Better Auth config + schema
│  ├─ db               # Drizzle client, schema, migrations
│  ├─ server           # tRPC routers + helpers
│  └─ trpc             # Client/context utilities
```

## Prerequisites
- Node.js 20+
- pnpm (recommended) or npm/yarn/bun
- PostgreSQL database (Neon works great)
- Google OAuth credentials (optional unless you enable Google login)

## Environment Variables
Create `.env.local` (the project already reads from it) and provide:

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Postgres connection string used by Drizzle + Better Auth |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID (optional) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret (optional) |

> Add any other provider secrets you enable in `src/lib/auth/index.ts`.

## Getting Started
```bash
pnpm install          # Install dependencies
pnpm db:generate      # (optional) sync schema to migrations
pnpm db:migrate       # Run pending migrations against DATABASE_URL
pnpm dev              # Start Next.js on http://localhost:3000
```

The sample dashboard lives at `/dashboard` and expects an authenticated user. `src/components/auth` contains the form/profile UI you can drop into any route.

## Useful Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Run the Next.js development server |
| `pnpm build` / `pnpm start` | Production build & serve |
| `pnpm lint` / `pnpm lint:fix` | Biome static analysis & autofix |
| `pnpm format` | Biome formatter |
| `pnpm db:generate` | Generate SQL migrations from the Drizzle schema |
| `pnpm db:migrate` | Apply migrations via `src/lib/db/migrate.ts` |
| `pnpm db:studio` | Launch Drizzle Studio UI |
| `pnpm auth:generate` | Regenerate Better Auth schema file |
| `pnpm auth:migrate` | Shortcut for pushing auth tables (`pnpm db:push`) |

## Database + Auth Flow
1. Define entities inside `src/lib/db/schema` or `src/lib/auth/schema.ts`.
2. Run `pnpm db:generate` to create SQL migrations in `src/lib/db/migrations`.
3. Apply them locally with `pnpm db:migrate` or push to Neon with `pnpm db:push`.
4. Better Auth uses the Drizzle adapter defined in `src/lib/auth/index.ts`. Update providers, secrets, and session logic there.

## Extending the Stack
- Add new tRPC routers under `src/lib/server/routers` and register them in `_app.ts`.
- Co-locate server components under `src/app/**/page.tsx`; client components go in `src/components`.
- Use `src/lib/trpc/client.tsx` helpers to call procedures from React with TanStack Query.
- Customize middleware, global styles, or metadata via `src/app/layout.tsx` and `globals.css`.

## Quality Gates
Husky runs `pnpm lint` before each commit. To skip temporarily, pass `HUSKY=0` (not recommended). CI/CD can reuse the same scripts.

---
Questions or ideas? File an issue or start sketching directly in `src/app`. Happy hacking! 🚀
