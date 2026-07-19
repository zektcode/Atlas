# Risk Engine™ — Specification

## What it measures

Portfolio-level risk, decomposed into named categories rather than a single opaque "risk score":

| Dimension | What it flags |
|---|---|
| Concentration | Any single position or correlated cluster exceeding a threshold (default: single-position warning above 20% of portfolio) |
| Currency exposure | Non-base-currency exposure as % of portfolio |
| Sector tilt | Overweight vs. a benchmark sector allocation |
| Liquidity | Positions that would be slow/costly to exit at size |
| Tail risk | Sensitivity to low-probability, high-impact scenarios (proxied in v0 by historical drawdown of similar positions) |
| Correlation | How much of the portfolio actually moves together, independent of nominal diversification |

## Output shape

Each dimension returns a 0–100 severity score plus a one-sentence, specific explanation (never a generic "risk is elevated" — always "single position (NVDA) is 22% of book," naming the actual driver). See `backend/services/riskEngine.ts`.

## Relationship to Sleep Score

The Risk Engine's output is one of two direct inputs to the Sleep Score (the other being confidence trend) — see `Sleep_Score.md`. Risk Engine output should never be shown to a user without the specific driver named; "risk radar" bars with no accompanying sentence violate `docs/Product_Philosophy.md`.
