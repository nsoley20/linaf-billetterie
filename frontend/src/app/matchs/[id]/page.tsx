import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MatchPoster } from "@/components/match-poster";
import { PlayerAvatar } from "@/components/player-card";
import { Card, ClubBadge, DemoTag, Notice, SectionTitle } from "@/components/ui";
import { FIXTURES_2026_27 } from "@/data/fixtures-2026-27";
import { STANDINGS_2025_26 } from "@/data/standings-2025-26";
import { findMatch, getClub, getStadium, matchTitle, playersOf, rank2025 } from "@/lib/data";
import { fmtNumber, plural } from "@/lib/format";

export const generateStaticParams = () => FIXTURES_2026_27.map((m) => ({ id: m.id }));

export async function generateMetadata({ params }: PageProps<"/matchs/[id]">): Promise<Metadata> {
  const match = findMatch((await params).id);
  return { title: match ? matchTitle(match) : "Match" };
}

export default async function MatchPage({ params }: PageProps<"/matchs/[id]">) {
  const match = findMatch((await params).id);
  if (!match) notFound();
  const home = getClub(match.home);
  const away = getClub(match.away);
  const stadium = getStadium(match.stadiumId);
  const last = (slug: string) => STANDINGS_2025_26.find((r) => r.club === slug);
  const h = last(home.slug);
  const a = last(away.slug);

  const compare: [string, string, string][] =
    h && a
      ? [
          ["Classement", `${rank2025(home.slug)}e`, `${rank2025(away.slug)}e`],
          ["Points", `${h.points}`, `${a.points}`],
          ["Victoires", `${h.won}`, `${a.won}`],
          ["Buts marqués", `${h.goalsFor}`, `${a.goalsFor}`],
          ["Buts encaissés", `${h.goalsAgainst}`, `${a.goalsAgainst}`],
        ]
      : [];

  return (
    <div className="container-site space-y-12 pt-6 sm:pt-8">
      <MatchPoster match={match} detailsLink={false} as="header" />

      <div className="grid gap-12 lg:grid-cols-2">
        <section>
          <SectionTitle title="Saison 2025-26 face à face" />
          {compare.length > 0 ? (
            <Card>
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <ClubBadge club={home} size={32} />
                <ClubBadge club={away} size={32} />
              </div>
              {compare.map(([label, hv, av]) => (
                <div key={label} className="grid grid-cols-[4rem_1fr_4rem] items-center border-b border-line px-5 py-2.5 text-center last:border-0">
                  <span className="text-left font-display text-2xl font-bold tabular">{hv}</span>
                  <span className="text-sm text-muted">{label}</span>
                  <span className="text-right font-display text-2xl font-bold tabular">{av}</span>
                </div>
              ))}
            </Card>
          ) : (
            <Notice>Pas de comparaison : un des deux clubs ne jouait pas en National Foot 1 la saison dernière.</Notice>
          )}
        </section>

        <section>
          <SectionTitle title="Joueurs à suivre" extra={<DemoTag />} />
          <Card>
            {[home, away].flatMap((club) =>
              playersOf(club.slug)
                .filter((p) => p.position !== "Gardien")
                .slice(0, 2)
                .map((p) => (
                  <Link key={p.id} href={`/joueurs/${p.id}`} className="flex items-center gap-3 border-b border-line px-5 py-3 last:border-0 hover:bg-surface-2">
                    <PlayerAvatar player={p} size={40} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold">{p.name}</span>
                      <span className="block text-xs text-faint">
                        {club.name} · {p.position}
                      </span>
                    </span>
                    <span className="text-sm text-muted">
                      <span className="font-display text-2xl font-bold text-fg">{p.goals}</span> {plural(p.goals, "but")}
                    </span>
                  </Link>
                )),
            )}
          </Card>
          {stadium?.capacity && (
            <p className="mt-3 text-sm text-muted">
              {stadium.name} : {fmtNumber(stadium.capacity)} places.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
