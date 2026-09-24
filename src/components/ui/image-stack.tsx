"use client";

import { DirectionMark } from "@/components/ui/control-glyphs";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

import { animate, motion, useDragControls, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue, type PanInfo } from "framer-motion";

import { advanceOrder, shouldAdvanceSwipe } from "@/lib/swipe-stack";

export type SwipeCard = { id: string | number; src: string; alt?: string; title?: string; description?: string };
export type SwipeUpCardStackProps<T extends SwipeCard = SwipeCard> = {
  cards: T[]; swipeThreshold?: number; velocityThreshold?: number;
  onChange?: (activeCard: T) => void; onSwipe?: (swipedCard: T) => void;
  showControls?: boolean; loop?: boolean;
  /** Horizontal uses a left swipe and leaves native vertical page scrolling enabled. */
  direction?: "up" | "left";
  renderCard?: (card: T, active: boolean) => ReactNode;
  className?: string; label?: string;
};

/** Smartphone deck. Its parent decides when to mount it; it never creates a desktop layout.
 * Remote src values use next/image and must be allowed in the host app's remotePatterns.
 */
export function SwipeUpCardStack<T extends SwipeCard>(props: SwipeUpCardStackProps<T>) {
  return <Deck key={JSON.stringify(props.cards.map(c => c.id))} {...props} />;
}

function Deck<T extends SwipeCard>({ cards, swipeThreshold = 100, velocityThreshold = 500, onChange, onSwipe, showControls = true, loop = true, direction = "up", renderCard, className = "aspect-[5/7]", label = "Sfoglia le schede" }: SwipeUpCardStackProps<T>) {
  const [order, setOrder] = useState(() => cards.map(c => c.id));
  const [history, setHistory] = useState<Array<typeof order>>([]);
  const [busy, setBusy] = useState(false);
  const locked = useRef(false);
  const region = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(false);
  const mounted = useRef(true);
  const animation = useRef<ReturnType<typeof animate> | null>(null);
  const position = useMotionValue(0);
  const reduced = useReducedMotion();
  const hint = useId();
  const isShowroom = label === "Scooter in showroom";
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; animation.current?.stop(); }; }, []);
  useEffect(() => {
    if (restoreFocus.current) {
      region.current?.querySelector<HTMLElement>('[data-stack-card="true"][tabindex="0"]')?.focus({ preventScroll: true });
      restoreFocus.current = false;
    }
  }, [order]);
  const active = cards.find(c => c.id === order[0]);
  const canAdvance = order.length > 1;
  function cancel() {
    if (locked.current) return;
    animation.current?.stop();
    animation.current = animate(position, 0, reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 });
  }
  async function next() {
    if (!active || !canAdvance || locked.current) return;
    restoreFocus.current = document.activeElement?.getAttribute("data-stack-card") === "true";
    locked.current = true; setBusy(true);
    animation.current?.stop();
    const destination = -(direction === "up" ? window.innerHeight : window.innerWidth) * 1.2;
    animation.current = animate(position, destination, { duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] });
    await animation.current;
    if (!mounted.current) return;
    const updated = advanceOrder(order, loop);
    setHistory(previous => [...previous.slice(-49), order]);
    setOrder(updated); position.set(0); locked.current = false; setBusy(false);
    onSwipe?.(active);
    const following = cards.find(c => c.id === updated[0]);
    if (following) onChange?.(following);
  }
  function undo() {
    if (locked.current || !history.length) return;
    animation.current?.stop(); position.set(0);
    const previous = history[history.length - 1]; setOrder(previous); setHistory(history.slice(0, -1));
    const card = cards.find(c => c.id === previous[0]); if (card) onChange?.(card);
  }
  if (!active) return <p className="py-6 text-sm">Nessuna scheda disponibile.</p>;
  const activePosition = cards.findIndex(c => c.id === active.id) + 1;
  const activeNumber = String(activePosition).padStart(2, "0");
  const totalNumber = String(cards.length).padStart(2, "0");
  return (
    <div className="w-full min-w-0 overflow-x-clip pb-[env(safe-area-inset-bottom)]">
      <p id={hint} className={isShowroom ? "font-ui mb-4 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-black/45" : "mb-4 text-xs"}>{isShowroom ? "Scorri verso l’alto per esplorare la gamma." : direction === "up" ? "Scorri la prima scheda verso l’alto. Scorri la pagina dai bordi." : "Scorri la prima scheda verso sinistra."}</p>
      <div ref={region} role="group" aria-label={label} aria-describedby={hint} aria-busy={busy} className={`relative isolate w-full min-w-0 ${className}`}>
        {order.slice(0, 3).map((id, index) => {
          const card = cards.find(c => c.id === id)!;
          return <DeckLayer key={id} index={index} position={position} direction={direction} reduced={Boolean(reduced)} enabled={canAdvance && !busy} cancel={cancel} advance={next} threshold={swipeThreshold} velocityThreshold={velocityThreshold}>
            {renderCard ? renderCard(card, index === 0) : <article className="relative h-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg"><Image src={card.src} alt={card.alt ?? ""} fill sizes="100vw" className="object-cover" draggable={false} />{(card.title || card.description) && <div className="absolute inset-x-0 bottom-0 bg-black/75 p-5 text-white"><h3 className="text-2xl font-bold">{card.title}</h3><p className="mt-2 text-sm">{card.description}</p></div>}</article>}
          </DeckLayer>;
        })}
      </div>
      {isShowroom ? (
        <div className="mt-6 flex items-end justify-between gap-4 border-t border-black/10 pt-4">
          <div role="status" aria-live="polite" aria-atomic="true" className="min-w-0">
            <p className="font-ui flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-black/42">
              <span className="font-numeric text-black/75">{activeNumber}</span>
              <span aria-hidden="true" className="h-px w-5 bg-black/18" />
              <span className="font-numeric">{totalNumber}</span>
            </p>
            {active.title ? <p className="font-display mt-1.5 truncate text-lg font-bold leading-none text-black/88">{active.title}</p> : null}
          </div>
          {showControls && <div className="flex shrink-0 gap-2.5"><button type="button" aria-label="Modello precedente" title="Modello precedente" disabled={!history.length || busy} onClick={undo} className="inline-flex h-11 w-11 items-center justify-center group rounded-[0.8rem] border border-black/12 bg-white text-black transition-[background-color,border-color,color,transform] duration-200 hover:border-black hover:bg-black hover:text-white active:scale-[0.97] disabled:pointer-events-none disabled:border-black/8 disabled:bg-white/50 disabled:text-black/25 focus-visible:outline-2 focus-visible:outline-offset-4"><DirectionMark direction="previous" /></button><button type="button" aria-label="Modello successivo" title="Modello successivo" disabled={!canAdvance || busy} onClick={() => void next()} className="inline-flex h-11 w-11 items-center justify-center group rounded-[0.8rem] border border-black/12 bg-white text-black transition-[background-color,border-color,color,transform] duration-200 hover:border-black hover:bg-black hover:text-white active:scale-[0.97] disabled:pointer-events-none disabled:border-black/8 disabled:bg-white/50 disabled:text-black/25 focus-visible:outline-2 focus-visible:outline-offset-4"><DirectionMark direction="next" /></button></div>}
        </div>
      ) : (
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
          <p role="status" aria-live="polite" aria-atomic="true" className="text-xs">{activePosition} / {cards.length} · {active.title}</p>
          {showControls && <div className="flex gap-2"><button type="button" disabled={!history.length || busy} onClick={undo} className="min-h-11 rounded-[0.9rem] border border-current px-4 text-sm disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-4">Annulla</button><button type="button" disabled={!canAdvance || busy} onClick={() => void next()} className="min-h-11 rounded-[0.9rem] border border-current px-4 text-sm disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-4">Successiva</button></div>}
        </div>
      )}
    </div>
  );
}

