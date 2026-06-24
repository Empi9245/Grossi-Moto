"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { CatalogProductCard } from "@/components/catalog/CatalogProductCard";
import type { CatalogScooter } from "@/data/catalog-scooters";
import { getCatalogCardToneAssignments } from "@/data/scooter-color-system";

type CatalogGridProps = {
  scooters: CatalogScooter[];
  expandedId: string | null;
  shouldReduceMotion: boolean;
  transitionImageId: string | null;
  onExpandScooter: (scooterId: string) => void;
  onCollapseScooter: () => void;
};

const defaultCatalogColumnCount = 4;
const expandedCatalogSlotSpan = 2;

function isOutsideExpandedSlot(
  columnIndex: number,
  targetColumnIndex: number,
  expandedSlotSpan: number,
) {
  return (
    columnIndex < targetColumnIndex ||
    columnIndex >= targetColumnIndex + expandedSlotSpan
  );
}

function getCatalogColumnCount() {
  if (typeof window === "undefined") {
    return defaultCatalogColumnCount;
  }

  if (window.matchMedia("(min-width: 1280px)").matches) {
    return 4;
  }

  if (window.matchMedia("(min-width: 1024px)").matches) {
    return 4;
  }

  if (window.matchMedia("(min-width: 768px)").matches) {
    return 2;
  }

  return 1;
}

function useCatalogColumnCount() {
  const [columnCount, setColumnCount] = useState(defaultCatalogColumnCount);

  useEffect(() => {
    const mediaQueries = [
      window.matchMedia("(min-width: 768px)"),
      window.matchMedia("(min-width: 1024px)"),
      window.matchMedia("(min-width: 1280px)"),
    ];
    const updateColumnCount = () => setColumnCount(getCatalogColumnCount());

    updateColumnCount();
    mediaQueries.forEach((mediaQuery) =>
      mediaQuery.addEventListener("change", updateColumnCount),
    );

    return () => {
      mediaQueries.forEach((mediaQuery) =>
        mediaQuery.removeEventListener("change", updateColumnCount),
      );
    };
  }, []);

  return columnCount;
}

function getCatalogGridOrder(
  scooters: CatalogScooter[],
  expandedId: string | null,
  columnCount: number,
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

  const safeColumnCount = Math.max(1, columnCount);
  const expandedSlotSpan = Math.min(expandedCatalogSlotSpan, safeColumnCount);

  if (expandedSlotSpan === 1) {
    return scooters;
  }

  const rowStartIndex =
    Math.floor(expandedIndex / safeColumnCount) * safeColumnCount;
  const expandedColumnIndex = expandedIndex - rowStartIndex;
  const lastAvailableExpandedColumn = safeColumnCount - expandedSlotSpan;
  const targetColumnIndex = Math.min(
    expandedColumnIndex,
    lastAvailableExpandedColumn,
  );
  const expandedScooter = scooters[expandedIndex];
  const rowScooters = scooters.slice(
    rowStartIndex,
    rowStartIndex + safeColumnCount,
  );
  const beforeExpandedSlots = rowScooters
    .filter((scooter) => scooter.id !== expandedId)
    .slice(0, targetColumnIndex);
  const afterExpandedSlots = rowScooters
    .slice(expandedIndex - rowStartIndex + 1)
    .slice(0, safeColumnCount - targetColumnIndex - expandedSlotSpan);
  const topRowScooterIds = new Set([
    expandedId,
    ...beforeExpandedSlots.map((scooter) => scooter.id),
    ...afterExpandedSlots.map((scooter) => scooter.id),
  ]);
  const lowerStream = [
    ...rowScooters.filter((scooter) => !topRowScooterIds.has(scooter.id)),
    ...scooters.slice(rowStartIndex + safeColumnCount),
  ];
  const firstLowerRow = lowerStream.slice(0, safeColumnCount);
  const outsideExpandedSlotScooters = firstLowerRow.filter((_, columnIndex) =>
    isOutsideExpandedSlot(columnIndex, targetColumnIndex, expandedSlotSpan),
  );
  const underExpandedSlotScooters = firstLowerRow.filter(
    (_, columnIndex) =>
      !isOutsideExpandedSlot(columnIndex, targetColumnIndex, expandedSlotSpan),
  );

  // The expanded card occupies two logical compact rows. Move the cards from
  // the first lower row that sit outside its footprint before the blocked ones,
  // so normal grid placement fills the visible gaps without dense reordering.
  return [
    ...scooters.slice(0, rowStartIndex),
    ...beforeExpandedSlots,
    expandedScooter,
    ...afterExpandedSlots,
    ...outsideExpandedSlotScooters,
    ...underExpandedSlotScooters,
    ...lowerStream.slice(safeColumnCount),
  ];
}

export function CatalogGrid({
  scooters,
  expandedId,
  shouldReduceMotion,
  transitionImageId,
  onExpandScooter,
  onCollapseScooter,
}: CatalogGridProps) {
  const columnCount = useCatalogColumnCount();
  const layoutDependency = `${expandedId ?? "closed"}-${columnCount}`;
  const orderedScooters = useMemo(
    () => getCatalogGridOrder(scooters, expandedId, columnCount),
    [columnCount, expandedId, scooters],
  );
  const cardToneAssignments = useMemo(
    () => getCatalogCardToneAssignments(orderedScooters, columnCount),
    [columnCount, orderedScooters],
  );

  return (
    <div
      id="catalog-list"
      aria-label="Modelli in gamma"
      className="grid grid-cols-1 content-start items-start gap-4 [grid-auto-flow:row] [grid-auto-rows:minmax(19.5rem,auto)] md:grid-cols-2 lg:grid-cols-12"
    >
      {orderedScooters.map((scooter) => (
        <CatalogProductCard
          key={scooter.id}
          scooter={scooter}
          shouldReduceMotion={shouldReduceMotion}
          isExpanded={expandedId === scooter.id}
          transitionImageId={transitionImageId}
          cardToneAssignment={cardToneAssignments[scooter.id]}
          layoutDependency={layoutDependency}
          onExpandScooter={onExpandScooter}
          onCollapseScooter={onCollapseScooter}
        />
      ))}

      {scooters.length === 0 ? (
        <motion.div
          key="empty-catalog-filter"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 10, filter: "blur(4px)" }
          }
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          exit={
            shouldReduceMotion
              ? undefined
              : { opacity: 0, y: -6, filter: "blur(3px)" }
          }
          className="rounded-[1.35rem] bg-[oklch(94%_0.01_78/0.58)] p-6 text-[oklch(28%_0.014_56/0.68)] shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.08)] md:col-span-2 lg:col-span-12"
        >
          <p className="font-ui text-[0.7rem] font-bold uppercase tracking-[0.14em]">
            Gamma filtrata
          </p>
          <p className="mt-3 max-w-[28rem] text-sm leading-6">
            Nessun modello visibile per questo filtro. Torna su Tutti per
            confrontare la gamma completa.
          </p>
        </motion.div>
      ) : null}
    </div>
  );
}
