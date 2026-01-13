"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  LayoutTemplate,
  Briefcase,
  GraduationCap,
  Sparkles,
  Settings,
  Globe,
  Share2,
  FileText,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "basic", name: "Basic Info", href: "/dashboard", icon: User },
  {
    id: "about",
    name: "About",
    href: "/dashboard?section=about",
    icon: FileText,
  },
  {
    id: "skills",
    name: "Skills",
    href: "/dashboard?section=skills",
    icon: Sparkles,
  },
  {
    id: "projects",
    name: "Projects",
    href: "/dashboard?section=projects",
    icon: LayoutTemplate,
  },
  {
    id: "experience",
    name: "Experience",
    href: "/dashboard?section=experience",
    icon: Briefcase,
  },
  {
    id: "education",
    name: "Education",
    href: "/dashboard?section=education",
    icon: GraduationCap,
  },
  {
    id: "social",
    name: "Socials",
    href: "/dashboard?section=social",
    icon: Share2,
  },
  {
    id: "settings",
    name: "Settings",
    href: "/dashboard?section=settings",
    icon: Settings,
  },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Trigger */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-full border border-white/10 bg-[#111] p-2 text-white md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/5 bg-[#050505] transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
          "md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between px-6">
          {!isCollapsed && (
            <Link
              href="/"
              className="font-instrument text-2xl font-bold text-white hover:opacity-80 transition-opacity"
            >
              Showry<span className="text-[#d4a373]">.</span>
            </Link>
          )}
          {isCollapsed && (
            <span className="w-full text-center font-instrument text-2xl font-bold text-[#d4a373]">
              S.
            </span>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden rounded-full p-1 text-neutral-500 hover:bg-white/5 hover:text-white md:block"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden text-neutral-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6 text-sm">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  onSectionChange(item.id);
                  setIsMobileOpen(false);
                }}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors font-mono tracking-wide text-xs uppercase",
                  activeSection === item.id
                    ? "bg-white/10 text-white"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 min-w-[16px]",
                    isCollapsed ? "mx-auto" : ""
                  )}
                />
                {!isCollapsed && <span>{item.name}</span>}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 hidden rounded bg-neutral-800 px-2 py-1 text-xs text-white group-hover:block">
                    {item.name}
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 p-4">
          <Link href="/preview" target="_blank">
            <div
              className={cn(
                "flex items-center gap-3 rounded-lg bg-[#111] p-3 text-white transition-colors hover:bg-[#1a1a1a]",
                isCollapsed ? "justify-center" : ""
              )}
            >
              <Globe className="h-4 w-4" />
              {!isCollapsed && (
                <span className="font-mono text-xs uppercase">
                  View Portfolio
                </span>
              )}
            </div>
          </Link>
        </div>
      </motion.aside>
    </>
  );
}
