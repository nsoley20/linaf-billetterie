import type { Player, Tribune } from "./types";

/**
 * ⚠️ DONNÉES D'EXEMPLE — joueurs et statistiques fictifs (saison 2025-26),
 * affichés avec l'étiquette « Exemple » sur le site. À remplacer par les vraies données.
 */
type Row = [id: string, name: string, club: string, position: Player["position"], number: number, age: number,
  nationality: string, apps: number, goals: number, assists: number, rating: number];

const ROWS: Row[] = [
  ["p-mbina", "Junior Mbina", "mangasport", "Attaquant", 9, 25, "Gabon", 25, 15, 4, 7.9],
  ["p-ndong-mgs", "Cédric Ndong", "mangasport", "Milieu", 8, 27, "Gabon", 26, 6, 11, 7.8],
  ["p-oyono", "Brice Oyono", "mangasport", "Gardien", 1, 30, "Gabon", 26, 0, 0, 7.4],
  ["p-moussavou", "Aaron Moussavou", "mandji", "Attaquant", 11, 23, "Gabon", 24, 12, 5, 7.6],
  ["p-ekomi", "Loïc Ekomi", "mandji", "Défenseur", 4, 28, "Gabon", 26, 2, 1, 7.5],
  ["p-mintsa", "Steeve Mintsa", "mandji", "Milieu", 10, 24, "Gabon", 25, 5, 9, 7.6],
  ["p-boussougou", "Yannick Boussougou", "vautour", "Attaquant", 7, 26, "Gabon", 24, 10, 3, 7.3],
  ["p-ondo", "Hervé Ondo", "vautour", "Milieu", 6, 29, "Gabon", 25, 3, 7, 7.2],
  ["p-essono", "Didier Essono", "oyem-ac", "Attaquant", 9, 22, "Gabon", 26, 11, 2, 7.4],
  ["p-nze", "Ulrich Nzé", "oyem-ac", "Milieu", 14, 21, "Gabon", 23, 4, 8, 7.3],
  ["p-mabiala", "Fabrice Mabiala", "cms", "Défenseur", 5, 31, "Congo", 26, 1, 2, 7.2],
  ["p-ngoua", "Kévin Ngoua", "cms", "Attaquant", 19, 24, "Gabon", 22, 8, 4, 7.1],
  ["p-ikapi", "Romaric Ikapi", "ogooue", "Attaquant", 10, 26, "Gabon", 25, 10, 6, 7.4],
  ["p-ambourouet", "Lionel Ambourouet", "ogooue", "Milieu", 8, 27, "Gabon", 24, 5, 6, 7.1],
  ["p-obiang", "Gervais Obiang", "us-oyem", "Attaquant", 9, 28, "Gabon", 25, 9, 3, 7.0],
  ["p-mve", "Arnaud Mvé", "us-oyem", "Gardien", 16, 26, "Gabon", 24, 0, 0, 7.1],
  ["p-bekale", "Sylvère Békalé", "fc105", "Attaquant", 11, 24, "Gabon", 26, 11, 5, 7.3],
  ["p-mapangou", "Davy Mapangou", "fc105", "Milieu", 6, 30, "Gabon", 25, 3, 6, 7.0],
  ["p-kombila", "Nathan Kombila", "migoveen", "Attaquant", 17, 22, "Gabon", 24, 8, 2, 7.0],
  ["p-ogandaga", "Paulin Ogandaga", "lambarene", "Attaquant", 9, 27, "Gabon", 26, 12, 3, 7.2],
  ["p-ntoutoume", "Rodrigue Ntoutoume", "lambarene", "Milieu", 10, 25, "Gabon", 24, 4, 7, 7.0],
  ["p-mabicka", "Olivier Mabicka", "lozo", "Défenseur", 3, 29, "Gabon", 25, 1, 1, 6.9],
  ["p-assoumou", "Christ Assoumou", "lozo", "Attaquant", 21, 20, "Gabon", 23, 6, 2, 6.9],
  ["p-ella", "Wilfried Ella", "bitam", "Attaquant", 9, 25, "Cameroun", 24, 7, 1, 6.8],
];

export const PLAYERS: Player[] = ROWS.map(
  ([id, name, club, position, number, age, nationality, apps, goals, assists, rating]) => ({
    id, name, club, position, number, age, nationality, apps, goals, assists, rating, demo: true,
  }),
);

/** Distinctions d'exemple (saison 2025-26). */
export const AWARDS = {
  playerOfSeason: "p-ndong-mgs",
  playerOfMonth: { player: "p-mintsa", month: "Juin 2026" },
  goalkeeperOfSeason: "p-oyono",
  youngPlayer: "p-nze",
};

/** Tribunes et tarifs indicatifs. */
export const TRIBUNES: Tribune[] = [
  { id: "populaire", name: "Populaire", price: 1500, perks: "Placement libre, virages" },
  { id: "laterale", name: "Latérale", price: 3000, perks: "Placement libre, tribune latérale" },
  { id: "couverte", name: "Tribune couverte", price: 7500, perks: "Places couvertes, vue centrale" },
  { id: "vip", name: "VIP", price: 20000, perks: "Siège numéroté, salon, accès dédié" },
];
