import Link from "next/link";
import { ArrowUpRight, PhoneCall } from "lucide-react";

export function ShowcaseCoverCta() {
  return (
    <section className="relative z-30 overflow-hidden bg-[oklch(13%_0.014_42)] px-4 py-20 text-[oklch(94%_0.01_80)] sm:px-6 lg:px-10 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[oklch(70%_0.06_32/0.42)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,oklch(34%_0.07_28/0.14)_44%,transparent_72%)]"
      />

      <div className="relative mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.55fr)] lg:items-end">
        <div>
          <p className="font-ui text-xs font-bold uppercase tracking-[0.18em] text-[oklch(76%_0.03_62)]">
            Grossi Moto, Roma
          </p>
          <h2 className="font-display mt-4 max-w-[12ch] text-[clamp(3.5rem,12vw,8.5rem)] font-bold leading-[0.88] tracking-normal">
            Scegli la taglia giusta, dal vivo.
          </h2>
        </div>

        <div className="max-w-[34rem]">
          <p className="text-base leading-7 text-[oklch(82%_0.012_74)] sm:text-lg">
            Le proporzioni cambiano quando sali in sella. In showroom puoi
            confrontare posizione, altezza e uso reale prima di scegliere.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/scooters"
              className="font-ui inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[oklch(91%_0.014_76)] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-[oklch(13%_0.014_42)] transition-opacity duration-200 hover:opacity-88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(72%_0.06_32)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(13%_0.014_42)] sm:w-auto"
            >
              Confronta i modelli
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </Link>
            <a
              href="tel:+393289185029"
              className="font-ui inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[oklch(94%_0.01_80/0.08)] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-[oklch(94%_0.01_80)] shadow-[inset_0_0_0_1px_oklch(94%_0.01_80/0.16)] transition-colors duration-200 hover:bg-[oklch(94%_0.01_80/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(72%_0.06_32)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(13%_0.014_42)] sm:w-auto"
            >
              Parla con Grossi Moto
              <PhoneCall aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
