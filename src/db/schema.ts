import { relations } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
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
  id: uuid('id').primaryKey(),
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
  id: uuid('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
token: text('token').notNull().unique(),
createdAt: timestamp('created_at').notNull(),
updatedAt: timestamp('updated_at').notNull(),
ipAddress: text('ip_address'),
userAgent: text('user_agent'),
userId: uuid('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
  id: uuid('id').primaryKey(),
  accountId: text('account_id').notNull(),
providerId: text('provider_id').notNull(),
userId: uuid('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
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
  id: uuid('id').primaryKey(),
  identifier: text('identifier').notNull(),
value: text('value').notNull(),
expiresAt: timestamp('expires_at').notNull(),
createdAt: timestamp('created_at'),
updatedAt: timestamp('updated_at')
});
