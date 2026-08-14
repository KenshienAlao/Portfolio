"use client";

import { useState } from "react";
import { EducationModal } from "@/components/dashboard/modals/EducationModal";
import {
  Education,
  useDeleteEducationById,
  useEducationAdmin,
} from "@/hooks/admin/use-education-admin";
import { DashboardEducationCardSkeleton } from "../ui/skeleton";
import { Header } from "./educationTab/Education-Header";
import { FetchError } from "./educationTab/Education-Error";
import { Content } from "./educationTab/Education-Content";
import { Empty } from "./educationTab/Education-Empty";

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
      <Header
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
        <Empty setEducationForm={setEducationForm} />
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
