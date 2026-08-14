"use client";

import { BaseModal } from "./BaseModal";
import {
  Skill,
  useAddSkill,
  useEditSkill,
} from "@/hooks/admin/use-skill-admin";
import { ChangeEvent, FormEvent, useEffect, useReducer, useRef } from "react";
import z, { ZodError } from "zod";
import { FiAlertCircle, FiLoader } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { SkillCategory } from "./skill/Skill-Category";
import { SkillName } from "./skill/Skill-Name";
import { SkillImageLight } from "./skill/Skill-ImageLight";
import { SkillImageDark } from "./skill/Skill-ImageDark";

const MAX_IMAGE_SIZE = 25 * 1024 * 1024;

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

interface SkillModalState {
  validateError: ZodError | null;
  lightPreview: string | null;
  lightFileName: string | null;
  darkPreview: string | null;
  darkFileName: string | null;
}

type SkillModalAction =
  | { type: "SET_VALIDATE_ERROR"; payload: ZodError | null }
  | { type: "SET_LIGHT_IMAGE"; preview: string; fileName: string }
  | { type: "REMOVE_LIGHT_IMAGE" }
  | { type: "SET_DARK_IMAGE"; preview: string; fileName: string }
  | { type: "REMOVE_DARK_IMAGE" };

function skillModalReducer(
  state: SkillModalState,
  action: SkillModalAction,
): SkillModalState {
  switch (action.type) {
    case "SET_VALIDATE_ERROR":
      return { ...state, validateError: action.payload };
    case "SET_LIGHT_IMAGE":
      return {
        ...state,
        lightPreview: action.preview,
        lightFileName: action.fileName,
      };
    case "REMOVE_LIGHT_IMAGE":
      return {
        ...state,
        lightPreview: null,
        lightFileName: null,
      };
    case "SET_DARK_IMAGE":
      return {
        ...state,
        darkPreview: action.preview,
        darkFileName: action.fileName,
      };
    case "REMOVE_DARK_IMAGE":
      return {
        ...state,
        darkPreview: null,
        darkFileName: null,
      };
    default:
      return state;
  }
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

  const [state, dispatch] = useReducer(skillModalReducer, undefined, () => ({
    validateError: null,
    lightPreview: skillForm.imageLight || null,
    lightFileName: null,
    darkPreview: skillForm.imageDark || null,
    darkFileName: null,
  }));

  const {
    validateError,
    lightPreview,
    lightFileName,
    darkPreview,
    darkFileName,
  } = state;

  const lightInputRef = useRef<HTMLInputElement>(null);
  const darkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (lightPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(lightPreview);
      }
      if (darkPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(darkPreview);
      }
    };
  }, [lightPreview, darkPreview]);

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
    dispatch({
      type: "SET_LIGHT_IMAGE",
      preview: nextPreview,
      fileName: file.name,
    });
  };

  const handleRemoveLightImage = () => {
    dispatch({ type: "REMOVE_LIGHT_IMAGE" });
    if (lightInputRef.current) lightInputRef.current.value = "";
  };

  const handleDarkImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const nextPreview = URL.createObjectURL(file);
    dispatch({
      type: "SET_DARK_IMAGE",
      preview: nextPreview,
      fileName: file.name,
    });
  };

  const handleRemoveDarkImage = () => {
    dispatch({ type: "REMOVE_DARK_IMAGE" });
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
      dispatch({ type: "SET_VALIDATE_ERROR", payload: result.error });
      return;
    }

    dispatch({ type: "SET_VALIDATE_ERROR", payload: null });

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
        <SkillCategory
          defaultValue={skillForm.category || ""}
          disabled={isLoading}
          categoryError={categoryError}
        />

        <SkillName
          defaultValue={skillForm.name}
          disabled={isLoading}
          nameError={nameError}
        />

        <SkillImageLight
          lightPreview={lightPreview}
          lightFileName={lightFileName}
          lightInputRef={lightInputRef}
          disabled={isLoading}
          imageLightError={imageLightError}
          onLightImageChange={handleLightImageChange}
          onRemoveLightImage={handleRemoveLightImage}
        />

        <SkillImageDark
          darkPreview={darkPreview}
          darkFileName={darkFileName}
          darkInputRef={darkInputRef}
          disabled={isLoading}
          imageDarkError={imageDarkError}
          onDarkImageChange={handleDarkImageChange}
          onRemoveDarkImage={handleRemoveDarkImage}
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
              <FaSave className="h-4 w-4" /> Save Skill
            </>
          )}
        </button>
      </form>
    </BaseModal>
  );
}
