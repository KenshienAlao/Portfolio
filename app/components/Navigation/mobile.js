"use client";

// lib
import { motion } from "framer-motion";

// context
import { useMounted } from "@/app/context/MountedContext";

export function MobileNavigation({ menu, scrollToSection, active, setOpen }) {
  const mounted = useMounted();

  if (!mounted) return null;
  return (
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
                onClick={() => scrollToSection(item.id)}
                className={`text-3xl font-black tracking-tight transition-colors ${
                  active === item.id
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
  );
}
