import type { Match, StandingRow } from "@/data/types";

type Result = "V" | "N" | "D";

/** Tri officiel simplifié : points → différence de buts → buts marqués → nom. */
export function sortStandings(rows: StandingRow[]): StandingRow[] {
  return [...rows].sort(
    (a, b) =>
      b.points - a.points ||
      b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst) ||
      b.goalsFor - a.goalsFor ||
      a.club.localeCompare(b.club),
  );
}

/** Calcule le classement à partir des matchs joués (ceux qui ont un score). */
export function computeStandings(clubs: string[], matches: Match[]): StandingRow[] {
  const rows = new Map<string, StandingRow & { results: Result[] }>(
    clubs.map((club) => [
      club,
      { club, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, results: [] },
    ]),
  );

  const played = matches
    .filter((m) => m.score)
    .sort((a, b) => a.kickoff.localeCompare(b.kickoff));

  for (const match of played) {
    const [hg, ag] = match.score!;
    const sides: [string, number, number][] = [
      [match.home, hg, ag],
      [match.away, ag, hg],
    ];
    for (const [club, scored, conceded] of sides) {
      const row = rows.get(club);
      if (!row) continue;
      row.played++;
      row.goalsFor += scored;
      row.goalsAgainst += conceded;
      if (scored > conceded) {
        row.won++;
        row.points += 3;
        row.results.push("V");
      } else if (scored === conceded) {
        row.drawn++;
        row.points += 1;
        row.results.push("N");
      } else {
        row.lost++;
        row.results.push("D");
      }
    }
  }

  return sortStandings(
    [...rows.values()].map(({ results, ...row }) => ({ ...row, form: results.slice(-5) })),
  );
}

export const goalDiff = (r: StandingRow) => r.goalsFor - r.goalsAgainst;
