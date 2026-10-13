import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { MatchList, MatchRow } from "@/components/match-row";
import { Card, Notice, PageHeader } from "@/components/ui";
import { TRIBUNES } from "@/data/players";
import { getClub, upcomingMatches } from "@/lib/data";
import { fmtPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Billetterie" };

export default async function BilletteriePage() {
  "use cache";
  cacheLife("hours"); // matchs en vente recalculés au plus toutes les heures
  const matches = upcomingMatches().filter((m) => !getClub(m.home).unconfirmed && !getClub(m.away).unconfirmed);
  const rounds = [...new Set(matches.map((m) => m.round))];

  return (
    <>
      <PageHeader kicker="Billetterie" title="Acheter des billets">
        Choisissez un match, puis votre tribune. Vous recevez vos billets avec un QR code à présenter à l&apos;entrée.
      </PageHeader>
      <div className="container-site grid gap-10 py-8 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-10">
          <Notice>Billetterie en démonstration : le paiement est simulé, les affiches et les tarifs sont indicatifs.</Notice>
          {rounds.length === 0 && <p className="text-muted">Aucun match en vente pour le moment. Revenez après la publication du calendrier.</p>}
          {rounds.map((round) => (
            <section key={round}>
              <h2 className="mb-3 font-display text-3xl font-bold">Journée {round}</h2>
              <MatchList>
                {matches
                  .filter((m) => m.round === round)
                  .map((m) => (
                    <MatchRow key={m.id} match={m} />
                  ))}
              </MatchList>
            </section>
          ))}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          <Card>
            <h2 className="border-b border-line px-5 py-3 font-display text-2xl font-bold">Tarifs</h2>
            <ul>
              {TRIBUNES.map((t) => (
                <li key={t.id} className="flex items-start justify-between gap-3 border-b border-line px-5 py-3 last:border-0">
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-xs text-faint">{t.perks}</span>
                  </span>
                  <span className="font-display text-xl font-bold whitespace-nowrap">{fmtPrice(t.price)}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="px-5 py-4">
            <h2 className="font-display text-2xl font-bold">Paiement</h2>
            <p className="mt-1 text-sm text-muted">Airtel Money, Moov Money, Visa ou Mastercard.</p>
          </Card>
        </aside>
      </div>
    </>
  );
}
