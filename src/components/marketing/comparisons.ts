import type { ToolFaq } from "./data";

/**
 * "Scooli vs X" comparison pages — PT-PT only for now (see
 * `notYetLocalized` in `src/i18n/urls.ts`). This is the single
 * best-evidenced AEO/GEO content format per the 2026 research
 * (`/root/scooli_geo_aeo_research_2026.md`): 32.5% of AI-answer-engine
 * citations go to comparison content, vs. near-zero for llms.txt.
 *
 * Every claim about a competitor here must trace back to a cited source in
 * `/root/scooli_technical_seo_2026_research.md`'s companion fact-sheets
 * (Canva for Education, MagicSchool AI — both dated October 2026). Do not
 * add a claim without a citation to carry in `sources`; a wrong claim about
 * a named competitor is a legal and reputational risk, not just a content
 * bug.
 *
 * Every row acknowledges where the competitor is genuinely stronger — tables
 * with declared competitor strengths are generally treated as more credible
 * because they allow the page to be trusted and are more easily quoted
 * by LLMs, per the AEO research.
 */

export type ComparisonRow = {
  aspect: string;
  scooli: string;
  competitor: string;
  /** Who comes out ahead on this specific row — drives the icon. */
  winner: "scooli" | "competitor" | "tie";
};

export type ComparisonSource = {
  label: string;
  url: string;
};

export type ComparisonPageContent = {
  slug: string;
  /** The competitor's own name, used in headings and schema. */
  competitorName: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  description: string;
  /** The upfront, scannable answer — the single paragraph most likely to be
   * quoted whole by an AI answer engine. States who it's for, plainly. */
  verdict: string;
  tableTitle: string;
  tableDescription: string;
  rows: ComparisonRow[];
  strengthsTitle: string;
  strengthsDescription: string;
  /** Competitor strengths stated plainly, each with the source that backs it. */
  competitorStrengths: { title: string; description: string }[];
  faq: ToolFaq[];
  ctaTitle: string;
  ctaDescription: string;
  sources: ComparisonSource[];
};

export const comparisonSlugs = ["canva-para-educacao", "magicschool-ai"] as const;
export type ComparisonSlug = (typeof comparisonSlugs)[number];

