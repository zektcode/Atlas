# Behavior Engine™ — Specification (Phase 2)

## What it tracks

Patterns in the Trade Journal over time — not predictions about future behavior, observations about past behavior, explicitly reflected back to the user:

- Revenge trading (position opened shortly after a loss, larger than the user's own stated typical size)
- FOMO entries (position opened shortly after a large price spike, with no stated thesis beyond price action)
- Overtrading (frequency significantly above the user's own historical baseline)
- Position sizing drift (gradual increase in size relative to stated risk tolerance)
- Confidence-outcome calibration (does the user's stated confidence at entry actually correlate with outcomes — are they over- or under-confident as a pattern)

## Presentation rule

Always phrased as an observation with evidence, never a judgment: *"This is the third entry this month opened within an hour of a loss on a different position — worth naming as a pattern"* rather than *"You are revenge trading."* See `docs/Product_Philosophy.md` and the wellbeing-conscious tone required throughout the product.

## Data requirements

Needs `JournalEntry` history with `reason`, `emotion`, `confidenceAtEntry`, `outcome` populated — see `docs/Database.md`. Not viable with fewer than ~10 journal entries; the UI should say so rather than showing a low-confidence behavioral read as if it were solid.
