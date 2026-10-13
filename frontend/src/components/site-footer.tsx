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
      { href: "/matchs", label: "Calendrier & résultats" },
      { href: "/classement", label: "Classement" },
      { href: "/equipes", label: "Les clubs" },
      { href: "/joueurs", label: "Joueurs & stats" },
    ],
  },
  {
    title: "La ligue",
    links: [
      { href: "/infos", label: "À propos de la LINAF" },
      { href: "/infos#stades", label: "Les stades" },
      { href: "/infos#contact", label: "Contact" },
    ],
  },
];

export async function SiteFooter() {
  "use cache";
  cacheLife("days"); // pour l'année du copyright
  return (
    <footer className="mt-20 border-t border-line bg-black/40">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo id="ftr" className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-faint">
            Ligue Nationale de Football Professionnel du Gabon. Billetterie officielle et informations du National Foot.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <h2 className="mb-4 text-xs font-bold tracking-[0.2em] text-faint uppercase">{col.title}</h2>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-site flex flex-col gap-2 border-t border-line py-5 text-xs text-faint sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} LINAF — Ligue Nationale de Football Professionnel du Gabon.</p>
        <p>Libreville, Gabon</p>
      </div>
      <div className="tricolor h-1" />
    </footer>
  );
}
