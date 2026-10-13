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

/** Billet électronique avec QR code. */
export function TicketCard({ ticket, info, onRemove }: { ticket: StoredTicket; info: TicketMatchInfo; onRemove?: () => void }) {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-fg text-black shadow-xl shadow-black/40">
      <div className="tricolor h-1.5" />
      <div className="grid gap-4 p-5 sm:grid-cols-[1fr_auto]">
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-[0.2em] text-black/50 uppercase">LINAF · National Foot 1</p>
          <h3 className="mt-1 font-display text-2xl leading-tight font-extrabold uppercase">
            {info.home} <span className="text-black/40">vs</span> {info.away}
          </h3>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div><dt className="text-[10px] text-black/50 uppercase">Date</dt><dd className="font-semibold">{info.date}</dd></div>
            <div><dt className="text-[10px] text-black/50 uppercase">Coup d&apos;envoi</dt><dd className="font-semibold">{info.time}</dd></div>
            <div><dt className="text-[10px] text-black/50 uppercase">Stade</dt><dd className="font-semibold">{info.stadium}</dd></div>
            <div><dt className="text-[10px] text-black/50 uppercase">Tribune</dt><dd className="font-semibold">{info.tribune}</dd></div>
            <div><dt className="text-[10px] text-black/50 uppercase">Titulaire</dt><dd className="truncate font-semibold">{ticket.holder}</dd></div>
            <div><dt className="text-[10px] text-black/50 uppercase">Commande</dt><dd className="font-mono font-semibold">{ticket.orderId}</dd></div>
          </dl>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 border-t border-dashed border-black/20 pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
          <QRCodeSVG value={qrPayload(ticket)} size={132} level="M" marginSize={0} title="QR code du billet" />
          <p className="font-mono text-[10px] text-black/50">{ticket.id.slice(0, 13)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 bg-black/[0.06] px-5 py-2 text-[11px] text-black/60">
        <span>Démo : billet non valable pour l&apos;entrée au stade</span>
        {onRemove && (
          <button type="button" onClick={onRemove} className="font-semibold text-black/70 underline hover:text-black">
            Supprimer
          </button>
        )}
      </div>
    </article>
  );
}
