"use client";

import { TerminalTemplate } from "@/components/portfolio/templates/terminal";
import { dummyPortfolio } from "@/lib/dummy-data";

export default function TerminalPreviewPage() {
  return (
    <TerminalTemplate
      portfolio={dummyPortfolio}
      isPreview={true}
      isLoggedIn={false}
    />
  );
}
