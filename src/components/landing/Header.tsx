import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirectToTrial } from "@/lib/utils";

const navItems = [
  { label: "Início", href: "#hero" },
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Demonstração", href: "#demonstracao" },
  { label: "Para seu escritório", href: "#escritorio" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-lg md:text-xl">
              J
            </span>
          </div>
          <span className="font-display font-bold text-xl md:text-2xl text-foreground">
            Juri<span className="text-primary">One</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            className="font-medium"
            onClick={() =>
              window.open(
                "https://jurione.app.br/auth/login",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Entrar
          </Button>
          <Button
            className="gradient-cta text-primary-foreground font-semibold shadow-soft hover:opacity-90 transition-opacity"
            onClick={redirectToTrial}
          >
            Teste Grátis
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <nav className="container py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full justify-center font-medium"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.open(
                      "https://jurione.app.br/auth/login",
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  Entrar
                </Button>
                <Button
                  className="w-full gradient-cta text-primary-foreground font-semibold"
                  onClick={() => {
                    setIsMenuOpen(false);
                    redirectToTrial();
                  }}
                >
                  Teste Grátis
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
