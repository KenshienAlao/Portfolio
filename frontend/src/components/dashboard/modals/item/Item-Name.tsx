import { SetupItem } from "@/service/setup.service";

interface props {
  itemForm: Partial<SetupItem>;
  valueError?: { message?: string };
  isLoading: boolean;
}

export function Name({ itemForm, valueError, isLoading }: props) {
  return (
    <div className="space-y-1">
      <label htmlFor="item" className="block text-text-secondary">
        Tool / Item Name
      </label>
      <input
        id="item"
        aria-label="Tool / Item Name"
        required
        name="value"
        defaultValue={itemForm.value || ""}
        disabled={isLoading}
        placeholder="VS Codium, Arch Linux, Alacritty..."
        className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
          valueError
            ? "border-destructive/60 focus:border-destructive"
            : "border-border focus:border-accent"
        }`}
      />
      {valueError && (
        <p role="alert" className="text-destructive">
          {valueError.message}
        </p>
      )}
    </div>
  );
}
