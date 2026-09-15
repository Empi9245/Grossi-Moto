"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Check, PhoneCall } from "lucide-react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

const services = [
  {
    title: "Officina per scooter",
    statement: "Diagnosi e interventi senza improvvisazioni.",
    description:
      "Controllo del mezzo, attrezzatura adatta e un quadro chiaro prima di ogni lavoro.",
    features: [
      "Diagnosi strumentale",
      "Lavoro documentato",
      "Presa in carico chiara",
    ],
    image: "/grossimoto/servizi/officina-autorizzata.png",
    alt: "Officina scooter Grossi Moto a Roma",
  },
  {
    title: "Tagliandi",
    statement: "La manutenzione segue il veicolo, non il calendario.",
    description:
      "Definiamo controlli, materiali e tempistiche in base a modello, chilometri e uso reale a Roma.",
    features: [
      "Piano su chilometraggio",
      "Materiali adatti al modello",
      "Lavori concordati",
    ],
    image: "/grossimoto/servizi/tagliandi.png",
    alt: "Tagliando scooter a Roma, Grossi Moto",
  },
  {
    title: "Ricambi e accessori",
    statement: "Componenti giusti, montati nel modo giusto.",
    description:
      "Ricambi e accessori compatibili, ordinati o disponibili in sede con tracciabilità del lavoro.",
    features: [
      "Componenti per KYMCO e Voge",
      "Compatibilità verificata",
      "Montaggio in officina",
    ],
    image: "/grossimoto/servizi/ricambi-originali.png",
    alt: "Ricambi e accessori scooter a Roma, Grossi Moto",
  },
  {
    title: "Finanziamenti",
    statement: "Il mezzo si sceglie prima della rata.",
    description:
      "Valutiamo insieme anticipo, durata e modello, senza partire dalla rata.",
    features: [
      "Proposte su misura",
      "Anticipo modulabile",
      "Scelta prima della rata",
    ],
    image: "/grossimoto/servizi/finanziamenti.png",
    alt: "Finanziamento scooter a Roma, Grossi Moto",
  },
  {
    title: "Permute",
    statement: "Il tuo usato entra nella trattativa con trasparenza.",
    description:
      "Valutazione diretta, lettura dello stato del mezzo e passaggio verso il nuovo senza tempi morti.",
    features: [
      "Valutazione diretta",
      "Lettura dello stato reale",
      "Passaggio senza tempi morti",
    ],
    image: "/grossimoto/servizi/permute.png",
    alt: "Valutazione permuta scooter usato a Roma, Grossi Moto",
  },
  {
    title: "Consulenza",
    statement: "Scegliere bene evita modifiche dopo.",
    description:
      "Confrontiamo uso, postura, cilindrata e accessori prima dell'acquisto o dell'intervento.",
    features: [
      "Uso quotidiano letto bene",
      "Postura e cilindrata",
      "Accessori coerenti",
    ],
    image: "/grossimoto/servizi/consulenza.png",
    alt: "Consulenza per scegliere uno scooter a Roma, Grossi Moto",
  },
];

const premiumEase: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

