"use client";

import { ChangeEvent, FormEvent, useEffect, useReducer, useRef } from "react";
import { BaseModal } from "./BaseModal";
import z, { ZodError } from "zod";
import { useAddProject, useEditProject } from "@/hooks/admin/use-project-admin";
import { FiAlertCircle, FiLoader } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { ProjectTitle } from "./project/Project-Title";
import { ProjectImage } from "./project/Project-Image";
import { ProjectDescription } from "./project/Project-Description";
import { ProjectLinks } from "./project/Project-Links";

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
  github: z.url({ message: "Invalid URL" }).min(1, "GitHub URL is required"),
  demo: z.union([z.url({ message: "Invalid URL" }), z.literal("")]).optional(),
  tags: z
    .string()
    .min(1, "Tags is required")
    .transform((val) =>
      val
        ? val
            .split(",")
            .flatMap((t) => {
              const trimmed = t.trim();
              return trimmed ? [trimmed] : [];
            })
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

interface ProjectModalState {
  validateError: ZodError | null;
  imagePreview: string | null;
  imageFileName: string | null;
}

type ProjectModalAction =
  | { type: "SET_VALIDATE_ERROR"; payload: ZodError | null }
  | { type: "SET_IMAGE"; preview: string; fileName: string }
  | { type: "REMOVE_IMAGE" };

function projectModalReducer(
  state: ProjectModalState,
  action: ProjectModalAction,
): ProjectModalState {
  switch (action.type) {
    case "SET_VALIDATE_ERROR":
      return { ...state, validateError: action.payload };
    case "SET_IMAGE":
      return {
        ...state,
        imagePreview: action.preview,
        imageFileName: action.fileName,
      };
    case "REMOVE_IMAGE":
      return {
        ...state,
        imagePreview: null,
        imageFileName: null,
      };
    default:
      return state;
  }
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

  const [state, dispatch] = useReducer(projectModalReducer, undefined, () => ({
    validateError: null,
    imagePreview: projectForm.image || null,
    imageFileName: null,
  }));

  const { validateError, imagePreview, imageFileName } = state;
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
    dispatch({
      type: "SET_IMAGE",
      preview: nextPreview,
      fileName: file.name,
    });
  };

  const handleRemoveImage = () => {
    dispatch({ type: "REMOVE_IMAGE" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isEdit =
    projectForm.id && projects.some((p) => p.id === projectForm.id);

  const isLoading = isLoadingAdd || isLoadingEdit;

  const handleSubmitProject = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

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
      dispatch({ type: "SET_VALIDATE_ERROR", payload: result.error });
      return;
    }

    dispatch({ type: "SET_VALIDATE_ERROR", payload: null });
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
        <ProjectTitle
          defaultValue={projectForm.title}
          disabled={isLoading}
          titleError={titleError}
        />

        <ProjectImage
          imagePreview={imagePreview}
          imageFileName={imageFileName}
          fileInputRef={fileInputRef}
          disabled={isLoading}
          imageError={imageError}
          onImageChange={handleImageChange}
          onRemoveImage={handleRemoveImage}
        />

        <ProjectDescription
          defaultValue={projectForm.description}
          disabled={isLoading}
          descriptionError={descriptionError}
        />

        <ProjectLinks
          githubDefault={projectForm.github}
          demoDefault={projectForm.demo || ""}
          tagsDefault={projectForm.tags?.join(", ")}
          disabled={isLoading}
          githubError={githubError}
          demoError={demoError}
          tagsError={tagsError}
        />

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
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 font-semibold text-on-accent hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
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
              <FaSave className="h-4 w-4" /> Save Project
            </>
          )}
        </button>
      </form>
    </BaseModal>
  );
}
