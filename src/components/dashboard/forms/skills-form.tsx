"use client";

import { useState, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Portfolio } from "@/db/schema";

interface SkillsFormProps {
  portfolio: Portfolio;
  onUpdate: (data: Partial<Portfolio>) => void;
}

const popularSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "Go",
  "Rust",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "Figma",
  "Tailwind CSS",
];

export function SkillsForm({ portfolio, onUpdate }: SkillsFormProps) {
  const [skills, setSkills] = useState<string[]>(portfolio.skills || []);
  const [inputValue, setInputValue] = useState("");

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      const newSkills = [...skills, trimmedSkill];
      setSkills(newSkills);
      onUpdate({ skills: newSkills });
      setInputValue("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(newSkills);
    onUpdate({ skills: newSkills });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(inputValue);
    }
    if (e.key === "Backspace" && !inputValue && skills.length > 0) {
      removeSkill(skills[skills.length - 1]);
    }
  };

  const suggestedSkills = popularSkills.filter(
    (skill) =>
      !skills.includes(skill) &&
      skill.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-white">
          Skills & Technologies
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Add skills and technologies you work with
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Add Skills</Label>
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-700 bg-gray-900/50 p-3 focus-within:border-amber-500/50 focus-within:ring-2 focus-within:ring-amber-500/50">
            <AnimatePresence>
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-400"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-1 rounded-full p-0.5 hover:bg-amber-500/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                skills.length === 0
                  ? "Type a skill and press Enter"
                  : "Add more..."
              }
              className="min-w-[120px] flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />
          </div>
          <p className="text-xs text-gray-500">
            Press Enter or comma to add a skill, Backspace to remove the last
            one
          </p>
        </div>

        {/* Suggestions */}
        {inputValue && suggestedSkills.length > 0 && (
          <div className="space-y-2">
            <Label className="text-xs text-gray-500">Suggestions</Label>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills.slice(0, 6).map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="rounded-full border border-gray-700 bg-gray-800/50 px-3 py-1 text-xs text-gray-400 transition-colors hover:border-amber-500/50 hover:text-amber-400"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Skills */}
        {!inputValue && skills.length < 5 && (
          <div className="space-y-2">
            <Label className="text-xs text-gray-500">Popular Skills</Label>
            <div className="flex flex-wrap gap-2">
              {popularSkills
                .filter((s) => !skills.includes(s))
                .slice(0, 8)
                .map((skill) => (
                  <button
                    key={skill}
                    onClick={() => addSkill(skill)}
                    className="rounded-full border border-gray-700 bg-gray-800/50 px-3 py-1 text-xs text-gray-400 transition-colors hover:border-amber-500/50 hover:text-amber-400"
                  >
                    + {skill}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Skills Count */}
      <div className="text-sm text-gray-500">
        {skills.length} skill{skills.length !== 1 ? "s" : ""} added
      </div>
    </motion.div>
  );
}
