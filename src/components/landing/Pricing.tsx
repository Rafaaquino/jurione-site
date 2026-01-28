import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Plano {
  id: number;
  nome: string;
  preco: number;
  periodicidade: string;
  usuarios: number;
  recursos: string[];
  destaque?: boolean;
  popular?: boolean;
}

const planos: Plano[] = [
  {
    id: 1,
    nome: "Básico",
    preco: 320,
    periodicidade: "mês",
    usuarios: 1,
    recursos: [
      "Gestão de Processos",
      "Gestão de Clientes",
      "Gestão de Contratos",
      "Calendário e Prazos",
      "Suporte por Email",
    ],
  },
  {
    id: 2,
    nome: "Profissional",
    preco: 990,
    periodicidade: "mês",
    usuarios: 4,
    recursos: [
      "Tudo do Básico",
      "IA para Petições (limitado)",
      "Módulo Financeiro",
      "Relatórios Avançados",
      "Suporte Prioritário",
    ],
    popular: true,
  },
  {
    id: 3,
    nome: "Empresarial",
    preco: 2800,
    periodicidade: "mês",
    usuarios: 10,
    recursos: [
      "Tudo do Profissional",
      "IA Ilimitada",
      "API para Integrações",
      "Suporte Dedicado",
      "Treinamento Personalizado",
    ],
    destaque: true,
  },
];

export function Pricing() {

  // URLs do sistema por ambiente
  const systemUrls = {
    development: "http://localhost:4200",
    production: "https://jurione.app.br",
    homologation: "https://hml.jurione.com",
  };

  // Determina a URL base do sistema
  const getSystemUrl = (): string => {
    // Verifica o modo do Vite (development, production, etc.)
    const appMode = import.meta.env.MODE;

    // Se estiver em modo production explícito, usa produção
    if (appMode === "production") {
      return systemUrls.production;
    }

    // Se estiver em modo development explícito, usa localhost
    if (appMode === "development") {
      return systemUrls.development;
    }

    // Fallback: detecta pelo hostname (comportamento original)
    const hostname = window.location.hostname;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return systemUrls.development;
    } else if (hostname.includes("hml")) {
      return systemUrls.homologation;
    } else {
      return systemUrls.production;
    }
  };

  // Redireciona para o sistema com o plano selecionado
  const redirectToSignup = (planName: string) => {
    const systemUrl = getSystemUrl();

    // Tratar especificamente o teste grátis
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
      // Normalizar nome do plano: remover acentos e substituir espaços por underscore
      planValue = planName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/\s+/g, "_"); // Substitui espaços por underscore
      utmCampaign = "paid_plan_pricing";
    }

    const encodedPlan = encodeURIComponent(planValue);
    const source = encodeURIComponent("landing_pricing");

    const signupUrl = `${systemUrl}/auth/signup?plan=${encodedPlan}&source=${source}&utm_source=landing_pricing&utm_campaign=${utmCampaign}`;

    console.log("Abrindo em nova aba:", signupUrl);
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
                className={`relative p-6 md:p-8 rounded-2xl border transition-all ${
                  plano.popular
                    ? "border-primary shadow-elevated bg-card scale-105 z-10"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {plano.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full gradient-cta text-primary-foreground text-sm font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Mais Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display font-bold text-xl mb-2">
                    {plano.nome}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Até {plano.usuarios} usuário{plano.usuarios > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-muted-foreground">R$</span>
                    <span className="font-display font-extrabold text-4xl md:text-5xl">
                      {plano.preco}
                    </span>
                    <span className="text-muted-foreground">
                      /{plano.periodicidade}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plano.recursos.map((recurso, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {recurso}
                      </span>
                    </li>
                  ))}
                </ul>

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
                de acordo com as necessidades do seu escritório. ideal para
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
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Sistema totalmente personalizado com sua identidade visual
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Integração completa com sistemas existentes da empresa
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Desenvolvimento de funcionalidades específicas
                    </span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg mb-4">&nbsp;</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Treinamento completo da equipe
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Suporte dedicado e SLA garantido
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Customização de módulos conforme necessidades do
                      escritório
                    </span>
                  </li>
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
