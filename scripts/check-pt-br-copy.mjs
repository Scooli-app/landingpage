// Guard for the Brazilian copy: `npm run check:pt-br`.
// Fails when a namespace that should be Brazilian is still the pt-PT scaffold,
// when its keys or {placeholders}/<tags> drift from pt-PT, or when any string
// uses a Portugal-only term. Scope: the namespaces in DONE_NAMESPACES, plus the
// string literals of src/components/marketing/content/pt-BR.ts (comments are skipped).
import { existsSync, readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const ptPT = JSON.parse(read("messages/pt-PT.json"));
const ptBR = JSON.parse(read("messages/pt-BR.json"));

const DONE_NAMESPACES = [
  "common", "nav", "footer", "siteMeta", "shareImage", "promoBanner", "booking", "notFound",
  "contactModal", "contactForm", "emailContact", "institutionalContactButton", "home",
  "classState", "schools", "pricingSection", "pricingPage", "contact", "trust", "about",
  "recommendInstitution", "languageSwitcher", "privacyPolicy", "termsOfUse", "legalLayout",
  "teachers", "aiForTeachers", "tools", "roadmap", "investors",
];

// The pt-BR legal texts add items and sections that the LGPD and the CDC need
// and that pt-PT has no counterpart for. Missing keys are still errors there.
const EXTRA_KEYS_OK = ["privacyPolicy.sections.", "termsOfUse.sections."];
// pt-PT keys pt-BR leaves out on purpose: the assessment stats are Portuguese
// TALIS figures, and the page hides the block when the list is empty.
const MISSING_KEYS_OK = ["tools.detail.assessment.stats."];

// Case-insensitive, matched as whole words (Unicode-aware, so "ecrã" and "registo" work).
const BANNED = [
  "Aprendizagens Essenciais", "DL 54/2018", "DL 55/2018", "54/2018", "55/2018", "RGPD",
  "agrupamentos?", "[123]\\.?º ciclo", "(?:primeiro|segundo|terceiro) ciclo", "fichas?",
  "testes?", "equipas?", "planificaç(?:ão|ões)", "connosco", "partilh[\\p{L}-]*", "ficheiros?",
  "facto", "contact[\\p{L}-]*", "telemóve(?:l|is)",
  // "registro"/"registrar" are Brazilian and must pass.
  "regist(?:o|os|ad[\\p{L}]*|ar|á-[\\p{L}]+|e|ámos)",
  "utilizador(?:es|a|as)?", "ecrãs?", "Regresso às Aulas", "encarregad[oa]s? de educação",
  "(?:ensino|educação) profissional", "profissionalizantes?", "cursos? profissiona(?:l|is)",
  "ensino técnico", "cursos? técnicos?", "Educação Infantil", "pré-escolar",
  // tu-form verbs and pronouns ("você" is the only form on /br)
  "tens", "podes", "queres", "vês", "fazes", "sabes", "precisas", "estás", "consegues",
  "teu", "tua", "teus", "tuas", "contigo",
  // EU-PT constructions: "estar a" + infinitive (any tense, "a ir", "a prepará-lo"),
  // "a ser" + participle (regular and the common irregular ones), "pronto a" + infinitive.
  "est(?:ar|á|ão|ou|amos|ava|avam|ávamos|ive|eve|ivemos|iveram|ará|arão|aria|ariam|ando|eja|ejam|ivesse|ivessem) a (?:\\p{L}+(?:ar|er|ir)|\\p{L}+[áêí]-\\p{L}+|ir|pôr)",
  "a ser (?:\\p{L}+(?:ad|id)|feit|escrit|abert|post|vist|dit|impress|cobert)[oa]s?", "a ser entregues?",
  "pront[oa]s? a \\p{L}+(?:ar|er|ir)",
];
// Exact phrases that are fine despite a banned word in them. The slugs are the
// internal tool identifiers in content/pt-BR.ts; the /br URLs use the Brazilian ones.
const ALLOWED = ["Período de teste", '"fichas-de-trabalho"', '"gerador-de-testes"'];

const bannedRe = new RegExp(`(?<![\\p{L}\\p{N}])(?:${BANNED.join("|")})(?![\\p{L}\\p{N}])`, "giu");
// Brazil quotes with “ ”; «» is the European style. Punctuation, so no word boundaries.
const guillemetRe = /[«»]/g;

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
  const hits = [...clean.matchAll(bannedRe), ...clean.matchAll(guillemetRe)].map((m) => m[0]);
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
    if (!brLeaves.has(path)) {
      if (!MISSING_KEYS_OK.some((prefix) => path.startsWith(prefix))) errors.push(`missing key ${path}`);
    } else if (tokens(text) !== tokens(brLeaves.get(path)))
      errors.push(`placeholders differ at ${path}: pt-PT "${tokens(text)}" vs pt-BR "${tokens(brLeaves.get(path))}"`);
  }
  for (const path of brLeaves.keys())
    if (!ptLeaves.has(path) && !EXTRA_KEYS_OK.some((prefix) => path.startsWith(prefix)))
      errors.push(`extra key ${path}`);
  for (const [path, text] of brLeaves) scanBanned(`messages/pt-BR.json ${path}`, text);
}

const contentPath = "src/components/marketing/content/pt-BR.ts";
if (!existsSync(new URL(`../${contentPath}`, import.meta.url))) {
  errors.push(`missing ${contentPath}`);
} else {
  const source = read(contentPath);
  if (source.includes("marketingContentPtPT")) errors.push(`${contentPath} still reuses pt-PT copy`);
  // Strings only. /* */ blocks are blanked (newlines kept, so line numbers hold),
  // and a "//" before any quote on a line starts a comment, which the alternation skips.
  source
    .replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/[^\n]/g, " "))
    .split("\n")
    .forEach((line, index) => {
      for (const [token] of line.matchAll(/"(?:[^"\\]|\\.)*"|\/\/.*$/g))
        if (token.startsWith('"')) scanBanned(`${contentPath}:${index + 1}`, token);
    });
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\ncheck:pt-br failed with ${errors.length} problem(s).`);
  process.exit(1);
}
console.log(`check:pt-br passed (${DONE_NAMESPACES.length} namespaces).`);
