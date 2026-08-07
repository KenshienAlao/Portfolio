"use client";

import { AlertCircle, ImagePlus, Loader2, Save, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { BaseModal } from "./BaseModal";
import z, { ZodError } from "zod";
import { useAddProject, useEditProject } from "@/hooks/admin/use-project-admin";
import Image from "next/image";

const MAX_IMAGE_SIZE = 25 * 1024 * 1024;

const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.union([
    z
      .instanceof(File, { message: "Image is required" })
      .refine((file) => file.size > 0, "Image is required")
      .refine(
        (file) => file.size <= MAX_IMAGE_SIZE,
        "Image must be 25MB or smaller",
      )
      .refine(
        (file) => file.type.startsWith("image/"),
        "File must be an image",
      ),
    z.string().min(1, "Image is required"),
  ]),
  description: z.string().min(1, "Description is required"),
  github: z.string().url("Invalid URL").min(1, "GitHub URL is required"),
  demo: z.union([z.string().url("Invalid URL"), z.literal("")]).optional(),
  tags: z
    .string()
    .min(1, "Tags is required")
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    ),
});
interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  github: string;
  demo: string | null;
}

interface ProjectModalProps {
  projectForm: Partial<Project>;
  projects: Project[];
  setProjectForm: (project: Partial<Project> | null) => void;
}

export function ProjectModal({
  projectForm,
  projects,
  setProjectForm,
}: ProjectModalProps) {
  const {
    mutate: addProject,
    isPending: isLoadingAdd,
    error: errorAdd,
  } = useAddProject();

  const {
    mutate: editProject,
    isPending: isLoadingEdit,
    error: errorEdit,
  } = useEditProject();

  const [validateError, setValidateError] = useState<ZodError | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    projectForm.image || null,
  );
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagePreviewRef = useRef<string | null>(imagePreview);

  useEffect(() => {
    imagePreviewRef.current = imagePreview;
  }, [imagePreview]);

  useEffect(() => {
    return () => {
      if (imagePreviewRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviewRef.current);
      }
    };
  }, []);

  const error = validateError?.issues[0] || errorAdd || errorEdit;
  const titleError =
    error && "path" in error && error.path[0] === "title" ? error : undefined;
  const imageError =
    error && "path" in error && error.path[0] === "image" ? error : undefined;
  const descriptionError =
    error && "path" in error && error.path[0] === "description"
      ? error
      : undefined;
  const githubError =
    error && "path" in error && error.path[0] === "github" ? error : undefined;
  const demoError =
    error && "path" in error && error.path[0] === "demo" ? error : undefined;
  const tagsError =
    error && "path" in error && error.path[0] === "tags" ? error : undefined;

  const hasFieldError = Boolean(
    titleError ||
    imageError ||
    descriptionError ||
    githubError ||
    demoError ||
    tagsError,
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const nextPreview = URL.createObjectURL(file);
    setImagePreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return nextPreview;
    });
    setImageFileName(file.name);
  };

  const handleRemoveImage = () => {
    setImagePreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });
    setImageFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmitProject = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoadingAdd) return;

    const formData = new FormData(e.currentTarget);

    const imageEntry = formData.get("image");
    const hasNewFile = imageEntry instanceof File && imageEntry.size > 0;

    const dataToValidate = {
      ...Object.fromEntries(formData.entries()),
      ...(!hasNewFile && isEdit && projectForm.image && imagePreview
        ? { image: projectForm.image }
        : {}),
    };

    const result = projectFormSchema.safeParse(dataToValidate);

    if (!result.success) {
      setValidateError(result.error);
      return;
    }

    setValidateError(null);
    if (isEdit && !hasNewFile) {
      formData.delete("image");
    }

    if (isEdit && projectForm.id !== undefined) {
      formData.append("id", String(projectForm.id));
      editProject({ id: projectForm.id, data: formData });
    } else {
      addProject(formData);
    }

    setProjectForm(null);
    handleRemoveImage();
  };

  const isEdit =
    projectForm.id && projects.some((p) => p.id === projectForm.id);

  return (
    <BaseModal
      title={isEdit ? "Edit Project" : "Add Project"}
      onClose={() => setProjectForm(null)}
      maxWidth="max-w-lg"
    >
      <form
        noValidate
        onSubmit={handleSubmitProject}
        className="space-y-3 font-mono text-xs text-text-primary"
        autoComplete="off"
      >
        <div className="space-y-1">
          <label className="text-text-secondary block">Title</label>
          <input
            name="title"
            defaultValue={projectForm.title}
            disabled={isLoadingAdd || isLoadingEdit}
            aria-invalid={titleError ? "true" : "false"}
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              titleError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {titleError && (
            <p role="alert" className="text-destructive">
              {titleError.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-text-secondary block">Image</label>
          <label
            htmlFor="image"
            className={`flex flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-dashed bg-background px-3 py-4 text-center transition-colors ${
              isLoadingAdd || isLoadingEdit
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:border-accent/60"
            } ${imageError ? "border-destructive/60" : "border-border"}`}
          >
            {imagePreview ? (
              <div className="relative h-28 w-full overflow-hidden rounded">
                <Image
                  src={imagePreview}
                  alt={imageFileName || "Project preview"}
                  fill
                  sizes="(max-width: 640px) 100vw, 512px"
                  unoptimized={imagePreview.startsWith("blob:")}
                  className="object-cover"
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
            ref={fileInputRef}
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isLoadingAdd || isLoadingEdit}
            aria-invalid={imageError ? "true" : "false"}
            className="hidden"
          />
          {imagePreview && (
            <div className="flex items-center justify-between text-text-secondary">
              <span className="truncate">
                {imageFileName ?? "Current image"}
              </span>
              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={isLoadingAdd || isLoadingEdit}
                className="text-destructive hover:underline disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:no-underline"
              >
                Remove
              </button>
            </div>
          )}
          {imageError && (
            <p role="alert" className="text-destructive">
              {imageError.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-text-secondary block">Description</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={projectForm.description}
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
          <label className="text-text-secondary block">GitHub URL</label>
          <input
            type="url"
            name="github"
            defaultValue={projectForm.github}
            disabled={isLoadingAdd || isLoadingEdit}
            aria-invalid={githubError ? "true" : "false"}
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              githubError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {githubError && (
            <p role="alert" className="text-destructive">
              {githubError.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary block">
            Demo URL (optional)
          </label>
          <input
            type="url"
            name="demo"
            defaultValue={projectForm.demo || ""}
            disabled={isLoadingAdd || isLoadingEdit}
            aria-invalid={demoError ? "true" : "false"}
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              demoError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {demoError && (
            <p role="alert" className="text-destructive">
              {demoError.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary block">
            Tags (comma separated)
          </label>
          <input
            name="tags"
            defaultValue={projectForm.tags?.join(", ")}
            placeholder="React, NextJS, Supabase"
            disabled={isLoadingAdd || isLoadingEdit}
            className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent disabled:cursor-not-allowed disabled:opacity-60"
          />
          {tagsError && (
            <p role="alert" className="text-destructive">
              {tagsError.message}
            </p>
          )}
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
          disabled={isLoadingAdd || isLoadingEdit}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 font-semibold text-on-accent hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoadingAdd || isLoadingEdit ? (
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
              <Save className="h-4 w-4" /> Save Project
            </>
          )}
        </button>
      </form>
    </BaseModal>
  );
}
