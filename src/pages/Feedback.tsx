import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { enviarFeedback } from "@/services/api";

const WHATSAPP_NUMBER = "5511978354494";

const Feedback = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    nome: "",
    email: searchParams.get("email") || "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await enviarFeedback(formData);

      if (response.success) {
        setSent(true);
      } else {
        throw new Error(response.error || "Erro ao enviar feedback");
      }
    } catch (error) {
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <span className="inline-block text-primary font-semibold mb-4">
              Sua opinião importa
            </span>
            <h1 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              O que fez você não assinar ainda?
            </h1>
            <p className="text-muted-foreground text-lg">
              Faltou algum recurso, o preço não encaixou, ou simplesmente não
              deu tempo de testar direito? Seu retorno vai direto para o time
              que constrói o produto — leva só 2 minutos.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            {sent ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-4" />
                <h2 className="font-display font-bold text-2xl mb-2 text-foreground">
                  Obrigado pelo feedback!
                </h2>
                <p className="text-muted-foreground">
                  Seu retorno foi recebido e pode ser exatamente o que a
                  próxima versão do JuriOne precisava resolver.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium mb-2"
                  >
                    Nome *
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
                    htmlFor="mensagem"
                    className="block text-sm font-medium mb-2"
                  >
                    Mensagem *
                  </label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Conte pra gente o que faltou..."
                    rows={5}
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
                      Enviar Feedback
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          <div className="text-center mt-6">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Olá! Meu trial no JuriOne expirou e queria dar um feedback rápido.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Prefere falar por WhatsApp? Clique aqui
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Feedback;
