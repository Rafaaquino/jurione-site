# Script de Otimização de Vídeo para Landing Page (PowerShell)
# Requer FFmpeg instalado: https://ffmpeg.org/

$ErrorActionPreference = "Stop"

# Configurações
$INPUT_VIDEO = "public\videos\demo-sistema.mp4"
$OUTPUT_DIR = "public\videos"
$TEMP_DIR = "temp_video_processing"

# Cores para output
function Write-Success { Write-Host "✓ $args" -ForegroundColor Green }
function Write-Error-Custom { Write-Host "❌ $args" -ForegroundColor Red }
function Write-Info { Write-Host "📊 $args" -ForegroundColor Yellow }
function Write-Question { Write-Host "❓ $args" -ForegroundColor Cyan }

# Verificar se FFmpeg está instalado
try {
    $null = Get-Command ffmpeg -ErrorAction Stop
    Write-Success "FFmpeg encontrado"
} catch {
    Write-Error-Custom "FFmpeg não encontrado!"
    Write-Host "Instale FFmpeg:"
    Write-Host "  - Windows: https://www.gyan.dev/ffmpeg/builds/"
    Write-Host "  - Ou use: winget install Gyan.FFmpeg"
    exit 1
}

# Verificar se vídeo existe
if (-not (Test-Path $INPUT_VIDEO)) {
    Write-Error-Custom "Vídeo não encontrado: $INPUT_VIDEO"
    exit 1
}

Write-Success "Vídeo encontrado"

# Criar diretório temporário
New-Item -ItemType Directory -Force -Path $TEMP_DIR | Out-Null

# Obter informações do vídeo
Write-Info "Informações do vídeo original:"
ffprobe -v error -show_entries format=duration,size,bit_rate -show_entries stream=width,height,codec_name -of default=noprint_wrappers=1 $INPUT_VIDEO

$ORIGINAL_SIZE = (Get-Item $INPUT_VIDEO).Length
$ORIGINAL_SIZE_MB = [math]::Round($ORIGINAL_SIZE / 1MB, 2)
Write-Host "Tamanho: $ORIGINAL_SIZE_MB MB"

# 1. Comprimir para 1080p (Desktop)
Write-Info "`n🎬 Comprimindo para 1080p (Desktop)..."
ffmpeg -i $INPUT_VIDEO `
  -c:v libx264 `
  -preset slow `
  -crf 23 `
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" `
  -c:a aac `
  -b:a 128k `
  -movflags +faststart `
  -y `
  "$TEMP_DIR\demo-sistema-1080p.mp4"

Write-Success "1080p criado"

# 2. Comprimir para 720p (Mobile)
Write-Info "`n📱 Comprimindo para 720p (Mobile)..."
ffmpeg -i $INPUT_VIDEO `
  -c:v libx264 `
  -preset slow `
  -crf 23 `
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" `
  -c:a aac `
  -b:a 96k `
  -movflags +faststart `
  -y `
  "$TEMP_DIR\demo-sistema-720p.mp4"

Write-Success "720p criado"

# 3. Criar versão WebM (melhor compressão)
Write-Info "`n🌐 Criando versão WebM..."
ffmpeg -i $INPUT_VIDEO `
  -c:v libvpx-vp9 `
  -crf 30 `
  -b:v 0 `
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" `
  -c:a libopus `
  -b:a 128k `
  -y `
  "$TEMP_DIR\demo-sistema.webm"

Write-Success "WebM criado"

# 4. Extrair thumbnail (frame aos 5 segundos)
Write-Info "`n🖼️  Extraindo thumbnail..."
ffmpeg -i $INPUT_VIDEO `
  -ss 00:00:05 `
  -vframes 1 `
  -q:v 2 `
  -y `
  "$TEMP_DIR\thumbnail.jpg"

# Converter para WebP
ffmpeg -i "$TEMP_DIR\thumbnail.jpg" `
  -quality 85 `
  -y `
  "$TEMP_DIR\demo-sistema-poster.webp"

Write-Success "Thumbnail criado"

# 5. Mostrar estatísticas
Write-Info "`n📊 Comparação de tamanhos:"
Write-Host "----------------------------------------"

