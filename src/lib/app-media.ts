import type { VideoAsset } from "@/components/site/LoopingVideo";
import type { NavToolSlug } from "@/components/site/nav-data";
import type { Locale } from "@/i18n/routing";

export type ImageAsset = { src: string; width: number; height: number };

type AppMedia = {
  /**
   * The hero film (videos/scooli-hero-film, HyperFrames): the year → one week →
   * "Gerar semana" → a lesson's plan → its materials → the weeks that follow.
   * Phones keep the portrait screen recording.
   */
  heroFilm: VideoAsset;
  /** One short loop per "how it works" step, in step order. */
  stepFilms: [VideoAsset, VideoAsset, VideoAsset];
  /** The month view: every lesson of the term laid out (Monday-Thursday on phones). */
  calendarMonth: ImageAsset & { mobile: ImageAsset };
  /** Portrait crops of real generated documents, keyed by tool. */
  documents: Partial<Record<NavToolSlug, ImageAsset>>;
  /** Slides of a generated deck: [title slide, a content slide]. */
  slides: [ImageAsset, ImageAsset];
  /** The teacher's dashboard: upcoming lessons and "what are you teaching?". */
  dashboard: ImageAsset;
  /** The community library (demo resources from fictional teachers, seeded locally). */
  library: ImageAsset;
  /** The school admin dashboard (a fictional school, seeded locally: _screenshots/seed-school.sql). */
  schoolDashboard: ImageAsset;
};

const doc = (dir: string, name: string): ImageAsset => ({
  src: `/app/${dir}/${name}.png`,
  width: 1116,
  height: 940,
});
const slide = (dir: string, n: number): ImageAsset => ({
  src: `/app/${dir}/slide-${n}.png`,
  width: 1536,
  height: 864,
});
/** A desktop film plus its portrait cut for phones (`<name>-mobile`, 720x900). */
const film = (dir: string, name: string, width: number, height: number): VideoAsset => ({
  src: `/app/${dir}/${name}.mp4`,
  poster: `/app/${dir}/${name}.jpg`,
  width,
  height,
  mobile: {
    src: `/app/${dir}/${name}-mobile.mp4`,
    poster: `/app/${dir}/${name}-mobile.jpg`,
    width: 720,
    height: 900,
  },
});

/**
 * Real, measured durations (`ffprobe -show_entries format=duration`) for the
 * desktop cut of each film, keyed by locale and name. Needed for VideoObject
 * structured data (`src/lib/seo.ts`'s `getVideoObjectSchema`) — Google
 * validates the declared ISO 8601 duration against what it infers from the
 * file, so this must stay a real measurement, not an estimate. Re-run
 * ffprobe and update this table whenever a film is re-recorded.
 */
export const FILM_DURATIONS_SECONDS: Record<Locale, Record<string, number>> = {
  "pt-PT": { hero: 23, "step-1": 6.8, "step-2": 5.3, "step-3": 7.7 },
  en: { hero: 23.1, "step-1": 5.9, "step-2": 9.6, "step-3": 7.7 },
};

/**
 * Publish date for VideoObject's `uploadDate`, keyed the same way. Sourced
 * from `git log -1 --format=%ad --date=short -- <file>` at the time this
 * table was written; update alongside `FILM_DURATIONS_SECONDS` when a film
 * is re-recorded.
 */
export const FILM_UPLOAD_DATES: Record<Locale, Record<string, string>> = {
  "pt-PT": { hero: "2026-10-06", "step-1": "2026-10-07", "step-2": "2026-10-07", "step-3": "2026-10-07" },
  en: { hero: "2026-10-06", "step-1": "2026-10-07", "step-2": "2026-10-07", "step-3": "2026-10-07" },
};

const forLocale = (dir: string, library: ImageAsset): AppMedia => ({
  heroFilm: { ...film(dir, "hero", 1600, 800), av1Src: `/app/${dir}/hero.av1.mp4` },
  stepFilms: [film(dir, "step-1", 1280, 800), film(dir, "step-2", 1280, 800), film(dir, "step-3", 1280, 800)],
  calendarMonth: {
    src: `/app/${dir}/calendar-month.png`,
    width: 2256,
    height: 1316,
    mobile: { src: `/app/${dir}/calendar-month-mobile.png`, width: 1297, height: 1316 },
  },
  documents: {
    "plano-de-aula": doc(dir, "doc-plano-aula"),
    "fichas-de-trabalho": doc(dir, "doc-ficha"),
    "gerador-de-testes": doc(dir, "doc-teste"),
    quizzes: doc(dir, "doc-quiz"),
    planificacoes: doc(dir, "doc-planificacao"),
  },
  slides: [slide(dir, 1), slide(dir, 3)],
  dashboard: { src: `/app/${dir}/dashboard.png`, width: 2272, height: 1196 },
  library,
  schoolDashboard: { src: `/app/${dir}/school-dashboard.png`, width: 2272, height: 1832 },
});

/**
 * Captures of the real app, recorded on a local build with real generated
 * documents (see _screenshots/ at the repo root for the scripts). Each locale
 * shows the app in its own language: the English site must not show
 * Portuguese curricula or school-system details.
 */
const media: Record<Locale, AppMedia> = {
  "pt-PT": forLocale("pt", { src: "/app/pt/library.png", width: 2240, height: 1874 }),
  en: forLocale("en", { src: "/app/en/library.png", width: 2240, height: 1692 }),
};

export function appMedia(locale: string): AppMedia {
  return media[locale as Locale] ?? media["pt-PT"];
}
