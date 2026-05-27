# CLAUDE.md — JuriOne Landing Site

## Visão Geral do Projeto

**JuriOne** é um SaaS jurídico B2B brasileiro que automatiza a geração de documentos legais (petições, contestações, contratos) e análise de contratos com IA. Este repositório é o **site de marketing/landing page** — não a aplicação principal.

- **Aplicação principal:** `jurione.app.br`
- **Site de marketing:** `jurione.com.br` (este repositório)

---

## Stack Técnica

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 18 + TypeScript 5 |
| Build | Vite 5 + SWC |
| Roteamento | React Router DOM 6 |
| Estilização | Tailwind CSS 3 + CSS Variables |
| Componentes | shadcn/ui + Radix UI |
| Animações | Framer Motion 12 |
| Forms | React Hook Form + Zod |
| State (server) | TanStack React Query 5 |
| Ícones | Lucide React |
| Deploy | GitHub Pages + domínio customizado |

---

## Estrutura de Pastas

```
src/
├── pages/              # 6 páginas (Index, Afiliado, PrivacyPolicy, TermsOfUse, LGPD, NotFound)
├── components/
│   ├── landing/        # 16 seções da landing page
│   └── ui/             # 48 componentes shadcn/ui
├── lib/                # Utilitários (utils.ts)
├── hooks/              # Custom hooks React
├── services/           # api.ts — enviarContato()
├── config/             # site.ts — configurações globais
├── models/             # Interfaces e tipos de domínio
└── types/              # Tipos globais TypeScript
```

## Seções da Landing Page (Index.tsx)

Ordem de renderização:
1. `Header` — navbar com menu mobile
2. `Hero` — headline principal + CTA
3. `Stats` — métricas chave
4. `Features` — funcionalidades
5. `Apps` — módulos/aplicações disponíveis
6. `ProductDemo` — demonstração do produto
7. `AIHighlight` — showcase das capacidades de IA
8. `Benefits` — benefícios para o usuário
9. `Customization` — opções de personalização
10. `Testimonials` — depoimentos
11. `Pricing` — 4 planos (Básico R$180, Intermediário R$290, Profissional R$720, Empresarial R$2.800)
12. `FAQ` — perguntas frequentes
13. `Contact` — formulário de contato
14. `CTA` — chamada para ação final
15. `Footer` — rodapé com links

---

## Rotas

| Rota | Componente | Finalidade |
|------|-----------|-----------|
| `/` | Index.tsx | Landing page principal |
| `/afiliado` | Afiliado.tsx | Rastreamento de afiliados (`?ref=CODE`) |
| `/politica-privacidade` | PrivacyPolicy.tsx | Política de privacidade |
| `/termos-uso` | TermsOfUse.tsx | Termos de uso |
| `/lgpd` | LGPD.tsx | Conformidade LGPD |
| `*` | NotFound.tsx | 404 |

---

## Variáveis de Ambiente

Arquivo `.env` (desenvolvimento) e `.env.production`:

```
VITE_API_URL=http://localhost:3000/api
VITE_CONTACT_EMAIL=
VITE_PRIVACY_EMAIL=
VITE_LEGAL_EMAIL=
VITE_DPO_EMAIL=
VITE_CONTACT_PHONE=
VITE_COMPANY_LOCATION=
VITE_APP_URL=https://jurione.app.br
```

---

## Comandos Principais

```bash
npm run dev          # Dev server na porta 4002
npm run build        # Build de produção
npm run build:dev    # Build de desenvolvimento
npm run preview      # Preview do build
npm run lint         # Lint com ESLint
npm run deploy       # Deploy para GitHub Pages
```

---

## Sistema de Afiliados

- URL: `jurione.com.br/afiliado?ref=CODE`
- Valida o código (alfanumérico apenas)
- Registra evento no GTM
- Redireciona para `jurione.app.br/register?ref=CODE`
- Arquivo: `src/pages/Afiliado.tsx`

---

## Analytics & SEO

- **Google Analytics 4:** `G-YLZS2EYW0W`
- **GTM:** integrado para tracking de afiliados
- **Structured Data (JSON-LD):** Organization, SoftwareApplication, FAQPage
- **Sitemap:** `public/sitemap.xml`
- **robots.txt:** configurado na raiz

---

## Deploy

- **Plataforma:** GitHub Pages
- **Branch de deploy:** `gh-pages`
- **Domínio customizado:** `jurione.com.br` (via CNAME)
- **CI/CD:** GitHub Actions em push para `main`/`master`
- **Script manual:** `npm run deploy` → executa `deploy.js`

---

## Convenções de Código

- **Path alias:** `@/` → `src/`
- **Componentes:** PascalCase, arquivos `.tsx`
- **CSS:** Tailwind utility-first; CSS Variables para temas
- **Validação de forms:** Zod schemas
- **Tipos:** TypeScript em todos os arquivos; `strictNullChecks` desabilitado
- **Temas:** dark mode via classe `.dark` no root (next-themes)

---

## Fontes Tipográficas

- **Corpo:** `Inter` (400, 500, 600, 700, 800)
- **Display/Headings:** `Outfit` (600, 700, 800)

---

## Paleta de Cores (CSS Variables)

| Token | Uso |
|-------|-----|
| `--primary` | Azul principal (221 83% 53%) |
| `--secondary` | Cinza claro (215 20% 96%) |
| `--accent` | Dourado/Âmbar (39 100% 50%) |
| `--gradient-primary` | Azul → Roxo |
| `--gradient-gold` | Gradiente dourado |
| `--gradient-cta` | Azul → Ciano |

---

## Skills de Marketing

As estratégias de marketing digital do JuriOne estão documentadas em:

```
~/.claude/skills/marketing-jurione/
├── SKILL.md           # Índice e contexto geral
├── references/
│   ├── google-ads.md  # Campanhas Google Ads
│   ├── meta-ads.md    # Campanhas Meta (Facebook/Instagram)
│   ├── cold-outreach.md   # E-mail frio e LinkedIn
│   ├── criativos.md   # Headlines, copys e criativos
│   └── audiencias.md  # Customer Match e Custom Audiences
```

**ICP (Persona Primária):** Advogado autônomo ou sócio de escritório pequeno/médio, SP/RJ/MG/PR/SC, OAB ativa, que perde tempo com documentação repetitiva.

**Planos:**
- Básico: R$180/mês
- Intermediário: R$290/mês
- Profissional: R$720/mês
- Empresarial: R$2.800/mês
