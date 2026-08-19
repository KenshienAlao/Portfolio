import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryProvider } from "@/provider/query-provider";
import Skills from "@/views/skills";
import { apiUrl, fetchWithFallback, getQueryClient } from "@/lib/prefetch";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Skills | Kenshien Alao",
  description:
    "Tools and technologies Kenshien Alao works with across the stack.",
};

export default async function SkillsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["skill", "public"],
    queryFn: () => fetchWithFallback(`${apiUrl}/api/skill`),
  });

  return (
    <QueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Skills />
      </HydrationBoundary>
    </QueryProvider>
  );
}
