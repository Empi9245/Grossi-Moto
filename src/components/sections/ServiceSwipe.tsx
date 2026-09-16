"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUp } from "lucide-react";

type Service = {
  title: string;
  statement: string;
  description: string;
  features: string[];
  image: string;
  alt: string;
};

/** Native vertical paging keeps touch momentum and releases scroll at either end. */
export function ServiceSwipe({ services }: { services: Service[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const top = element.getBoundingClientRect().top;
        let nearest = 0;
        let distance = Infinity;
        Array.from(element.children).forEach((child, index) => {
          const next = Math.abs(child.getBoundingClientRect().top - top);
          if (next < distance) { distance = next; nearest = index; }
        });
        setActive(nearest);
      });
    };
    const resize = new ResizeObserver(update);
    resize.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => element.scrollTo({ top: element.scrollTop, behavior: "instant" });
    preference.addEventListener("change", stop);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      element.removeEventListener("scroll", update);
      preference.removeEventListener("change", stop);
    };
  }, []);

  function go(index: number, instant = false) {
    const element = rail.current;
    const child = element?.children[index];
    if (!element || !child) return;
    element.scrollTo({
      top: element.scrollTop + child.getBoundingClientRect().top - element.getBoundingClientRect().top,
      behavior: instant || matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <div className="px-5 pb-12 sm:px-7 md:px-10 lg:hidden">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p id="service-swipe-hint" className="text-xs font-medium">Scorri verso l’alto per cambiare servizio</p>
        <span className="shrink-0 text-sm tabular-nums" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
      </div>
      <div
        ref={rail}
        role="region"
        aria-label="I nostri servizi, sequenza verticale"
        aria-describedby="service-swipe-hint"
        tabIndex={0}
        data-lenis-prevent
        className="h-[min(760px,78svh)] min-h-[420px] snap-y snap-mandatory overflow-y-auto rounded-2xl bg-[#DAD4CB] [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B0E0D] motion-reduce:snap-none"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          const index = event.key === "ArrowDown" || event.key === "PageDown" ? active + 1 : event.key === "ArrowUp" || event.key === "PageUp" ? active - 1 : event.key === "Home" ? 0 : event.key === "End" ? services.length - 1 : -1;
          if (index < 0 || index >= services.length) return;
          event.preventDefault();
          go(index, true);
        }}
      >
        {services.map((service, index) => (
          <article key={service.title} className="flex min-h-full snap-start snap-always flex-col bg-[#DAD4CB]">
            <div className="relative h-[clamp(160px,26svh,280px)] shrink-0 overflow-hidden">
              <Image src={service.image} alt={service.alt} fill sizes="(max-width: 767px) 100vw, 90vw" className="object-cover" />
              <span className="absolute bottom-3 left-4 bg-[#E7E3DC] px-3 py-1 text-xs font-semibold tabular-nums">{String(index + 1).padStart(2, "0")} — {service.title}</span>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5 sm:p-7">
              <h3 className="font-display max-w-[25ch] text-[clamp(1.65rem,4.8vw,2.6rem)] font-bold leading-[1.05] tracking-tight">{service.statement}</h3>
              <p className="max-w-[60ch] text-sm leading-6 sm:text-base">{service.description}</p>
              <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-[#1B0E0D]/20 pt-4 text-xs leading-5">
                {service.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <span className="text-[10px] text-[#1B0E0D]/65">Immagini illustrative</span>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <a href="tel:+393289185029" className="inline-flex min-h-12 items-center text-sm font-semibold underline underline-offset-4">Parliamone insieme</a>
        <div className="flex gap-2">
          {([-1, 1] as const).map((direction) => (
            <button key={direction} type="button" aria-label={direction === -1 ? "Servizio precedente" : "Servizio successivo"} aria-disabled={active + direction < 0 || active + direction >= services.length} onClick={(event) => go(active + direction, event.detail === 0)} className="flex size-12 items-center justify-center rounded-full border border-[#1B0E0D]/30 transition-colors hover:bg-[#E7E3DC] focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:opacity-30">
              {direction === -1 ? <ArrowUp aria-hidden="true" size={20} /> : <ArrowDown aria-hidden="true" size={20} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
