"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, PhoneCall } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { useMediaQuery } from "@/hooks/useMediaQuery";

export type Service = {
  title: string;
  statement: string;
  description: string;
  features: string[];
  image: string;
  alt: string;
};

const STACK_OFFSET = 18;
const STACK_SCALE_STEP = 0.024;
const MAX_VISIBLE_DEPTH = 5;
const EXIT_DISTANCE = 1.14;

function stackDepth(index: number) {
  return Math.min(index, MAX_VISIBLE_DEPTH);
}

function stackScale(depth: number) {
  return 1 - depth * STACK_SCALE_STEP;
}

export function ServiceSwipe({ services }: { services: Service[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const isMobileViewport = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const setActiveIndex = (nextIndex: number) => {
      if (nextIndex !== activeRef.current) {
        activeRef.current = nextIndex;
        setActive(nextIndex);
      }
    };

    const syncTabletRail = () => {
      const cards = Array.from(
        rail.querySelectorAll<HTMLElement>("[data-service-card]"),
      );
      if (cards.length === 0) return;

      const railStart = rail.getBoundingClientRect().left;
      const distances = cards.map((card) =>
        Math.abs(card.getBoundingClientRect().left - railStart),
      );
      const nearest = distances.indexOf(Math.min(...distances));

      setActiveIndex(nearest);
    };

    const renderMobileStack = () => {
      const cards = Array.from(
        rail.querySelectorAll<HTMLElement>("[data-service-stack-card]"),
      );
      const total = cards.length;
      const stepWidth = rail.clientWidth;

      if (!total || stepWidth <= 0) return;

      const rawIndex = gsap.utils.clamp(
        0,
        total - 1,
        rail.scrollLeft / stepWidth,
      );
      const visualIndex = reducedMotion.matches
        ? Math.round(rawIndex)
        : rawIndex;
      const baseIndex = Math.min(
        total - 1,
        Math.floor(visualIndex + 0.0001),
      );
      const phase =
        baseIndex >= total - 1 ? 0 : visualIndex - baseIndex;

      cards.forEach((card, index) => {
        const relativeIndex = (index - baseIndex + total) % total;

        if (relativeIndex === 0) {
          gsap.set(card, {
            x: -stepWidth * EXIT_DISTANCE * phase,
            scale: gsap.utils.interpolate(1, 0.97, phase),
            opacity: 1,
            zIndex: total + 1,
            transformOrigin: "center center",
          });
          return;
        }

        const fromDepth = stackDepth(relativeIndex);
        const toDepth = stackDepth(relativeIndex - 1);

        gsap.set(card, {
          x: gsap.utils.interpolate(
            fromDepth * STACK_OFFSET,
            toDepth * STACK_OFFSET,
            phase,
          ),
          scale: gsap.utils.interpolate(
            stackScale(fromDepth),
            stackScale(toDepth),
            phase,
          ),
          opacity: 1,
          zIndex: total - relativeIndex,
          transformOrigin: "center center",
        });
      });

      setActiveIndex(
        Math.min(total - 1, Math.max(0, Math.round(rawIndex))),
      );
    };

    const sync = () => {
      frame = 0;

      if (isMobileViewport) {
        renderMobileStack();
      } else {
        syncTabletRail();
      }
    };

    const scheduleSync = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };

    const observer = new ResizeObserver(scheduleSync);
    observer.observe(rail);

    rail
      .querySelectorAll<HTMLElement>(
        isMobileViewport
          ? "[data-service-stack-card]"
          : "[data-service-card]",
      )
      .forEach((card) => observer.observe(card));

    rail.addEventListener("scroll", scheduleSync, { passive: true });

    const onReducedMotionChange = () => {
      if (reducedMotion.matches) {
        rail.scrollTo({ left: rail.scrollLeft, behavior: "instant" });
      }
      scheduleSync();
    };

    reducedMotion.addEventListener("change", onReducedMotionChange);
    scheduleSync();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      rail.removeEventListener("scroll", scheduleSync);
      reducedMotion.removeEventListener("change", onReducedMotionChange);
    };
  }, [isMobileViewport]);

  const goTo = (index: number, keyboard = false) => {
    const rail = railRef.current;
    if (!rail) return;

    let left = index * rail.clientWidth;

    if (!isMobileViewport) {
      const card =
        rail.querySelectorAll<HTMLElement>("[data-service-card]")[index];
      if (!card) return;

      left =
        rail.scrollLeft +
        card.getBoundingClientRect().left -
        rail.getBoundingClientRect().left;
    }

    activeRef.current = index;
    setActive(index);
    rail.scrollTo({
      left,
      behavior:
        keyboard ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
    });
  };

  const controlClass =
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-black/18 bg-white text-black transition-[background-color,border-color,transform] duration-150 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-black/34 hover:bg-black/[0.04] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 aria-disabled:pointer-events-none aria-disabled:opacity-30 motion-reduce:transform-none motion-reduce:transition-none";

  return (
    <div className="min-w-0 lg:hidden">
      {isMobileViewport ? (
        <div
          ref={railRef}
          role="region"
          aria-label="Servizi Grossi Moto da sfogliare"
          tabIndex={0}
          className="hide-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain py-3 focus-visible:outline-2 focus-visible:outline-offset-4"
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
            className="relative"
            style={{ width: `${Math.max(services.length, 1) * 100}%` }}
          >
            <div
              className="sticky left-0 z-20"
              style={{
                width: `${100 / Math.max(services.length, 1)}%`,
              }}
            >
              <div className="grid pr-10">
                {services.map((service, index) => {
                  const isActive = index === active;

                  return (
                    <article
                      key={service.title}
                      data-service-stack-card
                      aria-hidden={!isActive}
                      inert={!isActive ? true : undefined}
                      className="col-start-1 row-start-1 overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] will-change-transform"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-black/[0.035]">
                        <Image
                          src={service.image}
                          alt={service.alt}
                          fill
                          draggable={false}
                          sizes="(max-width: 767px) calc(100vw - 5rem), 1px"
                          className="object-cover"
                        />
                      </div>

                      <div className="p-5">
                        <h3 className="font-display max-w-[14ch] text-[clamp(2rem,7vw,3rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em] text-[#0A0A0A]">
                          {service.title}
                        </h3>
                        <p className="mt-4 max-w-[24ch] text-[clamp(1.2rem,4.5vw,1.7rem)] font-semibold leading-[1.05] text-black/82">
                          {service.statement}
                        </p>
                        <p className="mt-4 max-w-[44ch] text-sm leading-6 text-black/64">
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
                  );
                })}
              </div>
            </div>

            <div className="-mt-px flex h-px" aria-hidden="true">
              {services.map((service) => (
                <div
                  key={service.title}
                  data-service-snap
                  className="shrink-0 snap-start"
                  style={{
                    width: `${100 / Math.max(services.length, 1)}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={railRef}
          role="region"
          aria-label="Servizi Grossi Moto da sfogliare"
          tabIndex={0}
          className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 [--service-width:46%] after:block after:w-[max(0px,calc(100%-var(--service-width)-16px))] after:shrink-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4"
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-black/[0.035]">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  draggable={false}
                  sizes="(max-width: 1023px) 46vw, 1px"
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
      )}

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
    </div>
  );
}
