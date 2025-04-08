import Tiptap from "@/app/dashboard/journaling/tiptap.client";
import "./tiptap.css";
import { Suspense } from "react";
import { SelectJournalType } from "@/db/schema";
const getData = async () => {
  "use cache";

  const journalData: SelectJournalType = {
    id: 1,
    title: "test",
    content: `{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Once upon a time... there was "},{"type":"text","marks":[{"type":"bold"}],"text":"Beefbone"}]}]}`,
    created_at: new Date(),
    updated_at: new Date(),
    is_pinned: false,
    is_public: false,
  };
  return journalData;
};
export default async function Page() {
  const journalData = await getData();
  return (
    <div className="flex min-h-[100svh] w-full flex-row items-stretch justify-between gap-5 p-5">
      <div className="min-w-0 flex-1">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Tiptap initialData={journalData} />
        </Suspense>
      </div>
    </div>
  );
}
