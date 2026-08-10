"use client";

import {
  AlertCircle,
  Edit3,
  ExternalLink,
  Loader2,
  MapPin,
  Plus,
  Trash2,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { EducationModal } from "@/components/dashboard/modals/EducationModal";
import {
  Education,
  useDeleteEducationById,
  useEducationAdmin,
} from "@/hooks/admin/use-education-admin";
import { DashboardEducationCardSkeleton } from "../ui/skeleton";

export function EducationTab() {
  const {
    data: education,
    isPending: loadingEducation,
    error: educationError,
    refetch: refetchEducation,
  } = useEducationAdmin();

  const sortedEducation = (() => {
    if (!education) return [];
    return [...education].sort((a, b) => {
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
          onClick={() => setEducationForm({})}
          className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-on-accent hover:opacity-90 font-mono transition-opacity"
        >
          <Plus className="h-4 w-4" /> Add Education
        </button>
      </div>

      {educationError ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-sm font-bold text-text-primary">
              Couldn&apos;t load education
            </h3>
            <p className="max-w-xs text-xs text-text-secondary">
              {educationError.message ||
                "Something went wrong. Please try again."}
            </p>
          </div>
          <button
            onClick={() => refetchEducation()}
            className="mt-2 flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 font-mono text-xs font-semibold text-text-primary transition-colors hover:border-accent/40"
          >
            Retry
          </button>
        </div>
      ) : loadingEducation ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <DashboardEducationCardSkeleton key={i} />
          ))}
        </div>
      ) : !hasEducation ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <GraduationCap className="h-6 w-6 text-accent" />
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-sm font-bold text-text-primary">
              No education yet
            </h3>
          </div>
          <button
            onClick={() => setEducationForm({})}
            className="mt-2 flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 font-mono text-xs font-semibold text-on-accent transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedEducation?.map((item) => {
            const isPendingCreate = item.id < 0;
            const isDeletingThis =
              isDeletingEducation && deletingEducationId === item.id;
            const isConfirmingDelete = confirmDeleteId === item.id;
            const actionsDisabled = isPendingCreate || isDeletingThis;

            return (
              <div
                key={item.id}
                className={`flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-5 transition-all duration-200 md:flex-row hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft-lg ${
                  isPendingCreate ? "opacity-60 grayscale" : ""
                }`}
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-mono text-sm font-bold text-text-primary">
                      {item.school}
                    </h4>
                    <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-[10px] font-medium text-accent">
                      {item.yearStart} - {item.yearEnd}
                    </span>
                  </div>
                  <p className="font-mono text-xs font-semibold text-accent">
                    {item.degree}
                  </p>
                  <p className="max-w-3xl text-xs leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                  {item.location && (
                    <a
                      href={item.location}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-text-secondary transition-colors hover:text-accent"
                    >
                      <MapPin className="h-3 w-3" /> Map Location{" "}
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  )}
                </div>
                <div className="flex shrink-0 items-end justify-start gap-2 md:flex-col">
                  {isConfirmingDelete ? (
                    <div className="flex flex-col gap-2">
                      <span className="text-center font-mono text-[10px] font-semibold text-destructive">
                        Are you sure?
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            deleteEducation(item.id);
                            setConfirmDeleteId(null);
                          }}
                          className="rounded-md bg-destructive px-3 py-1.5 font-mono text-xs font-semibold text-white transition-opacity hover:opacity-90"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="rounded-md border border-border px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:text-text-primary"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setEducationForm(item)}
                        disabled={actionsDisabled}
                        className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Edit3 className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(item.id)}
                        disabled={actionsDisabled}
                        className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:border-destructive hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isDeletingThis ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />{" "}
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
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
