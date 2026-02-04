import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

let db: any;

if (process.env.DATABASE_URL) {
    const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
    });
    db = drizzlePg(pool, { schema });
} else {
    const sqlite = new Database("rooms.db");
    db = drizzle(sqlite, { schema });
}

export { db };
