import { PortfolioTemplate } from "./minimal";
import { TerminalTemplate } from "./terminal";
import type { Portfolio } from "@/db/schema";

// Shared props interface for all portfolio templates
export interface PortfolioTemplateProps {
  portfolio: Partial<Portfolio>;
  isPreview?: boolean;
  isLoggedIn?: boolean;
}

export interface TemplateConfig {
  id: string;
  name: string;
  description?: string;
  component: React.ComponentType<PortfolioTemplateProps>;
  thumbnailColor?: string;
}

export const PORTFOLIO_TEMPLATES: TemplateConfig[] = [
  {
    id: "minimal", // Matches default "minimal" in schema
    name: "Minimal",
    description: "A clean, dark-mode focused template for developers.",
    component: PortfolioTemplate,
    thumbnailColor: "#050505", // Black background as requested
  },
  {
    id: "terminal",
    name: "Terminal",
    description: "A developer-first command line interface portfolio.",
    component: TerminalTemplate,
    thumbnailColor: "#0d1117",
  },
];

export const getTemplate = (id: string | null | undefined) => {
  return (
    PORTFOLIO_TEMPLATES.find((t) => t.id === (id || "minimal")) ||
    PORTFOLIO_TEMPLATES[0]
  );
};
