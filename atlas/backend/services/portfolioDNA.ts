/**
 * Portfolio DNA™ — v0 implementation
 * Full spec: /docs/Portfolio_DNA.md. This file must not drift from that
 * doc — if the formula changes here, update the spec too.
 *
 * Explicit non-goal, enforced by this file's return shape: nothing here
 * returns a directive ("rebalance," "reduce," "sell"). Every output is a
 * fact about current composition, never an instruction. See
 * docs/Product_Philosophy.md and docs/Portfolio_DNA.md "Explicit non-goal".
 */

export interface DNAPosition {
  ticker: string;
  name: string;
  assetClass: string;
  marketValue: number;
  sector: string;
  geography: string;
}

export interface DNAFundHolding {
  fundTicker: string;
  underlyingHoldings: { ticker: string; name: string; weightPct: number }[];
}

export interface TrueExposure {
  ticker: string;
  name: string;
  totalValue: number;
  pctOfPortfolio: number;
  contributingVehicles: { vehicle: string; value: number }[];
}

export interface FundOverlap {
  fundA: string;
  fundB: string;
  overlapPct: number;
  sharedHoldings: { ticker: string; name: string }[];
}

export interface PortfolioDNAResult {
  totalValue: number;
  assetClassMix: { assetClass: string; pct: number }[];
  sectorMix: { sector: string; pct: number }[];
  geographyMix: { geography: string; pct: number }[];
  topExposures: TrueExposure[];
  fundOverlaps: FundOverlap[];
  summary: string;
}

const OVERLAP_FLAG_THRESHOLD = 0.6; // 60%, per docs/Portfolio_DNA.md
const FUND_ASSET_CLASSES = new Set(["MUTUAL_FUND", "ETF"]);

function findFund(fundHoldings: DNAFundHolding[], ticker: string) {
  return fundHoldings.find((f) => f.fundTicker === ticker);
}

/** Asset class / sector / geography composition mix — direct holdings only for sector/geography for v0 look-through simplicity on non-fund positions. */
function computeCompositionMix(positions: DNAPosition[], totalValue: number) {
  const byField = (field: "assetClass" | "sector" | "geography") => {
    const totals = new Map<string, number>();
    for (const p of positions) {
      totals.set(p[field], (totals.get(p[field]) ?? 0) + p.marketValue);
    }
    return Array.from(totals.entries())
      .map(([key, value]) => ({ [field === "assetClass" ? "assetClass" : field]: key, pct: totalValue === 0 ? 0 : Math.round((value / totalValue) * 1000) / 10 }))
      .sort((a: any, b: any) => b.pct - a.pct);
  };
  return {
    assetClassMix: byField("assetClass") as { assetClass: string; pct: number }[],
    sectorMix: byField("sector") as unknown as { sector: string; pct: number }[],
    geographyMix: byField("geography") as unknown as { geography: string; pct: number }[],
  };
}

/**
 * trueExposure(security) = directHoldingValue(security)
 *   + Σ over each fund F the user holds: fundMarketValue(F) × underlyingWeight(F, security)
 * See docs/Portfolio_DNA.md "Core formulas".
 */
function computeTrueExposures(positions: DNAPosition[], fundHoldings: DNAFundHolding[], totalValue: number): TrueExposure[] {
  const exposureMap = new Map<string, { name: string; total: number; vehicles: { vehicle: string; value: number }[] }>();

  const bump = (ticker: string, name: string, value: number, vehicle: string) => {
    const existing = exposureMap.get(ticker);
    if (existing) {
      existing.total += value;
      existing.vehicles.push({ vehicle, value });
    } else {
      exposureMap.set(ticker, { name, total: value, vehicles: [{ vehicle, value }] });
    }
  };

  for (const p of positions) {
    if (FUND_ASSET_CLASSES.has(p.assetClass)) {
      const fund = findFund(fundHoldings, p.ticker);
      if (fund) {
        for (const holding of fund.underlyingHoldings) {
          const contributedValue = p.marketValue * (holding.weightPct / 100);
          bump(holding.ticker, holding.name, contributedValue, p.ticker);
        }
      }
    } else {
      bump(p.ticker, p.name, p.marketValue, "Direct holding");
    }
  }

  return Array.from(exposureMap.entries())
    .map(([ticker, v]) => ({
      ticker,
      name: v.name,
      totalValue: Math.round(v.total),
      pctOfPortfolio: totalValue === 0 ? 0 : Math.round((v.total / totalValue) * 1000) / 10,
      contributingVehicles: v.vehicles.map((x) => ({ vehicle: x.vehicle, value: Math.round(x.value) })),
    }))
    .sort((a, b) => b.totalValue - a.totalValue);
}

/**
 * overlap(A, B) = Σ over securities held by both: min(weightA(s), weightB(s))
 * See docs/Portfolio_DNA.md "Core formulas".
 */
function computeFundOverlaps(positions: DNAPosition[], fundHoldings: DNAFundHolding[]): FundOverlap[] {
  const heldFundTickers = positions.filter((p) => FUND_ASSET_CLASSES.has(p.assetClass)).map((p) => p.ticker);
  const overlaps: FundOverlap[] = [];

  for (let i = 0; i < heldFundTickers.length; i++) {
    for (let j = i + 1; j < heldFundTickers.length; j++) {
      const fundA = findFund(fundHoldings, heldFundTickers[i]);
      const fundB = findFund(fundHoldings, heldFundTickers[j]);
      if (!fundA || !fundB) continue;

      const weightsA = new Map(fundA.underlyingHoldings.map((h) => [h.ticker, h.weightPct]));
      const shared: { ticker: string; name: string }[] = [];
      let overlapSum = 0;

      for (const holdingB of fundB.underlyingHoldings) {
        const weightA = weightsA.get(holdingB.ticker);
        if (weightA !== undefined) {
          overlapSum += Math.min(weightA, holdingB.weightPct);
          shared.push({ ticker: holdingB.ticker, name: holdingB.name });
        }
      }

      if (shared.length > 0) {
        overlaps.push({
          fundA: fundA.fundTicker,
          fundB: fundB.fundTicker,
          overlapPct: Math.round(overlapSum * 10) / 10,
          sharedHoldings: shared,
        });
      }
    }
  }

  return overlaps.sort((a, b) => b.overlapPct - a.overlapPct);
}

export function computePortfolioDNA(positions: DNAPosition[], fundHoldings: DNAFundHolding[]): PortfolioDNAResult {
  const totalValue = positions.reduce((sum, p) => sum + p.marketValue, 0);
  const { assetClassMix, sectorMix, geographyMix } = computeCompositionMix(positions, totalValue);
  const topExposures = computeTrueExposures(positions, fundHoldings, totalValue).slice(0, 5);
  const fundOverlaps = computeFundOverlaps(positions, fundHoldings);

  const fundCount = positions.filter((p) => FUND_ASSET_CLASSES.has(p.assetClass)).length;
  const top = topExposures[0];
  const summary = top
    ? `${fundCount} of ${positions.length} holdings are funds; look-through shows your real top exposure is ${top.pctOfPortfolio}% ${top.name}${
        top.contributingVehicles.length > 1 ? `, spread across ${top.contributingVehicles.length} vehicles` : ""
      }.`
    : "No positions to analyze yet.";

  return { totalValue, assetClassMix, sectorMix, geographyMix, topExposures, fundOverlaps, summary };
}
