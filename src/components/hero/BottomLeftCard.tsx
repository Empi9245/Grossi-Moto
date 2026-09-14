"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { subtleHover } from "./motion";
import type { revealMotion } from "./motion";

type BottomLeftCardProps = {
  cardAriaHidden?: boolean;
  cardMotion?: ReturnType<typeof revealMotion>;
  cardMotionStyle?: React.CSSProperties;
};

export function BottomLeftCard({ cardAriaHidden, cardMotion, cardMotionStyle }: BottomLeftCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden={cardAriaHidden}
      style={cardMotionStyle}
      {...cardMotion}
      className="absolute bottom-[calc(5.25rem+env(safe-area-inset-bottom))] left-3 z-20 w-[min(11.5rem,calc(100vw-6.5rem))] rounded-[1.15rem] bg-[oklch(94.5%_0.011_78)] p-3 text-[oklch(17%_0.012_40)] shadow-[0_24px_80px_rgba(17,11,9,0.34)] sm:bottom-[calc(6rem+env(safe-area-inset-bottom))] sm:left-5 sm:w-[13rem] sm:rounded-[1.35rem] sm:p-4 md:bottom-[calc(6.25rem+env(safe-area-inset-bottom))] md:left-7 md:w-[14rem] md:rounded-[1.55rem] md:p-5 lg:bottom-8 lg:left-8 lg:w-[18.25rem] xl:bottom-10 xl:left-10 xl:w-[19.5rem] xl:rounded-[1.65rem] xl:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-numeric text-[2.4rem] leading-[0.82] font-normal tracking-normal sm:text-[3rem] lg:text-[3.8rem] xl:text-[4.45rem]">
          27
        </p>
        <span className="font-ui rounded-full bg-[oklch(23%_0.018_40)] px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-[oklch(91%_0.014_78)] sm:text-[0.62rem]">
          Roma
        </span>
      </div>

      <p className="font-ui mt-2 text-[0.67rem] leading-4 font-semibold uppercase tracking-[0.08em] text-[oklch(24%_0.014_45)] sm:mt-3 sm:text-xs">
        MODELLI KYMCO + VOGE
      </p>

      <div className="my-4 hidden h-px w-full bg-[oklch(24%_0.016_45/0.14)] lg:block" />

      <p className="hidden text-sm leading-6 text-[oklch(35%_0.018_50)] lg:block">
        125cc, ruote alte, GT e maxi scooter.
      </p>

      <motion.a
        href="/scooters"
        {...subtleHover(shouldReduceMotion)}
        className="font-ui mt-5 hidden w-full items-center justify-between gap-3 rounded-full bg-[oklch(18%_0.012_40)] px-4 py-2.5 text-sm font-medium text-[oklch(94%_0.01_80)] transition-colors duration-200 hover:bg-[oklch(24%_0.018_40)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(37%_0.09_28)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--panel)] lg:inline-flex"
      >
        Vedi tutti i modelli
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[oklch(91%_0.014_78)] text-[oklch(17%_0.012_40)]">
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
        </span>
      </motion.a>
    </motion.div>
  );
}
