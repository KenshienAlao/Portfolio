export function Stack() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-destructive/70" />
        <span className="h-3 w-3 rounded-full bg-accent/40" />
        <span className="h-3 w-3 rounded-full bg-accent/70" />
        <span className="ml-3 flex items-center gap-1.5 text-xs text-text-secondary">
          stack.json
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
        </span>
      </div>

      <div className="space-y-2 text-xs text-text-secondary">
        <div className="flex justify-between border-b border-border/40 pb-2">
          <span>Frontend:</span>
          <span className="font-semibold text-text-primary">
            Next.js 16 / React 19
          </span>
        </div>
        <div className="flex justify-between border-b border-border/40 pb-2">
          <span>Backend:</span>
          <span className="font-semibold text-text-primary">Spring Boot 3</span>
        </div>
        <div className="flex justify-between border-b border-border/40 pb-2">
          <span>Assets:</span>
          <span className="font-semibold text-text-primary">Cloudinary</span>
        </div>
        <div className="flex justify-between">
          <span>Database:</span>
          <span className="font-semibold text-text-primary">Supabase</span>
        </div>
      </div>
    </div>
  );
}
