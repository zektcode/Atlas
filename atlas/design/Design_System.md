# Design System

## Signature element: the Confidence Ring

A segmented circular arc — bull/neutral/bear or positive/neutral/negative proportions — with the score centered in a serif numeral. It appears in the landing hero, the Dashboard Sleep Score card, and the Decision Card. This is the one visual idea Atlas should be recognizable by; see `frontend/components/sleep-score-ring.tsx` for the implementation.

## Direction

Near-black (not pure black), restrained, data-typeface-for-data. Rejected the three most common "AI-generated" defaults (warm cream + terracotta serif; near-black + neon accent; broadsheet hairline-rule layout) in favor of: dark background, a single muted indigo brand accent, and bull/neutral/bear colors that only ever encode data, never decoration. Full rationale in `PROJECT_LOG.md` isn't duplicated here — this file states the resulting rules, not the exploration.

## Rules

1. Color always means something. Bull/neutral/bear (mint/amber/coral) never appear as pure decoration — if it's colored, it's encoding a scenario, a risk severity, or a value direction.
2. Data gets a data typeface. Any number that is a price, percentage, or score renders in IBM Plex Mono. Everything else is Inter. Fraunces (serif) is reserved for headline text and the large score numerals only — never body copy, never buttons.
3. Cards, not shadows. Elevation comes from a 1px border (`--border` / `--border-strong`) and a slightly lighter background, not heavy box-shadows — see Bloomberg/Linear/Stripe reference points in the original brief.
4. Motion is subtle and purposeful. See `Motion_Guidelines.md`.
