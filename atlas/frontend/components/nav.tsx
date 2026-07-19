import Link from "next/link";

const LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/risk-center", label: "Risk Center" },
  { href: "/trade-journal", label: "Trade Journal" },
  { href: "/ai-coach", label: "AI Coach" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/70 px-10 py-4 backdrop-blur-xl">
      <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-text-1">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="#7c8cff" strokeWidth="1.4" />
          <path d="M10 1 A9 9 0 0 1 18.5 13" stroke="#4ade9a" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="10" cy="10" r="2.5" fill="#7c8cff" />
        </svg>
        Atlas
      </Link>
      <div className="hidden gap-1 rounded-md border border-border bg-bg-elevated p-1 md:flex">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href as never}
            className="rounded px-4 py-2 text-xs font-medium text-text-2 transition-colors hover:text-text-1"
          >
            {l.label}
          </Link>
        ))}
      </div>
      <Link
        href="/settings"
        className="rounded-md bg-text-1 px-4 py-2 text-xs font-semibold text-bg transition-opacity hover:opacity-85"
      >
        Settings
      </Link>
    </nav>
  );
}
