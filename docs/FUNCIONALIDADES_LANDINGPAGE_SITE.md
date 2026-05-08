# JuriOne Landing Page — Documentação de Funcionalidades

> Documento de referência para LLMs. Descreve toda a estrutura, fluxos, conteúdo e comportamentos do site `jurione.com.br`.

---

## 1. O Que é Este Repositório

Site de marketing/landing page do **JuriOne** (`jurione.com.br`). É um site estático de apresentação do produto — **não** é a aplicação SaaS em si (que fica em `jurione.app.br`).

**Objetivo:** Converter visitantes (advogados e escritórios de advocacia) em leads qualificados e assinantes do plano trial.

---

## 2. Stack Técnica

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 18 + TypeScript 5 |
| Build | Vite 5 + SWC |
| Roteamento | React Router DOM 6 |
| Estilização | Tailwind CSS 3 + CSS Variables |
| Componentes | shadcn/ui + Radix UI |
| Animações | Framer Motion 12 |
| Formulários | React Hook Form + Zod |
| State server | TanStack React Query 5 |
| Ícones | Lucide React |
| Deploy | GitHub Pages + domínio customizado (`jurione.com.br`) |
| CI/CD | GitHub Actions (push para `main`/`master`) |

---

## 3. Rotas da Aplicação

| Rota | Componente | Finalidade |
|------|-----------|-----------|
| `/` | `Index.tsx` | Landing page principal — todas as seções de marketing |
| `/campanha` | `Campanha.tsx` | Landing page focada em conversão para tráfego pago (Google Ads / Meta Ads) — sem Header/Footer da home, modal de cadastro rápido inline |
| `/afiliado` | `Afiliado.tsx` | Recebe `?ref=CODE`, valida, dispara GTM e redireciona para o registro |
| `/politica-privacidade` | `PrivacyPolicy.tsx` | Política de privacidade completa |
| `/termos-uso` | `TermsOfUse.tsx` | Termos de uso do serviço |
| `/lgpd` | `LGPD.tsx` | Conformidade com a Lei Geral de Proteção de Dados |
| `*` | `NotFound.tsx` | Página 404 |

---

## 4. Estrutura de Pastas

```
src/
├── pages/
│   ├── Index.tsx             # Página principal (composição das 16 seções)
│   ├── Campanha.tsx          # Landing page de campanha (standalone, sem Header/Footer da home)
│   ├── Afiliado.tsx          # Fluxo de rastreamento de afiliados
│   ├── PrivacyPolicy.tsx     # Política de privacidade
│   ├── TermsOfUse.tsx        # Termos de uso
│   ├── LGPD.tsx              # Página LGPD
│   └── NotFound.tsx          # 404
├── components/
│   ├── landing/              # 16 seções da landing page
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── Features.tsx
│   │   ├── Apps.tsx
│   │   ├── ProductDemo.tsx
│   │   ├── AIHighlight.tsx
│   │   ├── Benefits.tsx
│   │   ├── Customization.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   ├── CTA.tsx
│   │   ├── Footer.tsx
│   │   └── LegalLayout.tsx
│   └── ui/                   # 48 componentes shadcn/ui
├── config/
│   └── site.ts               # Variáveis de contato lidas do .env
├── services/
│   └── api.ts                # enviarContato() → POST /api/contato
├── hooks/                    # Custom hooks React
├── models/                   # Interfaces de domínio
└── types/                    # Tipos globais TypeScript
```

---

## 5. Seções da Landing Page (Ordem de Renderização)

### 5.1 Header

- Navbar fixa no topo com logo JuriOne
- Menu de navegação desktop com links âncora para seções: Funcionalidades, Aplicativos, Demo, Preços, Contato
- Menu hambúrguer para mobile (Radix UI Sheet)
- Botão "Entrar" → redireciona para `jurione.app.br`
- Botão CTA "Começar Trial Grátis" → redireciona para `jurione.app.br/register`

---

### 5.2 Hero

- Headline principal: **"Sistema Jurídico com IA para Advogados"**
- Subheadline: descrição do produto com foco em automação de documentos, análise de contratos e gestão de processos
- Dois CTAs:
  - Primário: "Começar Trial Grátis" → `jurione.app.br/register`
  - Secundário: "Ver Demonstração" → ancora para `#demo`
