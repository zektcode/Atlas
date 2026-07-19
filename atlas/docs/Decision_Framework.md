# Decision Card™ — Specification

The fixed unit Atlas reasons in, everywhere in the product — Dashboard insights, AI Coach responses, and the dedicated Decision Card view all ultimately point back to this same shape.

## Required fields (a Decision Card is invalid without all of these)

1. **Recommendation** — directional lean (e.g. "Lean Bullish"), never an imperative ("Buy")
2. **Confidence** — 0–100, from the Confidence Framework
3. **Scenario distribution** — Bull / Neutral / Bear probabilities, summing to 100
4. **Expected return** and **expected drawdown**
5. **Risk level** — derived from the Risk Engine
6. **Reasoning** — 2–4 specific, sourced statements (never generic)
7. **Invalidation conditions** — 2–4 specific, falsifiable conditions
8. **Confidence breakdown** — all six signal family scores, visible, not click-to-expand
9. **Sources** — what the reasoning is actually attributed to

## Why "Recommendation" is a lean, never an imperative

"Lean Bullish" preserves the distinction between "this is what the evidence suggests" and "this is what you should do" — the latter is a decision only the user can make, informed by risk tolerance the system doesn't fully know. See `docs/Product_Philosophy.md`.

## Data model

Maps directly to the `DecisionCard` + `SignalScore[]` Prisma models — see `docs/Database.md`. The UI component is `frontend/components/decision-card.tsx`.
