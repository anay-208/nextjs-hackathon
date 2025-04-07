import { integer, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
});
