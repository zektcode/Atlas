/**
 * Dev/demo in-memory data store.
 *
 * TODO(integration): replace every function here with a real Prisma +
 * Supabase read/write once DATABASE_URL is configured — see
 * backend/lib/prisma.ts and backend/prisma/schema.prisma, which already
 * define the real shape this data belongs in.
 *
 * Why this exists: Tier 1 needs to be demoable and testable *today*,
 * before Supabase is provisioned. Every API route that touches this file
 * is marked, so swapping in real persistence later means changing this
 * file's internals only — routes and the frontend don't need to change.
 * Data resets whenever the dev server restarts. Do not use in production.
 */
import type { AssetClass } from "./types";

export interface DevPosition {
  id: string;
  ticker: string;
  name: string;
  assetClass: AssetClass;
  quantity: number;
  price: number; // current price per unit — fixture data, see TODO below
  costBasis: number;
  currency: string;
  sector: string;
  geography: string;
}

export interface DevFundHolding {
  fundTicker: string;
  underlyingHoldings: { ticker: string; name: string; weightPct: number }[];
}

export interface DevJournalEntry {
  id: string;
  ticker: string;
  action: "BUY" | "SELL" | "HOLD";
  reason: string;
  emotion: "CONFIDENT" | "ANXIOUS" | "FOMO" | "REVENGE" | "NEUTRAL" | "DISCIPLINED";
  confidenceAtEntry: number;
  outcome?: string;
  lesson?: string;
  createdAt: string;
}

// TODO(integration): prices are fixture data. Replace with a real market
// data provider read — see docs/Technical_Architecture.md ADR-005.
let positions: DevPosition[] = [
  { id: "p1", ticker: "NVDA", name: "NVIDIA Corporation", assetClass: "EQUITY", quantity: 220, price: 620.0, costBasis: 612.5, currency: "USD", sector: "Technology", geography: "US" },
  { id: "p2", ticker: "AAPL", name: "Apple Inc.", assetClass: "EQUITY", quantity: 180, price: 211.42, costBasis: 189.2, currency: "USD", sector: "Technology", geography: "US" },
  { id: "p3", ticker: "MSFT", name: "Microsoft Corporation", assetClass: "EQUITY", quantity: 90, price: 468.05, costBasis: 402.1, currency: "USD", sector: "Technology", geography: "US" },
  { id: "p4", ticker: "ETH", name: "Ethereum", assetClass: "CRYPTO", quantity: 12, price: 3842, costBasis: 3120, currency: "USD", sector: "Crypto", geography: "Global" },
  { id: "p5", ticker: "BND", name: "Vanguard Total Bond Market ETF", assetClass: "ETF", quantity: 400, price: 71.8, costBasis: 71.8, currency: "USD", sector: "Fixed Income", geography: "US" },
  { id: "p6", ticker: "TECHFUND", name: "Sample Technology Growth Fund", assetClass: "MUTUAL_FUND", quantity: 100, price: 50.0, costBasis: 47.0, currency: "USD", sector: "Diversified", geography: "US" },
  { id: "p7", ticker: "GLOBALFUND", name: "Sample Global Growth Fund", assetClass: "MUTUAL_FUND", quantity: 50, price: 80.0, costBasis: 75.0, currency: "USD", sector: "Diversified", geography: "Global" },
];

// TODO(integration): fund look-through data requires a real fund
// factsheet / portfolio disclosure provider (e.g. AMFI-based, in India) —
// see docs/Portfolio_DNA.md "Data dependency".
const fundHoldings: DevFundHolding[] = [
  {
    fundTicker: "TECHFUND",
    underlyingHoldings: [
      { ticker: "NVDA", name: "NVIDIA Corporation", weightPct: 8.2 },
      { ticker: "AAPL", name: "Apple Inc.", weightPct: 7.1 },
      { ticker: "MSFT", name: "Microsoft Corporation", weightPct: 6.4 },
      { ticker: "GOOGL", name: "Alphabet Inc.", weightPct: 5.0 },
    ],
  },
  {
    fundTicker: "GLOBALFUND",
    underlyingHoldings: [
      { ticker: "NVDA", name: "NVIDIA Corporation", weightPct: 5.3 },
      { ticker: "AAPL", name: "Apple Inc.", weightPct: 9.1 },
      { ticker: "TSLA", name: "Tesla Inc.", weightPct: 4.4 },
      { ticker: "MSFT", name: "Microsoft Corporation", weightPct: 3.8 },
    ],
  },
];

let journalEntries: DevJournalEntry[] = [
  {
    id: "j1",
    ticker: "NVDA",
    action: "BUY",
    reason: "Increased datacenter capex guidance from two hyperscalers",
    emotion: "CONFIDENT",
    confidenceAtEntry: 74,
    createdAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
  },
];

export function getPositions(): DevPosition[] {
  return positions;
}

export function addPosition(input: Omit<DevPosition, "id">): DevPosition {
  const position: DevPosition = { ...input, id: `p${positions.length + 1}_${Date.now()}` };
  positions = [...positions, position];
  return position;
}

export function deletePosition(id: string): boolean {
  const before = positions.length;
  positions = positions.filter((p) => p.id !== id);
  return positions.length < before;
}

export function getFundHoldings(): DevFundHolding[] {
  return fundHoldings;
}

export function getJournalEntries(): DevJournalEntry[] {
  return [...journalEntries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addJournalEntry(input: Omit<DevJournalEntry, "id" | "createdAt">): DevJournalEntry {
  const entry: DevJournalEntry = { ...input, id: `j${journalEntries.length + 1}_${Date.now()}`, createdAt: new Date().toISOString() };
  journalEntries = [...journalEntries, entry];
  return entry;
}
