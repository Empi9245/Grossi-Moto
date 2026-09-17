"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { clsx } from "clsx";

export type CatalogVehicleFilter = "all" | "scooter" | "moto";
export type CatalogBrandFilter = "all" | "KYMCO" | "Voge";
export type CatalogDisplacementFilter =
  | "all"
  | "50cc"
  | "125cc"
  | "150-250cc"
  | "300-499cc"
  | "500cc+";

export type CatalogFilterGroup = "vehicleType" | "brand" | "displacement";
export type CatalogFilterValue =
  | CatalogVehicleFilter
  | CatalogBrandFilter
  | CatalogDisplacementFilter;

export type CatalogFilterState = {
  vehicleType: CatalogVehicleFilter;
  brand: CatalogBrandFilter;
  displacement: CatalogDisplacementFilter;
};

export type CatalogFilterCounts = {
  vehicleType: Record<CatalogVehicleFilter, number>;
  brand: Record<CatalogBrandFilter, number>;
  displacement: Record<CatalogDisplacementFilter, number>;
};

type CatalogFilterBarProps = {
  activeFilters: CatalogFilterState;
  filterCounts: CatalogFilterCounts;
  searchQuery: string;
  resultCount: number;
  totalCount: number;
  activePosition: number;
  activeBrand?: string;
  onFilterChange: (
    group: CatalogFilterGroup,
    value: CatalogFilterValue,
  ) => void;
  onResetFilters: () => void;
  onSearchChange: (query: string) => void;
};

const filterGroups = [
  {
    id: "vehicleType",
    label: "Tipo",
    options: [
      { id: "all", label: "Tutti" },
      { id: "scooter", label: "Scooter" },
      { id: "moto", label: "Moto" },
    ],
  },
  {
    id: "brand",
    label: "Marca",
    options: [
      { id: "all", label: "Tutte" },
      { id: "KYMCO", label: "KYMCO" },
      { id: "Voge", label: "Voge" },
    ],
  },
  {
    id: "displacement",
    label: "Cilindrata",
    options: [
      { id: "all", label: "Tutte" },
      { id: "50cc", label: "50 cc" },
      { id: "125cc", label: "125 cc" },
      { id: "150-250cc", label: "150–250 cc" },
      { id: "300-499cc", label: "300–499 cc" },
      { id: "500cc+", label: "500+ cc" },
    ],
  },
] as const;

function getResultLabel(resultCount: number, hasSearchQuery: boolean) {
  if (hasSearchQuery) {
    return `${resultCount} ${resultCount === 1 ? "risultato" : "risultati"}`;
  }

  return `${resultCount} ${resultCount === 1 ? "modello" : "modelli"}`;
}

function getActiveFilterValue(
  activeFilters: CatalogFilterState,
  group: CatalogFilterGroup,
) {
  return activeFilters[group];
}

function getFilterCount(
  filterCounts: CatalogFilterCounts,
  group: CatalogFilterGroup,
  value: CatalogFilterValue,
) {
  if (group === "vehicleType") {
    return filterCounts.vehicleType[value as CatalogVehicleFilter];
  }

  if (group === "brand") {
    return filterCounts.brand[value as CatalogBrandFilter];
  }

  return filterCounts.displacement[value as CatalogDisplacementFilter];
}

function getFilterOptionLabel(
  group: CatalogFilterGroup,
  value: CatalogFilterValue,
) {
  if (group === "vehicleType") {
    if (value === "scooter") return "Scooter";
    if (value === "moto") return "Moto";
    return "Tutti";
  }

  if (group === "brand") {
    if (value === "KYMCO") return "KYMCO";
    if (value === "Voge") return "Voge";
    return "Tutte";
  }

  if (value === "50cc") return "50 cc";
  if (value === "125cc") return "125 cc";
  if (value === "150-250cc") return "150–250 cc";
  if (value === "300-499cc") return "300–499 cc";
  if (value === "500cc+") return "500+ cc";
  return "Tutte";
}

