"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, GripVertical, GraduationCap } from "lucide-react";
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
import type { Portfolio, EducationData } from "@/db/schema";

interface EducationFormProps {
  portfolio: Portfolio;
  onUpdate: (data: Partial<Portfolio>) => void;
}

const emptyEducation: EducationData = {
  id: "",
  institution: "",
  degree: "",
  duration: "",
  description: "",
};

export function EducationForm({ portfolio, onUpdate }: EducationFormProps) {
  const [educations, setEducations] = useState<EducationData[]>(
    portfolio.education || []
  );
  const [editingEducation, setEditingEducation] =
    useState<EducationData | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const saveEducation = () => {
    if (!editingEducation?.institution || !editingEducation?.degree) return;

    const updatedEducation = {
      ...editingEducation,
      id: editingEducation.id || crypto.randomUUID(),
    };

    let newEducations: EducationData[];
    if (educations.find((e) => e.id === updatedEducation.id)) {
      newEducations = educations.map((e) =>
        e.id === updatedEducation.id ? updatedEducation : e
      );
    } else {
      newEducations = [...educations, updatedEducation];
    }

    setEducations(newEducations);
    onUpdate({ education: newEducations });
    setShowDialog(false);
    setEditingEducation(null);
  };

  const deleteEducation = (id: string) => {
    const newEducations = educations.filter((e) => e.id !== id);
    setEducations(newEducations);
    onUpdate({ education: newEducations });
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
          <h2 className="text-xl font-semibold text-white">Education</h2>
          <p className="mt-1 text-sm text-gray-400">
            Add your educational background
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingEducation({ ...emptyEducation, id: crypto.randomUUID() });
            setShowDialog(true);
          }}
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>

      {/* Education List */}
      {educations.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-700 p-8 text-center">
          <GraduationCap className="mx-auto mb-2 h-8 w-8 text-gray-600" />
          <p className="text-gray-500">No education added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {educations.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="group flex items-start gap-4 rounded-lg border border-gray-800 bg-gray-900/30 p-4"
              >
                <div className="cursor-grab pt-1 text-gray-600">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">{edu.degree}</h3>
                  <p className="mt-0.5 text-amber-400">{edu.institution}</p>
                  <p className="mt-1 text-sm text-gray-500">{edu.duration}</p>
                  {edu.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                      {edu.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingEducation(edu);
                      setShowDialog(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteEducation(edu.id)}
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
              {editingEducation?.id &&
              educations.find((e) => e.id === editingEducation.id)
                ? "Edit Education"
                : "Add Education"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Institution Name *</Label>
              <Input
                value={editingEducation?.institution || ""}
                onChange={(e) =>
                  setEditingEducation((prev) =>
                    prev ? { ...prev, institution: e.target.value } : null
                  )
                }
                placeholder="Stanford University"
              />
            </div>

            <div className="space-y-2">
              <Label>Degree / Course *</Label>
              <Input
                value={editingEducation?.degree || ""}
                onChange={(e) =>
                  setEditingEducation((prev) =>
                    prev ? { ...prev, degree: e.target.value } : null
                  )
                }
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>

            <div className="space-y-2">
              <Label>Duration *</Label>
              <Input
                value={editingEducation?.duration || ""}
                onChange={(e) =>
                  setEditingEducation((prev) =>
                    prev ? { ...prev, duration: e.target.value } : null
                  )
                }
                placeholder="2018 - 2022"
              />
            </div>

            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Textarea
                value={editingEducation?.description || ""}
                onChange={(e) =>
                  setEditingEducation((prev) =>
                    prev ? { ...prev, description: e.target.value } : null
                  )
                }
                placeholder="Relevant coursework, achievements, etc."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={saveEducation}
              disabled={
                !editingEducation?.institution || !editingEducation?.degree
              }
            >
              Save Education
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
