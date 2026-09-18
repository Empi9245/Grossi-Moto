"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe2, MapPin, PhoneCall } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

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
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileImageScrollProgress } = useScroll({
    target: mobileImageRef,
    offset: ["start start", "end 35%"],
  });
  const mobileImageClipPath = useTransform(
    mobileImageScrollProgress,
    [0, 1],
    [imageOpenClipPath, imageClosedClipPath],
  );
  const mobileImageX = useTransform(
    mobileImageScrollProgress,
    [0, 0.18, 1],
    ["0%", "0%", "80%"],
  );

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
        className="relative flex min-h-[calc(100svh-5.6rem)] w-full flex-col overflow-hidden bg-white text-[#0A0A0A] md:flex-row lg:hidden"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex w-full flex-col justify-between md:w-1/2 md:p-12 lg:w-3/5 lg:p-16 xl:p-20">
          <div className="hidden md:block">
            <motion.main variants={containerVariants}>
              <motion.p
                className="font-ui mb-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-black/48 sm:text-xs"
                variants={itemVariants}
              >
                Assistenza moto e scooter
              </motion.p>

              <motion.h1
                className="font-display max-w-[11ch] text-[clamp(3.3rem,11vw,6.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.045em] text-[#0A0A0A] md:text-[clamp(4.4rem,7vw,7.5rem)] lg:text-[clamp(5.2rem,6vw,8.5rem)]"
                variants={itemVariants}
              >
                Assistenza.
                <br />
                <span className="text-[#C72A09]">Officina.</span>
                <br />
                Esperienza.
              </motion.h1>

              <motion.div
                className="my-7 h-1 w-20 bg-[#C72A09] sm:my-8"
                variants={itemVariants}
              />

              <motion.p
                className="mb-8 max-w-[34rem] text-base font-medium leading-7 text-black/58 sm:text-lg sm:leading-8"
                variants={itemVariants}
              >
                Tagliandi, diagnosi e accessori per moto e scooter KYMCO e Voge.
                Raccontaci cosa ti serve: ti aiutiamo a capire da dove partire.
              </motion.p>

              <motion.div variants={itemVariants}>
                <Link
                  href="/contatti?argomento=officina#richiesta"
                  className="font-ui inline-flex min-h-11 items-center text-sm font-bold uppercase tracking-[0.14em] text-[#C72A09] transition-opacity duration-150 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C72A09]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transition-none sm:text-base"
                >
                  Scrivi all’officina
                </Link>
              </motion.div>
            </motion.main>
          </div>

          <div
            ref={mobileImageRef}
            className="relative min-h-[620px] w-full overflow-hidden md:hidden"
          >
            <motion.div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: reduceMotion ? imageOpenClipPath : mobileImageClipPath,
                x: reduceMotion ? "0%" : mobileImageX,
              }}
            >
              <Image
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/78 via-black/26 to-black/12"
            />

            <motion.main
              className="absolute inset-x-0 bottom-0 z-10 px-8 pb-10 pt-28 text-white sm:px-10 sm:pb-12"
              variants={containerVariants}
            >
              <motion.p
                className="font-ui mb-4 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/68 sm:text-xs"
                variants={itemVariants}
              >
                Assistenza moto e scooter
              </motion.p>

              <motion.h1
                className="font-display max-w-[11ch] text-[clamp(3.3rem,11vw,6.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.045em] text-white"
                variants={itemVariants}
              >
                Assistenza.
                <br />
                <span className="text-[#C72A09]">Officina.</span>
                <br />
                Esperienza.
              </motion.h1>

              <motion.div
                className="my-6 h-1 w-20 bg-[#C72A09]"
                variants={itemVariants}
              />

              <motion.p
                className="mb-7 max-w-[34rem] text-base font-medium leading-7 text-white/78"
                variants={itemVariants}
              >
                Tagliandi, diagnosi e accessori per moto e scooter KYMCO e Voge.
                Raccontaci cosa ti serve: ti aiutiamo a capire da dove partire.
              </motion.p>

              <motion.div variants={itemVariants}>
                <Link
                  href="/contatti?argomento=officina#richiesta"
                  className="font-ui inline-flex min-h-11 items-center text-sm font-bold uppercase tracking-[0.14em] text-white transition-opacity duration-150 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-black/70 motion-reduce:transition-none sm:text-base"
                >
                  Scrivi all’officina
                </Link>
              </motion.div>
            </motion.main>
          </div>

          <motion.footer
            className="mx-8 mt-10 mb-8 sm:mx-10 sm:mb-10 md:mx-0 md:mt-14 md:mb-0 lg:mt-20"
            variants={itemVariants}
          >
            <div className="grid grid-cols-1 gap-5 pt-6 text-xs font-medium text-black/58 sm:grid-cols-3 sm:gap-6">
              <div className="flex min-w-0 items-center">
                <Globe2
                  aria-hidden="true"
                  className="mr-2 h-5 w-5 shrink-0 text-[#C72A09]"
                  strokeWidth={1.8}
                />
                <span className="truncate">grossi-moto.vercel.app</span>
              </div>

              <a
                href="tel:+393289185029"
                className="flex min-w-0 items-center rounded-sm transition-colors duration-150 hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C72A09]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transition-none"
              >
                <PhoneCall
                  aria-hidden="true"
                  className="mr-2 h-5 w-5 shrink-0 text-[#C72A09]"
                  strokeWidth={1.8}
                />
                <span>+39 328 918 5029</span>
              </a>

              <div className="flex min-w-0 items-center">
                <MapPin
                  aria-hidden="true"
                  className="mr-2 h-5 w-5 shrink-0 text-[#C72A09]"
                  strokeWidth={1.8}
                />
                <span>Via Festo Porzio, 22, Roma</span>
              </div>
            </div>
          </motion.footer>
        </div>

        <motion.div
          className="relative hidden min-h-[340px] w-full overflow-hidden md:block md:min-h-full md:w-1/2"
          initial={
            reduceMotion
              ? false
              : {
                  clipPath: imageClosedClipPath,
                }
          }
          animate={{
            clipPath: imageOpenClipPath,
          }}
          transition={{
            duration: reduceMotion ? 0 : 1.2,
            ease: easeOut,
          }}
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
