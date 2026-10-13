import type { Metadata } from "next";
import { StandingsTable } from "@/components/standings-table";
import { Tabs } from "@/components/tabs";
import { Card, ClubBadge, Notice, PageHeader } from "@/components/ui";
import { SEASON_2026_27 } from "@/data/fixtures-2026-27";
import { SEASON_2025_26_SOURCE, STANDINGS_2025_26 } from "@/data/standings-2025-26";
import type { StandingRow } from "@/data/types";
import { currentStandings, getClub, seasonStarted } from "@/lib/data";
import { fmtDateLong } from "@/lib/format";

export const metadata: Metadata = { title: "Classement" };

function Record({ label, value, club }: { label: string; value: string; club: string }) {
  const c = getClub(club);
  return (
    <Card className="p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl font-extrabold">{value}</p>
      <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
        <ClubBadge club={c} size={20} />
        {c.name}
      </p>
    </Card>
  );
}

export default function ClassementPage() {
  const started = seasonStarted();
  const rows = STANDINGS_2025_26;
  const top = (f: (r: StandingRow) => number) => [...rows].sort((a, b) => f(b) - f(a))[0];
  const attack = top((r) => r.goalsFor);
  const defense = top((r) => -r.goalsAgainst);
  const wins = top((r) => r.won);
  const draws = top((r) => r.drawn);

  const current = (
    <div className="space-y-4">
      {!started && (
        <Notice>
          La saison commence le {fmtDateLong(`${SEASON_2026_27.start}T12:00:00Z`).toLowerCase()}. Le tableau se remplit après chaque
          journée.
        </Notice>
      )}
      <StandingsTable rows={currentStandings()} zones={started ? undefined : []} />
    </div>
  );

  const previous = (
    <div className="space-y-10">
      <div>
        <StandingsTable rows={STANDINGS_2025_26} />
        <p className="mt-3 text-xs text-faint">
          Source :{" "}
          <a href={SEASON_2025_26_SOURCE.url} className="underline hover:text-fg" target="_blank" rel="noreferrer">
            {SEASON_2025_26_SOURCE.label}
          </a>
          , mise à jour du {SEASON_2025_26_SOURCE.updated}.
        </p>
      </div>
      <section>
        <h2 className="mb-4 font-display text-3xl font-bold">Records de la saison</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Record label="Meilleure attaque" value={`${attack.goalsFor} buts`} club={attack.club} />
          <Record label="Meilleure défense" value={`${defense.goalsAgainst} encaissés`} club={defense.club} />
          <Record label="Plus de victoires" value={String(wins.won)} club={wins.club} />
          <Record label="Plus de nuls" value={String(draws.drawn)} club={draws.club} />
        </div>
      </section>
    </div>
  );

  return (
    <>
      <PageHeader kicker="National Foot 1" title="Classement">
        3 points pour une victoire, 1 pour un nul. En cas d&apos;égalité : différence de buts, puis buts marqués.
      </PageHeader>
      <div className="container-site py-8">
        <Tabs
          param="saison"
          defaultId={started ? "2026-27" : "2025-26"}
          tabs={[
            { id: "2026-27", label: "2026-2027", content: current },
            { id: "2025-26", label: "2025-2026", content: previous },
          ]}
        />
      </div>
    </>
  );
}
