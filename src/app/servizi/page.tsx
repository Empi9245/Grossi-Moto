import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  ClipboardCheck,
  Cog,
  CreditCard,
  Handshake,
  Package,
  PhoneCall,
  Settings2,
  Wrench,
} from "lucide-react";

import { ServicesHero } from "@/components/ui/services-hero";

export const metadata: Metadata = {
  title: "Servizi | Grossimoto KYMCO e VOGE Roma",
  description:
    "Servizi ufficiali KYMCO e VOGE a Roma: tagliandi, officina specializzata, ricambi originali, finanziamenti, permute e consulenza. Grossi Moto in Via Festo Porzio.",
};

const serviceCards = [
  {
    icon: Wrench,
    title: "Officina specializzata",
    description:
      "Interventi su scooter e moto KYMCO e VOGE con attrezzature dedicate e tecnici certificati.",
  },
  {
    icon: ClipboardCheck,
    title: "Tagliandi ufficiali",
    description:
      "Manutenzione programmata secondo le specifiche del costruttore per mantenere la garanzia attiva.",
  },
  {
    icon: Package,
    title: "Ricambi originali",
    description:
      "Ricambi genuini KYMCO e VOGE sempre disponibili in sede o ordinabili in tempi rapidi.",
  },
  {
    icon: CreditCard,
    title: "Finanziamenti",
    description:
      "Soluzioni di pagamento rateale personalizzate per acquisto scooter nuovi e usati.",
  },
  {
    icon: Handshake,
    title: "Permute",
    description:
      "Valutazione gratuita del tuo usato per passare al modello KYMCO o VOGE più adatto.",
  },
  {
    icon: Settings2,
    title: "Consulenza dedicata",
    description:
      "Scelta del modello, configurazione accessori e consigli personalizzati in base alle tue esigenze.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Contatto",
    description:
      "Chiamaci o passa in sede per fissare un appuntamento in officina o per una consulenza.",
  },
  {
    step: "02",
    title: "Diagnosi",
    description:
      "Analisi del veicolo con strumentazione dedicata KYMCO e VOGE per identificare ogni necessità.",
  },
  {
    step: "03",
    title: "Intervento",
    description:
      "Manutenzione, riparazione o montaggio accessori con ricambi originali e garanzia sul lavoro.",
  },
  {
    step: "04",
    title: "Riconsegna",
    description:
      "Controllo finale, spiegazione dei lavori eseguiti e consegna del veicolo pronto su strada.",
  },
];

export default function ServiziPage() {
  return (
    <main className="min-h-screen bg-[#111111]">
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
          Home
        </Link>
      </div>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <ServicesHero />

      {/* ── Service Cards Grid ────────────────────────────────── */}
      <section className="bg-[var(--page-background)] px-5 py-20 sm:px-7 sm:py-28 md:px-10 lg:px-14 lg:py-32 xl:px-20">
        <div className="mx-auto max-w-[80rem]">
          <div className="mb-14 max-w-[42rem] sm:mb-20">
            <p className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[oklch(36%_0.09_28)] sm:text-xs">
              I nostri servizi
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[0.9] tracking-tight text-[oklch(17%_0.014_50)]">
              Tutto quello che serve
              <br />
              al tuo scooter.
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-7 text-[oklch(29%_0.014_56/0.72)] sm:text-lg">
              Un unico punto di riferimento per la cura completa del tuo
              veicolo, dalla manutenzione ordinaria alla consulenza
              all&rsquo;acquisto.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group rounded-2xl border border-[oklch(17%_0.014_50/0.08)] bg-[oklch(94.5%_0.011_78)] p-6 transition-shadow duration-300 hover:shadow-[0_24px_64px_oklch(18%_0.014_56/0.08)] sm:rounded-3xl sm:p-8"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-6 w-6 text-[oklch(36%_0.09_28)]"
                    strokeWidth={1.6}
                  />
                  <h3 className="font-ui mt-5 text-lg font-bold tracking-normal text-[oklch(17%_0.014_50)] sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[oklch(29%_0.014_56/0.72)] sm:text-base sm:leading-7">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Showroom Image Break ──────────────────────────────── */}
      <section className="relative h-[50svh] min-h-[320px] overflow-hidden sm:h-[60svh]">
        <Image
          src="/kymco-all/sections/xciting-vs-400-dsc8274-scaled-dsc8274-scaled.jpg"
          alt="KYMCO Xciting VS 400 dettaglio laterale in studio"
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

          <div className="grid gap-px overflow-hidden rounded-2xl bg-[#F7F4EF]/8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="flex flex-col bg-[#111111] p-6 sm:p-8"
              >
                <span className="font-display text-[2.5rem] font-[900] leading-none tracking-tight text-[#F7F4EF]/12">
                  {item.step}
                </span>
                <h3 className="font-ui mt-4 text-lg font-bold tracking-normal sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#F7F4EF]/60 sm:text-base sm:leading-7">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
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
              Prenota il tuo
              <br />
              intervento.
            </h2>
            <p className="mt-5 max-w-[32rem] text-base leading-7 text-[#F7F4EF]/60 sm:text-lg">
              Chiama direttamente Grossi Moto per fissare un appuntamento in
              officina o per una consulenza personalizzata.
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
              href="/contatti"
              className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F7F4EF]/8 px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#F7F4EF] shadow-[inset_0_0_0_1px_rgba(247,244,239,0.16)] transition-[background,transform] duration-200 hover:bg-[#F7F4EF]/14 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F4EF]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(14%_0.014_42)]"
            >
              Contattaci
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
      <div className="bg-[oklch(14%_0.014_42)] px-5 pb-8 sm:px-7 md:px-10 lg:px-14 xl:px-20">
        <div className="mx-auto max-w-[80rem] border-t border-[#F7F4EF]/8 pt-6">
          <p className="font-ui text-xs font-bold uppercase tracking-[0.14em] text-[#F7F4EF]/30">
            Grossimoto / Servizi KYMCO e VOGE Roma
          </p>
        </div>
      </div>
    </main>
  );
}
