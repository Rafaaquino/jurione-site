import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Compass, Headset, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn(
      "404: rota não encontrada",
      { path: location.pathname, search: location.search },
    );
  }, [location.pathname, location.search]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-secondary/30">
      <div className="absolute inset-x-0 top-[-120px] h-72 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.12),_transparent_55%)]" />
      <div className="absolute inset-x-0 bottom-[-160px] h-96 bg-[radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),_transparent_60%)]" />

      <div className="relative container flex min-h-screen items-center py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] items-center w-full">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              <Compass className="h-4 w-4" />
              Página não encontrada
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Opa! Parece que você se perdeu.
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                A página que você tentou acessar não existe ou foi movida.
                Enquanto isso, você pode voltar ao início ou falar com nosso time
                para receber ajuda rapidamente.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link to="/" aria-label="Voltar para a página inicial">
                  <Home className="mr-2 h-5 w-5" />
                  Ir para a página inicial
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/#contato" aria-label="Falar com o time de suporte">
                  <Headset className="mr-2 h-5 w-5" />
                  Falar com o time
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/#hero" aria-label="Voltar para o topo">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Voltar ao topo
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 max-w-xl">
              <div className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Suporte</p>
                    <p className="font-semibold">contato@jurione.com.br</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Headset className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Demonstração</p>
                    <p className="font-semibold">Agende uma conversa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-primary/20" />
            <div className="relative rounded-3xl border border-border/60 bg-card/80 p-8 shadow-xl backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                  <Compass className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Erro 404</p>
                  <h2 className="font-display text-2xl font-bold">Navegação segura</h2>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-border/50 bg-background/60 p-4">
                  <p className="text-sm text-muted-foreground">
                    Tente um dos caminhos abaixo para continuar explorando o JuriOne:
                  </p>
                  <div className="mt-4 grid gap-2">
                    <Link to="/#funcionalidades" className="group flex items-center justify-between rounded-xl border border-border/50 px-4 py-3 hover:border-primary hover:bg-primary/5 transition-colors">
                      <span className="font-medium">Ver funcionalidades</span>
                      <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground group-hover:text-primary" />
                    </Link>
                    <Link to="/#planos" className="group flex items-center justify-between rounded-xl border border-border/50 px-4 py-3 hover:border-primary hover:bg-primary/5 transition-colors">
                      <span className="font-medium">Planos e preços</span>
                      <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground group-hover:text-primary" />
                    </Link>
                    <Link to="/#faq" className="group flex items-center justify-between rounded-xl border border-border/50 px-4 py-3 hover:border-primary hover:bg-primary/5 transition-colors">
                      <span className="font-medium">Dúvidas frequentes</span>
                      <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground group-hover:text-primary" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
