import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, PhoneCall } from "lucide-react";

const hours = [
  "Lun-Ven 08:30-13:00 / 14:30-19:00",
  "Sabato 08:30-13:00",
  "Domenica chiuso",
];

export function ContactBriefSection() {
  return (
    <section className="bg-[oklch(88%_0.015_78)] px-4 py-14 text-[oklch(17%_0.014_50)] sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[92rem] gap-8 border-y border-[oklch(18%_0.014_56/0.14)] py-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(23rem,0.52fr)] lg:items-center">
        <div>
          <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[oklch(36%_0.09_28)]">
            Contatti e orari
          </p>
          <h2 className="font-display mt-4 text-[clamp(2.3rem,6vw,4.8rem)] font-bold leading-[0.92] tracking-normal">
            Grossi Moto di Angelo Grossi
          </h2>
          <div className="mt-6 grid gap-4 text-sm leading-6 text-[oklch(29%_0.014_56/0.74)] sm:grid-cols-2">
            <p className="flex gap-3">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(36%_0.09_28)]"
                strokeWidth={1.7}
              />
              <span>Via Festo Porzio, 22, 00174 Roma RM</span>
            </p>
            <p className="flex gap-3">
              <PhoneCall
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(36%_0.09_28)]"
                strokeWidth={1.7}
              />
              <a href="tel:+393289185029" className="hover:text-[oklch(36%_0.09_28)]">
                +39 328 918 5029
              </a>
            </p>
          </div>
        </div>

        <div>
          <div className="flex gap-3 text-sm leading-6 text-[oklch(29%_0.014_56/0.74)]">
            <Clock
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(36%_0.09_28)]"
              strokeWidth={1.7}
            />
            <ul className="space-y-1">
              {hours.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href="tel:+393289185029"
              className="font-ui inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[oklch(16%_0.014_48)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-[oklch(94%_0.01_78)] transition-[background,transform] duration-200 hover:bg-[oklch(22%_0.016_50)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(88%_0.015_78)]"
            >
              Chiama ora
            </a>
            <a
              href="https://share.google/ppfR023TdQcVrYya3"
              className="font-ui inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[oklch(18%_0.014_56/0.06)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-[oklch(18%_0.014_56)] shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.12)] transition-[background,transform] duration-200 hover:bg-[oklch(18%_0.014_56/0.09)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(88%_0.015_78)]"
            >
              Apri su Google Maps
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </a>
            <Link
              href="/contatti"
              className="font-ui inline-flex min-h-11 items-center justify-center rounded-full bg-transparent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-[oklch(18%_0.014_56)] transition-colors duration-200 hover:text-[oklch(36%_0.09_28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(88%_0.015_78)]"
            >
              Scrivici cosa ti serve
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
