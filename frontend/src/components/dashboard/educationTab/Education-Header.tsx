import { Education } from "@/service/education.service";
import { Dispatch, SetStateAction } from "react";
import { FiPlus } from "react-icons/fi";

interface props {
  sortedEducation: Education[] | undefined;
  setEducationForm: Dispatch<SetStateAction<Partial<Education | null>>>;
  hasEducation: boolean;
}

export function Header({
  sortedEducation,
  setEducationForm,
  hasEducation,
}: props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="mt-1 flex items-center gap-2 text-lg font-bold text-text-primary">
          {sortedEducation?.length !== 1 ? "Totals" : "Total"}
          {hasEducation && (
            <span className="font-mono text-xs font-normal text-text-secondary">
              ({sortedEducation?.length})
            </span>
          )}
        </h2>
      </div>
      <button
        type="button"
        onClick={() => setEducationForm({})}
        className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-on-accent hover:opacity-90 font-mono transition-opacity"
      >
        <FiPlus className="h-4 w-4" /> Add Education
      </button>
    </div>
  );
}
