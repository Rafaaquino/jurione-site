import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Features } from "@/components/landing/Features";
import { Apps } from "@/components/landing/Apps";
import { ProductDemo } from "@/components/landing/ProductDemo";
import { ImportAutomation } from "@/components/landing/ImportAutomation";
import { AIHighlight } from "@/components/landing/AIHighlight";
import { Benefits } from "@/components/landing/Benefits";
import { Customization } from "@/components/landing/Customization";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <ImportAutomation />
        <Apps />
        <ProductDemo />
        <AIHighlight />
        <Benefits />
        <Customization />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
