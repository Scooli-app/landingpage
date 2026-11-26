// Route table for the locale routing: run it against a running server
// (`npm run dev` or `npm start`) with `npm run check:routes`.
// BASE defaults to http://localhost:3100; override it with the BASE env var.
const BASE = (process.env.BASE || "http://localhost:3100").replace(/\/$/, "");
const SITE = "https://www.scooli.app";

const ok = (status) => ({ status });
const redirect = (status, to) => ({ status, to });

// Every /br tool page is published: the pt-PT slug 301s to the Brazilian one, which serves.
const brTool = (from, to) => [[from, redirect(301, to)], [to, ok(200)]];

/** [path, expectation]. A function expectation returns an error string or nothing. */
const cases = [
  ["/", ok(200)],
  ["/precos", ok(200)],
  ["/en/pricing", ok(200)],
  ["/br", ok(200)],
  ["/br/precos", ok(200)],
  ["/br/escolas", ok(200)],
  ["/br/contato", ok(200)],
  ["/br/contacto", redirect(301, "/br/contato")],
  ["/br/professores", ok(200)],
  ["/br/ferramentas", ok(200)],
  ["/br/ferramentas/plano-de-aula", ok(200)],
  ["/br/comparar/teachy", ok(200)],
  ...brTool("/br/ferramentas/gerador-de-testes", "/br/ferramentas/gerador-de-provas"),
  ...brTool("/br/ferramentas/fichas-de-trabalho", "/br/ferramentas/atividades"),
  ...brTool("/br/ferramentas/planificacoes", "/br/ferramentas/planejamentos"),
  ...brTool("/br/ferramentas/sequencias-de-aulas", "/br/ferramentas/sequencias-didaticas"),
  ...brTool("/br/ferramentas/carregar-documentos", "/br/ferramentas/enviar-documentos"),
  ["/en/tools/lesson-plan-generator", ok(200)],
  ["/en/ferramentas/plano-de-aula", redirect(301, "/en/tools/lesson-plan-generator")],
  [
    "/pt-BR/precos",
    ({ status, location }) =>
      status === 404 || (location === "/br/precos" && status >= 300 && status < 400)
        ? undefined
        : `expected 404 or a redirect to /br/precos, got ${status} ${location ?? ""}`,
  ],
  [
    "/BR/precos",
    ({ status, html }) =>
      status === 200 && !html.includes('<html lang="pt-BR"')
        ? `expected no 200 with pt-PT copy, got 200 without <html lang="pt-BR"`
        : undefined,
  ],
  [
    "/br/precos",
    ({ html }) => (html.includes('<html lang="pt-BR"') ? undefined : 'missing <html lang="pt-BR"'),
  ],
  [
    "/precos",
    ({ html }) =>
      /<link[^>]*hreflang="pt-BR"[^>]*href="https:\/\/www\.scooli\.app\/br\/precos"/i.test(html)
        ? undefined
        : `missing hreflang="pt-BR" -> ${SITE}/br/precos`,
  ],
];

let failed = 0;
for (const [path, expected] of cases) {
  let error;
  let summary = "";
  try {
    const res = await fetch(BASE + path, { redirect: "manual" });
    const raw = res.headers.get("location");
    const location = raw ? new URL(raw, BASE).pathname : undefined;
    const html = res.status === 200 ? await res.text() : "";
    summary = `${res.status}${location ? ` -> ${location}` : ""}`;
    if (typeof expected === "function") {
      error = expected({ status: res.status, location, html });
    } else if (res.status !== expected.status || (expected.to && location !== expected.to)) {
      error = `expected ${expected.status}${expected.to ? ` -> ${expected.to}` : ""}, got ${summary}`;
    }
  } catch (e) {
    error = `request failed: ${e.message}`;
  }
  if (error) failed++;
  console.log(`${error ? "FAIL" : "PASS"}  ${path}  ${error ?? summary}`);
}

console.log(`\n${cases.length - failed}/${cases.length} passed against ${BASE}`);
process.exit(failed ? 1 : 0);
