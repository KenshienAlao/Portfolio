"use client";

import Theme from "./components/theme/page";
import Navigation from "./components/Navigation/page";
import Home from "./components/Home/page";
import About from "./components/About/page";
import Skills from "./components/Skills/page";
import Projects from "./components/Projects/page";
import Contact from "./components/Contact/page";
import Footer from "./components/Footer/page";
import useLoading from "./hooks/loading";

export default function Portfolio() {
  const { loading } = useLoading();
  return (
    <>
      <Theme />
      {loading ? null : (
        <div className="bg-background min-h-screen transition-colors duration-500">
          <Navigation />
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
