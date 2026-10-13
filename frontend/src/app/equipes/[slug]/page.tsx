import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MatchRow } from "@/components/match-row";
import { PlayerAvatar } from "@/components/player-card";
import { StandingsTable } from "@/components/standings-table";
import { Card, ClubBadge, DemoTag, Eyebrow, Notice, SectionTitle } from "@/components/ui";
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
    ["Capacité", stadium?.capacity ? `${fmtNumber(stadium.capacity)} places` : "—"],
    ["Saison 2026-27", inNf1 ? "National Foot 1" : "National Foot 2"],
  ];

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="absolute inset-0 opacity-50" style={{ background: `radial-gradient(70% 120% at 0% 0%, ${club.colors[0]}, transparent 70%)` }} />
        <div className="container-site relative flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:py-14">
          <ClubBadge club={club} size={110} />
          <div>
            <Eyebrow>{inNf1 ? "National Foot 1" : "Relégué en National Foot 2"}</Eyebrow>
            <h1 className="mt-2 font-display text-5xl leading-none font-extrabold uppercase sm:text-7xl">{club.name}</h1>
            <p className="mt-2 text-muted">{club.city}{stadium ? ` · ${stadium.name}` : ""}</p>
          </div>
          {row && (
            <div className="grid grid-cols-3 gap-2 sm:ml-auto">
              {[
                [`${rank}e`, "2025-26"],
                [String(row.points), "points"],
                [fmtSigned(row.goalsFor - row.goalsAgainst), "diff."],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl border border-line bg-black/30 px-4 py-3 text-center">
                  <p className="font-display text-3xl font-extrabold text-yellow">{v}</p>
                  <p className="text-[10px] tracking-wider text-faint uppercase">{l}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="container-site space-y-14 py-10">
        {club.note && <Notice>{club.note}</Notice>}

        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <section>
            <SectionTitle title="Fiche du club" />
            <Card className="divide-y divide-line">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-3 text-sm">
                  <span className="text-faint">{k}</span>
                  <span className="text-right font-semibold">{v}</span>
                </div>
              ))}
            </Card>
          </section>
          {row && (
            <section>
              <SectionTitle title="Saison 2025-26" href="/classement?saison=2025-26" linkLabel="Classement complet" />
              <StandingsTable rows={excerpt} startRank={start + 1} compact zones={[]} highlight={club.slug} />
              <p className="mt-2 text-xs text-faint">
                Bilan : {row.won} victoires, {row.drawn} nuls, {row.lost} défaites · {row.goalsFor} buts marqués, {row.goalsAgainst} encaissés.
              </p>
            </section>
          )}
        </div>

        {matches.length > 0 && (
          <section>
            <SectionTitle title="Calendrier" href="/matchs" linkLabel="Tous les matchs" />
            <div className="grid gap-2.5">
              {matches.map((m) => (
                <MatchRow key={m.id} match={m} />
              ))}
            </div>
          </section>
        )}

        <section>
          <SectionTitle title="Joueurs clés" extra={<DemoTag />} />
          {squad.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {squad.map((p) => (
                <Link key={p.id} href={`/joueurs/${p.id}`} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 hover:border-green/50">
                  <PlayerAvatar player={p} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-xl font-bold uppercase">{p.name}</p>
                    <p className="text-xs text-faint">#{p.number} · {p.position} · {p.age} ans</p>
                  </div>
                  <div className="text-right text-xs text-faint">
                    <p><span className="font-display text-xl font-bold text-fg">{p.goals}</span> {plural(p.goals, "but")}</p>
                    <p>{p.assists} {plural(p.assists, "passe")}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Notice>Effectif à venir.</Notice>
          )}
        </section>
      </div>
    </>
  );
}
