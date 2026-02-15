// ui
import { SunIcon, MoonIcon } from "@/app/components/ui/icons";

// utils
import { containerVariants } from "@/app/utils/animation";

// lib
import { motion } from "framer-motion";

// context
import { useTheme } from "@/app/context/ThemeContext";
import { useMounted } from "@/app/context/MountedContext";

export function ThemeToggle() {
  const mounted = useMounted();
  const { change, setChange } = useTheme();

  if (!mounted) return null;
  return (
    <motion.div
      className="fixed right-8 bottom-8 z-60"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
          <button
            onClick={() => setChange(false)}
            className={`flex size-12 cursor-pointer items-center justify-center rounded-full transition-all duration-500 ${
              !change
                ? "text-amber-400 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            <SunIcon />
          </button>

          <button
            onClick={() => setChange(true)}
            className={`flex size-12 cursor-pointer items-center justify-center rounded-full transition-all duration-500 ${
              change
                ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            <MoonIcon />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
