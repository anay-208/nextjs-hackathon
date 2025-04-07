import { db } from "@/db";
import { journalingPages } from "@/db/schema";
import { eq, InferInsertModel } from "drizzle-orm";

export const createJournalPage = async (
  data: InferInsertModel<typeof journalingPages>,
) => {
  await db.insert(journalingPages).values(data);
};

export const getJournalPage = async (journalId: number) => {
  return db.query.journalingPages.findFirst({
    where: eq(journalingPages.id, journalId),
  });
};
