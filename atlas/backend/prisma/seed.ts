/**
 * ATLAS — Database Seed
 * Populates a demo user's portfolio with realistic, clearly-synthetic data
 * so the full reasoning pipeline (confidence -> risk -> sleep score ->
 * decision card) can be exercised end to end before any real market data
 * integration exists. See /docs/Technical_Architecture.md ADR-005.
 *
 * Run with: npm run db:seed
 */
import { PrismaClient, AssetClass, RecommendationLean, RiskLevel, SignalFamily, JournalEmotion } from "@prisma/client";
import { computeConfidence } from "../services/confidenceEngine";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@atlas-app.example" },
    update: {},
    create: {
      email: "demo@atlas-app.example",
      displayName: "Demo Investor",
    },
  });

  const portfolio = await prisma.portfolio.create({
    data: {
      userId: user.id,
      name: "Primary Portfolio",
      baseCurrency: "USD",
    },
  });

  await prisma.position.createMany({
    data: [
      { portfolioId: portfolio.id, ticker: "NVDA", name: "NVIDIA Corporation", assetClass: AssetClass.EQUITY, quantity: 220, costBasis: 612.5 },
      { portfolioId: portfolio.id, ticker: "AAPL", name: "Apple Inc.", assetClass: AssetClass.EQUITY, quantity: 180, costBasis: 189.2 },
      { portfolioId: portfolio.id, ticker: "MSFT", name: "Microsoft Corporation", assetClass: AssetClass.EQUITY, quantity: 90, costBasis: 402.1 },
      { portfolioId: portfolio.id, ticker: "ETH", name: "Ethereum", assetClass: AssetClass.CRYPTO, quantity: 12, costBasis: 3120 },
      { portfolioId: portfolio.id, ticker: "BND", name: "Vanguard Total Bond Market ETF", assetClass: AssetClass.ETF, quantity: 400, costBasis: 71.8 },
    ],
  });

  const nvdaSignals = {
    macro: 61, technical: 70, fundamental: 79,
    institutional: 88, sentiment: 58, options: 66,
  };
  const nvdaConfidence = computeConfidence(nvdaSignals);

  const decisionCard = await prisma.decisionCard.create({
    data: {
      portfolioId: portfolio.id,
      ticker: "NVDA",
      recommendation: RecommendationLean.LEAN_BULLISH,
      confidence: nvdaConfidence,
      bullProbability: 43,
      neutralProbability: 39,
      bearProbability: 18,
      expectedReturn: 0.09,
      expectedDrawdown: -0.04,
      riskLevel: RiskLevel.MEDIUM,
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
      signalScores: {
        create: (Object.keys(nvdaSignals) as (keyof typeof nvdaSignals)[]).map((key) => ({
          family: key.toUpperCase() as SignalFamily,
          score: nvdaSignals[key],
          weight: WEIGHTS[key],
        })),
      },
    },
  });

  await prisma.journalEntry.create({
    data: {
      portfolioId: portfolio.id,
      ticker: "NVDA",
      action: "BUY",
      reason: "Increased datacenter capex guidance from two hyperscalers",
      emotion: JournalEmotion.CONFIDENT,
      confidenceAtEntry: 74,
    },
  });

  await prisma.sleepScoreSnapshot.create({
    data: {
      portfolioId: portfolio.id,
      score: 82,
      riskSeverity: 41,
      confidenceTrend: 3,
      eventDensity: 2,
      unresolvedFlags: 1,
    },
  });

  console.log(`Seeded demo user ${user.email}, portfolio ${portfolio.id}, decision card ${decisionCard.id}`);
}

// Duplicated here (not imported) to keep seed.ts runnable standalone; source
// of truth for weights is backend/services/confidenceEngine.ts — see
// /docs/Frameworks.md for why these two must never drift.
const WEIGHTS = {
  macro: 0.15, technical: 0.2, fundamental: 0.25,
  institutional: 0.2, sentiment: 0.1, options: 0.1,
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
