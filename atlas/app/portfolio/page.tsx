/**
 * Portfolio — Tier 1. Shows the user's own holdings and live Portfolio DNA
 * (composition, true look-through exposure, fund overlap). Descriptive
 * only — no recommendation, no compliance exposure. See docs/Portfolio_DNA.md.
 * The Decision Card (Tier 3, compliance-gated) lives at /decision-card,
 * unlisted — do not merge that content back into this page.
 */
"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/nav";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Position {
  id: string;
  ticker: string;
  name: string;
  assetClass: string;
  quantity: number;
  price: number;
  costBasis: number;
  currency: string;
  sector: string;
  geography: string;
}

interface DNAResult {
  totalValue: number;
  assetClassMix: { assetClass: string; pct: number }[];
  sectorMix: { sector: string; pct: number }[];
  topExposures: { ticker: string; name: string; totalValue: number; pctOfPortfolio: number; contributingVehicles: { vehicle: string; value: number }[] }[];
  fundOverlaps: { fundA: string; fundB: string; overlapPct: number; sharedHoldings: { ticker: string; name: string }[] }[];
  summary: string;
}

const ASSET_CLASSES = ["EQUITY", "ETF", "MUTUAL_FUND", "CRYPTO", "REAL_ESTATE", "PRIVATE_EQUITY", "COMMODITY", "CASH"];

export default function PortfolioPage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [dna, setDna] = useState<DNAResult | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    ticker: "", name: "", assetClass: "EQUITY", quantity: "", price: "", costBasis: "",
  });

  async function refresh() {
    setLoading(true);
    const [posRes, dnaRes] = await Promise.all([fetch("/api/positions"), fetch("/api/portfolio-dna")]);
    setPositions(await posRes.json());
    setDna(await dnaRes.json());
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/positions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticker: form.ticker.toUpperCase(),
        name: form.name,
        assetClass: form.assetClass,
        quantity: parseFloat(form.quantity),
        price: parseFloat(form.price),
        costBasis: parseFloat(form.costBasis),
        currency: "USD",
        sector: "Unclassified",
        geography: "Unclassified",
      }),
    });
    setForm({ ticker: "", name: "", assetClass: "EQUITY", quantity: "", price: "", costBasis: "" });
    setShowForm(false);
    refresh();
  }

  const totalValue = positions.reduce((sum, p) => sum + p.quantity * p.price, 0);

  return (
    <main className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-5xl px-10 py-9">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <h1 className="font-display text-2xl text-text-1 mb-1">Portfolio</h1>
            <p className="text-xs text-text-3">
              Your holdings and Portfolio DNA™ — composition and true look-through exposure. Descriptive only.
            </p>
          </div>
          <Button size="sm" onClick={() => setShowForm((s) => !s)}>
            {showForm ? "Cancel" : "+ Add Holding"}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardTitle>Add a holding</CardTitle>
            <form onSubmit={handleAdd} className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
              <input required placeholder="Ticker (e.g. NVDA)" value={form.ticker}
                onChange={(e) => setForm({ ...form, ticker: e.target.value })}
                className="rounded-md border border-border-strong bg-bg-surface px-3 py-2 text-sm text-text-1 outline-none focus:border-indigo" />
              <input required placeholder="Name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-md border border-border-strong bg-bg-surface px-3 py-2 text-sm text-text-1 outline-none focus:border-indigo" />
              <select value={form.assetClass} onChange={(e) => setForm({ ...form, assetClass: e.target.value })}
                className="rounded-md border border-border-strong bg-bg-surface px-3 py-2 text-sm text-text-1 outline-none focus:border-indigo">
                {ASSET_CLASSES.map((ac) => <option key={ac} value={ac}>{ac}</option>)}
              </select>
              <input required type="number" step="any" placeholder="Quantity" value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="rounded-md border border-border-strong bg-bg-surface px-3 py-2 text-sm text-text-1 outline-none focus:border-indigo" />
              <input required type="number" step="any" placeholder="Current price" value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="rounded-md border border-border-strong bg-bg-surface px-3 py-2 text-sm text-text-1 outline-none focus:border-indigo" />
              <input required type="number" step="any" placeholder="Cost basis (per unit)" value={form.costBasis}
                onChange={(e) => setForm({ ...form, costBasis: e.target.value })}
                className="rounded-md border border-border-strong bg-bg-surface px-3 py-2 text-sm text-text-1 outline-none focus:border-indigo" />
              <div className="col-span-2 md:col-span-3">
                <Button type="submit" size="sm">Save holding</Button>
              </div>
            </form>
          </Card>
        )}

        {loading ? (
          <p className="text-sm text-text-3">Loading portfolio…</p>
        ) : (
          <>
            <Card className="mb-6">
              <CardTitle>Holdings</CardTitle>
              <div className="mt-3 divide-y divide-border">
                {positions.map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                    <div>
                      <span className="font-semibold text-text-1">{p.ticker}</span>
                      <span className="ml-2 text-xs text-text-3">{p.name}</span>
                      <span className="ml-2 rounded-full bg-bg-surface px-2 py-0.5 text-[10px] text-text-3">{p.assetClass}</span>
                    </div>
                    <div className="text-right font-mono text-xs">
                      {p.quantity} units · ${(p.quantity * p.price).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 border-t border-border pt-3 text-right font-mono text-sm text-text-1">
                Total: ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </Card>

            {dna && (
              <>
                <Card className="mb-6">
                  <CardTitle>Portfolio DNA™ — Summary</CardTitle>
                  <p className="mt-2 text-sm text-text-2 leading-relaxed">{dna.summary}</p>
                </Card>

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card>
                    <CardTitle>Asset Class Mix</CardTitle>
                    <div className="mt-3 space-y-2">
                      {dna.assetClassMix.map((m) => (
                        <div key={m.assetClass} className="flex items-center justify-between text-xs text-text-2">
                          <span>{m.assetClass}</span>
                          <span className="font-mono text-text-1">{m.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card>
                    <CardTitle>Sector Mix</CardTitle>
                    <div className="mt-3 space-y-2">
                      {dna.sectorMix.map((m) => (
                        <div key={m.sector} className="flex items-center justify-between text-xs text-text-2">
                          <span>{m.sector}</span>
                          <span className="font-mono text-text-1">{m.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <Card className="mb-6">
                  <CardTitle>True Look-Through Exposure</CardTitle>
                  <p className="mt-1 mb-3 text-xs text-text-3">
                    Aggregated exposure to each security across direct holdings and every fund that holds it.
                  </p>
                  <div className="space-y-3">
                    {dna.topExposures.map((exp) => (
                      <div key={exp.ticker} className="border-b border-border pb-3 last:border-0">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-text-1">{exp.ticker} — {exp.name}</span>
                          <span className="font-mono text-indigo">{exp.pctOfPortfolio}%</span>
                        </div>
                        <div className="mt-1 text-[11px] text-text-3">
                          via {exp.contributingVehicles.map((v) => v.vehicle).join(", ")}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {dna.fundOverlaps.length > 0 && (
                  <Card>
                    <CardTitle>Fund Overlap</CardTitle>
                    <div className="mt-3 space-y-3">
                      {dna.fundOverlaps.map((o) => (
                        <div key={`${o.fundA}-${o.fundB}`} className="text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-text-1">{o.fundA} ↔ {o.fundB}</span>
                            <span className={`font-mono ${o.overlapPct >= 60 ? "text-bear" : "text-text-2"}`}>{o.overlapPct}% overlap</span>
                          </div>
                          <div className="mt-1 text-[11px] text-text-3">
                            Shared: {o.sharedHoldings.map((h) => h.ticker).join(", ")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
