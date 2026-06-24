import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUTPUT_ROOT = path.join(ROOT, "public", "voge");
const PUBLIC_ROOT = path.join(ROOT, "public");
const SOURCE_SITE = "https://vogeitaly.it/";
const POLITE_DELAY_MS = 90;
const MIN_USEFUL_DIMENSION = 240;

const MODELS = [
  {
    brand: "Voge",
    family: "valico",
    modelName: "Valico 800DSX Rally",
    slug: "voge-valico-800rally",
    sourcePageUrl: "https://vogeitaly.it/valico-800rally/",
  },
  {
    brand: "Voge",
    family: "valico",
    modelName: "Valico 625DSX",
    slug: "voge-valico-625dsx",
    sourcePageUrl: "https://vogeitaly.it/valico-625dsx/",
  },
  {
    brand: "Voge",
    family: "valico",
    modelName: "Valico 900DSX",
    slug: "voge-valico-900dsx",
    sourcePageUrl: "https://vogeitaly.it/valico-900dsx/",
  },
  {
    brand: "Voge",
    family: "sfida",
    modelName: "Sfida SR1",
    slug: "voge-sfida-sr1",
    sourcePageUrl: "https://vogeitaly.it/sfida-sr1/",
  },
  {
    brand: "Voge",
    family: "sfida",
    modelName: "Sfida SR1 ADV",
    slug: "voge-sfida-sr1-adv",
    sourcePageUrl: "https://vogeitaly.it/sfida-sr1-adv/",
  },
  {
    brand: "Voge",
    family: "sfida",
    modelName: "Sfida SR2 ADV",
    slug: "voge-sfida-sr2-adv",
    sourcePageUrl: "https://vogeitaly.it/sfida-sr2-adv/",
  },
  {
    brand: "Voge",
    family: "sfida",
    modelName: "Sfida SR16 125",
    slug: "voge-sfida-sr16-125",
    sourcePageUrl: "https://vogeitaly.it/sfida-sr16/",
  },
  {
    brand: "Voge",
    family: "sfida",
    modelName: "Sfida SR16 200",
    slug: "voge-sfida-sr16-200",
    sourcePageUrl: "https://vogeitaly.it/sfida-sr16-200/",
  },
  {
    brand: "Voge",
    family: "sfida",
    modelName: "Sfida SR3",
    slug: "voge-sfida-sr3",
    sourcePageUrl: "https://vogeitaly.it/sfida-sr3-2/",
  },
  {
    brand: "Voge",
    family: "sfida",
    modelName: "Sfida SR4 MAX",
    slug: "voge-sfida-sr4-max",
    sourcePageUrl: "https://vogeitaly.it/sfida-sr4-max/",
  },
];

const allowedHosts = new Set(["vogeitaly.it", "www.vogeitaly.it"]);
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const skipUrlParts = [
  "facebook.com/tr",
  "/wp-content/plugins/",
  "cookie-law-info",
  "revisit.svg",
  "close.svg",
  "logo-voge",
  "favicon",
  "revslider/landing-01/landing-rev-img-10",
  "sfondo-foote",
  "copertina-video",
  "patente",
  "privacy",
];

