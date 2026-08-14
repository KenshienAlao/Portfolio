"use client";

import { BaseModal } from "./BaseModal";
import {
  Education,
  useAddEducation,
  useEditEducation,
} from "@/hooks/admin/use-education-admin";
import { FormEvent, useState } from "react";
import z, { ZodError } from "zod";
import { YEARS } from "@/lib/year";
import { FiAlertCircle, FiLoader } from "react-icons/fi";
import { FaSave } from "react-icons/fa";

const educationFormSchema = z.object({
  school: z.string().min(1, "School is required"),
  degree: z.string().min(1, "Degree is required"),
  yearStart: z.string().min(1, "Start year is required"),
  yearEnd: z.string().min(1, "End year is required"),
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
  const {
    mutate: addEducation,
    isPending: isLoadingAdd,
    error: errorAdd,
  } = useAddEducation();

  const {
    mutate: editEducation,
    isPending: isLoadingEdit,
    error: errorEdit,
  } = useEditEducation();

  const [validateError, setValidateError] = useState<ZodError | null>(null);

  const error = validateError?.issues[0] || errorAdd || errorEdit;
  const schoolError =
    error && "path" in error && error.path[0] === "school" ? error : undefined;
  const degreeError =
    error && "path" in error && error.path[0] === "degree" ? error : undefined;
  const yearStartError =
    error && "path" in error && error.path[0] === "yearStart"
      ? error
      : undefined;
  const yearEndError =
    error && "path" in error && error.path[0] === "yearEnd" ? error : undefined;
  const descriptionError =
    error && "path" in error && error.path[0] === "description"
      ? error
      : undefined;
  const locationError =
    error && "path" in error && error.path[0] === "location"
      ? error
      : undefined;

  const hasFieldError = Boolean(
    schoolError ||
    degreeError ||
    yearStartError ||
    yearEndError ||
    descriptionError ||
    locationError,
  );

  const isEdit =
    educationForm.id && education.some((e) => e.id === educationForm.id);

  const handleSubmitEducation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoadingAdd || isLoadingEdit) return;

    const formData = new FormData(e.currentTarget);
    const dataToValidate = Object.fromEntries(formData.entries());
    const result = educationFormSchema.safeParse(dataToValidate);

    if (!result.success) {
      setValidateError(result.error);
      return;
    }

    setValidateError(null);

    if (isEdit && educationForm.id !== undefined) {
      formData.append("id", String(educationForm.id));
      editEducation({ id: educationForm.id, data: formData });
    } else {
      addEducation(formData);
    }

    setEducationForm(null);
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
          <label className="block text-text-secondary">
            School / Institution
          </label>
          <input
            name="school"
            defaultValue={educationForm.school}
            disabled={isLoadingAdd || isLoadingEdit}
            aria-invalid={schoolError ? "true" : "false"}
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              schoolError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {schoolError && (
            <p role="alert" className="text-destructive">
              {schoolError.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-text-secondary">Degree / Course</label>
          <input
            name="degree"
            defaultValue={educationForm.degree}
            disabled={isLoadingAdd || isLoadingEdit}
            aria-invalid={degreeError ? "true" : "false"}
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              degreeError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {degreeError && (
            <p role="alert" className="text-destructive">
              {degreeError.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-text-secondary">Start Year</label>
            <select
              name="yearStart"
              defaultValue={educationForm.yearStart || ""}
              disabled={isLoadingAdd || isLoadingEdit}
              aria-invalid={yearStartError ? "true" : "false"}
              className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
                yearStartError
                  ? "border-destructive/60 focus:border-destructive"
                  : "border-border focus:border-accent"
              }`}
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
            {yearStartError && (
              <p role="alert" className="text-destructive">
                {yearStartError.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label className="block text-text-secondary">End Year</label>
            <select
              name="yearEnd"
              defaultValue={educationForm.yearEnd || "Present"}
              disabled={isLoadingAdd || isLoadingEdit}
              aria-invalid={yearEndError ? "true" : "false"}
              className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
                yearEndError
                  ? "border-destructive/60 focus:border-destructive"
                  : "border-border focus:border-accent"
              }`}
            >
              <option value="Present">Present</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            {yearEndError && (
              <p role="alert" className="text-destructive">
                {yearEndError.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-text-secondary">Description</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={educationForm.description}
            disabled={isLoadingAdd || isLoadingEdit}
            aria-invalid={descriptionError ? "true" : "false"}
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              descriptionError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {descriptionError && (
            <p role="alert" className="text-destructive">
              {descriptionError.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-text-secondary">
            Google Maps Location Link
          </label>
          <input
            type="url"
            name="location"
            defaultValue={educationForm.location}
            placeholder="https://maps.app.goo.gl/..."
            disabled={isLoadingAdd || isLoadingEdit}
            aria-invalid={locationError ? "true" : "false"}
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              locationError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {locationError && (
            <p role="alert" className="text-destructive">
              {locationError.message}
            </p>
          )}
        </div>

        {error && !hasFieldError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-destructive"
          >
            <FiAlertCircle
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
            <span>{error.message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoadingAdd || isLoadingEdit}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 font-semibold text-on-accent hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoadingAdd || isLoadingEdit ? (
            <>
              <FiLoader className="h-4 w-4 animate-spin" aria-hidden="true" />
              Saving...
            </>
          ) : isEdit ? (
            <>
              <FaSave className="h-4 w-4" /> Save changes
            </>
          ) : (
            <>
              <FaSave className="h-4 w-4" /> Save Education
            </>
          )}
        </button>
      </form>
    </BaseModal>
  );
}
