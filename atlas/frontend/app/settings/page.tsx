import { Nav } from "@/components/nav";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-3xl px-10 py-9">
        <h1 className="font-display text-2xl text-text-1 mb-1">Settings</h1>
        <p className="text-xs text-text-3 mb-7">Phase 1 (MVP scope) — see ROADMAP.md</p>
        <Card>
          <p className="text-sm text-text-2 leading-relaxed">
            Account, base currency, and notification preferences. Auth-gated once Supabase Auth is wired in frontend/app/(auth).
          </p>
        </Card>
      </div>
    </main>
  );
}
