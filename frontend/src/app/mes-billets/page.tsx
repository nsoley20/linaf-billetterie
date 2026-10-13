import type { Metadata } from "next";
import { MyTickets } from "@/components/my-tickets";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Mes billets" };

export default function MesBilletsPage() {
  return (
    <>
      <PageHeader kicker="Billetterie" title="Mes billets">
        Montrez le QR code à l&apos;entrée du stade. Les billets restent sur ce téléphone ou cet ordinateur.
      </PageHeader>
      <div className="container-site py-8">
        <MyTickets />
      </div>
    </>
  );
}
