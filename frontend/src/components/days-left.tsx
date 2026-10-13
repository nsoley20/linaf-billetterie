"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 60_000);
  return () => clearInterval(t);
};
// Arrondi à la minute : React ne voit un changement qu'une fois par minute.
const getNow = () => Math.floor(Date.now() / 60_000) * 60_000;
const getServerNow = () => null;

/** « dans 11 jours », « demain », « aujourd'hui » ; rien pendant le rendu serveur. */
export function DaysLeft({ target }: { target: string }) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  if (now === null) return null;

  const diff = Date.parse(target) - now;
  if (diff <= 0) return <>coup d&apos;envoi donné</>;
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return <>aujourd&apos;hui</>;
  if (days === 1) return <>demain</>;
  return <>dans {days} jours</>;
}
