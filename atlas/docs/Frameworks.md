# The Confidence Framework™ — Specification

The framework that makes "no black box" enforceable, not just a value statement.

## The six signal families

| Signal | What it captures | Example inputs (Phase 1: fixture data) |
|---|---|---|
| Macro | Rate environment, inflation trajectory, macro regime | CPI trend, Fed stance |
| Technical | Price action, momentum, moving averages | 50/200-day MA relationship, RSI |
| Fundamental | Earnings quality, margins, guidance | Revenue growth, gross margin trend |
| Institutional | What large holders are doing | 13F accumulation/distribution |
| Sentiment | Aggregate positioning/mood | Options put/call skew, news tone |
| Options / Flow | Derivatives positioning | Call/put open interest skew into a catalyst |

## Scoring rule (v0)

Each signal family produces a score from 0–100. Final confidence is a weighted sum:

```
confidence = Σ (signal_score_i × weight_i)
```

Default weights (see `backend/services/confidenceEngine.ts` for the live constants — this doc and the code must never drift; if you change one, change both):

```
macro: 0.15, technical: 0.20, fundamental: 0.25,
institutional: 0.20, sentiment: 0.10, options: 0.10
```

Fundamental and institutional signals are weighted highest by design — momentum-chasing (over-weighting technical/sentiment) is exactly the failure mode Atlas exists to counter.

## Related framework: Portfolio DNA™

Portfolio DNA is a *descriptive* sibling to this framework — composition and look-through exposure, not a confidence-scored recommendation. It's lower compliance risk and ships in Tier 1 for exactly that reason. Full spec: `docs/Portfolio_DNA.md`.

## Why this must stay legible

Any change to weights, or any proposal to replace this with a learned model, must be able to answer: *"can a user still trace a specific confidence number back to which signal moved and by how much?"* If the answer is no, it doesn't ship — see `docs/Product_Philosophy.md`.
