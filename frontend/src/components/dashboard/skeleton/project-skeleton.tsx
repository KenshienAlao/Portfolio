export function ProjectSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-surface overflow-hidden animate-pulse">
      <div className="aspect-video border-b border-border bg-muted" />
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="flex justify-between items-start gap-2">
          <div className="h-4 w-2/3 rounded bg-muted" />
          <div className="flex gap-1">
            <div className="h-6 w-6 rounded-md bg-muted" />
            <div className="h-6 w-6 rounded-md bg-muted" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded bg-muted" />
          <div className="h-3 w-4/5 rounded bg-muted" />
        </div>
        <div className="flex flex-wrap gap-1 mt-auto">
          <div className="h-4 w-12 rounded-md bg-muted" />
          <div className="h-4 w-16 rounded-md bg-muted" />
          <div className="h-4 w-10 rounded-md bg-muted" />
        </div>
      </div>
    </div>
  );
}
