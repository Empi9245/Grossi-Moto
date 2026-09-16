"use client";

import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

type ParallaxImage = {
  src: string;
  alt?: string;
};

type ZoomParallaxProps = {
  /** Array of images to be displayed in the parallax effect, max 7 images. */
  images?: ParallaxImage[];
};

const defaultImages: ParallaxImage[] = [
  {
    src: "/grossimoto/home-scroll/01-people-s-125-abs-lago.jpg",
    alt: "People S 125 ABS in un contesto aperto",
  },
  {
    src: "/grossimoto/home-scroll/02-dtx-360-strada.jpg",
    alt: "DTX 360 350 in movimento su strada",
  },
  {
    src: "/grossimoto/home-scroll/03-agility-125-esterno.jpg",
    alt: "Agility 125 R16 in esterno urbano",
  },
  {
    src: "/grossimoto/home-scroll/04-people-s-125-abs-dettaglio.jpg",
    alt: "Dettaglio People S 125 ABS",
  },
  {
    src: "/grossimoto/home-scroll/05-dtx-360-dettaglio.jpg",
    alt: "Dettaglio DTX 360 350",
  },
  {
    src: "/grossimoto/home-scroll/06-agility-125-urbano.jpg",
    alt: "Agility 125 R16 in scenario cittadino",
  },
  {
    src: "/grossimoto/home-scroll/07-people-s-125-abs-faro.jpg",
    alt: "Dettaglio frontale People S 125 ABS",
  },
];

function StaticParallaxFallback({ images }: { images: ParallaxImage[] }) {
  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[oklch(16%_0.014_52)] text-[oklch(96%_0.01_78)]">
      <Image
        src={
          images[0]?.src ??
          "/grossimoto/home-scroll/01-people-s-125-abs-lago.jpg"
        }
        alt={images[0]?.alt ?? "Scooter in viaggio"}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,oklch(10%_0.014_42/0.74),oklch(10%_0.014_42/0.18)_62%,oklch(10%_0.014_42/0.34))]"
      />
      <div className="relative z-10 flex min-h-[100svh] items-end px-4 pb-12 sm:px-6 md:px-10 md:pb-16">
        <ExperienceCopy />
      </div>
    </div>
  );
}

const story = [
  {
    title: "Le tue strade. La tua scelta.",
    detail: "Partiamo dai tuoi tragitti. Confrontiamo insieme posizione di guida, spazio e modelli KYMCO e Voge.",
  },
  {
    title: "Un riferimento. Anche dopo.",
    detail: "La consegna è un inizio. Per tagliandi, assistenza e accessori, ritrovi Grossi Moto e la sua officina.",
  },
  {
    title: "Parliamone. Di persona.",
    detail: "Un modello in mente o ancora qualche dubbio? Ti aspettiamo in Via Festo Porzio 22, a Roma.",
  },
];

function ExperienceCopy() {
  return (
    <div className="max-w-3xl space-y-12 py-12 drop-shadow-[0_3px_20px_rgba(0,0,0,0.65)]">
      <p className="font-ui text-xs font-bold uppercase tracking-[0.18em]">Dallo showroom all’officina</p>
      {story.map(({ title, detail }, index) => (
        <div key={title}>
          {index === 0 ? (
            <h2 className="font-display text-[clamp(3rem,8vw,5rem)] font-bold leading-[0.95]">{title}</h2>
          ) : (
            <h3 className="font-display text-[clamp(2.5rem,7vw,4rem)] font-bold leading-[0.95]">{title}</h3>
          )}
          <p className="mt-5 max-w-xl text-base leading-7 text-white/85">{detail}</p>
        </div>
      ))}
    </div>
  );
}

