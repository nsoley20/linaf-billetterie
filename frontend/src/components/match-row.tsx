import Link from "next/link";
import type { Club, Match } from "@/data/types";
import { getClub, getStadium } from "@/lib/data";
import { fmtDateShort, fmtTime } from "@/lib/format";
import { ClubBadge } from "./ui";

function TeamName({ club, className = "" }: { club: Club; className?: string }) {
  return <span className={`truncate font-semibold ${club.unconfirmed ? "font-normal text-faint italic" : ""} ${className}`}>{club.name}</span>;
}

/**
 * Ligne de match : clubs, score ou horaire, stade, accès billetterie.
 * Mobile : une équipe par ligne, horaire à droite. Desktop : domicile | horaire | extérieur.
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
      <span className="px-1 text-faint">-</span>
      {score[1]}
    </span>
  ) : (
    <>
      <span className="font-display text-2xl font-extrabold tabular">{fmtTime(match.kickoff)}</span>
      <span className="text-xs text-faint">{fmtDateShort(match.kickoff)}</span>
    </>
  );

  return (
    <article className="relative border-b border-line bg-surface transition-colors last:border-b-0 hover:bg-surface-2">
      <Link href={`/matchs/${match.id}`} className="absolute inset-0" aria-label={`${home.name} contre ${away.name}, fiche du match`} />

      {/* Mobile */}
      <div className="pointer-events-none grid grid-cols-[1fr_auto] gap-x-3 px-4 pt-3 sm:hidden">
        <div className="min-w-0 space-y-2">
          {[home, away].map((club, i) => (
            <div key={club.slug} className="flex items-center gap-2.5">
              <ClubBadge club={club} size={26} />
              <TeamName club={club} className="text-[15px]" />
              {score && <span className="ml-auto font-display text-xl font-bold tabular">{score[i]}</span>}
            </div>
          ))}
        </div>
        {!score && <div className="flex flex-col items-end justify-center">{center}</div>}
      </div>

      {/* Desktop */}
      <div className="pointer-events-none hidden grid-cols-[1fr_6.5rem_1fr_4.5rem] items-center gap-4 px-5 py-3.5 sm:grid">
        <div className="flex min-w-0 items-center justify-end gap-3 text-right">
          <TeamName club={home} />
          <ClubBadge club={home} size={32} />
        </div>
        <div className="flex flex-col items-center text-center">{center}</div>
        <div className="flex min-w-0 items-center gap-3">
          <ClubBadge club={away} size={32} />
          <TeamName club={away} />
        </div>
        <div className="flex justify-end">
          {canBuy && <TicketLink matchId={match.id} />}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 pt-2 pb-3 sm:hidden">
        <span className="truncate text-xs text-faint">{stadium ? `${stadium.name}, ${stadium.city}` : "Stade à confirmer"}</span>
        {canBuy && <TicketLink matchId={match.id} />}
      </div>
    </article>
  );
}

function TicketLink({ matchId }: { matchId: string }) {
  return (
    <Link
      href={`/billetterie/${matchId}`}
      className="pointer-events-auto relative shrink-0 rounded-md bg-pelouse px-3 py-1.5 text-xs font-semibold text-white hover:bg-pelouse-dark"
    >
      Billets
    </Link>
  );
}

/** Conteneur d'une liste de matchs (une seule bordure, lignes séparées par des filets). */
export function MatchList({ children }: { children: React.ReactNode }) {
  return <div className="overflow-hidden rounded-lg border border-line">{children}</div>;
}
