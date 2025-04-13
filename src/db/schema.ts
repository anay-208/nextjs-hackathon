import { relations } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
};

export const journalingTable = pgTable("journaling_page", {
  id: text("id").primaryKey(),
  author_id: text("author_id").notNull(),

  title: varchar({ length: 256 }).default("Untitled"),
  content: text().default("").notNull(),

  is_pinned: boolean().default(false).notNull(),
  is_public: boolean().default(false).notNull(),

  summary: text().default("").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]).notNull(),

  ...timestamps,
});

// For better-auth auto generated
// table is not postfixed as it won't work then

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  isAnonymous: boolean("is_anonymous"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const allowedTransactionTypes = ["income", "expense"] as const;
export const transactionType = pgEnum(
  "transaction_type",
  allowedTransactionTypes,
);
export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  user_id: text("user_id").notNull(),
  category_id: text("category_id").references(() => categories.id, {
    onDelete: "cascade",
  }),

  label: varchar({ length: 256 }).notNull(),
  amount: doublePrecision().notNull(),
  type: transactionType("transaction_type").notNull(),
  notes: text("notes"),
  is_preset: boolean("is_preset").default(false).notNull(),

  ...timestamps,
});
export const transactionsRelations = relations(transactions, ({ one }) => ({
  category: one(categories, {
    fields: [transactions.category_id],
    references: [categories.id],
  }),
}));

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  user_id: text("user_id").notNull(),

  label: varchar({ length: 256 }).notNull(),
  budget: doublePrecision(),

  ...timestamps,
});
