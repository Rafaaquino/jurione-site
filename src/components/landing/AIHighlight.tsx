import { motion } from "framer-motion";
import { MessageSquare, Search, FileText, Sparkles, ArrowRight, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Search,
    title: "Consulte seus dados em linguagem natural",
    description: "Pergunte sobre processos, clientes e contratos como se estivesse conversando com um assistente — sem precisar navegar por menus",
  },
  {
    icon: FileText,
    title: "Gere documentos direto no chat",
    description: "Peça uma petição, contestação ou contrato no chat e receba o documento completo em segundos, pronto para edição",
  },
  {
    icon: MessageSquare,
    title: "Tire dúvidas jurídicas com contexto",
    description: "Perguntas sobre legislação, jurisprudência e procedimentos respondidas com base no seu caso específico e dados reais do escritório",
  },
];

const chatMessages = [
  {
    role: "user",
    text: "Quais processos do cliente João Silva vencem esta semana?",
  },
  {
    role: "ai",
    text: "Encontrei 2 processos ativos para João Silva com prazos esta semana:",
    items: [
      "Proc. 0012345-78.2024 · Trabalhista · Prazo: 22/05 (5 dias)",
      "Proc. 0098765-43.2023 · Civil · Prazo: 23/05 (6 dias)",
    ],
  },
  {
    role: "user",
    text: "Gere a contestação do processo trabalhista",
  },
  {
    role: "ai",
    text: "✨ Contestação gerada com sucesso! Estrutura completa com fundamentos do TST e jurisprudência aplicável. Pronto para revisão e download em Word.",
    items: null,
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
              Assistente Jurídico{" "}
              <span className="text-gradient">com IA no Chat</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg mb-8"
            >
              Converse com a IA diretamente no sistema: consulte processos, clientes e contratos
              em linguagem natural, tire dúvidas jurídicas e gere documentos completos —
              tudo sem sair do seu fluxo de trabalho.
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
                Testar o Chat com IA
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Visual — Chat Interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-card rounded-2xl border border-border shadow-elevated overflow-hidden">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-secondary/30">
                <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">JuriOne IA</p>
                  <p className="text-xs text-muted-foreground">Assistente Jurídico</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>

              {/* Chat messages */}
              <div className="p-5 space-y-4 max-h-72 overflow-hidden">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === "user"
                          ? "bg-primary/15 text-primary"
                          : "gradient-primary text-primary-foreground"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="w-3.5 h-3.5" />
                      ) : (
                        <Bot className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div
                      className={`rounded-xl px-4 py-2.5 text-sm max-w-[75%] ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/60 text-foreground"
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      {msg.items && (
                        <ul className="mt-2 space-y-1">
                          {msg.items.map((item, j) => (
                            <li key={j} className="text-xs opacity-80 flex items-start gap-1.5">
                              <span className="mt-0.5 shrink-0">▸</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chat input */}
              <div className="px-5 py-4 border-t border-border">
                <div className="flex items-center gap-3 bg-secondary/50 rounded-xl px-4 py-2.5">
                  <p className="text-sm text-muted-foreground flex-1">
                    Pergunte sobre processos, contratos, clientes...
                  </p>
                  <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
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
