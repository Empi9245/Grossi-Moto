"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { accessories } from "@/data/accessories";

export function AccessoryRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const gesture = useRef({
    x: 0,
    y: 0,
    moved: false,
    dragging: false,
    scrollLeft: 0,
    pointerId: null as number | null,
  });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;

    const syncActiveCard = () => {
      const cards = Array.from(
        rail.querySelectorAll<HTMLElement>("[data-accessory-card]"),
      );
      if (cards.length === 0) return;

      const railStart = rail.getBoundingClientRect().left;
      const distances = cards.map((card) =>
        Math.abs(card.getBoundingClientRect().left - railStart),
      );
      const nearest = distances.indexOf(Math.min(...distances));
      const currentDistance = distances[activeRef.current] ?? Number.POSITIVE_INFINITY;

      if (
        nearest !== activeRef.current &&
        distances[nearest] + 2 < currentDistance
      ) {
        activeRef.current = nearest;
        setActive(nearest);
      }
    };

    const scheduleSync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncActiveCard);
    };

    const observer = new ResizeObserver(scheduleSync);
    observer.observe(rail);
    rail
      .querySelectorAll<HTMLElement>("[data-accessory-card]")
      .forEach((card) => observer.observe(card));

    rail.addEventListener("scroll", scheduleSync, { passive: true });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stopSmoothScroll = () => {
      if (reducedMotion.matches) {
        rail.scrollTo({ left: rail.scrollLeft, behavior: "instant" });
      }
    };

    reducedMotion.addEventListener("change", stopSmoothScroll);
    scheduleSync();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      rail.removeEventListener("scroll", scheduleSync);
      reducedMotion.removeEventListener("change", stopSmoothScroll);
    };
  }, []);

  const goTo = (index: number, keyboard = false) => {
    const rail = railRef.current;
    const card = rail?.querySelectorAll<HTMLElement>("[data-accessory-card]")[
      index
    ];
    if (!rail || !card) return;

    const left =
      rail.scrollLeft +
      card.getBoundingClientRect().left -
      rail.getBoundingClientRect().left;

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

  const snapToNearest = () => {
    const rail = railRef.current;
    if (!rail) return;

    const cards = Array.from(
      rail.querySelectorAll<HTMLElement>("[data-accessory-card]"),
    );
    if (cards.length === 0) return;

    const railStart = rail.getBoundingClientRect().left;
    const distances = cards.map((card) =>
      Math.abs(card.getBoundingClientRect().left - railStart),
    );
    const nearest = distances.indexOf(Math.min(...distances));

    activeRef.current = nearest;
    setActive(nearest);
    goTo(nearest);
  };

  const finishMouseDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (gesture.current.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    event.currentTarget.style.scrollSnapType = "";
    gesture.current.dragging = false;
    gesture.current.pointerId = null;

    if (gesture.current.moved) {
      requestAnimationFrame(snapToNearest);
    }
  };

  const controlClass =
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-black/18 bg-white/35 text-black transition-[background-color,border-color,transform] duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:border-black/32 hover:bg-white/60 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 aria-disabled:pointer-events-none aria-disabled:opacity-30 motion-reduce:transform-none motion-reduce:transition-none";

  return (
    <div className="mt-7 min-w-0 lg:mt-10">
      <div
        role="group"
        aria-label="Categorie accessori"
        className="font-ui mb-5 flex gap-x-5 overflow-x-auto border-b border-black/12 text-[0.76rem] font-semibold text-black/52 sm:mb-6 sm:gap-x-7 sm:text-[0.82rem]"
      >
        {accessories.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-controls="accessory-rail"
            aria-current={index === active ? "true" : undefined}
            onClick={(event) => goTo(index, event.detail === 0)}
            className="relative min-h-11 shrink-0 whitespace-nowrap pb-3 text-left transition-colors duration-150 hover:text-black aria-current:font-bold aria-current:text-black focus-visible:outline-2 focus-visible:outline-offset-[-2px] after:absolute after:inset-x-0 after:bottom-[-1px] after:h-[2px] after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-200 after:[transition-timing-function:cubic-bezier(0.23,1,0.32,1)] aria-current:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none"
          >
            {item.title}
          </button>
        ))}
      </div>

      <div
        ref={railRef}
        id="accessory-rail"
        role="region"
        aria-label="Accessori da sfogliare"
        tabIndex={0}
        className="hide-scrollbar flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 active:cursor-grabbing [--card-width:84%] after:block after:w-[max(0px,calc(100%-var(--card-width)-16px))] after:shrink-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 md:[--card-width:44%] lg:[--card-width:31%] xl:[--card-width:29%]"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(Math.max(0, active - 1), true);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(Math.min(accessories.length - 1, active + 1), true);
          } else if (event.key === "Home") {
            event.preventDefault();
            goTo(0, true);
          } else if (event.key === "End") {
            event.preventDefault();
            goTo(accessories.length - 1, true);
          }
        }}
        onPointerDown={(event) => {
          const isMouseDrag = event.pointerType === "mouse" && event.button === 0;

          gesture.current = {
            x: event.clientX,
            y: event.clientY,
            moved: false,
            dragging: isMouseDrag,
            scrollLeft: event.currentTarget.scrollLeft,
            pointerId: isMouseDrag ? event.pointerId : null,
          };

          if (isMouseDrag) {
            event.preventDefault();
            event.currentTarget.style.scrollSnapType = "none";
            event.currentTarget.setPointerCapture(event.pointerId);
          }
        }}
        onPointerMove={(event) => {
          const deltaX = event.clientX - gesture.current.x;
          const deltaY = event.clientY - gesture.current.y;

          if (Math.hypot(deltaX, deltaY) > 10) {
            gesture.current.moved = true;
          }

          if (event.pointerType === "mouse" && gesture.current.dragging) {
            event.preventDefault();
            event.currentTarget.scrollLeft = gesture.current.scrollLeft - deltaX;
          }
        }}
        onPointerUp={finishMouseDrag}
        onPointerCancel={(event) => {
          gesture.current.moved = true;
          finishMouseDrag(event);
        }}
        onLostPointerCapture={(event) => {
          if (gesture.current.pointerId === event.pointerId) {
            event.currentTarget.style.scrollSnapType = "";
            gesture.current.dragging = false;
            gesture.current.pointerId = null;
          }
        }}
        onClickCapture={(event) => {
          if (event.detail > 0 && gesture.current.moved) {
            event.preventDefault();
          }
        }}
      >
        {accessories.map((item, index) => (
          <article
            key={item.id}
            data-accessory-card
            aria-labelledby={`accessory-${item.id}`}
            className="group min-w-0 w-[var(--card-width)] shrink-0 snap-start [overflow-wrap:anywhere]"
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] border border-black/10 bg-white/30 sm:rounded-[28px] lg:rounded-[32px]">
              <Image
                src={item.image}
                alt={item.alt}
                width={800}
                height={1000}
                sizes="(min-width: 1280px) 29vw, (min-width: 1024px) 31vw, (min-width: 768px) 44vw, 84vw"
                draggable={false}
                className="h-full w-full object-cover object-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.018] motion-reduce:transform-none motion-reduce:transition-none"
              />
            </div>

            <div className="pb-1 pr-2 pt-4 sm:pt-5">
              <h3
                id={`accessory-${item.id}`}
                className="font-display max-w-[15ch] text-[clamp(1.65rem,2.35vw,2.55rem)] font-bold leading-[0.94] text-gray-900"
              >
                {item.title}
              </h3>

              <ul className="font-ui mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.76rem] font-semibold text-black/62 sm:text-[0.8rem]">
                {item.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>

              <p className="mt-3 max-w-[40ch] text-[0.9rem] leading-6 text-black/66 sm:text-[0.95rem]">
                {item.description}
              </p>

              <a
                href="tel:+393289185029"
                aria-label={`Chiedi compatibilità: ${item.title}`}
                onFocus={() => goTo(index, true)}
                className="group/cta font-ui mt-3 inline-flex min-h-11 max-w-full items-center gap-2.5 text-[0.78rem] font-bold text-gray-900 underline decoration-black/25 underline-offset-4 transition-[text-decoration-color,transform] duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:decoration-black active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
              >
                Chiedi compatibilità
                <ArrowUpRight
                  aria-hidden="true"
                  size={17}
                  className="shrink-0 transition-transform duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover/cta:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
                />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="font-ui mt-5 flex items-center justify-between gap-4 border-t border-black/10 pt-4 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-black/42 lg:mt-6">
        <div className="flex items-center gap-2.5">
          <span aria-hidden="true" className="h-px w-5 bg-black/18" />
          <p>Immagini illustrative</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Accessorio precedente"
            aria-controls="accessory-rail"
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
            aria-label="Accessorio successivo"
            aria-controls="accessory-rail"
            aria-disabled={active === accessories.length - 1}
            className={controlClass}
            onClick={(event) => {
              if (active < accessories.length - 1) {
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
