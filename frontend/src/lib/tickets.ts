"use client";

import { useSyncExternalStore } from "react";

export type StoredTicket = {
  id: string;
  orderId: string;
  matchId: string;
  tribuneId: string;
  holder: string;
  price: number;
  purchasedAt: string;
};

const KEY = "linaf.tickets.v1";
const listeners = new Set<() => void>();
const EMPTY: StoredTicket[] = [];
let cache: { raw: string | null; value: StoredTicket[] } = { raw: null, value: EMPTY };

function read(): StoredTicket[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return EMPTY; // stockage bloqué (navigation privée…)
  }
  if (raw === cache.raw) return cache.value;
  let value = EMPTY;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) value = parsed;
  } catch {
    // donnée corrompue : on repart de zéro
  }
  cache = { raw, value };
  return value;
}

function write(tickets: StoredTicket[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(tickets));
  } catch {
    // stockage indisponible : les billets restent affichés pour cette session uniquement
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

/** Billets enregistrés dans ce navigateur ; `null` pendant le rendu serveur. */
export function useTickets(): StoredTicket[] | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

export function createOrder(input: { matchId: string; tribuneId: string; holder: string; price: number; quantity: number }) {
  const orderId = uid().slice(0, 8).toUpperCase();
  const purchasedAt = new Date().toISOString();
  const created: StoredTicket[] = Array.from({ length: input.quantity }, () => ({
    id: uid(),
    orderId,
    matchId: input.matchId,
    tribuneId: input.tribuneId,
    holder: input.holder,
    price: input.price,
    purchasedAt,
  }));
  write([...read(), ...created]);
  return { orderId, tickets: created };
}

export function removeTicket(id: string) {
  write(read().filter((t) => t.id !== id));
}

/** Contenu encodé dans le QR code. En production : identifiant signé par le serveur. */
export const qrPayload = (t: StoredTicket) => `LINAF:${t.id}:${t.matchId}:${t.tribuneId}`;
