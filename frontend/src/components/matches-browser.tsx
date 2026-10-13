"use client";

import { useState } from "react";
import { MatchList } from "./match-row";

export type BrowserItem = { id: string; round: number; clubs: string[]; node: React.ReactNode };

/** Filtre par club du calendrier (les lignes de match sont rendues côté serveur). */
export function MatchesBrowser({ items, clubs }: { items: BrowserItem[]; clubs: { slug: string; name: string }[] }) {
  const [club, setClub] = useState("");
  const visible = club ? items.filter((i) => i.clubs.includes(club)) : items;
  const rounds = [...new Set(visible.map((i) => i.round))];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <label htmlFor="club-filter" className="text-sm font-semibold">
          Club
        </label>
        <select
          id="club-filter"
          value={club}
          onChange={(e) => setClub(e.target.value)}
          className="rounded-md border border-line-strong bg-surface px-3 py-2 text-sm"
        >
          <option value="">Tous les clubs</option>
          {clubs.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-10">
        {rounds.map((round) => (
          <section key={round} aria-labelledby={`j${round}`}>
            <h2 id={`j${round}`} className="mb-3 font-display text-3xl font-bold">
              Journée {round}
            </h2>
            <MatchList>
              {visible
                .filter((i) => i.round === round)
                .map((i) => (
                  <div key={i.id} className="border-b border-line last:border-0">
                    {i.node}
                  </div>
                ))}
            </MatchList>
          </section>
        ))}
      </div>
    </div>
  );
}
