"use client";

import { useState } from "react";
import {
  useDeleteCategory,
  useDeleteItem,
  useSetupAdmin,
  type SetupCategory,
  type SetupItem,
} from "@/hooks/admin/use-setup-admin";
import { CategoryModal } from "@/components/dashboard/modals/CategoryModal";
import { ItemModal } from "@/components/dashboard/modals/ItemModal";
import { Header } from "./setupTab/Setup-Header";
import { FetchError } from "./setupTab/Setup-Error";
import { Loader } from "./setupTab/Setup-Loader";
import { Empty } from "./setupTab/Setup-Empty";
import { Content } from "./setupTab/Setup-Content";

export function SetupTab() {
  const {
    data: categories,
    isPending: loadingSetup,
    error: setupError,
    refetch: refetchSetup,
  } = useSetupAdmin();

  const {
    mutate: deleteCategory,
    isPending: isDeletingCategory,
    variables: deletingCategoryId,
  } = useDeleteCategory();

  const {
    mutate: deleteItem,
    isPending: isDeletingItem,
    variables: deletingItemId,
  } = useDeleteItem();

  const [categoryForm, setCategoryForm] =
    useState<Partial<SetupCategory> | null>(null);
  const [itemForm, setItemForm] = useState<
    (Partial<SetupItem> & { categoryId?: number }) | null
  >(null);

  const [confirmDeleteCategoryId, setConfirmDeleteCategoryId] = useState<
    number | null
  >(null);
  const [confirmDeleteItemId, setConfirmDeleteItemId] = useState<number | null>(
    null,
  );

  const categoryList = categories ?? [];
  let totalItems = 0;
  for (const cat of categoryList) {
    totalItems += cat.items?.length ?? 0;
  }
  const hasCategories = categoryList.length > 0;

  return (
    <div className="space-y-6 font-mono">
      <Header
        categoryList={categoryList}
        totalItems={totalItems}
        setCategoryForm={setCategoryForm}
        setItemForm={setItemForm}
      />
      {setupError ? (
        <FetchError setupError={setupError} refetchSetup={refetchSetup} />
      ) : loadingSetup ? (
        <Loader />
      ) : !hasCategories ? (
        <Empty setCategoryForm={setCategoryForm} />
      ) : (
        <Content
          categoryList={categoryList}
          setItemForm={setItemForm}
          setCategoryForm={setCategoryForm}
          isDeletingCategory={isDeletingCategory}
          deletingCategoryId={deletingCategoryId}
          setConfirmDeleteCategoryId={setConfirmDeleteCategoryId}
          confirmDeleteCategoryId={confirmDeleteCategoryId}
          deleteCategory={deleteCategory}
          isDeletingItem={isDeletingItem}
          deletingItemId={deletingItemId}
          setConfirmDeleteItemId={setConfirmDeleteItemId}
          deleteItem={deleteItem}
          confirmDeleteItemId={confirmDeleteItemId}
        />
      )}

      {categoryForm !== null && (
        <CategoryModal
          categoryForm={categoryForm}
          setCategoryForm={setCategoryForm}
        />
      )}

      {itemForm !== null && (
        <ItemModal
          categories={categoryList}
          itemForm={itemForm}
          setItemForm={setItemForm}
        />
      )}
    </div>
  );
}
