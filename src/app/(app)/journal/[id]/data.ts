import { SelectJournalType } from "@/app/api/journal/types";

const now = new Date();
const journalData: SelectJournalType[] = Array.from({ length: 10 }, (_, i) => {
  const date = new Date(now);
  date.setDate(now.getDate() - i * 6); // Every entry 6 days apart

  return {
    id: `${i + 1}`,
    title: `Sample Entry ${i + 1}`,
    author_id: "17",
    tags: [],
    content: JSON.stringify({
      type: "doc",
      content: [
        {
          type: "paragraph",
          attrs: { textAlign: null },
          content: [
            { type: "text", text: `This is entry number ${i + 1}.` },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: ` Important!`,
            },
          ],
        },
      ],
    }),
    summary: `This is a pretty long summary of entry number ${i + 1}. Which summarizes everything in entry number ${i + 1} with cool text regarding summaries for entry number ${i + 1}. The summary also summarizes other info regarding entry number ${i + 1}. So all in all a lot of summarization of the summaries for the summary which we can check out here with our eyes regarding the summary.`,
    created_at: date,
    updated_at: date,
    is_pinned: i === 5,
    is_public: i % 3 === 0,
  };
});

export const getAllData = async (): Promise<SelectJournalType[]> => {
  "use cache";
  return journalData;
};

export const getData = async (
  id: number,
): Promise<SelectJournalType | null> => {
  "use cache";
  return journalData.find((j) => j.id === `${id}`) ?? null;
};
