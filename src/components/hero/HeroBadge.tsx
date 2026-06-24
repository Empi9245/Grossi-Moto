"use client";

import { MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { revealMotion } from "./motion";

export function HeroBadge() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      {...revealMotion(shouldReduceMotion, {
        duration: 0.5,
        scale: 0.98,
        y: 10,
      })}
      className="font-ui inline-flex items-center gap-2 rounded-full bg-[oklch(91%_0.014_78)] px-4 py-2 text-xs font-medium text-[oklch(19%_0.014_42)] shadow-[0_12px_36px_rgba(20,14,11,0.18)] sm:text-sm"
    >
      <MapPin aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
      <span>Dealer KYMCO autorizzato a Roma</span>
    </motion.div>
  );
}
