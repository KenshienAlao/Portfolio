import { SectionHeader } from "@/components/section-header";
import { EducationCardSkeleton } from "@/components/ui/skeleton";

export default function EducationLoading() {
  return (
    <section
      id="education"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        <SectionHeader
          path="~/education"
          command="git log --reverse"
          title="Education"
          description="My academic journey and the milestones that shaped my path in technology."
        />

        <ol className="relative mt-14 ml-3 space-y-8 border-l border-border">
          {Array.from({ length: 3 }).map((_, i) => (
            <EducationCardSkeleton key={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
