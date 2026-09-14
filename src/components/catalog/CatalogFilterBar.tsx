import { clsx } from "clsx";

import { catalogFilters, type CatalogFilter } from "@/data/catalog-scooters";

type CatalogFilterBarProps = {
  activeFilter: CatalogFilter;
  onFilterChange: (filter: CatalogFilter) => void;
};

export function CatalogFilterBar({
  activeFilter,
  onFilterChange,
}: CatalogFilterBarProps) {
  return (
    <div className="catalog-filter-bar sticky top-0 z-30 bg-[oklch(94.5%_0.011_78/0.9)] px-5 pb-3 pt-5 backdrop-blur-xl sm:px-7 sm:pt-7 lg:px-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          aria-label="Filtra i modelli per cilindrata"
          className="hide-scrollbar flex min-h-14 w-full min-w-0 gap-1 overflow-x-auto overscroll-x-contain rounded-full bg-[oklch(91.5%_0.012_78/0.72)] p-1.5 shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.1)] sm:max-w-[34rem]"
          role="group"
        >
          {catalogFilters.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onFilterChange(filter.id)}
                className={clsx(
                  "font-ui inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-[0.74rem] font-bold tracking-[0.02em] outline-none transition-[background,color,box-shadow,transform] duration-200 active:translate-y-px focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(94%_0.01_78)]",
                  isActive
                    ? "bg-[oklch(16%_0.014_48)] text-[oklch(94%_0.01_78)] shadow-[0_8px_18px_oklch(18%_0.014_56/0.16)]"
                    : "text-[oklch(26%_0.014_56/0.72)] hover:bg-[oklch(88%_0.014_76/0.62)] hover:text-[oklch(18%_0.014_56)]",
                )}
              >
                {filter.label}
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-current opacity-80"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
