/**
 * Tipos globais para o projeto
 */

// Google Tag Manager dataLayer
interface Window {
  dataLayer?: Array<{
    event: string;
    [key: string]: unknown;
  }>;
}
