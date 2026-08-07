"use client";

import { Save } from "lucide-react";

import { BaseModal } from "./BaseModal";
import { Education, useAddEducation } from "@/hooks/admin/use-education-admin";
import { FormEvent, useState } from "react";
import z, { ZodError } from "zod";
import { parseYears, YEARS } from "@/lib/year";

const educationFormSchema = z.object({
  school: z.string().min(1, "School is required"),
  degree: z.string().min(1, "Degree is required"),
  year_start: z.string().min(1, "Year start is required"),
  year_end: z.string().min(1, "Year end is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().url("Invalid URL").min(1, "Location is required"),
});

interface EducationModalProps {
  educationForm: Partial<Education>;
  education: Education[];
  setEducationForm: (education: Partial<Education> | null) => void;
}

export function EducationModal({
  educationForm,
  education,
  setEducationForm,
}: EducationModalProps) {
  const {} = useAddEducation;

  const isEdit =
    educationForm.id && education.some((e) => e.id === educationForm.id);
  2;
  const [validateError, setValidateError] = useState<ZodError | null>(null);
  const handleSubmitEducation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const dataToValidate = Object.fromEntries(formData.entries());
    const result = educationFormSchema.safeParse(dataToValidate);
    if (!result.success) {
      setValidateError(result.error);
      return;
    }

    console.log(result.data);
  };

  return (
    <BaseModal
      title={isEdit ? "Edit Education" : "Add Education"}
      onClose={() => setEducationForm(null)}
      maxWidth="max-w-lg"
    >
      <form
        onSubmit={handleSubmitEducation}
        noValidate
        autoComplete="off"
        className="space-y-3 font-mono text-xs text-text-primary"
      >
        <div className="space-y-1">
          <label className="text-text-secondary block">
            School / Institution
          </label>
          <input
            required
            name="school"
            defaultValue={educationForm.school}
            className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent"
          />
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary block">Degree / Course</label>
          <input
            required
            name="degree"
            defaultValue={educationForm.degree}
            className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-text-secondary block">Start Year</label>
            <select
              required
              name="yearStart"
              className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent"
            >
              <option value="" disabled>
                Select year
              </option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-text-secondary block">End Year</label>
            <select
              required
              name="yearEnd"
              className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent"
            >
              <option value="Present">Present</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary block">Description</label>
          <textarea
            required
            name="description"
            rows={3}
            defaultValue={educationForm.description}
            className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent"
          />
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary block">
            Google Maps Location Link
          </label>
          <input
            type="url"
            name="location"
            defaultValue={educationForm.location}
            placeholder="https://maps.app.goo.gl/..."
            className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 font-semibold text-on-accent hover:opacity-90"
        >
          <Save className="h-4 w-4" /> Save Education
        </button>
      </form>
    </BaseModal>
  );
}
