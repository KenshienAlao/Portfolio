import Image from "next/image";
import { socialLinks } from "@/app/data/SocialLinks";


/**
 * 
 * @returns {JSX.Element} The About section of the portfolio.
 */
export function About() {
  return (
    <section id="about" className="p-8">
      <div className="section-container">
        <div className="section-child">
          {/* Profile Image */}
          <Image
            src="/profile/profile.jpg"
            alt="Kenshien profile photo"
            width={120}
            height={120}
            className="rounded-full border border-neutral-300 shadow-sm dark:border-neutral-700"
            draggable={false}
          />

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight">About Me</h1>

            <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              I'm Kenshien, a frontend developer specializing in building
              responsive, high-performance web applications. I focus on clean
              architecture, intuitive user experiences, and modern technologies
              like React, Next.js, and TypeScript. My goal is to create digital
              products that are both visually refined and technically solid.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-8 text-neutral-600 dark:text-neutral-400">
            {socialLinks.map((Link) => (
              <a
                key={Link.name}
                href={Link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-primary"
              >
                <Link.icon size={28} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
