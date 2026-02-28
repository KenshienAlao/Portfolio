"use client";

import { MenuContext } from "@/context/menuContext";
import { useContext, useState } from "react";
import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { Skills } from "@/app/components/Skills";
import { Projects } from "@/app/components/Projects";
import { Contact } from "@/app/components/Contact";
import { NavbarMobile } from "@/app/components/NavbarMobile";

/**
 * @param activeSection - active section
 * @param setActiveSection - set active section
 * @param isOpen - if menu is open
 * @param handleMenu - handle menu (boolean)
 * @returns home page
 */

export const TABS = ["Home", "About", "Skills", "Projects", "Contact"] as const;

export type Section = (typeof TABS)[number];

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("Home");
  const { isOpen, handleMenu } = useContext(MenuContext);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <NavbarMobile
        isOpen={isOpen}
        handleMenu={handleMenu}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1">
        {activeSection === "Home" && <Hero goToContact={setActiveSection} />}
        {activeSection === "About" && <About />}
        {activeSection === "Skills" && <Skills />}
        {activeSection === "Projects" && <Projects />}
        {activeSection === "Contact" && <Contact />}
      </main>
    </div>
  );
}
