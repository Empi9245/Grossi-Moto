"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";

const steps = [
  {
    title: "Contatto",
    heading: "Partiamo da quello che ti serve.",
    description:
      "Chiamaci o passa in sede per fissare un appuntamento in officina o per una consulenza.",
    detail: "Raccontaci il modello, come lo usi e cosa vorresti risolvere.",
    image: "/grossimoto/servizi/consulenza.webp",
    alt: "Immagine illustrativa di una consulenza accanto a uno scooter.",
  },
  {
    title: "Diagnosi",
    heading: "Prima capire. Poi intervenire.",
    description:
      "Controllo del veicolo e individuazione delle necessità prima di definire il lavoro.",
    detail: "Un quadro chiaro delle esigenze del tuo mezzo.",
    image: "/grossimoto/servizi/diagnosi-dettaglio.webp",
    alt: "Dettaglio illustrativo di uno strumento diagnostico usato su uno scooter.",
  },
  {
    title: "Intervento",
    heading: "Il lavoro giusto per il tuo mezzo.",
    description:
      "Manutenzione, riparazione o montaggio accessori con materiali adatti al modello e lavorazioni concordate.",
    detail: "Dal tagliando agli accessori, in base a quello che serve.",
    image: "/grossimoto/servizi/manutenzione-dettaglio.webp",
    alt: "Dettaglio illustrativo di un intervento sulla ruota di uno scooter.",
  },
  {
    title: "Riconsegna",
    heading: "Riparti sapendo cosa è stato fatto.",
    description:
      "Controllo finale, spiegazione dei lavori eseguiti e consegna del veicolo pronto su strada.",
    detail: "È il momento di chiarire i tuoi dubbi e tornare in sella.",
    image: "/grossimoto/servizi-hero/agility-s-125-showroom.jpg",
    alt: "Immagine illustrativa di uno scooter Agility S 125 in un contesto urbano.",
  },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

export function ServiceProcess() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = steps[active];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % steps.length
        : event.key === "ArrowLeft"
          ? (index + steps.length - 1) % steps.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? steps.length - 1
              : null;

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <div>
      <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          role="tablist"
          aria-label="Le fasi del servizio"
          className="grid min-w-[42rem] grid-cols-4 border-b border-white/16"
        >
          {steps.map((step, index) => {
            const selected = active === index;
            const number = String(index + 1).padStart(2, "0");

            return (
              <button
                key={step.title}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                id={`process-tab-${index}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`process-panel-${index}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={[
                  "font-ui relative min-h-20 border-t-2 px-3 py-4 text-left transition-[border-color,color,opacity] duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white motion-reduce:transition-none sm:px-4",
                  selected
                    ? "border-[#C72A09] text-white opacity-100"
                    : "border-transparent text-white/52 opacity-80 hover:text-white/78 hover:opacity-100",
                ].join(" ")}
              >
                <span className="font-display block text-2xl font-bold leading-none text-current">
                  {number}
                </span>
                <span className="mt-2 block text-[0.7rem] font-bold uppercase tracking-[0.1em]">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {steps.map((step, index) => (
        <div
          key={step.title}
          id={`process-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`process-tab-${index}`}
          hidden={index !== active}
          tabIndex={index === active ? 0 : -1}
          className="mt-9 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-12"
        >
          {index === active ? (
            <motion.div
              key={current.title}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.2,
                ease: easeOut,
              }}
              className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.72fr)] lg:items-center lg:gap-14"
            >
              <figure className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-white/[0.04] sm:rounded-[32px] lg:aspect-[5/4] lg:rounded-[40px]">
                <Image
                  src={current.image}
                  alt={current.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
                <figcaption className="font-ui absolute bottom-4 left-4 rounded-full bg-[#0A0A0A]/82 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white/78">
                  Immagine illustrativa
                </figcaption>
              </figure>

              <div>
                <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#C72A09]">
                  {String(active + 1).padStart(2, "0")} / 04 · {current.title}
                </p>
                <h3 className="font-display mt-4 max-w-[15ch] text-[clamp(2.7rem,5vw,5.4rem)] font-bold uppercase leading-[0.88] tracking-[-0.035em] text-white">
                  {current.heading}
                </h3>
                <p className="mt-6 max-w-[40rem] text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                  {current.description}
                </p>
                <p className="mt-6 max-w-[38rem] border-t border-white/16 pt-5 text-sm leading-6 text-white/58 sm:text-base sm:leading-7">
                  {current.detail}
                </p>
                <a
                  href="tel:+393289185029"
                  className="font-ui group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#0A0A0A] transition-[opacity,transform] duration-150 hover:opacity-[0.88] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0A0A] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  Parla del tuo mezzo
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                    strokeWidth={1.8}
                  />
                </a>
              </div>
            </motion.div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
