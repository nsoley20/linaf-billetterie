import type { Metadata } from "next";
import { StandingsTable } from "@/components/standings-table";
import { Tabs } from "@/components/tabs";
import { Card, ClubBadge, Notice, PageHeader } from "@/components/ui";
import { SEASON_2026_27 } from "@/data/fixtures-2026-27";
import { SEASON_2025_26_SOURCE, STANDINGS_2025_26 } from "@/data/standings-2025-26";
import { currentStandings, getClub, seasonStarted } from "@/lib/data";
import { fmtDateLong } from "@/lib/format";

export const metadata: Metadata = { title: "Classement" };

function Stat({ label, value, club }: { label: string; value: string; club: string }) {
  const c = getClub(club);
  return (
    <Card className="p-4">
      <p className="text-xs tracking-wider text-faint uppercase">{label}</p>
      <div className="mt-2 flex items-center gap-2">
        <ClubBadge club={c} size={22} />
        <span className="truncate text-sm font-semibold">{c.name}</span>
      </div>
      <p className="mt-1 font-display text-3xl font-extrabold text-yellow">{value}</p>
    </Card>
  );
}

export default function ClassementPage() {
  const started = seasonStarted();
  const rows = STANDINGS_2025_26;
  const best = (f: (r: (typeof rows)[number]) => number, dir = 1) => [...rows].sort((a, b) => dir * (f(b) - f(a)))[0];
  const attack = best((r) => r.goalsFor);
  const defense = best((r) => r.goalsAgainst, -1);
  const wins = best((r) => r.won);
  const draws = best((r) => r.drawn);

  const current = (
    <div className="space-y-4">
      {!started && (
        <Notice>
          La saison 2026-27 débute le {fmtDateLong(`${SEASON_2026_27.start}T12:00:00Z`).toLowerCase()}. Le classement se mettra à jour
          automatiquement après chaque journée.
        </Notice>
      )}
      <StandingsTable rows={currentStandings()} zones={started ? undefined : []} />
    </div>
  );

  const previous = (
    <div className="space-y-8">
      <StandingsTable rows={STANDINGS_2025_26} />
      <p className="text-xs text-faint">
        Source :{" "}
        <a href={SEASON_2025_26_SOURCE.url} className="underline hover:text-fg" target="_blank" rel="noreferrer">
          {SEASON_2025_26_SOURCE.label}
        </a>{" "}
        (mise à jour du {SEASON_2025_26_SOURCE.updated}).
      </p>
      <div>
        <h2 className="mb-4 font-display text-3xl font-bold uppercase">Les records de la saison</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Meilleure attaque" value={`${attack.goalsFor} buts`} club={attack.club} />
          <Stat label="Meilleure défense" value={`${defense.goalsAgainst} encaissés`} club={defense.club} />
          <Stat label="Plus de victoires" value={`${wins.won}`} club={wins.club} />
          <Stat label="Plus de nuls" value={`${draws.drawn}`} club={draws.club} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <PageHeader eyebrow="National Foot 1" title="Classement">
        Points, différence de buts et forme du moment. 3 points la victoire, 1 point le nul.
      </PageHeader>
      <div className="container-site py-10">
        <Tabs
          param="saison"
          defaultId={started ? "2026-27" : "2025-26"}
          tabs={[
            { id: "2026-27", label: "2026-2027", content: current },
            { id: "2025-26", label: "2025-2026 (final)", content: previous },
          ]}
        />
      </div>
    </>
  );
}
