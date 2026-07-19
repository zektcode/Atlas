# design/

The design system Atlas's UI is built from — tokens, type, motion, and component conventions. `tailwind.config.ts` at the repo root is the *implementation* of the tokens documented here; if they ever disagree, this folder is wrong and needs updating, not the other way around (Tailwind config is what actually ships).

- `Design_System.md` — overview and signature element
- `Typography.md`, `Color_Tokens.md`, `Spacing.md` — token specs
- `Motion_Guidelines.md` — what animation is and isn't allowed
- `Component_Library.md` — conventions for `frontend/components/`
- `prototype/` — the standalone HTML prototype (landing / dashboard / decision card) used to validate the visual direction before any Next.js code existed
