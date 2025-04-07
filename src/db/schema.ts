import { pgTable, serial, text, numeric, timestamp, integer, varchar, json } from 'drizzle-orm/pg-core';

const timestamps = {
    created_at: timestamp().defaultNow().notNull(),
  }

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