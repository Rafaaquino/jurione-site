import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cadastroRapido } from "@/services/api";
import { usePlanos, type FeatureStatus as CampFeatureStatus } from "@/hooks/use-planos";

const APP_URL = import.meta.env.VITE_API_SITE;

type PlanName =
  | "trial"
  | "basico"
  | "intermediario"
  | "profissional"
  | "empresarial";

const PLAN_LABELS: Record<PlanName, string> = {
  trial: "Trial Gratuito (14 dias)",
  basico: "Plano Básico — R$180/mês",
  intermediario: "Plano Intermediário — R$290/mês",
  profissional: "Plano Profissional — R$720/mês",
  empresarial: "Plano Empresarial — R$2.800/mês",
};

const gtmPush = (
  payload: { event: string; [key: string]: unknown },
  callback?: () => void,
) => {
  window.dataLayer = window.dataLayer ?? [];
  if (callback) {
    window.dataLayer.push({
      ...payload,
      eventCallback: callback,
      eventTimeout: 1500,
    });
  } else {
    window.dataLayer.push(payload);
  }
};

const GT: React.CSSProperties = {
  background: "linear-gradient(90deg, #818CF8, #60A5FA)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// ─── Modal ───────────────────────────────────────────────────────────────────

function CadastroModal({
  open,
  plan,
  onClose,
  isMobile,
}: {
  open: boolean;
  plan: PlanName;
  onClose: () => void;
  isMobile?: boolean;
}) {
  const [showPass, setShowPass] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [vals, setVals] = useState({
    nomeEscritorio: "",
    nomeCompleto: "",
    email: "",
    senha: "",
  });
  const [errs, setErrs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (state !== "success") return;
    let c = 3;
    setCountdown(c);
    const iv = setInterval(() => {
      c--;
      setCountdown(c);
      if (c <= 0) clearInterval(iv);
    }, 1000);
    return () => clearInterval(iv);
  }, [state]);

  const reset = () => {
    setVals({ nomeEscritorio: "", nomeCompleto: "", email: "", senha: "" });
    setErrs({});
    setErrorMsg("");
    setState("idle");
    setShowPass(false);
    setCountdown(3);
  };

  const handleClose = () => {
    if (state !== "loading") {
      reset();
      onClose();
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (vals.nomeEscritorio.trim().length < 3)
      e.nomeEscritorio = "Informe o nome do escritório (mín. 3 caracteres)";
    if (vals.nomeCompleto.trim().length < 3)
      e.nomeCompleto = "Informe seu nome completo (mín. 3 caracteres)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email.trim()))
      e.email = "Informe um e-mail válido";
    if (vals.senha.length < 8)
      e.senha = "A senha deve ter pelo menos 8 caracteres";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrs(e);
      return;
    }
    setErrs({});
    setErrorMsg("");
    setState("loading");
    const emailTrimmed = vals.email.trim().toLowerCase();
    try {
      await cadastroRapido({
        nomeEscritorio: vals.nomeEscritorio.trim(),
        nomeCompleto: vals.nomeCompleto.trim(),
        email: emailTrimmed,
        senha: vals.senha,
        source: "campanha",
      });
      const redirectUrl = `${APP_URL}/auth/login?email=${encodeURIComponent(emailTrimmed)}&source=campanha`;
      gtmPush(
        {
          event: "trial_signup",
          plan_name: plan,
          source: "campanha",
          office_name: vals.nomeEscritorio.trim(),
        },
        () => {
          window.location.href = redirectUrl;
        },
      );
      setState("success");
    } catch (err: any) {
      gtmPush({ event: "signup_error", error_msg: err?.message });
      setErrorMsg(err?.message || "Erro ao criar conta. Tente novamente.");
      setState("error");
    }
  };

  if (!open) return null;

  const inp = (hasErr: boolean): React.CSSProperties => ({
    width: "100%",
    background: "rgba(15,23,42,.95)",
    border: `1px solid ${hasErr ? "rgba(239,68,68,.5)" : "rgba(99,102,241,.18)"}`,
    borderRadius: "10px",
    padding: "13px 16px",
    fontSize: "15px",
    color: "#F1F5F9",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    marginBottom: hasErr ? "6px" : "18px",
    boxSizing: "border-box",
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.75)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(10px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        style={{
          background: "#0D1120",
          border: "1px solid rgba(99,102,241,.28)",
          borderRadius: "22px",
          padding: isMobile ? "24px 20px" : "44px",
          width: "100%",
          maxWidth: "480px",
          position: "relative",
          boxShadow: "0 0 80px rgba(99,102,241,.2)",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            background: "transparent",
            border: "none",
            color: "#64748B",
            fontSize: "26px",
            cursor: "pointer",
            lineHeight: 1,
            fontFamily: "sans-serif",
          }}
        >
          ×
        </button>

        {state !== "success" ? (
          <>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(34,197,94,.1)",
                border: "1px solid rgba(34,197,94,.2)",
                borderRadius: "20px",
                padding: "4px 12px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#4ADE80",
                marginBottom: "16px",
              }}
            >
              ✓ 14 dias grátis · Sem cartão
            </div>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: 800,
                marginBottom: "6px",
                letterSpacing: "-0.5px",
                color: "#F1F5F9",
              }}
            >
              Criar sua conta agora
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#64748B",
                marginBottom: "16px",
                lineHeight: 1.6,
              }}
            >
              Preencha em 30 segundos e comece a usar hoje.
            </p>
            <div
              style={{
                display: "inline-block",
                background: "rgba(99,102,241,.1)",
                border: "1px solid rgba(99,102,241,.25)",
                borderRadius: "8px",
                padding: "4px 12px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#A5B4FC",
                marginBottom: "20px",
              }}
            >
              Plano: {PLAN_LABELS[plan]}
            </div>

            {state === "error" && errorMsg && (
              <div
                style={{
                  background: "rgba(239,68,68,.1)",
                  border: "1px solid rgba(239,68,68,.3)",
                  borderRadius: "10px",
                  padding: "13px 16px",
                  fontSize: "13px",
                  color: "#F87171",
                  marginBottom: "18px",
                }}
              >
                {errorMsg}
              </div>
            )}

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#94A3B8",
                  marginBottom: "6px",
                }}
              >
                Nome do escritório
              </label>
              <input
                style={inp(!!errs.nomeEscritorio)}
                type="text"
                placeholder="Ex: Costa & Barros Advocacia"
                value={vals.nomeEscritorio}
                onChange={(e) =>
                  setVals((v) => ({ ...v, nomeEscritorio: e.target.value }))
                }
              />
              {errs.nomeEscritorio && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#F87171",
                    marginBottom: "14px",
                  }}
                >
                  {errs.nomeEscritorio}
                </p>
              )}

              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#94A3B8",
                  marginBottom: "6px",
                }}
              >
                Seu nome completo
              </label>
              <input
                style={inp(!!errs.nomeCompleto)}
                type="text"
                placeholder="Dr(a). Nome Sobrenome"
                value={vals.nomeCompleto}
                onChange={(e) =>
                  setVals((v) => ({ ...v, nomeCompleto: e.target.value }))
                }
              />
              {errs.nomeCompleto && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#F87171",
                    marginBottom: "14px",
                  }}
                >
                  {errs.nomeCompleto}
                </p>
              )}

              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#94A3B8",
                  marginBottom: "6px",
                }}
              >
                E-mail profissional
              </label>
              <input
                style={inp(!!errs.email)}
                type="email"
                placeholder="seu@escritorio.com.br"
                value={vals.email}
                onChange={(e) =>
                  setVals((v) => ({ ...v, email: e.target.value }))
                }
              />
              {errs.email && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#F87171",
                    marginBottom: "14px",
                  }}
                >
                  {errs.email}
                </p>
              )}

              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#94A3B8",
                  marginBottom: "6px",
                }}
              >
                Senha
              </label>
              <div
                style={{
                  position: "relative",
                  marginBottom: errs.senha ? "6px" : "18px",
                }}
              >
                <input
                  style={{
                    ...inp(!!errs.senha),
                    marginBottom: 0,
                    paddingRight: "48px",
                  }}
                  type={showPass ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={vals.senha}
                  onChange={(e) =>
                    setVals((v) => ({ ...v, senha: e.target.value }))
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#64748B",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errs.senha && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#F87171",
                    marginBottom: "14px",
                  }}
                >
                  {errs.senha}
                </p>
              )}

              <p
                style={{
                  fontSize: "12px",
                  color: "#64748B",
                  marginBottom: "22px",
                  lineHeight: 1.65,
                }}
              >
                Ao criar sua conta você concorda com os{" "}
                <a
                  href="/termos-uso"
                  target="_blank"
                  style={{ color: "#A5B4FC", textDecoration: "none" }}
                >
                  Termos de Uso
                </a>{" "}
                e a{" "}
                <a
                  href="/politica-privacidade"
                  target="_blank"
                  style={{ color: "#A5B4FC", textDecoration: "none" }}
                >
                  Política de Privacidade
                </a>
                .
              </p>

              <button
                onClick={handleSubmit}
                disabled={state === "loading"}
                style={{
                  width: "100%",
                  padding: "15px",
                  fontSize: "16px",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #6366F1, #3B82F6)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  cursor: state === "loading" ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 0 28px rgba(99,102,241,.3)",
                  fontFamily: "'Inter', sans-serif",
                  opacity: state === "loading" ? 0.6 : 1,
                }}
              >
                {state === "loading" ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Criar Conta Gratuita →"
                )}
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "60px", marginBottom: "18px" }}>🎉</div>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: 800,
                marginBottom: "10px",
                color: "#F1F5F9",
              }}
            >
              Conta criada com sucesso!
            </h3>
            <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.7 }}>
              Seus 14 dias de trial começam agora.
              <br />
              Redirecionando em{" "}
              <strong style={{ color: "#A5B4FC" }}>{countdown}</strong> segundo
              {countdown !== 1 ? "s" : ""}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        border: `1px solid ${open ? "rgba(99,102,241,.25)" : "rgba(99,102,241,.1)"}`,
        borderRadius: "12px",
        marginBottom: "10px",
        overflow: "hidden",
        transition: "border-color .2s",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          padding: "20px 26px",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: 600,
          color: "#F1F5F9",
          fontFamily: "'Inter', sans-serif",
          gap: "16px",
        }}
      >
        {q}
        <span
          style={{
            fontSize: "22px",
            color: "#A5B4FC",
            transition: "transform .3s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height .4s ease",
        }}
      >
        <div
          style={{
            padding: "0 26px 22px",
            fontSize: "14px",
            color: "#94A3B8",
            lineHeight: 1.75,
          }}
        >
          {a}
        </div>
      </div>
    </div>
  );
}

