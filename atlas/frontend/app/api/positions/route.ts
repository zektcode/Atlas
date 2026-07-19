/**
 * GET  /api/positions        — list current holdings
 * POST /api/positions        — add a manually-entered holding
 * TODO(integration): backed by an in-memory dev store (frontend/lib/devStore.ts)
 * until Supabase + Prisma are configured. See that file's header comment.
 */
import { NextRequest, NextResponse } from "next/server";
import { getPositions, addPosition } from "@/lib/devStore";
import { z } from "zod";

const PositionInput = z.object({
  ticker: z.string().min(1).max(12),
  name: z.string().min(1).max(120),
  assetClass: z.enum(["EQUITY", "ETF", "MUTUAL_FUND", "CRYPTO", "REAL_ESTATE", "PRIVATE_EQUITY", "COMMODITY", "CASH"]),
  quantity: z.number().positive(),
  price: z.number().positive(),
  costBasis: z.number().positive(),
  currency: z.string().default("USD"),
  sector: z.string().default("Unclassified"),
  geography: z.string().default("Unclassified"),
});

export async function GET() {
  return NextResponse.json(getPositions());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = PositionInput.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid position", details: parsed.error.flatten() }, { status: 400 });
  }
  const position = addPosition(parsed.data);
  return NextResponse.json(position, { status: 201 });
}
