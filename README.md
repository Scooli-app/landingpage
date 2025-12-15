# Scooli Marketing Site

Landing page e páginas legais para o domínio `www.scooli.app`, construída em Next.js (App Router), TypeScript, Tailwind e shadcn/ui com animações (Framer Motion) e um acento 3D leve no hero.

## Requisitos
- Node 18+
- npm

## Instalação
```bash
npm install
```

## Scripts
- `npm run dev` — desenvolvimento (Turbopack)
- `npm run lint` — validação eslint
- `npm run build` — build de produção
- `npm run start` — servir build

## Variáveis de ambiente
Crie `.env.local` se necessário:
```
NEXT_PUBLIC_SITE_URL=https://www.scooli.app
NEXT_PUBLIC_APP_URL=https://create.scooli.app
WAITLIST_DESTINATION=<opcional para forwarding futuro>
```

## Estrutura relevante
- `src/app/page.tsx` — homepage com todas as secções de marketing.
- `src/app/politica-de-privacidade`, `termos-de-utilizacao`, `cancelar-subscricao`, `billing` — páginas legais e faturação (placeholder).
- `src/app/api/waitlist/route.ts` — endpoint de lista de espera (stub in-memory).
- `src/components/*` — componentes de marketing (Hero, nav, grids, etc.).
- `src/content/legal/*.md` — conteúdos em Markdown facilmente editáveis.

## Notas de implementação
- Acento 3D leve apenas no hero, carregado dinamicamente e respeita `prefers-reduced-motion`.
- Animations via Framer Motion com variantes suaves e suporte a reduced motion.
- Legal pages renderizadas a partir de Markdown com layout dedicado.
- Navegação mobile com menu acessível.

## Deploy
Build padrão do Next (`npm run build`). Certifique-se que `NEXT_PUBLIC_SITE_URL` está definido no ambiente de produção para sitemap/robots corretos.
