"use client";

// optimize
import dynamic from "next/dynamic";

// lib
import Image from "next/image";

// context
import { useMounted } from "@/app/context/MountedContext";

// hooks
import { useTheme } from "@/app/context/ThemeContext";

// ui
import { motion } from "framer-motion";
const BlueOrbIcon = dynamic(
  () => import("@/app/components/ui/orbs").then((ui) => ui.BlueOrbIcon),
  { loading: () => null, ssr: false },
);
const GreenOrbIcon = dynamic(
  () => import("@/app/components/ui/orbs").then((ui) => ui.GreenOrbIcon),
  { loading: () => null, ssr: false },
);

const SpinningFrame = dynamic(
  () => import("@/app/components/ui/frame").then((ui) => ui.SpinningFrame),
  { loading: () => null, ssr: false },
);

// components
import {
  containerVariants,
  itemVariants,
  floatingVariants,
} from "@/app/utils/animation";

export default function Home() {
  const mounted = useMounted();
  const { change } = useTheme();

  if (!mounted) return null;
  return (
    <section id="home" className="relative min-h-dvh w-full overflow-hidden">
      {/* overlay */}
      {change ? (
        <>
          <GreenOrbIcon left={20} top={200} />
          <BlueOrbIcon right={20} bottom={100} />
        </>
      ) : null}

      {/* content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex min-h-dvh max-w-7xl flex-col items-center justify-center px-6 md:flex-row md:justify-around"
      >
        {/* text section */}
        <div className="z-10 flex flex-col items-center text-center md:items-start md:text-left">
          <motion.p
            variants={itemVariants}
            className="text-accent mb-2 text-lg font-medium tracking-wide uppercase transition-all"
          >
            Web Developer
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-5xl font-bold tracking-tight md:text-7xl"
          >
            Hi, I'm{" "}
            <span className="text-accent font-header tracking-wider transition-all">
              Kenshien
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mb-10 max-w-lg text-lg leading-relaxed md:text-xl"
          >
            I build modern, responsive web apps with clean UI and smooth user
            experience.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <button className="bg-accent cursor-pointer rounded-full px-8 py-3 font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95">
              View Projects
            </button>
            <button className="bg-accent cursor-pointer rounded-full px-8 py-3 font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95">
              Get in Touch
            </button>
          </motion.div>
        </div>

        {/* profile section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative mt-16 md:mt-0"
        >
          <motion.div
            variants={floatingVariants}
            initial="smoothHidden"
            animate={["smoothVisible", "smoothFloating"]}
            className="relative size-64 rounded-2xl border-4 border-white bg-gray-100 shadow-2xl transition-all duration-500 md:size-80"
          >
            <Image
              src="/profile/me.png"
              alt="Kenshien"
              className="size-full rounded-2xl object-cover"
              priority
              width={500}
              height={500}
            />
            {/* overlay*/}
            <SpinningFrame />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
