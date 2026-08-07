"use client";

import { Edit3, ExternalLink, MapPin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { EducationModal } from "@/components/dashboard/modals/EducationModal";
import {
  Education,
  useEducationAdmin,
} from "@/hooks/admin/use-education-admin";

export function EducationTab() {
  const { data: education } = useEducationAdmin();

  const [educationForm, setEducationForm] = useState<Partial<Education> | null>(
    null,
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setEducationForm({})}
          className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-on-accent hover:opacity-90 font-mono transition-opacity"
        >
          <Plus className="h-4 w-4" /> Add Education
        </button>
      </div>

      <div className="space-y-4">
        {education?.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-border bg-surface p-5 flex flex-col md:flex-row justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-mono text-sm font-bold text-text-primary">
                  {item.school}
                </h4>
                <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-[10px] font-medium text-accent">
                  {item.yearStart} - {item.yearEnd}
                </span>
              </div>
              <p className="text-xs font-semibold text-accent font-mono">
                {item.degree}
              </p>
              <p className="text-xs text-text-secondary leading-relaxed max-w-3xl">
                {item.description}
              </p>
              {item.location && (
                <a
                  href={item.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-text-secondary hover:text-accent transition-colors"
                >
                  <MapPin className="h-3 w-3" /> Map Location{" "}
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              )}
            </div>
            <div className="flex md:flex-col gap-1 items-end justify-start shrink-0">
              {/* <button
                onClick={() => setEducationForm({ ...item, index: idx })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-text-secondary hover:border-accent hover:text-accent font-mono transition-colors"
              >
                <Edit3 className="h-3.5 w-3.5" /> Edit
              </button> */}
              {/* <button
                onClick={() =>
                  setEducation(education.filter((_, i) => i !== idx))
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-text-secondary hover:border-destructive hover:text-destructive font-mono transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button> */}
            </div>
          </div>
        ))}
      </div>

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
