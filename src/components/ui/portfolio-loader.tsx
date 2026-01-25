"use client";

import { useParams } from "next/navigation";
import { AppLoader } from "./app-loader";

export function PortfolioLoader() {
  const params = useParams();
  const username = (params?.username as string) || "Portfolio";

  // Capitalize first letter strictly for display
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  return <AppLoader mode="portfolio" name={displayName} />;
}
