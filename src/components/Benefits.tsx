import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Folder,
  ListChecks,
  Sliders,
  Sparkles,
  Upload,
} from "lucide-react";

const benefits = [
  {
    icon: Sliders,
    title: "Geração Automática de Apresentações",
    description:
      "Crie apresentações para as suas aulas de forma automática e personalizada.",
    detailedDescription: "A Scooli gera apresentações completas e interativas baseadas no currículo português, incluindo slides estruturados, imagens relevantes e atividades de engajamento para manter os alunos atentos e motivados.",
    keywords: ["apresentações", "slides", "aulas", "automação"],
  },
  {
    icon: FileText,
    title: "Planificação de Aulas",
    description:
      "Gere planos de aula alinhados com o currículo português e as melhores práticas educativas.",
    detailedDescription: "Crie planos de aula detalhados com objetivos claros, metodologias ativas, recursos necessários e critérios de avaliação, tudo alinhado com as metas de aprendizagem do currículo nacional português e com as suas ideias.",
    keywords: ["planos de aula", "currículo", "metodologia", "avaliação"],
  },
  {
    icon: ListChecks,
    title: "Criação de Testes e Fichas",
    description: "Elabore testes, quizzes e exercícios em segundos.",
    detailedDescription: "Gere testes personalizados com diferentes tipos de questões (escolha múltipla, verdadeiro/falso, desenvolvimento), fichas de trabalho e exercícios práticos adaptados ao nível dos seus alunos.",
    keywords: ["testes", "quizzes", "exercícios", "avaliação"],
  },
  {
    icon: Folder,
    title: "Organização de Conteúdos",
    description:
      "Guarde e organize todos os materiais gerados para fácil acesso e reutilização.",
    detailedDescription: "Sistema de organização inteligente que permite categorizar, etiquetar e pesquisar todos os seus recursos educativos. Aceda rapidamente a materiais anteriores e adapte-os para novas turmas.",
    keywords: ["organização", "biblioteca", "recursos", "reutilização"],
  },
  {
    icon: Upload,
    title: "Upload e Transformação de Documentos",
    description:
      "Faça upload dos seus próprios documentos para serem melhorados ou transformados pela IA.",
    detailedDescription: "Carregue os seus documentos existentes (PDF, Word, PowerPoint) e a Scooli irá melhorá-los, expandi-los, adaptá-los ou usá-los como referência para diferentes contextos educativos, mantendo o seu estilo pessoal.",
    keywords: ["upload", "documentos", "transformação", "IA"],
  },
  {
    icon: Sparkles,
    title: "Sugestões Inteligentes",
    description:
      "Receba sugestões de atividades, estratégias diferentes e ideias para trabalhos de grupo.",
    detailedDescription: "A IA sugere atividades complementares, estratégias de ensino diferenciado, trabalhos de grupo, métodos de avaliação alternativos e muito mais para enriquecer a experiência de aprendizagem.",
    keywords: ["sugestões", "atividades", "estratégias", "grupo"],
  },
];

export function Benefits() {
  return (
    <section className="mb-20 md:mb-32" aria-labelledby="benefits-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Porquê escolher a Scooli?
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            A Scooli revoluciona o ensino em Portugal através de inteligência artificial avançada, 
            oferecendo ferramentas inovadoras que poupam tempo aos professores e melhoram a qualidade do ensino.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/70 backdrop-blur-sm border-slate-200/50 hover:border-blue-200"
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {benefit.description}
                </p>
                <details className="text-left">
                  <summary className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium mb-2">
                    Saber mais
                  </summary>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.detailedDescription}
                  </p>
                </details>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
