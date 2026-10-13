"use client";

import { QRCodeSVG } from "qrcode.react";
import type { StoredTicket } from "@/lib/tickets";
import { qrPayload } from "@/lib/tickets";

export type TicketMatchInfo = {
  title: string;
  home: string;
  away: string;
  date: string;
  time: string;
  stadium: string;
  tribune: string;
};

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] text-faint">{label}</dt>
      <dd className={`truncate font-semibold ${mono ? "font-mono text-sm" : ""}`}>{value}</dd>
    </div>
  );
}

/** Billet électronique : talon avec QR code séparé par une ligne de découpe. */
export function TicketCard({ ticket, info, onRemove }: { ticket: StoredTicket; info: TicketMatchInfo; onRemove?: () => void }) {
  return (
    <article className="relative rounded-lg border border-line bg-surface">
      <div className="tricolor h-1.5 rounded-t-lg" />
      <div className="grid sm:grid-cols-[1fr_auto]">
        <div className="min-w-0 p-5">
          <p className="text-xs font-medium text-pelouse">LINAF · National Foot 1</p>
          <h3 className="mt-1 font-display text-3xl leading-none font-black uppercase">
            {info.home} <span className="text-faint">-</span> {info.away}
          </h3>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <Field label="Date" value={info.date} />
            <Field label="Coup d'envoi" value={info.time} />
            <Field label="Stade" value={info.stadium} />
            <Field label="Tribune" value={info.tribune} />
            <Field label="Titulaire" value={ticket.holder} />
            <Field label="Commande" value={ticket.orderId} mono />
          </dl>
        </div>

        {/* Ligne de découpe avec encoches */}
        <div className="relative flex flex-col items-center justify-center gap-2 border-t-2 border-dashed border-line-strong p-5 sm:border-t-0 sm:border-l-2">
          <span aria-hidden className="absolute -top-3 -left-3 size-6 rounded-full border border-line bg-bg sm:-top-3 sm:-left-3" />
          <span aria-hidden className="absolute -top-3 -right-3 size-6 rounded-full border border-line bg-bg sm:top-auto sm:right-auto sm:-bottom-3 sm:-left-3" />
          <QRCodeSVG value={qrPayload(ticket)} size={128} level="M" marginSize={0} title="QR code du billet" />
          <p className="font-mono text-[10px] text-faint">{ticket.id.slice(0, 13)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-2 text-xs text-faint">
        <span>Démonstration : ce billet ne donne pas accès au stade.</span>
        {onRemove && (
          <button type="button" onClick={onRemove} className="font-semibold text-muted underline hover:text-alerte">
            Supprimer
          </button>
        )}
      </div>
    </article>
  );
}
