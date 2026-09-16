"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";

const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/grossimoto";

type FieldName = "name" | "email" | "subject" | "message" | "privacy";
type FieldErrors = Partial<Record<FieldName, string>>;

const fieldErrorMessage: Record<FieldName, string> = {
  name: "Inserisci nome e cognome.",
  email: "Inserisci un indirizzo email valido.",
  subject: "Scegli un argomento.",
  message: "Scrivi il messaggio.",
  privacy: "Per inviare la richiesta devi leggere e accettare la privacy.",
};

const subjects = [
  "Scelta di uno scooter",
  "Informazioni scooter KYMCO",
  "Informazioni scooter Voge",
  "Disponibilità e acquisto",
  "Prenotazione officina",
  "Accessori e abbigliamento",
  "Altro",
];

function getErrors(form: HTMLFormElement): FieldErrors {
  const name = form.elements.namedItem("name");
  const email = form.elements.namedItem("email");
  const subject = form.elements.namedItem("subject");
  const message = form.elements.namedItem("message");
  const privacy = form.elements.namedItem("privacy");

  const values: Array<[FieldName, boolean]> = [
    ["name", name instanceof HTMLInputElement && !name.value.trim()],
    ["email", email instanceof HTMLInputElement && !email.validity.valid],
    ["subject", subject instanceof HTMLSelectElement && !subject.value],
    ["message", message instanceof HTMLTextAreaElement && !message.value.trim()],
    ["privacy", privacy instanceof HTMLInputElement && !privacy.checked],
  ];

  return Object.fromEntries(
    values.filter(([, invalid]) => invalid).map(([field]) => [field, fieldErrorMessage[field]]),
  );
}

export function ContactForm({ initialSubject = "", initialMessage = "" }: { initialSubject?: string; initialMessage?: string }) {
  const submitting = useRef(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function handleChange(field: FieldName) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (status !== "idle" && !submitting.current) setStatus("idle");
  }

  function handleInvalid(field: FieldName) {
    setErrors((current) => ({ ...current, [field]: fieldErrorMessage[field] }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const nextErrors = getErrors(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      form.reportValidity();
      return;
    }

    submitting.current = true;
    setStatus("sending");
    setErrors({});

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        signal: AbortSignal.timeout(20000),
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Formspree response was not successful");

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  const inputClass = (field: FieldName) =>
    `rounded-xl border ${errors[field] ? "border-[oklch(48%_0.14_28)]" : "border-[oklch(18%_0.014_56/0.12)]"} bg-[oklch(97%_0.008_78)] px-4 py-3 text-base text-[oklch(18%_0.014_56)] placeholder:text-[oklch(29%_0.014_56/0.35)] outline-none transition duration-150 hover:border-[oklch(18%_0.014_56/0.22)] focus:border-[oklch(18%_0.014_56/0.4)] focus:ring-2 focus:ring-[oklch(38%_0.08_28/0.18)] sm:text-sm`;

  const describedBy = (field: FieldName) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form id="richiesta" aria-busy={status === "sending"} action={endpoint} method="POST" className="mt-6 grid gap-5" onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value="Nuova richiesta dal sito Grossimoto" />
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-gotcha">Non compilare questo campo</label>
        <input id="contact-gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[oklch(18%_0.014_56/0.72)]">Nome e cognome</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} placeholder="Mario Rossi" className={inputClass("name")} onChange={() => handleChange("name")} onInvalid={() => handleInvalid("name")} />
          {errors.name && <p id="name-error" className="text-xs text-[oklch(42%_0.13_28)]">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[oklch(18%_0.014_56/0.72)]">Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} placeholder="mario.rossi@email.it" className={inputClass("email")} onChange={() => handleChange("email")} onInvalid={() => handleInvalid("email")} />
          {errors.email && <p id="email-error" className="text-xs text-[oklch(42%_0.13_28)]">{errors.email}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-phone" className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[oklch(18%_0.014_56/0.72)]">Telefono <span className="font-normal normal-case tracking-normal text-[oklch(29%_0.014_56/0.44)]">(opzionale)</span></label>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="+39 333 000 0000" className={inputClass("name")} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-subject" className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[oklch(18%_0.014_56/0.72)]">Argomento</label>
        <select id="contact-subject" name="subject" required defaultValue={initialSubject} aria-invalid={Boolean(errors.subject)} aria-describedby={describedBy("subject")} className={inputClass("subject")} onChange={() => handleChange("subject")} onInvalid={() => handleInvalid("subject")}>
          <option value="" disabled>Scegli cosa ti serve…</option>
          {subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
        </select>
        {errors.subject && <p id="subject-error" className="text-xs text-[oklch(42%_0.13_28)]">{errors.subject}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[oklch(18%_0.014_56/0.72)]">Messaggio</label>
        <textarea id="contact-message" name="message" defaultValue={initialMessage} rows={5} required aria-invalid={Boolean(errors.message)} aria-describedby={describedBy("message")} placeholder="Es. cerco uno scooter per andare al lavoro, oppure vorrei un tagliando per il mio modello…" className={`${inputClass("message")} resize-none`} onChange={() => handleChange("message")} onInvalid={() => handleInvalid("message")} />
        {errors.message && <p id="message-error" className="text-xs text-[oklch(42%_0.13_28)]">{errors.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <input id="contact-privacy" name="privacy" type="checkbox" required aria-invalid={Boolean(errors.privacy)} aria-describedby={describedBy("privacy")} className="mt-0.5 h-5 w-5 shrink-0 rounded accent-[oklch(18%_0.014_56)]" onChange={() => handleChange("privacy")} onInvalid={() => handleInvalid("privacy")} />
        <label htmlFor="contact-privacy" className="text-xs leading-5 text-[oklch(29%_0.014_56/0.62)]">Ho letto e accetto il trattamento dei dati personali. <Link href="/privacy" className="underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)]">Leggi la privacy policy</Link>.</label>
        {errors.privacy && <span id="privacy-error" className="sr-only">{errors.privacy}</span>}
      </div>

      <div aria-live="polite" aria-atomic="true" className="min-h-6 text-sm">
        {status === "success" && <p className="text-[oklch(35%_0.1_145)]">La tua richiesta è stata inviata. Ti ricontatteremo ai recapiti che hai indicato.</p>}
        {status === "error" && <p className="text-[oklch(42%_0.13_28)]">Non abbiamo ricevuto conferma dell’invio. Il messaggio è ancora qui: puoi riprovare o <a href="tel:+393289185029" className="underline underline-offset-2">chiamarci al +39 328 918 5029</a>.</p>}
      </div>

      <button type="submit" disabled={status === "sending"} aria-busy={status === "sending"} className="font-ui mt-1 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[oklch(16%_0.014_48)] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[oklch(94%_0.01_78)] transition-[background,transform] duration-200 hover:bg-[oklch(22%_0.016_50)] active:translate-y-px disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(94.5%_0.011_78)] sm:w-auto">
        {status === "sending" ? "Invio in corso…" : "Invia la richiesta"}
      </button>
    </form>
  );
}
