# Architecture (Product-Level Overview)

This document covers *what* the system does end to end. For *why* it's shaped this way, see `Technical_Architecture.md`. For diagrams, see `/architecture`.

## High-level flow

1. A user connects (Phase 1: seeded/synthetic; Phase 3: real via Plaid/SnapTrade) a portfolio.
2. The **Confidence Framework** scores each holding across six signal families (see `Frameworks.md`).
3. The **Risk Engine** evaluates portfolio-level exposure (concentration, currency, sector, liquidity, tail risk).
4. The **Sleep Score** synthesizes both into a single "can I stop checking my phone" number, with the underlying reasons always visible.
5. Any of the above can be rendered as a **Decision Card** — the fixed unit of explanation used everywhere in the product.
6. The **AI Coach** (Anthropic API) sits on top, able to discuss any of the above in natural language, but never allowed to state a number it can't trace back to the underlying engines.
7. The **Behavior Engine** watches the Trade Journal over time and reflects patterns back to the user (not predictions — patterns, e.g. "this is the third time you've increased position size right after a losing trade").

## System boundary

Atlas reasons about a user's portfolio. It does not execute trades (no brokerage integration for order placement is planned even in later phases without a significant, separately-scoped compliance review — see `investor/Competitive_Analysis.md`).
