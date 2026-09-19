"use client";

import { DirectionMark, DisclosureMark } from "@/components/ui/control-glyphs";
import Image from "next/image";
import { PhoneCall } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

export type Service = {
  title: string;
  statement: string;
  description: string;
  features: string[];
  image: string;
  alt: string;
};

gsap.registerPlugin(useGSAP);

const stackShadeStep = 0.055;
const stackRotationStep = 1.35;
const stackTiltStep = 2.4;
const maxVisibleDepth = 5;
const mobileSwipeThreshold = 36;
const mobileTapTolerance = 10;

function stackLayer(slot: number) {
  return Math.min(Math.abs(slot), maxVisibleDepth);
}

function stackX(slot: number, spacing: number) {
  return slot * spacing;
}

function stackShade(layer: number) {
  return Math.min(layer * stackShadeStep, 0.28);
}

function stackRotation(slot: number) {
  return gsap.utils.clamp(-4.5, 4.5, slot * stackRotationStep);
}

function stackTilt(slot: number) {
  return gsap.utils.clamp(-7, 7, -slot * stackTiltStep);
}

export function ServiceSwipe({ services }: { services: Service[] }) {
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const mobileFocusRef = useRef<(index: number, immediate?: boolean) => void>(
    () => {},
  );
  const swipeStartRef = useRef<{
    x: number;
    y: number;
    pointerId: number;
  } | null>(null);
  const railMouseDragRef = useRef<{
    x: number;
    scrollLeft: number;
    pointerId: number;
    moved: boolean;
  } | null>(null);
  const suppressMobileTapRef = useRef(false);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [openMobileService, setOpenMobileService] = useState<number | null>(
    null,
  );
  const isTabletViewport = useMediaQuery("(min-width: 768px)");
  const isMobileViewport = !isTabletViewport;
  const shouldReduceMotion = useReducedMotion();
  const totalCards = services.length;
  const useMobileStack = isMobileViewport && !shouldReduceMotion;

  useGSAP(
    () => {
      if (!useMobileStack) return;

      const container = stackContainerRef.current;
      if (!container || totalCards < 2) return;

      let cards: HTMLElement[] = [];
      let shades: Array<HTMLElement | null> = [];
      let virtualIndexes: number[] = [];
      let position: { value: number } | null = null;
      let targetPosition = 0;
      let focusTween: gsap.core.Tween | null = null;
      let observer: ResizeObserver | null = null;
      let initFrame = 0;
      let initAttempts = 0;
      let disposed = false;

      const renderPosition = () => {
        if (!position || cards.length === 0) return;

        const cardWidth = cards[0]?.offsetWidth ?? 0;
        const containerWidth = container.clientWidth;
        if (cardWidth === 0 || containerWidth === 0) return;

        const lateralScale = 0.9;
        const cardGap = gsap.utils.clamp(12, 16, containerWidth * 0.035);
        const cardSpacing =
          cardWidth * ((1 + lateralScale) / 2) + cardGap;
        const visibleLimit = 1.14;

        cards.forEach((card, cardIndex) => {
          const slot = virtualIndexes[cardIndex] - position!.value;
          const layer = stackLayer(slot);
          const distance = Math.abs(slot);
          const opacity = distance > visibleLimit ? 0 : 1;

          gsap.set(card, {
            x: stackX(slot, cardSpacing),
            xPercent: -50,
            y: 0,
            rotation: stackRotation(slot) * 0.72,
            rotationY: stackTilt(slot) * 1.75,
            scale: 1 - Math.min(distance, 1) * (1 - lateralScale),
            opacity,
            transformPerspective: 1050,
            transformOrigin: "center center",
            force3D: true,
            zIndex: Math.round(1000 - distance * 100),
          });

          gsap.set(shades[cardIndex], {
            opacity: distance < 1.12 ? stackShade(layer) * 1.1 : 0,
          });
        });
      };

      const recenterCopies = () => {
        if (!position) return;

        if (targetPosition >= totalCards * 2) {
          targetPosition -= totalCards;
          position.value -= totalCards;
          renderPosition();
        } else if (targetPosition < totalCards) {
          targetPosition += totalCards;
          position.value += totalCards;
          renderPosition();
        }
      };

      const moveFocus = (requestedIndex: number, immediate = false) => {
        if (!position) return;

        const currentIndex = activeRef.current;
        const wrappedFocus = gsap.utils.wrap(0, totalCards, requestedIndex);

        if (immediate) {
          focusTween?.kill();
          focusTween = null;
          activeRef.current = wrappedFocus;
          setActive(wrappedFocus);
          targetPosition = totalCards + wrappedFocus;
          position.value = targetPosition;
          renderPosition();
          return;
        }

        let direction = Math.sign(requestedIndex - currentIndex);

        if (requestedIndex === totalCards && currentIndex === totalCards - 1) {
          direction = 1;
        } else if (requestedIndex === -1 && currentIndex === 0) {
          direction = -1;
        }

        if (direction === 0) return;

        focusTween?.kill();

        targetPosition += direction;
        activeRef.current = wrappedFocus;
        setActive(wrappedFocus);

        recenterCopies();

        focusTween = gsap.to(position, {
          value: targetPosition,
          duration: 0.9,
          ease: "sine.inOut",
          overwrite: true,
          onUpdate: renderPosition,
          onComplete: () => {
            if (!position) return;
            position.value = targetPosition;
            recenterCopies();
            renderPosition();
            focusTween = null;
          },
        });
      };

      const initializeStack = () => {
        if (disposed) return;

        cards = gsap.utils.toArray<HTMLElement>(
          "[data-service-stack-card]",
          container,
        );
        shades = cards.map((card) =>
          card.querySelector<HTMLElement>("[data-service-depth-shade]"),
        );
        virtualIndexes = cards.map((card) =>
          Number(card.dataset.serviceVirtualIndex),
        );

        const isReady =
          cards.length === totalCards * 3 &&
          !shades.some((shade) => !shade) &&
          !virtualIndexes.some((index) => Number.isNaN(index)) &&
          (cards[0]?.offsetWidth ?? 0) > 0 &&
          container.clientWidth > 0;

        if (!isReady) {
          initAttempts += 1;
          if (initAttempts < 60) {
            initFrame = requestAnimationFrame(initializeStack);
          }
          return;
        }

        position = { value: totalCards + activeRef.current };
        targetPosition = position.value;
        mobileFocusRef.current = moveFocus;
        renderPosition();

        observer = new ResizeObserver(renderPosition);
        observer.observe(container);
        if (cards[0]) observer.observe(cards[0]);
      };

      initFrame = requestAnimationFrame(initializeStack);

      return () => {
        disposed = true;
        cancelAnimationFrame(initFrame);
        mobileFocusRef.current = () => {};
        observer?.disconnect();
        focusTween?.kill();
        if (position) gsap.killTweensOf(position);
        gsap.killTweensOf(cards);
        shades.forEach((shade) => {
          if (shade) gsap.killTweensOf(shade);
        });
      };
    },
    {
      scope: stackContainerRef,
      dependencies: [shouldReduceMotion, totalCards, useMobileStack],
      revertOnUpdate: true,
    },
  );

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || useMobileStack) return;

    let frame = 0;

    const syncActive = () => {
      frame = 0;
      const cards = Array.from(
        rail.querySelectorAll<HTMLElement>("[data-service-card]"),
      );
      if (cards.length === 0) return;

      const railStart = rail.getBoundingClientRect().left;
      const distances = cards.map((card) =>
        Math.abs(card.getBoundingClientRect().left - railStart),
      );
      const nearest = distances.indexOf(Math.min(...distances));

      if (nearest !== activeRef.current) {
        activeRef.current = nearest;
        setActive(nearest);
      }
    };

    const scheduleSync = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncActive);
    };

    const observer = new ResizeObserver(scheduleSync);
    observer.observe(rail);
    rail
      .querySelectorAll<HTMLElement>("[data-service-card]")
      .forEach((card) => observer.observe(card));

    rail.addEventListener("scroll", scheduleSync, { passive: true });
    scheduleSync();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      rail.removeEventListener("scroll", scheduleSync);
    };
  }, [useMobileStack]);

  const goTo = (index: number, keyboard = false) => {
    if (useMobileStack) {
      if (totalCards === 0) return;

      setOpenMobileService(null);
      mobileFocusRef.current(index, keyboard);
      return;
    }

    const targetIndex = Math.min(totalCards - 1, Math.max(0, index));

    activeRef.current = targetIndex;
    setActive(targetIndex);

    const rail = railRef.current;
    if (!rail) return;

    const card =
      rail.querySelectorAll<HTMLElement>("[data-service-card]")[targetIndex];
    if (!card) return;

    const left =
      rail.scrollLeft +
      card.getBoundingClientRect().left -
      rail.getBoundingClientRect().left;

    rail.scrollTo({
      left,
      behavior: keyboard || shouldReduceMotion ? "instant" : "smooth",
    });
  };

  const controlClass =
    "group inline-flex min-h-11 min-w-11 items-center justify-center rounded-[0.8rem] border border-black/18 bg-white text-black transition-[background-color,border-color,transform] duration-150 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-black/34 hover:bg-black/[0.04] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 aria-disabled:pointer-events-none aria-disabled:opacity-30 motion-reduce:transform-none motion-reduce:transition-none";

  const controls = (
    <div className="font-ui mt-7 flex flex-wrap items-center justify-between gap-4 pt-4">
      <a
        href="tel:+393289185029"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-black underline decoration-black/28 underline-offset-4 transition-[text-decoration-color,transform] duration-150 hover:decoration-black active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 motion-reduce:transform-none motion-reduce:transition-none"
      >
        Parliamone insieme
        <PhoneCall aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
      </a>

      <div className="flex items-center gap-2.5">
        <span
          className="mr-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-black/46"
          aria-live="polite"
        >
          {active + 1} / {services.length}
        </span>
        <button
          type="button"
          aria-label="Servizio precedente"
          aria-disabled={!useMobileStack && active === 0}
          className={controlClass}
          onClick={(event) => {
            if (useMobileStack || active > 0) {
              goTo(activeRef.current - 1, event.detail === 0);
            }
          }}
        >
          <DirectionMark direction="previous" />
        </button>
        <button
          type="button"
          aria-label="Servizio successivo"
          aria-disabled={!useMobileStack && active === services.length - 1}
          className={controlClass}
          onClick={(event) => {
            if (useMobileStack || active < services.length - 1) {
              goTo(activeRef.current + 1, event.detail === 0);
            }
          }}
        >
          <DirectionMark direction="next" />
        </button>
      </div>
    </div>
  );

  const mobileControls = (
    <div className="font-ui mt-6 pt-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span
            className="text-[0.68rem] font-bold tabular-nums tracking-[0.08em] text-[#B12B14]"
            aria-hidden="true"
          >
            {String(active + 1).padStart(2, "0")}
          </span>
          <div
            aria-hidden="true"
            className="flex min-w-0 flex-1 items-center justify-center gap-1.5"
          >
            {services.map((service, index) => (
              <span
                key={service.title}
                className={`h-1 rounded-full transition-[width,background-color] duration-200 motion-reduce:transition-none ${
                  index === active
                    ? "w-7 bg-[#B12B14]"
                    : "w-1 bg-black/20"
                }`}
              />
            ))}
          </div>
          <span
            className="text-[0.68rem] font-bold tabular-nums tracking-[0.08em] text-black/42"
            aria-hidden="true"
          >
            {String(totalCards).padStart(2, "0")}
          </span>
          <span className="sr-only" aria-live="polite">
            Servizio {active + 1} di {totalCards}
          </span>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Servizio precedente"
            className="group inline-flex min-h-11 min-w-11 items-center justify-center rounded-[0.8rem] border border-black/14 bg-white text-black shadow-sm transition-[background-color,border-color] duration-150 hover:border-black/28 hover:bg-black/[0.04] active:bg-black/[0.07] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
            onClick={(event) =>
              goTo(activeRef.current - 1, event.detail === 0)
            }
          >
            <DirectionMark direction="previous" />
          </button>
          <button
            type="button"
            aria-label="Servizio successivo"
            className="group inline-flex min-h-11 min-w-11 items-center justify-center rounded-[0.8rem] border border-black/14 bg-white text-black shadow-sm transition-[background-color,border-color] duration-150 hover:border-black/28 hover:bg-black/[0.04] active:bg-black/[0.07] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
            onClick={(event) =>
              goTo(activeRef.current + 1, event.detail === 0)
            }
          >
            <DirectionMark direction="next" />
          </button>
        </div>
      </div>

      <a
        href="tel:+393289185029"
        className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-[0.9rem] border border-black/10 px-3.5 text-[0.72rem] font-semibold tracking-[0.01em] text-black/66 transition-[background-color,border-color] duration-150 hover:border-black/20 hover:bg-black/[0.025] focus-visible:outline-2 focus-visible:outline-offset-3 motion-reduce:transition-none"
      >
        Parliamone insieme
        <PhoneCall aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
      </a>
    </div>
  );

  if (useMobileStack) {
    return (
      <div className="min-w-0 lg:hidden">
        <div
          role="region"
          aria-label="Servizi Grossi Moto, carosello orizzontale infinito"
          tabIndex={0}
          className="relative -mx-5 cursor-grab overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 active:cursor-grabbing sm:-mx-7"
          style={{ touchAction: "pan-y" }}
          onPointerDown={(event) => {
            if (
              !event.isPrimary ||
              (event.pointerType === "mouse" && event.button !== 0)
            ) {
              return;
            }

            suppressMobileTapRef.current = false;

            if (event.pointerType === "mouse") {
              event.currentTarget.setPointerCapture(event.pointerId);
            }

            swipeStartRef.current = {
              x: event.clientX,
              y: event.clientY,
              pointerId: event.pointerId,
            };
          }}
          onPointerUp={(event) => {
            const start = swipeStartRef.current;
            swipeStartRef.current = null;

            if (!start || start.pointerId !== event.pointerId) return;

            const deltaX = event.clientX - start.x;
            const deltaY = event.clientY - start.y;
            const horizontalDistance = Math.abs(deltaX);
            const verticalDistance = Math.abs(deltaY);

            const isHorizontalSwipe =
              horizontalDistance >= mobileSwipeThreshold &&
              horizontalDistance > verticalDistance * 1.15;

            if (isHorizontalSwipe) {
              suppressMobileTapRef.current = true;
              goTo(activeRef.current + (deltaX < 0 ? 1 : -1));
              return;
            }

            if (
              Math.max(horizontalDistance, verticalDistance) >
              mobileTapTolerance
            ) {
              suppressMobileTapRef.current = true;
            }
          }}
          onPointerCancel={() => {
            swipeStartRef.current = null;
            suppressMobileTapRef.current = true;
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(activeRef.current - 1, true);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              goTo(activeRef.current + 1, true);
            } else if (event.key === "Home") {
              event.preventDefault();
              goTo(0, true);
            } else if (event.key === "End") {
              event.preventDefault();
              goTo(totalCards - 1, true);
            } else if (event.key === "Escape" && openMobileService !== null) {
              event.preventDefault();
              setOpenMobileService(null);
            }
          }}
        >
          <div
            ref={stackContainerRef}
            className="flex h-[min(60svh,31.5rem)] min-h-[27rem] items-center justify-center"
          >
            <div className="relative h-full w-full">
              {[0, 1, 2].flatMap((copyIndex) =>
                services.map((service, index) => {
                  const isSemanticCard = copyIndex === 1 && index === active;
                  const virtualIndex = copyIndex * totalCards + index;
                  const isOpen =
                    isSemanticCard && openMobileService === index;
                  const detailsId = `mobile-service-details-${index}`;
                  const serviceNumber = String(index + 1).padStart(2, "0");

                  return (
                    <article
                      key={`${copyIndex}-${service.title}`}
                      data-service-stack-card
                      data-service-virtual-index={virtualIndex}
                      aria-hidden={!isSemanticCard}
                      inert={!isSemanticCard ? true : undefined}
                      className="absolute left-1/2 top-0 flex h-full w-[80%] max-w-[31rem] flex-col overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white opacity-0 shadow-sm will-change-transform"
                    >
                      <div
                        className={`relative shrink-0 overflow-hidden rounded-t-[1.45rem] bg-gray-50 transition-[height] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                          isOpen ? "h-[28%]" : "h-[66%]"
                        }`}
                      >
                        <Image
                          src={service.image}
                          alt={isSemanticCard ? service.alt : ""}
                          fill
                          draggable={false}
                          sizes="(max-width: 767px) calc(100vw - 1.75rem), 1px"
                          className="object-cover"
                        />
                      </div>

                      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-3 pt-2.5">
                        <div className="font-ui flex items-center justify-between gap-3 text-[0.61rem] font-bold uppercase tracking-[0.14em]">
                          <span className="text-[#B12B14]">
                            {serviceNumber}
                          </span>
                          <span className="text-black/38">Servizi</span>
                        </div>

                        <h3
                          className={`font-display mt-2 max-w-[15ch] font-bold uppercase leading-[0.92] tracking-[-0.03em] text-[#0A0A0A] ${
                            isOpen
                              ? "text-[clamp(1.5rem,5.8vw,1.95rem)]"
                              : "text-[clamp(1.6rem,6.25vw,2.15rem)]"
                          }`}
                        >
                          {service.title}
                        </h3>

                        <p
                          className={`max-w-[29ch] font-medium leading-[1.18] text-black/72 ${
                            isOpen
                              ? "mt-2 text-[0.84rem]"
                              : "mt-1.5 text-[clamp(0.84rem,3.55vw,0.98rem)]"
                          }`}
                        >
                          {service.statement}
                        </p>

                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              id={detailsId}
                              role="region"
                              aria-label={`Dettagli: ${service.title}`}
                              className="mt-3 flex min-h-0 flex-1 flex-col"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 3 }}
                              transition={{
                                duration: 0.2,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <p className="text-[0.76rem] leading-[1.45] text-black/62">
                                {service.description}
                              </p>

                              <ul className="font-ui mt-auto grid gap-2 pt-3">
                                {service.features.map((feature, featureIndex) => (
                                  <li
                                    key={feature}
                                    className="flex items-start gap-2.5 text-[0.71rem] font-medium leading-[1.3] text-black/78"
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="w-4 shrink-0 pt-px text-[0.62rem] font-bold tabular-nums text-[#B12B14]"
                                    >
                                      {String(featureIndex + 1).padStart(2, "0")}
                                    </span>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>

                        <div
                          aria-hidden="true"
                          className="font-ui mt-auto flex items-center justify-end gap-1.5 pt-1.5 text-[0.63rem] font-semibold uppercase tracking-[0.1em] text-black/46"
                        >
                          {isOpen ? (
                            <>
                              Chiudi
                              <DisclosureMark expanded />
                            </>
                          ) : (
                            <>
                              Scopri
                              <DisclosureMark expanded={false} />
                            </>
                          )}
                        </div>
                      </div>

                      {isSemanticCard ? (
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={detailsId}
                          aria-label={
                            isOpen
                              ? `Chiudi i dettagli di ${service.title}`
                              : `Apri i dettagli di ${service.title}`
                          }
                          onClick={(event) => {
                            if (
                              event.detail !== 0 &&
                              suppressMobileTapRef.current
                            ) {
                              suppressMobileTapRef.current = false;
                              return;
                            }

                            suppressMobileTapRef.current = false;
                            setOpenMobileService((current) =>
                              current === index ? null : index,
                            );
                          }}
                          className="absolute inset-0 z-20 rounded-[1.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/45 focus-visible:ring-inset"
                        />
                      ) : null}

                      <div
                        data-service-depth-shade
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-30 bg-black opacity-0"
                      />
                    </article>
                  );
                }),
              )}
            </div>
          </div>
        </div>

        {mobileControls}
      </div>
    );
  }

  return (
    <div className="min-w-0 lg:hidden">
      <div
        ref={railRef}
        role="region"
        aria-label="Servizi Grossi Moto da sfogliare"
        tabIndex={0}
        className="hide-scrollbar flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 [--service-width:84%] after:block after:w-[max(0px,calc(100%-var(--service-width)-16px))] after:shrink-0 after:content-[''] active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-4 md:[--service-width:46%]"
        onPointerDown={(event) => {
          if (
            event.pointerType !== "mouse" ||
            !event.isPrimary ||
            event.button !== 0
          ) {
            return;
          }

          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.style.scrollSnapType = "none";
          event.currentTarget.style.userSelect = "none";
          railMouseDragRef.current = {
            x: event.clientX,
            scrollLeft: event.currentTarget.scrollLeft,
            pointerId: event.pointerId,
            moved: false,
          };
        }}
        onPointerMove={(event) => {
          const drag = railMouseDragRef.current;

          if (
            event.pointerType !== "mouse" ||
            !drag ||
            drag.pointerId !== event.pointerId
          ) {
            return;
          }

          const deltaX = event.clientX - drag.x;

          if (!drag.moved && Math.abs(deltaX) > mobileTapTolerance) {
            drag.moved = true;
          }

          if (drag.moved) {
            event.preventDefault();
            event.currentTarget.scrollLeft = drag.scrollLeft - deltaX;
          }
        }}
        onPointerUp={(event) => {
          const drag = railMouseDragRef.current;

          if (!drag || drag.pointerId !== event.pointerId) {
            return;
          }

          railMouseDragRef.current = null;
          event.currentTarget.style.scrollSnapType = "";
          event.currentTarget.style.userSelect = "";

          const cards = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              "[data-service-card]",
            ),
          );

          if (!drag.moved || cards.length === 0) {
            return;
          }

          const railStart = event.currentTarget.getBoundingClientRect().left;
          const distances = cards.map((card) =>
            Math.abs(card.getBoundingClientRect().left - railStart),
          );
          const nearest = distances.indexOf(Math.min(...distances));

          goTo(nearest);
        }}
        onPointerCancel={(event) => {
          const drag = railMouseDragRef.current;

          if (!drag || drag.pointerId !== event.pointerId) {
            return;
          }

          railMouseDragRef.current = null;
          event.currentTarget.style.scrollSnapType = "";
          event.currentTarget.style.userSelect = "";
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(Math.max(0, active - 1), true);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(Math.min(services.length - 1, active + 1), true);
          } else if (event.key === "Home") {
            event.preventDefault();
            goTo(0, true);
          } else if (event.key === "End") {
            event.preventDefault();
            goTo(services.length - 1, true);
          }
        }}
      >
        {services.map((service) => (
          <article
            key={service.title}
            data-service-card
            className="w-[var(--service-width)] shrink-0 snap-start"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-black/[0.035] sm:rounded-[28px]">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                draggable={false}
                sizes="(max-width: 767px) 84vw, (max-width: 1023px) 46vw, 1px"
                className="object-cover"
              />
            </div>

            <div className="pt-5">
              <h3 className="font-display max-w-[14ch] text-[clamp(2rem,7vw,3rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em] text-[#0A0A0A]">
                {service.title}
              </h3>
              <p className="mt-4 max-w-[24ch] text-[clamp(1.2rem,4.5vw,1.7rem)] font-semibold leading-[1.05] text-[#B12B14] md:text-black/82">
                {service.statement}
              </p>
              <p className="mt-4 max-w-[44ch] text-sm leading-6 text-black/72 sm:text-base sm:leading-7 md:text-black/64">
                {service.description}
              </p>
              <ul className="font-ui mt-5 grid gap-2 pt-4 text-[0.74rem] font-semibold uppercase tracking-[0.045em] text-black/78 md:tracking-[0.04em] md:text-black/66">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 pb-2 md:block"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.46rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B12B14] md:hidden"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {controls}
    </div>
  );
}
