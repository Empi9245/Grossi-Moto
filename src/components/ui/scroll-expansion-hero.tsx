"use client";

import Image from "next/image";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { animate, motion } from "framer-motion";

interface ScrollExpansionHeroProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  endOverlay?: ReactNode;
  reducedMotion?: boolean;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function ScrollExpansionHero({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend = false,
  children,
  endOverlay,
  reducedMotion = false,
}: ScrollExpansionHeroProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef(0);
  const mediaFullyExpandedRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const lastTouchMoveAtRef = useRef<number | null>(null);
  const touchVelocityRef = useRef(0);
  const touchExitArmedRef = useRef(false);
  const heroSettleUntilRef = useRef(0);
  const isScrollTransitioningRef = useRef(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const titleParts = useMemo(() => {
    if (!title) {
      return ["", ""] as const;
    }

    const words = title.trim().split(/\s+/);
    return [words[0] ?? "", words.slice(1).join(" ")] as const;
  }, [title]);

  const syncProgress = useCallback((nextProgress: number) => {
    const normalized = clamp(nextProgress, 0, 1);
    const expanded = normalized >= 1;
    const wasExpanded = mediaFullyExpandedRef.current;

    scrollProgressRef.current = normalized;
    mediaFullyExpandedRef.current = expanded;

    if (expanded && !wasExpanded) {
      heroSettleUntilRef.current = performance.now() + 280;
      touchExitArmedRef.current = false;
    } else if (!expanded) {
      heroSettleUntilRef.current = 0;
      touchExitArmedRef.current = false;
    }

    setScrollProgress(normalized);
    setShowContent(normalized >= 0.82);
  }, []);

  useEffect(() => {
    syncProgress(reducedMotion ? 1 : 0);
  }, [mediaType, reducedMotion, syncProgress]);

  const canExitHero = useCallback(
    () =>
      mediaFullyExpandedRef.current &&
      performance.now() >= heroSettleUntilRef.current,
    [],
  );

  const scrollToShowroom = useCallback((gestureVelocity = 0) => {
    if (isScrollTransitioningRef.current || !canExitHero()) {
      return;
    }

    const heroViewport = rootRef.current?.parentElement;
    const showroom = heroViewport?.nextElementSibling as HTMLElement | null;

    if (!showroom) {
      return;
    }

    const targetTop =
      window.scrollY + showroom.getBoundingClientRect().top;
    const normalizedVelocity = clamp(Math.abs(gestureVelocity), 0, 1.6);
    const duration = clamp(0.72 - normalizedVelocity * 0.07, 0.58, 0.72);

    isScrollTransitioningRef.current = true;

    void animate(window.scrollY, targetTop, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        window.scrollTo({
          top: latest,
          left: 0,
          behavior: "auto",
        });
      },
      onComplete: () => {
        window.scrollTo({
          top: targetTop,
          left: 0,
          behavior: "auto",
        });
        isScrollTransitioningRef.current = false;
      },
    });
  }, [canExitHero]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      const isAtPageTop = window.scrollY <= 5;

      if (
        mediaFullyExpandedRef.current &&
        event.deltaY < 0 &&
        isAtPageTop
      ) {
        event.preventDefault();
        syncProgress(0.92);
        return;
      }

      if (mediaFullyExpandedRef.current) {
        if (event.deltaY > 0) {
          event.preventDefault();

          if (canExitHero()) {
            scrollToShowroom(Math.abs(event.deltaY) / 24);
          }
        }
        return;
      }

      const scrollFactor = 0.0009;
      const currentProgress = scrollProgressRef.current;
      const nextProgress = currentProgress + event.deltaY * scrollFactor;

      event.preventDefault();
      syncProgress(nextProgress);

      if (event.deltaY > 0 && nextProgress >= 1) {
        // Finish the zoom first. The showroom handoff requires a later gesture,
        // so the fully expanded hero gets a short, intentional resting beat.
        return;
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
      lastTouchMoveAtRef.current = performance.now();
      touchVelocityRef.current = 0;
      touchExitArmedRef.current = mediaFullyExpandedRef.current;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      const touchY = event.touches[0]?.clientY;

      if (startY == null || touchY == null) {
        return;
      }

      const deltaY = startY - touchY;
      const now = performance.now();
      const previousMoveAt = lastTouchMoveAtRef.current ?? now;
      const elapsedMs = Math.max(now - previousMoveAt, 1);

      if (deltaY > 0) {
        const instantVelocity = deltaY / elapsedMs;
        touchVelocityRef.current =
          touchVelocityRef.current * 0.45 + instantVelocity * 0.55;
      }

      lastTouchMoveAtRef.current = now;

      if (
        mediaFullyExpandedRef.current &&
        deltaY < -20 &&
        window.scrollY <= 5
      ) {
        event.preventDefault();
        syncProgress(0.92);
        touchStartYRef.current = touchY;
        return;
      }

      if (mediaFullyExpandedRef.current) {
        if (deltaY > 0) {
          event.preventDefault();

          if (touchExitArmedRef.current && canExitHero()) {
            scrollToShowroom(touchVelocityRef.current);
          }
        }
        touchStartYRef.current = touchY;
        return;
      }

      const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
      const currentProgress = scrollProgressRef.current;
      const nextProgress = currentProgress + deltaY * scrollFactor;

      event.preventDefault();
      syncProgress(nextProgress);
      touchStartYRef.current = touchY;

      if (deltaY > 0 && nextProgress >= 1) {
        // Do not reuse the swipe that completed the zoom to leave the hero.
        // A fresh swipe keeps the final frame readable and removes the snap.
        touchExitArmedRef.current = false;
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
      lastTouchMoveAtRef.current = null;
      touchVelocityRef.current = 0;
      touchExitArmedRef.current = false;
    };

    const handleScroll = () => {
      if (!mediaFullyExpandedRef.current && window.scrollY !== 0) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [canExitHero, reducedMotion, scrollToShowroom, syncProgress]);

  const mediaWidth = 300 + scrollProgress * 650;
  const mediaHeight = 400 + scrollProgress * 200;
  const textTranslateX = scrollProgress * 180;
  const initialCopyOpacity = clamp(1 - scrollProgress * 1.45, 0, 1);
  const endOverlayProgress = reducedMotion
    ? 1
    : clamp((scrollProgress - 0.9) / 0.1, 0, 1);

  return (
    <div
      ref={rootRef}
      className="overflow-x-hidden transition-colors duration-700 ease-in-out"
    >
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: reducedMotion ? 0 : 1 }}
            animate={{ opacity: reducedMotion ? 0 : 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt=""
              width={1920}
              height={1080}
              className="h-screen w-screen object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,11,0.62)_0%,rgba(8,11,15,0.2)_38%,rgba(4,6,9,0.58)_100%)]" />
          </motion.div>

          <div className="relative z-10 flex w-full flex-col items-center justify-start">
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center">
              <div
                className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl transition-none"
                style={{
                  width: reducedMotion ? "100vw" : `${mediaWidth}px`,
                  height: reducedMotion ? "100dvh" : `${mediaHeight}px`,
                  maxWidth: reducedMotion ? "100vw" : "95vw",
                  maxHeight: reducedMotion ? "100dvh" : "85vh",
                  borderRadius: reducedMotion ? 0 : undefined,
                  boxShadow: reducedMotion
                    ? "none"
                    : "0 24px 70px rgba(0, 0, 0, 0.3)",
                }}
              >
                {mediaType === "video" ? (
                  <div className="pointer-events-none relative h-full w-full">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay={!reducedMotion}
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="h-full w-full scale-[1.08] object-cover object-center"
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/30"
                      initial={{ opacity: 0.7 }}
                      animate={{
                        opacity: reducedMotion
                          ? 0.28
                          : 0.5 - scrollProgress * 0.3,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      width={1280}
                      height={720}
                      className="h-full w-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/50"
                      initial={{ opacity: 0.7 }}
                      animate={{
                        opacity: reducedMotion
                          ? 0.3
                          : 0.7 - scrollProgress * 0.3,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}
              </div>

              {!reducedMotion ? (
                <div
                  className={`relative z-10 flex w-full flex-col items-center justify-center gap-2 px-6 text-center transition-none ${
                    textBlend ? "mix-blend-difference" : "mix-blend-normal"
                  }`}
                  style={{ opacity: initialCopyOpacity }}
                >
                  {date ? (
                    <p
                      className="font-ui mb-3 text-[0.64rem] font-medium uppercase tracking-[0.22em] text-white/75"
                      style={{
                        transform: `translateX(-${textTranslateX}vw)`,
                      }}
                    >
                      {date}
                    </p>
                  ) : null}

                  <motion.h2
                    className="font-display max-w-[19rem] text-[clamp(2.5rem,12vw,3.8rem)] leading-[0.92] font-normal tracking-normal text-white"
                    style={{
                      transform: `translateX(-${textTranslateX}vw)`,
                    }}
                  >
                    {titleParts[0]}
                  </motion.h2>

                  {titleParts[1] ? (
                    <motion.h2
                      className="font-display max-w-[19rem] text-[clamp(2.5rem,12vw,3.8rem)] leading-[0.92] font-normal tracking-normal text-white"
                      style={{
                        transform: `translateX(${textTranslateX}vw)`,
                      }}
                    >
                      {titleParts[1]}
                    </motion.h2>
                  ) : null}

                  {scrollToExpand ? (
                    <p
                      className="font-ui mt-4 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-white/80"
                      style={{
                        transform: `translateX(${textTranslateX}vw)`,
                      }}
                    >
                      {scrollToExpand}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {endOverlay ? (
                <motion.div
                  className="absolute inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-20 flex justify-center px-4"
                  initial={false}
                  animate={{
                    opacity: endOverlayProgress,
                    y: 14 * (1 - endOverlayProgress),
                    scale: 0.985 + endOverlayProgress * 0.015,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.24,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    pointerEvents:
                      endOverlayProgress >= 0.94 ? "auto" : "none",
                  }}
                >
                  {endOverlay}
                </motion.div>
              ) : null}
            </div>

            {children ? (
              <motion.section
                className="flex w-full flex-col px-8 py-10 md:px-16 lg:py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.7 }}
              >
                {children}
              </motion.section>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
