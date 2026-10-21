"use client";

import { ActionMark } from "@/components/ui/control-glyphs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./services-hero.module.css";
import { MapPin, PhoneCall } from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";


const HERO_IMAGE = {
  src: "/kymco-all/sections/new/hero servizi.jpg",
  alt: "Immagine illustrativa di un meccanico al lavoro su uno scooter",
  // All responsive variants share a source candidate, including while hidden.
  sizes: "(max-width: 767px) 100vw, (min-width: 1280px) 100vw, (orientation: portrait) calc(100vw - 64px), 50vw",
};

const easeOut = [0.22, 1, 0.36, 1] as const;

function roundedHeroClip(width: number, height: number, menuRight: number, menuBottom: number) {
  const radius = Math.min(56, width / 4, height / 4);
  const bottom = Math.max(radius, Math.min(height - radius * 2, menuBottom));
  const joint = Math.min(radius, bottom / 2);
  const right = Math.max(radius + joint, Math.min(width - radius * 2, menuRight));
  const x = (value: number) => value / width;
  const y = (value: number) => value / height;

  return [
    `M ${x(radius)} ${y(bottom)}`,
    `H ${x(right - joint)}`,
    `A ${x(joint)} ${y(joint)} 0 0 0 ${x(right)} ${y(bottom - joint)}`,
    `V ${y(joint)}`,
    `A ${x(joint)} ${y(joint)} 0 0 1 ${x(right + joint)} 0`,
    `H ${x(width - radius)}`,
    `A ${x(radius)} ${y(radius)} 0 0 1 1 ${y(radius)}`,
    `V ${y(height - radius)}`,
    `A ${x(radius)} ${y(radius)} 0 0 1 ${x(width - radius)} 1`,
    `H ${x(radius)}`,
    `A ${x(radius)} ${y(radius)} 0 0 1 0 ${y(height - radius)}`,
    `V ${y(bottom + radius)}`,
    `A ${x(radius)} ${y(radius)} 0 0 1 ${x(radius)} ${y(bottom)} Z`,
  ].join(" ");
}