export function CatalogFilterBar({
  activeFilters,
  filterCounts,
  searchQuery,
  resultCount,
  totalCount,
  activePosition,
  activeBrand,
  onFilterChange,
  onResetFilters,
  onSearchChange,
}: CatalogFilterBarProps) {
  const controlsRef = useRef<HTMLDivElement>(null);
  const filterDialogRef = useRef<HTMLDialogElement>(null);
  const lastFilterTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [showCompactToolbar, setShowCompactToolbar] = useState(false);
  const [compactSearchOpen, setCompactSearchOpen] = useState(false);
  const hasSearchQuery = searchQuery.trim().length > 0;
  const resultLabel = getResultLabel(resultCount, hasSearchQuery);
  const activeFilterCount = Object.values(activeFilters).filter(
    (value) => value !== "all",
  ).length;
  const hasActiveFilter = activeFilterCount > 0;

  useEffect(() => {
    const controls = controlsRef.current;

    if (!controls || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldShow = !entry.isIntersecting;

        setShowCompactToolbar(shouldShow);
        if (!shouldShow) {
          setCompactSearchOpen(false);
        }
      },
      {
        rootMargin: "-8px 0px 0px 0px",
        threshold: 0.08,
      },
    );

    observer.observe(controls);
    return () => observer.disconnect();
  }, []);

  const openFilterDialog = (trigger: HTMLButtonElement) => {
    lastFilterTriggerRef.current = trigger;
    filterDialogRef.current?.showModal();
  };

  const closeFilterDialog = () => {
    filterDialogRef.current?.close();
  };

  return (
    <>
      <div
        ref={controlsRef}
        className="catalog-filter-bar relative z-30 bg-white px-5 pb-3 pt-5 sm:px-7 sm:pt-7 lg:sticky lg:top-0 lg:px-10"
      >
        <div className="grid gap-3 lg:grid-cols-[minmax(17rem,0.52fr)_minmax(34rem,1.2fr)_auto] lg:items-center">
          <div className="relative min-w-0 sm:max-w-[30rem] lg:max-w-none">
            <label htmlFor="catalog-search" className="sr-only">
              Cerca nella gamma
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45"
              strokeWidth={1.8}
            />
            <input
              id="catalog-search"
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Cerca modello, marca o cilindrata"
              autoComplete="off"
              className="font-ui min-h-14 w-full rounded-full border border-black/10 bg-[#F7F7F7] py-3 pl-11 pr-12 text-sm font-medium text-black outline-none transition-[border-color,box-shadow,background] duration-200 placeholder:text-black/42 focus:border-black/30 focus:bg-white focus:ring-2 focus:ring-black/10"
            />
            {hasSearchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Cancella ricerca"
                className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-black/55 outline-none transition-colors duration-200 hover:bg-black/[0.06] hover:text-black focus-visible:ring-2 focus-visible:ring-black/35"
              >
                <X aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </button>
            ) : null}
          </div>

          <div
            className="hidden min-w-0 grid-cols-3 gap-2 lg:grid"
            aria-label="Filtri catalogo"
          >
            {filterGroups.map((group) => {
              const activeValue = getActiveFilterValue(activeFilters, group.id);
              const hasGroupFilter = activeValue !== "all";

              return (
                <label
                  key={group.id}
                  className={clsx(
                    "relative flex min-h-14 min-w-0 items-center rounded-[1rem] border bg-white px-4 transition-[border-color,box-shadow,background] duration-200 focus-within:ring-2 focus-within:ring-black/10",
                    hasGroupFilter
                      ? "border-black/25 bg-[#F7F7F7]"
                      : "border-black/10",
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="font-ui block text-[0.54rem] font-bold uppercase tracking-[0.13em] text-black/40">
                      {group.label}
                    </span>
                    <span className="font-ui mt-0.5 block truncate text-[0.76rem] font-bold text-black">
                      {getFilterOptionLabel(group.id, activeValue)}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className="ml-2 h-4 w-4 shrink-0 text-black/45"
                    strokeWidth={1.8}
                  />
                  <select
                    aria-label={`Filtra per ${group.label.toLocaleLowerCase("it-IT")}`}
                    value={activeValue}
                    onChange={(event) =>
                      onFilterChange(
                        group.id,
                        event.target.value as CatalogFilterValue,
                      )
                    }
                    className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
                  >
                    {group.options.map((option) => {
                      const count = getFilterCount(
                        filterCounts,
                        group.id,
                        option.id,
                      );
                      const isActive = option.id === activeValue;

                      return (
                        <option
                          key={option.id}
                          value={option.id}
                          disabled={count === 0 && !isActive}
                        >
                          {option.label} ({count})
                        </option>
                      );
                    })}
                  </select>
                </label>
              );
            })}
          </div>

          <div
            aria-live="polite"
            aria-atomic="true"
            className="font-ui hidden min-h-11 items-center justify-end gap-3 whitespace-nowrap text-[0.7rem] font-bold uppercase tracking-[0.12em] text-black/55 lg:flex"
          >
            <span>{resultLabel}</span>
            {resultCount !== totalCount ? (
              <span className="text-black/35">su {totalCount}</span>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-3 lg:hidden">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-pressed={hasActiveFilter}
              onClick={(event) => openFilterDialog(event.currentTarget)}
              className={clsx(
                "font-ui inline-flex min-h-12 items-center gap-2 rounded-full border px-4 text-[0.7rem] font-bold uppercase tracking-[0.08em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-black/35",
                hasActiveFilter
                  ? "border-black bg-black text-white"
                  : "border-black/10 bg-[#F3F3F3] text-black hover:bg-black/[0.07]",
              )}
            >
              <SlidersHorizontal
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.8}
              />
              Filtri
              {activeFilterCount > 0 ? (
                <span
                  aria-label={`${activeFilterCount} filtri attivi`}
                  className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[0.6rem] text-black"
                >
                  {activeFilterCount}
                </span>
              ) : null}
            </button>

            <div
              aria-live="polite"
              aria-atomic="true"
              className="font-ui text-right text-[0.68rem] font-bold uppercase tracking-[0.11em] text-black/55"
            >
              <span>{resultLabel}</span>
              {resultCount !== totalCount ? (
                <span className="ml-2 text-black/35">su {totalCount}</span>
              ) : null}
            </div>
          </div>
        </div>

        {hasActiveFilter ? (
          <div
            className="mt-3 flex flex-wrap items-center gap-2"
            aria-label="Filtri applicati"
          >
            {filterGroups.map((group) => {
              const activeValue = getActiveFilterValue(activeFilters, group.id);

              if (activeValue === "all") {
                return null;
              }

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => onFilterChange(group.id, "all")}
                  className="font-ui inline-flex min-h-9 items-center gap-2 rounded-full border border-black/10 bg-white px-3 text-[0.65rem] font-bold uppercase tracking-[0.07em] text-black outline-none transition-colors hover:bg-[#F3F3F3] focus-visible:ring-2 focus-visible:ring-black/35"
                  aria-label={`Rimuovi filtro ${group.label}: ${getFilterOptionLabel(group.id, activeValue)}`}
                >
                  <span className="text-black/45">{group.label}</span>
                  <span>{getFilterOptionLabel(group.id, activeValue)}</span>
                  <X aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              );
            })}

            <button
              type="button"
              onClick={onResetFilters}
              className="font-ui min-h-9 rounded-full px-3 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-black/45 outline-none transition-colors hover:bg-black/[0.05] hover:text-black focus-visible:ring-2 focus-visible:ring-black/35"
            >
              Azzera
            </button>
          </div>
        ) : null}
      </div>

      <div
        aria-hidden={!showCompactToolbar}
        inert={!showCompactToolbar}
        className="sticky z-40 h-0 px-3 lg:hidden"
        style={{ top: "max(0.5rem, env(safe-area-inset-top))" }}
      >
        <div
          className={clsx(
            "mx-auto max-w-xl rounded-[1.1rem] border border-black/10 bg-white p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.10)] transition-[opacity,transform] duration-200 motion-reduce:transition-none",
            showCompactToolbar
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0",
          )}
        >
          {compactSearchOpen ? (
            <div
              id="compact-catalog-search"
              className="flex min-h-12 items-center gap-1.5"
            >
              <div className="relative min-w-0 flex-1">
                <label htmlFor="catalog-search-compact" className="sr-only">
                  Cerca nella gamma
                </label>
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45"
                  strokeWidth={1.8}
                />
                <input
                  id="catalog-search-compact"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder="Cerca modello, marca o cilindrata"
                  autoComplete="off"
                  autoFocus
                  className="font-ui min-h-11 w-full rounded-[0.85rem] bg-[#F3F3F3] py-2.5 pl-10 pr-10 text-sm font-medium text-black outline-none ring-1 ring-inset ring-black/10 placeholder:text-black/42 focus:bg-white focus:ring-2 focus:ring-black/20"
                />
                {hasSearchQuery ? (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    aria-label="Cancella ricerca"
                    className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-black/55 outline-none hover:bg-black/[0.06] focus-visible:ring-2 focus-visible:ring-black/35"
                  >
                    <X
                      aria-hidden="true"
                      className="h-4 w-4"
                      strokeWidth={1.8}
                    />
                  </button>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setCompactSearchOpen(false)}
                className="font-ui min-h-11 shrink-0 rounded-[0.85rem] px-3 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-black/60 outline-none hover:bg-black/[0.05] focus-visible:ring-2 focus-visible:ring-black/35"
              >
                Chiudi
              </button>
            </div>
          ) : (
            <div className="flex min-h-12 items-center gap-1">
              <button
                type="button"
                aria-expanded={false}
                aria-controls="compact-catalog-search"
                onClick={() => setCompactSearchOpen(true)}
                className="font-ui inline-flex min-h-11 items-center gap-2 rounded-[0.85rem] px-3 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-black outline-none transition-colors hover:bg-black/[0.05] focus-visible:ring-2 focus-visible:ring-black/35"
              >
                <Search
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
                Cerca
              </button>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-pressed={hasActiveFilter}
                onClick={(event) => openFilterDialog(event.currentTarget)}
                className={clsx(
                  "font-ui inline-flex min-h-11 items-center gap-2 rounded-[0.85rem] px-3 text-[0.7rem] font-bold uppercase tracking-[0.08em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-black/35",
                  hasActiveFilter
                    ? "bg-black text-white hover:bg-black/85"
                    : "text-black hover:bg-black/[0.05]",
                )}
              >
                <SlidersHorizontal
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
                Filtri
                {activeFilterCount > 0 ? (
                  <span className="grid h-4 min-w-4 place-items-center rounded-full bg-white px-1 text-[0.52rem] text-black">
                    {activeFilterCount}
                  </span>
                ) : null}
              </button>

              <div
                className="ml-auto min-w-0 px-2 text-right"
                aria-label="Posizione nel catalogo"
              >
                <span className="font-ui block truncate text-[0.55rem] font-bold uppercase tracking-[0.12em] text-black/45">
                  {activeBrand ?? "Gamma"}
                </span>
                <span className="font-ui mt-0.5 block whitespace-nowrap text-[0.72rem] font-bold text-black">
                  {resultCount > 0 && activePosition > 0
                    ? `${activePosition} di ${resultCount}`
                    : resultLabel}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <dialog
        ref={filterDialogRef}
        aria-labelledby="catalog-filter-dialog-title"
        onClose={() => lastFilterTriggerRef.current?.focus()}
        className="fixed inset-x-0 bottom-0 top-auto m-0 max-h-[82dvh] w-full max-w-none rounded-t-[1.5rem] bg-white p-0 text-black shadow-[0_-20px_60px_rgba(0,0,0,0.16)] backdrop:bg-black/25 lg:hidden"
      >
        <div className="flex max-h-[82dvh] flex-col">
          <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-5 py-4">
            <div>
              <p className="font-ui text-[0.58rem] font-bold uppercase tracking-[0.15em] text-black/45">
                Gamma
              </p>
              <h2
                id="catalog-filter-dialog-title"
                className="font-display mt-1 text-xl font-bold"
              >
                Filtra i modelli
              </h2>
            </div>
            <button
              type="button"
              onClick={closeFilterDialog}
              aria-label="Chiudi filtri"
              className="grid h-11 w-11 place-items-center rounded-full bg-[#F3F3F3] outline-none hover:bg-black/[0.08] focus-visible:ring-2 focus-visible:ring-black/35"
            >
              <X aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
            <div className="grid gap-6">
              {filterGroups.map((group) => {
                const activeValue = getActiveFilterValue(
                  activeFilters,
                  group.id,
                );

                return (
                  <fieldset key={group.id}>
                    <legend className="font-ui mb-2.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-black/45">
                      {group.label}
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                      {group.options.map((option) => {
                        const count = getFilterCount(
                          filterCounts,
                          group.id,
                          option.id,
                        );
                        const isActive = option.id === activeValue;
                        const isDisabled = count === 0 && !isActive;

                        return (
                          <button
                            key={option.id}
                            type="button"
                            aria-pressed={isActive}
                            disabled={isDisabled}
                            onClick={() =>
                              onFilterChange(group.id, option.id)
                            }
                            className={clsx(
                              "font-ui flex min-h-12 w-full items-center justify-between rounded-[0.95rem] border px-3.5 text-left text-sm font-bold outline-none transition-colors motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-black/35 disabled:cursor-not-allowed disabled:opacity-35",
                              isActive
                                ? "border-black bg-black text-white"
                                : "border-black/10 bg-white text-black hover:bg-[#F5F5F5]",
                            )}
                          >
                            <span>{option.label}</span>
                            <span
                              className={clsx(
                                "ml-2 text-[0.62rem] tabular-nums",
                                isActive ? "text-white/70" : "text-black/40",
                              )}
                            >
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              })}
            </div>
          </div>

          <div
            className="shrink-0 border-t border-black/10 bg-white px-5 pt-3"
            style={{
              paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
            }}
          >
            <div className="flex items-center gap-2">
              {hasActiveFilter ? (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="font-ui min-h-12 rounded-[0.95rem] border border-black/10 bg-white px-4 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-black outline-none hover:bg-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-black/35"
                >
                  Azzera
                </button>
              ) : null}
              <button
                type="button"
                onClick={closeFilterDialog}
                className="font-ui min-h-12 flex-1 rounded-[0.95rem] bg-black px-5 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-white outline-none transition-colors hover:bg-black/85 focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-2"
              >
                {resultCount === 1
                  ? "Mostra 1 modello"
                  : `Mostra ${resultCount} modelli`}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
