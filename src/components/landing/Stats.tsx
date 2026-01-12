import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function Counter({
  from,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
}: CounterProps) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration,
        onUpdate: (value) => setCount(Math.floor(value)),
      });
      return () => controls.stop();
    }
  }, [from, to, duration, isInView]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

const stats = [
  {
    value: 8,
    suffix: "+",
    label: "Módulos Integrados",
    description: "Sistema completo para escritórios",
  },
  {
    value: 300,
    suffix: "k +",
    label: "IA Integrada",
    description: "Mais de 300.000k de tokens de IA disponíveis",
  },
  {
    value: 100,
    suffix: "%",
    label: "LGPD Compliant",
    description: "Segurança e privacidade garantidas",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Disponibilidade",
    description: "Sistema sempre online e acessível",
  },
];

export function Stats() {
  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary mb-2">
                <Counter from={0} to={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-semibold text-lg mb-1">{stat.label}</p>
              <p className="text-background/60 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
