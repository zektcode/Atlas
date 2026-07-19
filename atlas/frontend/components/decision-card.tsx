/**
 * The Decision Card — the fixed unit Atlas reasons in everywhere.
 * See /docs/Decision_Framework.md for the required-fields spec this
 * component is a direct rendering of. Every field there must be present
 * here; do not add a "compact" variant that drops reasoning or
 * invalidation conditions — see /docs/Product_Philosophy.md.
 */
import type { DecisionCardData } from "@/lib/types";
import { Card } from "@/components/ui/card";

const LEAN_LABEL: Record<DecisionCardData["recommendation"], string> = {
  STRONG_BULLISH: "Strong Bullish",
  LEAN_BULLISH: "Lean Bullish",
  NEUTRAL: "Neutral",
  LEAN_BEARISH: "Lean Bearish",
  STRONG_BEARISH: "Strong Bearish",
};

export function DecisionCard({ data }: { data: DecisionCardData }) {
  return (
    <Card className="max-w-2xl space-y-6 p-0 overflow-hidden">
      <div className="flex items-center justify-between border-b border-border p-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-bull">
            {LEAN_LABEL[data.recommendation]}
          </div>
          <h2 className="font-display text-2xl text-text-1 mt-1">
            {data.ticker} at {data.confidence}% confidence
          </h2>
          <p className="text-xs text-text-3 mt-1">{data.name}</p>
        </div>
      </div>

      <div className="px-6">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-text-3 mb-3">
          Scenario Distribution
        </h4>
        <div className="flex h-2.5 rounded-md overflow-hidden mb-3">
          <div style={{ width: `${data.bullProbability}%` }} className="bg-bull" />
          <div style={{ width: `${data.neutralProbability}%` }} className="bg-neutral" />
          <div style={{ width: `${data.bearProbability}%` }} className="bg-bear" />
        </div>
        <div className="flex justify-between text-xs text-text-2 pb-6">
          <span>Bull {data.bullProbability}%</span>
          <span>Neutral {data.neutralProbability}%</span>
          <span>Bear {data.bearProbability}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-border">
        <div className="p-6 border-r border-border space-y-2 text-sm">
          <div className="flex justify-between text-text-2">
            <span>Expected return</span>
            <b className="font-mono text-bull">{(data.expectedReturn * 100).toFixed(1)}%</b>
          </div>
          <div className="flex justify-between text-text-2">
            <span>Expected drawdown</span>
            <b className="font-mono text-bear">{(data.expectedDrawdown * 100).toFixed(1)}%</b>
          </div>
          <div className="flex justify-between text-text-2">
            <span>Risk level</span>
            <b className="font-mono text-text-1">{data.riskLevel}</b>
          </div>
        </div>
        <div className="p-6 space-y-1.5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-text-3 mb-2">Sources</h4>
          <div className="flex flex-wrap gap-2">
            {data.sources.map((s) => (
              <span key={s} className="text-[11px] text-text-3 bg-bg-surface border border-border rounded-full px-2.5 py-1">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-border">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-text-3 mb-3">Reasoning</h4>
        <ul className="space-y-2">
          {data.reasoning.map((r) => (
            <li key={r} className="text-sm text-text-2 leading-relaxed flex gap-2">
              <span className="text-indigo shrink-0">—</span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 border-t border-border">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-text-3 mb-3">
          What Would Invalidate This
        </h4>
        <ul className="space-y-2">
          {data.invalidationConditions.map((c) => (
            <li key={c} className="text-sm text-text-2 leading-relaxed flex gap-2">
              <span className="text-bear shrink-0">⚠</span>
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 border-t border-border pb-6">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-text-3 mb-3">
          Confidence Breakdown
        </h4>
        <div className="space-y-3">
          {data.signalScores.map((s) => (
            <div key={s.family}>
              <div className="flex justify-between text-xs text-text-2 mb-1 capitalize">
                <span>{s.family}</span>
                <b className="font-mono text-text-1">{s.score}%</b>
              </div>
              <div className="h-1.5 rounded bg-bg-surface overflow-hidden">
                <div className="h-full bg-indigo rounded" style={{ width: `${s.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
