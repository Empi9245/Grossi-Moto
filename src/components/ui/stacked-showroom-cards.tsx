"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { TransitionLink } from "@/components/transitions/TransitionLink";
import {
  showcaseScooters,
  type ShowcaseScooter,
} from "@/data/showcase-scooters";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sceneEase = "power2.inOut";
const sceneDuration = 1;

function ShowroomScene({
  scooter,
  index,
  active,
}: {
  scooter: ShowcaseScooter;
  index: number;
  active: boolean;
}) {
  const watermarkSide =
    index % 2 === 0 ? "left-[-0.06em] text-left" : "right-[-0.06em] text-right";

  return (
    <article
      data-showroom-scene
      data-source-asset={scooter.sourceAsset}
      aria-hidden={!active}
      inert={!active ? true : undefined}
      className="absolute inset-0 grid grid-rows-[auto_minmax(0,1fr)_auto] px-5 sm:px-7"
      style={{ color: scooter.textTone }}
    >
      <div
        data-showroom-copy
        className="relative z-30 flex items-center justify-between gap-4 pt-[calc(1.25rem+env(safe-area-inset-top))]"
      >
        <div className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: scooter.accentTone }}
          />
          <p
            className="font-ui truncate text-[0.62rem] font-bold uppercase tracking-[0.16em]"
            style={{ color: scooter.mutedTone }}
          >
            {scooter.categoryLabel}
          </p>
        </div>

        <p
          className="font-numeric shrink-0 text-[0.62rem] font-bold tabular-nums tracking-[0.14em]"
          style={{ color: scooter.mutedTone }}
        >
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(showcaseScooters.length).padStart(2, "0")}
        </p>
      </div>

      <div className="relative min-h-0 overflow-hidden">
        <span
          aria-hidden="true"
          className={`font-display pointer-events-none absolute top-[8%] z-0 text-[clamp(6.5rem,31vw,11rem)] font-bold leading-none tracking-[-0.055em] ${watermarkSide}`}
          style={{ color: scooter.watermarkTone }}
        >
          {scooter.watermark}
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            data-showroom-image
            className="relative aspect-[4/3] w-[min(108vw,30rem)] will-change-transform"
          >
            <div
              aria-hidden="true"
              className="absolute left-1/2 bottom-[7%] z-0 rounded-[50%] blur-[12px]"
              style={{
                width: scooter.shadowWidth,
                height: scooter.shadowHeight,
                opacity: scooter.shadowOpacity,
                background: `radial-gradient(ellipse at center, ${scooter.shadowTone} 0%, ${scooter.shadowTone} 42%, transparent 74%)`,
                transform: `translate(calc(-50% + ${scooter.shadowX}), ${scooter.shadowY})`,
              }}
            />

            <div
              className="relative z-10 h-full w-full"
              style={{
                transform: `translate(${scooter.imageOffsetX}, ${scooter.imageOffsetY})`,
              }}
            >
              <Image
                draggable={false}
                src={scooter.image}
                alt={`Scooter ${scooter.name} in vista laterale`}
                width={500}
                height={375}
                priority={index === 0}
                sizes="(max-width: 767px) 108vw, 30rem"
                className="h-full w-full object-contain object-center"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        data-showroom-copy
        className="relative z-30 pb-[calc(1.4rem+env(safe-area-inset-bottom))]"
      >
        <h3 className="font-display max-w-[11ch] text-[clamp(2.65rem,12vw,4.15rem)] font-bold leading-[0.88] tracking-[-0.035em]">
          {scooter.name}
        </h3>

        <p
          className="mt-3 max-w-[34rem] text-[0.92rem] leading-6"
          style={{ color: scooter.mutedTone }}
        >
          {scooter.statement}
        </p>

        <div
          className="mt-4 grid grid-cols-3 overflow-hidden rounded-[1.15rem] border"
          style={{ borderColor: scooter.ruleTone }}
        >
          {scooter.specs.slice(0, 3).map((spec, specIndex) => (
            <div
              key={spec.label}
              className={
                specIndex === 0
                  ? "min-w-0 px-3 py-3"
                  : "min-w-0 border-l px-3 py-3"
              }
              style={
                specIndex === 0
                  ? undefined
                  : { borderColor: scooter.ruleTone }
              }
            >
              <p className="font-display truncate text-[1.15rem] font-bold leading-none">
                {spec.value}
              </p>
              <p
                className="font-ui mt-1.5 truncate text-[0.5rem] font-bold uppercase tracking-[0.1em]"
                style={{ color: scooter.mutedTone }}
              >
                {spec.unit ? `${spec.unit} · ` : ""}
                {spec.label}
              </p>
            </div>
          ))}
        </div>

        <TransitionLink
          href="/scooters"
          scooterId={scooter.id}
          tabIndex={active ? 0 : -1}
          aria-label={`Scopri di più su ${scooter.name}`}
          className="font-ui mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white outline-none transition-transform duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-3"
        >
          Scopri il modello
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4"
            strokeWidth={1.8}
          />
        </TransitionLink>
      </div>
    </article>
  );
}

