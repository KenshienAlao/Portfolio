"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { NAV_PAGES } from "@/config/navigation.config";
import { Hero } from "@/views/home";
import { About } from "@/views/about";
import { Projects } from "@/views/projects";
import { Setup } from "@/views/setup";
import { Contact } from "@/views/contact";
import Skills from "@/views/skills";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>(NAV_PAGES.LINKS.HOME);

  const pages: Record<string, React.ReactNode> = {
    [NAV_PAGES.LINKS.HOME]: <Hero changePage={setCurrentPage} />,
    [NAV_PAGES.LINKS.ABOUT]: <About />,
    [NAV_PAGES.LINKS.PROJECTS]: <Projects />,
    [NAV_PAGES.LINKS.SKILLS]: <Skills />,
    [NAV_PAGES.LINKS.SETUP]: <Setup />,
    [NAV_PAGES.LINKS.CONTACT]: <Contact />,
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navigation
        currentPath={currentPage.toLowerCase()}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        theme={theme}
        setTheme={setTheme}
      />
      <main className="flex-1">
        {pages[currentPage] || <Hero changePage={setCurrentPage} />}
      </main>
      <Footer />
    </div>
  );
}
