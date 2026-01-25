"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

// Default options for better UX
const defaultQueryClientOptions = {
  queries: {
    // Data is considered fresh for 30 seconds
    staleTime: 30 * 1000,
    // Cache data for 5 minutes
    gcTime: 5 * 60 * 1000,
    // Retry failed requests once
    retry: 1,
    // Don't refetch on window focus in development (annoying)
    refetchOnWindowFocus: process.env.NODE_ENV === "production",
  },
  mutations: {
    // Retry mutations once on failure
    retry: 1,
  },
};

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Create a new QueryClient instance for each session
  // This prevents data leaking between users in SSR
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: defaultQueryClientOptions }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
