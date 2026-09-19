"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";

const endpoint =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
  "https://formspree.io/f/grossimoto";

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
  "Scelta di moto o scooter",
  "Informazioni KYMCO",
  "Informazioni Voge",
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
    values
      .filter(([, invalid]) => invalid)
      .map(([field]) => [field, fieldErrorMessage[field]]),
  );
}

export function ContactForm({
  initialSubject = "",
  initialMessage = "",
}: {
  initialSubject?: string;
  initialMessage?: string;
}) {
  const submitting = useRef(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

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
    setErrors((current) => ({
      ...current,
      [field]: fieldErrorMessage[field],
    }));
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

      if (!response.ok) {
        throw new Error("Formspree response was not successful");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  const inputClass = (hasError = false) =>
    [
      "min-h-12 w-full rounded-2xl border border-transparent bg-black/[0.035] px-4 py-3 text-base text-[#0A0A0A] outline-none transition-[border-color,box-shadow,background-color] duration-150 placeholder:text-black/32 sm:text-sm motion-reduce:transition-none",
      hasError
        ? "border-[#C72A09] bg-[#C72A09]/[0.035] ring-1 ring-[#C72A09]/12 focus:border-[#C72A09] focus:ring-2 focus:ring-[#C72A09]/18"
        : "hover:bg-black/[0.055] focus:border-[#C72A09] focus:bg-white focus:ring-2 focus:ring-[#C72A09]/16",
    ].join(" ");

  const describedBy = (field: FieldName) =>
    errors[field] ? `${field}-error` : undefined;

  const requirement = (
    <span className="ml-1 font-normal text-black/42">Obbligatorio</span>
  );

  return (
    <form
      id="richiesta"
      aria-busy={status === "sending"}
      action={endpoint}
      method="POST"
      className="grid gap-5 scroll-mt-6"
      onSubmit={handleSubmit}
    >
      <input
        type="hidden"
        name="_subject"
        value="Nuova richiesta dal sito Grossimoto"
      />
      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-gotcha">Non compilare questo campo</label>
        <input
          id="contact-gotcha"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="pb-2">
        <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#C72A09]">
          La tua richiesta
        </p>
        <p className="mt-2 max-w-[42rem] text-sm leading-6 text-black/52">
          Compila i campi essenziali. Il telefono resta facoltativo.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-name"
            className="font-ui text-sm font-bold text-[#0A0A0A]"
          >
            Nome e cognome {requirement}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            placeholder="Mario Rossi"
            className={inputClass(Boolean(errors.name))}
            onChange={() => handleChange("name")}
            onInvalid={() => handleInvalid("name")}
          />
          {errors.name && (
            <p id="name-error" className="text-sm font-medium text-[#C72A09]">
              Errore: {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="font-ui text-sm font-bold text-[#0A0A0A]"
          >
            Email {requirement}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            placeholder="mario.rossi@email.it"
            className={inputClass(Boolean(errors.email))}
            onChange={() => handleChange("email")}
            onInvalid={() => handleInvalid("email")}
          />
          {errors.email && (
            <p id="email-error" className="text-sm font-medium text-[#C72A09]">
              Errore: {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-phone"
          className="font-ui text-sm font-bold text-[#0A0A0A]"
        >
          Telefono
          <span className="ml-1 font-normal text-black/42">Opzionale</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+39 333 000 0000"
          className={inputClass()}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-subject"
          className="font-ui text-sm font-bold text-[#0A0A0A]"
        >
          Argomento {requirement}
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          defaultValue={initialSubject}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={describedBy("subject")}
          className={inputClass(Boolean(errors.subject))}
          onChange={() => handleChange("subject")}
          onInvalid={() => handleInvalid("subject")}
        >
          <option value="" disabled>
            Scegli cosa ti serve…
          </option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="subject-error" className="text-sm font-medium text-[#C72A09]">
            Errore: {errors.subject}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="font-ui text-sm font-bold text-[#0A0A0A]"
        >
          Messaggio {requirement}
        </label>
        <textarea
          id="contact-message"
          name="message"
          defaultValue={initialMessage}
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          placeholder="Es. cerco un mezzo per andare al lavoro, oppure vorrei un tagliando per il mio modello…"
          className={`${inputClass(Boolean(errors.message))} min-h-36 resize-y`}
          onChange={() => handleChange("message")}
          onInvalid={() => handleInvalid("message")}
        />
        {errors.message && (
          <p id="message-error" className="text-sm font-medium text-[#C72A09]">
            Errore: {errors.message}
          </p>
        )}
      </div>

      <div className="rounded-2xl bg-black/[0.035] p-4">
        <div className="flex items-start gap-3">
          <input
            id="contact-privacy"
            name="privacy"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.privacy)}
            aria-describedby={describedBy("privacy")}
            className="mt-0.5 h-5 w-5 shrink-0 rounded accent-[#C72A09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C72A09]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            onChange={() => handleChange("privacy")}
            onInvalid={() => handleInvalid("privacy")}
          />
          <label
            htmlFor="contact-privacy"
            className="text-sm leading-6 text-black/62"
          >
            Ho letto e accetto il trattamento dei dati personali.
            <span className="ml-1 font-medium text-black/46">Obbligatorio.</span>{" "}
            <Link
              href="/privacy"
              className="font-semibold text-[#0A0A0A] underline decoration-black/30 underline-offset-2 outline-none transition-colors duration-150 hover:text-[#C72A09] focus-visible:ring-2 focus-visible:ring-[#C72A09]/45 focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              Leggi la privacy policy
            </Link>
            .
          </label>
        </div>
        {errors.privacy && (
          <p
            id="privacy-error"
            className="mt-2 pl-8 text-sm font-medium text-[#C72A09]"
          >
            Errore: {errors.privacy}
          </p>
        )}
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="min-h-6 text-sm leading-6"
      >
        {status === "success" && (
          <p className="rounded-2xl bg-black/[0.035] px-4 py-3 font-medium text-[#0A0A0A]">
            La tua richiesta è stata inviata. Ti ricontatteremo ai recapiti che
            hai indicato.
          </p>
        )}
        {status === "error" && (
          <p className="rounded-2xl bg-[#C72A09]/[0.06] px-4 py-3 font-medium text-[#9D2208]">
            Non abbiamo ricevuto conferma dell’invio. Il messaggio è ancora qui:
            puoi riprovare o{" "}
            <a
              href="tel:+393289185029"
              className="font-bold underline underline-offset-2"
            >
              chiamarci al +39 328 918 5029
            </a>
            .
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        className="font-ui inline-flex min-h-12 w-full items-center justify-center rounded-[0.9rem] border border-[#0A0A0A] bg-[#0A0A0A] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-[background-color,transform,opacity] duration-150 hover:bg-[#C72A09] active:scale-[0.98] disabled:cursor-wait disabled:opacity-55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C72A09]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none sm:w-auto sm:min-w-52"
      >
        {status === "sending" ? "Invio in corso…" : "Invia la richiesta"}
      </button>
    </form>
  );
}
