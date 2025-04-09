import { notFound } from "next/navigation";
import { getData } from "./data";
import Tiptap from "./tiptap.client";
import "./tiptap.css";
import { Suspense } from "react";
import { Sidebar, SidebarSkeleton } from "./sidebar";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const journalData = await getData(parseInt(id));
  if (!journalData) {
    notFound();
  }
  return (
    <div className="flex min-h-[100svh] w-full flex-row items-stretch justify-between gap-5 p-5">
      <div className="border-accent-foreground hidden w-[15%] shrink-0 space-y-4 rounded-lg border-2 p-2 lg:block">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar activeID={id} />
        </Suspense>
      </div>
      <div className="min-w-0 flex-1">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Tiptap initialData={journalData} />
        </Suspense>
      </div>
    </div>
  );
}
