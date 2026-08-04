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
