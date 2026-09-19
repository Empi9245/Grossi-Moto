"use client";

import { Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { revealMotion, subtleHover } from "./motion";

const navItems = [
  { label: "Gamma", href: "/scooters" },
  { label: "Servizi", href: "/servizi" },
  { label: "Contatti", href: "/contatti" },
];

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
          y: 8,
        })}
        className="font-ui group flex min-w-0 flex-col rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[oklch(84%_0.04_72)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(14%_0.012_40)]"
      >
        <span className="text-sm font-medium tracking-normal text-[oklch(96%_0.008_78)] transition-opacity duration-200 group-hover:opacity-80 sm:text-base xl:text-lg">
          Grossimoto
        </span>
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[oklch(82%_0.016_78)] sm:text-[0.68rem]">
          Moto e scooter a Roma
        </span>
      </motion.a>

      <motion.div
        {...revealMotion(shouldReduceMotion, {
          delay: 0.08,
          duration: 0.5,
          scale: 0.99,
          y: 8,
        })}
        className="font-ui hidden items-center gap-1 rounded-full bg-[oklch(11%_0.01_40/0.72)] p-1 text-sm text-[oklch(88%_0.01_78)] shadow-[inset_0_0_0_1px_oklch(96%_0.008_80/0.1)] lg:flex"
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-full px-4 py-2 transition-colors duration-200 hover:bg-[oklch(92%_0.012_78/0.1)] hover:text-[oklch(97%_0.008_78)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(84%_0.04_72)]"
          >
            {item.label}
          </a>
        ))}
      </motion.div>

      <motion.a
        href="tel:+393289185029"
        {...revealMotion(shouldReduceMotion, {
          delay: 0.14,
          duration: 0.52,
          scale: 0.98,
          y: 8,
        })}
        {...subtleHover(shouldReduceMotion)}
        className="font-ui order-2 inline-flex shrink-0 items-center gap-2 rounded-[0.9rem] bg-[oklch(92%_0.014_78)] px-3.5 py-2.5 text-sm font-medium text-[oklch(17%_0.012_40)] shadow-[0_14px_38px_rgba(20,14,11,0.2)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(84%_0.04_72)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(14%_0.012_40)] sm:px-4 lg:order-none"
      >
        <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
        <span className="hidden sm:inline">Chiama ora</span>
        <span className="sm:hidden">Chiama</span>
        
      </motion.a>
    </nav>
  );
}
