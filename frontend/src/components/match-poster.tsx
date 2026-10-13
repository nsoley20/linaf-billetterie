import Image from "next/image";
import Link from "next/link";
import type { Club, Match } from "@/data/types";
import { getClub, getStadium } from "@/lib/data";
import { fmtTime } from "@/lib/format";
import { DaysLeft } from "./days-left";
import { ClubBadge } from "./ui";

const TZ = "Africa/Libreville";
const weekday = new Intl.DateTimeFormat("fr-FR", { weekday: "short", timeZone: TZ });
const dayMonth = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: TZ });

function PosterTeam({ club, align }: { club: Club; align: "left" | "right" }) {
  const right = align === "right";
  return (
    <div className={`flex min-w-0 items-center gap-4 sm:flex-col sm:gap-3 ${right ? "sm:items-end sm:text-right" : "sm:items-start"}`}>
      <div className="grid size-16 shrink-0 place-items-center rounded-full bg-white p-2 sm:size-32 sm:p-4">
        {club.logo ? (
          <Image src={club.logo} alt="" width={112} height={112} priority className="size-full object-contain" />
        ) : (
          <ClubBadge club={club} size={72} />
        )}
      </div>
      <div className="min-w-0">
        <p className="font-display text-[clamp(2rem,6vw,4.75rem)] leading-[0.86] font-black break-words uppercase">{club.name}</p>
        <span className={`mt-2 block h-1.5 w-14 ${right ? "sm:ml-auto" : ""}`} style={{ background: club.colors[1] }} />
        <p className="mt-2 text-sm text-white/75">{club.city}</p>
      </div>
    </div>
  );
}

/** Autocollant jaune avec la date, comme sur les affiches collées en ville. */
function DateSticker({ kickoff, className = "" }: { kickoff: string; className?: string }) {
  const date = new Date(kickoff);
  return (
    <div
      aria-hidden
      className={`grid -rotate-6 place-items-center rounded-full bg-soleil text-center font-display leading-none text-fg shadow-[0_3px_0_rgb(0_0_0/0.25)] ${className}`}
    >
      <span>
        <span className="block text-sm font-bold uppercase sm:text-lg">{weekday.format(date)}</span>
        <span className="block text-2xl font-black uppercase sm:text-5xl">{dayMonth.format(date).replace(".", "")}</span>
        <span className="block text-lg font-extrabold sm:text-3xl">{fmtTime(kickoff)}</span>
      </span>
    </div>
  );
}

/**
 * Affiche du prochain match : l'élément signature du site.
 * Fond pelouse (bandes de tonte), écussons sur pastilles blanches, date sur un autocollant jaune.
 */
export function MatchPoster({ match, label, detailsLink = true, as = "section" }: { match: Match; label?: string; detailsLink?: boolean; as?: "section" | "header" }) {
  const Tag = as;
  const home = getClub(match.home);
  const away = getClub(match.away);
  const stadium = getStadium(match.stadiumId);

  return (
    <Tag aria-label={`${home.name} contre ${away.name}`} className="relative overflow-hidden rounded-lg bg-pelouse text-white">
      <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.05)_0_72px,transparent_72px_144px)]" />

      {!match.score && <DateSticker kickoff={match.kickoff} className="absolute top-4 right-4 size-24 sm:hidden" />}

      <div className="relative px-5 pt-6 pb-8 sm:px-10 sm:pt-10 sm:pb-10">
        <p className="mb-8 max-w-[60%] text-sm font-medium text-white/80 sm:mb-10 sm:max-w-none">
          National Foot 1 · Journée {match.round}{label ? ` · ${label}` : ""}
        </p>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-start sm:gap-8">
          <div className="pr-20 sm:pr-0">
            <PosterTeam club={home} align="left" />
          </div>
          <div className="flex items-center sm:justify-center sm:self-center">
            {match.score ? (
              <span className="font-display text-5xl font-black tabular sm:text-8xl">
                {match.score[0]}-{match.score[1]}
              </span>
            ) : (
              <>
                <span className="font-display text-xl font-bold text-white/70 italic sm:hidden">contre</span>
                <DateSticker kickoff={match.kickoff} className="hidden size-40 sm:grid" />
              </>
            )}
          </div>
          <PosterTeam club={away} align="right" />
        </div>
      </div>

      <div className="relative flex flex-col gap-4 bg-fg/90 px-5 py-4 sm:flex-row sm:items-center sm:px-10">
        <p className="text-sm text-white/80">
          {stadium ? `${stadium.name}, ${stadium.city}` : "Stade à confirmer"} · <DaysLeft target={match.kickoff} />
          {match.provisional && <span className="ml-2 font-mono text-[11px] text-white/50 uppercase">affiche indicative</span>}
        </p>
        <div className="flex gap-2 sm:ml-auto">
          {!match.score && !home.unconfirmed && !away.unconfirmed && (
            <Link href={`/billetterie/${match.id}`} className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-fg hover:bg-soleil">
              Acheter des billets
            </Link>
          )}
          {detailsLink && (
            <Link href={`/matchs/${match.id}`} className="rounded-md border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:border-white">
              Fiche du match
            </Link>
          )}
        </div>
      </div>
    </Tag>
  );
}
