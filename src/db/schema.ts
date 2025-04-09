import { pgTable, serial, text, numeric, timestamp, integer, varchar, json, boolean } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from "drizzle-orm";


const timestamps = {
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
};

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: json("name").notNull(),
  password: text("password").notNull(),
  ...timestamps,
});

export const expenseTable = pgTable('expense', {
    id: serial('id').primaryKey(),
    description: text('description').notNull(),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
    date: timestamp('date').defaultNow().notNull(),
    ...timestamps
  });


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
