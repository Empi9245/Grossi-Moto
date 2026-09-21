"use client";

import {
  animate,
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import localFont from "next/font/local";

const creditsFont = localFont({ src: "../../../public/fonts/anton-latin.woff2", display: "swap", preload: false });
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

type ParallaxImage = {
  src: string;
  alt?: string;
};

type ZoomParallaxProps = {
  /** Array of images to be displayed in the parallax effect, max 9 images. */
  images?: ParallaxImage[];
};

const defaultImages: ParallaxImage[] = [
  {
    src: "/kymco-all/sections/agility-125-r16-power-up-kymco-agility125-esterne-003-scaled-kymco-agility125-esterne-003-scaled.jpg",
    alt: "Agility 125 R16 Power Up in esterno",
  },
  {
    src: "/grossimoto/home-scroll/02-dtx-360-strada.webp",
    alt: "DTX 360 350 in movimento su strada",
  },
  {
    src: "/grossimoto/home-scroll/03-agility-125-esterno.webp",
    alt: "Agility 125 R16 in esterno urbano",
  },
  {
    src: "/grossimoto/home-scroll/04-people-s-125-abs-dettaglio.webp",
    alt: "Dettaglio People S 125 ABS",
  },
  {
    src: "/grossimoto/home-scroll/05-dtx-360-dettaglio.webp",
    alt: "Dettaglio DTX 360 350",
  },
  {
    src: "/grossimoto/home-scroll/06-agility-125-urbano.webp",
    alt: "Agility 125 R16 in scenario cittadino",
  },
  {
    src: "/grossimoto/home-scroll/07-people-s-125-abs-faro.webp",
    alt: "Dettaglio frontale People S 125 ABS",
  },
  {
    src: "/kymco-all/sections/agility-125-r16-power-up-kymco-agility125-esterne-006-scaled-kymco-agility125-esterne-006-scaled.jpg",
    alt: "Agility 125 R16 Power Up in esterno",
  },
  {
    src: "/kymco-all/sections/agility-125-r16-power-up-kymco-agility125-esterne-008-scaled-kymco-agility125-esterne-008-scaled.jpg",
    alt: "Agility 125 R16 Power Up in esterno",
  },
];

function StaticParallaxFallback({ images }: { images: ParallaxImage[] }) {
  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[oklch(16%_0.014_52)] text-[oklch(96%_0.01_78)]">
      <Image
        src={
          images[0]?.src ??
          "/kymco-all/sections/agility-125-r16-power-up-kymco-agility125-esterne-003-scaled-kymco-agility125-esterne-003-scaled.jpg"
        }
        alt={images[0]?.alt ?? "Scooter in viaggio"}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,oklch(10%_0.014_42/0.74),oklch(10%_0.014_42/0.18)_62%,oklch(10%_0.014_42/0.34))]"
      />
      <div className="relative z-10 flex min-h-[100svh] items-end px-4 pb-12 sm:px-6 md:px-10 md:pb-16">
        <ExperienceCopy />
      </div>
    </div>
  );
}

const story = [
  {
    title: "Le tue strade. La tua scelta.",
    detail: "Partiamo dai tuoi tragitti. Confrontiamo insieme posizione di guida, spazio e modelli KYMCO e Voge.",
  },
  {
    title: "Un riferimento. Anche dopo.",
    detail: "La consegna è un inizio. Per tagliandi, assistenza e accessori, ritrovi Grossi Moto e la sua officina.",
  },
  {
    title: "Parliamone. Di persona.",
    detail: "Un modello in mente o ancora qualche dubbio? Ti aspettiamo in Via Festo Porzio 22, a Roma.",
  },
];

function ExperienceCopy() {
  return (
    <div className="max-w-3xl space-y-12 py-12 drop-shadow-[0_3px_20px_rgba(0,0,0,0.65)]">
      <p className="font-ui text-xs font-bold uppercase tracking-[0.18em]">Dallo showroom all’officina</p>
      {story.map(({ title, detail }, index) => (
        <div key={title}>
          {index === 0 ? (
            <h2 className="font-display text-[clamp(3rem,8vw,5rem)] font-bold leading-[0.95]">{title}</h2>
          ) : (
            <h3 className="font-display text-[clamp(2.5rem,7vw,4rem)] font-bold leading-[0.95]">{title}</h3>
          )}
          <p className="mt-5 max-w-xl text-base leading-7 text-white/85">{detail}</p>
        </div>
      ))}
    </div>
  );
}

