/**
 * GET /api/sleep-score
 * Computes Sleep Score from real Risk Radar output using
 * backend/services/sleepScore.ts. Event density and unresolved flags are
 * fixture data pending a macro calendar integration — see
 * docs/Technical_Architecture.md ADR-005.
 */
import { NextResponse } from "next/server";
import { getPositions } from "@/lib/devStore";
import { scoreRiskProfile } from "@/services/riskEngine";
import { computeSleepScore } from "@/services/sleepScore";

export async function GET() {
  const positions = getPositions().map((p) => ({
    ticker: p.ticker,
    marketValue: p.quantity * p.price,
    sector: p.sector,
    currency: p.currency,
    assetClass: p.assetClass,
  }));
  const riskDimensions = scoreRiskProfile(positions, "USD");

  // TODO(integration): confidenceTrend and upcomingHighImpactEvents need a
  // real market data / macro calendar source. Reasonable fixture defaults
  // used here so the score is genuinely computed, not hardcoded.
  const result = computeSleepScore({
    riskDimensions,
    confidenceTrend: 3,
    upcomingHighImpactEvents: 2,
    unresolvedFlags: riskDimensions.filter((d) => d.severity > 60).length,
  });

  return NextResponse.json(result);
}
