import { ActionMark } from "@/components/ui/control-glyphs";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

import { ServicesHero } from "@/components/ui/services-hero";
import { StickyScrollShowcase } from "@/components/sections/StickyScrollShowcase";
import { ServiceProcess } from "@/components/sections/ServiceProcess";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = pageMetadata("Officina scooter a Roma: tagliandi e assistenza", "Tagliandi, diagnosi, ricambi e accessori per il tuo scooter a Roma. Contatta l’officina Grossi Moto in Via Festo Porzio 22 e raccontaci cosa ti serve.", "/servizi");

const navItems = [
  { label: "Gamma", href: "/scooters" },
  { label: "Servizi", href: "/servizi" },
  { label: "Contatti", href: "/contatti" },
];

function ServicesNav() {
  return (
    <header className="hidden bg-white px-2 sm:px-4 md:block lg:absolute lg:left-2 lg:top-0 lg:z-30 lg:w-fit lg:rounded-br-[28px] lg:px-5">
      <nav
        aria-label="Navigazione Grossimoto"
        className="mx-auto flex min-h-[5.6rem] max-w-[122rem] items-center justify-between gap-3 px-3 py-3 text-[#0A0A0A] sm:px-4 lg:w-fit lg:max-w-none lg:justify-start lg:gap-8 lg:px-5"
      >
        <Link
          href="/"
          aria-label="Torna alla home Grossimoto"
          className="font-ui group flex min-w-0 flex-col rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
        >
          <span className="text-base font-bold leading-none transition-opacity duration-150 group-hover:opacity-68 sm:text-lg">
            Grossimoto
          </span>
          <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.17em] text-black/48">
            Moto e scooter a Roma
          </span>
        </Link>

        <div className="font-ui hidden min-h-11 items-center gap-1 rounded-full bg-[#0A0A0A] p-1 text-sm font-bold text-white/72 lg:flex">
          {navItems.map((item) => {
            const current = item.href === "/servizi";
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={[
                  "rounded-full px-6 py-2.5 transition-[background-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none",
                  current
                    ? "bg-white text-[#0A0A0A]"
                    : "text-white/72 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 justify-end lg:hidden">
          <a
            href="tel:+393289185029"
            className="font-ui inline-flex min-h-11 items-center gap-2 rounded-[0.9rem] bg-[#0A0A0A] px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white transition-[opacity,transform] duration-150 hover:opacity-[0.84] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none sm:px-4"
          >
            <PhoneCall aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            <span className="hidden sm:inline">Chiama ora</span>
            <span className="sm:hidden">Chiama</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default function ServiziPage() {
  return (
    <main id="main-content" className="relative min-h-screen bg-white text-[#0A0A0A]">
      <ServicesNav />
      <ServicesHero />
      <StickyScrollShowcase />

      <section className="bg-[#111111] px-5 py-20 text-[#F7F4EF] sm:px-7 sm:py-28 md:px-10 lg:px-14 lg:py-32 xl:px-20">
        <div className="mx-auto max-w-[80rem]">
          <div className="mb-14 max-w-[42rem] sm:mb-20">
            <p className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.22em] opacity-50 sm:text-xs">
              Come funziona
            </p>
            <h2 className="font-display font-editorial mt-4 text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[0.9] tracking-tight">
              Dal contatto
              <br />
              alla riconsegna.
            </h2>
          </div>

          <ServiceProcess />
        </div>
      </section>

      <section className="bg-white px-2 pt-2 sm:px-4 sm:pt-4 lg:px-5 lg:pt-5">
        <div className="overflow-hidden rounded-[32px] bg-[#A34A3E] px-5 py-16 text-white sm:rounded-[40px] sm:px-7 sm:py-20 md:px-10 lg:rounded-[56px] lg:px-14 lg:py-28 xl:px-16">
          <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(24rem,0.8fr)] lg:items-end lg:gap-16">
            <div>
              <h2 className="font-display font-editorial max-w-[10ch] text-[clamp(3.4rem,10vw,8.5rem)] font-bold uppercase leading-[0.84] tracking-[-0.04em]">
                Prenota un intervento.
              </h2>
            </div>

            <div className="max-w-[36rem]">
              <p className="text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
                Hai un tagliando da fare o un problema da capire? Chiamaci con modello e chilometraggio, oppure descrivici la tua esigenza nel modulo.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="tel:+393289185029"
                  className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] bg-[#0A0A0A] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-[opacity,transform] duration-150 hover:opacity-[0.88] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-[#A34A3E] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  Chiama ora
                  <PhoneCall aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                </a>
                <Link
                  href="/contatti?argomento=officina#richiesta"
                  className="font-ui group inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] border border-white/58 bg-white/[0.04] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-[background-color,transform] duration-150 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#A34A3E] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  Scrivi all’officina
                  <ActionMark />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-10 bg-white sm:h-14 lg:h-20" aria-hidden="true" />
      <SiteFooter />
    </main>
  );
}