function ExperienceContact() {
  return (
    <div className="relative bg-[var(--home-experience-surface)] px-5 py-12 text-center text-[var(--gm-ink)] sm:py-16">
      <p className="font-ui text-sm">Il prossimo passo? Raccontaci cosa cerchi.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <a href="tel:+393289185029" className="font-ui inline-flex min-h-12 items-center justify-center rounded-[0.9rem] bg-[var(--gm-black)] px-7 py-3 text-sm font-bold text-white transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">Chiama Grossi Moto</a>
        <Link href="/contatti#richiesta" className="font-ui inline-flex min-h-12 items-center justify-center rounded-[0.9rem] border border-black/25 px-7 py-3 text-sm font-bold text-black transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">Scrivici cosa cerchi</Link>
      </div>
    </div>
  );
}

const desktopZoomEnd = 0.54;
const compactZoomEnd = 0.58;
const desktopCreditsLockProgress = 0.78;
const compactCreditsLockProgress = 0.8;
const desktopCreditsHoldEndProgress = 0.84;
const compactCreditsHoldEndProgress = 0.875;
const steppedScrollEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const steppedScrollTriggerDelta = 6;
const steppedScrollCooldownMs = 260;
const steppedScrollProgressTolerance = 0.015;
const steppedScrollEntryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const steppedScrollEntryDuration = 0.68;
const steppedScrollFocusTolerancePx = 0.75;
const steppedScrollFocusSettleFrames = 2;
const creditsLockSettleFrames = 2;
const creditsLockStepDuration = 2.04;
const creditsExitStepDuration = 0.92;
const creditsReverseStepDuration = 1.18;
const creditsReverseToIntroDuration = 1.42;
const wheelGestureResetMs = 160;
const idleFloatEase: [number, number, number, number] = [0.45, 0, 0.55, 1];
const idleFloatPatterns = [
  { x: 4, y: -7, rotate: -0.18, duration: 5.8 },
  { x: 9, y: -12, rotate: 0.48, duration: 6.4 },
  { x: -8, y: 10, rotate: -0.42, duration: 5.6 },
  { x: 7, y: 9, rotate: 0.36, duration: 6.8 },
  { x: -6, y: -9, rotate: -0.3, duration: 5.9 },
  { x: 10, y: 7, rotate: 0.44, duration: 6.6 },
  { x: -7, y: -8, rotate: -0.38, duration: 5.5 },
  { x: 8, y: 11, rotate: 0.34, duration: 6.2 },
  { x: -9, y: 8, rotate: -0.46, duration: 6.9 },
] as const;

type CreditLine =
  | { kind: "eyebrow"; text: string }
  | { kind: "title"; text: string; headingLevel: 2 | 3 }
  | { kind: "detail"; text: string };

const creditLines: CreditLine[] = [
  { kind: "eyebrow", text: "Dallo showroom all’officina" },
  ...story.flatMap(({ title, detail }, index) => [
    { kind: "title" as const, text: title, headingLevel: index === 0 ? 2 as const : 3 as const },
    { kind: "detail" as const, text: detail },
  ]),
];

