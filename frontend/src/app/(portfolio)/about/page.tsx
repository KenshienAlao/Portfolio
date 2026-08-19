import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { About } from "@/views/about";
import { apiUrl, fetchWithFallback, getQueryClient } from "@/lib/prefetch";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About | Kenshien Alao",
  description:
    "About Kenshien Alao — a web developer passionate about modern web applications, clean interfaces, and reliable backends.",
};

export default async function AboutPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["project", "public"],
    queryFn: () => fetchWithFallback(`${apiUrl}/api/project`),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <About />
    </HydrationBoundary>
  );
}
