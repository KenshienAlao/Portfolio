"use client";

// ui
import { motion } from "framer-motion";
import { containerVariants } from "@/app/components/ui/animation";

export default function About() {
  return (
    <section id="about" className="relative min-h-dvh w-full overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <h1>About</h1>
      </motion.div>
    </section>
  );
}
