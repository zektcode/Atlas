# Portfolio DNA™ — Specification

## What it answers

"What do I actually own, once you look through every fund to its underlying holdings?" — composition and true concentration, not a recommendation. This is a Tier 1 / Phase 1 feature specifically because it's descriptive, not prescriptive: it never tells a user what to do, only what's currently true about their portfolio. See `docs/Product_Philosophy.md` — this framing is what keeps it outside SEBI's Investment Adviser "personalised recommendation" boundary, unlike the Decision Card.

## The core problem it solves

A user holding three different mutual funds thinks they're diversified. If all three funds independently hold a 6-8% position in the same large-cap stock, the user's *true* single-stock exposure is far higher than any single fund suggests. Nobody shows this today — funds report their own holdings, never a user's aggregated look-through exposure across funds. This is Portfolio DNA's reason to exist.

## Inputs

```
positions: {
  ticker, name, assetClass, quantity, marketValue,
  sector, geography, currency
}[]

// For mutual fund / ETF positions specifically, additional lookup data:
fundHoldings: {
  fundTicker,
  underlyingHoldings: { ticker, name, weightPct, sector, geography }[]
}[]
```

`fundHoldings` requires a real data dependency (fund factsheet / portfolio disclosure data — e.g. AMFI or a licensed data vendor in India) — this is the one genuine "TODO(integration)" in an otherwise low-risk feature. Direct equity/ETF/crypto positions need no lookup; only mutual fund look-through does.

## Computations

### 1. Composition mix (asset class / sector / geography)

Straightforward weighted aggregation across direct holdings. For fund positions, look-through: a fund's market value is distributed across its underlying holdings' sector/geography weights rather than counted as one undifferentiated blob.

```
sectorMix[s] = Σ (position.marketValue × underlyingWeight(position, s)) / totalPortfolioValue
```

### 2. True look-through exposure per security

The number that makes Portfolio DNA valuable — aggregated exposure to a single underlying security across *all* holding vehicles (direct + every fund that holds it):

```
trueExposure(security) = directHoldingValue(security)
  + Σ over each fund F holding the user owns:
      fundMarketValue(F) × underlyingWeight(F, security)
```

Reported as a percentage of total portfolio value, sorted descending. This is the headline output — "You are effectively 14.2% exposed to Reliance Industries across 1 direct holding and 3 mutual funds," always named specifically, never an abstract score alone (same presentation rule as Risk Engine and Sleep Score — see `docs/Product_Philosophy.md`).

### 3. Fund Overlap Score (pairwise)

For any two funds A and B the user holds, a standard portfolio-overlap measure — the sum, across every security both funds hold, of the smaller of the two weights:

```
overlap(A, B) = Σ over securities s held by both A and B: min(weightA(s), weightB(s))
```

Result is 0-100%. An overlap above roughly 60% between two funds is flagged as "these two funds are largely duplicating each other" — again, named with the specific overlapping holdings that drive the number, not just the percentage.

## Output shape (what the UI renders)

1. **Asset class / sector / geography mix** — three simple composition charts
2. **Top 5 true look-through exposures** — security, aggregated %, and which vehicles contribute to it
3. **Fund overlap pairs** — any pair above the flag threshold, with the specific shared holdings named
4. **One-line summary** — e.g. "3 of your 5 holdings are mutual funds; look-through shows your real top holding is 14.2% Reliance Industries, not visible from any single fund's factsheet."

## Explicit non-goal

Portfolio DNA never recommends rebalancing, never says a concentration is "too high" in a directive sense, and never suggests an alternative fund. It reports composition. Any language that starts to say "you should..." here has drifted into Decision Confidence™ / Tier 3 territory and needs the same compliance review before shipping — see `investor/` compliance notes and consult a SEBI-specialist lawyer before changing this feature's copy.

## Relationship to other frameworks

Feeds Risk Engine's "Concentration" and "Sector tilt" dimensions with more accurate look-through numbers than position-level data alone would provide — see `docs/Risk_Engine.md`. Does not feed Sleep Score directly in v0 (Sleep Score continues to consume Risk Engine's output); wiring Portfolio DNA's look-through concentration into Sleep Score is a reasonable Tier 2 enhancement once the base feature is validated.
