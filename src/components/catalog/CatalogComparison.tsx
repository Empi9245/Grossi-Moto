"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Columns2, Plus, X } from "lucide-react";
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
  open: (trigger: HTMLElement) => void;
  isOpen: boolean;
  close: () => void;
};

const ComparisonContext = createContext<ComparisonContextValue | null>(null);

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
  });
  const [isOpen, setIsOpen] = useState(false);
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
      const canRestoreTrigger =
        trigger?.isConnected &&
        !trigger.closest("[inert], [hidden]") &&
        trigger.getClientRects().length > 0;
      const target = canRestoreTrigger
        ? trigger
        : document.getElementById("catalog-search");
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ behavior: "instant", block: "nearest" });
    });
  };

  const open = (trigger: HTMLElement) => {
    if (state.ids.length === 0) return;
    triggerRef.current = trigger;
    setIsOpen(true);
    scheduleFocus(() => {
      const heading = document.getElementById("catalog-comparison-title");
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ behavior: "instant", block: "start" });
    });
  };

  const close = () => {
    setIsOpen(false);
    restoreFocus();
  };

  return (
    <ComparisonContext.Provider
      value={{
        ...state,
        isOpen,
        open,
        close,
        toggle: (scooter) => {
          if (state.ids.length === 1 && state.ids.includes(scooter.id)) {
            setIsOpen(false);
            if (isOpen && document.activeElement?.closest("#confronto")) {
              restoreFocus();
            }
          }
          dispatch({ type: "toggle", id: scooter.id, name: scooter.name });
        },
        clear: () => {
          dispatch({ type: "clear" });
          setIsOpen(false);
          if (isOpen) restoreFocus();
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
  const { ids, open, close, isOpen } = useCatalogComparison();
  if (ids.length === 0) return null;

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls="confronto"
      aria-label={`${isOpen ? "Chiudi" : "Apri"} confronto: ${ids.length} ${ids.length === 1 ? "modello selezionato" : "modelli selezionati"}`}
      onClick={(event) => (isOpen ? close() : open(event.currentTarget))}
      className={`font-ui inline-flex min-h-12 shrink-0 items-center justify-center rounded-[0.9rem] bg-[#171717] font-semibold text-white outline-none hover:bg-[#333] focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${compact ? "gap-1.5 px-2.5 text-[0.7rem]" : "gap-2 px-3 text-sm sm:px-4"}`}
    >
      <Columns2 aria-hidden="true" className="h-4 w-4 shrink-0" />
      Confronto <span className="tabular-nums">({ids.length})</span>
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
  const { ids, toggle, open, isOpen } = useCatalogComparison();
  const selected = ids.includes(scooter.id);
  const isFull = ids.length >= comparisonLimit;

  return (
    <div
      aria-hidden={!isSemanticInstance}
      inert={!isSemanticInstance}
      className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-current/15 pt-2"
    >
      <button
        type="button"
        aria-pressed={selected}
        aria-disabled={!selected && isFull}
        aria-label={`${selected ? "Rimuovi" : "Aggiungi"} ${scooter.name} ${selected ? "dal" : "al"} confronto${!selected && isFull ? ": limite di tre raggiunto" : ""}`}
        onClick={isSemanticInstance ? () => toggle(scooter) : undefined}
        className={`font-ui inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-current ${!selected && isFull ? "opacity-60" : "hover:underline hover:underline-offset-4"}`}
      >
        {selected ? (
          <Check aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Plus aria-hidden="true" className="h-4 w-4" />
        )}
        {selected
          ? "Nel confronto"
          : isFull
            ? "Confronto completo"
            : "Confronta"}
      </button>
      {ids.length > 0 ? (
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="confronto"
          aria-label={`Apri il confronto, ${ids.length} ${ids.length === 1 ? "modello selezionato" : "modelli selezionati"}`}
          title="Apri il confronto"
          onClick={
            isSemanticInstance
              ? (event) => open(event.currentTarget)
              : undefined
          }
          className="font-ui inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-lg border border-current/15 px-2 text-xs font-semibold outline-none hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-current"
        >
          <Columns2 aria-hidden="true" className="h-3.5 w-3.5" />
          <span className="tabular-nums">{ids.length}</span>
        </button>
      ) : null}
    </div>
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
    if (ids.length > 1) {
      requestAnimationFrame(() =>
        addRef.current?.focus({ preventScroll: true }),
      );
    }
  };

  if (!isOpen || ids.length === 0) return <div id="confronto" hidden />;

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
            La tua scelta, a confronto.
          </h2>
          <p className="mt-2 text-sm leading-6 text-black/65">
            {ids.length === 1
              ? "Aggiungi un secondo modello per leggere le differenze."
              : "Leggi le differenze tra i modelli che hai scelto."}{" "}
            La selezione resta mentre cambi i filtri.
          </p>
        </div>
        <button
          type="button"
          onClick={close}
          className="font-ui inline-flex min-h-12 items-center gap-2 rounded-[0.9rem] border border-black/15 px-4 py-3 text-sm font-semibold outline-none hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          Chiudi confronto
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
              ? `Aggiungi un modello (${ids.length}/${comparisonLimit})`
              : "Tre modelli selezionati"}
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
              if (scooter) toggle(scooter);
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
        {selectedScooters.map((scooter) => (
          <button
            key={scooter.id}
            type="button"
            onClick={() => remove(scooter)}
            aria-label={`Rimuovi ${scooter.name} dal confronto`}
            className="inline-flex min-h-12 max-w-full items-center gap-3 rounded-full bg-[#F3F3F3] px-4 py-2 text-left text-sm font-semibold outline-none hover:bg-black/10 focus-visible:ring-2 focus-visible:ring-black"
          >
            <span className="min-w-0 break-words">{scooter.name}</span>
            <X aria-hidden="true" className="h-4 w-4 shrink-0" />
          </button>
        ))}
        {ids.length > 0 ? (
          <button
            type="button"
            onClick={clear}
            className="min-h-12 rounded-lg px-3 text-sm underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            Svuota
          </button>
        ) : null}
      </div>

      <div id="catalog-comparison-panel" hidden={!isOpen}>
        {isOpen && selectedScooters.length >= 2 ? (
          <>
            <p
              id="comparison-scroll-hint"
              className="mt-6 text-sm leading-6 text-black/65"
            >
              Su schermi piccoli scorri la tabella lateralmente per leggere
              tutti i modelli.
            </p>
            <div
              role="region"
              aria-label="Tabella di confronto modelli"
              aria-describedby="comparison-scroll-hint"
              tabIndex={0}
              className="mt-3 max-w-full overflow-x-auto overscroll-x-contain rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <table className="w-full min-w-[42rem] table-fixed border-collapse text-left text-sm">
                <caption className="sr-only">
                  Confronto tra{" "}
                  {selectedScooters.map((scooter) => scooter.name).join(", ")}
                </caption>
                <thead>
                  <tr className="border-b border-black/15">
                    <th
                      scope="col"
                      className="w-32 p-3 align-bottom font-semibold sm:w-40"
                    >
                      Il modello
                    </th>
                    {selectedScooters.map((scooter) => (
                      <th
                        scope="col"
                        key={scooter.id}
                        className="p-3 align-top"
                        style={{
                          width: `${100 / (selectedScooters.length + 1)}%`,
                        }}
                      >
                        <Image
                          src={scooter.image}
                          alt=""
                          width={320}
                          height={240}
                          sizes="(max-width: 767px) 220px, 30vw"
                          className="mb-4 h-32 w-full object-contain"
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
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowDefinitions.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-black/10 even:bg-[#F7F7F7]"
                    >
                      <th
                        scope="row"
                        className="p-3 align-top font-semibold leading-6"
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
                      className="p-3 align-top font-semibold leading-6"
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
              Una prima lettura della gamma. In sede valutiamo insieme posizione
              di guida, esigenze del passeggero e dotazioni della versione
              scelta. Prezzo e disponibilità sono da confermare.
            </p>
          </>
        ) : isOpen ? (
          <p className="mt-5 text-sm leading-6 text-black/70">
            Aggiungi{" "}
            {selectedScooters.length === 1 ? "un altro modello" : "due modelli"}{" "}
            per leggere il confronto.
          </p>
        ) : null}
      </div>
    </section>
  );
}
