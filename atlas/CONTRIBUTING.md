# Contributing to Atlas

Atlas is currently closed development (pre-seed). This file documents the standards we hold ourselves to internally and will govern external contribution once the project opens up.

## Before you write code

1. Read [`docs/Product_Philosophy.md`](docs/Product_Philosophy.md). The single most common reason a contribution gets rejected is that it implicitly predicts an outcome instead of quantifying uncertainty about one.
2. Check [`docs/PRD.md`](docs/PRD.md) and [`ROADMAP.md`](ROADMAP.md) — if the feature isn't in the current phase, open a discussion before opening a PR.

## Code standards

- **TypeScript strict mode.** No `any` without a comment explaining why it's unavoidable.
- **Server components by default** in `frontend/app/`; add `"use client"` only when the component needs interactivity or browser APIs.
- **No inline hex colors.** Use the Tailwind tokens defined in `tailwind.config.ts` / `design/Color_Tokens.md`.
- **Every scoring function must be explainable.** If you can't describe in one sentence *why* a number moved, the function needs a decomposition, not just a return value.
- **Mark mocked data explicitly** with `// TODO(integration): <what's needed>` — never let fixture data look indistinguishable from a real integration.

## Commit style

Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`. Reference the relevant doc when a commit changes product behavior, e.g. `feat(risk-engine): add currency exposure weighting (docs/Risk_Engine.md)`.

## Pull requests

- Use the PR template in `.github/PULL_REQUEST_TEMPLATE.md`.
- Screenshots or a short clip for any UI change.
- Note explicitly if the PR introduces a new mocked/placeholder integration point.

## Local setup

See the "Getting started" section of [`README.md`](README.md).