- Trust badges visuais (ex.: "Sem cartão de crédito", "Cancelamento fácil", "LGPD")
- Animações de entrada com Framer Motion

---

### 5.3 Stats

Quatro métricas animadas (contador numérico com Framer Motion):

| Métrica | Valor |
|---------|-------|
| Módulos disponíveis | 8+ |
| Tokens IA/mês incluídos | 300 mil+ |
| Conformidade LGPD | 100% |
| Disponibilidade | 24/7 |

---

### 5.4 Features

Grid de **9 funcionalidades** do produto:

| Funcionalidade | Destaque |
|---------------|---------|
| Petições com IA | Sim (card destacado) |
| Gestão de Processos | — |
| Gestão de Clientes | — |
| Contratos Inteligentes | — |
| Módulo Financeiro | — |
| Relatórios Avançados | — |
| Calendário e Prazos | — |
| Notificações | — |
| Segurança Total | — |

---

### 5.5 Apps

**8 aplicativos** extras inclusos na plataforma, exibidos como cards com gradientes coloridos:

1. Bloco de Notas
2. Calculadoras Jurídicas
3. Calendário
4. Leads
5. Lista de Tarefas
6. Prazos e Compromissos
7. Proposta Comercial
8. Timesheet

---

### 5.6 ProductDemo

- Player de vídeo embutido (`demo-sistema.mp4` em `/public`)
- Botão de play customizado com animação pulse
- Lista de 6 checkmarks de funcionalidades mostradas na demo
- Seção com ID `#demo` (alvo do link do Hero)

---

### 5.7 AIHighlight

Seção de destaque das capacidades de IA com:

- **3 cards de benefício:**
  1. Economia de Tempo — geração automática de documentos
  2. Jurisprudência — busca e aplicação automatizada
  3. Múltiplas Áreas do Direito — civil, trabalhista, empresarial etc.
- Mock visual de interface de IA (chat/geração de petição)
- Copy focado em diferenciação por IA especializada em direito brasileiro

---

### 5.8 Benefits

Seção de benefícios com dois blocos:

**Comparativo Antes / Depois:**
- Antes: processos manuais, papel, planilhas, horas perdidas
- Depois: automação, centralizado, inteligente, rápido

**6 cards de benefício com estatísticas:**

| Benefício | Dado |
|-----------|------|
| Tempo economizado | 4h/dia |
| Redução de erros | 90% |
| Mais casos atendidos | 3x |
| Controle financeiro | 100% |
| Tudo em 1 plataforma | ✓ |
| Conformidade LGPD | ✓ |

---

### 5.9 Customization

Seção voltada para **escritórios médios e grandes** que precisam de solução white-label ou exclusiva:

- 4 cards de diferencial: domínio próprio, identidade visual, API exclusiva, suporte dedicado
- Mock visual de sistema com domínio customizado
- CTA para contato/negociação enterprise

---

### 5.10 Testimonials

**3 depoimentos** de advogados fictícios com 5 estrelas:

| Nome | Perfil |
|------|--------|
| Dr. Ricardo Almeida | Advogado trabalhista |
| Dra. Carla Santos | Sócia de escritório |
| Dr. Fernando Costa | Advogado empresarial |

---

### 5.11 Pricing

**3 planos de assinatura** + seção de plano personalizado:

| Plano | Preço/mês | Destaque |
|-------|-----------|---------|
| Básico | R$ 320 | — |
| Profissional | R$ 990 | "Mais Popular" |
| Empresarial | R$ 2.800 | Card featured/dourado |

- Cada card exibe lista de funcionalidades incluídas
- Botão "Assinar" redireciona para `jurione.app.br/register?plan=PLANO`
- Suporte a parâmetro de afiliado: se houver `?ref=CODE` na URL atual, ele é repassado para `jurione.app.br/register?plan=PLANO&ref=CODE`
- Seção "Plano Personalizado" com CTA para contato direto (empresas com necessidades customizadas)

---

### 5.12 FAQ

**8 perguntas frequentes** em componente Accordion (Radix UI):

1. O que é o JuriOne?
2. Como funciona a geração de petições com IA?
3. Quais tipos de documentos são suportados?
4. Meus dados são seguros?
5. Existe período de trial?
6. Qual o nível de suporte oferecido?
7. É possível migrar dados de outro sistema?
8. O sistema funciona no celular?

---

### 5.13 Contact

Formulário de contato com dois blocos:

