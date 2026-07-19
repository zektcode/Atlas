# Sleep Score™ — Specification

## The question it answers

"Can I stop checking my phone tonight?" — a single number, but never presented without its contributing reasons directly beneath it (see the Dashboard mock in `design/prototype/`).

## Inputs (v0)

```
sleepScore = f(
  riskSeverity,        // from Risk Engine — higher risk lowers score
  confidenceTrend,      // is average confidence across holdings rising or falling
  upcomingEventDensity, // count/weight of high-impact events in the next 7 days
  unresolvedFlags        // e.g. concentration warnings not yet acknowledged by the user
)
```

## Presentation rules

- Always shown with 2–4 specific contributing signals (positive and negative), never the number alone.
- Never color-coded to imply urgency beyond what's warranted — see `design/Color_Tokens.md` for how bull/neutral/bear colors are used consistently, not as alarm colors.
- Historical trend (is Sleep Score improving over the last 30 days) is arguably more useful than the instantaneous number and should be equally prominent once history exists (Phase 2 — needs `SleepScoreSnapshot` accumulation).

## Explicit non-goal

The Sleep Score is not a gamified "streak" metric. No visual celebration for a rising score, no guilt-inducing treatment for a falling one — it's information, not a nudge. See `docs/Product_Philosophy.md` point 4.
