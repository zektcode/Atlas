/**
 * Trade Journal — Tier 1. Manual reason / emotion / confidence-at-entry
 * log. No external data dependency, no compliance exposure. Feeds the
 * Behavior Engine (Tier 4 / Phase 2) once there's enough entry history —
 * see docs/Behavior_Engine.md.
 */
"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/nav";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface JournalEntry {
  id: string;
  ticker: string;
  action: "BUY" | "SELL" | "HOLD";
  reason: string;
  emotion: string;
  confidenceAtEntry: number;
  createdAt: string;
}

const EMOTIONS = ["CONFIDENT", "ANXIOUS", "FOMO", "REVENGE", "NEUTRAL", "DISCIPLINED"];
const EMOTION_COLOR: Record<string, string> = {
  CONFIDENT: "text-bull", DISCIPLINED: "text-bull", NEUTRAL: "text-text-2",
  ANXIOUS: "text-neutral", FOMO: "text-bear", REVENGE: "text-bear",
};

export default function TradeJournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    ticker: "", action: "BUY", reason: "", emotion: "NEUTRAL", confidenceAtEntry: "70",
  });

  async function refresh() {
    setLoading(true);
    const res = await fetch("/api/journal");
    setEntries(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticker: form.ticker.toUpperCase(),
        action: form.action,
        reason: form.reason,
        emotion: form.emotion,
        confidenceAtEntry: parseInt(form.confidenceAtEntry, 10),
      }),
    });
    setForm({ ticker: "", action: "BUY", reason: "", emotion: "NEUTRAL", confidenceAtEntry: "70" });
    setShowForm(false);
    refresh();
  }

  return (
    <main className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-3xl px-10 py-9">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <h1 className="font-display text-2xl text-text-1 mb-1">Trade Journal</h1>
            <p className="text-xs text-text-3">Log the reason and emotion behind each decision — not just the outcome.</p>
          </div>
          <Button size="sm" onClick={() => setShowForm((s) => !s)}>
            {showForm ? "Cancel" : "+ New Entry"}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardTitle>New journal entry</CardTitle>
            <form onSubmit={handleAdd} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <input required placeholder="Ticker" value={form.ticker}
                  onChange={(e) => setForm({ ...form, ticker: e.target.value })}
                  className="rounded-md border border-border-strong bg-bg-surface px-3 py-2 text-sm text-text-1 outline-none focus:border-indigo" />
                <select value={form.action} onChange={(e) => setForm({ ...form, action: e.target.value })}
                  className="rounded-md border border-border-strong bg-bg-surface px-3 py-2 text-sm text-text-1 outline-none focus:border-indigo">
                  <option value="BUY">BUY</option><option value="SELL">SELL</option><option value="HOLD">HOLD</option>
                </select>
                <select value={form.emotion} onChange={(e) => setForm({ ...form, emotion: e.target.value })}
                  className="rounded-md border border-border-strong bg-bg-surface px-3 py-2 text-sm text-text-1 outline-none focus:border-indigo">
                  {EMOTIONS.map((em) => <option key={em} value={em}>{em}</option>)}
                </select>
                <input required type="number" min="0" max="100" placeholder="Confidence %" value={form.confidenceAtEntry}
                  onChange={(e) => setForm({ ...form, confidenceAtEntry: e.target.value })}
                  className="rounded-md border border-border-strong bg-bg-surface px-3 py-2 text-sm text-text-1 outline-none focus:border-indigo" />
              </div>
              <textarea required placeholder="Why are you making this decision?" value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })} rows={3}
                className="w-full rounded-md border border-border-strong bg-bg-surface px-3 py-2 text-sm text-text-1 outline-none focus:border-indigo" />
              <Button type="submit" size="sm">Save entry</Button>
            </form>
          </Card>
        )}

        {loading ? (
          <p className="text-sm text-text-3">Loading journal…</p>
        ) : entries.length === 0 ? (
          <Card><p className="text-sm text-text-2">No entries yet — log your first decision above.</p></Card>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <Card key={entry.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-semibold text-text-1">{entry.ticker}</span>
                    <span className="ml-2 text-xs text-text-3">{entry.action}</span>
                    <span className={`ml-2 text-xs font-medium ${EMOTION_COLOR[entry.emotion] ?? "text-text-2"}`}>{entry.emotion}</span>
                  </div>
                  <span className="font-mono text-xs text-text-3">{entry.confidenceAtEntry}% confidence</span>
                </div>
                <p className="mt-2 text-sm text-text-2 leading-relaxed">{entry.reason}</p>
                <p className="mt-2 text-[11px] text-text-3">{new Date(entry.createdAt).toLocaleDateString()}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
