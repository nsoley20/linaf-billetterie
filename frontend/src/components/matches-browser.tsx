"use client";

import { useState } from "react";

export type BrowserItem = { id: string; round: number; clubs: string[]; node: React.ReactNode };

/** Filtre par club du calendrier (les lignes de match sont rendues côté serveur). */
export function MatchesBrowser({ items, clubs }: { items: BrowserItem[]; clubs: { slug: string; name: string }[] }) {
  const [club, setClub] = useState("");
  const visible = club ? items.filter((i) => i.clubs.includes(club)) : items;
  const rounds = [...new Set(visible.map((i) => i.round))];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <label htmlFor="club-filter" className="text-sm text-muted">
          Filtrer par club
        </label>
        <select
          id="club-filter"
          value={club}
          onChange={(e) => setClub(e.target.value)}
          className="rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm"
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
            <h2 id={`j${round}`} className="mb-3 font-display text-2xl font-bold uppercase">
              Journée <span className="text-yellow">{round}</span>
            </h2>
            <div className="grid gap-2.5">
              {visible.filter((i) => i.round === round).map((i) => (
                <div key={i.id}>{i.node}</div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
