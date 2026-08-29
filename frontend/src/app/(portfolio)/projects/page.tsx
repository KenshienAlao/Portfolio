import { Projects } from "@/views/projects";
import { fetchPublicData } from "@/lib/prefetch";
import { type Project } from "@/service/project.service";
import type { Metadata } from "next";

export const revalidate = 31536000;

export const metadata: Metadata = {
  title: "Projects | Kenshien Alao",
  description:
    "Selected projects showcasing full-stack development, UI design, and problem solving by Kenshien Alao.",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await fetchPublicData<Project>("/api/project");
  return <Projects projects={projects} />;
}
