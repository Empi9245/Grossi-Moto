"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { useReducedMotion } from "framer-motion";
import { subtleHover } from "./motion";

export function BottomRightCorner() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      {...subtleHover(shouldReduceMotion)}
      className="absolute bottom-0 right-0 z-20 hidden bg-[oklch(88%_0.015_78)] pl-2.5 pt-2.5 sm:pl-4 sm:pt-4 lg:block"
    >
      <div
        aria-hidden="true"
        className="absolute -left-7 bottom-0 h-7 w-7 sm:-left-8 sm:h-8 sm:w-8"
        style={{
          clipPath:
            "radial-gradient(circle at 0 0, transparent 0, transparent 100%, #0000 0)",
        }}
      />

      <a
        href="https://share.google/ppfR023TdQcVrYya3"
        aria-label="Apri la mappa di showroom e officina"
        target="_blank"
        rel="noreferrer"
        className="group flex max-w-[4.5rem] items-center gap-2.5 rounded-tl-[1.15rem] bg-[oklch(13%_0.012_40/0.94)] px-3 py-3 text-left text-[oklch(94%_0.01_80)] transition-colors duration-200 hover:bg-[oklch(17%_0.014_40/0.96)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(37%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--page-background)] sm:max-w-xs sm:gap-3 sm:rounded-tl-[1.45rem] sm:px-5 sm:py-5"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[oklch(92%_0.014_78)] text-[oklch(17%_0.014_56)] transition-colors duration-200 group-hover:bg-[oklch(96%_0.01_80)] sm:h-11 sm:w-11">
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.8} />
        </span>
        <span className="sr-only min-w-0 sm:not-sr-only">
          <span className="block text-xs font-semibold leading-4 sm:text-base sm:leading-5">
            Showroom e officina
          </span>
          <span className="block text-[0.65rem] text-[oklch(76%_0.012_74)] sm:text-xs">
            Via Festo Porzio, 22
          </span>
        </span>
      </a>
    </motion.div>
  );
}
