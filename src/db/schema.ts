import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
};

export const journalingPages = pgTable("journaling_page", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  title: varchar({ length: 256 }),
  content: text(),

  is_pinned: boolean(),
  is_public: boolean(),

  ...timestamps,
});

export type SelectJournalType = InferSelectModel<typeof journalingPages>;
export type InsertJournalType = InferInsertModel<typeof journalingPages>;