function ReducedMotionShowroom() {
  return (
    <div
      aria-label="Scooter in showroom"
      className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-3"
    >
      {showcaseScooters.map((scooter, index) => (
        <article
          key={scooter.id}
          className="w-[88vw] max-w-[25rem] shrink-0 snap-center overflow-hidden rounded-[1.75rem] p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
          style={{
            background: scooter.backgroundSurface,
            color: scooter.textTone,
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <p
              className="font-ui text-[0.6rem] font-bold uppercase tracking-[0.15em]"
              style={{ color: scooter.mutedTone }}
            >
              {scooter.categoryLabel}
            </p>
            <p
              className="font-numeric text-[0.6rem] font-bold tabular-nums"
              style={{ color: scooter.mutedTone }}
            >
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(showcaseScooters.length).padStart(2, "0")}
            </p>
          </div>

          <div className="relative mt-3 aspect-[4/3]">
            <span
              aria-hidden="true"
              className="font-display absolute left-0 top-0 text-[clamp(5.5rem,28vw,8rem)] font-bold leading-none"
              style={{ color: scooter.watermarkTone }}
            >
              {scooter.watermark}
            </span>
            <Image
              draggable={false}
              src={scooter.image}
              alt={`Scooter ${scooter.name} in vista laterale`}
              width={500}
              height={375}
              sizes="88vw"
              className="relative z-10 h-full w-full object-contain"
            />
          </div>

          <h3 className="font-display mt-2 text-[2.45rem] font-bold leading-[0.9] tracking-[-0.03em]">
            {scooter.name}
          </h3>
          <p
            className="mt-3 text-sm leading-6"
            style={{ color: scooter.mutedTone }}
          >
            {scooter.statement}
          </p>

          <TransitionLink
            href="/scooters"
            scooterId={scooter.id}
            aria-label={`Scopri di più su ${scooter.name}`}
            className="font-ui mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-3"
          >
            Scopri il modello
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={1.8}
            />
          </TransitionLink>
        </article>
      ))}
    </div>
  );
}

export function StackedShowroomCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const totalScenes = showcaseScooters.length;
  const transitionCount = Math.max(totalScenes - 1, 1);

  useGSAP(
    () => {
      if (shouldReduceMotion) {
        return;
      }

      const container = containerRef.current;
      if (!container || totalScenes < 2) {
        return;
      }

      const scenes = gsap.utils.toArray<HTMLElement>(
        "[data-showroom-scene]",
        container,
      );
      const backdrops = gsap.utils.toArray<HTMLElement>(
        "[data-showroom-backdrop]",
        container,
      );

      if (scenes.length !== totalScenes || backdrops.length !== totalScenes) {
        return;
      }

      backdrops.forEach((backdrop, index) => {
        gsap.set(backdrop, { autoAlpha: index === 0 ? 1 : 0 });
      });

      scenes.forEach((scene, index) => {
        const image = scene.querySelector<HTMLElement>("[data-showroom-image]");
        const copy = scene.querySelectorAll<HTMLElement>("[data-showroom-copy]");

        if (!image || copy.length === 0) {
          return;
        }

        if (index === 0) {
          gsap.set(image, { autoAlpha: 1, xPercent: 0, scale: 1 });
          gsap.set(copy, { autoAlpha: 1, y: 0 });
          return;
        }

        gsap.set(image, {
          autoAlpha: 0,
          xPercent: 30,
          scale: 0.92,
        });
        gsap.set(copy, {
          autoAlpha: 0,
          y: 22,
        });
      });

      const timeline = gsap.timeline({
        defaults: { ease: sceneEase },
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
          snap: {
            snapTo: "labelsDirectional",
            duration: { min: 0.18, max: 0.34 },
            delay: 0.05,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const nextIndex = Math.min(
              totalScenes - 1,
              Math.max(0, Math.round(self.progress * transitionCount)),
            );

            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
        },
      });

      timeline.addLabel("scene-0", 0);

      for (let index = 0; index < totalScenes - 1; index += 1) {
        const position = index * sceneDuration;
        const currentScene = scenes[index];
        const nextScene = scenes[index + 1];
        const currentImage =
          currentScene.querySelector<HTMLElement>("[data-showroom-image]");
        const nextImage =
          nextScene.querySelector<HTMLElement>("[data-showroom-image]");
        const currentCopy =
          currentScene.querySelectorAll<HTMLElement>("[data-showroom-copy]");
        const nextCopy =
          nextScene.querySelectorAll<HTMLElement>("[data-showroom-copy]");

        if (
          !currentImage ||
          !nextImage ||
          currentCopy.length === 0 ||
          nextCopy.length === 0
        ) {
          continue;
        }

        timeline
          .to(
            currentCopy,
            {
              autoAlpha: 0,
              y: -18,
              duration: 0.22,
            },
            position,
          )
          .to(
            currentImage,
            {
              autoAlpha: 0,
              xPercent: -30,
              scale: 0.92,
              duration: 0.58,
            },
            position + 0.04,
          )
          .to(
            backdrops[index + 1],
            {
              autoAlpha: 1,
              duration: 0.78,
            },
            position,
          )
          .to(
            nextImage,
            {
              autoAlpha: 1,
              xPercent: 0,
              scale: 1,
              duration: 0.62,
            },
            position + 0.14,
          )
          .to(
            nextCopy,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.3,
            },
            position + 0.58,
          )
          .to({}, { duration: 0.12 }, position + 0.88)
          .addLabel(`scene-${index + 1}`, position + sceneDuration);
      }

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [shouldReduceMotion, totalScenes, transitionCount],
      revertOnUpdate: true,
    },
  );

  if (shouldReduceMotion) {
    return <ReducedMotionShowroom />;
  }

  return (
    <div
      ref={containerRef}
      aria-label="Scooter in showroom, esperienza a scorrimento"
      className="relative w-full"
      style={{ height: `${Math.max(totalScenes * 95, 380)}svh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden rounded-[2rem] bg-white sm:rounded-[2.5rem]">
        <div aria-hidden="true" className="absolute inset-0">
          {showcaseScooters.map((scooter) => (
            <div
              key={scooter.id}
              data-showroom-backdrop
              className="absolute inset-0"
              style={{ background: scooter.backgroundSurface }}
            />
          ))}
        </div>

        <div className="relative h-full">
          {showcaseScooters.map((scooter, index) => (
            <ShowroomScene
              key={scooter.id}
              scooter={scooter}
              index={index}
              active={index === activeIndex}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 bottom-[calc(0.65rem+env(safe-area-inset-bottom))] z-40 flex gap-1.5"
        >
          {showcaseScooters.map((scooter, index) => (
            <span
              key={scooter.id}
              className="h-[2px] flex-1 rounded-full transition-opacity duration-200"
              style={{
                background: showcaseScooters[activeIndex]?.textTone,
                opacity: index === activeIndex ? 0.72 : 0.16,
              }}
            />
          ))}
        </div>

        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          Modello {activeIndex + 1} di {totalScenes}:{" "}
          {showcaseScooters[activeIndex]?.name}
        </p>
      </div>
    </div>
  );
}
