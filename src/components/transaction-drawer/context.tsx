"use client";

import { getTransactionsByTimeRange } from "@/app/api/finance/actions";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type TransactionDrawerData = {
  originalTransaction?: NonNullable<
    Awaited<ReturnType<typeof getTransactionsByTimeRange>>["data"]
  >[number];
};

type TransactionDrawerContextType = {
  isOpen: boolean;
  data: TransactionDrawerData;
  openTransactionDrawer: (data?: TransactionDrawerData) => void;
  closeTransactionDrawer: () => void;
};

const TransactionDrawerContext = createContext<
  TransactionDrawerContextType | undefined
>(undefined);

export function TransactionDrawerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<TransactionDrawerData>({});

  const openTransactionDrawer = useCallback(
    (newData?: TransactionDrawerData) => {
      if (newData) setData(newData);
      setIsOpen(true);
    },
    [],
  );

  const closeTransactionDrawer = useCallback(() => {
    setIsOpen(false);
    setData({});
  }, []);

  return (
    <TransactionDrawerContext.Provider
      value={{ isOpen, data, openTransactionDrawer, closeTransactionDrawer }}
    >
      {children}
    </TransactionDrawerContext.Provider>
  );
}

export function useTransactionDrawer() {
  const context = useContext(TransactionDrawerContext);
  if (!context)
    throw new Error(
      "useTransactionDrawer must be used within a TransactionDrawerProvider",
    );
  return context;
}
