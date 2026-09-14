"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";

import { revealMotion, subtleHover } from "./motion";
import { useReducedMotion } from "framer-motion";

export function Navbar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <nav className="relative z-20 flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-4 sm:px-6 sm:py-5 lg:flex-nowrap lg:px-8 lg:py-6 xl:px-10 xl:py-7">
      <motion.a
        href="/"
        aria-label="Grossimoto, pagina iniziale"
        {...revealMotion(shouldReduceMotion, {
          duration: 0.48,
          scale: 0.99,
          y: 12,
        })}
        {...subtleHover(shouldReduceMotion)}
        className="inline-flex flex-col items-start"
      >
        <span className="text-base font-semibold leading-5 text-[oklch(95%_0.01_80)] sm:text-lg">
          Grossimoto
        </span>
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[oklch(82%_0.016_78)] sm:text-[0.68rem]">
          Scooter a Roma
        </span>
      </motion.a>

      <div className="hidden items-center gap-6 lg:flex">
        <a
          href="/scooters"
          className="text-sm font-medium text-[oklch(84%_0.012_78)] transition-colors hover:text-[oklch(95%_0.01_80)]"
        >
          Gamma
        </a>
        <a
          href="/servizi"
          className="text-sm font-medium text-[oklch(84%_0.012_78)] transition-colors hover:text-[oklch(95%_0.01_80)]"
        >
          Servizi
        </a>
        <a
          href="/contatti"
          className="text-sm font-medium text-[oklch(84%_0.012_78)] transition-colors hover:text-[oklch(95%_0.01_80)]"
        >
          Contatti
        </a>
      </div>

      <motion.a
        href="tel:+393289185029"
        aria-label="Chiama Grossi Moto"
        {...revealMotion(shouldReduceMotion, {
          duration: 0.48,
          scale: 0.99,
          y: 8,
        })}
        {...subtleHover(shouldReduceMotion)}
        className="font-ui order-2 inline-flex shrink-0 items-center gap-2 rounded-full bg-[oklch(92%_0.014_78)] px-3.5 py-2.5 text-sm font-medium text-[oklch(17%_0.012_40)] shadow-[0_14px_38px_rgba(20,14,11,0.2)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(84%_0.04_72)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(14%_0.012_40)] sm:px-4 lg:order-none"
      >
        <Phone aria-hidden="true" className="h-4 w-4 lg:hidden" strokeWidth={1.8} />
        <span className="hidden sm:inline">Chiama ora</span>
        <span className="sm:hidden">Chiama</span>
      </motion.a>
    </nav>
  );
}
