"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Portfolio } from "@/db/schema";
import { cn } from "@/lib/utils";
import { PORTFOLIO_TEMPLATES } from "@/components/portfolio/templates";

interface SettingsFormProps {
  portfolio: Portfolio;
  onUpdate: (data: Partial<Portfolio>) => void;
}

export function SettingsForm({ portfolio, onUpdate }: SettingsFormProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePortfolio = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete portfolio");

      toast.success("Portfolio deleted successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete portfolio");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-white">Settings</h2>
        <p className="mt-1 text-sm text-gray-400">
          Manage your portfolio settings
        </p>
      </div>

      {/* Theme Section */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-6">
        <h3 className="mb-4 font-medium text-white">Theme</h3>
        <div className="flex flex-wrap items-center gap-4">
          {PORTFOLIO_TEMPLATES.map((template) => (
            <div
              key={template.id}
              onClick={() => onUpdate({ theme: template.id })}
              className={cn(
                "flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border-2 transition-all hover:scale-105",
                portfolio.theme === template.id
                  ? "border-amber-500"
                  : "border-gray-800 hover:border-gray-600",
              )}
              style={{
                backgroundColor: template.thumbnailColor || "#1f2937", // Default to gray-800 if not specified
              }}
            >
              <span className="text-sm text-gray-300">{template.name}</span>
            </div>
          ))}

          {/* Coming Soon Placeholder */}
          <div className="flex h-24 w-24 cursor-not-allowed items-center justify-center rounded-lg border border-gray-700 bg-gray-800 opacity-50">
            <span className="text-xs text-gray-500">Coming Soon</span>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          More themes will be available soon!
        </p>
      </div>

      {/* Danger Zone */}
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
        <h3 className="mb-2 flex items-center gap-2 font-medium text-red-400">
          <AlertTriangle className="h-4 w-4" />
          Danger Zone
        </h3>
        <p className="mb-4 text-sm text-gray-400">
          Once you delete your portfolio, there is no going back. Please be
          certain.
        </p>
        <Button
          variant="destructive"
          onClick={() => setShowDeleteDialog(true)}
          className="bg-red-600 hover:bg-red-700"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Portfolio
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Delete Portfolio
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              portfolio and remove all associated data.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeletePortfolio}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Yes, delete my portfolio"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
