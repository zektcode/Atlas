# Vision

## The 10-year version

Atlas becomes the intelligence layer every serious investor checks before checking their brokerage app — not a broker, not a screener, not a chatbot, but the place where "should I do something about this" gets a real answer.

## Why now

Two things converged: LLMs got good enough to explain reasoning in natural language at low cost, and retail + advisor tooling stayed stuck in one of two failure modes — a dashboard with numbers and no interpretation, or a chatbot with interpretation and no rigor. Atlas is built at the intersection: rigorous scoring, explained in language a human actually reads.

## What "winning" looks like

Not "assets under advisement." Not engagement minutes. The metric Atlas should be judged on is **decision quality over time** — did the user's Sleep Score trend correlate with actually-improved outcomes, and did their Behavior Engine flags (revenge trading, FOMO) actually decrease. See `docs/PRD.md` for how this becomes a real success metric, not a slogan.

## What we are explicitly not building

- Not a trading platform (no execution in Phase 1–2).
- Not a portfolio tracker (trackers show *what happened*; Atlas explains *what to do about it and how sure to be*).
- Not a stock screener (screeners filter; Atlas reasons about the specific portfolio in front of it).
- Not a general-purpose finance chatbot (a chatbot can be asked anything and confidently answer nothing well; the Decision Card is a fixed, disciplined output shape for a reason).
