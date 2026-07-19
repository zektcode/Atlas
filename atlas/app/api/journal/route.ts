/**
 * GET  /api/journal   — list decision journal entries, most recent first
 * POST /api/journal   — add a manual journal entry
 * TODO(integration): backed by frontend/lib/devStore.ts until Supabase +
 * Prisma are configured — see backend/prisma/schema.prisma JournalEntry model.
 */
import { NextRequest, NextResponse } from "next/server";
import { getJournalEntries, addJournalEntry } from "@/lib/devStore";
import { z } from "zod";

const JournalInput = z.object({
  ticker: z.string().min(1).max(12),
  action: z.enum(["BUY", "SELL", "HOLD"]),
  reason: z.string().min(1).max(500),
  emotion: z.enum(["CONFIDENT", "ANXIOUS", "FOMO", "REVENGE", "NEUTRAL", "DISCIPLINED"]),
  confidenceAtEntry: z.number().min(0).max(100),
});

export async function GET() {
  return NextResponse.json(getJournalEntries());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = JournalInput.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid journal entry", details: parsed.error.flatten() }, { status: 400 });
  }
  const entry = addJournalEntry(parsed.data);
  return NextResponse.json(entry, { status: 201 });
}
