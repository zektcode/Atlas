/**
 * Sleep Score™ — v0
 * See /docs/Sleep_Score.md. Always meant to be rendered with its
 * contributing signals — never as a bare number.
 */
import type { RiskDimension } from "./riskEngine";

export interface SleepScoreInputs {
  riskDimensions: RiskDimension[];
  confidenceTrend: number; // e.g. +3 means average confidence rose 3pts this week
  upcomingHighImpactEvents: number; // count in next 7 days
  unresolvedFlags: number; // e.g. concentration warnings not yet acknowledged
}

export interface SleepScoreResult {
  score: number; // 0-100, higher = calmer
  label: string;
  signals: { tone: "positive" | "neutral" | "negative"; text: string }[];
}

export function computeSleepScore(inputs: SleepScoreInputs): SleepScoreResult {
  const avgRiskSeverity =
    inputs.riskDimensions.reduce((sum, d) => sum + d.severity, 0) /
    Math.max(1, inputs.riskDimensions.length);

  let score = 100;
  score -= avgRiskSeverity * 0.4;
  score -= inputs.upcomingHighImpactEvents * 4;
  score -= inputs.unresolvedFlags * 6;
  score += inputs.confidenceTrend * 1.5;
  score = Math.max(0, Math.min(100, Math.round(score)));

  const label = score >= 75 ? "Sleeping well" : score >= 50 ? "A few things worth a look" : "Worth your attention tonight";

  const signals: SleepScoreResult["signals"] = [];
  if (inputs.confidenceTrend > 0) {
    signals.push({ tone: "positive", text: `Average confidence across holdings rose ${inputs.confidenceTrend}pt this week.` });
  } else if (inputs.confidenceTrend < 0) {
    signals.push({ tone: "negative", text: `Average confidence across holdings fell ${Math.abs(inputs.confidenceTrend)}pt this week.` });
  }
  if (inputs.upcomingHighImpactEvents > 0) {
    signals.push({
      tone: "neutral",
      text: `${inputs.upcomingHighImpactEvents} high-impact event${inputs.upcomingHighImpactEvents > 1 ? "s" : ""} in the next 7 days.`,
    });
  }
  const worstDimension = [...inputs.riskDimensions].sort((a, b) => b.severity - a.severity)[0];
  if (worstDimension && worstDimension.severity > 50) {
    signals.push({ tone: "negative", text: worstDimension.explanation });
  }

  return { score, label, signals };
}
