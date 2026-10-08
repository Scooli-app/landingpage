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
 * The site's display face, subset to the characters actually drawn. If Google
 * Fonts is unreachable the card still renders, in the default sans.
 */
async function loadNewsreader(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Newsreader:wght@500&text=${encodeURIComponent(text)}`,
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
  const tags = [t("tagOrigin"), t("tagPrivacy"), t("tagCurriculum")];
  const headline = t("headline");
  const display = await loadNewsreader(headline);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#FFFFFF",
          borderBottom: "16px solid #F0EFEB",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUrl} alt="Scooli" width={170} height={56} style={{ objectFit: "contain" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              fontFamily: display ? "Newsreader" : undefined,
              fontSize: "76px",
              fontWeight: 500,
              color: "#111111",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: "980px",
              margin: "0 0 24px 0",
            }}
          >
            {headline}
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#787774",
              lineHeight: 1.4,
              maxWidth: "900px",
              margin: 0,
            }}
          >
            {t("subline")}
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
          <span>{tags.join("  ·  ")}</span>
          <span style={{ color: "#4E3BC0" }}>www.scooli.app</span>
        </div>
      </div>
    ),
    {
      ...SHARE_IMAGE_SIZE,
      fonts: display ? [{ name: "Newsreader", data: display, weight: 500, style: "normal" }] : [],
    },
  );
}
