# JuriOne Landing Page — Documentação de Funcionalidades

> Documento de referência para LLMs. Descreve toda a estrutura, fluxos, conteúdo e comportamentos do site `jurione.com.br`.
> **Atualizado em:** 2026-07-08 · **Versão:** 1.3

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
| `/campanha` | `Campanha.tsx` | Landing page focada em conversão para tráfego pago (Google Ads / Meta Ads) — sem Header/Footer da home, modal de cadastro rápido inline. O endpoint `POST /api/auth/cadastro-rapido` (backend) foi implementado para suportar esta rota. |
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
│   ├── Index.tsx             # Página principal (composição das 17 seções)
│   ├── Campanha.tsx          # Landing page de campanha (standalone, sem Header/Footer da home)
│   ├── Afiliado.tsx          # Fluxo de rastreamento de afiliados
│   ├── PrivacyPolicy.tsx     # Política de privacidade
│   ├── TermsOfUse.tsx        # Termos de uso
│   ├── LGPD.tsx              # Página LGPD
│   └── NotFound.tsx          # 404
├── components/
│   ├── landing/              # 17 seções da landing page
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── Features.tsx
│   │   ├── ImportAutomation.tsx  # NOVA — Integração CNJ & OAB
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
│   ├── api.ts                # enviarContato() → POST /api/contato · cadastroRapido()
│   └── planos.ts             # fetchPlanosPublicos() → GET /api/planos/publicos
├── hooks/
│   └── use-planos.ts         # usePlanos() — TanStack Query para planos públicos da API
├── models/                   # Interfaces de domínio
└── types/                    # Tipos globais TypeScript
```

---

## 5. Seções da Landing Page (Ordem de Renderização)

> A landing page agora possui **17 seções** (era 16). A nova seção `ImportAutomation` foi inserida entre `Features` e `Apps`.

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

### 5.5 ImportAutomation *(novo)*

Seção de integração CNJ & OAB com ID `#importacao`, inserida entre `Features` e `Apps`. Grid de **4 cards** com Framer Motion:

| Card | Descrição |
|------|-----------|
| Importação via CNJ | Informa o número CNJ e o sistema busca, cadastra e organiza o processo (partes, advogados, status, histórico) automaticamente |
| Importação em Massa via OAB | Digita o número OAB e importa todos os processos ativos de uma só vez — ideal para migração |
| Monitoramento Automático | Após importação, monitora cada processo e alerta sobre movimentações, prazos e publicações em tempo real |
| Clientes Importados Automaticamente | Durante a importação dos processos, identifica e cadastra os clientes vinculados automaticamente |

---

### 5.6 Apps *(era 5.5)*

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

### 5.7 ProductDemo *(era 5.6)*

- Player de vídeo embutido (`demo-sistema.mp4` em `/public`)
- Botão de play customizado com animação pulse
- Lista de 6 checkmarks de funcionalidades mostradas na demo
- Seção com ID `#demo` (alvo do link do Hero)

---

### 5.8 AIHighlight *(era 5.7)*

Seção de destaque das capacidades de IA com:

- **3 cards de benefício:**
  1. Economia de Tempo — geração automática de documentos
  2. Jurisprudência — busca e aplicação automatizada
  3. Múltiplas Áreas do Direito — civil, trabalhista, empresarial etc.
- Mock visual de interface de IA (chat/geração de petição)
- Copy focado em diferenciação por IA especializada em direito brasileiro

---

### 5.9 Benefits *(era 5.8)*

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

### 5.10 Customization *(era 5.9)*

Seção voltada para **escritórios médios e grandes** que precisam de solução white-label ou exclusiva:

- 4 cards de diferencial: domínio próprio, identidade visual, API exclusiva, suporte dedicado
- Mock visual de sistema com domínio customizado
- CTA para contato/negociação enterprise

---

### 5.11 Testimonials *(era 5.10)*

**3 depoimentos** de advogados fictícios com 5 estrelas:

| Nome | Perfil |
|------|--------|
| Dr. Ricardo Almeida | Advogado trabalhista |
| Dra. Carla Santos | Sócia de escritório |
| Dr. Fernando Costa | Advogado empresarial |

---

### 5.12 Pricing *(era 5.11 — carregamento dinâmico via API)*

