import Tiptap from "@/app/dashboard/journaling/tiptap.client";
import "./tiptap.css";
import { Suspense } from "react";
export default async function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Tiptap />
      </Suspense>
    </div>
  );
}
