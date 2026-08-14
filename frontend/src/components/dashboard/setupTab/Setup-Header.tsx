import { SetupCategory, SetupItem } from "@/service/setup.service";
import { Dispatch, SetStateAction } from "react";
import { FiFolderPlus, FiPlus } from "react-icons/fi";

interface props {
  categoryList: SetupCategory[];
  totalItems: number;
  setCategoryForm: Dispatch<SetStateAction<Partial<SetupCategory> | null>>;
  setItemForm: Dispatch<
    SetStateAction<(Partial<SetupItem> & { categoryId?: number }) | null>
  >;
}

export function Header({
  categoryList,
  totalItems,
  setCategoryForm,
  setItemForm,
}: props) {
  const hasCategories = categoryList.length > 0;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="mt-1 flex items-center gap-2 text-lg font-bold text-text-primary">
          Setup Configuration
          {hasCategories && (
            <span className="text-xs font-normal text-text-secondary">
              ({categoryList.length} categories, {totalItems} items)
            </span>
          )}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCategoryForm({})}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text-primary transition-colors hover:border-accent/50 hover:bg-surface"
        >
          <FiFolderPlus className="h-4 w-4 text-accent" /> Add Category
        </button>

        <button
          type="button"
          onClick={() => {
            if (!hasCategories) {
              setCategoryForm({});
            } else {
              setItemForm({});
            }
          }}
          className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-on-accent transition-opacity hover:opacity-90"
        >
          <FiPlus className="h-4 w-4" /> Add Item
        </button>
      </div>
    </div>
  );
}
