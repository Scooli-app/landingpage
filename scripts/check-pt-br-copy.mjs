// Guard for the Brazilian copy: `npm run check:pt-br`.
// Fails when a namespace that should be Brazilian is still the pt-PT scaffold,
// when its keys or {placeholders}/<tags> drift from pt-PT, or when any string
// uses a Portugal-only term. Scope: the namespaces in DONE_NAMESPACES (step 1;
// Task 9 extends the list and then scans the whole file), plus
// src/components/marketing/content/pt-BR.ts in full once it exists.
import { existsSync, readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const ptPT = JSON.parse(read("messages/pt-PT.json"));
const ptBR = JSON.parse(read("messages/pt-BR.json"));

const DONE_NAMESPACES = [
  "common", "nav", "footer", "siteMeta", "shareImage", "promoBanner", "booking", "notFound",
  "contactModal", "contactForm", "emailContact", "institutionalContactButton", "home",
  "classState", "schools", "pricingSection", "pricingPage", "contact", "trust", "about",
  "recommendInstitution", "languageSwitcher",
];

// Case-insensitive, matched as whole words (Unicode-aware, so "ecrã" and "registo" work).
const BANNED = [
  "Aprendizagens Essenciais", "DL 54/2018", "DL 55/2018", "54/2018", "55/2018", "RGPD",
  "agrupamentos?", "[123]\\.?º ciclo","fichas?", "testes?", "equipas?",
  "contactos?", "contact(?:ar|e|em|ámos)", "telemóve(?:l|is)", "regist(?:o|os|ar|e|ámos)",
  "utilizador(?:es|a|as)?", "ecrãs?", "Regresso às Aulas", "encarregado de educação",
  "ensino profissional", "cursos? profissiona(?:l|is)", "ensino técnico", "cursos? técnicos?",
  "Educação Infantil", "pré-escolar",
  // tu-form verbs and pronouns ("você" is the only form on /br)
  "tens", "podes", "queres", "vês", "fazes", "sabes", "precisas", "estás", "consegues",
  "teu", "tua", "teus", "tuas", "contigo",
];
// Exact phrases that are fine despite a banned word in them.
const ALLOWED = [];

const bannedRe = new RegExp(`(?<![\\p{L}\\p{N}])(?:${BANNED.join("|")})(?![\\p{L}\\p{N}])`, "giu");

const errors = [];

/** Yields [path, string] for every string leaf. */
function* leaves(value, path) {
  if (typeof value === "string") yield [path, value];
  else if (value && typeof value === "object")
    for (const [key, child] of Object.entries(value)) yield* leaves(child, `${path}.${key}`);
}

const tokens = (s) => (s.match(/\{[^}]+\}|<\/?\w+>/g) ?? []).sort().join(" ");

function scanBanned(label, text) {
  let clean = text;
  for (const phrase of ALLOWED) clean = clean.replaceAll(phrase, "");
  const hits = [...clean.matchAll(bannedRe)].map((m) => m[0]);
  if (hits.length) errors.push(`banned term in ${label}: ${[...new Set(hits)].join(", ")}`);
}

for (const ns of DONE_NAMESPACES) {
  if (!(ns in ptBR)) {
    errors.push(`missing namespace ${ns}`);
    continue;
  }
  if (JSON.stringify(ptBR[ns]) === JSON.stringify(ptPT[ns]))
    errors.push(`scaffold: ${ns} still equals pt-PT verbatim`);

  const ptLeaves = new Map(leaves(ptPT[ns], ns));
  const brLeaves = new Map(leaves(ptBR[ns], ns));
  for (const [path, text] of ptLeaves) {
    if (!brLeaves.has(path)) errors.push(`missing key ${path}`);
    else if (tokens(text) !== tokens(brLeaves.get(path)))
      errors.push(`placeholders differ at ${path}: pt-PT "${tokens(text)}" vs pt-BR "${tokens(brLeaves.get(path))}"`);
  }
  for (const path of brLeaves.keys()) if (!ptLeaves.has(path)) errors.push(`extra key ${path}`);
  for (const [path, text] of brLeaves) scanBanned(`messages/pt-BR.json ${path}`, text);
}

const contentPath = "src/components/marketing/content/pt-BR.ts";
if (existsSync(new URL(`../${contentPath}`, import.meta.url))) {
  read(contentPath)
    .split("\n")
    .forEach((line, index) => scanBanned(`${contentPath}:${index + 1}`, line));
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\ncheck:pt-br failed with ${errors.length} problem(s).`);
  process.exit(1);
}
console.log(`check:pt-br passed (${DONE_NAMESPACES.length} namespaces).`);
