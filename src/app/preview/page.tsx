"use client";

import { getTemplate } from "@/components/portfolio/templates";
import type { Portfolio } from "@/db/schema";

// Dummy data for demo preview
import { dummyPortfolio } from "@/lib/dummy-data";

export default function PreviewPage() {
  const { component: TemplateComponent } = getTemplate(dummyPortfolio.theme);

  return (
    <TemplateComponent
      portfolio={dummyPortfolio}
      isPreview={true}
      isLoggedIn={false}
    />
  );
}
