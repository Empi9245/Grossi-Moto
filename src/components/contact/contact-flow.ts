export type ContactModel = { id: string; name: string; brand: string };
export type Topic = "sales" | "workshop" | "parts" | "other";
export type ContactChannel = "whatsapp" | "email" | "phone";
export type Step =
  | "topic"
  | "known"
  | "model"
  | "usage"
  | "interests"
  | "service"
  | "vehicle"
  | "symptoms"
  | "parts"
  | "partsDetails"
  | "question"
  | "contact"
  | "review";
export type Answers = {
  topic: Topic | "";
  known: "yes" | "no" | "";
  modelId: string;
  usage: string;
  interests: string[];
  salesNote: string;
  service: string;
  vehicle: string;
  symptoms: string;
  workshopNote: string;
  parts: string;
  partsDetails: string;
  partsVehicle: string;
  question: string;
  channel: ContactChannel | "";
  name: string;
  email: string;
  phone: string;
};
export type Errors = Partial<
  Record<keyof Answers | "message" | "privacy", string>
>;

export const interestOptions = [
  "Prezzo",
  "Disponibilità",
  "Finanziamento",
  "Permuta",
  "Vederlo dal vivo",
  "Altro",
];
export const usageOptions = [
  "Roma tutti i giorni",
  "Città e tangenziale",
  "Anche fuori città",
  "Spesso con un passeggero",
  "Non lo so ancora",
];
export const serviceOptions = [
  "Tagliando",
  "Problema o guasto",
  "Gomme",
  "Manutenzione",
  "Non sono sicuro",
];
export const partsOptions = [
  "Un ricambio",
  "Un accessorio per il mezzo",
  "Casco o abbigliamento",
  "Un consiglio",
];
export const topicLabels: Record<Topic, string> = {
  sales: "Moto e scooter",
  workshop: "Officina",
  parts: "Ricambi e accessori",
  other: "Altra domanda",
};
export const channelLabels: Record<ContactChannel, string> = {
  whatsapp: "WhatsApp",
  email: "Email",
  phone: "Telefono",
};

export function createAnswers(
  initialSubject = "",
  initialMessage = "",
  model?: ContactModel,
): Answers {
  const topic: Answers["topic"] =
    model ||
    [
      "Scelta di moto o scooter",
      "Informazioni KYMCO",
      "Informazioni Voge",
      "Disponibilità e acquisto",
    ].includes(initialSubject)
      ? "sales"
      : initialSubject === "Prenotazione officina"
        ? "workshop"
        : initialSubject === "Accessori e abbigliamento"
          ? "parts"
          : initialSubject || initialMessage
            ? "other"
            : "";
  // The existing product CTA's prefill becomes equivalent structured answers.
  // Any other caller-provided text remains an editable note in its own branch.
  const standardProductMessage =
    model &&
    initialMessage ===
      `Buongiorno, vorrei conoscere prezzo e disponibilità di ${model.name}.`;
  const note = standardProductMessage ? "" : initialMessage;
  return {
    topic,
    known: model ? "yes" : "",
    modelId: model?.id ?? "",
    usage: "",
    interests: standardProductMessage ? ["Prezzo", "Disponibilità"] : [],
    salesNote: topic === "sales" ? note : "",
    service: "",
    vehicle: "",
    symptoms: "",
    workshopNote: topic === "workshop" ? note : "",
    parts: "",
    partsDetails: topic === "parts" ? note : "",
    partsVehicle: "",
    question: topic === "other" ? note : "",
    channel: "",
    name: "",
    email: "",
    phone: "",
  };
}

export function needsSymptoms(a: Answers) {
  return a.service === "Problema o guasto" || a.service === "Non sono sicuro";
}

