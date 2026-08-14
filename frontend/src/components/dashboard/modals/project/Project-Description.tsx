interface ProjectDescriptionProps {
  defaultValue?: string;
  disabled?: boolean;
  descriptionError?: { message: string };
}

export function ProjectDescription({
  defaultValue = "",
  disabled = false,
  descriptionError,
}: ProjectDescriptionProps) {
  return (
    <div className="space-y-1">
      <label htmlFor="description" className="text-text-secondary block">
        Description
      </label>
      <textarea
        id="description"
        aria-label="Description"
        name="description"
        rows={3}
        defaultValue={defaultValue}
        disabled={disabled}
        aria-invalid={descriptionError ? "true" : "false"}
        className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
          descriptionError
            ? "border-destructive/60 focus:border-destructive"
            : "border-border focus:border-accent"
        }`}
      />
      {descriptionError && (
        <p role="alert" className="text-destructive">
          {descriptionError.message}
        </p>
      )}
    </div>
  );
}
