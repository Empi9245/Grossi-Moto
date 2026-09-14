"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarCheck, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

import { BottomLeftCard } from "./BottomLeftCard";
import { BottomRightCorner } from "./BottomRightCorner";
import { HeroBadge } from "./HeroBadge";
import { Navbar } from "./Navbar";
import { revealMotion, subtleHover } from "./motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type HeroProps = {
  cardAriaHidden?: boolean;
  cardMotion?: ReturnType<typeof revealMotion>;
};

export function Hero({ cardAriaHidden, cardMotion }: HeroProps = {}) {
  const shouldReduceMotion = useReducedMotion();
  const isDesktopViewport = useMediaQuery("(min-width: 1024px)");
  const { style: cardMotionStyle, ...cardMotionProps } = cardMotion ?? {};

  return (
    <section
      aria-label="Grossimoto, rivenditore ufficiale KYMCO a Roma"
      className="relative isolate z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[oklch(88%_0.015_78)] px-3 pb-3 pt-2 sm:px-4 sm:pb-4 sm:pt-3 lg:px-5 lg:pb-5 lg:pt-4"
    >
      <div className="relative flex h-[calc(100svh-1rem)] w-full shrink-0 flex-col sm:h-[calc(100svh-1.5rem)] lg:h-[calc(100svh-2rem)] 2xl:h-[calc(100svh-2.5rem)]">
        <video
          className="absolute inset-0 z-0 h-full w-full scale-[1.04] object-cover object-[58%_center] lg:object-center"
          autoPlay={isDesktopViewport && !shouldReduceMotion}
          muted
          loop
          playsInline
          poster="/grossimoto/home-scroll/01-people-s-125-abs-lago.jpg"
          preload={isDesktopViewport ? "metadata" : "none"}
          aria-hidden="true"
        >
          <source src="/video%20hero/videoplayback.mp4" type="video/mp4" />
        </video>

        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/20 to-transparent"
        />

        <Navbar />

        <div className="relative z-10 flex h-full w-full shrink-0 flex-col">
          <div
            data-qa="hero-copy"
            className="mx-auto flex min-w-0 w-full max-w-[78rem] flex-1 flex-col items-center px-5 pt-[clamp(1rem,3svh,2.5rem)] pb-[6.5rem] text-center sm:px-7 sm:pb-[10.75rem] md:px-8 md:pb-[9.5rem] lg:pb-[11rem] xl:pt-[clamp(1.5rem,5svh,5rem)]"
          >
            <HeroBadge />

            <motion.h1
              {...revealMotion(shouldReduceMotion, {
                duration: 0.52,
                scale: 0.975,
                y: 22,
              })}
              className="font-display mt-4 w-full max-w-[20rem] [overflow-wrap:break-word] text-[clamp(2.85rem,12vw,4.35rem)] leading-[0.98] font-normal tracking-normal text-[oklch(95%_0.01_80)] sm:mt-5 sm:max-w-[38rem] md:max-w-[54rem] md:text-[clamp(4.5rem,7.8vw,6.5rem)] lg:max-w-[72rem] lg:text-[clamp(5.25rem,6.6vw,7.5rem)]"
            >
              Trova lo scooter giusto per Roma
            </motion.h1>

            <motion.p
              {...revealMotion(shouldReduceMotion, {
                duration: 0.52,
                scale: 0.99,
                y: 16,
              })}
              className="mt-5 w-full max-w-[22rem] [overflow-wrap:break-word] text-sm leading-7 text-[oklch(84%_0.012_78)] sm:max-w-[44rem] sm:text-base md:text-lg"
            >
              KYMCO e Voge, consulenza in showroom, accessori e assistenza in
              officina. Via Festo Porzio 22.
            </motion.p>

            <motion.div
              {...revealMotion(shouldReduceMotion, {
                duration: 0.52,
                scale: 0.99,
                y: 14,
              })}
              className="mt-7 flex min-w-0 w-full max-w-[22rem] flex-col items-stretch gap-3 sm:mt-8 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
            >
              <motion.a
                href="/scooters"
                {...subtleHover(shouldReduceMotion)}
                className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(93%_0.012_78)] px-6 py-3 text-sm font-medium text-[oklch(17%_0.012_40)] shadow-[0_16px_48px_rgba(13,9,7,0.24)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(84%_0.04_72)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(14%_0.012_40)] sm:text-base"
              >
                Confronta la gamma
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </motion.a>

              <motion.a
                href="https://wa.me/393289185029?text=Ciao%2C%20vorrei%20avere%20informazioni%20sugli%20scooter%20disponibili%20da%20Grossi%20Moto."
                target="_blank"
                rel="noopener noreferrer"
                {...subtleHover(shouldReduceMotion)}
                className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(11%_0.012_40/0.78)] px-6 py-3 text-sm font-medium text-[oklch(94%_0.01_80)] shadow-[inset_0_0_0_1px_oklch(94%_0.01_80/0.16)] transition-colors duration-200 hover:bg-[oklch(15%_0.012_40/0.84)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(84%_0.04_72)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(14%_0.012_40)] sm:text-base"
              >
                Parla con un consulente
                <CalendarCheck aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </motion.a>
            </motion.div>
          </div>
        </div>

        <BottomLeftCard cardAriaHidden={cardAriaHidden} cardMotion={cardMotionProps} cardMotionStyle={cardMotionStyle} />
        <BottomRightCorner />
      </div>
    </section>
  );
}
