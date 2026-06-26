import { motion } from "framer-motion";
import { Scale, Users, Bell, UserPlus } from "lucide-react";

const items = [
  {
    icon: Scale,
    title: "Importação via CNJ",
    description:
      "Informe o número CNJ e o sistema busca, cadastra e organiza o processo automaticamente — partes, advogados, status e histórico completo.",
  },
  {
    icon: Users,
    title: "Importação em Massa via OAB",
    description:
      "Digite o número OAB do advogado e importe todos os seus processos ativos de uma só vez. Ideal para quem está migrando para o JuriOne.",
  },
  {
    icon: Bell,
    title: "Monitoramento Automático",
    description:
      "Após a importação, o JuriOne monitora cada processo e alerta sobre novas movimentações, prazos e publicações em tempo real.",
  },
  {
    icon: UserPlus,
    title: "Clientes Importados Automaticamente",
    description:
      "Durante a importação dos processos, o sistema identifica e cadastra os clientes automaticamente. Nenhum dado precisa ser digitado duas vezes.",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ImportAutomation() {
  return (
    <section id="importacao" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-semibold mb-4"
          >
            Integração CNJ &amp; OAB
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6"
          >
            Importe todos os seus processos em{" "}
            <span className="text-gradient">minutos</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Chega de cadastro manual. Informe o CNJ ou o número OAB e o JuriOne
            importa, organiza e começa a monitorar seus processos automaticamente
            — junto com os clientes vinculados.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-elevated"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
