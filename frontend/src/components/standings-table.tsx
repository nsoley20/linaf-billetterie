import type { StandingRow } from "@/data/types";
import { getClub } from "@/lib/data";
import { fmtSigned } from "@/lib/format";
import { goalDiff } from "@/lib/standings";
import { ClubBadge, ClubName } from "./ui";

export type Zone = { from: number; to: number; label: string; color: string };

/** Zones de la saison 2025-26 (Wikipédia) : C1, C3, relégation. */
export const ZONES_NF1: Zone[] = [
  { from: 1, to: 1, label: "Ligue des champions CAF", color: "var(--color-pelouse)" },
  { from: 2, to: 2, label: "Coupe de la Confédération CAF", color: "var(--color-lagune)" },
  { from: 13, to: 14, label: "Relégation en National Foot 2", color: "var(--color-alerte)" },
];

const FORM_STYLE = { V: "bg-pelouse text-white", N: "bg-line-strong text-fg", D: "bg-alerte text-white" } as const;
const FORM_LABEL = { V: "victoire", N: "nul", D: "défaite" } as const;

/** `startRank` permet d'afficher un extrait (ex. lignes 4 à 8) avec les vrais rangs. */
export function StandingsTable({ rows, zones = ZONES_NF1, compact = false, highlight, startRank = 1 }: { rows: StandingRow[]; zones?: Zone[]; compact?: boolean; highlight?: string; startRank?: number }) {
  const zoneOf = (rank: number) => zones.find((z) => rank >= z.from && rank <= z.to);
  const showForm = !compact && rows.some((r) => r.form && r.form.length > 0);

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-line bg-surface">
        <table className="w-full min-w-[20rem] text-sm tabular">
          <caption className="sr-only">Classement</caption>
          <thead>
            <tr className="border-b border-line bg-surface-2 text-left text-xs text-faint">
              <th scope="col" className="w-12 py-2.5 pl-4 font-medium">Pos.</th>
              <th scope="col" className="py-2.5 font-medium">Club</th>
              <th scope="col" className="px-2 text-center font-medium" title="Matchs joués">J</th>
              {!compact && (
                <>
                  <th scope="col" className="hidden px-2 text-center font-medium sm:table-cell" title="Victoires">G</th>
                  <th scope="col" className="hidden px-2 text-center font-medium sm:table-cell" title="Nuls">N</th>
                  <th scope="col" className="hidden px-2 text-center font-medium sm:table-cell" title="Défaites">P</th>
                  <th scope="col" className="hidden px-2 text-center font-medium md:table-cell" title="Buts marqués : buts encaissés">Buts</th>
                </>
              )}
              <th scope="col" className="px-2 text-center font-medium" title="Différence de buts">Diff.</th>
              <th scope="col" className="px-4 text-center font-semibold text-fg">Pts</th>
              {showForm && <th scope="col" className="hidden pr-4 font-medium lg:table-cell">Forme</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const rank = startRank + i;
              const club = getClub(row.club);
              const zone = zoneOf(rank);
              return (
                <tr key={row.club} className={`border-b border-line last:border-0 ${highlight === row.club ? "bg-soleil/25" : "hover:bg-surface-2"}`}>
                  <td className="relative py-2.5 pl-4 font-display text-lg font-bold">
                    {zone && <span aria-hidden className="absolute inset-y-0 left-0 w-1" style={{ background: zone.color }} />}
                    {rank}
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-2.5">
                      <ClubBadge club={club} size={26} />
                      <ClubName club={club} className="font-semibold" />
                    </div>
                  </td>
                  <td className="px-2 text-center text-muted">{row.played}</td>
                  {!compact && (
                    <>
                      <td className="hidden px-2 text-center text-muted sm:table-cell">{row.won}</td>
                      <td className="hidden px-2 text-center text-muted sm:table-cell">{row.drawn}</td>
                      <td className="hidden px-2 text-center text-muted sm:table-cell">{row.lost}</td>
                      <td className="hidden px-2 text-center text-muted md:table-cell">{row.goalsFor}:{row.goalsAgainst}</td>
                    </>
                  )}
                  <td className="px-2 text-center text-muted">{fmtSigned(goalDiff(row))}</td>
                  <td className="px-4 text-center font-display text-xl font-extrabold">{row.points}</td>
                  {showForm && (
                    <td className="hidden pr-4 lg:table-cell">
                      <div className="flex gap-1">
                        {row.form?.map((f, k) => (
                          <span key={k} title={FORM_LABEL[f]} className={`grid size-5 place-items-center rounded-sm text-[10px] font-bold ${FORM_STYLE[f]}`}>{f}</span>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!compact && zones.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted">
          {zones.map((z) => (
            <li key={z.label} className="flex items-center gap-2">
              <span className="h-3 w-1" style={{ background: z.color }} />
              {z.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
