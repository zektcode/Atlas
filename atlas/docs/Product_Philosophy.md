# Product Philosophy

This is the document every feature is judged against. If a PR, a design, or a feature idea conflicts with something here, this document wins by default — raise a discussion to change the philosophy itself, don't quietly route around it in one feature.

## The core law

> **Never tell users what WILL happen. Explain what is likely, why, how confident, what's assumed, what would invalidate it, and what the risk is.**

This applies everywhere confidence or a recommendation appears — Dashboard, Decision Card, AI Coach, push notifications, marketing copy. A landing page that says "Atlas predicts NVDA will rise" is a philosophy violation, not just a copy nitpick.

## Corollaries

1. **Optimize for confidence, not engagement.** A feature that increases session length without increasing decision quality (see `docs/Vision.md` for that metric) gets cut, no matter how good the engagement number looks in a review.
2. **No black-box scores, anywhere.** Every number a user sees must decompose into named, inspectable components. This is why `docs/Frameworks.md` exists as a spec, not just an implementation detail.
3. **Show the user what would prove them wrong.** Invalidation conditions are not optional metadata — they're arguably the single most differentiating field on a Decision Card, and cutting them under time pressure is a philosophy violation, not a scope trim.
4. **Calm, not urgent.** No red "SELL NOW" banners, no countdown timers on trade ideas, no manufactured urgency. The Sleep Score exists specifically as a counter-metric to engagement-maximizing anxiety loops common in trading apps.
5. **The AI Coach teaches, it doesn't just answer.** A good AI Coach response often ends with a question back to the user ("what would have to be true for you to be wrong here?") rather than a directive.

## What this rules out, explicitly

- Gamification mechanics (streaks, badges, leaderboards) tied to trading frequency.
- Push notifications framed around price movement urgency rather than a genuine Sleep Score or Risk Radar change.
- Any UI pattern that implies certainty the underlying confidence score doesn't support (e.g. a green checkmark on a 51%-confidence call).
