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
  },
  {
    icon: FileText,
    title: "Planificação de Aulas",
    description:
      "Gere planos de aula alinhados com o currículo português e as melhores práticas educativas.",
  },
  {
    icon: ListChecks,
    title: "Criação de Testes e Fichas",
    description: "Elabore testes, quizzes e exercícios em segundos.",
  },
  {
    icon: Folder,
    title: "Organização de Conteúdos",
    description:
      "Guarde e organize todos os materiais gerados para fácil acesso e reutilização.",
  },
  {
    icon: Upload,
    title: "Upload e Transformação de Documentos",
    description:
      "Faça upload dos seus próprios documentos para serem melhorados ou transformados pela IA.",
  },
  {
    icon: Sparkles,
    title: "Sugestões Inteligentes",
    description:
      "Receba sugestões de atividades, estratégias diferentes e ideias para trabalhos de grupo.",
  },
];

export function Benefits() {
  return (
    <section className="mb-20 md:mb-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">
          Porquê escolher a Scooli?
        </h2>
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
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
