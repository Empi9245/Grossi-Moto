"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Box, Check, Lock, ShieldCheck, Smartphone } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { accessories } from "@/data/accessories";

const pastelColors = [
  "oklch(91% 0.028 240)",
  "oklch(91.5% 0.028 150)",
  "oklch(91% 0.032 24)",
  "oklch(92% 0.03 88)",
] as const;

const autoAdvanceDelayMs = 6000;
const accessoryIcons = [ShieldCheck, Box, Lock, Smartphone] as const;

export function AccessoryRail() {
  const [active, setActive] = useState(0);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const reduceMotion = useReducedMotion();
  const root = useRef<HTMLDivElement | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = accessories[active];
  const currentColor = pastelColors[active];

  useEffect(() => {
    const rail = root.current;

    if (!rail) return;

    if (!("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(Boolean(entry?.isIntersecting));
      },
      {
        rootMargin: "50% 0px 50% 0px",
        threshold: 0,
      },
    );

    observer.observe(rail);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !isNearViewport) return;

    const timer = window.setTimeout(() => {
      setActive((currentActive) => (currentActive + 1) % accessories.length);
    }, autoAdvanceDelayMs);

    return () => window.clearTimeout(timer);
  }, [active, isNearViewport, reduceMotion]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % accessories.length
        : event.key === "ArrowLeft"
          ? (index + accessories.length - 1) % accessories.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? accessories.length - 1
              : null;

    if (next === null) return;

    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <div ref={root}>
      <div
        role="tablist"
        aria-label="Categorie accessori"
        className="grid grid-cols-2 gap-2 rounded-[1.5rem] bg-white/55 p-2 sm:grid-cols-4"
      >
        {accessories.map((item, index) => {
          const Icon = accessoryIcons[index];

          return (
            <button
              key={item.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              id={`accessory-tab-${index}`}
              role="tab"
              type="button"
              aria-selected={active === index}
              aria-controls={`accessory-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`flex min-h-14 items-center justify-center gap-2 rounded-[1rem] px-3 py-3 text-sm font-semibold text-[#111111] transition-colors duration-150 active:bg-white/78 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] motion-reduce:transition-none ${
                active === index ? "" : "hover:bg-white/32"
              }`}
              style={{
                backgroundColor: active === index ? pastelColors[index] : undefined,
              }}
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
              {item.title}
            </button>
          );
        })}
      </div>

      <div
        className="mt-6 grid overflow-hidden rounded-[1.5rem] border border-black/[0.055] transition-colors duration-150 motion-reduce:transition-none md:border-0 lg:grid-cols-2 lg:rounded-[2rem]"
        style={{ backgroundColor: currentColor }}
      >
        <div className="relative h-[clamp(17.8rem,40svh,20.8rem)] shrink-0 md:h-auto md:aspect-[4/3] lg:aspect-auto lg:min-h-[27rem]">
          <AnimatePresence initial={false}>
            <motion.div
              key={current.image}
              initial={{ opacity: reduceMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className="absolute inset-x-2 bottom-2 top-2 overflow-hidden rounded-t-[1.3rem] rounded-b-[1.8rem] bg-white/30 ring-1 ring-black/[0.035] md:inset-0 md:rounded-none md:ring-0"
            >
              <Image
                src={current.image}
                alt={current.alt}
                fill
                sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-[#111111]">
            Immagini illustrative
          </span>
        </div>

        <div className="px-4 pb-5 pt-2.5 sm:px-5 sm:pb-6 sm:pt-3 md:p-8 lg:flex lg:flex-col lg:justify-center lg:p-10">
          {accessories.map((item, index) => (
            <div
              key={item.id}
              id={`accessory-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`accessory-tab-${index}`}
              hidden={index !== active}
              tabIndex={0}
              className="min-h-[15.5rem] rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] md:min-h-[17rem]"
            >
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.12em] text-[#111111]/58">
                {index + 1} di {accessories.length} · {item.title}
              </p>

              <h3 className="font-display mt-2.5 max-w-[19ch] text-[clamp(1.9rem,3.2vw,3rem)] font-semibold leading-[1.04] tracking-tight md:mt-4">
                {item.title}
              </h3>

              <p className="mt-3.5 max-w-[42ch] text-base leading-7 text-[#111111]/78 md:mt-5">
                {item.description}
              </p>

              <p className="mt-4 flex max-w-[42ch] items-start gap-2 text-sm leading-6 text-[#111111]/68 md:mt-5">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
                {item.examples.join(" · ")}
              </p>
            </div>
          ))}

          <a
            href="tel:+393289185029"
            aria-label={`Chiedi compatibilità: ${current.title}`}
            className="font-ui mt-4 inline-flex min-h-12 w-fit items-center gap-2 rounded-[0.9rem] bg-white/90 px-5 py-3 text-sm font-semibold text-[#111111] transition-colors hover:bg-white active:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] md:mt-6"
          >
            Chiedi compatibilità
            
          </a>
        </div>
      </div>
    </div>
  );
}
