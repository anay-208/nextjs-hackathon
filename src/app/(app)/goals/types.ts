import { goalsTable } from "@/db/schema";

// Define the Goal type
export type Goal = typeof goalsTable.$inferSelect
export type GoalInsert = typeof goalsTable.$inferInsert