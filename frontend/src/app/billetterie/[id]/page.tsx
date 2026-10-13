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
        <div className="container-site py-8">
          <Link href="/billetterie" className="text-sm text-muted hover:text-fg">← Tous les matchs</Link>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-3">
              <ClubBadge club={home} size={48} />
              <span className="font-display text-sm font-bold text-faint">VS</span>
              <ClubBadge club={away} size={48} />
            </div>
            <div>
              <h1 className="font-display text-3xl leading-tight font-extrabold uppercase sm:text-4xl">
                {home.name} – {away.name}
              </h1>
              <p className="text-sm text-muted">
                Journée {match.round} · {fmtDateLong(match.kickoff)} à {fmtTime(match.kickoff)} · {stadium?.name ?? "Stade à confirmer"}
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="container-site py-10">
        <Checkout matchId={match.id} />
      </div>
    </>
  );
}
