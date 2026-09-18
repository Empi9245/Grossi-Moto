"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, PhoneCall } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

export type Service = {
  title: string;
  statement: string;
  description: string;
  features: string[];
  image: string;
  alt: string;
};

gsap.registerPlugin(useGSAP);

const stackOffset = 18;
const stackScaleStep = 0.024;
const stackShadeStep = 0.055;
const maxVisibleDepth = 5;
const mobileSwipeThreshold = 36;

function stackLayer(slot: number) {
  if (slot <= 0) return 0;
  return Math.min(Math.ceil(slot / 2), maxVisibleDepth);
}

function stackX(slot: number) {
  if (slot <= 0) return 0;

  const side = slot % 2 === 1 ? 1 : -1;
  return side * stackLayer(slot) * stackOffset;
}

function stackScale(layer: number) {
  return 1 - layer * stackScaleStep;
}

function stackShade(layer: number) {
  return Math.min(layer * stackShadeStep, 0.28);
}

export function ServiceSwipe({ services }: { services: Service[] }) {
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const swipeStartRef = useRef<{
    x: number;
    y: number;
    pointerId: number;
  } | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const isTabletViewport = useMediaQuery("(min-width: 768px)");
  const isMobileViewport = !isTabletViewport;
  const shouldReduceMotion = useReducedMotion();
  const totalCards = services.length;
  const transitionCount = Math.max(totalCards - 1, 1);
  const useMobileStack = isMobileViewport && !shouldReduceMotion;

  useGSAP(
    () => {
      if (!useMobileStack) return;

      const container = stackContainerRef.current;
      const rail = railRef.current;
      if (!container || !rail || totalCards < 2) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-service-stack-card]",
        container,
      );
      const shades = cards.map((card) =>
        card.querySelector<HTMLElement>("[data-service-depth-shade]"),
      );

      if (cards.length !== totalCards || shades.some((shade) => !shade)) return;

      cards.forEach((card, index) => {
        const layer = stackLayer(index);

        gsap.set(card, {
          x: stackX(index),
          xPercent: 0,
          scale: stackScale(layer),
          opacity: 1,
          transformOrigin: "center center",
          zIndex: totalCards - layer,
        });

        gsap.set(shades[index], {
          opacity: stackShade(layer),
        });
      });

      const timeline = gsap.timeline({ paused: true });

      for (let index = 0; index < totalCards - 1; index += 1) {
        const position = index;

        timeline.to(
          cards[index],
          {
            x: 0,
            xPercent: -122,
            scale: 0.97,
            ease: "power1.inOut",
            duration: 0.84,
          },
          position,
        );

        for (let follower = index + 1; follower < totalCards; follower += 1) {
          const slot = follower - index - 1;
          const layer = stackLayer(slot);

          timeline.to(
            cards[follower],
            {
              x: stackX(slot),
              xPercent: 0,
              scale: stackScale(layer),
              zIndex: totalCards - layer,
              ease: "power1.inOut",
              duration: 0.84,
            },
            position,
          );

          timeline.to(
            shades[follower]!,
            {
              opacity: stackShade(layer),
              ease: "power1.inOut",
              duration: 0.84,
            },
            position,
          );
        }

        const recycledSlot = totalCards - index - 1;
        const recycledLayer = stackLayer(recycledSlot);

        timeline.set(
          cards[index],
          {
            x: stackX(recycledSlot),
            xPercent: 122,
            scale: stackScale(recycledLayer),
            zIndex: totalCards - recycledLayer,
          },
          position + 0.84,
        );

        timeline.set(
          shades[index]!,
          {
            opacity: stackShade(recycledLayer),
          },
          position + 0.84,
        );

        timeline.to(
          cards[index],
          {
            xPercent: 0,
            ease: "power1.inOut",
            duration: 0.16,
          },
          position + 0.84,
        );
      }

      let frame = 0;

      const syncToHorizontalScroll = () => {
        frame = 0;
        const maxScroll = Math.max(1, rail.scrollWidth - rail.clientWidth);
        const progress = gsap.utils.clamp(0, 1, rail.scrollLeft / maxScroll);

        timeline.progress(progress);

        const nextIndex = Math.min(
          totalCards - 1,
          Math.max(0, Math.round(progress * transitionCount)),
        );

        if (nextIndex !== activeRef.current) {
          activeRef.current = nextIndex;
          setActive(nextIndex);
        }
      };

      const scheduleSync = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(syncToHorizontalScroll);
      };

      const observer = new ResizeObserver(scheduleSync);
      observer.observe(rail);
      rail.addEventListener("scroll", scheduleSync, { passive: true });
      scheduleSync();

      return () => {
        if (frame) cancelAnimationFrame(frame);
        observer.disconnect();
        rail.removeEventListener("scroll", scheduleSync);
        timeline.kill();
      };
    },
    {
      scope: stackContainerRef,
      dependencies: [
        shouldReduceMotion,
        totalCards,
        transitionCount,
        useMobileStack,
      ],
      revertOnUpdate: true,
    },
  );

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || useMobileStack) return;

    let frame = 0;

    const syncActive = () => {
      frame = 0;
      const cards = Array.from(
        rail.querySelectorAll<HTMLElement>("[data-service-card]"),
      );
      if (cards.length === 0) return;

      const railStart = rail.getBoundingClientRect().left;
      const distances = cards.map((card) =>
        Math.abs(card.getBoundingClientRect().left - railStart),
      );
      const nearest = distances.indexOf(Math.min(...distances));

      if (nearest !== activeRef.current) {
        activeRef.current = nearest;
        setActive(nearest);
      }
    };

    const scheduleSync = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncActive);
    };

    const observer = new ResizeObserver(scheduleSync);
    observer.observe(rail);
    rail
      .querySelectorAll<HTMLElement>("[data-service-card]")
      .forEach((card) => observer.observe(card));

    rail.addEventListener("scroll", scheduleSync, { passive: true });
    scheduleSync();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      rail.removeEventListener("scroll", scheduleSync);
    };
  }, [useMobileStack]);

  const goTo = (index: number, keyboard = false) => {
    const targetIndex = Math.min(totalCards - 1, Math.max(0, index));

    activeRef.current = targetIndex;
    setActive(targetIndex);

    const rail = railRef.current;
    if (!rail) return;

    if (useMobileStack) {
      rail.scrollTo({
        left: targetIndex * rail.clientWidth,
        behavior: keyboard ? "instant" : "smooth",
      });
      return;
    }

    const card =
      rail.querySelectorAll<HTMLElement>("[data-service-card]")[targetIndex];
    if (!card) return;

    const left =
      rail.scrollLeft +
      card.getBoundingClientRect().left -
      rail.getBoundingClientRect().left;

    rail.scrollTo({
      left,
      behavior: keyboard || shouldReduceMotion ? "instant" : "smooth",
    });
  };

  const controlClass =
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-black/18 bg-white text-black transition-[background-color,border-color,transform] duration-150 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-black/34 hover:bg-black/[0.04] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 aria-disabled:pointer-events-none aria-disabled:opacity-30 motion-reduce:transform-none motion-reduce:transition-none";

  const controls = (
    <div className="font-ui mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-black/12 pt-4">
      <a
        href="tel:+393289185029"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-black underline decoration-black/28 underline-offset-4 transition-[text-decoration-color,transform] duration-150 hover:decoration-black active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 motion-reduce:transform-none motion-reduce:transition-none"
      >
        Parliamone insieme
        <PhoneCall aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
      </a>

      <div className="flex items-center gap-2.5">
        <span
          className="mr-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-black/46"
          aria-live="polite"
        >
          {active + 1} / {services.length}
        </span>
        <button
          type="button"
          aria-label="Servizio precedente"
          aria-disabled={active === 0}
          className={controlClass}
          onClick={(event) => {
            if (active > 0) goTo(active - 1, event.detail === 0);
          }}
        >
          <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.8} />
        </button>
        <button
          type="button"
          aria-label="Servizio successivo"
          aria-disabled={active === services.length - 1}
          className={controlClass}
          onClick={(event) => {
            if (active < services.length - 1) {
              goTo(active + 1, event.detail === 0);
            }
          }}
        >
          <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );

  if (useMobileStack) {
    return (
      <div className="min-w-0 lg:hidden">
        <div
          ref={railRef}
          role="region"
          aria-label="Servizi Grossi Moto, sequenza orizzontale"
          tabIndex={0}
          className="hide-scrollbar relative snap-x snap-mandatory overflow-x-hidden overscroll-x-contain focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{ touchAction: "pan-y" }}
          onPointerDown={(event) => {
            if (!event.isPrimary || event.pointerType === "mouse") return;

            swipeStartRef.current = {
              x: event.clientX,
              y: event.clientY,
              pointerId: event.pointerId,
            };
          }}
          onPointerUp={(event) => {
            const start = swipeStartRef.current;
            swipeStartRef.current = null;

            if (!start || start.pointerId !== event.pointerId) return;

            const deltaX = event.clientX - start.x;
            const deltaY = event.clientY - start.y;
            const horizontalDistance = Math.abs(deltaX);
            const verticalDistance = Math.abs(deltaY);

            if (
              horizontalDistance < mobileSwipeThreshold ||
              horizontalDistance <= verticalDistance * 1.15
            ) {
              return;
            }

            goTo(activeRef.current + (deltaX < 0 ? 1 : -1));
          }}
          onPointerCancel={() => {
            swipeStartRef.current = null;
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(Math.max(0, active - 1), true);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              goTo(Math.min(services.length - 1, active + 1), true);
            } else if (event.key === "Home") {
              event.preventDefault();
              goTo(0, true);
            } else if (event.key === "End") {
              event.preventDefault();
              goTo(services.length - 1, true);
            }
          }}
        >
          <div
            className="relative h-[min(78svh,42rem)] min-h-[32rem]"
            style={{ width: `${Math.max(totalCards, 1) * 100}%` }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex"
            >
              {services.map((service) => (
                <span
                  key={service.title}
                  className="h-px shrink-0 snap-start"
                  style={{ width: `${100 / Math.max(totalCards, 1)}%` }}
                />
              ))}
            </div>

            <div
              ref={stackContainerRef}
              className="sticky left-0 z-20 flex h-full items-center justify-center"
              style={{ width: `${100 / Math.max(totalCards, 1)}%` }}
            >
              <div className="relative h-full w-[calc(100%-3.5rem)] max-w-[28rem]">
                {services.map((service, index) => {
                  const isActive = index === active;

                  return (
                    <article
                      key={service.title}
                      data-service-stack-card
                      aria-hidden={!isActive}
                      inert={!isActive ? true : undefined}
                      className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-black/10 bg-white will-change-transform"
                      style={{ zIndex: totalCards - index }}
                    >
                      <div className="relative h-[42%] shrink-0 overflow-hidden bg-black/[0.035]">
                        <Image
                          src={service.image}
                          alt={service.alt}
                          fill
                          draggable={false}
                          sizes="(max-width: 767px) calc(100vw - 3.5rem), 1px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex min-h-0 flex-1 flex-col p-5">
                        <h3 className="font-display max-w-[14ch] text-[clamp(1.9rem,7vw,2.75rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em] text-[#0A0A0A]">
                          {service.title}
                        </h3>
                        <p className="mt-3 max-w-[25ch] text-[clamp(1.05rem,4.2vw,1.45rem)] font-semibold leading-[1.06] text-black/82">
                          {service.statement}
                        </p>
                        <p className="mt-3 max-w-[44ch] text-sm leading-6 text-black/64">
                          {service.description}
                        </p>
                        <ul className="font-ui mt-auto grid border-t border-black/12 pt-3 text-[0.68rem] font-semibold uppercase tracking-[0.04em] text-black/66">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="border-b border-black/8 py-1.5 last:border-b-0"
                            >
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div
                        data-service-depth-shade
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-30 bg-black opacity-0"
                      />
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {controls}
      </div>
    );
  }

  return (
    <div className="min-w-0 lg:hidden">
      <div
        ref={railRef}
        role="region"
        aria-label="Servizi Grossi Moto da sfogliare"
        tabIndex={0}
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 [--service-width:84%] after:block after:w-[max(0px,calc(100%-var(--service-width)-16px))] after:shrink-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 md:[--service-width:46%]"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(Math.max(0, active - 1), true);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(Math.min(services.length - 1, active + 1), true);
          } else if (event.key === "Home") {
            event.preventDefault();
            goTo(0, true);
          } else if (event.key === "End") {
            event.preventDefault();
            goTo(services.length - 1, true);
          }
        }}
      >
        {services.map((service) => (
          <article
            key={service.title}
            data-service-card
            className="w-[var(--service-width)] shrink-0 snap-start"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-black/[0.035] sm:rounded-[28px]">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                draggable={false}
                sizes="(max-width: 767px) 84vw, (max-width: 1023px) 46vw, 1px"
                className="object-cover"
              />
            </div>

            <div className="pt-5">
              <h3 className="font-display max-w-[14ch] text-[clamp(2rem,7vw,3rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em] text-[#0A0A0A]">
                {service.title}
              </h3>
              <p className="mt-4 max-w-[24ch] text-[clamp(1.2rem,4.5vw,1.7rem)] font-semibold leading-[1.05] text-black/82">
                {service.statement}
              </p>
              <p className="mt-4 max-w-[44ch] text-sm leading-6 text-black/64 sm:text-base sm:leading-7">
                {service.description}
              </p>
              <ul className="font-ui mt-5 grid gap-2 border-t border-black/12 pt-4 text-[0.74rem] font-semibold uppercase tracking-[0.04em] text-black/66">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="border-b border-black/8 pb-2 last:border-b-0"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {controls}
    </div>
  );
}
