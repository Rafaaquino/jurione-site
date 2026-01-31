#!/bin/bash

# Script de Otimização de Vídeo para Landing Page
# Requer FFmpeg instalado: https://ffmpeg.org/

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configurações
INPUT_VIDEO="public/videos/demo-sistema.mp4"
OUTPUT_DIR="public/videos"
TEMP_DIR="temp_video_processing"

# Verificar se FFmpeg está instalado
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}❌ FFmpeg não encontrado!${NC}"
    echo "Instale FFmpeg:"
    echo "  - Windows: https://www.gyan.dev/ffmpeg/builds/"
    echo "  - Mac: brew install ffmpeg"
    echo "  - Linux: sudo apt install ffmpeg"
    exit 1
fi

echo -e "${GREEN}✓ FFmpeg encontrado${NC}"

# Verificar se vídeo existe
if [ ! -f "$INPUT_VIDEO" ]; then
    echo -e "${RED}❌ Vídeo não encontrado: $INPUT_VIDEO${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Vídeo encontrado${NC}"

# Criar diretório temporário
mkdir -p "$TEMP_DIR"

# Obter informações do vídeo
echo -e "\n${YELLOW}📊 Informações do vídeo original:${NC}"
ffprobe -v error -show_entries format=duration,size,bit_rate -show_entries stream=width,height,codec_name -of default=noprint_wrappers=1 "$INPUT_VIDEO"

ORIGINAL_SIZE=$(stat -f%z "$INPUT_VIDEO" 2>/dev/null || stat -c%s "$INPUT_VIDEO" 2>/dev/null)
echo -e "Tamanho: $(numfmt --to=iec-i --suffix=B $ORIGINAL_SIZE 2>/dev/null || echo "$ORIGINAL_SIZE bytes")"

# 1. Comprimir para 1080p (Desktop)
echo -e "\n${YELLOW}🎬 Comprimindo para 1080p (Desktop)...${NC}"
ffmpeg -i "$INPUT_VIDEO" \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -y \
  "$TEMP_DIR/demo-sistema-1080p.mp4"

echo -e "${GREEN}✓ 1080p criado${NC}"

# 2. Comprimir para 720p (Mobile)
echo -e "\n${YELLOW}📱 Comprimindo para 720p (Mobile)...${NC}"
ffmpeg -i "$INPUT_VIDEO" \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
  -c:a aac \
  -b:a 96k \
  -movflags +faststart \
  -y \
  "$TEMP_DIR/demo-sistema-720p.mp4"

echo -e "${GREEN}✓ 720p criado${NC}"

# 3. Criar versão WebM (melhor compressão)
echo -e "\n${YELLOW}🌐 Criando versão WebM...${NC}"
ffmpeg -i "$INPUT_VIDEO" \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  -c:a libopus \
  -b:a 128k \
  -y \
  "$TEMP_DIR/demo-sistema.webm"

echo -e "${GREEN}✓ WebM criado${NC}"

# 4. Extrair thumbnail (frame aos 5 segundos)
echo -e "\n${YELLOW}🖼️  Extraindo thumbnail...${NC}"
ffmpeg -i "$INPUT_VIDEO" \
  -ss 00:00:05 \
  -vframes 1 \
  -q:v 2 \
  -y \
  "$TEMP_DIR/thumbnail.jpg"

# Converter para WebP
ffmpeg -i "$TEMP_DIR/thumbnail.jpg" \
  -quality 85 \
  -y \
  "$TEMP_DIR/demo-sistema-poster.webp"

echo -e "${GREEN}✓ Thumbnail criado${NC}"

# 5. Mostrar estatísticas
echo -e "\n${YELLOW}📊 Comparação de tamanhos:${NC}"
echo "----------------------------------------"

if [ -f "$TEMP_DIR/demo-sistema-1080p.mp4" ]; then
    SIZE_1080=$(stat -f%z "$TEMP_DIR/demo-sistema-1080p.mp4" 2>/dev/null || stat -c%s "$TEMP_DIR/demo-sistema-1080p.mp4" 2>/dev/null)
    REDUCTION_1080=$(echo "scale=2; (1 - $SIZE_1080 / $ORIGINAL_SIZE) * 100" | bc)
    echo -e "1080p MP4: $(numfmt --to=iec-i --suffix=B $SIZE_1080 2>/dev/null || echo "$SIZE_1080 bytes") (${REDUCTION_1080}% menor)"
