import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function validateUsername(username: string): {
  valid: boolean;
  error?: string;
} {
  if (username.length < 3) {
    return { valid: false, error: "Username must be at least 3 characters" };
  }
  if (username.length > 20) {
    return { valid: false, error: "Username must be at most 20 characters" };
  }
  if (!/^[a-z0-9-]+$/.test(username)) {
    return {
      valid: false,
      error:
        "Username can only contain lowercase letters, numbers, and hyphens",
    };
  }
  if (username.startsWith("-") || username.endsWith("-")) {
    return {
      valid: false,
      error: "Username cannot start or end with a hyphen",
    };
  }
  return { valid: true };
}
