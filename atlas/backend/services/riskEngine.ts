/**
 * Risk Engine™ — v0
 * See /docs/Risk_Engine.md for the specification. Every dimension returns a
 * severity score AND a specific, named explanation — a bar with no sentence
 * violates /docs/Product_Philosophy.md ("no black box").
 */

export interface PositionInput {
  ticker: string;
  marketValue: number;
  sector: string;
  currency: string;
  assetClass: string;
}

export interface RiskDimension {
  label: string;
  severity: number; // 0-100
  explanation: string;
}

const CONCENTRATION_WARN_THRESHOLD = 0.2; // single position > 20% of book

export function scoreConcentration(positions: PositionInput[]): RiskDimension {
  const total = positions.reduce((sum, p) => sum + p.marketValue, 0);
  if (total === 0) {
    return { label: "Concentration", severity: 0, explanation: "No positions to evaluate." };
  }
  const largest = [...positions].sort((a, b) => b.marketValue - a.marketValue)[0];
        if (!largest) {
    return { label: "Concentration", severity: 0, explanation: "No positions found" };
  }
  const pct = largest.marketValue / total;
  const severity = Math.min(100, Math.round((pct / CONCENTRATION_WARN_THRESHOLD) * 60));
  return {
    label: "Concentration",
    severity,
    explanation:
      pct > CONCENTRATION_WARN_THRESHOLD
        ? `Single position (${largest.ticker}) is ${Math.round(pct * 100)}% of book.`
        : `Largest position (${largest.ticker}) is ${Math.round(pct * 100)}% of book — within target range.`,
  };
}

export function scoreCurrencyExposure(positions: PositionInput[], baseCurrency = "USD"): RiskDimension {
  const total = positions.reduce((sum, p) => sum + p.marketValue, 0);
  const foreign = positions
    .filter((p) => p.currency !== baseCurrency)
    .reduce((sum, p) => sum + p.marketValue, 0);
  const pct = total === 0 ? 0 : foreign / total;
  return {
    label: "Currency exposure",
    severity: Math.round(pct * 100),
    explanation: `${Math.round(pct * 100)}% of the portfolio is held outside ${baseCurrency}.`,
  };
}

export function scoreSectorTilt(positions: PositionInput[], benchmarkMaxSectorPct = 0.3): RiskDimension {
  const total = positions.reduce((sum, p) => sum + p.marketValue, 0);
  const bySector = new Map<string, number>();
  for (const p of positions) {
    bySector.set(p.sector, (bySector.get(p.sector) ?? 0) + p.marketValue);
  }
  let topSector = "—";
  let topPct = 0;
  for (const [sector, value] of bySector) {
    const pct = total === 0 ? 0 : value / total;
    if (pct > topPct) {
      topPct = pct;
      topSector = sector;
    }
  }
  const severity = Math.min(100, Math.round((topPct / benchmarkMaxSectorPct) * 60));
  return {
    label: "Sector tilt",
    severity,
    explanation: `${topSector} is ${Math.round(topPct * 100)}% of the portfolio vs. a ${Math.round(
      benchmarkMaxSectorPct * 100
    )}% benchmark ceiling.`,
  };
}

// TODO(integration): liquidity scoring needs real average-daily-volume data
// (Polygon or equivalent). Returns a conservative placeholder severity today.
export function scoreLiquidity(positions: PositionInput[]): RiskDimension {
  const illiquidClasses = new Set(["PRIVATE_EQUITY", "REAL_ESTATE"]);
  const total = positions.reduce((sum, p) => sum + p.marketValue, 0);
  const illiquid = positions
    .filter((p) => illiquidClasses.has(p.assetClass))
    .reduce((sum, p) => sum + p.marketValue, 0);
  const pct = total === 0 ? 0 : illiquid / total;
  return {
    label: "Liquidity",
    severity: Math.round(pct * 100),
    explanation:
      pct > 0
        ? `${Math.round(pct * 100)}% of the portfolio is in asset classes that are slow or costly to exit at size.`
        : "No meaningfully illiquid positions detected.",
  };
}

export function scoreRiskProfile(positions: PositionInput[], baseCurrency = "USD"): RiskDimension[] {
  return [
    scoreConcentration(positions),
    scoreCurrencyExposure(positions, baseCurrency),
    scoreSectorTilt(positions),
    scoreLiquidity(positions),
  ];
}
