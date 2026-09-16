import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  Cog,
  PhoneCall,
} from "lucide-react";

import { ServicesHero } from "@/components/ui/services-hero";
import { StickyScrollShowcase } from "@/components/sections/StickyScrollShowcase";
import { ServiceProcess } from "@/components/sections/ServiceProcess";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = pageMetadata("Officina scooter a Roma: tagliandi e assistenza", "Tagliandi, diagnosi, ricambi e accessori per il tuo scooter a Roma. Contatta l’officina Grossi Moto in Via Festo Porzio 22 e raccontaci cosa ti serve.", "/servizi");

export default function ServiziPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#111111]">
      {/* ── Nav back ──────────────────────────────────────────── */}
      <div className="fixed left-0 top-0 z-50 w-full px-5 py-4 sm:px-7 md:px-10 lg:px-14 xl:px-20">
        <Link
          href="/"
          className="font-ui inline-flex items-center gap-2 rounded-full bg-[#111111]/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#F7F4EF] backdrop-blur-md transition-colors duration-200 hover:bg-[#F7F4EF]/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F4EF]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111] sm:text-sm"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-3.5 w-3.5"
            strokeWidth={2}
          />
          Torna alla home
        </Link>
      </div>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <ServicesHero />

      {/* ── Sticky Scroll Showcase ───────────────────────────── */}
      <StickyScrollShowcase />

      {/* ── Showroom Image Break ──────────────────────────────── */}
      <section className="relative h-[50svh] min-h-[320px] overflow-hidden sm:h-[60svh]">
        <Image
          src="/grossimoto/servizi-hero/agility-s-125-showroom.jpg"
          alt="Scooter Agility S 125 in contesto urbano, servizi Grossimoto"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,var(--page-background)_0%,transparent_22%,transparent_78%,#111111_100%)]"
        />
      </section>

      {/* ── Process Section ───────────────────────────────────── */}
      <section className="bg-[#111111] px-5 py-20 text-[#F7F4EF] sm:px-7 sm:py-28 md:px-10 lg:px-14 lg:py-32 xl:px-20">
        <div className="mx-auto max-w-[80rem]">
          <div className="mb-14 max-w-[42rem] sm:mb-20">
            <p className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.22em] opacity-50 sm:text-xs">
              Come funziona
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[0.9] tracking-tight">
              Dal contatto
              <br />
              alla riconsegna.
            </h2>
          </div>

          <ServiceProcess />
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────── */}
      <section className="bg-[oklch(14%_0.014_42)] px-5 py-20 text-[#F7F4EF] sm:px-7 sm:py-28 md:px-10 lg:px-14 lg:py-32 xl:px-20">
        <div className="mx-auto flex max-w-[80rem] flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[38rem]">
            <Cog
              aria-hidden="true"
              className="h-8 w-8 text-[oklch(75%_0.036_68)]"
              strokeWidth={1.4}
            />
            <h2 className="font-display mt-6 text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[0.9] tracking-tight">
              Prenota un
              <br />
              intervento.
            </h2>
            <p className="mt-5 max-w-[32rem] text-base leading-7 text-[#F7F4EF]/60 sm:text-lg">
              Hai un tagliando da fare o un problema da capire? Chiamaci con modello e chilometraggio, oppure descrivici la tua esigenza nel modulo.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="tel:+393289185029"
              className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(91%_0.014_76)] px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[oklch(13%_0.014_42)] transition-[opacity,transform] duration-200 hover:opacity-88 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(72%_0.06_32)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(14%_0.014_42)]"
            >
              Chiama ora
              <PhoneCall
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            </a>
            <a
              href="/contatti?argomento=officina#richiesta"
              className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F7F4EF]/8 px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#F7F4EF] shadow-[inset_0_0_0_1px_rgba(247,244,239,0.16)] transition-[background,transform] duration-200 hover:bg-[#F7F4EF]/14 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F4EF]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(14%_0.014_42)]"
            >
              Scrivi all’officina
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer line ───────────────────────────────────────── */}
      <SiteFooter />
    </main>
  );
}
