import { integer, pgTable, varchar, json } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: json("name").notNull(), // JSON field for first and last name
  password: varchar("password", { length: 255 }).notNull(),
});