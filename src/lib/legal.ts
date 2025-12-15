import fs from "node:fs/promises";
import path from "node:path";

type LegalSlug =
  | "politica-de-privacidade"
  | "termos-de-utilizacao"
  | "cancelar-subscricao";

const legalMetadata: Record<
  LegalSlug,
  { title: string; description: string; updated: string }
> = {
  "politica-de-privacidade": {
    title: "Política de Privacidade",
    description:
      "Como tratamos dados pessoais de professores e visitantes, em conformidade com o RGPD.",
    updated: "14 de Dezembro de 2025",
  },
  "termos-de-utilizacao": {
    title: "Termos de Utilização",
    description: "Regras de utilização do website e serviço Scooli.",
    updated: "14 de Dezembro de 2025",
  },
  "cancelar-subscricao": {
    title: "Cancelar Subscrição",
    description: "Passos simples para cancelar ou gerir a sua subscrição.",
    updated: "14 de Dezembro de 2025",
  },
};

export async function getLegalContent(slug: LegalSlug) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "legal",
    `${slug}.md`
  );
  const content = await fs.readFile(filePath, "utf-8");
  return {
    slug,
    content,
    ...legalMetadata[slug],
  };
}
