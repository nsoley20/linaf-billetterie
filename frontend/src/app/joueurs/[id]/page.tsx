import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlayerAvatar } from "@/components/player-card";
import { Card, ClubBadge, DemoTag, Eyebrow, SectionTitle } from "@/components/ui";
import { PLAYERS } from "@/data/players";
import { findPlayer, getClub, playersOf, topBy } from "@/lib/data";
import { plural } from "@/lib/format";

export const generateStaticParams = () => PLAYERS.map((p) => ({ id: p.id }));

export async function generateMetadata({ params }: PageProps<"/joueurs/[id]">): Promise<Metadata> {
  return { title: findPlayer((await params).id)?.name ?? "Joueur" };
}

export default async function PlayerPage({ params }: PageProps<"/joueurs/[id]">) {
  const player = findPlayer((await params).id);
  if (!player) notFound();
  const club = getClub(player.club);
  const scorerRank = topBy("goals", PLAYERS.length).findIndex((p) => p.id === player.id) + 1;
  const teammates = playersOf(club.slug).filter((p) => p.id !== player.id);

  const stats: [string, string][] = [
    ["Matchs", String(player.apps)],
    ["Buts", String(player.goals)],
    ["Passes déc.", String(player.assists)],
    ["Note moy.", player.rating.toFixed(1)],
  ];
  const perMatch = player.apps ? ((player.goals + player.assists) / player.apps).toFixed(2) : "0";

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="absolute inset-0 opacity-50" style={{ background: `radial-gradient(70% 120% at 100% 0%, ${club.colors[0]}, transparent 70%)` }} />
        <div className="container-site relative flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:py-14">
          <PlayerAvatar player={player} size={120} />
          <div className="min-w-0">
            <Eyebrow>
              #{player.number} · {player.position}
            </Eyebrow>
            <h1 className="mt-2 font-display text-5xl leading-none font-extrabold uppercase sm:text-7xl">{player.name}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-muted">
              <ClubBadge club={club} size={20} />
              <Link href={`/equipes/${club.slug}`} className="hover:text-yellow">{club.name}</Link>
              <span>· {player.age} ans · {player.nationality}</span>
              <DemoTag />
            </p>
          </div>
        </div>
      </header>

      <div className="container-site space-y-12 py-10">
        <section>
          <SectionTitle title="Saison 2025-26" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(([label, value]) => (
              <Card key={label} className="p-5 text-center">
                <p className="font-display text-5xl font-extrabold text-yellow tabular">{value}</p>
                <p className="mt-1 text-xs tracking-wider text-faint uppercase">{label}</p>
              </Card>
            ))}
          </div>
          <p className="mt-3 text-sm text-faint">
            {player.goals > 0 && `${scorerRank}e au classement des buteurs · `}
            {perMatch} but ou passe décisive par match.
          </p>
        </section>

        {teammates.length > 0 && (
          <section>
            <SectionTitle title={`Coéquipiers à ${club.name}`} href={`/equipes/${club.slug}`} linkLabel="Fiche du club" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {teammates.map((p) => (
                <Link key={p.id} href={`/joueurs/${p.id}`} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 hover:border-green/50">
                  <PlayerAvatar player={p} size={44} />
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs text-faint">{p.position} · {p.goals} {plural(p.goals, "but")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
