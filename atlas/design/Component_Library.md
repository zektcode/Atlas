# Component Library Conventions

`frontend/components/ui/` holds base primitives in a shadcn/ui-compatible style (a `cva`-based variant pattern, `cn()` for class merging) without vendoring the full shadcn CLI output — this keeps the dependency surface small pre-MVP while staying compatible if we adopt more shadcn components later.

## Current primitives

- `Card` / `CardTitle` — the base surface for every Dashboard tile and Decision Card
- `Button` — `primary` (indigo, for the one core action per screen), `ghost` (secondary text actions), `outline`

## Product-specific components

- `DecisionCard` — see `docs/Decision_Framework.md`. Not a generic "card," a specific required-fields component. Do not create a shortened variant.
- `SleepScoreRing` — the signature Confidence Ring visual, parameterized so it works for both a single score (Dashboard) and a 3-segment bull/neutral/bear split (landing hero, Decision Card header).

## Convention

New components go in `components/` (flat) unless there are 3+ related files, in which case they get their own subfolder. Server components by default; add `"use client"` only for interactivity.
