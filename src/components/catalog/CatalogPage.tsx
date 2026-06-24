"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, Gauge, Layers2 } from "lucide-react";

import { CatalogFilterBar } from "@/components/catalog/CatalogFilterBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { CatalogNavbar } from "@/components/catalog/CatalogNavbar";
import { usePageTransition } from "@/components/transitions/PageTransitionProvider";
import {
  catalogBrandCount,
  catalogScooters,
  type CatalogFilter,
  getCatalogScooterById,
} from "@/data/catalog-scooters";

function filterScooters(activeFilter: CatalogFilter) {
  if (activeFilter === "all") {
    return catalogScooters;
  }

  return catalogScooters.filter(
    (scooter) => scooter.filterCategory === activeFilter,
  );
}

export function CatalogPage({ initialFocusId }: { initialFocusId?: string }) {
  const { activeScooterId, shouldReduceMotion, source } = usePageTransition();
  const initialExpandedId = getCatalogScooterById(initialFocusId)?.id ?? null;
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(
    () => initialExpandedId,
  );
  const transitionImageId =
    source === "showroom" && activeScooterId === expandedId
      ? activeScooterId
      : null;

  const visibleScooters = useMemo(
    () => filterScooters(activeFilter),
    [activeFilter],
  );

  const handleFilterChange = (nextFilter: CatalogFilter) => {
    const nextVisibleScooters = filterScooters(nextFilter);

    setActiveFilter(nextFilter);
    setExpandedId((currentExpandedId) =>
      currentExpandedId &&
      nextVisibleScooters.some((scooter) => scooter.id === currentExpandedId)
        ? currentExpandedId
        : null,
    );
  };

  return (
    <main className="min-h-[100dvh] overflow-x-clip bg-[oklch(88%_0.015_78)] p-2.5 text-[oklch(18%_0.014_56)] sm:p-4 lg:p-5">
      <div className="mx-auto max-w-[122rem] overflow-hidden rounded-[1.55rem] bg-[oklch(94.5%_0.011_78)] shadow-[0_0_0_1px_oklch(18%_0.014_56/0.045),0_28px_70px_oklch(18%_0.014_56/0.1)]">
        <CatalogNavbar />

        <section className="px-5 pt-8 sm:px-7 sm:pt-10 lg:px-10 lg:pt-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(34rem,0.92fr)] lg:items-end">
            <div>
              <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[oklch(30%_0.014_56/0.62)]">
                Catalogo KYMCO e Voge
              </p>
              <h1 className="font-display mt-3 max-w-[12ch] text-[clamp(3.2rem,10vw,6.8rem)] font-bold leading-[0.88] tracking-normal text-[oklch(15%_0.014_50)]">
                Tutta la gamma
              </h1>
              <p className="mt-5 max-w-[39rem] text-sm leading-6 text-[oklch(30%_0.014_56/0.66)] sm:text-base">
                Scopri scooter KYMCO, modelli KYMCO Sport e gamma Voge in un
                unico catalogo, con brand, cilindrata e assetto dichiarati su
                ogni scheda.
              </p>
            </div>

            <dl className="grid gap-4 sm:grid-cols-3 lg:justify-self-end">
              <div className="flex items-center gap-3 border-t border-[oklch(18%_0.014_56/0.1)] pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <BadgeCheck
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 text-[oklch(28%_0.014_56/0.58)]"
                  strokeWidth={1.6}
                />
                <div>
                  <dt className="font-ui text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[oklch(30%_0.014_56/0.55)]">
                    Modelli
                  </dt>
                  <dd className="font-display -mt-0.5 text-3xl font-bold leading-none text-[oklch(16%_0.014_50)]">
                    {catalogScooters.length}
                  </dd>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-[oklch(18%_0.014_56/0.1)] pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <Layers2
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 text-[oklch(28%_0.014_56/0.58)]"
                  strokeWidth={1.6}
                />
                <div>
                  <dt className="font-ui text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[oklch(30%_0.014_56/0.55)]">
                    Marchi
                  </dt>
                  <dd className="font-display -mt-0.5 text-3xl font-bold leading-none text-[oklch(16%_0.014_50)]">
                    {catalogBrandCount}
                  </dd>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-[oklch(18%_0.014_56/0.1)] pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <Gauge
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 text-[oklch(28%_0.014_56/0.58)]"
                  strokeWidth={1.6}
                />
                <div>
                  <dt className="font-ui text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[oklch(30%_0.014_56/0.55)]">
                    Cilindrata
                  </dt>
                  <dd className="font-display -mt-0.5 whitespace-nowrap text-2xl font-bold leading-none text-[oklch(16%_0.014_50)] sm:text-3xl">
                    50cc - 900cc
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </section>

        <CatalogFilterBar
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        <section
          aria-label="Catalogo modelli KYMCO e Voge Grossimoto"
          className="px-5 pb-8 pt-6 sm:px-7 sm:pb-10 lg:px-10"
        >
          <CatalogGrid
            scooters={visibleScooters}
            expandedId={expandedId}
            shouldReduceMotion={shouldReduceMotion}
            transitionImageId={transitionImageId}
            onExpandScooter={setExpandedId}
            onCollapseScooter={() => setExpandedId(null)}
          />
        </section>
      </div>
    </main>
  );
}
