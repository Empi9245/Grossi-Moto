"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
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

const DESKTOP_WIDTH = 1200;
const TABLET_MIN_WIDTH = 768;
const DEPTH_MIN = -1;
const DEPTH_MAX = 1;
const Z_INDEX_MIN = 1;

const CARD_WIDTH = 260;
const CARD_HEIGHT = 290;
const RIGHT_RADIUS_X = 420;
const RIGHT_RADIUS_Y = 360;
const RIGHT_DEPTH_MAX = 40;
const RIGHT_ANGLE_OFFSET = 0;
const IMAGE_FOCUS_START = 0.45;
const IMAGE_FOCUS_POWER = 3.2;
const IMAGE_SIDE_SCALE = 0.58;
const IMAGE_CENTER_SCALE = 1;
const IMAGE_SIDE_OPACITY = 0.14;
const IMAGE_CENTER_OPACITY = 1;
const ACTIVE_PHASE = 0.75;

function wrapProgress(value: number) {
  let wrappedValue = value % 1;

  if (wrappedValue < 0) {
    wrappedValue += 1;
  }

  return wrappedValue;
}

function getCircularPosition(
  progress: number,
  radiusX: number,
  radiusY: number,
  angleOffset = 0,
) {
  const angle = progress * Math.PI * 2 + angleOffset;

  return {
    x: Math.sin(angle) * radiusX,
    y: Math.cos(angle) * radiusY,
    horizontalDepth: Math.sin(angle),
  };
}

function getStrength(value: number) {
  return gsap.utils.clamp(
    0,
    1,
    gsap.utils.mapRange(DEPTH_MIN, DEPTH_MAX, 0, 1, value),
  );
}

function shapeFocus(strength: number, start: number, power: number) {
  const normalized = gsap.utils.clamp(
    0,
    1,
    (strength - start) / (1 - start),
  );

  return Math.pow(normalized, power);
}