export function ServicesHero() {
  const reduceMotion = useReducedMotion();
  const desktopFrameRef = useRef<HTMLDivElement>(null);
  const [desktopClip, setDesktopClip] = useState(() => roundedHeroClip(1408, 720, 928, 90));

  useEffect(() => {
    const frame = desktopFrameRef.current;
    const menu = frame?.closest("main")?.querySelector<HTMLElement>("[data-services-menu]");
    const navigation = menu?.closest("nav");
    if (!frame || !menu || !navigation) return;

    // Keep circular 56px corners as the frame and menu resize, rather than stretching percentages.
    const observer = new ResizeObserver(() => {
      const bounds = frame.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      setDesktopClip(roundedHeroClip(
        bounds.width,
        bounds.height,
        menu.getBoundingClientRect().right - bounds.left + 24,
        navigation.getBoundingClientRect().bottom - bounds.top + 8,
      ));
    });
    observer.observe(frame);
    observer.observe(menu);
    observer.observe(navigation);
    return () => observer.disconnect();
  }, []);
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
    <section aria-labelledby="services-hero-title" data-services-hero>
      <h1 id="services-hero-title" className="sr-only">
        Assistenza, officina ed esperienza per moto e scooter a Roma
      </h1>
      <motion.div
        className="relative w-full bg-white text-[#0A0A0A] md:hidden"
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
              sizes={HERO_IMAGE.sizes}
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
              <motion.div
                className="mx-auto flex w-full max-w-[32rem] flex-1 flex-col justify-center px-4 pt-[clamp(0.75rem,2.2svh,1.5rem)] pb-[calc(5.75rem+env(safe-area-inset-bottom))] text-left sm:px-5 [@media(max-height:700px)]:pt-1.5 [@media(max-height:700px)]:pb-[calc(5.25rem+env(safe-area-inset-bottom))]"
                variants={containerVariants}
              >
                <motion.p
                  className="font-ui inline-flex min-h-6 w-fit self-center items-center rounded-full bg-[#A34A3E] px-2.5 py-1 text-[0.56rem] font-bold uppercase tracking-[0.12em] text-white shadow-[0_10px_26px_rgba(74,28,24,0.22)]"
                  variants={itemVariants}
                >
                  OFFICINA · ASSISTENZA · ROMA
                </motion.p>

                <motion.p aria-hidden="true" data-services-title
                  className="font-display font-editorial mt-3 w-full max-w-[20rem] text-[clamp(2.95rem,13.2vw,3.55rem)] font-bold uppercase leading-[0.86] tracking-[-0.045em] text-white [overflow-wrap:normal] [word-break:normal] [@media(max-height:700px)]:mt-2 [@media(max-height:700px)]:text-[2.45rem]"
                  variants={itemVariants}
                >
                  Il tuo mezzo,
                  <br />
                  <span className="text-[#A34A3E]">seguito bene.</span>
                </motion.p>

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
                    className="font-ui inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.9rem] bg-[#A34A3E] px-5 py-2.5 text-[0.78rem] font-bold text-white shadow-[0_14px_38px_rgba(74,28,24,0.28)] transition-[background-color,transform] duration-200 hover:bg-[#8B3A31] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/85 focus-visible:ring-offset-4 focus-visible:ring-offset-black/60 motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    Scrivi all’officina
                    <ActionMark />
                  </Link>
                </motion.div>

                <motion.div
                  className="relative mt-[clamp(1.5rem,4svh,2.75rem)] w-full overflow-hidden rounded-[1.35rem] bg-[#F7F4EF] p-4 text-[#0A0A0A] shadow-[0_20px_56px_rgba(10,10,10,0.18)] [@media(max-height:700px)]:mt-4 [@media(max-height:700px)]:p-3"
                  variants={itemVariants}
                >
                  <span
                    aria-hidden="true"
                    className="font-numeric pointer-events-none absolute -right-1 -top-2 text-[5.75rem] font-bold leading-none tracking-[-0.08em] text-[#A34A3E]/[0.07] [@media(max-height:700px)]:text-[4.8rem]"
                  >
                    01
                  </span>

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-ui text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#A34A3E]">
                        Servizi
                      </p>
                      <p className="font-display mt-1 text-[1.55rem] font-bold uppercase leading-[0.9] tracking-[-0.035em] text-[#0A0A0A] [@media(max-height:700px)]:text-[1.35rem]">
                        Officina in sede.
                      </p>
                    </div>
                    <span className="font-numeric flex h-8 min-w-8 items-center justify-center rounded-full bg-[#0A0A0A] px-2 text-[0.67rem] font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
                      01
                    </span>
                  </div>

                  <div className="relative z-10 mt-4 grid grid-cols-2 gap-2 [@media(max-height:700px)]:mt-3">
                    <div className="rounded-[1rem] bg-white/82 px-3 py-3 shadow-[inset_0_0_0_1px_rgba(10,10,10,0.06),0_8px_22px_rgba(10,10,10,0.05)] [@media(max-height:700px)]:py-2.5">
                      <span className="font-numeric block text-[0.55rem] font-semibold text-[#A34A3E]">01</span>
                      <p className="font-ui mt-1 text-[0.78rem] font-bold leading-tight text-[#0A0A0A]">Tagliandi</p>
                    </div>
                    <div className="rounded-[1rem] bg-white/82 px-3 py-3 shadow-[inset_0_0_0_1px_rgba(10,10,10,0.06),0_8px_22px_rgba(10,10,10,0.05)] [@media(max-height:700px)]:py-2.5">
                      <span className="font-numeric block text-[0.55rem] font-semibold text-[#A34A3E]">02</span>
                      <p className="font-ui mt-1 text-[0.78rem] font-bold leading-tight text-[#0A0A0A]">Diagnosi</p>
                    </div>
                    <div className="col-span-2 flex items-end justify-between gap-3 rounded-[1rem] bg-white/82 px-3 py-3 shadow-[inset_0_0_0_1px_rgba(10,10,10,0.06),0_8px_22px_rgba(10,10,10,0.05)] [@media(max-height:700px)]:py-2.5">
                      <div>
                        <span className="font-numeric block text-[0.55rem] font-semibold text-[#A34A3E]">03</span>
                        <p className="font-ui mt-1 text-[0.78rem] font-bold leading-tight text-[#0A0A0A]">Montaggio accessori</p>
                      </div>
                      <span className="font-ui text-[0.55rem] font-bold uppercase tracking-[0.14em] text-black/42">
                        Moto · Scooter
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 mt-2.5 flex items-center justify-between gap-3 rounded-[1rem] bg-[#0A0A0A] px-3 py-2.5 text-white shadow-[0_10px_24px_rgba(0,0,0,0.14)] [@media(max-height:700px)]:py-2">
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
              </motion.div>
            </div>
          </div>
        </div>

      </motion.div>

      <div className={styles.tablet}>
        <div className={styles.copy}>
          <p aria-hidden="true" data-services-title className={`font-display ${styles.title}`}>
            <span>Assistenza.</span>
            <span className="text-[#A34A3E]">Officina.</span>{" "}
            <span>Esperienza.</span>
          </p>
          <p className={styles.description}>
            Tagliandi, diagnosi e accessori per moto e scooter KYMCO e Voge.
            Raccontaci cosa ti serve: ti aiutiamo a capire da dove partire.
          </p>
          <div className={styles.action}>
            <Link
              href="/contatti?argomento=officina#richiesta"
              className="font-ui inline-flex min-h-12 items-center justify-center gap-3 rounded-[0.9rem] bg-[#A34A3E] px-6 py-3 text-base font-bold text-white transition-colors duration-150 hover:bg-[#8B3A31] active:bg-[#783229] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A34A3E] focus-visible:ring-offset-4 motion-reduce:transition-none"
            >
              Scrivi all’officina
              <ActionMark />
            </Link>
          </div>
        </div>

        <div className={styles.photo}>
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            sizes={HERO_IMAGE.sizes}
          />
        </div>

        <address className={styles.contacts}>
          <a
            href="tel:+393289185029"
            className="rounded-sm hover:text-[#A34A3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A34A3E] focus-visible:ring-offset-4"
          >
            <PhoneCall aria-hidden="true" className="h-5 w-5 shrink-0 text-[#A34A3E]" strokeWidth={1.8} />
            <span>+39 328 918 5029</span>
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Via+Festo+Porzio+22+Roma"
            className="rounded-sm hover:text-[#A34A3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A34A3E] focus-visible:ring-offset-4"
          >
            <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-[#A34A3E]" strokeWidth={1.8} />
            <span>Via Festo Porzio 22, Roma</span>
          </a>
        </address>
      </div>

      <div className="hidden bg-white p-2 xl:block">
        <div ref={desktopFrameRef} className="relative mx-auto max-w-[122rem]">
          <svg
            aria-hidden="true"
            focusable="false"
            className="absolute h-0 w-0"
          >
            <defs>
              <clipPath
                id="services-hero-desktop-clip"
                clipPathUnits="objectBoundingBox"
              >
                <path d={desktopClip} />
              </clipPath>
            </defs>
          </svg>

          <motion.div
            className="relative min-h-[clamp(35rem,80svh,52rem)] overflow-hidden bg-[#F4F4F2] text-[#0A0A0A]"
            style={{ clipPath: "url(#services-hero-desktop-clip)" }}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: easeOut }}
          >
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              priority
              sizes={HERO_IMAGE.sizes}
              className="scale-[1.035] object-cover object-[53%_61%]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(244,244,242,0.70)_0%,rgba(244,244,242,0.50)_48%,rgba(244,244,242,0.18)_100%)]"
            />

            <motion.div
              className="relative z-10 flex min-h-[clamp(35rem,80svh,52rem)] w-full items-center px-10 pb-20 pt-28 xl:px-14 xl:pb-24 xl:pt-32"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease: easeOut }}
            >
              <div className="mx-auto w-full max-w-6xl text-center">
                <motion.p
                  className="font-ui mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#A34A3E]"
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

                <motion.p aria-hidden="true" data-services-title
                  className="font-display mb-7 text-[clamp(5rem,7.4vw,8.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.045em]"
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.6,
                    delay: reduceMotion ? 0 : 0.2,
                    ease: easeOut,
                  }}
                >
                  <span className="text-[#A34A3E]">Assistenza.</span>
                  <br />
                  Officina. Esperienza.
                </motion.p>

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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
