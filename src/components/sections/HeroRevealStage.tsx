"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  animate,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";

import { Hero } from "@/components/hero/Hero";
import { ScooterShowcase } from "@/components/sections/ScooterShowcase";
import { showcaseScooters } from "@/data/showcase-scooters";

const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const heroRevealDuration = 0.86;
const heroReverseDuration = 0.76;
const heroScrollTriggerDelta = 6;
const heroTouchTriggerDelta = 10;
const heroSyncTolerance = 2;
const heroNativeScrollCatchWindowMs = 260;
const heroNativeScrollCatchDistance = 1.05;
const firstShowcaseSurface =
  showcaseScooters[0]?.backgroundSurface ?? "var(--page-background)";
const heroCardOpenClip =
  "inset(0% 0% 0% 0% round var(--hero-card-radius))";
const heroCardClosedClip =
  "inset(0% 0% 101% 0% round var(--hero-card-radius))";

const heroCardRestState = {
  y: 0,
  opacity: 1,
  clipPath: heroCardOpenClip,
};

const heroCardRevealedState = {
  y: -8,
  opacity: 1,
  clipPath: heroCardClosedClip,
};

const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function HeroRevealStage() {
  const stageRef = useRef<HTMLElement | null>(null);
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const reverseTouchStartYRef = useRef<number | null>(null);
  const lastForwardScrollIntentAtRef = useRef(0);
  const lastReverseScrollIntentAtRef = useRef(0);
  const hasHeroRevealedRef = useRef(false);
  const isHeroAnimatingRef = useRef(false);
  const heroControls = useAnimationControls();
  const shouldReduceMotion = useReducedMotion();
  const [hasHeroRevealed, setHasHeroRevealed] = useState(false);

  const cardMotion = useMemo(
    () => ({
      initial: false as const,
      animate: heroControls,
      style: {
        transformOrigin: "center top",
        willChange: "clip-path, transform",
      },
    }),
    [heroControls],
  );

  useEffect(() => {
    hasHeroRevealedRef.current = hasHeroRevealed;
  }, [hasHeroRevealed]);

  const getShowcaseTop = useCallback(() => {
    const showcase = showcaseRef.current;

    if (!showcase) {
      return window.innerHeight;
    }

    return window.scrollY + showcase.getBoundingClientRect().top;
  }, []);

  const getStageTop = useCallback(() => {
    const stage = stageRef.current;

    if (!stage) {
      return 0;
    }

    return window.scrollY + stage.getBoundingClientRect().top;
  }, []);

  const isHeroTriggerArea = useCallback(() => {
    const stage = stageRef.current;

    if (!stage) {
      return false;
    }

    const stageRect = stage.getBoundingClientRect();
    const showcaseTop = getShowcaseTop();

    return (
      stageRect.top <= 4 &&
      stageRect.bottom > window.innerHeight * 1.02 &&
      window.scrollY < showcaseTop - 4
    );
  }, [getShowcaseTop]);

  const markForwardScrollIntent = useCallback(() => {
    lastForwardScrollIntentAtRef.current = Date.now();
  }, []);

  const markReverseScrollIntent = useCallback(() => {
    lastReverseScrollIntentAtRef.current = Date.now();
  }, []);

  const hasRecentForwardScrollIntent = useCallback(
    () =>
      Date.now() - lastForwardScrollIntentAtRef.current <=
      heroNativeScrollCatchWindowMs,
    [],
  );

  const hasRecentReverseScrollIntent = useCallback(
    () =>
      Date.now() - lastReverseScrollIntentAtRef.current <=
      heroNativeScrollCatchWindowMs,
    [],
  );

  const revealHero = useCallback(async () => {
    if (
      shouldReduceMotion ||
      isHeroAnimatingRef.current ||
      hasHeroRevealedRef.current
    ) {
      return;
    }

    const targetTop = getShowcaseTop();

    isHeroAnimatingRef.current = true;

    const scrollControls = animate(window.scrollY, targetTop, {
      duration: heroRevealDuration,
      ease: premiumEase,
      onUpdate: (latest) => {
        window.scrollTo({
          top: latest,
          left: 0,
          behavior: "auto",
        });
      },
    });

    try {
      await Promise.all([
        heroControls.start({
          ...heroCardRevealedState,
          transition: {
            duration: heroRevealDuration,
            ease: premiumEase,
          },
        }),
        scrollControls,
      ]);

      window.scrollTo({
        top: getShowcaseTop(),
        left: 0,
        behavior: "auto",
      });

      hasHeroRevealedRef.current = true;
      setHasHeroRevealed(true);
    } finally {
      isHeroAnimatingRef.current = false;
    }
  }, [
    getShowcaseTop,
    heroControls,
    shouldReduceMotion,
  ]);

  const restoreHero = useCallback(async () => {
    if (
      shouldReduceMotion ||
      isHeroAnimatingRef.current ||
      !hasHeroRevealedRef.current
    ) {
      return;
    }

    const targetTop = getStageTop();

    isHeroAnimatingRef.current = true;

    const scrollControls = animate(window.scrollY, targetTop, {
      duration: heroReverseDuration,
      ease: premiumEase,
      onUpdate: (latest) => {
        window.scrollTo({
          top: latest,
          left: 0,
          behavior: "auto",
        });
      },
    });

    try {
      await Promise.all([
        heroControls.start({
          ...heroCardRestState,
          transition: {
            duration: heroReverseDuration,
            ease: premiumEase,
          },
        }),
        scrollControls,
      ]);

      window.scrollTo({
        top: getStageTop(),
        left: 0,
        behavior: "auto",
      });

      hasHeroRevealedRef.current = false;
      setHasHeroRevealed(false);
    } finally {
      isHeroAnimatingRef.current = false;
    }
  }, [
    getStageTop,
    heroControls,
    shouldReduceMotion,
  ]);

  useBrowserLayoutEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const syncHeroStateToScroll = (force = false) => {
      if (isHeroAnimatingRef.current) {
        return;
      }

      const scrollY = window.scrollY;
      const stageTop = getStageTop();
      const showcaseTop = getShowcaseTop();
      const reverseCatchStart =
        showcaseTop - window.innerHeight * heroNativeScrollCatchDistance;
      const isBeforeShowcase = scrollY < showcaseTop - heroSyncTolerance;
      const isNearShowcaseStart =
        Math.abs(scrollY - showcaseTop) <= window.innerHeight * 0.12;

      if (isBeforeShowcase) {
        if (
          !force &&
          hasHeroRevealedRef.current &&
          hasRecentReverseScrollIntent() &&
          scrollY >= stageTop - heroSyncTolerance &&
          scrollY >= reverseCatchStart
        ) {
          void restoreHero();
          return;
        }

        if (force || hasHeroRevealedRef.current) {
          hasHeroRevealedRef.current = false;
          setHasHeroRevealed(false);
          heroControls.set(heroCardRestState);
        }

        return;
      }

      if (force || !hasHeroRevealedRef.current) {
        if (
          !force &&
          !hasHeroRevealedRef.current &&
          hasRecentForwardScrollIntent() &&
          isNearShowcaseStart
        ) {
          void revealHero();
          return;
        }

        hasHeroRevealedRef.current = true;
        setHasHeroRevealed(true);
        heroControls.set(heroCardRevealedState);
      }
    };

    const syncHeroStateOnScroll = () => syncHeroStateToScroll(false);
    const syncHeroStateToScrollForced = () => syncHeroStateToScroll(true);
    const syncHeroStateAfterPageShow = () => {
      isHeroAnimatingRef.current = false;
      touchStartYRef.current = null;
      reverseTouchStartYRef.current = null;
      requestAnimationFrame(syncHeroStateToScrollForced);
    };

    syncHeroStateToScrollForced();
    const rafId = requestAnimationFrame(() => {
      syncHeroStateToScrollForced();
    });
    window.addEventListener("scroll", syncHeroStateOnScroll, { passive: true });
    window.addEventListener("resize", syncHeroStateToScrollForced);
    window.addEventListener("pageshow", syncHeroStateAfterPageShow);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", syncHeroStateOnScroll);
      window.removeEventListener("resize", syncHeroStateToScrollForced);
      window.removeEventListener("pageshow", syncHeroStateAfterPageShow);
    };
  }, [
    getShowcaseTop,
    getStageTop,
    hasRecentForwardScrollIntent,
    hasRecentReverseScrollIntent,
    heroControls,
    restoreHero,
    revealHero,
    shouldReduceMotion,
  ]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const preventScrollDuringHeroAnimation = (event: WheelEvent | TouchEvent) => {
      if (isHeroAnimatingRef.current) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScrollDuringHeroAnimation, {
      capture: true,
      passive: false,
    });
    window.addEventListener("touchmove", preventScrollDuringHeroAnimation, {
      capture: true,
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", preventScrollDuringHeroAnimation, {
        capture: true,
      });
      window.removeEventListener("touchmove", preventScrollDuringHeroAnimation, {
        capture: true,
      });
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const isAtShowcaseStart = () => {
      const showcaseTop = getShowcaseTop();

      return (
        hasHeroRevealedRef.current &&
        window.scrollY >= showcaseTop - 2 &&
        window.scrollY <= showcaseTop + window.innerHeight * 0.18
      );
    };

    const onWheel = (event: WheelEvent) => {
      const isReverseIntent =
        event.deltaY < -heroScrollTriggerDelta &&
        Math.abs(event.deltaY) >= Math.abs(event.deltaX);

      if (isReverseIntent) {
        markReverseScrollIntent();
      }

      if (isHeroAnimatingRef.current || !isAtShowcaseStart()) {
        return;
      }

      if (isReverseIntent) {
        event.preventDefault();
        void restoreHero();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!isAtShowcaseStart() || event.touches.length !== 1) {
        reverseTouchStartYRef.current = null;
        return;
      }

      reverseTouchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (isHeroAnimatingRef.current || !isAtShowcaseStart()) {
        return;
      }

      const startY = reverseTouchStartYRef.current;
      const currentY = event.touches[0]?.clientY;

      if (startY == null || currentY == null) {
        return;
      }

      if (currentY - startY > heroTouchTriggerDelta) {
        markReverseScrollIntent();
        event.preventDefault();
        reverseTouchStartYRef.current = null;
        void restoreHero();
      }
    };

    window.addEventListener("wheel", onWheel, {
      capture: true,
      passive: false,
    });
    window.addEventListener("touchstart", onTouchStart, {
      capture: true,
      passive: true,
    });
    window.addEventListener("touchmove", onTouchMove, {
      capture: true,
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart, { capture: true });
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
    };
  }, [
    getShowcaseTop,
    markReverseScrollIntent,
    restoreHero,
    shouldReduceMotion,
  ]);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage || shouldReduceMotion) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      const isForwardIntent =
        event.deltaY > heroScrollTriggerDelta &&
        Math.abs(event.deltaY) >= Math.abs(event.deltaX);

      if (isForwardIntent) {
        markForwardScrollIntent();
      }

      if (!isHeroTriggerArea()) {
        return;
      }

      if (isHeroAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      if (!hasHeroRevealedRef.current && isForwardIntent) {
        event.preventDefault();
        void revealHero();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!isHeroTriggerArea() || event.touches.length !== 1) {
        touchStartYRef.current = null;
        return;
      }

      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!isHeroTriggerArea()) {
        return;
      }

      if (isHeroAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      const startY = touchStartYRef.current;
      const currentY = event.touches[0]?.clientY;

      if (startY == null || currentY == null) {
        return;
      }

      if (!hasHeroRevealedRef.current && startY - currentY > heroTouchTriggerDelta) {
        markForwardScrollIntent();
        event.preventDefault();
        touchStartYRef.current = null;
        void revealHero();
      }
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
    };
  }, [
    isHeroTriggerArea,
    markForwardScrollIntent,
    revealHero,
    shouldReduceMotion,
  ]);

  if (shouldReduceMotion) {
    return (
      <>
        <Hero />
        <ScooterShowcase mode="static" />
      </>
    );
  }

  return (
    <>
      <section
        ref={stageRef}
        className="relative h-[200svh]"
        data-hero-reveal-stage="true"
        style={{ background: firstShowcaseSurface }}
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden [perspective:1400px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0"
            style={{ background: firstShowcaseSurface }}
          />

          <div
            className="absolute inset-0 z-20 h-[100svh]"
            style={{
              pointerEvents: hasHeroRevealed ? "none" : "auto",
            }}
          >
            <Hero
              cardAriaHidden={hasHeroRevealed}
              cardMotion={cardMotion}
            />
          </div>
        </div>
      </section>

      <div ref={showcaseRef} className="relative z-10 -mt-[100svh]">
        <ScooterShowcase />
      </div>
    </>
  );
}
