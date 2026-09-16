"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { accessories } from "@/data/accessories";

export function AccessoryRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const gesture = useRef({ x: 0, y: 0, moved: false });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let frame = 0;
    const sync = () => {
      const cards = Array.from(rail.querySelectorAll<HTMLElement>("article"));
      const start = rail.getBoundingClientRect().left;
      const distances = cards.map((card) =>
        Math.abs(card.getBoundingClientRect().left - start),
      );
      const nearest = distances.indexOf(Math.min(...distances));
      // A 2px dead band prevents subpixel jitter around a shared midpoint.
      if (
        nearest !== activeRef.current &&
        distances[nearest] + 2 < distances[activeRef.current]
      ) {
        activeRef.current = nearest;
        setActive(nearest);
      }
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(rail);
    rail.querySelectorAll("article").forEach((card) => observer.observe(card));
    rail.addEventListener("scroll", schedule, { passive: true });
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stopSmooth = () => {
      if (motion.matches)
        rail.scrollTo({ left: rail.scrollLeft, behavior: "instant" });
    };
    motion.addEventListener("change", stopSmooth);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      rail.removeEventListener("scroll", schedule);
      motion.removeEventListener("change", stopSmooth);
    };
  }, []);

  const goTo = (index: number, keyboard = false) => {
    const rail = railRef.current;
    const card = rail?.querySelectorAll("article")[index];
    if (!rail || !card) return;
    const left =
      rail.scrollLeft +
      card.getBoundingClientRect().left -
      rail.getBoundingClientRect().left;
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
    "inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-current/30 focus-visible:outline-2 focus-visible:outline-offset-4 aria-disabled:opacity-35";

  return (
    <div className="mt-8 min-w-0 lg:mt-10">
      <div
        role="group"
        aria-label="Categorie accessori"
        className="font-ui mb-5 flex flex-wrap gap-x-5 gap-y-1"
      >
        {accessories.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-controls="accessory-rail"
            aria-current={index === active ? "true" : undefined}
            onClick={(event) => goTo(index, event.detail === 0)}
            className="min-h-12 max-w-full border-b-2 border-transparent text-left text-sm font-semibold [overflow-wrap:anywhere] aria-current:border-current focus-visible:outline-2 focus-visible:outline-offset-4"
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
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 [--card-width:86%] [scrollbar-width:thin] after:block after:w-[max(0px,calc(100%-var(--card-width)-16px))] after:shrink-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 md:[--card-width:44%] lg:[--card-width:38%]"
        onPointerDown={(event) => {
          gesture.current = {
            x: event.clientX,
            y: event.clientY,
            moved: false,
          };
        }}
        onPointerMove={(event) => {
          if (
            Math.hypot(
              event.clientX - gesture.current.x,
              event.clientY - gesture.current.y,
            ) > 10
          )
            gesture.current.moved = true;
        }}
        onPointerCancel={() => {
          gesture.current.moved = true;
        }}
        onClickCapture={(event) => {
          if (event.detail > 0 && gesture.current.moved) event.preventDefault();
        }}
      >
        {accessories.map((item, index) => (
          <article
            key={item.id}
            aria-labelledby={`accessory-${item.id}`}
            className="min-w-0 w-[var(--card-width)] shrink-0 snap-start [overflow-wrap:anywhere]"
          >
            <Image
              src={item.image}
              alt={item.alt}
              width={800}
              height={1000}
              sizes="(min-width: 1552px) 560px, (min-width: 1024px) 36vw, (min-width: 768px) 42vw, 80vw"
              draggable={false}
              className="aspect-[4/5] w-full rounded-sm bg-[var(--panel)] object-cover object-center"
            />
            <h3
              id={`accessory-${item.id}`}
              className="font-display mt-5 text-[clamp(1.75rem,2.8vw,2.75rem)] font-black uppercase leading-none"
            >
              {item.title}
            </h3>
            <ul className="font-ui mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
              {item.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
            <p className="mt-3 max-w-[40ch] text-base leading-relaxed">
              {item.description}
            </p>
            <a
              href="tel:+393289185029"
              aria-label={`Chiedi compatibilità: ${item.title}`}
              onFocus={() => goTo(index, true)}
              className="group font-ui mt-3 inline-flex min-h-12 max-w-full items-center gap-3 text-sm font-bold underline decoration-current/40 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Chiedi compatibilità{" "}
              <ArrowUpRight
                aria-hidden="true"
                size={18}
                className="shrink-0 transition-transform duration-160 group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
              />
            </a>
          </article>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="font-ui text-xs">Immagini illustrative</p>
        <div className="flex items-center gap-3">
          <span
            aria-live="polite"
            aria-atomic="true"
            className="font-ui mr-2 text-sm tabular-nums"
          >
            {active + 1} di {accessories.length}
          </span>
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
            <ArrowLeft aria-hidden="true" size={20} />
          </button>
          <button
            type="button"
            aria-label="Accessorio successivo"
            aria-controls="accessory-rail"
            aria-disabled={active === accessories.length - 1}
            className={controlClass}
            onClick={(event) => {
              if (active < accessories.length - 1)
                goTo(active + 1, event.detail === 0);
            }}
          >
            <ArrowRight aria-hidden="true" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
