/**
 * GET /api/portfolio-dna
 * Computes Portfolio DNA over the current dev-store positions.
 * TODO(integration): scope to the authenticated user's real portfolio via
 * Supabase session + Prisma once auth is wired — see backend/lib/prisma.ts.
 */
import { NextResponse } from "next/server";
import { getPositions, getFundHoldings } from "@/lib/devStore";
import { computePortfolioDNA } from "@/services/portfolioDNA";

export async function GET() {
  const positions = getPositions().map((p) => ({
    ticker: p.ticker,
    name: p.name,
    assetClass: p.assetClass,
    marketValue: p.quantity * p.price,
    sector: p.sector,
    geography: p.geography,
  }));

  const result = computePortfolioDNA(positions, getFundHoldings());
  return NextResponse.json(result);
}
