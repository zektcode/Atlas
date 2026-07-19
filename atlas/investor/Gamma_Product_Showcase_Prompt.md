# Gamma Prompt — ATLAS Product Showcase Deck (not an investor pitch)

Paste this whole block into Gamma's "Generate" input. This is a product showcase, not a fundraising pitch — no team, no funding ask, no business model, no financials, no "who's behind this." The goal is for the product and its architecture to be compelling enough on their own that an investor reading it wants to reach out.

## Visual direction (do not use a generic corporate navy/cream template)

Dark mode throughout. Near-black background (#08090c), not pure black. Single accent color: muted indigo (#7c8cff) used for highlights, links, and the brand mark — never a generic blue. Three data-only colors, never used as decoration: mint green (#4ade9a) for positive/bullish, amber (#e8b04b) for neutral/caution, coral red (#f0665a) for negative/risk. Headlines in a refined serif (Fraunces or similar); body copy in a clean grotesque sans (Inter or similar); every number, price, percentage, or ticker in a monospace font (IBM Plex Mono or similar) — this typeface split is a deliberate brand signature and should be consistent on every slide. Panels and cards get elevation from a thin 1px light border on a slightly-lighter dark surface, never heavy drop shadows. Motion should read as calm and precise, never bouncy or celebratory. Recurring visual motif: a segmented circular "Confidence Ring" — a ring divided into colored arcs (bull/neutral/bear proportions) with a number centered — reused across the cover, product, and architecture slides so it reads as the product's signature, not a one-off chart.

## Slide-by-slide content

**1. Cover**
ATLAS — The AI Operating System for Financial Decision Intelligence. Subhead: "We don't predict markets. We quantify uncertainty." Feature a Confidence Ring graphic: 74 / bull 43% / neutral 39% / bear 18%.

**2. The Problem**
Headline: "Every investing app answers in one word." Body: Buy, Sell, Hold — with no confidence attached, no probability, no sense of what would have to be true for that answer to be wrong. Two-column comparison: "What's optimized" (trade execution, charting, portfolio tracking) vs. "What's not" (decision validation, confidence scoring, risk explainability, behavioral intelligence).

**3. The Insight**
Headline: "People don't need another chart. They need confidence." One sharp positioning line, in its own callout: "Grammarly for financial decisions — Atlas sits above every broker and validates the decision before you commit, the way Grammarly validates language before you publish." Close with: "Atlas explains uncertainty. It never guarantees an outcome."

**4. Product — The Decision Card**
Full-bleed slide showing an actual Decision Card: ticker (NVDA), recommendation as a lean, never an imperative ("Lean Bullish," not "Buy"), confidence 74%, a bull/neutral/bear probability bar (43/39/18), expected return +9.0% and expected drawdown −4.0%, 2-3 lines of specific reasoning, 2-3 invalidation conditions ("what would prove this wrong"), and a confidence breakdown across six signal families (macro, technical, fundamental, institutional, sentiment, options/flow). This is the single most important slide in the deck.

**5. Product — Dashboard & Sleep Score**
Show the Dashboard: a Sleep Score ring (one number answering "can I stop checking my phone tonight," always shown with 2-3 contributing reasons, never bare), a Risk Radar (concentration, currency exposure, sector tilt, liquidity — each with a named driver, never an unexplained bar), a macro event calendar, and a watchlist. Emphasize: calm, information-dense, never urgency-coded — no red alert banners, no countdown timers.

**6. The Frameworks**
Grid of five named frameworks, one line each: **Confidence Framework** (every score decomposes into six weighted, inspectable signals — never a black box), **Sleep Score** (risk and confidence trend synthesized into one legible number), **Risk Engine** (concentration, currency, sector, liquidity, tail risk, correlation, each with a specific driver), **Decision Card** (the fixed unit every recommendation renders as, everywhere in the product), **Behavior Engine** (journals trade reasoning and emotion over time, reflects patterns like revenge trading or FOMO back as observations, not judgments).

**7. Frontend Architecture**
Headline: "Built for clarity, not just aesthetics." Next.js 15 (App Router) with React and strict TypeScript — server components for data-heavy pages, typed end to end. Tailwind CSS with a custom design token system (not default theme) — the dark palette, signature typeface pairing, and Confidence Ring component are first-class, reusable primitives, not one-off styling. Framer Motion used sparingly, only for a small set of deliberate moments (the Confidence Ring draw-in, page transitions) — motion is restrained by design principle, not by omission.

**8. Backend & Data Architecture**
Headline: "Explainable by construction, not by accident." Supabase Postgres with Prisma ORM — a relational schema where every Decision Card persists a snapshot with its full signal breakdown, so a user can always see exactly how and why a number changed over time. Supabase Auth with row-level security scoping every table to its owner. Confidence, risk, and sleep scores are computed by rule-based scoring engines with named, weighted signal families — not a single learned model — so every number a user sees can be traced back to a specific, inspectable input. Claude (Anthropic API) is used to generate the natural-language reasoning and explanations *from* those computed scores — it explains the numbers, it never invents them. State this distinction clearly: it's the core technical differentiator versus "LLM wrapper" competitors.

**9. Product Vision**
Headline: "The intelligence layer above every investment platform." One dashboard, one reasoning engine, across equities, ETFs, crypto, real estate, and international portfolios — instead of opening five apps to piece together an answer. Atlas doesn't execute trades and doesn't plan to; the product is the decision layer that sits above execution, not a replacement for it.

**10. Roadmap**
Five phases, timeline style, product capability only (no dates, no team, no funding milestones): Phase 1 — Decision Core (Sleep Score, Risk Radar, Decision Card, seeded data). Phase 2 — Intelligence Layer (AI Coach, Behavior Engine, Scenario Simulator). Phase 3 — Platform Expansion (real broker integrations, live market data). Phase 4 — Professional & Institutional (advisor tools, family offices). Phase 5 — Global Financial OS (multi-currency, white-label, developer API).

**11. Closing**
Headline: "Never a black box. Never a guess dressed up as certainty." Restate the mission: "Help people make better financial decisions under uncertainty — not by predicting the future, but by quantifying it honestly." No call to action beyond the product itself; let it end on the thesis, not a pitch.

---

Do not include any slide about team, hiring, funding ask, valuation, business model, pricing, or traction metrics — this deck is a product and technical showcase only. Do not fabricate user numbers, revenue projections, or specific company names as customers. Where architecture or product details aren't specified above, keep them consistent with the rest of the deck's stated philosophy: confidence is explainable, never a black box, and Atlas quantifies uncertainty rather than predicting outcomes.
