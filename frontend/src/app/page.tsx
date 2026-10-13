import { cacheLife } from "next/cache";
import Link from "next/link";
import { Countdown } from "@/components/countdown";
import { MatchRow } from "@/components/match-row";
import { AwardCard } from "@/components/player-card";
import { StandingsTable } from "@/components/standings-table";
import { buttonClass, ClubBadge, DemoTag, Eyebrow, Notice, SectionTitle } from "@/components/ui";
import { SEASON_2026_27 } from "@/data/fixtures-2026-27";
import { AWARDS } from "@/data/players";
import { STANDINGS_2025_26 } from "@/data/standings-2025-26";
import { currentClubs, findPlayer, getClub, getStadium, topBy, upcomingMatches } from "@/lib/data";
import { fmtDateLong, fmtTime } from "@/lib/format";

function Pitch() {
  return (
    <svg aria-hidden viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full opacity-[0.09]">
      <g fill="none" stroke="#fff" strokeWidth="2">
        <rect x="40" y="40" width="1120" height="620" />
        <line x1="600" y1="40" x2="600" y2="660" />
        <circle cx="600" cy="350" r="95" />
        <rect x="40" y="190" width="170" height="320" />
        <rect x="990" y="190" width="170" height="320" />
        <rect x="40" y="270" width="60" height="160" />
        <rect x="1100" y="270" width="60" height="160" />
        <path d="M210 290a80 80 0 0 1 0 120M990 290a80 80 0 0 0 0 120" />
      </g>
    </svg>
  );
}

