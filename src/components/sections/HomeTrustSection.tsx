"use client";

import { BadgeCheck, Bike, Clock, MapPin, Phone, ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";

const trustPoints = [
  {
    icon: BadgeCheck,
    title: "Rivenditore ufficiale KYMCO",
    copy: "Gamma completa KYMCO e Voge con consulenza diretta in sede.",
  },
  {
    icon: Bike,
    title: "Gamma KYMCO e Voge",
    copy: "27 modelli da 50cc a 900cc, urbani, ruote alte, GT e maxi scooter.",
  },
  {
    icon: MapPin,
    title: "Showroom fisico a Roma",
    copy: "Prova dal vivo posizione di guida, dimensioni e comfort.",
  },
  {
    icon: Wrench,
    title: "Officina",
    copy: "Diagnosi, tagliandi e interventi con ricambi adatti al modello.",
  },
  {
    icon: ShieldCheck,
    title: "Accessori",
    copy: "Valutiamo compatibilità e montaggio in base al tuo uso.",
  },
  {
    icon: Clock,
    title: "Assistenza",
    copy: "Supporto prima e dopo la consegna, in showroom e in officina.",
  },
];

export function HomeTrustSection() {
  return (
    <section className="bg-[oklch(94.5%_0.011_78)] px-5 py-14 text-[oklch(18%_0.014_56)] sm:px-7 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[92rem]">
        <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[oklch(36%_0.09_28)]">
          Perché Grossi Moto
        </p>
        <h2 className="font-display mt-4 max-w-[14ch] text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[0.92]">
          Un punto di riferimento per scooter a Roma.
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map(({ icon: Icon, title, copy }) => (
            <div
              key={title}
              className="rounded-[1.1rem] bg-[oklch(91.5%_0.012_78/0.68)] p-6 shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.08)]"
            >
              <Icon aria-hidden="true" className="h-6 w-6 text-[oklch(36%_0.09_28)]" strokeWidth={1.7} />
              <h3 className="font-ui mt-4 text-sm font-bold uppercase tracking-[0.12em] text-[oklch(18%_0.014_56)]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[oklch(29%_0.014_56/0.72)]">
                {copy}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[34rem] text-sm leading-6 text-[oklch(29%_0.014_56/0.72)]">
            Sei a Roma o nei dintorni? Passa in sede: confrontiamo i modelli dal vivo e vediamo cosa fa per te.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/scooters"
              className="font-ui inline-flex min-h-11 items-center justify-center rounded-full bg-[oklch(18%_0.014_56)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-[oklch(96%_0.01_78)] transition-colors hover:bg-[oklch(26%_0.014_56)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4"
            >
              Vedi la gamma
            </Link>
            <a
              href="https://wa.me/393289185029?text=Ciao%2C%20vorrei%20avere%20informazioni%20sugli%20scooter%20disponibili%20da%20Grossi%20Moto."
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui inline-flex min-h-11 items-center justify-center rounded-full bg-[oklch(91.5%_0.012_78)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-[oklch(18%_0.014_56)] shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.12)] transition-colors hover:bg-[oklch(88%_0.014_76)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4"
            >
              Scrivi su WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
