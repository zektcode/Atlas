# Motion Guidelines

Atlas's UI copy explicitly rejects manufactured urgency — see `docs/Product_Philosophy.md`. Motion follows the same rule.

## Allowed

- Subtle hover state transitions (border color, opacity) — 150–200ms ease
- Confidence Ring draw-in on first paint (SVG stroke animation), once, not looping
- Page transition fade/slide, 300–400ms, no bounce/spring easing that reads as playful

## Not allowed

- Looping ambient animation on data (pulsing numbers, shimmering cards) — reads as "something is happening" when nothing is
- Countdown timers or urgency-coded motion on any recommendation surface
- Celebratory animation tied to a rising Sleep Score or a profitable position — see `docs/Sleep_Score.md` "explicit non-goal"

## Implementation

Framer Motion is in the dependency list for the handful of deliberate moments above (Confidence Ring draw-in, page transitions) — it is not meant to be reached for by default on every component. `prefers-reduced-motion` must be respected everywhere; see `frontend/app/globals.css`.
