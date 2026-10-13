"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";

const NAV = [
  { href: "/matchs", label: "Matchs" },
  { href: "/classement", label: "Classement" },
  { href: "/equipes", label: "Équipes" },
  { href: "/joueurs", label: "Joueurs" },
  { href: "/infos", label: "Infos" },
];

export function SiteHeader() {
  const pathname = usePathname();
  // Le menu est lié à la page où il a été ouvert : changer de page le referme.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-xl">
      <div className="container-site flex h-16 items-center gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="LINAF — accueil">
          <Logo id="hdr" className="h-9 w-auto" />
        </Link>

        <nav aria-label="Navigation principale" className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="rounded-md px-3 py-2 font-display text-[17px] font-semibold tracking-wide text-muted uppercase transition hover:bg-white/5 hover:text-fg aria-[current=page]:text-yellow"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/mes-billets" className="hidden rounded-lg border border-line-strong px-3.5 py-2 text-sm font-semibold hover:bg-white/5 sm:inline-flex">
            Mes billets
          </Link>
          <Link href="/billetterie" className="inline-flex rounded-lg bg-yellow px-3.5 py-2 text-sm font-bold text-black hover:brightness-110">
            Billetterie
          </Link>
          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="grid size-10 place-items-center rounded-md hover:bg-white/5 lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Menu mobile" className="border-t border-line bg-bg lg:hidden">
          <div className="container-site flex flex-col py-3">
            {[...NAV, { href: "/billetterie", label: "Billetterie" }, { href: "/mes-billets", label: "Mes billets" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="rounded-md px-3 py-3 font-display text-xl font-semibold uppercase text-muted hover:bg-white/5 hover:text-fg aria-[current=page]:text-yellow"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
      <div className="tricolor h-[3px]" />
    </header>
  );
}
