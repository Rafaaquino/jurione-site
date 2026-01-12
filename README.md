# JuriOne - Landing Page

Landing page moderna e responsiva para o sistema jurídico JuriOne, desenvolvida com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

Este projeto utiliza as seguintes tecnologias:

- **React 18.3.1** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite 5.4.19** - Build tool rápida e moderna (com SWC)
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI baseados em Radix UI
- **Framer Motion** - Biblioteca de animações
- **React Router DOM** - Roteamento client-side
- **TanStack React Query** - Gerenciamento de estado de servidor
- **React Hook Form + Zod** - Validação de formulários
- **Lucide React** - Biblioteca de ícones

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** versão 18 ou superior
- **npm** ou **yarn** ou **pnpm**
- (Opcional) **nvm** para gerenciar versões do Node.js

### Instalando Node.js com nvm (Recomendado)

```bash
# Windows (usando nvm-windows)
# Baixe em: https://github.com/coreybutler/nvm-windows/releases

# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Instalar Node.js LTS
nvm install --lts
nvm use --lts
```

## 🔧 Instalação e Execução Local

### 1. Clone o repositório

```bash
# Se ainda não tiver clonado
git clone <YOUR_GIT_URL>
cd landingpage-v2
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Execute o servidor de desenvolvimento

```bash
npm run dev
```

O servidor iniciará em `http://localhost:8080` (configurado no `vite.config.ts`).

A aplicação será recarregada automaticamente quando você modificar os arquivos.

### 4. Build para produção

```bash
# Build de produção
npm run build

# Build de desenvolvimento
npm run build:dev

# Preview da build de produção
npm run preview
```

## 📜 Scripts Disponíveis

| Script              | Descrição                                             |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Inicia o servidor de desenvolvimento na porta 8080    |
| `npm run build`     | Cria uma build de produção otimizada na pasta `dist/` |
| `npm run build:dev` | Cria uma build de desenvolvimento                     |
| `npm run preview`   | Preview local da build de produção                    |
| `npm run lint`      | Executa o ESLint para verificar o código              |

## 📁 Estrutura do Projeto

```
landingpage-v2/
├── src/
│   ├── components/
│   │   ├── landing/              # Componentes da landing page
│   │   │   ├── Header.tsx        # Navegação principal
│   │   │   ├── Hero.tsx          # Seção hero com CTA principal
│   │   │   ├── Stats.tsx         # Estatísticas com contadores animados
│   │   │   ├── Features.tsx      # Grid de funcionalidades
│   │   │   ├── AIHighlight.tsx   # Destaque para IA
│   │   │   ├── Testimonials.tsx  # Depoimentos de clientes
│   │   │   ├── Pricing.tsx       # Seção de planos e preços
│   │   │   ├── FAQ.tsx           # Perguntas frequentes
│   │   │   ├── CTA.tsx           # Call-to-action final
│   │   │   └── Footer.tsx        # Rodapé
│   │   ├── ui/                   # Componentes shadcn/ui (50+ componentes)
│   │   └── NavLink.tsx           # Componente de navegação
│   ├── pages/
│   │   ├── Index.tsx             # Página principal
│   │   └── NotFound.tsx          # Página 404
│   ├── hooks/
│   │   ├── use-mobile.tsx        # Hook para detectar mobile
│   │   └── use-toast.ts          # Hook para notificações
│   ├── lib/
│   │   └── utils.ts              # Funções utilitárias (cn helper)
│   ├── App.tsx                   # Componente raiz com providers
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Estilos globais e CSS variables
├── public/                       # Arquivos estáticos
├── dist/                         # Build de produção (gerado)
├── vite.config.ts               # Configuração do Vite
├── tailwind.config.ts           # Configuração do Tailwind
├── tsconfig.json                # Configuração do TypeScript
└── package.json                 # Dependências e scripts
```

## ✨ Funcionalidades

### 🎨 Design System

- **Sistema de cores** com CSS Variables (suporte a modo claro/escuro)
- **Gradientes customizados** (primary, CTA, gold, hero)
- **Tipografia** com fontes Inter (UI) e Outfit (Display)
- **Componentes acessíveis** baseados em Radix UI
- **Design responsivo** mobile-first

### 🧩 Componentes da Landing Page

1. **Header**

   - Navegação fixa com backdrop blur
   - Menu mobile responsivo com animações
   - Links de navegação suaves (smooth scroll)
   - Botões de CTA (Entrar e Teste Grátis)

2. **Hero**

   - Headline impactante com gradiente
   - Badge destacando IA especializada
   - CTAs principais (Comece Grátis e Ver Demo)
   - Trust badges (Sem cartão, Setup rápido, LGPD)
   - Ícones flutuantes animados (apenas desktop)

3. **Stats**

   - Contadores animados ao scroll
   - 4 métricas principais do produto
   - Animação de incremento numérico

4. **Features**

   - Grid de 9 funcionalidades principais
   - Ícones e descrições detalhadas
   - Destaque especial para "Petições com IA"
   - Animações de entrada em cascata

5. **AI Highlight**

   - Destaque visual da IA
   - Mockup de interface da IA
   - Lista de benefícios
   - CTA específico para testar IA

6. **Testimonials**

   - Grid de 3 depoimentos
   - Avaliações com estrelas
   - Fotos e informações dos clientes
   - Animações de entrada

7. **Pricing**

   - Integração com API de planos (`/api/planos/public`)
   - Fallback para planos estáticos
   - Badge "Mais Popular" no plano destacado
   - Comparação de recursos por plano
   - Loading state durante fetch

8. **FAQ**

   - Accordion interativo
   - 8 perguntas frequentes
   - Respostas detalhadas sobre o produto

