/**
 * Confidence Framework™ — v0 (rule-based)
 * See /docs/Frameworks.md for the full specification. This file and that
 * doc must never drift — if you change a weight, update both.
 *
 * Deliberately NOT a learned model. See /docs/Technical_Architecture.md
 * (ADR-004) for why: explainability is a hard product requirement, not a
 * nice-to-have, and a black-box model — however accurate — would violate
 * /docs/Product_Philosophy.md.
 */

export type SignalFamily =
  | "macro"
  | "technical"
  | "fundamental"
  | "institutional"
  | "sentiment"
  | "options";

export type SignalScores = Record<SignalFamily, number>; // each 0-100

/**
 * Default weights. Fundamental and institutional are weighted highest by
 * design — momentum-chasing (over-weighting technical/sentiment) is exactly
 * the failure mode Atlas exists to counter. See /docs/Frameworks.md.
 */
export const WEIGHTS: Record<SignalFamily, number> = {
  macro: 0.15,
  technical: 0.2,
  fundamental: 0.25,
  institutional: 0.2,
  sentiment: 0.1,
  options: 0.1,
};

/**
 * Computes overall confidence (0-100) as a weighted sum of signal scores.
 * Throws if scores are out of range — a silently clamped bad input is
 * exactly the kind of quiet failure that undermines trust in the number.
 */
export function computeConfidence(scores: SignalScores): number {
  for (const [family, score] of Object.entries(scores)) {
    if (score < 0 || score > 100) {
      throw new Error(`Signal score for "${family}" must be 0-100, got ${score}`);
    }
  }

  const weighted = (Object.keys(scores) as SignalFamily[]).reduce(
    (sum, family) => sum + scores[family] * WEIGHTS[family],
    0
  );

  return Math.round(weighted);
}

/**
 * Returns the breakdown a Decision Card needs to render — every family's
 * raw score AND its weighted contribution, so the UI never has to re-derive
 * "why did this number move" from the total alone.
 */
export function explainConfidence(scores: SignalScores) {
  return (Object.keys(scores) as SignalFamily[]).map((family) => ({
    family,
    score: scores[family],
    weight: WEIGHTS[family],
    contribution: Math.round(scores[family] * WEIGHTS[family]),
  }));
}

/**
 * Derives a directional lean from confidence + scenario skew.
 * Never returns an imperative ("Buy") — see /docs/Decision_Framework.md
 * for why "Recommendation" is deliberately a lean, not an instruction.
 */
export function deriveRecommendation(
  confidence: number,
  bullProbability: number,
  bearProbability: number
): "STRONG_BULLISH" | "LEAN_BULLISH" | "NEUTRAL" | "LEAN_BEARISH" | "STRONG_BEARISH" {
  const skew = bullProbability - bearProbability;
  if (confidence >= 80 && skew >= 25) return "STRONG_BULLISH";
  if (skew >= 10) return "LEAN_BULLISH";
  if (skew <= -25 && confidence >= 80) return "STRONG_BEARISH";
  if (skew <= -10) return "LEAN_BEARISH";
  return "NEUTRAL";
}
