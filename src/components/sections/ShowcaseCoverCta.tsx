"use client";

import Link from "next/link";
import { ArrowUpRight, PhoneCall } from "lucide-react";

export function ShowcaseCoverCta() {
  return (
    <section className="relative isolate z-10 overflow-hidden bg-[oklch(13%_0.012_40)] px-5 py-16 text-[oklch(94%_0.01_80)] sm:px-7 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(26rem,0.7fr)] lg:items-center">
        <div>
          <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[oklch(75%_0.036_68)]">
            Showroom
          </p>
          <h2 className="font-display mt-4 max-w-[14ch] text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-normal">
            Uno scooter va provato dal vivo.
          </h2>
          <p className="mt-5 max-w-[34rem] text-base leading-7 text-[oklch(82%_0.012_74)] sm:text-lg">
            Le proporzioni cambiano quando sali in sella. In showroom puoi
            confrontare posizione, altezza e uso reale prima di scegliere.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/scooters"
              className="font-ui inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[oklch(91%_0.014_76)] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-[oklch(13%_0.014_42)] transition-opacity duration-200 hover:opacity-88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(72%_0.06_32)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(13%_0.014_42)] sm:w-auto"
            >
              Confronta i modelli
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </Link>
            <a
              href="https://wa.me/393289185029?text=Ciao%2C%20vorrei%20avere%20informazioni%20sugli%20scooter%20disponibili%20da%20Grossi%20Moto."
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[oklch(94%_0.01_80/0.08)] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-[oklch(94%_0.01_80)] shadow-[inset_0_0_0_1px_oklch(94%_0.01_80/0.16)] transition-colors duration-200 hover:bg-[oklch(94%_0.01_80/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(72%_0.06_32)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(13%_0.014_42)] sm:w-auto"
            >
              Parla con Grossi Moto
              <PhoneCall aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.35rem] bg-[oklch(17%_0.014_40)] p-1 shadow-[0_24px_60px_rgba(17,11,9,0.28)]">
          <div className="aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-[oklch(22%_0.016_45)]">
            <img
              src="/grossimoto/servizi-hero/agility-s-125-showroom.jpg"
              alt="Showroom Grossi Moto con scooter in esposizione"
              className="h-full w-full object-cover"
              width={800}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
