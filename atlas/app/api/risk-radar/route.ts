/**
 * GET /api/risk-radar
 * Computes Risk Radar dimensions over current dev-store positions using
 * the real scoring logic in backend/services/riskEngine.ts.
 */
import { NextResponse } from "next/server";
import { getPositions } from "@/lib/devStore";
import { scoreRiskProfile } from "@/services/riskEngine";

export async function GET() {
  const positions = getPositions().map((p) => ({
    ticker: p.ticker,
    marketValue: p.quantity * p.price,
    sector: p.sector,
    currency: p.currency,
    assetClass: p.assetClass,
  }));
  const dimensions = scoreRiskProfile(positions, "USD");
  return NextResponse.json(dimensions);
}
