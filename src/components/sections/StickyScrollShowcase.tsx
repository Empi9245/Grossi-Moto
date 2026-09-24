"use client";

import Image from "next/image";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

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
const desktopAutoplayInterval = 4200;
const desktopItemHeight = 72;

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export function StickyScrollShowcase() {
  const reduceMotion = useReducedMotion();
  const [desktopStep, setDesktopStep] = useState(0);
  const [desktopPaused, setDesktopPaused] = useState(false);

  const currentDesktopIndex =
    ((desktopStep % services.length) + services.length) % services.length;

  const advanceDesktop = useCallback(() => {
    setDesktopStep((current) => current + 1);
  }, []);

  useEffect(() => {
    if (reduceMotion || desktopPaused) return;

    const interval = window.setInterval(
      advanceDesktop,
      desktopAutoplayInterval,
    );

    return () => window.clearInterval(interval);
  }, [advanceDesktop, desktopPaused, reduceMotion]);

  const selectDesktopService = (index: number) => {
    let distance = index - currentDesktopIndex;

    if (distance > services.length / 2) distance -= services.length;
    if (distance < -services.length / 2) distance += services.length;

    if (distance !== 0) {
      setDesktopStep((current) => current + distance);
    }
  };

  const getDesktopCardState = (index: number) => {
    let distance = index - currentDesktopIndex;

    if (distance > services.length / 2) distance -= services.length;
    if (distance < -services.length / 2) distance += services.length;

    if (distance === 0) return "active";
    if (distance === -1) return "previous";
    if (distance === 1) return "next";
    return "hidden";
  };

  return (
    <section
      aria-labelledby="services-showcase-heading"
      className="bg-white px-5 py-16 text-[#0A0A0A] sm:px-7 sm:py-20 md:px-10 lg:px-2 lg:py-12 xl:py-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="lg:px-2">
          <h2
            id="services-showcase-heading"
            className="font-display font-editorial text-[clamp(3rem,6vw,5.8rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]"
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

          <div
            className="relative hidden min-h-[610px] overflow-hidden rounded-[2.75rem] border border-black/10 bg-white lg:grid lg:grid-cols-[minmax(20rem,0.82fr)_minmax(0,1.18fr)] xl:min-h-[650px] xl:rounded-[3.5rem]"
            onMouseEnter={() => setDesktopPaused(true)}
            onMouseLeave={() => setDesktopPaused(false)}
            onFocusCapture={() => setDesktopPaused(true)}
            onBlurCapture={(event) => {
              if (
                !event.currentTarget.contains(event.relatedTarget as Node | null)
              ) {
                setDesktopPaused(false);
              }
            }}
          >
            <div className="relative z-20 flex min-h-[610px] items-center overflow-hidden bg-[#A34A3E] px-10 xl:min-h-[650px] xl:px-14">
              <div className="relative h-[420px] w-full">
                {services.map((service, index) => {
                  const isActive = index === currentDesktopIndex;
                  const distance = wrap(
                    -(services.length / 2),
                    services.length / 2,
                    index - currentDesktopIndex,
                  );

                  return (
                    <motion.div
                      key={service.title}
                      className="absolute left-0 flex items-center"
                      style={{
                        height: desktopItemHeight,
                        top: "calc(50% - 36px)",
                      }}
                      animate={{
                        y: distance * desktopItemHeight,
                        opacity: Math.max(0.22, 1 - Math.abs(distance) * 0.25),
                      }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : {
                              type: "spring",
                              stiffness: 92,
                              damping: 23,
                              mass: 0.95,
                            }
                      }
                    >
                      <button
                        type="button"
                        aria-current={isActive ? "true" : undefined}
                        onClick={() => selectDesktopService(index)}
                        className={[
                          "font-ui group flex min-h-13 items-center gap-4 rounded-full border px-6 py-3 text-left text-[0.74rem] font-bold uppercase tracking-[0.09em] transition-[background-color,border-color,color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-3 focus-visible:ring-offset-[#A34A3E] motion-reduce:transition-none xl:px-7 xl:text-[0.78rem]",
                          isActive
                            ? "border-white bg-white text-[#A34A3E]"
                            : "border-white/20 bg-transparent text-white/58 hover:border-white/48 hover:text-white",
                        ].join(" ")}
                      >
                        <span
                          aria-hidden="true"
                          className={[
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.62rem] tabular-nums transition-colors duration-300 motion-reduce:transition-none",
                            isActive
                              ? "border-[#A34A3E]/18 bg-[#A34A3E]/8 text-[#A34A3E]"
                              : "border-white/18 text-white/46 group-hover:text-white/82",
                          ].join(" ")}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="whitespace-nowrap">{service.title}</span>
                        <span
                          aria-hidden="true"
                          className={[
                            "ml-auto h-1.5 w-1.5 rounded-full transition-[opacity,transform] duration-300 motion-reduce:transition-none",
                            isActive
                              ? "scale-100 bg-[#A34A3E] opacity-100"
                              : "scale-75 bg-white opacity-0",
                          ].join(" ")}
                        />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="relative flex min-h-[610px] items-center justify-center overflow-hidden bg-[#F5F5F3] px-10 py-12 xl:min-h-[650px] xl:px-14">
              <div className="relative aspect-[5/4] w-full max-w-[34rem]">
                {services.map((service, index) => {
                  const state = getDesktopCardState(index);
                  const isActive = state === "active";
                  const isPrevious = state === "previous";
                  const isNext = state === "next";

                  return (
                    <motion.article
                      key={service.title}
                      aria-hidden={!isActive}
                      initial={false}
                      animate={{
                        x: isActive
                          ? 0
                          : isPrevious
                            ? -112
                            : isNext
                              ? 112
                              : 0,
                        y: isActive ? 0 : 8,
                        scale: isActive
                          ? 1
                          : isPrevious || isNext
                            ? 0.86
                            : 0.72,
                        opacity: isActive
                          ? 1
                          : isPrevious || isNext
                            ? 0.3
                            : 0,
                        rotate: isPrevious ? -3.25 : isNext ? 3.25 : 0,
                        zIndex: isActive ? 30 : isPrevious || isNext ? 20 : 0,
                      }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : {
                              type: "spring",
                              stiffness: 245,
                              damping: 27,
                              mass: 0.82,
                            }
                      }
                      className="absolute inset-0 origin-center overflow-hidden rounded-[2.25rem] border-[6px] border-white bg-[#0A0A0A] shadow-[0_20px_55px_rgba(10,10,10,0.12)] xl:rounded-[2.75rem] xl:border-[8px]"
                    >
                      <Image
                        src={service.image}
                        alt={isActive ? service.alt : ""}
                        fill
                        sizes="(min-width: 1280px) 544px, (min-width: 1024px) 52vw, 1px"
                        className={[
                          "object-cover transition-[filter,transform] duration-700 motion-reduce:transition-none",
                          isActive
                            ? "scale-100 blur-0 grayscale-0"
                            : "scale-[1.035] blur-[1.5px] grayscale",
                        ].join(" ")}
                      />

                      <div
                        aria-hidden="true"
                        className={[
                          "absolute inset-0 bg-black transition-opacity duration-500 motion-reduce:transition-none",
                          isActive ? "opacity-[0.08]" : "opacity-35",
                        ].join(" ")}
                      />

                      {isActive ? (
                        <>
                          <motion.div
                            className="absolute left-7 top-7 flex items-center gap-2.5 xl:left-8 xl:top-8"
                            initial={
                              reduceMotion ? false : { opacity: 0, y: -8 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.35,
                              ease: easeOut,
                            }}
                          >
                            <span
                              aria-hidden="true"
                              className="h-2 w-2 rounded-full bg-white"
                            />
                            <span className="font-ui text-[0.64rem] font-bold uppercase tracking-[0.2em] text-white/82">
                              Servizio {String(index + 1).padStart(2, "0")} /{" "}
                              {String(services.length).padStart(2, "0")}
                            </span>
                          </motion.div>

                          <motion.div
                            className="absolute inset-x-0 bottom-0 bg-black/82 px-7 pb-7 pt-6 text-white backdrop-blur-[2px] xl:px-9 xl:pb-9 xl:pt-7"
                            initial={
                              reduceMotion ? false : { opacity: 0, y: 18 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.42,
                              ease: easeOut,
                            }}
                          >
                            <div className="font-ui inline-flex rounded-full bg-white px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]">
                              {service.title}
                            </div>
                            <p className="font-display mt-4 max-w-[19ch] text-[clamp(1.9rem,2.7vw,2.8rem)] font-bold leading-[0.94] tracking-[-0.03em] text-white">
                              {service.statement}
                            </p>
                            <p className="mt-3 max-w-[46ch] text-sm leading-6 text-white/72 xl:text-[0.94rem] xl:leading-6">
                              {service.description}
                            </p>
                            <ul className="font-ui mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[0.6rem] font-semibold uppercase tracking-[0.055em] text-white/62 xl:text-[0.64rem]">
                              {service.features.map((feature) => (
                                <li
                                  key={feature}
                                  className="flex items-center gap-1.5"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="text-white/38"
                                  >
                                    +
                                  </span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        </>
                      ) : null}
                    </motion.article>
                  );
                })}
              </div>

              <div
                aria-hidden="true"
                className="font-ui absolute bottom-7 right-8 text-[0.61rem] font-bold uppercase tracking-[0.16em] text-black/38"
              >
                Seleziona un servizio
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
