import { Home, User, Folder, Mail, MonitorCog } from "lucide-react";
import { FaCog } from "react-icons/fa";

export const NAV_PAGES = {
  LINKS: {
    HOME: "Home",
    ABOUT: "About",
    PROJECTS: "Projects",
    SKILLS: "Skills",
    SETUP: "Setup",
    CONTACT: "Contact",
  },
  ICONS: {
    HOME: Home,
    ABOUT: User,
    PROJECTS: Folder,
    SKILLS: FaCog,
    SETUP: MonitorCog,
    CONTACT: Mail,
  },
} as const;
