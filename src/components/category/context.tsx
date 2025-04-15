"use client";

import { CategoryItemWithOptionalDates } from "@/actions/finance/types";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type CategoryDialogData = {
  originalCategory?: CategoryItemWithOptionalDates;
};

type CategoryDialogContextType = {
  isOpen: boolean;
  data: CategoryDialogData;
  openDialog: (data?: CategoryDialogData) => void;
  closeDialog: () => void;
};

const CategoryDialogContext = createContext<
  CategoryDialogContextType | undefined
>(undefined);

export function CategoryDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<CategoryDialogData>({});

  const openDialog = useCallback((newData?: CategoryDialogData) => {
    if (newData) setData(newData);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setData({});
  }, []);

  return (
    <CategoryDialogContext.Provider
      value={{ isOpen, data, openDialog, closeDialog }}
    >
      {children}
    </CategoryDialogContext.Provider>
  );
}

export function useCategoryDialog() {
  const context = useContext(CategoryDialogContext);
  if (!context)
    throw new Error(
      "useCategoryDialog must be used within a CategoryDialogProvider",
    );
  return context;
}
