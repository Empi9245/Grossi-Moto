"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Box,
  CreditCard,
  MessageCircle,
  PhoneCall,
  RefreshCcw,
  Tag,
  Wrench,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERVICE_ITEMS = [
  {
    code: "01",
    title: "Officina autorizzata",
    shortTitle: "Officina",
    description: "Diagnosi e interventi senza improvvisazioni.",
    href: "#service-01",
    icon: Wrench,
  },
  {
    code: "02",
    title: "Tagliandi",
    shortTitle: "Tagliandi",
    description: "Manutenzione ufficiale, tempi chiari.",
    href: "#service-02",
    icon: Tag,
  },
  {
    code: "03",
    title: "Ricambi originali",
    shortTitle: "Ricambi",
    description: "Componenti corretti, tracciati in sede.",
    href: "#service-03",
    icon: Box,
  },
  {
    code: "04",
    title: "Finanziamenti",
    shortTitle: "Finanziamenti",
    description: "Soluzioni costruite su modello e durata.",
    href: "#service-04",
    icon: CreditCard,
  },
  {
    code: "05",
    title: "Permute",
    shortTitle: "Permute",
    description: "Valutazione diretta e passaggio pulito.",
    href: "#service-05",
    icon: RefreshCcw,
  },
  {
    code: "06",
    title: "Consulenza",
    shortTitle: "Consulenza",
    description: "Scelta di mezzo, postura e accessori.",
    href: "#service-06",
    icon: MessageCircle,
  },
] as const;

const HERO_IMAGE = {
  src: "/kymco-all/sections/ak575-premium-dsc3316-b-scaled-dsc3316-b-scaled.jpg",
  alt: "Dettaglio faro anteriore KYMCO AK575 Premium in studio, servizi Grossimoto",
};

