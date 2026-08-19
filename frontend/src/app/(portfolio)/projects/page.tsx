import { Projects } from "@/views/projects";
import { apiUrl, fetchWithFallback } from "@/lib/prefetch";
import { type Project } from "@/service/project.service";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects | Kenshien Alao",
  description:
    "Selected projects showcasing full-stack development, UI design, and problem solving by Kenshien Alao.",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await fetchWithFallback<Project[]>(`${apiUrl}/api/project`);

  return <Projects projects={projects} />;
}
