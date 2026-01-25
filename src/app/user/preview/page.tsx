"use client";

import { useEffect, useState } from "react";
import { getTemplate } from "@/components/portfolio/templates";
import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import type { Portfolio } from "@/db/schema";
import { useRouter } from "next/navigation";
import { dummyPortfolio } from "@/lib/dummy-data";

export default function UserPreviewPage() {
  const { data: session, isPending } = useSession();
  const [portfolio, setPortfolio] = useState<Partial<Portfolio> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Auth Check
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/user/preview");
      return;
    }

    if (session?.user) {
      const fetchPortfolio = async () => {
        try {
          const res = await fetch("/api/portfolio");
          const data = await res.json();

          if (data.portfolio) {
            setPortfolio(data.portfolio);
          } else {
            // User has no portfolio data yet, but is logged in.
            // We can show empty state or initialize with minimal defaults.
            // For now, pass empty and let template handle "empty state"
            setPortfolio({});
          }
        } catch {
          setPortfolio({});
        } finally {
          setIsLoading(false);
        }
      };

      fetchPortfolio();
    } else if (!isPending) {
      // Redundant safely check
      setIsLoading(false);
    }
  }, [session, isPending, router]);

  if (isPending || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  // If not logged in (and not redirecting yet), show nothing or loader
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
