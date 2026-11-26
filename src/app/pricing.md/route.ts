import { localizedUrl } from "@/i18n/urls";
import { PRICING, SITE_URL } from "@/lib/seo";

/**
 * Pricing as plain markdown, for AI agents and anyone who prefers not to parse
 * a rendered page. Generated from the same constants as the pricing page and
 * the product schema, so the three cannot disagree. `?locale=pt-BR` serves the
 * Brazilian version (same euro prices, /br links); anything else gets the default.
 */
function buildPricing() {
  const monthly = PRICING.pro_monthly.price.toFixed(2);
  const annual = PRICING.pro_annual.price.toFixed(2);

  return [
    "# Pricing: Scooli",
    "",
    `Scooli is AI software for teachers (${SITE_URL}). Prices in euros, VAT included where applicable. Cancel any time.`,
    "",
    "## Free trial",
    "- Price: EUR 0",
    `- Length: ${PRICING.free.trialDays} days from sign-up, no payment details, no commitment`,
    "- Includes: everything listed under Pro except advanced AI models, early access to new features and priority support",
    "- Afterwards: the account becomes read-only (documents stay viewable and editable) until the teacher subscribes",
    "",
    "## Pro",
    `- Price: EUR ${monthly} per month, or EUR ${annual} per year (${PRICING.pro_annual.savings} off)`,
    "- Limits: no creation limits, subject to the fair-use policy (no shared accounts, no automation or bulk generation)",
    "- Includes: lesson plans, worksheets, tests, quizzes, slide decks and yearly plans; unlimited classes for the whole school year; a calendar for each class with the week prepared in one click; each class's state (what has been taught and what is left); materials adapted by level or learning needs; your own textbooks and materials as sources; images in your documents; export to Word and PDF; community library; advanced AI models; early access to new features; priority support",
    `- Subscribe: ${SITE_URL}/precos`,
    "",
    "## Institutional (schools and school groups)",
    "- Price: on request, priced by number of teachers",
    "- Includes: everything in Pro for every teacher, the state of the curriculum in every class of the school in one dashboard, school dashboard with each teacher's activity, seats and invitations managed centrally, internal library for sharing between colleagues, implementation and team training, ongoing support for the team, adaptations and features built for the school's needs, privacy documentation for the data protection officer, one invoice for the school",
    "- Starts with a supported pilot with a small team",
    `- Talk to us: ${SITE_URL}/contacto (or info@scooli.app)`,
    "",
    "Fair-use policy and conditions: " + `${SITE_URL}/terms`,
    "",
  ].join("\n");
}

/** The same plans for the Brazilian site, in Brazilian Portuguese. */
function buildPricingPtBR() {
  const monthly = PRICING.pro_monthly.price.toFixed(2).replace(".", ",");
  const annual = PRICING.pro_annual.price.toFixed(2).replace(".", ",");
  const url = (path: string) => localizedUrl(SITE_URL, path, "pt-BR");

  return [
    "# Preços: Scooli",
    "",
    `A Scooli é uma plataforma de IA para professores (${url("/")}). Preços em euros, cobrados pelo Stripe. Cancele quando quiser.`,
    "",
    `## ${PRICING.free.trialDays} dias grátis`,
    "- Preço: €0",
    `- Duração: ${PRICING.free.trialDays} dias a partir do cadastro, sem dados de pagamento nem compromisso`,
    "- Inclui: tudo o que o Pro inclui, exceto os modelos de IA avançados, o acesso antecipado a novidades e o suporte prioritário",
    "- Depois: a conta fica em modo de leitura (os documentos continuam disponíveis para ver e editar) até o professor assinar",
    "",
    "## Pro",
    `- Preço: €${monthly} por mês, ou €${annual} por ano (${PRICING.pro_annual.savings} de desconto)`,
    "- Limites: sem limites de criação, de acordo com a política de uso justo (sem contas compartilhadas, automação ou geração em massa)",
    "- Inclui: planos de aula, atividades, provas, quizzes, apresentações e planejamentos anuais, bimestrais e de unidade, ligados às habilidades da BNCC; turmas sem limite para o ano letivo inteiro; calendário de cada turma, com a semana preparada em um clique; o estado de cada turma (o que já foi dado e o que falta); materiais adaptados por nível ou necessidades; seus livros didáticos e materiais como fonte; imagens nos documentos; exportação para Word e PDF; biblioteca comunitária; modelos de IA avançados; acesso antecipado a novidades; suporte prioritário",
    `- Assinar: ${url("/precos")}`,
    "",
    "## Plano para escolas e redes de ensino",
    "- Preço: sob consulta, de acordo com o número de professores",
    "- Inclui: tudo o que o Pro inclui para cada professor; o cumprimento do planejamento de todas as turmas em um só painel; painel da escola com o uso da Scooli pelos professores; vagas e contas da escola em um só lugar; biblioteca interna para compartilhar materiais entre colegas; implantação e formação dos professores; acompanhamento contínuo da equipe da Scooli; adaptações e funcionalidades sob medida para a escola; documentação de privacidade para o encarregado de dados; uma fatura para a escola",
    "- Começa com um piloto acompanhado, com um grupo pequeno de professores",
    `- Fale com a equipe: ${url("/contacto")} (ou info@scooli.app)`,
    "",
    `Política de uso justo e condições: ${url("/terms")}`,
    "",
  ].join("\n");
}

export function GET(request: Request) {
  const ptBR = new URL(request.url).searchParams.get("locale") === "pt-BR";
  return new Response(ptBR ? buildPricingPtBR() : buildPricing(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
