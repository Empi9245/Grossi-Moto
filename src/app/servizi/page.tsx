import { BrandLogo } from "@/components/layout/BrandLogo";
import { ActionMark } from "@/components/ui/control-glyphs";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

import { ServicesHero } from "@/components/ui/services-hero";
import { StickyScrollShowcase } from "@/components/sections/StickyScrollShowcase";
import { ServiceProcess } from "@/components/sections/ServiceProcess";
import { SiteFooter } from "@/components/layout/SiteFooter";
import styles from "@/components/sections/journey.module.css";
import heroStyles from "@/components/ui/services-hero.module.css";

export const metadata = pageMetadata("Officina scooter a Roma: tagliandi e assistenza", "Tagliandi, diagnosi, ricambi e accessori per il tuo scooter a Roma. Contatta l’officina Grossi Moto in Via Festo Porzio 22 e raccontaci cosa ti serve.", "/servizi");

const navItems = [
  { label: "Home", href: "/" },
  { label: "Gamma", href: "/scooters" },
  { label: "Servizi", href: "/servizi" },
  { label: "Contatti", href: "/contatti" },
];

function ServicesNav() {
  return (
    <header className="bg-white px-2 sm:px-4 xl:absolute xl:inset-x-2 xl:top-0 xl:z-30 xl:bg-transparent xl:px-0">
      <nav
        aria-label="Navigazione Grossimoto"
        className={`${heroStyles.navigation} mx-auto flex min-h-[5.6rem] max-w-[122rem] items-center justify-between gap-3 px-3 py-3 text-[#0A0A0A] sm:px-4 xl:grid xl:w-full xl:grid-cols-[1fr_auto_1fr] xl:px-5`}
      >
        <Link
          href="/"
          aria-label="Torna alla home Grossimoto"
          className="group inline-flex min-w-0 items-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
        >
          <BrandLogo tone="black" priority className="w-[8.25rem] sm:w-[9rem]" />
        </Link>

        <div data-services-menu className="font-ui hidden min-h-11 items-center gap-1 rounded-full bg-[#0A0A0A] p-1 text-sm font-bold text-white/72 lg:flex">
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

        <div className="flex shrink-0 justify-end xl:justify-self-end">
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
    <main id="main-content" tabIndex={-1} className="relative min-h-screen bg-white text-[#0A0A0A]">
      <ServicesNav />
      <ServicesHero />
      <StickyScrollShowcase />

      <section aria-labelledby="service-process-heading" className={`bg-[#111111] text-[#F7F4EF] ${styles.section}`}>
        <div className={styles.frame}>
          <div className="mb-8 lg:mb-10">
            <h2 id="service-process-heading" className={`font-display ${styles.heading}`}>
              Dal contatto
              {" "}
              alla riconsegna.
            </h2>
          </div>

          <ServiceProcess />
        </div>
      </section>

      <section className="bg-white px-2 pt-2 sm:px-4 sm:pt-4 lg:px-5 lg:pt-5">
        <div className={`rounded-[32px] bg-[#A34A3E] text-white sm:rounded-[40px] lg:rounded-[56px] ${styles.section} ${styles.inset}`}>
          <div className={`${styles.frame} grid gap-6 md:grid-cols-2 md:gap-10 lg:gap-16`}>
            <div>
              <h2 className={`font-display ${styles.heading}`}>
                Parla con l’officina.
              </h2>
            </div>

            <div className="max-w-[36rem]">
              <p className={styles.body}>
                Hai un tagliando da fare o un problema da capire? Chiamaci con modello e chilometraggio, oppure descrivici la tua esigenza nel modulo.
              </p>
              <div className={styles.actions}>
                <a
                  href="tel:+393289185029"
                  className={`font-ui ${styles.primary}`}
                >
                  Chiama ora
                  <PhoneCall aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                </a>
                <Link
                  href="/contatti?argomento=officina#richiesta"
                  className={`font-ui ${styles.inverse} ${styles.secondary}`}
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
