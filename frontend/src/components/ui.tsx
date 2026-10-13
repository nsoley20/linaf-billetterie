import Link from "next/link";
import type { Club } from "@/data/types";

/** Écusson généré (initiales + couleurs) en attendant les vrais logos des clubs. */
export function ClubBadge({ club, size = 40 }: { club: Club; size?: number }) {
  const [bg, accent] = club.colors;
  const fontSize = club.short.length > 3 ? 20 : 24;
  return (
    <svg width={size} height={size * 1.12} viewBox="0 0 64 72" aria-hidden className="shrink-0">
      <path d="M32 2 60 10v24c0 17-12 29-28 36C16 63 4 51 4 34V10Z" fill={bg} stroke={accent} strokeOpacity={club.unconfirmed ? 0.4 : 0.9} strokeWidth="3" strokeDasharray={club.unconfirmed ? "5 4" : undefined} />
      <path d="M4 10 32 2l28 8v8H4Z" fill={accent} opacity="0.18" />
      <text x="32" y="44" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize={fontSize} fill={accent} letterSpacing="0.5">
        {club.short}
      </text>
    </svg>
  );
}

export function ClubName({ club, className = "" }: { club: Club; className?: string }) {
  if (club.unconfirmed) return <span className={`italic text-faint ${className}`}>{club.name}</span>;
  return (
    <Link href={`/equipes/${club.slug}`} className={`hover:text-yellow ${className}`}>
      {club.name}
    </Link>
  );
}

export function DemoTag({ label = "Exemple" }: { label?: string }) {
  return (
    <span
      title="Donnée d'exemple, à remplacer par la donnée officielle"
      className="inline-flex items-center gap-1 rounded-full border border-yellow/40 bg-yellow/10 px-2 py-0.5 align-middle font-sans text-[10px] font-semibold tracking-wider text-yellow uppercase"
    >
      {label}
    </span>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-yellow uppercase">
      <span className="h-px w-6 bg-yellow/70" />
      {children}
    </p>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-surface">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgb(0_158_96/0.18),transparent_60%),radial-gradient(50%_80%_at_0%_100%,rgb(58_117_196/0.16),transparent_60%)]" />
      <div className="container-site relative py-10 sm:py-14">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 font-display text-5xl leading-[0.95] font-extrabold tracking-tight uppercase sm:text-7xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-muted">{children}</div>}
      </div>
    </header>
  );
}

export function SectionTitle({ title, href, linkLabel = "Tout voir", extra }: { title: React.ReactNode; href?: string; linkLabel?: string; extra?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <h2 className="flex items-center gap-3 font-display text-3xl font-bold uppercase sm:text-4xl">
        {title}
        {extra}
      </h2>
      {href && (
        <Link href={href} className="text-sm font-semibold text-green-2 hover:text-yellow">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-surface ${className}`}>{children}</div>;
}

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-yellow/25 bg-yellow/[0.06] p-4 text-sm text-muted">
      <span aria-hidden className="mt-0.5 text-yellow">●</span>
      <div>{children}</div>
    </div>
  );
}

export const buttonClass = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-2 active:translate-y-px",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-sm font-semibold text-fg transition hover:border-fg/40 hover:bg-white/5",
  yellow:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-yellow px-5 py-3 text-sm font-bold text-black transition hover:brightness-110 active:translate-y-px",
};
