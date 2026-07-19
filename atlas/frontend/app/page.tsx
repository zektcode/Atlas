/**
 * Landing page. Copy and layout intentionally mirror the validated static
 * prototype at /design/prototype/atlas-prototype.html — see
 * /docs/Product_Philosophy.md for the copy rules this page is held to
 * (no imperative predictions, ever).
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SleepScoreRing } from "@/components/sleep-score-ring";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between border-b border-border px-10 py-5">
        <span className="text-sm font-semibold text-text-1">Atlas</span>
        <Link href="/dashboard">
          <Button size="sm">See Your Sleep Score</Button>
        </Link>
      </nav>

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-10 py-28 md:grid-cols-2">
        <div>
          <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo shadow-[0_0_10px_#7c8cff]" />
            AI Decision Intelligence
          </div>
          <h1 className="font-display text-5xl leading-[1.1] text-text-1">
            Confidence before markets open.
            <br />
            Peace of mind before <em className="not-italic text-indigo">they close.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-text-2">
            Atlas never tells you what will happen. It quantifies what&apos;s actually known, what
            isn&apos;t, and what would change its mind — across every position you hold.
          </p>
          <div className="mt-9 flex items-center gap-4">
            <Link href="/dashboard">
              <Button>See Your Sleep Score</Button>
            </Link>
            <span className="cursor-pointer text-sm font-medium text-text-2 hover:text-text-1">
              Watch a 90s demo →
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-border-strong bg-bg-elevated p-8 shadow-2xl">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold text-text-1">NVDA</div>
              <div className="text-xs text-text-3">NVIDIA Corporation</div>
            </div>
            <span className="rounded-full bg-bull/10 px-3 py-1 text-[10px] font-semibold text-bull">
              Lean Bullish
            </span>
          </div>
          <div className="flex justify-center py-2">
            <SleepScoreRing
              score={74}
              size={180}
              label="CONFIDENCE"
              segments={[
                { value: 43, color: "#4ade9a" },
                { value: 39, color: "#e8b04b" },
                { value: 18, color: "#f0665a" },
              ]}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-border">
            <div className="bg-bg-surface p-3.5">
              <div className="font-mono text-base font-semibold text-bull">+9.0%</div>
              <div className="text-[10px] text-text-3">Expected Return</div>
            </div>
            <div className="bg-bg-surface p-3.5">
              <div className="font-mono text-base font-semibold text-bear">−4.0%</div>
              <div className="text-[10px] text-text-3">Expected Drawdown</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-10 py-10 text-center text-xs text-text-3">
        Atlas — Decision intelligence, not predictions.
      </footer>
    </main>
  );
}