export function getSteps(a: Answers, productEntry = false): Step[] {
  const steps: Step[] = productEntry && a.topic === "sales" ? [] : ["topic"];
  if (a.topic === "sales") {
    if (!productEntry) steps.push("known");
    if (a.known === "yes") {
      if (!productEntry) steps.push("model");
      steps.push("interests");
    } else if (a.known === "no") steps.push("usage");
  } else if (a.topic === "workshop") {
    steps.push("service", "vehicle");
    if (needsSymptoms(a)) steps.push("symptoms");
  } else if (a.topic === "parts") steps.push("parts", "partsDetails");
  else if (a.topic === "other") steps.push("question");
  return [...steps, "contact", "review"];
}

export function validateStep(
  step: Step,
  a: Answers,
  models: ContactModel[],
): Errors {
  switch (step) {
    case "topic":
      return a.topic ? {} : { topic: "Scegli come possiamo aiutarti." };
    case "known":
      return a.known ? {} : { known: "Scegli una delle due risposte." };
    case "model":
      return models.some((m) => m.id === a.modelId)
        ? {}
        : { modelId: "Scegli un modello dall’elenco." };
    case "usage":
      return usageOptions.includes(a.usage)
        ? {}
        : { usage: "Scegli l’uso più vicino alle tue esigenze." };
    case "interests":
      return !a.interests.some((v) => interestOptions.includes(v))
        ? { interests: "Scegli almeno un argomento." }
        : a.interests.includes("Altro") && !a.salesNote.trim()
          ? { salesNote: "Scrivi cosa vorresti sapere." }
          : {};
    case "service":
      return serviceOptions.includes(a.service)
        ? {}
        : { service: "Scegli il motivo della richiesta." };
    case "vehicle":
      return a.vehicle.trim()
        ? {}
        : {
            vehicle:
              "Indica marca e modello, anche se non ricordi il nome completo.",
          };
    case "symptoms":
      return a.symptoms.trim()
        ? {}
        : { symptoms: "Descrivi brevemente cosa hai notato." };
    case "parts":
      return partsOptions.includes(a.parts)
        ? {}
        : { parts: "Scegli cosa stai cercando." };
    case "partsDetails":
      return a.partsDetails.trim()
        ? {}
        : { partsDetails: "Aggiungi qualche dettaglio sulla tua richiesta." };
    case "question":
      return a.question.trim() ? {} : { question: "Scrivi la tua domanda." };
    case "contact": {
      const errors: Errors = {};
      if (!a.channel)
        errors.channel = "Scegli come preferisci essere ricontattato.";
      if (!a.name.trim()) errors.name = "Inserisci il tuo nome.";
      if (
        a.channel === "phone" &&
        !/^\+?[\d\s().-]+$/.test(a.phone.trim())
      )
        errors.phone = "Inserisci un numero di telefono valido.";
      const digits = a.phone.replace(/\D/g, "");
      if (
        a.channel === "phone" &&
        (digits.length < 7 || digits.length > 15)
      )
        errors.phone =
          "Controlla il numero, includendo il prefisso se necessario.";
      return errors;
    }
    default:
      return {};
  }
}

function sentence(value: string) {
  const text = value.trim();
  return text ? `${text}${/[.!?…]$/.test(text) ? "" : "."}` : "";
}
function joinItalian(values: string[]) {
  return values.length < 2
    ? values.join("")
    : `${values.slice(0, -1).join(", ")} e ${values.at(-1)}`;
}
export function getSubject(a: Answers, models: ContactModel[]) {
  const model =
    a.topic === "sales" && a.known === "yes"
      ? models.find((m) => m.id === a.modelId)
      : undefined;
  return model
    ? `Informazioni ${model.brand} ${model.name}`
    : a.topic
      ? topicLabels[a.topic]
      : "Richiesta informazioni";
}

