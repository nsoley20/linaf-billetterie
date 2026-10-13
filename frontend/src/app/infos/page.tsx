import type { Metadata } from "next";
import { Card, ClubBadge, PageHeader, SectionTitle } from "@/components/ui";
import { STADIUMS } from "@/data/clubs";
import { SEASON_2026_27 } from "@/data/fixtures-2026-27";
import { currentClubs } from "@/lib/data";
import { fmtNumber } from "@/lib/format";

export const metadata: Metadata = { title: "Infos" };

const FAQ: [string, string][] = [
  ["Comment je reçois mes billets ?", "Ils s'affichent juste après le paiement, avec un QR code par place. Vous les retrouvez ensuite dans Mes billets."],
  ["Je dois imprimer mon billet ?", "Non. Montrez le QR code sur votre téléphone à l'entrée, luminosité au maximum."],
  ["J'achète pour plusieurs personnes ?", "Jusqu'à 6 billets par commande. Envoyez à chaque accompagnateur le QR code de son billet."],
  ["Et si le match est reporté ?", "Votre billet reste valable à la nouvelle date. Si le match est annulé, la LINAF vous rembourse sur le moyen de paiement utilisé."],
  ["Quelqu'un peut copier mon QR code ?", "Le premier scan invalide le billet. Une capture d'écran ne fait entrer qu'une seule personne : gardez votre QR code pour vous."],
  ["Comment je paie ?", "Par Airtel Money, Moov Money, ou carte Visa ou Mastercard."],
];

const SEASON_FACTS: [string, string][] = [
  ["Saison", SEASON_2026_27.label],
  ["Reprise", "samedi 24 octobre 2026"],
  ["Dernière journée", "22 mai 2027"],
  ["Format", "14 clubs, matchs aller et retour, 26 journées"],
  ["1er", "Ligue des champions CAF"],
  ["2e", "Coupe de la Confédération CAF"],
  ["13e et 14e", "descente en National Foot 2"],
];

export default function InfosPage() {
  const clubs = currentClubs();
  const clubsAt = (id: string) => clubs.filter((c) => c.stadiumId === id);

  return (
    <>
      <PageHeader kicker="LINAF" title="Infos">
        La compétition, les stades et les réponses aux questions sur les billets.
      </PageHeader>
      <div className="container-site space-y-14 py-8">
        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionTitle title="La ligue" />
            <p className="text-muted">
              La Ligue Nationale de Football Professionnel du Gabon organise le National Foot 1, le National Foot 2 et la Coupe de la Ligue.
              Une victoire rapporte 3 points, un nul 1 point.
            </p>
          </div>
          <Card>
            <dl>
              {SEASON_FACTS.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-line px-5 py-3 text-sm last:border-0">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </section>

        <section id="stades" className="scroll-mt-24">
          <SectionTitle title="Stades" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {STADIUMS.filter((s) => clubsAt(s.id).length > 0).map((s) => (
              <Card key={s.id} className="flex flex-col p-5">
                <p className="font-display text-2xl leading-tight font-bold">{s.name}</p>
                <p className="text-sm text-muted">{s.city}</p>
                <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                  <div className="flex -space-x-1">
                    {clubsAt(s.id).map((c) => (
                      <span key={c.slug} title={c.name} className="rounded-full bg-surface p-0.5">
                        <ClubBadge club={c} size={28} />
                      </span>
                    ))}
                  </div>
                  {s.capacity && (
                    <p className="text-right text-xs text-faint">
                      <span className="block font-display text-2xl font-bold text-fg tabular">{fmtNumber(s.capacity)}</span>
                      places
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="scroll-mt-24">
          <SectionTitle title="Questions sur les billets" />
          <div className="overflow-hidden rounded-lg border border-line bg-surface">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group border-b border-line last:border-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold hover:bg-surface-2">
                  {q}
                  <span aria-hidden className="text-xl text-pelouse transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-muted">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24">
          <SectionTitle title="Contact" />
          <Card className="grid gap-px overflow-hidden bg-line sm:grid-cols-3">
            {[
              ["Adresse", "Libreville, Gabon"],
              ["Billetterie", "Coordonnées à compléter"],
              ["Presse et partenaires", "Coordonnées à compléter"],
            ].map(([k, v]) => (
              <div key={k} className="bg-surface p-5">
                <p className="text-sm text-muted">{k}</p>
                <p className="mt-1 font-semibold">{v}</p>
              </div>
            ))}
          </Card>
        </section>
      </div>
    </>
  );
}
