# frontend/

Next.js 15 App Router application. See `docs/Technical_Architecture.md` (ADR-001) for why this is the only deployable unit rather than a separate backend service.

```
app/
├── page.tsx                 Landing page
├── layout.tsx                 Root layout (fonts, metadata)
├── globals.css                 Tailwind + base styles
├── (auth)/login, /signup       Supabase Auth pages
├── dashboard/                  Bento-grid overview
├── portfolio/                   Live DecisionCard rendering (real confidence engine)
├── risk-center/                  Risk Radar detail (Phase 1 follow-up)
├── trade-journal/                 Journal entry (Phase 1)
├── ai-coach/                      Anthropic-backed coach (Phase 2, not started)
├── settings/                       Account settings (Phase 1)
└── api/                            Route handlers, thin wrappers over backend/services

components/
├── ui/                Base primitives (button, card) — shadcn/ui-style, not the full shadcn CLI output
├── decision-card.tsx   The Decision Card component — see docs/Decision_Framework.md
├── sleep-score-ring.tsx The Confidence Ring signature visual — see design/Design_System.md
└── nav.tsx              Shared app nav

lib/
├── utils.ts   cn() class combiner
└── types.ts   Shared frontend types
```

## What's real here

`portfolio/page.tsx` and `app/api/decision-card/route.ts` call the actual `backend/services/confidenceEngine.ts` — confidence is genuinely computed, not hardcoded, from the seeded signal scores. Everything else on `dashboard/page.tsx` is still static fixture data pending the database read layer.
