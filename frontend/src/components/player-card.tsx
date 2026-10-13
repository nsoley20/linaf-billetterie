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

/** Pastille aux initiales (pas de photo disponible), aux couleurs du club. */
export function PlayerAvatar({ player, size = 48 }: { player: Player; size?: number }) {
  const [main] = getClub(player.club).colors;
  return (
    <div
      aria-hidden
      className="grid shrink-0 place-items-center rounded-full font-display font-extrabold text-white"
      style={{ width: size, height: size, background: main, fontSize: size * 0.4 }}
    >
      {initials(player.name)}
    </div>
  );
}

/** Distinction individuelle : titre, joueur, chiffre clé. */
export function AwardCard({ title, player, stat, statLabel, subtitle }: { title: string; player: Player; stat: string; statLabel: string; subtitle?: string }) {
  const club = getClub(player.club);
  return (
    <Link href={`/joueurs/${player.id}`} className="group flex flex-col rounded-lg border border-line bg-surface p-5 transition-colors hover:border-fg">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-pelouse">
          {title}
          {subtitle && <span className="font-normal text-faint"> · {subtitle}</span>}
        </p>
        <DemoTag />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <PlayerAvatar player={player} size={52} />
        <div className="min-w-0">
          <p className="truncate font-display text-2xl leading-tight font-bold group-hover:underline">{player.name}</p>
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <ClubBadge club={club} size={16} /> {club.name}
          </p>
        </div>
      </div>
      <p className="mt-4 border-t border-line pt-3">
        <span className="font-display text-4xl font-extrabold tabular">{stat}</span>
        <span className="ml-2 text-sm text-muted">{statLabel}</span>
      </p>
    </Link>
  );
}
