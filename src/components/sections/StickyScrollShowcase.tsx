"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { PhoneCall } from "lucide-react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
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

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function StickyScrollShowcase() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDesktopViewport = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const content = contentRef.current;
    if (!content || !isDesktopViewport) return;

    const items = Array.from(
      content.querySelectorAll<HTMLElement>("[data-service-index]"),
    );
    if (items.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const ratios = new Map<number, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(
            (entry.target as HTMLElement).getAttribute("data-service-index"),
          );
          if (!Number.isNaN(index)) {
            ratios.set(index, entry.isIntersecting ? entry.intersectionRatio : 0);
          }
        });

        let nextIndex = activeIndex;
        let nextRatio = -1;

        ratios.forEach((ratio, index) => {
          if (ratio > nextRatio) {
            nextRatio = ratio;
            nextIndex = index;
          }
        });

        if (nextRatio > 0) {
          setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
        }
      },
      {
        rootMargin: "-24% 0px -34% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [activeIndex, isDesktopViewport]);

  const currentService = services[activeIndex] ?? services[0];

  return (
    <section
      aria-labelledby="services-showcase-heading"
      className="bg-white px-5 py-16 text-[#0A0A0A] sm:px-7 sm:py-20 md:px-10 lg:px-14 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-[92rem]">
        <div className="grid gap-7 border-t border-black/16 pt-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(24rem,0.7fr)] lg:items-end lg:gap-12">
          <h2
            id="services-showcase-heading"
            className="font-display max-w-[11ch] text-[clamp(3.2rem,10vw,8.5rem)] font-bold uppercase leading-[0.84] tracking-[-0.04em]"
          >
            Cosa possiamo fare per te.
          </h2>
          <p className="max-w-[34rem] text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
            Dalla manutenzione alla scelta del mezzo: un unico punto di riferimento per capire cosa serve e come procedere.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20">
          <ServiceSwipe services={services} />

          <div className="hidden lg:grid lg:grid-cols-[minmax(28rem,0.94fr)_minmax(0,1.06fr)] lg:gap-14 xl:gap-20">
            <div className="relative min-h-full">
              <div className="sticky top-24 flex h-[calc(100svh-7rem)] items-center">
                <figure className="relative h-[74svh] min-h-[34rem] max-h-[52rem] w-full overflow-hidden rounded-[40px] bg-black/[0.035] xl:rounded-[48px]">
                  <AnimatePresence initial={false} mode="sync">
                    <motion.div
                      key={currentService.image}
                      className="absolute inset-0"
                      initial={
                        reduceMotion ? false : { opacity: 0, scale: 1.015 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.22,
                        ease: easeOut,
                      }}
                    >
                      <Image
                        src={currentService.image}
                        alt={currentService.alt}
                        fill
                        sizes="(min-width: 1280px) 44vw, 47vw"
                        className="object-cover"
                        priority={activeIndex === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                </figure>
              </div>
            </div>

            <div ref={contentRef}>
              {services.map((service, index) => {
                const isActive = index === activeIndex;

                return (
                  <article
                    key={service.title}
                    data-service-index={index}
                    className={[
                      "relative flex min-h-[70svh] flex-col justify-center border-l pl-8 transition-[border-width,border-color,opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] xl:pl-12",
                      isActive
                        ? "border-l-2 border-[#C72A09] opacity-100"
                        : "border-black/12 opacity-46",
                    ].join(" ")}
                  >
                    <h3 className="font-display max-w-[12ch] text-[clamp(3.7rem,5.7vw,7.2rem)] font-bold uppercase leading-[0.84] tracking-[-0.04em]">
                      {service.title}
                    </h3>
                    <p className="mt-7 max-w-[22ch] text-[clamp(1.65rem,2.6vw,3rem)] font-semibold leading-[0.98] text-black/84">
                      {service.statement}
                    </p>
                    <p className="mt-6 max-w-[38rem] text-base leading-7 text-black/64 xl:text-lg xl:leading-8">
                      {service.description}
                    </p>
                    <ul className="font-ui mt-8 grid max-w-[38rem] gap-0 border-y border-black/14 text-[0.76rem] font-bold uppercase tracking-[0.05em] text-black/66">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="border-b border-black/10 py-3 last:border-b-0"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="tel:+393289185029"
                      className="font-ui mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-[opacity,transform] duration-150 hover:opacity-84 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      Chiama per informazioni
                      <PhoneCall
                        aria-hidden="true"
                        className="h-4 w-4"
                        strokeWidth={1.8}
                      />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
