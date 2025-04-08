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
  author_id: integer().notNull(),

  title: varchar({ length: 256 }).default("Untitled"),
  content: text().default("").notNull(),

  is_pinned: boolean().default(false).notNull(),
  is_public: boolean().default(false).notNull(),

  summary: text().default("").notNull(),

  ...timestamps,
});

export type SelectJournalType = InferSelectModel<typeof journalingPages>;
export type InsertJournalType = InferInsertModel<typeof journalingPages>;
