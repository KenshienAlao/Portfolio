import { Project } from "@/service/project.service";
import { FaPlus } from "react-icons/fa";

interface props {
  projects: Project[] | undefined;
  hasProjects: boolean;
  setProjectForm: (project: Partial<Project>) => void;
}

export function Header({ projects, hasProjects, setProjectForm }: props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="mt-1 flex items-center gap-2 text-lg font-bold text-text-primary">
          {projects?.length !== 1 ? "Totals" : "Total"}
          {hasProjects && (
            <span className="font-mono text-xs font-normal text-text-secondary">
              ({projects?.length})
            </span>
          )}
        </h2>
      </div>
      <button
        type="button"
        onClick={() => setProjectForm({})}
        className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-on-accent hover:opacity-90 font-mono transition-opacity"
      >
        <FaPlus className="h-4 w-4" /> Add Project
      </button>
    </div>
  );
}
