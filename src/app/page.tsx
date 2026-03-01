"use client";

import { useContext } from "react";

import { MenuContext } from "@/context/menuContext";
import { LoadingContext } from "@/context/loadingContext";


import { ThemeToggle } from "./components/ui/themeToggle";
import { Loading } from "@/app/ui/loading";

import { useSectionHandle } from "@/hooks/useSectionHandle";
import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { Skills } from "@/app/components/Skills";
import { Projects } from "@/app/components/Projects";
import { Contact } from "@/app/components/Contact";
import { NavbarMobile } from "@/app/components/NavbarMobile";

/**
 * @param {boolean} loading - if loading
 * @param {string} activeSection - active section
 * @param {function} setActiveSection - set active section
 * @param {boolean} isOpen - if menu is open
 * @param {function} handleMenu - handle menu (boolean)
 * @returns {TSX.Element} home page
 */

export const TABS = ["Home", "About", "Skills", "Projects", "Contact"] as const;

export type Section = (typeof TABS)[number];

export default function Home() {
  const { loading } = useContext(LoadingContext);
  const { isOpen, handleMenu } = useContext(MenuContext);
  const { activeSection, handeIsActiveSection } = useSectionHandle();

  if (loading) return <Loading />;

  return (
    <>
      <div className="flex h-dvh flex-col overflow-hidden">
        <Navbar
          setActiveSection={handeIsActiveSection}
          handleMenu={handleMenu}
          activeSection={activeSection}
        />
        <NavbarMobile
          handleMenu={handleMenu}
          setActiveSection={handeIsActiveSection}
          activeSection={activeSection}
          isOpen={isOpen}
        />
        <main className="flex-1">
          {activeSection === "Home" && <Hero goToContact={handeIsActiveSection} />}
          {activeSection === "About" && <About />}
          {activeSection === "Skills" && <Skills />}
          {activeSection === "Projects" && <Projects />}
          {activeSection === "Contact" && <Contact />}
        </main>
        <ThemeToggle />
      </div>
    </>
  );
}
