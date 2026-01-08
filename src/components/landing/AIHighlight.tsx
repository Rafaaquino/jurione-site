import { motion } from "framer-motion";
import { Sparkles, FileText, Clock, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Clock,
    title: "Economia de Tempo",
    description: "Petições que levavam horas agora ficam prontas em minutos",
  },
  {
    icon: FileText,
    title: "Qualidade Profissional",
    description: "Documentos com estrutura jurídica adequada e citação de legislações",
  },
  {
    icon: Zap,
    title: "Múltiplas Áreas",
    description: "Civil, Trabalhista, Consumidor, Família, Penal e muito mais",
  },
];

export function AIHighlight() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-gold text-accent-foreground mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Diferencial JuriOne</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6"
            >
              IA Especializada em{" "}
              <span className="text-gradient">Direito Brasileiro</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg mb-8"
            >
              Nossa inteligência artificial foi treinada especificamente para o ordenamento jurídico brasileiro. 
              Gere petições iniciais completas, analise contratos e identifique riscos automaticamente.
            </motion.p>

            <div className="space-y-6 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{benefit.title}</h4>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Button
                size="lg"
                className="gradient-cta text-primary-foreground font-semibold shadow-soft hover:opacity-90 transition-all"
              >
                Experimente a IA Grátis
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
              {/* Mock AI Interface */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold">JuriOne IA</p>
                  <p className="text-xs text-muted-foreground">Assistente Jurídico</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground mb-2">Solicitação:</p>
                  <p className="text-sm font-medium">
                    "Gerar petição inicial de danos morais contra empresa de telefonia..."
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-sm text-primary mb-2 font-medium">✨ Petição Gerada:</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>EXMO. SR. DR. JUIZ DE DIREITO...</strong></p>
                    <p className="text-xs">• Qualificação das partes ✓</p>
                    <p className="text-xs">• Narrativa dos fatos ✓</p>
                    <p className="text-xs">• Fundamentos jurídicos (CDC) ✓</p>
                    <p className="text-xs">• Pedidos e valor da causa ✓</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                <span>Tempo de geração: 45 segundos</span>
                <span className="text-primary font-medium">Pronto para revisão →</span>
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