// ─── Campanha Page ────────────────────────────────────────────────────────────

const S: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    background: "#080C18",
    color: "#F1F5F9",
    lineHeight: 1.6,
    overflowX: "hidden",
    minHeight: "100vh",
  },
  con: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 24px",
    position: "relative",
    zIndex: 1,
  },
  sec: { padding: "80px 0" },
  slabel: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#A5B4FC",
    display: "block",
    textAlign: "center",
    marginBottom: "14px",
  },
  stitle: {
    fontSize: "clamp(28px,4vw,44px)",
    fontWeight: 800,
    letterSpacing: "-1.5px",
    textAlign: "center",
    marginBottom: "14px",
    lineHeight: 1.1,
  },
  ssub: {
    fontSize: "16px",
    color: "#94A3B8",
    textAlign: "center",
    maxWidth: "600px",
    margin: "0 auto 52px",
    lineHeight: 1.7,
  },
  btnPri: {
    background: "linear-gradient(135deg, #6366F1, #3B82F6)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "16px",
    padding: "16px 34px",
    borderRadius: "12px",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 0 36px rgba(99,102,241,.35)",
    transition: "all .2s",
    fontFamily: "'Inter', sans-serif",
  },
  btnOut: {
    background: "transparent",
    color: "#E2E8F0",
    fontWeight: 600,
    fontSize: "16px",
    padding: "16px 32px",
    borderRadius: "12px",
    textDecoration: "none",
    border: "1px solid rgba(99,102,241,.22)",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transition: "all .2s",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: "rgba(15,23,42,.9)",
    border: "1px solid rgba(99,102,241,.1)",
    borderRadius: "18px",
    padding: "22px",
    transition: "all .2s",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
  },
  gline: {
    height: "3px",
    background:
      "linear-gradient(90deg, transparent, #6366F1 35%, #3B82F6 65%, transparent)",
  },
};

// ─── Pricing data ─────────────────────────────────────────────────────────────


