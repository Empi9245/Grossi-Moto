"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Search,
  Bike,
  Wrench,
  ShoppingBag,
  MessageCircle,
  Mail,
  type LucideIcon,
} from "lucide-react";
import {
  channelLabels,
  interestOptions,
  usageOptions,
  serviceOptions,
  partsOptions,
  type Answers,
  type Errors,
  type Step,
  type ContactChannel,
  type ContactModel,
} from "./contact-flow";
import Link from "next/link";

export const primaryButton =
  "font-ui inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#0A0A0A] px-6 py-3 text-sm font-bold text-white transition-colors duration-150 hover:bg-[#C72A09] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C72A09] disabled:cursor-wait disabled:opacity-55 motion-reduce:transition-none";
export const quietButton =
  "font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-[#525252] hover:text-[#C72A09] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C72A09] disabled:opacity-50";

export function ContactProgress({ stage }: { stage: number }) {
  return (
    <ol
      aria-label="Le fasi della richiesta"
      className="font-ui mb-8 grid grid-cols-3 gap-3 text-[0.68rem] font-semibold sm:mb-10 sm:text-xs"
    >
      {["Richiesta", "Recapito", "Messaggio"].map((label, index) => (
        <li
          key={label}
          aria-current={index === stage ? "step" : undefined}
          className={index === stage ? "text-[#C72A09]" : "text-[#666666]"}
        >
          <span
            aria-hidden="true"
            className={`mb-2.5 block h-0.5 rounded-full ${index <= stage ? "bg-[#C72A09]" : "bg-black/10"}`}
          />
          <span className="flex items-center gap-1.5">
            {index < stage && (
              <Check aria-hidden="true" className="h-3 w-3 shrink-0" />
            )}
            {label}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function ContactStep({
  title,
  description,
  children,
  instant,
  focusOnMount,
  context,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  instant: boolean;
  focusOnMount: boolean;
  context?: ReactNode;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!focusOnMount) return;
    const heading = titleRef.current;
    heading?.focus({ preventScroll: true });
    if (
      heading &&
      (heading.getBoundingClientRect().top < 16 ||
        heading.getBoundingClientRect().bottom > window.innerHeight - 112)
    ) {
      heading.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [focusOnMount]);
  return (
    <motion.div
      initial={instant ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: instant ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {context}
      <h3
        id="contact-step-title"
        ref={titleRef}
        tabIndex={-1}
        className="font-display scroll-mt-6 text-[clamp(1.65rem,3.2vw,2.65rem)] font-semibold leading-[1.12] tracking-[-0.035em] outline-none focus-visible:underline focus-visible:decoration-[#C72A09]/40 focus-visible:underline-offset-8"
      >
        {title}
      </h3>
      {description && (
        <p
          id="contact-hint"
          className="mt-3 max-w-[48ch] text-sm leading-6 text-[#626262]"
        >
          {description}
        </p>
      )}
      <div className="mt-7 sm:mt-8">{children}</div>
    </motion.div>
  );
}

export function ChoiceOption({
  children,
  selected,
  onClick,
  icon: Icon,
  compact = false,
  multi = false,
}: {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
  icon?: LucideIcon;
  compact?: boolean;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`group flex min-h-14 w-full items-center gap-3 rounded-2xl border p-4 text-left text-base leading-6 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#C72A09] motion-reduce:transition-none ${compact ? "sm:min-h-14" : "sm:min-h-20"} ${selected ? "border-[#0A0A0A] bg-[#0A0A0A] text-white" : "border-black/15 bg-white text-[#0A0A0A] hover:border-[#C72A09] hover:bg-[#C72A09]/[0.025]"}`}
    >
      {Icon && (
        <Icon
          aria-hidden="true"
          className={`h-5 w-5 shrink-0 ${selected ? "text-white" : "text-[#C72A09]"}`}
          strokeWidth={1.6}
        />
      )}
      <span className="min-w-0 flex-1 font-medium">{children}</span>
      {selected ? (
        <Check aria-hidden="true" className="h-4 w-4 shrink-0" />
      ) : multi ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 shrink-0 rounded border border-black/35"
        />
      ) : (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-[#777777] group-hover:text-[#C72A09]"
        />
      )}
    </button>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  return error ? (
    <p
      id={`${id}-error`}
      role="alert"
      className="mt-2 text-sm leading-5 text-[#9D2208]"
    >
      {error}
    </p>
  ) : null;
}

export function ContactField({
  id,
  label,
  value,
  onChange,
  error,
  optional,
  multiline,
  placeholder,
  type = "text",
  autoComplete,
  maxLength = 200,
  description,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  optional?: boolean;
  multiline?: boolean;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  maxLength?: number;
  description?: string;
}) {
  const shared = {
    id,
    name: id.replace("contact-", ""),
    value,
    required: !optional,
    maxLength,
    "aria-invalid": Boolean(error),
    "aria-describedby":
      [error ? `${id}-error` : "", description ? `${id}-hint` : ""]
        .filter(Boolean)
        .join(" ") || undefined,
    placeholder,
    className: `min-h-14 w-full min-w-0 rounded-2xl border bg-[#FAFAFA] px-4 py-3 text-base leading-7 text-[#0A0A0A] outline-none placeholder:text-[#777777] focus:border-[#C72A09] focus:bg-white focus:ring-2 focus:ring-[#C72A09]/15 ${error ? "border-[#C72A09]" : "border-black/20"}`,
  };
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="font-ui mb-2 block text-sm font-semibold">
        {label}
        <span className="ml-1 font-normal text-[#666666]">
          {optional ? "(facoltativo)" : "(obbligatorio)"}
        </span>
      </label>
      {description && (
        <p id={`${id}-hint`} className="mb-2 text-sm leading-6 text-[#626262]">
          {description}
        </p>
      )}
      {multiline ? (
        <textarea
          {...shared}
          rows={4}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared.className} min-h-36 resize-y`}
        />
      ) : (
        <input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          inputMode={
            type === "tel" ? "tel" : type === "email" ? "email" : "text"
          }
          autoCapitalize={type === "email" ? "none" : undefined}
          spellCheck={type === "email" ? false : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <FieldError id={id} error={error} />
    </div>
  );
}

export function ModelPicker({
  models,
  selected,
  onChoose,
  error,
}: {
  models: ContactModel[];
  selected: string;
  onChoose: (id: string) => void;
  error?: string;
}) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLocaleLowerCase("it");
  const visible = models.filter((m) =>
    `${m.brand} ${m.name}`.toLocaleLowerCase("it").includes(normalized),
  );
  return (
    <div>
      <label
        htmlFor="contact-model-search"
        className="mb-2 block text-sm font-semibold"
      >
        Cerca nella gamma{" "}
        <span className="font-normal text-[#666666]">(facoltativo)</span>
      </label>
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-[#666666]"
        />
        <input
          id="contact-model-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Marca o modello"
          className="min-h-14 w-full rounded-2xl border border-black/20 bg-[#FAFAFA] py-3 pl-12 pr-4 text-base outline-none focus:border-[#C72A09] focus:ring-2 focus:ring-[#C72A09]/15"
        />
      </div>
      <p role="status" className="my-3 text-xs text-[#626262]">
        {visible.length
          ? `${visible.length} modelli. Scegline uno per continuare.`
          : "Nessun modello trovato. Prova con un altro nome o torna indietro per un consiglio."}
      </p>
      <div
        role="group"
        aria-label="Modelli disponibili nel catalogo"
        aria-describedby={error ? "contact-modelId-error" : undefined}
        data-lenis-prevent
        className="grid max-h-72 gap-2 overflow-y-auto overscroll-contain p-1"
      >
        {visible.map((m) => (
          <ChoiceOption
            key={m.id}
            compact
            selected={selected === m.id}
            onClick={() => onChoose(m.id)}
          >
            {m.brand} {m.name}
          </ChoiceOption>
        ))}
      </div>
      <FieldError id="contact-modelId" error={error} />
    </div>
  );
}

const topicOptions = [
  { value: "sales", label: "Cerco una moto o uno scooter", icon: Bike },
  { value: "workshop", label: "Ho bisogno dell’officina", icon: Wrench },
  { value: "parts", label: "Cerco ricambi o accessori", icon: ShoppingBag },
  { value: "other", label: "Ho un’altra domanda", icon: MessageCircle },
] as const;

export function ContactQuestions({
  hasInitialNote,
  step,
  answers,
  errors,
  models,
  change,
  choose,
}: {
  step: Step;
  hasInitialNote: boolean;
  answers: Answers;
  errors: Errors;
  models: ContactModel[];
  change: <K extends keyof Answers>(field: K, value: Answers[K]) => void;
  choose: <K extends keyof Answers>(field: K, value: Answers[K]) => void;
}) {
  function field(
    key:
      | "name"
      | "email"
      | "phone"
      | "vehicle"
      | "symptoms"
      | "workshopNote"
      | "partsDetails"
      | "partsVehicle"
      | "question"
      | "salesNote",
    label: string,
    options: {
      multiline?: boolean;
      placeholder?: string;
      optional?: boolean;
      autoComplete?: string;
      type?: "text" | "email" | "tel";
    } = {},
  ) {
    return (
      <ContactField
        id={`contact-${key}`}
        label={label}
        value={answers[key]}
        onChange={(value) => change(key, value)}
        error={errors[key]}
        maxLength={options.multiline ? 2000 : 200}
        {...options}
      />
    );
  }

  function choices(
    fieldName: "usage" | "service" | "parts",
    options: string[],
  ) {
    return (
      <div
        role="group"
        aria-labelledby="contact-step-title"
        aria-describedby="contact-hint"
        className="grid gap-3 sm:grid-cols-2"
      >
        {options.map((option) => (
          <ChoiceOption
            key={option}
            selected={answers[fieldName] === option}
            onClick={() => choose(fieldName, option)}
          >
            {option}
          </ChoiceOption>
        ))}
      </div>
    );
  }

  function renderStep() {
    switch (step) {
      case "topic":
        return (
          <div
            role="group"
            aria-labelledby="contact-step-title"
            aria-describedby="contact-hint"
            className="grid gap-3 sm:grid-cols-2"
          >
            {topicOptions.map((option) => (
              <ChoiceOption
                key={option.value}
                selected={answers.topic === option.value}
                icon={option.icon}
                onClick={() => choose("topic", option.value)}
              >
                {option.label}
              </ChoiceOption>
            ))}
          </div>
        );
      case "known":
        return (
          <div
            role="group"
            aria-labelledby="contact-step-title"
            aria-describedby="contact-hint"
            className="grid gap-3"
          >
            <ChoiceOption
              selected={answers.known === "yes"}
              onClick={() => choose("known", "yes")}
            >
              Sì, so già quale
            </ChoiceOption>
            <ChoiceOption
              selected={answers.known === "no"}
              onClick={() => choose("known", "no")}
            >
              No, aiutami a scegliere
            </ChoiceOption>
          </div>
        );
      case "model":
        return (
          <ModelPicker
            models={models}
            selected={answers.modelId}
            onChoose={(id) => choose("modelId", id)}
            error={errors.modelId}
          />
        );
      case "usage":
        return choices("usage", usageOptions);
      case "service":
        return choices("service", serviceOptions);
      case "parts":
        return choices("parts", partsOptions);
      case "interests":
        return (
          <div className="space-y-5">
            <div
              role="group"
              aria-labelledby="contact-step-title"
              aria-describedby={
                errors.interests ? "contact-interests-error" : "contact-hint"
              }
              className="grid gap-3 sm:grid-cols-2"
            >
              {interestOptions.map((option) => (
                <ChoiceOption
                  key={option}
                  multi
                  compact
                  selected={answers.interests.includes(option)}
                  onClick={() =>
                    change(
                      "interests",
                      answers.interests.includes(option)
                        ? answers.interests.filter((v) => v !== option)
                        : [...answers.interests, option],
                    )
                  }
                >
                  {option}
                </ChoiceOption>
              ))}
            </div>
            <FieldError id="contact-interests" error={errors.interests} />
            {answers.interests.includes("Altro") || hasInitialNote
              ? field("salesNote", "La tua richiesta", {
                  multiline: true,
                  optional: !answers.interests.includes("Altro"),
                  placeholder: "Cosa vorresti sapere?",
                })
              : null}
          </div>
        );
      case "vehicle":
        return (
          <div className="space-y-5">
            {field("vehicle", "Marca e modello", {
              placeholder: "Es. KYMCO Agility 125",
            })}
            {hasInitialNote &&
              field("workshopNote", "La tua nota iniziale", {
                multiline: true,
                optional: true,
              })}
          </div>
        );
      case "symptoms":
        return field("symptoms", "Raccontaci cosa succede", {
          multiline: true,
          placeholder: "Es. sento un rumore quando accelero…",
        });
      case "partsDetails":
        return (
          <div className="space-y-5">
            {field("partsDetails", "Cosa ti serve", {
              multiline: true,
              placeholder: "Es. cerco un bauletto per due caschi…",
            })}
            {field("partsVehicle", "Marca e modello del mezzo", {
              optional: true,
              placeholder: "Se lo conosci",
            })}
          </div>
        );
      case "question":
        return field("question", "La tua domanda", {
          multiline: true,
          placeholder: "Come possiamo aiutarti?",
        });
      case "contact":
        return (
          <div className="space-y-6">
            <div
              id="contact-channel"
              role="group"
              aria-label="Modalità di ricontatto"
              aria-describedby={
                errors.channel ? "contact-channel-error" : "contact-hint"
              }
              tabIndex={-1}
              className="grid gap-2 sm:grid-cols-3"
            >
              {(["whatsapp", "email", "phone"] as ContactChannel[]).map(
                (channel) => (
                  <ChoiceOption
                    key={channel}
                    compact
                    multi
                    selected={answers.channel === channel}
                    onClick={() => change("channel", channel)}
                  >
                    {channelLabels[channel]}
                  </ChoiceOption>
                ),
              )}
            </div>
            <FieldError id="contact-channel" error={errors.channel} />
            {answers.channel && (
              <div className="space-y-5 border-t border-black/10 pt-6">
                {field("name", "Il tuo nome", {
                  autoComplete: "name",
                  placeholder: "Nome e cognome",
                })}
                {answers.channel === "email"
                  ? field("email", "Indirizzo email", {
                      type: "email",
                      autoComplete: "email",
                      placeholder: "nome@esempio.it",
                    })
                  : field(
                      "phone",
                      answers.channel === "whatsapp"
                        ? "Numero WhatsApp"
                        : "Numero di telefono",
                      {
                        type: "tel",
                        autoComplete: "tel",
                        placeholder: "Es. +39 333 123 4567",
                      },
                    )}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  }
  return renderStep();
}

export function ContactReview({
  answers,
  errors,
  text,
  privacy,
  sending,
  draftOutdated,
  onChangeMessage,
  onPrivacyChange,
  onRebuild,
  onKeep,
  onExternal,
}: {
  answers: Answers;
  errors: Errors;
  text: string;
  privacy: boolean;
  sending: boolean;
  draftOutdated: boolean;
  onChangeMessage: (text: string) => void;
  onPrivacyChange: (checked: boolean) => void;
  onRebuild: () => void;
  onKeep: () => void;
  onExternal: (channel: "whatsapp" | "email") => void;
}) {
  return (
    <div className="space-y-5">
      <p className="break-words text-sm leading-6 text-[#626262]">
        {answers.name} · {answers.channel ? channelLabels[answers.channel] : ""}
        <br />
        {answers.channel === "email" ? answers.email : answers.phone}
      </p>
      {draftOutdated && (
        <div className="rounded-2xl border border-[#C72A09]/30 p-4 text-sm leading-6">
          <p>
            Hai cambiato alcune risposte. Vuoi aggiornare il messaggio o
            mantenere il testo che hai modificato?
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              id="contact-update-draft"
              type="button"
              className={quietButton}
              onClick={() => onRebuild()}
            >
              Aggiorna dalle risposte
            </button>
            <button
              type="button"
              className={quietButton}
              onClick={() => onKeep()}
            >
              Mantieni il mio testo
            </button>
          </div>
        </div>
      )}
      <ContactField
        id="contact-message"
        label="Il tuo messaggio"
        multiline
        value={text}
        maxLength={5000}
        onChange={onChangeMessage}
        error={errors.message}
      />
      <div className="border-t border-black/10 pt-5">
        <div className="flex items-start gap-2">
          <input
            id="contact-privacy"
            name="privacy"
            type="checkbox"
            required
            checked={privacy}
            onChange={(e) => onPrivacyChange(e.target.checked)}
            aria-invalid={Boolean(errors.privacy)}
            aria-describedby={
              errors.privacy ? "contact-privacy-error" : undefined
            }
            className="mt-3 h-5 w-5 shrink-0 accent-[#C72A09] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#C72A09]"
          />
          <div className="text-sm leading-6 text-[#525252]">
            <label
              htmlFor="contact-privacy"
              className="block cursor-pointer py-2"
            >
              Ho letto e accetto il trattamento dei dati personali.
              Obbligatorio.
            </label>
            <Link
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-sm font-semibold text-[#0A0A0A] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C72A09]"
            >
              Leggi la privacy policy{" "}
              <span className="sr-only">(si apre in una nuova scheda)</span>
            </Link>
          </div>
        </div>
        <FieldError id="contact-privacy" error={errors.privacy} />
      </div>
      <button
        type="submit"
        className={`${primaryButton} w-full`}
        disabled={sending}
      >
        {sending ? "Invio in corso…" : "Invia la richiesta"}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </button>
      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          className={quietButton}
          onClick={() => onExternal("whatsapp")}
        >
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          Apri WhatsApp
          <span className="sr-only">
            {" "}
            con il messaggio, in una nuova scheda
          </span>
        </button>
        <button
          type="button"
          className={quietButton}
          onClick={() => onExternal("email")}
        >
          <Mail aria-hidden="true" className="h-4 w-4" />
          Apri la tua email
        </button>
      </div>
      <p className="text-xs leading-5 text-[#666666]">
        Con WhatsApp o email, confermerai l’invio nell’app che si apre.
      </p>
    </div>
  );
}
