"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { showcaseScooters } from "@/data/showcase-scooters";

/** Reduced-motion composition: no pin, scroll handlers, timer or layout morph. */
export function ManualShowcase() {
  const [index, setIndex] = useState(0);
  const scooter = showcaseScooters[index];
  const control =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-40";

  return (
    <section
      aria-labelledby="manual-showroom-title"
      data-showcase-mode="manual"
      data-active-model={scooter.id}
      data-call-cta-theme="black"
      className="relative px-5 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10"
      style={{ background: scooter.backgroundSurface, color: scooter.textTone }}
    >
      <div className="mx-auto max-w-[92rem]">
        <h2
          id="manual-showroom-title"
          className="font-display max-w-[11ch] text-3xl font-bold leading-tight sm:max-w-none sm:text-4xl"
        >
          Scooter in showroom
        </h2>
        <nav
          aria-label="Scegli il modello in showroom"
          className="mt-4 flex flex-wrap gap-1 sm:gap-2"
        >
          {showcaseScooters.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Mostra ${item.name}`}
              aria-pressed={index === itemIndex}
              onClick={() => setIndex(itemIndex)}
              className={`${control} ${index === itemIndex ? "bg-black text-white" : "bg-white/40 hover:bg-white/60"}`}
            >
              {item.shortName}
            </button>
          ))}
        </nav>
        <div className="mt-4 grid items-center gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-10">
          <div
            className="relative aspect-[4/3] w-full lg:aspect-[5/4]"
            data-manual-showroom-image
          >
            <Image
              src={scooter.image}
              alt={`${scooter.name}, vista laterale`}
              fill
              sizes="(min-width: 1024px) 58vw, 95vw"
              className="object-contain"
            />
          </div>
          <div>
            <h3
              className="font-display min-h-[2.1em] text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.05]"
              aria-live="polite"
              aria-atomic="true"
            >
              {scooter.name}
            </h3>
            <p className="mt-3 min-h-[4.5em] max-w-lg text-base leading-6">
              {scooter.statement}
            </p>
            <dl className="mt-5 grid grid-cols-3 gap-3">
              {scooter.specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-sm">{spec.label}</dt>
                  <dd className="mt-1 min-h-14 text-lg font-bold sm:min-h-16 sm:text-2xl">
                    {[spec.value, spec.unit].filter(Boolean).join(" ")}
                  </dd>
                </div>
              ))}
            </dl>
            <div
              className="mt-5 flex items-center justify-between gap-2"
              aria-label="Navigazione modelli"
            >
              <button
                type="button"
                disabled={index === 0}
                onClick={() => setIndex(index - 1)}
                className={control}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Precedente
              </button>
              <button
                type="button"
                disabled={index === showcaseScooters.length - 1}
                onClick={() => setIndex(index + 1)}
                className={control}
              >
                Successivo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <Link
              href={`/scooters?focus=${encodeURIComponent(scooter.id)}`}
              className="mt-4 inline-flex min-h-12 items-center rounded-lg bg-black px-5 text-sm font-semibold text-white outline-none hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
            >
              Scopri il modello
            </Link>
            <Link
              href="/scooters"
              className="ml-4 inline-flex min-h-12 items-center rounded-sm text-sm font-semibold underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-current"
            >
              Tutta la gamma
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
