import type { Section } from "@/app/page";
import { TABS } from "@/app/page";

/** 
 * @returns mobile navbar
 */


interface NavbarMobileProps {
  activeSection: Section;
  setActiveSection: (i: Section) => void;
  isOpen: boolean;
  handleMenu: (isOpen: boolean) => void;
}

export function NavbarMobile({activeSection, setActiveSection, isOpen, handleMenu}: NavbarMobileProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-60 flex flex-col items-center justify-center gap-4 bg-blue-300">
      {TABS.map((i) => (
        <button
          key={i}
          onClick={() => {
            setActiveSection(i);
            handleMenu(false);
          }}
          className={`transition-opacity hover:opacity-50 ${
            activeSection === i ? "font-bold" : ""
          }`}
        >
          {i}
        </button>
      ))}
    </div>
  );
}
