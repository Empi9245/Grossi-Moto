import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, PhoneCall } from "lucide-react";

const hours = [
  "Lun-Ven 08:30-13:00 / 14:30-19:00",
  "Sabato 08:30-13:00",
  "Domenica chiuso",
];

export function ContactBriefSection() {
  return (
    <section className="rounded-[32px] bg-[var(--home-contact-surface)] px-4 py-14 text-[var(--gm-ink)] sm:rounded-[40px] sm:px-6 lg:rounded-[56px] lg:px-10">
      <div className="mx-auto grid max-w-[92rem] gap-8 py-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(23rem,0.52fr)] lg:items-center">
        <div>
          <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em] text-black/55">
            Contatti e orari
          </p>
          <h2 className="font-display mt-4 text-[clamp(2.3rem,6vw,4.8rem)] font-bold leading-[0.92] tracking-normal">
            Grossi Moto di Angelo Grossi
          </h2>
          <div className="mt-6 grid gap-4 text-sm leading-6 text-black/68 sm:grid-cols-2">
            <p className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-black/55" strokeWidth={1.7} />
              <span>Via Festo Porzio, 22, 00174 Roma RM</span>
            </p>
            <p className="flex gap-3">
              <PhoneCall aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-black/55" strokeWidth={1.7} />
              <a href="tel:+393289185029" className="hover:text-black">+39 328 918 5029</a>
            </p>
          </div>
        </div>

        <div>
          <div className="flex gap-3 text-sm leading-6 text-black/68">
            <Clock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-black/55" strokeWidth={1.7} />
            <ul className="space-y-1">
              {hours.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href="tel:+393289185029"
              className="font-ui inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--gm-black)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white transition-[background,transform] duration-200 hover:bg-[var(--gm-charcoal)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--home-contact-surface)]"
            >
              Chiama ora
            </a>
            <a
              href="https://share.google/ppfR023TdQcVrYya3"
              className="font-ui inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/12 bg-black/[0.035] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-black transition-[background,transform] duration-200 hover:bg-black/[0.07] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--home-contact-surface)]"
            >
              Apri su Google Maps
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </a>
            <Link
              href="/contatti"
              className="font-ui inline-flex min-h-11 items-center justify-center rounded-full bg-transparent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-black transition-colors duration-200 hover:text-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--home-contact-surface)]"
            >
              Scrivici cosa ti serve
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
