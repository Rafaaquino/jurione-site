import { motion } from "framer-motion";
import {
  Sparkles,
  Scale,
  Users,
  FileText,
  Wallet,
  BarChart3,
  Calendar,
  Bell,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Petições com IA",
    description:
      "Gere petições iniciais profissionais em minutos. IA especializada em direito brasileiro com citação automática de legislações.",
    highlight: true,
  },
  {
    icon: Scale,
    title: "Gestão de Processos",
    description:
      "Controle completo de todos os processos do escritório com timeline, documentos e prazos automatizados.",
  },
  {
    icon: Users,
    title: "Gestão de Clientes",
    description:
      "Base de clientes organizada com integração ViaCEP e Brasil API. PF e PJ com validação automática.",
  },
  {
    icon: FileText,
    title: "Contratos Inteligentes",
    description:
      "8 templates profissionais, geração com IA e análise automática de cláusulas de risco.",
  },
  {
    icon: Wallet,
    title: "Módulo Financeiro",
    description:
      "Controle receitas, despesas e honorários. Relatórios detalhados e exportação para PDF/Excel.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Avançados",
    description:
      "Dashboard com KPIs, gráficos de performance e produtividade da equipe em tempo real.",
  },
  {
    icon: Calendar,
    title: "Calendário e Prazos",
    description:
      "Nunca perca um prazo. Lembretes automáticos e visualização de agenda integrada.",
  },
  {
    icon: Bell,
    title: "Notificações Inteligentes",
    description:
      "Alertas proativos sobre prazos, movimentações e eventos importantes do escritório.",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description:
      "Multi-tenancy com isolamento de dados, JWT, auditoria completa e LGPD compliant.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Features() {
  return (
    <section id="funcionalidades" className="py-20 md:py-32 bg-secondary/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-semibold mb-4"
          >
            Funcionalidades
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6"
          >
            Tudo que seu escritório precisa em{" "}
            <span className="text-gradient">um só lugar</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Sistema jurídico completo para escritórios de advocacia. Integração total entre módulos para máxima produtividade.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative p-6 md:p-8 rounded-2xl bg-card border transition-all duration-300 hover:shadow-elevated ${
                feature.highlight
                  ? "border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
                  : "border-border hover:border-primary/20"
              }`}
            >
              {feature.highlight && (
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  Destaque
                </div>
              )}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  feature.highlight
                    ? "gradient-primary"
                    : "bg-primary/10 group-hover:bg-primary/20"
                }`}
              >
                <feature.icon
                  className={`w-6 h-6 ${
                    feature.highlight ? "text-primary-foreground" : "text-primary"
                  }`}
                />
              </div>
              <h3 className="font-display font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
