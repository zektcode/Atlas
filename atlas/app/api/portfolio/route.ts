/**
 * GET /api/portfolio
 * TODO(integration): scope to the authenticated user via Supabase session
 * and read real Portfolio + Position rows via backend/lib/prisma.ts. Right
 * now returns the seeded demo portfolio shape for local development.
 */
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "Primary Portfolio",
    baseCurrency: "USD",
    positions: [
      { ticker: "NVDA", quantity: 220, assetClass: "EQUITY" },
      { ticker: "AAPL", quantity: 180, assetClass: "EQUITY" },
      { ticker: "MSFT", quantity: 90, assetClass: "EQUITY" },
      { ticker: "ETH", quantity: 12, assetClass: "CRYPTO" },
      { ticker: "BND", quantity: 400, assetClass: "ETF" },
    ],
  });
}
