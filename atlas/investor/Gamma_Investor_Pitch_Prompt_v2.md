# Gamma Prompt — ATLAS Investor Pitch Deck (v3, with User Journey)

Paste this whole block into Gamma's "Generate" input. This is a real fundraising pitch deck — solo-founder-honest, product-led, and precise about what's live today versus what's roadmap. Tone: confident and technical-credible, never hypey. Never state a capability as available today if it's actually a later-phase vision — this product's entire premise is "never overclaim," and the deck should hold itself to the same standard.

## Visual direction (do not use a generic corporate navy/cream template)

Dark mode throughout. Near-black background (#08090c), not pure black. Single accent color: muted indigo (#7c8cff) for highlights, links, and the brand mark. Three data-only colors, never decorative: mint green (#4ade9a) for positive/live/ready, amber (#e8b04b) for neutral/in-progress, coral red (#f0665a) for risk/gated/not-yet-built. Headlines in a refined serif (Fraunces or similar); body copy in a clean grotesque sans (Inter or similar); every number, price, percentage, or step label in a monospace font (IBM Plex Mono or similar) — keep this typeface split consistent on every slide, it's a deliberate brand signature. Cards get elevation from a thin 1px light border on a slightly-lighter dark surface, never heavy drop shadows. Motion is calm and precise, never bouncy. Recurring visual motif: a segmented circular "Confidence Ring" (colored arcs representing bull/neutral/bear proportions, a number centered) — reuse it on the cover, product, and moat slides.

## Slide-by-slide content

**1. Cover**
ATLAS — The AI Operating System for Financial Decision Intelligence. Subhead: "We don't predict markets. We quantify uncertainty." Feature a Confidence Ring graphic showing a single Sleep Score / portfolio health number (e.g. 82) with 2-3 short contributing labels around it (e.g. "Diversification," "Concentration," "Upcoming events") — this is a portfolio-health signal, not a market-direction call. Do not use bull/bear/market-scenario framing anywhere on this slide — Atlas manages and explains portfolios, it does not call market direction.

**2. The Problem — Today's Fragmented Journey**
Headline: "Getting to one investment decision today takes six disconnected apps." Render as a linear flow diagram: Open a broker app → Search a fund → Read Google reviews → Watch YouTube → Ask ChatGPT → Read Reddit → Invest. Style each step as a separate node with a different-looking icon/app color to visually communicate fragmentation and inconsistency — the visual chaos of switching contexts six times is the point. Caption underneath: "No step explains confidence. No step is accountable for the others. The user stitches together the reasoning themselves."

**3. The Insight**
Headline: "People don't need another app in that chain. They need the chain to not exist." Positioning callout: "Grammarly for financial decisions — Atlas sits above every broker and validates the decision before you commit, the way Grammarly validates language before you publish." Close with: "Atlas explains uncertainty. It never guarantees an outcome."

**4. Tomorrow With Atlas — The New Journey**
Full-width, high-impact slide: show the Problem slide's six-step chaotic flow on the left (greyed out, crossed through) and Atlas's flow on the right, clean and linear, in the brand's indigo/mint palette: Open ATLAS → AI Portfolio Review → Goal Check → Risk Review → Portfolio DNA™ → Recommended Allocation → One Tap Invest → Done. Small caption under "One Tap Invest": "Execution via licensed broker/AMC partners — Phase 2, pending partnership agreements. Not available at launch." This caption must appear on the slide itself, not just in speaker notes — it's a compliance-relevant claim.

**5. Product — The Decision Card**
Full-bleed: an actual Decision Card — ticker (NVDA), recommendation as a lean not an imperative ("Lean Bullish," not "Buy"), confidence 74%, bull/neutral/bear probability bar (43/39/18), expected return +9.0% / expected drawdown −4.0%, 2-3 lines of specific reasoning, 2-3 invalidation conditions, and a six-signal confidence breakdown (macro, technical, fundamental, institutional, sentiment, options/flow).

**6. Product — Dashboard: Portfolio DNA™, Sleep Score™, Risk Radar™**
Three-panel showcase. Portfolio DNA: a "true look-through exposure" visual showing a user's real aggregated exposure to a single stock across multiple mutual funds (the number that no single fund factsheet reveals). Sleep Score: the Confidence Ring showing a single 0-100 health number with 2-3 named contributing reasons beneath it. Risk Radar: concentration / currency / sector / liquidity bars, each with a specific named driver, never a bare number.

**7. Technical Architecture**
Two-column. Left, "Frontend": Next.js 15 (App Router), strict TypeScript, Tailwind with a custom design-token system, deployed on Vercel. Right, "Backend & Data": Supabase Postgres via Prisma with row-level security, and a callout distinct from the rest of the slide: **"Confidence scores are rule-based and auditable, not a black-box model — Claude (Anthropic) explains the reasoning behind a number, it never invents the number itself."** State this precisely — it's the real technical differentiator versus "LLM wrapper" competitors, and investors doing technical diligence will probe exactly this claim.

**8. Roadmap — Three Phases to a Financial Operating System**
Timeline layout, three phases, each labeled with a status tag (LIVE / NEXT / VISION): **Phase 1 — Intelligence Platform (LIVE):** Portfolio Dashboard, Portfolio DNA, Sleep Score, Risk Radar, Decision Journal — informational, zero execution, launching now. **Phase 2 — Assisted Investing (NEXT):** partner with regulated brokers and AMCs so users can act on Atlas's insights with execution handled entirely by the licensed partner — this is where "One Tap Invest" becomes real. **Phase 3 — Direct Investment (VISION, regulatory-approval-dependent):** Atlas itself becomes a licensed platform for mutual funds, index funds, ETFs, and goal-based investing. State plainly on the slide that Phase 3 depends on regulatory approval and is not a committed timeline.

**9. Market Opportunity**
Three segments: retail & self-directed investors (largest, fastest-growing in India and other emerging markets), financial advisors & wealth managers (later phase), institutional & family offices (long-term). Include a TAM/SAM/SOM funnel, labeled explicitly as a directional estimate — "validated sizing available on request" — rather than presented as confirmed research.

**10. Competitive Landscape**
Name real reference points: Bloomberg Terminal (data-rich, not explanation-rich, enterprise-priced), robo-advisors like Betterment/Groww's own tools (automate allocation, don't explain individual decisions), general AI chatbots (can answer anything, calibrated to explain nothing specific to a real portfolio). Position Atlas as the only one built specifically for decision validation with a fixed, auditable output shape.

