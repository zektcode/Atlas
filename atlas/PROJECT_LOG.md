# Project Log

A running record of decisions, not just deliverables. If a future contributor (human or AI) wonders "why is it built this way," this is the first place to check before `docs/Technical_Architecture.md`.

---

### 2026-07-11 — Repository scaffold created

**Decision:** Built the full folder structure (`docs/`, `frontend/`, `backend/`, `design/`, `architecture/`, `investor/`, `.github/`) in one pass rather than starting with just a Next.js app and growing the rest organically.

**Why:** The founder's brief explicitly asked for an investor-presentable repository, not just a codebase. A repo that looks like "an app with some notes" reads very differently from one that looks like a company. Front-loading the structure — even with some sections thinner than others — sets the right shape to grow into.

**Trade-off accepted:** Some docs are necessarily more detailed than others in this first pass (the Confidence Framework and Prisma schema got the most real thought; some investor docs are closer to first-draft). Flagged explicitly rather than hidden — see each file's own caveats.

---

### 2026-07-11 — `frontend/` and `backend/` as top-level folders, not `apps/frontend` + `apps/backend`

**Decision:** Rejected a monorepo/`apps/` convention in favor of flat `frontend/` + `backend/` at the repo root, with Next.js API routes as the actual runtime bridge (Next.js app lives in `frontend/`, imports business logic from `backend/services`).

**Why:** Atlas is one deployable Next.js app on Vercel, not multiple independently-deployed services yet. A monorepo tooling layer (Turborepo, Nx) would be solving a problem we don't have at MVP stage, at the cost of onboarding friction for the next engineer. Revisit if/when broker integrations (Phase 3) warrant a separate backend service.

---

### 2026-07-11 — Confidence scoring is rule-based (v0), not ML-based

**Decision:** `backend/services/confidenceEngine.ts` implements confidence as an explicit weighted sum of named signal families (macro, technical, fundamental, sentiment, institutional, options), not a learned model.

**Why:** Directly enforces "never a black box" from `docs/Product_Philosophy.md`. A learned model can be more accurate and still be impossible to explain in one sentence — which is disqualifying for this product, not just a nice-to-have. Revisit only if a learned component's *contribution* can itself be decomposed and shown (e.g. SHAP-style attribution), not before.

---

---

### 2026-07-19 — Tier 1 feature build: Portfolio DNA, real dashboard wiring, Decision Journal, Decision Card quarantined

**Decision:** Built out the five Tier 1 features to genuinely working state: Portfolio DNA's full formula (`backend/services/portfolioDNA.ts`), a real Add Holding + DNA-rendering `/portfolio` page, a full Trade Journal CRUD, and rewired the Dashboard's Sleep Score and Risk Radar to call the real scoring engines instead of hardcoded mock numbers. Also moved the Decision Card demo from `/portfolio` to an unlisted `/decision-card` route with an explicit internal-preview banner.

**Why the Decision Card move mattered:** it had been sitting at `/portfolio` — the exact route Tier 1 users would land on — which meant the compliance-gated Tier 3 feature was one route away from being the first thing a real user or investor saw as "the product." Caught and fixed before it caused a real problem, not after.

**Why an in-memory dev store instead of wiring Supabase immediately:** the founder is non-technical and needs `npm run dev` to actually work today, before Supabase is provisioned or a developer is hired. Every function in `frontend/lib/devStore.ts` is a scoped, marked drop-in replacement target — see `BUILD_STATUS.md` for the full accounting of what's real versus what's fixture.

**Trade-off accepted:** no auth yet, so every route currently operates on one shared portfolio rather than per-user data. Explicitly out of scope for "does the core reasoning pipeline work end to end" and deferred to the Week 5 timeline item (see the roadmap PDF) where ToS/Privacy/ and real user scoping land together.

*Add new entries above this line, most recent first is not required — chronological order is easier to audit.*
