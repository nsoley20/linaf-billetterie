"use client";

import Link from "next/link";
import { ticketInfo } from "@/lib/ticket-info";
import { removeTicket, useTickets } from "@/lib/tickets";
import { TicketCard } from "./ticket-card";
import { buttonClass } from "./ui";

export function MyTickets() {
  const tickets = useTickets();

  if (tickets === null) {
    return <div className="h-48 animate-pulse rounded-lg bg-surface" aria-label="Chargement des billets" />;
  }

  if (tickets.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line-strong bg-surface p-10 text-center">
        <p className="font-display text-3xl font-bold">Aucun billet sur cet appareil</p>
        <p className="mt-2 text-muted">Achetez des places pour un match : vos billets s&apos;afficheront ici.</p>
        <Link href="/billetterie" className={`${buttonClass.primary} mt-6`}>
          Choisir un match
        </Link>
      </div>
    );
  }

  const sorted = [...tickets].sort((a, b) => b.purchasedAt.localeCompare(a.purchasedAt));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {sorted.map((t) => {
        const info = ticketInfo(t.matchId, t.tribuneId);
        if (!info) return null;
        return (
          <TicketCard
            key={t.id}
            ticket={t}
            info={info}
            onRemove={() => {
              if (confirm("Supprimer ce billet de cet appareil ?")) removeTicket(t.id);
            }}
          />
        );
      })}
    </div>
  );
}
