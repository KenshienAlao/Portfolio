export interface EducationItem {
  school: string;
  degree: string;
  years: string;
  description: string;
  location: string;
}

export const EDUCATION: EducationItem[] = [
  {
    school: "Colegio de Montalban",
    degree: "Bachelor of Science in Information Technology (BSIT)",
    years: "2025 — Present",
    description:
      "Currently pursuing a Bachelor of Science in Information Technology, with a focus on software engineering.",
    location: "https://maps.app.goo.gl/oe9GKPBFfVz9aTLj9",
  },
  {
    school: "Kasiglahan Village Senior High School",
    degree: "ICT (Information and Communications Technology)",
    years: "2023 — 2025",
    description:
      "Studied computer hardware and system units, computer assembly and maintenance, basic networking, workplace ethics, and ICT fundamentals.",
    location: "https://maps.app.goo.gl/kx4FsaYg75qzNUT49",
  },
  {
    school: "Kasiglahan Village National High School",
    degree: "Junior High School",
    years: "2019 — 2023",
    description:
      "Developed an interest in technology and problem-solving, which inspired me to pursue a career in software development.",
    location: "https://maps.app.goo.gl/jjTb4UNfcA6mKV9g6",
  },
];
