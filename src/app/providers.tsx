import GlobalCategoryDialog from "@/components/category/component.client";
import { CategoryDialogProvider } from "@/components/category/context";
import { GlobalTransactionDrawer } from "@/components/transaction-drawer/component";
import { TransactionDrawerProvider } from "@/components/transaction-drawer/context";
import { Suspense } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CategoryDialogProvider>
      <TransactionDrawerProvider>
        <Suspense fallback={null}>
          <GlobalTransactionDrawer />
        </Suspense>
        <Suspense fallback={null}>
          <GlobalCategoryDialog />
        </Suspense>
        {children}
      </TransactionDrawerProvider>
    </CategoryDialogProvider>
  );
}