if (Test-Path "$TEMP_DIR\demo-sistema-1080p.mp4") {
    $SIZE_1080 = (Get-Item "$TEMP_DIR\demo-sistema-1080p.mp4").Length
    $SIZE_1080_MB = [math]::Round($SIZE_1080 / 1MB, 2)
    $REDUCTION_1080 = [math]::Round((1 - $SIZE_1080 / $ORIGINAL_SIZE) * 100, 2)
    Write-Host "1080p MP4: $SIZE_1080_MB MB ($REDUCTION_1080% menor)"
}

if (Test-Path "$TEMP_DIR\demo-sistema-720p.mp4") {
    $SIZE_720 = (Get-Item "$TEMP_DIR\demo-sistema-720p.mp4").Length
    $SIZE_720_MB = [math]::Round($SIZE_720 / 1MB, 2)
    $REDUCTION_720 = [math]::Round((1 - $SIZE_720 / $ORIGINAL_SIZE) * 100, 2)
    Write-Host "720p MP4:  $SIZE_720_MB MB ($REDUCTION_720% menor)"
}

if (Test-Path "$TEMP_DIR\demo-sistema.webm") {
    $SIZE_WEBM = (Get-Item "$TEMP_DIR\demo-sistema.webm").Length
    $SIZE_WEBM_MB = [math]::Round($SIZE_WEBM / 1MB, 2)
    $REDUCTION_WEBM = [math]::Round((1 - $SIZE_WEBM / $ORIGINAL_SIZE) * 100, 2)
    Write-Host "WebM:      $SIZE_WEBM_MB MB ($REDUCTION_WEBM% menor)"
}

Write-Host "----------------------------------------"

# 6. Perguntar se deseja substituir
Write-Question "`nDeseja mover os arquivos otimizados para $OUTPUT_DIR?"
$confirm = Read-Host "Digite 'sim' para confirmar"

if ($confirm -eq "sim") {
    # Backup do original
    Write-Info "`n💾 Criando backup do original..."
    Copy-Item $INPUT_VIDEO "$OUTPUT_DIR\demo-sistema-original.mp4"
    
    # Mover arquivos otimizados
    Move-Item "$TEMP_DIR\demo-sistema-1080p.mp4" $OUTPUT_DIR -Force
    Move-Item "$TEMP_DIR\demo-sistema-720p.mp4" $OUTPUT_DIR -Force
    Move-Item "$TEMP_DIR\demo-sistema.webm" $OUTPUT_DIR -Force
    Move-Item "$TEMP_DIR\demo-sistema-poster.webp" $OUTPUT_DIR -Force
    
    # Substituir o original pela versão 1080p
    Copy-Item "$OUTPUT_DIR\demo-sistema-1080p.mp4" $INPUT_VIDEO -Force
    
    Write-Success "`nArquivos movidos com sucesso!"
    Write-Host "`nArquivos criados:"
    Write-Host "  - $OUTPUT_DIR\demo-sistema.mp4 (1080p - principal)"
    Write-Host "  - $OUTPUT_DIR\demo-sistema-1080p.mp4 (backup)"
    Write-Host "  - $OUTPUT_DIR\demo-sistema-720p.mp4 (mobile)"
    Write-Host "  - $OUTPUT_DIR\demo-sistema.webm (alternativa)"
    Write-Host "  - $OUTPUT_DIR\demo-sistema-poster.webp (thumbnail)"
    Write-Host "  - $OUTPUT_DIR\demo-sistema-original.mp4 (backup original)"
    
    # Atualizar componente
    Write-Info "`n📝 Próximo passo:"
    Write-Host "Atualize o componente ProductDemo.tsx para usar o novo poster:"
    Write-Host ""
    Write-Host '  poster="/videos/demo-sistema-poster.webp"'
    Write-Host ""
    Write-Host "E adicione suporte para múltiplos formatos:"
    Write-Host ""
    Write-Host '  <source src="/videos/demo-sistema.webm" type="video/webm" />'
    Write-Host '  <source src="/videos/demo-sistema.mp4" type="video/mp4" />'
} else {
    Write-Host "⚠️  Arquivos mantidos em $TEMP_DIR" -ForegroundColor Yellow
    Write-Host "Revise os arquivos e execute novamente quando estiver pronto."
}

# Limpar temporários se confirmado
if ($confirm -eq "sim") {
    Remove-Item -Recurse -Force $TEMP_DIR
    Write-Success "Arquivos temporários removidos"
}

Write-Success "`n🎉 Otimização concluída!"
