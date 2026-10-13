import { cacheLife } from "next/cache";
import Link from "next/link";
import { Logo } from "./logo";

const COLS = [
  {
    title: "Billetterie",
    links: [
      { href: "/billetterie", label: "Acheter un billet" },
      { href: "/mes-billets", label: "Mes billets" },
      { href: "/infos#faq", label: "Questions fréquentes" },
    ],
  },
  {
    title: "National Foot 1",
    links: [
      { href: "/matchs", label: "Calendrier et résultats" },
      { href: "/classement", label: "Classement" },
      { href: "/equipes", label: "Clubs" },
      { href: "/joueurs", label: "Joueurs" },
    ],
  },
  {
    title: "La ligue",
    links: [
      { href: "/infos", label: "La LINAF" },
      { href: "/infos#stades", label: "Stades" },
      { href: "/infos#contact", label: "Contact" },
    ],
  },
];

export async function SiteFooter() {
  "use cache";
  cacheLife("days"); // pour l'année du copyright
  return (
    <footer className="mt-24 bg-fg text-white">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo id="ftr" tone="light" className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-white/65">
            Ligue Nationale de Football Professionnel du Gabon. Organisatrice du National Foot 1 et du National Foot 2.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <h2 className="mb-3 text-sm font-semibold text-white">{col.title}</h2>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/65 hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-site flex flex-col gap-1 border-t border-white/15 py-5 text-xs text-white/50 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} LINAF, Libreville</p>
        <p>Logos : propriété des clubs</p>
      </div>
    </footer>
  );
}
