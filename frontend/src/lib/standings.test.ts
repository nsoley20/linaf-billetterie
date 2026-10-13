import { describe, expect, it } from "vitest";
import type { Match } from "@/data/types";
import { computeStandings, sortStandings } from "./standings";
import { roundRobin } from "./round-robin";

const m = (id: string, round: number, home: string, away: string, score?: [number, number]): Match => ({
  id, season: "t", round, kickoff: `2026-10-${10 + round}T14:30:00.000Z`, home, away, score,
});

describe("computeStandings", () => {
  it("lists every club with zeros when nothing has been played", () => {
    const rows = computeStandings(["a", "b"], [m("1", 1, "a", "b")]);
    expect(rows).toHaveLength(2);
    expect(rows.every((r) => r.played === 0 && r.points === 0)).toBe(true);
  });

  it("awards 3 points for a win, 1 for a draw, 0 for a loss", () => {
    const rows = computeStandings(["a", "b", "c"], [
      m("1", 1, "a", "b", [2, 0]),
      m("2", 2, "b", "c", [1, 1]),
    ]);
    const by = Object.fromEntries(rows.map((r) => [r.club, r]));
    expect(by.a).toMatchObject({ played: 1, won: 1, points: 3, goalsFor: 2, goalsAgainst: 0 });
    expect(by.b).toMatchObject({ played: 2, lost: 1, drawn: 1, points: 1, goalsFor: 1, goalsAgainst: 3 });
    expect(by.c).toMatchObject({ played: 1, drawn: 1, points: 1 });
  });

  it("orders by points, then goal difference, then goals scored", () => {
    const rows = computeStandings(["a", "b", "c", "d"], [
      m("1", 1, "a", "d", [1, 0]), // a: 3 pts, +1
      m("2", 1, "b", "c", [3, 1]), // b: 3 pts, +2
      m("3", 2, "c", "d", [4, 4]), // c et d : 1 pt ; d mieux placé (-1 contre -2)
    ]);
    expect(rows.map((r) => r.club)).toEqual(["b", "a", "d", "c"]);
  });

  it("keeps the last five results in chronological order", () => {
    const matches = [1, 2, 3, 4, 5, 6].map((r) => m(`${r}`, r, "a", "b", r === 1 ? [0, 1] : r % 2 ? [1, 1] : [2, 0]));
    const a = computeStandings(["a", "b"], matches).find((r) => r.club === "a")!;
    expect(a.form).toEqual(["V", "N", "V", "N", "V"]);
  });
});

describe("sortStandings", () => {
  it("breaks full ties alphabetically for a stable order", () => {
    const base = { played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 1 };
    expect(sortStandings([{ club: "z", ...base }, { club: "a", ...base }]).map((r) => r.club)).toEqual(["a", "z"]);
  });
});

describe("roundRobin", () => {
  it("makes every club play exactly once per round and never twice against the same opponent", () => {
    const teams = Array.from({ length: 14 }, (_, i) => `t${i}`);
    const rounds = roundRobin(teams);
    expect(rounds).toHaveLength(13);
    const seen = new Set<string>();
    for (const pairs of rounds) {
      expect(new Set(pairs.flat()).size).toBe(14);
      for (const [h, a] of pairs) {
        const key = [h, a].sort().join("-");
        expect(seen.has(key)).toBe(false);
        seen.add(key);
      }
    }
  });

  it("balances home and away games (6 or 7 home games, never more than 2 in a row)", () => {
    const teams = Array.from({ length: 14 }, (_, i) => `t${i}`);
    const rounds = roundRobin(teams);
    for (const team of teams) {
      const homeFlags = rounds.map((pairs) => pairs.some(([h]) => h === team));
      const homeCount = homeFlags.filter(Boolean).length;
      expect(homeCount, team).toBeGreaterThanOrEqual(6);
      expect(homeCount, team).toBeLessThanOrEqual(7);
      const longest = homeFlags.reduce(
        (acc, flag, i) => {
          const run = i > 0 && flag === homeFlags[i - 1] ? acc.run + 1 : 1;
          return { run, max: Math.max(acc.max, run) };
        },
        { run: 0, max: 0 },
      ).max;
      expect(longest, team).toBeLessThanOrEqual(2);
    }
  });
});
