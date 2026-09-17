"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const desktopRootRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isDesktopViewport = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = desktopRootRef.current;
    const sticky = stickyRef.current;

    if (!root || !sticky || !isDesktopViewport || reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const cardNodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-service-visual]"),
    );
    if (cardNodes.length === 0) return;

    const renderCards = (progress: number) => {
      cardNodes.forEach((card, index) => {
        const offset = index - progress;
        const distance = Math.abs(offset);
        const visibleDistance = Math.min(distance, 3);
        const side = Math.sign(offset);
        const fan = Math.min(visibleDistance, 2.25);

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: offset * 132 + side * fan * 18,
          y: fan * 58 + offset * 10,
          scale: Math.max(0.67, 1 - visibleDistance * 0.12),
          rotationY: offset * -16,
          rotationZ: offset * 5.5,
          opacity: Math.max(0, 1 - Math.max(0, visibleDistance - 0.15) * 0.28),
          zIndex: Math.round(50 - visibleDistance * 10),
          transformOrigin: "50% 82%",
          pointerEvents: distance < 0.48 ? "auto" : "none",
        });
      });
    };

    renderCards(0);

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => `+=${window.innerHeight * (services.length - 1) * 0.92}`,
        pin: sticky,
        pinSpacing: true,
        scrub: 0.55,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / (services.length - 1),
          duration: { min: 0.14, max: 0.32 },
          delay: 0.06,
          ease: "power2.out",
          inertia: false,
        },
        onUpdate: (self) => {
          const progress = self.progress * (services.length - 1);
          const nextIndex = Math.max(
            0,
            Math.min(services.length - 1, Math.round(progress)),
          );

          renderCards(progress);
          setDirection(self.direction >= 0 ? 1 : -1);
          setActiveIndex((current) =>
            current === nextIndex ? current : nextIndex,
          );
        },
      });
    }, root);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      context.revert();
    };
  }, [isDesktopViewport, reduceMotion]);

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
            Dalla manutenzione alla scelta del mezzo: un unico punto di
            riferimento per capire cosa serve e come procedere.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20">
          <ServiceSwipe services={services} />

          <div
            className={reduceMotion ? "hidden" : "hidden lg:block"}
            ref={desktopRootRef}
          >
            <div
              ref={stickyRef}
              className="relative h-[100svh] min-h-[720px] overflow-hidden"
            >
              <div className="grid h-full grid-cols-[minmax(25rem,0.82fr)_minmax(0,1.18fr)] items-center gap-8 xl:grid-cols-[minmax(28rem,0.78fr)_minmax(0,1.22fr)] xl:gap-14">
                <div className="relative z-20 flex min-h-[38rem] items-center overflow-hidden pr-4 xl:pr-8">
                  <AnimatePresence
                    initial={false}
                    mode="sync"
                    custom={direction}
                  >
                    <motion.article
                      key={currentService.title}
                      custom={direction}
                      initial={{
                        opacity: 0,
                        x: direction >= 0 ? "-18%" : "18%",
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        x: direction >= 0 ? "18%" : "-18%",
                      }}
                      transition={{
                        duration: 0.42,
                        ease: easeOut,
                      }}
                      className="w-full max-w-[39rem]"
                    >
                      <div className="font-ui flex items-center gap-4 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-black/46">
                        <span className="text-[#C72A09]">
                          {String(activeIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px w-12 bg-black/18" aria-hidden="true" />
                        <span>
                          {String(services.length).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="font-display mt-6 max-w-[11ch] text-[clamp(3.7rem,5vw,6.9rem)] font-bold uppercase leading-[0.82] tracking-[-0.045em]">
                        {currentService.title}
                      </h3>
                      <p className="mt-7 max-w-[21ch] text-[clamp(1.6rem,2.25vw,2.8rem)] font-semibold leading-[0.98] text-black/84">
                        {currentService.statement}
                      </p>
                      <p className="mt-6 max-w-[36rem] text-base leading-7 text-black/64 xl:text-lg xl:leading-8">
                        {currentService.description}
                      </p>

                      <ul className="font-ui mt-8 grid max-w-[36rem] border-y border-black/14 text-[0.75rem] font-bold uppercase tracking-[0.05em] text-black/66">
                        {currentService.features.map((feature) => (
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
                        className="font-ui mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-[opacity,transform] duration-150 hover:opacity-[0.84] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none"
                      >
                        Chiama per informazioni
                        <PhoneCall
                          aria-hidden="true"
                          className="h-4 w-4"
                          strokeWidth={1.8}
                        />
                      </a>
                    </motion.article>
                  </AnimatePresence>
                </div>

                <div className="relative h-[82svh] min-h-[39rem] max-h-[58rem] overflow-visible [perspective:1800px]">
                  <div className="absolute inset-0 [transform-style:preserve-3d]">
                    {services.map((service, index) => (
                      <figure
                        key={service.title}
                        data-service-visual
                        aria-hidden={index !== activeIndex}
                        className="absolute left-1/2 top-1/2 aspect-[4/5] w-[clamp(25rem,34vw,35rem)] overflow-hidden rounded-[42px] border border-black/10 bg-[#F5F5F3] shadow-[0_28px_80px_rgba(0,0,0,0.14)] will-change-transform xl:rounded-[52px]"
                      >
                        <Image
                          src={service.image}
                          alt={service.alt}
                          fill
                          sizes="(min-width: 1536px) 560px, 34vw"
                          className="object-cover"
                          priority={index === 0}
                        />
                        <figcaption className="font-ui absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 rounded-[22px] bg-black/64 p-5 text-white xl:inset-x-5 xl:bottom-5 xl:rounded-[24px] xl:p-6">
                          <span className="max-w-[15ch] text-sm font-bold uppercase tracking-[0.08em]">
                            {service.title}
                          </span>
                          <span className="text-[0.7rem] font-bold tracking-[0.14em] text-white/74">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              reduceMotion
                ? "hidden gap-12 lg:grid lg:grid-cols-2 xl:gap-16"
                : "hidden"
            }
          >
            {services.map((service) => (
              <article key={service.title}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] border border-black/10 bg-black/[0.035]">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1024px) 44vw, 1px"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display mt-7 max-w-[12ch] text-[clamp(3rem,5vw,5.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]">
                  {service.title}
                </h3>
                <p className="mt-5 max-w-[24ch] text-2xl font-semibold leading-[1.02] text-black/84">
                  {service.statement}
                </p>
                <p className="mt-4 max-w-[36rem] text-base leading-7 text-black/64">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
