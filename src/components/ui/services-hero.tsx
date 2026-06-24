"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERVICE_CATEGORIES = [
  "OFFICINA",
  "TAGLIANDI",
  "RICAMBI",
  "FINANZIAMENTI",
  "PERMUTE",
  "CONSULENZA",
] as const;

const HERO_IMAGE = {
  src: "/kymco-all/sections/ak575-premium-dsc3316-b-scaled-dsc3316-b-scaled.jpg",
  alt: "Dettaglio faro anteriore KYMCO AK575 Premium in studio — servizi Grossimoto",
};

export function ServicesHero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) {
        gsap.set("[data-hero-category]", { opacity: 1 });
        return;
      }

      const container = containerRef.current;
      if (!container) return;

      const headlineLines = container.querySelectorAll<HTMLElement>("[data-hero-line]");
      const headlineWrappers = container.querySelectorAll<HTMLElement>("[data-hero-line-wrapper]");
      const label = container.querySelector<HTMLElement>("[data-hero-label]");
      const desc = container.querySelector<HTMLElement>("[data-hero-desc]");
      const ctas = container.querySelector<HTMLElement>("[data-hero-ctas]");
      const imgWrapper = container.querySelector<HTMLElement>("[data-hero-img-wrapper]");
      const img = container.querySelector<HTMLElement>("[data-hero-img]");
      const overlay = container.querySelector<HTMLElement>("[data-hero-overlay]");
      const categories = container.querySelectorAll<HTMLElement>("[data-hero-category]");

      /* ── Entrance timeline ─────────────────────────────────── */
      const entrance = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.92,
        },
      });

      entrance
        .from(
          imgWrapper,
          {
            scale: 1.15,
            opacity: 0,
            duration: 1.4,
            ease: "power2.out",
          },
          0,
        )
        .from(
          label,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          0.15,
        )
        .from(
          headlineWrappers,
          {
            opacity: 0,
            y: 60,
            stagger: 0.08,
          },
          0.2,
        )
        .from(
          desc,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          0.44,
        )
        .from(
          ctas,
          {
            opacity: 0,
            y: 24,
            duration: 0.6,
          },
          0.56,
        );

      /* ── Scroll-driven timeline ────────────────────────────── */
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 0.8,
          pinSpacing: true,
        },
      });

      /* Headline split – animate the inner elements to avoid conflicting with entrance wrapper */
      if (headlineLines.length >= 3) {
        scrollTl
          .to(
            headlineLines[0],
            {
              xPercent: -18,
              opacity: 0.4,
              ease: "none",
            },
            0,
          )
          .to(
            headlineLines[2],
            {
              xPercent: 18,
              opacity: 0.4,
              ease: "none",
            },
            0,
          );
      }

      /* Image zoom - animate the inner image to avoid conflict with entrance wrapper */
      scrollTl.to(
        img,
        {
          scale: 1.25,
          ease: "none",
        },
        0,
      );

      /* Overlay darken */
      scrollTl.to(
        overlay,
        {
          opacity: 0.82,
          ease: "none",
        },
        0,
      );

      /* Description + CTAs fade out early */
      scrollTl.to(
        [desc, ctas],
        {
          opacity: 0,
          y: -16,
          ease: "none",
          duration: 0.4,
        },
        0,
      );

      /* Label fade */
      scrollTl.to(
        label,
        {
          opacity: 0,
          ease: "none",
          duration: 0.5,
        },
        0,
      );

      /* Categories reveal at ~70% */
      scrollTl.fromTo(
        categories,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          ease: "power2.out",
          duration: 0.3,
        },
        0.65,
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-[#111111]"
    >
      {/* ── Background image ─────────────────────────────────── */}
      <div data-hero-img-wrapper className="absolute inset-0 z-0">
        <div data-hero-img className="h-full w-full">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_center] md:object-center"
          />
        </div>
      </div>

      {/* ── Dark overlay ─────────────────────────────────────── */}
      <div
        data-hero-overlay
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[#111111]"
        style={{ opacity: 0.52 }}
      />

      {/* ── Bottom gradient for text legibility ──────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[2] h-[60%] bg-[linear-gradient(0deg,#111111_0%,transparent_100%)]"
        style={{ opacity: 0.6 }}
      />

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between px-5 py-[clamp(1.5rem,4svh,3rem)] sm:px-7 md:px-10 lg:px-14 xl:px-20">
        {/* Top label */}
        <div data-hero-label className="pt-2 sm:pt-4">
          <p className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#F7F4EF] opacity-70 sm:text-xs">
            Servizi Grossimoto
          </p>
        </div>

        {/* Center headline */}
        <div className="flex flex-1 flex-col items-start justify-center">
          <h1 className="font-display max-w-[18ch] text-[clamp(3.4rem,10vw,10rem)] font-[900] leading-[0.9] tracking-tight text-[#F7F4EF]">
            <span data-hero-line-wrapper className="block overflow-visible">
              <span data-hero-line className="block">
                Assistenza.
              </span>
            </span>
            <span data-hero-line-wrapper className="block overflow-visible">
              <span data-hero-line className="block">
                Officina.
              </span>
            </span>
            <span data-hero-line-wrapper className="block overflow-visible">
              <span data-hero-line className="block">
                Esperienza.
              </span>
            </span>
          </h1>
        </div>

        {/* Bottom area */}
        <div className="flex flex-col gap-8 pb-2 sm:pb-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          {/* Description */}
          <div data-hero-desc className="max-w-[600px]">
            <p className="text-sm leading-7 text-[#F7F4EF] opacity-75 sm:text-base md:text-lg md:leading-8">
              Servizi ufficiali KYMCO e VOGE.
              <br className="hidden sm:block" />
              Tagliandi, officina specializzata,
              <br className="hidden sm:block" />
              ricambi originali e consulenza.
            </p>
          </div>

          {/* CTAs */}
          <div
            data-hero-ctas
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href="tel:+393289185029"
              className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F7F4EF] px-7 py-3 text-sm font-medium text-[#111111] shadow-[0_16px_48px_rgba(13,9,7,0.24)] transition-[opacity,transform] duration-200 hover:opacity-90 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F4EF]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111] sm:text-base"
            >
              Prenota assistenza
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            </a>
            <a
              href="/contatti"
              className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F7F4EF]/8 px-7 py-3 text-sm font-medium text-[#F7F4EF] shadow-[inset_0_0_0_1px_rgba(247,244,239,0.16)] transition-[background,transform] duration-200 hover:bg-[#F7F4EF]/14 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F4EF]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111] sm:text-base"
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

      {/* ── Service categories (hidden at start, revealed by scroll) ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="grid w-full max-w-[72rem] grid-cols-2 gap-x-6 gap-y-5 px-5 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-7 md:px-10 lg:px-14 xl:px-20">
          {SERVICE_CATEGORIES.map((category) => (
            <div
              key={category}
              data-hero-category
              className="flex items-center gap-3 opacity-0"
            >
              <span
                aria-hidden="true"
                className="h-px w-5 shrink-0 bg-[#F7F4EF]/40 sm:w-8"
              />
              <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#F7F4EF] sm:text-sm md:text-base">
                {category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
