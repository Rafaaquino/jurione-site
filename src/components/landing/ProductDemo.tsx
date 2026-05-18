import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const demoFeatures = [
  "Interface intuitiva e moderna",
  "Chat com IA Jurídica integrado",
  "Gestão completa de processos",
  "Controle financeiro integrado",
  "Relatórios em tempo real",
  "Notificações automáticas de prazo",
];

export function ProductDemo() {
  return (
    <section id="demonstracao" className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-semibold mb-4"
          >
            O Sistema
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6"
          >
            Veja o JuriOne{" "}
            <span className="text-gradient">por dentro</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Uma plataforma completa, moderna e desenhada para a rotina do advogado brasileiro
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
              <img
                src="/tela-do-sistema.png"
                alt="Tela do sistema JuriOne"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>

            {/* Decorative glow */}
            <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl opacity-50" />
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="font-display font-bold text-2xl md:text-3xl">
                Conheça todas as funcionalidades
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Uma interface limpa e intuitiva que centraliza processos, clientes,
                contratos, finanças e IA em um único painel — sem curva de aprendizado.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {demoFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium leading-relaxed">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="pt-6"
            >
              <a
                href="#contato"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold gradient-primary text-primary-foreground hover:shadow-elevated transition-all duration-300 hover:scale-105"
              >
                Solicitar Demonstração Personalizada
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
