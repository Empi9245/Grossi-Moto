"use client";

import { ArrowUpRight, CalendarCheck } from "lucide-react";
import { motion, type MotionProps, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { BottomLeftCard } from "./BottomLeftCard";
import { BottomRightCorner } from "./BottomRightCorner";
import { HeroBadge } from "./HeroBadge";
import { Navbar } from "./Navbar";
import { revealMotion, subtleHover } from "./motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type HeroProps = {
  cardAriaHidden?: boolean;
  cardMotion?: MotionProps;
};

export function Hero({ cardAriaHidden, cardMotion }: HeroProps = {}) {
  const shouldReduceMotion = useReducedMotion();
  const isDesktopViewport = useMediaQuery("(min-width: 1024px)");
  const { style: cardMotionStyle, ...cardMotionProps } = cardMotion ?? {};
  const touchY = useRef<number | null>(null);

  // The existing desktop stage clips to one viewport. Let enlarged content
  // scroll inside the hero before passing the gesture back to that stage.
  const canScrollContent = (element: HTMLDivElement, deltaY: number) =>
    Boolean(cardMotion) &&
    (deltaY > 0
      ? element.scrollTop + element.clientHeight < element.scrollHeight - 1
      : deltaY < 0 && element.scrollTop > 0);

  return (
    <div
      data-qa="hero-viewport"
      data-contained={cardMotion ? "true" : undefined}
      onWheelCapture={(event) => {
        if (canScrollContent(event.currentTarget, event.deltaY)) {
          event.stopPropagation();
        }
      }}
      onTouchStartCapture={(event) => {
        touchY.current =
          event.touches.length === 1 ? event.touches[0].clientY : null;
      }}
      onTouchMoveCapture={(event) => {
        const nextY =
          event.touches.length === 1 ? event.touches[0].clientY : null;
        if (
          nextY !== null &&
          touchY.current !== null &&
          canScrollContent(event.currentTarget, touchY.current - nextY)
        ) {
          event.stopPropagation();
        }
        touchY.current = nextY;
      }}
      onTouchEndCapture={() => {
        touchY.current = null;
      }}
      onTouchCancelCapture={() => {
        touchY.current = null;
      }}
      className="min-h-[100svh] w-full bg-[var(--page-background)] p-2 data-[contained=true]:max-h-[100svh] data-[contained=true]:overflow-y-auto sm:p-3 lg:p-4 2xl:p-5"
    >
      <motion.section
        {...cardMotionProps}
        aria-hidden={cardAriaHidden}
        data-hero-panel={cardMotion ? "true" : undefined}
        style={cardMotionStyle}
        className="relative mx-auto flex min-h-[calc(100svh-1rem)] w-full max-w-[1920px] overflow-hidden rounded-[var(--hero-card-radius)] bg-[oklch(14%_0.012_40)] [--hero-card-radius:1.35rem] sm:min-h-[calc(100svh-1.5rem)] sm:[--hero-card-radius:1.75rem] lg:min-h-[calc(100svh-2rem)] lg:[--hero-card-radius:2.5rem] 2xl:min-h-[calc(100svh-2.5rem)] 2xl:[--hero-card-radius:3rem]"
      >
        <div className="relative flex w-full min-w-0 flex-col">
          <video
            className="absolute inset-0 z-0 h-full w-full scale-[1.04] object-cover object-[58%_center] lg:object-center"
            autoPlay={isDesktopViewport && !shouldReduceMotion}
            muted
            loop
            playsInline
            poster="/grossimoto/home-scroll/01-people-s-125-abs-lago.jpg"
            preload={isDesktopViewport ? "metadata" : "none"}
            aria-hidden="true"
          >
            <source src="/video%20hero/videoplayback.mp4" type="video/mp4" />
          </video>

          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,oklch(10%_0.012_40/0.78)_0%,oklch(13%_0.014_40/0.45)_34%,oklch(12%_0.012_40/0.66)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_18%_82%,oklch(36%_0.09_28/0.28)_0%,oklch(36%_0.09_28/0.12)_24%,transparent_52%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-[3] h-44 bg-[linear-gradient(180deg,oklch(8%_0.012_40/0.72),transparent)]"
          />

          <div className="relative z-10 flex w-full flex-1 flex-col">
            <Navbar />

            <div
              data-qa="hero-copy"
              className="mx-auto flex min-w-0 w-full max-w-[78rem] flex-1 flex-col items-center px-5 pt-[clamp(1rem,3svh,2.5rem)] pb-8 text-center xl:pb-6 sm:px-7 md:px-8 xl:pt-[clamp(1.5rem,5svh,5rem)]"
            >
              <HeroBadge />

              <motion.h1
                {...revealMotion(shouldReduceMotion, {
                  delay: 0.12,
                  duration: 0.72,
                  scale: 0.975,
                  y: 22,
                })}
                className="font-display mt-4 w-full max-w-[20rem] [overflow-wrap:break-word] text-[clamp(2.85rem,12vw,4.35rem)] leading-[0.98] font-normal tracking-normal text-[oklch(95%_0.01_80)] sm:mt-5 sm:max-w-[38rem] md:max-w-[54rem] md:text-[clamp(4.5rem,7.8vw,6.5rem)] lg:max-w-[72rem] lg:text-[clamp(5.25rem,6.6vw,7.5rem)]"
              >
                Trova lo scooter giusto per Roma
              </motion.h1>

              <motion.p
                {...revealMotion(shouldReduceMotion, {
                  delay: 0.2,
                  duration: 0.6,
                  scale: 0.99,
                  y: 16,
                })}
                className="mt-5 w-full max-w-[22rem] [overflow-wrap:break-word] text-sm leading-[2] text-[oklch(84%_0.012_78)] sm:max-w-[44rem] sm:text-base sm:leading-[1.75] md:text-lg md:leading-[1.56]"
              >
                KYMCO e Voge, consulenza in showroom, accessori e assistenza in
                officina. Via Festo Porzio 22.
              </motion.p>

              <motion.div
                data-qa="hero-actions"
                {...revealMotion(shouldReduceMotion, {
                  delay: 0.28,
                  duration: 0.58,
                  scale: 0.99,
                  y: 14,
                })}
                className="mt-7 flex min-w-0 w-full max-w-[22rem] flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center [&>a]:max-w-full [&>a]:[overflow-wrap:anywhere] [&_svg]:shrink-0"
              >
                <motion.a
                  href="/scooters"
                  {...subtleHover(shouldReduceMotion)}
                  className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(93%_0.012_78)] px-4 py-3 text-sm leading-normal font-medium sm:px-6 text-[oklch(17%_0.012_40)] shadow-[0_16px_48px_rgba(13,9,7,0.24)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(84%_0.04_72)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(14%_0.012_40)] sm:text-base"
                >
                  Confronta la gamma
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </motion.a>

                <motion.a
                  href="tel:+393289185029"
                  {...subtleHover(shouldReduceMotion)}
                  className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(11%_0.012_40/0.78)] px-4 py-3 text-sm leading-normal font-medium sm:px-6 text-[oklch(94%_0.01_80)] shadow-[inset_0_0_0_1px_oklch(94%_0.01_80/0.16)] transition-colors duration-200 hover:bg-[oklch(15%_0.012_40/0.84)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(84%_0.04_72)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(14%_0.012_40)] sm:text-base"
                >
                  Parla con un consulente
                  <CalendarCheck
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </motion.a>
              </motion.div>
            </div>

            {/* A separate flow row reserves real space below both primary actions. */}
            <div className="flex shrink-0 flex-wrap items-end justify-between gap-x-8 [&>[data-qa=bottom-right-corner]]:relative [&>[data-qa=bottom-right-corner]]:ml-auto">
              <BottomLeftCard />
              <BottomRightCorner />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
