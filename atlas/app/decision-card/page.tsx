/**
 * INTERNAL PREVIEW — TIER 3 / COMPLIANCE-GATED
 * Do not link this route from Nav or share publicly. The Decision Card
 * (confidence score + directional lean on a specific security) resembles
 * a SEBI-regulated "personalised recommendation" — hold until a lawyer
 * signs off on framing or scope. See docs/PRD.md and the Phase 1 roadmap
 * (Tier 3) for the compliance status this page is gated on.
 */
import { Nav } from "@/components/nav";
import { DecisionCard } from "@/components/decision-card";
import { computeConfidence, explainConfidence } from "@/services/confidenceEngine";
import type { DecisionCardData } from "@/lib/types";

// TODO(integration): replace with a real fetch from DecisionCard + SignalScore
// tables for the authenticated user's portfolio (see backend/prisma/schema.prisma).
const NVDA_SIGNALS = {
  macro: 61, technical: 70, fundamental: 79,
  institutional: 88, sentiment: 58, options: 66,
} as const;

export default function DecisionCardPreviewPage() {
  const confidence = computeConfidence(NVDA_SIGNALS);
  const breakdown = explainConfidence(NVDA_SIGNALS);

  const card: DecisionCardData = {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    recommendation: "LEAN_BULLISH",
    confidence,
    bullProbability: 43,
    neutralProbability: 39,
    bearProbability: 18,
    expectedReturn: 0.09,
    expectedDrawdown: -0.04,
    riskLevel: "MEDIUM",
    reasoning: [
      "Institutional 13F filings show net accumulation across the top 20 holders for the second consecutive quarter.",
      "Options flow skews call-heavy into the next earnings date, consistent with positioning, not certainty.",
      "Datacenter capex guidance from hyperscaler customers has trended up in each of the last three earnings calls.",
    ],
    invalidationConditions: [
      "Any hyperscaler cutting FY27 capex guidance below current consensus.",
      "Gross margin guidance falling below 72% at the next print.",
      "A sustained close below the 50-day moving average on rising volume.",
    ],
    sources: ["SEC 13F filings", "CBOE options chain", "Earnings transcripts", "Hyperscaler capex guidance"],
    signalScores: breakdown.map((b) => ({ family: b.family, score: b.score, weight: b.weight })),
  };

  return (
    <main className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-3xl px-10 py-9">
        <div className="mb-6 rounded-lg border border-bear/40 bg-bear/10 p-4">
          <p className="text-xs font-semibold text-bear">
            INTERNAL PREVIEW — not for public launch
          </p>
          <p className="mt-1 text-xs text-text-2 leading-relaxed">
            This feature (Decision Confidence™) is Tier 3 in the Phase 1 roadmap — engineering is done, but it's
            held back pending written compliance sign-off on whether this constitutes a SEBI-regulated
            recommendation. Do not demo this to real users or investors as a live feature until that sign-off exists.
          </p>
        </div>
        <h1 className="font-display text-2xl text-text-1 mb-1">Decision Card (Preview)</h1>
        <p className="text-xs text-text-3 mb-7">
          Confidence computed live from backend/services/confidenceEngine.ts against seeded signal scores.
        </p>
        <DecisionCard data={card} />
      </div>
    </main>
  );
}
