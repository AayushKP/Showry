"use client";

import { useEffect, useState, useCallback } from "react";
import { getTemplate } from "@/components/portfolio/templates";
import { useSession } from "@/lib/auth-client";
import type { Portfolio } from "@/db/schema";
import { useRouter, usePathname } from "next/navigation";

export default function UserPreviewPage() {
  const { data: session, isPending } = useSession();
  const [portfolio, setPortfolio] = useState<Partial<Portfolio> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Memoized fetch function that always gets fresh data
  const fetchPortfolio = useCallback(async () => {
    setIsLoading(true);
    try {
      // Add timestamp to bust any caching
      const res = await fetch(`/api/portfolio?t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      const data = await res.json();

      if (data.portfolio) {
        setPortfolio(data.portfolio);
      } else {
        setPortfolio({});
      }
    } catch {
      setPortfolio({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch on mount and whenever pathname changes (navigation)
  useEffect(() => {
    // Auth Check
    if (!isPending && !session?.user) {
      router.push("/");
      return;
    }

    if (session?.user) {
      fetchPortfolio();
    } else if (!isPending) {
      setIsLoading(false);
    }
  }, [session, isPending, router, pathname, fetchPortfolio]);

  if (isPending || isLoading) {
    return null;
  }

  if (!portfolio) return <div>Failed to load portfolio</div>;
  if (!session?.user) return null;

  const { component: TemplateComponent } = getTemplate(portfolio?.theme);

  return (
    <TemplateComponent
      portfolio={portfolio || {}}
      isPreview={true}
      isLoggedIn={true}
    />
  );
}
