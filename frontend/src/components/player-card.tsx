import Link from "next/link";
import type { Player } from "@/data/types";
import { getClub } from "@/lib/data";
import { ClubBadge, DemoTag } from "./ui";

export function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Avatar générique (pas de photo disponible) aux couleurs du club. */
export function PlayerAvatar({ player, size = 56 }: { player: Player; size?: number }) {
  const [bg, accent] = getClub(player.club).colors;
  return (
    <div
      aria-hidden
      className="grid shrink-0 place-items-center rounded-full font-display font-extrabold"
      style={{ width: size, height: size, background: `linear-gradient(140deg, ${bg}, #060b14)`, color: accent, fontSize: size * 0.38, boxShadow: `inset 0 0 0 2px ${accent}55` }}
    >
      {initials(player.name)}
    </div>
  );
}

/** Carte « distinction » : meilleur joueur, joueur du mois… */
export function AwardCard({ title, player, stat, statLabel, subtitle }: { title: string; player: Player; stat: string; statLabel: string; subtitle?: string }) {
  const club = getClub(player.club);
  return (
    <Link href={`/joueurs/${player.id}`} className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-5 transition hover:border-yellow/40">
      <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full opacity-30 blur-2xl" style={{ background: club.colors[0] }} />
      <div className="relative flex items-center justify-between gap-2">
        <p className="text-xs font-bold tracking-[0.18em] text-yellow uppercase">{title}</p>
        <DemoTag />
      </div>
      {subtitle && <p className="relative mt-1 text-xs text-faint">{subtitle}</p>}
      <div className="relative mt-5 flex items-center gap-4">
        <PlayerAvatar player={player} size={64} />
        <div className="min-w-0">
          <p className="truncate font-display text-2xl font-bold uppercase group-hover:text-yellow">{player.name}</p>
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <ClubBadge club={club} size={16} /> {club.name} · {player.position}
          </p>
        </div>
      </div>
      <div className="relative mt-5 flex items-baseline gap-2 border-t border-line pt-4">
        <span className="font-display text-4xl font-extrabold text-yellow tabular">{stat}</span>
        <span className="text-sm text-faint">{statLabel}</span>
      </div>
    </Link>
  );
}
