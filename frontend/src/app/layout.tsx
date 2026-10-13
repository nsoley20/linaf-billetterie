import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"] });
const shoulders = Big_Shoulders({ variable: "--font-shoulders", subsets: ["latin"], axes: ["opsz"], adjustFontFallback: false });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: {
    default: "LINAF · National Foot 1",
    template: "%s · LINAF",
  },
  description: "Billets, calendrier, classement, clubs et joueurs du National Foot 1, le championnat du Gabon.",
};

export const viewport: Viewport = { themeColor: "#0a6b44" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${instrument.variable} ${shoulders.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-fg focus:px-3 focus:py-2 focus:text-white">
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