export function ServicesHero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const container = containerRef.current;
      if (!container) return;

      const intro = container.querySelector<HTMLElement>("[data-hero-intro]");
      const introLabel =
        container.querySelector<HTMLElement>("[data-hero-label]");
      const introLines =
        container.querySelectorAll<HTMLElement>("[data-hero-line-wrapper]");
      const introDesc =
        container.querySelector<HTMLElement>("[data-hero-desc]");
      const introCtas =
        container.querySelector<HTMLElement>("[data-hero-ctas]");
      const imgWrapper = container.querySelector<HTMLElement>(
        "[data-hero-img-wrapper]",
      );
      const img = container.querySelector<HTMLElement>("[data-hero-img]");
      const overlay = container.querySelector<HTMLElement>(
        "[data-hero-overlay]",
      );
      const board = container.querySelector<HTMLElement>("[data-service-board]");
      const boardStatement = container.querySelector<HTMLElement>(
        "[data-service-statement]",
      );
      const boardLines = container.querySelectorAll<HTMLElement>(
        "[data-service-statement-line]",
      );
      const serviceCards =
        container.querySelectorAll<HTMLElement>("[data-service-card]");

      if (
        !intro ||
        !introLabel ||
        !introDesc ||
        !introCtas ||
        !imgWrapper ||
        !img ||
        !overlay ||
        !board ||
        !boardStatement ||
        boardLines.length === 0 ||
        serviceCards.length === 0
      ) {
        return;
      }

      const cleanups: Array<() => void> = [];

      if (reducedMotion) {
        return;
      }

      gsap.set(board, {
        autoAlpha: 0,
        pointerEvents: "none",
      });

      const entrance = gsap.timeline({
        defaults: {
          duration: 0.82,
          ease: "power3.out",
        },
      });

      entrance
        .from(
          imgWrapper,
          {
            scale: 1.08,
            opacity: 0,
            duration: 1.08,
            ease: "power2.out",
          },
          0,
        )
        .from(
          introLabel,
          {
            opacity: 0,
            y: 16,
            filter: "blur(4px)",
            duration: 0.46,
          },
          0.08,
        )
        .from(
          introLines,
          {
            opacity: 0,
            y: 54,
            filter: "blur(8px)",
            stagger: 0.055,
          },
          0.16,
        )
        .from(
          introDesc,
          {
            opacity: 0,
            y: 22,
            filter: "blur(5px)",
            duration: 0.54,
          },
          0.38,
        )
        .from(
          introCtas,
          {
            opacity: 0,
            y: 18,
            filter: "blur(5px)",
            duration: 0.5,
          },
          0.46,
        );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.45,
          pinSpacing: true,
        },
      });

      scrollTl
        .to(
          img,
          {
            scale: 1.12,
            ease: "none",
          },
          0,
        )
        .to(
          overlay,
          {
            opacity: 0.68,
            ease: "none",
          },
          0,
        )
        .to(
          intro,
          {
            opacity: 0,
            y: -34,
            filter: "blur(8px)",
            ease: "power1.in",
            duration: 0.46,
          },
          0.14,
        )
        .set(
          board,
          {
            pointerEvents: "auto",
          },
          0.55,
        )
        .fromTo(
          board,
          {
            autoAlpha: 0,
            y: 34,
            scale: 0.985,
            filter: "blur(10px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 0.34,
          },
          0.58,
        )
        .fromTo(
          boardStatement,
          {
            opacity: 0,
            x: -34,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 0.34,
          },
          0.62,
        )
        .fromTo(
          boardLines,
          {
            yPercent: 105,
          },
          {
            yPercent: 0,
            stagger: 0.035,
            ease: "power3.out",
            duration: 0.32,
          },
          0.64,
        )
        .fromTo(
          serviceCards,
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            ease: "power2.out",
            duration: 0.24,
          },
          0.66,
        );

      serviceCards.forEach((card) => {
        const handlePointerMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const localX = event.clientX - rect.left;
          const localY = event.clientY - rect.top;
          const offsetX = (localX / rect.width - 0.5) * 10;
          const offsetY = (localY / rect.height - 0.5) * 10;

          card.style.setProperty("--pointer-x", `${localX}px`);
          card.style.setProperty("--pointer-y", `${localY}px`);
          card.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(1.018)`;
        };

        const handlePointerLeave = () => {
          card.style.transform = "";
          card.style.setProperty("--pointer-x", "50%");
          card.style.setProperty("--pointer-y", "50%");
        };

        card.addEventListener("pointermove", handlePointerMove);
        card.addEventListener("pointerleave", handlePointerLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", handlePointerMove);
          card.removeEventListener("pointerleave", handlePointerLeave);
        });
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#050504] text-[#F4F0E8]"
    >
      <div data-hero-img-wrapper className="absolute inset-0 z-0">
        <div data-hero-img className="h-full w-full origin-center">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_center] brightness-[0.66] contrast-[1.22] saturate-[0.45] md:object-center"
          />
        </div>
      </div>

      <div
        data-hero-overlay
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[#050504]"
        style={{ opacity: 0.4 }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(circle at 58% 48%, rgba(255,255,255,0.11), transparent 0 24%, transparent 48%), linear-gradient(90deg, rgba(5,5,4,0.98) 0%, rgba(5,5,4,0.78) 32%, rgba(5,5,4,0.18) 63%, rgba(5,5,4,0.88) 100%), linear-gradient(180deg, rgba(5,5,4,0.34) 0%, rgba(5,5,4,0) 42%, rgba(5,5,4,0.96) 100%)",
        }}
      />

      <div
        data-hero-intro
        className="relative z-10 flex min-h-[100svh] w-full flex-col justify-between px-5 pb-[clamp(1.5rem,4svh,3rem)] pt-24 [will-change:transform,opacity,filter] sm:px-7 md:px-10 lg:px-14 lg:pt-28 xl:px-20"
      >
        <div data-hero-label>
          <p className="font-tech text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#F4F0E8]/72 sm:text-xs">
            Servizi KYMCO
          </p>
        </div>

        <div className="flex flex-1 flex-col items-start justify-center">
          <h1 className="font-display max-w-[12ch] text-[clamp(4.1rem,16vw,8.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.05em] text-[#F4F0E8] sm:text-[clamp(5.2rem,12vw,10rem)] lg:text-[clamp(6rem,9vw,12rem)]">
            <span data-hero-line-wrapper className="block overflow-hidden pb-[0.03em]">
              <span className="block">Assistenza.</span>
            </span>
            <span data-hero-line-wrapper className="block overflow-hidden pb-[0.03em]">
              <span className="block">Officina.</span>
            </span>
            <span data-hero-line-wrapper className="block overflow-hidden pb-[0.03em]">
              <span className="block">Esperienza.</span>
            </span>
          </h1>
        </div>

        <div className="flex flex-col gap-8 pb-2 sm:pb-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div data-hero-desc className="max-w-[600px]">
            <p className="max-w-[30rem] text-base font-medium leading-7 text-[#F4F0E8]/78 sm:text-lg sm:leading-8">
              Servizi ufficiali KYMCO e VOGE. Tagliandi, officina
              specializzata, ricambi originali e consulenza.
            </p>
          </div>

          <div
            data-hero-ctas
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href="tel:+393289185029"
              className="font-tech group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#F4F0E8] px-7 py-3 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#1B0E0D] shadow-[0_20px_58px_rgba(0,0,0,0.28)] transition-[background,color,box-shadow,transform] duration-[320ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:bg-[#E7E3DC] hover:shadow-[0_24px_70px_rgba(0,0,0,0.34)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050504]"
            >
              Prenota intervento
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-[320ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </a>
            <a
              href="/contatti"
              className="font-tech group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#F4F0E8]/7 px-7 py-3 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#F4F0E8] shadow-[inset_0_0_0_1px_rgba(244,240,232,0.22)] backdrop-blur-md transition-[background,color,box-shadow,transform] duration-[320ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:bg-[#F4F0E8]/14 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050504]"
            >
              Contattaci
              <PhoneCall
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            </a>
          </div>
        </div>
      </div>

      <div
        data-service-board
        aria-label="Navigazione servizi"
        className="pointer-events-none invisible absolute inset-0 z-20 flex min-h-[100svh] items-end px-5 pb-[clamp(1rem,5svh,3.5rem)] opacity-0 [will-change:transform,opacity,filter] sm:px-7 md:items-center md:px-10 md:pb-0 lg:px-14 xl:px-20"
      >
        <div className="grid w-full items-end gap-6 md:items-center lg:grid-cols-[minmax(0,0.9fr)_minmax(32rem,56rem)] lg:gap-10 xl:gap-16">
          <div
            data-service-statement
            className="hidden max-w-[48rem] opacity-0 [will-change:transform,opacity,filter] lg:block"
          >
            <p className="font-tech mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#F4F0E8]/58">
              Assistenza completa
            </p>
            <p className="font-display text-[clamp(5.8rem,10.8vw,13rem)] font-bold uppercase leading-[0.78] tracking-[-0.05em] text-[#F4F0E8]">
              <span className="block overflow-hidden pb-[0.04em]">
                <span data-service-statement-line className="block">
                  Tutto
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <span data-service-statement-line className="block">
                  in
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <span
                  data-service-statement-line
                  className="block text-[#C72A09]"
                >
                  sede.
                </span>
              </span>
            </p>
            <p className="mt-7 max-w-[28rem] text-lg font-medium leading-8 text-[#F4F0E8]/64">
              Officina, vendita, ricambi e consulenza entrano nello stesso
              percorso, senza passaggi dispersi.
            </p>
          </div>

          <nav
            aria-label="Vai al servizio"
            className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SERVICE_ITEMS.map((service) => {
              const Icon = service.icon;

              return (
                <a
                  key={service.code}
                  data-service-card
                  href={service.href}
                  aria-label={`Vai a ${service.title}`}
                  className="liquid-glass group min-h-[9.25rem] rounded-[1.65rem] p-5 text-[#F4F0E8] transition-[filter,transform] duration-[420ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] [--pointer-x:50%] [--pointer-y:50%] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050504] sm:min-h-[10.25rem]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[420ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(220px circle at var(--pointer-x) var(--pointer-y), rgba(244,240,232,0.2), transparent 42%), linear-gradient(135deg, rgba(255,255,255,0.12), transparent 34%)",
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-5 h-9 w-9 rounded-full bg-[#050504]/26 text-[#F4F0E8]/86 shadow-[inset_0_0_0_1px_rgba(244,240,232,0.18)] transition-[color,background,transform] duration-[320ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:bg-[#F4F0E8] group-hover:text-[#1B0E0D]"
                  >
                    <Icon className="m-2 h-5 w-5" strokeWidth={1.65} />
                  </span>

                  <span className="font-tech relative z-10 block text-xs font-semibold uppercase tracking-[0.18em] text-[#F4F0E8]/56">
                    {service.code}
                  </span>
                  <span className="font-ui relative z-10 mt-8 block max-w-[9rem] text-[1.35rem] font-bold uppercase leading-[0.92] tracking-[-0.03em] sm:text-[1.45rem]">
                    {service.shortTitle}
                  </span>
                  <span className="relative z-10 mt-3 block max-w-[13rem] text-xs font-medium leading-5 text-[#F4F0E8]/62">
                    {service.description}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#050504]/22 shadow-[inset_0_0_0_1px_rgba(244,240,232,0.18)] transition-[background,color,transform] duration-[320ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-x-0.5 group-hover:bg-[#F4F0E8] group-hover:text-[#1B0E0D]"
                  >
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.9} />
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
