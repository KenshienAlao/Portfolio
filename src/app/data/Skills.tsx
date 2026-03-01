export const SKILLS = [
    "Frontend",
    "Backend",
    "Tools",
] as const;

export type Skills = (typeof SKILLS)[number];