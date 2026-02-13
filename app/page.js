"use client";

// next
import dynamic from "next/dynamic";

// components
const Navigation = dynamic(() => import("@/app/components/Navigation/page"), {
  loading: () => null,
});
const Home = dynamic(() => import("@/app/components/Home/page"), {
  loading: () => null,
});
const About = dynamic(() => import("@/app/components/About/page"), {
  loading: () => null,
});
const Skills = dynamic(() => import("@/app/components/Skills/page"), {
  loading: () => null,
});
const Projects = dynamic(() => import("@/app/components/Projects/page"), {
  loading: () => null,
});
const Contact = dynamic(() => import("@/app/components/Contact/page"), {
  loading: () => null,
});
const Footer = dynamic(() => import("@/app/components/Footer/page"), {
  loading: () => null ,
});

// ui
import { ThemeToggle } from "@/app/components/ui/themeToggle";

// hooks
import { useLoading } from "@/app/hooks/useLoading";
import { useScrollSpy } from "@/app/hooks/useScrollSpy";
import { useScrollToSaved } from "@/app/hooks/useScrollToSaved";

export default function Portfolio() {
  const loading = useLoading();
  const active = useScrollSpy();
  useScrollToSaved(loading);

  return (
    <>
      <ThemeToggle />
      {loading ? null : (
        <div className="bg-background min-h-screen transition-colors duration-500">
          <Navigation active={active} />
          <main>
            <Home />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      )}
    </>
  );
}
