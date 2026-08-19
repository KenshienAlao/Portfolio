import { cache } from "react";
import { QueryClient } from "@tanstack/react-query";
import { type ApiReponse } from "@/lib/ApiResponse";

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

export async function fetchPublicData<T>(
  endpoint: string,
  timeoutMs = 2000,
): Promise<T[]> {
  try {
    const res = await fetch(`${apiUrl}${endpoint}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return [];
    const json = (await res.json()) as ApiReponse<T[]> | T[];
    if (Array.isArray(json)) return json;
    if (Array.isArray(json?.data)) return json.data;
    if (Array.isArray(json?.results)) return json.results;
    return [];
  } catch {
    return [];
  }
}

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
