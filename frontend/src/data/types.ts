export type Stadium = {
  id: string;
  name: string;
  city: string;
  capacity?: number;
};

export type Club = {
  slug: string;
  name: string;
  /** Sigle affiché sur l'écusson (3-4 lettres). */
  short: string;
  city: string;
  stadiumId?: string;
  /** Couleurs du club : [principale, secondaire]. */
  colors: [string, string];
  /** Logo officiel dans /public/clubs (sinon écusson généré). */
  logo?: string;
  /** Club dont la présence en NF1 2026-27 reste à confirmer. */
  unconfirmed?: boolean;
  note?: string;
};

export type Match = {
  id: string;
  season: string;
  round: number;
  /** ISO 8601 avec fuseau (Libreville = UTC+1). */
  kickoff: string;
  home: string;
  away: string;
  stadiumId?: string;
  /** Score final [domicile, extérieur] une fois le match joué. */
  score?: [number, number];
  /** Affiche non officielle (calendrier indicatif). */
  provisional?: boolean;
};

export type StandingRow = {
  club: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  /** Cinq derniers résultats, du plus ancien au plus récent. */
  form?: ("V" | "N" | "D")[];
};

export type Position = "Gardien" | "Défenseur" | "Milieu" | "Attaquant";

export type Player = {
  id: string;
  name: string;
  club: string;
  position: Position;
  number: number;
  age: number;
  nationality: string;
  apps: number;
  goals: number;
  assists: number;
  /** Note moyenne sur 10. */
  rating: number;
  /** Donnée d'exemple, à remplacer par la vraie. */
  demo: true;
};

export type Tribune = {
  id: string;
  name: string;
  price: number;
  perks: string;
};
