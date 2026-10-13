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
  { id: "airtel", label: "Airtel Money", dot: "#e53935" },
  { id: "moov", label: "Moov Money", dot: "#1e88e5" },
  { id: "carte", label: "Carte bancaire", dot: "#fcd116" },
];
const MAX_QTY = 6;
const FEES = 0; // frais de service

type Step = "choix" | "paiement" | "confirme";

export function Checkout({ matchId }: { matchId: string }) {
  const [step, setStep] = useState<Step>("choix");
  const [tribuneId, setTribuneId] = useState(TRIBUNES[0].id);
  const [qty, setQty] = useState(2);
  const [holder, setHolder] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState(METHODS[0].id);
  const [paying, setPaying] = useState(false);
  const [tickets, setTickets] = useState<StoredTicket[]>([]);

  const tribune = TRIBUNES.find((t) => t.id === tribuneId)!;
  const total = tribune.price * qty + FEES;
  const isMobileMoney = method !== "carte";

  function pay(e: React.FormEvent) {
    e.preventDefault();
    setPaying(true);
    // Paiement simulé : aucun débit réel n'est effectué.
    setTimeout(() => {
      const order = createOrder({ matchId, tribuneId, holder: holder.trim(), price: tribune.price, quantity: qty });
      setTickets(order.tickets);
      setPaying(false);
      setStep("confirme");
    }, 1200);
  }

  const steps: { id: Step; label: string }[] = [
    { id: "choix", label: "Places" },
    { id: "paiement", label: "Paiement" },
    { id: "confirme", label: "Billets" },
  ];
  const current = steps.findIndex((s) => s.id === step);

  return (
    <div>
      <ol className="mb-8 flex items-center gap-2 text-sm" aria-label="Étapes">
        {steps.map((s, i) => (
          <li key={s.id} className="flex items-center gap-2" aria-current={i === current ? "step" : undefined}>
            <span className={`grid size-7 place-items-center rounded-full text-xs font-bold ${i <= current ? "bg-green text-white" : "border border-line-strong text-faint"}`}>
              {i < current ? "✓" : i + 1}
            </span>
            <span className={i === current ? "font-semibold" : "text-faint"}>{s.label}</span>
            {i < steps.length - 1 && <span className="mx-1 h-px w-6 bg-line-strong sm:w-12" />}
          </li>
        ))}
      </ol>

      {step === "choix" && (
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <fieldset>
            <legend className="mb-3 font-display text-2xl font-bold uppercase">Choisissez votre tribune</legend>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {TRIBUNES.map((t) => (
                <label
                  key={t.id}
                  className="flex cursor-pointer flex-col gap-1 rounded-xl border border-line bg-surface p-4 transition hover:border-line-strong has-checked:border-green has-checked:bg-green/10"
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 font-semibold">
                      <input type="radio" name="tribune" value={t.id} checked={tribuneId === t.id} onChange={() => setTribuneId(t.id)} className="accent-green" />
                      {t.name}
                    </span>
                    <span className="font-display text-xl font-bold text-yellow">{fmtPrice(t.price)}</span>
                  </span>
                  <span className="pl-6 text-xs text-faint">{t.perks}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span id="qty-label" className="font-semibold">Nombre de billets</span>
              <div className="flex items-center rounded-lg border border-line-strong" role="group" aria-labelledby="qty-label">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} className="size-10 text-xl disabled:opacity-30" aria-label="Retirer un billet">−</button>
                <output className="w-10 text-center font-display text-2xl font-bold" aria-live="polite">{qty}</output>
                <button type="button" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} disabled={qty >= MAX_QTY} className="size-10 text-xl disabled:opacity-30" aria-label="Ajouter un billet">+</button>
              </div>
              <span className="text-xs text-faint">max. {MAX_QTY} par commande</span>
            </div>
          </fieldset>

          <Summary tribune={tribune.name} qty={qty} unit={tribune.price} total={total}>
            <button type="button" onClick={() => setStep("paiement")} className={`${buttonClass.yellow} w-full`}>
              Continuer
            </button>
          </Summary>
        </div>
      )}

      {step === "paiement" && (
        <form onSubmit={pay} className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <fieldset className="space-y-4">
              <legend className="mb-1 font-display text-2xl font-bold uppercase">Vos coordonnées</legend>
              <div>
                <label htmlFor="holder" className="mb-1.5 block text-sm text-muted">Nom complet (imprimé sur les billets)</label>
                <input id="holder" required minLength={3} autoComplete="name" value={holder} onChange={(e) => setHolder(e.target.value)}
                  className="w-full rounded-lg border border-line-strong bg-surface px-3 py-2.5 user-invalid:border-red" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm text-muted">Téléphone {isMobileMoney && "(compte Mobile Money)"}</label>
                <input id="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="07 12 34 56" pattern="[0-9 +]{8,16}"
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-line-strong bg-surface px-3 py-2.5 user-invalid:border-red" />
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-display text-2xl font-bold uppercase">Moyen de paiement</legend>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {METHODS.map((m) => (
                  <label key={m.id} className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-surface p-4 has-checked:border-green has-checked:bg-green/10">
                    <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} className="accent-green" />
                    <span className="size-2.5 rounded-full" style={{ background: m.dot }} />
                    <span className="text-sm font-semibold">{m.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <p className="rounded-xl border border-yellow/30 bg-yellow/[0.06] p-4 text-sm text-muted">
              <strong className="text-yellow">Mode démonstration</strong> : le paiement est simulé, aucun montant n&apos;est débité et les
              billets générés ne permettent pas d&apos;entrer au stade.
            </p>
          </div>

          <Summary tribune={tribune.name} qty={qty} unit={tribune.price} total={total}>
            <button type="submit" disabled={paying} className={`${buttonClass.yellow} w-full disabled:opacity-60`}>
              {paying ? "Paiement en cours…" : `Payer ${fmtPrice(total)}`}
            </button>
            <button type="button" onClick={() => setStep("choix")} className="w-full py-2 text-sm text-muted hover:text-fg">
              ← Modifier les places
            </button>
          </Summary>
        </form>
      )}

      {step === "confirme" && (
        <div role="status">
          <div className="mb-6 rounded-2xl border border-green/40 bg-green/10 p-5">
            <p className="font-display text-3xl font-bold uppercase text-green-2">Commande confirmée</p>
            <p className="mt-1 text-sm text-muted">
              {tickets.length} billet{tickets.length > 1 ? "s" : ""} · commande {tickets[0]?.orderId}. Retrouvez-les à tout moment dans « Mes billets ».
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {tickets.map((t) => {
              const info = ticketInfo(t.matchId, t.tribuneId);
              return info ? <TicketCard key={t.id} ticket={t} info={info} /> : null;
            })}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/mes-billets" className={buttonClass.primary}>Voir mes billets</Link>
            <Link href="/billetterie" className={buttonClass.ghost}>Acheter pour un autre match</Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Summary({ tribune, qty, unit, total, children }: { tribune: string; qty: number; unit: number; total: number; children: React.ReactNode }) {
  return (
    <aside className="h-fit rounded-2xl border border-line bg-surface p-5 lg:sticky lg:top-24">
      <h2 className="text-xs font-bold tracking-[0.2em] text-faint uppercase">Récapitulatif</h2>
      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex justify-between"><dt className="text-faint">Tribune</dt><dd>{tribune}</dd></div>
        <div className="flex justify-between"><dt className="text-faint">Billets</dt><dd>× {qty}</dd></div>
        <div className="flex justify-between"><dt className="text-faint">Prix unitaire</dt><dd>{fmtPrice(unit)}</dd></div>
        <div className="flex justify-between"><dt className="text-faint">Frais de service</dt><dd>{FEES ? fmtPrice(FEES) : "Offerts"}</dd></div>
      </dl>
      <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
        <span className="font-semibold">Total</span>
        <span className="font-display text-3xl font-extrabold text-yellow">{fmtPrice(total)}</span>
      </div>
      <div className="mt-5 space-y-2">{children}</div>
    </aside>
  );
}
