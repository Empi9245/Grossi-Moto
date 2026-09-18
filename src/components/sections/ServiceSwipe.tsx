"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, PhoneCall } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

export function ServiceSwipe({ services }: { services: Service[] }) {
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
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
      if (!container || totalCards < 2) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-service-stack-card]",
        container,
      );

      if (cards.length !== totalCards) return;

      cards.forEach((card, index) => {
        const depth = stackDepth(index);

        gsap.set(card, {
          x: depth * stackOffset,
          xPercent: 0,
          scale: stackScale(depth),
          opacity: 1,
          transformOrigin: "left center",
          zIndex: totalCards - depth,
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

            if (nextIndex !== activeRef.current) {
              activeRef.current = nextIndex;
              setActive(nextIndex);
            }
          },
        },
      });

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
          const depth = stackDepth(follower - index - 1);

          timeline.to(
            cards[follower],
            {
              x: depth * stackOffset,
              xPercent: 0,
              scale: stackScale(depth),
              zIndex: totalCards - depth,
              ease: "power1.inOut",
              duration: 0.84,
            },
            position,
          );
        }

        const recycledDepth = stackDepth(totalCards - index - 1);

        timeline.set(
          cards[index],
          {
            x: recycledDepth * stackOffset,
            xPercent: 122,
            scale: stackScale(recycledDepth),
            zIndex: totalCards - recycledDepth,
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

      return () => {
        timeline.scrollTrigger?.kill();
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

    if (useMobileStack) {
      const container = stackContainerRef.current;
      if (!container) return;

      const sectionTop = window.scrollY + container.getBoundingClientRect().top;
      const scrollDistance = Math.max(
        0,
        container.getBoundingClientRect().height - window.innerHeight,
      );
      const progress =
        transitionCount === 0 ? 0 : targetIndex / transitionCount;

      window.scrollTo({
        top: sectionTop + scrollDistance * progress,
        left: 0,
        behavior: keyboard ? "auto" : "smooth",
      });
      return;
    }

    const rail = railRef.current;
    const card =
      rail?.querySelectorAll<HTMLElement>("[data-service-card]")[targetIndex];
    if (!rail || !card) return;

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
          ref={stackContainerRef}
          role="region"
          aria-label="Servizi Grossi Moto, sequenza orizzontale"
          className="relative w-full"
          style={{ height: `${totalCards * 100 + 50}svh` }}
        >
          <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden py-[clamp(4.5rem,10svh,6.5rem)]">
            <div className="relative h-[min(78svh,42rem)] min-h-[32rem] w-[calc(100%-2.5rem)] max-w-[28rem]">
              {services.map((service, index) => {
                const isActive = index === active;

                return (
                  <article
                    key={service.title}
                    data-service-stack-card
                    aria-hidden={!isActive}
                    inert={!isActive ? true : undefined}
                    className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-black/10 bg-white shadow-[0_-10px_36px_rgba(0,0,0,0.12),0_22px_56px_rgba(0,0,0,0.14)] will-change-transform"
                    style={{ zIndex: totalCards - index }}
                  >
                    <div className="relative h-[42%] shrink-0 overflow-hidden bg-black/[0.035]">
                      <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        draggable={false}
                        sizes="(max-width: 767px) calc(100vw - 2.5rem), 1px"
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
                  </article>
                );
              })}
            </div>

            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="font-ui absolute right-4 top-[calc(1rem+env(safe-area-inset-top))] z-50 flex items-center gap-2 rounded-full bg-black/78 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm"
            >
              <span className="font-numeric tabular-nums">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="h-px w-4 bg-white/35" />
              <span className="font-numeric tabular-nums text-white/58">
                {String(totalCards).padStart(2, "0")}
              </span>
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
