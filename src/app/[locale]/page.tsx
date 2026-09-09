import { HomePageClient } from "@/components/HomePageClient";
import { StructuredData } from "@/components/StructuredData";
import type { Locale } from "@/i18n/routing";
import { canonicalUrl, hreflangAlternates, localizedUrl } from "@/i18n/urls";
import {
  getHomePageSchemas,
  getHowToSchema,
  openGraphLocale,
  SITE_URL,
} from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const ptKeywords = [
  "Scooli",
  "plataforma de IA para professores",
  "inteligência artificial para professores",
  "inteligência artificial para educação",
  "ferramentas de IA para educação",
  "ferramentas para professores",
  "software para professores",
  "planificação de aulas",
  "planificações com IA",
  "criar planificações",
  "gerador de planificações",
  "planificar aulas",
  "criar testes online",
  "fazer testes online",
  "gerador de testes",
  "gerador de testes com IA",
  "testes para professores",
  "criar fichas de trabalho",
  "fazer fichas de trabalho",
  "fichas de trabalho com IA",
  "fichas para imprimir",
  "criar quizzes",
  "gerador de quizzes",
  "quizzes educativos",
  "quiz para sala de aula",
  "criar apresentações para aulas",
  "gerador de apresentações",
  "apresentações escolares com IA",
  "slides para aulas",
  "criar materiais pedagógicos",
  "gerar materiais pedagógicos",
  "recursos educativos com IA",
  "recursos para professores",
  "conteúdos pedagógicos",
  "adaptação de conteúdos pedagógicos",
  "diferenciação pedagógica",
  "educação inclusiva",
  "necessidades educativas especiais",
  "editor de materiais pedagógicos",
  "editar materiais educativos",
  "biblioteca comunitária de professores",
  "biblioteca de recursos educativos",
  "partilha de recursos educativos",
  "comunidade de professores",
  "aprendizagens essenciais",
  "alinhamento curricular",
  "currículo português",
  "ensino básico",
  "ensino secundário",
  "educação em Portugal",
  "edtech Portugal",
  "plataforma educativa Portugal",
];

const enKeywords = [
  "Scooli",
  "AI platform for teachers",
  "AI for teachers",
  "AI in education",
  "teaching tools",
  "software for teachers",
  "lesson planning",
  "AI lesson planning",
  "lesson plan generator",
  "AI test generator",
  "create tests online",
  "tests for teachers",
  "AI worksheet generator",
  "printable worksheets",
  "AI quiz generator",
  "classroom quizzes",
  "AI presentation generator",
  "slides for lessons",
  "create teaching materials",
  "AI teaching resources",
  "differentiated instruction",
  "inclusive education",
  "special educational needs",
  "editable teaching materials",
  "teacher resource library",
  "teacher community",
  "Aprendizagens Essenciais",
  "Portuguese national curriculum",
  "curriculum alignment",
  "edtech Portugal",
  "education technology Portugal",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  const url = localizedUrl(SITE_URL, "/", locale);

  return {
    title: t("title"),
    description: t("description"),
    keywords: locale === "en" ? enKeywords : ptKeywords,
    alternates: {
      canonical: canonicalUrl(SITE_URL, "/", locale),
      languages: hreflangAlternates(SITE_URL, "/"),
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url,
      type: "website",
      locale: openGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
    },
  };
}

const homeSchemas = getHomePageSchemas();

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.howToSchema" });

  const howToSchema = getHowToSchema(
    t("name"),
    t("description"),
    t.raw("steps") as { name: string; text: string }[],
  );

  return (
    <>
      {homeSchemas.map((schema, index) => (
        <StructuredData
          key={`home-schema-${index}`}
          id={`home-schema-${index}`}
          data={schema}
        />
      ))}
      <StructuredData id="howto-schema" data={howToSchema} />

      <HomePageClient />
    </>
  );
}
