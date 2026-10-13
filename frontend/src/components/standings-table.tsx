import type { StandingRow } from "@/data/types";
import { getClub } from "@/lib/data";
import { fmtSigned } from "@/lib/format";
import { goalDiff } from "@/lib/standings";
import { ClubBadge, ClubName } from "./ui";

export type Zone = { from: number; to: number; label: string; color: string };

/** Zones de la saison 2025-26 (Wikipédia) : C1, C3, relégation. */
export const ZONES_NF1: Zone[] = [
  { from: 1, to: 1, label: "Ligue des champions CAF", color: "var(--color-green-2)" },
  { from: 2, to: 2, label: "Coupe de la Confédération CAF", color: "var(--color-blue)" },
  { from: 13, to: 14, label: "Relégation en National Foot 2", color: "var(--color-red)" },
];

const FORM_STYLE = { V: "bg-green text-white", N: "bg-white/15 text-fg", D: "bg-red/80 text-white" } as const;

/** `startRank` permet d'afficher un extrait (ex. lignes 4 à 8) avec les vrais rangs. */
export function StandingsTable({ rows, zones = ZONES_NF1, compact = false, highlight, startRank = 1 }: { rows: StandingRow[]; zones?: Zone[]; compact?: boolean; highlight?: string; startRank?: number }) {
  const zoneOf = (rank: number) => zones.find((z) => rank >= z.from && rank <= z.to);
  const showForm = !compact && rows.some((r) => r.form && r.form.length > 0);

  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full min-w-[20rem] text-sm tabular">
          <caption className="sr-only">Classement</caption>
          <thead>
            <tr className="border-b border-line text-left text-[11px] tracking-wider text-faint uppercase">
              <th scope="col" className="w-10 py-3 pl-4">#</th>
              <th scope="col" className="py-3">Club</th>
              <th scope="col" className="px-2 text-center" title="Matchs joués">J</th>
              {!compact && (
                <>
                  <th scope="col" className="hidden px-2 text-center sm:table-cell" title="Victoires">G</th>
                  <th scope="col" className="hidden px-2 text-center sm:table-cell" title="Nuls">N</th>
                  <th scope="col" className="hidden px-2 text-center sm:table-cell" title="Défaites">P</th>
                  <th scope="col" className="hidden px-2 text-center md:table-cell" title="Buts pour : buts contre">Buts</th>
                </>
              )}
              <th scope="col" className="px-2 text-center" title="Différence de buts">Diff</th>
              <th scope="col" className="px-3 text-center text-fg">Pts</th>
              {showForm && <th scope="col" className="hidden pr-4 lg:table-cell">Forme</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const rank = startRank + i;
              const club = getClub(row.club);
              const zone = zoneOf(rank);
              return (
                <tr key={row.club} className={`border-b border-line last:border-0 hover:bg-white/[0.03] ${highlight === row.club ? "bg-yellow/[0.07]" : ""}`}>
                  <td className="relative py-2.5 pl-4 font-display text-lg font-bold text-muted">
                    {zone && <span aria-hidden className="absolute inset-y-1.5 left-0 w-1 rounded-r" style={{ background: zone.color }} />}
                    {rank}
                  </td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <ClubBadge club={club} size={24} />
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
                  <td className="px-3 text-center font-display text-lg font-extrabold">{row.points}</td>
                  {showForm && (
                    <td className="hidden pr-4 lg:table-cell">
                      <div className="flex gap-1">
                        {row.form?.map((f, k) => (
                          <span key={k} className={`grid size-5 place-items-center rounded text-[10px] font-bold ${FORM_STYLE[f]}`}>{f}</span>
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
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-faint">
          {zones.map((z) => (
            <li key={z.label} className="flex items-center gap-2">
              <span className="h-3 w-1 rounded" style={{ background: z.color }} />
              {z.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
