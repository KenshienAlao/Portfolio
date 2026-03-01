/**
 * @returns {JSX.Element} Loading component
 */
export function Loading() {
  return (
    <div className="bg-background flex h-dvh flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 rounded-full bg-blue-500/20 blur-xl" />
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-600"
          role="status"
          aria-label="Loading"
        />
      </div>

      <p className="text-muted-foreground mt-4 text-sm font-medium tracking-wide">
        Loading...
      </p>
    </div>
  );
}
