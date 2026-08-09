import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { ClientPage } from "./client-page";

export const revalidate = 3600;

export default async function Page() {
  const queryClient = new QueryClient();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6532";

  const prefetchOptions = {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(5_000),
  };

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ["project", "public"],
      queryFn: async () => {
        const res = await fetch(`${apiUrl}/api/project`, prefetchOptions);
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["education", "public"],
      queryFn: async () => {
        const res = await fetch(`${apiUrl}/api/education`, prefetchOptions);
        if (!res.ok) throw new Error("Failed to fetch education");
        return res.json();
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage />
    </HydrationBoundary>
  );
}
