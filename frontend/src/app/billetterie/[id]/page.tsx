import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Checkout } from "@/components/checkout";
import { ClubBadge } from "@/components/ui";
import { FIXTURES_2026_27 } from "@/data/fixtures-2026-27";
import { findMatch, getClub, getStadium, matchTitle } from "@/lib/data";
import { fmtDateLong, fmtTime } from "@/lib/format";

const onSale = FIXTURES_2026_27.filter((m) => !m.score && !getClub(m.home).unconfirmed && !getClub(m.away).unconfirmed);

export const generateStaticParams = () => onSale.map((m) => ({ id: m.id }));

export async function generateMetadata({ params }: PageProps<"/billetterie/[id]">): Promise<Metadata> {
  const match = findMatch((await params).id);
  return { title: match ? `Billets ${matchTitle(match)}` : "Billetterie" };
}

export default async function BuyPage({ params }: PageProps<"/billetterie/[id]">) {
  const match = findMatch((await params).id);
  if (!match || !onSale.includes(match)) notFound();
  const home = getClub(match.home);
  const away = getClub(match.away);
  const stadium = getStadium(match.stadiumId);

  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="container-site py-6">
          <Link href="/billetterie" className="text-sm font-semibold text-pelouse hover:underline">
            ← Tous les matchs
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="flex items-center gap-2">
              <ClubBadge club={home} size={48} />
              <ClubBadge club={away} size={48} />
            </div>
            <div>
              <h1 className="font-display text-4xl leading-none font-black uppercase sm:text-5xl">
                {home.name} <span className="text-faint">-</span> {away.name}
              </h1>
              <p className="mt-1 text-sm text-muted">
                Journée {match.round} · {fmtDateLong(match.kickoff)} à {fmtTime(match.kickoff)} · {stadium?.name ?? "Stade à confirmer"}
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="container-site py-8">
        <Checkout matchId={match.id} />
      </div>
    </>
  );
}
