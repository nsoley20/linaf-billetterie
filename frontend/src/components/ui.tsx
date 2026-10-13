import Image from "next/image";
import Link from "next/link";
import type { Club } from "@/data/types";

/** Logo officiel du club, ou écusson à ses initiales s'il n'y en a pas. */
export function ClubBadge({ club, size = 40 }: { club: Club; size?: number }) {
  if (club.logo) {
    return (
      <Image
        src={club.logo}
        alt=""
        width={size}
        height={size}
        className="shrink-0 object-contain"
        style={{ width: size, height: size }}
      />
    );
  }
  const [bg, accent] = club.colors;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className="shrink-0">
      <path
        d="M32 3 57 10v21c0 15-10 25-25 31C17 56 7 46 7 31V10Z"
        fill={club.unconfirmed ? "none" : bg}
        stroke={club.unconfirmed ? "var(--color-line-strong)" : bg}
        strokeWidth="2.5"
        strokeDasharray={club.unconfirmed ? "4 3" : undefined}
      />
      <text
        x="32"
        y="39"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize={club.short.length > 3 ? 15 : 19}
        fill={club.unconfirmed ? "var(--color-faint)" : accent}
      >
        {club.short}
      </text>
    </svg>
  );
}

export function ClubName({ club, className = "" }: { club: Club; className?: string }) {
  if (club.unconfirmed) return <span className={`text-faint italic ${className}`}>{club.name}</span>;
  return (
    <Link href={`/equipes/${club.slug}`} className={`hover:text-pelouse hover:underline ${className}`}>
      {club.name}
    </Link>
  );
}

/** Mention discrète pour les données qui ne sont pas encore officielles. */
export function DemoTag({ label = "exemple" }: { label?: string }) {
  return (
    <span
      title="Donnée à remplacer par la donnée officielle"
      className="inline-block rounded border border-line-strong px-1.5 py-px align-middle font-mono text-[10px] font-medium tracking-wide text-faint uppercase"
    >
      {label}
    </span>
  );
}

export function PageHeader({ kicker, title, children }: { kicker: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="border-b border-line">
      <div className="container-site pt-10 pb-8 sm:pt-14">
        <p className="text-sm font-medium text-pelouse">{kicker}</p>
        <h1 className="mt-1 font-display text-5xl leading-none font-extrabold tracking-tight uppercase sm:text-7xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-muted">{children}</div>}
      </div>
    </header>
  );
}

export function SectionTitle({ title, href, linkLabel, extra }: { title: React.ReactNode; href?: string; linkLabel?: string; extra?: React.ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-fg pb-2">
      <h2 className="flex items-center gap-3 font-display text-3xl font-bold">
        {title}
        {extra}
      </h2>
      {href && (
        <Link href={href} className="text-sm font-semibold text-pelouse hover:underline">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-line bg-surface ${className}`}>{children}</div>;
}

export function Notice({ children }: { children: React.ReactNode }) {
  return <p className="border-l-4 border-soleil bg-surface px-4 py-3 text-sm text-muted">{children}</p>;
}

export const buttonClass = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-md bg-pelouse px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-pelouse-dark",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-md border border-line-strong bg-surface px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-fg",
};
