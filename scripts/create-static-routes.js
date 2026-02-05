import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, "..", "dist");
const indexFile = path.join(distDir, "index.html");

const fallbackRoutes = [
  "politica-privacidade",
  "termos-uso",
  "lgpd",
];

const ensureIndexExists = () => {
  if (!fs.existsSync(indexFile)) {
    throw new Error(
      `index.html não encontrado em ${distDir}. Rode "npm run build" antes.`
    );
  }
};

const copyIndexTo = (targetPath) => {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(indexFile, targetPath);
};

const run = () => {
  ensureIndexExists();

  // Cria um 404.html que devolve a mesma shell da SPA,
  // evitando erro de deep link no GitHub Pages.
  copyIndexTo(path.join(distDir, "404.html"));

  // Cria um index.html por rota conhecida para garantir HTTP 200.
  fallbackRoutes.forEach((route) => {
    const routeIndex = path.join(distDir, route, "index.html");
    copyIndexTo(routeIndex);
  });

  console.log(
    `✔️  Rotas estáticas geradas para: ${[
      "404",
      ...fallbackRoutes,
    ].join(", ")}`
  );
};

run();
