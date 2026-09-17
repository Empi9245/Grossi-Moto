"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const services = [
  { id: "01", title: "Officina", headline: "Un rumore da capire? Partiamo da lì.", description: "Raccontaci cosa hai notato: controlliamo il mezzo per definire gli interventi.", image: "officina-autorizzata", alt: "Officina scooter Grossi Moto", cta: "Scopri l’officina" },
  { id: "02", title: "Tagliandi", headline: "Ogni mezzo ha le sue scadenze.", description: "Modello, chilometri e ultimo tagliando: da qui valutiamo i controlli necessari.", image: "tagliandi", alt: "Manutenzione e tagliando scooter", cta: "Scopri i tagliandi" },
  { id: "03", title: "Ricambi", headline: "Il pezzo giusto per il tuo mezzo.", description: "Verifichiamo compatibilità, disponibilità e possibilità di montaggio in officina.", image: "ricambi-originali", alt: "Ricambi e accessori per scooter", cta: "Scopri ricambi e accessori" },
  { id: "04", title: "Finanziamenti", headline: "Valuta anche come acquistarlo.", description: "Chiedici le soluzioni disponibili per il modello scelto e le relative condizioni.", image: "finanziamenti", alt: "Informazioni per l’acquisto di uno scooter", cta: "Scopri i finanziamenti" },
  { id: "05", title: "Permute", headline: "La prossima scelta parte dal tuo mezzo.", description: "Valutiamo lo stato del tuo mezzo per capire insieme la possibilità di una permuta.", image: "permute", alt: "Valutazione di uno scooter per la permuta", cta: "Scopri le permute" },
  { id: "06", title: "Consulenza", headline: "Prima il percorso. Poi il modello.", description: "Città, passeggero, tragitti lunghi: confrontiamo i mezzi in base a come ti muovi.", image: "consulenza", alt: "Consulenza nella scelta dello scooter", cta: "Scopri la consulenza" },
];

export function ServiceOverview() {
  const [active, setActive] = useState("01");
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedMotion = useReducedMotion();

  return (
    <div data-service-overview className="w-full border-t border-[#F4F0E8]/25" aria-label="Esplora i servizi">
      {services.map((service, index) => {
        const selected = active === service.id;
        const panelId = `overview-panel-${service.id}`;
        const buttonId = `overview-button-${service.id}`;
        return (
          <div key={service.id} className="border-b border-[#F4F0E8]/25">
            <h2>
              <button
                ref={(element) => { buttons.current[index] = element; }}
                id={buttonId}
                type="button"
                aria-expanded={selected}
                aria-controls={panelId}
                onClick={() => setActive(service.id)}
                onKeyDown={(event) => {
                  let next: number;
                  if (event.key === "ArrowDown") next = (index + 1) % services.length;
                  else if (event.key === "ArrowUp") next = (index - 1 + services.length) % services.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = services.length - 1;
                  else return;
                  event.preventDefault();
                  buttons.current[next]?.focus();
                }}
                className={`font-display flex min-h-12 w-full items-center justify-between gap-4 py-3 text-left text-[clamp(1.15rem,1.6vw,1.8rem)] font-bold uppercase leading-none tracking-[-0.025em] transition-colors duration-150 hover:text-[#EF603B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4F0E8] ${selected ? "text-[#EF603B]" : "text-[#F4F0E8]/80"}`}
              >
                {service.title}
                {selected ? <Minus aria-hidden="true" className="h-4 w-4 shrink-0" /> : <Plus aria-hidden="true" className="h-4 w-4 shrink-0" />}
              </button>
            </h2>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!selected}>
              {selected && (
                <motion.div
                  key={service.id}
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: reducedMotion ? 0 : 0.18 }}
                  className="grid min-h-[11.5rem] grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start gap-5 pb-5 pt-1"
                >
                  <div className="relative h-[clamp(8rem,18svh,11rem)] overflow-hidden rounded-xl bg-[#F4F0E8]/5">
                    <Image src={`/grossimoto/servizi/${service.image}.webp`} alt={service.alt} fill sizes="(min-width: 1024px) 24vw, 45vw" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-[clamp(1.1rem,1.4vw,1.5rem)] font-semibold leading-tight">{service.headline}</p>
                    <p className="mt-2 text-sm leading-6 text-[#F4F0E8]/70">{service.description}</p>
                    <a href={`#service-${service.id}`} className="font-ui mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-[#EF603B] underline-offset-4 hover:text-[#EF603B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4F0E8]">
                      {service.cta}<ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
