"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <h1 className="text-8xl font-extrabold tracking-tighter text-accent">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
            Page not found
          </h2>
          <p className="text-text-secondary/80 max-w-sm mx-auto leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="pt-8">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-accent text-white"
          >
            <Link href="/">Return</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
