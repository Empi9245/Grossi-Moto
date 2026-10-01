"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Columns2, X } from "lucide-react";
import {
  catalogScooters,
  getCatalogScooterBrand,
  type CatalogScooter,
} from "@/data/catalog-scooters";
import { getCatalogGuidance } from "@/data/catalog-guidance";
import { comparisonLimit, comparisonReducer } from "@/lib/catalog-comparison";

type ComparisonContextValue = {
  ids: string[];
  message: string;
  toggle: (scooter: CatalogScooter) => void;
  clear: () => void;
  isSelecting: boolean;
  startSelecting: () => void;
  stopSelecting: () => void;
  open: (trigger: HTMLElement) => void;
  isOpen: boolean;
  close: () => void;
};

const ComparisonContext = createContext<ComparisonContextValue | null>(null);

function isUsableControl(element: HTMLElement | null): element is HTMLElement {
  return Boolean(
    element?.isConnected &&
    !element.closest('[inert], [hidden], [aria-hidden="true"]') &&
    !element.matches(':disabled, [aria-disabled="true"]') &&
    element.getClientRects().length,
  );
}

function getComparisonFocusTarget() {
  const controls = Array.from(
    document.querySelectorAll<HTMLElement>(
      "[data-comparison-open], [data-comparison-mode-trigger], #catalog-search",
    ),
  ).filter(isUsableControl);
  return (
    controls.find((element) => {
      const rect = element.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    }) ?? controls[0]
  );
}

export function useCatalogComparison() {
  const context = useContext(ComparisonContext);
  if (!context)
    throw new Error("Comparison controls require CatalogComparisonProvider");
  return context;
}

export function CatalogComparisonProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(comparisonReducer, {
    ids: [],
    message: "",
    phase: "browse",
  });
  const isOpen = state.phase === "compare";
  const isSelecting = state.phase !== "browse";
  const triggerRef = useRef<HTMLElement | null>(null);
  const focusFrameRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(focusFrameRef.current), []);

  const scheduleFocus = (action: () => void) => {
    cancelAnimationFrame(focusFrameRef.current);
    focusFrameRef.current = requestAnimationFrame(() => {
      focusFrameRef.current = 0;
      action();
    });
  };

  const restoreFocus = () => {
    scheduleFocus(() => {
      const trigger = triggerRef.current;
      const target = isUsableControl(trigger)
        ? trigger
        : getComparisonFocusTarget();
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ behavior: "instant", block: "nearest" });
    });
  };

  const open = (trigger: HTMLElement) => {
    if (state.phase !== "select" || state.ids.length < 2) return;
    triggerRef.current = trigger;
    dispatch({ type: "open" });
    scheduleFocus(() => {
      const heading = document.getElementById("catalog-comparison-title");
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ behavior: "instant", block: "start" });
    });
  };

  const close = () => {
    dispatch({ type: "close" });
    restoreFocus();
  };

  return (
    <ComparisonContext.Provider
      value={{
        ...state,
        isOpen,
        isSelecting,
        startSelecting: () => dispatch({ type: "start" }),
        stopSelecting: () => {
          const focusedControl = document.activeElement as HTMLElement | null;
          dispatch({ type: "stop" });
          scheduleFocus(() => {
            if (isUsableControl(focusedControl)) return;
            const target = getComparisonFocusTarget();
            target?.focus({ preventScroll: true });
            target?.scrollIntoView({ behavior: "instant", block: "nearest" });
          });
        },
        open,
        close,
        toggle: (scooter) => {
          if (
            isOpen &&
            state.ids.length === 2 &&
            state.ids.includes(scooter.id)
          ) {
            restoreFocus();
          }
          dispatch({ type: "toggle", id: scooter.id, name: scooter.name });
        },
        clear: () => {
          dispatch({ type: "clear" });
          restoreFocus();
        },
      }}
    >
      {children}
      <p className="sr-only" role="status" aria-atomic="true">
        {state.message}
      </p>
    </ComparisonContext.Provider>
  );
}

