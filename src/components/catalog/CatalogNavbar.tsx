import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

const navItems = [
  { label: "Gamma", href: "/scooters" },
  { label: "Servizi", href: "/servizi" },
  { label: "Contatti", href: "/contatti" },
];

function isInternalHref(href: string) {
  return href.startsWith("/");
}

export function CatalogNavbar() {
  return (
    <header className="border-b border-[oklch(18%_0.014_56/0.1)]">
      <nav
        aria-label="Navigazione catalogo Grossimoto"
        className="flex min-h-[4.8rem] flex-wrap items-center justify-between gap-3 px-4 py-3 text-[oklch(18%_0.014_56)] sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-7"
      >
        <Link
          href="/"
          aria-label="Torna alla home Grossimoto"
          className="font-ui group flex min-w-0 flex-col rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(94%_0.01_78)]"
        >
          <span className="text-base font-bold leading-none tracking-normal text-[oklch(17%_0.014_56)] transition-opacity duration-200 group-hover:opacity-75 sm:text-lg">
            Grossimoto
          </span>
          <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.17em] text-[oklch(30%_0.014_56/0.62)]">
            Scooter a Roma
          </span>
        </Link>

        <div className="font-ui hidden min-h-11 items-center gap-1 rounded-full bg-[oklch(16%_0.014_48)] p-1 text-sm font-bold text-[oklch(92%_0.012_78)] shadow-[inset_0_0_0_1px_oklch(96%_0.008_80/0.08),0_12px_28px_oklch(18%_0.014_56/0.16)] lg:flex">
          {navItems.map((item) =>
            isInternalHref(item.href) ? (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-6 py-2.5 transition-colors duration-200 hover:bg-[oklch(92%_0.012_78/0.1)] hover:text-[oklch(97%_0.008_78)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(76%_0.04_72)]"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-6 py-2.5 transition-colors duration-200 hover:bg-[oklch(92%_0.012_78/0.1)] hover:text-[oklch(97%_0.008_78)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(76%_0.04_72)]"
              >
                {item.label}
              </a>
            ),
          )}
        </div>

        <div className="order-2 flex shrink-0 items-center justify-end gap-2 lg:order-none">
          <a
            href="tel:+393289185029"
            className="font-ui inline-flex min-h-11 items-center gap-2 rounded-full bg-[oklch(16%_0.014_48)] px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[oklch(94%_0.01_78)] shadow-[0_12px_30px_oklch(18%_0.014_56/0.18)] outline-none transition-[background,transform] duration-200 hover:bg-[oklch(22%_0.016_50)] active:translate-y-px focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(94%_0.01_78)] sm:px-4"
          >
            <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            <span className="hidden sm:inline">Chiama ora</span>
            <span className="sm:hidden">Chiama</span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={1.8}
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
