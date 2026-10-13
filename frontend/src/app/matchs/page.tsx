import type { Metadata } from "next";
import { MatchRow } from "@/components/match-row";
import { MatchesBrowser } from "@/components/matches-browser";
import { Notice, PageHeader } from "@/components/ui";
import { FIXTURES_2026_27, SEASON_2026_27 } from "@/data/fixtures-2026-27";
import { currentClubs } from "@/lib/data";

export const metadata: Metadata = { title: "Calendrier & résultats" };

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

  return (
    <>
      <PageHeader eyebrow={`National Foot 1 · ${SEASON_2026_27.label}`} title="Calendrier & résultats">
        Toutes les rencontres, journée par journée. Les scores s&apos;affichent dès la fin des matchs.
      </PageHeader>
      <div className="container-site py-10">
        <div className="mb-8">
          <Notice>
            Calendrier indicatif des {Math.max(...FIXTURES_2026_27.map((m) => m.round))} premières journées, en attendant la publication
            officielle de la LINAFP. Reprise annoncée le samedi 24 octobre 2026 (
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
