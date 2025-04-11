import { db } from "@/db";
import { journalingTable } from "@/db/schema";
import { generateId } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { and, count, eq, ilike } from "drizzle-orm";
import { z } from "zod";
import {
  CreateJournalInput,
  ListJournalFilter,
  ListJournalSort,
} from "./types";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { revalidateTag } from "next/cache";

export const dbCreateJournal = async (
  data: CreateJournalInput & { author_id: string },
) => {
  const result = await db
    .insert(journalingTable)
    .values({
      ...data, id: generateId("jorn"), content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [],
          },
        ],
      })
    })
    .returning({ id: journalingTable.id });
  revalidateTag('journals');
  return result[0];
};

export const dbGetJournal = async (journalId: string, userId: string) => {
  "use cache"
  cacheTag('journals', `journal-${ journalId }`);
  return db.query.journalingTable.findFirst({
    where: and(
      eq(journalingTable.id, journalId),
      eq(journalingTable.author_id, userId),
    ),
  });
};

export const dbDeleteJournal = async (journalId: string, userId: string) => {
  await db
    .delete(journalingTable)
    .where(
      and(
        eq(journalingTable.id, journalId),
        eq(journalingTable.author_id, userId),
      ),
    );
  revalidateTag('journals');
  return true;
};

export const dbListJournals = async ({
  author_id,
  page,
  pageSize,
  filter,
  sort,
}: {
  author_id: string;
  page: number;
  pageSize: number;
  filter?: ListJournalFilter;
  sort?: ListJournalSort;
}) => {
  "use cache"
  cacheTag('journals');
  return db.query.journalingTable.findMany({
    columns: {
      content: false,
    },
    where: and(
      eq(journalingTable.author_id, author_id),
      filter?.is_pinned
        ? eq(journalingTable.is_pinned, filter.is_pinned)
        : undefined,
      filter?.query
        ? ilike(journalingTable.title, `%${ filter.query }%`)
        : undefined,
    ),

    orderBy: (table, { asc, desc }) =>
      [
        sort?.created_at
          ? sort.created_at === "asc"
            ? asc(table.created_at)
            : desc(table.created_at)
          : undefined,
        sort?.updated_at
          ? sort.updated_at === "asc"
            ? asc(table.updated_at)
            : desc(table.updated_at)
          : undefined,
      ].filter((elmt) => typeof elmt !== "undefined"),

    limit: pageSize,
    offset: page * pageSize,
  });
};

export const dbGetJournalCount = async (author_id: string) => {
  "use cache"
  cacheTag("journals")
  const result = await db
    .select({ count: count() })
    .from(journalingTable)
    .where(eq(journalingTable.author_id, author_id));

  return result[0]?.count ?? 0;
};

export const dbUpdateJournal = async (
  id: string,
  data: Partial<CreateJournalInput>,
  userId: string,
) => {
  await db
    .update(journalingTable)
    .set(data)
    .where(
      and(eq(journalingTable.id, id), eq(journalingTable.author_id, userId)),
    );
  revalidateTag('journals');
  return data;
};

export const dbGenerateSummary = async (text: string) => {
  const { object: summary } = await generateObject({
    model: google("gemini-2.0-flash-001"),
    schema: z.string().min(10).max(150),
    system: `You are a helpful assistant. You will be given a long text and your goal is to generate a summary of the text in the same language that this text is. The summary needs to have a minimum length of 10 and a maximum length of 150 characters.`,
    prompt: `Please summarize the following text: \n\n${ text }`,
  });

  return summary;
};

export const dbUpdateJournalTags = async (
  id: string,
  tags: string[],
  userId: string,
) => {
  await db
    .update(journalingTable)
    .set({ tags })
    .where(
      and(eq(journalingTable.id, id), eq(journalingTable.author_id, userId)),
    );
  return tags;
};
