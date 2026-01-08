import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// URLs do sistema por ambiente
const systemUrls = {
  development: "http://localhost:4200",
  production: "https://app.jurione.com",
  homologation: "https://hml.jurione.com",
};

// Determina a URL base do sistema
const getSystemUrl = (): string => {
  const hostname = window.location.hostname;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return systemUrls.development;
  } else if (hostname.includes("hml")) {
    return systemUrls.homologation;
  } else {
    return systemUrls.production;
  }
};

// Redireciona para trial grátis
export const redirectToTrial = () => {
  const systemUrl = getSystemUrl();
  const signupUrl = `${systemUrl}/auth/signup?plan=trial&source=landing_page&utm_source=landing_page&utm_campaign=free_trial`;
  window.open(signupUrl, "_blank", "noopener,noreferrer");
};
