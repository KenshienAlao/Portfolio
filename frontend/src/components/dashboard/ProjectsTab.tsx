"use client";

import {
  AlertCircle,
  Edit3,
  FolderOpen,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ProjectModal } from "@/components/dashboard/modals/ProjectModal";
import {
  Project,
  useDeleteProjectById,
  useProject,
} from "@/hooks/admin/use-project-admin";
import { ProjectSkeleton } from "./skeleton/project-skeleton";

const MAX_VISIBLE_TAGS = 3;

export function ProjectsTab() {
  const {
    data: projects,
    isPending: loadingProject,
    error: projectError,
    refetch: refetchProjects,
  } = useProject();

  const {
    mutate: deleteProject,
    isPending: isDeletingProject,
    variables: deletingProjectId,
  } = useDeleteProjectById();

  const [projectForm, setProjectForm] = useState<Partial<Project> | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const hasProjects = (projects?.length ?? 0) > 0;

  return (
    <div className="space-y-6">
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
          onClick={() => setProjectForm({})}
          className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-on-accent hover:opacity-90 font-mono transition-opacity"
        >
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      {projectError ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-sm font-bold text-text-primary">
              Couldn&apos;t load projects
            </h3>
            <p className="text-xs text-text-secondary max-w-xs">
              {projectError.message ||
                "Something went wrong. Please try again."}
            </p>
          </div>
          <button
            onClick={() => refetchProjects()}
            className="mt-2 flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 font-mono text-xs font-semibold text-text-primary hover:border-accent/40 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : loadingProject ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      ) : !hasProjects ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <FolderOpen className="h-6 w-6 text-accent" />
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-sm font-bold text-text-primary">
              No projects yet
            </h3>
            <p className="text-xs text-text-secondary max-w-xs">
              Add your first project to see it show up here.
            </p>
          </div>
          <button
            onClick={() => setProjectForm({})}
            className="mt-2 flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-on-accent hover:opacity-90 font-mono transition-opacity"
          >
            <Plus className="h-4 w-4" /> Add Project
          </button>
        </div>
      ) : (
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
                          <Loader2 className="h-6 w-6 text-accent animate-spin" />
                        </div>
                      )}
                    </div>
                  ) : isPendingCreate ? (
                    <div className="w-full h-full bg-accent/20 animate-pulse flex items-center justify-center">
                      <Loader2 className="h-6 w-6 text-accent animate-spin opacity-50" />
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
                            onClick={() => {
                              deleteProject(project.id);
                              setConfirmDeleteId(null);
                            }}
                            className="rounded-md bg-destructive px-2 py-1 font-mono text-[10px] font-semibold text-white hover:opacity-90 transition-opacity"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded-md border border-border px-2 py-1 font-mono text-[10px] text-text-secondary hover:text-text-primary transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setProjectForm(project)}
                            disabled={actionsDisabled}
                            aria-label="Edit project"
                            className="p-1.5 hover:bg-background rounded-md text-text-secondary hover:text-accent transition-colors disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-text-secondary"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(project.id)}
                            disabled={actionsDisabled}
                            aria-label="Delete project"
                            className="p-1.5 hover:bg-destructive/10 rounded-md text-text-secondary hover:text-destructive transition-colors disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-text-secondary"
                          >
                            {isDeletingThis ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
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
      )}

      {projectForm !== null && (
        <ProjectModal
          projectForm={projectForm}
          projects={projects || []}
          setProjectForm={setProjectForm}
        />
      )}
    </div>
  );
}