function AlternatingCreditLine({
  line,
  index,
  progress,
  zoomEnd,
  centerProgress,
  holdEndProgress,
}: {
  line: CreditLine;
  index: number;
  progress: MotionValue<number>;
  zoomEnd: number;
  centerProgress: number;
  holdEndProgress: number;
}) {
  const entersFromRight = index % 2 === 0;
  const lineDelay = line.kind === "title" ? 0.018 : 0.024;
  const entryStart = Math.min(
    zoomEnd + index * lineDelay,
    centerProgress - 0.1,
  );
  const x = useTransform(
    progress,
    [entryStart, centerProgress, holdEndProgress, 1],
    [
      entersFromRight ? "115vw" : "-115vw",
      "0vw",
      "0vw",
      entersFromRight ? "-115vw" : "115vw",
    ],
  );
  const y = useTransform(
    progress,
    [entryStart, centerProgress, holdEndProgress, 1],
    [entersFromRight ? 18 : -18, 0, 0, entersFromRight ? -10 : 10],
  );
  const scale = useTransform(
    progress,
    [entryStart, centerProgress, holdEndProgress, 1],
    [
      line.kind === "title" ? 0.92 : 0.98,
      1,
      1,
      line.kind === "title" ? 1.03 : 1.015,
    ],
  );
  const rotateY = useTransform(
    progress,
    [entryStart, centerProgress, holdEndProgress, 1],
    [
      entersFromRight ? 2.4 : -2.4,
      0,
      0,
      entersFromRight ? -1.8 : 1.8,
    ],
  );
  const opacity = useTransform(
    progress,
    [
      entryStart,
      Math.min(entryStart + 0.06, centerProgress),
      centerProgress,
      holdEndProgress,
      0.965,
      1,
    ],
    [0, 1, 1, 1, 1, 0],
  );

  const className =
    line.kind === "title"
      ? `${creditsFont.className} max-w-[18ch] text-[clamp(2rem,min(8vw,7svh),5.6rem)] uppercase leading-[0.94] tracking-[-0.015em] lg:text-[clamp(3rem,5.1vw,6.5rem)]`
      : line.kind === "detail"
        ? "max-w-[44rem] text-[clamp(0.78rem,1.7vw,1.1rem)] leading-[1.45] text-white/82 lg:text-[clamp(0.9rem,1.2vw,1.15rem)]"
        : "font-ui text-[0.58rem] font-bold uppercase tracking-[0.24em] text-white/82 sm:text-xs";

  const content = (
    <motion.div
      style={{ x, y, scale, rotateY, transformPerspective: 1200, opacity }}
      className="flex w-full justify-center px-5 text-center will-change-transform transform-gpu sm:px-8 lg:px-10"
    >
      {line.kind === "title" ? (
        line.headingLevel === 2 ? (
          <h2 className={className}>{line.text}</h2>
        ) : (
          <h3 className={className}>{line.text}</h3>
        )
      ) : (
        <p className={className}>{line.text}</p>
      )}
    </motion.div>
  );

  return content;
}

