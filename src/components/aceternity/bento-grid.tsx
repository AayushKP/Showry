"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
}: BentoGridItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-gray-800 bg-gray-900/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/50",
        className
      )}
    >
      {header}
      <div className="transition duration-200">
        {icon && (
          <div className="mb-2 inline-flex rounded-lg bg-amber-500/10 p-2 text-amber-500">
            {icon}
          </div>
        )}
        {title && (
          <div className="mb-2 font-semibold text-gray-100 group-hover:text-white">
            {title}
          </div>
        )}
        {description && (
          <div className="text-sm text-gray-400">{description}</div>
        )}
      </div>
    </motion.div>
  );
}
