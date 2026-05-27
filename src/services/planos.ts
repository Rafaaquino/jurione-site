const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface RecursosPlanoPublico {
  ia: boolean;
  api: boolean;
  backup: boolean;
  clientes: boolean;
  app_leads: boolean;
  app_notas: boolean;
  contratos: boolean;
  processos: boolean;
  app_prazos: boolean;
  relatorios: boolean;
  app_tarefas: boolean;
  app_timesheet: boolean;
  app_calendario: boolean;
  gestao_usuarios: boolean;
  app_calculadoras: boolean;
  suporte_dedicado: boolean;
  acesso_antecipado: boolean;
  modulo_financeiro: boolean;
  notificacoes_push: boolean;
  suporte_prioritario: boolean;
  app_proposta_comercial: boolean;
}

export interface LimitesPlanoPublico {
  ia_peticoes: number;
  api_requests: number;
  armazenamento: number;
  backup_automatico: boolean;
}

export interface PlanoPublico {
  id: string;
  nome: string;
  display_name: string;
  subtitulo: string | null;
  descricao: string;
  preco: number; // centavos
  limite_usuarios: number;
  recursos: RecursosPlanoPublico;
  limites: LimitesPlanoPublico;
  ia_tokens_mensais: number; // -1 = ilimitado
  ia_chamadas_estimadas: number;
  stripe_price_id: string;
  ordem: number;
  destaque: boolean;
  popular: boolean;
}

export async function fetchPlanosPublicos(): Promise<PlanoPublico[]> {
  const response = await fetch(`${API_URL}/planos/public`);
  if (!response.ok) throw new Error("Erro ao buscar planos");
  const json = await response.json();
  const data: PlanoPublico[] = Array.isArray(json) ? json : json.data ?? [];
  return data.filter((p) =>
    ["basico", "intermediario", "profissional", "empresarial"].includes(
      p.nome?.toLowerCase()
    )
  );
}
