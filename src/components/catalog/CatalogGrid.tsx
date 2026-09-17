"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

import { CatalogProductCard } from "@/components/catalog/CatalogProductCard";
import type { CatalogScooter } from "@/data/catalog-scooters";
import { getCatalogCardToneAssignments } from "@/data/scooter-color-system";

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
