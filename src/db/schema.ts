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








// For better-auth


export const user = pgTable("user", {
					id: text("id").primaryKey(),
					name: text('name').notNull(),
 email: text('email').notNull().unique(),
 emailVerified: boolean('email_verified').notNull(),
 image: text('image'),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull(),
 isAnonymous: boolean('is_anonymous')
				});

export const session = pgTable("session", {
					id: text("id").primaryKey(),
					expiresAt: timestamp('expires_at').notNull(),
 token: text('token').notNull().unique(),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull(),
 ipAddress: text('ip_address'),
 userAgent: text('user_agent'),
 userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
				});

export const account = pgTable("account", {
					id: text("id").primaryKey(),
					accountId: text('account_id').notNull(),
 providerId: text('provider_id').notNull(),
 userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
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
					id: text("id").primaryKey(),
					identifier: text('identifier').notNull(),
 value: text('value').notNull(),
 expiresAt: timestamp('expires_at').notNull(),
 createdAt: timestamp('created_at'),
 updatedAt: timestamp('updated_at')
				});
