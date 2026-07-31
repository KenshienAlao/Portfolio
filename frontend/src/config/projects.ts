interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  github: string;
  demo: string | null;
}
export const PROJECTS: readonly Project[] = [
  {
    id: 1,
    title: "BareSway",
    image: "/projects/bare.png",
    description: "A minimal tiling Wayland compositor.",
    tags: ["Compositor", "Wayland", "Minimalist", "Shell"],
    github: "https://github.com/KenshienAlao/BareSway.git",
    demo: null,
  },
  {
    id: 2,
    title: "Green-Root-Co.",
    image: "/projects/greenrootco.png",
    description:
      "A comprehensive component library built with React and Tailwind CSS for enterprise applications.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Landing-Page"],
    github: "https://github.com/KenshienAlao/Green-Roots-Co..git",
    demo: "https://greenrootsco.vercel.app",
  },
  {
    id: 3,
    title: "CISM",
    image: "/projects/cism.png",
    description:
      "A mobile-web app for the canteen ecommerce, with features like ordering, and payment",
    tags: [
      "Mobile-Web-App",
      "Java",
      "SpringBoot",
      "TypeScript",
      "Supabase",
      "NextJS",
    ],
    github: "https://github.com/KenshienAlao/cism-client.git",
    demo: "https://cism-client.vercel.app",
  },
  {
    id: 4,
    title: "ELibrary-CDM",
    image: "/projects/elibrary.png",
    description: "A web application for the libary in the Colegio De Montalban",
    tags: ["Web-App", "Java", "SringBoot", "TypeScript", "NextJS", "Supabase"],
    github: "https://github.com/KenshienAlao/elibrary-cdm.git",
    demo: "https://elibrary-cdm.vercel.app/",
  },
] as const;
