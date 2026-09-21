"use client";

import { DirectionMark } from "@/components/ui/control-glyphs";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LayoutGroup, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { CatalogProductCard } from "@/components/catalog/CatalogProductCard";
import type { CatalogScooter } from "@/data/catalog-scooters";
import {
  getCatalogCardToneAssignments,
  type ProductCardToneAssignment,
} from "@/data/scooter-color-system";

type CatalogGridProps = {
  scooters: CatalogScooter[];
  toneSourceScooters?: CatalogScooter[];
  expandedId: string | null;
  isCompactViewport: boolean;
  shouldReduceMotion: boolean;
  transitionImageId: string | null;
  hasSearchQuery: boolean;
  hasActiveFilter: boolean;
  onActiveScooterChange?: (scooterId: string | null) => void;
  onClearSearch: () => void;
  onResetFilter: () => void;
  onExpandScooter: (scooterId: string) => void;
  onCollapseScooter: () => void;
};

type CatalogGridVariantProps = Omit<
  CatalogGridProps,
  | "isCompactViewport"
  | "hasSearchQuery"
  | "hasActiveFilter"
  | "onClearSearch"
  | "onResetFilter"
>;

const desktopCatalogColumnCount = 4;
const productEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const cardLayoutDuration = 0.34;

function getDesktopCatalogOrder(
  scooters: CatalogScooter[],
  expandedId: string | null,
) {
  if (!expandedId) {
    return scooters;
  }

  const expandedIndex = scooters.findIndex(
    (scooter) => scooter.id === expandedId,
  );

  if (expandedIndex < 0) {
    return scooters;
  }

  const expandedRowStart =
    Math.floor(expandedIndex / desktopCatalogColumnCount) *
    desktopCatalogColumnCount;
  const expandedScooter = scooters[expandedIndex];

  return [
    ...scooters.slice(0, expandedRowStart),
    expandedScooter,
    ...scooters.slice(expandedRowStart, expandedIndex),
    ...scooters.slice(expandedIndex + 1),
  ];
}

