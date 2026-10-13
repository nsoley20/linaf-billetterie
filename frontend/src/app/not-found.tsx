import Link from "next/link";
import { buttonClass } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-center py-24 text-center">
      <p className="font-display text-[8rem] leading-none font-black text-pelouse">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold">Page introuvable</h1>
      <p className="mt-3 text-muted">Vérifiez l&apos;adresse, ou repartez de l&apos;accueil.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonClass.primary}>Accueil</Link>
        <Link href="/matchs" className={buttonClass.secondary}>Calendrier</Link>
      </div>
    </div>
  );
}
