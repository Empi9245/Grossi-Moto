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

const stackOffset = 18;
const stackScaleStep = 0.024;
const maxVisibleDepth = 5;

function stackDepth(index: number) {
  return Math.min(index, maxVisibleDepth);
}

function stackScale(depth: number) {
  return 1 - depth * stackScaleStep;
}

function specLine(scooter: ShowcaseScooter) {
  return scooter.specs
    .map((spec) => [spec.value, spec.unit].filter(Boolean).join(" "))
    .join(" · ");
}

function ShowroomCard({
  scooter,
  index,
  active,
  stacked,
}: {
  scooter: ShowcaseScooter;
  index: number;
  active: boolean;
  stacked: boolean;
}) {
  return (
    <article
      className="relative h-full w-full overflow-hidden rounded-[1.5rem] shadow-[0_-10px_36px_rgba(0,0,0,0.14),0_22px_56px_rgba(0,0,0,0.16)]"
      data-source-asset={scooter.sourceAsset}
      style={{ background: scooter.backgroundSurface }}
    >
      <div className="absolute inset-x-0 top-[3%] z-10 aspect-[4/3]">
        <div
          aria-hidden="true"
          className="absolute left-1/2 bottom-[9%] z-0 rounded-[50%] blur-[12px]"
          style={{
            width: scooter.shadowWidth,
            height: scooter.shadowHeight,
            opacity: scooter.shadowOpacity,
            background: `radial-gradient(ellipse at center, ${scooter.shadowTone} 0%, ${scooter.shadowTone} 42%, transparent 74%)`,
            transform: `translate(calc(-50% + ${scooter.shadowX}), ${scooter.shadowY})`,
          }}
        />

        <div
          className="relative z-10 h-full w-full px-2"
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
            sizes="(max-width: 767px) 92vw, 28rem"
            className="h-full w-full object-contain object-center"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[15] bg-[linear-gradient(180deg,transparent_35%,rgba(8,8,8,0.08)_50%,rgba(8,8,8,0.82)_100%)]"
      />

      <div className="absolute inset-x-0 bottom-0 z-20 p-5 text-white sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="font-ui text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/68">
            {scooter.categoryLabel}
          </p>
          {stacked ? (
            <span className="font-numeric text-[0.64rem] font-bold tabular-nums tracking-[0.12em] text-white/55">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
        </div>

        <h3 className="font-display mt-2 text-[clamp(2rem,9vw,3rem)] font-bold leading-[0.94] tracking-normal">
          {scooter.name}
        </h3>

        <p className="font-ui mt-3 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/72">
          {specLine(scooter)}
        </p>

        <p className="mt-3 max-h-12 overflow-hidden text-sm leading-6 text-white/78">
          {scooter.statement}
        </p>

        <TransitionLink
          href="/scooters"
          scooterId={scooter.id}
          tabIndex={active ? 0 : -1}
          aria-label={`Scopri di più su ${scooter.name}`}
          className="font-ui mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-black outline-none transition-transform duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-3 focus-visible:ring-offset-black/60"
        >
          Scopri di più
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
        </TransitionLink>
      </div>
    </article>
  );
}

export function StackedShowroomCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const totalCards = showcaseScooters.length;
  const transitionCount = Math.max(totalCards - 1, 1);

  useGSAP(
    () => {
      if (shouldReduceMotion) return;

      const container = containerRef.current;
      if (!container || totalCards < 2) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-showroom-stack-card]",
        container,
      );

      if (cards.length !== totalCards) return;

      cards.forEach((card, index) => {
        const depth = stackDepth(index);

        gsap.set(card, {
          y: depth * stackOffset,
          scale: stackScale(depth),
          opacity: 1,
          transformOrigin: "center top",
          zIndex: totalCards - index,
        });
      });

      const snapPoints = Array.from(
        { length: totalCards },
        (_, index) => index / transitionCount,
      );

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.62,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => gsap.utils.snap(snapPoints, value),
            duration: { min: 0.2, max: 0.38 },
            delay: 0.05,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const nextIndex = Math.min(
              totalCards - 1,
              Math.max(0, Math.round(self.progress * transitionCount)),
            );

            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
        },
      });

      for (let index = 0; index < totalCards - 1; index += 1) {
        const position = index;

        timeline.to(
          cards[index],
          {
            y: 0,
            yPercent: -122,
            scale: 0.97,
            ease: "power1.inOut",
            duration: 0.84,
          },
          position,
        );

        for (let follower = index + 1; follower < totalCards; follower += 1) {
          const depth = stackDepth(follower - index - 1);

          timeline.to(
            cards[follower],
            {
              y: depth * stackOffset,
              scale: stackScale(depth),
              ease: "power1.inOut",
              duration: 0.84,
            },
            position,
          );
        }

        timeline.to({}, { duration: 0.16 }, position + 0.84);
      }

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [shouldReduceMotion, totalCards, transitionCount],
      revertOnUpdate: true,
    },
  );

  if (shouldReduceMotion) {
    return (
      <div className="space-y-5 px-4" aria-label="Scooter in showroom">
        {showcaseScooters.map((scooter, index) => (
          <div key={scooter.id} className="mx-auto aspect-[3/4] w-full max-w-[24rem]">
            <ShowroomCard
              scooter={scooter}
              index={index}
              active
              stacked={false}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-label="Scooter in showroom, sequenza verticale"
      className="relative w-full"
      style={{ height: `${totalCards * 100 + 50}svh` }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-4 pb-[calc(3.5rem+env(safe-area-inset-bottom))] pt-[calc(5.5rem+env(safe-area-inset-top))]">
        <div className="relative aspect-[3/4] w-full max-w-[24rem]">
          {showcaseScooters.map((scooter, index) => (
            <div
              key={scooter.id}
              data-showroom-stack-card
              aria-hidden={index !== activeIndex}
              inert={index !== activeIndex ? true : undefined}
              className="absolute inset-0 will-change-transform"
              style={{ zIndex: totalCards - index }}
            >
              <ShowroomCard
                scooter={scooter}
                index={index}
                active={index === activeIndex}
                stacked
              />
            </div>
          ))}
        </div>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="font-ui absolute right-5 top-[calc(1.4rem+env(safe-area-inset-top))] z-50 flex items-center gap-2 rounded-full bg-black/78 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm"
        >
          <span className="font-numeric tabular-nums">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="h-px w-4 bg-white/35" />
          <span className="font-numeric tabular-nums text-white/58">
            {String(totalCards).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
