"use client";

import Image from "next/image";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const HERO_IMAGE = {
  src: "/grossimoto/servizi-hero/agility-s-125-consulenza.jpg",
  alt: "Consulenza scooter Grossimoto con Agility S 125 in contesto urbano",
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export function ServicesHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white px-2 pb-10 sm:px-4 sm:pb-14 lg:px-5 lg:pb-20">
      <div className="relative isolate min-h-[calc(100svh-6rem)] overflow-hidden rounded-[32px] bg-[#0A0A0A] text-white sm:rounded-[40px] lg:min-h-[calc(100svh-7rem)] lg:rounded-[56px]">
        <motion.div
          className="absolute inset-0 z-0"
          initial={reduceMotion ? false : { opacity: 0.82, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.72, ease: easeOut }}
        >
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[63%_center] lg:object-center"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.88)_38%,rgba(10,10,10,0.28)_70%,rgba(10,10,10,0.18)_100%),linear-gradient(180deg,rgba(10,10,10,0.16)_0%,rgba(10,10,10,0.1)_55%,rgba(10,10,10,0.74)_100%)] lg:bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.9)_34%,rgba(10,10,10,0.24)_66%,rgba(10,10,10,0.12)_100%),linear-gradient(180deg,rgba(10,10,10,0.08)_0%,rgba(10,10,10,0.08)_60%,rgba(10,10,10,0.62)_100%)]"
        />

        <div className="relative z-10 flex min-h-[calc(100svh-6rem)] flex-col justify-between px-5 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-8 sm:px-7 sm:pb-[calc(7.5rem+env(safe-area-inset-bottom))] sm:pt-10 md:px-10 lg:min-h-[calc(100svh-7rem)] lg:px-14 lg:pb-12 lg:pt-14 xl:px-16">
          <motion.p
            className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/64 sm:text-xs"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.46, ease: easeOut }}
          >
            Assistenza moto e scooter
          </motion.p>

          <motion.div
            className="my-auto py-12 sm:py-16 lg:py-20"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.68,
              delay: reduceMotion ? 0 : 0.08,
              ease: easeOut,
            }}
          >
            <h1 className="font-display max-w-[10ch] text-[clamp(3.4rem,15vw,6rem)] font-bold uppercase leading-[0.82] tracking-[-0.045em] sm:text-[clamp(5rem,12vw,8rem)] lg:text-[clamp(7rem,10vw,12.5rem)]">
              Assistenza.
              <br />
              <span className="text-[#C72A09]">Officina.</span>
              <br />
              Esperienza.
            </h1>
          </motion.div>

          <motion.div
            className="grid gap-7 border-t border-white/22 pt-6 lg:grid-cols-[minmax(0,34rem)_auto] lg:items-end lg:justify-between lg:gap-12 lg:pt-8"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.54,
              delay: reduceMotion ? 0 : 0.18,
              ease: easeOut,
            }}
          >
            <p className="max-w-[34rem] text-base font-medium leading-7 text-white/76 sm:text-lg sm:leading-8">
              Tagliandi, diagnosi e accessori per moto e scooter KYMCO e Voge. Raccontaci cosa ti serve: ti aiutiamo a capire da dove partire.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="tel:+393289185029"
                className="font-ui group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#0A0A0A] transition-[opacity,transform] duration-150 hover:opacity-[0.88] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0A0A] motion-reduce:transform-none motion-reduce:transition-none"
              >
                Chiama l’officina
                <PhoneCall aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </a>
              <a
                href="/contatti?argomento=officina#richiesta"
                className="font-ui group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/32 bg-black/16 px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-[background-color,transform] duration-150 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0A0A] motion-reduce:transform-none motion-reduce:transition-none"
              >
                Scrivi all’officina
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                  strokeWidth={1.8}
                />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
