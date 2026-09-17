import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = pageMetadata("Privacy Policy", "Informativa privacy del modulo contatti Grossi Moto.", "/privacy");

export default function PrivacyPage() {
  return (
    <>
      <main id="main-content" className="min-h-screen [--page-background:var(--gm-warm-surface)] bg-[var(--page-background)] px-5 py-8 text-[var(--ink)] sm:px-8 lg:px-12">
        <Link href="/" className="font-ui inline-flex min-h-10 items-center rounded-full text-sm font-bold uppercase tracking-[0.08em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)]">← Torna alla Home</Link>
        <article className="mx-auto mt-16 max-w-3xl pb-24">
          <p className="font-ui text-xs font-bold uppercase tracking-[0.18em] text-[oklch(36%_0.09_28)]">Privacy</p>
          <h1 className="font-display mt-4 text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9]">Informativa privacy.</h1>
          <p className="mt-8 text-lg leading-8 text-[oklch(29%_0.014_56/0.78)]">Questa pagina descrive in modo essenziale i dati richiesti dal modulo contatti del sito Grossimoto.</p>
          <div className="mt-12 space-y-10 text-base leading-8 text-[oklch(29%_0.014_56/0.82)]">
            <section><h2 className="font-ui text-xl font-bold text-[var(--ink)]">Chi è il titolare</h2><p className="mt-3">Grossi Moto di Angelo Grossi<br />Via Festo Porzio 22, 00174 Roma RM<br />Email: <a className="underline underline-offset-2" href="mailto:info@grossimoto.it">info@grossimoto.it</a><br />Telefono: <a className="underline underline-offset-2" href="tel:+393289185029">+39 328 918 5029</a></p></section>
            <section><h2 className="font-ui text-xl font-bold text-[var(--ink)]">Dati raccolti e perché</h2><p className="mt-3">Il modulo può raccogliere nome e cognome, email, telefono opzionale, argomento e contenuto del messaggio. Questi dati vengono utilizzati per ricevere e rispondere alla tua richiesta di informazioni, disponibilità, acquisto, assistenza o servizi.</p></section>
            <section><h2 className="font-ui text-xl font-bold text-[var(--ink)]">Invio tramite Formspree</h2><p className="mt-3">Quando invii il modulo, i dati vengono trasmessi a Formspree, servizio esterno usato per la ricezione tecnica della richiesta, tramite l’endpoint configurato nel sito. Il ruolo giuridico di Formspree, le condizioni applicabili e i relativi tempi di conservazione devono essere verificati con il cliente prima della pubblicazione definitiva.</p></section>
            <section><h2 className="font-ui text-xl font-bold text-[var(--ink)]">Diritti</h2><p className="mt-3">Puoi chiedere accesso, rettifica, cancellazione, limitazione o opporti al trattamento dei tuoi dati, nei casi previsti dalla legge, scrivendo a <a className="underline underline-offset-2" href="mailto:info@grossimoto.it">info@grossimoto.it</a>.</p></section>
            {/* TODO cliente: confermare base giuridica, tempi di conservazione, destinatari, DPO/contatti privacy e testo legale definitivo. */}
            <section className="border-l-2 border-[oklch(36%_0.09_28)] pl-5 text-sm"><strong>Dati da confermare con il cliente:</strong> base giuridica, tempi di conservazione, destinatari, eventuale responsabile/DPO e informativa legale completa.</section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
