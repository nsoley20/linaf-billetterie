import type { Metadata } from "next";
import Link from "next/link";
import { AwardCard, PlayerAvatar } from "@/components/player-card";
import { Card, ClubBadge, Notice, PageHeader, SectionTitle } from "@/components/ui";
import { AWARDS } from "@/data/players";
import type { Player } from "@/data/types";
import { findPlayer, getClub, topBy } from "@/lib/data";
import { plural } from "@/lib/format";

export const metadata: Metadata = { title: "Joueurs & statistiques" };

function Leaderboard({ title, players, value, unit }: { title: string; players: Player[]; value: (p: Player) => string; unit: (p: Player) => string }) {
  return (
    <Card className="overflow-hidden">
      <h3 className="border-b border-line px-5 py-4 font-display text-2xl font-bold uppercase">{title}</h3>
      <ol>
        {players.map((p, i) => {
          const club = getClub(p.club);
          return (
            <li key={p.id} className="border-b border-line last:border-0">
              <Link href={`/joueurs/${p.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.03]">
                <span className={`w-5 font-display text-lg font-bold ${i === 0 ? "text-yellow" : "text-faint"}`}>{i + 1}</span>
                <PlayerAvatar player={p} size={36} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{p.name}</p>
                  <p className="flex items-center gap-1 truncate text-xs text-faint">
                    <ClubBadge club={club} size={12} /> {club.name}
                  </p>
                </div>
                <p className="text-right">
                  <span className="font-display text-2xl font-extrabold tabular">{value(p)}</span>
                  <span className="ml-1 text-xs text-faint">{unit(p)}</span>
                </p>
              </Link>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

export default function JoueursPage() {
  const potS = findPlayer(AWARDS.playerOfSeason)!;
  const potM = findPlayer(AWARDS.playerOfMonth.player)!;
  const gk = findPlayer(AWARDS.goalkeeperOfSeason)!;
  const young = findPlayer(AWARDS.youngPlayer)!;
  const scorer = topBy("goals", 1)[0];

  return (
    <>
      <PageHeader eyebrow="National Foot 1 · Saison 2025-2026" title="Joueurs & stats">
        Meilleur joueur, buteurs, passeurs et notes de la saison.
      </PageHeader>
      <div className="container-site space-y-14 py-10">
        <Notice>
          Les joueurs et statistiques affichés ici sont des <strong className="text-fg">exemples</strong> : les statistiques officielles
          individuelles de la saison 2025-26 ne sont pas encore intégrées. Ils sont faciles à remplacer dans{" "}
          <code className="rounded bg-white/10 px-1">src/data/players.ts</code>.
        </Notice>

        <section>
          <SectionTitle title="Les distinctions" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AwardCard title="Meilleur joueur" player={potS} stat={potS.rating.toFixed(1)} statLabel="note moyenne" />
            <AwardCard title="Soulier d'or" player={scorer} stat={String(scorer.goals)} statLabel="buts" />
            <AwardCard title="Joueur du mois" subtitle={AWARDS.playerOfMonth.month} player={potM} stat={potM.rating.toFixed(1)} statLabel="note moyenne" />
            <AwardCard title="Meilleur gardien" player={gk} stat={String(gk.apps)} statLabel="matchs joués" />
            <AwardCard title="Meilleur espoir" player={young} stat={`${young.age} ans`} statLabel={`${young.goals} ${plural(young.goals, "but")}, ${young.assists} ${plural(young.assists, "passe")}`} />
          </div>
        </section>

        <section>
          <SectionTitle title="Classements individuels" />
          <div className="grid gap-4 lg:grid-cols-3">
            <Leaderboard title="Buteurs" players={topBy("goals", 8)} value={(p) => String(p.goals)} unit={(p) => plural(p.goals, "but")} />
            <Leaderboard title="Passeurs" players={topBy("assists", 8)} value={(p) => String(p.assists)} unit={(p) => plural(p.assists, "passe")} />
            <Leaderboard title="Notes" players={topBy("rating", 8)} value={(p) => p.rating.toFixed(1)} unit={() => "/10"} />
          </div>
        </section>
      </div>
    </>
  );
}
