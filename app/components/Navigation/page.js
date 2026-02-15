"use client";

// optimize
import dynamic from "next/dynamic";

// context
import { useMounted } from "@/app/context/MountedContext";

// lib
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

// hooks
import { useOpen } from "@/app/hooks/useOpenMenuNavigation";
import { useHandleScroll } from "@/app/hooks/useHandleScroll";
import { useScrollToSection } from "@/app/hooks/useScrollToSection";

// data
import { menu } from "@/app/data/navigationMenu";

// ui
import { MenuIcon } from "@/app/components/ui/icons";

// components
const MobileNavigation = dynamic(
  () =>
    import("@/app/components/Navigation/mobile").then(
      (ui) => ui.MobileNavigation,
    ),
  { loading: () => null, ssr: false },
);

export default function Navigation({ active }) {
  const mounted = useMounted();
  const scrolled = useHandleScroll();
  const scrollToSection = useScrollToSection();
  const { open, setOpen } = useOpen();

  if (!mounted) return null;
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
              className={`bg-glass border-glass-border flex items-center justify-between rounded-2xl border px-[clamp(1rem,0.6087rem+1.7391vw,2rem)] py-3 shadow-lg backdrop-blur-md transition-all duration-500 ${
                scrolled ? "shadow-xl" : "shadow-none"
              }`}
            >
              {/* logo */}
              <div className="text-foreground cursor-pointer text-[clamp(0.75rem,0.3098rem+1.9565vw,1.875rem)] font-black tracking-tighter transition-all duration-500">
                KEN<span className="text-accent">SHIEN</span>
              </div>

              {/* desktop menu */}
              <div className="hidden items-center sm:flex">
                <ul className="flex items-center gap-[clamp(1rem,0.6087rem+1.7391vw,2rem)]">
                  {menu.map((item) => {
                    return (
                      <li key={item.name} className="group relative">
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`hover:text-accent text-[clamp(0.75rem,0.5543rem+0.8696vw,1.25rem)] font-bold tracking-wide transition-colors ${
                            active === item.id
                              ? "text-accent"
                              : "group-hover:text-foreground"
                          }`}
                        >
                          {item.name}
                        </button>

                        <span
                          className={`bg-accent absolute -bottom-1 left-0 h-0.5 transition-all duration-500 ${
                            active === item.id
                              ? "w-full"
                              : "group-hover:bg-foreground w-0 group-hover:w-full"
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
                <MenuIcon />
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

            <MobileNavigation
              menu={menu}
              scrollToSection={scrollToSection}
              active={active}
              setOpen={setOpen}
            />
          </motion.div>,
          document.body,
        )}
    </>
  );
}
