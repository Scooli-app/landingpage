import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Scooli - Plataforma Educativa para Professores",
    short_name: "Scooli",
    description:
      "Plataforma educativa que conecta professores portugueses com ferramentas inovadoras para todos os níveis de ensino",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6753FF",
    orientation: "portrait",
    icons: [
      {
        src: "/logo-icon-blue.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-full-blue.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["education", "productivity"],
    lang: "pt-PT",
    scope: "/",
  };
}
