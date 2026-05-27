import { useQuery } from "@tanstack/react-query";
import { fetchPlanosPublicos, type PlanoPublico } from "@/services/planos";

export type FeatureStatus = "included" | "limited" | "unavailable";

export interface FeatureItem {
  label: string;
  status: FeatureStatus;
  note?: string;
}

export interface FeatureGroup {
  title: string;
  features: FeatureItem[];
}

export interface PlanoView {
  id: string;
  nome: string;
  display_name: string;
  subtitulo: string;
  preco: number; // centavos
  popular: boolean;
  destaque: boolean;
  stripe_price_id: string;
  grupos: FeatureGroup[];
  limites: string;
  ia_tokens_mensais: number;
  limite_usuarios: number;
}

function formatTokens(tokens: number): string {
  if (tokens === -1) return "ilimitados";
  if (tokens >= 1_000_000)
    return `${(tokens / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M tokens/mês`;
  return `${Math.round(tokens / 1_000)}k tokens/mês`;
}

function s(flag: boolean): FeatureStatus {
  return flag ? "included" : "unavailable";
}
function sLim(flag: boolean): FeatureStatus {
  return flag ? "included" : "limited";
}
function gestaoUsuariosStatus(
  flag: boolean,
  users: number
): FeatureStatus {
  if (!flag || users <= 1) return "unavailable";
  if (users <= 3) return "limited";
  return "included";
}

function buildGrupos(p: PlanoPublico): FeatureGroup[] {
  const r = p.recursos;
  const tokens = p.ia_tokens_mensais;

  const iaStatus: FeatureStatus = !r.ia
    ? "unavailable"
    : tokens === -1
    ? "included"
    : "limited";
  const iaNote =
    r.ia && tokens !== -1 && tokens > 0 ? formatTokens(tokens) : undefined;

  return [
    {
      title: "Core",
      features: [
        { label: "Gestão de processos", status: s(r.processos) },
        { label: "Gestão de clientes", status: s(r.clientes) },
        { label: "Gestão de contratos", status: s(r.contratos) },
        { label: "Notificações push", status: s(r.notificacoes_push) },
        { label: "Relatórios", status: sLim(r.relatorios) },
        {
          label: "Gestão de usuários",
          status: gestaoUsuariosStatus(r.gestao_usuarios, p.limite_usuarios),
        },
        { label: "Módulo financeiro", status: sLim(r.modulo_financeiro) },
      ],
    },
    {
      title: "Apps disponíveis",
      features: [
        { label: "Bloco de notas", status: sLim(r.app_notas) },
        { label: "Calculadoras jurídicas", status: s(r.app_calculadoras) },
        { label: "Calendário", status: s(r.app_calendario) },
        { label: "Leads", status: s(r.app_leads) },
        { label: "Lista de tarefas", status: s(r.app_tarefas) },
        { label: "Prazos e Compromissos", status: s(r.app_prazos) },
        { label: "Proposta Comercial", status: s(r.app_proposta_comercial) },
        { label: "Timesheet", status: s(r.app_timesheet) },
        { label: "Acesso antecipado a novos apps", status: s(r.acesso_antecipado) },
      ],
    },
    {
      title: "IA",
      features: [
        {
          label: tokens === -1 ? "IA ilimitada" : "IA para petições",
          status: iaStatus,
          note: iaNote,
        },
      ],
    },
  ];
}

function buildLimites(p: PlanoPublico): string {
  const u = p.limite_usuarios;
  const l = p.limites;
  const r = p.recursos;
  const parts: string[] = [
    `${u} usuário${u > 1 ? "s" : ""}`,
    `${l.armazenamento}GB armazenamento`,
  ];
  if (r.api && l.api_requests > 0) parts.push(`${l.api_requests} req API/mês`);
  if (l.backup_automatico) parts.push("Backup automático");
  else if (r.backup) parts.push("Backup");
  if (r.suporte_dedicado) parts.push("Suporte dedicado");
  else if (r.suporte_prioritario) parts.push("Suporte prioritário");
  else parts.push("Suporte por e-mail");
  return parts.join(" · ");
}

function toView(p: PlanoPublico): PlanoView {
  return {
    id: p.id,
    nome: p.nome,
    display_name: p.display_name,
    subtitulo: p.subtitulo ?? p.descricao ?? "",
    preco: p.preco,
    popular: p.popular,
    destaque: p.destaque,
    stripe_price_id: p.stripe_price_id,
    grupos: buildGrupos(p),
    limites: buildLimites(p),
    ia_tokens_mensais: p.ia_tokens_mensais,
    limite_usuarios: p.limite_usuarios,
  };
}

export function usePlanos() {
  return useQuery<PlanoView[], Error>({
    queryKey: ["planos-publicos"],
    queryFn: async () => {
      const raw = await fetchPlanosPublicos();
      return raw.sort((a, b) => a.ordem - b.ordem).map(toView);
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
