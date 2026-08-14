"use client";

import { BaseModal } from "./BaseModal";
import {
  useAddItem,
  useEditItem,
  type SetupCategory,
  type SetupItem,
} from "@/hooks/admin/use-setup-admin";
import { ChangeEvent, FormEvent, useEffect, useReducer, useRef } from "react";
import z, { ZodError } from "zod";
import { FiAlertCircle, FiLoader } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { Category } from "./item/Item-Category";
import { Name } from "./item/Item-Name";
import { WebsiteUrl } from "./item/Item-WebsiteUrl";
import { SubName } from "./item/Item-SubName";
import { ImageLight } from "./item/item-ImageLight";
import { ImageDark } from "./item/Item-ImageDark";

const MAX_IMAGE_SIZE = 25 * 1024 * 1024;

const imageSchemaLight = z.union([
  z
    .instanceof(File, { message: "Light mode image is required" })
    .refine((file) => file.size > 0, "Light mode image is required")
    .refine(
      (file) => file.size <= MAX_IMAGE_SIZE,
      "Image must be 25MB or smaller",
    )
    .refine((file) => file.type.startsWith("image/"), "File must be an image"),
  z.string().min(1, "Light mode image is required"),
]);

const imageSchemaDark = z
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
  .optional();

const itemFormSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  value: z.string().min(1, "Value/Name is required"),
  download: z.string().min(1, "Download URL is required"),
  subValue: z.string().optional(),
  subDownload: z.string().optional(),
  imageLight: imageSchemaLight,
  imageDark: imageSchemaDark,
});

interface ItemModalProps {
  categories: SetupCategory[];
  itemForm: Partial<SetupItem> & { categoryId?: number };
  setItemForm: (
    item: (Partial<SetupItem> & { categoryId?: number }) | null,
  ) => void;
}

interface ItemModalState {
  validateError: ZodError | null;
  selectedCategoryId: string;
  lightPreview: string | null;
  lightFileName: string | null;
  darkPreview: string | null;
  darkFileName: string | null;
}

type ItemModalAction =
  | { type: "SET_CATEGORY_ID"; payload: string }
  | { type: "SET_VALIDATE_ERROR"; payload: ZodError | null }
  | { type: "SET_LIGHT_IMAGE"; preview: string; fileName: string }
  | { type: "REMOVE_LIGHT_IMAGE" }
  | { type: "SET_DARK_IMAGE"; preview: string; fileName: string }
  | { type: "REMOVE_DARK_IMAGE" };

function itemModalReducer(
  state: ItemModalState,
  action: ItemModalAction,
): ItemModalState {
  switch (action.type) {
    case "SET_CATEGORY_ID":
      return { ...state, selectedCategoryId: action.payload };
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

export function ItemModal({
  categories,
  itemForm,
  setItemForm,
}: ItemModalProps) {
  const {
    mutate: addItem,
    isPending: isLoadingAdd,
    error: errorAdd,
  } = useAddItem();
  const {
    mutate: editItem,
    isPending: isLoadingEdit,
    error: errorEdit,
  } = useEditItem();

  const isEdit = typeof itemForm.id === "number" && itemForm.id > 0;
  const isLoading = isLoadingAdd || isLoadingEdit;

  const [state, dispatch] = useReducer(itemModalReducer, undefined, () => ({
    validateError: null,
    selectedCategoryId: itemForm.categoryId
      ? String(itemForm.categoryId)
      : categories[0]?.id
        ? String(categories[0].id)
        : "",
    lightPreview: itemForm.imageLight || null,
    lightFileName: null,
    darkPreview: itemForm.imageDark || null,
    darkFileName: null,
  }));

  const {
    validateError,
    selectedCategoryId,
    lightPreview,
    lightFileName,
    darkPreview,
    darkFileName,
  } = state;

  const lightInputRef = useRef<HTMLInputElement>(null);
  const darkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (lightPreview?.startsWith("blob:")) URL.revokeObjectURL(lightPreview);
      if (darkPreview?.startsWith("blob:")) URL.revokeObjectURL(darkPreview);
    };
  }, [lightPreview, darkPreview]);

  const error = validateError?.issues[0] || errorAdd || errorEdit;
  const categoryError =
    error && "path" in error && error.path[0] === "categoryId"
      ? error
      : undefined;
  const valueError =
    error && "path" in error && error.path[0] === "value" ? error : undefined;
  const downloadError =
    error && "path" in error && error.path[0] === "download"
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
    categoryError ||
    valueError ||
    downloadError ||
    imageLightError ||
    imageDarkError,
  );

  const setSelectedCategoryId = (id: string) => {
    dispatch({ type: "SET_CATEGORY_ID", payload: id });
  };

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const formData = new FormData(e.currentTarget);
    const lightEntry = formData.get("imageLight");
    const hasNewLightFile = lightEntry instanceof File && lightEntry.size > 0;
    const darkEntry = formData.get("imageDark");
    const hasNewDarkFile = darkEntry instanceof File && darkEntry.size > 0;

    const dataToValidate: Record<string, unknown> = {
      ...Object.fromEntries(formData.entries()),
      ...(!hasNewLightFile && isEdit && itemForm.imageLight && lightPreview
        ? { imageLight: itemForm.imageLight }
        : {}),
      ...(!hasNewDarkFile && isEdit && itemForm.imageDark && darkPreview
        ? { imageDark: itemForm.imageDark }
        : {}),
    };

    if (!hasNewDarkFile && !darkPreview) {
      delete dataToValidate.imageDark;
    }

    const result = itemFormSchema.safeParse(dataToValidate);
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

    if (isEdit && itemForm.id !== undefined) {
      editItem({ id: itemForm.id, data: formData });
    } else {
      addItem(formData);
    }

    setItemForm(null);
    handleRemoveLightImage();
    handleRemoveDarkImage();
  };

  return (
    <BaseModal
      title={isEdit ? "Edit Setup Item" : "Add Setup Item"}
      onClose={() => setItemForm(null)}
      maxWidth="max-w-lg"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="space-y-3 font-mono text-xs text-text-primary"
      >
        <Category
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          isLoading={isLoading}
          categoryError={categoryError}
          categories={categories}
        />
        <Name
          itemForm={itemForm}
          valueError={valueError}
          isLoading={isLoading}
        />
        <WebsiteUrl
          itemForm={itemForm}
          downloadError={downloadError}
          isLoading={isLoading}
        />

        <SubName itemForm={itemForm} isLoading={isLoading} />
        <ImageLight
          imageLightError={imageLightError}
          isLoading={isLoading}
          handleLightImageChange={handleLightImageChange}
          handleRemoveLightImage={handleRemoveLightImage}
          lightInputRef={lightInputRef}
          lightPreview={lightPreview}
          lightFileName={lightFileName}
        />

        <ImageDark
          imageDarkError={imageDarkError}
          isLoading={isLoading}
          handleDarkImageChange={handleDarkImageChange}
          handleRemoveDarkImage={handleRemoveDarkImage}
          darkInputRef={darkInputRef}
          darkPreview={darkPreview}
          darkFileName={darkFileName}
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
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <FiLoader className="h-4 w-4 animate-spin" aria-hidden="true" />
              Saving...
            </>
          ) : (
            <>
              <FaSave className="h-4 w-4" />
              {isEdit ? "Save Changes" : "Save Item"}
            </>
          )}
        </button>
      </form>
    </BaseModal>
  );
}
