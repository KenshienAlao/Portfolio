"use client";

// lib
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

// hooks
import { useOpen } from "@/app/hooks/useOpenMenuNavigation";
import { useHandleScroll } from "@/app/hooks/useHandleScroll";
import { useScrollToSection } from "@/app/hooks/useScrollToSection";

// utils
import { menu } from "@/app/utils/navigationMenu";

export default function Navigation({ active }) {
  const scrolled = useHandleScroll();
  const scrollToSection = useScrollToSection();
  const { open, setOpen } = useOpen();

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 z-100 w-full ${scrolled ? "py-4" : "py-6"}`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <AnimatePresence>
            <div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`bg-glass border-glass-border flex items-center justify-between rounded-2xl border px-6 py-3 shadow-lg backdrop-blur-md transition-all duration-500 ${
                scrolled ? "shadow-xl" : "shadow-none"
              }`}
            >
              {/* logo */}
              <div className="text-foreground cursor-pointer text-2xl font-black tracking-tighter transition-all duration-500 hover:scale-110">
                KEN<span className="text-accent">SHIEN</span>
              </div>

              {/* desktop menu */}
              <div className="hidden items-center gap-8 sm:flex">
                <ul className="flex items-center gap-8">
                  {menu.map((item) => {
                    return (
                      <li key={item.name} className="group relative">
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`text-sm font-bold tracking-wide transition-colors ${
                            active === item.name
                              ? "text-accent"
                              : "text-foreground/70 group-hover:text-foreground"
                          }`}
                        >
                          {item.name}
                        </button>

                        <span
                          className={`bg-accent absolute -bottom-1 left-0 h-0.5 transition-all duration-500 ${
                            active === item.name
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                          }`}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* mobile toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="text-foreground relative z-110 flex cursor-pointer sm:hidden"
                onClick={() => setOpen(!open)}
              >
                <svg
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
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* mobile menu modal */}
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
                {menu.map((item, i) => {
                  return (
                    <motion.li
                      key={item.name}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setOpen(false)}
                    >
                      <button
                        onClick={() => scrollToSection(id)}
                        className={`text-3xl font-black tracking-tight transition-colors ${
                          active === id
                            ? "text-accent"
                            : "text-foreground hover:text-accent"
                        }`}
                      >
                        {item.name}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>,
          document.body,
        )}
    </>
  );
}