function CampStatusDot({ status }: { status: CampFeatureStatus }) {
  const base: React.CSSProperties = {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    flexShrink: 0,
    marginTop: "3px",
    display: "inline-block",
  };
  if (status === "included")
    return <span style={{ ...base, background: "#22C55E" }} />;
  if (status === "limited")
    return <span style={{ ...base, background: "#FBBF24" }} />;
  return <span style={{ ...base, background: "rgba(148,163,184,.3)" }} />;
}

export default function Campanha() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanName>("trial");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false,
  );
  const { data: campanhaPlanos, isLoading: planosLoading } = usePlanos();

  const openModal = (plan: PlanName = "trial") => {
    setSelectedPlan(plan);
    setModalOpen(true);
    gtmPush({
      event: "signup_modal_open",
      plan_name: plan,
      source: "campanha",
    });
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const faqs = [
    {
      q: "Como funciona o controle de prazos?",
      a: "Você cadastra o processo com os prazos processuais. O JuriOne envia alertas automáticos por notificação push com a antecedência que você configura — 30, 15, 7, 3 e 1 dia antes. Todos os advogados vinculados ao processo recebem o alerta. Nunca mais um prazo esquecido.",
    },
    {
      q: "A análise de contratos com IA funciona para qualquer tipo de contrato?",
      a: "Sim. Você envia o contrato em PDF ou Word e a IA analisa cláusulas de risco, inconsistências, ausência de cláusulas essenciais e pontos de atenção. Funciona para contratos de prestação de serviço, contratos empresariais, contratos imobiliários e acordos extrajudiciais. O relatório fica pronto em minutos.",
    },
    {
      q: "Posso migrar processos que já tenho em outro sistema ou planilha?",
      a: "Sim. O JuriOne aceita importação via CSV para cadastro em massa de processos e clientes. Nossa equipe de suporte também oferece auxílio na migração para assinantes dos planos Profissional e Empresarial. Você não perde nenhum histórico.",
    },
    {
      q: "Preciso de cartão de crédito para o trial?",
      a: "Não. O trial de 14 dias é completamente grátis e sem necessidade de cartão. Você só informa os dados de pagamento se decidir assinar após o período de teste. Não existe cobrança automática — você escolhe continuar.",
    },
    {
      q: "Meus dados e dos meus clientes ficam seguros?",
      a: "Sim. O JuriOne é 100% LGPD Compliant. Cada escritório tem seu ambiente completamente isolado — nenhum dado é compartilhado com outros usuários. Utilizamos criptografia em trânsito (TLS 1.3) e em repouso, com backups automáticos diários e auditoria completa de acessos.",
    },
    {
      q: "As calculadoras jurídicas são confiáveis?",
      a: "Sim. Nossas calculadoras são atualizadas com os índices econômicos oficiais (INPC, IPCA, SELIC, FGTS) e seguem a metodologia adotada pelos tribunais brasileiros. Os resultados incluem memória de cálculo detalhada, exportável em PDF para juntar ao processo.",
    },
    {
      q: "O sistema funciona em celular e tablet?",
      a: "Sim. O JuriOne é responsivo e funciona em qualquer dispositivo — computador, tablet e celular. Acesse seus processos, receba alertas de prazo e consulte históricos em qualquer lugar, a qualquer hora.",
    },
  ];

  return (
    <div style={S.page}>
      {/* BG grid overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          /*backgroundImage:
            "linear-gradient(rgba(99,102,241,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,.05) 1px, transparent 1px)",
          */ backgroundSize: "108px 108px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Blobs */}
      <div
        style={{
          position: "fixed",
          borderRadius: "50%",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 0,
          width: "800px",
          height: "800px",
          background:
            "radial-gradient(circle, rgba(99,102,241,.18) 0%, transparent 70%)",
          top: "-250px",
          right: "-250px",
        }}
      />
      <div
        style={{
          position: "fixed",
          borderRadius: "50%",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 0,
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(59,130,246,.12) 0%, transparent 70%)",
          bottom: "-100px",
          left: "-200px",
        }}
      />
      <div
        style={{
          position: "fixed",
          borderRadius: "50%",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 0,
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(139,92,246,.1) 0%, transparent 70%)",
          top: "50%",
          left: "40%",
        }}
      />

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(20px)",
          background: "rgba(8,12,24,.88)",
          borderBottom: "1px solid rgba(99,102,241,.08)",
          padding: "14px 0",
        }}
      >
        <div style={S.con}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #6366F1, #3B82F6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: 900,
                  color: "#fff",
                }}
              >
                J
              </div>
              <span
                style={{ fontSize: "18px", fontWeight: 700, color: "#E2E8F0" }}
              >
                JuriOne
              </span>
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <a
                href={`${APP_URL}/auth/login`}
                style={{
                  fontSize: "14px",
                  color: "#94A3B8",
                  textDecoration: "none",
                }}
              >
                Já tem conta? Entrar
              </a>
              <button
                onClick={() => openModal("trial")}
                style={{
                  ...S.btnPri,
                  fontSize: "14px",
                  padding: "9px 22px",
                  borderRadius: "10px",
                  boxShadow: "none",
                }}
              >
                Teste Grátis →
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0 64px", textAlign: "center" }}>
        <div style={S.con}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(99,102,241,.08)",
              border: "1px solid rgba(99,102,241,.22)",
              borderRadius: "32px",
              padding: "6px 18px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "#A5B4FC",
              marginBottom: "26px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#818CF8",
                boxShadow: "0 0 10px #6366F1",
                display: "inline-block",
                animation: "pulse 2s infinite",
              }}
            />
            Sistema Jurídico Completo · IA · Trial 14 Dias Grátis
          </div>
          <h1
            style={{
              fontSize: "clamp(38px, 5.5vw, 76px)",
              fontWeight: 900,
              letterSpacing: "-3px",
              lineHeight: 1.03,
              marginBottom: "24px",
            }}
          >
            Pare de <span style={GT}>perder o controle</span>
            <br />
            do seu escritório.
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 1.8vw, 19px)",
              color: "#94A3B8",
              maxWidth: "640px",
              margin: "0 auto 44px",
              lineHeight: 1.75,
            }}
          >
            Prazos esquecidos, processos desatualizados, contratos sem revisão e
            horas perdidas em tarefas manuais. O JuriOne centraliza e automatiza
            tudo — com alertas automáticos, IA jurídica e controle total de cada
            caso.
          </p>
          <div
            style={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "28px",
            }}
          >
            <button onClick={() => openModal("trial")} style={S.btnPri}>
              ⚡ Começar Trial Grátis de 14 Dias
            </button>
            <a href="#planos" style={S.btnOut}>
              Ver Planos e Preços
            </a>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "22px",
              fontSize: "13px",
              color: "#64748B",
              flexWrap: "wrap",
            }}
          >
            {[
              "Sem cartão de crédito",
              "Setup em minutos",
              "Cancele quando quiser",
              "LGPD Compliant",
            ].map((t) => (
              <span
                key={t}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span style={{ color: "#22C55E" }}>✓</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── URGENCY ─────────────────────────────────────────────── */}
      <div style={S.con}>
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,.08), rgba(59,130,246,.06))",
            border: "1px solid rgba(99,102,241,.2)",
            borderRadius: "14px",
            padding: "16px 28px",
            textAlign: "center",
            fontSize: "14px",
            color: "#A5B4FC",
            marginBottom: "72px",
            fontWeight: 500,
          }}
        >
          🔥 Novos preços de lançamento:{" "}
          <strong style={{ color: "#F1F5F9" }}>
            plano Básico por R$180/mês · Intermediário por R$290/mês
          </strong>{" "}
          com acesso antecipado a todos os novos módulos. Somente para os
          primeiros assinantes.
        </div>
      </div>

      {/* ── STATS ───────────────────────────────────────────────── */}
      <div style={S.con}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: "14px",
            marginBottom: "88px",
          }}
        >
          {[
            { n: "4h", l: "economizadas por dia por advogado" },
            { n: "0", l: "prazos perdidos com alertas automáticos" },
            { n: "3×", l: "mais processos gerenciados com a mesma equipe" },
            { n: "100%", l: "dos dados seguros e em conformidade com LGPD" },
          ].map((s) => (
            <div
              key={s.n}
              style={{
                background: "rgba(15,23,42,.9)",
                border: "1px solid rgba(99,102,241,.1)",
                borderRadius: "18px",
                padding: "30px 20px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "48px",
                  fontWeight: 900,
                  letterSpacing: "-2px",
                  ...GT,
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                {s.n}
              </span>
              <span
                style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.4 }}
              >
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PAIN — ANTES/DEPOIS ──────────────────────────────────── */}
      <section style={{ padding: "70px 0" }}>
        <div style={S.con}>
          <span style={S.slabel}>A realidade de quem não usa o JuriOne</span>
          <h2 style={{ ...S.stitle }}>
            Seu escritório está
            <br />
            <span style={GT}>operando no limite</span> — e você sabe disso.
          </h2>
          <p style={S.ssub}>
            A maioria dos escritórios de advocacia no Brasil usa planilhas,
            e-mails e papel para controlar processos que valem milhões. Isso não
            é sustentável.
          </p>

          {/* Prazo urgency block */}
          <div
            style={{
              background: "rgba(239,68,68,.05)",
              border: "1px solid rgba(239,68,68,.2)",
              borderRadius: "18px",
              padding: isMobile ? "20px 16px" : "32px 36px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <div style={{ fontSize: "48px", flexShrink: 0 }}>⚠️</div>
            <div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  marginBottom: "8px",
                  color: "#F87171",
                }}
              >
                Prazo perdido = processo perdido = cliente perdido.
              </div>
              <p
                style={{ fontSize: "15px", color: "#94A3B8", lineHeight: 1.6 }}
              >
                Um prazo esquecido pode custar uma liminar, uma apelação, ou
                pior — a confiança de um cliente.{" "}
                <strong style={{ color: "#F1F5F9" }}>
                  No JuriOne, cada prazo tem alerta automático com antecedência
                  configurável para toda a equipe.
                </strong>{" "}
                Você recebe notificações antes que o problema aconteça — não
                depois.
              </p>
            </div>
          </div>

          {/* Antes x Depois grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "20px",
            }}
          >
            {/* Sem JuriOne */}
            <div
              style={{
                background: "rgba(239,68,68,.04)",
                border: "1px solid rgba(239,68,68,.18)",
                borderRadius: "18px",
                padding: "30px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "22px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#F87171",
                }}
              >
                ✗ Sem o JuriOne
              </div>
              {[
                "Prazos controlados em planilhas e cadernos — um esquecimento e o processo está comprometido",
                "Histórico de movimentações espalhado em e-mails, papéis e memória da equipe",
                "Contratos assinados sem revisão adequada — cláusulas abusivas passam despercebidas",
                "Clientes ligando para saber do processo que você não sabe o status de cabeça",
                "Financeiro do escritório misturado com intuição — sem relatório, sem previsibilidade",
                "Cada advogado trabalha do seu jeito — sem padrão, sem colaboração, sem visibilidade",
              ].map((t) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    marginBottom: "16px",
                    fontSize: "14px",
                    color: "#E2E8F0",
                    lineHeight: 1.55,
                  }}
                >
                  <span style={{ flexShrink: 0, marginTop: "2px" }}>✗</span>
                  {t}
                </div>
              ))}
            </div>
            {/* Com JuriOne */}
            <div
              style={{
                background: "rgba(34,197,94,.04)",
                border: "1px solid rgba(34,197,94,.18)",
                borderRadius: "18px",
                padding: "30px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "22px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#4ADE80",
                }}
              >
                ✓ Com o JuriOne
              </div>
              {[
                "Alertas automáticos de prazo com dias de antecedência — para você e toda a equipe",
                "Histórico completo de movimentações de cada processo, acessível em segundos",
                "IA analisa contratos e aponta cláusulas de risco antes de você assinar",
                "Dashboard com status de todos os processos ativos — responda qualquer cliente em 10 segundos",
                "Honorários, receitas e despesas controlados com relatórios em tempo real",
                "Toda a equipe trabalhando na mesma plataforma, com permissões e histórico centralizados",
              ].map((t) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    marginBottom: "16px",
                    fontSize: "14px",
                    color: "#E2E8F0",
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: "2px",
                      color: "#4ADE80",
                    }}
                  >
                    ✓
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SCREENSHOT DO SISTEMA ────────────────────────────────── */}
      <section style={{ padding: "72px 0 56px" }}>
        <div style={S.con}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={S.slabel}>O Sistema</span>
            <h2 style={{ ...S.stitle, marginBottom: "12px" }}>
              Veja o JuriOne <span style={GT}>por dentro</span>
            </h2>
            <p style={{ ...S.ssub, marginBottom: 0 }}>
              Interface moderna, intuitiva e desenhada para a rotina do advogado
              brasileiro
            </p>
          </div>

          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(99,102,241,.22)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(99,102,241,.08)",
            }}
          >
            {/* Browser chrome bar */}
            <div
              style={{
                background: "rgba(15,20,40,.97)",
                borderBottom: "1px solid rgba(99,102,241,.12)",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", gap: "6px" }}>
                {["#EF4444", "#F59E0B", "#22C55E"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: "11px",
                      height: "11px",
                      borderRadius: "50%",
                      background: c,
                      opacity: 0.8,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  flex: 1,
                  background: "rgba(99,102,241,.07)",
                  border: "1px solid rgba(99,102,241,.12)",
                  borderRadius: "6px",
                  padding: "4px 12px",
                  fontSize: "11px",
                  color: "#475569",
                  textAlign: "center",
                }}
              >
                app.jurione.com.br
              </div>
            </div>

            <img
              src="/tela-do-sistema.png"
              alt="Tela do sistema JuriOne"
              style={{ width: "100%", height: "auto", display: "block" }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── FUNCIONALIDADES ──────────────────────────────────────── */}
      <section style={S.sec}>
        <div style={S.con}>
          <span style={S.slabel}>Funcionalidades</span>
          <h2 style={S.stitle}>
            Tudo que seu escritório precisa
            <br />
            <span style={GT}>em uma plataforma</span>
          </h2>
          <p style={S.ssub}>
            Não é um conjunto de ferramentas separadas. É um sistema integrado
            onde cada módulo conversa com os outros.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "18px",
              marginTop: "52px",
            }}
          >
            {[
              {
                icon: "⏰",
                title: "Controle de Prazos com Alertas",
                desc: "Nunca mais perca um prazo processual. Configure alertas com antecedência personalizável — 30, 15, 7, 3 e 1 dia antes. Notificações push para toda a equipe responsável.",
                tag: "Mais usado",
                highlight: true,
              },
              {
                icon: "📁",
                title: "Gestão de Processos Completa",
                desc: "Acompanhe cada processo com status, histórico de movimentações, documentos anexados, prazos, audiências e responsáveis — tudo em um único lugar, com linha do tempo visual.",
                tag: "Controle total",
                highlight: true,
              },
              {
                icon: "🤖",
                title: "Chat com IA Jurídica Inteligente",
                desc: "Converse com a IA em linguagem natural: consulte processos, clientes e contratos, gere petições e contestações, tire dúvidas jurídicas — tudo em um chat integrado ao seu escritório. 45 segundos, não 3 horas.",
                tag: "IA especializada",
                highlight: true,
              },
              {
                icon: "📝",
                title: "Análise de Contratos com IA",
                desc: "Envie qualquer contrato e a IA identifica cláusulas abusivas, inconsistências e pontos de risco. Relatório detalhado em minutos — antes de assinar, não depois de se arrepender.",
                tag: null,
                highlight: false,
              },
              {
                icon: "🧮",
                title: "Calculadoras Jurídicas",
                desc: "Calcule honorários advocatícios, juros, correção monetária (INPC, IPCA, SELIC), FGTS, verbas rescisórias e muito mais. Resultados exportáveis em PDF para juntar ao processo.",
                tag: null,
                highlight: false,
              },
              {
                icon: "👥",
                title: "Gestão de Clientes",
                desc: "Cadastro completo com histórico de atendimentos, documentos, processos vinculados e honorários. Busca automática de dados por CPF e CNPJ. Tudo acessível em segundos.",
                tag: null,
                highlight: false,
              },
              {
                icon: "💰",
                title: "Módulo Financeiro",
                desc: "Controle de honorários, receitas e despesas do escritório. Emissão de recibos, relatórios mensais, inadimplência e projeção financeira. Sem surpresas no fim do mês.",
                tag: null,
                highlight: false,
              },
              {
                icon: "📅",
                title: "Agenda e Audiências",
                desc: "Calendário integrado com processos e prazos. Registre audiências, reuniões e compromissos. Sincronize com sua equipe e receba lembretes automáticos com antecedência.",
                tag: null,
                highlight: false,
              },
              {
                icon: "📊",
                title: "Relatórios e Dashboards",
                desc: "Visão geral do escritório em tempo real: processos por status, prazos próximos, produtividade da equipe, receita do mês. Exporte em PDF ou Excel com um clique.",
                tag: null,
                highlight: false,
              },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  ...S.card,
                  ...(f.highlight
                    ? {
                        borderColor: "rgba(99,102,241,.3)",
                        background: "rgba(99,102,241,.05)",
                      }
                    : {}),
                }}
              >
                {f.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(99,102,241,.12)",
                      border: "1px solid rgba(99,102,241,.25)",
                      borderRadius: "20px",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "#A5B4FC",
                      padding: "3px 10px",
                    }}
                  >
                    ⭐ Destaque
                  </div>
                )}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: "rgba(99,102,241,.1)",
                    border: "1px solid rgba(99,102,241,.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    marginBottom: "18px",
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#94A3B8",
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </p>
                {f.tag && (
                  <div
                    style={{
                      display: "inline-block",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#4ADE80",
                      background: "rgba(34,197,94,.1)",
                      border: "1px solid rgba(34,197,94,.2)",
                      borderRadius: "20px",
                      padding: "3px 10px",
                      marginTop: "14px",
                    }}
                  >
                    {f.tag}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI CHAT ──────────────────────────────────────────────── */}
      <section
        style={{ padding: "80px 0", background: "rgba(99,102,241,.03)" }}
      >
        <div style={S.con}>
          <span style={S.slabel}>Chat com IA</span>
          <h2 style={S.stitle}>
            Converse com seu escritório.
            <br />
            <span style={GT}>A IA responde em segundos.</span>
          </h2>
          <p style={S.ssub}>
            Não é só geração de documentos. O assistente de IA do JuriOne
            entende perguntas em linguagem natural sobre seus processos,
            clientes e contratos — como falar com um sócio que conhece cada
            detalhe do escritório.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "32px",
              marginTop: "56px",
              alignItems: "center",
            }}
          >
            {/* Chat mock */}
            <div
              style={{
                background: "rgba(15,23,42,.95)",
                border: "1px solid rgba(99,102,241,.2)",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,0,0,.4)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(99,102,241,.12)",
                  background: "rgba(99,102,241,.06)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #6366F1, #3B82F6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    flexShrink: 0,
                  }}
                >
                  🤖
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#E2E8F0",
                    }}
                  >
                    JuriOne IA
                  </div>
                  <div style={{ fontSize: "11px", color: "#64748B" }}>
                    Assistente Jurídico
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#22C55E",
                      boxShadow: "0 0 6px #22C55E",
                    }}
                  />
                  <span style={{ fontSize: "11px", color: "#64748B" }}>
                    Online
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {/* User message 1 */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #6366F1, #3B82F6)",
                      borderRadius: "16px 16px 4px 16px",
                      padding: "10px 16px",
                      maxWidth: "80%",
                      fontSize: "13px",
                      color: "#fff",
                      lineHeight: 1.5,
                    }}
                  >
                    Quais processos do cliente João Silva vencem essa semana?
                  </div>
                </div>
                {/* AI reply 1 */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, #6366F1, #3B82F6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      flexShrink: 0,
                    }}
                  >
                    🤖
                  </div>
                  <div
                    style={{
                      background: "rgba(99,102,241,.08)",
                      border: "1px solid rgba(99,102,241,.15)",
                      borderRadius: "4px 16px 16px 16px",
                      padding: "10px 16px",
                      maxWidth: "85%",
                      fontSize: "13px",
                      color: "#E2E8F0",
                      lineHeight: 1.6,
                    }}
                  >
                    <div style={{ marginBottom: "8px" }}>
                      Encontrei{" "}
                      <strong style={{ color: "#A5B4FC" }}>
                        2 processos ativos
                      </strong>{" "}
                      para João Silva com prazos esta semana:
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      {[
                        {
                          num: "0012345-78.2024.5.02",
                          tipo: "Trabalhista",
                          prazo: "22/05 · 5 dias",
                          color: "#F59E0B",
                        },
                        {
                          num: "0098765-43.2023.8.26",
                          tipo: "Cível",
                          prazo: "24/05 · 7 dias",
                          color: "#60A5FA",
                        },
                      ].map((p) => (
                        <div
                          key={p.num}
                          style={{
                            background: "rgba(15,23,42,.6)",
                            borderRadius: "8px",
                            padding: "8px 12px",
                            fontSize: "12px",
                            borderLeft: `3px solid ${p.color}`,
                          }}
                        >
                          <div style={{ color: "#A5B4FC", fontWeight: 600 }}>
                            {p.num}
                          </div>
                          <div style={{ color: "#64748B", marginTop: "2px" }}>
                            {p.tipo} · Prazo: {p.prazo}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* User message 2 */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #6366F1, #3B82F6)",
                      borderRadius: "16px 16px 4px 16px",
                      padding: "10px 16px",
                      maxWidth: "80%",
                      fontSize: "13px",
                      color: "#fff",
                      lineHeight: 1.5,
                    }}
                  >
                    Gere a contestação do processo trabalhista
                  </div>
                </div>
                {/* AI reply 2 */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, #6366F1, #3B82F6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      flexShrink: 0,
                    }}
                  >
                    🤖
                  </div>
                  <div
                    style={{
                      background: "rgba(99,102,241,.08)",
                      border: "1px solid rgba(99,102,241,.15)",
                      borderRadius: "4px 16px 16px 16px",
                      padding: "10px 16px",
                      maxWidth: "85%",
                      fontSize: "13px",
                      color: "#E2E8F0",
                      lineHeight: 1.6,
                    }}
                  >
                    ✨{" "}
                    <strong style={{ color: "#A5B4FC" }}>
                      Contestação gerada!
                    </strong>{" "}
                    Estrutura completa com fundamentos do TST e CLT,
                    jurisprudência aplicável e pedidos. Pronta para revisão e
                    download em Word.
                  </div>
                </div>
              </div>

              {/* Input bar */}
              <div
                style={{
                  padding: "16px 20px",
                  borderTop: "1px solid rgba(99,102,241,.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "rgba(99,102,241,.06)",
                    border: "1px solid rgba(99,102,241,.15)",
                    borderRadius: "12px",
                    padding: "10px 16px",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#475569", flex: 1 }}>
                    Pergunte sobre processos, contratos, clientes...
                  </span>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, #6366F1, #3B82F6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    →
                  </div>
                </div>
              </div>
            </div>

            {/* Capabilities list */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {[
                {
                  icon: "🔍",
                  title: "Consulte seus dados em linguagem natural",
                  desc: "Pergunte sobre qualquer processo, cliente ou contrato sem precisar navegar por menus. A IA busca e organiza as informações para você.",
                },
                {
                  icon: "📋",
                  title: "Gere documentos direto no chat",
                  desc: "Peça uma petição, contestação ou contrato e receba o documento completo em segundos — com jurisprudência e legislação aplicável.",
                },
                {
                  icon: "⚖️",
                  title: "Tire dúvidas jurídicas com contexto",
                  desc: "Perguntas sobre legislação e procedimentos respondidas com base no seu caso específico e nos dados reais do seu escritório.",
                },
                {
                  icon: "📊",
                  title: "Relatórios e análises sob demanda",
                  desc: '"Quantos processos temos no STJ?", "Qual a taxa de êxito do mês?", "Processos com audiência esta semana?" — resposta imediata.',
                },
              ].map((c) => (
                <div
                  key={c.title}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "rgba(99,102,241,.1)",
                      border: "1px solid rgba(99,102,241,.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#E2E8F0",
                        marginBottom: "4px",
                      }}
                    >
                      {c.title}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#94A3B8",
                        lineHeight: 1.6,
                      }}
                    >
                      {c.desc}
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => openModal("trial")}
                style={{
                  ...S.btnPri,
                  marginTop: "8px",
                  fontSize: "15px",
                }}
              >
                Testar o Chat com IA →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ────────────────────────────────────────── */}
      <section style={{ padding: "70px 0" }}>
        <div style={S.con}>
          <span style={S.slabel}>Como funciona</span>
          <h2 style={S.stitle}>
            Começar leva <span style={GT}>menos de 10 minutos</span>
          </h2>
          <p style={S.ssub}>
            Sem migração complexa, sem treinamento longo. Configure e já comece
            a usar.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "20px",
              marginTop: "52px",
            }}
          >
            {[
              {
                n: "1",
                title: "Crie sua conta grátis",
                desc: "Cadastro em 4 campos — nome do escritório, seu nome, e-mail e senha. Sem CNPJ obrigatório, sem formulário longo. Em 2 minutos você já está dentro.",
              },
              {
                n: "2",
                title: "Importe ou cadastre seus processos",
                desc: "Adicione seus processos ativos com número CNJ, cliente, advogado responsável e status. Configure os prazos e os alertas começam a funcionar imediatamente.",
              },
              {
                n: "3",
                title: "Seu escritório no controle",
                desc: "A partir de agora, cada prazo tem alerta, cada processo tem histórico, cada contrato pode ser analisado pela IA e cada documento pode ser gerado em minutos.",
              },
            ].map((s) => (
              <div key={s.n} style={{ ...S.card, paddingBottom: "30px" }}>
                <div
                  style={{
                    ...S.gline,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                />
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(99,102,241,.1)",
                    border: "1px solid rgba(99,102,241,.22)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "#A5B4FC",
                    marginBottom: "18px",
                  }}
                >
                  {s.n}
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#94A3B8",
                    lineHeight: 1.65,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section style={S.sec}>
        <div style={S.con}>
          <span style={S.slabel}>O que advogados dizem</span>
          <h2 style={S.stitle}>
            Resultados de quem
            <br />
            <span style={GT}>já usa o JuriOne</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "16px",
              marginTop: "48px",
            }}
          >
            {[
              {
                initials: "RA",
                name: "Dr. Ricardo Almeida",
                role: "Sócio Fundador · Almeida & Associados · SP",
                text: '"Antes eu vivia com medo de perder prazo. Hoje o JuriOne me avisa 15 dias, 7 dias e 1 dia antes. Nunca mais perdi nenhum. Só isso já justifica o investimento."',
              },
              {
                initials: "CS",
                name: "Dra. Carla Santos",
                role: "Advogada Empresarial · Santos Advocacia · RJ",
                text: '"A análise de contratos me salvou de assinar um acordo com cláusula leonina. O sistema identificou o risco automaticamente — seria impossível pegar isso na pressa do dia a dia."',
              },
              {
                initials: "FC",
                name: "Dr. Fernando Costa",
                role: "Advogado Civil · Costa & Barros · MG",
                text: '"Minha equipe cresceu de 2 para 5 advogados sem caos. Todo mundo trabalha na mesma plataforma, com histórico de cada caso centralizado. O cliente liga, eu respondo em 10 segundos."',
              },
            ].map((t) => (
              <div key={t.initials} style={S.card}>
                <div
                  style={{
                    color: "#F59E0B",
                    fontSize: "15px",
                    letterSpacing: "2px",
                    marginBottom: "16px",
                  }}
                >
                  ★★★★★
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#E2E8F0",
                    lineHeight: 1.75,
                    marginBottom: "20px",
                    fontStyle: "italic",
                  }}
                >
                  {t.text}
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366F1, #3B82F6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600 }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748B" }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section style={S.sec} id="planos">
        <div style={S.con}>
          <span style={S.slabel}>Planos e Preços</span>
          <h2 style={S.stitle}>
            Escolha o plano do
            <br />
            <span style={GT}>seu escritório</span>
          </h2>
          <p style={S.ssub}>
            Todos os planos incluem 14 dias de trial grátis. Sem cartão de
            crédito. Cancele quando quiser.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
              gap: "16px",
              marginTop: "52px",
              alignItems: "stretch",
            }}
          >
            {planosLoading && (
              <div style={{ gridColumn: "1/-1", display: "flex", justifyContent: "center", padding: "40px" }}>
                <Loader2 style={{ width: "32px", height: "32px", animation: "spin 1s linear infinite", color: "#6366F1" }} />
              </div>
            )}
            {!planosLoading && (campanhaPlanos ?? []).map((plano) => (
              <div
                key={plano.id}
                style={{
                  ...S.card,
                  ...(plano.popular
                    ? {
                        borderColor: "rgba(99,102,241,.4)",
                        background: "rgba(99,102,241,.06)",
                      }
                    : {}),
                }}
              >
                {/* Header */}
                <div style={{ marginBottom: "20px" }}>
                  {plano.popular && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "linear-gradient(135deg, #6366F1, #3B82F6)",
                        color: "#fff",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "4px 12px",
                        borderRadius: "20px",
                        marginBottom: "8px",
                        whiteSpace: "nowrap" as const,
                      }}
                    >
                      ⚡ Mais popular
                    </div>
                  )}
                  {plano.destaque && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        background: "rgba(99,102,241,.12)",
                        border: "1px solid rgba(99,102,241,.25)",
                        color: "#A5B4FC",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "4px 12px",
                        borderRadius: "20px",
                        marginBottom: "8px",
                        whiteSpace: "nowrap" as const,
                      }}
                    >
                      Poder total
                    </div>
                  )}
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#E2E8F0",
                      marginBottom: "4px",
                    }}
                  >
                    {plano.display_name}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#64748B" }}>
                    {plano.subtitulo}
                  </p>
                </div>

                {/* Price */}
                <div style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "4px",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#94A3B8" }}>
                      R$
                    </span>
                    <span
                      style={{
                        fontSize: "30px",
                        fontWeight: 900,
                        letterSpacing: "-1px",
                        color: "#F1F5F9",
                        lineHeight: 1,
                      }}
                    >
                      {(plano.preco / 100).toLocaleString("pt-BR")}
                    </span>
                    <span style={{ fontSize: "13px", color: "#94A3B8" }}>
                      /mês
                    </span>
                  </div>
                </div>

                {/* Feature groups */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  {plano.grupos.map((grupo) => (
                    <div key={grupo.title}>
                      <p
                        style={{
                          fontSize: "9px",
                          fontWeight: 600,
                          textTransform: "uppercase" as const,
                          letterSpacing: "0.1em",
                          color: "#64748B",
                          marginBottom: "6px",
                        }}
                      >
                        {grupo.title}
                      </p>
                      <ul
                        style={{
                          listStyle: "none",
                          display: "flex",
                          flexDirection: "column" as const,
                          gap: "4px",
                        }}
                      >
                        {grupo.features.map((feature, i) => (
                          <li
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "6px",
                            }}
                          >
                            <CampStatusDot status={feature.status} />
                            <span
                              style={{
                                fontSize: "12px",
                                lineHeight: 1.3,
                                color:
                                  feature.status === "unavailable"
                                    ? "rgba(148,163,184,.4)"
                                    : "#94A3B8",
                              }}
                            >
                              {feature.label}
                              {feature.note && (
                                <span
                                  style={{
                                    marginLeft: "4px",
                                    fontSize: "10px",
                                    color: "#F59E0B",
                                    fontWeight: 500,
                                  }}
                                >
                                  ({feature.note})
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Limits */}
                  <div>
                    <p
                      style={{
                        fontSize: "9px",
                        fontWeight: 600,
                        textTransform: "uppercase" as const,
                        letterSpacing: "0.1em",
                        color: "#64748B",
                        marginBottom: "6px",
                      }}
                    >
                      Limites
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#94A3B8",
                        lineHeight: 1.5,
                      }}
                    >
                      {plano.limites}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => openModal(plano.nome as PlanName)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "14px",
                    padding: "11px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    transition: "all .2s",
                    ...(plano.popular
                      ? {
                          background:
                            "linear-gradient(135deg, #6366F1, #3B82F6)",
                          color: "#fff",
                          border: "none",
                          boxShadow: "0 0 20px rgba(99,102,241,.3)",
                        }
                      : {
                          background: "transparent",
                          color: "#E2E8F0",
                          border: "1px solid rgba(99,102,241,.22)",
                        }),
                  }}
                >
                  Escolher Plano →
                </button>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              fontSize: "13px",
              color: "#64748B",
              flexWrap: "wrap" as const,
            }}
          >
            <span style={{ fontWeight: 600, color: "rgba(241,245,249,.6)" }}>
              Legenda:
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#22C55E",
                  display: "inline-block",
                }}
              />
              Incluído
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#FBBF24",
                  display: "inline-block",
                }}
              />
              Limitado
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "rgba(148,163,184,.3)",
                  display: "inline-block",
                }}
              />
              Não disponível
            </span>
          </div>
        </div>
      </section>

      {/* ── GARANTIA ─────────────────────────────────────────────── */}
      <section style={{ padding: "0 0 60px" }}>
        <div style={S.con}>
          <div
            style={{
              background: "rgba(34,197,94,.05)",
              border: "1px solid rgba(34,197,94,.18)",
              borderRadius: "20px",
              padding: isMobile ? "28px 20px" : "42px",
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap" as const,
            }}
          >
            <div style={{ fontSize: "68px", flexShrink: 0 }}>🛡️</div>
            <div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  marginBottom: "10px",
                }}
              >
                14 dias grátis. Sem risco. Sem armadilha.
              </h3>
              <p
                style={{ fontSize: "15px", color: "#94A3B8", lineHeight: 1.75 }}
              >
                Você tem 14 dias para testar o JuriOne com os seus casos reais,
                no seu ritmo. Sem cartão de crédito, sem cobrança automática,
                sem cláusula de fidelidade. Cancela com um clique, sem precisar
                ligar para ninguém.
                <br />
                <br />
                <strong style={{ color: "#F1F5F9" }}>
                  78% dos advogados que testam continuam pagando. Não porque são
                  obrigados — porque não conseguem imaginar voltar ao método
                  anterior.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section style={{ ...S.sec, paddingTop: 0 }}>
        <div style={S.con}>
          <span style={S.slabel}>Perguntas frequentes</span>
          <h2 style={S.stitle}>
            Dúvidas antes de <span style={GT}>começar</span>
          </h2>
          <div style={{ maxWidth: "740px", margin: "44px auto 0" }}>
            {faqs.map((f, i) => (
              <FaqItem
                key={i}
                q={f.q}
                a={f.a}
                open={openFaq === i}
                onToggle={() => {
                  setOpenFaq(openFaq === i ? null : i);
                  gtmPush({
                    event: "faq_click",
                    faq_question: f.q.substring(0, 80),
                  });
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", textAlign: "center" }}>
        <div style={S.con}>
          <div
            style={{
              background: "rgba(99,102,241,.06)",
              border: "1px solid rgba(99,102,241,.22)",
              borderRadius: "24px",
              padding: isMobile ? "40px 20px" : "64px 44px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-100px",
                right: "-100px",
                width: "400px",
                height: "400px",
                background:
                  "radial-gradient(circle, rgba(99,102,241,.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-80px",
                left: "-80px",
                width: "300px",
                height: "300px",
                background:
                  "radial-gradient(circle, rgba(59,130,246,.1) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 900,
                letterSpacing: "-2px",
                marginBottom: "18px",
                position: "relative",
                zIndex: 1,
              }}
            >
              Seu escritório merece
              <br />
              <span style={GT}>mais do que planilhas.</span>
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#94A3B8",
                marginBottom: "38px",
                maxWidth: "540px",
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: 1.7,
                position: "relative",
                zIndex: 1,
              }}
            >
              Controle de prazos, histórico de processos, análise de contratos,
              IA jurídica e gestão financeira — tudo em uma plataforma. 14 dias
              grátis para descobrir como.
            </p>
            <div
              style={{
                display: "flex",
                gap: "14px",
                justifyContent: "center",
                flexWrap: "wrap",
                position: "relative",
                zIndex: 1,
              }}
            >
              <button onClick={() => openModal("trial")} style={S.btnPri}>
                ⚡ Começar Trial Grátis Agora
              </button>
              <a href="#planos" style={S.btnOut}>
                Ver Planos →
              </a>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "22px",
                fontSize: "13px",
                color: "#64748B",
                flexWrap: "wrap",
                marginTop: "22px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {[
                "Sem cartão",
                "Setup em minutos",
                "Cancele quando quiser",
                "LGPD Compliant",
              ].map((t) => (
                <span
                  key={t}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span style={{ color: "#22C55E" }}>✓</span>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div style={S.gline} />
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(99,102,241,.08)",
          padding: "30px 0",
          textAlign: "center",
          fontSize: "13px",
          color: "#64748B",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={S.con}>
          <p>
            © {new Date().getFullYear()} JuriOne &nbsp;·&nbsp;
            <a
              href="/termos-uso"
              style={{ color: "#64748B", textDecoration: "none" }}
            >
              Termos de Uso
            </a>
            &nbsp;·&nbsp;
            <a
              href="/politica-privacidade"
              style={{ color: "#64748B", textDecoration: "none" }}
            >
              Privacidade
            </a>
            &nbsp;·&nbsp;
            <a
              href="/lgpd"
              style={{ color: "#64748B", textDecoration: "none" }}
            >
              LGPD
            </a>
          </p>
        </div>
      </footer>

      {/* Pulse keyframe via style tag */}
      <style>{`@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 8px #6366F1}50%{opacity:.5;box-shadow:0 0 20px #6366F1}}`}</style>

      <CadastroModal
        open={modalOpen}
        plan={selectedPlan}
        onClose={() => setModalOpen(false)}
        isMobile={isMobile}
      />
    </div>
  );
}
