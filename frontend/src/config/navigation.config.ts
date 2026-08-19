import {
  FaCog,
  FaFolder,
  FaGraduationCap,
  FaHome,
  FaUser,
} from "react-icons/fa";
import { LuContactRound, LuMonitorCog } from "react-icons/lu";

export const NAV_ITEMS = [
  { label: "Home", href: "/", icon: FaHome },
  { label: "About", href: "/about", icon: FaUser },
  { label: "Projects", href: "/projects", icon: FaFolder },
  { label: "Education", href: "/education", icon: FaGraduationCap },
  { label: "Skills", href: "/skills", icon: FaCog },
  { label: "Setup", href: "/setup", icon: LuMonitorCog },
  { label: "Contact", href: "/contact", icon: LuContactRound },
] as const;
