import { Astroid, FolderBookmark, Layers } from "lucide-react";
import { PROJECTS } from "./projects";

export const HIGHLIGHTS = {
  STATS: [
    { label: "Years of Experience", value: `${Math.max(1, new Date().getFullYear() - 2024)}+` },
    { label: "Projects Completed", value: PROJECTS.length },
    { label: "Tech Stack Focus", value: "NextJS" },
  ],
  ICONS: [
    Astroid,
    FolderBookmark,
    Layers
  ]

} as const;
