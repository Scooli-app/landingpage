import { routing } from "@/i18n/routing";
import { SHARE_IMAGE_SIZE, SITE_URL } from "@/lib/seo";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

/**
 * The social share card (Open Graph and Twitter), rendered in the reader's
 * locale: `/og` is Portuguese, `/og?locale=en` English.
 *
 * This replaces the file-convention `opengraph-image.tsx` / `twitter-image.tsx`
 * at the app root, which could only ever render one language and, once locale
 * routing arrived, were rewritten by the middleware to `/pt-PT/opengraph-image`,
 * where nothing answers. Metadata points here via `shareImageUrl()` in
 * `src/lib/seo.ts`.
 *
 * It lives at `/og` rather than under `/api/` on purpose: robots.txt disallows
 * `/api/`, and the Facebook, LinkedIn and Twitter crawlers honour robots.txt, so
 * an image there would never show up in a share preview. The middleware skips
 * locale routing for `/og`.
 */

/**
 * A Google font subset to the characters actually drawn (`family` is the css2
 * spec, e.g. `Newsreader:ital,wght@1,500`). Every text block names its font
 * explicitly: Satori otherwise borrows glyphs from whichever subset has them,
 * which mixed two typefaces inside one word. The body is Inter rather than the
 * site's Geist, which Satori draws with uneven word spacing. If Google Fonts is
 * unreachable the card still renders, in the default sans.
 */
async function loadFont(family: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`,
      )
    ).text();
    const source = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
    if (!source) {
      return null;
    }
    const response = await fetch(source[1]);
    return response.ok ? await response.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("locale");
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "shareImage" });

  const logoResponse = await fetch(new URL("/scooli.svg", SITE_URL));
  const logoSvg = await logoResponse.text();
  const logoDataUrl = `data:image/svg+xml,${encodeURIComponent(logoSvg)}`;
  const tags = [t("tagOrigin"), t("tagPrivacy"), t("tagCurriculum")].join("  ·  ");
  const headline = t("headline");
  const headlineEm = t("headlineEm");
  const subline = t("subline");
  const [display, displayItalic, body] = await Promise.all([
    loadFont("Newsreader:wght@500", headline),
    loadFont("Newsreader:ital,wght@1,500", headlineEm),
    loadFont("Inter:wght@400", `${subline}${tags}www.scooli.app`),
  ]);
  const fonts = [
    display && { name: "Newsreader", data: display, weight: 500 as const, style: "normal" as const },
    displayItalic && { name: "Newsreader", data: displayItalic, weight: 500 as const, style: "italic" as const },
    body && { name: "Inter", data: body, weight: 400 as const, style: "normal" as const },
  ].filter((font) => !!font);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "#FFFFFF",
          borderBottom: "16px solid #F0EFEB",
          fontFamily: body ? "Inter" : undefined,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUrl} alt="Scooli" width={170} height={56} style={{ objectFit: "contain" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontFamily: display ? "Newsreader" : undefined,
              fontSize: "72px",
              fontWeight: 500,
              color: "#111111",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
              margin: "0 0 28px 0",
            }}
          >
            {headline}&nbsp;
            <span style={{ fontStyle: "italic", color: "#4E3BC0" }}>{headlineEm}</span>
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#5F5E5A",
              lineHeight: 1.4,
              maxWidth: "960px",
              margin: 0,
            }}
          >
            {subline}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
            color: "#A3A29E",
          }}
        >
          <span>{tags}</span>
          <span style={{ color: "#4E3BC0" }}>www.scooli.app</span>
        </div>
      </div>
    ),
    {
      ...SHARE_IMAGE_SIZE,
      fonts,
    },
  );
}
