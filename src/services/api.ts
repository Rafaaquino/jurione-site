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

export interface CadastroRapidoData {
  nomeEscritorio: string;
  nomeCompleto: string;
  email: string;
  senha: string;
  source?: string;
}

/**
 * Cadastro rápido via landing page de campanha (4 campos, sem confirmarSenha)
 */
export async function cadastroRapido(
  dados: CadastroRapidoData,
): Promise<ApiResponse> {
  const response = await fetch(`${API_URL}/auth/cadastro-rapido`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.error || "Erro ao criar conta");
    (err as any).code = data.code;
    (err as any).status = response.status;
    throw err;
  }

  return data;
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
