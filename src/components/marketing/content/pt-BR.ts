import type { MarketingContent } from "../data";
import { marketingContentPtPT } from "./pt-PT";

/**
 * Brazilian marketing copy. The cards are adapted for Brazil; the tool pages
 * are step 2 of the pt-BR site and still reuse pt-PT (their /br URLs redirect
 * to /br until that copy is written).
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

  toolPages: marketingContentPtPT.toolPages,
};
