# Color Tokens

Mirrors `tailwind.config.ts` exactly — that file is the source of truth for values; this doc explains intent.

| Token | Hex | Intent |
|---|---|---|
| `bg` | `#08090c` | Base background — near-black, not pure black |
| `bg-elevated` | `#12141b` | Card backgrounds |
| `bg-surface` | `#161922` | Nested surfaces (progress track backgrounds, inputs) |
| `border` | `rgba(255,255,255,0.07)` | Default hairline border |
| `border-strong` | `rgba(255,255,255,0.14)` | Hover / emphasized border |
| `text-1` | `#f0f1f4` | Primary text |
| `text-2` | `#9aa0ac` | Secondary text |
| `text-3` | `#5b6270` | Tertiary / caption text |
| `indigo` | `#7c8cff` | The single brand accent — confidence, links, primary actions |
| `bull` | `#4ade9a` | Positive scenario / value only |
| `neutral` | `#e8b04b` | Neutral scenario / medium severity only |
| `bear` | `#f0665a` | Negative scenario / high severity only |

**Rule:** `bull` / `neutral` / `bear` are reserved for data encoding. Never use them for arbitrary UI decoration (e.g. don't make a random icon mint-green because it "looks nice") — that dilutes their meaning everywhere else they appear.
