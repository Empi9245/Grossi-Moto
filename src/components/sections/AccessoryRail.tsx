"use client";

import Image from "next/image";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { accessories } from "@/data/accessories";

const accessoryPastels = [
  "#E8EEF7",
  "#E8F1E5",
  "#F2EAF6",
  "#F6EEDC",
] as const;

const stateEase = [0.23, 1, 0.32, 1] as const;
const autoAdvanceMs = 5200;

type Accessory = (typeof accessories)[number];

function AccessoryDetails({
  item,
  interactive = true,
}: {
  item: Accessory;
  interactive?: boolean;
}) {
  const ctaClass =
    "group font-ui mt-3 inline-flex min-h-11 max-w-full items-center gap-2.5 text-[0.76rem] font-bold text-gray-900 underline decoration-black/25 underline-offset-4";

  return (
    <div>
      <ul className="font-ui flex flex-wrap gap-x-3 gap-y-1 text-[0.72rem] font-semibold text-black/60 sm:text-[0.76rem]">
        {item.examples.map((example) => (
          <li key={example}>{example}</li>
        ))}
      </ul>
      <p className="mt-2.5 max-w-[42ch] text-[0.88rem] leading-6 text-black/64 sm:text-[0.94rem]">
        {item.description}
      </p>
      {interactive ? (
        <a
          href="tel:+393289185029"
          aria-label={`Chiedi compatibilità: ${item.title}`}
          className={`${ctaClass} transition-[text-decoration-color] duration-150 hover:decoration-black focus-visible:outline-2 focus-visible:outline-offset-2`}
        >
          Chiedi compatibilità
          <ArrowUpRight
            aria-hidden="true"
            size={16}
            className="shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
          />
        </a>
      ) : (
        <span className={ctaClass}>
          Chiedi compatibilità
          <ArrowUpRight aria-hidden="true" size={16} className="shrink-0" />
        </span>
      )}
    </div>
  );
}

function MobileAccordionIndicator({
  active,
  motionDisabled,
}: {
  active: boolean;
  motionDisabled: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/12 bg-white/55 text-black transition-[background-color,border-color,transform] duration-150 ease-out group-active:scale-[0.96]"
    >
      <span className="relative h-[17px] w-[17px]">
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
        <motion.span
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current"
          animate={{ scaleY: active ? 0 : 1 }}
          transition={{
            duration: motionDisabled ? 0 : 0.2,
            ease: stateEase,
          }}
        />
      </span>
    </span>
  );
}

