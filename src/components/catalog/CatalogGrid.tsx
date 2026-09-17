"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  CatalogProductCard,
  CatalogProductDetail,
} from "@/components/catalog/CatalogProductCard";
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
const rowLayoutDuration = 0.26;
const detailRevealDuration = 0.18;

function getDesktopCatalogRows(scooters: CatalogScooter[]) {
  const rows: CatalogScooter[][] = [];

  for (let index = 0; index < scooters.length; index += desktopCatalogColumnCount) {
    rows.push(scooters.slice(index, index + desktopCatalogColumnCount));
  }

  return rows;
}

function getRowLayoutDependency(
  rowIndex: number,
  expandedRowIndex: number,
) {
  if (expandedRowIndex < 0 || rowIndex < expandedRowIndex) {
    return "stable";
  }

  return `${rowIndex === expandedRowIndex ? "detail" : "after-detail"}-${expandedRowIndex}`;
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
  const desktopRows = useMemo(() => getDesktopCatalogRows(scooters), [scooters]);
  const cardToneAssignments = useMemo(
    () => getCatalogCardToneAssignments(scooters, desktopCatalogColumnCount),
    [scooters],
  );
  const expandedIndex = expandedId
    ? scooters.findIndex((scooter) => scooter.id === expandedId)
    : -1;
  const expandedScooter = expandedIndex >= 0 ? scooters[expandedIndex] : null;
  const expandedRowIndex =
    expandedIndex >= 0
      ? Math.floor(expandedIndex / desktopCatalogColumnCount)
      : -1;

  return (
    <div id="catalog-list" aria-label="Modelli in gamma" className="space-y-4">
      {desktopRows.map((row, rowIndex) => {
        const rowExpandedScooter =
          rowIndex === expandedRowIndex ? expandedScooter : null;
        const rowKey = `catalog-row-${row[0]?.id ?? rowIndex}`;

        return (
          <motion.div
            key={rowKey}
            layout={shouldReduceMotion ? false : "position"}
            layoutDependency={getRowLayoutDependency(
              rowIndex,
              expandedRowIndex,
            )}
            transition={{
              layout: {
                duration: shouldReduceMotion ? 0.01 : rowLayoutDuration,
                ease: productEase,
              },
            }}
            className="grid grid-cols-12 items-start gap-4"
          >
            {row.map((scooter) => {
              const isSelected = expandedId === scooter.id;

              return (
                <CatalogProductCard
                  key={scooter.id}
                  scooter={scooter}
                  shouldReduceMotion={shouldReduceMotion}
                  isExpanded={false}
                  isSelected={isSelected}
                  transitionImageId={null}
                  ariaControlsId={`catalog-detail-${scooter.id}`}
                  cardToneAssignment={cardToneAssignments[scooter.id]}
                  isPriority={scooter.id === scooters[0]?.id}
                  onExpandScooter={onExpandScooter}
                  onCollapseScooter={onCollapseScooter}
                />
              );
            })}

            <AnimatePresence initial={false} mode="popLayout">
              {rowExpandedScooter ? (
                <motion.div
                  key={`catalog-detail-${rowExpandedScooter.id}`}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 8 }
                  }
                  animate={
                    shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  exit={
                    shouldReduceMotion ? undefined : { opacity: 0, y: -6 }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : detailRevealDuration,
                    ease: productEase,
                  }}
                  className="relative z-10 col-span-12 min-w-0"
                >
                  <CatalogProductDetail
                    scooter={rowExpandedScooter}
                    shouldReduceMotion={shouldReduceMotion}
                    transitionImageId={transitionImageId}
                    cardToneAssignment={
                      cardToneAssignments[rowExpandedScooter.id]
                    }
                    onCollapseScooter={onCollapseScooter}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
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
