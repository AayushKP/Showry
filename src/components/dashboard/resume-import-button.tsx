"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, Zap } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ResumeImportButtonProps {
  onImport: (data: any) => void;
  className?: string; // Add optional className prop
}

export function ResumeImportButton({
  onImport,
  className,
}: ResumeImportButtonProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB.");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Analysing...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/resume/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze resume");
      }

      toast.success("Resume parsed successfully!", { id: toastId });
      onImport(data.data);
    } catch (error) {
      console.error("Import Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to import resume",
        { id: toastId },
      );
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        className="hidden"
      />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-1.5 transition-all text-sm font-medium border",
          "bg-white/5 border-[#d4a373]/30 text-[#d4a373] hover:bg-[#d4a373]/10",
          isUploading && "opacity-50 cursor-not-allowed",
          className,
        )}
      >
        {isUploading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Zap className="h-3.5 w-3.5 fill-current" />
        )}
        <span>{isUploading ? "Analysing..." : "Fill with Resume"}</span>
      </motion.button>
    </>
  );
}