function DeckLayer({ children, index, position, direction, reduced, enabled, cancel, advance, threshold, velocityThreshold }: { children: ReactNode; index: number; position: MotionValue<number>; direction: "up" | "left"; reduced: boolean; enabled: boolean; cancel: () => void; advance: () => Promise<void>; threshold: number; velocityThreshold: number }) {
  const controls = useDragControls();
  const cancelled = useRef(false);
  const dragged = useRef(false);
  const axis = direction === "up" ? "y" : "x";
  const distance = useTransform(position, value => Math.min(1, Math.max(0, -value / threshold)));
  const offset = useTransform(distance, p => index ? (index - p) * 12 : 0);
  const stackOffset = useSpring(offset, { stiffness: 420, damping: 34 });
  const scale = useTransform(distance, p => reduced ? 1 : index ? 1 - (index - p) * 0.045 : 1 + p * 0.025);
  const stackScale = useSpring(scale, { stiffness: 420, damping: 34 });
  const rotate = useTransform(distance, p => reduced || index ? 0 : -p * 3);
  const opacity = useTransform(position, value => index ? 1 - Math.max(0, index - Math.min(1, Math.max(0, -value / threshold))) * 0.08 : Math.max(0, 1 - Math.max(0, -value - threshold) / 500));
  function end(_: unknown, info: PanInfo) {
    if (cancelled.current) return;
    const delta = info.offset[axis]; const velocity = info.velocity[axis];
    if (shouldAdvanceSwipe(delta, velocity, threshold, velocityThreshold)) void advance();
    else cancel();
  }
  return <motion.div
    data-stack-card="true"
    className="absolute inset-0 origin-bottom focus-visible:outline-2 focus-visible:outline-offset-4"
    style={{ zIndex: 3 - index, x: index === 0 && axis === "x" ? position : 0, y: index === 0 && axis === "y" ? position : reduced ? offset : stackOffset, scale: index && !reduced ? stackScale : scale, rotate, opacity, touchAction: index === 0 && enabled ? direction === "up" ? "none" : "pan-y" : "auto", pointerEvents: index === 0 ? "auto" : "none" }}
    aria-hidden={index !== 0} inert={index !== 0} tabIndex={index === 0 ? 0 : -1}
    drag={index === 0 && enabled ? axis : false} dragControls={controls} dragMomentum={false}
    dragConstraints={direction === "up" ? { bottom: 0 } : { right: 0 }} dragElastic={0.08}
    onDragStart={() => { cancelled.current = false; dragged.current = false; }}
    onDrag={(_, info) => { if (Math.abs(info.offset[axis]) > 8) dragged.current = true; }}
    onDragEnd={end}
    onPointerCancel={() => { cancelled.current = true; controls.stop(); cancel(); }}
    onClickCapture={event => { if (dragged.current) { event.preventDefault(); event.stopPropagation(); dragged.current = false; } }}
    onPointerDownCapture={() => { dragged.current = false; }}
    onKeyDown={event => {
      if (event.key === "Escape") { event.preventDefault(); cancelled.current = true; controls.stop(); cancel(); }
      else if (event.target === event.currentTarget && event.key === (direction === "up" ? "ArrowUp" : "ArrowLeft")) { event.preventDefault(); void advance(); }
    }}
  >{children}</motion.div>;
}
