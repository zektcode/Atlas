# Gamma Prompt — ATLAS Investor Pitch Deck (v2)

Paste this whole block into Gamma's "Generate" input.

---

Create a 16-slide investor pitch deck for **ATLAS**, an AI-native fintech startup. Tone: confident, technical-credible, restrained — not hypey. This is a pre-seed deck for investors who will fact-check every claim, so avoid unverified superlatives ("world-class," "revolutionary") and never state a capability as live if it isn't.

## Visual direction (do not use a generic corporate navy/cream template)

Dark mode throughout. Near-black background (#08090c), not pure black. Single accent color: muted indigo (#7c8cff) for links, highlights, and the brand mark — never a generic blue. Use three data-only colors, never as decoration: mint green (#4ade9a) for positive/bullish, amber (#e8b04b) for neutral/caution, coral red (#f0665a) for negative/risk. Headlines in a refined serif (Fraunces or similar); body text in a clean grotesque sans (Inter or similar); any number, price, percentage, or ticker in a monospace font (IBM Plex Mono or similar) — this typeface split is a deliberate brand signature, keep it consistent on every slide. Cards and panels should be distinguished by a thin 1px light border on a slightly-elevated dark surface, not heavy drop shadows. Motion/transitions should be subtle, not playful or bouncy. The recurring visual motif is a segmented circular "Confidence Ring" (a ring divided into colored arcs representing bull/neutral/bear proportions, with a number centered) — use this as a recurring graphic element on the cover, product, and moat slides.

## Slide-by-slide content

**1. Cover**
ATLAS — The AI Operating System for Financial Decision Intelligence. Subhead: "We don't predict markets. We quantify uncertainty." Include a small Confidence Ring graphic showing 74 / bull 43% / neutral 39% / bear 18%.

**2. The Problem**
Headline: "Every investing app answers in one word." Body: investors get Buy/Sell/Hold from brokers, screeners, and chatbots — never why, never how confident, never what would prove it wrong. Include a two-column comparison: "What's optimized" (execution, charting, portfolio tracking) vs. "What's not" (decision validation, confidence scoring, risk explainability, behavioral intelligence).

**3. The Insight**
Headline: "People don't need another chart. They need confidence." Two positioning analogies, each in its own callout box: "Grammarly for financial decisions" (validates your capital allocation before you commit, the way Grammarly validates language before you publish) and "Copilot for capital allocation" (augments judgment, never replaces it — the user always makes the final call). Close with: "Atlas explains uncertainty. It never guarantees an outcome."

**4. Product — The Decision Card**
Show an actual Decision Card mockup: ticker (NVDA), recommendation ("Lean Bullish" — never an imperative like "Buy"), confidence 74%, a bull/neutral/bear probability bar (43/39/18), expected return +9.0% and expected drawdown −4.0%, 2-3 lines of reasoning, 2-3 invalidation conditions ("what would prove this wrong"), and a confidence breakdown across six named signal families (macro, technical, fundamental, institutional, sentiment, options/flow). This is the single most important slide — give it full-bleed space.

**5. The Five Frameworks**
Grid of five cards, each with an icon: **Confidence Framework™** (decomposes every score into six weighted, inspectable signal families — never a black box), **Sleep Score™** ("can I stop checking my phone tonight" — synthesizes risk and confidence trend into one number, always shown with its contributing reasons), **Risk Engine™** (concentration, currency, sector, liquidity, tail risk, correlation — each with a named driver, never a bare severity bar), **Decision Card™** (the fixed unit every recommendation renders as, everywhere in the product), **Behavior Engine™** (journals trade reasoning and emotion over time, reflects patterns — revenge trading, FOMO, sizing drift — back to the user as observations, never judgments).

**6. Technical Architecture**
Two-column layout. Left: "Frontend" — Next.js 15 (App Router), TypeScript strict mode, Tailwind + shadcn/ui, deployed on Vercel. Right: "Backend & Data" — Supabase Postgres via Prisma ORM, Supabase Auth with row-level security, Anthropic API (Claude) for natural-language reasoning generation only. Add one callout, visually distinct: **"Confidence scores are rule-based, not a black-box model — Claude explains the numbers, it never invents them."** This is a real differentiator versus "LLM wrapper" competitors and should be stated precisely, not vaguely as "LLMs · AI pipeline."

**7. What's Real vs. What's Roadmap** *(new slide — transparency as differentiator)*
Be direct: what's built today (scoring engines, UI, data model — all real, working code) vs. what's fixture/synthetic data pending integration (live market data, broker account linking) vs. what's explicitly not started (AI Coach, Scenario Simulator). Frame this as evidence of engineering discipline, not a weakness — a team that can precisely state what's real is more credible than one that implies everything works.

**8. Market Opportunity**
Three segments: retail & self-directed investors (largest, fastest-growing in emerging markets), financial advisors & wealth managers (Phase 4+), institutional & family offices (Phase 5). Include a TAM/SAM/SOM funnel chart. If real market-sizing data isn't available yet, label the numbers explicitly as "directional estimate, validated sizing available in data room" rather than omitting the slide — a placeholder labeled honestly beats a missing slide.

**9. Competitive Landscape**
Name real competitors explicitly: Bloomberg Terminal (data-rich, not explanation-rich, enterprise-priced), robo-advisors like Betterment/Wealthfront (automate allocation, don't explain individual decisions), general-purpose AI chatbots/Perplexity Finance (can answer anything, calibrated to explain nothing specific). Position Atlas as the only one built specifically for decision validation with a fixed, auditable output shape — not a chat window.

**10. Business Model** *(new slide — was missing)*
Freemium: free tier with limited Decision Cards per month and no history; paid tier ($X/mo, placeholder) with unlimited Decision Cards, Sleep Score history/trends, and Trade Journal + Behavior Engine. Phase 4+: advisor/family-office seat licensing. State plainly this is a placeholder pricing hypothesis to be validated, not a confirmed model.

**11. Regulatory Posture** *(new slide — was missing, and matters a lot for fintech investors)*
State clearly: Atlas provides decision-support information and explainability, not personalized investment advice, and does not execute trades. No brokerage integration for order placement is planned without separate compliance review. Name the intended posture (e.g. informational tool, not an RIA) and flag that formal legal/compliance review is a pre-Phase-3 gate, not an afterthought.

**12. Roadmap**
Five phases, timeline-style: Phase 1 Decision Core (Sleep Score, Risk Radar, Decision Card, seeded data) → Phase 2 Intelligence Layer (AI Coach, Behavior Engine, Scenario Simulator) → Phase 3 Platform Expansion (real broker integrations via Plaid/SnapTrade, live market data) → Phase 4 Professional & Institutional (advisor tools, family offices) → Phase 5 Global Financial OS (multi-currency, white-label, developer API).

**13. Traction / Validation** *(new slide — was missing)*
Whatever is genuinely available: user interviews conducted, waitlist signups, working prototype status, any advisor or beta-user interest. If genuinely pre-traction, title it "Validation Plan" instead and state the specific comprehension-based success metric from the PRD: can a user, shown a Decision Card, correctly restate why the confidence number is what it is and what would change it.

**14. Why This Is Defensible**
Four points: explainable-by-construction architecture (not retrofitted, structural), a behavioral data moat that compounds the longer a user journals (Trade Journal → Behavior Engine gets more precise over time, and it's specific to that user), a fixed Decision Card output shape that's hard to copy shallowly (competitors can ship a chatbot fast; matching a rule-based, auditable scoring system with real signal weighting takes real engineering work), and trust positioning ("show your work" as the product, not a feature).

**15. Team** *(new slide — was missing)*
Founders and their relevant background. If solo or very early, say so plainly and name what you're hiring for next (e.g. a founding engineer, a compliance advisor).

**16. The Ask**
Amount raising, stage (pre-seed), use of funds (e.g. engineering, compliance review, initial data licensing), and runway target. End on the mission line: "Help people make better financial decisions under uncertainty — not by predicting the future, but by quantifying it honestly."

---

Do not fabricate specific financial projections, user numbers, or team credentials — leave those as clearly-labeled placeholders for the founder to fill in with real figures before this goes to an actual investor.
