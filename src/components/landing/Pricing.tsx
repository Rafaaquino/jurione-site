import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlanos, type FeatureStatus } from "@/hooks/use-planos";

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
  const { data: planos, isLoading, isError } = usePlanos();

  const getSystemUrl = (): string => {
    const appMode = import.meta.env.MODE;
    if (appMode === "production") return "https://jurione.app.br";
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1")
      return "http://localhost:4200";
    if (hostname.includes("hml")) return "https://hml.jurione.com";
    return "https://jurione.app.br";
  };

  const redirectToSignup = (planNome: string) => {
    const systemUrl = getSystemUrl();
    const encodedPlan = encodeURIComponent(planNome.toLowerCase());
    const source = encodeURIComponent("landing_pricing");
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateRef = urlParams.get("ref");

    let signupUrl = `${systemUrl}/auth/signup?plan=${encodedPlan}&source=${source}&utm_source=landing_pricing&utm_campaign=paid_plan_pricing`;
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
            Todos os planos incluem 14 dias de trial grátis. Cancele quando
            quiser.
          </motion.p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <p className="text-center text-muted-foreground py-12">
            Não foi possível carregar os planos. Tente novamente mais tarde.
          </p>
        )}

        {!isLoading && !isError && planos && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {planos.map((plano, index) => (
              <motion.div
                key={plano.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col p-5 rounded-2xl border transition-all ${
                  plano.popular
                    ? "border-primary shadow-elevated bg-card z-10"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {/* Header */}
                <div className="mb-5">
                  {plano.popular && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full gradient-cta text-primary-foreground text-xs font-semibold mb-2 whitespace-nowrap">
                      <Sparkles className="w-3 h-3" />
                      Mais popular
                    </div>
                  )}
                  {plano.destaque && !plano.popular && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold mb-2 whitespace-nowrap">
                      Poder total
                    </div>
                  )}
                  <h3 className="font-display font-bold text-xl mb-1">
                    {plano.display_name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {plano.subtitulo}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-muted-foreground">R$</span>
                    <span className="font-display font-extrabold text-3xl">
                      {(plano.preco / 100).toLocaleString("pt-BR")}
                    </span>
                    <span className="text-muted-foreground text-sm">/mês</span>
                  </div>
                </div>

                {/* Feature groups */}
                <div className="flex-1 space-y-3 mb-4">
                  {plano.grupos.map((grupo) => (
                    <div key={grupo.title}>
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                        {grupo.title}
                      </p>
                      <ul className="space-y-1">
                        {grupo.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <StatusDot status={feature.status} />
                            <span
                              className={`text-xs leading-tight ${
                                feature.status === "unavailable"
                                  ? "text-muted-foreground/50"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {feature.label}
                              {feature.note && (
                                <span className="ml-1 text-[10px] text-amber-500 font-medium">
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
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                      Limites
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {plano.limites}
                    </p>
                  </div>
                </div>

                <Button
                  className={`w-full font-semibold text-sm ${
                    plano.popular
                      ? "gradient-cta text-primary-foreground shadow-soft"
                      : ""
                  }`}
                  variant={plano.popular ? "default" : "outline"}
                  size="sm"
                  onClick={() => redirectToSignup(plano.nome)}
                >
                  Escolher Plano
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </motion.div>
            ))}
          </div>
        )}

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
