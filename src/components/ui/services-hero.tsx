"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe2, MapPin, PhoneCall } from "lucide-react";
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
  "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)";
const imageClosedClipPath =
  "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";

export function ServicesHero() {
  const reduceMotion = useReducedMotion();
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileImageScrollProgress } = useScroll({
    target: mobileImageRef,
    offset: ["start 70%", "end 20%"],
  });
  const mobileImageClipPath = useTransform(
    mobileImageScrollProgress,
    [0, 1],
    [imageOpenClipPath, imageClosedClipPath],
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
    <motion.section
      className="relative flex min-h-[calc(100svh-5.6rem)] w-full flex-col overflow-hidden bg-white text-[#0A0A0A] md:flex-row"
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex w-full flex-col justify-between p-8 sm:p-10 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16 xl:p-20">
        <div>
          <motion.header className="mb-12 lg:mb-16" variants={itemVariants}>
            <div className="flex items-center">
              <div>
                <p className="font-ui text-lg font-bold leading-none text-[#0A0A0A] sm:text-xl">
                  Grossimoto
                </p>
                <p className="font-ui mt-1 text-[0.62rem] font-bold uppercase tracking-[0.17em] text-black/46">
                  Moto e scooter a Roma
                </p>
              </div>
            </div>
          </motion.header>

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

          <motion.div
            ref={mobileImageRef}
            className="relative -mx-8 mt-10 min-h-[340px] overflow-hidden sm:-mx-10 md:hidden"
            style={{
              clipPath: reduceMotion
                ? imageOpenClipPath
                : mobileImageClipPath,
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
        </div>

        <motion.footer className="mt-14 w-full lg:mt-20" variants={itemVariants}>
          <div className="grid grid-cols-1 gap-5 border-t border-black/12 pt-6 text-xs font-medium text-black/58 sm:grid-cols-3 sm:gap-6">
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
        className="relative hidden min-h-[340px] w-full overflow-hidden md:block md:min-h-full md:w-1/2 lg:w-2/5"
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
          sizes="(min-width: 1024px) 40vw, 50vw"
          className="object-cover object-center"
        />
      </motion.div>
    </motion.section>
  );
}
