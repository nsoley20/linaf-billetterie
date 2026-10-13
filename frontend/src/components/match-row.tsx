import Link from "next/link";
import type { Club, Match } from "@/data/types";
import { getClub, getStadium } from "@/lib/data";
import { fmtDateShort, fmtTime } from "@/lib/format";
import { ClubBadge } from "./ui";

function TeamName({ club, className = "" }: { club: Club; className?: string }) {
  return <span className={`truncate font-semibold ${club.unconfirmed ? "italic text-faint" : ""} ${className}`}>{club.name}</span>;
}

/**
 * Ligne de match : clubs, score ou horaire, stade, accès billetterie.
 * Mobile : une équipe par ligne, horaire à droite. Desktop : affiche horizontale.
 */
export function MatchRow({ match, showTicket = true }: { match: Match; showTicket?: boolean }) {
  const home = getClub(match.home);
  const away = getClub(match.away);
  const stadium = getStadium(match.stadiumId);
  const score = match.score;
  const canBuy = showTicket && !score && !home.unconfirmed && !away.unconfirmed;

  const center = score ? (
    <span className="font-display text-3xl font-extrabold tabular">
      {score[0]}
      <span className="px-1 text-faint">–</span>
      {score[1]}
    </span>
  ) : (
    <>
      <span className="font-display text-2xl font-bold text-yellow tabular">{fmtTime(match.kickoff)}</span>
      <span className="text-[11px] text-faint">{fmtDateShort(match.kickoff)}</span>
    </>
  );

  return (
    <article className="group relative rounded-xl border border-line bg-surface transition hover:border-green/50 hover:bg-surface-2">
      <Link href={`/matchs/${match.id}`} className="absolute inset-0 rounded-xl" aria-label={`${home.name} contre ${away.name}, détails du match`} />

      {/* Mobile */}
      <div className="pointer-events-none grid grid-cols-[1fr_auto] gap-x-3 px-4 pt-3.5 pb-3 sm:hidden">
        <div className="min-w-0 space-y-2">
          {[home, away].map((club, i) => (
            <div key={club.slug} className="flex items-center gap-2.5">
              <ClubBadge club={club} size={24} />
              <TeamName club={club} className="text-sm" />
              {score && <span className="ml-auto font-display text-xl font-bold tabular">{score[i]}</span>}
            </div>
          ))}
        </div>
        {!score && <div className="flex flex-col items-end justify-center">{center}</div>}
      </div>

      {/* Desktop */}
      <div className="pointer-events-none hidden grid-cols-[1fr_7rem_1fr] items-center gap-3 px-5 pt-4 pb-1 sm:grid">
        <div className="flex min-w-0 items-center justify-end gap-3 text-right">
          <TeamName club={home} />
          <ClubBadge club={home} size={34} />
        </div>
        <div className="flex flex-col items-center text-center">{center}</div>
        <div className="flex min-w-0 items-center gap-3">
          <ClubBadge club={away} size={34} />
          <TeamName club={away} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2 sm:border-0 sm:px-5 sm:pb-3">
        <span className="truncate text-xs text-faint">{stadium ? `${stadium.name}, ${stadium.city}` : "Stade à confirmer"}</span>
        {canBuy ? (
          <Link
            href={`/billetterie/${match.id}`}
            className="relative shrink-0 rounded-md border border-green/50 px-3 py-1.5 text-xs font-semibold text-green-2 hover:bg-green/15"
          >
            Billets
          </Link>
        ) : score ? (
          <span className="text-xs font-semibold text-faint uppercase">Terminé</span>
        ) : null}
      </div>
    </article>
  );
}
