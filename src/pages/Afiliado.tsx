import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * Página de redirecionamento de afiliados
 * URL: https://jurione.com.br/afiliado?ref=CODIGO
 * 
 * Esta página detecta o parâmetro ?ref=... e redireciona automaticamente
 * para o app (jurione.app.br) mantendo o código de afiliado.
 * 
 * Resolve o problema de domínios diferentes (.com.br → .app.br)
 * onde cookies/localStorage não são compartilhados.
 */
const Afiliado = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const ref = searchParams.get("ref");

    if (!ref) {
      // Se não tem ref, redirecionar para home
      console.warn("Afiliado: código ref não encontrado, redirecionando para home");
      navigate("/");
      return;
    }

    // Validar formato do código (apenas alfanumérico)
    const isValidCode = /^[a-zA-Z0-9]+$/.test(ref);
    if (!isValidCode) {
      console.warn("Afiliado: código ref inválido", { ref });
      navigate("/");
      return;
    }

    // GTM tracking (se disponível)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "affiliate_redirect",
        affiliate: ref,
        timestamp: new Date().toISOString(),
      });
    }

    // Log para debug
    console.log("Afiliado: redirecionando com código", {
      ref,
      targetUrl: `https://jurione.app.br/register?ref=${ref}`,
    });

    // Redirecionar para o app mantendo o ref
    const appUrl = process.env.VITE_APP_URL || "https://jurione.app.br";
    const targetUrl = `${appUrl}/register?ref=${encodeURIComponent(ref)}`;
    
    // Usar replace para não adicionar ao histórico
    window.location.replace(targetUrl);
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Redirecionando...
        </h2>
        <p className="text-gray-600">
          Você está sendo redirecionado para criar sua conta.
        </p>
      </div>
    </div>
  );
};

export default Afiliado;
