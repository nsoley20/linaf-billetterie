import type { Club, Stadium } from "./types";

// Source : Wikipédia FR « Championnat du Gabon de football 2025-2026 ».
// Logos : voir public/clubs/SOURCES.md.
export const STADIUMS: Stadium[] = [
  { id: "omar-bongo", name: "Stade Omar-Bongo", city: "Libreville", capacity: 40000 },
  { id: "sibang", name: "Stade Augustin-Monédan de Sibang", city: "Libreville", capacity: 7000 },
  { id: "henri-sylvoz", name: "Stade Henri-Sylvoz", city: "Moanda", capacity: 9500 },
  { id: "divounguy", name: "Stade Pierre-Claver-Divounguy", city: "Port-Gentil", capacity: 7000 },
  { id: "akouakam", name: "Stade d'Akouakam", city: "Oyem", capacity: 4000 },
  { id: "peyrille", name: "Stade Gaston-Peyrille", city: "Bitam", capacity: 7000 },
  { id: "mbeba", name: "Stade Mbéba", city: "Lastoursville", capacity: 4000 },
  { id: "jean-koumou", name: "Stade Jean-Koumou", city: "Lambaréné" },
  { id: "mbaya", name: "Stade Heliconia de Mbaya", city: "Franceville" },
  { id: "mbombet", name: "Stade Mbombet", city: "Fougamou" },
];

export const CLUBS: Club[] = [
  { slug: "mangasport", name: "AS Mangasport", short: "MGS", city: "Moanda", stadiumId: "henri-sylvoz", colors: ["#0f7a3a", "#f7d417"], logo: "/clubs/mangasport.png" },
  { slug: "mandji", name: "ASS Mandji", short: "ASSM", city: "Port-Gentil", stadiumId: "divounguy", colors: ["#1f4fa3", "#f2c94c"], logo: "/clubs/mandji.png" },
  { slug: "vautour", name: "Vautour Club", short: "VC", city: "Libreville", stadiumId: "sibang", colors: ["#1d4f9c", "#2e9b4a"], logo: "/clubs/vautour.png" },
  { slug: "oyem-ac", name: "Oyem AC", short: "OAC", city: "Oyem", stadiumId: "akouakam", colors: ["#1f7a3a", "#f2c200"], logo: "/clubs/oyem-ac.png" },
  { slug: "cms", name: "Cercle Mbéri Sportif", short: "CMS", city: "Libreville", stadiumId: "sibang", colors: ["#3b82c4", "#ffffff"], logo: "/clubs/cms.png" },
  { slug: "ogooue", name: "Ogooué FC", short: "OFC", city: "Franceville", stadiumId: "mbaya", colors: ["#2b2f7a", "#f5c400"], logo: "/clubs/ogooue.png" },
  { slug: "us-oyem", name: "US Oyem", short: "USO", city: "Oyem", stadiumId: "akouakam", colors: ["#1f5fbf", "#ffd400"], logo: "/clubs/us-oyem.png" },
  { slug: "fc105", name: "FC 105 Libreville", short: "105", city: "Libreville", stadiumId: "omar-bongo", colors: ["#c8102e", "#111111"], logo: "/clubs/fc105.png" },
  { slug: "migoveen", name: "Stade Migovéen", short: "SM", city: "Lambaréné", stadiumId: "jean-koumou", colors: ["#d32f2f", "#1b1b1b"], logo: "/clubs/migoveen.png" },
  { slug: "lambarene", name: "Lambaréné AC", short: "LAC", city: "Lambaréné", colors: ["#0f6e8c", "#ffffff"], logo: "/clubs/lambarene.png" },
  { slug: "lozo", name: "Lozo Sport", short: "LZS", city: "Lastoursville", stadiumId: "mbeba", colors: ["#1f86c8", "#f2c200"], logo: "/clubs/lozo.png" },
  { slug: "bitam", name: "US Bitam", short: "USB", city: "Bitam", stadiumId: "peyrille", colors: ["#d62828", "#1d3c8f"], logo: "/clubs/bitam.png" },
  { slug: "bouenguidi", name: "Bouenguidi Sports", short: "BS", city: "Koulamoutou", colors: ["#1f4fa3", "#ffffff"], logo: "/clubs/bouenguidi.png" },
  { slug: "dikaki", name: "AS Dikaki", short: "ASD", city: "Fougamou", stadiumId: "mbombet", colors: ["#9f1239", "#fecdd3"] },
  {
    slug: "mounana",
    name: "CF Mounana",
    short: "CFM",
    city: "Mounana",
    colors: ["#2e7d32", "#ffd400"], logo: "/clubs/mounana.png",
    note: "Cité parmi les clubs de la saison 2026-27 (Gabon Media Time, 6 oct. 2026).",
  },
  {
    slug: "promu-n2",
    name: "Promu N2 (à confirmer)",
    short: "N2",
    city: "À confirmer",
    colors: ["#334155", "#94a3b8"],
    unconfirmed: true,
    note: "Second promu de National Foot 2 non encore confirmé.",
  },
];

/** Clubs engagés en National Foot 1 2026-2027 (relégués 2025-26 exclus). */
export const NF1_2026_27: string[] = [
  "mounana", "fc105", "mandji", "vautour", "oyem-ac", "cms", "ogooue",
  "us-oyem", "migoveen", "lambarene", "lozo", "bitam", "promu-n2", "mangasport",
];
