import { journalingPages } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

export type CreateJournalInput = Omit<
  InferInsertModel<typeof journalingPages>,
  "id" | "author_id"
>;

export type DB<T extends (...args: any) => any = (...args: any) => any> =
  Awaited<ReturnType<T>>;
