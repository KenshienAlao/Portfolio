export const TABS = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Contact",
] as const;

export type Tab = (typeof TABS)[number];