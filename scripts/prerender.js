import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  rmSync,
  copyFileSync,
  existsSync,
} from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const distDir = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");

/**
 * Rotas a pré-renderizar.
 * /afiliado é um redirect handler — não tem conteúdo, não é pré-renderizada.
 */
const routes = [
  {
    url: "/",
    outputDir: distDir,
    canonical: "https://jurione.com.br/",
  },
  {
    url: "/politica-privacidade",
    outputDir: resolve(distDir, "politica-privacidade"),
    canonical: "https://jurione.com.br/politica-privacidade",
  },
  {
    url: "/termos-uso",
    outputDir: resolve(distDir, "termos-uso"),
    canonical: "https://jurione.com.br/termos-uso",
  },
  {
    url: "/lgpd",
    outputDir: resolve(distDir, "lgpd"),
    canonical: "https://jurione.com.br/lgpd",
  },
];

async function prerender() {
  const ssrEntry = resolve(ssrDir, "entry-server.js");

  if (!existsSync(ssrEntry)) {
    throw new Error(
      `Bundle SSR não encontrado em ${ssrEntry}.\nCertifique-se de que o build SSR foi executado antes do postbuild.`
    );
  }

  const template = readFileSync(resolve(distDir, "index.html"), "utf-8");

  // Importa o bundle SSR gerado pelo Vite
  const { render } = await import(pathToFileURL(ssrEntry).href);

  for (const { url, outputDir, canonical } of routes) {
    let appHtml = "";

    try {
      appHtml = render(url);
    } catch (err) {
      console.warn(
        `⚠  Pré-renderização falhou para ${url}: ${err.message}\n   Usando shell vazio como fallback.`
      );
    }

    const html = template
      // Injeta o HTML renderizado no root
      .replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      )
      // Corrige o canonical para esta rota
      .replace(
        /<link rel="canonical" href="[^"]*"\s*\/>/,
        `<link rel="canonical" href="${canonical}" />`
      );

    mkdirSync(outputDir, { recursive: true });
    writeFileSync(resolve(outputDir, "index.html"), html, "utf-8");
    console.log(`✔  Pré-renderizado: ${url}`);
  }

  // 404.html — fallback do GitHub Pages para deep links desconhecidos
  copyFileSync(resolve(distDir, "index.html"), resolve(distDir, "404.html"));
  console.log("✔  Criado: 404.html");

  // Remove o bundle SSR temporário
  rmSync(ssrDir, { recursive: true, force: true });
  console.log("✔  Limpeza: dist-ssr/ removido");

  console.log("\n✅ Pré-renderização concluída para todas as rotas.");
}

prerender().catch((err) => {
  console.error("Erro na pré-renderização:", err);
  process.exit(1);
});
