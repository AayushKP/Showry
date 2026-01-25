import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import "dotenv/config";

const globalQueryClient = global as unknown as {
  postgres: Pool;
};

const pool =
  globalQueryClient.postgres ||
  new Pool({
    connectionString: process.env.DATABASE_URL!,
  });

if (process.env.NODE_ENV !== "production") {
  globalQueryClient.postgres = pool;
}

export const db = drizzle(pool, { schema });

export * from "./schema";
