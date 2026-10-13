import { roundRobin } from "@/lib/round-robin";
import { CLUBS, NF1_2026_27 } from "./clubs";
import type { Match } from "./types";

export const SEASON_2026_27 = {
  id: "2026-27",
  label: "Saison 2026-2027",
  start: "2026-10-24",
  end: "2027-05-22",
  source: {
    label: "Gabon Media Time — reprise repoussée au 24 octobre (6 oct. 2026)",
    url: "https://gabonmediatime.com/national-foot-1-reprise-repoussee-au-24-octobre-prochain/",
  },
};

const ROUNDS_PUBLISHED = 6;
const FIRST_SATURDAY = Date.UTC(2026, 9, 24); // 24 octobre 2026
const SLOTS = [
  { day: 0, time: "14:30" }, // samedi 15h30 à Libreville (UTC+1)
  { day: 0, time: "14:30" },
  { day: 0, time: "16:30" },
  { day: 0, time: "16:30" },
  { day: 1, time: "14:30" }, // dimanche
  { day: 1, time: "14:30" },
  { day: 1, time: "16:30" },
];

function kickoffIso(round: number, slot: number): string {
  const { day, time } = SLOTS[slot % SLOTS.length];
  const [h, m] = time.split(":").map(Number);
  const ms = FIRST_SATURDAY + (round * 7 + day) * 86_400_000 + (h * 60 + m) * 60_000;
  return new Date(ms).toISOString();
}

const stadiumOf = (slug: string) => CLUBS.find((c) => c.slug === slug)?.stadiumId;

/**
 * Calendrier INDICATIF des premières journées 2026-27 (affiches non officielles).
 * Pour saisir un résultat : ajoutez `score: [buts domicile, buts extérieur]` au match concerné
 * dans RESULTS ci-dessous — le classement se recalcule automatiquement.
 */
const RESULTS: Record<string, [number, number]> = {
  // "2026-27-j1-1": [1, 0],
};

export const FIXTURES_2026_27: Match[] = roundRobin(NF1_2026_27, ROUNDS_PUBLISHED).flatMap((pairs, r) =>
  pairs.map(([home, away], i) => {
    const id = `2026-27-j${r + 1}-${i + 1}`;
    return {
      id,
      season: SEASON_2026_27.id,
      round: r + 1,
      kickoff: kickoffIso(r, i),
      home,
      away,
      stadiumId: stadiumOf(home),
      score: RESULTS[id],
      provisional: true,
    };
  }),
);
