import { cacheLife } from "next/cache";
import Link from "next/link";
import { MatchList, MatchRow } from "@/components/match-row";
import { MatchPoster } from "@/components/match-poster";
import { PlayerAvatar } from "@/components/player-card";
import { StandingsTable } from "@/components/standings-table";
import { ClubBadge, DemoTag, SectionTitle } from "@/components/ui";
import { STANDINGS_2025_26 } from "@/data/standings-2025-26";
import { currentClubs, getClub, topBy, upcomingMatches } from "@/lib/data";
import { fmtDateShort, plural } from "@/lib/format";

export default async function HomePage() {
  "use cache";
  cacheLife("hours"); // « prochain match » recalculé au plus toutes les heures

  const upcoming = upcomingMatches();
  const opener = upcoming[0];
  const round = opener ? upcoming.filter((m) => m.round === opener.round) : [];
  const champion = STANDINGS_2025_26[0];
  const championClub = getClub(champion.club);
  const scorers = topBy("goals", 5);

  return (
    <div className="container-site space-y-14 pt-6 sm:pt-8">
      {opener && <MatchPoster match={opener} label={opener.round === 1 ? "Ouverture de la saison" : "Prochain match"} />}

      <div className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-10">
        {round.length > 0 && (
          <section>
            <SectionTitle
              title={`Journée ${opener!.round}`}
              extra={<span className="font-sans text-sm font-normal text-faint">{fmtDateShort(round[0].kickoff)} et {fmtDateShort(round[round.length - 1].kickoff)}</span>}
              href="/matchs"
              linkLabel="Calendrier complet"
            />
            <MatchList>
              {round.map((m) => (
                <MatchRow key={m.id} match={m} />
              ))}
            </MatchList>
            <p className="mt-2 text-xs text-faint">Horaires indicatifs en attendant le calendrier officiel de la LINAFP.</p>
          </section>
        )}

        <aside className="space-y-6">
          <Link href={`/equipes/${championClub.slug}`} className="group block rounded-lg border border-line bg-surface p-5 hover:border-fg">
            <p className="text-sm font-semibold text-pelouse">Champion 2025-26</p>
            <div className="mt-3 flex items-center gap-4">
              <ClubBadge club={championClub} size={64} />
              <div>
                <p className="font-display text-3xl leading-none font-extrabold group-hover:underline">{championClub.name}</p>
                <p className="mt-1 text-sm text-muted">
                  {champion.points} points, {champion.won} victoires
                </p>
              </div>
            </div>
          </Link>

          <div className="rounded-lg border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <h2 className="font-display text-2xl font-bold">Buteurs 2025-26</h2>
              <DemoTag />
            </div>
            <ol>
              {scorers.map((p, i) => (
                <li key={p.id} className="border-b border-line last:border-0">
                  <Link href={`/joueurs/${p.id}`} className="flex items-center gap-3 px-5 py-2.5 hover:bg-surface-2">
                    <span className="w-4 font-display text-lg font-bold text-faint">{i + 1}</span>
                    <PlayerAvatar player={p} size={30} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{p.name}</span>
                      <span className="block truncate text-xs text-faint">{getClub(p.club).name}</span>
                    </span>
                    <span className="font-display text-2xl font-extrabold tabular">{p.goals}</span>
                    <span className="sr-only">{plural(p.goals, "but")}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>

      <section>
        <SectionTitle title="Classement final 2025-26" href="/classement?saison=2025-26" linkLabel="Tableau complet" />
        <StandingsTable rows={STANDINGS_2025_26.slice(0, 8)} compact startRank={1} zones={[]} />
      </section>

      <section>
        <SectionTitle title="Les clubs de la saison" href="/equipes" linkLabel="Tous les clubs" />
        <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-5 lg:grid-cols-7">
          {currentClubs().map((club) => (
            <li key={club.slug} className="bg-surface">
              {club.unconfirmed ? (
                <div className="flex h-full flex-col items-center gap-2 p-4 text-center">
                  <ClubBadge club={club} size={52} />
                  <span className="text-xs text-faint italic">{club.name}</span>
                </div>
              ) : (
                <Link href={`/equipes/${club.slug}`} className="flex h-full flex-col items-center gap-2 p-4 text-center hover:bg-surface-2">
                  <ClubBadge club={club} size={52} />
                  <span className="text-xs leading-tight font-semibold">{club.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
