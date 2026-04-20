import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfUse from "@/pages/TermsOfUse";
import LGPD from "@/pages/LGPD";
import NotFound from "@/pages/NotFound";

// Framer Motion usa useLayoutEffect — patching para evitar warnings no Node
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(React as any).useLayoutEffect = React.useEffect;

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
        <Route path="/termos-uso" element={<TermsOfUse />} />
        <Route path="/lgpd" element={<LGPD />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </StaticRouter>
  );
}
