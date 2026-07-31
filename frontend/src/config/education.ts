export interface EducationItem {
  school: string;
  degree: string;
  years: string;
  description: string;
}

export const EDUCATION: EducationItem[] = [
  {
    school: "Bachelor of Science in Information Technology",
    degree: "College",
    years: "2022 — Present",
    description:
      "Focusing on software engineering, web development, and database systems. Building full-stack projects with React, Next.js, and Spring Boot while deepening my understanding of clean architecture and scalable design.",
  },
  {
    school: "Senior High School — STEM Strand",
    degree: "Science, Technology, Engineering & Mathematics",
    years: "2020 — 2022",
    description:
      "Completed the STEM strand with a strong foundation in mathematics, logic, and computer science fundamentals that sparked my passion for programming.",
  },
  {
    school: "Junior High School",
    degree: "Secondary Education",
    years: "2016 — 2020",
    description:
      "Discovered an early interest in technology and problem solving, which motivated me to pursue a career in software development.",
  },
];
