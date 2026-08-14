import { FiAlertCircle } from "react-icons/fi";

interface props {
  setupError: Error;
  refetchSetup: () => void;
}

export function FetchError({ setupError, refetchSetup }: props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <FiAlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-text-primary">
          Failed to load setup items
        </h3>
        <p className="max-w-xs text-xs text-text-secondary">
          {setupError.message ||
            "An unexpected error occurred while fetching your setup."}
        </p>
      </div>
      <button
        type="button"
        onClick={() => refetchSetup()}
        className="mt-2 rounded-lg border border-border bg-surface px-4 py-2 text-xs font-medium text-text-primary transition-colors hover:bg-background"
      >
        Try again
      </button>
    </div>
  );
}
