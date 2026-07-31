export interface SkillItem {
  name: string;
  level: number;
  image: {
    light: string;
    dark: string;
  };
}

export interface SkillsStructure {
  [key: string]: SkillItem[];
  Languages: SkillItem[];
  Frontend: SkillItem[];
  Backend: SkillItem[];
  Database: SkillItem[];
  Tools: SkillItem[];
  Platforms: SkillItem[];
}

const s = (
  name: string,
  level: number,
  image: string,
  themed: boolean = false,
): SkillItem => ({
  name,
  level,
  image: themed
    ? {
        light: `/skills/${image}_light.svg`,
        dark: `/skills/${image}_dark.svg`,
      }
    : {
        light: `/skills/${image}.svg`,
        dark: `/skills/${image}.svg`,
      },
});

export const SKILLS: SkillsStructure = {
  Languages: [
    s("JavaScript", 90, "language/javascript"),
    s("TypeScript", 85, "language/typescript"),
    s("Java", 80, "language/java"),
    s("C#", 75, "language/csharp"),
    s("C++", 80, "language/cpp"),
  ],
  Frontend: [
    s("React", 90, "frontend/react", true),
    s("Next.js", 95, "frontend/nextjs"),
    s("Tailwind CSS", 90, "frontend/tailwindcss"),
    s("Vite.js", 90, "frontend/vite"),
  ],
  Backend: [
    s("Node.js", 90, "backend/nodejs"),
    s("Express", 90, "backend/expressjs", true),
    s("Springboot", 80, "backend/spring"),
  ],
  Database: [
    s("PostgreSQL", 85, "database/postgresql"),
    s("MySQL", 85, "database/mysql", true),
  ],
  Tools: [
    s("Git", 95, "tools/git"),
    s("Docker", 90, "tools/docker"),
    s("VS Codium", 90, "tools/vscodium"),
    s("JetBrains Rider", 70, "tools/rider"),
    s("Postman", 75, "tools/postman"),
  ],
  Platforms: [
    s("Vercel", 90, "platforms/vercel", true),
    s("GitHub", 80, "platforms/github", true),
    s("Figma", 60, "platforms/figma"),
    s("Supabase", 85, "platforms/supabase"),
    s("Blender", 40, "platforms/blender"),
  ],
};
