import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { MatchRow } from "@/components/match-row";
import { Card, Notice, PageHeader, SectionTitle } from "@/components/ui";
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
      <PageHeader eyebrow="Billetterie officielle" title="Vos places, en 3 minutes">
        Choisissez votre match, votre tribune, payez par Mobile Money ou carte, et recevez vos billets avec QR code.
      </PageHeader>
      <div className="container-site grid gap-10 py-10 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-10">
          <Notice>
            Billetterie en <strong className="text-fg">mode démonstration</strong> : paiement simulé, affiches et tarifs indicatifs.
          </Notice>
          {rounds.length === 0 && <p className="text-muted">Aucun match en vente pour le moment.</p>}
          {rounds.map((round) => (
            <section key={round}>
              <SectionTitle title={<>Journée <span className="text-yellow">{round}</span></>} />
              <div className="grid gap-2.5">
                {matches.filter((m) => m.round === round).map((m) => (
                  <MatchRow key={m.id} match={m} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          <Card className="p-5">
            <h2 className="font-display text-2xl font-bold uppercase">Tarifs</h2>
            <p className="text-xs text-faint">Tarifs indicatifs par tribune</p>
            <ul className="mt-4 divide-y divide-line">
              {TRIBUNES.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-faint">{t.perks}</p>
                  </div>
                  <p className="font-display text-xl font-bold whitespace-nowrap text-yellow">{fmtPrice(t.price)}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <h2 className="font-display text-2xl font-bold uppercase">Paiement</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>● Airtel Money</li>
              <li>● Moov Money</li>
              <li>● Visa / Mastercard</li>
            </ul>
          </Card>
        </aside>
      </div>
    </>
  );
}