**11. Business Model**
Phase 1: freemium subscription — a free tier with limited Decision Cards/reviews per month, a paid tier with full history and unlimited use. Phase 2: referral/revenue-share from licensed broker and AMC partners on assisted transactions. Phase 3: platform economics once (and if) direct investment is licensed. Label clearly as a pricing hypothesis to validate, not confirmed unit economics.

**12. Regulatory Posture**
State plainly: Phase 1 ships as an informational/decision-support tool, not personalized investment advice, while Investment Adviser registration is pursued in parallel. Phase 2 execution is handled entirely by licensed partners, not by Atlas directly. Phase 3 requires its own regulatory approval and is explicitly not committed to a date. Frame this staged approach as evidence of discipline, not a limitation — a startup that has clearly mapped its own regulatory surface is more fundable, not less.

**13. Traction & Launch Status**
Be exactly as honest as the real status: Phase 1 (Portfolio Dashboard, Portfolio DNA, Sleep Score, Risk Radar, Decision Journal) is built and launching imminently; early validation was done manually with a small group of real users before writing code, to confirm the core insight resonated before committing engineering time. If real usage numbers exist by the time this deck is used, insert them here — don't leave the slide as a vague claim.

**14. Why This Is Defensible**
Four points: explainable-by-construction architecture (structural, not retrofitted), a behavioral data moat that compounds the longer a user journals decisions, a fixed Decision Card output shape that's hard to shallow-copy, and a staged regulatory strategy that de-risks the path to execution rather than ignoring it.

**15. Team**
Solo-founder-led. State this plainly and confidently rather than padding it — one line on the founder's relevant conviction/background (founder to fill in), and one clear line on what's being hired next (e.g. a founding engineer, and a compliance advisor once Phase 2 planning begins). Do not fabricate co-founders, advisors, or credentials.

**16. The Ask & Closing**
Raising ₹20,00,000 (₹20 lakhs), pre-seed. Use of funds, shown as a simple breakdown: Tier 1 development (freelance/contract engineering to complete and stabilize the build), legal & compliance (fintech lawyer, incorporation, Investment Adviser registration process), data & infrastructure (mutual fund data source for Portfolio DNA, hosting, Anthropic API), and a contingency buffer. Frame this explicitly as "Tier 1 to market plus runway into Phase 2 planning," not just a build budget. Close on the mission line: "Help people make better financial decisions under uncertainty — not by predicting the future, but by quantifying it honestly."

---

Do not fabricate specific financial projections, user/revenue numbers, team credentials, or co-founders — leave those as clearly-labeled placeholders for the founder to fill in with real figures. Do not present "One Tap Invest" or any execution capability as available in Phase 1 anywhere in the deck, including in visuals — it is explicitly Phase 2+ and must be labeled as such every place it appears.
