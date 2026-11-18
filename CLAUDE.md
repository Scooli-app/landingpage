## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Mapa de funcionalidades

- Antes de fazer brainstorming, planear ou desenhar uma funcionalidade, usa a skill `before-building`; sem ela, segue `../scooli-map/AGENTS.md`. Em sessões remotas, clona `Scooli-app/scooli-map` ao lado deste repo se não existir; se for impossível, diz que o mapa não está disponível e continua.
- Ao criar uma funcionalidade nova, adiciona o respetivo ficheiro ao `scooli-map` (carimbar, atualizar o índice, correr o check e fazer push para a `main` do `scooli-map`).
- Nunca leias o `graphify-out/GRAPH_REPORT.md` inteiro; usa `graphify query`, `path` ou `explain`.
