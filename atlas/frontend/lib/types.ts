/**
 * Shared frontend types. Mirrors backend/prisma/schema.prisma shapes where
 * relevant, but kept separate so the frontend doesn't need the Prisma
 * client bundled client-side.
 */

export type SignalFamily = "macro" | "technical" | "fundamental" | "institutional" | "sentiment" | "options";

export interface SignalScore {
  family: SignalFamily;
  score: number;
  weight: number;
}

export type RecommendationLean =
  | "STRONG_BULLISH"
  | "LEAN_BULLISH"
  | "NEUTRAL"
  | "LEAN_BEARISH"
  | "STRONG_BEARISH";

export interface DecisionCardData {
  ticker: string;
  name: string;
  recommendation: RecommendationLean;
  confidence: number;
  bullProbability: number;
  neutralProbability: number;
  bearProbability: number;
  expectedReturn: number;
  expectedDrawdown: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  reasoning: string[];
  invalidationConditions: string[];
  sources: string[];
  signalScores: SignalScore[];
}

export type AssetClass = "EQUITY" | "ETF" | "MUTUAL_FUND" | "CRYPTO" | "REAL_ESTATE" | "PRIVATE_EQUITY" | "COMMODITY" | "CASH";
