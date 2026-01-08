import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O que é o JuriOne?",
    answer:
      "JuriOne é uma plataforma SaaS completa de automação jurídica para escritórios de advocacia. Oferece gestão integrada de processos, clientes, contratos, finanças e recursos avançados de Inteligência Artificial para geração de documentos jurídicos.",
  },
  {
    question: "Como funciona a IA para geração de petições?",
    answer:
      "Nossa IA foi treinada especificamente para o ordenamento jurídico brasileiro. Você fornece os dados do processo e do cliente, e a IA gera uma petição inicial profissional completa com endereçamento, qualificação das partes, fatos, fundamentos jurídicos com citações de legislação, pedidos e valor da causa. O documento fica pronto para revisão e protocolo em minutos.",
  },
  {
    question: "Quais tipos de petições a IA consegue gerar?",
    answer:
      "A IA suporta múltiplas áreas do direito: Civil, Trabalhista, Consumidor, Família e Penal. Gera petições iniciais, contestações e outros documentos jurídicos com estrutura profissional e citação automática de legislações aplicáveis.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Sim! Utilizamos arquitetura multi-tenancy com isolamento completo de dados por escritório. Autenticação via JWT, criptografia de dados, prevenção de SQL injection e XSS, auditoria completa de ações e total compliance com a LGPD.",
  },
  {
    question: "Posso testar antes de assinar?",
    answer:
      "Sim! Oferecemos 7 dias de trial grátis em todos os planos. Você pode testar todas as funcionalidades, incluindo a IA, sem precisar cadastrar cartão de crédito. Se gostar, basta escolher o plano ideal para seu escritório.",
  },
  {
    question: "Como funciona o suporte?",
    answer:
      "Todos os planos incluem suporte. O plano Básico tem suporte por email, o Profissional inclui suporte prioritário, e o Empresarial oferece suporte dedicado com atendimento personalizado e treinamentos.",
  },
  {
    question: "Posso migrar meus dados de outro sistema?",
    answer:
      "Sim! Oferecemos suporte para migração de dados de outros sistemas jurídicos. Entre em contato com nossa equipe para um atendimento personalizado e entender como podemos ajudar na transição.",
  },
  {
    question: "O sistema funciona em dispositivos móveis?",
    answer:
      "Sim! O JuriOne é totalmente responsivo e funciona perfeitamente em desktop, tablet e smartphone. Acesse seus processos, clientes e documentos de qualquer lugar.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-secondary/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-semibold mb-4"
          >
            Dúvidas Frequentes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6"
          >
            Perguntas <span className="text-gradient">Frequentes</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-card transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