Os planos **não são mais estáticos** — são carregados via `usePlanos()` → `GET /api/planos/publicos`. O componente renderiza **4 colunas** baseado nos planos ativos retornados pela API, ordenados pelo campo `ordem`.

**Estrutura de cada card de plano:**
- Nome de exibição (`display_name`) e subtítulo
- Preço em centavos ÷ 100, formatado em pt-BR
- Grupos de funcionalidades com status visual (`included` verde / `limited` amarelo / `unavailable` cinza):
  - **Core:** gestão de processos, clientes, contratos, notificações push, relatórios, gestão de usuários, financeiro
  - **Apps disponíveis:** 8 apps + acesso antecipado a novos apps
  - **IA:** tokens mensais formatados (ex.: "300k tokens/mês") ou "IA ilimitada"
  - **Limites:** usuários, armazenamento, API requests/mês, backup, suporte
- Legenda visual ao rodapé (incluído / limitado / não disponível)

**Botão CTA:** `redirectToSignup(planNome)` → abre `{systemUrl}/auth/signup?plan={nome}&source=landing_pricing&utm_source=landing_pricing&utm_campaign=paid_plan_pricing[&ref=CODE]` em nova aba. Propaga `?ref=CODE` se presente na URL.

**Seção "Plano Customizado"** (estática) com CTA que ancora para `#contato`.

---

### 5.13 FAQ *(era 5.12)*

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

### 5.14 Contact *(era 5.13)*

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

### 5.15 CTA *(era 5.14)*

- Seção de chamada para ação de encerramento
- Botão primário: "Começar Trial" → `jurione.app.br/register`
- Botão secundário: "Agendar Demonstração" → link externo de agendamento
- Fundo com gradiente azul/roxo

---

### 5.16 Footer *(era 5.15)*

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
| Hero | Headline "Pare de perder o controle do seu escritório", subheadline, CTAs, trust badges |
| Urgência | Banner de novos preços de lançamento (Básico R$180 · Intermediário R$290) |
| Stats | 4 métricas numéricas com gradiente (4h, 0 prazos, 3×, 100%) |
| Antes/Depois | Bloco de alerta "Prazo perdido = processo perdido" + comparativo 6×6 sem/com JuriOne |
| Importação CNJ/OAB *(novo)* | Grid 2×2 com 4 cards: Importação via CNJ, Importação em Massa via OAB, Monitoramento Automático, Clientes Importados Automaticamente |
| Chat com IA *(novo)* | Mock visual de chat com 4 capabilities + CTA "Testar o Chat com IA" |
| Funcionalidades | Grid 3×3 com 9 funcionalidades (3 destacadas: Controle de Prazos, Gestão de Processos, Chat com IA Jurídica) |
| Screenshot do sistema | Imagem `/tela-do-sistema.png` em frame de browser simulado |
| Como funciona | 3 passos numerados |
| Depoimentos | 3 cards com avatares iniciais e estrelas |
| Pricing | 4 planos carregados da API via `usePlanos()` — cada botão abre o modal com o plano pré-selecionado |
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
3. Sucesso → GTM `trial_signup` (com `office_name` no payload) → exibe tela de confirmação com countdown 3s → redireciona para `{VITE_API_SITE}/auth/login?email=EMAIL&source=campanha`
4. Erro email duplicado → exibe mensagem inline no modal (não fecha)
5. Modal fecha ao clicar fora ou pressionar `Escape`; enquanto `loading`, o fechamento é bloqueado

**Plano pré-selecionado:** cada botão de pricing passa o plano para o modal (`"trial"` | `"basico"` | `"intermediario"` | `"profissional"` | `"empresarial"`). O label mapeado é exibido no modal para reforçar a escolha:

| PlanName | Label exibido |
|----------|--------------|
| `trial` | Trial Gratuito (14 dias) |
| `basico` | Plano Básico — R$180/mês |
| `intermediario` | Plano Intermediário — R$290/mês |
| `profissional` | Plano Profissional — R$720/mês |
| `empresarial` | Plano Empresarial — R$2.800/mês |

### 6.3 Seção Chat com IA *(novo)*

