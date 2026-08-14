export const ProjectCardSkeleton = () => {
  return (
    <div
      className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-border bg-surface"
      aria-hidden="true"
    >
      <div className="aspect-video border-b border-border bg-muted-foreground/15" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-4 w-2/3 rounded bg-muted-foreground/15" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-muted-foreground/15" />
          <div className="h-3 w-5/6 rounded bg-muted-foreground/15" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <div className="h-5 w-14 rounded-md bg-muted-foreground/15" />
          <div className="h-5 w-16 rounded-md bg-muted-foreground/15" />
          <div className="h-5 w-12 rounded-md bg-muted-foreground/15" />
        </div>
        <div className="mt-auto flex gap-2 pt-2">
          <div className="h-8 w-20 rounded-lg bg-muted-foreground/15" />
          <div className="h-8 w-24 rounded-lg bg-muted-foreground/15" />
        </div>
      </div>
    </div>
  );
};

export const EducationCardSkeleton = () => {
  return (
    <li className="relative animate-pulse pl-8" aria-hidden="true">
      <div className="absolute -left-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface">
        <div className="h-3.5 w-3.5 rounded-full bg-muted-foreground/15" />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-4 w-2/3 rounded bg-muted-foreground/15" />
          <div className="h-5 w-24 shrink-0 rounded-md bg-muted-foreground/15" />
        </div>
        <div className="mt-2 h-3.5 w-2/5 rounded bg-muted-foreground/15" />
        <div className="mt-4 space-y-2">
          <div className="h-3 w-full rounded bg-muted-foreground/15" />
          <div className="h-3 w-4/5 rounded bg-muted-foreground/15" />
        </div>
      </div>
    </li>
  );
};

export const DashboardProjectCardSkeleton = () => {
  return (
    <article
      className="flex flex-col rounded-xl border border-border bg-surface overflow-hidden shadow-soft animate-pulse"
      aria-hidden="true"
    >
      <div className="relative aspect-video overflow-hidden border-b border-border bg-muted-foreground/15" />
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="flex justify-between items-start gap-2">
          <div className="h-4 w-1/2 rounded bg-muted-foreground/15" />
          <div className="flex shrink-0 gap-1">
            <div className="h-6 w-6 rounded-md bg-muted-foreground/15" />
            <div className="h-6 w-6 rounded-md bg-muted-foreground/15" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-muted-foreground/15" />
          <div className="h-3 w-4/5 rounded bg-muted-foreground/15" />
        </div>
        <div className="flex flex-wrap gap-1 mt-auto pt-1">
          <div className="h-4 w-10 rounded-md bg-muted-foreground/15" />
          <div className="h-4 w-12 rounded-md bg-muted-foreground/15" />
          <div className="h-4 w-14 rounded-md bg-muted-foreground/15" />
        </div>
      </div>
    </article>
  );
};

export const DashboardEducationCardSkeleton = () => {
  return (
    <div
      className="rounded-xl border border-border bg-surface p-5 flex flex-col md:flex-row justify-between gap-4 animate-pulse"
      aria-hidden="true"
    >
      <div className="space-y-3 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="h-4 w-1/3 rounded bg-muted-foreground/15" />
          <div className="h-5 w-24 rounded-md bg-muted-foreground/15" />
        </div>
        <div className="h-3 w-1/4 rounded bg-muted-foreground/15" />
        <div className="space-y-2 pt-1">
          <div className="h-3 w-full rounded bg-muted-foreground/15 max-w-3xl" />
          <div className="h-3 w-5/6 rounded bg-muted-foreground/15 max-w-3xl" />
        </div>
      </div>
      <div className="flex md:flex-col gap-2 items-end justify-start shrink-0">
        <div className="h-8 w-20 rounded-lg bg-muted-foreground/15" />
        <div className="h-8 w-24 rounded-lg bg-muted-foreground/15" />
      </div>
    </div>
  );
};

export const DashboardSkillCategorySkeleton = () => {
  return (
    <div
      className="rounded-xl border border-border bg-surface p-6 space-y-4 animate-pulse"
      aria-hidden="true"
    >
      <div className="h-4 w-1/4 rounded bg-muted-foreground/15 border-b border-border pb-2" />
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-background/50"
          >
            <div className="space-y-1.5 flex-1">
              <div className="h-3 w-2/3 rounded bg-muted-foreground/15" />
              <div className="h-2.5 w-1/3 rounded bg-muted-foreground/15" />
            </div>
            <div className="flex gap-1 shrink-0">
              <div className="h-6 w-6 rounded bg-muted-foreground/15" />
              <div className="h-6 w-6 rounded bg-muted-foreground/15" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SetupCardSkeleton = () => {
  return (
    <div
      className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-5 animate-pulse"
      aria-hidden="true"
    >
      <div className="flex flex-col gap-3">
        <div className="h-3 w-28 rounded bg-muted-foreground/15" />
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-md bg-muted-foreground/15" />
            <div className="h-4 w-20 rounded bg-muted-foreground/15" />
          </div>
          <div className="h-4 w-1 rounded bg-muted-foreground/15" />
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-md bg-muted-foreground/15" />
            <div className="h-4 w-24 rounded bg-muted-foreground/15" />
          </div>
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="h-3.5 w-full rounded bg-muted-foreground/15" />
          <div className="h-3.5 w-4/5 rounded bg-muted-foreground/15" />
        </div>
      </div>
      <div className="h-7 w-32 rounded-lg bg-muted-foreground/15" />
    </div>
  );
};
