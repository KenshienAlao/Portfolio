import { SectionHeader } from "@/components/section-header";
import { SetupCardSkeleton } from "@/components/ui/skeleton";

export default function SetupLoading() {
  return (
    <section
      id="setup"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        <SectionHeader
          path="~/setup"
          command="cat .config"
          title="Setup"
          description="The tools I use for development, design, and productivity."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <SetupCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