Mock visual de assistente de IA jurídico com:
- Header do chat (avatar, título "JuriOne IA", status "Online")
- 2 pares de mensagem usuário/IA simulados (consulta de processos + geração de contestação)
- Barra de input ilustrativa
- **4 capabilities** listadas ao lado:
  1. Consulte seus dados em linguagem natural
  2. Gere documentos direto no chat
  3. Tire dúvidas jurídicas com contexto
  4. Relatórios e análises sob demanda
- CTA "Testar o Chat com IA" abre modal com plano `"trial"`

### 6.4 Pricing da Campanha — carregamento dinâmico *(mudança)*

Os planos agora são carregados da API via `usePlanos()` (mesmo hook da home) em vez de serem estáticos. Exibe **4 planos** ordenados pelo campo `ordem` retornado pela API, com spinner de loading durante a busca. Cada plano mostra features com status colorido e botão que abre o `CadastroModal` com o plano correspondente.

### 6.5 Eventos GTM da Página de Campanha

| Evento | Quando dispara | Payload |
|--------|---------------|---------|
| `signup_modal_open` | Ao abrir o modal | `{ plan_name, source: "campanha" }` |
| `trial_signup` | Cadastro concluído com sucesso | `{ plan_name, source: "campanha", office_name }` |
| `signup_error` | Erro no cadastro | `{ error_msg }` |
| `faq_click` | Clique em item do FAQ | `{ faq_question }` |

O evento `trial_signup` é o **key event** configurado no Google Ads para contabilizar conversões de campanha.

### 6.6 Endpoint de Backend

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

## 8. Serviços de API

### 8.1 `src/services/api.ts`

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

### 8.2 `src/services/planos.ts` *(novo)*

```typescript
// Busca planos públicos para exibição na landing page e campanha
fetchPlanosPublicos(): Promise<PlanoPublico[]>
// GET {VITE_API_URL}/planos/public
```

**Interface `PlanoPublico`** (retorno da API):

```typescript
interface PlanoPublico {
  id: string;
  nome: string;
  display_name: string;
  descricao?: string;
  subtitulo?: string;
  preco: number;          // centavos
  ordem: number;
  popular: boolean;
  destaque: boolean;
  stripe_price_id: string;
  limite_usuarios: number;
  ia_tokens_mensais: number;
  recursos: { [feature: string]: boolean };
  limites: {
    armazenamento: number;
    api_requests: number;
    backup_automatico: boolean;
  };
}
```

### 8.3 `src/hooks/use-planos.ts` *(novo)*

Hook TanStack Query que encapsula `fetchPlanosPublicos()` e transforma os dados brutos em `PlanoView[]` (formato pronto para renderização). Usado por `Pricing.tsx` (home) e `Campanha.tsx`.

```typescript
export function usePlanos(): UseQueryResult<PlanoView[], Error>
// queryKey: ["planos-publicos"]
// staleTime: 5 min · retry: 2
```

`PlanoView` inclui `grupos: FeatureGroup[]` já montados com `FeatureStatus` (`"included"` | `"limited"` | `"unavailable"`) e `limites: string` formatado para exibição.

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
| `VITE_API_URL` | URL base da API (usada em `enviarContato`, `cadastroRapido` e `fetchPlanosPublicos`) |
| `VITE_APP_URL` | URL da aplicação (`https://jurione.app.br`) — usada no `Pricing.tsx` (home) para redirects de signup |
| `VITE_API_SITE` | URL da aplicação usada especificamente na página `/campanha` para o redirect pós-cadastro |
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
| Cards de Pricing | `{systemUrl}/auth/signup?plan=PLANO&source=landing_pricing&utm_source=landing_pricing&utm_campaign=paid_plan_pricing[&ref=CODE]` (nova aba) |
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
| CTA "Testar o Chat com IA" | Abre modal de cadastro rápido (plano `trial`) |
| Botão plano Básico | Abre modal de cadastro rápido (plano `basico`) |
| Botão plano Intermediário | Abre modal de cadastro rápido (plano `intermediario`) |
| Botão plano Profissional | Abre modal de cadastro rápido (plano `profissional`) |
| Botão plano Empresarial | Abre modal de cadastro rápido (plano `empresarial`) |
| CTA final | Abre modal de cadastro rápido (plano `trial`) |
| Sucesso no modal | Redirect: `{VITE_API_SITE}/auth/login?email=EMAIL&source=campanha` |
| "Já tem conta? Entrar" | `{VITE_API_SITE}/auth/login` |
