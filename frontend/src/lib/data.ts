import { CLUBS, NF1_2026_27, STADIUMS } from "@/data/clubs";
import { FIXTURES_2026_27 } from "@/data/fixtures-2026-27";
import { PLAYERS } from "@/data/players";
import { STANDINGS_2025_26 } from "@/data/standings-2025-26";
import type { Club, Match, Player } from "@/data/types";
import { computeStandings } from "./standings";

export const getClub = (slug: string): Club => {
  const club = CLUBS.find((c) => c.slug === slug);
  if (!club) throw new Error(`Club inconnu : ${slug}`);
  return club;
};

export const findClub = (slug: string) => CLUBS.find((c) => c.slug === slug);
export const getStadium = (id?: string) => STADIUMS.find((s) => s.id === id);
export const findMatch = (id: string) => FIXTURES_2026_27.find((m) => m.id === id);
export const findPlayer = (id: string) => PLAYERS.find((p) => p.id === id);

export const currentClubs = () => NF1_2026_27.map(getClub);

export const currentStandings = () => computeStandings(NF1_2026_27, FIXTURES_2026_27);
export const seasonStarted = () => FIXTURES_2026_27.some((m) => m.score);

/** Rang final 2025-26 (1-based) ou undefined si le club n'était pas en NF1. */
export const rank2025 = (slug: string) => {
  const i = STANDINGS_2025_26.findIndex((r) => r.club === slug);
  return i === -1 ? undefined : i + 1;
};

export const upcomingMatches = (now = Date.now()) =>
  FIXTURES_2026_27.filter((m) => !m.score && Date.parse(m.kickoff) > now).sort((a, b) =>
    a.kickoff.localeCompare(b.kickoff),
  );

export const playedMatches = () =>
  FIXTURES_2026_27.filter((m) => m.score).sort((a, b) => b.kickoff.localeCompare(a.kickoff));

export const matchesOf = (slug: string) =>
  FIXTURES_2026_27.filter((m) => m.home === slug || m.away === slug);

export const playersOf = (slug: string) => PLAYERS.filter((p) => p.club === slug);

export const topBy = (key: "goals" | "assists" | "rating", n = 10): Player[] =>
  [...PLAYERS].sort((a, b) => b[key] - a[key] || b.apps - a.apps).slice(0, n);

export const rounds = () => [...new Set(FIXTURES_2026_27.map((m) => m.round))].sort((a, b) => a - b);

export const matchTitle = (m: Match) => `${getClub(m.home).name} – ${getClub(m.away).name}`;
