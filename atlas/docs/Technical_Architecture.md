# Technical Architecture

Architecture Decision Records (ADRs) for the choices that would otherwise look arbitrary to the next engineer.

## ADR-001: Next.js App Router, single deployable app

**Decision:** One Next.js app (in `frontend/`) with API routes, deployed as one Vercel project. No separate backend service in Phase 1–2.

**Alternatives considered:** Separate Express/Fastify backend; NestJS service.

**Why Next.js won:** Zero infrastructure overhead pre-seed, React Server Components let us fetch scoring data server-side without a public API surface to secure yet, and Vercel's preview deploys make iteration fast. Revisit when Phase 3 broker integrations need background jobs / webhooks that don't fit serverless functions well.

## ADR-002: `backend/` as a folder, not a service

**Decision:** `backend/services`, `backend/prisma`, `backend/lib` hold business logic and data access, imported directly by Next.js API routes in `frontend/app/api/*`. It is *not* a separately running process.

**Why:** See `PROJECT_LOG.md` (2026-07-11 entry). This is a naming/organization choice for clarity, not a runtime boundary — don't add a second `package.json` or a network hop here until there's a real reason (e.g. a long-running job that doesn't fit a serverless function timeout).

## ADR-003: Prisma + Supabase Postgres, not a document store

**Decision:** Relational schema via Prisma, hosted on Supabase Postgres.

**Why:** Portfolio/position/decision-card data is inherently relational (a position belongs to a portfolio belongs to a user; a decision card references a security and a set of signal scores) — modeling this in a document store would mean re-inventing joins in application code. Supabase specifically (over raw Postgres) buys us Row Level Security tied to Supabase Auth for free, which matters a lot for "user can only ever see their own portfolio."

## ADR-004: Rule-based confidence scoring (v0), explicit signal weights

**Decision:** `backend/services/confidenceEngine.ts` computes confidence as a weighted sum of six named signal scores. Weights are constants, not learned.

**Why:** Directly required by `docs/Product_Philosophy.md` — explainability is not negotiable. A learned model is a legitimate v2 direction, but only with an attribution method that preserves the "why did this number move" property (see `PROJECT_LOG.md`).

## ADR-005: Mocked external data, explicitly marked

**Decision:** `backend/services/*` return realistic fixture data for market prices, macro events, and institutional filings today, each marked with `// TODO(integration): <provider>`.

**Why:** Lets the entire reasoning pipeline (scoring → risk → sleep score → decision card → UI) be built, tested, and demoed correctly *before* committing to (and paying for) a specific data vendor. Swapping a `TODO(integration)` function for a real API call should never require touching the scoring logic that consumes it — that's the contract this boundary is meant to enforce.
