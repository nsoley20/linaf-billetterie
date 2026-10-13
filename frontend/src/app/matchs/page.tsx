import type { Metadata } from "next";
import { MatchRow } from "@/components/match-row";
import { MatchesBrowser } from "@/components/matches-browser";
import { Notice, PageHeader } from "@/components/ui";
import { FIXTURES_2026_27, SEASON_2026_27 } from "@/data/fixtures-2026-27";
import { currentClubs } from "@/lib/data";

export const metadata: Metadata = { title: "Calendrier et résultats" };

export default function MatchsPage() {
  const items = FIXTURES_2026_27.map((m) => ({
    id: m.id,
    round: m.round,
    clubs: [m.home, m.away],
    node: <MatchRow match={m} />,
  }));
  const clubs = currentClubs()
    .filter((c) => !c.unconfirmed)
    .map(({ slug, name }) => ({ slug, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const lastRound = Math.max(...FIXTURES_2026_27.map((m) => m.round));

  return (
    <>
      <PageHeader kicker={`National Foot 1 · ${SEASON_2026_27.label}`} title="Calendrier">
        Les scores apparaissent ici à la fin de chaque match.
      </PageHeader>
      <div className="container-site py-8">
        <div className="mb-8">
          <Notice>
            Journées 1 à {lastRound} : affiches et horaires indicatifs, en attendant le calendrier officiel de la LINAFP. Reprise prévue le
            samedi 24 octobre 2026 (
            <a href={SEASON_2026_27.source.url} target="_blank" rel="noreferrer" className="underline hover:text-fg">
              source
            </a>
            ).
          </Notice>
        </div>
        <MatchesBrowser items={items} clubs={clubs} />
      </div>
    </>
  );
}
