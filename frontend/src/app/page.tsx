import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { ClientPage } from "./client-page";

export const revalidate = 3600;

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6532";

async function fetchWithFallback<T>(url: string, timeoutMs = 4000): Promise<T> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) throw new Error(`Bad response: ${res.status}`);
    return res.json();
  } catch (err) {
    console.warn(
      `[fetchWithFallback] Primary fetch failed for ${url}, trying cache:`,
      err,
    );

    try {
      const cachedRes = await fetch(url, { cache: "force-cache" });
      if (!cachedRes.ok)
        throw new Error(`Bad cached response: ${cachedRes.status}`);
      return cachedRes.json();
    } catch (fallbackErr) {
      console.error(
        `[fetchWithFallback] No cache available for ${url}:`,
        fallbackErr,
      );
      throw err;
    }
  }
}

export default async function Page() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  const results = await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ["project", "public"],
      queryFn: () => fetchWithFallback(`${apiUrl}/api/project`),
    }),
    queryClient.prefetchQuery({
      queryKey: ["education", "public"],
      queryFn: () => fetchWithFallback(`${apiUrl}/api/education`),
    }),
    queryClient.prefetchQuery({
      queryKey: ["skill", "public"],
      queryFn: () => fetchWithFallback(`${apiUrl}/api/skill`),
    }),
    queryClient.prefetchQuery({
      queryKey: ["setup", "public"],
      queryFn: () => fetchWithFallback(`${apiUrl}/api/setup`),
    }),
  ]);

  results.forEach((result, i) => {
    if (result.status === "rejected") {
      const keys = ["project", "education", "skill", "setup"];
      console.error(`[Page] Failed to prefetch ${keys[i]}:`, result.reason);
    }
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage />
    </HydrationBoundary>
  );
}
