/**
 * GET /api/decision-card?ticker=NVDA
 * Returns a computed DecisionCard for the given ticker using seeded signal
 * data. TODO(integration): once real market/13F/options data is wired
 * (see backend/services/*), this route should read the latest signal
 * inputs from the database/provider instead of the SEED_SIGNALS constant.
 */
import { NextRequest, NextResponse } from "next/server";
import { computeConfidence, explainConfidence, deriveRecommendation } from "@/services/confidenceEngine";

const SEED_SIGNALS: Record<string, Record<string, number>> = {
  NVDA: { macro: 61, technical: 70, fundamental: 79, institutional: 88, sentiment: 58, options: 66 },
  AAPL: { macro: 58, technical: 55, fundamental: 71, institutional: 64, sentiment: 52, options: 49 },
};

export async function GET(req: NextRequest) {
  const ticker = req.nextUrl.searchParams.get("ticker")?.toUpperCase();
  if (!ticker || !SEED_SIGNALS[ticker]) {
    return NextResponse.json(
      { error: `No seeded signal data for ticker "${ticker}". Seeded tickers: ${Object.keys(SEED_SIGNALS).join(", ")}` },
      { status: 404 }
    );
  }

  const signals = SEED_SIGNALS[ticker] as Parameters<typeof computeConfidence>[0];
  const confidence = computeConfidence(signals);
  const breakdown = explainConfidence(signals);
  const recommendation = deriveRecommendation(confidence, 43, 18);

  return NextResponse.json({ ticker, confidence, recommendation, signalBreakdown: breakdown });
}
