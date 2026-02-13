"use client";

import { motion } from "framer-motion";
import useToggle from "../../hooks/toggle";

export default function Theme() {
  const { change, setChange, mounted } = useToggle();
  if (!mounted) return null;

  return (
    <div className="fixed right-8 bottom-8 z-60">
      <div className="border-glass-border bg-glass hover:shadow-accent/20 relative flex items-center gap-2 rounded-full border p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-500">
        {/* Sliding Background Pill */}
        <motion.div
          layoutId="active-pill"
          animate={{
            x: change ? "100%" : "0%",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 35,
          }}
          className="bg-accent absolute inset-y-1.5 left-1.5 z-0 w-[calc(50%-6px)] rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"
        />

        {/* Buttons */}
        <div className="relative z-10 flex items-center">
          <motion.button
            onClick={() => setChange(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`flex size-12 cursor-pointer items-center justify-center rounded-full transition-all duration-500 ${
              !change
                ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            <SunIcon />
          </motion.button>

          <motion.button
            onClick={() => setChange(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`flex size-12 cursor-pointer items-center justify-center rounded-full transition-all duration-500 ${
              change
                ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            <MoonIcon />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M3 12h2.25m.386-6.364 1.591-1.591M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  );
}
