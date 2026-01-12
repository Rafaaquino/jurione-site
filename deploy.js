import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'dist');
const tempBranch = 'gh-pages-temp';

console.log('🚀 Iniciando deploy para GitHub Pages...\n');

try {
  // 1. Verificar se existe build
  if (!fs.existsSync(distPath)) {
    console.log('📦 Fazendo build...');
    execSync('npm run build', { stdio: 'inherit' });
  }

  // Verificar novamente após build
  if (!fs.existsSync(distPath) || fs.readdirSync(distPath).length === 0) {
    throw new Error('❌ Pasta dist está vazia ou não foi criada!');
  }

  console.log('✅ Build encontrado\n');

  // 2. Salvar branch atual
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
  console.log(`📍 Branch atual: ${currentBranch}\n`);

  // 3. Verificar se há mudanças não commitadas
  const status = execSync('git status --porcelain', { encoding: 'utf-8' });
  if (status) {
    console.log('⚠️  Você tem mudanças não commitadas. Faça commit antes de fazer deploy.\n');
    console.log(status);
    process.exit(1);
  }

  // 4. Criar/atualizar branch gh-pages
  console.log('🔄 Preparando branch gh-pages...');
  
  try {
    // Tentar fazer checkout da branch gh-pages existente
    execSync('git fetch origin gh-pages:gh-pages', { stdio: 'ignore' });
    execSync('git checkout gh-pages', { stdio: 'ignore' });
    console.log('✅ Branch gh-pages encontrada');
  } catch {
    // Se não existir, criar nova
    console.log('📝 Criando nova branch gh-pages...');
    execSync('git checkout --orphan gh-pages', { stdio: 'ignore' });
  }

  // 5. Limpar tudo da branch gh-pages
  console.log('🧹 Limpando branch gh-pages...');
  execSync('git rm -rf . || true', { stdio: 'ignore' });
  
  // Remover todos os arquivos (incluindo .gitignore temporariamente)
  const files = fs.readdirSync(__dirname);
  for (const file of files) {
    if (file !== '.git' && file !== 'dist' && file !== 'node_modules') {
      const filePath = path.join(__dirname, file);
      try {
        if (fs.statSync(filePath).isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        // Ignorar erros de arquivos que não podem ser deletados
      }
    }
  }

  // 6. Copiar arquivos do dist para a raiz
  console.log('📋 Copiando arquivos do build...');
  const distFiles = fs.readdirSync(distPath);
  
  for (const file of distFiles) {
    const srcPath = path.join(distPath, file);
    const destPath = path.join(__dirname, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  // 7. Criar .nojekyll
  fs.writeFileSync(path.join(__dirname, '.nojekyll'), '');
  console.log('✅ Arquivo .nojekyll criado');

  // 8. Adicionar tudo e fazer commit
  console.log('💾 Fazendo commit...');
  execSync('git add -A', { stdio: 'inherit' });
  
  try {
    execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'inherit' });
    console.log('✅ Commit realizado');
  } catch (err) {
    console.log('ℹ️  Nenhuma mudança para commitar');
  }

  // 9. Fazer push
  console.log('🚀 Fazendo push para gh-pages...');
  execSync('git push origin gh-pages --force', { stdio: 'inherit' });
  console.log('✅ Push realizado com sucesso!');

  // 10. Voltar para a branch original
  console.log(`\n🔙 Voltando para branch ${currentBranch}...`);
  execSync(`git checkout ${currentBranch}`, { stdio: 'ignore' });

  console.log('\n✨ Deploy concluído com sucesso!');
  console.log('\n📍 Seu site estará disponível em:');
  console.log('   https://rafaaquino.github.io/jurione-site/');
  console.log('\n⏱️  Aguarde alguns minutos para o GitHub processar o deploy.');

} catch (error) {
  console.error('\n❌ Erro durante o deploy:', error.message);
  
  // Tentar voltar para a branch original em caso de erro
  try {
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
    if (currentBranch === 'gh-pages') {
      execSync('git checkout main || git checkout master', { stdio: 'ignore' });
    }
  } catch {}
  
  process.exit(1);
}