function ExperienceContact() {
  return (
    <div className="relative bg-[oklch(16%_0.014_52)] px-5 py-12 text-center text-white sm:py-16">
      <p className="font-ui text-sm">Il prossimo passo? Raccontaci cosa cerchi.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <a href="tel:+393289185029" className="font-ui inline-flex min-h-12 items-center justify-center rounded-full bg-[#ece8e1] px-7 py-3 text-sm font-bold text-[#1b0e0d] transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Chiama Grossi Moto</a>
        <Link href="/contatti#richiesta" className="font-ui inline-flex min-h-12 items-center justify-center rounded-full border border-white/50 px-7 py-3 text-sm font-bold transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Scrivici cosa cerchi</Link>
      </div>
    </div>
  );
}

function CinematicCredits({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0.20, 0.84], ["100svh", "-125svh"]);
  return (
    <div className="pointer-events-none absolute inset-0 z-30 [perspective:1400px]">
      <motion.div style={{ y }} className="absolute inset-x-0 top-0">
        <div className="origin-center [transform:rotateX(8deg)]">
          {story.map(({ title, detail }, index) => (
            <div key={title} className="flex h-[70svh] flex-col items-center justify-center px-10 text-center text-[#f4f0e8] [text-shadow:0_4px_28px_rgba(0,0,0,0.45)]">
              {index === 0 && <p className="font-ui mb-7 text-xs font-bold uppercase tracking-[0.24em]">Dallo showroom all’officina</p>}
              {index === 0 ? (
                <h2 className="font-display max-w-[14ch] text-[clamp(4rem,8.5vw,10rem)] font-bold leading-[0.94] tracking-[-0.035em]">{title}</h2>
              ) : (
                <h3 className="font-display max-w-[14ch] text-[clamp(4rem,8.5vw,10rem)] font-bold leading-[0.94] tracking-[-0.035em]">{title}</h3>
              )}
              <p className="mt-7 max-w-[38rem] text-[clamp(1rem,1.5vw,1.35rem)] leading-relaxed text-white/85">{detail}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function ZoomParallax({ images = defaultImages }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDesktopViewport = useMediaQuery("(min-width: 1024px)");
  const parallaxImages = images.slice(0, 7);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  // Preserve the original 86svh zoom distance; reserve the rest for the credits.
  const zoomProgress = useTransform(scrollYProgress, [0, 0.172], [0, 1]);

  const scale4 = useTransform(zoomProgress, [0, 1], [1, 4.08]);
  const scale5 = useTransform(zoomProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(zoomProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(zoomProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(zoomProgress, [0, 1], [1, 9]);
  const copyScrimOpacity = useTransform(scrollYProgress, [0.172, 0.25], [0, 0.9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  if (shouldReduceMotion || !isDesktopViewport) {
    return <><StaticParallaxFallback images={parallaxImages} /><ExperienceContact /></>;
  }

  return (
    <>
    <div
      ref={container}
      className="relative h-[600svh] bg-[oklch(88%_0.015_78)]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {parallaxImages.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={src}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${
                index === 0 ? "z-20" : "z-10"
              } ${
                index === 1
                  ? "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]"
                  : ""
              } ${
                index === 2
                  ? "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]"
                  : ""
              } ${
                index === 3
                  ? "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]"
                  : ""
              } ${
                index === 4
                  ? "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]"
                  : ""
              } ${
                index === 5
                  ? "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]"
                  : ""
              } ${
                index === 6
                  ? "[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]"
                  : ""
              }`}
            >
              <div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-[1.25rem] bg-[oklch(18%_0.014_56)] shadow-[0_24px_70px_oklch(18%_0.014_56/0.18)]">
                <Image
                  src={src}
                  alt={alt ?? `Parallax image ${index + 1}`}
                  fill
                  sizes={index === 0 ? "100vw" : "50vw"}
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,oklch(10%_0.014_42/0.02),oklch(10%_0.014_42/0.18))]"
                />
              </div>
            </motion.div>
          );
        })}

        <motion.div
          aria-hidden="true"
          style={{ opacity: copyScrimOpacity }}
          className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(105deg,oklch(8%_0.012_42/0.84),oklch(8%_0.012_42/0.58)_56%,oklch(8%_0.012_42/0.42))] will-change-opacity"
        />

        <CinematicCredits progress={scrollYProgress} />
      </div>
    </div>
    <ExperienceContact />
    </>
  );
}
