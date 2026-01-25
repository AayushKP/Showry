import { PortfolioTemplate } from "./minimal";

export interface TemplateConfig {
  id: string;
  name: string;
  description?: string;
  component: React.ComponentType<any>;
  thumbnailColor?: string; // For the simple UI request
}

export const PORTFOLIO_TEMPLATES: TemplateConfig[] = [
  {
    id: "minimal", // Matches default "minimal" in schema
    name: "Minimal",
    description: "A clean, dark-mode focused template for developers.",
    component: PortfolioTemplate,
    thumbnailColor: "#050505", // Black background as requested
  },
];

export const getTemplate = (id: string | null | undefined) => {
  return (
    PORTFOLIO_TEMPLATES.find((t) => t.id === (id || "minimal")) ||
    PORTFOLIO_TEMPLATES[0]
  );
};
