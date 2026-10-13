import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlayerAvatar } from "@/components/player-card";
import { Card, ClubBadge, DemoTag, SectionTitle } from "@/components/ui";
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
    [plural(player.goals, "But"), String(player.goals)],
    [player.assists >= 2 ? "Passes décisives" : "Passe décisive", String(player.assists)],
    ["Note moyenne", player.rating.toFixed(1)],
  ];
  const perMatch = player.apps ? ((player.goals + player.assists) / player.apps).toFixed(2).replace(".", ",") : "0";

  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="h-2" style={{ background: club.colors[0] }} />
        <div className="container-site flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:py-10">
          <PlayerAvatar player={player} size={112} />
          <div className="min-w-0">
            <p className="text-sm font-medium text-pelouse">
              N° {player.number} · {player.position}
            </p>
            <h1 className="font-display text-5xl leading-none font-black uppercase sm:text-7xl">{player.name}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-muted">
              <ClubBadge club={club} size={22} />
              <Link href={`/equipes/${club.slug}`} className="font-semibold text-fg hover:underline">
                {club.name}
              </Link>
              <span>
                · {player.age} ans · {player.nationality}
              </span>
              <DemoTag />
            </p>
          </div>
        </div>
      </header>

      <div className="container-site space-y-12 py-8">
        <section>
          <SectionTitle title="Saison 2025-26" />
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
            {stats.map(([label, value]) => (
              <div key={label} className="bg-surface p-5">
                <p className="font-display text-5xl font-extrabold tabular">{value}</p>
                <p className="mt-1 text-sm text-muted">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">
            {player.goals > 0 && `${scorerRank}e au classement des buteurs. `}
            {perMatch} but ou passe décisive par match.
          </p>
        </section>

        {teammates.length > 0 && (
          <section>
            <SectionTitle title={`Coéquipiers à ${club.name}`} href={`/equipes/${club.slug}`} linkLabel="Fiche du club" />
            <Card>
              {teammates.map((p) => (
                <Link key={p.id} href={`/joueurs/${p.id}`} className="flex items-center gap-3 border-b border-line px-5 py-3 last:border-0 hover:bg-surface-2">
                  <PlayerAvatar player={p} size={40} />
                  <span className="flex-1">
                    <span className="block font-semibold">{p.name}</span>
                    <span className="block text-xs text-faint">{p.position}</span>
                  </span>
                  <span className="text-sm text-muted">
                    {p.goals} {plural(p.goals, "but")}
                  </span>
                </Link>
              ))}
            </Card>
          </section>
        )}
      </div>
    </>
  );
}
