<div align="center">

# ATLAS

**The AI Operating System for Financial Decision Intelligence.**

We do not predict markets. We quantify uncertainty.

<!-- HERO BANNER: replace with /assets/hero-banner.png (1600×640, dark bg, Confidence Ring motif) -->
`[ hero banner placeholder — see /assets/README.md ]`

[![Built with Claude](https://img.shields.io/badge/Built%20with-Claude-7c8cff)](./CLAUDE.md)
[![License](https://img.shields.io/badge/license-Proprietary-5b6270)](#license)
[![Status](https://img.shields.io/badge/status-pre--seed%20MVP-e8b04b)](./ROADMAP.md)

</div>

---

## Why Atlas exists

Every investing app answers in one word: **Buy. Sell. Hold.** None of them tell you *why*, how confident that answer really is, or what would have to happen for it to be wrong.

Atlas replaces the one-word answer with a **Decision Card**: a recommendation broken into confidence, probability distribution across bull/neutral/bear scenarios, expected return and drawdown, the reasoning behind the number, and — critically — the conditions that would invalidate the thesis. Nothing is a black box. Every score decomposes into the signal families that produced it.

> **Design law:** Atlas optimizes for *confidence*, not *engagement*. A feature that increases time-in-app without increasing decision quality does not ship.

## Screenshots

<!-- Replace with real captures once frontend/app is running locally -->
| Landing | Dashboard | Decision Card |
|---|---|---|
| `[ screenshot placeholder ]` | `[ screenshot placeholder ]` | `[ screenshot placeholder ]` |

A working static prototype of these three views exists at `design/prototype/atlas-prototype.html` for quick visual reference without running the dev server.

## Core frameworks

| Framework | What it answers |
|---|---|
| **Sleep Score™** | "Can I stop checking my phone tonight?" — see [`docs/Sleep_Score.md`](docs/Sleep_Score.md) |
| **Risk Engine™** | Where is concentration, correlation, and tail risk actually sitting? — [`docs/Risk_Engine.md`](docs/Risk_Engine.md) |
| **Confidence Framework™** | How was this number actually calculated? — [`docs/Frameworks.md`](docs/Frameworks.md) |
| **Decision Card™** | The single unit Atlas reasons in, everywhere — [`docs/Decision_Framework.md`](docs/Decision_Framework.md) |
| **Behavior Engine™** | Is the user's own psychology the biggest risk in the portfolio? — [`docs/Behavior_Engine.md`](docs/Behavior_Engine.md) |

## Architecture at a glance

```
User ── Next.js (frontend/) ── API routes (frontend/app/api) ── Services (backend/services)
                                                                        │
                                                          Confidence / Risk / Sleep Score engines
                                                                        │
                                                     Prisma ORM ── Supabase Postgres (backend/prisma)
                                                                        │
                                                          Anthropic API (reasoning, AI Coach)
```

Full diagrams (system, database ERD, user flow, API): [`architecture/`](architecture/).
Decision record for *why* this shape: [`docs/Technical_Architecture.md`](docs/Technical_Architecture.md).

## Repository structure

```
atlas/
├── docs/            Product & technical documentation (start here)
├── frontend/         Next.js app — pages, components, client logic
├── backend/          Prisma schema, services, API business logic
├── design/            Design system: tokens, type, motion, component library
├── assets/            Branding, logos, illustration placeholders
├── architecture/      System / database / flow / API diagrams (Mermaid)
├── investor/          Pitch deck, business model, GTM, competitive analysis
├── .github/           Issue templates, PR template, CI workflow
├── CLAUDE.md          How Claude was used to build this repo
├── ROADMAP.md         Phase 1 → Phase 5
└── PROJECT_LOG.md     Running log of every design & technical decision
```

Every top-level folder has its own README explaining what belongs there and what doesn't.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server components for data-heavy pages, one deploy target on Vercel |
| Language | TypeScript (strict) | Financial data with `any` types is a liability, not a shortcut |
| Styling | Tailwind CSS + shadcn/ui | Fast iteration without fighting a design system that isn't ours |
| Motion | Framer Motion | Used sparingly — see [`design/Motion_Guidelines.md`](design/Motion_Guidelines.md) |
| Database | Supabase Postgres + Prisma | Managed Postgres with row-level security, typed queries |
| Auth | Supabase Auth | Don't build auth from scratch pre-seed |
| AI | Anthropic API (Claude) | Explainable reasoning over black-box prediction — matches the product's own philosophy |
| Deployment | Vercel | Zero-config for Next.js, preview deploys per PR |

## Getting started

```bash
git clone https://github.com/<you>/atlas.git
cd atlas
npm install
cp .env.example .env.local        # fill in Supabase + Anthropic keys
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

The app runs at `http://localhost:3000`. See [`backend/README.md`](backend/README.md) for database setup detail and [`frontend/README.md`](frontend/README.md) for the app structure.

## What's real vs. what's a placeholder right now

Being direct about this matters more than looking finished:

- ✅ **Real:** UI components, Prisma schema, confidence/risk scoring *logic*, API route contracts, design system.
- 🟡 **Mocked, clearly marked:** Market data, broker positions, macro calendar feed — see `// TODO(integration)` comments in `backend/services/`. These return realistic fixture data today.
- ⛔ **Not built yet:** Live broker connections, payments, real-time price streaming. Tracked in [`ROADMAP.md`](ROADMAP.md).

## Roadmap

See [`ROADMAP.md`](ROADMAP.md) for Phase 1 (MVP) → Phase 5 (Enterprise). Short version: prove the Confidence Framework is trustworthy before adding a single broker integration.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Please read [`docs/Product_Philosophy.md`](docs/Product_Philosophy.md) first — most rejected PRs will be rejected for violating "never predict, always explain," not for code style.

## Built with Claude

This repository's docs, architecture, and initial scaffold were built in collaboration with Claude (Anthropic). See [`CLAUDE.md`](CLAUDE.md) for the full account of what that meant in practice, and where a human made the final call.

## License

Proprietary — all rights reserved. This is not yet an open-source project. See [`SECURITY.md`](SECURITY.md) for responsible disclosure.
