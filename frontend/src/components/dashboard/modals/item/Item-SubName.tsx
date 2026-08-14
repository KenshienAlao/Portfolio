import { SetupItem } from "@/service/setup.service";

interface props {
  itemForm: Partial<SetupItem>;
  isLoading: boolean;
}

export function SubName({ itemForm, isLoading }: props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="space-y-1">
        <label htmlFor="subValue" className="block text-text-secondary">
          Sub-Button Text{" "}
          <span className="text-text-secondary/50">(optional)</span>
        </label>
        <input
          id="subValue"
          aria-label="Sub-Button Text"
          name="subValue"
          defaultValue={itemForm.subValue || ""}
          disabled={isLoading}
          placeholder="Download my Config"
          className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent disabled:opacity-60"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="subDownload" className="block text-text-secondary">
          Sub-Button URL{" "}
          <span className="text-text-secondary/50">(optional)</span>
        </label>
        <input
          id="subDownload"
          aria-label="Sub-Button URL"
          name="subDownload"
          defaultValue={itemForm.subDownload || ""}
          disabled={isLoading}
          placeholder="https://github.com/..."
          className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent disabled:opacity-60"
        />
      </div>
    </div>
  );
}
