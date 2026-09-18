"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Box,
  Check,
  Lock,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

import { accessories } from "@/data/accessories";

const pastelColors = ["#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFFFBA"] as const;
const accessoryIcons = [ShieldCheck, Box, Lock, Smartphone] as const;

export function AccessoryRail() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = accessories[active];
  const currentColor = pastelColors[active];

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
    <div>
      <div
        role="tablist"
        aria-label="Categorie accessori"
        className="grid grid-cols-2 gap-2 rounded-[1.5rem] bg-white/45 p-2 sm:grid-cols-4"
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
              className={`flex min-h-14 items-center justify-center gap-2 rounded-[1rem] px-3 py-3 text-sm font-semibold text-[#111111] transition-colors duration-150 active:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] motion-reduce:transition-none ${
                active === index ? "" : "hover:bg-white/35"
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
        className="mt-6 grid overflow-hidden rounded-[1.5rem] transition-colors duration-150 motion-reduce:transition-none lg:grid-cols-2 lg:rounded-[2rem]"
        style={{ backgroundColor: currentColor }}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-white/25 lg:aspect-auto lg:min-h-[27rem]">
          <AnimatePresence initial={false}>
            <motion.div
              key={current.image}
              initial={{ opacity: reduceMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className="absolute inset-0"
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

        <div className="p-6 sm:p-8 lg:flex lg:flex-col lg:justify-center lg:p-10">
          {accessories.map((item, index) => (
            <div
              key={item.id}
              id={`accessory-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`accessory-tab-${index}`}
              hidden={index !== active}
              tabIndex={0}
              className="min-h-[17rem] rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
            >
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.12em] text-[#111111]/58">
                {index + 1} di {accessories.length} · {item.title}
              </p>

              <h3 className="font-display mt-4 max-w-[19ch] text-[clamp(1.9rem,3.2vw,3rem)] font-semibold leading-[1.04] tracking-tight">
                {item.title}
              </h3>

              <p className="mt-5 max-w-[42ch] text-base leading-7 text-[#111111]/78">
                {item.description}
              </p>

              <p className="mt-5 flex max-w-[42ch] items-start gap-2 text-sm leading-6 text-[#111111]/68">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
                {item.examples.join(" · ")}
              </p>
            </div>
          ))}

          <a
            href="tel:+393289185029"
            aria-label={`Chiedi compatibilità: ${current.title}`}
            className="font-ui mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-[#111111] transition-colors hover:bg-white active:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
          >
            Chiedi compatibilità
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
