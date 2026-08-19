import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryProvider } from "@/provider/query-provider";
import { Setup } from "@/views/setup";
import { apiUrl, fetchWithFallback, getQueryClient } from "@/lib/prefetch";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Setup | Kenshien Alao",
  description:
    "The tools Kenshien Alao uses for development, design, and productivity.",
};

export default async function SetupPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["setup", "public"],
    queryFn: () => fetchWithFallback(`${apiUrl}/api/setup`),
  });

  return (
    <QueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Setup />
      </HydrationBoundary>
    </QueryProvider>
  );
}
