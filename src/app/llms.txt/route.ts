import { getToolPages } from "@/components/marketing/data";
import { defaultLocale } from "@/i18n/routing";
import { EN_COMPARISON_SLUGS } from "@/i18n/toolSlugs";
import { comparisonSlugs, getComparisonPage } from "@/components/marketing/comparisons";
import { APP_URL, LEGAL_ENTITY_NAME, PRICING, PUBLIC_IMPACT_METRICS, SITE_URL } from "@/lib/seo";

// llms.txt is a single, unlocalised document served at the site root, so it
// describes the Portuguese site — the canonical one.
const toolPages = getToolPages(defaultLocale);

function buildSection(title: string, lines: string[]) {
  return [`## ${title}`, ...lines, ""].join("\n");
}

function buildToolSection() {
  const lines = toolPages.map(
    (tool) => `- ${tool.shortTitle}: ${SITE_URL}/ferramentas/${tool.slug}. ${tool.description}`,
  );

  return buildSection("Tools", lines);
}

function buildLlmsText() {
  return [
    "# Scooli",
    "",
    "> Scooli is AI software for teachers in Portugal. It lays out each class's lessons from the teacher's yearly plan and prepares every week: lesson plans, worksheets, tests, quizzes, yearly plans and slide decks, aligned with the Aprendizagens Essenciais and editable before use.",
    "",
    `Scooli is a product of ${LEGAL_ENTITY_NAME} The site is in European Portuguese (${SITE_URL}) with an English version (${SITE_URL}/en). This file describes the Portuguese site.`,
    "",
    buildSection("What it does", [
      "- In development (not yet available to teachers): a live state for every class (what the curriculum asks for, what was planned, what has been taught, what is left) and recommendations for what to teach next.",
      "- Builds each class's lesson calendar from the teacher's yearly plan, and prepares a lesson plan for every lesson of the week in one click (\"Gerar semana\").",
      "- Creates lesson plans, worksheets, tests (with marks and marking criteria), quizzes, yearly/unit plans and slide decks as structured, editable documents. Exports to Word and PDF.",
      "- Adapts materials by level or support need, and turns documents the teacher already has into new resources.",
      "- Community library where teachers share and reuse materials; a school workspace for the institutional plan: seats, a usage dashboard, an internal library and the state of the curriculum in every class of the school.",
      "- The teacher reviews and decides everything: outputs are suggestions, not final documents.",
      "- Not a student-facing tutor, not an LMS, not a general chatbot.",
    ]),
    buildSection("Pricing", [
      `- Free: ${PRICING.free.generationsPerMonth} credits per month.`,
      `- Pro: EUR ${PRICING.pro_monthly.price.toFixed(2)} per month, or EUR ${PRICING.pro_annual.price.toFixed(2)} per year (${PRICING.pro_annual.savings} off). No creation limits, subject to a fair-use policy.`,
      "- Institutional plan for schools and school groups: priced by number of teachers, on request. Includes a school dashboard, seat management, an internal library, training and privacy documentation. Starts with a supported pilot.",
      `- Machine-readable: ${SITE_URL}/pricing.md`,
    ]),
    buildSection("Trust and data", [
      "- User prompts and materials are not used to train AI models.",
      "- Data is handled under the GDPR, encrypted in transit (SSL/TLS) and stored on servers with restricted access.",
      "- Teacher review is expected before any material is used with students.",
      `- Privacy Policy: ${SITE_URL}/privacy | Terms: ${SITE_URL}/terms | Trust page: ${SITE_URL}/confianca`,
    ]),
    buildSection("Public numbers", [
      `- More than ${PUBLIC_IMPACT_METRICS.activeTeachers.minValue} teachers and more than ${PUBLIC_IMPACT_METRICS.generatedDocuments.minValue} documents created.`,
    ]),
    buildSection("Roadmap", [
      "- Available: connect curriculum, plan and calendar; a school dashboard with the curriculum of every class.",
      "- In development: a live state for every class, for teachers; recommendations for what comes next.",
      "- Next: Scooli prepares the week on its own initiative, assessment evidence by topic, and a view across departments and the whole school.",
      `- Roadmap: ${SITE_URL}/roadmap`,
    ]),
    buildSection("Key pages", [
      `- Home: ${SITE_URL}`,
      `- AI for teachers: ${SITE_URL}/ia-para-professores`,
      `- For teachers: ${SITE_URL}/professores`,
      `- For schools: ${SITE_URL}/escolas`,
      `- Tools: ${SITE_URL}/ferramentas`,
      `- Pricing: ${SITE_URL}/precos`,
      `- About the team: ${SITE_URL}/sobre`,
      `- Contact: ${SITE_URL}/contacto`,
    ]),
    buildSection("Comparisons", comparisonSlugs.map((slug) => {
      const page = getComparisonPage(slug);
      const english = getComparisonPage(slug, "en");
      return `- ${page?.metaTitle ?? slug}: ${SITE_URL}/comparar/${slug} (English: ${SITE_URL}/en/compare/${EN_COMPARISON_SLUGS[slug]}, "${english?.metaTitle ?? ""}")`;
    })),
    buildToolSection(),
    buildSection("Contact", [
      `- Website: ${SITE_URL}`,
      `- Sign up: ${APP_URL}/sign-up`,
      "- Email: info@scooli.app",
    ]),
  ].join("\n");
}

export function GET() {
  return new Response(buildLlmsText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
