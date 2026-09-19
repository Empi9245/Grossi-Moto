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
                className="mx-auto flex w-full max-w-[32rem] flex-1 flex-col items-start px-4 pt-[clamp(0.5rem,1.8svh,1.25rem)] pb-[calc(5.75rem+env(safe-area-inset-bottom))] text-left sm:px-5 [@media(max-height:700px)]:pt-1.5 [@media(max-height:700px)]:pb-[calc(5.25rem+env(safe-area-inset-bottom))]"
                variants={containerVariants}
              >
                <motion.p
                  className="font-ui inline-flex min-h-7 items-center rounded-full bg-[oklch(94%_0.012_78/0.96)] px-3 py-1.5 text-[0.61rem] font-semibold uppercase tracking-[0.13em] text-[oklch(18%_0.014_42)] shadow-[0_10px_30px_rgba(20,14,11,0.16)]"
                  variants={itemVariants}
                >
                  OFFICINA · ASSISTENZA · ROMA
                </motion.p>

                <motion.h1
                  className="font-display mt-3 w-full max-w-[18.5rem] text-[clamp(2.75rem,12.5vw,3.35rem)] font-normal leading-[0.96] tracking-normal text-white [overflow-wrap:normal] [word-break:normal] [@media(max-height:700px)]:mt-2 [@media(max-height:700px)]:text-[2.5rem]"
                  variants={itemVariants}
                >
                  Il tuo mezzo,
                  <br />
                  seguito bene.
                </motion.h1>

                <motion.p
                  className="mt-3 w-full max-w-[20rem] text-[clamp(0.78rem,3.35vw,0.875rem)] leading-[1.55] text-white/82 [overflow-wrap:break-word] [@media(max-height:700px)]:mt-2 [@media(max-height:700px)]:text-[0.74rem] [@media(max-height:700px)]:leading-[1.45]"
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
                    className="font-ui inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[oklch(94%_0.012_78)] px-5 py-2.5 text-[0.78rem] font-medium text-[oklch(17%_0.012_40)] shadow-[0_14px_40px_rgba(13,9,7,0.22)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black/60 motion-reduce:transition-none"
                  >
                    Scrivi all’officina
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                  </Link>
                </motion.div>

                <motion.div
                  className="mt-auto flex w-full items-end justify-between gap-2 pt-4 [@media(max-height:700px)]:pt-2"
                  variants={itemVariants}
                >
                  <div className="relative w-[9.5rem] rounded-[1rem] bg-[oklch(94%_0.012_78/0.97)] p-3 text-[oklch(18%_0.014_42)] shadow-[0_18px_50px_rgba(13,9,7,0.24)] min-[375px]:w-[10.25rem] [@media(max-height:700px)]:p-2.5">
                    <span className="font-numeric absolute right-3 top-2.5 text-[0.65rem] font-semibold text-[#C72A09] [@media(max-height:700px)]:right-2.5 [@media(max-height:700px)]:top-2">
                      01
                    </span>
                    <p className="font-ui pr-7 text-[0.61rem] font-bold uppercase tracking-[0.12em] text-[oklch(25%_0.016_45)]">
                      Officina in sede
                    </p>
                    <div className="mt-2.5 space-y-1 text-[0.69rem] font-medium leading-[1.3] text-[oklch(29%_0.016_48)] [@media(max-height:700px)]:mt-2 [@media(max-height:700px)]:text-[0.65rem]">
                      <p>Tagliandi</p>
                      <p>Diagnosi</p>
                      <p>Montaggio accessori</p>
                    </div>
                  </div>

                  <div className="font-ui flex max-w-[7.25rem] items-center gap-1.5 rounded-full bg-black/58 px-2.5 py-2 text-[0.61rem] font-medium leading-[1.25] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)] backdrop-blur-sm min-[375px]:max-w-[8.25rem] min-[375px]:px-3">
                    <MapPin
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 text-white/88"
                      strokeWidth={1.8}
                    />
                    <span>Via Festo Porzio 22</span>
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
