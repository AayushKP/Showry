"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const GridBackground = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative w-full bg-[#0a0a0a] bg-grid-white/[0.02]",
        className
      )}
    >
      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[#0a0a0a] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      {children}
    </div>
  );
};

export const DotBackground = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative w-full bg-[#0a0a0a] bg-dot-white/[0.2]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#0a0a0a] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      {children}
    </div>
  );
};

export const GradientBackground = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]",
        className
      )}
    >
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-amber-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-purple-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {children}
    </div>
  );
};
