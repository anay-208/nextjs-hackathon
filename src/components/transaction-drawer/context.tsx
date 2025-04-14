"use client";

import { getTransactionsByTimeRange } from "@/app/api/finance/actions";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type DrawerType = "new" | "edit" | "custom" | null;

type DrawerData = {
  type?: DrawerType;
  originalTransaction?: NonNullable<
    Awaited<ReturnType<typeof getTransactionsByTimeRange>>["data"]
  >[number];
};

type DrawerContextType = {
  isOpen: boolean;
  data: DrawerData;
  openDrawer: (data?: DrawerData) => void;
  closeDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<DrawerData>({});

  const openDrawer = useCallback((newData?: DrawerData) => {
    if (newData) setData(newData);
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    setData({});
  }, []);

  return (
    <DrawerContext.Provider value={{ isOpen, data, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context)
    throw new Error("useDrawer must be used within a DrawerProvider");
  return context;
}
