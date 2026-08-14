import { SetupCategory } from "@/service/setup.service";

interface props {
  selectedCategoryId: string;
  setSelectedCategoryId: (id: string) => void;
  isLoading: boolean;
  categoryError?: { message?: string };
  categories: SetupCategory[];
}

export function Category({
  selectedCategoryId,
  setSelectedCategoryId,
  isLoading,
  categoryError,
  categories,
}: props) {
  return (
    <div className="space-y-1">
      <label htmlFor="category" className="block text-text-secondary">
        Category
      </label>
      <select
        id="category"
        aria-label="Category"
        required
        name="categoryId"
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        disabled={isLoading}
        className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
          categoryError
            ? "border-destructive/60 focus:border-destructive"
            : "border-border focus:border-accent"
        }`}
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.category}
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
