"use client";

import { ActionMark } from "@/components/ui/control-glyphs";
import { Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { revealMotion } from "./motion";

export function BottomLeftCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href="https://share.google/vSyE7QS9KoLI6wZOa"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Leggi le recensioni su Google: 4,9 su 5, 230 recensioni. Si apre in una nuova scheda."
      data-qa="bottom-left-card"
      {...revealMotion(shouldReduceMotion, {
        delay: 0.38,
        duration: 0.62,
        scale: 0.96,
        y: 22,
      })}
      className="group relative z-20 ml-3 mb-[calc(5.25rem+env(safe-area-inset-bottom))] w-[min(11.5rem,calc(100%-1.5rem))] shrink-0 rounded-[1.15rem] bg-[var(--panel)] p-3 text-[oklch(17%_0.012_40)] shadow-[0_24px_80px_rgba(17,11,9,0.34)] transition-colors hover:bg-[oklch(96%_0.01_80)] active:bg-[oklch(88%_0.014_78)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--panel)] sm:ml-5 sm:mb-[calc(6rem+env(safe-area-inset-bottom))] sm:w-[13rem] sm:rounded-[1.35rem] sm:p-4 md:ml-7 md:w-[14rem] md:rounded-[1.55rem] md:p-5 lg:ml-8 lg:mb-8 xl:ml-10 xl:mb-10 [@media(min-width:80rem)_and_(min-height:56.25rem)]:w-[19.5rem] [@media(min-width:80rem)_and_(min-height:56.25rem)]:rounded-[1.65rem]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-numeric text-[2.4rem] leading-[0.9] font-normal tracking-normal sm:text-[3rem] [@media(min-width:80rem)_and_(min-height:56.25rem)]:text-[4.45rem]">
          4,9
          <span className="ml-1 text-base text-[oklch(40%_0.018_50)]">/5</span>
        </p>
        <span className="font-ui text-xs font-semibold">Google</span>
      </div>

      <p className="font-ui mt-2 text-[0.67rem] leading-normal font-semibold uppercase tracking-[0.08em] text-[oklch(24%_0.014_45)] sm:mt-3 sm:text-xs">
        230 recensioni
      </p>

      <p className="mt-4 hidden text-sm leading-relaxed text-[oklch(35%_0.018_50)] [@media(min-width:80rem)_and_(min-height:56.25rem)]:block">
        La parola a chi ci ha scelto.
      </p>

      <span className="font-ui mt-4 hidden items-center justify-between gap-3 text-sm font-semibold [@media(min-width:80rem)_and_(min-height:56.25rem)]:flex">
        <span className="inline-flex items-center gap-2">
          <Star aria-hidden="true" className="h-4 w-4" />
          Leggi le recensioni
        </span>
        <ActionMark />
      </span>
      <span className="sr-only">Dati consultati il 16 settembre 2026.</span>
    </motion.a>
  );
}
