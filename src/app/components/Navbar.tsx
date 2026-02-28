"use client";
import { useContext } from "react";
import { Menu } from "lucide-react";
import { MenuContext } from "@/context/menuContext";
import type { Section } from "@/app/page";
import { TABS } from "@/app/page";

interface NavbarProps {
  activeSection: Section;
  setActiveSection: (i: Section) => void;
}

export function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const { handleMenu } = useContext(MenuContext);

  return (
    <nav className="sticky inset-0 top-0 z-50">
      <div className="flex justify-between bg-blue-300 p-2">
        <div className="mx-2 size-full">
          {/* desktop navbar */}
          <div className="hidden justify-center md:flex md:gap-4">
            {TABS.map((i) => (
              <button
                key={i}
                onClick={() => setActiveSection(i)}
                className={`transition-opacity hover:opacity-50 ${
                  activeSection === i ? "font-bold" : ""
                }`}
              >
                {i}
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
