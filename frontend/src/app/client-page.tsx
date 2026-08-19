"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { NAV_PAGES } from "@/config/navigation.config";
import { Hero } from "@/views/home";

const About = dynamic(() => import("@/views/about").then((mod) => mod.About));
const Projects = dynamic(() =>
  import("@/views/projects").then((mod) => mod.Projects),
);
const Setup = dynamic(() => import("@/views/setup").then((mod) => mod.Setup));
const Contact = dynamic(() =>
  import("@/views/contact").then((mod) => mod.Contact),
);
const Skills = dynamic(() => import("@/views/skills"));
const Education = dynamic(() =>
  import("@/views/education").then((mod) => mod.Education),
);

export function ClientPage() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>(NAV_PAGES.LINKS.HOME);

  const pages: Record<string, React.ReactNode> = {
    [NAV_PAGES.LINKS.HOME]: <Hero changePage={setCurrentPage} />,
    [NAV_PAGES.LINKS.ABOUT]: <About />,
    [NAV_PAGES.LINKS.PROJECTS]: <Projects />,
    [NAV_PAGES.LINKS.EDUCATION]: <Education />,
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
