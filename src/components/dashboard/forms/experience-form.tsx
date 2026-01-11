"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Portfolio, ExperienceData } from "@/db/schema";

interface ExperienceFormProps {
  portfolio: Portfolio;
  onUpdate: (data: Partial<Portfolio>) => void;
}

const emptyExperience: ExperienceData = {
  id: "",
  company: "",
  position: "",
  duration: "",
  description: "",
};

export function ExperienceForm({ portfolio, onUpdate }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<ExperienceData[]>(
    portfolio.experience || []
  );
  const [editingExperience, setEditingExperience] =
    useState<ExperienceData | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const saveExperience = () => {
    if (!editingExperience?.company || !editingExperience?.position) return;

    const updatedExperience = {
      ...editingExperience,
      id: editingExperience.id || crypto.randomUUID(),
    };

    let newExperiences: ExperienceData[];
    if (experiences.find((e) => e.id === updatedExperience.id)) {
      newExperiences = experiences.map((e) =>
        e.id === updatedExperience.id ? updatedExperience : e
      );
    } else {
      newExperiences = [...experiences, updatedExperience];
    }

    setExperiences(newExperiences);
    onUpdate({ experience: newExperiences });
    setShowDialog(false);
    setEditingExperience(null);
  };

  const deleteExperience = (id: string) => {
    const newExperiences = experiences.filter((e) => e.id !== id);
    setExperiences(newExperiences);
    onUpdate({ experience: newExperiences });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Experience</h2>
          <p className="mt-1 text-sm text-gray-400">
            Add your work experience and positions
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingExperience({
              ...emptyExperience,
              id: crypto.randomUUID(),
            });
            setShowDialog(true);
          }}
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {/* Experience List */}
      {experiences.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-700 p-8 text-center">
          <p className="text-gray-500">No experience added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="group flex items-start gap-4 rounded-lg border border-gray-800 bg-gray-900/30 p-4"
              >
                <div className="cursor-grab pt-1 text-gray-600">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{exp.position}</h3>
                    <span className="text-gray-500">at</span>
                    <span className="text-amber-400">{exp.company}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{exp.duration}</p>
                  {exp.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                      {exp.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingExperience(exp);
                      setShowDialog(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteExperience(exp.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingExperience?.id &&
              experiences.find((e) => e.id === editingExperience.id)
                ? "Edit Experience"
                : "Add Experience"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Company Name *</Label>
              <Input
                value={editingExperience?.company || ""}
                onChange={(e) =>
                  setEditingExperience((prev) =>
                    prev ? { ...prev, company: e.target.value } : null
                  )
                }
                placeholder="Google, Microsoft, etc."
              />
            </div>

            <div className="space-y-2">
              <Label>Position / Role *</Label>
              <Input
                value={editingExperience?.position || ""}
                onChange={(e) =>
                  setEditingExperience((prev) =>
                    prev ? { ...prev, position: e.target.value } : null
                  )
                }
                placeholder="Senior Developer"
              />
            </div>

            <div className="space-y-2">
              <Label>Duration *</Label>
              <Input
                value={editingExperience?.duration || ""}
                onChange={(e) =>
                  setEditingExperience((prev) =>
                    prev ? { ...prev, duration: e.target.value } : null
                  )
                }
                placeholder="Jan 2020 - Present"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={editingExperience?.description || ""}
                onChange={(e) =>
                  setEditingExperience((prev) =>
                    prev ? { ...prev, description: e.target.value } : null
                  )
                }
                placeholder="Describe your role and responsibilities..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={saveExperience}
              disabled={
                !editingExperience?.company || !editingExperience?.position
              }
            >
              Save Experience
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