export function AccessoryRail() {
  const reduceMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const keyboardInteractionRef = useRef(false);
  const mobileTriggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mobileMeasureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const autoResumeTimerRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [desktopPaused, setDesktopPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [mobilePanelHeight, setMobilePanelHeight] = useState<number | null>(null);
  const [mobileAccordionHeight, setMobileAccordionHeight] = useState<number | null>(null);
  const activeItem = accessories[active];
  const activePastel = accessoryPastels[active % accessoryPastels.length];
  const motionDisabled = Boolean(reduceMotion || keyboardInteractionRef.current);
  const autoPaused = desktopPaused || interactionPaused;
  const isInView = useInView(railRef, { amount: 0.25 });
  const stateTransition = {
    duration: motionDisabled ? 0 : 0.2,
    ease: stateEase,
  };

  useLayoutEffect(() => {
    const triggers = mobileTriggerRefs.current.filter(
      (trigger): trigger is HTMLButtonElement => Boolean(trigger),
    );
    const measurements = mobileMeasureRefs.current.filter(
      (measurement): measurement is HTMLDivElement => Boolean(measurement),
    );

    if (triggers.length === 0 || measurements.length === 0) return;

    const updateMeasurements = () => {
      const panelHeight = Math.ceil(
        Math.max(
          ...measurements.map(
            (measurement) => measurement.getBoundingClientRect().height,
          ),
        ),
      );
      const triggerHeight = Math.ceil(
        triggers.reduce(
          (total, trigger) => total + trigger.getBoundingClientRect().height,
          0,
        ),
      );

      if (panelHeight <= 0 || triggerHeight <= 0) return;

      setMobilePanelHeight((current) =>
        current === panelHeight ? current : panelHeight,
      );
      setMobileAccordionHeight((current) => {
        const nextHeight = triggerHeight + panelHeight + accessories.length;
        return current === nextHeight ? current : nextHeight;
      });
    };

    updateMeasurements();

    const observer = new ResizeObserver(updateMeasurements);
    triggers.forEach((trigger) => observer.observe(trigger));
    measurements.forEach((measurement) => observer.observe(measurement));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || autoPaused || !isInView) return;

    const timeoutId = window.setTimeout(() => {
      keyboardInteractionRef.current = false;
      setActive((current) => (current + 1) % accessories.length);
    }, autoAdvanceMs);

    return () => window.clearTimeout(timeoutId);
  }, [active, autoPaused, isInView, reduceMotion]);

  useEffect(
    () => () => {
      if (autoResumeTimerRef.current !== null) {
        window.clearTimeout(autoResumeTimerRef.current);
      }
    },
    [],
  );

  const activate = (index: number, keyboard: boolean) => {
    keyboardInteractionRef.current = keyboard;
    setActive(index);
  };

  const pauseAutoTemporarily = () => {
    if (reduceMotion) return;

    setInteractionPaused(true);

    if (autoResumeTimerRef.current !== null) {
      window.clearTimeout(autoResumeTimerRef.current);
    }

    autoResumeTimerRef.current = window.setTimeout(() => {
      autoResumeTimerRef.current = null;
      setInteractionPaused(false);
    }, autoAdvanceMs);
  };

  return (
    <div ref={railRef} className="mt-7 min-w-0 lg:mt-9">
      <div className="lg:hidden">
        <div className="border-y border-black/12">
          <div
            className="relative overflow-hidden [overflow-anchor:none]"
            style={
              mobileAccordionHeight === null
                ? undefined
                : { height: mobileAccordionHeight }
            }
          >
            {accessories.map((item, index) => {
              const isActive = index === active;
              const triggerId = `accessory-mobile-trigger-${item.id}`;
              const panelId = `accessory-mobile-panel-${item.id}`;
              const itemPastel = accessoryPastels[index % accessoryPastels.length];

              return (
                <motion.div
                  key={item.id}
                  layout="position"
                  transition={{
                    layout: {
                      duration: motionDisabled ? 0 : 0.32,
                      ease: stateEase,
                    },
                  }}
                  className="border-b border-black/10 last:border-b-0"
                >
                  <button
                    ref={(node) => {
                      mobileTriggerRefs.current[index] = node;
                    }}
                    id={triggerId}
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onPointerDown={pauseAutoTemporarily}
                    onClick={(event) => {
                      if (event.detail === 0) pauseAutoTemporarily();
                      activate(index, event.detail === 0);
                    }}
                    className="group flex min-h-[76px] w-full items-center gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
                  >
                    <span className="font-ui w-8 shrink-0 text-[0.64rem] font-bold tracking-[0.16em] text-black/38">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display min-w-0 flex-1 text-[clamp(1.35rem,5.5vw,1.85rem)] font-bold leading-[0.96] text-gray-900">
                      {item.title}
                    </span>
                    <MobileAccordionIndicator
                      active={isActive}
                      motionDisabled={motionDisabled}
                    />
                  </button>

                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={false}
                    animate={{
                      height: isActive ? (mobilePanelHeight ?? "auto") : 0,
                    }}
                    transition={{
                      height: {
                        duration: motionDisabled ? 0 : 0.34,
                        ease: stateEase,
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.div
                          key={item.id}
                          initial={
                            motionDisabled ? false : { opacity: 0, y: -7 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{
                            duration: motionDisabled ? 0 : 0.22,
                            ease: stateEase,
                          }}
                          className="pb-6 pt-1"
                        >
                          <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] border border-black/10 bg-white/35">
                            <Image
                              src={item.image}
                              alt={item.alt}
                              width={800}
                              height={1000}
                              sizes="(min-width: 768px) 100vw, calc(100vw - 32px)"
                              draggable={false}
                              className="h-full w-full object-cover object-center"
                            />
                            <span
                              aria-hidden="true"
                              className="absolute inset-x-0 top-0 z-10 h-1"
                              style={{ backgroundColor: itemPastel }}
                            />
                          </div>
                          <div className="pt-4">
                            <AccessoryDetails item={item} />
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}

            <div
              aria-hidden="true"
              className="pointer-events-none invisible absolute inset-x-0 top-0"
            >
              {accessories.map((item, index) => (
                <div
                  key={`measure-${item.id}`}
                  ref={(node) => {
                    mobileMeasureRefs.current[index] = node;
                  }}
                  className="pb-6 pt-1"
                >
                  <div className="aspect-[5/4] w-full rounded-[24px] border border-transparent" />
                  <div className="pt-4">
                    <AccessoryDetails item={item} interactive={false} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="hidden lg:grid lg:grid-cols-[minmax(19rem,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-12 xl:grid-cols-[minmax(22rem,0.68fr)_minmax(0,1.32fr)] xl:gap-16"
        onMouseEnter={() => setDesktopPaused(true)}
        onMouseLeave={() => setDesktopPaused(false)}
        onFocusCapture={() => setDesktopPaused(true)}
        onBlurCapture={() => setDesktopPaused(false)}
      >
        <div className="border-y border-black/12">
          {accessories.map((item, index) => {
            const isActive = index === active;
            const triggerId = `accessory-desktop-trigger-${item.id}`;
            const panelId = `accessory-desktop-panel-${item.id}`;

            return (
              <div
                key={item.id}
                className="border-b border-black/10 last:border-b-0"
              >
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onMouseEnter={() => activate(index, false)}
                  onClick={(event) => activate(index, event.detail === 0)}
                  className="group flex min-h-[82px] w-full items-center gap-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <span className="font-ui w-9 shrink-0 text-[0.64rem] font-bold tracking-[0.18em] text-black/36 transition-colors duration-150 group-hover:text-black/65">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display min-w-0 flex-1 text-[clamp(1.55rem,2.25vw,2.35rem)] font-bold leading-[0.94] text-gray-900">
                    {item.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/12 bg-white/50 text-black transition-[background-color,border-color,transform] duration-150 ease-out group-hover:border-black/25 group-hover:bg-white/80 group-active:scale-[0.96]"
                  >
                    {isActive ? (
                      <Minus size={17} strokeWidth={1.7} />
                    ) : (
                      <Plus size={17} strokeWidth={1.7} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      key={panelId}
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={
                        motionDisabled ? false : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={stateTransition}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-14 pr-4">
                        <AccessoryDetails item={item} />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div
          className="relative aspect-[5/4] overflow-hidden rounded-[32px] border border-black/10 bg-white/35 transition-colors duration-200 xl:aspect-[4/3]"
          style={{ backgroundColor: activePastel }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={activeItem.id}
              initial={
                motionDisabled
                  ? false
                  : { opacity: 0, transform: "scale(0.99)" }
              }
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0, transform: "scale(1.005)" }}
              transition={stateTransition}
              className="absolute inset-0"
            >
              <Image
                src={activeItem.image}
                alt={activeItem.alt}
                width={800}
                height={1000}
                sizes="(min-width: 1280px) 55vw, (min-width: 1024px) 52vw, 100vw"
                draggable={false}
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-10 h-1.5"
            style={{ backgroundColor: activePastel }}
          />
        </div>
      </div>

      <div className="font-ui mt-5 flex items-center gap-2.5 border-t border-black/10 pt-4 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-black/42 lg:mt-6">
        <span aria-hidden="true" className="h-px w-5 bg-black/18" />
        <p>Immagini illustrative</p>
      </div>
    </div>
  );
}
