import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { enviarContato } from "@/services/api";

export function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    escritorio: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);

  const formatPhone = (value: string): string => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara baseada no tamanho
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(
        6,
      )}`;
    } else {
      // Celular com 11 dígitos
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
        7,
        11,
      )}`;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Aplica máscara apenas para o campo telefone
    if (name === "telefone") {
      const formattedValue = formatPhone(value);
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Enviar dados para a API
      const response = await enviarContato(formData);

      if (response.success) {
        toast({
          title: "Mensagem enviada!",
          description: response.message || "Entraremos em contato em breve.",
        });

        // Limpar formulário
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          escritorio: "",
          mensagem: "",
        });
      } else {
        throw new Error(response.error || "Erro ao enviar mensagem");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);

      toast({
        title: "Erro ao enviar",
        description:
          error instanceof Error
            ? error.message
            : "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-20 md:py-32 bg-secondary/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-primary font-semibold mb-4"
            >
              Agende uma Demonstração
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6"
            >
              Veja o JuriOne em <span className="text-gradient">ação</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Preencha o formulário abaixo e nossa equipe entrará em contato
              para agendar uma demonstração personalizada do sistema.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Informações de Contato */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-display font-bold text-2xl mb-4">
                  Entre em contato
                </h3>
                <p className="text-muted-foreground mb-6">
                  Nossa equipe está pronta para mostrar como o JuriOne pode
                  transformar a gestão do seu escritório.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a
                      href="mailto:contato@jurione.com.br"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      contato@jurione.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Telefone</p>
                    <a
                      href="tel:+5511000000000"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      (00) 00000-0000
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Formulário */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-4"
            >
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium mb-2"
                >
                  Nome completo *
                </label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  className="block text-sm font-medium mb-2"
                >
                  Telefone
                </label>
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label
                  htmlFor="escritorio"
                  className="block text-sm font-medium mb-2"
                >
                  Nome do Escritório
                </label>
                <Input
                  id="escritorio"
                  name="escritorio"
                  type="text"
                  value={formData.escritorio}
                  onChange={handleChange}
                  placeholder="Nome do seu escritório"
                />
              </div>

              <div>
                <label
                  htmlFor="mensagem"
                  className="block text-sm font-medium mb-2"
                >
                  Mensagem
                </label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Conte-nos sobre suas necessidades..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full gradient-cta text-primary-foreground font-semibold shadow-soft hover:opacity-90 transition-opacity"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Mensagem
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