export default async function HomePage() {
  "use cache";
  cacheLife("hours"); // « prochain match » recalculé au plus toutes les heures
  const upcoming = upcomingMatches();
  const opener = upcoming[0];
  const nextRound = opener ? upcoming.filter((m) => m.round === opener.round) : [];
  const champion = getClub(STANDINGS_2025_26[0].club);
  const potS = findPlayer(AWARDS.playerOfSeason)!;
  const topScorer = topBy("goals", 1)[0];
  const potM = findPlayer(AWARDS.playerOfMonth.player)!;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_90%_at_100%_0%,rgb(0_158_96/0.28),transparent_60%),radial-gradient(60%_80%_at_0%_100%,rgb(58_117_196/0.25),transparent_60%),radial-gradient(40%_50%_at_50%_0%,rgb(252_209_22/0.08),transparent_60%)]" />
        <Pitch />
        <div className="container-site relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-24">
          <div className="animate-rise">
            <Eyebrow>National Foot 1 · {SEASON_2026_27.label}</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(3.2rem,9vw,6.5rem)] leading-[0.88] font-extrabold tracking-tight uppercase">
              Le foot <br />
              <span className="text-green-2">gabonais</span> <br />
              <span className="text-yellow">reprend.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted">
              Coup d&apos;envoi de la saison le {fmtDateLong(`${SEASON_2026_27.start}T12:00:00Z`).toLowerCase()}. Réservez vos places en
              ligne et entrez au stade avec votre QR code.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/billetterie" className={buttonClass.yellow}>Acheter un billet</Link>
              <Link href="/matchs" className={buttonClass.ghost}>Voir le calendrier</Link>
            </div>
          </div>

          {opener && (
            <div className="animate-rise rounded-3xl border border-line-strong bg-surface/80 p-5 shadow-2xl shadow-black/50 backdrop-blur-md [animation-delay:120ms] sm:p-7">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold tracking-[0.18em] text-faint uppercase">Journée {opener.round} · Ouverture</p>
                {opener.provisional && <DemoTag label="Indicatif" />}
              </div>
              <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                {[opener.home, opener.away].map((slug, i) => {
                  const club = getClub(slug);
                  return (
                    <div key={slug} className={`flex flex-col items-center gap-2 ${i === 1 ? "order-3" : ""}`}>
                      <ClubBadge club={club} size={64} />
                      <span className="font-display text-xl leading-tight font-bold uppercase">{club.name}</span>
                    </div>
                  );
                })}
                <span className="order-2 font-display text-2xl font-bold text-faint">VS</span>
              </div>
              <p className="mt-5 text-center text-sm text-muted">
                {fmtDateLong(opener.kickoff)} · {fmtTime(opener.kickoff)}
                <br />
                <span className="text-faint">{getStadium(opener.stadiumId)?.name ?? "Stade à confirmer"}</span>
              </p>
              <div className="mt-5">
                <Countdown target={opener.kickoff} />
              </div>
              <Link href={`/billetterie/${opener.id}`} className={`${buttonClass.primary} mt-5 w-full`}>
                Réserver pour ce match
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CHAMPION */}
      <section className="border-b border-line bg-gradient-to-r from-yellow/[0.12] via-transparent to-transparent">
        <div className="container-site flex flex-wrap items-center gap-4 py-5">
          <ClubBadge club={champion} size={40} />
          <p className="font-display text-xl font-bold uppercase sm:text-2xl">
            <span className="text-yellow">{champion.name}</span>, champion du Gabon 2025-2026
          </p>
          <p className="text-sm text-muted">
            {STANDINGS_2025_26[0].points} pts · {STANDINGS_2025_26[0].won} victoires · défend son titre cette saison
          </p>
          <Link href="/classement?saison=2025-26" className="ml-auto text-sm font-semibold text-green-2 hover:text-yellow">
            Classement final →
          </Link>
        </div>
      </section>

      <div className="container-site space-y-20 pt-16">
        {/* PROCHAINE JOURNÉE */}
        {nextRound.length > 0 && (
          <section>
            <SectionTitle title={`Journée ${opener!.round}`} href="/matchs" linkLabel="Tout le calendrier" />
            <div className="mb-4">
              <Notice>Affiches et horaires indicatifs en attendant le calendrier officiel de la LINAFP.</Notice>
            </div>
            <div className="grid gap-2.5">
              {nextRound.map((m) => (
                <MatchRow key={m.id} match={m} />
              ))}
            </div>
          </section>
        )}

        {/* CLASSEMENT + DISTINCTIONS */}
        <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionTitle title="Classement 2025-26" href="/classement" linkLabel="Classement complet" />
            <StandingsTable rows={STANDINGS_2025_26.slice(0, 6)} compact zones={[]} />
            <p className="mt-2 text-xs text-faint">Classement final officiel de la saison passée.</p>
          </div>
          <div>
            <SectionTitle title="Les stars" href="/joueurs" linkLabel="Toutes les stats" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <AwardCard title="Meilleur joueur 2025-26" player={potS} stat={potS.rating.toFixed(1)} statLabel="note moyenne" />
              <AwardCard title="Meilleur buteur" player={topScorer} stat={String(topScorer.goals)} statLabel="buts" />
              <div className="sm:col-span-2 lg:col-span-1">
                <AwardCard title="Joueur du mois" subtitle={AWARDS.playerOfMonth.month} player={potM} stat={String(potM.assists)} statLabel="passes décisives sur la saison" />
              </div>
            </div>
          </div>
        </section>

        {/* CLUBS */}
        <section>
          <SectionTitle title="Les 14 clubs" href="/equipes" linkLabel="Toutes les équipes" />
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
            {currentClubs().map((club) => {
              const inner = (
                <>
                  <ClubBadge club={club} size={44} />
                  <span className={`text-center text-xs leading-tight font-semibold ${club.unconfirmed ? "italic text-faint" : ""}`}>{club.name}</span>
                </>
              );
              return club.unconfirmed ? (
                <div key={club.slug} className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-line-strong p-4">{inner}</div>
              ) : (
                <Link key={club.slug} href={`/equipes/${club.slug}`} className="flex flex-col items-center gap-2 rounded-xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:border-green/50">
                  {inner}
                </Link>
              );
            })}
          </div>
        </section>

        {/* BILLETTERIE */}
        <section className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-10">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_100%_at_100%_0%,rgb(0_158_96/0.22),transparent_60%)]" />
          <div className="relative">
            <Eyebrow>Billetterie</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-extrabold uppercase sm:text-5xl">Du téléphone au stade en 3 minutes</h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Choisissez le match", "Toutes les rencontres du National Foot 1, avec stade et horaire."],
                ["Choisissez la tribune", "Populaire, latérale, couverte ou VIP, jusqu'à 6 places."],
                ["Payez", "Airtel Money, Moov Money ou carte bancaire."],
                ["Scannez à l'entrée", "Un QR code unique par billet, invalidé après passage."],
              ].map(([t, d], i) => (
                <li key={t} className="rounded-2xl border border-line bg-black/20 p-5">
                  <span className="font-display text-5xl font-extrabold text-white/10">0{i + 1}</span>
                  <h3 className="mt-2 font-semibold">{t}</h3>
                  <p className="mt-1 text-sm text-faint">{d}</p>
                </li>
              ))}
            </ol>
            <Link href="/billetterie" className={`${buttonClass.yellow} mt-8`}>Acheter mes billets</Link>
          </div>
        </section>
      </div>
    </>
  );
}
