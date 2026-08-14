import { FiAlertCircle } from "react-icons/fi";

interface props {
  projectError: Error;
  refetchProjects: () => void;
}

export function FetchError({ projectError, refetchProjects }: props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <FiAlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <div className="space-y-1">
        <h3 className="font-mono text-sm font-bold text-text-primary">
          Couldn&apos;t load projects
        </h3>
        <p className="text-xs text-text-secondary max-w-xs">
          {projectError.message || "Something went wrong. Please try again."}
        </p>
      </div>
      <button
        type="button"
        onClick={() => refetchProjects()}
        className="mt-2 flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 font-mono text-xs font-semibold text-text-primary hover:border-accent/40 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
