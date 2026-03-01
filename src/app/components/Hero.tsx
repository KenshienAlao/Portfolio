import Image from "next/image";
import { Section } from "@/app/page";

/**
 * @param {function} goToContact - function to go to contact section
 * @returns {TSX.Element} hero section
 */

interface HeroProps {
  goToContact: (section: Section) => void;
}
export function Hero({ goToContact }: HeroProps) {
  return (
    <section id="home" className="p-5">
      <div className="section-container">
        <div className="section-child">
          {/* text */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Hi, I'm Kenshien</h1>
            <p className="text-xl">I'm a frontend developer</p>
          </div>
          {/* image */}
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/profile/profile.jpg"
              alt="hero"
              width={100}
              height={100}
              draggable={false}
            />
          </div>
          {/* button */}
          <div className="flex items-center justify-center gap-5">
            <button
              disabled={true}
              className="btn-primary"
            >
              Download CV
            </button>
            <button
              onClick={() => goToContact("Contact")}
              className="btn-primary"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
