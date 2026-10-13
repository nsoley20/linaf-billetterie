import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "LINAF — National Foot 1 · Billetterie, classement, équipes",
    template: "%s · LINAF",
  },
  description:
    "Le site du National Foot 1 gabonais : billetterie avec QR code, calendrier, classement, clubs, joueurs et statistiques.",
};

export const viewport: Viewport = { themeColor: "#060b14" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${inter.variable} ${barlow.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-yellow focus:px-3 focus:py-2 focus:text-black">
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