export function StickyScrollShowcase() {
  const desktopRootRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDesktopViewport = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = desktopRootRef.current;
    const sticky = stickyRef.current;

    if (!root || !sticky || !isDesktopViewport || reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const textNodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-service-copy]"),
    );
    const cardNodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-service-visual]"),
    );
    const total = services.length;

    if (!total || textNodes.length !== total || cardNodes.length !== total) {
      return;
    }

    const render = (scrollProgress: number) => {
      const width = window.innerWidth;
      const factor =
        width < DESKTOP_WIDTH && width >= TABLET_MIN_WIDTH
          ? width / DESKTOP_WIDTH
          : 1;
      const itemProgress = scrollProgress * (total - 1);

      textNodes.forEach((node, index) => {
        const delta = index - itemProgress;
        const distance = Math.abs(delta);
        const focus = gsap.utils.clamp(0, 1, 1 - distance);
        const travel = Math.min(distance, 1);
        const x =
          delta >= 0
            ? -170 * travel * factor
            : 120 * travel * factor;

        gsap.set(node, {
          x,
          y: 0,
          scale: gsap.utils.interpolate(0.985, 1, focus),
          opacity: Math.pow(focus, 1.45),
          zIndex: Math.round(10 + focus * 20),
          visibility: distance <= 1 ? "visible" : "hidden",
          pointerEvents: distance < 0.45 ? "auto" : "none",
          transformOrigin: "0% 50%",
        });
      });

      const radiusX = RIGHT_RADIUS_X * factor;
      const radiusY = RIGHT_RADIUS_Y * factor;

      cardNodes.forEach((node, index) => {
        const localProgress = wrapProgress(
          (index - itemProgress) / total + ACTIVE_PHASE,
        );
        const position = getCircularPosition(
          localProgress,
          radiusX,
          radiusY,
          RIGHT_ANGLE_OFFSET,
        );
        const rawStrength = getStrength(-position.horizontalDepth);
        const focusStrength = shapeFocus(
          rawStrength,
          IMAGE_FOCUS_START,
          IMAGE_FOCUS_POWER,
        );
        const scale = gsap.utils.interpolate(
          IMAGE_SIDE_SCALE,
          IMAGE_CENTER_SCALE,
          focusStrength,
        );
        const opacity = gsap.utils.interpolate(
          IMAGE_SIDE_OPACITY,
          IMAGE_CENTER_OPACITY,
          focusStrength,
        );
        const zIndex = Math.round(
          gsap.utils.interpolate(
            Z_INDEX_MIN,
            RIGHT_DEPTH_MAX,
            focusStrength,
          ),
        );

        gsap.set(node, {
          width: CARD_WIDTH * factor,
          height: CARD_HEIGHT * factor,
          xPercent: -50,
          yPercent: -50,
          x: position.x,
          y: position.y,
          scale,
          opacity,
          zIndex,
          transformOrigin: "50% 50%",
        });
      });

      const nextIndex = Math.max(
        0,
        Math.min(total - 1, Math.round(itemProgress)),
      );
      setActiveIndex((current) =>
        current === nextIndex ? current : nextIndex,
      );
    };

    render(0);

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: `+=${100 * total}%`,
        pin: sticky,
        pinSpacing: true,
        scrub: 1.1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / (total - 1),
          duration: { min: 0.16, max: 0.34 },
          delay: 0.08,
          ease: "power2.out",
          inertia: false,
        },
        onUpdate: (self) => render(self.progress),
      });
    }, root);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      context.revert();
    };
  }, [isDesktopViewport, reduceMotion]);

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
            ref={desktopRootRef}
            className={reduceMotion ? "hidden" : "hidden lg:block"}
          >
            <div
              ref={stickyRef}
              className="relative h-[100svh] min-h-[700px] overflow-hidden"
            >
              <div className="grid h-full grid-cols-[minmax(25rem,0.9fr)_minmax(0,1.1fr)] items-center gap-6 xl:grid-cols-[minmax(28rem,0.86fr)_minmax(0,1.14fr)] xl:gap-10">
                <div className="relative z-20 h-[72svh] min-h-[34rem] max-h-[48rem] overflow-hidden pr-8 xl:pr-12">
                  {services.map((service, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <article
                        key={service.title}
                        data-service-copy
                        aria-hidden={!isActive}
                        className="absolute inset-0 flex flex-col justify-center opacity-0 will-change-[transform,opacity]"
                      >
                        <div className="font-ui flex items-center gap-4 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-black/46">
                          <span className="text-[#C72A09]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="h-px w-10 bg-black/18"
                            aria-hidden="true"
                          />
                          <span>{String(services.length).padStart(2, "0")}</span>
                        </div>

                        <h3 className="font-display mt-5 max-w-[12ch] text-[clamp(3rem,4.3vw,5.3rem)] font-bold uppercase leading-[0.84] tracking-[-0.04em]">
                          {service.title}
                        </h3>
                        <p className="mt-6 max-w-[23ch] text-[clamp(1.4rem,1.9vw,2.15rem)] font-semibold leading-[1.02] text-black/84">
                          {service.statement}
                        </p>
                        <p className="mt-5 max-w-[35rem] text-base leading-7 text-black/64 xl:text-lg xl:leading-8">
                          {service.description}
                        </p>

                        <ul className="font-ui mt-7 grid max-w-[35rem] border-y border-black/14 text-[0.73rem] font-bold uppercase tracking-[0.05em] text-black/66">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="border-b border-black/10 py-2.5 last:border-b-0"
                            >
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <a
                          href="tel:+393289185029"
                          tabIndex={isActive ? 0 : -1}
                          className="font-ui mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-[opacity,transform] duration-150 hover:opacity-[0.84] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none"
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

                <div className="relative h-[82svh] min-h-[39rem] max-h-[56rem]">
                  <div
                    className="absolute top-1/2"
                    style={{
                      left: "calc(50% + clamp(190px, 15vw, 250px))",
                    }}
                  >
                    {services.map((service, index) => (
                      <figure
                        key={service.title}
                        data-service-visual
                        aria-hidden={index !== activeIndex}
                        className="absolute left-1/2 top-1/2 overflow-hidden rounded-[24px] border border-gray-200 bg-gray-50 shadow-[0_22px_50px_rgba(0,0,0,0.16)] opacity-0 will-change-[transform,opacity]"
                      >
                        <Image
                          src={service.image}
                          alt={service.alt}
                          fill
                          sizes="(min-width: 1200px) 260px, 230px"
                          className="object-cover"
                          priority={index === 0}
                        />
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
                <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-gray-200 bg-gray-50">
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
                <ul className="font-ui mt-6 grid max-w-[36rem] border-y border-black/14 text-[0.75rem] font-bold uppercase tracking-[0.05em] text-black/66">
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
                  className="font-ui mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
                >
                  Chiama per informazioni
                  <PhoneCall
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
