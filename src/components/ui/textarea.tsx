import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-3 text-sm text-gray-100 placeholder:text-gray-500 transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50",
        "hover:border-gray-600",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
