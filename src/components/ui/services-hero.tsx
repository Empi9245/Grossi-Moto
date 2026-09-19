"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe2, MapPin, PhoneCall } from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { Navbar } from "@/components/hero/Navbar";

const HERO_IMAGE = {
  src: "/grossimoto/servizi-hero/agility-s-125-consulenza.jpg",
  alt: "Consulenza scooter Grossimoto con Agility S 125 in contesto urbano",
};

const easeOut = [0.22, 1, 0.36, 1] as const;
const imageOpenClipPath =
  "polygon(19% 0, 17.8% 0.25%, 16.8% 1.2%, 6.5% 82%, 4.8% 88%, 3.4% 92.5%, 2.2% 95.3%, 1.3% 97.2%, 0.6% 98.6%, 0.2% 99.4%, 0% 100%, 100% 100%, 100% 0)";
const imageClosedClipPath =
  "polygon(100% 0, 100% 0.25%, 100% 1.2%, 100% 82%, 100% 88%, 100% 92.5%, 100% 95.3%, 100% 97.2%, 100% 98.6%, 100% 99.4%, 100% 100%, 100% 100%, 100% 0)";

export function ServicesHero() {
  const reduceMotion = useReducedMotion();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.15,
        delayChildren: reduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: reduceMotion ? 0 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.5,
        ease: easeOut,
      },
    },
  };

  return (
    <>
      <motion.section
        className="relative w-full bg-white text-[#0A0A0A] lg:hidden"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={containerVariants}
      >
        <div className="p-2 sm:p-3 md:hidden">
          <div className="relative min-h-[calc(100svh-1rem)] overflow-hidden rounded-[1.35rem] bg-[#171514] text-white sm:min-h-[calc(100svh-1.5rem)] sm:rounded-[1.75rem]">
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(10,10,10,0.72)_0%,rgba(10,10,10,0.35)_36%,rgba(10,10,10,0.72)_100%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-40 bg-[linear-gradient(180deg,rgba(0,0,0,0.46),transparent)]"
            />

            <div className="relative z-10 flex min-h-[calc(100svh-1rem)] flex-col sm:min-h-[calc(100svh-1.5rem)]">
              <Navbar />

              <motion.main
                className="mx-auto flex w-full max-w-[32rem] flex-1 flex-col justify-center px-4 pt-[clamp(0.75rem,2.2svh,1.5rem)] pb-[calc(5.75rem+env(safe-area-inset-bottom))] text-left sm:px-5 [@media(max-height:700px)]:pt-1.5 [@media(max-height:700px)]:pb-[calc(5.25rem+env(safe-area-inset-bottom))]"
                variants={containerVariants}
              >
                <motion.p
                  className="font-ui inline-flex min-h-7 items-center rounded-full bg-[#C72A09] px-3 py-1.5 text-[0.61rem] font-bold uppercase tracking-[0.13em] text-white shadow-[0_12px_34px_rgba(91,13,0,0.3)]"
                  variants={itemVariants}
                >
                  OFFICINA · ASSISTENZA · ROMA
                </motion.p>

                <motion.h1
                  className="font-display mt-3 w-full max-w-[20rem] text-[clamp(2.95rem,13.2vw,3.55rem)] font-bold uppercase leading-[0.86] tracking-[-0.045em] text-white [overflow-wrap:normal] [word-break:normal] [@media(max-height:700px)]:mt-2 [@media(max-height:700px)]:text-[2.45rem]"
                  variants={itemVariants}
                >
                  Il tuo mezzo,
                  <br />
                  <span className="text-[#C72A09]">seguito bene.</span>
                </motion.h1>

                <motion.p
                  className="mt-3 w-full max-w-[21rem] text-[clamp(0.8rem,3.45vw,0.9rem)] font-medium leading-[1.5] text-white/86 [overflow-wrap:break-word] [@media(max-height:700px)]:mt-2 [@media(max-height:700px)]:text-[0.73rem] [@media(max-height:700px)]:leading-[1.42]"
                  variants={itemVariants}
                >
                  Tagliandi, diagnosi e assistenza per moto e scooter KYMCO e Voge.
                  <span className="mt-1 block text-white/68">
                    Ti aiutiamo a capire da dove partire.
                  </span>
                </motion.p>

                <motion.div
                  className="mt-4 [@media(max-height:700px)]:mt-3"
                  variants={itemVariants}
                >
                  <Link
                    href="/contatti?argomento=officina#richiesta"
                    className="font-ui inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#C72A09] px-5 py-2.5 text-[0.78rem] font-bold text-white shadow-[0_14px_38px_rgba(91,13,0,0.34)] transition-[background-color,transform] duration-200 hover:bg-[#B92508] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/85 focus-visible:ring-offset-4 focus-visible:ring-offset-black/60 motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    Scrivi all’officina
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                  </Link>
                </motion.div>

                <motion.div
                  className="relative mt-[clamp(1.5rem,4svh,2.75rem)] w-full overflow-hidden rounded-[1.35rem] bg-[#C72A09] p-4 text-white shadow-[0_20px_56px_rgba(74,10,0,0.38)] [@media(max-height:700px)]:mt-4 [@media(max-height:700px)]:p-3"
                  variants={itemVariants}
                >
                  <span
                    aria-hidden="true"
                    className="font-numeric pointer-events-none absolute -right-1 -top-2 text-[5.75rem] font-bold leading-none tracking-[-0.08em] text-white/[0.09] [@media(max-height:700px)]:text-[4.8rem]"
                  >
                    01
                  </span>

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-ui text-[0.58rem] font-bold uppercase tracking-[0.18em] text-white/70">
                        Servizi
                      </p>
                      <p className="font-display mt-1 text-[1.55rem] font-bold uppercase leading-[0.9] tracking-[-0.035em] [@media(max-height:700px)]:text-[1.35rem]">
                        Officina in sede.
                      </p>
                    </div>
                    <span className="font-numeric flex h-8 min-w-8 items-center justify-center rounded-full bg-[#0A0A0A] px-2 text-[0.67rem] font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                      01
                    </span>
                  </div>

                  <div className="relative z-10 mt-4 grid grid-cols-2 border-y border-white/24 [@media(max-height:700px)]:mt-3">
                    <div className="border-r border-white/24 py-3 pr-3 [@media(max-height:700px)]:py-2.5">
                      <span className="font-numeric block text-[0.55rem] font-semibold text-white/55">01</span>
                      <p className="font-ui mt-1 text-[0.78rem] font-bold leading-tight">Tagliandi</p>
                    </div>
                    <div className="py-3 pl-3 [@media(max-height:700px)]:py-2.5">
                      <span className="font-numeric block text-[0.55rem] font-semibold text-white/55">02</span>
                      <p className="font-ui mt-1 text-[0.78rem] font-bold leading-tight">Diagnosi</p>
                    </div>
                    <div className="col-span-2 flex items-end justify-between gap-3 border-t border-white/24 py-3 [@media(max-height:700px)]:py-2.5">
                      <div>
                        <span className="font-numeric block text-[0.55rem] font-semibold text-white/55">03</span>
                        <p className="font-ui mt-1 text-[0.78rem] font-bold leading-tight">Montaggio accessori</p>
                      </div>
                      <span className="font-ui text-[0.55rem] font-bold uppercase tracking-[0.14em] text-white/58">
                        Moto · Scooter
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 mt-3 flex items-center justify-between gap-3 rounded-[0.9rem] bg-[#0A0A0A]/88 px-3 py-2.5 text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] [@media(max-height:700px)]:mt-2.5 [@media(max-height:700px)]:py-2">
                    <div className="font-ui flex min-w-0 items-center gap-2 text-[0.68rem] font-semibold leading-[1.2]">
                      <MapPin
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0 text-white/78"
                        strokeWidth={1.8}
                      />
                      <span className="truncate">Via Festo Porzio 22</span>
                    </div>
                    <span className="font-ui shrink-0 text-[0.54rem] font-bold uppercase tracking-[0.15em] text-white/48">
                      Roma
                    </span>
                  </div>
                </motion.div>
              </motion.main>
            </div>
          </div>
        </div>

        <div className="hidden min-h-[calc(100svh-5.6rem)] w-full flex-col md:flex md:flex-row">
          <div className="flex w-1/2 flex-col justify-between p-12">
            <motion.main variants={containerVariants}>
              <motion.p className="font-ui mb-5 text-xs font-bold uppercase tracking-[0.18em] text-black/48" variants={itemVariants}>
                Assistenza moto e scooter
              </motion.p>

              <motion.h1 className="font-display max-w-[11ch] text-[clamp(4.4rem,7vw,7.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.045em] text-[#0A0A0A]" variants={itemVariants}>
                Assistenza.
                <br />
                <span className="text-[#C72A09]">Officina.</span>
                <br />
                Esperienza.
              </motion.h1>

              <motion.div className="my-8 h-1 w-20 bg-[#C72A09]" variants={itemVariants} />

              <motion.p className="mb-8 max-w-[34rem] text-lg font-medium leading-8 text-black/58" variants={itemVariants}>
                Tagliandi, diagnosi e accessori per moto e scooter KYMCO e Voge.
                Raccontaci cosa ti serve: ti aiutiamo a capire da dove partire.
              </motion.p>

              <motion.div variants={itemVariants}>
                <Link
                  href="/contatti?argomento=officina#richiesta"
                  className="font-ui inline-flex min-h-11 items-center text-base font-bold uppercase tracking-[0.14em] text-[#C72A09] transition-opacity duration-150 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C72A09]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transition-none"
                >
                  Scrivi all’officina
                </Link>
              </motion.div>
            </motion.main>

            <motion.footer className="mt-14 mb-0" variants={itemVariants}>
              <div className="grid grid-cols-1 gap-5 pt-6 text-xs font-medium text-black/58 sm:grid-cols-3 sm:gap-6">
                <div className="flex min-w-0 items-center">
                  <Globe2 aria-hidden="true" className="mr-2 h-5 w-5 shrink-0 text-[#C72A09]" strokeWidth={1.8} />
                  <span className="truncate">grossi-moto.vercel.app</span>
                </div>

                <a
                  href="tel:+393289185029"
                  className="flex min-w-0 items-center rounded-sm transition-colors duration-150 hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C72A09]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transition-none"
                >
                  <PhoneCall aria-hidden="true" className="mr-2 h-5 w-5 shrink-0 text-[#C72A09]" strokeWidth={1.8} />
                  <span>+39 328 918 5029</span>
                </a>

                <div className="flex min-w-0 items-center">
                  <MapPin aria-hidden="true" className="mr-2 h-5 w-5 shrink-0 text-[#C72A09]" strokeWidth={1.8} />
                  <span>Via Festo Porzio, 22, Roma</span>
                </div>
              </div>
            </motion.footer>
          </div>

          <motion.div
            className="relative min-h-full w-1/2 overflow-hidden"
            initial={reduceMotion ? false : { clipPath: imageClosedClipPath }}
            animate={{ clipPath: imageOpenClipPath }}
            transition={{ duration: reduceMotion ? 0 : 1.2, ease: easeOut }}
          >
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              priority
              sizes="50vw"
              className="object-cover object-center"
            />
          </motion.div>
        </div>
      </motion.section>

      <section className="hidden bg-white px-2 pb-2 lg:block">
        <motion.div
          className="relative mx-auto min-h-[clamp(35rem,80svh,52rem)] max-w-[122rem] overflow-hidden rounded-[22px] bg-[#F4F4F2] text-[#0A0A0A]"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: easeOut }}
        >
          <motion.section
            className="flex min-h-[clamp(35rem,80svh,52rem)] w-full items-center px-10 pb-20 pt-28 xl:px-14 xl:pb-24 xl:pt-32"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: easeOut }}
          >
            <div className="mx-auto w-full max-w-6xl text-center">
              <motion.p
                className="font-ui mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#C72A09]"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.6,
                  delay: reduceMotion ? 0 : 0.1,
                  ease: easeOut,
                }}
              >
                Assistenza moto e scooter
              </motion.p>

              <motion.h1
                className="font-display mb-7 text-[clamp(5rem,7.4vw,8.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.045em]"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.6,
                  delay: reduceMotion ? 0 : 0.2,
                  ease: easeOut,
                }}
              >
                <span className="text-[#C72A09]">Assistenza.</span>
                <br />
                Officina. Esperienza.
              </motion.h1>

              <motion.p
                className="mx-auto max-w-2xl text-lg leading-relaxed text-black/58 xl:text-xl"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.6,
                  delay: reduceMotion ? 0 : 0.4,
                  ease: easeOut,
                }}
              >
                Tagliandi, diagnosi e accessori per moto e scooter KYMCO e Voge.
                Raccontaci cosa ti serve: ti aiutiamo a capire da dove partire.
              </motion.p>
            </div>
          </motion.section>

          <div className="absolute right-4 top-4 z-20 flex items-center justify-end xl:right-5 xl:top-5">
            <a
              href="tel:+393289185029"
              className="font-ui group inline-flex min-h-12 items-center gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-sm font-bold text-[#0A0A0A] shadow-lg shadow-black/[0.08] transition-[background-color,color,transform] duration-200 hover:bg-[#0A0A0A] hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F4F4F2] motion-reduce:transform-none motion-reduce:transition-none"
            >
              Chiama ora
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0A0A0A] text-white transition-[background-color,color,transform] duration-200 group-hover:scale-105 group-hover:bg-white group-hover:text-[#0A0A0A] motion-reduce:transform-none motion-reduce:transition-none">
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.9}
                />
              </span>
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
