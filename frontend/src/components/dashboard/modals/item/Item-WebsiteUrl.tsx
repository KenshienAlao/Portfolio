import { SetupItem } from "@/service/setup.service";

interface props {
  itemForm: Partial<SetupItem>;
  downloadError?: { message?: string };
  isLoading: boolean;
}

export function WebsiteUrl({ itemForm, downloadError, isLoading }: props) {
  return (
    <div className="space-y-1">
      <label htmlFor="download" className="block text-text-secondary">
        Download / Website URL
      </label>
      <input
        id="download"
        aria-label="Download / Website URL"
        required
        name="download"
        defaultValue={itemForm.download || ""}
        disabled={isLoading}
        placeholder="https://vscodium.com"
        className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
          downloadError
            ? "border-destructive/60 focus:border-destructive"
            : "border-border focus:border-accent"
        }`}
      />
      {downloadError && (
        <p role="alert" className="text-destructive">
          {downloadError.message}
        </p>
      )}
    </div>
  );
}
