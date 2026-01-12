import { Header } from "./Header";
import { Footer } from "./Footer";
import type { LegalLayoutProps } from "@/models/legal-layout.model";

export function LegalLayout({
  title,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm">
              Última atualização: {lastUpdated}
            </p>
          </div>
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-ul:text-muted-foreground prose-li:text-muted-foreground prose-h2:mt-12 prose-h2:mb-6 prose-h3:mt-8 prose-h3:mb-4">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
