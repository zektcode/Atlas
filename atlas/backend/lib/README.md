# backend/

Business logic and data access — imported directly by Next.js API routes in `frontend/app/api/*`. This is a folder, not a separately-running service. See `docs/Technical_Architecture.md` (ADR-002) for why.

- `prisma/` — schema, migrations, seed script. See `docs/Database.md`.
- `services/` — the Confidence Framework, Risk Engine, and Sleep Score scoring logic. Pure functions where possible, no direct DB access — API routes compose these with `lib/prisma.ts` reads.
- `lib/` — Supabase and Prisma client factories.

## Mocked vs. real

`services/*` compute real scores from *given* inputs, but the inputs themselves (market prices, 13F data, options flow) are fixture data in Phase 1 — see each file's `TODO(integration)` markers and `docs/Technical_Architecture.md` ADR-005.
