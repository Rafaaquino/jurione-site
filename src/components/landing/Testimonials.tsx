import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Ricardo Almeida",
    role: "Sócio Fundador",
    company: "Almeida & Associados",
    initials: "RA",
    color: "bg-blue-600",
    content:
      "O JuriOne revolucionou nosso escritório. A IA para petições economiza em média 4 horas por dia da nossa equipe.",
    rating: 5,
  },
  {
    name: "Dra. Carla Santos",
    role: "Advogada Trabalhista",
    company: "Santos Advocacia",
    initials: "CS",
    color: "bg-emerald-600",
    content:
      "Finalmente um sistema que entende o dia a dia de um advogado. A gestão de prazos e a integração com financeiro são impecáveis.",
    rating: 5,
  },
  {
    name: "Dr. Fernando Costa",
    role: "Advogado Civil",
    company: "Costa & Barros",
    initials: "FC",
    color: "bg-violet-600",
    content:
      "As petições geradas pela IA são de qualidade impressionante. Cita jurisprudência atualizada e a estrutura é exatamente como eu faria manualmente.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-semibold mb-4"
          >
            Depoimentos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6"
          >
            O que nossos <span className="text-gradient">clientes</span> dizem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Advogados e escritórios de advocacia que já automatizaram sua
            gestão com o JuriOne
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 md:p-8 rounded-2xl bg-card border border-border hover:shadow-elevated transition-all group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${testimonial.color}`}
                >
                  <span className="text-white font-bold text-sm">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
