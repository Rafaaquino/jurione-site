import { execSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import ghpages from "gh-pages";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "dist");
const customDomain = "jurione.com.br";

const run = (command) => execSync(command, { stdio: "inherit" });

const hasFiles = (dir) => fs.existsSync(dir) && fs.readdirSync(dir).length > 0;

const cleanDist = () => {
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
  }
};

const ensureGhPagesBranch = () => {
  let branchExists = true;
  try {
    execSync("git ls-remote --exit-code origin gh-pages", {
      stdio: "ignore",
    });
  } catch {
    branchExists = false;
    console.log("ℹ️  Branch gh-pages não encontrada no remoto. Será criada.");

    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "gh-pages-init-"));
    console.log(`🛠️  Criando branch gh-pages em worktree temporária: ${tmp}`);

    // Cria worktree destacada e inicializa commit vazio
    execSync(`git worktree add "${tmp}" -b gh-pages`, { stdio: "inherit" });
    fs.writeFileSync(path.join(tmp, ".nojekyll"), "");

    execSync(`git -C "${tmp}" add .nojekyll`, { stdio: "inherit" });
    execSync(`git -C "${tmp}" commit -m "chore: init gh-pages branch"`, {
      stdio: "inherit",
    });
    execSync(`git -C "${tmp}" push -u origin gh-pages`, {
      stdio: "inherit",
    });
    execSync(`git worktree remove "${tmp}" --force`, { stdio: "inherit" });
  }

  return branchExists;
};

console.log("🚀 Build + deploy para gh-pages (somente dist)\n");

try {
  ensureGhPagesBranch();

  console.log("📦 Gerando build limpo...");
  cleanDist();
  run("npm run build");

  if (!hasFiles(distPath)) {
    throw new Error("Pasta dist não foi gerada ou está vazia.");
  }

  // Garante suporte a caminhos aninhados (sem _site do Jekyll)
  fs.writeFileSync(path.join(distPath, ".nojekyll"), "");
  fs.writeFileSync(path.join(distPath, "CNAME"), `${customDomain}\n`);

  console.log("🌐 Publicando em gh-pages sem trocar de branch local...");
  ghpages.publish(
    distPath,
    {
      branch: "gh-pages",
      dotfiles: true,
      message: "Deploy para GitHub Pages (dist apenas)",
      history: false,
    },
    (err) => {
      if (err) {
        console.error("\n❌ Falha ao publicar:", err.message);
        process.exit(1);
      }

      console.log(
        "✅ Deploy concluído. Conteúdo enviado apenas da pasta dist."
      );
      console.log("🔗 Site: https://rafaaquino.github.io/jurione-site/");
    }
  );
} catch (error) {
  console.error("\n❌ Erro durante o deploy:", error.message);
  process.exit(1);
}
