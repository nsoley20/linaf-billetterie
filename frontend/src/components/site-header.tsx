"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";

const NAV = [
  { href: "/matchs", label: "Matchs" },
  { href: "/classement", label: "Classement" },
  { href: "/equipes", label: "Clubs" },
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
    <header className="sticky top-0 z-50 border-b border-line bg-surface">
      <div className="tricolor h-1" />
      <div className="container-site flex h-16 items-center gap-6">
        <Link href="/" aria-label="LINAF, accueil" className="shrink-0">
          <Logo id="hdr" className="h-9 w-auto" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden h-full items-stretch lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="flex items-center border-b-[3px] border-transparent px-3 pt-[3px] text-[15px] font-semibold text-muted transition-colors hover:text-fg aria-[current=page]:border-pelouse aria-[current=page]:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/mes-billets" className="hidden px-3 py-2 text-sm font-semibold text-muted hover:text-fg sm:block">
            Mes billets
          </Link>
          <Link href="/billetterie" className="rounded-md bg-pelouse px-4 py-2 text-sm font-semibold text-white hover:bg-pelouse-dark">
            Billetterie
          </Link>
          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="grid size-10 place-items-center rounded-md text-fg hover:bg-surface-2 lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Menu mobile" className="border-t border-line bg-surface lg:hidden">
          <div className="container-site flex flex-col py-2">
            {[...NAV, { href: "/mes-billets", label: "Mes billets" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="border-b border-line py-3 font-display text-2xl font-bold last:border-0 aria-[current=page]:text-pelouse"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
