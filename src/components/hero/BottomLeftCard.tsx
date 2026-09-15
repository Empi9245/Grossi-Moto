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
      className="relative z-20 ml-3 mb-[calc(5.25rem+env(safe-area-inset-bottom))] w-[min(11.5rem,calc(100%-1.5rem))] shrink-0 rounded-[1.15rem] bg-[var(--panel)] p-3 text-[oklch(17%_0.012_40)] shadow-[0_24px_80px_rgba(17,11,9,0.34)] sm:ml-5 sm:mb-[calc(6rem+env(safe-area-inset-bottom))] sm:w-[13rem] sm:rounded-[1.35rem] sm:p-4 md:ml-7 md:w-[14rem] md:rounded-[1.55rem] md:p-5 lg:ml-8 lg:mb-8 xl:ml-10 xl:mb-10 [@media(min-width:80rem)_and_(min-height:54rem)]:w-[19.5rem] [@media(min-width:80rem)_and_(min-height:54rem)]:rounded-[1.65rem]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <p className="font-numeric text-[2.4rem] leading-[0.9] font-normal tracking-normal sm:text-[3rem] [@media(min-width:80rem)_and_(min-height:54rem)]:text-[4.45rem]">
          27
        </p>
        <span className="font-ui hidden rounded-full bg-[oklch(23%_0.018_40)] px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-[oklch(91%_0.014_78)] sm:text-[0.62rem] [@media(min-width:80rem)_and_(min-height:54rem)]:inline-flex">
          Roma
        </span>
      </div>

      <p className="font-ui mt-2 text-[0.67rem] leading-normal font-semibold uppercase tracking-[0.08em] text-[oklch(24%_0.014_45)] sm:mt-3 sm:text-xs">
        modelli KYMCO + Voge
      </p>

      <div className="my-4 hidden h-px w-full bg-[oklch(24%_0.016_45/0.14)] [@media(min-width:80rem)_and_(min-height:54rem)]:block" />

      <p className="hidden text-sm leading-relaxed text-[oklch(35%_0.018_50)] [@media(min-width:80rem)_and_(min-height:54rem)]:block">
        Da 50cc a 900cc
      </p>

      <motion.a
        href="/scooters"
        {...subtleHover(shouldReduceMotion)}
        className="font-ui mt-5 hidden min-h-12 w-full items-center justify-between gap-3 rounded-full bg-[oklch(18%_0.012_40)] px-4 py-2.5 text-sm font-medium text-[oklch(94%_0.01_80)] transition-colors duration-200 hover:bg-[oklch(24%_0.018_40)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(37%_0.09_28)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--panel)] [@media(min-width:80rem)_and_(min-height:54rem)]:inline-flex"
      >
        Vedi tutti i modelli
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[oklch(91%_0.014_78)] text-[oklch(17%_0.012_40)]">
          <ArrowUpRight
            aria-hidden="true"
            className="h-3.5 w-3.5"
            strokeWidth={1.8}
          />
        </span>
      </motion.a>
    </motion.aside>
  );
}