export function StickyScrollShowcase() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDesktopViewport = useMediaQuery("(min-width: 1024px)");
  const [isReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const content = contentRef.current;
    if (!content || isReduced || !isDesktopViewport) return;

    let frame = 0;

    const updateActiveService = () => {
      frame = 0;
      const items =
        content.querySelectorAll<HTMLElement>("[data-service-index]");
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDist = Infinity;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(itemCenter - viewportCenter);
        const index = Number(item.getAttribute("data-service-index"));

        if (!Number.isNaN(index) && dist < closestDist) {
          closestDist = dist;
          closestIndex = index;
        }
      });

      setActiveIndex((current) =>
        current === closestIndex ? current : closestIndex,
      );
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveService);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    updateActiveService();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [isDesktopViewport, isReduced]);

  return (
    <section className="relative overflow-clip rounded-t-[2rem] bg-[#E7E3DC] text-[#1B0E0D] shadow-[0_-1px_0_rgba(231,227,220,0.2)] lg:rounded-t-[2.5rem]">
      <div className="mx-auto max-w-[96rem] px-5 pb-6 pt-16 sm:px-7 sm:pt-20 md:px-10 lg:px-14 lg:pt-24 xl:px-20">
        <p className="font-tech text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#1B0E0D]/54 sm:text-xs">
          I nostri servizi
        </p>
        <h2 className="font-display mt-5 max-w-[14ch] text-[clamp(4.15rem,13vw,13.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.05em]">
          Cosa
          <br />
          possiamo
          <br />
          fare per te<span className="text-[#1B0E0D]">.</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-[minmax(30rem,41vw)_6.5rem_minmax(0,1fr)] lg:items-start">
        <div className="relative hidden min-h-full lg:block">
          <div className="sticky top-0 flex h-[100svh] items-center px-5 py-8 xl:px-10">
            {/* FIX P1: overflow-hidden aggiunto → rounded-[2rem] clipa correttamente l'immagine.
                Span bg-[#120D0C]/72 rimosso: oscurava la foto; il gradient overlay gestisce già il contrasto. */}
            <figure className="liquid-glass relative h-[84svh] w-full overflow-hidden rounded-[2rem] shadow-[0_34px_90px_rgba(27,14,13,0.25)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="absolute inset-0"
                  initial={
                    isReduced || !isDesktopViewport
                      ? {}
                      : { opacity: 0, scale: 1.065, filter: "blur(7px)" }
                  }
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={
                    isReduced || !isDesktopViewport
                      ? {}
                      : { opacity: 0, scale: 0.985, filter: "blur(5px)" }
                  }
                  transition={{ duration: 0.5, ease: premiumEase }}
                >
                  <Image
                    src={services[activeIndex].image}
                    alt={services[activeIndex].alt}
                    fill
                    sizes="41vw"
                    className="object-cover brightness-[0.78] contrast-[1.16] saturate-[0.72]"
                    priority={activeIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,13,12,0)_34%,rgba(18,13,12,0.86)_100%),radial-gradient(circle_at_74%_22%,rgba(244,240,232,0.22),transparent_0_28%,transparent_46%)]"
              />

            </figure>
          </div>
        </div>

        <aside className="sticky top-0 hidden h-[100svh] items-center justify-center lg:flex">
          <nav aria-label="Avanzamento servizi" className="relative py-2">
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-2 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-[#1B0E0D]/14"
            />
            <ol className="relative z-10 flex flex-col items-center gap-7">
              {services.map((service, index) => {
                const isActive = index === activeIndex;
                const serviceNumber = String(index + 1).padStart(2, "0");

                return (
                  <li key={service.title}>
                    <a
                      href={`#service-${serviceNumber}`}
                      aria-current={isActive ? "step" : undefined}
                      className={[
                        "liquid-glass group font-tech relative flex h-12 min-w-12 items-center justify-center rounded-full text-[0.72rem] font-semibold uppercase tracking-[0.12em] transition-[color,transform] duration-[320ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B0E0D]/38 focus-visible:ring-offset-4 focus-visible:ring-offset-[#E7E3DC]",
                        isActive
                          ? "text-[#F4F0E8]"
                          : "text-[#1B0E0D]/58 hover:text-[#1B0E0D]",
                      ].join(" ")}
                    >
                      <span
                        aria-hidden="true"
                        className={[
                          "absolute inset-0 rounded-[inherit] transition-[background,opacity] duration-[320ms] ease-[cubic-bezier(0.165,0.84,0.44,1)]",
                          isActive
                            ? "bg-[#1B0E0D] opacity-95"
                            : "bg-[#E7E3DC]/46 opacity-100 group-hover:bg-[#F4F0E8]",
                        ].join(" ")}
                      />
                      <span className="relative z-10">{serviceNumber}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        <div ref={contentRef} className="pb-24">
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            const serviceNumber = String(index + 1).padStart(2, "0");

            return (
              <article
                key={service.title}
                id={`service-${serviceNumber}`}
                data-service-index={index}
                className="relative grid max-w-full scroll-mt-8 overflow-x-clip border-t border-[#1B0E0D]/10 px-5 pb-20 pt-12 first:border-none first:pt-8 sm:px-7 sm:pb-28 sm:pt-20 md:px-10 lg:min-h-[108svh] lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:px-8 lg:py-[9svh] xl:px-16"
              >
                {/* FIX P2: relative + overflow-hidden sul wrapper → il border-radius clipa l'immagine.
                    Span assoluto rimosso (si posizionava sull'<article>, non sul wrapper).
                    rounded-[2rem] sull'<Image>. Gradient div in coda sostituisce lo span per l'overlay. */}
                <div className="liquid-glass relative mb-7 overflow-hidden rounded-[1.5rem] shadow-[0_24px_60px_rgba(27,14,13,0.18)] lg:hidden sm:mb-8 sm:rounded-[2rem]">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    width={900}
                    height={680}
                    sizes="100vw"
                    className="h-[min(34svh,18rem)] min-h-[15rem] w-full rounded-[1.5rem] object-cover brightness-[0.82] contrast-[1.12] saturate-[0.74] sm:h-[38svh] sm:min-h-[17rem] sm:rounded-[2rem]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-[linear-gradient(180deg,transparent_45%,rgba(18,13,12,0.75)_100%)] sm:rounded-[2rem]"
                  />
                </div>

                <span
                  aria-hidden="true"
                  className="font-display pointer-events-none absolute right-5 top-[7svh] hidden text-[clamp(12rem,19vw,25rem)] font-bold leading-none tracking-[-0.06em] text-[#1B0E0D]/[0.055] lg:block"
                >
                  {serviceNumber}
                </span>

                <div className="relative z-10 flex items-center justify-between gap-8">
                  <span className="liquid-glass font-tech relative inline-flex min-h-10 min-w-10 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-[0.12em] text-[#1B0E0D]/62">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-[inherit] bg-[#E7E3DC]/38"
                    />
                    <span className="relative z-10">{serviceNumber}</span>
                  </span>
                  <span className="h-px flex-1 bg-[#1B0E0D]/14" />
                  <span className="font-tech max-w-[13rem] text-right text-[0.64rem] font-semibold uppercase leading-5 tracking-[0.18em] text-[#1B0E0D]/46">
                    Servizi Grossimoto
                  </span>
                </div>

                <motion.div
                  className="relative z-10 grid h-full w-full min-w-0 content-center"
                  animate={
                    isReduced || !isDesktopViewport
                      ? {}
                      : {
                          opacity: isActive ? 1 : 0.34,
                          y: isActive ? 0 : 22,
                        }
                  }
                  transition={{ duration: 0.46, ease: premiumEase }}
                >
                  {/* FIX P3: clamp mobile 3.2rem/14vw -> 2.6rem/11vw; Finanziamenti resta
                      su una riga nei viewport desktop ampi, senza forzare overflow su laptop stretti. */}
                  <h3
                    className={[
                      "font-display max-w-full whitespace-normal text-[clamp(2.6rem,11vw,6.2rem)] font-bold uppercase leading-[0.82] tracking-[-0.05em] [overflow-wrap:anywhere] lg:whitespace-normal lg:text-[clamp(4.2rem,5.8vw,6.8rem)] xl:text-[clamp(4.6rem,5.2vw,7.4rem)]",
                      service.title === "Finanziamenti"
                        ? "xl:max-w-none xl:whitespace-nowrap"
                        : "lg:max-w-[11ch]",
                    ].join(" ")}
                  >
                    {service.title}
                    <span className="text-[#1B0E0D]">.</span>
                  </h3>
                </motion.div>

                <motion.div
                  className="relative z-10 grid min-w-0 gap-8 2xl:grid-cols-[minmax(0,0.9fr)_minmax(21rem,0.68fr)] 2xl:items-end"
                  animate={
                    isReduced || !isDesktopViewport
                      ? {}
                      : {
                          opacity: isActive ? 1 : 0.42,
                          y: isActive ? 0 : 18,
                        }
                  }
                  transition={{ duration: 0.46, ease: premiumEase }}
                >
                  <div className="min-w-0">
                    <p className="max-w-[18ch] text-[clamp(1.55rem,6.5vw,2.9rem)] font-semibold uppercase leading-[0.96] tracking-[-0.03em] text-[#1B0E0D] [overflow-wrap:break-word] lg:text-[clamp(2.05rem,2.75vw,3.4rem)] 2xl:text-[clamp(2.3rem,3vw,4.2rem)]">
                      {service.statement}
                    </p>
                    <a
                      href="tel:+393289185029"
                      className="font-tech group mt-8 hidden min-h-12 items-center justify-center gap-3 rounded-full bg-[#1B0E0D] px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.13em] text-[#F4F0E8] transition-[background,color,transform] duration-[320ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:bg-[#F4F0E8] hover:text-[#1B0E0D] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B0E0D]/38 focus-visible:ring-offset-4 focus-visible:ring-offset-[#E7E3DC] lg:inline-flex"
                    >
                      Prenota un intervento
                      <PhoneCall
                        aria-hidden="true"
                        className="h-4 w-4"
                        strokeWidth={1.8}
                      />
                    </a>
                  </div>

                  <div className="liquid-glass max-w-[34rem] rounded-[1.65rem] p-5 shadow-[0_20px_54px_rgba(27,14,13,0.08)] 2xl:max-w-none">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-[inherit] bg-[#ECE8E1]/58"
                    />
                    <div className="relative z-10">
                      <p className="max-w-[34rem] text-base font-medium leading-7 text-[#1B0E0D]/70 xl:text-lg xl:leading-8">
                        {service.description}
                      </p>
                      <ul className="mt-7 grid gap-3">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 text-sm font-normal uppercase leading-5 tracking-[-0.01em] text-[#1B0E0D]/78"
                          >
                            <span className="liquid-glass inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#1B0E0D]/62">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 rounded-[inherit] bg-[#E7E3DC]/44"
                              />
                              <Check
                                aria-hidden="true"
                                className="relative z-10 h-3.5 w-3.5"
                                strokeWidth={2}
                              />
                            </span>
                            <span className="min-w-0 [overflow-wrap:break-word]">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </article>
            );
          })}
        </div>
      </div>

    </section>
  );
}
