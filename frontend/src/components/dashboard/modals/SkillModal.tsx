"use client";

import { AlertCircle, ImagePlus, Loader2, Save } from "lucide-react";
import { BaseModal } from "./BaseModal";
import {
  Skill,
  useAddSkill,
  useEditSkill,
} from "@/hooks/admin/use-skill-admin";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import z, { ZodError } from "zod";
import Image from "next/image";

const MAX_IMAGE_SIZE = 25 * 1024 * 1024;

const SKILL_CATEGORIES = [
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Platforms",
];

const skillFormSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Category is required"),
  imageLight: z.union([
    z
      .instanceof(File, { message: "Light mode image is required" })
      .refine((file) => file.size > 0, "Light mode image is required")
      .refine(
        (file) => file.size <= MAX_IMAGE_SIZE,
        "Image must be 25MB or smaller",
      )
      .refine(
        (file) => file.type.startsWith("image/"),
        "File must be an image",
      ),
    z.string().min(1, "Light mode image is required"),
  ]),
  imageDark: z
    .union([
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= MAX_IMAGE_SIZE,
          "Image must be 25MB or smaller",
        )
        .refine(
          (file) => file.type.startsWith("image/"),
          "File must be an image",
        ),
      z.string(),
    ])
    .optional(),
});

interface SkillModalProps {
  skillForm: Partial<Skill>;
  skills: Skill[];
  setSkillForm: (skill: Partial<Skill> | null) => void;
}

