import { db } from "@/db";
import { journalingTable } from "@/db/schema";
import { generateId } from "@/lib/utils";
import { count, eq } from "drizzle-orm";
import { CreateJournalInput } from "./types";

export const dbCreateJournal = async (
  data: CreateJournalInput & { author_id: string },
) => {
  const result = await db
    .insert(journalingTable)
    .values({ ...data, id: generateId("jorn") })
    .returning({ id: journalingTable.id });
  return result[0];
};

export const dbGetJournal = async (journalId: string) => {
  return db.query.journalingTable.findFirst({
    where: eq(journalingTable.id, journalId),
  });
};

export const dbDeleteJournal = async (journalId: string) => {
  await db.delete(journalingTable).where(eq(journalingTable.id, journalId));
  return true;
};

export const dbListJournals = async ({
  author_id,
  page,
  pageSize,
}: {
  author_id: string;
  page: number;
  pageSize: number;
}) => {
  return db.query.journalingTable.findMany({
    columns: {
      content: false,
    },
    where: eq(journalingTable.author_id, author_id),
    limit: pageSize,
    offset: page * pageSize,
  });
};

export const dbGetJournalCount = async (author_id: string) => {
  const result = await db
    .select({ count: count() })
    .from(journalingTable)
    .where(eq(journalingTable.author_id, author_id));

  return result[0]?.count ?? 0;
};

export const dbUpdateJournal = async (
  id: string,
  data: Partial<CreateJournalInput>,
) => {
  await db.update(journalingTable).set(data).where(eq(journalingTable.id, id));
  return data;
};
