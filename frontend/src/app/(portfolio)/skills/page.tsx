import { Skills } from "@/views/skills";
import { fetchPublicData } from "@/lib/prefetch";
import { type Skill } from "@/service/skill.service";
import type { Metadata } from "next";

export const revalidate = 31536000;

export const metadata: Metadata = {
  title: "Skills | Kenshien Alao",
  description:
    "Tools and technologies Kenshien Alao works with across the stack.",
  alternates: {
    canonical: "/skills",
  },
};

export default async function SkillsPage() {
  const skills = await fetchPublicData<Skill>("/api/skill");
  return <Skills skills={skills} />;
}
