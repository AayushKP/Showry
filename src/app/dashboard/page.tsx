"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Eye, X } from "lucide-react";
import { AppLoader } from "@/components/ui/app-loader";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { BasicInfoForm } from "@/components/dashboard/forms/basic-info-form";
import { AboutForm } from "@/components/dashboard/forms/about-form";
import { SkillsForm } from "@/components/dashboard/forms/skills-form";
import { ProjectsForm } from "@/components/dashboard/forms/projects-form";
import { ExperienceForm } from "@/components/dashboard/forms/experience-form";
import { EducationForm } from "@/components/dashboard/forms/education-form";
import { SocialLinksForm } from "@/components/dashboard/forms/social-links-form";
import BlogsForm from "@/components/dashboard/forms/blogs-form";
import { SettingsForm } from "@/components/dashboard/forms/settings-form";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn, debounce } from "@/lib/utils";
import type { Portfolio } from "@/db/schema";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  // Handle section change with preview popup
  // Only show popup on first switch if user has actually edited something
  const handleSectionChange = (section: string) => {
    setActiveSection(section);

    // Show popup only if: user has interacted with forms AND popup hasn't been shown yet
    if (hasInteracted && !hasShownPopup) {
      setShowPreviewPopup(true);
      setHasShownPopup(true);
    }
  };

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
    [],
  );

  const handleUpdate = (data: Partial<Portfolio>) => {
    setPortfolio((prev) => (prev ? { ...prev, ...data } : null));
    savePortfolio(data);
    // Mark that user has interacted with forms
    if (!hasInteracted) {
      setHasInteracted(true);
    }
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
        prev ? { ...prev, isPublished: data.isPublished } : null,
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
    return <AppLoader />;
  }

  if (!session?.user) {
    router.push("/login");
    return null;
  }

  if (!portfolio) {
    return <AppLoader />;
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
      case "blogs":
        return <BlogsForm initialData={portfolio} onUpdate={handleUpdate} />;
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
        onSectionChange={handleSectionChange}
        isCollapsed={isCollapsed}
        onCollapseChange={setIsCollapsed}
        portfolio={portfolio}
      />
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          isCollapsed ? "md:ml-20" : "md:ml-64",
          "ml-0", // Reset margin on mobile
        )}
      >
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
        <main className="flex-1 overflow-auto p-4 md:p-8">
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

      {/* Preview Popup Modal */}
      <AnimatePresence>
        {showPreviewPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPreviewPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-4 max-w-md w-full rounded-2xl border border-white/10 bg-[#111] p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPreviewPopup(false)}
                className="absolute right-4 top-4 rounded-full p-1 text-neutral-500 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4a373]/10 border border-[#d4a373]/20">
                <Eye className="h-8 w-8 text-[#d4a373]" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Wanna see how it looks?
                </h3>
                <p className="text-sm text-neutral-400 mb-6">
                  Preview your portfolio to see all your changes in action
                  before publishing.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setShowPreviewPopup(false)}
                    className="px-6 py-2.5 rounded-full border border-white/10 text-neutral-400 hover:bg-white/5 hover:text-white transition-all text-sm font-medium"
                  >
                    Maybe Later
                  </button>
                  <Link href="/dashboard/preview" target="_blank">
                    <button
                      onClick={() => setShowPreviewPopup(false)}
                      className="px-6 py-2.5 rounded-full bg-[#d4a373] text-black hover:bg-[#e5b584] transition-all text-sm font-medium flex items-center gap-2 justify-center w-full sm:w-auto"
                    >
                      <Eye className="h-4 w-4" />
                      Preview Now
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