export function SkillModal({
  skillForm,
  skills,
  setSkillForm,
}: SkillModalProps) {
  const {
    mutate: addSkill,
    isPending: isLoadingAdd,
    error: errorAdd,
  } = useAddSkill();

  const {
    mutate: editSkill,
    isPending: isLoadingEdit,
    error: errorEdit,
  } = useEditSkill();

  const [validateError, setValidateError] = useState<ZodError | null>(null);

  const [lightPreview, setLightPreview] = useState<string | null>(
    skillForm.imageLight || null,
  );
  const [lightFileName, setLightFileName] = useState<string | null>(null);
  const lightInputRef = useRef<HTMLInputElement>(null);
  const lightPreviewRef = useRef<string | null>(lightPreview);

  const [darkPreview, setDarkPreview] = useState<string | null>(
    skillForm.imageDark || null,
  );
  const [darkFileName, setDarkFileName] = useState<string | null>(null);
  const darkInputRef = useRef<HTMLInputElement>(null);
  const darkPreviewRef = useRef<string | null>(darkPreview);

  useEffect(() => {
    lightPreviewRef.current = lightPreview;
  }, [lightPreview]);

  useEffect(() => {
    darkPreviewRef.current = darkPreview;
  }, [darkPreview]);

  useEffect(() => {
    return () => {
      if (lightPreviewRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(lightPreviewRef.current);
      }
      if (darkPreviewRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(darkPreviewRef.current);
      }
    };
  }, []);

  const error = validateError?.issues[0] || errorAdd || errorEdit;
  const nameError =
    error && "path" in error && error.path[0] === "name" ? error : undefined;
  const categoryError =
    error && "path" in error && error.path[0] === "category"
      ? error
      : undefined;
  const imageLightError =
    error && "path" in error && error.path[0] === "imageLight"
      ? error
      : undefined;
  const imageDarkError =
    error && "path" in error && error.path[0] === "imageDark"
      ? error
      : undefined;

  const hasFieldError = Boolean(
    nameError || categoryError || imageLightError || imageDarkError,
  );

  const isEdit = skillForm.id && skills.some((s) => s.id === skillForm.id);

  const handleLightImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const nextPreview = URL.createObjectURL(file);
    setLightPreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return nextPreview;
    });
    setLightFileName(file.name);
  };

  const handleRemoveLightImage = () => {
    setLightPreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });
    setLightFileName(null);
    if (lightInputRef.current) lightInputRef.current.value = "";
  };

  const handleDarkImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const nextPreview = URL.createObjectURL(file);
    setDarkPreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return nextPreview;
    });
    setDarkFileName(file.name);
  };

  const handleRemoveDarkImage = () => {
    setDarkPreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });
    setDarkFileName(null);
    if (darkInputRef.current) darkInputRef.current.value = "";
  };

  const handleSubmitSkill = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoadingAdd || isLoadingEdit) return;

    const formData = new FormData(e.currentTarget);

    const lightEntry = formData.get("imageLight");
    const hasNewLightFile = lightEntry instanceof File && lightEntry.size > 0;

    const darkEntry = formData.get("imageDark");
    const hasNewDarkFile = darkEntry instanceof File && darkEntry.size > 0;

    const dataToValidate: Record<string, unknown> = {
      ...Object.fromEntries(formData.entries()),
      ...(!hasNewLightFile && isEdit && skillForm.imageLight && lightPreview
        ? { imageLight: skillForm.imageLight }
        : {}),
      ...(!hasNewDarkFile && isEdit && skillForm.imageDark && darkPreview
        ? { imageDark: skillForm.imageDark }
        : {}),
    };

    if (!hasNewDarkFile && !darkPreview) {
      delete dataToValidate.imageDark;
    }

    const result = skillFormSchema.safeParse(dataToValidate);

    if (!result.success) {
      setValidateError(result.error);
      return;
    }

    setValidateError(null);

    if (isEdit && !hasNewLightFile) {
      formData.delete("imageLight");
    }
    if (isEdit && !hasNewDarkFile) {
      formData.delete("imageDark");
    }

    if (!isEdit && !hasNewDarkFile) {
      formData.delete("imageDark");
    }

    if (isEdit && skillForm.id !== undefined) {
      formData.append("id", String(skillForm.id));
      editSkill({ id: skillForm.id, data: formData });
    } else {
      addSkill(formData);
    }
    setSkillForm(null);
    handleRemoveLightImage();
    handleRemoveDarkImage();
  };

  const isLoading = isLoadingAdd || isLoadingEdit;

  return (
    <BaseModal
      title={isEdit ? "Edit Skill" : "Add Skill"}
      onClose={() => setSkillForm(null)}
      maxWidth="max-w-md"
    >
      <form
        onSubmit={handleSubmitSkill}
        noValidate
        autoComplete="off"
        className="space-y-3 font-mono text-xs text-text-primary"
      >
        <div className="space-y-1">
          <label className="block text-text-secondary">Category</label>
          <select
            name="category"
            defaultValue={skillForm.category || ""}
            disabled={isLoading}
            aria-invalid={categoryError ? "true" : "false"}
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              categoryError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          >
            <option value="" disabled>
              Select category
            </option>
            {SKILL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {categoryError && (
            <p role="alert" className="text-destructive">
              {categoryError.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-text-secondary">Skill Name</label>
          <input
            name="name"
            defaultValue={skillForm.name}
            disabled={isLoading}
            aria-invalid={nameError ? "true" : "false"}
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              nameError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {nameError && (
            <p role="alert" className="text-destructive">
              {nameError.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-text-secondary">
            Image (Light Mode)
          </label>
          <label
            htmlFor="imageLight"
            className={`flex flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-dashed bg-background px-3 py-4 text-center transition-colors ${
              isLoading
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:border-accent/60"
            } ${imageLightError ? "border-destructive/60" : "border-border"}`}
          >
            {lightPreview ? (
              <div className="relative h-20 w-full overflow-hidden rounded">
                <Image
                  src={lightPreview}
                  alt={lightFileName || "Light mode preview"}
                  fill
                  sizes="(max-width: 640px) 100vw, 448px"
                  unoptimized={lightPreview.startsWith("blob:")}
                  className="object-contain"
                />
              </div>
            ) : (
              <>
                <ImagePlus
                  className="h-5 w-5 text-text-secondary"
                  aria-hidden="true"
                />
                <span className="text-text-secondary">
                  Click to upload (max 25MB)
                </span>
              </>
            )}
          </label>
          <input
            ref={lightInputRef}
            id="imageLight"
            type="file"
            name="imageLight"
            accept="image/*"
            onChange={handleLightImageChange}
            disabled={isLoading}
            aria-invalid={imageLightError ? "true" : "false"}
            className="hidden"
          />
          {lightPreview && (
            <div className="flex items-center justify-between text-text-secondary">
              <span className="truncate">
                {lightFileName ?? "Current image"}
              </span>
              <button
                type="button"
                onClick={handleRemoveLightImage}
                disabled={isLoading}
                className="text-destructive hover:underline disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:no-underline"
              >
                Remove
              </button>
            </div>
          )}
          {imageLightError && (
            <p role="alert" className="text-destructive">
              {imageLightError.message}
            </p>
          )}
        </div>

        {/* Dark Mode Image (Optional) */}
        <div className="space-y-1">
          <label className="block text-text-secondary">
            Image (Dark Mode){" "}
            <span className="text-text-secondary/50">— optional</span>
          </label>
          <label
            htmlFor="imageDark"
            className={`flex flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-dashed bg-background px-3 py-4 text-center transition-colors ${
              isLoading
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:border-accent/60"
            } ${imageDarkError ? "border-destructive/60" : "border-border"}`}
          >
            {darkPreview ? (
              <div className="relative h-20 w-full overflow-hidden rounded">
                <Image
                  src={darkPreview}
                  alt={darkFileName || "Dark mode preview"}
                  fill
                  sizes="(max-width: 640px) 100vw, 448px"
                  unoptimized={darkPreview.startsWith("blob:")}
                  className="object-contain"
                />
              </div>
            ) : (
              <>
                <ImagePlus
                  className="h-5 w-5 text-text-secondary"
                  aria-hidden="true"
                />
                <span className="text-text-secondary">
                  Click to upload (max 25MB)
                </span>
              </>
            )}
          </label>
          <input
            ref={darkInputRef}
            id="imageDark"
            type="file"
            name="imageDark"
            accept="image/*"
            onChange={handleDarkImageChange}
            disabled={isLoading}
            aria-invalid={imageDarkError ? "true" : "false"}
            className="hidden"
          />
          {darkPreview && (
            <div className="flex items-center justify-between text-text-secondary">
              <span className="truncate">
                {darkFileName ?? "Current image"}
              </span>
              <button
                type="button"
                onClick={handleRemoveDarkImage}
                disabled={isLoading}
                className="text-destructive hover:underline disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:no-underline"
              >
                Remove
              </button>
            </div>
          )}
          {imageDarkError && (
            <p role="alert" className="text-destructive">
              {imageDarkError.message}
            </p>
          )}
          <p className="text-[10px] text-text-secondary/60">
            Falls back to the light mode image if left empty.
          </p>
        </div>

        {error && !hasFieldError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-destructive"
          >
            <AlertCircle
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
            <span>{error.message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 font-semibold text-on-accent hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Saving...
            </>
          ) : isEdit ? (
            <>
              <Save className="h-4 w-4" /> Save changes
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save Skill
            </>
          )}
        </button>
      </form>
    </BaseModal>
  );
}
