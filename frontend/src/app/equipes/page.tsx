import type { Metadata } from "next";
import Link from "next/link";
import { ClubBadge, PageHeader } from "@/components/ui";
import { CLUBS } from "@/data/clubs";
import { currentClubs, getStadium, rank2025 } from "@/lib/data";

export const metadata: Metadata = { title: "Clubs" };

export default function EquipesPage() {
  const clubs = currentClubs();
  const relegated = CLUBS.filter((c) => !clubs.includes(c) && rank2025(c.slug));

  return (
    <>
      <PageHeader kicker="National Foot 1 · 2026-2027" title="Clubs">
        Les 14 clubs de la saison, avec leur stade et leur place la saison dernière.
      </PageHeader>
      <div className="container-site py-8">
        <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => {
            const stadium = getStadium(club.stadiumId);
            const rank = rank2025(club.slug);
            const body = (
              <>
                <ClubBadge club={club} size={60} />
                <div className="min-w-0 flex-1">
                  <h2 className={`font-display text-2xl leading-tight font-bold ${club.unconfirmed ? "font-normal text-faint italic" : "group-hover:underline"}`}>
                    {club.name}
                  </h2>
                  <p className="text-sm text-muted">{club.city}</p>
                  <p className="truncate text-xs text-faint">{stadium?.name ?? "Stade à confirmer"}</p>
                </div>
                <p className="text-right text-xs text-faint">
                  {rank ? (
                    <>
                      <span className="block font-display text-3xl font-extrabold text-fg tabular">{rank}e</span>
                      en 2025-26
                    </>
                  ) : club.unconfirmed ? null : (
                    <span className="font-semibold text-pelouse">Promu</span>
                  )}
                </p>
              </>
            );
            return (
              <li key={club.slug} className="bg-surface">
                {club.unconfirmed ? (
                  <div className="flex h-full items-center gap-4 p-5">{body}</div>
                ) : (
                  <Link href={`/equipes/${club.slug}`} className="group flex h-full items-center gap-4 p-5 hover:bg-surface-2">
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {relegated.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold">Relégués en National Foot 2</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {relegated.map((club) => (
                <Link key={club.slug} href={`/equipes/${club.slug}`} className="flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-sm font-semibold hover:border-fg">
                  <ClubBadge club={club} size={24} /> {club.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
