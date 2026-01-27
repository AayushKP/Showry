"use client";

import { useEffect, useState } from "react";
import { getTemplate } from "@/components/portfolio/templates";
import { useSession } from "@/lib/auth-client";
import { ArrowLeft, Loader2, Monitor, Smartphone, Tablet } from "lucide-react";
import { AppLoader } from "@/components/ui/app-loader";
import type { Portfolio } from "@/db/schema";
import { useRouter } from "next/navigation";

export default function UserPreviewPage() {
  const { data: session, isPending } = useSession();
  const [portfolio, setPortfolio] = useState<Partial<Portfolio> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Auth Check
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/dashboard/preview");
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
      <AppLoader
        mode="portfolio"
        name={portfolio?.fullName || session?.user?.name}
      />
    );
  }

  if (!portfolio) return <div>Failed to load portfolio</div>;
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
