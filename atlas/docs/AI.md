# AI Layer

## Where AI is used

1. **AI Coach** — conversational layer over a user's own Decision Cards, Sleep Score, and Journal. Anthropic API (Claude), Phase 2.
2. **Reasoning text generation** — the "Reasoning" and "What Would Invalidate This" fields on a Decision Card are natural-language, generated from structured signal data (not the other way around — the *numbers* come first from `confidenceEngine.ts`, and Claude is prompted to explain them, never to invent a number itself).

## Where AI is deliberately NOT used

- **Confidence, risk, and sleep scores themselves** are rule-based (see `docs/Technical_Architecture.md`, ADR-004). Claude explains these numbers; Claude does not calculate them. This boundary is load-bearing for the product's core promise and should not be blurred for convenience.
- **No autonomous trading or order suggestions with executable actions.** The AI Coach can discuss scenarios; it does not have a tool that places or suggests a specific executable trade.

## Prompting approach for the AI Coach (Phase 2 design)

System prompt constrains the model to: (1) only reference data present in the user's actual Decision Cards / Journal passed into context, (2) never state a confidence number it wasn't given, (3) end high-stakes responses with a clarifying or reflective question rather than a directive, consistent with `docs/Product_Philosophy.md` point 5.

## Data sent to the AI provider

Portfolio composition and Decision Card contents, scoped to the requesting user, sent per-request — no persistent fine-tuning on user data. Full data handling detail belongs in a privacy policy (not yet drafted — flagged in `ROADMAP.md`).
