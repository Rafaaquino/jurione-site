import { motion } from "framer-motion";
import { Play, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";

const demoFeatures = [
  "Interface intuitiva e moderna",
  "Geração de petições com IA",
  "Gestão completa de processos",
  "Controle financeiro integrado",
  "Relatórios em tempo real",
  "Notificações automáticas",
];

export function ProductDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

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
            Demonstração
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6"
          >
            Demonstração do{" "}
            <span className="text-gradient">Sistema</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Veja na prática como o JuriOne pode transformar a gestão do seu escritório de advocacia
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
              <video
                ref={videoRef}
                className="w-full h-auto"
                poster="/placeholder.svg"
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              >
                <source src="/videos/demo-sistema.mp4" type="video/mp4" />
                Seu navegador não suporta a reprodução de vídeos.
              </video>

              {/* Custom Play Button Overlay */}
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer backdrop-blur-sm"
                  onClick={handlePlayPause}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-elevated"
                  >
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Decorative Elements */}
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
                Assista ao vídeo completo e descubra como o JuriOne simplifica
                a rotina do seu escritório com tecnologia de ponta e
                inteligência artificial.
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
