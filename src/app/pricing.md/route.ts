import { PRICING, SITE_URL } from "@/lib/seo";

/**
 * Pricing as plain markdown, for AI agents and anyone who prefers not to parse
 * a rendered page. Generated from the same constants as the pricing page and
 * the product schema, so the three cannot disagree.
 */
function buildPricing() {
  const monthly = PRICING.pro_monthly.price.toFixed(2);
  const annual = PRICING.pro_annual.price.toFixed(2);

  return [
    "# Pricing: Scooli",
    "",
    `Scooli is AI software for teachers (${SITE_URL}). Prices in euros, VAT included where applicable. Cancel any time.`,
    "",
    "## Free",
    "- Price: EUR 0",
    `- Limits: ${PRICING.free.generationsPerMonth} credits per month (one credit per document generated)`,
    "- Includes: lesson plans, worksheets, tests, quizzes, slide decks, yearly plans, community library, editor, basic export",
    "",
    "## Pro",
    `- Price: EUR ${monthly} per month, or EUR ${annual} per year (${PRICING.pro_annual.savings} off)`,
    "- Limits: no creation limits, subject to the fair-use policy (no shared accounts, no automation or bulk generation)",
    "- Includes: everything in Free, advanced AI models, export in several formats, image generation, early access to new features",
    `- Subscribe: ${SITE_URL}/precos`,
    "",
    "## Institutional (schools and school groups)",
    "- Price: on request, priced by number of teachers",
    "- Includes: everything in Pro for every teacher, the state of the curriculum in every class of the school in one dashboard, school dashboard with each teacher's activity, seats and invitations managed centrally, internal library for sharing between colleagues, implementation and team training, privacy documentation for the data protection officer, one invoice for the school",
    "- Starts with a supported pilot with a small team",
    `- Talk to us: ${SITE_URL}/contacto (or info@scooli.app)`,
    "",
    "Fair-use policy and conditions: " + `${SITE_URL}/terms`,
    "",
  ].join("\n");
}

export function GET() {
  return new Response(buildPricing(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
