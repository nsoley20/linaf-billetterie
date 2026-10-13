"use client";

import Link from "next/link";
import { useState } from "react";
import { TRIBUNES } from "@/data/players";
import { fmtPrice } from "@/lib/format";
import { ticketInfo } from "@/lib/ticket-info";
import { createOrder, type StoredTicket } from "@/lib/tickets";
import { TicketCard } from "./ticket-card";
import { buttonClass } from "./ui";

const METHODS = [
  { id: "airtel", label: "Airtel Money" },
  { id: "moov", label: "Moov Money" },
  { id: "carte", label: "Carte bancaire" },
];
const MAX_QTY = 6;

type Step = "places" | "paiement" | "billets";

const choiceClass =
  "flex cursor-pointer rounded-md border border-line bg-surface p-4 transition-colors hover:border-line-strong has-checked:border-pelouse has-checked:bg-pelouse/5 has-checked:ring-1 has-checked:ring-pelouse";

export function Checkout({ matchId }: { matchId: string }) {
  const [step, setStep] = useState<Step>("places");
  const [tribuneId, setTribuneId] = useState(TRIBUNES[0].id);
  const [qty, setQty] = useState(2);
  const [holder, setHolder] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState(METHODS[0].id);
  const [paying, setPaying] = useState(false);
  const [tickets, setTickets] = useState<StoredTicket[]>([]);

  const tribune = TRIBUNES.find((t) => t.id === tribuneId)!;
  const total = tribune.price * qty;
  const isMobileMoney = method !== "carte";

  function pay(e: React.FormEvent) {
    e.preventDefault();
    setPaying(true);
    // Paiement simulé : aucun débit réel.
    setTimeout(() => {
      const order = createOrder({ matchId, tribuneId, holder: holder.trim(), price: tribune.price, quantity: qty });
      setTickets(order.tickets);
      setPaying(false);
      setStep("billets");
    }, 1200);
  }

  const steps: { id: Step; label: string }[] = [
    { id: "places", label: "Places" },
    { id: "paiement", label: "Paiement" },
    { id: "billets", label: "Billets" },
  ];
  const current = steps.findIndex((s) => s.id === step);

  return (
    <div>
      <ol className="mb-8 flex border-b border-line text-sm" aria-label="Étapes de l'achat">
        {steps.map((s, i) => (
          <li
            key={s.id}
            aria-current={i === current ? "step" : undefined}
            className={`-mb-px border-b-[3px] px-1 pb-2 pr-6 ${i === current ? "border-pelouse font-semibold text-fg" : i < current ? "border-transparent text-pelouse" : "border-transparent text-faint"}`}
          >
            {i + 1}. {s.label}
          </li>
        ))}
      </ol>

      {step === "places" && (
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-8">
            <fieldset>
              <legend className="mb-3 font-display text-3xl font-bold">Tribune</legend>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {TRIBUNES.map((t) => (
                  <label key={t.id} className={`${choiceClass} flex-col gap-1`}>
                    <span className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 font-semibold">
                        <input type="radio" name="tribune" value={t.id} checked={tribuneId === t.id} onChange={() => setTribuneId(t.id)} className="accent-pelouse" />
                        {t.name}
                      </span>
                      <span className="font-display text-xl font-bold">{fmtPrice(t.price)}</span>
                    </span>
                    <span className="pl-6 text-xs text-faint">{t.perks}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <p id="qty-label" className="mb-3 font-display text-3xl font-bold">
                Nombre de billets
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-md border border-line-strong bg-surface" role="group" aria-labelledby="qty-label">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} className="size-11 text-xl disabled:opacity-30" aria-label="Retirer un billet">
                    −
                  </button>
                  <output className="w-10 text-center font-display text-2xl font-bold" aria-live="polite">
                    {qty}
                  </output>
                  <button type="button" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} disabled={qty >= MAX_QTY} className="size-11 text-xl disabled:opacity-30" aria-label="Ajouter un billet">
                    +
                  </button>
                </div>
                <span className="text-sm text-faint">{MAX_QTY} au maximum par commande</span>
              </div>
            </div>
          </div>

          <Summary tribune={tribune.name} qty={qty} unit={tribune.price} total={total}>
            <button type="button" onClick={() => setStep("paiement")} className={`${buttonClass.primary} w-full`}>
              Continuer vers le paiement
            </button>
          </Summary>
        </div>
      )}

      {step === "paiement" && (
        <form onSubmit={pay} className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-8">
            <fieldset className="space-y-4">
              <legend className="mb-1 font-display text-3xl font-bold">Vos coordonnées</legend>
              <div>
                <label htmlFor="holder" className="mb-1.5 block text-sm font-semibold">
                  Nom et prénom
                </label>
                <input
                  id="holder"
                  required
                  minLength={3}
                  autoComplete="name"
                  value={holder}
                  onChange={(e) => setHolder(e.target.value)}
                  className="w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 user-invalid:border-alerte"
                />
                <p className="mt-1 text-xs text-faint">Imprimé sur chaque billet.</p>
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">
                  Téléphone {isMobileMoney && "du compte Mobile Money"}
                </label>
                <input
                  id="phone"
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="077 12 34 56"
                  pattern="[0-9 +]{8,16}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 user-invalid:border-alerte"
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-display text-3xl font-bold">Moyen de paiement</legend>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {METHODS.map((m) => (
                  <label key={m.id} className={`${choiceClass} items-center gap-2.5`}>
                    <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} className="accent-pelouse" />
                    <span className="text-sm font-semibold">{m.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <p className="border-l-4 border-soleil bg-surface px-4 py-3 text-sm text-muted">
              Démonstration : aucun montant n&apos;est débité et les billets ne donnent pas accès au stade.
            </p>
          </div>

          <Summary tribune={tribune.name} qty={qty} unit={tribune.price} total={total}>
            <button type="submit" disabled={paying} className={`${buttonClass.primary} w-full disabled:opacity-60`}>
              {paying ? "Paiement en cours…" : `Payer ${fmtPrice(total)}`}
            </button>
            <button type="button" onClick={() => setStep("places")} className="w-full py-2 text-sm font-semibold text-muted hover:text-fg">
              Modifier les places
            </button>
          </Summary>
        </form>
      )}

      {step === "billets" && (
        <div role="status">
          <div className="mb-6 border-l-4 border-pelouse bg-surface px-5 py-4">
            <p className="font-display text-3xl font-bold">Paiement accepté</p>
            <p className="mt-1 text-sm text-muted">
              Commande {tickets[0]?.orderId}, {tickets.length} billet{tickets.length > 1 ? "s" : ""}. Vous les retrouvez dans Mes billets sur cet
              appareil.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {tickets.map((t) => {
              const info = ticketInfo(t.matchId, t.tribuneId);
              return info ? <TicketCard key={t.id} ticket={t} info={info} /> : null;
            })}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/mes-billets" className={buttonClass.primary}>
              Voir mes billets
            </Link>
            <Link href="/billetterie" className={buttonClass.secondary}>
              Choisir un autre match
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Summary({ tribune, qty, unit, total, children }: { tribune: string; qty: number; unit: number; total: number; children: React.ReactNode }) {
  return (
    <aside className="h-fit rounded-lg border border-line bg-surface p-5 lg:sticky lg:top-24">
      <h2 className="font-display text-2xl font-bold">Votre commande</h2>
      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Tribune</dt>
          <dd className="font-semibold">{tribune}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">
            {qty} × {fmtPrice(unit)}
          </dt>
          <dd className="font-semibold">{fmtPrice(unit * qty)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Frais de service</dt>
          <dd className="font-semibold">0 FCFA</dd>
        </div>
      </dl>
      <div className="mt-4 flex items-baseline justify-between border-t-2 border-fg pt-3">
        <span className="font-semibold">Total</span>
        <span className="font-display text-4xl font-extrabold">{fmtPrice(total)}</span>
      </div>
      <div className="mt-5 space-y-2">{children}</div>
    </aside>
  );
}
