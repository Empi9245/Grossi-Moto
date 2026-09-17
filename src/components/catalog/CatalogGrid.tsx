"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { CatalogProductCard } from "@/components/catalog/CatalogProductCard";
import type { CatalogScooter } from "@/data/catalog-scooters";
import { getCatalogCardToneAssignments } from "@/data/scooter-color-system";

type CatalogGridProps = {
  scooters: CatalogScooter[];
  expandedId: string | null;
  isCompactViewport: boolean;
  shouldReduceMotion: boolean;
  transitionImageId: string | null;
  onExpandScooter: (scooterId: string) => void;
  onCollapseScooter: () => void;
};

type CatalogGridVariantProps = Omit<CatalogGridProps, "isCompactViewport">;

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

function EmptyCatalogState({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      className="rounded-[1.35rem] bg-[oklch(94%_0.01_78/0.58)] p-6 text-[oklch(28%_0.014_56/0.68)] shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.08)]"
    >
      <p className="font-ui text-[0.7rem] font-bold uppercase tracking-[0.14em]">
        Nessun modello in questo filtro
      </p>
      <p className="mt-3 max-w-[28rem] text-sm leading-6">
        Nessun modello corrisponde a questo filtro. Seleziona Tutti per vedere la
        gamma completa.
      </p>
    </motion.div>
  );
}

function CompactCatalogGrid({
  scooters,
  expandedId,
  shouldReduceMotion,
  transitionImageId,
  onExpandScooter,
  onCollapseScooter,
}: CatalogGridVariantProps) {
  const cardToneAssignments = useMemo(
    () => getCatalogCardToneAssignments(scooters, 1),
    [scooters],
  );

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
  expandedId,
  shouldReduceMotion,
  transitionImageId,
  onExpandScooter,
  onCollapseScooter,
}: CatalogGridVariantProps) {
  const cardToneAssignments = useMemo(
    () => getCatalogCardToneAssignments(scooters, desktopCatalogColumnCount),
    [scooters],
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
  expandedId,
  isCompactViewport,
  shouldReduceMotion,
  transitionImageId,
  onExpandScooter,
  onCollapseScooter,
}: CatalogGridProps) {
  if (scooters.length === 0) {
    return (
      <div id="catalog-list" aria-label="Modelli in gamma">
        <EmptyCatalogState shouldReduceMotion={shouldReduceMotion} />
      </div>
    );
  }

  const variantProps: CatalogGridVariantProps = {
    scooters,
    expandedId,
    shouldReduceMotion,
    transitionImageId,
    onExpandScooter,
    onCollapseScooter,
  };

  return isCompactViewport ? (
    <CompactCatalogGrid {...variantProps} />
  ) : (
    <DesktopCatalogGrid {...variantProps} />
  );
}
