import type { Club, Stadium } from "./types";

// Source : Wikipédia FR « Championnat du Gabon de football 2025-2026 ».
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
  { slug: "mangasport", name: "AS Mangasport", short: "MGS", city: "Moanda", stadiumId: "henri-sylvoz", colors: ["#1d3d8f", "#f5c518"] },
  { slug: "mandji", name: "ASS Mandji", short: "ASSM", city: "Port-Gentil", stadiumId: "divounguy", colors: ["#0b7a4b", "#ffffff"] },
  { slug: "vautour", name: "Vautour Club", short: "VC", city: "Libreville", stadiumId: "sibang", colors: ["#111827", "#e11d48"] },
  { slug: "oyem-ac", name: "Oyem AC", short: "OAC", city: "Oyem", stadiumId: "akouakam", colors: ["#7c2d12", "#fbbf24"] },
  { slug: "cms", name: "Cercle Mbéri Sportif", short: "CMS", city: "Libreville", stadiumId: "sibang", colors: ["#1e3a8a", "#ffffff"] },
  { slug: "ogooue", name: "Ogooué FC", short: "OFC", city: "Franceville", stadiumId: "mbaya", colors: ["#065f46", "#a7f3d0"] },
  { slug: "us-oyem", name: "US Oyem", short: "USO", city: "Oyem", stadiumId: "akouakam", colors: ["#b91c1c", "#ffffff"] },
  { slug: "fc105", name: "FC 105 Libreville", short: "105", city: "Libreville", stadiumId: "omar-bongo", colors: ["#991b1b", "#fde047"] },
  { slug: "migoveen", name: "Stade Migovéen", short: "SM", city: "Lambaréné", stadiumId: "jean-koumou", colors: ["#4c1d95", "#e9d5ff"] },
  { slug: "lambarene", name: "Lambaréné AC", short: "LAC", city: "Lambaréné", colors: ["#0e7490", "#ffffff"] },
  { slug: "lozo", name: "Lozo Sport", short: "LZS", city: "Lastoursville", stadiumId: "mbeba", colors: ["#c2410c", "#1f2937"] },
  { slug: "bitam", name: "US Bitam", short: "USB", city: "Bitam", stadiumId: "peyrille", colors: ["#166534", "#facc15"] },
  { slug: "bouenguidi", name: "Bouenguidi Sports", short: "BS", city: "Koulamoutou", colors: ["#1f2937", "#22c55e"] },
  { slug: "dikaki", name: "AS Dikaki", short: "ASD", city: "Fougamou", stadiumId: "mbombet", colors: ["#9f1239", "#fecdd3"] },
  {
    slug: "mounana",
    name: "CF Mounana",
    short: "CFM",
    city: "Mounana",
    colors: ["#0f172a", "#38bdf8"],
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
