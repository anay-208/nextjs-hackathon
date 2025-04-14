import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TransactionDrawerProvider } from "@/components/transaction-drawer/context";
import { GlobalTransactionDrawer } from "@/components/transaction-drawer/component";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lifelog",
  description:
    "Journaling meets habit tracking meets AI. Lifelog is your private, cozy space to organize and reflect on your real life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TransactionDrawerProvider>
      <Suspense fallback={null}>
        <GlobalTransactionDrawer />
      </Suspense>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} subpixel-antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </TransactionDrawerProvider>
  );
}
