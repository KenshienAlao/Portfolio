"use client";

import { useState } from "react";
import { EducationModal } from "@/components/dashboard/modals/EducationModal";
import {
  Education,
  useDeleteEducationById,
  useEducationAdmin,
} from "@/hooks/admin/use-education-admin";
import { DashboardEducationCardSkeleton } from "../ui/skeleton";
import {
  FaGraduationCap,
  FaPlus,
} from "react-icons/fa";
import { AddButton } from "./educationTab/Add-Education-Button";
import { FetchError } from "./educationTab/Error-education";
import { Content } from "./educationTab/Content-Education";

export function EducationTab() {
  const {
    data: education,
    isPending: loadingEducation,
    error: educationError,
    refetch: refetchEducation,
  } = useEducationAdmin();

  const sortedEducation = (() => {
    if (!education) return [];
    return education.toSorted((a, b) => {
      const getYearValue = (y: string) =>
        y === "Present" ? 9999 : parseInt(y) || 0;
      const endDiff = getYearValue(b.yearEnd) - getYearValue(a.yearEnd);
      if (endDiff !== 0) return endDiff;
      return getYearValue(b.yearStart) - getYearValue(a.yearStart);
    });
  })();

  const {
    mutate: deleteEducation,
    isPending: isDeletingEducation,
    variables: deletingEducationId,
  } = useDeleteEducationById();

  const [educationForm, setEducationForm] = useState<Partial<Education> | null>(
    null,
  );
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const hasEducation = (sortedEducation?.length ?? 0) > 0;

  return (
    <div className="space-y-6">
      <AddButton
        sortedEducation={sortedEducation}
        setEducationForm={setEducationForm}
        hasEducation={hasEducation}
      />

      {educationError ? (
        <FetchError
          educationError={educationError}
          refetchEducation={refetchEducation}
        />
      ) : loadingEducation ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <DashboardEducationCardSkeleton key={i} />
          ))}
        </div>
      ) : !hasEducation ? (
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
      ) : (
        <Content
          sortedEducation={sortedEducation}
          setEducationForm={setEducationForm}
          confirmDeleteId={confirmDeleteId}
          setConfirmDeleteId={setConfirmDeleteId}
          isDeletingEducation={isDeletingEducation}
          deletingEducationId={deletingEducationId}
          deleteEducation={deleteEducation}
        />
      )}

      {educationForm !== null && (
        <EducationModal
          educationForm={educationForm}
          education={education || []}
          setEducationForm={setEducationForm}
        />
      )}
    </div>
  );
}
