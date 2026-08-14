import {
  FaCog,
  FaFolder,
  FaGraduationCap,
  FaHome,
  FaUser,
} from "react-icons/fa";
import { LuContactRound, LuMonitorCog } from "react-icons/lu";

export const NAV_PAGES = {
  LINKS: {
    HOME: "Home",
    ABOUT: "About",
    PROJECTS: "Projects",
    EDUCATION: "Education",
    SKILLS: "Skills",
    SETUP: "Setup",
    CONTACT: "Contact",
  },
  ICONS: {
    HOME: FaHome,
    ABOUT: FaUser,
    PROJECTS: FaFolder,
    EDUCATION: FaGraduationCap,
    SKILLS: FaCog,
    SETUP: LuMonitorCog,
    CONTACT: LuContactRound,
  },
} as const;