**Formulário (React Hook Form + Zod):**

| Campo | Tipo | Obrigatório |
|-------|------|------------|
| Nome | text | Sim |
| E-mail | email | Sim |
| Telefone | text (máscara BR) | Não |
| Escritório | text | Não |
| Mensagem | textarea | Não |

- Submissão via `enviarContato()` → `POST {VITE_API_URL}/contato`
- Toast de sucesso/erro via Sonner

**Sidebar de contato direto:**
- E-mail: `contato@jurione.com.br`
- WhatsApp: `(11) 97835-4494`
- Endereço/Localização: via variável de ambiente

---

### 5.14 CTA (Final)

- Seção de chamada para ação de encerramento
- Botão primário: "Começar Trial" → `jurione.app.br/register`
- Botão secundário: "Agendar Demonstração" → link externo de agendamento
- Fundo com gradiente azul/roxo

---

### 5.15 Footer

- Logo e tagline do JuriOne
- Informações de contato (e-mail, telefone, localização — via `SITE_CONTACT`)
- Links legais:
  - Termos de Uso → `/termos-uso`
  - Política de Privacidade → `/politica-privacidade`
  - LGPD → `/lgpd`
- Placeholders para redes sociais (LinkedIn, Instagram)
- Copyright com ano dinâmico

---

## 6. Página de Campanha (`/campanha`)

Página standalone criada para receber tráfego pago (Google Ads, Meta Ads). **Não usa** o Header nem o Footer da home — cada elemento distrator removido aumenta a taxa de conversão.

### 6.1 Estrutura Visual (sem router, sem navegação interna)

| Bloco | Conteúdo |
|-------|---------|
| Nav mínimo | Logo + "Já tem conta? Entrar" + botão "Teste Grátis →" |
| Hero | Headline impactante, subheadline, CTA primário, trust badges |
| Urgência | Banner de condições especiais de lançamento |
| Stats | 4 métricas numéricas com gradiente (4h, 0 prazos, 3×, 100%) |
| Antes/Depois | Comparativo visual sem JuriOne × com JuriOne + bloco de prazo urgente |
| Funcionalidades | Grid 3×3 com 9 funcionalidades (3 destacadas como "Destaque") |
| Como funciona | 3 passos numerados |
| Depoimentos | 3 cards com avatares iniciais e estrelas |
| Pricing | 3 planos (Básico R$320 / Profissional R$990 / Empresarial R$2.800) — cada botão abre o modal de cadastro com o plano pré-selecionado |
| Garantia | Bloco de segurança "14 dias grátis, sem cartão, sem armadilha" |
| FAQ | 7 perguntas com accordion customizado (sem Radix UI — CSS puro) |
| CTA final | Seção de fechamento com botão de cadastro |
| Footer mínimo | Links legais apenas (Termos · Privacidade · LGPD) |

### 6.2 Modal de Cadastro Rápido (`CadastroModal`)

Abre inline na mesma página (sem redirecionar para `jurione.app.br`). 4 campos:

| Campo | Nome interno | Validação |
|-------|-------------|-----------|
| Nome do escritório | `nomeEscritorio` | min 3 chars |
| Seu nome completo | `nomeCompleto` | min 3 chars |
| E-mail profissional | `email` | formato e-mail |
| Senha | `senha` | min 8 chars + toggle Eye/EyeOff |

**Sem campo `confirmarSenha`** — removido intencionalmente para reduzir atrito e maximizar conversão. O usuário pode redefinir a senha a qualquer momento.

**Fluxo de submit:**
1. Validação client-side (inline, sem biblioteca de forms)
2. `POST {VITE_API_URL}/auth/cadastro-rapido` via `cadastroRapido()` de `api.ts`
3. Sucesso → GTM `trial_signup` → exibe tela de confirmação com countdown 3s → redireciona para `{VITE_APP_URL}/auth/login?email=EMAIL&source=campanha`
4. Erro email duplicado → exibe mensagem inline no modal (não fecha)

**Plano pré-selecionado:** cada botão de pricing passa o plano para o modal (`"trial"` | `"basico"` | `"profissional"` | `"empresarial"`). O label é exibido no modal para reforçar a escolha.

### 6.3 Eventos GTM da Página de Campanha

