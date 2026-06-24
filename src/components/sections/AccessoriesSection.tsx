import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";

type AccessoryBlock = {
  title: string;
  copy: string;
  items: string[];
  icon: LucideIcon;
};

const accessoryBlocks: AccessoryBlock[] = [
  {
    title: "Protezione personale",
    copy: "Scelta guidata per accessori da usare ogni giorno, con taglie e compatibilita da verificare in sede.",
    items: ["Caschi", "Guanti e abbigliamento tecnico"],
    icon: ShieldCheck,
  },
  {
    title: "Comfort urbano",
    copy: "Soluzioni pratiche per rendere lo scooter piu adatto a lavoro, commissioni e tragitti lunghi.",
    items: ["Bauletti", "Parabrezza"],
    icon: PackageCheck,
  },
  {
    title: "Sicurezza e sosta",
    copy: "Dispositivi e montaggi pensati per lasciare lo scooter con piu tranquillita nei quartieri di Roma.",
    items: ["Antifurti", "Accessori KYMCO e compatibili"],
    icon: Wrench,
  },
  {
    title: "Uso quotidiano",
    copy: "Dettagli piccoli, ma decisivi quando lo scooter diventa il mezzo principale della giornata.",
    items: ["Supporti smartphone", "Accessori KYMCO e compatibili"],
    icon: Smartphone,
  },
];

export function AccessoriesSection() {
  return (
    <section className="bg-[oklch(91%_0.014_78)] px-4 py-16 text-[oklch(17%_0.014_50)] sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[92rem]">
        <div className="grid gap-8 border-t border-[oklch(18%_0.014_56/0.14)] pt-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(26rem,0.52fr)] lg:items-end">
          <div>
            <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[oklch(36%_0.09_28)]">
              Accessori
            </p>
            <h2 className="font-display mt-4 max-w-[12ch] text-[clamp(2.6rem,7vw,5.8rem)] font-bold leading-[0.9] tracking-normal">
              Tutto quello che serve, scelto sul tuo scooter.
            </h2>
          </div>
          <div>
            <p className="max-w-[38rem] text-base leading-7 text-[oklch(29%_0.014_56/0.72)] sm:text-lg">
              Non un e-commerce generico: accessori disponibili o ordinabili
              con verifica diretta di compatibilita, montaggio e uso reale.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+393289185029"
                className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(16%_0.014_48)] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[oklch(94%_0.01_78)] transition-[background,transform] duration-200 hover:bg-[oklch(22%_0.016_50)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(91%_0.014_78)]"
              >
                Chiedi disponibilit&agrave;
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </a>
              <Link
                href="/servizi"
                className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(18%_0.014_56/0.06)] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[oklch(18%_0.014_56)] shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.12)] transition-[background,transform] duration-200 hover:bg-[oklch(18%_0.014_56/0.09)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(91%_0.014_78)]"
              >
                Scopri i servizi
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-[1.15fr_0.95fr_1.05fr_0.9fr]">
          {accessoryBlocks.map((block) => {
            const Icon = block.icon;

            return (
              <article
                key={block.title}
                className="border-t border-[oklch(18%_0.014_56/0.13)] pt-5"
              >
                <Icon
                  aria-hidden="true"
                  className="h-6 w-6 text-[oklch(36%_0.09_28)]"
                  strokeWidth={1.6}
                />
                <h3 className="font-ui mt-5 text-xl font-bold tracking-normal text-[oklch(16%_0.014_50)]">
                  {block.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[oklch(29%_0.014_56/0.68)]">
                  {block.copy}
                </p>
                <ul className="mt-5 space-y-2 text-sm font-medium text-[oklch(22%_0.014_56)]">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(36%_0.09_28)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