export function CatalogComparisonTrigger({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { ids, isSelecting, startSelecting, stopSelecting } =
    useCatalogComparison();

  return (
    <button
      type="button"
      data-comparison-mode-trigger
      aria-pressed={isSelecting}
      aria-label={
        isSelecting
          ? "Esci dalla selezione, conserva i modelli scelti"
          : ids.length
            ? `Riprendi il confronto: ${ids.length} modelli selezionati`
            : "Confronta modelli"
      }
      onClick={isSelecting ? stopSelecting : startSelecting}
      className={`font-ui inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[0.9rem] border border-black/15 font-semibold text-[#171717] outline-none hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${compact ? "px-2.5 text-[0.7rem]" : "px-3 text-xs sm:px-4 sm:text-sm"}`}
    >
      {isSelecting ? (
        <X aria-hidden="true" className="h-4 w-4" />
      ) : (
        <Columns2 aria-hidden="true" className="h-4 w-4" />
      )}
      {isSelecting
        ? "Esci"
        : compact
          ? "Confronta"
          : ids.length
            ? "Riprendi confronto"
            : "Confronta modelli"}
      {!isSelecting && ids.length ? (
        <span className="tabular-nums">({ids.length})</span>
      ) : null}
    </button>
  );
}

export function CatalogCompareButton({
  scooter,
  isSemanticInstance = true,
}: {
  scooter: CatalogScooter;
  isSemanticInstance?: boolean;
}) {
  const { ids, toggle, isSelecting } = useCatalogComparison();
  const selected = ids.includes(scooter.id);
  const isFull = ids.length >= comparisonLimit;
  if (!isSelecting) return null;

  return (
    <div
      aria-hidden={!isSemanticInstance}
      inert={!isSemanticInstance}
      data-comparison-selected={selected}
      className="mb-3 border-b border-current/15 pb-3"
    >
      <button
        type="button"
        aria-pressed={selected}
        disabled={!selected && isFull}
        aria-label={`${selected ? "Rimuovi" : "Seleziona"} ${scooter.name} ${selected ? "dal" : "per il"} confronto`}
        onClick={
          isSemanticInstance
            ? (event) => {
                event.stopPropagation();
                toggle(scooter);
              }
            : undefined
        }
        className="font-ui inline-flex min-h-11 w-full items-center gap-2.5 rounded-lg px-1 text-sm font-semibold outline-none hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-current disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span
          aria-hidden="true"
          className={`grid h-5 w-5 place-items-center rounded-[0.3rem] border ${selected ? "border-[#171717] bg-[#171717] text-white" : "border-current/50"}`}
        >
          {selected ? (
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          ) : null}
        </span>
        {selected ? "Selezionato" : "Seleziona"}
      </button>
    </div>
  );
}

function OpenComparisonButton({ compact = false }: { compact?: boolean }) {
  const { ids, open, close, isOpen } = useCatalogComparison();
  return (
    <button
      type="button"
      data-comparison-open
      aria-expanded={isOpen}
      aria-controls="confronto"
      disabled={ids.length < 2}
      onClick={(event) => (isOpen ? close() : open(event.currentTarget))}
      className={`font-ui inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[0.9rem] bg-[#171717] font-semibold text-white outline-none hover:bg-[#333] focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-black/5 disabled:text-black/55 ${compact ? "px-3 text-xs" : "px-4 text-sm"}`}
    >
      <Columns2 aria-hidden="true" className="h-4 w-4" />
      {isOpen ? "Modifica selezione" : `Confronta (${ids.length})`}
    </button>
  );
}

export function CatalogComparisonSummary({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { ids, toggle, clear, isSelecting, isOpen } = useCatalogComparison();
  if (!isSelecting || (!compact && isOpen)) return null;
  if (compact) {
    return (
      <div className="mt-1 flex items-center justify-between gap-3 border-t border-black/10 px-2 pt-2">
        <p className="text-xs font-semibold text-black/70">
          {ids.length}/{comparisonLimit} scelti
        </p>
        <OpenComparisonButton compact />
      </div>
    );
  }
  const selectedScooters = ids.flatMap((id) =>
    catalogScooters.filter((scooter) => scooter.id === id),
  );
  return (
    <section
      aria-label="Selezione per il confronto"
      className="mt-3 border-t border-black/10 pt-3"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold">Scegli 2 o 3 modelli</p>
          <p className="mt-1 min-h-10 text-xs leading-5 text-black/65 sm:min-h-5">
            {ids.length === 0
              ? "Usa Seleziona sulle schede."
              : ids.length === 1
                ? "Scegli ancora un modello."
                : ids.length === 2
                  ? "Puoi aggiungerne un terzo."
                  : "Tre modelli scelti: sei pronto."}
          </p>
        </div>
        <OpenComparisonButton />
      </div>
      <div className="mt-2 flex min-h-12 items-center gap-1.5">
        {selectedScooters.length ? (
          <>
            <div
              className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto overscroll-x-contain"
              aria-label="Modelli selezionati"
            >
              {selectedScooters.map((scooter) => (
                <button
                  key={scooter.id}
                  type="button"
                  aria-label={`Rimuovi ${scooter.name} dalla selezione`}
                  onClick={(event) => {
                    const list = event.currentTarget.parentElement;
                    toggle(scooter);
                    requestAnimationFrame(() => {
                      const target =
                        list?.querySelector<HTMLButtonElement>(
                          "button:not([data-comparison-clear])",
                        ) ?? getComparisonFocusTarget();
                      target?.focus({ preventScroll: true });
                    });
                  }}
                  className="inline-flex min-h-11 max-w-[15rem] shrink-0 items-center gap-2 rounded-lg bg-black/5 px-3 text-left text-xs font-semibold outline-none hover:bg-black/10 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset"
                >
                  <span className="min-w-0 truncate">{scooter.name}</span>
                  <X aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                </button>
              ))}
            </div>
            <button
              type="button"
              data-comparison-clear
              onClick={clear}
              className="min-h-11 shrink-0 rounded-lg px-3 text-xs text-black/65 underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset"
            >
              Svuota
            </button>
          </>
        ) : (
          <p className="text-xs text-black/50">Nessun modello selezionato</p>
        )}
      </div>
    </section>
  );
}

const rowDefinitions = [
  {
    label: "Cilindrata",
    value: (scooter: CatalogScooter) => scooter.displacement,
  },
  { label: "Impostazione", value: (scooter: CatalogScooter) => scooter.family },
  {
    label: "Per i tuoi tragitti",
    value: (scooter: CatalogScooter) => scooter.idealUse,
  },
  {
    label: "Perché sceglierlo",
    value: (scooter: CatalogScooter) => getCatalogGuidance(scooter).whyChoose,
  },
  {
    label: "Cosa valutare",
    value: (scooter: CatalogScooter) => getCatalogGuidance(scooter).tradeoff,
  },
];

export function CatalogComparison() {
  const { ids, toggle, clear, close, isOpen } = useCatalogComparison();
  const addRef = useRef<HTMLSelectElement>(null);
  const selectedScooters = ids.flatMap((id) =>
    catalogScooters.filter((scooter) => scooter.id === id),
  );
  const availableScooters = catalogScooters.filter(
    (scooter) => !ids.includes(scooter.id),
  );

  const remove = (scooter: CatalogScooter) => {
    toggle(scooter);
    if (ids.length > 2) {
      requestAnimationFrame(() =>
        addRef.current?.focus({ preventScroll: true }),
      );
    }
  };

  if (!isOpen) return <div id="confronto" hidden />;

  return (
    <section
      id="confronto"
      aria-labelledby="catalog-comparison-title"
      className="mx-5 mb-3 mt-3 scroll-mt-32 border-y border-black/10 py-6 sm:mx-7 lg:mx-10"
    >
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <h2
            id="catalog-comparison-title"
            tabIndex={-1}
            className="font-display scroll-mt-32 rounded-sm text-2xl font-bold outline-none focus-visible:ring-2 focus-visible:ring-black sm:text-3xl"
          >
            Il tuo confronto
          </h2>
          <p className="mt-2 text-sm leading-6 text-black/65">
            {ids.length} modelli, le differenze che contano per i tuoi tragitti.
          </p>
        </div>
        <button
          type="button"
          onClick={close}
          className="font-ui inline-flex min-h-12 items-center gap-2 rounded-[0.9rem] border border-black/15 px-4 py-3 text-sm font-semibold outline-none hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          Torna alla selezione
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-3">
        <div className="w-full sm:max-w-sm">
          <label
            htmlFor="comparison-add"
            className="mb-2 block text-sm font-semibold"
          >
            {ids.length < comparisonLimit
              ? "Aggiungi un terzo modello"
              : "3 di 3 modelli selezionati"}
          </label>
          <select
            id="comparison-add"
            ref={addRef}
            value=""
            disabled={ids.length >= comparisonLimit}
            onChange={(event) => {
              const scooter = catalogScooters.find(
                (item) => item.id === event.target.value,
              );
              if (scooter) {
                toggle(scooter);
                requestAnimationFrame(() => {
                  const target = document.querySelector<HTMLButtonElement>(
                    `[data-comparison-remove="${scooter.id}"]`,
                  );
                  target?.focus({ preventScroll: true });
                  target?.scrollIntoView({
                    behavior: "instant",
                    block: "nearest",
                    inline: "nearest",
                  });
                });
              }
            }}
            className="min-h-12 w-full min-w-0 rounded-[0.9rem] border border-black/20 bg-white px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-black disabled:bg-black/5 disabled:text-black/60"
          >
            <option value="">
              {ids.length >= comparisonLimit
                ? "Rimuovi un modello per cambiarlo"
                : "Scegli dalla gamma"}
            </option>
            {availableScooters.map((scooter) => (
              <option key={scooter.id} value={scooter.id}>
                {getCatalogScooterBrand(scooter)} {scooter.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={clear}
          className="min-h-12 rounded-lg px-3 text-sm underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          Svuota la selezione
        </button>
      </div>

      <div id="catalog-comparison-panel">
        <p
          id="comparison-scroll-hint"
          className="mt-6 text-xs leading-5 text-black/65 lg:sr-only"
        >
          Scorri lateralmente per vedere tutti i modelli.
        </p>
        <div
          role="region"
          aria-label="Tabella di confronto modelli"
          aria-describedby="comparison-scroll-hint"
          tabIndex={0}
          className="mt-3 max-w-full overflow-x-auto overscroll-x-contain rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          <table
            className={`w-full table-fixed border-collapse text-left text-sm ${ids.length === 3 ? "min-w-[38rem]" : "min-w-[27rem]"}`}
          >
            <caption className="sr-only">
              Confronto tra{" "}
              {selectedScooters.map((scooter) => scooter.name).join(", ")}
            </caption>
            <thead>
              <tr className="border-b border-black/15">
                <th
                  scope="col"
                  className="sticky left-0 z-10 w-20 bg-[#F7F7F7] p-2 align-bottom text-xs font-semibold sm:w-40 sm:p-3 sm:text-sm"
                >
                  Il modello
                </th>
                {selectedScooters.map((scooter) => (
                  <th scope="col" key={scooter.id} className="p-3 align-top">
                    <Image
                      src={scooter.image}
                      alt=""
                      width={320}
                      height={240}
                      sizes="(max-width: 767px) 220px, 30vw"
                      className="mb-4 h-28 w-full object-contain"
                    />
                    <span className="block text-xs font-medium text-black/60">
                      {getCatalogScooterBrand(scooter)}
                    </span>
                    <Link
                      href={`/scooters/${scooter.id}`}
                      className="mt-1 inline-block rounded-sm font-display text-xl font-bold underline decoration-black/20 underline-offset-4 outline-none hover:decoration-black focus-visible:ring-2 focus-visible:ring-black"
                    >
                      {scooter.name}
                    </Link>
                    <button
                      type="button"
                      data-comparison-remove={scooter.id}
                      aria-label={`Rimuovi ${scooter.name} dal confronto`}
                      onClick={() => remove(scooter)}
                      className="mt-2 flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-black/60 outline-none hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black"
                    >
                      <X aria-hidden="true" className="h-3.5 w-3.5" />
                      Rimuovi
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowDefinitions.map((row) => (
                <tr key={row.label} className="border-b border-black/10">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-[#F7F7F7] p-2 align-top text-xs font-semibold leading-5 sm:p-3 sm:text-sm sm:leading-6"
                  >
                    {row.label}
                  </th>
                  {selectedScooters.map((scooter) => (
                    <td
                      key={scooter.id}
                      className="p-3 align-top leading-6 text-black/75"
                    >
                      {row.value(scooter)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-[#F7F7F7] p-2 align-top text-xs font-semibold leading-5 sm:p-3 sm:text-sm sm:leading-6"
                >
                  Il prossimo passo
                </th>
                {selectedScooters.map((scooter) => (
                  <td key={scooter.id} className="p-3 align-top">
                    <Link
                      href={`/contatti?modello=${encodeURIComponent(scooter.id)}#richiesta`}
                      aria-label={`Chiedi informazioni su ${scooter.name}`}
                      className="inline-flex min-h-12 items-center rounded-lg text-sm font-semibold underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-black"
                    >
                      Chiedi informazioni
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-black/65">
          Una prima lettura della gamma. In sede valutiamo insieme posizione di
          guida, esigenze del passeggero e dotazioni della versione scelta.
          Prezzo e disponibilità sono da confermare.
        </p>
      </div>
    </section>
  );
}
