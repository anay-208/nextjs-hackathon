
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL!);

import * as schema from "@/db/schema";
import * as dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { drizzle } from "drizzle-orm/node-postgres";

dotenvExpand.expand(
  dotenv.config({
    path: [".env.development.local", ".env.production.local", ".env.local"],
  }),
);

export function getDbConnectionString() {
  return process.env.DATABASE_URL!;
}

export const db = drizzle(getDbConnectionString(), { schema });
