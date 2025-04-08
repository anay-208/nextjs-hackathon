import { db } from "@/db";
import { journalingPages } from "@/db/schema";
import { count, eq, InferInsertModel } from "drizzle-orm";

export const createJournal = async (
  data: InferInsertModel<typeof journalingPages>,
) => {
  const result = await db
    .insert(journalingPages)
    .values(data)
    .returning({ id: journalingPages.id });
  return result[0];
};

export const getJournal = async (journalId: number) => {
  return db.query.journalingPages.findFirst({
    where: eq(journalingPages.id, journalId),
  });
};

export const deleteJournal = async (journalId: number) => {
  try {
    await db.delete(journalingPages).where(eq(journalingPages.id, journalId));
    return true;
  } catch (err: unknown) {
    console.error("Error deleting journal entry:", (err as Error).message);
    return false;
  }
};

export const listJournals = (
  author_id: number,
  page: number,
  pageSize: number,
) => {
  return db.query.journalingPages.findMany({
    where: eq(journalingPages.author_id, author_id),
    limit: pageSize,
    offset: page * pageSize,
  });
};

export const getJournalCount = async (author_id: number) => {
  const result = await db
    .select({ count: count() })
    .from(journalingPages)
    .where(eq(journalingPages.author_id, author_id));

  return result[0]?.count ?? 0;
};
