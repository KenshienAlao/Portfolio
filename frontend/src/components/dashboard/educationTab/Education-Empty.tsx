import { FaGraduationCap, FaPlus } from "react-icons/fa";
import { Education } from "@/hooks/admin/use-education-admin";

interface props {
  setEducationForm: (education: Partial<Education>) => void;
}

export function Empty({ setEducationForm }: props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
        <FaGraduationCap className="h-6 w-6 text-accent" />
      </div>
      <div className="space-y-1">
        <h3 className="font-mono text-sm font-bold text-text-primary">
          No education yet
        </h3>
      </div>
      <button
        type="button"
        onClick={() => setEducationForm({})}
        className="mt-2 flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 font-mono text-xs font-semibold text-on-accent transition-opacity hover:opacity-90"
      >
        <FaPlus className="h-4 w-4" /> Add Education
      </button>
    </div>
  );
}
