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
