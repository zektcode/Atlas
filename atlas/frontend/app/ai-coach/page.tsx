import { Nav } from "@/components/nav";
import { Card } from "@/components/ui/card";

export default function AICoachPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-3xl px-10 py-9">
        <h1 className="font-display text-2xl text-text-1 mb-1">AICoach</h1>
        <p className="text-xs text-text-3 mb-7">Phase 2 — see ROADMAP.md</p>
        <Card>
          <p className="text-sm text-text-2 leading-relaxed">
            Conversational interface over Anthropic's API, scoped to the user's own Decision Cards and Journal — see docs/AI.md. Not started; requires ANTHROPIC_API_KEY wiring and the system prompt constraints specified in that doc before this ships.
          </p>
        </Card>
      </div>
    </main>
  );
}
