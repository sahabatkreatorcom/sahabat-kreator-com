import type { LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

let _db: any = null;

function initDb() {
  const url = process.env.DATABASE_URL ?? "file:./data/sahabat-kreator.db";
  const isBuild = process.env.NEXT_PHASE === "phase-production-build";
  const isPg = process.env.DATABASE_DRIVER === "pg" || url.startsWith("postgres://");

  if (isPg) {
    const { drizzle } = require("drizzle-orm/node-postgres");
    const { Pool } = require("pg");
    const pool = new Pool({ connectionString: url });
    return drizzle(pool, { schema });
  }

  const { drizzle } = require("drizzle-orm/libsql");
  const { createClient } = require("@libsql/client");

  const client = createClient({
    url: isBuild ? "file::memory:" : url,
  });

  return drizzle(client, { schema });
}

export function getDb(): LibSQLDatabase<typeof schema> {
  if (!_db) {
    _db = initDb();
  }
  return _db;
}
