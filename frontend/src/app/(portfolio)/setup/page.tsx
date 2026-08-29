import { Setup } from "@/views/setup";
import { fetchPublicData } from "@/lib/prefetch";
import { type SetupCategory } from "@/service/setup.service";
import type { Metadata } from "next";

export const revalidate = 31536000;

export const metadata: Metadata = {
  title: "Setup | Kenshien Alao",
  description:
    "The tools Kenshien Alao uses for development, design, and productivity.",
  alternates: {
    canonical: "/setup",
  },
};

export default async function SetupPage() {
  const setups = await fetchPublicData<SetupCategory>("/api/setup");
  return <Setup setups={setups} />;
}
