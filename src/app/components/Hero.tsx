import Image from "next/image";
import { Section } from "@/app/page";

interface HeroProps {
  goToContact: (section: Section) => void;
}

export function Hero({ goToContact }: HeroProps) {
  return (
    <section id="home" className="p-5">
      <div className="flex size-full flex-col items-center justify-center gap-10">
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
          />
        </div>
        {/* button */}
        <div className="flex items-center justify-center gap-5">
          <button
            disabled={true}
            className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-blue-950"
          >
            Download CV
          </button>
          <button
            onClick={() => goToContact("Contact")}
            className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-blue-950"
          >
            Get in touch
          </button>
        </div>
      </div>
    </section>
  );
}
