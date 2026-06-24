import type { Metadata } from "next";

import { PageTransitionProvider } from "@/components/transitions/PageTransitionProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Grossimoto | Dealer KYMCO a Roma",
  description:
    "Grossi Moto e dealer e officina autorizzata KYMCO a Roma, in Via Festo Porzio 22.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body suppressHydrationWarning>
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
