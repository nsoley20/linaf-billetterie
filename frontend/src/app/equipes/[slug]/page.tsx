import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MatchList, MatchRow } from "@/components/match-row";
import { PlayerAvatar } from "@/components/player-card";
import { StandingsTable } from "@/components/standings-table";
import { Card, ClubBadge, DemoTag, Notice, SectionTitle } from "@/components/ui";
import { CLUBS, NF1_2026_27 } from "@/data/clubs";
import { STANDINGS_2025_26 } from "@/data/standings-2025-26";
import { findClub, getStadium, matchesOf, playersOf, rank2025 } from "@/lib/data";
import { fmtNumber, fmtSigned, plural } from "@/lib/format";

export const generateStaticParams = () => CLUBS.filter((c) => !c.unconfirmed).map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: PageProps<"/equipes/[slug]">): Promise<Metadata> {
  return { title: findClub((await params).slug)?.name ?? "Club" };
}

export default async function ClubPage({ params }: PageProps<"/equipes/[slug]">) {
  const club = findClub((await params).slug);
  if (!club || club.unconfirmed) notFound();

  const stadium = getStadium(club.stadiumId);
  const rank = rank2025(club.slug);
  const row = STANDINGS_2025_26.find((r) => r.club === club.slug);
  const inNf1 = NF1_2026_27.includes(club.slug);
  const matches = matchesOf(club.slug);
  const squad = playersOf(club.slug);

  // Extrait du classement 2025-26 autour du club.
  const idx = rank ? rank - 1 : 0;
  const start = Math.max(0, Math.min(idx - 2, STANDINGS_2025_26.length - 5));
  const excerpt = STANDINGS_2025_26.slice(start, start + 5);

  const facts: [string, string][] = [
    ["Ville", club.city],
    ["Stade", stadium?.name ?? "À confirmer"],
    ["Capacité", stadium?.capacity ? `${fmtNumber(stadium.capacity)} places` : "Non renseignée"],
    ["Saison 2026-27", inNf1 ? "National Foot 1" : "National Foot 2"],
  ];

  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="h-2" style={{ background: club.colors[0] }} />
        <div className="container-site flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:py-10">
          <ClubBadge club={club} size={120} />
          <div className="min-w-0">
            <p className="text-sm font-medium text-pelouse">{inNf1 ? "National Foot 1" : "Relégué en National Foot 2"}</p>
            <h1 className="font-display text-5xl leading-none font-black uppercase sm:text-7xl">{club.name}</h1>
            <p className="mt-2 text-muted">
              {club.city}
              {stadium ? ` · ${stadium.name}` : ""}
            </p>
          </div>
          {row && (
            <dl className="flex gap-6 sm:ml-auto sm:text-right">
              {[
                ["2025-26", `${rank}e`],
                ["Points", String(row.points)],
                ["Diff.", fmtSigned(row.goalsFor - row.goalsAgainst)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-faint">{k}</dt>
                  <dd className="font-display text-4xl font-extrabold tabular">{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      <div className="container-site space-y-12 py-8">
        {club.note && <Notice>{club.note}</Notice>}

        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <section>
            <SectionTitle title="Fiche" />
            <Card>
              <dl>
                {facts.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-line px-5 py-3 text-sm last:border-0">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </section>
          {row && (
            <section>
              <SectionTitle title="Saison 2025-26" href="/classement?saison=2025-26" linkLabel="Classement complet" />
              <StandingsTable rows={excerpt} startRank={start + 1} compact zones={[]} highlight={club.slug} />
              <p className="mt-2 text-sm text-muted">
                {row.won} victoires, {row.drawn} nuls, {row.lost} défaites. {row.goalsFor} buts marqués, {row.goalsAgainst} encaissés.
              </p>
            </section>
          )}
        </div>

        {matches.length > 0 && (
          <section>
            <SectionTitle title="Prochains matchs" href="/matchs" linkLabel="Calendrier complet" />
            <MatchList>
              {matches.map((m) => (
                <MatchRow key={m.id} match={m} />
              ))}
            </MatchList>
          </section>
        )}

        <section>
          <SectionTitle title="Joueurs" extra={<DemoTag />} />
          {squad.length > 0 ? (
            <Card>
              {squad.map((p) => (
                <Link key={p.id} href={`/joueurs/${p.id}`} className="flex items-center gap-4 border-b border-line px-5 py-3 last:border-0 hover:bg-surface-2">
                  <span className="w-8 font-display text-2xl font-bold text-faint tabular">{p.number}</span>
                  <PlayerAvatar player={p} size={40} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{p.name}</span>
                    <span className="block text-xs text-faint">
                      {p.position} · {p.age} ans
                    </span>
                  </span>
                  <span className="text-right text-sm text-muted">
                    {p.goals} {plural(p.goals, "but")}
                    <br />
                    {p.assists} {plural(p.assists, "passe")}
                  </span>
                </Link>
              ))}
            </Card>
          ) : (
            <Notice>Effectif à venir.</Notice>
          )}
        </section>
      </div>
    </>
  );
}