export function buildMessage(a: Answers, models: ContactModel[]) {
  const text = [`Buongiorno Grossi Moto, sono ${a.name.trim() || "…"}.`];
  if (a.topic === "sales") {
    const model =
      a.known === "yes" ? models.find((m) => m.id === a.modelId) : undefined;
    if (model) {
      text.push(`Sto valutando ${model.brand} ${model.name}.`);
      const info: Record<string, string> = {
        Prezzo: "il prezzo",
        Disponibilità: "la disponibilità",
        Finanziamento: "le possibilità di finanziamento",
        Permuta: "la possibilità di una permuta",
      };
      const requested = interestOptions
        .filter((v) => a.interests.includes(v) && info[v])
        .map((v) => info[v]);
      if (requested.length)
        text.push(`Vorrei conoscere ${joinItalian(requested)}.`);
      if (a.interests.includes("Vederlo dal vivo"))
        text.push("Mi piacerebbe passare a vederlo in showroom.");
    } else {
      text.push("Vorrei un consiglio per scegliere una moto o uno scooter.");
      const usages: Record<string, string> = {
        "Roma tutti i giorni": "Lo userei per spostarmi ogni giorno a Roma.",
        "Città e tangenziale": "Lo userei in città e in tangenziale.",
        "Anche fuori città":
          "Mi servirebbe anche per gli spostamenti fuori città.",
        "Spesso con un passeggero": "Viaggerei spesso con un passeggero.",
        "Non lo so ancora":
          "Vorrei capire quale mezzo è più adatto alle mie esigenze.",
      };
      if (usages[a.usage]) text.push(usages[a.usage]);
    }
    if (a.salesNote.trim()) text.push(sentence(a.salesNote));
  } else if (a.topic === "workshop") {
    text.push(`Vi contatto per il mio mezzo: ${sentence(a.vehicle)}`);
    const requests: Record<string, string> = {
      Tagliando: "Vorrei organizzare un tagliando.",
      "Problema o guasto": "Vorrei far controllare un problema.",
      Gomme: "Avrei bisogno di assistenza per le gomme.",
      Manutenzione: "Vorrei organizzare un intervento di manutenzione.",
      "Non sono sicuro": "Vorrei un vostro parere su un possibile intervento.",
    };
    if (requests[a.service]) text.push(requests[a.service]);
    if (needsSymptoms(a) && a.symptoms.trim()) text.push(sentence(a.symptoms));
    if (a.workshopNote.trim()) text.push(sentence(a.workshopNote));
  } else if (a.topic === "parts") {
    const requests: Record<string, string> = {
      "Un ricambio": "Sto cercando un ricambio.",
      "Un accessorio per il mezzo":
        "Sto cercando un accessorio per il mio mezzo.",
      "Casco o abbigliamento": "Cerco un casco o dell’abbigliamento.",
      "Un consiglio": "Vorrei un consiglio su ricambi o accessori.",
    };
    if (requests[a.parts]) text.push(requests[a.parts]);
    text.push(sentence(a.partsDetails));
    if (a.partsVehicle.trim())
      text.push(`Il mio mezzo è ${sentence(a.partsVehicle)}`);
  } else text.push(sentence(a.question));
  if (a.channel === "phone")
    text.push(
      `Preferisco essere ricontattato telefonicamente al ${a.phone.trim()}.`,
    );
  text.push("Grazie.");
  return text.filter(Boolean).join(" ");
}

export function getDeliveryLinks(message: string, subject: string) {
  return {
    whatsapp: `https://wa.me/393289185029?text=${encodeURIComponent(message)}`,
    email: `mailto:info@grossimoto.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
  };
}

export function buildPayload(
  a: Answers,
  message: string,
  privacy: boolean,
  honeypot: string,
  models: ContactModel[],
) {
  const data = new FormData();
  data.set("_subject", "Nuova richiesta dal sito Grossimoto");
  data.set("_gotcha", honeypot);
  data.set("subject", getSubject(a, models));
  data.set("name", a.name.trim());
  data.set("message", message.trim());
  data.set("preferred_contact", a.channel ? channelLabels[a.channel] : "");
  if (a.channel === "phone") data.set("phone", a.phone.trim());
  if (privacy) data.set("privacy", "on");
  return data;
}
