"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, MessageCircle, ScanLine, Wrench, KeyRound } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

const steps = [
  {
    title: "Contatto",
    icon: MessageCircle,
    heading: "Partiamo da quello che ti serve.",
    description:
      "Chiamaci o passa in sede per fissare un appuntamento in officina o per una consulenza.",
    detail: "Raccontaci il modello, come lo usi e cosa vorresti risolvere.",
    image: "/grossimoto/servizi/consulenza.webp",
    alt: "Immagine illustrativa di una consulenza accanto a uno scooter.",
  },
  {
    title: "Diagnosi",
    icon: ScanLine,
    heading: "Prima capire. Poi intervenire.",
    description:
      "Controllo del veicolo e individuazione delle necessità prima di definire il lavoro.",
    detail: "Un quadro chiaro delle esigenze del tuo scooter.",
    image: "/grossimoto/servizi/diagnosi-dettaglio.webp",
    alt: "Dettaglio illustrativo di uno strumento diagnostico usato su uno scooter.",
  },
  {
    title: "Intervento",
    icon: Wrench,
    heading: "Il lavoro giusto per il tuo mezzo.",
    description:
      "Manutenzione, riparazione o montaggio accessori con materiali adatti al modello e lavorazioni concordate.",
    detail: "Dal tagliando agli accessori, in base a quello che serve.",
    image: "/grossimoto/servizi/manutenzione-dettaglio.webp",
    alt: "Dettaglio illustrativo di un intervento sulla ruota di uno scooter.",
  },
  {
    title: "Riconsegna",
    icon: KeyRound,
    heading: "Riparti sapendo cosa è stato fatto.",
    description:
      "Controllo finale, spiegazione dei lavori eseguiti e consegna del veicolo pronto su strada.",
    detail: "È il momento di chiarire i tuoi dubbi e tornare in sella.",
    image: "/grossimoto/servizi-hero/agility-s-125-showroom.jpg",
    alt: "Immagine illustrativa di uno scooter Agility S 125 in un contesto urbano.",
  },
] as const;

const autoAdvanceDelayMs = 6000;

export function ServiceProcess() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = steps[active];

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setTimeout(() => {
      setActive((currentActive) => (currentActive + 1) % steps.length);
    }, autoAdvanceDelayMs);

    return () => window.clearTimeout(timer);
  }, [active, reduceMotion]);

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
      <div
        role="tablist"
        aria-label="Le fasi del servizio"
        className="grid grid-cols-2 gap-2 rounded-[1.5rem] bg-[#F7F4EF]/[0.06] p-2 sm:grid-cols-4"
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <button
              key={step.title}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              id={`process-tab-${index}`}
              role="tab"
              type="button"
              aria-selected={active === index}
              aria-controls={`process-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`flex min-h-14 items-center justify-center gap-2 rounded-[1rem] px-3 py-3 text-sm font-semibold transition-colors duration-150 active:bg-[#F7F4EF]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F4EF] motion-reduce:transition-none ${active === index ? "bg-[#F7F4EF] text-[#111111]" : "text-[#F7F4EF]/75 hover:bg-[#F7F4EF]/10"}`}
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
              {step.title}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid overflow-hidden rounded-[1.5rem] bg-[#F7F4EF]/[0.04] lg:grid-cols-2 lg:rounded-[2rem]">
        <div
          className="relative aspect-[4/3] overflow-hidden bg-[#F7F4EF]/[0.06] lg:aspect-auto lg:min-h-[27rem]"
          aria-hidden="true"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={current.image}
              initial={{ opacity: reduceMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <span className="absolute bottom-4 left-4 rounded-full bg-[#111111]/85 px-3 py-1.5 text-xs text-[#F7F4EF]">
            Immagini illustrative
          </span>
        </div>
        <div className="p-6 sm:p-8 lg:flex lg:flex-col lg:justify-center lg:p-10">
          {steps.map((step, index) => (
            <div
              key={step.title}
              id={`process-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`process-tab-${index}`}
              hidden={index !== active}
              tabIndex={0}
              className="min-h-[17rem] rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7F4EF]"
            >
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.12em] text-[#F7F4EF]/65">
                {index + 1} di 4 · {step.title}
              </p>
              <h3 className="font-display mt-4 max-w-[19ch] text-[clamp(1.9rem,3.2vw,3rem)] font-semibold leading-[1.04] tracking-tight">
                {step.heading}
              </h3>
              <p className="mt-5 max-w-[42ch] text-base leading-7 text-[#F7F4EF]/80">
                {step.description}
              </p>
              <p className="mt-5 flex max-w-[42ch] items-start gap-2 text-sm leading-6 text-[#F7F4EF]/70">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
                {step.detail}
              </p>
            </div>
          ))}
          <a
            href="tel:+393289185029"
            className="font-ui mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-[0.9rem] bg-[#F7F4EF] px-5 py-3 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#E7E3DC] active:bg-[#D5CFC6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7F4EF]"
          >
            Parla del tuo scooter{" "}
            
          </a>
        </div>
      </div>
    </div>
  );
}