export const comparisonContentPtPT: Record<ComparisonSlug, ComparisonPageContent> = {
  "canva-para-educacao": {
    slug: "canva-para-educacao",
    competitorName: "Canva para Educação",
    metaTitle: "Scooli vs Canva para Educação: qual escolher?",
    metaDescription:
      "Comparação direta entre a Scooli e o Canva para Educação para professores em Portugal: alinhamento curricular, geração de planos de aula e design visual.",
    kicker: "Comparação",
    title: "Scooli vs Canva para Educação",
    description:
      "O Canva é a ferramenta de referência para design visual em contexto escolar. A Scooli resolve um problema diferente: partir das Aprendizagens Essenciais e do DL 55/2018 para gerar o documento pedagógico em si — plano de aula, planificação, teste — não o poster ou a apresentação.",
    verdict:
      "Em resumo: o Canva para Educação é gratuito e imbatível para criar materiais visuais (posters, apresentações, infográficos) e tem um gerador de planos de aula por IA — mas, por admissão da própria Canva, o mapeamento curricular automático está limitado a 4 países (EUA, Austrália, Indonésia, México) e não cobre Portugal. A Scooli nasceu precisamente para o mercado português: as Aprendizagens Essenciais e o DL 55/2018 estão integrados desde o primeiro pedido, não como texto genérico escrito por IA. Se precisa de um poster bonito, use o Canva. Se precisa de uma planificação alinhada com a legislação portuguesa em minutos, é para isso que a Scooli existe.",
    tableTitle: "Lado a lado",
    tableDescription:
      "Cada linha é verificável: o que a Scooli faz hoje, comparado com o que a Canva documenta publicamente sobre o Canva para Educação.",
    rows: [
      {
        aspect: "Preço para professores",
        scooli: "Gratuito com créditos mensais; Pro desde 6,99€/mês",
        competitor: "100% gratuito para professores do ensino básico/secundário verificados",
        winner: "competitor",
      },
      {
        aspect: "Alinhamento com as Aprendizagens Essenciais (Portugal)",
        scooli: "Integrado por definição em todas as planificações e planos de aula",
        competitor: "Sem mapeamento documentado para Portugal — cobertura curricular formal limitada a 4 países",
        winner: "scooli",
      },
      {
        aspect: "Referência ao DL 55/2018 (flexibilidade curricular)",
        scooli: "Documentado automaticamente nas planificações de unidade",
        competitor: "Não mencionado em nenhuma página de produto consultada",
        winner: "scooli",
      },
      {
        aspect: "Diferenciação automática por nível de turma",
        scooli: "Gera versões mais simples, mais curtas ou com apoio adicional a pedido",
        competitor: "Tratada como tarefa manual de edição, segundo avaliações independentes",
        winner: "scooli",
      },
      {
        aspect: "Criação de materiais visuais (posters, apresentações)",
        scooli: "Apresentações simples para aula; não é uma ferramenta de design",
        competitor: "Milhares de templates, biblioteca de imagens e design profissional",
        winner: "competitor",
      },
      {
        aspect: "Geração do documento pedagógico (plano de aula completo)",
        scooli: "Produto principal: objetivos, sequência, materiais e avaliação integrados",
        competitor:
          "Gerador de planos por IA existe (Magic Write), mas avaliações independentes descrevem-no como \"ideias de texto gerais\", sem estrutura pedagógica dedicada",
        winner: "scooli",
      },
      {
        aspect: "Escala e maturidade da comunidade",
        scooli: "Comunidade em crescimento, focada em Portugal",
        competitor: "100 milhões de professores, alunos e administradores por mês, 190+ países",
        winner: "competitor",
      },
    ],
    strengthsTitle: "Onde o Canva ganha, sem rodeios",
    strengthsDescription:
      "Uma comparação só é útil se for honesta sobre o que o outro lado faz melhor.",
    competitorStrengths: [
      {
        title: "Design visual de qualidade profissional",
        description:
          "O Canva é, antes de mais, uma ferramenta de design. Para posters, infográficos e apresentações visualmente cuidadas, não há como competir com milhares de templates e uma biblioteca de imagens profissional.",
      },
      {
        title: "100% gratuito, sem limite de utilização",
        description:
          "Qualquer professor do ensino básico ou secundário com email escolar verificado tem acesso gratuito e ilimitado a praticamente todas as funcionalidades Pro — sem créditos mensais a gerir.",
      },
      {
        title: "Escala e maturidade",
        description:
          "Com 100 milhões de utilizadores mensais em mais de 800 mil escolas, o Canva tem um ecossistema de templates, tutoriais e suporte que uma ferramenta nova não replica da noite para o dia.",
      },
    ],
    faq: [
      {
        question: "O Canva para Educação substitui a Scooli?",
        answer:
          "Não para o mesmo trabalho. O Canva ajuda a desenhar o documento (visual, layout, apresentação); a Scooli gera o conteúdo pedagógico alinhado com as Aprendizagens Essenciais e o DL 55/2018. Muitos professores usam os dois: a Scooli para o conteúdo, o Canva para o acabamento visual.",
      },
      {
        question: "O Canva tem alinhamento com o currículo português?",
        answer:
          "Com base na documentação pública do Canva, o mapeamento curricular por código de standard (\"Learn Grid\") está disponível apenas para Estados Unidos, Austrália, Indonésia e México. Não encontrámos qualquer referência às Aprendizagens Essenciais ou aos Decretos-Lei 54/2018 e 55/2018 nas páginas do Canva para Educação.",
      },
      {
        question: "Qual é mais barato?",
        answer:
          "O Canva para Educação é gratuito para professores verificados do ensino básico e secundário. A Scooli tem um plano gratuito com créditos mensais e um plano Pro pago para quem precisa de gerar mais documentos.",
      },
      {
        question: "Posso usar o Canva e a Scooli ao mesmo tempo?",
        answer:
          "Sim. Não são concorrentes diretos no mesmo fluxo de trabalho — são frequentemente complementares: gerar o plano de aula ou planificação na Scooli e depois desenhar o material visual final no Canva.",
      },
    ],
    ctaTitle: "Experimente a Scooli gratuitamente",
    ctaDescription:
      "Gere a sua primeira planificação alinhada com as Aprendizagens Essenciais em minutos.",
    sources: [
      { label: "Canva for Education — elegibilidade e preços", url: "https://www.canva.com/education/teachers/" },
      { label: "Canva Help — Learn Grid, cobertura curricular", url: "https://www.canva.com/en_gb/help/using-learn-grid/" },
      { label: "Canva — AI Lesson Plan Generator", url: "https://www.canva.com/features/ai-lesson-plan-generator/" },
      { label: "Canva Newsroom — marco dos 100 milhões", url: "https://www.canva.com/newsroom/news/100-million-education-milestone/" },
      { label: "Chalkie.ai — comparação de ferramentas de planificação com IA", url: "https://chalkie.ai/en/blog/compare-ai-lesson-planning-tools" },
    ],
  },
  "magicschool-ai": {
    slug: "magicschool-ai",
    competitorName: "MagicSchool AI",
    metaTitle: "Scooli vs MagicSchool AI: qual escolher em Portugal?",
    metaDescription:
      "Comparação entre a Scooli e o MagicSchool AI: alinhamento com o currículo português, preço e presença em Portugal, com fontes citadas.",
    kicker: "Comparação",
    title: "Scooli vs MagicSchool AI",
    description:
      "O MagicSchool AI é uma das maiores plataformas de ferramentas de IA para professores nos Estados Unidos, com mais de 80 ferramentas. A sua força é o catálogo; a sua limitação, para um professor português, é que todo o alinhamento curricular é pensado para os standards dos EUA.",
    verdict:
      "Em resumo: o MagicSchool AI ganha em amplitude — mais de 80 ferramentas, um plano gratuito permanente e integração com Google Classroom e Microsoft. Mas o seu alinhamento curricular (\"standards aligned curriculum\") é construído inteiramente à volta de standards estaduais dos EUA e do Common Core; não encontrámos nenhuma referência às Aprendizagens Essenciais, ao DL 54/2018 ou ao DL 55/2018 em nenhuma página do produto, nem clientes institucionais em Portugal. A Scooli é construída desde o início para o currículo português. Se procura um canivete suíço de ferramentas de IA em inglês, o MagicSchool tem mais opções. Se procura alinhamento real com o que se ensina em Portugal, é essa a diferença que a Scooli resolve.",
    tableTitle: "Lado a lado",
    tableDescription:
      "Factos verificáveis, com fonte — não apenas posicionamento de marketing.",
    rows: [
      {
        aspect: "Preço",
        scooli: "Gratuito com créditos mensais; Pro desde 6,99€/mês",
        competitor: "Plano gratuito permanente; Plus a partir de ~8,33 USD/mês (anual)",
        winner: "tie",
      },
      {
        aspect: "Alinhamento com as Aprendizagens Essenciais (Portugal)",
        scooli: "Integrado por definição em todas as planificações e planos de aula",
        competitor: "Nenhuma referência encontrada; alinhamento curricular é centrado em standards dos EUA (Common Core, standards estaduais)",
        winner: "scooli",
      },
      {
        aspect: "Clientes institucionais / escolas em Portugal",
        scooli: "Foco desde a fundação no mercado português",
        competitor: "Nenhum caso de estudo institucional em Portugal ou na UE encontrado; todos os logótipos de clientes publicados são distritos escolares dos EUA",
        winner: "scooli",
      },
      {
        aspect: "Número de ferramentas no catálogo",
        scooli: "Conjunto focado: planificação, planos de aula, testes, fichas, quizzes, apresentações",
        competitor: "80+ ferramentas para professores, 50+ para alunos",
        winner: "competitor",
      },
      {
        aspect: "Suporte ao português europeu",
        scooli: "Produto nativo em português europeu, desde a interface ao conteúdo gerado",
        competitor: "Português europeu listado como uma de 98 línguas de tradução (não confirmado como língua de interface)",
        winner: "scooli",
      },
      {
        aspect: "Qualidade do primeiro resultado, segundo avaliações independentes",
        scooli: "Gerado a partir de regras curriculares portuguesas explícitas",
        competitor:
          "Avaliações independentes descrevem os resultados como \"pontos de partida sólidos\" que requerem revisão cuidadosa de factos, exemplos e grelhas de correção",
        winner: "tie",
      },
      {
        aspect: "Integrações (Google Classroom, Microsoft, SIS)",
        scooli: "Exportação de documentos; sem integração direta com SIS",
        competitor: "Google Classroom, Microsoft, Canvas, Schoology; SSO e integração com SIS no plano Enterprise",
        winner: "competitor",
      },
    ],
    strengthsTitle: "Onde o MagicSchool ganha, sem rodeios",
    strengthsDescription:
      "Uma comparação só é útil se for honesta sobre o que o outro lado faz melhor.",
    competitorStrengths: [
      {
        title: "O catálogo de ferramentas mais amplo do setor",
        description:
          "Com mais de 80 ferramentas para professores e 50+ para alunos — de IEPs a comunicação com encarregados de educação — o MagicSchool cobre muito mais do que a geração de planos de aula e material letivo.",
      },
      {
        title: "Plano gratuito permanente",
        description:
          "O plano \"Forever Free\" inclui dezenas de ferramentas sem custo, sem necessidade de upgrade para uso básico.",
      },
      {
        title: "Integrações profundas para distritos escolares",
        description:
          "SSO, integração com SIS (Clever, ClassLink) e um plano Enterprise desenhado para administração central de muitas escolas — infraestrutura que ainda não existe do lado da Scooli.",
      },
    ],
    faq: [
      {
        question: "O MagicSchool AI funciona com o currículo português?",
        answer:
          "Com base na documentação pública consultada, o alinhamento curricular do MagicSchool é construído à volta de standards estaduais dos EUA e do Common Core. Não encontrámos qualquer referência às Aprendizagens Essenciais nem aos Decretos-Lei 54/2018 ou 55/2018.",
      },
      {
        question: "O MagicSchool AI está disponível em português?",
        answer:
          "O MagicSchool lista o português europeu entre 98 línguas suportadas para tradução de conteúdo (atualização de março de 2026), mas a documentação consultada não confirma se é também uma das 24 línguas de interface do produto.",
      },
      {
        question: "Existem escolas portuguesas a usar o MagicSchool AI?",
        answer:
          "Não encontrámos casos de estudo institucionais em Portugal ou na União Europeia. A única evidência de utilização em Portugal encontrada foi a participação individual de um professor português no \"AI Pioneers Program\" do MagicSchool, e formações de iniciativa de centros de formação portugueses — não uma relação comercial direta.",
      },
      {
        question: "Qual tem mais ferramentas?",
        answer:
          "O MagicSchool, de forma clara — mais de 80 ferramentas para professores contra um conjunto mais focado na Scooli. A diferença está no alinhamento curricular português, não na amplitude do catálogo.",
      },
    ],
    ctaTitle: "Experimente a Scooli gratuitamente",
    ctaDescription:
      "Veja como as Aprendizagens Essenciais entram na planificação desde o primeiro pedido.",
    sources: [
      { label: "MagicSchool AI — preços", url: "https://www.magicschool.ai/pricing" },
      { label: "MagicSchool AI — alinhamento curricular", url: "https://www.magicschool.ai/blog-posts/standards-aligned-curriculum" },
      { label: "MagicSchool AI — FAQ (línguas suportadas)", url: "https://www.magicschool.ai/faq" },
      { label: "EdTech Institute — avaliação do MagicSchool AI (2026)", url: "https://edtechinstitute.com/2026/01/31/magicschool-ai-review-is-it-worth-it/" },
    ],
  },
};

export function getComparisonPages(): ComparisonPageContent[] {
  return comparisonSlugs.map((slug) => comparisonContentPtPT[slug]);
}

export function getComparisonPage(slug: string): ComparisonPageContent | undefined {
  return (comparisonSlugs as readonly string[]).includes(slug)
    ? comparisonContentPtPT[slug as ComparisonSlug]
    : undefined;
}
