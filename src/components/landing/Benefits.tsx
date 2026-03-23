import { motion } from "framer-motion";
import {
  Clock,
  TrendingUp,
  ShieldCheck,
  FileCheck,
  Users,
  Banknote,
} from "lucide-react";

const benefits = [
  {
    icon: Clock,
    stat: "4h",
    statLabel: "economizadas por dia",
    title: "Menos tempo em tarefas repetitivas",
    description:
      "Advogados que usam o JuriOne eliminam horas de trabalho manual com geração automática de petições iniciais, preenchimento de dados e controle de prazos processuais.",
    keywords: ["petição inicial", "prazos processuais", "advogados"],
  },
  {
    icon: FileCheck,
    stat: "90%",
    statLabel: "de redução em erros",
    title: "Petições com qualidade profissional",
    description:
      "A IA jurídica gera peças processuais com estrutura correta, citação de jurisprudência atualizada e fundamentação legal — revisadas pelo advogado antes do protocolo.",
    keywords: ["jurisprudência", "peças processuais", "IA jurídica"],
  },
  {
    icon: TrendingUp,
    stat: "3×",
    statLabel: "mais processos gerenciados",
    title: "Escale seu escritório sem aumentar a equipe",
    description:
      "Com a gestão de processos jurídicos centralizada, seu escritório de advocacia consegue atender mais clientes com a mesma equipe, aumentando faturamento sem aumentar custo operacional.",
    keywords: ["gestão de processos jurídicos", "escritório de advocacia"],
  },
  {
    icon: Banknote,
    stat: "100%",
    statLabel: "de controle financeiro",
    title: "Honorários e finanças sob controle",
    description:
      "Controle honorários advocatícios, emita recibos, acompanhe inadimplências e gere relatórios financeiros do escritório. Tudo integrado ao cadastro de clientes e processos.",
    keywords: ["honorários advocatícios", "controle financeiro", "escritório"],
  },
  {
    icon: Users,
    stat: "1",
    statLabel: "plataforma para toda a equipe",
    title: "Colaboração total entre advogados",
    description:
      "Sócios, advogados plenos, juniores e estagiários trabalhando na mesma base de dados, com controle de permissões por perfil e histórico completo de cada ação no processo.",
    keywords: ["advogados", "equipe jurídica", "gestão de escritório"],
  },
  {
    icon: ShieldCheck,
    stat: "LGPD",
    statLabel: "100% compliant",
    title: "Dados dos seus clientes protegidos",
    description:
      "Cada escritório de advocacia tem seus dados isolados e criptografados. Auditoria completa de acessos, conformidade total com a LGPD e backups automáticos diários.",
    keywords: ["LGPD", "escritório de advocacia", "segurança jurídica"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Benefits() {
  return (
    <section id="beneficios" className="py-20 md:py-32">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-semibold mb-4"
          >
            Por que usar o JuriOne
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6"
          >
            O que muda no seu escritório de{" "}
            <span className="text-gradient">advocacia</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Advogados que adotam o JuriOne saem da rotina de planilhas,
            e-mails e documentos avulsos para uma gestão jurídica completa,
            automatizada e integrada.
          </motion.p>
        </div>

        {/* Antes e Depois */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-20"
        >
          {/* Antes */}
          <div className="rounded-2xl border border-border bg-secondary/30 p-6 md:p-8">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">
              Sem o JuriOne
            </p>
            <ul className="space-y-4">
              {[
                "Petições escritas do zero a cada processo",
                "Prazos controlados em planilha ou agenda",
                "Dados de clientes espalhados em pastas e e-mails",
                "Honorários cobrados manualmente, sem visibilidade",
                "Jurisprudência pesquisada em sistemas separados",
                "Horas perdidas em tarefas que a IA pode fazer",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0 text-xs font-bold">
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Depois */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-5">
              Com o JuriOne
            </p>
            <ul className="space-y-4">
              {[
                "Petições iniciais geradas com IA em minutos",
                "Prazos processuais com alertas automáticos",
                "Gestão de clientes PF e PJ em uma plataforma",
                "Honorários advocatícios controlados com relatórios",
                "Jurisprudência integrada à geração de documentos",
                "Equipe focada em advocacia, não em burocracia",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-xs font-bold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Cards de benefícios */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-elevated transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-right">
                  <span className="font-display font-extrabold text-3xl text-primary">
                    {benefit.stat}
                  </span>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {benefit.statLabel}
                  </p>
                </div>
              </div>

              <h3 className="font-display font-bold text-lg mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
