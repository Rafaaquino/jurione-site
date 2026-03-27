import { motion } from "framer-motion";
import {
  NotebookPen,
  Calculator,
  CalendarDays,
  UserPlus,
  ListTodo,
  AlarmClock,
  FileSignature,
  Timer,
} from "lucide-react";

const apps = [
  {
    icon: NotebookPen,
    nome: "Bloco de Notas",
    descricao:
      "Anote ideias, observações de audiências e lembretes diretamente no sistema. Notas organizadas por cliente ou processo.",
    cor: "from-violet-500/10 to-violet-500/5",
    corIcone: "bg-violet-500/10 group-hover:bg-violet-500/20",
    corIconeTexto: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: Calculator,
    nome: "Calculadoras Jurídicas",
    descricao:
      "Calcule honorários, juros, correção monetária, FGTS e verbas rescisórias com precisão. Resultados exportáveis em PDF.",
    cor: "from-blue-500/10 to-blue-500/5",
    corIcone: "bg-blue-500/10 group-hover:bg-blue-500/20",
    corIconeTexto: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: CalendarDays,
    nome: "Calendário",
    descricao:
      "Agenda completa do escritório com visualização mensal, semanal e diária. Sincronize compromissos de toda a equipe.",
    cor: "from-emerald-500/10 to-emerald-500/5",
    corIcone: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
    corIconeTexto: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: UserPlus,
    nome: "Leads",
    descricao:
      "Gerencie potenciais clientes com funil de conversão, acompanhamento de contatos e taxa de fechamento por área do direito.",
    cor: "from-orange-500/10 to-orange-500/5",
    corIcone: "bg-orange-500/10 group-hover:bg-orange-500/20",
    corIconeTexto: "text-orange-600 dark:text-orange-400",
  },
  {
    icon: ListTodo,
    nome: "Lista de Tarefas",
    descricao:
      "Organize as demandas do dia com listas de tarefas por prioridade, responsável e prazo. Nunca deixe nada para trás.",
    cor: "from-pink-500/10 to-pink-500/5",
    corIcone: "bg-pink-500/10 group-hover:bg-pink-500/20",
    corIconeTexto: "text-pink-600 dark:text-pink-400",
  },
  {
    icon: AlarmClock,
    nome: "Prazos e Compromissos",
    descricao:
      "Controle de prazos processuais com alertas antecipados e painel de vencimentos. Evite preclusões e perdas de prazo.",
    cor: "from-red-500/10 to-red-500/5",
    corIcone: "bg-red-500/10 group-hover:bg-red-500/20",
    corIconeTexto: "text-red-600 dark:text-red-400",
  },
  {
    icon: FileSignature,
    nome: "Proposta Comercial",
    descricao:
      "Crie e envie propostas profissionais aos clientes com layout personalizado, tabela de honorários e aceite digital.",
    cor: "from-teal-500/10 to-teal-500/5",
    corIcone: "bg-teal-500/10 group-hover:bg-teal-500/20",
    corIconeTexto: "text-teal-600 dark:text-teal-400",
  },
  {
    icon: Timer,
    nome: "Timesheet",
    descricao:
      "Registre horas trabalhadas por cliente e processo. Relatórios de produtividade e base para cobrança por hora.",
    cor: "from-cyan-500/10 to-cyan-500/5",
    corIcone: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
    corIconeTexto: "text-cyan-600 dark:text-cyan-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Apps() {
  return (
    <section id="apps" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-semibold mb-4"
          >
            Apps do Sistema
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6"
          >
            Ferramentas que agilizam o{" "}
            <span className="text-gradient">dia a dia</span> do advogado
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Além do núcleo de gestão jurídica, o JuriOne oferece um conjunto de
            apps práticos que eliminam planilhas, cadernos e ferramentas
            avulsas.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {apps.map((app, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative p-6 rounded-2xl border border-border bg-gradient-to-br ${app.cor} hover:border-primary/20 hover:shadow-elevated transition-all duration-300 cursor-default`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors ${app.corIcone}`}
              >
                <app.icon className={`w-5 h-5 ${app.corIconeTexto}`} />
              </div>
              <h3 className="font-display font-bold text-base mb-2">
                {app.nome}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {app.descricao}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom callout */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          Novos apps são lançados regularmente.{" "}
          <span className="text-primary font-medium">
            Planos Profissional e Empresarial têm acesso antecipado.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
