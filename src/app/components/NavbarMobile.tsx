import type { Section } from "@/app/page";
import { TABS } from "@/app/page";

/**
 * @returns {TSX.Element} mobile navbar
 */

interface NavbarMobileProps {
  handleMenu: () => void;
  setActiveSection: (tab: Section) => void;
  activeSection: Section;
  isOpen: boolean;
}

export function NavbarMobile({ handleMenu, setActiveSection, activeSection, isOpen }: NavbarMobileProps) {



  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-blue-300 select-none">
      <div
        onClick={() => handleMenu()}
        className="fixed inset-0 z-40"
      />
      <div className="z-60 flex flex-col items-center justify-center gap-4 p-10">
        {TABS.map((i) => (
          <button
            key={i}
            onClick={() => {
              setActiveSection(i);
              handleMenu();
            }}
            className={`transition-opacity hover:opacity-50 ${activeSection === i ? "font-bold" : "font-normal"}`}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
}
