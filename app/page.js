import Image from "next/image";
import About from "./components/About/page";
import Home from "./components/Home/page";
import Navigation from "./components/Navigation/page";

export default function Portfolio() {
  return (
    <div>
      <nav>
        <Navigation />
      </nav>

      <main>
        <Home />
        <About />
      </main>

      <footer>
        
      </footer>
    </div>
  );
}
