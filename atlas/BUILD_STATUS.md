# Tier 1 Build Status

Live tracking against the Phase 1 roadmap (see `investor/` and the roadmap PDF). Updated as of each build session — check git history / PROJECT_LOG.md for dates.

| Feature | Status | What's real | What's still needed |
|---|---|---|---|
| **Portfolio Intelligence Dashboard** | 🟢 Working | Sleep Score and Risk Radar are genuinely computed from live position data via `/api/sleep-score` and `/api/risk-radar`. | Macro Calendar and Watchlist are still fixture data — need a real market/calendar data provider (see `docs/Technical_Architecture.md` ADR-005). |
| **Portfolio DNA™** | 🟢 Working | Full formula implementation in `backend/services/portfolioDNA.ts` — true look-through exposure and fund overlap are genuinely computed, not mocked. Rendered live on `/portfolio`. | Fund holdings data is a small hardcoded fixture (2 sample funds). Needs a real fund factsheet data source (e.g. AMFI-based) to work for a real user's actual funds. |
| **Risk Radar™** | 🟢 Working | Concentration, currency exposure, sector tilt, liquidity all genuinely scored from live positions. | Same market-data dependency as above for anything beyond the user's self-reported cost/price data. |
| **Sleep Score™** | 🟢 Working | Genuinely computed from real Risk Radar output. | `confidenceTrend` and `upcomingHighImpactEvents` inputs are still fixture defaults — need real history and a macro calendar to be accurate over time. |
| **Decision Journal** | 🟢 Working | Full CRUD — add and view entries, persisted (in dev store, see below). | None outstanding for Tier 1 scope. Behavior Engine pattern detection over this data is Phase 2. |
| **Add / manage holdings** | 🟢 Working | Manual entry form on `/portfolio`, backed by a real API route with input validation (zod). | No CSV bulk import yet, no live broker linking (Phase 3 scope). |
| **Decision Card (Tier 3)** | 🔴 Held back, by design | Fully built and working at `/decision-card` — unlisted, not in Nav, banner clearly marks it as an internal preview pending compliance sign-off. | Do not link this route or demo it as a live feature until a lawyer has signed off — see the banner text on that page and `docs/PRD.md`. |

## The one thing every "Working" row is not yet doing

Everything marked 🟢 above runs against an **in-memory dev data store** (`frontend/lib/devStore.ts`), not a real database. This was a deliberate call: it means `npm run dev` actually works and is demoable *today*, without needing Supabase provisioned first — important for a non-technical founder who can't debug a database connection issue alone. Every function in that file is marked `TODO(integration)` and is a drop-in replacement target for real Prisma + Supabase reads/writes once `DATABASE_URL` is configured (the schema already exists in `backend/prisma/schema.prisma` and matches this data shape). Swapping it is a contained, well-scoped task for whoever you hire — not a rewrite.

## Honest gaps before this is ready for real users

1. No auth yet — every API route operates on one shared dev-store portfolio, not per-user data. Needed before any real user touches this.
2. No live database — see above.
3. No real fund/market data — Portfolio DNA and pricing are internally consistent but not live.
4. No ToS/Privacy Policy yet — see the Week 5 timeline item in the roadmap PDF.

None of these block local development or a developer picking this up — they block a real public launch, which is exactly what Week 5–7 of the roadmap timeline is for.
