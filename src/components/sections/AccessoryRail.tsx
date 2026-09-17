"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { accessories } from "@/data/accessories";

const accessoryPastels = [
  "#E8EEF7",
  "#E8F1E5",
  "#F2EAF6",
  "#F6EEDC",
] as const;

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
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-black/20 text-black focus-visible:outline-2 focus-visible:outline-offset-4 aria-disabled:opacity-35";

  return (
    <div className="mt-6 min-w-0 lg:mt-7">
      <div
        role="group"
        aria-label="Categorie accessori"
        className="font-ui mb-4 flex flex-wrap gap-x-4 gap-y-0"
      >
        {accessories.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-controls="accessory-rail"
            aria-current={index === active ? "true" : undefined}
            onClick={(event) => goTo(index, event.detail === 0)}
            className="min-h-11 max-w-full border-b-2 border-transparent text-left text-[0.82rem] font-semibold text-black/55 [overflow-wrap:anywhere] aria-current:border-black aria-current:text-black focus-visible:outline-2 focus-visible:outline-offset-4"
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
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 [--card-width:84%] [scrollbar-width:thin] after:block after:w-[max(0px,calc(100%-var(--card-width)-16px))] after:shrink-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 md:[--card-width:42%] lg:[--card-width:30%]"
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
            className="min-w-0 w-[var(--card-width)] shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-none [overflow-wrap:anywhere]"
          >
            <div
              aria-hidden="true"
              className="h-1 w-full"
              style={{
                background: accessoryPastels[index % accessoryPastels.length],
              }}
            />
            <div className="p-3.5 sm:p-4">
              <div className="overflow-hidden rounded-xl bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={800}
                  height={1000}
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 42vw, 84vw"
                  draggable={false}
                  className="aspect-[5/4] w-full object-cover object-center"
                />
              </div>
              <div className="mt-3.5 border-t border-black/10 pt-3.5">
                <p className="font-ui text-[0.6rem] font-bold uppercase tracking-[0.15em] text-gray-500">
                  Accessori
                </p>
                <h3
                  id={`accessory-${item.id}`}
                  className="font-display mt-1.5 text-[clamp(1.5rem,2.2vw,2.15rem)] font-bold leading-[0.98] text-gray-900"
                >
                  {item.title}
                </h3>
                <ul className="font-ui mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[0.8rem] font-semibold text-gray-600">
                  {item.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
                <p className="mt-2.5 max-w-[40ch] text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
                <a
                  href="tel:+393289185029"
                  aria-label={`Chiedi compatibilità: ${item.title}`}
                  onFocus={() => goTo(index, true)}
                  className="group font-ui mt-3 inline-flex min-h-11 max-w-full items-center gap-2.5 text-[0.8rem] font-bold text-gray-900 underline decoration-black/25 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Chiedi compatibilità{" "}
                  <ArrowUpRight
                    aria-hidden="true"
                    size={17}
                    className="shrink-0 transition-transform duration-160 group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4 text-black/60">
        <p className="font-ui text-xs">Immagini illustrative</p>
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
            <ArrowLeft aria-hidden="true" size={19} />
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
            <ArrowRight aria-hidden="true" size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}
