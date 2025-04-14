import { relations, sql } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  jsonb,
  timestamp,
  text,
  varchar,
  uuid,
} from "drizzle-orm/pg-core";

const timestamps = {
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
};


export const goalsTable = pgTable("goal_page", {
  id: uuid("id").primaryKey().$default(() => sql`gen_random_uuid()`),
  author_id: text("author_id").notNull(),
  title: varchar({ length: 256 }).default("Untitled"),
  completed: boolean().default(false).notNull(),
  deadline: timestamp("deadline", { mode: "date" }).notNull(),
  ...timestamps,
})



// For better-auth auto generated
// table is not postfixed as it won't work then


export const user = pgTable("user", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  isAnonymous: boolean('is_anonymous'),
  currency: text('currency')
});

export const session = pgTable("session", {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at')
});

export const journalingTable = pgTable("journaling_page", {
  id: text().primaryKey(),
  user_id: text().notNull(),

  title: varchar({ length: 256 }).notNull().default("Untitled"),
  content: text().default("").notNull(),
  mood: integer(),
  energy: integer(),
  productivity: integer(),

  is_pinned: boolean().default(false).notNull(),
  is_public: boolean().default(false).notNull(),

  summary: text().default("").notNull(),

  ...timestamps,
});

export const journalingRelations = relations(journalingTable, ({ many }) => ({
  journalsToTags: many(journalsToTags),
}));

export const tagsTable = pgTable("tag", {
  id: text().primaryKey(),
  user_id: text().notNull(),

  label: varchar({ length: 256 }).notNull(),

  ...timestamps,
});

export const tagsRelations = relations(tagsTable, ({ many }) => ({
  journalsToTags: many(journalsToTags),
}));

export const journalsToTags = pgTable(
  "journals_to_tags",
  {
    user_id: text().notNull(),
    journal_id: text()
      .notNull()
      .references(() => journalingTable.id),
    tag_id: text()
      .notNull()
      .references(() => tagsTable.id),
  },
  (t) => [primaryKey({ columns: [t.journal_id, t.tag_id] })],
);
export const journalsToTagsRelations = relations(journalsToTags, ({ one }) => ({
  tag: one(tagsTable, {
    fields: [journalsToTags.tag_id],
    references: [tagsTable.id],
  }),
  journal: one(journalingTable, {
    fields: [journalsToTags.journal_id],
    references: [journalingTable.id],
  }),
}));

export const allowedTransactionTypes = ["income", "expense"] as const;
export const transactionType = pgEnum(
  "transaction_type",
  allowedTransactionTypes,
);
export const transactionsTable = pgTable("transactions", {
  id: text().primaryKey(),
  user_id: text().notNull(),
  category_id: text().references(() => categoriesTable.id, {
    onDelete: "cascade",
  }),

  label: varchar({ length: 256 }).notNull(),
  amount: doublePrecision().notNull(),
  type: transactionType("transaction_type").notNull(),
  notes: text(),
  is_preset: boolean().default(false).notNull(),

  ...timestamps,
});
export const transactionsRelations = relations(
  transactionsTable,
  ({ one }) => ({
    category: one(categoriesTable, {
      fields: [transactionsTable.category_id],
      references: [categoriesTable.id],
    }),
  }),
);

export const categoriesTable = pgTable("categories", {
  id: text().primaryKey(),
  user_id: text().notNull(),

  label: varchar({ length: 256 }).notNull(),
  budget: doublePrecision(),

  ...timestamps,
})