import { SectionHeader } from "@/components/section-header";
import { ProjectCardSkeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <SectionHeader
          path="~/projects"
          command="ls -la"
          title="Projects"
          description="Selected work showcasing full-stack development, UI design, and problem solving."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
