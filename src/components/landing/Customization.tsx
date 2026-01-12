import { motion } from "framer-motion";
import {
  Building2,
  Palette,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const scrollToContact = () => {
  const element = document.getElementById("contato");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const customizationFeatures = [
  {
    icon: Building2,
    title: "Sistema Exclusivo",
    description:
      "Tenha o JuriOne totalmente personalizado com a identidade visual do seu escritório",
  },
  {
    icon: Palette,
    title: "Branding Completo",
    description:
      "Logo, cores, fontes e interface totalmente customizada com sua marca",
  },
  {
    icon: Shield,
    title: "Isolamento Total",
    description:
      "Infraestrutura dedicada com isolamento completo de dados e segurança máxima",
  },
  {
    icon: Zap,
    title: "Performance Premium",
    description:
      "Recursos dedicados para máxima velocidade e disponibilidade 24/7",
  },
];

const benefits = [
  "Domínio próprio personalizado",
  "Suporte técnico prioritário",
  "Treinamento personalizado da equipe",
  "Módulos adicionais sob demanda",
  "API exclusiva para integrações",
  "Backup e segurança avançados",
];

export function Customization() {
  return (
    <section
      id="escritorio"
      className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-secondary/30 to-accent/10 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6"
            >
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-semibold">Solução Enterprise</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6"
            >
              Sistema <span className="text-gradient">Exclusivo</span> para seu
              Escritório
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg mb-8"
            >
              Para escritórios que desejam ter o JuriOne totalmente
              personalizado e exclusivo. Tenha um sistema sob medida com sua
              identidade visual, domínio próprio e infraestrutura dedicada.
            </motion.p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {customizationFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-1 text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Button
                size="lg"
                className="gradient-cta text-primary-foreground font-semibold shadow-soft hover:opacity-90 transition-all"
                onClick={scrollToContact}
              >
                Solicitar Orçamento
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-card rounded-2xl border border-border shadow-elevated p-6 md:p-8">
              {/* Mock Customized Interface */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Seu Escritório</p>
                  <p className="text-xs text-muted-foreground">
                    Sistema Personalizado
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-4 h-4 text-primary" />
                    <p className="text-sm font-semibold">
                      Branding Personalizado
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Logo, cores e identidade visual do seu escritório aplicados
                    em todo o sistema
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <p className="text-sm font-semibold">
                      Infraestrutura Dedicada
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Servidores exclusivos com isolamento total de dados e
                    segurança máxima
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <p className="text-sm font-semibold">Performance Premium</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recursos dedicados garantindo máxima velocidade e
                    disponibilidade 24/7
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Domínio:</span>
                  <span className="text-primary font-medium">
                    seu-escritorio.com.br
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
