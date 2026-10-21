"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Check, Lock, ShieldCheck, Smartphone } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

import { accessories } from "@/data/accessories";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./journey.module.css";

const pastelColors = [
  "oklch(91% 0.028 240)",
  "oklch(91.5% 0.028 150)",
  "oklch(91% 0.032 24)",
  "oklch(92% 0.03 88)",
] as const;

const accessoryIcons = [ShieldCheck, Box, Lock, Smartphone] as const;

export function AccessoryRail() {
  const [active, setActive] = useState(0);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = accessories[active];
  const currentColor = pastelColors[active];

  function choose(index: number) {
    setActive(index);
  }

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
    choose(next);
    tabs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Categorie accessori"
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
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
              onClick={() => choose(index)}
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
        className="mt-5 grid overflow-hidden rounded-[1.5rem] transition-colors duration-150 motion-reduce:transition-none md:grid-cols-[0.9fr_1.1fr] lg:rounded-[2rem]"
        style={{ backgroundColor: currentColor }}
      >
        <div aria-hidden="true" className="relative h-[clamp(15rem,32svh,19rem)] shrink-0 md:h-auto md:min-h-[24rem] lg:min-h-[26rem]">
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
                alt=""
                fill
                sizes="(min-width: 1440px) 560px, (min-width: 768px) 42vw, 100vw"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

        </div>

        <div className="px-4 pb-5 pt-2.5 sm:px-5 sm:pb-6 sm:pt-3 md:p-8 lg:flex lg:flex-col lg:justify-center lg:p-10">
          <div className={styles.panels}>
          {accessories.map((item, index) => (
            <div
              key={item.id}
              id={`accessory-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`accessory-tab-${index}`}
              inert={index !== active}
              aria-hidden={index !== active}
              tabIndex={index === active ? 0 : -1}
              className={`${styles.panel} ${index === active ? "" : "invisible"} rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]`}
            >
              <h3 className="font-display max-w-[19ch] text-[clamp(1.65rem,2.6vw,2.5rem)] font-semibold leading-[1.08] tracking-tight">
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
          </div>

          <p className="mt-4 text-sm leading-6">Immagini illustrative</p>
        </div>
      </div>
    </div>
  );
}
