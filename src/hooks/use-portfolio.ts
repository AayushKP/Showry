import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Portfolio } from "@/db/schema";

// Query keys for consistent caching
export const portfolioKeys = {
  all: ["portfolio"] as const,
  detail: () => [...portfolioKeys.all, "detail"] as const,
  public: (username: string) =>
    [...portfolioKeys.all, "public", username] as const,
};

// Fetch current user's portfolio
async function fetchPortfolio(): Promise<Portfolio | null> {
  const res = await fetch("/api/portfolio");
  if (!res.ok) {
    if (res.status === 401) return null;
    throw new Error("Failed to fetch portfolio");
  }
  const data = await res.json();
  return data.portfolio || null;
}

// Update portfolio
async function updatePortfolio(data: Partial<Portfolio>): Promise<Portfolio> {
  const res = await fetch("/api/portfolio", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update portfolio");
  const result = await res.json();
  return result.portfolio;
}

// Create portfolio
async function createPortfolio(): Promise<Portfolio> {
  const res = await fetch("/api/portfolio", { method: "POST" });
  if (!res.ok) throw new Error("Failed to create portfolio");
  const data = await res.json();
  return data.portfolio;
}

/**
 * Hook to fetch the current user's portfolio
 * Includes automatic caching and background refetching
 */
export function usePortfolio() {
  return useQuery({
    queryKey: portfolioKeys.detail(),
    queryFn: fetchPortfolio,
    staleTime: 60 * 1000, // Consider data fresh for 1 minute
    retry: 1,
  });
}

/**
 * Hook to update portfolio with optimistic updates
 * Changes appear instantly while saving in background
 */
export function useUpdatePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePortfolio,
    // Optimistic update - update UI immediately
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: portfolioKeys.detail() });

      // Snapshot the previous value
      const previousPortfolio = queryClient.getQueryData<Portfolio | null>(
        portfolioKeys.detail(),
      );

      // Optimistically update to the new value
      if (previousPortfolio) {
        queryClient.setQueryData<Portfolio>(portfolioKeys.detail(), {
          ...previousPortfolio,
          ...newData,
          updatedAt: new Date(),
        });
      }

      return { previousPortfolio };
    },
    // If mutation fails, roll back to previous value
    onError: (_err, _newData, context) => {
      if (context?.previousPortfolio) {
        queryClient.setQueryData(
          portfolioKeys.detail(),
          context.previousPortfolio,
        );
      }
    },
    // Always refetch after error or success to ensure data is correct
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: portfolioKeys.detail() });
    },
  });
}

/**
 * Hook to create a new portfolio
 */
export function useCreatePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPortfolio,
    onSuccess: (data) => {
      queryClient.setQueryData(portfolioKeys.detail(), data);
    },
  });
}

/**
 * Hook to fetch a public portfolio by username
 * Used for viewing other users' portfolios
 */
export function usePublicPortfolio(username: string) {
  return useQuery({
    queryKey: portfolioKeys.public(username),
    queryFn: async () => {
      const res = await fetch(`/api/portfolio/${username}`);
      if (!res.ok) throw new Error("Portfolio not found");
      const data = await res.json();
      return data.portfolio as Portfolio;
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // Public portfolios can be cached longer (5 min)
  });
}
