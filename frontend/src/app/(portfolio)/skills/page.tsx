import { Skills } from "@/views/skills";
import { apiUrl, fetchWithFallback } from "@/lib/prefetch";
import { type Skill } from "@/service/skill.service";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Skills | Kenshien Alao",
  description:
    "Tools and technologies Kenshien Alao works with across the stack.",
  alternates: {
    canonical: "/skills",
  },
};

export default async function SkillsPage() {
  const skills = await fetchWithFallback<Skill[]>(`${apiUrl}/api/skill`);
  return <Skills skills={skills} />;
}