fi

if [ -f "$TEMP_DIR/demo-sistema-720p.mp4" ]; then
    SIZE_720=$(stat -f%z "$TEMP_DIR/demo-sistema-720p.mp4" 2>/dev/null || stat -c%s "$TEMP_DIR/demo-sistema-720p.mp4" 2>/dev/null)
    REDUCTION_720=$(echo "scale=2; (1 - $SIZE_720 / $ORIGINAL_SIZE) * 100" | bc)
    echo -e "720p MP4:  $(numfmt --to=iec-i --suffix=B $SIZE_720 2>/dev/null || echo "$SIZE_720 bytes") (${REDUCTION_720}% menor)"
fi

if [ -f "$TEMP_DIR/demo-sistema.webm" ]; then
    SIZE_WEBM=$(stat -f%z "$TEMP_DIR/demo-sistema.webm" 2>/dev/null || stat -c%s "$TEMP_DIR/demo-sistema.webm" 2>/dev/null)
    REDUCTION_WEBM=$(echo "scale=2; (1 - $SIZE_WEBM / $ORIGINAL_SIZE) * 100" | bc)
    echo -e "WebM:      $(numfmt --to=iec-i --suffix=B $SIZE_WEBM 2>/dev/null || echo "$SIZE_WEBM bytes") (${REDUCTION_WEBM}% menor)"
fi

echo "----------------------------------------"

# 6. Perguntar se deseja substituir
echo -e "\n${YELLOW}❓ Deseja mover os arquivos otimizados para $OUTPUT_DIR?${NC}"
read -p "Digite 'sim' para confirmar: " confirm

if [ "$confirm" = "sim" ]; then
    # Backup do original
    echo -e "\n${YELLOW}💾 Criando backup do original...${NC}"
    cp "$INPUT_VIDEO" "$OUTPUT_DIR/demo-sistema-original.mp4"
    
    # Mover arquivos otimizados
    mv "$TEMP_DIR/demo-sistema-1080p.mp4" "$OUTPUT_DIR/"
    mv "$TEMP_DIR/demo-sistema-720p.mp4" "$OUTPUT_DIR/"
    mv "$TEMP_DIR/demo-sistema.webm" "$OUTPUT_DIR/"
    mv "$TEMP_DIR/demo-sistema-poster.webp" "$OUTPUT_DIR/"
    
    # Substituir o original pela versão 1080p
    cp "$OUTPUT_DIR/demo-sistema-1080p.mp4" "$INPUT_VIDEO"
    
    echo -e "${GREEN}✓ Arquivos movidos com sucesso!${NC}"
    echo -e "\nArquivos criados:"
    echo "  - $OUTPUT_DIR/demo-sistema.mp4 (1080p - principal)"
    echo "  - $OUTPUT_DIR/demo-sistema-1080p.mp4 (backup)"
    echo "  - $OUTPUT_DIR/demo-sistema-720p.mp4 (mobile)"
    echo "  - $OUTPUT_DIR/demo-sistema.webm (alternativa)"
    echo "  - $OUTPUT_DIR/demo-sistema-poster.webp (thumbnail)"
    echo "  - $OUTPUT_DIR/demo-sistema-original.mp4 (backup original)"
    
    # Atualizar componente
    echo -e "\n${YELLOW}📝 Próximo passo:${NC}"
    echo "Atualize o componente ProductDemo.tsx para usar o novo poster:"
    echo ""
    echo "  poster=\"/videos/demo-sistema-poster.webp\""
    echo ""
    echo "E adicione suporte para múltiplos formatos:"
    echo ""
    echo "  <source src=\"/videos/demo-sistema.webm\" type=\"video/webm\" />"
    echo "  <source src=\"/videos/demo-sistema.mp4\" type=\"video/mp4\" />"
else
    echo -e "${YELLOW}⚠️  Arquivos mantidos em $TEMP_DIR${NC}"
    echo "Revise os arquivos e execute novamente quando estiver pronto."
fi

# Limpar temporários se confirmado
if [ "$confirm" = "sim" ]; then
    rm -rf "$TEMP_DIR"
    echo -e "${GREEN}✓ Arquivos temporários removidos${NC}"
fi

echo -e "\n${GREEN}🎉 Otimização concluída!${NC}"
