import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = pageMetadata("Cookie Policy", "Informazioni sui cookie del sito Grossi Moto.", "/cookie-policy");

export default function CookiePolicyPage() {
  return (<><main id="main-content" className="min-h-screen [--page-background:var(--gm-warm-surface)] bg-[var(--page-background)] px-5 py-8 text-[var(--ink)] sm:px-8 lg:px-12"><Link href="/" className="font-ui inline-flex min-h-10 items-center rounded-full text-sm font-bold uppercase tracking-[0.08em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)]">← Torna alla Home</Link><article className="mx-auto mt-16 max-w-3xl pb-24"><p className="font-ui text-xs font-bold uppercase tracking-[0.18em] text-[oklch(36%_0.09_28)]">Cookie</p><h1 className="font-display mt-4 text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9]">Cookie policy.</h1><p className="mt-8 text-lg leading-8 text-[oklch(29%_0.014_56/0.78)]">Nel codice attuale del progetto non risultano analytics, pixel, Google Tag Manager, cookie non tecnici o embed che impostano cookie.</p><p className="mt-6 text-base leading-8 text-[oklch(29%_0.014_56/0.82)]">Se in futuro verranno aggiunti strumenti di misurazione, marketing o contenuti incorporati che usano cookie, sarà necessario aggiornare questa pagina e configurare il consenso prima della loro attivazione.</p></article></main><SiteFooter /></>);
}
