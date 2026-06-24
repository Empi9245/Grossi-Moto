import { SlidersHorizontal } from "lucide-react";
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
    <div className="px-5 pt-7 sm:px-7 lg:px-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Filtra gamma per cilindrata"
          className="flex min-h-14 w-full min-w-0 gap-1 overflow-x-auto overscroll-x-contain rounded-full bg-[oklch(91.5%_0.012_78/0.72)] p-1.5 shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.1)] sm:max-w-[34rem]"
        >
          {catalogFilters.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
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

        <button
          type="button"
          aria-label="Ordina e filtra i modelli"
          onClick={() => onFilterChange("all")}
          className="font-ui inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full px-5 text-[0.74rem] font-bold tracking-[0.02em] text-[oklch(20%_0.014_56)] shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.12)] outline-none transition-[background,transform,box-shadow] duration-200 hover:bg-[oklch(88%_0.014_76/0.58)] active:translate-y-px focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(94%_0.01_78)] sm:w-auto"
        >
          Ordina e filtra
          <SlidersHorizontal
            aria-hidden="true"
            className="h-4 w-4"
            strokeWidth={1.8}
          />
        </button>
      </div>
    </div>
  );
}
