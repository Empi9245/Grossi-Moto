"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  buildMessage,
  buildPayload,
  createAnswers,
  getDeliveryLinks,
  getSteps,
  getSubject,
  validateStep,
  type Answers,
  type ContactModel,
  type Errors,
  type Step,
} from "./contact-flow";
import {
  ContactQuestions,
  ContactReview,
  ContactProgress,
  ContactStep,
  primaryButton,
  quietButton,
} from "./ContactFormUI";

const endpoint =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
  "https://formspree.io/f/grossimoto";
const titles: Record<Step, string> = {
  topic: "Cosa ti serve oggi?",
  known: "Hai già un modello in mente?",
  model: "Quale modello ti interessa?",
  usage: "Come useresti il tuo mezzo?",
  interests: "Cosa vorresti sapere?",
  service: "Di cosa ha bisogno il tuo mezzo?",
  vehicle: "Che mezzo hai?",
  symptoms: "Cosa hai notato?",
  parts: "Cosa stai cercando?",
  partsDetails: "Ci dai qualche dettaglio?",
  question: "Cosa vorresti chiederci?",
  contact: "Come preferisci contattarci?",
  review: "Il tuo messaggio è pronto.",
};
const hints: Partial<Record<Step, string>> = {
  topic: "Una domanda alla volta. Scegli una risposta per continuare.",
  known: "Scegli una risposta per continuare.",
  model: "I modelli della nostra gamma. Seleziona il tuo per proseguire.",
  usage:
    "Scegli l’esigenza principale per continuare. Ti aiuteremo a trovare il mezzo adatto.",
  interests: "Puoi scegliere più argomenti, poi continuare.",
  service:
    "Scegli una risposta per continuare. Basta anche un’indicazione generale.",
  vehicle: "Marca e modello ci aiutano a capire come seguirti.",
  symptoms: "Bastano poche parole per aiutarci a capire il problema.",
  parts: "Scegli una risposta per continuare.",
  partsDetails:
    "Descrivi cosa cerchi. Se serve per il tuo mezzo, puoi indicarci il modello.",
  question: "Scrivi liberamente, ti daremo una mano.",
  contact: "WhatsApp ed email aprono la tua app con il messaggio pronto. Per essere richiamato, scegli Telefono.",
  review:
    "Abbiamo raccolto le tue risposte. Puoi modificare il testo prima di inviarlo.",
};

