import type { Metadata } from "next";
import Link from "next/link";
import { ClubBadge, PageHeader } from "@/components/ui";
import { CLUBS } from "@/data/clubs";
import { currentClubs, getStadium, rank2025 } from "@/lib/data";

export const metadata: Metadata = { title: "Les clubs" };

export default function EquipesPage() {
  const clubs = currentClubs();
  const relegated = CLUBS.filter((c) => !clubs.includes(c) && rank2025(c.slug));

  return (
    <>
      <PageHeader eyebrow="National Foot 1 · 2026-2027" title="Les clubs">
        Les 14 clubs engagés cette saison, leur ville, leur stade et leur place la saison dernière.
      </PageHeader>
      <div className="container-site py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => {
            const stadium = getStadium(club.stadiumId);
            const rank = rank2025(club.slug);
            const body = (
              <>
                <div aria-hidden className="pointer-events-none absolute -right-10 -bottom-14 size-44 rounded-full opacity-25 blur-2xl" style={{ background: club.colors[0] }} />
                <ClubBadge club={club} size={56} />
                <div className="relative min-w-0 flex-1">
                  <h2 className={`font-display text-2xl leading-tight font-bold uppercase ${club.unconfirmed ? "italic text-faint" : "group-hover:text-yellow"}`}>
                    {club.name}
                  </h2>
                  <p className="text-sm text-muted">{club.city}</p>
                  <p className="mt-1 truncate text-xs text-faint">{stadium?.name ?? "Stade à confirmer"}</p>
                </div>
                <div className="relative text-right">
                  {rank ? (
                    <>
                      <p className="font-display text-3xl font-extrabold tabular">{rank}<sup className="text-sm">e</sup></p>
                      <p className="text-[10px] tracking-wider text-faint uppercase">en 2025-26</p>
                    </>
                  ) : (
                    <p className="rounded-full bg-green/15 px-2 py-1 text-[10px] font-bold tracking-wider text-green-2 uppercase">Promu</p>
                  )}
                </div>
              </>
            );
            return club.unconfirmed ? (
              <div key={club.slug} className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-line-strong p-5">{body}</div>
            ) : (
              <Link key={club.slug} href={`/equipes/${club.slug}`} className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-5 transition hover:border-green/50">
                {body}
              </Link>
            );
          })}
        </div>

        {relegated.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase text-muted">Relégués en National Foot 2</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {relegated.map((club) => (
                <Link key={club.slug} href={`/equipes/${club.slug}`} className="flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-sm text-muted hover:text-fg">
                  <ClubBadge club={club} size={22} /> {club.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
