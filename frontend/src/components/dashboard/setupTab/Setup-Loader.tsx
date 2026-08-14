export function Loader() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="h-56 animate-pulse rounded-xl border border-border bg-surface/50 p-5"
        />
      ))}
    </div>
  );
}
