/**
 * Dashboard — Tier 1. Sleep Score and Risk Radar are now genuinely
 * computed (see /api/sleep-score, /api/risk-radar) against the user's
 * real positions, not hardcoded. Macro Calendar and Watchlist remain
 * fixture data pending a market/macro data integration — see
 * docs/Technical_Architecture.md ADR-005.
 */
"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/nav";
import { Card, CardTitle } from "@/components/ui/card";
import { SleepScoreRing } from "@/components/sleep-score-ring";

interface RiskDimension { label: string; severity: number; explanation: string; }
interface SleepScoreResult { score: number; label: string; signals: { tone: string; text: string }[]; }
interface Position { ticker: string; quantity: number; price: number; }

// TODO(integration): macro calendar and watchlist need a real market data
// / calendar provider — see docs/Technical_Architecture.md ADR-005.
const FIXTURE = {
  events: [
    { date: "JUL 25", title: "CPI (June)", detail: "Consensus 3.1% YoY", impact: "High" },
    { date: "JUL 29", title: "FOMC Minutes", detail: "2:00 PM ET", impact: "Medium" },
  ],
  watchlist: [
    { ticker: "TSLA", price: "$298.77", change: "-2.3%", positive: false },
    { ticker: "GOOGL", price: "$186.20", change: "+0.9%", positive: true },
  ],
};

export default function DashboardPage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [risk, setRisk] = useState<RiskDimension[]>([]);
  const [sleep, setSleep] = useState<SleepScoreResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [posRes, riskRes, sleepRes] = await Promise.all([
        fetch("/api/positions"), fetch("/api/risk-radar"), fetch("/api/sleep-score"),
      ]);
      setPositions(await posRes.json());
      setRisk(await riskRes.json());
      setSleep(await sleepRes.json());
      setLoading(false);
    }
    load();
  }, []);

  const totalValue = positions.reduce((sum, p) => sum + p.quantity * p.price, 0);

  return (
    <main className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-7xl px-10 py-9">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <h1 className="font-display text-2xl text-text-1">Dashboard</h1>
            <p className="mt-1 text-xs text-text-3">
              Sleep Score and Risk Radar computed live from your positions · Macro Calendar and Watchlist are fixture data (Tier 3+ integration)
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-text-3">Loading…</p>
        ) : (
          <div className="grid grid-cols-12 gap-4">
            <Card className="col-span-12 md:col-span-4">
              <CardTitle>Sleep Score</CardTitle>
              {sleep && (
                <>
                  <div className="mt-4 flex items-center gap-5">
                    <SleepScoreRing score={sleep.score} segments={[{ value: sleep.score, color: "#4ade9a" }]} />
                    <div>
                      <div className="font-display text-4xl text-text-1">{sleep.score}</div>
                      <div className="mt-1 text-xs font-semibold text-bull">{sleep.label}</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {sleep.signals.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-text-2">
                        <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${s.tone === "positive" ? "bg-bull" : s.tone === "negative" ? "bg-bear" : "bg-neutral"}`} />
                        {s.text}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Card>

            <Card className="col-span-12 md:col-span-5">
              <CardTitle>Portfolio</CardTitle>
              <div className="mt-3 font-mono text-3xl font-semibold text-text-1">
                ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="mt-1 text-xs text-text-3">{positions.length} holdings — see Portfolio for full breakdown and Portfolio DNA</div>
            </Card>

            <Card className="col-span-12 md:col-span-3">
              <CardTitle>Risk Radar</CardTitle>
              <div className="mt-4 space-y-3">
                {risk.map((d) => (
                  <div key={d.label}>
                    <div className="text-[11px] text-text-2">{d.label}</div>
                    <div className="mt-1 h-1.5 rounded bg-bg-surface">
                      <div className="h-full rounded" style={{ width: `${d.severity}%`, backgroundColor: d.severity > 60 ? "#f0665a" : d.severity > 35 ? "#e8b04b" : "#4ade9a" }} />
                    </div>
                    <div className="mt-1 text-[10px] text-text-3">{d.explanation}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="col-span-12 md:col-span-5">
              <CardTitle>Macro Calendar <span className="text-[10px] text-text-3 font-normal">(fixture)</span></CardTitle>
              <div className="mt-2 divide-y divide-border">
                {FIXTURE.events.map((e) => (
                  <div key={e.title} className="flex gap-4 py-3">
                    <div className="w-14 shrink-0 font-mono text-[11px] text-text-3">{e.date}</div>
                    <div className="flex-1">
                      <div className="text-[13px] font-medium text-text-1">{e.title}</div>
                      <div className="text-[11px] text-text-3">{e.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="col-span-12 md:col-span-3">
              <CardTitle>Watchlist <span className="text-[10px] text-text-3 font-normal">(fixture)</span></CardTitle>
              <div className="mt-2 divide-y divide-border">
                {FIXTURE.watchlist.map((w) => (
                  <div key={w.ticker} className="flex items-center justify-between py-2.5">
                    <span className="text-[13px] font-semibold text-text-1">{w.ticker}</span>
                    <div className="text-right">
                      <div className="font-mono text-xs">{w.price}</div>
                      <div className={`text-[11px] ${w.positive ? "text-bull" : "text-bear"}`}>{w.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
