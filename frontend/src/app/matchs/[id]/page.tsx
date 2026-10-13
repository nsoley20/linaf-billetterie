import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlayerAvatar } from "@/components/player-card";
import { buttonClass, Card, ClubBadge, DemoTag, Notice } from "@/components/ui";
import { FIXTURES_2026_27 } from "@/data/fixtures-2026-27";
import { STANDINGS_2025_26 } from "@/data/standings-2025-26";
import { findMatch, getClub, getStadium, matchTitle, playersOf, rank2025 } from "@/lib/data";
import { fmtDateLong, fmtNumber, fmtTime, plural } from "@/lib/format";

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
  const canBuy = !match.score && !home.unconfirmed && !away.unconfirmed;

  const compare: [string, string, string][] = h && a
    ? [
        ["Classement 2025-26", `${rank2025(home.slug)}e`, `${rank2025(away.slug)}e`],
        ["Points", `${h.points}`, `${a.points}`],
        ["Victoires", `${h.won}`, `${a.won}`],
        ["Buts marqués", `${h.goalsFor}`, `${a.goalsFor}`],
        ["Buts encaissés", `${h.goalsAgainst}`, `${a.goalsAgainst}`],
      ]
    : [];

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{ background: `linear-gradient(110deg, ${home.colors[0]} 0%, transparent 45%, transparent 55%, ${away.colors[0]} 100%)` }}
        />
        <div className="container-site relative py-10 sm:py-14">
          <p className="text-center text-xs font-bold tracking-[0.2em] text-yellow uppercase">
            National Foot 1 · Journée {match.round}
            {match.provisional && <span className="ml-2"><DemoTag label="Indicatif" /></span>}
          </p>
          <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            {[home, away].map((club, i) => (
              <div key={club.slug} className={`flex flex-col items-center gap-3 text-center ${i === 1 ? "order-3" : ""}`}>
                <ClubBadge club={club} size={84} />
                {club.unconfirmed ? (
                  <span className="font-display text-2xl font-bold uppercase italic text-faint sm:text-4xl">{club.name}</span>
                ) : (
                  <Link href={`/equipes/${club.slug}`} className="font-display text-2xl font-bold uppercase hover:text-yellow sm:text-4xl">
                    {club.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="order-2 text-center">
              {match.score ? (
                <p className="font-display text-6xl font-extrabold tabular sm:text-8xl">
                  {match.score[0]}<span className="text-faint">–</span>{match.score[1]}
                </p>
              ) : (
                <p className="font-display text-5xl font-extrabold text-yellow tabular sm:text-7xl">{fmtTime(match.kickoff)}</p>
              )}
            </div>
          </div>
          <p className="mt-6 text-center text-muted">
            {fmtDateLong(match.kickoff)} · {stadium ? `${stadium.name}, ${stadium.city}` : "Stade à confirmer"}
          </p>
          {canBuy && (
            <div className="mt-6 flex justify-center">
              <Link href={`/billetterie/${match.id}`} className={buttonClass.yellow}>Acheter des billets</Link>
            </div>
          )}
        </div>
      </header>

      <div className="container-site grid gap-8 py-10 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 font-display text-3xl font-bold uppercase">Face-à-face</h2>
          {compare.length > 0 ? (
            <Card className="divide-y divide-line">
              {compare.map(([label, hv, av]) => (
                <div key={label} className="grid grid-cols-[4rem_1fr_4rem] items-center px-5 py-3 text-center">
                  <span className="font-display text-2xl font-bold tabular">{hv}</span>
                  <span className="text-xs tracking-wider text-faint uppercase">{label}</span>
                  <span className="font-display text-2xl font-bold tabular">{av}</span>
                </div>
              ))}
            </Card>
          ) : (
            <Notice>Pas de comparaison disponible : l&apos;un des deux clubs n&apos;était pas en National Foot 1 la saison passée.</Notice>
          )}
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-3 font-display text-3xl font-bold uppercase">
            Joueurs à suivre <DemoTag />
          </h2>
          <div className="grid gap-2.5">
            {[home, away].flatMap((club) =>
              playersOf(club.slug)
                .filter((p) => p.position !== "Gardien")
                .slice(0, 2)
                .map((p) => (
                  <Link key={p.id} href={`/joueurs/${p.id}`} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3 hover:border-green/50">
                    <PlayerAvatar player={p} size={44} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{p.name}</p>
                      <p className="text-xs text-faint">{club.name} · {p.position}</p>
                    </div>
                    <p className="text-right text-sm">
                      <span className="font-display text-2xl font-bold text-yellow">{p.goals}</span> <span className="text-faint">{plural(p.goals, "but")}</span>
                    </p>
                  </Link>
                )),
            )}
          </div>
          {stadium?.capacity && (
            <p className="mt-4 text-sm text-faint">
              Capacité du stade : {fmtNumber(stadium.capacity)} places.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
