import { journalingTable } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type CreateJournalInput = Omit<
  InferInsertModel<typeof journalingTable>,
  "id" | "author_id"
>;

export type DB<T extends (...args: any) => any = (...args: any) => any> =
  Awaited<ReturnType<T>>;

export type SelectJournalType = InferSelectModel<typeof journalingTable>;
export type InsertJournalType = InferInsertModel<typeof journalingTable>;

export type ListJournalFilter = {
  is_pinned?: boolean;
};

export type ListJournalSort = {
  created_at?: "asc" | "desc";
  updated_at?: "asc" | "desc";
};
