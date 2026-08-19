import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Education } from "@/views/education";
import { apiUrl, fetchWithFallback, getQueryClient } from "@/lib/prefetch";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Education | Kenshien Alao",
  description:
    "Academic journey and milestones that shaped Kenshien Alao's path in technology.",
};

export default async function EducationPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["education", "public"],
    queryFn: () => fetchWithFallback(`${apiUrl}/api/education`),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Education />
    </HydrationBoundary>
  );
}
