/**
 * Serviço de API para comunicação com o backend
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface ContatoFormData {
  nome: string;
  email: string;
  telefone?: string;
  escritorio?: string;
  mensagem?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  code?: string;
}

/**
 * Enviar formulário de contato
 */
export async function enviarContato(
  dados: ContatoFormData,
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_URL}/contato`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro ao enviar mensagem");
    }

    return data;
  } catch (error) {
    console.error("Erro ao enviar contato:", error);
    throw error;
  }
}
