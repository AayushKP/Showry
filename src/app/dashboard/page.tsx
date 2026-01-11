"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { BasicInfoForm } from "@/components/dashboard/forms/basic-info-form";
import { AboutForm } from "@/components/dashboard/forms/about-form";
import { SkillsForm } from "@/components/dashboard/forms/skills-form";
import { ProjectsForm } from "@/components/dashboard/forms/projects-form";
import { ExperienceForm } from "@/components/dashboard/forms/experience-form";
import { EducationForm } from "@/components/dashboard/forms/education-form";
import { SocialLinksForm } from "@/components/dashboard/forms/social-links-form";
import { SettingsForm } from "@/components/dashboard/forms/settings-form";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { debounce } from "@/lib/utils";
import type { Portfolio } from "@/db/schema";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");

  // Fetch or create portfolio
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch("/api/portfolio");
        const data = await res.json();

        if (data.portfolio) {
          setPortfolio(data.portfolio);
        } else {
          // Create new portfolio
          const createRes = await fetch("/api/portfolio", { method: "POST" });
          const createData = await createRes.json();
          if (createData.portfolio) {
            setPortfolio(createData.portfolio);
          }
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        toast.error("Failed to load portfolio");
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchPortfolio();
    }
  }, [session]);

  // Debounced save function
  const savePortfolio = useCallback(
    debounce(async (data: Partial<Portfolio>) => {
      setIsSaving(true);
      try {
        const res = await fetch("/api/portfolio", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Failed to save");

        const result = await res.json();
        setPortfolio(result.portfolio);
        toast.success("Saved", { duration: 1000 });
      } catch (error) {
        console.error("Save error:", error);
        toast.error("Failed to save changes");
      } finally {
        setIsSaving(false);
      }
    }, 2000),
    []
  );

  const handleUpdate = (data: Partial<Portfolio>) => {
    setPortfolio((prev) => (prev ? { ...prev, ...data } : null));
    savePortfolio(data);
  };

  const handlePublish = async () => {
    if (!portfolio) return;

    setIsPublishing(true);
    try {
      const res = await fetch("/api/portfolio/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publish: !portfolio.isPublished }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          data.errors.forEach((err: string) => toast.error(err));
        } else {
          toast.error(data.error || "Failed to update publish status");
        }
        return;
      }

      setPortfolio((prev) =>
        prev ? { ...prev, isPublished: data.isPublished } : null
      );

      if (data.isPublished) {
        toast.success("Portfolio published!");
      } else {
        toast.success("Portfolio unpublished");
      }
    } catch (error) {
      console.error("Publish error:", error);
      toast.error("Failed to update publish status");
    } finally {
      setIsPublishing(false);
    }
  };

  // Auth check
  if (isPending || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!session?.user) {
    router.push("/login");
    return null;
  }

  if (!portfolio) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case "basic":
        return <BasicInfoForm portfolio={portfolio} onUpdate={handleUpdate} />;
      case "about":
        return <AboutForm portfolio={portfolio} onUpdate={handleUpdate} />;
      case "skills":
        return <SkillsForm portfolio={portfolio} onUpdate={handleUpdate} />;
      case "projects":
        return <ProjectsForm portfolio={portfolio} onUpdate={handleUpdate} />;
      case "experience":
        return <ExperienceForm portfolio={portfolio} onUpdate={handleUpdate} />;
      case "education":
        return <EducationForm portfolio={portfolio} onUpdate={handleUpdate} />;
      case "social":
        return (
          <SocialLinksForm portfolio={portfolio} onUpdate={handleUpdate} />
        );
      case "settings":
        return <SettingsForm portfolio={portfolio} onUpdate={handleUpdate} />;
      default:
        return <BasicInfoForm portfolio={portfolio} onUpdate={handleUpdate} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex flex-1 flex-col">
        <DashboardHeader
          user={{
            name: session.user.name || "",
            email: session.user.email || "",
            image: session.user.image || undefined,
          }}
          portfolio={{
            username: portfolio.username,
            isPublished: portfolio.isPublished || false,
          }}
          onPublish={handlePublish}
          isPublishing={isPublishing}
        />
        <main className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-3xl">
            {/* Saving indicator */}
            {isSaving && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-center gap-2 text-sm text-gray-400"
              >
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving...
              </motion.div>
            )}
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
