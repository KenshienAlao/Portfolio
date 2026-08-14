"use client";

import { useState } from "react";
import { ProjectModal } from "@/components/dashboard/modals/ProjectModal";
import {
  Project,
  useDeleteProjectById,
  useProjectAdmin,
} from "@/hooks/admin/use-project-admin";
import { DashboardProjectCardSkeleton } from "../ui/skeleton";
import { Header } from "./projectsTab/Projects-Header";
import { FetchError } from "./projectsTab/Projects-Error";
import { Empty } from "./projectsTab/Projects-Empty";
import { Content } from "./projectsTab/Projects-Content";

export function ProjectsTab() {
  const {
    data: projects,
    isPending: loadingProject,
    error: projectError,
    refetch: refetchProjects,
  } = useProjectAdmin();

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
      <Header
        projects={projects}
        hasProjects={hasProjects}
        setProjectForm={setProjectForm}
      />

      {projectError ? (
        <FetchError
          projectError={projectError}
          refetchProjects={refetchProjects}
        />
      ) : loadingProject ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <DashboardProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : !hasProjects ? (
        <Empty setProjectForm={setProjectForm} />
      ) : (
        <Content
          projects={projects}
          isDeletingProject={isDeletingProject}
          deletingProjectId={deletingProjectId}
          confirmDeleteId={confirmDeleteId}
          setProjectForm={setProjectForm}
          setConfirmDeleteId={setConfirmDeleteId}
          deleteProject={deleteProject}
        />
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
