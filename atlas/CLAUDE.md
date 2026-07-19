# CLAUDE.md — How Claude Was Used to Build This Repository

Transparency about AI-assisted development is a design principle here, not an afterthought — it would be strange for a company whose entire pitch is "never hide the reasoning" to hide its own.

## What Claude actually did

- Drafted the initial repository scaffold (folder structure, config files, doc skeletons) from a founder-written product brief.
- Wrote first-draft implementations of the confidence/risk/sleep-score scoring logic, based on explicit rules the founder specified (weighted signal families, not a learned black box).
- Generated the design system tokens and the first working prototype (`design/prototype/`) to make the product's philosophy tangible before any backend existed.
- Wrote documentation (`docs/`, `investor/`) from structured input, then flagged assumptions for the founder to confirm or correct.

## What Claude did not do

- Did not choose the product thesis ("quantify uncertainty, never predict") — that came from the founder and is treated as non-negotiable.
- Did not wire any real external API, database, or auth provider — every credentialed integration point is explicitly marked and left for a human to connect and test.
- Did not make final calls on data provenance, compliance posture, or anything touching real financial advice — those require a human (and likely counsel) in the loop.

## Development philosophy for AI collaboration

1. **AI drafts, humans decide.** Every generated architectural decision in this repo is written as a decision *record* (see `docs/Technical_Architecture.md`), not a fait accompli — the reasoning is visible so it can be overturned.
2. **No silent placeholders.** Anything mocked is marked `// TODO(integration)` in code or called out explicitly in docs, never left ambiguous.
3. **Scope honestly, then execute.** A "build the entire company" prompt gets broken into phases rather than answered with hollow stub files that look complete but aren't.
4. **The product philosophy applies recursively.** If Atlas shouldn't give users a black-box confidence score, this repo shouldn't give the founder a black-box "it's done" either.

## Prompting strategy used for this repo

The founder provided a structured brief (vision, tech stack, folder structure, feature list) rather than an open-ended request. Claude worked in passes: scaffold → docs → core UI → data model → business logic → investor materials, checking in at natural boundaries (a full repo is a multi-session project, not a single generation).

## Future collaboration instructions

For anyone (human or AI) picking this repo up next:

- Read `docs/Product_Philosophy.md` before writing product code — it's the spec the confidence engine is judged against.
- Read `docs/Technical_Architecture.md` before changing the folder structure — several choices (e.g. `frontend/` and `backend/` as top-level, not `apps/frontend`) are deliberate, not defaults.
- Update `PROJECT_LOG.md` with any non-trivial decision. Silent architecture drift is the thing this file exists to prevent.
- If you're an AI model extending this repo: follow the "no silent placeholders" rule above. Mark what you didn't actually build.