function CinematicCredits({
  progress,
  compact,
  zoomEnd,
  centerProgress,
  holdEndProgress,
}: {
  progress: MotionValue<number>;
  compact: boolean;
  zoomEnd: number;
  centerProgress: number;
  holdEndProgress: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-[#f4f0e8] [perspective:1200px] [text-shadow:0_4px_28px_rgba(0,0,0,0.45)] ${
          compact ? "gap-[clamp(0.5rem,1.4svh,0.85rem)] py-12" : "gap-[clamp(0.65rem,1.4svh,1.15rem)] py-10"
        }`}
      >
        {creditLines.map((line, index) => (
          <AlternatingCreditLine
            key={`${line.kind}-${line.text}`}
            line={line}
            index={index}
            progress={progress}
            zoomEnd={zoomEnd}
            centerProgress={centerProgress}
            holdEndProgress={holdEndProgress}
          />
        ))}
      </div>
    </div>
  );
}

export function ZoomParallax({ images = defaultImages }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDesktopViewport = useMediaQuery("(min-width: 1024px)");
  const introAssembledRef = useRef(false);
  const [isIntroAssembled, setIsIntroAssembled] = useState(false);
  const parallaxImages = images.slice(0, isDesktopViewport ? 9 : 1);
  const zoomEnd = isDesktopViewport ? desktopZoomEnd : compactZoomEnd;
  const creditsLockProgress = isDesktopViewport
    ? desktopCreditsLockProgress
    : compactCreditsLockProgress;
  const creditsHoldEndProgress = isDesktopViewport
    ? desktopCreditsHoldEndProgress
    : compactCreditsHoldEndProgress;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const section = container.current;

    if (!section || shouldReduceMotion) {
      return;
    }

    const creditsLockTarget = isDesktopViewport
      ? desktopCreditsLockProgress
      : compactCreditsLockProgress;
    let activeAnimation: ReturnType<typeof animate> | null = null;
    let isAnimating = false;
    let cooldownUntil = 0;
    let touchStartX: number | null = null;
    let touchStartY: number | null = null;
    let touchStepConsumed = false;
    let touchControlsSection = false;
    let wheelGestureConsumed = false;
    let wheelResetTimer: number | null = null;
    let focusSettleFrame: number | null = null;
    let stepSettleFrame: number | null = null;

    const setIntroAssembly = (next: boolean) => {
      if (introAssembledRef.current === next) {
        return;
      }

      introAssembledRef.current = next;
      setIsIntroAssembled(next);
    };

    const getSectionState = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollDistance = Math.max(
        section.offsetHeight - window.innerHeight,
        1,
      );
      const rawProgress = (window.scrollY - sectionTop) / scrollDistance;
      const progress = Math.min(1, Math.max(0, rawProgress));
      const isPinned =
        rect.top <= 4 && rect.bottom >= window.innerHeight - 4;

      return {
        isPinned,
        progress,
        rectTop: rect.top,
        scrollDistance,
        sectionTop,
      };
    };

    const getTargetProgress = (
      progress: number,
      direction: 1 | -1,
    ): number | null => {
      if (direction === 1) {
        if (
          progress <
          creditsLockTarget - steppedScrollProgressTolerance
        ) {
          return creditsLockTarget;
        }

        return 1;
      }

      if (
        progress >
        creditsLockTarget + steppedScrollProgressTolerance
      ) {
        return creditsLockTarget;
      }

      if (progress > steppedScrollProgressTolerance) {
        return 0;
      }

      return null;
    };

    const focusSection = () => {
      if (isAnimating || performance.now() < cooldownUntil) {
        return false;
      }

      const state = getSectionState();
      const entrySnapDistance = Math.min(window.innerHeight * 0.55, 520);

      if (
        state.rectTop <= 4 ||
        state.rectTop > entrySnapDistance
      ) {
        return false;
      }

      setIntroAssembly(true);
      isAnimating = true;

      const entryStartY = window.scrollY;
      const animationStart = isDesktopViewport ? 0 : entryStartY;
      const animationEnd = isDesktopViewport ? 1 : state.sectionTop;

      activeAnimation = animate(animationStart, animationEnd, {
        duration: steppedScrollEntryDuration,
        ease: steppedScrollEntryEase,
        onUpdate: (latest) => {
          const liveSectionTop =
            window.scrollY + section.getBoundingClientRect().top;
          const nextY = isDesktopViewport
            ? entryStartY + (liveSectionTop - entryStartY) * latest
            : latest;

          window.scrollTo({
            top: nextY,
            left: 0,
            behavior: "auto",
          });
        },
        onComplete: () => {
          const liveSectionTop =
            window.scrollY + section.getBoundingClientRect().top;

          window.scrollTo({
            top: isDesktopViewport ? liveSectionTop : state.sectionTop,
            left: 0,
            behavior: "auto",
          });

          activeAnimation = null;

          if (!isDesktopViewport) {
            isAnimating = false;
            cooldownUntil = performance.now() + steppedScrollCooldownMs;
            return;
          }

          let settleFramesRemaining = steppedScrollFocusSettleFrames;

          const settleDesktopFocus = () => {
            const correction = section.getBoundingClientRect().top;

            if (Math.abs(correction) > steppedScrollFocusTolerancePx) {
              window.scrollTo({
                top: window.scrollY + correction,
                left: 0,
                behavior: "auto",
              });
            }

            settleFramesRemaining -= 1;

            if (settleFramesRemaining > 0) {
              focusSettleFrame = window.requestAnimationFrame(
                settleDesktopFocus,
              );
              return;
            }

            focusSettleFrame = null;
            isAnimating = false;
            cooldownUntil = performance.now() + steppedScrollCooldownMs;
          };

          focusSettleFrame = window.requestAnimationFrame(
            settleDesktopFocus,
          );
        },
      });

      return true;
    };

    const runStep = (direction: 1 | -1) => {
      if (isAnimating || performance.now() < cooldownUntil) {
        return false;
      }

      const state = getSectionState();

      if (!state.isPinned) {
        return false;
      }

      if (!introAssembledRef.current) {
        setIntroAssembly(true);
      }

      const targetProgress = getTargetProgress(state.progress, direction);

      if (targetProgress == null) {
        return false;
      }

      const exitAdvance =
        targetProgress === 1
          ? Math.min(window.innerHeight * 0.18, 180)
          : 0;
      const unclampedTarget =
        state.sectionTop +
        state.scrollDistance * targetProgress +
        exitAdvance;
      const maxScrollY = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      );
      const targetY = Math.min(unclampedTarget, maxScrollY);
      const isFirstForwardStep =
        direction === 1 &&
        targetProgress === creditsLockTarget &&
        state.progress <
          creditsLockTarget - steppedScrollProgressTolerance;
      const duration =
        direction === -1
          ? targetProgress === 0
            ? creditsReverseToIntroDuration
            : creditsReverseStepDuration
          : targetProgress === 1
            ? creditsExitStepDuration
            : isFirstForwardStep
              ? creditsLockStepDuration
              : creditsExitStepDuration;

      const finishStep = () => {
        isAnimating = false;
        activeAnimation = null;
        cooldownUntil = performance.now() + steppedScrollCooldownMs;
      };

      isAnimating = true;
      activeAnimation = animate(window.scrollY, targetY, {
        duration,
        ease: steppedScrollEase,
        onUpdate: (latest) => {
          window.scrollTo({
            top: latest,
            left: 0,
            behavior: "auto",
          });
        },
        onComplete: () => {
          if (targetProgress !== creditsLockTarget) {
            window.scrollTo({
              top: targetY,
              left: 0,
              behavior: "auto",
            });
            finishStep();
            return;
          }

          wheelGestureConsumed = true;

          if (wheelResetTimer != null) {
            window.clearTimeout(wheelResetTimer);
          }

          wheelResetTimer = window.setTimeout(() => {
            wheelGestureConsumed = false;
            wheelResetTimer = null;
          }, wheelGestureResetMs);

          let settleFramesRemaining = creditsLockSettleFrames;

          const settleCreditsLock = () => {
            const liveState = getSectionState();
            const lockedY =
              liveState.sectionTop +
              liveState.scrollDistance * creditsLockTarget;

            window.scrollTo({
              top: lockedY,
              left: 0,
              behavior: "auto",
            });

            settleFramesRemaining -= 1;

            if (settleFramesRemaining > 0) {
              stepSettleFrame = window.requestAnimationFrame(
                settleCreditsLock,
              );
              return;
            }

            stepSettleFrame = null;
            finishStep();
          };

          stepSettleFrame = window.requestAnimationFrame(
            settleCreditsLock,
          );
        },
      });

      return true;
    };

    const onWheel = (event: WheelEvent) => {
      const isVerticalIntent =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX) &&
        Math.abs(event.deltaY) > steppedScrollTriggerDelta;

      if (!isVerticalIntent) {
        return;
      }

      if (wheelResetTimer != null) {
        window.clearTimeout(wheelResetTimer);
      }

      wheelResetTimer = window.setTimeout(() => {
        wheelGestureConsumed = false;
        wheelResetTimer = null;
      }, wheelGestureResetMs);

      if (wheelGestureConsumed) {
        event.preventDefault();
        return;
      }

      if (isAnimating || performance.now() < cooldownUntil) {
        event.preventDefault();
        return;
      }

      const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1;

      if (direction === 1 && focusSection()) {
        wheelGestureConsumed = true;
        event.preventDefault();
        return;
      }

      if (runStep(direction)) {
        wheelGestureConsumed = true;
        event.preventDefault();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        touchStartX = null;
        touchStartY = null;
        touchStepConsumed = false;
        touchControlsSection = false;
        return;
      }

      touchStartX = event.touches[0]?.clientX ?? null;
      touchStartY = event.touches[0]?.clientY ?? null;
      touchStepConsumed = false;

      if (!isDesktopViewport) {
        const rect = section.getBoundingClientRect();
        const entrySnapDistance = Math.min(window.innerHeight * 0.55, 520);
        touchControlsSection =
          rect.top <= entrySnapDistance &&
          rect.bottom >= window.innerHeight - 4;
      } else {
        touchControlsSection = false;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchStepConsumed) {
        if (touchControlsSection || isAnimating) {
          event.preventDefault();
        }
        return;
      }

      if (
        touchStartX == null ||
        touchStartY == null ||
        event.touches.length !== 1
      ) {
        if (isAnimating) {
          event.preventDefault();
        }
        return;
      }

      const currentX = event.touches[0]?.clientX;
      const currentY = event.touches[0]?.clientY;

      if (currentX == null || currentY == null) {
        return;
      }

      const deltaX = currentX - touchStartX;
      const deltaY = currentY - touchStartY;
      const isVerticalDirection = Math.abs(deltaY) > Math.abs(deltaX);
      const shouldControlTouch =
        touchControlsSection &&
        (deltaY < 0 || getSectionState().isPinned);

      if (
        shouldControlTouch &&
        isVerticalDirection &&
        Math.abs(deltaY) > steppedScrollTriggerDelta
      ) {
        event.preventDefault();
      }

      const isVerticalIntent =
        isVerticalDirection &&
        Math.abs(deltaY) > steppedScrollTriggerDelta * 2;

      if (!isVerticalIntent) {
        return;
      }

      if (isAnimating || performance.now() < cooldownUntil) {
        if (shouldControlTouch) {
          event.preventDefault();
        }
        return;
      }

      const direction: 1 | -1 = deltaY < 0 ? 1 : -1;

      if (direction === 1 && focusSection()) {
        touchStepConsumed = true;
        event.preventDefault();
        return;
      }

      if (runStep(direction)) {
        touchStepConsumed = true;
        event.preventDefault();
      }
    };

    const onTouchEnd = () => {
      touchStartX = null;
      touchStartY = null;
      touchStepConsumed = false;
      touchControlsSection = false;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }

      const activeElement = document.activeElement;
      const ownsKeyboardGesture =
        getSectionState().isPinned ||
        (activeElement instanceof Node && section.contains(activeElement));

      if (!ownsKeyboardGesture) {
        return;
      }

      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return;
      }

      let direction: 1 | -1 | null = null;

      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        (event.key === " " && !event.shiftKey)
      ) {
        direction = 1;
      } else if (
        event.key === "ArrowUp" ||
        event.key === "PageUp" ||
        (event.key === " " && event.shiftKey)
      ) {
        direction = -1;
      }

      if (direction === 1 && focusSection()) {
        event.preventDefault();
        return;
      }

      if (direction != null && runStep(direction)) {
        event.preventDefault();
      }
    };

    const syncIntroAssembly = () => {
      if (isAnimating) {
        return;
      }

      const state = getSectionState();

      if (state.rectTop > 12) {
        setIntroAssembly(false);
      } else if (state.isPinned) {
        setIntroAssembly(true);
      }
    };

    syncIntroAssembly();
    window.addEventListener("scroll", syncIntroAssembly, { passive: true });
    section.addEventListener("wheel", onWheel, {
      capture: true,
      passive: false,
    });
    section.addEventListener("touchstart", onTouchStart, {
      capture: true,
      passive: true,
    });
    section.addEventListener("touchmove", onTouchMove, {
      capture: true,
      passive: false,
    });
    section.addEventListener("touchend", onTouchEnd, {
      capture: true,
      passive: true,
    });
    section.addEventListener("touchcancel", onTouchEnd, {
      capture: true,
      passive: true,
    });
    window.addEventListener("keydown", onKeyDown, {
      capture: true,
    });

    return () => {
      activeAnimation?.stop();

      if (wheelResetTimer != null) {
        window.clearTimeout(wheelResetTimer);
      }

      if (focusSettleFrame != null) {
        window.cancelAnimationFrame(focusSettleFrame);
      }

      if (stepSettleFrame != null) {
        window.cancelAnimationFrame(stepSettleFrame);
      }

      window.removeEventListener("scroll", syncIntroAssembly);
      section.removeEventListener("wheel", onWheel, { capture: true });
      section.removeEventListener("touchstart", onTouchStart, {
        capture: true,
      });
      section.removeEventListener("touchmove", onTouchMove, {
        capture: true,
      });
      section.removeEventListener("touchend", onTouchEnd, {
        capture: true,
      });
      section.removeEventListener("touchcancel", onTouchEnd, {
        capture: true,
      });
      window.removeEventListener("keydown", onKeyDown, {
        capture: true,
      });
    };
  }, [isDesktopViewport, shouldReduceMotion]);
  // The zoom completes first; the same controlled step then carries the credits into their centered lock.
  const zoomProgress = useTransform(scrollYProgress, [0, zoomEnd], [0, 1]);
  const introExitEnd = isDesktopViewport ? 0.28 : 0.15;

  const introLeftX = useTransform(
    zoomProgress,
    [0, introExitEnd],
    ["0vw", isDesktopViewport ? "-140%" : "-70vw"],
  );
  const introRightX = useTransform(
    zoomProgress,
    [0, introExitEnd],
    ["0vw", isDesktopViewport ? "140%" : "70vw"],
  );
  const introOpacity = useTransform(
    zoomProgress,
    isDesktopViewport ? [0.14, 0.34] : [0.15, 0.37],
    [1, 0],
  );

  const mobileScale = useTransform(zoomProgress, [0, 1], [1, 2.4]);
  const scale4 = useTransform(zoomProgress, [0, 1], [1, 4.08]);
  const scale5 = useTransform(zoomProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(zoomProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(zoomProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(zoomProgress, [0, 1], [1, 9]);
  const copyScrimOpacity = useTransform(
    scrollYProgress,
    isDesktopViewport ? [0.4, zoomEnd] : [0.44, zoomEnd],
    [0, 0.9],
  );

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9, scale6, scale8];
  const desktopLeadImageBorderRadius = useTransform(
    zoomProgress,
    [0, 0.88, 1],
    ["1.25rem", "1.25rem", "0rem"],
  );

  if (shouldReduceMotion) {
    return <><StaticParallaxFallback images={parallaxImages} /><ExperienceContact /></>;
  }

  return (
    <>
    <div
      ref={container}
      className="relative h-[300svh] lg:h-[400svh] bg-[var(--home-experience-surface)]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {parallaxImages.map(({ src, alt }, index) => {
          const scale = isDesktopViewport ? scales[index % scales.length] : mobileScale;
          const idlePattern =
            idleFloatPatterns[index % idleFloatPatterns.length];
          const idleStrength = isDesktopViewport ? 1 : 0.42;
          const settleDelay = isDesktopViewport ? index * 0.025 : 0;

          return (
            <motion.div
              key={src}
              style={{ scale: isDesktopViewport ? scale : 1 }}
              animate={
                isIntroAssembled
                  ? { x: 0, y: 0 }
                  : {
                      x: [
                        0,
                        idlePattern.x * idleStrength,
                        idlePattern.x * -0.45 * idleStrength,
                        0,
                      ],
                      y: [
                        0,
                        idlePattern.y * idleStrength,
                        idlePattern.y * -0.35 * idleStrength,
                        0,
                      ],
                    }
              }
              transition={
                isIntroAssembled
                  ? {
                      duration: 0.5,
                      delay: settleDelay,
                      ease: steppedScrollEntryEase,
                    }
                  : {
                      duration: idlePattern.duration,
                      repeat: Infinity,
                      ease: idleFloatEase,
                    }
              }
              className={`absolute top-0 flex h-full w-full items-center justify-center ${
                index === 0 ? "z-20" : "z-10"
              } ${
                index === 1
                  ? "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]"
                  : ""
              } ${
                index === 2
                  ? "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]"
                  : ""
              } ${
                index === 3
                  ? "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]"
                  : ""
              } ${
                index === 4
                  ? "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]"
                  : ""
              } ${
                index === 5
                  ? "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]"
                  : ""
              } ${
                index === 6
                  ? "[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]"
                  : ""
              } ${
                index === 7
                  ? "[&>div]:!-top-[27vh] [&>div]:!left-[40vw] [&>div]:!h-[24vh] [&>div]:!w-[28vw]"
                  : ""
              } ${
                index === 8
                  ? "[&>div]:!top-[1vh] [&>div]:!-left-[58vw] [&>div]:!h-[32vh] [&>div]:!w-[40vw]"
                  : ""
              }`}
            >
              <motion.div
                animate={
                  isIntroAssembled
                    ? { rotate: 0 }
                    : {
                        rotate: [
                          0,
                          idlePattern.rotate * idleStrength,
                          idlePattern.rotate * -0.65 * idleStrength,
                          0,
                        ],
                      }
                }
                transition={
                  isIntroAssembled
                    ? {
                        duration: 0.48,
                        delay: settleDelay,
                        ease: steppedScrollEntryEase,
                      }
                    : {
                        duration: idlePattern.duration * 1.08,
                        repeat: Infinity,
                        ease: idleFloatEase,
                      }
                }
                style={{
                  scale: isDesktopViewport ? 1 : mobileScale,
                  borderRadius:
                    isDesktopViewport && index === 0
                      ? desktopLeadImageBorderRadius
                      : undefined,
                }}
                className="relative h-[44svh] w-[76vw] overflow-hidden lg:h-[25vh] lg:w-[25vw] rounded-[1.25rem] bg-[oklch(18%_0.014_56)] lg:shadow-[0_24px_70px_oklch(18%_0.014_56/0.18)]"
              >
                <Image
                  src={src}
                  alt={alt ?? `Parallax image ${index + 1}`}
                  fill
                  sizes={index === 0 ? "100vw" : "50vw"}
                  className={`h-full w-full object-cover ${index === 0 ? "object-right" : ""}`}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,oklch(10%_0.014_42/0.02),oklch(10%_0.014_42/0.18))]"
                />
              </motion.div>
            </motion.div>
          );
        })}

        <motion.div
          aria-hidden="true"
          style={{ opacity: copyScrimOpacity }}
          className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(105deg,oklch(8%_0.012_42/0.84),oklch(8%_0.012_42/0.58)_56%,oklch(8%_0.012_42/0.42))] will-change-opacity"
        />

        <div className="pointer-events-none absolute inset-0 z-30 text-black">
          <motion.div
            style={{ x: introLeftX, opacity: introOpacity }}
            className="absolute left-[6vw] top-[10svh] max-w-[85vw] will-change-transform lg:left-[4vw] lg:top-[3svh] lg:max-w-[26vw]"
          >
            <p className="font-ui mb-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-black/65">Grossi Moto · Roma</p>
            <p className="font-ui text-[clamp(1.75rem,7vw,3rem)] font-bold leading-[0.95] tracking-[-0.02em] lg:text-[clamp(2rem,3.1vw,4rem)]">
              La tua prossima strada.
            </p>
          </motion.div>
          <motion.div
            style={{ x: introRightX, opacity: introOpacity }}
            className="absolute bottom-[calc(6.5rem+env(safe-area-inset-bottom))] right-[6vw] max-w-[85vw] text-right will-change-transform lg:bottom-[5svh] lg:right-[4vw] lg:max-w-[25vw]"
          >
            <p className="font-ui text-[clamp(1.75rem,7vw,3rem)] font-bold leading-[0.95] tracking-[-0.02em] lg:text-[clamp(2rem,3.6vw,4.5rem)]">Parte da qui.</p>
            <p className="font-ui mt-4 text-xs tracking-wide text-black/70">Dalla scelta del mezzo, a ogni nuovo viaggio.</p>
          </motion.div>
        </div>

        <CinematicCredits
          progress={scrollYProgress}
          compact={!isDesktopViewport}
          zoomEnd={zoomEnd}
          centerProgress={creditsLockProgress}
          holdEndProgress={creditsHoldEndProgress}
        />
      </div>
    </div>
    <ExperienceContact />
    </>
  );
}
