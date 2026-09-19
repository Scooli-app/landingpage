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

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #EEF0FF 0%, #FFFFFF 50%, #F4F5F8 100%)",
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle at center, rgba(103,83,255,0.15), transparent)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle at center, rgba(78,59,192,0.12), transparent)",
            borderRadius: "50%",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoDataUrl}
              alt="Scooli Logo"
              width={300}
              height={120}
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <h1
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#0B0D17",
              textAlign: "center",
              lineHeight: 1.2,
              maxWidth: "900px",
              margin: "0 0 24px 0",
            }}
          >
            {t("headline")}
          </h1>

          <p
            style={{
              fontSize: "28px",
              color: "#6C6F80",
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {t("subline")}
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "48px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  background: "white",
                  border: "1px solid #C7C9D9",
                  borderRadius: "100px",
                  padding: "12px 24px",
                  fontSize: "20px",
                  color: "#2E2F38",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "24px", color: "#6C6F80" }}>www.scooli.app</span>
        </div>
      </div>
    ),
    {
      ...SHARE_IMAGE_SIZE,
    },
  );
}
