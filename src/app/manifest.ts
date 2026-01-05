import type { MetadataRoute } from "next";

/**
 * PWA Web App Manifest
 * Enhanced for SEO and app store discoverability
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Scooli - IA para Professores Portugueses",
    short_name: "Scooli",
    description:
      "Plataforma portuguesa com IA que devolve tempo aos professores. Gere apresentações, planos de aula, testes e quizzes alinhados às aprendizagens essenciais em segundos.",
    start_url: "/",
    id: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    background_color: "#ffffff",
    theme_color: "#6753FF",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/web-app-manifest-192x192.png?v=3",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png?v=3",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-192x192.png?v=3",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png?v=3",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.svg?v=3",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-touch-icon.png?v=3",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["education", "productivity", "utilities"],
    lang: "pt-PT",
    dir: "ltr",
    scope: "/",
    screenshots: [
      {
        src: "/opengraph-image",
        sizes: "1200x630",
        type: "image/png",
        label: "Scooli - Página inicial",
      },
    ],
    prefer_related_applications: false,
    shortcuts: [
      {
        name: "Criar Apresentação",
        short_name: "Apresentação",
        description: "Gerar uma nova apresentação com IA",
        url: "/?action=presentation",
        icons: [{ src: "/favicon-96x96.png?v=3", sizes: "96x96" }],
      },
      {
        name: "Criar Plano de Aula",
        short_name: "Plano",
        description: "Gerar um novo plano de aula com IA",
        url: "/?action=lesson-plan",
        icons: [{ src: "/favicon-96x96.png?v=3", sizes: "96x96" }],
      },
    ],
  };
}
