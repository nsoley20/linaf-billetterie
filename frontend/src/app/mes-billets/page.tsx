import type { Metadata } from "next";
import { MyTickets } from "@/components/my-tickets";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Mes billets" };

export default function MesBilletsPage() {
  return (
    <>
      <PageHeader eyebrow="Billetterie" title="Mes billets">
        Présentez le QR code à l&apos;entrée du stade. Vos billets sont enregistrés sur cet appareil.
      </PageHeader>
      <div className="container-site py-10">
        <MyTickets />
      </div>
    </>
  );
}
