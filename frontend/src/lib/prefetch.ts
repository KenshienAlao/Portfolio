import { cache } from "react";
import { QueryClient } from "@tanstack/react-query";

export const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:6532";

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    }),
);

export async function fetchWithFallback<T>(
  url: string,
  timeoutMs = 1500,
): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
