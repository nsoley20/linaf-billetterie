const TZ = "Africa/Libreville";

const dateLong = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: TZ });
const dateShort = new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "short", timeZone: TZ });
const time = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: TZ });
const number = new Intl.NumberFormat("fr-FR");

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const fmtDateLong = (iso: string) => cap(dateLong.format(new Date(iso)));
export const fmtDateShort = (iso: string) => cap(dateShort.format(new Date(iso)).replace(/\.$/, ""));
export const fmtTime = (iso: string) => time.format(new Date(iso)).replace(":", "h");
export const fmtNumber = (n: number) => number.format(n);
export const fmtPrice = (n: number) => `${number.format(n)} FCFA`;
export const fmtSigned = (n: number) => (n > 0 ? `+${n}` : `${n}`);

/** Accord français : 0 et 1 au singulier (« 1 but », « 3 buts »). */
export const plural = (n: number, word: string) => (Math.abs(n) >= 2 ? `${word}s` : word);
