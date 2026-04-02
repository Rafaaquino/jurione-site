import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, "..", "dist");
const indexFile = path.join(distDir, "index.html");

// Rotas conhecidas da SPA — cada uma recebe seu próprio index.html com canonical correto
const fallbackRoutes = [
  { route: "politica-privacidade", canonical: "https://jurione.com.br/politica-privacidade" },
  { route: "termos-uso",           canonical: "https://jurione.com.br/termos-uso" },
  { route: "lgpd",                 canonical: "https://jurione.com.br/lgpd" },
  { route: "afiliado",             canonical: "https://jurione.com.br/afiliado" },
];

const ensureIndexExists = () => {
  if (!fs.existsSync(indexFile)) {
    throw new Error(
      `index.html não encontrado em ${distDir}. Rode "npm run build" antes.`
    );
  }
};

const copyIndexWithCanonical = (targetPath, canonical) => {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  let html = fs.readFileSync(indexFile, "utf-8");
  // Substitui o canonical pela URL correta desta rota
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${canonical}" />`
  );
  fs.writeFileSync(targetPath, html, "utf-8");
};

const run = () => {
  ensureIndexExists();

  // 404.html — fallback do GitHub Pages para rotas não mapeadas (ex: deep links desconhecidos)
  // Sem canonical específico, usa a home como padrão (já definido no index.html original)
  fs.copyFileSync(indexFile, path.join(distDir, "404.html"));

  // Cria um index.html por rota com canonical correto para HTTP 200 e SEO
  fallbackRoutes.forEach(({ route, canonical }) => {
    const routeIndex = path.join(distDir, route, "index.html");
    copyIndexWithCanonical(routeIndex, canonical);
  });

  console.log(
    `✔️  Rotas estáticas geradas para: ${["404", ...fallbackRoutes.map(r => r.route)].join(", ")}`
  );
};

run();
