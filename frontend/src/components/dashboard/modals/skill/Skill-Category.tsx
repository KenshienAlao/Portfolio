const SKILL_CATEGORIES = [
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Platforms",
];

interface SkillCategoryProps {
  defaultValue?: string;
  disabled?: boolean;
  categoryError?: { message: string };
}

export function SkillCategory({
  defaultValue = "",
  disabled = false,
  categoryError,
}: SkillCategoryProps) {
  return (
    <div className="space-y-1">
      <label htmlFor="category" className="block text-text-secondary">
        Category
      </label>
      <select
        id="category"
        aria-label="Category"
        name="category"
        defaultValue={defaultValue}
        disabled={disabled}
        aria-invalid={categoryError ? "true" : "false"}
        className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
          categoryError
            ? "border-destructive/60 focus:border-destructive"
            : "border-border focus:border-accent"
        }`}
      >
        <option value="" disabled>
          Select category
        </option>
        {SKILL_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {categoryError && (
        <p role="alert" className="text-destructive">
          {categoryError.message}
        </p>
      )}
    </div>
  );
}
