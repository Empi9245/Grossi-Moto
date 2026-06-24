"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { revealMotion, subtleHover } from "./motion";

export function BottomLeftCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.aside
      data-qa="bottom-left-card"
      {...revealMotion(shouldReduceMotion, {
        delay: 0.38,
        duration: 0.62,
        scale: 0.96,
        y: 22,
      })}
      className="absolute bottom-[6.75rem] left-3 z-20 w-[min(16rem,calc(100vw-1.5rem))] rounded-[1.15rem] bg-[var(--panel)] p-3.5 text-[oklch(17%_0.012_40)] shadow-[0_24px_80px_rgba(17,11,9,0.34)] sm:bottom-[7.25rem] sm:left-5 sm:w-[17.25rem] sm:rounded-[1.35rem] sm:p-4 md:bottom-7 md:left-7 md:w-[18.25rem] md:rounded-[1.55rem] md:p-5 lg:bottom-8 lg:left-8 xl:bottom-10 xl:left-10 xl:w-[19.5rem] xl:rounded-[1.65rem] xl:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-numeric text-[3.25rem] leading-[0.82] font-normal tracking-normal sm:text-[3.8rem] xl:text-[4.45rem]">
          21
        </p>
        <span className="font-ui rounded-full bg-[oklch(23%_0.018_40)] px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-[oklch(91%_0.014_78)] sm:text-[0.62rem]">
          Roma
        </span>
      </div>

      <p className="font-ui mt-3 text-[0.72rem] leading-4 font-semibold uppercase tracking-[0.08em] text-[oklch(24%_0.014_45)] sm:text-xs">
        modelli Scooter KYMCO
      </p>

      <div className="my-3 h-px w-full bg-[oklch(24%_0.016_45/0.14)] sm:my-4" />

      <p className="text-xs leading-5 text-[oklch(35%_0.018_50)] sm:text-sm sm:leading-6">
        50cc, 125cc e oltre 300cc
      </p>

      <motion.a
        href="/scooters"
        {...subtleHover(shouldReduceMotion)}
        className="font-ui mt-4 inline-flex w-full items-center justify-between gap-3 rounded-full bg-[oklch(18%_0.012_40)] px-3.5 py-2.5 text-xs font-medium text-[oklch(94%_0.01_80)] transition-colors duration-200 hover:bg-[oklch(24%_0.018_40)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(37%_0.09_28)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--panel)] sm:mt-5 sm:px-4 sm:text-sm"
      >
        Vedi catalogo
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[oklch(91%_0.014_78)] text-[oklch(17%_0.012_40)]">
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
        </span>
      </motion.a>
    </motion.aside>
  );
}
