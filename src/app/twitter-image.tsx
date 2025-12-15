import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Scooli - IA para professores portugueses";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Image generation - Same as OG image for consistency
export default async function TwitterImage() {
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
        {/* Decorative gradient orbs */}
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

        {/* Main content */}
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
          {/* Logo/Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #6753FF 0%, #4E3BC0 100%)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 40px rgba(103,83,255,0.3)",
              }}
            >
              <span style={{ fontSize: "48px", color: "white", fontWeight: 700 }}>S</span>
            </div>
            <span
              style={{
                fontSize: "64px",
                fontWeight: 700,
                color: "#0B0D17",
                letterSpacing: "-2px",
              }}
            >
              Scooli
            </span>
          </div>

          {/* Main headline */}
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
            IA que devolve tempo aos professores
          </h1>

          {/* Subheadline */}
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
            Apresentações, planos de aula, testes e quizzes alinhados às aprendizagens essenciais portuguesas
          </p>

          {/* Features pills */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "48px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["🇵🇹 Made in Portugal", "⚡ RGPD-ready", "🎓 Aprendizagens Essenciais"].map((tag) => (
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

        {/* Domain footer */}
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
      ...size,
    }
  );
}

