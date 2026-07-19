# Product Requirements Document — v0.1 (MVP)

## Problem statement

Investors ask "should I buy/sell/hold" constantly and get answers with no calibration attached. This produces two failure modes: overconfidence (acting on a "hot tip" with no sense of its actual reliability) and paralysis (too much conflicting information with no synthesis). Atlas targets both by making confidence and its sources explicit.

## Target user (Phase 1)

A self-directed retail investor or swing trader who already uses a brokerage app, checks it more than they'd like to admit, and wants a second opinion that explains its reasoning rather than just asserting a rating.

*Not* the Phase 1 target: institutional asset managers (Phase 5), which need multi-client views and compliance features not yet scoped.

## MVP scope

**In scope:**
- Landing page communicating the core thesis
- Auth (Supabase — sign up, log in)
- Dashboard: Sleep Score, Portfolio summary, Risk Radar, Macro Calendar, AI Insights (static text v0), Watchlist
- Decision Card for a fixed set of seeded tickers, computed from the rule-based Confidence Framework against fixture data
- Trade Journal: manual entry, no AI analysis yet (Behavior Engine is Phase 2)

**Explicitly out of scope for MVP:**
- Real brokerage linking (Phase 3)
- AI Coach conversational interface (Phase 2)
- Scenario Simulator (Phase 2)
- Any execution/trading capability (not on the roadmap without separate compliance scoping)

## Success metric

Not signups, not DAU. The Phase 1 success bar: **can a user, shown a Decision Card, correctly restate in their own words why the confidence number is what it is and what would change it?** This is testable via a simple comprehension check in early user interviews and is a direct proxy for whether the Confidence Framework is actually legible rather than just decorative.

## Non-functional requirements

- Every score-bearing page must load its full reasoning breakdown, not a truncated summary requiring a click-through — "no black box" includes "no hidden-behind-a-click box."
- Dark mode is the only mode for MVP (see `design/Design_System.md`) — a light theme is a Phase 2+ nice-to-have, not a launch blocker worth the design time now.
