import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryProvider } from "@/provider/query-provider";
import { Projects } from "@/views/projects";
import { apiUrl, fetchWithFallback, getQueryClient } from "@/lib/prefetch";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects | Kenshien Alao",
  description:
    "Selected projects showcasing full-stack development, UI design, and problem solving by Kenshien Alao.",
};

export default async function ProjectsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["project", "public"],
    queryFn: () => fetchWithFallback(`${apiUrl}/api/project`),
  });

  return (
    <QueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Projects />
      </HydrationBoundary>
    </QueryProvider>
  );
}
