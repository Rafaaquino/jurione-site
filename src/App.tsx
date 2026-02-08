import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfUse from "@/pages/TermsOfUse";
import LGPD from "@/pages/LGPD";
import Afiliado from "@/pages/Afiliado";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/afiliado" element={<Afiliado />} />
        <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
        <Route path="/termos-uso" element={<TermsOfUse />} />
        <Route path="/lgpd" element={<LGPD />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
