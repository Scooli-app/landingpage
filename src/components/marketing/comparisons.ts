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

export const comparisonSlugs = [
  "canva-para-educacao",
  "magicschool-ai",
  "teachy",
  "chatgpt-gemini-perplexity",
] as const;
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
  teachy: {
    slug: "teachy",
    competitorName: "Teachy",
    metaTitle: "Scooli vs Teachy: qual escolher em Portugal?",
    metaDescription:
      "Comparação entre a Scooli e a Teachy para professores portugueses: alinhamento curricular, preços e idioma, com todas as fontes citadas.",
    kicker: "Comparação",
    title: "Scooli vs Teachy",
    description:
      "A Teachy é uma das maiores plataformas de IA para professores na América Latina, com fichas, planos de aula, slides e um banco de questões robusto. O que não tem — por construção, não por acaso — é qualquer ligação ao currículo português.",
    verdict:
      "Em resumo: a Teachy é uma plataforma madura e completa, mas construída e documentada publicamente apenas em torno do currículo brasileiro (BNCC) e, em inglês, dos standards dos EUA (CCSS). Não existe locale em português europeu, não existe página para Portugal, e mesmo conteúdo gerado sobre temas portugueses aparece etiquetado com códigos curriculares brasileiros. A Scooli existe precisamente para o professor português: as Aprendizagens Essenciais e o DL 55/2018 fazem parte da geração desde o primeiro pedido. Se procura alinhamento com o currículo brasileiro, a Teachy é uma escolha madura. Se procura alinhamento com o currículo português, a Teachy não o oferece — a Scooli sim.",
    tableTitle: "Lado a lado",
    tableDescription:
      "Factos verificáveis, com fonte oficial sempre que existe — incluindo o próprio Help Center da Teachy.",
    rows: [
      {
        aspect: "Alinhamento com as Aprendizagens Essenciais (Portugal)",
        scooli: "Integrado por definição em todas as planificações e planos de aula",
        competitor: "Nenhuma referência encontrada — alinhamento declarado é à BNCC (Brasil) e, em inglês, ao CCSS (EUA)",
        winner: "scooli",
      },
      {
        aspect: "Idioma",
        scooli: "Português europeu nativo, da interface ao conteúdo gerado",
        competitor: "Apenas português do Brasil (pt-BR); sem variante ou locale para Portugal em nenhum dos dois domínios",
        winner: "scooli",
      },
      {
        aspect: "Presença em Portugal",
        scooli: "Produto construído desde a fundação para o mercado português",
        competitor: "Sem página, locale ou presença institucional específica para Portugal identificada",
        winner: "scooli",
      },
      {
        aspect: "Preço do plano gratuito",
        scooli: "Gratuito com créditos mensais",
        competitor: "Plano \"Básico\" gratuito com 100 créditos por dia de login, mais créditos por indicação",
        winner: "tie",
      },
      {
        aspect: "Preço do plano pago",
        scooli: "Pro desde 6,99€/mês",
        competitor: "Premium desde ~29,90 R$/mês (anual) — à taxa de câmbio de outubro de 2026, cerca de 5€/mês",
        winner: "competitor",
      },
      {
        aspect: "Banco de questões / avaliações",
        scooli: "Gerador de testes com perguntas diversificadas e critérios de correção",
        competitor: "Banco de questões extenso com correção automática, incluindo respostas discursivas",
        winner: "competitor",
      },
      {
        aspect: "Geração de slides/apresentações, jogos e materiais extra a partir de um tema",
        scooli: "Apresentações simples para aula",
        competitor: "Gera automaticamente slides, plano de aula, jogos e mapas mentais a partir de um único tema",
        winner: "competitor",
      },
    ],
    strengthsTitle: "Onde a Teachy ganha, sem rodeios",
    strengthsDescription:
      "Uma comparação só é útil se for honesta sobre o que o outro lado faz melhor.",
    competitorStrengths: [
      {
        title: "Catálogo de materiais mais amplo",
        description:
          "Além de planos de aula, a Teachy gera slides, jogos, mapas mentais e um banco de mais de 500 mil questões a partir de um único tema — um fluxo de geração múltipla que a Scooli não replica hoje.",
      },
      {
        title: "Correção automática de respostas discursivas",
        description:
          "A funcionalidade de avaliação e correção da Teachy inclui correção automática de redações e respostas abertas, não apenas de escolha múltipla.",
      },
      {
        title: "Escala e maturidade na América Latina",
        description:
          "Com centenas de milhares de professores e uma ronda de investimento Série A liderada por fundos internacionais (Goodwater Capital, Reach Capital), a Teachy tem recursos e maturidade de produto que uma plataforma mais nova ainda está a construir.",
      },
    ],
    faq: [
      {
        question: "A Teachy funciona com o currículo português?",
        answer:
          "Com base na documentação pública da Teachy, o alinhamento curricular declarado é à BNCC (Base Nacional Comum Curricular) do Brasil, e em inglês ao CCSS dos EUA. Não encontrámos qualquer referência às Aprendizagens Essenciais nem aos Decretos-Lei 54/2018 ou 55/2018. Mesmo conteúdo gerado sobre temas portugueses aparece etiquetado com códigos BNCC brasileiros.",
      },
      {
        question: "A Teachy está disponível em português europeu?",
        answer:
          "Não encontrámos uma variante pt-PT. A Teachy opera em português do Brasil (pt-BR) em teachy.com.br, e teachy.ai oferece mais de 20 locales — nenhum deles para Portugal.",
      },
      {
        question: "Qual é mais barato?",
        answer:
          "Ambas têm um plano gratuito. No plano pago, o Premium da Teachy (cerca de 5€/mês à taxa de outubro de 2026) é mais barato do que o Pro da Scooli — mas sem alinhamento com o currículo português.",
      },
      {
        question: "Existem escolas portuguesas a usar a Teachy?",
        answer:
          "Não encontrámos qualquer presença institucional, parceria ou landing page específica para Portugal no site oficial da Teachy.",
      },
    ],
    ctaTitle: "Experimente a Scooli gratuitamente",
    ctaDescription:
      "Veja como as Aprendizagens Essenciais entram na planificação desde o primeiro pedido — sem precisar de traduzir códigos curriculares de outro país.",
    sources: [
      { label: "Teachy — planos e preços (Help Center oficial)", url: "https://helpcenter.teachy.ai/pt-BR/articles/9500483-nossos-planos" },
      { label: "Teachy — Plano de Aula (alinhamento BNCC)", url: "https://www.teachy.com.br/pt-BR/ferramentas/lesson-plan-generator" },
      { label: "Teachy — Lesson Plan (alinhamento CCSS, inglês)", url: "https://helpcenter.teachy.ai/en/articles/9500453-lesson-plan" },
      { label: "DGE — Aprendizagens Essenciais", url: "https://www.dge.mec.pt/aprendizagens-essenciais" },
      { label: "Revista Educação — perfil da Teachy (2024)", url: "https://revistaeducacao.com.br/2024/06/21/plataforma-teachy/" },
    ],
  },
  "chatgpt-gemini-perplexity": {
    slug: "chatgpt-gemini-perplexity",
    competitorName: "ChatGPT, Gemini e Perplexity",
    metaTitle: "Scooli vs ChatGPT/Gemini/Perplexity para planos de aula",
    metaDescription:
      "Usar um chatbot genérico para planos de aula tem riscos documentados de alinhamento curricular. Veja a comparação com fontes citadas.",
    kicker: "Comparação",
    title: "Scooli vs ChatGPT, Gemini e Perplexity",
    description:
      "Dois em cada três professores portugueses já usaram um chatbot genérico como o ChatGPT para preparar aulas. É rápido e está à mão — mas a investigação académica mais rigorosa sobre o tema mostra que \"alinhado ao currículo\" num chatbot genérico muitas vezes significa muito menos do que parece.",
    verdict:
      "Em resumo: o ChatGPT, o Gemini e o Perplexity são rápidos, gratuitos na versão base e ótimos para brainstorming conversacional — por isso tantos professores já os usam. O que não têm é qualquer conhecimento estruturado do currículo português: cada sessão parte do zero, sem memória do que já foi ensinado, sem verificação de alinhamento e com um risco documentado de alucinação (incluindo fontes inventadas). O estudo mais rigoroso já feito sobre o tema — da Universidade de Massachusetts Amherst, com 310 planos de aula gerados por ChatGPT, Gemini e Copilot — encontrou que só 2 a 4% das atividades geradas pedem aos alunos para analisar ou avaliar; a maioria fica no nível mais básico de pensamento. A Scooli não substitui a conversa livre de um chatbot — substitui a parte em que esse chatbot promete alinhamento curricular que não tem forma de verificar.",
    tableTitle: "Lado a lado",
    tableDescription:
      "Esta comparação não é sobre uma empresa — é sobre o que acontece quando se usa um assistente de conversação genérico para o trabalho que uma ferramenta curricular dedicada faz.",
    rows: [
      {
        aspect: "Conhecimento estruturado do currículo português",
        scooli: "Integrado por definição — Aprendizagens Essenciais e DL 55/2018 em cada pedido",
        competitor: "Nenhum — depende inteiramente do que o professor escrever no pedido, sessão a sessão",
        winner: "scooli",
      },
      {
        aspect: "Qualidade pedagógica validada por estudo independente",
        scooli: "Estrutura pensada para objetivos, sequência e avaliação formativa",
        competitor: "Estudo da UMass Amherst (310 planos): só 2–4% das atividades pedem análise ou avaliação; ~45% ficam no nível mais básico (\"recordar\")",
        winner: "scooli",
      },
      {
        aspect: "Risco de alucinação (factos inventados)",
        scooli: "Conteúdo gerado a partir de regras curriculares explícitas, sem invenção de fontes",
        competitor: "Caso documentado: ChatGPT inventou um livro infantil inexistente ao gerar material \"alinhado\" a um standard curricular",
        winner: "scooli",
      },
      {
        aspect: "Organização do período letivo",
        scooli: "Distribui os tópicos pelas aulas do período a partir do horário e gera o plano de aula de qualquer sessão já com esse contexto",
        competitor: "Sem memória persistente na versão gratuita — cada conversa parte do zero, sem noção do que foi planeado nas sessões anteriores",
        winner: "scooli",
      },
      {
        aspect: "Custo de entrada",
        scooli: "Gratuito com créditos mensais; Pro desde 6,99€/mês",
        competitor: "Camada gratuita disponível em todos; planos pagos de 8 a 22,99€/mês (ChatGPT Plus, Gemini AI Pro, Perplexity Pro)",
        winner: "tie",
      },
      {
        aspect: "Flexibilidade conversacional e brainstorming",
        scooli: "Fluxo estruturado, pensado para gerar o documento final",
        competitor: "Melhor opção para \"dá-me 10 formas diferentes de ensinar X\" ou iterar livremente sobre uma ideia",
        winner: "competitor",
      },
      {
        aspect: "Risco de viés documentado em recomendações",
        scooli: "Sem funcionalidade de perfilagem comportamental de alunos",
        competitor: "Estudo da Common Sense Media (2025) encontrou respostas mais punitivas para nomes associados a alunos negros do que a alunos brancos no mesmo prompt, incluindo no Google Gemini",
        winner: "scooli",
      },
    ],
    strengthsTitle: "Onde o ChatGPT, o Gemini e o Perplexity ganham, sem rodeios",
    strengthsDescription:
      "Uma comparação só é útil se for honesta sobre o que o outro lado faz melhor — e a investigação mostra genuínas vantagens aqui.",
    competitorStrengths: [
      {
        title: "Brainstorming e iteração conversacional",
        description:
          "Os próprios investigadores que documentaram as falhas de alinhamento curricular recomendam continuar a usar chatbots genéricos para brainstorming — por exemplo, pedir \"10 formas diferentes de ensinar este tema\" ou \"15 formas de melhorar este plano\". É um ponto forte real, não uma ferramenta de geração final.",
      },
      {
        title: "Gratuito e sem barreira de entrada",
        description:
          "Todos mantêm uma camada gratuita utilizável, o que remove a necessidade de aprovação de orçamento — uma barreira que atrasa a adoção de ferramentas pagas em contexto escolar.",
      },
      {
        title: "Versatilidade para tudo o resto",
        description:
          "O mesmo chat que gera uma ideia de aula também redige um email para encarregados de educação, um relatório administrativo ou ajuda a pensar numa adaptação para um aluno — não há troca de ferramenta a meio do dia de trabalho.",
      },
    ],
    faq: [
      {
        question: "Porque não usar apenas o ChatGPT para gerar planos de aula?",
        answer:
          "Pode — muitos professores já o fazem. O que a investigação mostra é que \"alinhado ao currículo\" num chatbot genérico depende inteiramente de o professor escrever e verificar esse alinhamento, sessão a sessão, sem garantia de que o resultado é pedagogicamente sólido. Um estudo da UMass Amherst com 310 planos gerados por ChatGPT, Gemini e Copilot encontrou que a maioria das atividades geradas fica no nível mais básico de pensamento, independentemente do standard curricular pedido.",
      },
      {
        question: "O ChatGPT pode inventar informação quando gera um plano de aula?",
        answer:
          "Sim, está documentado. Um estudo de caso publicado na PLOS ONE encontrou o ChatGPT a inventar um livro infantil inexistente quando lhe foi pedido material de leitura alinhado a um standard curricular. Isto obriga a uma verificação manual de cada resultado, sessão a sessão.",
      },
      {
        question: "Quantos professores portugueses já usam o ChatGPT para preparar aulas?",
        answer:
          "Um estudo de 2025 da Fundação Semapa com a Nova SBE e a Universidade do Minho, com cerca de 2.000 professores de mais de 300 escolas portuguesas, encontrou que dois em cada três professores (67%) já tinham usado ferramentas de IA — nomeadamente ChatGPT e Copilot — nesse ano letivo, principalmente para preparação de aulas.",
      },
      {
        question: "A Scooli substitui completamente o uso de um chatbot genérico?",
        answer:
          "Não, e não é essa a proposta. Para brainstorming livre e iteração conversacional, um chatbot genérico continua a ser uma boa opção — os próprios investigadores recomendam esse uso. A Scooli existe para a parte em que é preciso alinhamento garantido com as Aprendizagens Essenciais e um documento pedagógico estruturado, não uma conversa aberta.",
      },
    ],
    ctaTitle: "Experimente a Scooli gratuitamente",
    ctaDescription:
      "Veja a diferença entre pedir alinhamento curricular e ter alinhamento curricular garantido desde o primeiro pedido.",
    sources: [
      { label: "CITE Journal — estudo UMass Amherst sobre planos de aula gerados por IA", url: "https://citejournal.org/volume-25/issue-3-25/social-studies/civic-education-in-the-age-of-ai-should-we-trust-ai-generated-lesson-plans" },
      { label: "EdWeek — Why AI May Not Be Ready to Write Your Lesson Plans", url: "https://www.edweek.org/technology/why-ai-may-not-be-ready-to-write-your-lesson-plans/2025/06" },
      { label: "PLOS ONE — caso de alucinação do ChatGPT em plano de ciências", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11182495" },
      { label: "Chalkbeat — estudo Common Sense Media sobre viés racial em assistentes de IA", url: "https://www.chalkbeat.org/2025/08/06/ai-teacher-assistants-promote-racial-bias-study-finds" },
      { label: "Observador — 2 em cada 3 professores portugueses usaram IA (2025)", url: "https://observador.pt/2025/05/30/embargo-ate-8h-estudo-neste-ano-letivo-dois-em-cada-tres-professores-recorreram-a-inteligencia-artificial" },
      { label: "RAND — Uneven Adoption of AI Tools Among US Educators", url: "https://www.rand.org/pubs/research_reports/RRA134-25.html" },
      { label: "K-12 Dive — Beware hallucinations in AI lesson planning", url: "https://www.k12dive.com/news/using-ai-lesson-planning-beware-hallucinations/726660" },
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