const manifest = [];
const skipped = [];
const seenHashesByRole = new Map();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function decodeEntities(value) {
  return String(value || "")
    .replaceAll("&#038;", "&")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&nbsp;", " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripTags(value) {
  return decodeEntities(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function slugify(value) {
  return stripTags(String(value || "unknown"))
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "unknown";
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return match ? decodeEntities(match[2] || match[3] || "") : "";
}

function toAbsoluteUrl(raw, baseUrl) {
  const cleaned = decodeEntities(String(raw || "").trim())
    .replace(/^url\((.*)\)$/i, "$1")
    .replace(/^['"]|['"]$/g, "");

  if (!cleaned || cleaned.startsWith("data:") || cleaned.startsWith("mailto:") || cleaned.startsWith("tel:")) {
    return null;
  }

  try {
    const parsed = new URL(cleaned, baseUrl);
    if (!allowedHosts.has(parsed.hostname)) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

function extensionFromUrl(url, contentType = "") {
  const pathname = new URL(url).pathname;
  const ext = path.extname(decodeURIComponent(pathname)).toLowerCase();
  if (imageExtensions.has(ext)) return ext === ".jpeg" ? ".jpg" : ext;
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("webp")) return ".webp";
  return ".jpg";
}

function fileStemFromUrl(url) {
  const pathname = new URL(url).pathname;
  return slugify(path.basename(decodeURIComponent(pathname), path.extname(pathname)));
}

function isProbablyImage(url) {
  const lower = url.toLowerCase();
  if (skipUrlParts.some((part) => lower.includes(part))) return false;
  const ext = path.extname(new URL(url).pathname).toLowerCase();
  return imageExtensions.has(ext);
}

function parseSrcset(srcset, baseUrl) {
  if (!srcset) return [];

  return srcset
    .split(",")
    .map((item) => item.trim())
    .map((item) => {
      const [urlPart, descriptor = ""] = item.split(/\s+/);
      const url = toAbsoluteUrl(urlPart, baseUrl);
      const width = Number((descriptor.match(/(\d+)w/) || [])[1] || 0);
      return url ? { url, width } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.width - a.width);
}

function withoutWordPressSize(url) {
  if (!url) return [];

  const parsed = new URL(url);
  const ext = path.extname(parsed.pathname);
  if (!ext) return [];

  const base = parsed.pathname.slice(0, -ext.length);
  const withoutSize = base.replace(/-\d{2,5}x\d{2,5}$/i, "");
  if (withoutSize === base) return [];

  const variants = [];
  parsed.pathname = `${withoutSize}${ext}`;
  variants.push(parsed.href);

  if (/\.(jpe?g)$/i.test(ext) && !withoutSize.endsWith("-scaled")) {
    parsed.pathname = `${withoutSize}-scaled${ext}`;
    variants.push(parsed.href);
  }

  return variants;
}

function uniqueUrls(urls) {
  const seen = new Set();
  const out = [];
  for (const url of urls) {
    if (!url || seen.has(url)) continue;
    seen.add(url);
    out.push(url);
  }
  return out;
}

function buildUrlCandidates({ href, src, srcset }, baseUrl) {
  const srcsetUrls = parseSrcset(srcset, baseUrl).map((item) => item.url);
  const hrefUrl = toAbsoluteUrl(href, baseUrl);
  const srcUrl = toAbsoluteUrl(src, baseUrl);

  return uniqueUrls([
    ...srcsetUrls,
    ...withoutWordPressSize(srcUrl || ""),
    ...withoutWordPressSize(hrefUrl || ""),
    hrefUrl,
    srcUrl,
  ]).filter((url) => {
    try {
      return isProbablyImage(url);
    } catch {
      return false;
    }
  });
}

function extractImageRecords(block, baseUrl) {
  const records = [];
  const push = (raw, sourceContext = "") => {
    const candidates = buildUrlCandidates(raw, baseUrl);
    if (!candidates.length) return;

    records.push({
      candidates,
      title: stripTags(raw.title || raw.alt || ""),
      alt: stripTags(raw.alt || ""),
      sourceContext: sourceContext.slice(0, 220),
    });
  };

  const anchorImageRegex = /<a\b(?<anchorAttrs>[^>]*)>(?<inner>[\s\S]*?<img\b[^>]*>[\s\S]*?)<\/a>/gi;
  for (const match of block.matchAll(anchorImageRegex)) {
    const imgTag = (match.groups.inner.match(/<img\b[^>]*>/i) || [])[0] || "";
    push(
      {
        href: attr(match.groups.anchorAttrs, "href"),
        src: attr(imgTag, "src") || attr(imgTag, "data-src"),
        srcset: attr(imgTag, "srcset") || attr(imgTag, "data-srcset"),
        title: attr(match.groups.anchorAttrs, "title") || attr(imgTag, "title"),
        alt: attr(imgTag, "alt"),
      },
      match[0],
    );
  }

  const imgRegex = /<img\b(?<attrs>[^>]*)>/gi;
  for (const match of block.matchAll(imgRegex)) {
    push(
      {
        src: attr(match.groups.attrs, "src") || attr(match.groups.attrs, "data-src"),
        srcset: attr(match.groups.attrs, "srcset") || attr(match.groups.attrs, "data-srcset"),
        title: attr(match.groups.attrs, "title"),
        alt: attr(match.groups.attrs, "alt"),
      },
      match[0],
    );
  }

  return records;
}

function findFirstIndexAfter(html, markers, start = 0) {
  return markers
    .map((marker) => html.indexOf(marker, start))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0] ?? -1;
}

function segmentBetween(html, startMarker, endMarkers, fallbackStart = 0) {
  const start = typeof startMarker === "number" ? startMarker : html.indexOf(startMarker, fallbackStart);
  if (start < 0) return "";
  const end = findFirstIndexAfter(html, endMarkers, start + 1);
  return html.slice(start, end >= 0 ? end : html.length);
}

function extractColorNames(colorBlock) {
  const names = [];
  const nameRegex = /<h4\b[^>]*class=["'][^"']*\bmkdf-team-name\b[^"']*["'][^>]*>(?<name>[\s\S]*?)<\/h4>/gi;
  for (const match of colorBlock.matchAll(nameRegex)) {
    names.push(stripTags(match.groups.name));
  }
  return names;
}

function extractAvailableColors(block) {
  const match = block.match(/Colori disponibili:\s*(?<colors>[^<\n\r]+)/i);
  if (!match?.groups?.colors) return [];

  return stripTags(match.groups.colors)
    .split(",")
    .map((color) => color.trim())
    .filter(Boolean);
}

async function fetchHtml(url) {
  await sleep(POLITE_DELAY_MS);
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "GrossiMotoVogeAssetCollector/1.0 (+https://vogeitaly.it/)",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return {
    html: await response.text(),
    finalUrl: response.url || url,
  };
}

async function fetchImage(record) {
  for (const candidateUrl of record.candidates) {
    try {
      await sleep(POLITE_DELAY_MS);
      const response = await fetch(candidateUrl, {
        redirect: "follow",
        headers: {
          "User-Agent": "GrossiMotoVogeAssetCollector/1.0 (+https://vogeitaly.it/)",
          Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        },
      });

      if (!response.ok) {
        continue;
      }

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.startsWith("image/") && !isProbablyImage(candidateUrl)) {
        continue;
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      const dimensions = getImageDimensions(buffer);
      if (dimensions.width < MIN_USEFUL_DIMENSION && dimensions.height < MIN_USEFUL_DIMENSION) {
        skipped.push({
          url: candidateUrl,
          reason: `too-small-or-unknown-dimensions: ${dimensions.width}x${dimensions.height}`,
        });
        continue;
      }

      return {
        buffer,
        dimensions,
        finalUrl: response.url || candidateUrl,
        contentType,
      };
    } catch (error) {
      skipped.push({ url: candidateUrl, reason: `download-failed: ${error.message}` });
    }
  }

  return null;
}

function getImageDimensions(buffer) {
  if (buffer.length < 32) return { width: 0, height: 0, format: "unknown" };

  if (buffer.readUInt32BE(0) === 0x89504e47) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
      format: "png",
    };
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length - 9) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
          format: "jpg",
        };
      }
      offset += 2 + length;
    }
  }

  if (buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") {
    const chunk = buffer.subarray(12, 16).toString("ascii");
    if (chunk === "VP8X") {
      return {
        width: 1 + buffer.readUIntLE(24, 3),
        height: 1 + buffer.readUIntLE(27, 3),
        format: "webp",
      };
    }
  }

  return { width: 0, height: 0, format: "unknown" };
}

function toPublicPath(absPath) {
  return `/${path.relative(PUBLIC_ROOT, absPath).replaceAll(path.sep, "/")}`;
}

function modelRoot(model) {
  return path.join(OUTPUT_ROOT, "models", model.family, model.slug);
}

function roleFolder(role) {
  if (role === "color") return "colors";
  if (role === "spin360") return "spin-360";
  if (role === "gallery") return "gallery";
  return "main";
}

function destinationFor(model, role, index, fetched, options = {}) {
  const ext = extensionFromUrl(fetched.finalUrl, fetched.contentType);
  const stem = fileStemFromUrl(fetched.finalUrl);
  const number = String(index).padStart(2, "0");

  if (role === "color") {
    const colorSlug = options.colorSlug || "color-unknown";
    return path.join(
      modelRoot(model),
      roleFolder(role),
      colorSlug,
      `${model.slug}-color-${number}-${colorSlug}${ext}`,
    );
  }

  if (role === "spin360") {
    return path.join(modelRoot(model), roleFolder(role), `${model.slug}-spin-360-${number}-${stem}${ext}`);
  }

  if (role === "gallery") {
    return path.join(modelRoot(model), roleFolder(role), `${model.slug}-gallery-${number}-${stem}${ext}`);
  }

  const label = options.label || "main";
  return path.join(modelRoot(model), roleFolder(role), `${model.slug}-${label}-${number}-${stem}${ext}`);
}

async function saveRecord(model, role, index, record, options = {}) {
  const fetched = await fetchImage(record);
  if (!fetched) {
    skipped.push({
      modelName: model.modelName,
      role,
      reason: "all-url-candidates-failed",
      candidates: record.candidates,
    });
    return null;
  }

  const sha256 = createHash("sha256").update(fetched.buffer).digest("hex");
  const duplicateScope = `${model.slug}:${role}:${sha256}`;
  if (seenHashesByRole.has(duplicateScope)) {
    skipped.push({
      modelName: model.modelName,
      role,
      url: fetched.finalUrl,
      reason: "duplicate-hash",
      duplicateOf: seenHashesByRole.get(duplicateScope),
    });
    return null;
  }

  const localPath = destinationFor(model, role, index, fetched, options);
  await fs.mkdir(path.dirname(localPath), { recursive: true });
  await fs.writeFile(localPath, fetched.buffer);
  const publicPath = toPublicPath(localPath);
  seenHashesByRole.set(duplicateScope, publicPath);

  const entry = {
    brand: model.brand,
    family: model.family,
    modelName: model.modelName,
    modelSlug: model.slug,
    role,
    colorName: options.colorName || null,
    colorSlug: options.colorSlug || null,
    title: record.title || null,
    localPath: publicPath,
    sourcePageUrl: model.sourcePageUrl,
    originalImageUrl: fetched.finalUrl,
    width: fetched.dimensions.width,
    height: fetched.dimensions.height,
    fileSize: fetched.buffer.length,
    sha256,
  };

  manifest.push(entry);
  return entry;
}

function firstUseful(records) {
  return records.find((record) => record.candidates.length > 0);
}

async function scrapeModel(model) {
  const { html, finalUrl } = await fetchHtml(model.sourcePageUrl);
  model.sourcePageUrl = finalUrl;

  const colorStart = html.indexOf("Scegli il colore");
  const aboutStart = html.indexOf('id="moto-about-block-row"', colorStart > 0 ? colorStart : 0);
  const spinStart = html.indexOf("UNA VISIONE A 360", aboutStart > 0 ? aboutStart : 0);
  const specsStart = html.indexOf("CARATTERISTICHE TECNICHE", spinStart > 0 ? spinStart : 0);
  const disclaimerStart = findFirstIndexAfter(
    html,
    ["Alcune immagini", "I dati tecnici", "Copyright 2020"],
    specsStart > 0 ? specsStart : 0,
  );

  const beforeColors = html.slice(0, colorStart > 0 ? colorStart : html.length);
  const hero = firstUseful(extractImageRecords(beforeColors, finalUrl));
  let heroCount = 0;
  if (hero) {
    const savedHero = await saveRecord(model, "main", 1, hero, { label: "hero" });
    heroCount = savedHero ? 1 : 0;
  }

  const colorEnd = colorStart >= 0
    ? findFirstIndexAfter(html, ['id="moto-about-block-row"', "UNA VISIONE A 360", "CARATTERISTICHE TECNICHE"], colorStart + 1)
    : -1;
  const colorBlock = colorStart >= 0
    ? html.slice(colorStart, colorEnd > colorStart ? colorEnd : html.length)
    : "";
  const mainBlock = aboutStart >= 0 ? html.slice(aboutStart, spinStart > aboutStart ? spinStart : html.length) : "";
  const carouselColorNames = extractColorNames(colorBlock);
  const availableColors = extractAvailableColors(mainBlock || html);
  const colorNames = carouselColorNames.length ? carouselColorNames : availableColors;
  const colorRecords = extractImageRecords(colorBlock, finalUrl);
  const colorRecordLimit = carouselColorNames.length ? carouselColorNames.length : colorRecords.length;
  let colorCount = 0;
  for (let index = 0; index < colorRecordLimit; index += 1) {
    const colorName = colorNames[index] || colorRecords[index].title || `Color ${index + 1}`;
    const saved = await saveRecord(model, "color", index + 1, colorRecords[index], {
      colorName,
      colorSlug: slugify(colorName),
    });
    if (saved) colorCount += 1;
  }

  const mainRecords = extractImageRecords(mainBlock, finalUrl);
  const extraMainRecords = carouselColorNames.length ? colorRecords.slice(carouselColorNames.length) : [];
  if (colorRecords.length === 0 && colorNames.length > 0 && mainRecords.length > 0) {
    for (let index = 0; index < colorNames.length; index += 1) {
      const colorName = colorNames[index];
      const fallbackRecord = mainRecords[Math.min(index, mainRecords.length - 1)];
      const saved = await saveRecord(model, "color", index + 1, fallbackRecord, {
        colorName,
        colorSlug: slugify(colorName),
      });
      if (saved) colorCount += 1;
    }
  }

  let mainCount = heroCount;
  const productRecords = [...extraMainRecords, ...mainRecords];
  for (let index = 0; index < productRecords.length; index += 1) {
    const saved = await saveRecord(model, "main", index + 1, productRecords[index], { label: "product" });
    if (saved) mainCount += 1;
  }

  const spinBlock = segmentBetween(html, spinStart, ["CARATTERISTICHE TECNICHE"], 0);
  const spinRecords = extractImageRecords(spinBlock, finalUrl);
  let spinCount = 0;
  for (let index = 0; index < spinRecords.length; index += 1) {
    const saved = await saveRecord(model, "spin360", index + 1, spinRecords[index]);
    if (saved) spinCount += 1;
  }

  const galleryBlock = specsStart >= 0
    ? html.slice(specsStart, disclaimerStart > specsStart ? disclaimerStart : html.length)
    : "";
  const galleryRecords = extractImageRecords(galleryBlock, finalUrl);
  let galleryCount = 0;
  for (let index = 0; index < galleryRecords.length; index += 1) {
    const saved = await saveRecord(model, "gallery", index + 1, galleryRecords[index]);
    if (saved) galleryCount += 1;
  }

  return {
    modelName: model.modelName,
    modelSlug: model.slug,
    family: model.family,
    sourcePageUrl: model.sourcePageUrl,
    colors: colorNames,
    counts: {
      main: mainCount,
      color: colorCount,
      spin360: spinCount,
      gallery: galleryCount,
      total: mainCount + colorCount + spinCount + galleryCount,
    },
  };
}

async function writeModelIndexes() {
  const byModel = new Map();
  for (const entry of manifest) {
    if (!byModel.has(entry.modelSlug)) byModel.set(entry.modelSlug, []);
    byModel.get(entry.modelSlug).push(entry);
  }

  for (const model of MODELS) {
    const images = byModel.get(model.slug) || [];
    const index = {
      brand: model.brand,
      family: model.family,
      modelName: model.modelName,
      modelSlug: model.slug,
      sourcePageUrl: model.sourcePageUrl,
      imageCount: images.length,
      colors: [...new Set(images.filter((image) => image.role === "color").map((image) => image.colorName).filter(Boolean))],
      images,
    };

    await fs.writeFile(path.join(modelRoot(model), "index.json"), `${JSON.stringify(index, null, 2)}\n`);
  }
}

async function main() {
  await fs.mkdir(OUTPUT_ROOT, { recursive: true });
  for (const model of MODELS) {
    await fs.rm(modelRoot(model), { recursive: true, force: true });
  }

  const modelSummaries = [];
  for (const model of MODELS) {
    console.log(`Scraping ${model.modelName} (${model.sourcePageUrl})`);
    modelSummaries.push(await scrapeModel(model));
  }

  manifest.sort((a, b) => a.localPath.localeCompare(b.localPath));
  await writeModelIndexes();

  const summary = {
    generatedAt: new Date().toISOString(),
    sourceSite: SOURCE_SITE,
    outputRoot: "/voge",
    requestedModelCount: MODELS.length,
    imageCount: manifest.length,
    modelSummaries,
    skipped,
  };

  await fs.writeFile(path.join(OUTPUT_ROOT, "manifest.json"), `${JSON.stringify({ summary, images: manifest }, null, 2)}\n`);

  console.log(`Saved ${manifest.length} Voge images.`);
  console.log(`Manifest: ${path.join(OUTPUT_ROOT, "manifest.json")}`);
  console.log(`Skipped ${skipped.length} candidates.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
