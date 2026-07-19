# Database

Full schema lives in `backend/prisma/schema.prisma` — this document explains the *why* behind the shape, not a field-by-field restatement.

## Entity overview

- **User** — Supabase Auth is the source of truth for identity; this table stores app-specific profile data, keyed by the Supabase `auth.users.id`.
- **Portfolio** — a user can have more than one (e.g. "Retirement", "Trading"). Everything else hangs off a portfolio, not directly off a user.
- **Position** — a holding within a portfolio (ticker, quantity, cost basis, asset class). Phase 1: seeded manually or via `backend/prisma/seed.ts`. Phase 3: synced from a linked brokerage.
- **DecisionCard** — a persisted snapshot of a recommendation at a point in time: recommendation, confidence, scenario probabilities, expected return/drawdown, reasoning, invalidation conditions, and a `SignalScore[]` breakdown. Persisted (not computed fresh every render) so a user can see how a thesis evolved.
- **SignalScore** — one row per signal family (macro, technical, fundamental, sentiment, institutional, options) per DecisionCard. This table is what makes "no black box" enforceable at the data layer, not just the UI layer.
- **JournalEntry** — a Trade Journal record: reason, emotion, confidence-at-the-time, outcome, lesson. Feeds the Behavior Engine.
- **SleepScoreSnapshot** — a point-in-time Sleep Score with its contributing signals, so history/trend is queryable, not just the current value.

## Why DecisionCard is persisted, not derived on every request

A recommendation that silently changes every time you refresh the page — because an upstream fixture or API returned slightly different numbers — undermines the entire "confidence you can trust" premise. Persisting a DecisionCard snapshot means "why did this change" is always answerable by diffing two real rows, not a mystery.

## Row Level Security

Every user-owned table (`Portfolio`, `Position`, `DecisionCard`, `JournalEntry`, `SleepScoreSnapshot`) must have a Supabase RLS policy scoping reads/writes to `auth.uid() = userId` (via the `Portfolio.userId` foreign key chain). This is a Phase 1 requirement, not a later hardening pass — see `SECURITY.md`.
