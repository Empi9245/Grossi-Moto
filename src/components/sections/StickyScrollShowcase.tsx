"use client";

import { DisclosureMark } from "@/components/ui/control-glyphs";
import Image from "next/image";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { ServiceSwipe, type Service } from "./ServiceSwipe";

const services: Service[] = [
  {
    title: "Officina moto e scooter",
    statement: "Capire il problema è il primo passo.",
    description:
      "Descrivici cosa hai notato. Controlliamo il mezzo per individuare le necessità e definire il lavoro.",
    features: [
      "Diagnosi strumentale",
      "Spiegazione degli interventi",
      "Controllo del veicolo",
    ],
    image: "/grossimoto/servizi/officina-autorizzata.webp",
    alt: "Officina scooter Grossi Moto a Roma",
  },
  {
    title: "Tagliandi",
    statement: "Il tagliando adatto al tuo mezzo.",
    description:
      "Modello, chilometri e tempo trascorso dall’ultimo tagliando ci aiutano a valutare i controlli necessari.",
    features: [
      "Chilometri e scadenze",
      "Materiali adatti al modello",
      "Lavori concordati",
    ],
    image: "/grossimoto/servizi/tagliandi.webp",
    alt: "Tagliando scooter a Roma, Grossi Moto",
  },
  {
    title: "Ricambi e accessori",
    statement: "Compatibili con il mezzo e con il tuo uso.",
    description:
      "Ci dici il modello e cosa ti serve. Verifichiamo compatibilità, disponibilità e possibilità di montaggio in officina.",
    features: [
      "Componenti per KYMCO e Voge",
      "Verifica della compatibilità",
      "Montaggio in officina",
    ],
    image: "/grossimoto/servizi/ricambi-originali.webp",
    alt: "Ricambi e accessori scooter a Roma, Grossi Moto",
  },
  {
    title: "Finanziamenti",
    statement: "Valuta anche come acquistarlo.",
    description:
      "Chiedici quali soluzioni di finanziamento sono disponibili per il modello che hai scelto e quali condizioni prevedono.",
    features: [
      "Soluzioni da verificare in sede",
      "Informazioni su anticipo e durata",
      "Condizioni da valutare",
    ],
    image: "/grossimoto/servizi/finanziamenti.webp",
    alt: "Finanziamento scooter a Roma, Grossi Moto",
  },
  {
    title: "Permute",
    statement: "Vuoi cambiare mezzo? Partiamo dal tuo.",
    description:
      "Portaci le informazioni sul tuo mezzo. Ne valutiamo lo stato per capire insieme la possibilità di una permuta.",
    features: [
      "Valutazione diretta",
      "Verifica dello stato del mezzo",
      "Possibilità di permuta",
    ],
    image: "/grossimoto/servizi/permute.webp",
    alt: "Valutazione permuta scooter usato a Roma, Grossi Moto",
  },
  {
    title: "Consulenza",
    statement: "La scelta parte dai tuoi percorsi.",
    description:
      "Traffico, passeggero, tragitti più lunghi: raccontaci come ti muovi. Confrontiamo postura, cilindrata e accessori adatti al tuo uso.",
    features: [
      "Confronto sull’uso quotidiano",
      "Postura e cilindrata",
      "Accessori adatti al mezzo",
    ],
    image: "/grossimoto/servizi/consulenza.webp",
    alt: "Consulenza per scegliere uno scooter a Roma, Grossi Moto",
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export function StickyScrollShowcase() {
  const reduceMotion = useReducedMotion();
  const [openService, setOpenService] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="services-showcase-heading"
      className="bg-white px-5 py-16 text-[#0A0A0A] sm:px-7 sm:py-20 md:px-10 lg:px-2 lg:py-12 xl:py-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="lg:px-2">
          <h2
            id="services-showcase-heading"
            className="font-display text-[clamp(3rem,6vw,5.8rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]"
          >
            Cosa possiamo fare per te.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-black/60 sm:text-lg sm:leading-8">
            Dalla manutenzione alla scelta del mezzo: un unico punto di
            riferimento per capire cosa serve e come procedere.
          </p>
        </div>

        <div className="mt-12">
          <ServiceSwipe services={services} />

          <div className="hidden grid-cols-3 gap-4 lg:grid xl:gap-6">
            {services.map((service, index) => {
              const isOpen = openService === index;
              const detailsId = `service-details-${index}`;

              return (
                <motion.article
                  key={service.title}
                  className="group relative min-h-[410px] overflow-hidden rounded-3xl bg-[#B12B14] p-6 xl:min-h-[440px] xl:p-7"
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 20,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.6,
                    delay: reduceMotion ? 0 : (index % 3) * 0.1,
                    ease: easeOut,
                  }}
                >
                  <h3 className="font-display pointer-events-none relative z-10 mx-auto max-w-[12ch] text-center text-[clamp(2rem,2.7vw,3.35rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em] text-white">
                    {service.title}
                  </h3>

                  <div className="pointer-events-none absolute inset-x-7 bottom-[4.75rem] top-[6.75rem] flex items-center justify-center xl:inset-x-8 xl:bottom-[5rem] xl:top-[7.2rem]">
                    <div className="relative h-full w-full">
                      <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        sizes="(min-width: 1280px) 360px, (min-width: 1024px) 30vw, 1px"
                        className="object-contain opacity-95 transition-[transform,opacity] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={detailsId}
                    aria-label={`Apri i dettagli di ${service.title}`}
                    tabIndex={isOpen ? -1 : 0}
                    onClick={() => setOpenService(index)}
                    className="absolute inset-0 z-20 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-inset"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 right-0 z-30 h-20 w-20 rounded-tl-2xl border-l border-t border-black/5 bg-white"
                  >
                    <span className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-[0.8rem] bg-[#0A0A0A] text-white shadow-sm transition-[background-color,transform] duration-300 group-hover:bg-[#B12B14] motion-reduce:transform-none motion-reduce:transition-none">
                      <DisclosureMark expanded={false} />
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={detailsId}
                        role="region"
                        aria-label={`Dettagli: ${service.title}`}
                        className="absolute inset-0 z-40 flex flex-col bg-[#B12B14] p-7 xl:p-8"
                        initial={
                          reduceMotion
                            ? { opacity: 1 }
                            : { opacity: 0, y: 8 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                          reduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: 8 }
                        }
                        transition={{
                          duration: reduceMotion ? 0 : 0.24,
                          ease: easeOut,
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Escape") {
                            event.preventDefault();
                            setOpenService(null);
                          }
                        }}
                      >
                        <div className="pr-14">
                          <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.15em] text-white/55">
                            {service.title}
                          </p>
                          <p className="font-display mt-5 max-w-[14ch] text-[clamp(2rem,2.4vw,3rem)] font-bold leading-[0.95] tracking-[-0.035em] text-white">
                            {service.statement}
                          </p>
                          <p className="mt-5 max-w-[40ch] text-base leading-7 text-white/72">
                            {service.description}
                          </p>
                        </div>

                        <ul className="font-ui mt-auto grid pt-4 text-[0.72rem] font-semibold uppercase tracking-[0.04em] text-white/72">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="py-2"
                            >
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 rounded-tl-2xl border-l border-t border-black/5 bg-white"
                        />

                        <button
                          type="button"
                          aria-label={`Chiudi i dettagli di ${service.title}`}
                          onClick={() => setOpenService(null)}
                          className="absolute bottom-3 right-3 z-10 flex h-12 w-12 items-center justify-center rounded-[0.8rem] bg-[#0A0A0A] text-white shadow-sm transition-[background-color,transform] duration-200 hover:bg-[#B12B14] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-3 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none"
                        >
                          <DisclosureMark expanded />
                        </button>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
