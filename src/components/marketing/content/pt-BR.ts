import { toolHref } from "@/i18n/navigation";
import type { MarketingContent } from "../data";

/**
 * Brazilian marketing copy, adapted from pt-PT for the Brazilian school:
 * BNCC habilidades, bimestres, provas, listas de exercícios, planejamento.
 * Claims stay within what the Brazilian app path does today.
 */
export const marketingContentPtBR: MarketingContent = {
  impactStatLabels: {
    activeTeachers: "professores",
    preparedLessons: "aulas preparadas",
  },

  trustCards: [
    {
      title: "Professor no controle",
      description: "A Scooli ajuda a começar mais rápido, mas o professor revisa, edita e decide sempre o que vai para a aula.",
    },
    {
      title: "Em conformidade com a LGPD e o GDPR",
      description: "A plataforma foi pensada para o contexto escolar e explica privacidade, revisão humana e boas práticas em linguagem simples.",
    },
    {
      title: "Sem treino com dados dos usuários",
      description: "Os materiais e pedidos feitos na Scooli não são usados para treinar modelos de IA.",
    },
  ],

  schoolPageCards: [
    {
      title: "Conversa inicial com contexto",
      description: "Começamos entendendo os objetivos, os anos, as disciplinas e quem vai usar a Scooli na primeira fase.",
    },
    {
      title: "Piloto com um grupo pequeno",
      description: "O caminho recomendado é começar com poucos professores antes de ampliar o uso para a escola.",
    },
    {
      title: "Adoção responsável desde o início",
      description: "Privacidade, revisão humana e controle do professor entram logo na conversa, sem ficar para depois.",
    },
  ],

  toolPages: [
    {
      slug: "planificacoes",
      title: "Planejamento com IA alinhado à BNCC",
      shortTitle: "Planejamentos",
      description: "Crie planejamentos anuais, bimestrais e de unidade com as habilidades da BNCC citadas desde o início, prontos para editar.",
      metaTitle: "Planejamento com IA: anual, bimestral e de unidade",
      metaDescription:
        "Faça o planejamento anual, bimestral ou de unidade com IA, com as habilidades da BNCC e os seus códigos. Edite e exporte para Word e PDF.",
      headings: {
        practice: "Como encaixar o planejamento na sua rotina",
        cta: "Faça o seu próximo planejamento na Scooli",
        howTo: "Como criar um planejamento na Scooli",
      },
      hero: "O planejamento do início do ano, que tomava dias inteiros, agora leva minutos.",
      useCases: ["Planejamento anual", "Planejamento bimestral", "Planejamento de unidade"],
      outputs: ["Habilidades da BNCC com os códigos", "Objetos de conhecimento distribuídos no tempo", "Momentos e instrumentos de avaliação"],
      benefits: [
        "Ter as habilidades da BNCC do ano e da disciplina citadas sem procurar uma por uma",
        "Gerar o planejamento de uma unidade em minutos, não em horas",
        "Ajustar objetivos, sequência e avaliação antes de entregar à coordenação",
      ],
      contentSections: [
        {
          title: "O que inclui um planejamento criado na Scooli",
          description: "A base parte das habilidades da BNCC do ano e da disciplina, para que você não precise procurá-las antes de começar.",
          bullets: [
            "Habilidades da BNCC citadas com o código (por exemplo, EF06MA07)",
            "Unidades temáticas e objetos de conhecimento distribuídos pelas aulas",
            "Momentos de avaliação formativa e de prova ao longo do bimestre",
          ],
        },
        {
          title: "Um planejamento que acompanha a turma",
          description: "O planejamento vira o calendário de aulas de cada turma, por bimestre. Se o ritmo muda, você reorganiza sem refazer tudo.",
          bullets: [
            "Aulas distribuídas pelos bimestres, com os feriados brasileiros",
            "Ajustar a sequência dos conteúdos ao ritmo da turma",
            "Importar um planejamento que você já tem, em Word ou PDF",
          ],
        },
      ],
      faq: [
        {
          question: "O planejamento cita as habilidades da BNCC?",
          answer: "Sim. A Scooli parte das habilidades da BNCC do ano e da disciplina e as cita com o código, para que você não precise consultá-las separadamente. O resultado é editável para ajustar ao seu contexto.",
        },
        {
          question: "Posso fazer um planejamento bimestral?",
          answer: "Sim. Você escolhe o período: o ano letivo, um bimestre ou uma unidade. Em um bimestre, o planejamento sai aula a aula; em um ano, sai por unidades.",
        },
        {
          question: "Posso usar um planejamento que já tenho?",
          answer: "Sim. Você pode importar um planejamento em Word ou PDF, e a Scooli o organiza para editar e ligar aos seus planos de aula.",
        },
        {
          question: "Em que formatos posso exportar o planejamento?",
          answer: "Você pode exportar o planejamento para Word ou PDF, ou continuar editando na Scooli ao longo do ano.",
        },
        {
          question: "Posso experimentar grátis?",
          answer:
            "Sim. Você pode começar grátis, sem cartão, e criar materiais de verdade para as suas turmas antes de decidir. Os limites de cada plano estão na página de preços.",
        },
      ],
      relatedLinks: [
        { label: "Ver sequências didáticas", href: toolHref("sequencias-de-aulas") },
        { label: "Criar planos de aula", href: toolHref("plano-de-aula") },
        { label: "Gerar listas de exercícios", href: toolHref("fichas-de-trabalho") },
      ],
      howToSteps: [
        {
          name: "Definir o período",
          text: "Informe a disciplina, o ano e se o planejamento é anual, bimestral ou de uma unidade.",
        },
        {
          name: "Dar o contexto da turma",
          text: "Conte o que for relevante sobre a turma: ritmo, necessidades específicas ou prioridades da escola.",
        },
        {
          name: "Gerar o planejamento",
          text: "Receba um planejamento com habilidades da BNCC, objetos de conhecimento, sequência e avaliação.",
        },
        {
          name: "Ajustar e entregar",
          text: "Edite o planejamento, ajuste o que precisar e exporte quando estiver pronto para usar.",
        },
      ],
      seoKeywords: [
        "planejamento com IA",
        "planejamento anual com IA",
        "planejamento bimestral",
        "planejamento BNCC",
        "planejamento anual BNCC",
        "planejamento de unidade",
        "habilidades da BNCC",
      ],
    },
    {
      slug: "plano-de-aula",
      title: "Plano de aula com IA para professores, pronto em minutos",
      shortTitle: "Plano de aula",
      description: "Gere um plano de aula com objetivos, sequência de atividades, recursos e avaliação, tudo editável e pronto para usar.",
      metaTitle: "Plano de aula com IA alinhado à BNCC",
      metaDescription:
        "Gere planos de aula com as habilidades da BNCC, atividades, recursos e avaliação. Tudo editável, para a duração de aula que você informar.",
      headings: {
        practice: "Como usar o plano de aula na sua rotina",
        faq: "Dúvidas sobre planos de aula com IA",
        cta: "Prepare o próximo plano de aula na Scooli",
        howTo: "Como criar um plano de aula na Scooli",
      },
      hero: "Prepare uma aula completa em minutos e ajuste antes de entrar na sala.",
      useCases: ["Aula nova do zero", "Adaptar para outra turma", "Substituição de última hora"],
      outputs: ["Objetivos e habilidades da BNCC", "Sequência de atividades com duração", "Recursos e avaliação formativa"],
      benefits: [
        "Ter a estrutura completa de uma aula sem partir de um documento vazio",
        "Adaptar o mesmo plano para turmas com ritmos diferentes",
        "Editar objetivos, atividades e recursos antes de usar na sala",
      ],
      contentSections: [
        {
          title: "O que inclui um plano de aula gerado na Scooli",
          description: "A base cobre os elementos essenciais de uma aula, para você passar mais tempo nas decisões pedagógicas e menos montando o documento.",
          bullets: [
            "Objetivo da aula ligado às habilidades da BNCC",
            "Sequência de atividades com a duração estimada de cada momento",
            "Recursos necessários e momento de avaliação formativa",
          ],
        },
        {
          title: "Quando o plano de aula faz mais diferença",
          description: "É útil tanto para preparar uma aula nova quanto para adaptar um plano que já existe para outra turma ou para uma aula mais curta.",
          bullets: [
            "Preparar do zero uma aula para uma turma nova",
            "Adaptar rapidamente para uma turma com necessidades diferentes",
            "Fechar a preparação de última hora com uma base sólida",
          ],
        },
      ],
      faq: [
        {
          question: "O plano de aula traz as habilidades da BNCC?",
          answer: "Sim. A Scooli parte das habilidades da BNCC da disciplina e do ano que você informar e as cita com o código no plano.",
        },
        {
          question: "Posso adaptar o plano para uma aula mais curta ou mais longa?",
          answer: "Sim. Você informa a duração da aula, por exemplo 50 minutos ou uma aula dupla, e a Scooli ajusta a sequência de atividades ao tempo disponível.",
        },
        {
          question: "O plano fica editável antes de usar?",
          answer: "Sim. Você recebe um documento editável para revisar objetivos, atividades, recursos e tempo antes de levar a aula para a sala.",
        },
      ],
      relatedLinks: [
        { label: "Ver planejamentos", href: toolHref("planificacoes") },
        { label: "Ver sequências didáticas", href: toolHref("sequencias-de-aulas") },
        { label: "Gerar listas de exercícios", href: toolHref("fichas-de-trabalho") },
      ],
      howToSteps: [
        {
          name: "Informar o tema e o ano",
          text: "Defina o conteúdo, a disciplina, o ano e a duração da aula que você quer preparar.",
        },
        {
          name: "Escolher o foco da aula",
          text: "Diga se é uma aula de introdução, prática, revisão ou avaliação.",
        },
        {
          name: "Gerar o plano de aula",
          text: "Receba um plano com objetivos, atividades, recursos e avaliação em uma base editável.",
        },
        {
          name: "Ajustar e usar",
          text: "Edite o que precisar e leve o plano para a sala quando estiver do jeito da sua aula.",
        },
      ],
      seoKeywords: [
        "plano de aula com IA",
        "plano de aula BNCC",
        "criar plano de aula",
        "plano de aula pronto",
        "plano de aula editável",
        "gerador de plano de aula",
        "plano de aula com habilidades da BNCC",
      ],
    },
    {
      slug: "sequencias-de-aulas",
      title: "Sequências didáticas com IA: o bimestre organizado aula a aula",
      shortTitle: "Sequências didáticas",
      description: "Informe a disciplina, o bimestre e o horário. A Scooli distribui as aulas pelo calendário, sugere o tópico de cada uma e gera o plano de aula quando você precisar.",
      metaTitle: "Sequência didática com IA: o bimestre aula a aula",
      metaDescription:
        "Informe a disciplina, o bimestre e o horário: a Scooli distribui as aulas pelo calendário, sugere o tópico de cada aula e gera o plano de aula quando você precisar.",
      headings: {
        practice: "Como usar as sequências didáticas na sua rotina",
        cta: "Organize a sua sequência didática na Scooli",
        howTo: "Como criar uma sequência didática na Scooli",
      },
      hero: "Distribua os tópicos pelas aulas do bimestre e gere o plano de cada aula quando chegar a hora.",
      useCases: ["Organizar o bimestre inteiro", "Distribuir o conteúdo pelo ano", "Preparar a estrutura antes de começar"],
      outputs: ["Aulas distribuídas pelo horário, com o tópico de cada aula", "O conteúdo distribuído no tempo", "Plano de aula gerado a partir de qualquer aula"],
      benefits: [
        "Ver a distribuição do conteúdo ao longo do bimestre em um só lugar",
        "Gerar o plano de qualquer aula a partir da estrutura já definida",
        "Reorganizar rápido quando uma aula não acontece ou o ritmo da turma muda",
      ],
      contentSections: [
        {
          title: "Como a Scooli distribui as aulas pelo bimestre",
          description: "A Scooli usa o horário semanal da turma e as datas do período para criar as aulas no calendário. Em cada aula, sugere o tópico com base nas habilidades da BNCC.",
          bullets: [
            "Aulas criadas a partir do horário semanal e das datas",
            "Tópico de cada aula sugerido com base nas habilidades da BNCC",
            "O bimestre inteiro em uma só tela",
          ],
        },
        {
          title: "Gerar o plano de qualquer aula",
          description: "Na hora de preparar uma aula, você parte dela na sequência e gera o plano, já com o tópico e o contexto definidos, sem repetir a informação.",
          bullets: [
            "Plano de aula gerado a partir da aula, com o contexto já preenchido",
            "Lista de exercícios, quiz ou apresentação para a mesma aula",
            "Gerar é sempre uma ação do professor: a Scooli não gera nada sozinha",
          ],
        },
      ],
      faq: [
        {
          question: "A sequência cria os planos de aula automaticamente?",
          answer: "Não. A sequência organiza as aulas com o tópico de cada uma. A partir de qualquer aula, você gera o plano quando precisar: gerar é sempre uma decisão do professor.",
        },
        {
          question: "Posso organizar o ano inteiro?",
          answer: "Sim. A sequência vai de um bimestre ao ano letivo completo. A Scooli preenche as aulas com base no horário e nas datas que você definir.",
        },
        {
          question: "Posso reorganizar os tópicos no meio do bimestre?",
          answer: "Sim. As aulas e os tópicos são editáveis a qualquer momento. Se uma aula não acontecer ou a turma precisar de mais tempo em um tema, você reorganiza sem perder o resto da estrutura.",
        },
      ],
      relatedLinks: [
        { label: "Ver planejamentos", href: toolHref("planificacoes") },
        { label: "Criar um plano de aula", href: toolHref("plano-de-aula") },
        { label: "Ver a Scooli para professores", href: "/professores" },
      ],
      howToSteps: [
        {
          name: "Informar a disciplina e o período",
          text: "Defina a disciplina, o ano, as datas de início e de fim e o horário semanal da turma.",
        },
        {
          name: "Revisar as aulas distribuídas",
          text: "A Scooli distribui as aulas pelo período com um tópico sugerido em cada uma. Ajuste conforme o seu planejamento.",
        },
        {
          name: "Gerar planos de aula quando precisar",
          text: "Quando precisar, parta de qualquer aula e gere o plano com o contexto já preenchido.",
        },
        {
          name: "Adaptar quando o plano muda",
          text: "Se uma aula não acontecer ou a turma mudar de ritmo, reorganize as aulas sem recomeçar do zero.",
        },
      ],
      seoKeywords: [
        "sequência didática com IA",
        "sequência didática BNCC",
        "sequência de aulas",
        "organizar aulas do bimestre",
        "cronograma de aulas",
        "distribuir conteúdo por bimestre",
        "planejamento de aulas por bimestre",
      ],
    },
    {
      slug: "gerador-de-testes",
      title: "Gerador de provas com IA para professores",
      shortTitle: "Gerador de provas",
      description: "Crie provas com questões variadas, pontuação, gabarito e critérios de correção, a partir de um pedido simples ou de um documento seu.",
      metaTitle: "Gerador de provas com IA, com gabarito",
      metaDescription:
        "Faça provas com IA: múltipla escolha, resposta curta e questões dissertativas, com pontuação, gabarito e critérios de correção. Edite tudo antes de imprimir.",
      headings: {
        howTo: "Como criar uma prova na Scooli",
        practice: "Quando usar o gerador de provas",
        faq: "Dúvidas sobre provas com IA",
        cta: "Prepare a próxima prova com a Scooli",
      },
      hero: "Crie provas em minutos e ajuste o nível antes de imprimir ou exportar.",
      useCases: ["Avaliação diagnóstica", "Prova bimestral", "Versão adaptada para outra turma"],
      outputs: ["Questões de múltipla escolha", "Questões de resposta curta", "Gabarito e critérios de correção"],
      benefits: [
        "Montar uma prova completa sem partir de um documento vazio",
        "Combinar tipos de questão, pontuação e gabarito no mesmo fluxo",
        "Ajustar dificuldade, extensão e linguagem antes de aplicar",
      ],
      contentSections: [
        {
          title: "O que uma prova criada na Scooli pode ter",
          description:
            "A ferramenta ajuda a chegar mais rápido a uma prova equilibrada, pronta para revisar e adaptar ao objetivo da avaliação.",
          bullets: [
            "Questões de múltipla escolha, verdadeiro ou falso, resposta curta e dissertativas",
            "Pontuação por questão, gabarito e critérios de correção para as questões abertas",
            "Versões diferentes para outras turmas ou outros momentos de avaliação",
          ],
        },
        {
          title: "Quando o gerador de provas faz mais diferença",
          description:
            "É especialmente útil quando há pouco tempo para preparar uma avaliação, mas você não quer abrir mão do controle sobre a qualidade final.",
          bullets: [
            "Preparar uma avaliação diagnóstica no início de uma unidade",
            "Fechar a prova do bimestre sem repetir sempre a mesma estrutura",
            "Adaptar uma prova que já existe para outro nível ou outra turma",
          ],
        },
      ],
      faq: [
        {
          question: "Posso criar provas com tipos de questão diferentes?",
          answer:
            "Sim. Você pode pedir questões de múltipla escolha, resposta curta, dissertativas ou uma combinação adequada à avaliação que quer preparar.",
        },
        {
          question: "A prova fica editável antes de imprimir?",
          answer:
            "Sim. A Scooli gera uma base editável para você revisar, reorganizar, ajustar a pontuação e mudar o texto antes de aplicar a prova.",
        },
        {
          question: "Posso adaptar uma prova para outra turma?",
          answer:
            "Sim. Você pode pedir uma versão mais simples, mais curta ou com outro nível de dificuldade sem montar tudo de novo.",
        },
        {
          question: "A prova vem com gabarito e critérios de correção?",
          answer:
            "Sim. Cada questão tem a sua pontuação e a resposta esperada, e as questões abertas trazem critérios de correção. Você revisa e ajusta tudo antes de aplicar.",
        },
        {
          question: "As provas seguem a BNCC?",
          answer:
            "Sim. As provas partem das habilidades da BNCC do ano e da disciplina que você informar. A revisão final é sempre sua.",
        },
        {
          question: "Posso criar uma prova a partir de um documento meu?",
          answer:
            "Sim. Você pode enviar um documento, como uma lista de exercícios, um texto ou uma prova antiga, e usá-lo como base para uma nova prova.",
        },
        {
          question: "Em que formatos posso exportar a prova?",
          answer:
            "Você pode exportar a prova para Word ou PDF, pronta para imprimir, com a versão do aluno e o gabarito em arquivos separados.",
        },
        {
          question: "Posso experimentar grátis?",
          answer:
            "Sim. Você pode começar grátis, sem cartão, e criar materiais de verdade para as suas turmas antes de decidir. Os limites de cada plano estão na página de preços.",
        },
      ],
      relatedLinks: [
        { label: "Ver listas de exercícios", href: toolHref("fichas-de-trabalho") },
        { label: "Transformar documentos seus", href: toolHref("carregar-documentos") },
        { label: "Ver a Scooli para professores", href: "/professores" },
      ],
      howToSteps: [
        {
          name: "Informar o tema e o ano",
          text: "Defina o conteúdo, o ano e o tipo de avaliação que você quer preparar.",
        },
        {
          name: "Escolher a estrutura da prova",
          text: "Escolha os tipos de questão, a dificuldade e o tamanho da prova.",
        },
        {
          name: "Gerar com IA",
          text: "Receba uma prova com questões, pontuação e gabarito em uma base editável.",
        },
        {
          name: "Revisar e exportar",
          text: "Ajuste o que precisar e exporte a prova quando estiver pronta para aplicar.",
        },
      ],
      seoKeywords: [
        "gerador de provas",
        "gerador de provas com IA",
        "criar prova com IA",
        "prova com gabarito",
        "prova BNCC",
        "questões de múltipla escolha",
        "avaliação diagnóstica",
      ],
    },
    {
      slug: "fichas-de-trabalho",
      title: "Gerador de atividades com IA: listas de exercícios para imprimir",
      shortTitle: "Atividades",
      description: "Crie listas de exercícios com instruções claras e versões por nível, para revisar, imprimir e adaptar à turma.",
      metaTitle: "Atividades com IA: listas de exercícios em minutos",
      metaDescription:
        "Crie atividades e listas de exercícios com IA: informe o tema e o ano e receba exercícios e versões por nível, prontos para imprimir. Comece grátis.",
      headings: {
        howTo: "Como criar uma lista de exercícios na Scooli",
        cta: "Faça a sua primeira lista de exercícios na Scooli",
      },
      hero: "Crie listas de exercícios em minutos e adapte à turma antes de imprimir.",
      useCases: ["Fixação do conteúdo", "Tarefa de casa", "Reforço para ritmos diferentes"],
      outputs: ["Exercícios variados", "Instruções claras", "Versões por nível"],
      benefits: [
        "Ganhar tempo na estrutura, nos exercícios e na organização da lista",
        "Gerar versões mais simples ou mais desafiadoras sem refazer o documento",
        "Ficar com uma lista editável, pronta para imprimir, exportar ou adaptar",
      ],
      contentSections: [
        {
          title: "O que uma lista de exercícios criada na Scooli pode ter",
          description:
            "A Scooli ajuda a montar listas com estrutura clara, linguagem adequada à turma e exercícios pensados para usar logo depois de uma revisão rápida.",
          bullets: [
            "Instruções simples e fáceis de seguir",
            "Exercícios ligados ao objetivo da aula e às habilidades da BNCC",
            "Espaço para resposta, visual limpo e gabarito em arquivo separado",
          ],
        },
        {
          title: "Como adaptar a lista a ritmos diferentes",
          description:
            "Quando a turma precisa de atividades diferenciadas, você parte de uma base comum e pede versões com outra dificuldade, extensão ou apoio.",
          bullets: [
            "Versão mais simples, com linguagem mais acessível",
            "Versão mais curta, para reforço",
            "Versão mais desafiadora para quem avança mais rápido",
          ],
        },
      ],
      faq: [
        {
          question: "Posso criar listas de exercícios prontas para imprimir?",
          answer:
            "Sim. A Scooli gera uma lista organizada e editável, que você revisa, ajusta e depois imprime ou exporta no formato que precisar.",
        },
        {
          question: "Posso criar versões diferentes da mesma atividade?",
          answer:
            "Sim. Você parte da mesma base e pede versões por nível, linguagem mais simples, menos exercícios ou mais apoio para a turma que tem na sua frente.",
        },
        {
          question: "Posso usar um texto ou documento meu para gerar a lista?",
          answer:
            "Sim. Se você já tem um texto, uma lista antiga ou outro material, pode usá-lo como base e transformar esse conteúdo em uma nova lista de exercícios.",
        },
        {
          question: "A lista vem com gabarito?",
          answer:
            "Sim. Cada exercício tem a resposta esperada, e a exportação gera a versão do aluno e o gabarito em arquivos separados.",
        },
        {
          question: "As atividades seguem a BNCC?",
          answer:
            "Sim. As atividades partem das habilidades da BNCC do ano e da disciplina que você informar. Ainda assim, revise sempre a lista antes de usar com a turma.",
        },
        {
          question: "Em que formatos posso exportar a lista?",
          answer:
            "Você pode exportar a lista para Word ou PDF, ou continuar editando na Scooli até ficar do jeito que você quer.",
        },
        {
          question: "Posso experimentar grátis?",
          answer:
            "Sim. Você pode começar grátis, sem cartão, e criar materiais de verdade para as suas turmas antes de decidir. Os limites de cada plano estão na página de preços.",
        },
      ],
      relatedLinks: [
        { label: "Adaptar materiais por nível", href: toolHref("adaptacao-de-materiais") },
        { label: "Partir de um documento seu", href: toolHref("carregar-documentos") },
        { label: "Explorar a biblioteca comunitária", href: "/professores" },
      ],
      howToSteps: [
        {
          name: "Descrever a atividade",
          text: "Informe o tema, o ano, o objetivo da aula e o tipo de exercício que você quer incluir.",
        },
        {
          name: "Gerar a lista de exercícios",
          text: "Receba uma lista com instruções, exercícios e uma estrutura pronta para revisar.",
        },
        {
          name: "Adaptar à sua turma",
          text: "Peça versões mais simples, mais curtas ou com mais apoio sem refazer tudo.",
        },
        {
          name: "Revisar, imprimir ou exportar",
          text: "Faça os últimos ajustes e leve a lista para a aula no formato que preferir.",
        },
      ],
      seoKeywords: [
        "gerador de atividades",
        "atividades com IA",
        "lista de exercícios com IA",
        "atividades para imprimir",
        "atividades BNCC",
        "atividades diferenciadas",
        "exercícios para imprimir",
      ],
    },
    {
      slug: "quizzes",
      title: "Quizzes com IA para revisão e participação em aula",
      shortTitle: "Quizzes",
      description: "Crie quizzes rápidos para revisar conteúdos, verificar a compreensão e dar ritmo à aula.",
      metaDescription:
        "Crie quizzes com IA para revisar conteúdos e verificar a compreensão: escolha o tema e o ano, ajuste as perguntas e use em aula. Comece grátis.",
      headings: {
        practice: "Quando usar quizzes nas aulas",
        cta: "Crie o seu primeiro quiz na Scooli",
        howTo: "Como criar um quiz na Scooli",
      },
      hero: "Prepare quizzes rápidos para revisar o conteúdo sem perder tempo montando perguntas.",
      useCases: ["Revisão no fim da aula", "Aquecimento", "Diagnóstico rápido"],
      outputs: ["Perguntas rápidas", "Múltipla escolha", "Versão curta"],
      benefits: [
        "Preparar momentos curtos de revisão sem perder tempo montando perguntas",
        "Aumentar a participação da turma com um formato rápido e simples",
        "Ajustar o nível e o número de perguntas ao tempo da aula",
      ],
      contentSections: [
        {
          title: "Como usar quizzes na rotina da aula",
          description:
            "Os quizzes funcionam bem em momentos curtos, quando você quer verificar a compreensão, revisar o conteúdo ou começar a aula com foco.",
          bullets: [
            "Revisão rápida no fim da aula",
            "Aquecimento no início da aula seguinte",
            "Diagnóstico simples antes de avançar para um conteúdo novo",
          ],
        },
        {
          title: "O que dá para ajustar em um quiz gerado pela Scooli",
          description:
            "A base pode ser ajustada ao tempo disponível, ao ritmo da turma e ao tipo de resposta que você quer pedir aos alunos.",
          bullets: [
            "Número de perguntas e tempo total",
            "Perguntas mais simples ou mais desafiadoras",
            "Formato curto para usar na hora, em aula",
          ],
        },
      ],
      faq: [
        {
          question: "Os quizzes servem para revisão rápida em aula?",
          answer:
            "Sim. A Scooli ajuda a gerar quizzes curtos, fáceis de ajustar ao tempo disponível e adequados a momentos de revisão ou de diagnóstico.",
        },
        {
          question: "Posso mudar o número de perguntas?",
          answer:
            "Sim. Você pode pedir um quiz mais curto, aumentar o número de perguntas ou adaptar o formato à dinâmica da aula.",
        },
        {
          question: "Os quizzes ficam editáveis?",
          answer:
            "Sim. O conteúdo pode ser revisado e ajustado antes de usar com a turma.",
        },
      ],
      relatedLinks: [
        { label: "Criar provas completas", href: toolHref("gerador-de-testes") },
        { label: "Ver apresentações para a aula", href: toolHref("apresentacoes") },
        { label: "Explorar materiais na biblioteca", href: "/professores" },
      ],
      howToSteps: [
        {
          name: "Escolher o tema a revisar",
          text: "Informe o conteúdo, o ano e o momento da aula em que você quer usar o quiz.",
        },
        {
          name: "Definir o formato do quiz",
          text: "Peça um conjunto curto de perguntas adequado ao tempo disponível.",
        },
        {
          name: "Gerar com IA",
          text: "Receba um quiz com perguntas prontas para revisar e ajustar.",
        },
        {
          name: "Editar e usar em aula",
          text: "Ajuste o nível, mude o número de perguntas e use o quiz quando estiver do jeito da turma.",
        },
      ],
      seoKeywords: [
        "quiz com IA",
        "gerador de quiz",
        "quiz para sala de aula",
        "quiz educativo",
        "revisão de conteúdo em aula",
        "perguntas para revisão",
        "quiz para professores",
      ],
    },
    {
      slug: "apresentacoes",
      title: "Apresentações com IA para introduzir e explicar conteúdos",
      shortTitle: "Apresentações",
      description: "Estruture apresentações com tópicos, exemplos e o ritmo da aula, prontas para ajustar e completar.",
      metaTitle: "Apresentações com IA para explicar conteúdos em aula",
      metaDescription:
        "Crie apresentações com IA para introduzir e explicar conteúdos, com tópicos, exemplos e o ritmo da aula definidos, prontas para editar antes de projetar.",
      headings: {
        cta: "Prepare a próxima apresentação na Scooli",
        howTo: "Como criar uma apresentação na Scooli",
      },
      hero: "Monte a base de uma apresentação em minutos e ajuste só o essencial.",
      useCases: ["Introdução de tema", "Aula expositiva", "Síntese de unidade"],
      outputs: ["Estrutura de slides", "Tópicos principais", "Exemplos visuais"],
      benefits: [
        "Organizar slides e tópicos principais sem perder tempo com a estrutura inicial",
        "Chegar mais rápido a uma apresentação coerente com o ritmo da aula",
        "Editar exemplos, linguagem e ordem dos slides antes de apresentar",
      ],
      contentSections: [
        {
          title: "O que uma apresentação criada na Scooli pode ter",
          description:
            "A ferramenta ajuda a estruturar a sequência da explicação, para você ter uma base clara antes de ajustar o conteúdo, os exemplos e o tom da aula.",
          bullets: [
            "Tópicos principais por slide",
            "Exemplos para apoiar a explicação",
            "Ritmo de apresentação pensado para a sala de aula",
          ],
        },
        {
          title: "Quando faz sentido usar apresentações com IA",
          description:
            "Funciona bem quando você precisa introduzir um tema, apoiar uma aula expositiva ou fechar uma unidade com uma síntese clara.",
          bullets: [
            "Introdução de conteúdos novos",
            "Aula expositiva com a sequência já organizada",
            "Síntese final antes da revisão ou da prova",
          ],
        },
      ],
      faq: [
        {
          question: "A Scooli ajuda a criar a estrutura dos slides?",
          answer:
            "Sim. Você pode gerar uma base com tópicos, sequência lógica e exemplos e depois ajustar a apresentação ao seu estilo de aula.",
        },
        {
          question: "Posso adaptar a linguagem da apresentação?",
          answer:
            "Sim. Você pode simplificar o texto, mudar o foco dos slides ou reorganizar a explicação antes de usar a apresentação.",
        },
        {
          question: "As apresentações ficam prontas para completar?",
          answer:
            "Sim. Você recebe uma base organizada para editar, acrescentar o que faltar e usar como apoio em aula.",
        },
      ],
      relatedLinks: [
        { label: "Criar planos de aula", href: toolHref("plano-de-aula") },
        { label: "Gerar quizzes de revisão", href: toolHref("quizzes") },
        { label: "Ver a Scooli para professores", href: "/professores" },
      ],
      howToSteps: [
        {
          name: "Definir o tema e o ano",
          text: "Informe o conteúdo, o ano e o objetivo da apresentação que você quer preparar.",
        },
        {
          name: "Pedir a estrutura dos slides",
          text: "Escolha o foco da aula e o tipo de explicação que você precisa montar.",
        },
        {
          name: "Gerar a apresentação",
          text: "Receba uma sequência de slides com tópicos e exemplos de base.",
        },
        {
          name: "Ajustar antes da aula",
          text: "Edite a linguagem, a ordem e os exemplos para deixar a apresentação pronta para usar.",
        },
      ],
      seoKeywords: [
        "apresentações com IA",
        "gerador de apresentações",
        "slides para aulas",
        "criar apresentações para aulas",
        "apresentação escolar",
        "slides educativos",
        "apresentações para professores",
      ],
    },
    {
      slug: "adaptacao-de-materiais",
      title: "Adaptação de materiais com IA para níveis diferentes",
      shortTitle: "Adaptação de materiais",
      description: "Parta de um material base e gere versões mais simples, mais curtas ou com mais apoio sem refazer o trabalho.",
      metaDescription:
        "Adapte listas de exercícios, provas e textos com IA: versões mais simples, mais curtas ou com mais apoio, pensando na educação inclusiva, sem refazer o material.",
      headings: {
        practice: "O que você pode adaptar com a Scooli",
        cta: "Adapte o próximo material na Scooli",
        howTo: "Como adaptar materiais na Scooli",
      },
      hero: "Adapte um material para cada turma sem começar tudo de novo.",
      useCases: ["Simplificar a linguagem", "Reduzir a extensão", "Dar mais apoio"],
      outputs: ["Versão simplificada", "Versão resumida", "Versão com mais apoio"],
      benefits: [
        "Diferenciar materiais sem dobrar o tempo de preparação",
        "Gerar versões mais simples, mais curtas ou com mais apoio",
        "Manter uma base comum e adaptá-la a ritmos diferentes",
      ],
      contentSections: [
        {
          title: "Como a adaptação de materiais ajuda no dia a dia",
          description:
            "Quando as turmas têm ritmos diferentes, esta ferramenta permite ajustar o mesmo material com menos esforço manual e mais consistência entre as versões.",
          bullets: [
            "Simplificar a linguagem sem perder o objetivo do exercício",
            "Reduzir a extensão para reforço",
            "Acrescentar dicas e mediação quando a turma precisa",
          ],
        },
        {
          title: "Pensada para a educação inclusiva",
          description:
            "Se a turma tem estudantes público-alvo da educação especial ou acompanhados pelo AEE, você informa isso no pedido e a Scooli leva em conta na nova versão. O professor continua no controle do resultado final.",
          bullets: [
            "Versão simplificada",
            "Versão mais curta ou resumida",
            "Versão com mais apoio e instruções mais guiadas",
          ],
        },
      ],
      faq: [
        {
          question: "Posso adaptar um material para alunos com ritmos diferentes?",
          answer:
            "Sim. Você pode gerar versões mais simples, mais curtas ou com mais apoio a partir do mesmo material base.",
        },
        {
          question: "A adaptação mantém o conteúdo principal?",
          answer:
            "Essa é a ideia. A Scooli ajuda a preservar o objetivo do material enquanto ajusta a linguagem, a extensão ou o apoio conforme a necessidade.",
        },
        {
          question: "Posso revisar tudo antes de usar?",
          answer:
            "Sim. O professor revisa, edita e decide sempre a versão final antes de levá-la para a aula.",
        },
      ],
      relatedLinks: [
        { label: "Criar listas de exercícios", href: toolHref("fichas-de-trabalho") },
        { label: "Partir de um documento seu", href: toolHref("carregar-documentos") },
        { label: "Ler a página de confiança", href: "/confianca" },
      ],
      howToSteps: [
        {
          name: "Escolher o material base",
          text: "Parta de um exercício, lista, prova, texto ou documento que você já tem.",
        },
        {
          name: "Dizer o tipo de adaptação",
          text: "Peça uma versão mais simples, mais curta, com mais apoio ou outra mudança adequada à turma.",
        },
        {
          name: "Gerar a nova versão",
          text: "Receba uma versão adaptada com a mesma base, mas ajustada ao nível desejado.",
        },
        {
          name: "Revisar antes de usar",
          text: "Confira a linguagem, os objetivos e o formato final antes de aplicar o material em aula.",
        },
      ],
      seoKeywords: [
        "adaptação de materiais com IA",
        "atividades adaptadas",
        "adaptação curricular",
        "educação inclusiva",
        "atividades diferenciadas",
        "simplificar textos para alunos",
        "material adaptado AEE",
      ],
    },
    {
      slug: "carregar-documentos",
      title: "Enviar documentos e transformar materiais com IA",
      shortTitle: "Enviar documentos",
      description: "Parta de um documento seu e transforme-o em listas de exercícios, provas ou versões adaptadas com menos trabalho manual.",
      metaDescription:
        "Envie um documento seu, como uma lista antiga ou um texto, e transforme-o com IA em listas de exercícios, provas ou versões adaptadas, prontas para editar.",
      headings: {
        practice: "O que você pode fazer com os seus documentos",
        faq: "Dúvidas sobre partir de documentos seus",
        cta: "Transforme um documento seu na Scooli",
        howTo: "Como transformar um documento seu na Scooli",
      },
      hero: "Use os documentos que você já tem e transforme-os em novos materiais mais rápido.",
      useCases: ["Aproveitar materiais antigos", "Adaptar uma prova", "Criar uma lista a partir de um texto"],
      outputs: ["Lista de exercícios a partir de um documento", "Prova a partir de um texto", "Nova versão adaptada"],
      benefits: [
        "Aproveitar materiais antigos sem copiar e colar tudo de novo",
        "Transformar um documento base em lista, prova ou nova versão adaptada",
        "Reduzir o trabalho manual quando você já tem conteúdo pronto",
      ],
      contentSections: [
        {
          title: "Quando vale a pena começar por um documento seu",
          description:
            "Se você já tem textos, listas antigas, provas ou materiais próprios, esta ferramenta ajuda a reaproveitar esse trabalho em vez de começar de novo.",
          bullets: [
            "Aproveitar uma lista antiga como base",
            "Transformar um texto em um novo conjunto de exercícios",
            "Adaptar uma prova que você já usou em outro ano ou turma",
          ],
        },
        {
          title: "O que você pode gerar a partir de um documento",
          description:
            "A Scooli lê o ponto de partida e ajuda a transformá-lo em um novo material, de forma mais rápida e sob o seu controle.",
          bullets: [
            "Lista de exercícios a partir de um texto",
            "Prova a partir de um material que já existe",
            "Nova versão adaptada para outro contexto",
          ],
        },
      ],
      faq: [
        {
          question: "Posso usar materiais que já preparei?",
          answer:
            "Sim. Esta ferramenta existe justamente para ajudar a aproveitar documentos seus e transformá-los em novos materiais com menos trabalho manual.",
        },
        {
          question: "Que tipo de material posso gerar a partir de um documento?",
          answer:
            "Você pode transformar um documento em uma lista de exercícios, em uma prova ou em uma versão adaptada do material original.",
        },
        {
          question: "O resultado final continua editável?",
          answer:
            "Sim. Mesmo quando você parte de um documento seu, a nova versão continua editável para revisar tudo antes de usar.",
        },
      ],
      relatedLinks: [
        { label: "Gerar listas de exercícios", href: toolHref("fichas-de-trabalho") },
        { label: "Adaptar materiais por nível", href: toolHref("adaptacao-de-materiais") },
        { label: "Explorar todas as ferramentas", href: "/ferramentas" },
      ],
      howToSteps: [
        {
          name: "Escolher o documento base",
          text: "Parta de um material seu, em PDF ou Word, que você queira reaproveitar ou transformar.",
        },
        {
          name: "Dizer o novo formato",
          text: "Explique se quer gerar uma lista de exercícios, uma prova ou uma versão adaptada do conteúdo.",
        },
        {
          name: "Gerar com IA",
          text: "Receba um novo material construído a partir do documento que você enviou.",
        },
        {
          name: "Editar e validar",
          text: "Revise a nova versão, faça os ajustes e use o material quando estiver pronto.",
        },
      ],
      seoKeywords: [
        "enviar documento para IA",
        "transformar texto em exercícios",
        "usar material próprio com IA",
        "adaptar documento do professor",
        "gerar lista de exercícios a partir de texto",
        "gerar prova a partir de documento",
        "reaproveitar materiais escolares",
      ],
    },
  ],
};
