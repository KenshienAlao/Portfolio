"use client";
import { Menu } from "lucide-react";
import { TABS, type Section } from "@/app/page";

/**
 * @param {function} setActiveSection - set active section
 * @param {function} handleMenu - handle menu
 * @param {string} activeSection - active section
 * @returns {TSX.Element} navbar
 */

interface NavbarProps {
  setActiveSection: (tab: Section) => void;
  handleMenu: () => void;
  activeSection: Section;
}

export function Navbar({ setActiveSection, handleMenu, activeSection }: NavbarProps) {
  return (
    <nav className="sticky inset-0 top-0 z-50">
      <div className="flex justify-between bg-blue-300 p-2">
        <div className="mx-2 size-full">
          {/* desktop navbar */}
          <div className="hidden justify-center md:flex md:gap-4">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSection(tab)}
                className={`transition-opacity hover:opacity-50 ${activeSection === tab ? "font-bold" : ""
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* mobile navbar */}
          <div className="flex w-full justify-end md:hidden">
            <button
              onClick={handleMenu}
              className="m-2 ring-2 transition-opacity hover:opacity-50"
            >
              <Menu size={35} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
