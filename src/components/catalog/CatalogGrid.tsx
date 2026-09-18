"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { CatalogProductCard } from "@/components/catalog/CatalogProductCard";
import {
  getCatalogScooterBrand,
  type CatalogScooter,
} from "@/data/catalog-scooters";
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
const cardLayoutDuration = 0.28;

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
            className="font-ui min-h-11 rounded-full bg-black px-5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white outline-none transition-colors hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-2"
          >
            Cancella ricerca
          </button>
        ) : null}
        {hasActiveFilter ? (
          <button
            type="button"
            onClick={onResetFilter}
            className="font-ui min-h-11 rounded-full border border-black/10 bg-white px-5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-black outline-none transition-colors hover:bg-black/[0.04] focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-2"
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
  transitionImageId,
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
            isExpanded={isExpanded}
            isSelected={isExpanded}
            transitionImageId={transitionImageId}
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

type ProductStackStyle = CSSProperties & Record<string, string>;

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

function stackShade(layer: number) {
  return Math.min(layer * stackShadeStep, 0.28);
}

function stackRotation(slot: number) {
  return gsap.utils.clamp(-4.5, 4.5, slot * stackRotationStep);
}

function stackTilt(slot: number) {
  return gsap.utils.clamp(-7, 7, -slot * stackTiltStep);
}

function getProductStackStyle(
  scooter: CatalogScooter,
  cardToneAssignment?: ProductCardToneAssignment,
): ProductStackStyle {
  return {
    "--product-accent": scooter.accentTone,
    "--product-muted": scooter.mutedTone,
    "--product-shadow": scooter.shadowTone,
    background: cardToneAssignment?.cardSurface ?? scooter.cardSurface,
    color: scooter.textTone,
  };
}

type ProductShowroomChapterProps = {
  chapterId: CatalogChapterId;
  label: string;
  scooters: CatalogScooter[];
  cardToneAssignments: Record<string, ProductCardToneAssignment>;
  expandedId: string | null;
  transitionImageId: string | null;
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
  transitionImageId,
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
  const activeScooter = scooters[active] ?? scooters[0];
  const expandedScooter = expandedId
    ? scooters.find((scooter) => scooter.id === expandedId)
    : undefined;
  const scooterSignature = scooters.map((scooter) => scooter.id).join("|");

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

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-product-stack-card]",
        container,
      );
      const shades = cards.map((card) =>
        card.querySelector<HTMLElement>("[data-product-depth-shade]"),
      );
      const vehicles = cards.map((card) =>
        card.querySelector<HTMLElement>("[data-product-stack-vehicle]"),
      );
      const virtualIndexes = cards.map((card) =>
        Number(card.dataset.productVirtualIndex),
      );
      const expectedCardCount = totalCards * copyIndexes.length;

      if (
        cards.length !== expectedCardCount ||
        shades.some((shade) => !shade) ||
        vehicles.some((vehicle) => !vehicle) ||
        virtualIndexes.some((index) => Number.isNaN(index))
      ) {
        return;
      }

      const startPosition = looping
        ? totalCards + activeRef.current
        : activeRef.current;
      const position = { value: startPosition };
      let targetPosition = startPosition;
      let focusTween: gsap.core.Tween | null = null;

      const renderPosition = () => {
        const cardWidth = cards[0]?.offsetWidth ?? 0;
        const lateralScale = 0.9;
        const cardGap = gsap.utils.clamp(
          14,
          30,
          container.clientWidth * 0.035,
        );
        const cardSpacing =
          cardWidth * ((1 + lateralScale) / 2) + cardGap;
        const visibleLimit = looping ? 1.14 : 1.04;

        cards.forEach((card, cardIndex) => {
          const slot = virtualIndexes[cardIndex] - position.value;
          const layer = stackLayer(slot);
          const distance = Math.abs(slot);

          gsap.set(card, {
            x: slot * cardSpacing,
            xPercent: -50,
            yPercent: -50,
            rotation: stackRotation(slot) * 0.72,
            rotationY: stackTilt(slot) * 1.65,
            scale: 1 - Math.min(distance, 1) * (1 - lateralScale),
            opacity: distance > visibleLimit ? 0 : 1,
            transformPerspective: 1050,
            transformOrigin: "center center",
            force3D: true,
            zIndex: Math.round(1000 - distance * 100),
          });

          gsap.set(shades[cardIndex], {
            opacity: distance < 1.12 ? stackShade(layer) * 1.05 : 0,
          });

          gsap.set(vehicles[cardIndex], {
            x: gsap.utils.clamp(-7, 7, -slot * 6),
            scale: 1 - Math.min(distance, 1) * 0.015,
            force3D: true,
          });
        });
      };

      const recenterCopies = () => {
        if (!looping) return;

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
        if (totalCards < 2) return;

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
          position.value = targetPosition;
          renderPosition();
          onChapterActiveChange(chapterId, scooters[nextIndex].id);
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

        focusTween = gsap.to(position, {
          value: targetPosition,
          duration: 0.9,
          ease: "sine.inOut",
          overwrite: true,
          onUpdate: renderPosition,
          onComplete: () => {
            position.value = targetPosition;
            recenterCopies();
            renderPosition();
            focusTween = null;
          },
        });
      };

      focusRef.current = moveFocus;
      renderPosition();

      const observer = new ResizeObserver(renderPosition);
      observer.observe(container);

      return () => {
        focusRef.current = () => {};
        observer.disconnect();
        focusTween?.kill();
        gsap.killTweensOf(position);
        gsap.killTweensOf(cards);
        shades.forEach((shade) => {
          if (shade) gsap.killTweensOf(shade);
        });
        vehicles.forEach((vehicle) => {
          if (vehicle) gsap.killTweensOf(vehicle);
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
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-black/15 bg-white text-black shadow-sm transition-[background-color,border-color,transform] duration-150 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-black/30 hover:bg-black/[0.035] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 aria-disabled:pointer-events-none aria-disabled:opacity-30";

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
        className="relative -mx-5 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 sm:-mx-7"
        style={{ touchAction: "pan-y" }}
        onPointerDown={(event) => {
          suppressClickRef.current = false;

          if (
            totalCards < 2 ||
            !event.isPrimary ||
            event.pointerType === "mouse"
          ) {
            return;
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
          className="relative h-[24rem] sm:h-[26rem] md:h-[27rem]"
        >
          {copyIndexes.flatMap((copyIndex) =>
            scooters.map((scooter, index) => {
              const isSemanticCard =
                (looping ? copyIndex === 1 : true) && index === active;
              const virtualIndex = looping
                ? copyIndex * totalCards + index
                : index;
              const cardToneAssignment = cardToneAssignments[scooter.id];

              return (
                <article
                  key={copyIndex + "-" + scooter.id}
                  data-product-stack-card
                  data-product-virtual-index={virtualIndex}
                  data-scooter-id={isSemanticCard ? scooter.id : undefined}
                  aria-hidden={!isSemanticCard}
                  inert={!isSemanticCard ? true : undefined}
                  onClick={(event) => {
                    if (
                      !isSemanticCard ||
                      (event.target as HTMLElement).closest("button, a")
                    ) {
                      return;
                    }

                    onExpandScooter(scooter.id);
                  }}
                  className="absolute left-1/2 top-1/2 flex h-[22rem] w-[80%] max-w-[38rem] cursor-pointer flex-col overflow-hidden rounded-[1.5rem] p-4 opacity-0 shadow-[0_0_0_1px_oklch(18%_0.014_56/0.05),0_20px_52px_oklch(18%_0.014_56/0.11)] will-change-transform sm:h-[24rem] sm:w-[70%] sm:p-5 md:h-[25rem] md:w-[62%]"
                  style={getProductStackStyle(
                    scooter,
                    cardToneAssignment,
                  )}
                >
                  <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                    <div className="min-w-0">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <span className="font-ui inline-flex min-h-7 items-center rounded-full bg-white/35 px-2.5 text-[0.56rem] font-bold uppercase tracking-[0.13em] text-current shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.08)]">
                          {getCatalogScooterBrand(scooter)}
                        </span>
                        <span className="font-ui truncate text-[0.56rem] font-bold uppercase tracking-[0.13em] text-[var(--product-muted)]">
                          {scooter.family}
                        </span>
                      </div>
                      <h3 className="font-display mt-2 max-w-[16ch] text-[clamp(1.55rem,7vw,2.15rem)] font-bold leading-[0.94] tracking-[-0.025em] text-current">
                        {scooter.name}
                      </h3>
                      <p className="font-ui mt-1.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[var(--product-muted)]">
                        {scooter.subtitle}
                      </p>
                    </div>

                    <div className="relative min-h-0 flex-1">
                      <div
                        aria-hidden="true"
                        className="absolute bottom-[12%] left-1/2 h-[9%] w-[72%] -translate-x-1/2 rounded-[50%] bg-[var(--product-shadow)] blur-[11px]"
                      />
                      <Image
                        data-product-stack-vehicle
                        src={scooter.image}
                        alt={isSemanticCard ? scooter.imageAlt : ""}
                        width={780}
                        height={585}
                        sizes="(max-width: 639px) 80vw, (max-width: 767px) 70vw, (max-width: 1023px) 62vw, 1px"
                        priority={
                          isFirstChapter &&
                          isSemanticCard &&
                          index === 0
                        }
                        draggable={false}
                        className="relative z-10 h-full max-h-[13.25rem] w-full object-contain object-center will-change-transform sm:max-h-[14.5rem] md:max-h-[15rem]"
                      />
                    </div>

                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-ui text-[0.6rem] font-bold uppercase tracking-[0.13em] text-[var(--product-muted)]">
                          {scooter.displacement}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-[var(--product-muted)]">
                          {scooter.idealUse}
                        </p>
                      </div>

                      <button
                        type="button"
                        aria-expanded={expandedId === scooter.id}
                        aria-label={"Apri la scheda di " + scooter.name}
                        onClick={() => onExpandScooter(scooter.id)}
                        className="font-ui inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-white/28 px-3 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-current outline-none shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.08)] transition-[background,transform] duration-150 hover:bg-white/45 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--product-accent)]"
                      >
                        Apri
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4"
                          strokeWidth={1.8}
                        />
                      </button>
                    </div>
                  </div>

                  <div
                    data-product-depth-shade
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-30 bg-black opacity-0"
                  />
                </article>
              );
            }),
          )}
        </div>
      </div>

      <div className="font-ui mt-3 flex items-center justify-end gap-2.5 sm:mt-4">
        <span
          className="mr-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-black/46"
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
              <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.8} />
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
              <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
            </button>
          </>
        ) : null}
      </div>

      {expandedScooter ? (
        <div
          data-scooter-detail-id={expandedScooter.id}
          className="mt-5 sm:mt-6"
        >
          <CatalogProductCard
            scooter={expandedScooter}
            shouldReduceMotion={false}
            isExpanded={true}
            isSelected={true}
            transitionImageId={
              transitionImageId === expandedScooter.id
                ? transitionImageId
                : null
            }
            cardToneAssignment={cardToneAssignments[expandedScooter.id]}
            onExpandScooter={onExpandScooter}
            onCollapseScooter={onCollapseScooter}
          />
        </div>
      ) : null}
    </section>
  );
}

function CompactCatalogGrid({
  scooters,
  toneSourceScooters = scooters,
  expandedId,
  shouldReduceMotion,
  transitionImageId,
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

        chapterElements.forEach((chapterElement) => {
          const chapterId = chapterElement.dataset.chapterId as
            | CatalogChapterId
            | undefined;

          if (!chapterId) return;

          const ratio = visibility.get(chapterId) ?? 0;

          if (ratio > nextRatio) {
            nextRatio = ratio;
            nextChapter = chapterElement;
          }
        });

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
        transitionImageId={transitionImageId}
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
          transitionImageId={transitionImageId}
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
            layoutDependency={isExpanded ? `expanded-${scooter.id}` : "stable"}
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
