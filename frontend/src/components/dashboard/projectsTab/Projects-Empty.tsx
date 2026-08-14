import { Project } from "@/hooks/admin/use-project-admin";
import { FaFolderOpen, FaPlus } from "react-icons/fa";

interface props {
  setProjectForm: (project: Partial<Project>) => void;
}

export function Empty({ setProjectForm }: props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
        <FaFolderOpen className="h-6 w-6 text-accent" />
      </div>
      <div className="space-y-1">
        <h3 className="font-mono text-sm font-bold text-text-primary">
          No projects yet
        </h3>
      </div>
      <button
        type="button"
        onClick={() => setProjectForm({})}
        className="mt-2 flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-on-accent hover:opacity-90 font-mono transition-opacity"
      >
        <FaPlus className="h-4 w-4" /> Add Project
      </button>
    </div>
  );
}
