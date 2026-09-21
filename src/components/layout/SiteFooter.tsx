import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Gamma", href: "/scooters" },
  { label: "Servizi", href: "/servizi" },
  { label: "Contatti", href: "/contatti" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export function SiteFooter() {
  return (
    <footer data-call-cta-theme="white" className="bg-[var(--gm-black)] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[92rem] gap-8 pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div>
          <p className="font-ui text-lg font-bold tracking-normal">Grossimoto</p>
          <p className="mt-1 text-sm text-white/62">
            Grossi Moto di Angelo Grossi
          </p>
          <p className="mt-4 text-sm font-medium text-white/86">
            Moto, scooter e assistenza a Roma
          </p>
          <p className="mt-2 max-w-[28rem] text-sm leading-6 text-white/62">
            Via Festo Porzio, 22, 00174 Roma RM
            <br />
            <a href="tel:+393289185029" className="hover:text-white">
              +39 328 918 5029
            </a>
            <br />
            <a href="mailto:info@grossimoto.it" className="hover:text-white">info@grossimoto.it</a>
            <br />
            <a href="https://share.google/ppfR023TdQcVrYya3" target="_blank" rel="noopener noreferrer" className="hover:text-white">Google Maps</a>
          </p>
        </div>

        <nav
          aria-label="Link footer Grossimoto"
          className="font-ui flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold uppercase tracking-[0.08em] text-white/86 md:justify-end"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--gm-black)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
