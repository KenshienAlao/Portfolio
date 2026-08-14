interface ProjectTitleProps {
  defaultValue?: string;
  disabled?: boolean;
  titleError?: { message: string };
}

export function ProjectTitle({
  defaultValue = "",
  disabled = false,
  titleError,
}: ProjectTitleProps) {
  return (
    <div className="space-y-1">
      <label htmlFor="title" className="text-text-secondary block">
        Title
      </label>
      <input
        id="title"
        aria-label="Title"
        name="title"
        defaultValue={defaultValue}
        disabled={disabled}
        aria-invalid={titleError ? "true" : "false"}
        className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
          titleError
            ? "border-destructive/60 focus:border-destructive"
            : "border-border focus:border-accent"
        }`}
      />
      {titleError && (
        <p role="alert" className="text-destructive">
          {titleError.message}
        </p>
      )}
    </div>
  );
}
