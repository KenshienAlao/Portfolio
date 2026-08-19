import { Setup } from "@/views/setup";
import { apiUrl, fetchWithFallback } from "@/lib/prefetch";
import { type SetupCategory } from "@/service/setup.service";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Setup | Kenshien Alao",
  description:
    "The tools Kenshien Alao uses for development, design, and productivity.",
  alternates: {
    canonical: "/setup",
  },
};

export default async function SetupPage() {
  const setups = await fetchWithFallback<SetupCategory[]>(
    `${apiUrl}/api/setup`,
  );

  return <Setup setups={setups} />;
}
