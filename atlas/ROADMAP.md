# Roadmap

Atlas ships in phases deliberately ordered around trust, not feature count. Broker integrations come *after* the Confidence Framework is proven legible and honest — a fast-but-wrong recommendation engine is worse than a slow one, for a product whose whole pitch is "don't pretend to know the future."

## Phase 1 — MVP (current)
**Goal: prove the Decision Card is legible and the Confidence Framework is trustworthy, with synthetic data.**
- [x] Design system + static prototype
- [x] Repository scaffold, docs, Prisma schema
- [ ] Working `npm run dev` against a real Supabase project
- [ ] Decision Card rendering real (rule-based) confidence scores from seeded fixture data
- [ ] Auth (Supabase) — sign up, log in, session-scoped portfolio

## Phase 2 — AI Intelligence
**Goal: the AI Coach reasons about *this user's* portfolio, not generic market commentary.**
- [ ] Anthropic API integration for AI Coach conversational layer
- [ ] Trade Journal → Behavior Engine pattern detection (revenge trading, FOMO, sizing drift)
- [ ] Scenario Simulator (what-if analysis against current holdings)

## Phase 3 — Broker Integrations
**Goal: replace synthetic portfolio data with real, read-only account data.**
- [ ] Plaid or SnapTrade integration for brokerage account linking
- [ ] Real-time price data (Polygon or equivalent) replacing `backend/services` fixtures
- [ ] Macro calendar from a licensed data provider

## Phase 4 — Global Expansion
- [ ] Multi-currency portfolios and FX-aware risk scoring
- [ ] International market data coverage
- [ ] Localization (starting with EU markets — regulatory review required first)

## Phase 5 — Enterprise / Asset Management
- [ ] Multi-portfolio / multi-client views for advisors and family offices
- [ ] Team permissions and audit logs
- [ ] White-label Decision Card embedding

## Explicitly not planned pre-Phase 3
Payments, live trade execution, anything that could be construed as investment advice without appropriate registration. See `investor/Competitive_Analysis.md` for how this scoping decision shapes positioning.
