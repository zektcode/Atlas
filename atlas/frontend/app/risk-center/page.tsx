import { Nav } from "@/components/nav";
import { Card } from "@/components/ui/card";

export default function RiskCenterPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-3xl px-10 py-9">
        <h1 className="font-display text-2xl text-text-1 mb-1">RiskCenter</h1>
        <p className="text-xs text-text-3 mb-7">Phase 1 (partial) — see ROADMAP.md</p>
        <Card>
          <p className="text-sm text-text-2 leading-relaxed">
            Full Risk Radar detail view, backed by backend/services/riskEngine.ts. The scoring functions are real and tested; this page currently reuses the Dashboard's summary view and needs its own detailed breakdown UI — tracked as a Phase 1 follow-up, not blocked on any external integration.
          </p>
        </Card>
      </div>
    </main>
  );
}
