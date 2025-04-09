import { db } from "@/db";
import { journalingPages } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { CreateJournalInput } from "./types";

export const dbCreateJournal = async (
  data: CreateJournalInput & { author_id: number },
) => {
  const result = await db
    .insert(journalingPages)
    .values(data)
    .returning({ id: journalingPages.id });
  return result[0];
};

export const dbGetJournal = async (journalId: number) => {
  return db.query.journalingPages.findFirst({
    where: eq(journalingPages.id, journalId),
  });
};

export const dbDeleteJournal = async (journalId: number) => {
  await db.delete(journalingPages).where(eq(journalingPages.id, journalId));
};

export const dbListJournals = async ({
  author_id,
  page,
  pageSize,
}: {
  author_id: number;
  page: number;
  pageSize: number;
}) => {
  return db.query.journalingPages.findMany({
    columns: {
      content: false,
    },
    where: eq(journalingPages.author_id, author_id),
    limit: pageSize,
    offset: page * pageSize,
  });
};

export const dbGetJournalCount = async (author_id: number) => {
  const result = await db
    .select({ count: count() })
    .from(journalingPages)
    .where(eq(journalingPages.author_id, author_id));

  return result[0]?.count ?? 0;
};

export const dbUpdateJournal = async (
  id: number,
  data: Partial<CreateJournalInput>,
) => {
  await db.update(journalingPages).set(data).where(eq(journalingPages.id, id));
};
