import Link from "next/link";
import { ArrowUpRight, PhoneCall } from "lucide-react";

import { showcaseScooters } from "@/data/showcase-scooters";

const finalShowcaseSurface =
  showcaseScooters[showcaseScooters.length - 1]?.backgroundSurface ??
  "var(--home-showroom-surface)";

export function ShowcaseCoverCta() {
  return (
    <section className="relative z-30 bg-white text-[var(--gm-ink)]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-8 bg-[var(--home-showroom-surface)] sm:h-10 lg:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 hidden h-14 bg-bottom bg-no-repeat lg:block lg:bg-[length:100%_100svh]"
        style={{ backgroundImage: finalShowcaseSurface }}
      />

      <div className="relative overflow-hidden rounded-[32px] bg-[var(--home-cover-surface)] px-4 py-20 sm:rounded-[40px] sm:px-6 lg:rounded-[56px] lg:px-10 lg:py-28">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-black/10" />

        <div className="relative mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.55fr)] lg:items-end">
          <div>
            <p className="font-ui text-xs font-bold uppercase tracking-[0.18em] text-black/60">
              Grossi Moto, Roma
            </p>
            <h2 className="font-display mt-4 max-w-[12ch] text-[clamp(3.5rem,12vw,8.5rem)] font-bold leading-[0.88] tracking-normal">
              Scegli la taglia giusta, dal vivo.
            </h2>
          </div>

          <div className="max-w-[34rem]">
            <p className="text-base leading-7 text-black/72 sm:text-lg">
              Tra due modelli, la differenza si sente in sella. Confrontiamo insieme altezza, posizione di guida e spazio in base ai tuoi tragitti.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/scooters"
                className="font-ui inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--gm-black)] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-white transition-opacity duration-200 hover:opacity-88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--home-cover-surface)] sm:w-auto"
              >
                Confronta i modelli
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </Link>
              <a
                href="tel:+393289185029"
                className="font-ui inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-black/16 bg-black/[0.035] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-black transition-colors duration-200 hover:bg-black/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--home-cover-surface)] sm:w-auto"
              >
                Chiedi un consiglio
                <PhoneCall aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
