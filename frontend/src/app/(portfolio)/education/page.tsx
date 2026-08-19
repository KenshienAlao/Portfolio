import { Education } from "@/views/education";
import { apiUrl, fetchWithFallback } from "@/lib/prefetch";
import { type Education as EducationType } from "@/service/education.service";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Education | Kenshien Alao",
  description:
    "Academic journey and milestones that shaped Kenshien Alao's path in technology.",
  alternates: {
    canonical: "/education",
  },
};

export default async function EducationPage() {
  const education = await fetchWithFallback<EducationType[]>(
    `${apiUrl}/api/education`,
  );

  return <Education education={education} />;
}
