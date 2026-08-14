import { SetupCategory } from "@/service/setup.service";
import { Dispatch, SetStateAction } from "react";
import { FiFolderPlus, FiTerminal } from "react-icons/fi";

interface props {
  setCategoryForm: Dispatch<SetStateAction<Partial<SetupCategory> | null>>;
}

export function Empty({ setCategoryForm }: props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-20 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface">
        <FiTerminal className="h-6 w-6 text-text-secondary" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-text-primary">
          No setup categories yet
        </h3>
        <p className="max-w-xs text-xs text-text-secondary">
          Create your first setup category (e.g. Operating System, Code Editor)
          and add tools to it.
        </p>
      </div>
      <button
        type="button"
        onClick={() => setCategoryForm({})}
        className="mt-2 flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-on-accent transition-opacity hover:opacity-90"
      >
        <FiFolderPlus className="h-4 w-4" /> Create First Category
      </button>
    </div>
  );
}
