import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-2 text-sm text-gray-100 placeholder:text-gray-500 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50",
          "hover:border-gray-600",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
