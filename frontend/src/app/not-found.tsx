import Link from "next/link";
import { buttonClass } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-center py-24 text-center">
      <p className="font-display text-[8rem] leading-none font-extrabold text-yellow">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold uppercase">Hors-jeu !</h1>
      <p className="mt-3 text-muted">Cette page n&apos;existe pas ou a été déplacée.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonClass.yellow}>Retour à l&apos;accueil</Link>
        <Link href="/matchs" className={buttonClass.ghost}>Voir les matchs</Link>
      </div>
    </div>
  );
}
