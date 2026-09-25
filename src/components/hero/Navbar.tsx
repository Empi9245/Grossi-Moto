"use client";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";


import { revealMotion, subtleHover } from "./motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Gamma", href: "/scooters" },
  { label: "Servizi", href: "/servizi" },
  { label: "Contatti", href: "/contatti" },
];

export function Navbar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <nav className="relative z-20 flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-4 sm:px-6 sm:py-5 lg:grid lg:min-h-[5.6rem] lg:grid-cols-[1fr_auto_1fr] lg:px-8 lg:py-3 xl:px-10">
      <motion.a
        href="/"
        aria-label="Grossimoto, pagina iniziale"
        {...revealMotion(shouldReduceMotion, {
          duration: 0.48,
          scale: 0.99,
          y: 8,
        })}
        className="group inline-flex min-w-0 items-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[oklch(84%_0.04_72)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(14%_0.012_40)]"
      >
        <BrandLogo tone="white" priority className="w-[7.5rem] sm:w-[8rem] xl:w-[8.5rem]" />
      </motion.a>

      <motion.div
        {...revealMotion(shouldReduceMotion, {
          delay: 0.08,
          duration: 0.5,
          scale: 0.99,
          y: 8,
        })}
        className="font-ui hidden min-h-11 items-center gap-1 rounded-full bg-[#0A0A0A]/85 p-1 text-sm font-bold text-white/72 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] lg:flex"
      >
        {navItems.map((item) => {
          const current = item.href === "/";

          return (
            <a
              key={item.label}
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={[
                "rounded-full px-6 py-2.5 transition-[background-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none",
                current
                  ? "bg-white text-[#0A0A0A]"
                  : "text-white/72 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              {item.label}
            </a>
          );
        })}
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
        className="font-ui order-2 inline-flex shrink-0 items-center gap-2 rounded-[0.9rem] bg-white px-3.5 py-2.5 text-sm font-medium text-[oklch(17%_0.012_40)] shadow-[0_14px_38px_rgba(20,14,11,0.2)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(84%_0.04_72)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(14%_0.012_40)] sm:px-4 lg:order-none lg:min-h-11 lg:justify-self-end lg:py-2 lg:text-[0.72rem] lg:font-bold lg:uppercase lg:tracking-[0.1em]"
      >
        <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
        <span className="hidden sm:inline">Chiama ora</span>
        <span className="sm:hidden">Chiama</span>
        
      </motion.a>
    </nav>
  );
}
