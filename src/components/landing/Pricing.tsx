import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type FeatureStatus = "included" | "limited" | "unavailable";

interface Feature {
  label: string;
  status: FeatureStatus;
  note?: string;
}

interface FeatureGroup {
  title: string;
  features: Feature[];
}

interface Plano {
  id: number;
  nome: string;
  subtitulo: string;
  preco: number;
  periodicidade: string;
  grupos: FeatureGroup[];
  limites: string;
  destaque?: boolean;
  popular?: boolean;
}

const planos: Plano[] = [
  {
    id: 1,
    nome: "Básico",
    subtitulo: "Advogado solo iniciante",
    preco: 320,
    periodicidade: "mês",
    grupos: [
      {
        title: "Core (acesso total)",
        features: [
          { label: "Gestão de processos", status: "included" },
          { label: "Gestão de clientes", status: "included" },
          { label: "Gestão de contratos", status: "included" },
          { label: "Notificações push", status: "included" },
          { label: "Relatórios", status: "limited", note: "limitado" },
          { label: "Gestão de usuários", status: "unavailable" },
        ],
      },
      {
        title: "Apps disponíveis",
        features: [
          { label: "Bloco de notas", status: "limited", note: "limitado" },
          { label: "Calculadoras jurídicas", status: "included" },
          { label: "Calendário", status: "included" },
          { label: "Leads", status: "unavailable" },
          { label: "Lista de tarefas", status: "unavailable" },
          { label: "Prazos e Compromissos", status: "unavailable" },
          { label: "Proposta Comercial", status: "unavailable" },
          { label: "Timesheet", status: "unavailable" },
          { label: "Acesso antecipado a novos apps", status: "unavailable" },
        ],
      },
      {
        title: "IA e Financeiro",
        features: [
          {
            label: "IA para petições",
            status: "limited",
            note: "360k tokens/mês",
          },
          { label: "Módulo financeiro", status: "limited", note: "limitado" },
        ],
      },
    ],
    limites: "1 usuário · processos ativos · clientes · Suporte por e-mail",
  },
  {
    id: 2,
    nome: "Profissional",
    subtitulo: "Pequeno escritório",
    preco: 990,
    periodicidade: "mês",
    grupos: [
      {
        title: "Core (acesso total)",
        features: [
          { label: "Gestão de processos", status: "included" },
          { label: "Gestão de clientes", status: "included" },
          { label: "Gestão de contratos", status: "included" },
          { label: "Notificações push", status: "included" },
          { label: "Relatórios completo", status: "included" },
          { label: "Gestão de usuários", status: "limited", note: "limitado" },
        ],
      },
      {
        title: "Apps disponíveis",
        features: [
          { label: "Bloco de notas (completo)", status: "included" },
          { label: "Calculadoras jurídicas", status: "included" },
          { label: "Calendário", status: "included" },
          { label: "Leads", status: "unavailable" },
          { label: "Lista de tarefas", status: "included" },
          { label: "Prazos e Compromissos", status: "included" },
          { label: "Proposta Comercial", status: "unavailable" },
          { label: "Timesheet", status: "unavailable" },
          { label: "Acesso antecipado a novos apps", status: "included" },
        ],
      },
      {
        title: "IA e Financeiro",
        features: [
          {
            label: "IA para petições",
            status: "limited",
            note: "2880M tokens/mês",
          },
          { label: "Módulo financeiro", status: "included" },
        ],
      },
    ],
    limites:
      "5 usuários · Processos ilimitados · Clientes ilimitados · Suporte prioritário",
    popular: true,
  },
  {
    id: 3,
    nome: "Empresarial",
    subtitulo: "Médio e grande escritório",
    preco: 2800,
    periodicidade: "mês",
    grupos: [
      {
        title: "Core (acesso total)",
        features: [
          { label: "Gestão de processos", status: "included" },
          { label: "Gestão de clientes", status: "included" },
          { label: "Gestão de contratos", status: "included" },
          { label: "Notificações push", status: "included" },
          { label: "Relatórios avançados", status: "included" },
          { label: "Gestão de usuários", status: "included" },
        ],
      },
      {
        title: "Apps disponíveis",
        features: [
          { label: "Bloco de notas (completo)", status: "included" },
          { label: "Calculadoras jurídicas", status: "included" },
          { label: "Calendário", status: "included" },
          { label: "Leads", status: "included" },
          { label: "Lista de tarefas", status: "included" },
          { label: "Prazos e Compromissos", status: "included" },
          { label: "Proposta Comercial", status: "included" },
          { label: "Timesheet", status: "included" },
          { label: "Acesso antecipado a novos apps", status: "included" },
        ],
      },
      {
        title: "IA e Financeiro",
        features: [
          { label: "IA ilimitada", status: "included" },
          { label: "Módulo financeiro completo", status: "included" },
        ],
      },
    ],
    limites:
      "10 usuários · Tudo ilimitado · Suporte dedicado com gerente de conta",
    destaque: true,
  },
];

