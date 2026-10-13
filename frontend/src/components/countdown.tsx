"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 1000);
  return () => clearInterval(t);
};
// Arrondi à la seconde pour que React ne voie un changement qu'une fois par seconde.
const getNow = () => Math.floor(Date.now() / 1000) * 1000;
const getServerNow = () => null;

export function Countdown({ target }: { target: string }) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  const diff = now === null ? null : Math.max(0, Date.parse(target) - now);

  const parts = [
    { label: "Jours", value: diff === null ? null : Math.floor(diff / 86_400_000) },
    { label: "Heures", value: diff === null ? null : Math.floor(diff / 3_600_000) % 24 },
    { label: "Min", value: diff === null ? null : Math.floor(diff / 60_000) % 60 },
    { label: "Sec", value: diff === null ? null : Math.floor(diff / 1000) % 60 },
  ];

  return (
    <div className="grid grid-cols-4 gap-2" role="timer" aria-label="Compte à rebours avant le coup d'envoi">
      {parts.map((p) => (
        <div key={p.label} className="rounded-lg border border-line bg-black/30 px-2 py-2 text-center">
          <div className="font-display text-3xl font-extrabold text-yellow tabular sm:text-4xl">
            {p.value === null ? "--" : String(p.value).padStart(2, "0")}
          </div>
          <div className="text-[10px] tracking-widest text-faint uppercase">{p.label}</div>
        </div>
      ))}
    </div>
  );
}
