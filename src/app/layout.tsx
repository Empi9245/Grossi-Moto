import type { Metadata, Viewport } from "next";

import { MobileAppNav } from "@/components/layout/MobileAppNav";
import { PageTransitionProvider } from "@/components/transitions/PageTransitionProvider";

import "./globals.css";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: "Grossi Moto | Scooter e officina a Roma",
    template: "%s | Grossi Moto",
  },
  description:
    "Scooter, consulenza, accessori e officina a Roma. Grossi Moto ti aiuta a scegliere e seguire il tuo mezzo in Via Festo Porzio 22.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Grossi Moto",
    title: "Grossi Moto | Scooter e officina a Roma",
    description:
      "Scooter, consulenza, accessori e officina a Roma. Grossi Moto ti aiuta a scegliere e seguire il tuo mezzo.",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "Grossi Moto | Scooter e officina a Roma",
    description:
      "Scooter, consulenza, accessori e officina a Roma.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body suppressHydrationWarning>
        <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-[var(--page-background)] px-4 py-3 font-ui text-sm font-bold text-[var(--ink)] shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)]">
          Vai al contenuto principale
        </a>
        <PageTransitionProvider>
          <div className="min-w-0 pb-[calc(5.75rem+env(safe-area-inset-bottom))] lg:pb-0">
            {children}
          </div>
        </PageTransitionProvider>
        <MobileAppNav />
      </body>
    </html>
  );
}
