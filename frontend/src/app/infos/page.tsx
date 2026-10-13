import type { Metadata } from "next";
import { Card, PageHeader, SectionTitle } from "@/components/ui";
import { STADIUMS } from "@/data/clubs";
import { SEASON_2026_27 } from "@/data/fixtures-2026-27";
import { currentClubs } from "@/lib/data";
import { fmtNumber } from "@/lib/format";

export const metadata: Metadata = { title: "Infos pratiques" };

const FAQ: [string, string][] = [
  ["Comment recevoir mon billet ?", "Après le paiement, vos billets s'affichent immédiatement avec un QR code et sont enregistrés dans « Mes billets » sur votre téléphone."],
  ["Dois-je imprimer mon billet ?", "Non. Présentez simplement le QR code sur votre écran à l'entrée. Pensez à monter la luminosité."],
  ["Puis-je acheter pour plusieurs personnes ?", "Oui, jusqu'à 6 billets par commande. Chaque billet a son propre QR code : envoyez-le à chaque accompagnateur."],
  ["Que se passe-t-il si le match est reporté ?", "Votre billet reste valable pour la nouvelle date. En cas d'annulation définitive, vous êtes remboursé sur votre moyen de paiement."],
  ["Mon QR code peut-il être copié ?", "Chaque billet est unique et invalidé dès le premier scan : une capture d'écran partagée ne permettra qu'une seule entrée."],
  ["Quels moyens de paiement sont acceptés ?", "Airtel Money, Moov Money, et les cartes Visa et Mastercard."],
];

export default function InfosPage() {
  const clubsByStadium = (id: string) => currentClubs().filter((c) => c.stadiumId === id).map((c) => c.name);

  return (
    <>
      <PageHeader eyebrow="LINAF" title="Infos pratiques">
        La ligue, la compétition, les stades et toutes les réponses à vos questions.
      </PageHeader>
      <div className="container-site space-y-16 py-10">
        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionTitle title="La LINAF" />
            <div className="space-y-4 text-muted">
              <p>
                La Ligue Nationale de Football Professionnel du Gabon organise le National Foot 1 et le National Foot 2, les deux divisions
                du football gabonais, ainsi que la Coupe de la Ligue.
              </p>
              <p>
                Le National Foot 1 réunit <strong className="text-fg">14 clubs</strong> qui s&apos;affrontent en matchs aller et retour,
                soit 26 journées. Une victoire rapporte 3 points, un nul 1 point.
              </p>
            </div>
          </div>
          <Card className="divide-y divide-line">
            {[
              ["Saison", SEASON_2026_27.label],
              ["Reprise", "Samedi 24 octobre 2026"],
              ["Dernière journée", "22 mai 2027"],
              ["Clubs", "14"],
              ["Champion", "Ligue des champions CAF"],
              ["Dauphin", "Coupe de la Confédération CAF"],
              ["13e et 14e", "Relégués en National Foot 2"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-5 py-3 text-sm">
                <span className="text-faint">{k}</span>
                <span className="text-right font-semibold">{v}</span>
              </div>
            ))}
          </Card>
        </section>

        <section id="stades" className="scroll-mt-24">
          <SectionTitle title="Les stades" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {STADIUMS.filter((s) => clubsByStadium(s.id).length > 0).map((s) => (
              <Card key={s.id} className="p-5">
                <p className="font-display text-2xl leading-tight font-bold uppercase">{s.name}</p>
                <p className="text-sm text-muted">{s.city}</p>
                <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-3">
                  <p className="text-xs text-faint">{clubsByStadium(s.id).join(", ")}</p>
                  {s.capacity && (
                    <p className="text-right whitespace-nowrap">
                      <span className="font-display text-2xl font-bold text-yellow">{fmtNumber(s.capacity)}</span>
                      <span className="block text-[10px] tracking-wider text-faint uppercase">places</span>
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="scroll-mt-24">
          <SectionTitle title="Questions fréquentes" />
          <div className="grid gap-2.5">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group rounded-xl border border-line bg-surface open:border-green/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
                  {q}
                  <span aria-hidden className="text-xl text-green-2 transition group-open:rotate-45">+</span>
                </summary>
                <p className="px-5 pb-5 text-muted">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24">
          <SectionTitle title="Contact" />
          <Card className="grid gap-6 p-6 sm:grid-cols-3">
            <div>
              <p className="text-xs tracking-wider text-faint uppercase">Adresse</p>
              <p className="mt-1 font-semibold">Libreville, Gabon</p>
            </div>
            <div>
              <p className="text-xs tracking-wider text-faint uppercase">Billetterie</p>
              <p className="mt-1 font-semibold">Coordonnées à compléter</p>
            </div>
            <div>
              <p className="text-xs tracking-wider text-faint uppercase">Presse & partenaires</p>
              <p className="mt-1 font-semibold">Coordonnées à compléter</p>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
}
