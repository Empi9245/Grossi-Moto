"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StackedShowroomCards } from "@/components/ui/stacked-showroom-cards";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";

import { usePageTransition } from "@/components/transitions/PageTransitionProvider";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import { showcaseScooters } from "@/data/showcase-scooters";

type ScooterShowcaseProps = {
  mode?: "pinned" | "reveal" | "static";
};

const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const scooterTransitionDuration = 0.72;
const scooterCopyTransitionDuration = 0.24;
const scooterSurfaceTransitionDuration = 0.32;
const scooterEnterDistanceVh = 72;
const scooterExitDistanceVh = 78;
const scooterEnterScale = 0.83;
const scooterExitScale = 0.87;
const wheelIntentThreshold = 18;
const wheelGestureResetMs = 140;
const touchIntentThreshold = 10;

type ShowcaseStyle = CSSProperties & Record<`--${string}`, string>;
type ShowcaseDirection = 1 | -1;

function clampIndex(index: number) {
  return Math.min(showcaseScooters.length - 1, Math.max(0, index));
}

export function ScooterShowcase({
  mode = "pinned",
}: ScooterShowcaseProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const wheelGestureConsumedRef = useRef(false);
  const lastWheelEventAtRef = useRef(0);
  const wheelIntentRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] =
    useState<ShowcaseDirection>(1);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const getSectionTop = useCallback(() => {
    const container = containerRef.current;

    if (!container) {
      return window.scrollY;
    }

    return window.scrollY + container.getBoundingClientRect().top;
  }, []);

  const getStepHeight = useCallback(() => {
    const container = containerRef.current;

    if (!container) {
      return window.innerHeight;
    }

    return container.getBoundingClientRect().height / showcaseScooters.length;
  }, []);

  const getAnchorTop = useCallback(
    (index: number) => getSectionTop() + clampIndex(index) * getStepHeight(),
    [getSectionTop, getStepHeight],
  );

  const isPinnedViewport = useCallback(() => {
    const sectionTop = getSectionTop();
    const lastAnchorTop =
      sectionTop + getStepHeight() * (showcaseScooters.length - 1);

    return window.scrollY >= sectionTop - 2 && window.scrollY <= lastAnchorTop + 2;
  }, [getSectionTop, getStepHeight]);

  const setIndexImmediately = useCallback((index: number) => {
    const nextIndex = clampIndex(index);
    const currentIndex = activeIndexRef.current;

    if (nextIndex === currentIndex) {
      return;
    }

    setTransitionDirection(nextIndex > currentIndex ? 1 : -1);
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  }, []);

  const settleScrollAtIndex = useCallback(
    (index: number) => {
      window.scrollTo({
        top: getAnchorTop(index),
        left: 0,
        behavior: "auto",
      });
    },
    [getAnchorTop],
  );

  const animateToIndex = useCallback(
    (index: number) => {
      const targetIndex = clampIndex(index);

      if (isAnimatingRef.current || targetIndex === activeIndexRef.current) {
        return;
      }

      const direction: ShowcaseDirection =
        targetIndex > activeIndexRef.current ? 1 : -1;

      isAnimatingRef.current = true;
      setTransitionDirection(direction);
      activeIndexRef.current = targetIndex;
      setActiveIndex(targetIndex);
      settleScrollAtIndex(targetIndex);
    },
    [settleScrollAtIndex],
  );

  const handleScooterTransitionComplete = useCallback((index: number) => {
    if (!isAnimatingRef.current || index !== activeIndexRef.current) {
      return;
    }

    isAnimatingRef.current = false;
  }, []);

  const requestStep = useCallback(
    (direction: 1 | -1) => {
      const currentIndex = activeIndexRef.current;

      if (direction > 0 && currentIndex >= showcaseScooters.length - 1) {
        return false;
      }

      if (direction < 0 && currentIndex <= 0) {
        return false;
      }

      animateToIndex(currentIndex + direction);
      return true;
    },
    [animateToIndex],
  );

  useEffect(() => {
    if (mode !== "pinned" || shouldReduceMotion) {
      return;
    }

    const syncIndexToScrollAnchor = () => {
      if (isAnimatingRef.current) {
        return;
      }

      const rawIndex = (window.scrollY - getSectionTop()) / getStepHeight();

      if (rawIndex < -0.08 || rawIndex > showcaseScooters.length - 1 + 0.9) {
        return;
      }

      const nextIndex = clampIndex(Math.round(rawIndex));

      if (nextIndex !== activeIndexRef.current) {
        setIndexImmediately(nextIndex);
      }
    };

    syncIndexToScrollAnchor();
    window.addEventListener("scroll", syncIndexToScrollAnchor, { passive: true });
    window.addEventListener("resize", syncIndexToScrollAnchor);

    return () => {
      window.removeEventListener("scroll", syncIndexToScrollAnchor);
      window.removeEventListener("resize", syncIndexToScrollAnchor);
    };
  }, [
    getSectionTop,
    getStepHeight,
    mode,
    setIndexImmediately,
    shouldReduceMotion,
  ]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || mode !== "pinned" || shouldReduceMotion) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      if (!isPinnedViewport()) {
        return;
      }

      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
        return;
      }

      const now = performance.now();

      if (now - lastWheelEventAtRef.current > wheelGestureResetMs) {
        wheelGestureConsumedRef.current = false;
        wheelIntentRef.current = 0;
      }

      lastWheelEventAtRef.current = now;

      if (isAnimatingRef.current || wheelGestureConsumedRef.current) {
        event.preventDefault();
        return;
      }

      if (
        wheelIntentRef.current !== 0 &&
        Math.sign(wheelIntentRef.current) !== Math.sign(event.deltaY)
      ) {
        wheelIntentRef.current = 0;
      }

      wheelIntentRef.current += event.deltaY;

      if (Math.abs(wheelIntentRef.current) < wheelIntentThreshold) {
        event.preventDefault();
        return;
      }

      const direction = wheelIntentRef.current > 0 ? 1 : -1;

      if (requestStep(direction)) {
        wheelGestureConsumedRef.current = true;
        wheelIntentRef.current = 0;
        event.preventDefault();
        return;
      }

      wheelIntentRef.current = 0;
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!isPinnedViewport() || event.touches.length !== 1) {
        touchStartYRef.current = null;
        return;
      }

      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!isPinnedViewport()) {
        return;
      }

      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      const startY = touchStartYRef.current;
      const currentY = event.touches[0]?.clientY;

      if (startY == null || currentY == null) {
        return;
      }

      const deltaY = startY - currentY;

      if (Math.abs(deltaY) <= touchIntentThreshold) {
        return;
      }

      const direction = deltaY > 0 ? 1 : -1;

      if (requestStep(direction)) {
        event.preventDefault();
        touchStartYRef.current = currentY;
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
    };
  }, [
    isPinnedViewport,
    mode,
    requestStep,
    shouldReduceMotion,
  ]);

  if (mode === "static" || shouldReduceMotion) {
    return <StaticShowcase />;
  }

  if (mode === "reveal") {
    return (
      <section
        aria-hidden="true"
        className="relative h-[100svh] overflow-hidden"
        data-showcase-mode="reveal"
        style={{ background: showcaseScooters[0]?.backgroundSurface }}
      >
        <ShowcaseFrame activeIndex={0} disableMotion />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      aria-label="Showcase scooter Grossimoto"
      className="relative z-10 bg-[var(--page-background)]"
      data-showcase-mode="pinned"
      style={{
        height: `calc(100svh * ${showcaseScooters.length})`,
        background: showcaseScooters[0]?.backgroundSurface,
      }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <ShowcaseFrame
          activeIndex={activeIndex}
          transitionDirection={transitionDirection}
          onScooterTransitionComplete={handleScooterTransitionComplete}
        />
      </div>
    </section>
  );
}

function ShowcaseFrame({
  activeIndex,
  transitionDirection = 1,
  onScooterTransitionComplete,
  disableMotion = false,
}: {
  activeIndex: number;
  transitionDirection?: ShowcaseDirection;
  onScooterTransitionComplete?: (index: number) => void;
  disableMotion?: boolean;
}) {
  const activeScooter = showcaseScooters[activeIndex] ?? showcaseScooters[0];
  const showcaseStyle: ShowcaseStyle = {
    "--showcase-bg": activeScooter.backgroundSurface,
    "--showcase-text": activeScooter.textTone,
    "--showcase-muted": activeScooter.mutedTone,
    "--showcase-inactive": activeScooter.inactiveTone,
    "--showcase-watermark": activeScooter.watermarkTone,
    "--showcase-rule": activeScooter.ruleTone,
    "--showcase-accent": activeScooter.accentTone,
    "--showcase-chip": activeScooter.chipSurface,
    "--showcase-shadow": activeScooter.shadowTone,
    background: "var(--showcase-bg)",
    color: "var(--showcase-text)",
  };
  const stats = activeScooter.specs;

  return (
    <div
      className="relative h-full overflow-hidden text-[var(--showcase-text)]"
      data-active-model={activeScooter.id}
      data-active-source={activeScooter.sourceAsset}
      style={showcaseStyle}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={`${activeScooter.id}-surface`}
          aria-hidden="true"
          className="absolute inset-0"
          initial={disableMotion ? false : { opacity: 0 }}
          animate={disableMotion ? undefined : { opacity: 1 }}
          exit={disableMotion ? undefined : { opacity: 0 }}
          transition={{
            duration: scooterSurfaceTransitionDuration,
            ease: premiumEase,
          }}
          style={{
            background: activeScooter.backgroundSurface,
            willChange: disableMotion ? undefined : "opacity",
          }}
        />
      </AnimatePresence>

      <div
        aria-hidden="true"
        className="absolute left-0 top-0 z-[1] hidden h-full w-[5.25rem] border-r border-[var(--showcase-rule)] lg:block"
      />

      <div className="relative z-10 grid h-full grid-rows-[auto_minmax(0,0.9fr)_minmax(0,1fr)] px-4 pt-5 pb-4 sm:px-6 md:px-8 lg:grid-cols-[5.25rem_minmax(0,1fr)_minmax(29rem,35vw)] lg:grid-rows-1 lg:px-0 lg:py-0 xl:grid-cols-[5.25rem_minmax(0,1.05fr)_minmax(34rem,35vw)]">
        <ModelRail activeIndex={activeIndex} />

        <div className="relative min-h-0 overflow-hidden lg:h-[100svh]">
          {disableMotion ? (
            <ScooterSlide
              activeIndex={0}
              slideIndex={0}
              direction={1}
              disableMotion
            />
          ) : (
            <AnimatePresence
              initial={false}
              mode="sync"
              custom={transitionDirection}
            >
              <ScooterSlide
                key={activeScooter.id}
                activeIndex={activeIndex}
                slideIndex={activeIndex}
                direction={transitionDirection}
                onTransitionComplete={onScooterTransitionComplete}
              />
            </AnimatePresence>
          )}
        </div>

        <aside className="relative flex min-h-0 flex-col justify-end gap-4 pt-3 lg:h-full lg:justify-center lg:pt-0 lg:pr-[clamp(2rem,5vw,6rem)]">
          <div className="relative min-h-[10.5rem] lg:min-h-[19rem]">
            <span
              aria-hidden="true"
              className="font-display pointer-events-none absolute -left-2 top-0 text-[clamp(5rem,22vw,13rem)] font-bold leading-none tracking-normal text-[var(--showcase-watermark)] lg:-left-[4rem]"
            >
              {activeScooter.watermark}
            </span>

            <p className="font-display relative z-10 block text-[clamp(2.35rem,11vw,4.8rem)] font-bold leading-[0.9] tracking-normal text-[var(--showcase-text)] lg:hidden">
              {activeScooter.shortName}
            </p>

            <ol className="relative z-10 hidden space-y-0.5 lg:block lg:space-y-1">
              {showcaseScooters.map((scooter, index) => (
                <li key={scooter.id}>
                  <span
                    className={clsx(
                      "font-display block text-[clamp(2.65rem,10vw,4.8rem)] font-bold leading-[0.9] tracking-normal transition-colors duration-300 lg:text-[clamp(3.8rem,5vw,6.2rem)]",
                      index === activeIndex
                        ? "text-[var(--showcase-text)]"
                        : "text-[var(--showcase-inactive)]",
                    )}
                  >
                    {scooter.shortName}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={`${activeScooter.id}-stats`}
                initial={disableMotion ? false : { opacity: 0, y: 10 }}
                animate={
                  disableMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: scooterCopyTransitionDuration,
                          delay: 0.08,
                          ease: premiumEase,
                        },
                      }
                }
                exit={
                  disableMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: -6,
                        transition: {
                          duration: 0.16,
                          ease: premiumEase,
                        },
                      }
                }
                style={
                  disableMotion
                    ? undefined
                    : { willChange: "opacity, transform" }
                }
              >
                <p className="max-w-[29rem] text-sm leading-6 text-[var(--showcase-muted)] sm:text-base">
                  {activeScooter.statement}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-3 lg:mt-7 lg:gap-5">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="min-w-0 border-t border-[var(--showcase-rule)] pt-2"
                    >
                      <div className="flex items-start gap-1.5">
                        <p className="font-numeric min-w-0 text-[clamp(1.35rem,5vw,2.55rem)] font-bold leading-none text-[var(--showcase-text)] lg:text-[clamp(1.7rem,2.35vw,3rem)]">
                          {stat.value}
                        </p>
                        {stat.unit ? (
                          <span className="font-ui mt-1.5 origin-left rotate-90 text-[0.55rem] font-bold uppercase tracking-[0.16em] text-[var(--showcase-muted)] lg:text-[0.62rem]">
                            {stat.unit}
                          </span>
                        ) : null}
                      </div>
                      <p className="font-ui mt-1.5 truncate text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[var(--showcase-muted)] sm:text-[0.65rem]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <TransitionLink
            href="/scooters"
            scooterId={activeScooter.id}
            className="font-ui inline-flex w-fit items-center gap-3 text-[0.74rem] font-bold uppercase tracking-[0.13em] text-[var(--showcase-text)] outline-none transition-colors duration-200 hover:text-[var(--showcase-accent)] focus-visible:ring-2 focus-visible:ring-[var(--showcase-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--page-background)] lg:absolute lg:right-[clamp(2rem,5vw,6rem)] lg:bottom-[clamp(2rem,5svh,4rem)]"
          >
            <span className="border-b border-[var(--showcase-rule)] pb-1">
              Confronta modelli
            </span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
          </TransitionLink>
        </aside>
      </div>
    </div>
  );
}

function ScooterSlide({
  activeIndex,
  slideIndex,
  direction,
  onTransitionComplete,
  disableMotion = false,
}: {
  activeIndex: number;
  slideIndex: number;
  direction: ShowcaseDirection;
  onTransitionComplete?: (index: number) => void;
  disableMotion?: boolean;
}) {
  const scooter = showcaseScooters[slideIndex] ?? showcaseScooters[0];
  const isActive = activeIndex === slideIndex;
  const shouldReduceMotion = useReducedMotion();
  const { activeScooterId, source } = usePageTransition();
  const sharedImageLayoutId =
    isActive &&
    !shouldReduceMotion &&
    source === "showroom" &&
    activeScooterId === scooter.id
      ? `scooter-image-${scooter.id}`
      : undefined;

  const scooterMotionVariants = {
    enter: (motionDirection: ShowcaseDirection) => ({
      y:
        motionDirection > 0
          ? `${scooterEnterDistanceVh}vh`
          : `-${scooterEnterDistanceVh}vh`,
      scale: scooterEnterScale,
    }),
    center: {
      y: "0vh",
      scale: 1,
    },
    exit: (motionDirection: ShowcaseDirection) => ({
      y:
        motionDirection > 0
          ? `-${scooterExitDistanceVh}vh`
          : `${scooterExitDistanceVh}vh`,
      scale: scooterExitScale,
    }),
  };

  return (
    <motion.div
      aria-hidden={!isActive}
      custom={direction}
      variants={scooterMotionVariants}
      initial={disableMotion ? false : "enter"}
      animate={disableMotion ? undefined : "center"}
      exit={disableMotion ? undefined : "exit"}
      transition={{
        y: {
          duration: scooterTransitionDuration,
          ease: premiumEase,
        },
        scale: {
          duration: scooterTransitionDuration,
          ease: premiumEase,
        },
      }}
      onAnimationComplete={() => {
        if (isActive) {
          onTransitionComplete?.(slideIndex);
        }
      }}
      className="absolute inset-0 flex items-center justify-center lg:justify-start lg:pl-[clamp(2rem,6vw,7rem)]"
      data-source-asset={scooter.sourceAsset}
      data-active-slide={isActive}
      style={{
        pointerEvents: isActive ? "auto" : "none",
        willChange: disableMotion ? undefined : "transform",
      }}
    >
      <div className="relative aspect-[4/3] w-[min(92vw,30rem)] sm:w-[min(78vw,32rem)] md:w-[min(64vw,31rem)] lg:w-[min(50vw,48rem)] xl:w-[min(48vw,54rem)]">
      <motion.div
        aria-hidden="true"
        data-shadow-for={scooter.id}
        data-active-shadow={isActive}
        className="absolute left-1/2 bottom-[6%] z-0 rounded-[50%] blur-[10px] sm:blur-[13px]"
        animate={{
          opacity: isActive ? scooter.shadowOpacity : 0,
          scale: isActive ? 1 : 0.92,
          x: `calc(-50% + ${scooter.shadowX})`,
          y: scooter.shadowY,
        }}
        transition={{ duration: 0.22, ease: premiumEase }}
        style={{
          width: scooter.shadowWidth,
          height: scooter.shadowHeight,
          background: `radial-gradient(ellipse at center, ${scooter.shadowTone} 0%, ${scooter.shadowTone} 42%, transparent 74%)`,
          transformOrigin: "center",
          willChange: isActive ? "transform, opacity" : undefined,
        }}
      />
      <div
        className="relative z-10 h-full w-full"
        data-image-offset={`${scooter.imageOffsetX},${scooter.imageOffsetY}`}
        style={{
          transform: `translate(${scooter.imageOffsetX}, ${scooter.imageOffsetY})`,
        }}
      >
        {sharedImageLayoutId ? (
          <motion.img
            layoutId={sharedImageLayoutId}
            src={scooter.image}
            alt={`Scooter ${scooter.name} in vista laterale`}
            width={500}
            height={375}
            draggable={false}
            fetchPriority={slideIndex === 0 ? "high" : "auto"}
            decoding="async"
            className="h-full w-full object-contain object-center"
          />
        ) : (
          <Image
            draggable={false}
            src={scooter.image}
            alt={`Scooter ${scooter.name} in vista laterale`}
            width={500}
            height={375}
            priority={slideIndex === 0}
            sizes="(max-width: 767px) 92vw, (max-width: 1279px) 50vw, 48vw"
            className="h-full w-full object-contain object-center"
          />
        )}
      </div>
      </div>
    </motion.div>
  );
}

function ModelRail({ activeIndex }: { activeIndex: number }) {
  return (
    <nav
      aria-label="Categorie scooter nello showcase"
      className="min-w-0 lg:flex lg:h-full lg:items-center lg:justify-center"
    >
      <ol className="flex min-w-0 gap-2 overflow-x-auto pb-1 lg:h-[54svh] lg:flex-col lg:justify-between lg:gap-0 lg:overflow-visible lg:pb-0">
        {showcaseScooters.map((scooter, index) => {
          const isActive = index === activeIndex;

          return (
            <li
              key={scooter.id}
              className={clsx(
                "font-ui flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-[0.67rem] font-bold uppercase tracking-[0.14em] transition-colors duration-300 lg:-rotate-90 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-0",
                isActive
                  ? "border-[var(--showcase-rule)] bg-[var(--showcase-chip)] text-[var(--showcase-text)]"
                  : "border-[var(--showcase-rule)] text-[var(--showcase-inactive)]",
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  "h-px w-6 transition-colors duration-300",
                  isActive
                    ? "bg-[var(--showcase-accent)]"
                    : "bg-[var(--showcase-rule)]",
                )}
              />
              {scooter.categoryLabel}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function StaticShowcase() {
  const smartphone = useMediaQuery("(max-width: 767px)");
  return (
    <section
      aria-label="Scooter in evidenza"
      className="bg-[var(--page-background)] px-4 py-14 text-[oklch(18%_0.014_56)] sm:px-6 sm:py-16 lg:px-10 lg:py-24"
      data-showcase-mode="static"
    >
      <div className="mx-auto max-w-[92rem]">
        <div className="border-t border-[oklch(20%_0.014_56/0.16)] pt-5">
          <p className="font-ui text-xs font-bold uppercase tracking-[0.18em] text-[oklch(24%_0.014_56/0.54)]">
            Gamma in evidenza
          </p>
          <h2 className="font-display mt-3 max-w-[12ch] text-[clamp(3rem,10vw,6rem)] font-bold leading-[0.92] tracking-normal text-[oklch(18%_0.014_56)]">
            Scooter in showroom
          </h2>
        </div>

        {smartphone ? (
          <div className="-mx-4 mt-8">
            <StackedShowroomCards />
          </div>
        ) : (
          <>
            <div className="hide-scrollbar -mx-4 mt-8 flex snap-x snap-proximity gap-4 overflow-x-auto overscroll-x-contain px-4 pb-3 md:mx-0 md:mt-10 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4">
              {showcaseScooters.map((scooter) => (
                <article
                  key={scooter.id}
                  className="relative w-[min(82vw,20rem)] shrink-0 snap-start overflow-hidden rounded-[1.35rem] p-4 shadow-[0_0_0_1px_oklch(20%_0.014_56/0.08),0_18px_48px_oklch(20%_0.014_56/0.08)] md:w-auto"
                  data-source-asset={scooter.sourceAsset}
                  style={{
                    background: scooter.backgroundSurface,
                    color: scooter.textTone,
                  }}
                >
                  <div className="relative aspect-[4/3]">
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 bottom-[6%] z-0 rounded-[50%] blur-[10px]"
                      style={{
                        width: scooter.shadowWidth,
                        height: scooter.shadowHeight,
                        opacity: scooter.shadowOpacity,
                        background: `radial-gradient(ellipse at center, ${scooter.shadowTone} 0%, ${scooter.shadowTone} 42%, transparent 74%)`,
                        transform: `translate(calc(-50% + ${scooter.shadowX}), ${scooter.shadowY})`,
                      }}
                    />
                    <div
                      className="relative z-10 h-full w-full"
                      style={{
                        transform: `translate(${scooter.imageOffsetX}, ${scooter.imageOffsetY})`,
                      }}
                    >
                      <Image
                        draggable={false}
                        src={scooter.image}
                        alt={`Scooter ${scooter.name} in vista laterale`}
                        width={500}
                        height={375}
                        sizes="(max-width: 767px) 92vw, (max-width: 1279px) 45vw, 23vw"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                  <div
                    className="mt-4 border-t pt-4"
                    style={{ borderColor: scooter.ruleTone }}
                  >
                    <p
                      className="font-ui text-[0.66rem] font-bold uppercase tracking-[0.16em]"
                      style={{ color: scooter.mutedTone }}
                    >
                      {scooter.categoryLabel}
                    </p>
                    <h3 className="font-display mt-2 text-3xl font-bold leading-none">
                      {scooter.name}
                    </h3>
                    <p
                      className="mt-3 text-sm leading-6"
                      style={{ color: scooter.mutedTone }}
                    >
                      {scooter.statement}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="font-ui mt-2 text-xs font-semibold text-[oklch(24%_0.014_56/0.56)] md:hidden">
              Scorri per vedere i modelli in evidenza.
            </p>
          </>
        )}

        <Link
          href="/scooters"
          className="font-ui mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(18%_0.014_56)] px-5 py-3 text-sm font-bold text-[oklch(96%_0.01_78)] transition-colors hover:bg-[oklch(26%_0.014_56)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4"
        >
          Apri tutta la gamma
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
        </Link>
      </div>
    </section>
  );
}