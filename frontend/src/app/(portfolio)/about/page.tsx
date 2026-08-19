import { About } from "@/views/about";
import { fetchPublicData } from "@/lib/prefetch";
import { type Project } from "@/service/project.service";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About | Kenshien Alao",
  description:
    "About Kenshien Alao — a web developer passionate about modern web applications, clean interfaces, and reliable backends.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const projects = await fetchPublicData<Project>("/api/project");
  return <About projectCount={projects.length} />;
}
