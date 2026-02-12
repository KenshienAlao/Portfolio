import Navigation from "./components/Navigation/page";
import Home from "./components/Home/page";
import About from "./components/About/page";
import Skills from "./components/Skills/page";
import Projects from "./components/Projects/page";
import Contact from "./components/Contact/page";
import Footer from "./components/Footer/page";

export default function Portfolio() {
  return (
    <div className="min-h-screen">
      <nav>
        <Navigation />
      </nav>

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
  );
}
