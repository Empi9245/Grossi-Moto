"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

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
    src: "/kymco-all/sections/category-cover-cat-scooter-1.jpg",
    alt: "Scooter KYMCO con due persone in viaggio su una strada costiera",
  },
  {
    src: "/kymco-all/sections/dtx-360-350-dt-x-dsf8213-a-scaled-dt-x-dsf8213-a-scaled.jpg",
    alt: "KYMCO DTX 360 350 in viaggio su una strada costiera",
  },
  {
    src: "/kymco-all/sections/downtown-350-gt-dsc0456-scaled-dsc0456-scaled.jpg",
    alt: "Dettaglio tecnico nero del KYMCO Downtown 350 GT",
  },
  {
    src: "/kymco-all/sections/people-s-125-abs-0u8a9493-modifica-scaled-0u8a9493-modifica-scaled.jpg",
    alt: "Scooter KYMCO People S 125 ABS vicino a un lago",
  },
  {
    src: "/kymco-all/sections/agility-350-img-5814-scaled-img-5814-scaled.jpg",
    alt: "Dettaglio ruota e freno di uno scooter KYMCO",
  },
  {
    src: "/kymco-all/sections/krv-200-dsc1915-scaled-dsc1915-scaled.jpg",
    alt: "Dettaglio tecnico posteriore del KYMCO KRV 200",
  },
  {
    src: "/kymco-all/sections/skytown-125-dsc2583-b-scaled-dsc2583-b-scaled.jpg",
    alt: "Dettaglio faro e parabrezza del KYMCO Skytown 125",
  },
];

function StaticParallaxFallback({ images }: { images: ParallaxImage[] }) {
  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[oklch(16%_0.014_52)] text-[oklch(96%_0.01_78)]">
      <Image
        src={
          images[0]?.src ??
          "/kymco-all/sections/category-cover-cat-scooter-1.jpg"
        }
        alt={images[0]?.alt ?? "Scooter KYMCO in viaggio"}
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

function ExperienceCopy() {
  return (
    <div className="max-w-[92rem]">
      <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[oklch(86%_0.07_74)]">
        DALLO SHOWROOM ALL&rsquo;OFFICINA
      </p>
      <div className="mt-4 grid max-w-[72rem] gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.55fr)] lg:items-end">
        <h2 className="font-display max-w-[12ch] text-[clamp(3.25rem,8vw,7rem)] font-bold leading-[0.9] tracking-normal text-[oklch(96%_0.01_78)]">
          Un punto di riferimento KYMCO a Roma.
        </h2>
        <p className="max-w-[34rem] text-base leading-7 text-[oklch(93%_0.01_78/0.78)] sm:text-lg">
          Dalla scelta dello scooter alla manutenzione, Grossi Moto accompagna
          ogni fase con consulenza diretta, assistenza e accessori dedicati.
        </p>
      </div>
    </div>
  );
}

export function ZoomParallax({ images = defaultImages }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const parallaxImages = images.slice(0, 7);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const zoomProgress = useTransform(scrollYProgress, [0, 0.74], [0, 1]);

  const scale4 = useTransform(zoomProgress, [0, 1], [1, 4.08]);
  const scale5 = useTransform(zoomProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(zoomProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(zoomProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(zoomProgress, [0, 1], [1, 9]);
  const copyOpacity = useTransform(scrollYProgress, [0.78, 0.9], [0, 1]);
  const copyY = useTransform(scrollYProgress, [0.78, 0.9], [24, 0]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  if (shouldReduceMotion) {
    return <StaticParallaxFallback images={parallaxImages} />;
  }

  return (
    <div
      ref={container}
      className="relative h-[300vh] bg-[oklch(88%_0.015_78)]"
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
              <div className="relative h-[25vh] w-[25vw] overflow-hidden bg-[oklch(18%_0.014_56)] shadow-[0_24px_70px_oklch(18%_0.014_56/0.18)]">
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
          style={{ opacity: copyOpacity, y: copyY }}
          className="pointer-events-none absolute inset-0 z-30 flex items-end px-4 pb-12 will-change-transform sm:px-6 md:px-10 md:pb-16"
        >
          <ExperienceCopy />
        </motion.div>
      </div>
    </div>
  );
}