function StatusDot({ status }: { status: FeatureStatus }) {
  if (status === "included")
    return (
      <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0 mt-1" />
    );
  if (status === "limited")
    return (
      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 mt-1" />
    );
  return (
    <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30 shrink-0 mt-1" />
  );
}

export function Pricing() {
  const systemUrls = {
    development: "http://localhost:4200",
    production: "https://jurione.app.br",
    homologation: "https://hml.jurione.com",
  };

  const getSystemUrl = (): string => {
    const appMode = import.meta.env.MODE;
    if (appMode === "production") return systemUrls.production;
    if (appMode === "development") return systemUrls.development;
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1")
      return systemUrls.development;
    if (hostname.includes("hml")) return systemUrls.homologation;
    return systemUrls.production;
  };

  const redirectToSignup = (planName: string) => {
    const systemUrl = getSystemUrl();
    let planValue: string;
    let utmCampaign: string;

    if (
      planName.toLowerCase().includes("teste") ||
      planName.toLowerCase().includes("grátis") ||
      planName.toLowerCase().includes("gratis")
    ) {
      planValue = "trial";
      utmCampaign = "free_trial_pricing";
    } else {
      planValue = planName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_");
      utmCampaign = "paid_plan_pricing";
    }

    const encodedPlan = encodeURIComponent(planValue);
    const source = encodeURIComponent("landing_pricing");
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateRef = urlParams.get("ref");

    let signupUrl = `${systemUrl}/auth/signup?plan=${encodedPlan}&source=${source}&utm_source=landing_pricing&utm_campaign=${utmCampaign}`;
    if (affiliateRef) {
      signupUrl += `&ref=${encodeURIComponent(affiliateRef)}`;
    }

    window.open(signupUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="planos" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-semibold mb-4"
          >
            Planos e Preços
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6"
          >
            Escolha o plano ideal para seu{" "}
            <span className="text-gradient">escritório</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Todos os planos incluem 7 dias de trial grátis. Cancele quando
            quiser.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {planos.map((plano, index) => (
            <motion.div
              key={plano.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col p-6 md:p-8 rounded-2xl border transition-all ${
                plano.popular
                  ? "border-primary shadow-elevated bg-card scale-105 z-10"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plano.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full gradient-cta text-primary-foreground text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-4 h-4" />
                  Mais popular
                </div>
              )}

              {plano.destaque && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold whitespace-nowrap">
                  Poder total
                </div>
              )}

              {/* Header */}
              <div className="mb-5">
                <h3 className="font-display font-bold text-xl mb-1">
                  {plano.nome}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {plano.subtitulo}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className="font-display font-extrabold text-4xl md:text-5xl">
                    {plano.preco.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-muted-foreground">
                    /{plano.periodicidade}
                  </span>
                </div>
              </div>

              {/* Feature groups */}
              <div className="flex-1 space-y-5 mb-6">
                {plano.grupos.map((grupo) => (
                  <div key={grupo.title}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                      {grupo.title}
                    </p>
                    <ul className="space-y-2">
                      {grupo.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <StatusDot status={feature.status} />
                          <span
                            className={`text-sm leading-tight ${
                              feature.status === "unavailable"
                                ? "text-muted-foreground/50"
                                : "text-muted-foreground"
                            }`}
                          >
                            {feature.label}
                            {feature.note && (
                              <span className="ml-1 text-xs text-amber-500 font-medium">
                                ({feature.note})
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Limits */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Limites
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {plano.limites}
                  </p>
                </div>
              </div>

              <Button
                className={`w-full font-semibold ${
                  plano.popular
                    ? "gradient-cta text-primary-foreground shadow-soft"
                    : ""
                }`}
                variant={plano.popular ? "default" : "outline"}
                size="lg"
                onClick={() => redirectToSignup(plano.nome)}
              >
                Escolher Plano
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <span className="font-medium text-foreground/60">Legenda:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
            Incluído
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            Limitado
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30 inline-block" />
            Não disponível
          </span>
        </motion.div>

        {/* Plano Customizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-2 border-primary/20 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="font-display font-bold text-2xl md:text-3xl mb-4">
                Plano <span className="text-gradient">Customizado</span>
              </h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Implementação dedicada para sua empresa com customização total
                de acordo com as necessidades do seu escritório. Ideal para
                escritórios que precisam de um sistema totalmente personalizado
                e com mais usuários e integrações com outros sistemas que não se
                encaixa nos planos disponíveis.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg mb-4">
                  O que está incluído:
                </h4>
                <ul className="space-y-3">
                  {[
                    "Sistema totalmente personalizado com sua identidade visual",
                    "Integração completa com sistemas existentes da empresa",
                    "Desenvolvimento de funcionalidades específicas",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0 mt-1" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg mb-4">&nbsp;</h4>
                <ul className="space-y-3">
                  {[
                    "Treinamento completo da equipe",
                    "Suporte dedicado e SLA garantido",
                    "Customização de módulos conforme necessidades do escritório",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0 mt-1" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                onClick={() => {
                  const element = document.getElementById("contato");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Solicitar Orçamento
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
