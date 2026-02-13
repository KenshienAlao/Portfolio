"use client";

import { motion, AnimatePresence } from "framer-motion";
import useOpen from "../../hooks/open";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function Navigation() {
  const { open, setOpen } = useOpen();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 z-100 w-full transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`bg-glass border-glass-border flex items-center justify-between rounded-2xl border px-6 py-3 shadow-lg backdrop-blur-md transition-all duration-300 ${
            scrolled ? "shadow-xl" : "shadow-none"
          }`}
        >
          {/* logo */}
          <div className="text-foreground text-2xl font-black tracking-tighter transition-all hover:scale-105">
            KEN<span className="text-accent">SHIEN.</span>
          </div>

          {/* menu */}
          <div className="hidden items-center gap-8 sm:flex">
            <ul className="flex items-center gap-8">
              {menu.map((item) => (
                <li key={item.name} className="group relative">
                  <a
                    href={item.href}
                    className="text-foreground/70 group-hover:text-foreground text-sm font-bold tracking-wide transition-colors"
                  >
                    {item.name}
                  </a>
                  <span className="bg-accent absolute -bottom-1 left-0 h-0.5 w-0 scale-x-0 transition-all duration-300 group-hover:w-full group-hover:scale-x-100" />
                </li>
              ))}
            </ul>
          </div>

          {/* mobile menu toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="text-foreground relative z-110 flex cursor-pointer sm:hidden"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28"
              viewBox="0 -960 960 960"
              width="28"
              fill="currentColor"
            >
              {open ? (
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              ) : (
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* mobile menu portal */}
      <AnimatePresence>
        {open &&
          createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-105 flex items-center justify-center p-6 backdrop-blur-xl"
            >
              <div
                className="bg-background/80 absolute inset-0 -z-10"
                onClick={() => setOpen(false)}
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-glass border-glass-border w-full max-w-sm rounded-[2.5rem] border p-12 shadow-2xl"
              >
                <ul className="flex flex-col items-center gap-8">
                  {menu.map((item, i) => (
                    <motion.li
                      key={item.name}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setOpen(false)}
                    >
                      <a
                        href={item.href}
                        className="text-foreground hover:text-accent text-3xl font-black tracking-tight transition-colors"
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>,
            document.body,
          )}
      </AnimatePresence>
    </nav>
  );
}
