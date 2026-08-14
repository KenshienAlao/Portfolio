import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { FiEdit3, FiLoader } from "react-icons/fi";
import { Project } from "@/hooks/admin/use-project-admin";

interface props {
  projects: Project[];
  isDeletingProject: boolean;
  deletingProjectId: number | undefined;
  confirmDeleteId: number | null;
  setProjectForm: (project: Partial<Project>) => void;
  setConfirmDeleteId: (id: number | null) => void;
  deleteProject: (id: number) => void;
}

export function Content({
  projects,
  isDeletingProject,
  deletingProjectId,
  confirmDeleteId,
  setProjectForm,
  setConfirmDeleteId,
  deleteProject,
}: props) {
  const MAX_VISIBLE_TAGS = 3;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {projects?.map((project) => {
        const isPendingCreate = project.id < 0;
        const isDeletingThis =
          isDeletingProject && deletingProjectId === project.id;
        const isConfirmingDelete = confirmDeleteId === project.id;
        const actionsDisabled = isPendingCreate || isDeletingThis;

        return (
          <article
            key={project.id}
            className="flex flex-col rounded-xl border border-border bg-surface overflow-hidden shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft-lg"
          >
            <div className="relative aspect-video overflow-hidden border-b border-border bg-muted">
              {project.image ? (
                <div className="w-full h-full relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="640px"
                    priority
                    unoptimized={project.image.startsWith("blob:")}
                    className={`object-cover ${isPendingCreate ? "opacity-50 grayscale-50" : ""}`}
                  />
                  {isPendingCreate && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[1px]">
                      <FiLoader className="h-6 w-6 text-accent animate-spin" />
                    </div>
                  )}
                </div>
              ) : isPendingCreate ? (
                <div className="w-full h-full bg-accent/20 animate-pulse flex items-center justify-center">
                  <FiLoader className="h-6 w-6 text-accent animate-spin opacity-50" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-secondary font-mono text-xs">
                  No image
                </div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col gap-3">
              <div className="flex justify-between items-start gap-2">
                <h3 className="min-w-0 flex-1 truncate font-mono text-sm font-bold text-text-primary">
                  {project.title}
                </h3>
                <div className="flex shrink-0 gap-1">
                  {isConfirmingDelete ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          deleteProject(project.id);
                          setConfirmDeleteId(null);
                        }}
                        className="rounded-md bg-destructive px-2 py-1 font-mono text-[10px] font-semibold text-white hover:opacity-90 transition-opacity"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="rounded-md border border-border px-2 py-1 font-mono text-[10px] text-text-secondary hover:text-text-primary transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setProjectForm(project)}
                        disabled={actionsDisabled}
                        aria-label="Edit project"
                        className="p-1.5 hover:bg-background rounded-md text-text-secondary hover:text-accent transition-colors disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-text-secondary"
                      >
                        <FiEdit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(project.id)}
                        disabled={actionsDisabled}
                        aria-label="Delete project"
                        className="p-1.5 hover:bg-destructive/10 rounded-md text-text-secondary hover:text-destructive transition-colors disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-text-secondary"
                      >
                        {isDeletingThis ? (
                          <FiLoader className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <FaTrash className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-auto">
                {project.tags.slice(0, MAX_VISIBLE_TAGS).map((t, idx) => (
                  <span
                    key={`${t}-${idx}`}
                    className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-accent"
                  >
                    {t}
                  </span>
                ))}
                {project.tags.length > MAX_VISIBLE_TAGS && (
                  <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] font-semibold text-text-secondary">
                    +{project.tags.length - MAX_VISIBLE_TAGS}
                  </span>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