9. **CTA Final**

   - Seção com gradiente chamativo
   - CTAs duplos (Trial e Demonstração)
   - Badges de confiança

10. **Footer**
    - Links organizados por categoria
    - Informações de contato
    - Redes sociais
    - Copyright

### 🎭 Animações

- **Framer Motion** para animações suaves
- Scroll reveal (elementos aparecem ao scrollar)
- Transições entre estados
- Animações de hover
- Contadores animados
- Ícones flutuantes

### 🔌 Integrações

- **API de Planos**: Integração com backend em `http://localhost:3000/api/planos/public`
- **Fallback**: Planos estáticos caso a API não esteja disponível
- Pronto para integração com formulários de cadastro

### ♿ Acessibilidade

- Componentes Radix UI com acessibilidade nativa
- Navegação por teclado
- ARIA labels
- HTML semântico
- Contraste adequado

### 📱 Responsividade

- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Menu mobile com animações
- Layout adaptativo em todas as seções

### 🔍 SEO

- Meta tags otimizadas no `index.html`
- Open Graph configurado
- Meta description
- Estrutura semântica HTML
- Canonical URL

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (se necessário):

```env
VITE_API_URL=http://localhost:3000
```

### Porta do Servidor

A porta padrão é `8080`, configurada em `vite.config.ts`. Para alterar:

```typescript
// vite.config.ts
server: {
  port: 3000, // Sua porta preferida
}
```

### Path Aliases

O projeto usa aliases TypeScript configurados:

- `@/` → `src/`
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`

## 🛠️ Desenvolvimento

### Adicionar Novos Componentes UI

Este projeto usa **shadcn/ui**. Para adicionar componentes:

```bash
npx shadcn-ui@latest add [component-name]
```

### Estrutura de Componentes

```typescript
// Exemplo de componente
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Conteúdo */}
    </motion.div>
  );
}
```

### Utilitários

O projeto inclui a função `cn()` para merge de classes:

```typescript
import { cn } from "@/lib/utils";

<div className={cn("base-class", condition && "conditional-class")} />;
```

## 📦 Build e Deploy

### Build de Produção

```bash
npm run build
```

O build será gerado na pasta `dist/` e pode ser servido por qualquer servidor estático (Nginx, Vercel, Netlify, etc.).

### Deploy no GitHub Pages

A landing page está configurada para deploy automático no GitHub Pages com domínio customizado `jurione.com.br`.

#### Configuração Inicial

1. **Habilitar GitHub Pages no repositório:**

   - Vá em **Settings** → **Pages**
   - Em **Source**, selecione **"GitHub Actions"**
   - Salve as configurações

2. **Configurar domínio customizado:**

   - Em **Settings** → **Pages** → **Custom domain**
   - Digite: `jurione.com.br`
   - Marque **"Enforce HTTPS"**
   - Salve

3. **Configurar DNS no seu provedor:**

   - Adicione um registro **CNAME** apontando para: `seu-usuario.github.io`
   - Ou adicione registros **A** com os IPs do GitHub Pages:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

4. **Fazer push para o branch main:**

   ```bash
   git add .
   git commit -m "feat: configura deploy automático"
   git push origin main
   ```

5. **Verificar o deploy:**
   - Vá em **Actions** no GitHub
   - O workflow será executado automaticamente
   - Após o deploy, acesse `https://jurione.com.br`

#### URLs Configuradas

- **Landing Page**: `https://jurione.com.br`
- **Aplicação Principal**: `https://jurione.app.br`
- **Botão "Entrar"**: Redireciona para `https://jurione.app.br/auth/login`
- **Botão "Teste Grátis"**: Redireciona para `https://jurione.app.br/auth/signup`

### Outras Opções de Deploy

- **Vercel**: Integração direta com Git
- **Netlify**: Deploy automático
- **Nginx**: Servidor próprio

## 🐛 Troubleshooting

### Erro ao instalar dependências

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Porta já em uso

Altere a porta no `vite.config.ts` ou mate o processo:

```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8080 | xargs kill -9
```

### Build falha

```bash
# Verificar erros de TypeScript
npm run build

# Verificar lint
npm run lint
```

### Erro de proteção do ambiente no GitHub Pages

Se você receber o erro:

```
Branch "master" is not allowed to deploy to github-pages due to environment protection rules.
```

**Solução:**

1. **Remover proteções do ambiente:**

   - Vá em **Settings** → **Environments**
   - Clique no ambiente **"github-pages"**
   - Em **"Deployment branches"**, selecione **"All branches"** ou adicione `main` e `master` manualmente
   - Em **"Required reviewers"**, remova qualquer aprovação necessária (se houver)
   - Salve as alterações

2. **Alternativa - Usar apenas branch main:**

   - Se preferir, você pode renomear o branch `master` para `main`:

   ```bash
   git branch -m master main
   git push -u origin main
   ```

   - E atualizar o workflow para usar apenas `main` (já está configurado)

3. **Verificar permissões:**
   - Vá em **Settings** → **Actions** → **General**
   - Em **"Workflow permissions"**, certifique-se de que está marcado **"Read and write permissions"**
   - Salve as alterações

## 📝 Próximos Passos

- [ ] Integração completa com API de cadastro
- [ ] Formulário de cadastro com validação
- [ ] Integração com Stripe para checkout
- [ ] Página de login
- [ ] Analytics (Google Analytics, etc.)
- [ ] Testes automatizados
- [ ] CI/CD pipeline

## 📄 Licença

Este projeto é privado e propriedade da JuriOne.

## 🤝 Suporte

Para dúvidas ou suporte, entre em contato:

- Email: contato@jurione.com.br
- Documentação: [Adicionar link quando disponível]

---

Desenvolvido com ❤️ para JuriOne
