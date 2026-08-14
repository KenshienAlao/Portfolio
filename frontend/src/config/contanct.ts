import { IconType } from "react-icons";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";
import { SiGmail } from "react-icons/si";

type props = {
  label: string;
  value: string;
  href: string;
  icon: IconType;
};

export const CONTACT_LINKS: props[] = [
  {
    label: "Gmail",
    value: "gmail.com/kenshienworkacc",
    href: "mailto:kenshienworkacc@gmail.com",
    icon: SiGmail,
  },
  {
    label: "Outlook",
    value: "outlook.com/kenshienworkacc",
    href: "mailto:kenshienworkacc@outlook.com",
    icon: PiMicrosoftOutlookLogo,
  },
  {
    label: "Facebook",
    value: "facebook.com/kenshien.alao",
    href: "https://www.facebook.com/KenshienAndres",
    icon: FaFacebook,
  },
  {
    label: "Github",
    value: "github.com/KenshienAlao",
    href: "https://github.com/KenshienAlao",
    icon: FaGithub,
  },
  {
    label: "Linkedin",
    value: "linkedin.com/in/KenshienAlao",
    href: "https://www.linkedin.com/in/KenshienAlao/",
    icon: FaLinkedin,
  },
];
