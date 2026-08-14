interface SkillNameProps {
  defaultValue?: string;
  disabled?: boolean;
  nameError?: { message: string };
}

export function SkillName({
  defaultValue = "",
  disabled = false,
  nameError,
}: SkillNameProps) {
  return (
    <div className="space-y-1">
      <label htmlFor="name" className="block text-text-secondary">
        Skill Name
      </label>
      <input
        id="name"
        aria-label="Skill Name"
        name="name"
        defaultValue={defaultValue}
        disabled={disabled}
        aria-invalid={nameError ? "true" : "false"}
        className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
          nameError
            ? "border-destructive/60 focus:border-destructive"
            : "border-border focus:border-accent"
        }`}
      />
      {nameError && (
        <p role="alert" className="text-destructive">
          {nameError.message}
        </p>
      )}
    </div>
  );
}
