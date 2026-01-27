"use client";

import { PortfolioTemplate } from "@/components/portfolio/templates/minimal";
import { dummyPortfolio } from "@/lib/dummy-data";

export default function MinimalPreviewPage() {
  return (
    <PortfolioTemplate
      portfolio={dummyPortfolio}
      isPreview={true}
      isLoggedIn={false}
    />
  );
}