| Evento | Quando dispara | Payload |
|--------|---------------|---------|
| `signup_modal_open` | Ao abrir o modal | `{ plan_name, source: "campanha" }` |
| `trial_signup` | Cadastro concluído com sucesso | `{ plan_name, source: "campanha" }` |
| `signup_error` | Erro no cadastro | `{ error_msg }` |
| `faq_click` | Clique em item do FAQ | `{ faq_question }` |

O evento `trial_signup` é o **key event** configurado no Google Ads para contabilizar conversões de campanha.

### 6.4 Endpoint de Backend

`POST /api/auth/cadastro-rapido` — público, sem auth, com rate limit dedicado (5 req/15min por IP).

Cria em uma única transação: `Tenant` (status `TRIAL`, 14 dias) + `Usuario` (`ADMINISTRADOR`, `primeiro_acesso: true`) + `Assinatura` (status `trialing`).

---

## 7. Sistema de Afiliados

**Fluxo completo (`/afiliado?ref=CODE`):**

1. Usuário acessa `jurione.com.br/afiliado?ref=CODE`
2. `Afiliado.tsx` lê o parâmetro `ref` da URL
3. Valida o código: apenas alfanumérico (`/^[a-zA-Z0-9]+$/`)
4. Código inválido → redireciona para `jurione.app.br/register` (sem ref)
5. Código válido:
   - Dispara evento no Google Tag Manager (`gtm.affiliate_redirect` com `affiliate_code`)
   - Redireciona para `jurione.app.br/register?ref=CODE`
6. Durante o processo: exibe loading spinner com mensagem "Redirecionando..."

**Propagação de ref nos planos:**
- Se o visitante chegar com `?ref=CODE` na landing page, ao clicar em qualquer plano em `Pricing.tsx`, o código é repassado para `jurione.app.br/register?plan=PLANO&ref=CODE`

---

## 8. Serviço de API

**Arquivo:** `src/services/api.ts`

Duas funções exportadas:

```typescript
// Envia formulário de contato da home
enviarContato(dados: ContatoFormData): Promise<ApiResponse>
// POST {VITE_API_URL}/contato

// Cadastro rápido via modal da página /campanha
cadastroRapido(dados: CadastroRapidoData): Promise<ApiResponse>
// POST {VITE_API_URL}/auth/cadastro-rapido
```

**Interfaces de payload:**
```typescript
interface ContatoFormData {
  nome: string;
  email: string;
  telefone?: string;
  escritorio?: string;
  mensagem?: string;
}

interface CadastroRapidoData {
  nomeEscritorio: string;
  nomeCompleto: string;
  email: string;
  senha: string;
  source?: string;  // padrão: "campanha"
}
```

**Tratamento de erros em `cadastroRapido()`:** lança `Error` com `err.code = "EMAIL_ALREADY_EXISTS"` (HTTP 409) quando o e-mail já está cadastrado — o modal exibe mensagem inline sem fechar.

---

## 9. Configuração Global

**Arquivo:** `src/config/site.ts`

Exporta `SITE_CONTACT` com dados lidos das variáveis de ambiente:

```typescript
SITE_CONTACT = {
  contactEmail,   // VITE_CONTACT_EMAIL
  privacyEmail,   // VITE_PRIVACY_EMAIL
  legalEmail,     // VITE_LEGAL_EMAIL
  dpoEmail,       // VITE_DPO_EMAIL
  phone,          // VITE_CONTACT_PHONE
  location,       // VITE_COMPANY_LOCATION
}
```

---

## 10. Variáveis de Ambiente

| Variável | Uso |
|----------|-----|
| `VITE_API_URL` | URL base da API (usada em `enviarContato` e `cadastroRapido`) |
| `VITE_APP_URL` | URL da aplicação (`https://jurione.app.br`) — usada nos redirects da campanha |
| `VITE_CONTACT_EMAIL` | E-mail de contato exibido no site |
| `VITE_PRIVACY_EMAIL` | E-mail para solicitações de privacidade |
| `VITE_LEGAL_EMAIL` | E-mail jurídico |
| `VITE_DPO_EMAIL` | E-mail do DPO (LGPD) |
| `VITE_CONTACT_PHONE` | Telefone de contato |
| `VITE_COMPANY_LOCATION` | Endereço da empresa |

---

## 11. Analytics e SEO