export function ContactForm({
  initialSubject = "",
  initialMessage = "",
  initialModelId,
  models = [],
}: {
  initialSubject?: string;
  initialMessage?: string;
  initialModelId?: string;
  models?: ContactModel[];
}) {
  const initialModel = models.find((m) => m.id === initialModelId);
  const [answers, setAnswers] = useState(() =>
    createAnswers(initialSubject, initialMessage, initialModel),
  );
  const [productEntry, setProductEntry] = useState(Boolean(initialModel));
  const [step, setStep] = useState<Step>(() =>
    initialModel ? "interests" : answers.topic ? getSteps(answers)[1] : "topic",
  );
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [privacy, setPrivacy] = useState(false);
  const [draft, setDraft] = useState({ text: "", source: "", edited: false });
  const [pending, setPending] = useState(false);
  const [instant, setInstant] = useState(true);
  const [interacted, setInteracted] = useState(false);
  const [externalNotice, setExternalNotice] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const submitting = useRef(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keyboard = useRef(false);
  const reduceMotion = useReducedMotion();
  const generated = buildMessage(answers, models);
  const draftOutdated = draft.edited && draft.source !== generated;
  const steps = getSteps(answers, productEntry);
  const subject = getSubject(answers, models);
  const model =
    answers.topic === "sales" && answers.known === "yes"
      ? models.find((m) => m.id === answers.modelId)
      : undefined;
  const busy = pending || status === "sending";

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    [],
  );

  function change<K extends keyof Answers>(field: K, value: Answers[K]) {
    setAnswers((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (!submitting.current) setStatus("idle");
    setExternalNotice("");
  }

  function navigate(next: Step, nextAnswers = answers) {
    setInstant(Boolean(reduceMotion) || keyboard.current);
    setInteracted(true);
    setErrors({});
    setExternalNotice("");
    if (next === "review") {
      const message = buildMessage(nextAnswers, models);
      setDraft((current) =>
        current.edited
          ? current
          : { text: message, source: message, edited: false },
      );
    }
    setStep(next);
  }

  function choose<K extends keyof Answers>(field: K, value: Answers[K]) {
    if (advanceTimer.current || submitting.current) return;
    const nextAnswers = { ...answers, [field]: value };
    change(field, value);
    const path = getSteps(nextAnswers, productEntry);
    const next = path[path.indexOf(step) + 1];
    if (!next) return;
    if (reduceMotion || keyboard.current) navigate(next, nextAnswers);
    else {
      setPending(true);
      advanceTimer.current = setTimeout(() => {
        advanceTimer.current = null;
        setPending(false);
        navigate(next, nextAnswers);
      }, 100);
    }
  }

  function focusError(nextErrors: Errors) {
    setErrors(nextErrors);
    requestAnimationFrame(() => {
      const field = Object.keys(nextErrors).find(
        (key) => nextErrors[key as keyof Errors],
      );
      const target =
        field &&
        formRef.current?.querySelector<HTMLElement>(`#contact-${field}`);
      (
        target ||
        formRef.current?.querySelector<HTMLElement>(
          "[aria-invalid='true'], [role='group'] button",
        )
      )?.focus();
    });
  }

  function nextStep() {
    const nextErrors = validateStep(step, answers, models);
    if (Object.keys(nextErrors).length) {
      focusError(nextErrors);
      return;
    }
    const next = steps[steps.indexOf(step) + 1];
    if (next) navigate(next);
  }

  function back() {
    if (busy) return;
    const previous = steps[steps.indexOf(step) - 1];
    if (previous) navigate(previous);
    else {
      setProductEntry(false);
      navigate("topic");
    }
  }

  function readyToSend() {
    for (const requiredStep of steps.filter((s) => s !== "review")) {
      const nextErrors = validateStep(requiredStep, answers, models);
      if (Object.keys(nextErrors).length) {
        navigate(requiredStep);
        focusError(nextErrors);
        return false;
      }
    }
    if (!model && answers.topic === "sales" && answers.known === "yes") {
      setProductEntry(false);
      navigate("model");
      focusError({ modelId: "Scegli un modello dall’elenco." });
      return false;
    }
    if (draftOutdated) {
      document.getElementById("contact-update-draft")?.focus();
      return false;
    }
    const nextErrors: Errors = {};
    if (!draft.text.trim())
      nextErrors.message = "Scrivi il messaggio da inviare.";
    if (!privacy)
      nextErrors.privacy = "Leggi e accetta la privacy prima di proseguire.";
    if (Object.keys(nextErrors).length) {
      focusError(nextErrors);
      return false;
    }
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || pending || status === "success") return;
    if (step !== "review") {
      nextStep();
      return;
    }
    if (answers.channel === "whatsapp" || answers.channel === "email") {
      openExternal(answers.channel);
      return;
    }
    if (!readyToSend()) return;
    submitting.current = true;
    setStatus("sending");
    setErrors({});
    setExternalNotice("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        signal: AbortSignal.timeout(20000),
        headers: { Accept: "application/json" },
        body: buildPayload(
          answers,
          draft.text,
          privacy,
          honeypotRef.current?.value ?? "",
          models,
        ),
      });
      if (!response.ok)
        throw new Error("Formspree response was not successful");
      setInteracted(true);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  function openExternal(channel: "whatsapp" | "email") {
    if (submitting.current || !readyToSend()) return;
    const links = getDeliveryLinks(draft.text, subject);
    if (channel === "whatsapp")
      window.open(links.whatsapp, "_blank", "noopener,noreferrer");
    else window.location.assign(links.email);
    setExternalNotice(
      channel === "whatsapp"
        ? "Completa l’invio in WhatsApp. Il testo resta disponibile anche qui."
        : "Completa l’invio nella tua app email. Se non si apre, scrivici a info@grossimoto.it.",
    );
  }

  const autoAdvance = [
    "topic",
    "known",
    "model",
    "usage",
    "service",
    "parts",
  ].includes(step);
  return (
    <form
      ref={formRef}
      id="richiesta"
      action={endpoint}
      method="POST"
      noValidate
      aria-busy={status === "sending"}
      onSubmit={handleSubmit}
      onKeyDownCapture={() => {
        keyboard.current = true;
      }}
      onPointerDownCapture={() => {
        keyboard.current = false;
      }}
      className="min-w-0 scroll-mt-6"
    >
      <div
        className="absolute h-px w-px overflow-hidden [clip-path:inset(50%)]"
        aria-hidden="true"
      >
        <label htmlFor="contact-gotcha">Non compilare questo campo</label>
        <input
          ref={honeypotRef}
          id="contact-gotcha"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <p className="font-ui mb-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#C72A09]">
        Ti diamo una mano
      </p>
      <ContactProgress
        stage={
          status === "success" || step === "review"
            ? 2
            : step === "contact"
              ? 1
              : 0
        }
      />
      {status === "success" ? (
        <ContactStep
          key="success"
          title="Richiesta inviata."
          description="Grazie. Ti ricontatteremo al recapito che hai indicato."
          instant={Boolean(reduceMotion) || instant}
          focusOnMount={interacted}
        >
          <Check aria-hidden="true" className="mb-6 h-8 w-8 text-[#C72A09]" />
          <button
            type="button"
            className={primaryButton}
            onClick={() => {
              const fresh = createAnswers(
                initialSubject,
                initialMessage,
                initialModel,
              );
              setAnswers(fresh);
              setProductEntry(Boolean(initialModel));
              setPrivacy(false);
              setDraft({ text: "", source: "", edited: false });
              setStatus("idle");
              if (honeypotRef.current) honeypotRef.current.value = "";
              navigate(
                initialModel
                  ? "interests"
                  : fresh.topic
                    ? getSteps(fresh)[1]
                    : "topic",
                fresh,
              );
            }}
          >
            Un’altra richiesta
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </ContactStep>
      ) : (
        <>
          <fieldset disabled={busy} className="min-w-0 border-0 p-0">
            <legend className="sr-only">La tua richiesta a Grossi Moto</legend>
            <ContactStep
              key={step}
              title={titles[step]}
              description={hints[step]}
              instant={Boolean(reduceMotion) || instant}
              focusOnMount={interacted}
              context={
                step === "interests" && model ? (
                  <div className="mb-5 border-b border-black/10 pb-4">
                    <p className="text-sm font-semibold">
                      Stai chiedendo informazioni su
                      <br />
                      <span className="text-[#C72A09]">
                        {model.brand} {model.name}
                      </span>
                    </p>
                    <button
                      type="button"
                      className={`${quietButton} mt-1 -ml-2`}
                      onClick={() => {
                        setProductEntry(false);
                        navigate("model");
                      }}
                    >
                      Cambia modello
                    </button>
                  </div>
                ) : undefined
              }
            >
              {step === "review" ? (
                <ContactReview
                  answers={answers}
                  errors={errors}
                  text={draft.text}
                  privacy={privacy}
                  sending={status === "sending"}
                  draftOutdated={draftOutdated}
                  onChangeMessage={(text) => {
                    setDraft((current) => ({ ...current, text, edited: true }));
                    setErrors((current) => ({
                      ...current,
                      message: undefined,
                    }));
                    setStatus("idle");
                  }}
                  onPrivacyChange={(checked) => {
                    setPrivacy(checked);
                    setErrors((current) => ({
                      ...current,
                      privacy: undefined,
                    }));
                  }}
                  onRebuild={() =>
                    setDraft({
                      text: generated,
                      source: generated,
                      edited: false,
                    })
                  }
                  onKeep={() =>
                    setDraft((current) => ({ ...current, source: generated }))
                  }
                />
              ) : (
                <ContactQuestions
                  step={step}
                  answers={answers}
                  errors={errors}
                  models={models}
                  hasInitialNote={Boolean(initialMessage)}
                  change={change}
                  choose={choose}
                />
              )}
            </ContactStep>
            {step !== "review" && step !== "topic" && (
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-5">
                  <button
                    type="button"
                    onClick={back}
                    className={`${quietButton} -ml-2`}
                  >
                    <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                    Indietro
                  </button>
                {!autoAdvance && (
                  <button type="submit" className={`${primaryButton} ml-auto`}>
                    {step === "contact" ? "Prepara il messaggio" : "Continua"}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
            {step === "review" && (
              <button
                type="button"
                onClick={back}
                className={`${quietButton} mt-4 -ml-2`}
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Indietro
              </button>
            )}
          </fieldset>
          <div
            aria-live="polite"
            aria-atomic="true"
            className="text-sm leading-6"
          >
            {status === "sending" && (
              <p className="mt-4 text-[#626262]">
                Invio in corso. Attendi la conferma.
              </p>
            )}
            {status === "error" && (
              <p className="mt-5 rounded-2xl bg-[#C72A09]/[0.06] p-4 text-[#9D2208]">
                Non abbiamo ricevuto conferma dell’invio. Il messaggio è ancora
                qui: puoi riprovare o{" "}
                <a
                  className="font-bold underline underline-offset-2"
                  href="tel:+393289185029"
                >
                  chiamarci al +39 328 918 5029
                </a>
                .
              </p>
            )}
            {externalNotice && (
              <p className="mt-4 text-[#525252]">{externalNotice}</p>
            )}
          </div>
        </>
      )}
    </form>
  );
}
