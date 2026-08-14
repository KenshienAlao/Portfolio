import { FaPlus } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import { Skill } from "@/hooks/admin/use-skill-admin";

interface props {
  categoryCount: number;
  hasSkills: boolean;
  setSkillForm: Dispatch<SetStateAction<Partial<Skill> | null>>;
}

export function Header({ categoryCount, hasSkills, setSkillForm }: props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="mt-1 flex items-center gap-2 text-lg font-bold text-text-primary">
          {categoryCount !== 1 ? "Categories" : "Category"}
          {hasSkills && (
            <span className="font-mono text-xs font-normal text-text-secondary">
              ({categoryCount})
            </span>
          )}
        </h2>
      </div>
      <button
        type="button"
        onClick={() => setSkillForm({})}
        className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-on-accent hover:opacity-90 font-mono transition-opacity"
      >
        <FaPlus className="h-4 w-4" /> Add Skill
      </button>
    </div>
  );
}