| Item | Detalhe |
|------|---------|
| Google Analytics 4 | ID: `G-YLZS2EYW0W` |
| Google Tag Manager | Integrado — tracking de afiliados e eventos de campanha (`trial_signup`, `signup_modal_open`, `signup_error`, `faq_click`) |
| Structured Data | JSON-LD: `Organization`, `SoftwareApplication`, `FAQPage` |
| Sitemap | `public/sitemap.xml` |
| robots.txt | Configurado na raiz |
| SSR/Prerender | `scripts/prerender.js` gera HTML estático no build (`postbuild`) |

---

## 12. Design System

### Tipografia

| Fonte | Pesos | Uso |
|-------|-------|-----|
| Inter | 400, 500, 600, 700, 800 | Corpo de texto |
| Outfit | 600, 700, 800 | Títulos e display |

### Paleta de Cores (CSS Variables)

| Token | Valor HSL | Uso |
|-------|-----------|-----|
| `--primary` | 221 83% 53% | Azul principal |
| `--secondary` | 215 20% 96% | Cinza claro |
| `--accent` | 39 100% 50% | Dourado/Âmbar |
| `--gradient-primary` | Azul → Roxo | Fundos de destaque |
| `--gradient-gold` | Gradiente dourado | Cards Empresarial |
| `--gradient-cta` | Azul → Ciano | Seções de CTA |

### Tema

- Dark mode suportado via classe `.dark` no root (next-themes)
- Padrão: light mode

---

## 13. Deploy e Infraestrutura

| Item | Detalhe |
|------|---------|
| Plataforma | GitHub Pages |
| Branch de deploy | `gh-pages` |
| Domínio | `jurione.com.br` via CNAME |
| CI/CD | GitHub Actions — push para `main`/`master` |
| Deploy manual | `npm run deploy` → executa `deploy.js` |
| Build produção | `npm run build` → Vite + prerender SSR |

---

## 14. Páginas Legais

Todas renderizadas via `LegalLayout.tsx` (wrapper com navegação e rodapé simples):

| Página | Rota | Conteúdo |
|--------|------|---------|
| Política de Privacidade | `/politica-privacidade` | Coleta de dados, cookies, direitos do titular |
| Termos de Uso | `/termos-uso` | Condições de uso do serviço, SLA, responsabilidades |
| LGPD | `/lgpd` | Base legal, DPO, exercício de direitos, prazos |

---

## 15. ICP e Proposta de Valor

**Persona Principal:**
- Advogado autônomo ou sócio de escritório pequeno/médio
- Localização: SP, RJ, MG, PR, SC
- OAB ativa
- Dor: perde 4h/dia em documentação repetitiva

**Proposta de Valor:**
- Geração de petições, contratos e contestações com IA especializada em direito brasileiro
- Gestão centralizada de processos, clientes, financeiro e agenda
- Trial gratuito, sem cartão de crédito
- 100% LGPD compliant
- White-label / customização para escritórios enterprise

---

## 16. Pontos de Entrada para Conversão

### Home (`/`)

| Ponto | Destino |
|-------|---------|
| Header "Começar Trial" | `jurione.app.br/register` |
| Hero CTA primário | `jurione.app.br/register` |
| Cards de Pricing | `jurione.app.br/register?plan=PLANO[&ref=CODE]` |
| Seção CTA final | `jurione.app.br/register` |
| Sistema de Afiliados | `jurione.app.br/register?ref=CODE` |
| Header "Entrar" | `jurione.app.br` (login existente) |
| Formulário de Contato | `POST /api/contato` (lead para o time comercial) |

### Campanha (`/campanha`) — tráfego pago

| Ponto | Destino |
|-------|---------|
| Nav "Teste Grátis →" | Abre modal de cadastro rápido (plano `trial`) |
| Hero CTA primário | Abre modal de cadastro rápido (plano `trial`) |
| "Ver Planos e Preços" | Âncora `#planos` (rolagem suave, sem redirecionar) |
| Botão plano Básico | Abre modal de cadastro rápido (plano `basico`) |
| Botão plano Profissional | Abre modal de cadastro rápido (plano `profissional`) |
| Botão plano Empresarial | Abre modal de cadastro rápido (plano `empresarial`) |
| CTA final | Abre modal de cadastro rápido (plano `trial`) |
| Sucesso no modal | Redirect: `jurione.app.br/auth/login?email=EMAIL&source=campanha` |
| "Já tem conta? Entrar" | `jurione.app.br/auth/login` |
