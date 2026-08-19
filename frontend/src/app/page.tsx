import { cache } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { ClientPage } from "./client-page";

export const revalidate = 3600;

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6532";

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    }),
);

async function fetchWithFallback<T>(
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

export default async function Page() {
  const queryClient = getQueryClient();

  await Promise.allSettled([
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage />
    </HydrationBoundary>
  );
}
