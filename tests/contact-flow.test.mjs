import test from "node:test";
import assert from "node:assert/strict";
import {
  createAnswers,
  getSteps,
  buildMessage,
  getSubject,
  validateStep,
  buildPayload,
  getDeliveryLinks,
} from "../src/components/contact/contact-flow.ts";

const models = [
  { id: "ak575-premium", name: "AK575 Premium", brand: "KYMCO" },
  { id: "voge-sfida-sr1", name: "Sfida SR1", brand: "Voge" },
];
const contact = {
  name: "Mario Rossi",
  channel: "whatsapp",
  phone: "+39 333 123 4567",
};

test("product entry preserves existing prefill intent in exactly three screens", () => {
  const a = createAnswers(
    "Disponibilità e acquisto",
    "Buongiorno, vorrei conoscere prezzo e disponibilità di AK575 Premium.",
    models[0],
  );
  assert.deepEqual(a.interests, ["Prezzo", "Disponibilità"]);
  assert.deepEqual(getSteps(a, true), ["interests", "contact", "review"]);
  const message = buildMessage({ ...a, ...contact }, models);
  assert.match(message, /KYMCO AK575 Premium/);
  assert.match(message, /il prezzo e la disponibilità/);
  assert.equal((message.match(/Buongiorno/g) ?? []).length, 1);
});

test("changing the sales branch excludes old model and interests from the request", () => {
  const a = {
    ...createAnswers("", "", models[0]),
    ...contact,
    interests: ["Prezzo", "Permuta"],
    known: "no",
    usage: "Città e tangenziale",
  };
  assert.deepEqual(getSteps(a), [
    "topic",
    "known",
    "usage",
    "contact",
    "review",
  ]);
  assert.doesNotMatch(buildMessage(a, models), /AK575|permuta|prezzo/);
  assert.match(buildMessage(a, models), /tangenziale/);
  assert.equal(getSubject(a, models), "Moto e scooter");
});

test("workshop symptoms are conditional and excluded when switching to a routine service", () => {
  const a = {
    ...createAnswers("Prenotazione officina"),
    ...contact,
    service: "Problema o guasto",
    vehicle: "KYMCO Agility 125",
    symptoms: "Rumore in accelerazione",
  };
  assert.ok(getSteps(a).includes("symptoms"));
  assert.match(buildMessage(a, models), /Rumore in accelerazione/);
  a.service = "Tagliando";
  assert.ok(!getSteps(a).includes("symptoms"));
  assert.doesNotMatch(buildMessage(a, models), /Rumore/);
});

test("parts and generic questions preserve free text without importing previous branches", () => {
  const a = {
    ...createAnswers("Accessori e abbigliamento", "Cerco guanti da pioggia"),
    ...contact,
    parts: "Casco o abbigliamento",
    partsVehicle: "Sfida SR1",
    symptoms: "OLD WORKSHOP DATA",
  };
  assert.match(buildMessage(a, models), /Cerco guanti da pioggia/);
  assert.match(buildMessage(a, models), /Sfida SR1/);
  assert.doesNotMatch(buildMessage(a, models), /OLD WORKSHOP DATA/);
  a.topic = "other";
  a.question = "Posso passare sabato?";
  assert.match(buildMessage(a, models), /Posso passare sabato\?/);
  assert.doesNotMatch(buildMessage(a, models), /guanti|Sfida/);
});

test("generic initialSubject and initialMessage are retained as a free question", () => {
  const a = createAnswers("Altro", "Una domanda già scritta");
  assert.equal(a.question, "Una domanda già scritta");
  assert.deepEqual(getSteps(a), ["topic", "question", "contact", "review"]);
  assert.match(buildMessage(a, models), /Una domanda già scritta/);
});

test("workshop prefill survives all service choices without retaining irrelevant symptoms", () => {
  const a = {
    ...createAnswers("Prenotazione officina", "Vorrei un tagliando dopo le 17"),
    ...contact,
    vehicle: "KYMCO Agility",
    service: "Tagliando",
    symptoms: "OLD FAULT",
  };
  assert.equal(a.workshopNote, "Vorrei un tagliando dopo le 17");
  assert.match(buildMessage(a, models), /dopo le 17/);
  assert.doesNotMatch(buildMessage(a, models), /OLD FAULT/);
});

test("required answers reject whitespace, unknown models and empty multi-selection", () => {
  const a = createAnswers();
  for (const step of [
    "topic",
    "known",
    "model",
    "usage",
    "interests",
    "service",
    "vehicle",
    "symptoms",
    "parts",
    "partsDetails",
    "question",
    "contact",
  ])
    assert.ok(Object.keys(validateStep(step, a, models)).length, step);
  assert.ok(
    validateStep("model", { ...a, modelId: "invented" }, models).modelId,
  );
  assert.ok(
    validateStep(
      "interests",
      { ...a, interests: ["Altro"], salesNote: "  " },
      models,
    ).salesNote,
  );
  assert.deepEqual(
    validateStep("interests", { ...a, interests: ["Prezzo"] }, models),
    {},
  );
});

test("only the preferred contact method is validated or transmitted", () => {
  const a = {
    ...createAnswers("Altro", "Informazioni"),
    ...contact,
    email: "stale@example.com",
  };
  assert.deepEqual(validateStep("contact", a, models), {});
  let payload = Object.fromEntries(
    buildPayload(a, "Edited message", true, "", models),
  );
  assert.equal(payload.phone, contact.phone);
  assert.ok(!("email" in payload));
  assert.equal(payload.message, "Edited message");
  assert.equal(payload.privacy, "on");
  a.channel = "email";
  a.phone = "invalid ignored phone";
  assert.deepEqual(validateStep("contact", a, models), {});
  payload = Object.fromEntries(
    buildPayload(a, "Edited message", true, "bot", models),
  );
  assert.equal(payload.email, "stale@example.com");
  assert.ok(!("phone" in payload));
  assert.equal(payload._gotcha, "bot");
  assert.equal(payload._subject, "Nuova richiesta dal sito Grossimoto");
  assert.ok(validateStep("contact", { ...a, email: "invalid" }, models).email);
  assert.ok(
    validateStep("contact", { ...a, channel: "phone", phone: "+39" }, models)
      .phone,
  );
  assert.ok(
    validateStep(
      "contact",
      { ...a, channel: "phone", phone: "abc123456789" },
      models,
    ).phone,
  );
});

test("outgoing URLs round-trip accents, multiline text and URL control characters", () => {
  const message = "È disponibile?\nMario & Luisa + 50% # prova";
  const subject = "Informazioni KYMCO AK575 Premium";
  const links = getDeliveryLinks(message, subject);
  assert.equal(new URL(links.whatsapp).hostname, "wa.me");
  assert.equal(new URL(links.whatsapp).pathname, "/393289185029");
  assert.equal(new URL(links.whatsapp).searchParams.get("text"), message);
  assert.equal(new URL(links.email).pathname, "info@grossimoto.it");
  assert.equal(new URL(links.email).searchParams.get("body"), message);
  assert.equal(new URL(links.email).searchParams.get("subject"), subject);
});