function EmptyCatalogState({
  shouldReduceMotion,
  hasSearchQuery,
  hasActiveFilter,
  onClearSearch,
  onResetFilter,
}: {
  shouldReduceMotion: boolean;
  hasSearchQuery: boolean;
  hasActiveFilter: boolean;
  onClearSearch: () => void;
  onResetFilter: () => void;
}) {
  const description = hasSearchQuery
    ? hasActiveFilter
      ? "Nessun modello corrisponde alla ricerca e al filtro selezionato."
      : "Nessun modello corrisponde alla ricerca."
    : "Nessun modello corrisponde al filtro selezionato.";

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      className="rounded-[1.35rem] border border-black/10 bg-[#F7F7F7] p-6 text-black/70"
    >
      <p className="font-ui text-[0.7rem] font-bold uppercase tracking-[0.14em] text-black">
        Nessun risultato
      </p>
      <p className="mt-3 max-w-[30rem] text-sm leading-6">{description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {hasSearchQuery ? (
          <button
            type="button"
            onClick={onClearSearch}
            className="font-ui min-h-11 rounded-[0.9rem] bg-black px-5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white outline-none transition-colors hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-2"
          >
            Cancella ricerca
          </button>
        ) : null}
        {hasActiveFilter ? (
          <button
            type="button"
            onClick={onResetFilter}
            className="font-ui min-h-11 rounded-[0.9rem] border border-black/10 bg-white px-5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-black outline-none transition-colors hover:bg-black/[0.04] focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-2"
          >
            Mostra tutti
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}

function ReducedMotionCompactCatalogGrid({
  scooters,
  toneSourceScooters = scooters,
  expandedId,
  shouldReduceMotion,
  onActiveScooterChange,
  onExpandScooter,
  onCollapseScooter,
}: CatalogGridVariantProps) {
  const cardToneAssignments = useMemo(
    () => getCatalogCardToneAssignments(toneSourceScooters, 1),
    [toneSourceScooters],
  );

  useEffect(() => {
    if (!onActiveScooterChange || scooters.length === 0) {
      return;
    }

    const list = document.getElementById("catalog-list");
    const cards = list
      ? Array.from(list.querySelectorAll<HTMLElement>("[data-scooter-id]"))
      : [];

    if (cards.length === 0 || !("IntersectionObserver" in window)) {
      return;
    }

    const visibility = new Map<string, number>();
    let currentActiveId = scooters[0]?.id ?? null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const scooterId = (entry.target as HTMLElement).dataset.scooterId;

          if (!scooterId) {
            return;
          }

          visibility.set(
            scooterId,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        let nextActiveId = currentActiveId;
        let nextRatio = -1;

        scooters.forEach((scooter) => {
          const ratio = visibility.get(scooter.id) ?? 0;

          if (ratio > nextRatio) {
            nextRatio = ratio;
            nextActiveId = scooter.id;
          }
        });

        if (nextRatio <= 0 || nextActiveId === currentActiveId) {
          return;
        }

        currentActiveId = nextActiveId;
        onActiveScooterChange(nextActiveId);
      },
      {
        rootMargin: "-14% 0px -48% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 0.85],
      },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [scooters, onActiveScooterChange]);

  return (
    <div
      id="catalog-list"
      aria-label="Modelli in gamma"
      className="grid grid-cols-1 content-start items-start gap-4"
    >
      {scooters.map((scooter) => {
        const isExpanded = expandedId === scooter.id;

        return (
          <CatalogProductCard
            key={scooter.id}
            scooter={scooter}
            shouldReduceMotion={shouldReduceMotion}
            isExpanded={false}
            isCompactExpanded={isExpanded}
            compactMode
            isSelected={isExpanded}
            transitionImageId={null}
            cardToneAssignment={cardToneAssignments[scooter.id]}
            isPriority={scooter.id === scooters[0]?.id}
            onExpandScooter={onExpandScooter}
            onCollapseScooter={onCollapseScooter}
          />
        );
      })}
    </div>
  );
}


type CatalogChapterId =
  | "50cc"
  | "125cc"
  | "150-250cc"
  | "300-499cc"
  | "500cc+";

const catalogChapterDefinitions: ReadonlyArray<{
  id: CatalogChapterId;
  label: string;
}> = [
  { id: "50cc", label: "50 cc" },
  { id: "125cc", label: "125 cc" },
  { id: "150-250cc", label: "150–250 cc" },
  { id: "300-499cc", label: "300–499 cc" },
  { id: "500cc+", label: "500+ cc" },
];

const stackShadeStep = 0.055;
const stackRotationStep = 1.35;
const stackTiltStep = 2.4;
const maxVisibleDepth = 5;
const compactSwipeThreshold = 36;

gsap.registerPlugin(useGSAP);

function getCatalogChapterId(scooter: CatalogScooter): CatalogChapterId {
  const displacement = Number.parseInt(scooter.displacement, 10);

  if (displacement <= 50) return "50cc";
  if (displacement <= 125) return "125cc";
  if (displacement <= 250) return "150-250cc";
  if (displacement <= 499) return "300-499cc";

  return "500cc+";
}

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

type ProductShowroomChapterProps = {
  chapterId: CatalogChapterId;
  label: string;
  scooters: CatalogScooter[];
  cardToneAssignments: Record<string, ProductCardToneAssignment>;
  expandedId: string | null;
  isFirstChapter: boolean;
  onChapterActiveChange: (
    chapterId: CatalogChapterId,
    scooterId: string,
  ) => void;
  onExpandScooter: (scooterId: string) => void;
  onCollapseScooter: () => void;
};

function ProductShowroomChapter({
  chapterId,
  label,
  scooters,
  cardToneAssignments,
  expandedId,
  isFirstChapter,
  onChapterActiveChange,
  onExpandScooter,
  onCollapseScooter,
}: ProductShowroomChapterProps) {
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<(index: number, immediate?: boolean) => void>(() => {});
  const swipeStartRef = useRef<{
    x: number;
    y: number;
    pointerId: number;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const expandedIdRef = useRef(expandedId);
  const collapseRef = useRef(onCollapseScooter);
  const initialExpandedIndex = expandedId
    ? scooters.findIndex((scooter) => scooter.id === expandedId)
    : -1;
  const [active, setActive] = useState(
    initialExpandedIndex >= 0 ? initialExpandedIndex : 0,
  );
  const activeRef = useRef(active);
  const totalCards = scooters.length;
  const looping = totalCards >= 3;
  const copyIndexes = looping ? [0, 1, 2] : [0];
  const semanticCopyIndex = looping ? 1 : 0;
  const activeScooter = scooters[active] ?? scooters[0];
  const scooterSignature = scooters.map((scooter) => scooter.id).join("|");

  const getStackInstanceId = (copyIndex: number, index: number) =>
    `stack-${chapterId}-${copyIndex}-${index}`;

  useEffect(() => {
    expandedIdRef.current = expandedId;
  }, [expandedId]);

  useEffect(() => {
    collapseRef.current = onCollapseScooter;
  }, [onCollapseScooter]);

  useEffect(() => {
    if (!expandedId) return;

    const expandedIndex = scooters.findIndex(
      (scooter) => scooter.id === expandedId,
    );

    if (expandedIndex >= 0 && expandedIndex !== activeRef.current) {
      focusRef.current(expandedIndex, true);
    }
  }, [expandedId, scooters]);

  useGSAP(
    () => {
      const container = stackContainerRef.current;
      if (!container || totalCards === 0) return;

      let cards: HTMLElement[] = [];
      let shades: Array<HTMLElement | null> = [];
      let virtualIndexes: number[] = [];
      let position: { value: number } | null = null;
      let targetPosition = 0;
      let focusTween: gsap.core.Tween | null = null;
      let observer: ResizeObserver | null = null;
      let cardObserver: ResizeObserver | null = null;
      let resizeFrame = 0;
      let heightFrame = 0;
      let cardSpacing = 0;
      let measuredContainerWidth = 0;
      let minimumStackHeight = 320;
      let heightCards: HTMLElement[] = [];
      const cardHeights = new Map<HTMLElement, number>();
      let initFrame = 0;
      let initAttempts = 0;
      let disposed = false;

      const expectedCardCount = totalCards * copyIndexes.length;
      const lateralScale = 0.9;

      const syncContainerHeight = () => {
        if (heightCards.length === 0) return;

        let tallestCard = 0;
        cardHeights.forEach((height) => {
          tallestCard = Math.max(tallestCard, height);
        });

        const nextHeight = Math.ceil(
          Math.max(minimumStackHeight, tallestCard + 12),
        );

        if (container.style.height !== `${nextHeight}px`) {
          container.style.height = `${nextHeight}px`;
        }
      };

      const refreshMetrics = () => {
        const cardWidth = cards[0]?.offsetWidth ?? 0;
        const containerWidth = container.clientWidth;
        if (cardWidth === 0 || containerWidth === 0) return false;

        const cardGap = gsap.utils.clamp(12, 16, containerWidth * 0.035);
        cardSpacing = cardWidth * ((1 + lateralScale) / 2) + cardGap;
        measuredContainerWidth = containerWidth;
        minimumStackHeight = window.matchMedia("(min-width: 640px)").matches
          ? 336
          : 320;
        return true;
      };

      const renderPosition = () => {
        const currentPosition = position;
        if (
          !currentPosition ||
          cards.length === 0 ||
          cardSpacing === 0
        ) {
          return;
        }

        const visibleLimit = 1.14;

        cards.forEach((card, cardIndex) => {
          const slot =
            virtualIndexes[cardIndex] - currentPosition.value;
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
        const currentPosition = position;
        if (!looping || !currentPosition) return;

        if (targetPosition >= totalCards * 2) {
          targetPosition -= totalCards;
          currentPosition.value -= totalCards;
          renderPosition();
        } else if (targetPosition < totalCards) {
          targetPosition += totalCards;
          currentPosition.value += totalCards;
          renderPosition();
        }
      };

      const moveFocus = (requestedIndex: number, immediate = false) => {
        const currentPosition = position;
        if (!currentPosition || totalCards < 2) return;

        const currentIndex = activeRef.current;
        const nextIndex = looping
          ? gsap.utils.wrap(0, totalCards, requestedIndex)
          : gsap.utils.clamp(0, totalCards - 1, requestedIndex);

        if (nextIndex === currentIndex && !immediate) return;

        if (immediate) {
          focusTween?.kill();
          focusTween = null;
          activeRef.current = nextIndex;
          setActive(nextIndex);
          targetPosition = looping ? totalCards + nextIndex : nextIndex;
          currentPosition.value = targetPosition;
          renderPosition();
          onChapterActiveChange(chapterId, scooters[nextIndex].id);

          if (
            expandedIdRef.current &&
            expandedIdRef.current !== scooters[nextIndex].id
          ) {
            collapseRef.current();
          }

          return;
        }

        let direction = Math.sign(requestedIndex - currentIndex);

        if (looping) {
          if (
            requestedIndex === totalCards &&
            currentIndex === totalCards - 1
          ) {
            direction = 1;
          } else if (requestedIndex === -1 && currentIndex === 0) {
            direction = -1;
          }
        }

        if (direction === 0) return;

        focusTween?.kill();

        targetPosition = looping ? targetPosition + direction : nextIndex;
        activeRef.current = nextIndex;
        setActive(nextIndex);
        onChapterActiveChange(chapterId, scooters[nextIndex].id);

        if (
          expandedIdRef.current &&
          expandedIdRef.current !== scooters[nextIndex].id
        ) {
          collapseRef.current();
        }

        recenterCopies();

        focusTween = gsap.to(currentPosition, {
          value: targetPosition,
          duration: 0.9,
          ease: "sine.inOut",
          overwrite: true,
          onUpdate: renderPosition,
          onComplete: () => {
            currentPosition.value = targetPosition;
            recenterCopies();
            renderPosition();
            focusTween = null;
          },
        });
      };

      const initializeStack = () => {
        if (disposed) return;

        cards = gsap.utils.toArray<HTMLElement>(
          "[data-product-stack-card]",
          container,
        );
        shades = cards.map((card) =>
          card.querySelector<HTMLElement>("[data-product-depth-shade]"),
        );
        virtualIndexes = cards.map((card) =>
          Number(card.dataset.productVirtualIndex),
        );
        heightCards = cards.filter(
          (card) => card.dataset.productSemanticCopy === "true",
        );

        if (heightCards.length === 0) {
          heightCards = cards;
        }

        const isReady =
          cards.length === expectedCardCount &&
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

        const startPosition = looping
          ? totalCards + activeRef.current
          : activeRef.current;

        position = { value: startPosition };
        targetPosition = startPosition;
        focusRef.current = moveFocus;

        heightCards.forEach((card) => {
          cardHeights.set(card, card.offsetHeight);
        });
        refreshMetrics();
        syncContainerHeight();
        renderPosition();

        observer = new ResizeObserver((entries) => {
          const nextWidth = entries[0]?.contentRect.width ?? 0;
          if (
            nextWidth === 0 ||
            Math.abs(nextWidth - measuredContainerWidth) < 0.5
          ) {
            return;
          }

          cancelAnimationFrame(resizeFrame);
          resizeFrame = requestAnimationFrame(() => {
            if (refreshMetrics()) {
              renderPosition();
            }
          });
        });
        observer.observe(container);

        cardObserver = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            cardHeights.set(
              entry.target as HTMLElement,
              entry.borderBoxSize?.[0]?.blockSize ??
                entry.contentRect.height,
            );
          });

          cancelAnimationFrame(heightFrame);
          heightFrame = requestAnimationFrame(syncContainerHeight);
        });
        heightCards.forEach((card) => cardObserver?.observe(card));
      };

      initFrame = requestAnimationFrame(initializeStack);

      return () => {
        disposed = true;
        cancelAnimationFrame(initFrame);
        cancelAnimationFrame(resizeFrame);
        cancelAnimationFrame(heightFrame);
        focusRef.current = () => {};
        observer?.disconnect();
        cardObserver?.disconnect();
        container.style.height = "";
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
      dependencies: [
        chapterId,
        looping,
        onChapterActiveChange,
        scooterSignature,
        totalCards,
      ],
      revertOnUpdate: true,
    },
  );

  const goTo = useCallback((index: number, immediate = false) => {
    focusRef.current(index, immediate);
  }, []);

  const controlClass =
    "group inline-flex min-h-11 min-w-11 items-center justify-center rounded-[0.8rem] border border-black/18 bg-white text-black transition-[background-color,border-color,transform] duration-150 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-black/34 hover:bg-black/[0.04] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 aria-disabled:pointer-events-none aria-disabled:opacity-30 motion-reduce:transform-none motion-reduce:transition-none";

  return (
    <section
      data-catalog-chapter
      data-chapter-id={chapterId}
      data-active-scooter-id={activeScooter?.id}
      aria-labelledby={"catalog-chapter-" + chapterId}
      className="py-7 first:pt-1 sm:py-9"
    >
      <div className="mb-3 flex items-end justify-between gap-4 sm:mb-4">
        <div>
          <p className="font-ui text-[0.58rem] font-bold uppercase tracking-[0.16em] text-black/45">
            Cilindrata
          </p>
          <h2
            id={"catalog-chapter-" + chapterId}
            className="font-display mt-1 text-[clamp(2rem,9vw,3.15rem)] font-bold leading-[0.92] tracking-[-0.025em] text-black"
          >
            {label}
          </h2>
        </div>
        <p className="font-ui pb-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-black/45">
          {totalCards} {totalCards === 1 ? "modello" : "modelli"}
        </p>
      </div>

      <div
        role="region"
        aria-label={label + ": modelli da sfogliare"}
        tabIndex={0}
        className="relative -mx-5 cursor-grab overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 active:cursor-grabbing sm:-mx-7"
        style={{ touchAction: "pan-y" }}
        onPointerDown={(event) => {
          suppressClickRef.current = false;

          if (
            totalCards < 2 ||
            !event.isPrimary ||
            (event.pointerType === "mouse" && event.button !== 0)
          ) {
            return;
          }

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

          if (
            horizontalDistance < compactSwipeThreshold ||
            horizontalDistance <= verticalDistance * 1.15
          ) {
            return;
          }

          suppressClickRef.current = true;
          goTo(activeRef.current + (deltaX < 0 ? 1 : -1));
        }}
        onPointerCancel={() => {
          swipeStartRef.current = null;
        }}
        onClickCapture={(event) => {
          if (!suppressClickRef.current) return;

          suppressClickRef.current = false;
          event.preventDefault();
          event.stopPropagation();
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
          }
        }}
      >
        <div
          ref={stackContainerRef}
          className="relative min-h-[20rem] sm:min-h-[21rem]"
        >
          {copyIndexes.flatMap((copyIndex) =>
            scooters.map((scooter, index) => {
              const isSemanticCard =
                copyIndex === semanticCopyIndex && index === active;
              const virtualIndex = looping
                ? copyIndex * totalCards + index
                : index;
              const instanceId = getStackInstanceId(copyIndex, index);

              return (
                <div
                  key={copyIndex + "-" + scooter.id}
                  data-product-stack-card
                  data-product-virtual-index={virtualIndex}
                  data-product-semantic-copy={
                    copyIndex === semanticCopyIndex ? "true" : undefined
                  }
                  aria-hidden={!isSemanticCard}
                  inert={!isSemanticCard ? true : undefined}
                  className={[
                    "absolute left-1/2 top-0 w-[80%] max-w-[31rem] opacity-0 will-change-transform [backface-visibility:hidden]",
                    isSemanticCard ? "" : "pointer-events-none select-none",
                  ].join(" ")}
                >
                  <CatalogProductCard
                    scooter={scooter}
                    shouldReduceMotion={false}
                    isExpanded={false}
                    isCompactExpanded={
                      isSemanticCard && expandedId === scooter.id
                    }
                    compactMode
                    isSelected={
                      isSemanticCard && expandedId === scooter.id
                    }
                    transitionImageId={null}
                    cardToneAssignment={cardToneAssignments[scooter.id]}
                    isPriority={
                      isFirstChapter && isSemanticCard && index === 0
                    }
                    instanceId={instanceId}
                    isSemanticInstance={isSemanticCard}
                    onExpandScooter={onExpandScooter}
                    onCollapseScooter={onCollapseScooter}
                  />
                  <div
                    data-product-depth-shade
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-30 rounded-[1.35rem] bg-black opacity-0"
                  />
                </div>
              );
            }),
          )}
        </div>
      </div>

      <div className="font-ui mt-7 flex items-center justify-end gap-2.5 pt-4">
        <span
          className="mr-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-black/46"
          aria-live="polite"
        >
          {active + 1} / {totalCards}
        </span>

        {totalCards > 1 ? (
          <>
            <button
              type="button"
              aria-label={"Modello precedente in " + label}
              aria-disabled={!looping && active === 0}
              className={controlClass}
              onClick={(event) => {
                if (looping || activeRef.current > 0) {
                  goTo(activeRef.current - 1, event.detail === 0);
                }
              }}
            >
              <DirectionMark direction="previous" />
            </button>
            <button
              type="button"
              aria-label={"Modello successivo in " + label}
              aria-disabled={!looping && active === totalCards - 1}
              className={controlClass}
              onClick={(event) => {
                if (looping || activeRef.current < totalCards - 1) {
                  goTo(activeRef.current + 1, event.detail === 0);
                }
              }}
            >
              <DirectionMark direction="next" />
            </button>
          </>
        ) : null}
      </div>


    </section>
  );
}

function CompactCatalogGrid({
  scooters,
  toneSourceScooters = scooters,
  expandedId,
  shouldReduceMotion,
  onActiveScooterChange,
  onExpandScooter,
  onCollapseScooter,
}: CatalogGridVariantProps) {
  const activeChapterRef = useRef<CatalogChapterId | null>(null);
  const activeScooterRef = useRef<string | null>(null);
  const cardToneAssignments = useMemo(
    () => getCatalogCardToneAssignments(toneSourceScooters, 1),
    [toneSourceScooters],
  );
  const chapters = useMemo(
    () =>
      catalogChapterDefinitions
        .map((definition) => ({
          ...definition,
          scooters: scooters.filter(
            (scooter) =>
              getCatalogChapterId(scooter) === definition.id,
          ),
        }))
        .filter((chapter) => chapter.scooters.length > 0),
    [scooters],
  );

  const handleChapterActiveChange = useCallback(
    (chapterId: CatalogChapterId, scooterId: string) => {
      if (activeChapterRef.current === chapterId) {
        activeScooterRef.current = scooterId;
        onActiveScooterChange?.(scooterId);
      }
    },
    [onActiveScooterChange],
  );

  useEffect(() => {
    if (
      !onActiveScooterChange ||
      shouldReduceMotion ||
      chapters.length === 0
    ) {
      return;
    }

    const list = document.getElementById("catalog-list");
    const chapterElements = list
      ? Array.from(
          list.querySelectorAll<HTMLElement>("[data-catalog-chapter]"),
        )
      : [];

    if (
      chapterElements.length === 0 ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const visibility = new Map<CatalogChapterId, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const chapterId = (entry.target as HTMLElement).dataset
            .chapterId as CatalogChapterId | undefined;

          if (!chapterId) return;

          visibility.set(
            chapterId,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        let nextChapter: HTMLElement | null = null;
        let nextRatio = -1;

        for (const chapterElement of chapterElements) {
          const chapterId = chapterElement.dataset.chapterId as
            | CatalogChapterId
            | undefined;

          if (!chapterId) continue;

          const ratio = visibility.get(chapterId) ?? 0;

          if (ratio > nextRatio) {
            nextRatio = ratio;
            nextChapter = chapterElement;
          }
        }

        if (!nextChapter || nextRatio <= 0) return;

        const nextChapterId = nextChapter.dataset
          .chapterId as CatalogChapterId;
        const nextScooterId = nextChapter.dataset.activeScooterId;

        if (!nextScooterId) return;

        const chapterChanged =
          activeChapterRef.current !== nextChapterId;
        const scooterChanged =
          activeScooterRef.current !== nextScooterId;
        activeChapterRef.current = nextChapterId;
        activeScooterRef.current = nextScooterId;

        if (chapterChanged || scooterChanged) {
          onActiveScooterChange(nextScooterId);
        }
      },
      {
        rootMargin: "-12% 0px -46% 0px",
        threshold: [0, 0.12, 0.3, 0.5, 0.72],
      },
    );

    chapterElements.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, [chapters, onActiveScooterChange, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <ReducedMotionCompactCatalogGrid
        scooters={scooters}
        toneSourceScooters={toneSourceScooters}
        expandedId={expandedId}
        shouldReduceMotion={shouldReduceMotion}
        transitionImageId={null}
        onActiveScooterChange={onActiveScooterChange}
        onExpandScooter={onExpandScooter}
        onCollapseScooter={onCollapseScooter}
      />
    );
  }

  return (
    <div
      id="catalog-list"
      aria-label="Modelli in gamma"
      className="min-w-0"
    >
      {chapters.map((chapter, chapterIndex) => (
        <ProductShowroomChapter
          key={
            chapter.id +
            ":" +
            chapter.scooters.map((scooter) => scooter.id).join(",")
          }
          chapterId={chapter.id}
          label={chapter.label}
          scooters={chapter.scooters}
          cardToneAssignments={cardToneAssignments}
          expandedId={expandedId}
          isFirstChapter={chapterIndex === 0}
          onChapterActiveChange={handleChapterActiveChange}
          onExpandScooter={onExpandScooter}
          onCollapseScooter={onCollapseScooter}
        />
      ))}
    </div>
  );
}


function DesktopCatalogGrid({
  scooters,
  toneSourceScooters = scooters,
  expandedId,
  shouldReduceMotion,
  transitionImageId,
  onExpandScooter,
  onCollapseScooter,
}: CatalogGridVariantProps) {
  const cardToneAssignments = useMemo(
    () =>
      getCatalogCardToneAssignments(
        toneSourceScooters,
        desktopCatalogColumnCount,
      ),
    [toneSourceScooters],
  );
  const orderedScooters = useMemo(
    () => getDesktopCatalogOrder(scooters, expandedId),
    [scooters, expandedId],
  );

  return (
    <LayoutGroup>
      <div
        id="catalog-list"
        aria-label="Modelli in gamma"
        className="grid grid-cols-12 items-start gap-4"
      >
        {orderedScooters.map((scooter) => {
          const isExpanded = expandedId === scooter.id;

          return (
            <motion.div
              key={scooter.id}
              layout={shouldReduceMotion ? false : true}
              layoutDependency={expandedId ?? "collapsed"}
              transition={{
                layout: {
                  duration: shouldReduceMotion ? 0.01 : cardLayoutDuration,
                  ease: productEase,
                },
              }}
              className={
                isExpanded
                  ? "relative z-20 col-span-12 min-w-0"
                  : "relative z-0 col-span-3 min-w-0"
              }
            >
              <CatalogProductCard
                scooter={scooter}
                shouldReduceMotion={shouldReduceMotion}
                isExpanded={isExpanded}
                isSelected={isExpanded}
                transitionImageId={isExpanded ? transitionImageId : null}
                cardToneAssignment={cardToneAssignments[scooter.id]}
                isPriority={scooter.id === scooters[0]?.id}
                onExpandScooter={onExpandScooter}
                onCollapseScooter={onCollapseScooter}
              />
            </motion.div>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

export function CatalogGrid({
  scooters,
  toneSourceScooters = scooters,
  expandedId,
  isCompactViewport,
  shouldReduceMotion,
  transitionImageId,
  hasSearchQuery,
  hasActiveFilter,
  onActiveScooterChange,
  onClearSearch,
  onResetFilter,
  onExpandScooter,
  onCollapseScooter,
}: CatalogGridProps) {
  if (scooters.length === 0) {
    return (
      <div id="catalog-list" aria-label="Modelli in gamma">
        <EmptyCatalogState
          shouldReduceMotion={shouldReduceMotion}
          hasSearchQuery={hasSearchQuery}
          hasActiveFilter={hasActiveFilter}
          onClearSearch={onClearSearch}
          onResetFilter={onResetFilter}
        />
      </div>
    );
  }

  const variantProps: CatalogGridVariantProps = {
    scooters,
    toneSourceScooters,
    expandedId,
    shouldReduceMotion,
    transitionImageId,
    onActiveScooterChange,
    onExpandScooter,
    onCollapseScooter,
  };

  return isCompactViewport ? (
    <CompactCatalogGrid {...variantProps} />
  ) : (
    <DesktopCatalogGrid {...variantProps} />
  );
}
