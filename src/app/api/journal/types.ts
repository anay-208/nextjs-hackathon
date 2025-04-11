import { journalingTable } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { NoIdAndTimestamp } from "../types";

export type CreateJournalInput = NoIdAndTimestamp<
  Omit<InferInsertModel<typeof journalingTable>, "author_id">
>;

export type DB<T extends (...args: any) => any = (...args: any) => any> =
  Awaited<ReturnType<T>>;

export type SelectJournalType = InferSelectModel<typeof journalingTable>;
export type InsertJournalType = InferInsertModel<typeof journalingTable>;

export type ListJournalFilter = {
  is_pinned?: boolean;
  query?: string;
};

export type ListJournalSort = {
  created_at?: "asc" | "desc";
  updated_at?: "asc" | "desc";
};
