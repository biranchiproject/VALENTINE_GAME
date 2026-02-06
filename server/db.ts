import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../shared/schema";

const sqlite = new Database("rooms.db");
const db = drizzle(sqlite, { schema });

// Ensure table exists
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_code TEXT UNIQUE NOT NULL,
    player1 TEXT NOT NULL,
    player2 TEXT,
    status TEXT DEFAULT 'waiting',
    day TEXT DEFAULT 'rose_day',
    created_at INTEGER,
    game_data TEXT DEFAULT '{}',
    cancelled_by TEXT,
    language TEXT DEFAULT 'en'
  );

  CREATE TABLE IF NOT EXISTS game_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_code TEXT NOT NULL,
    day_id TEXT NOT NULL,
    player1_name TEXT NOT NULL,
    player2_name TEXT NOT NULL,
    love_percentage INTEGER NOT NULL,
    played_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day_id TEXT NOT NULL,
    player1_name TEXT NOT NULL,
    player2_name TEXT NOT NULL,
    love_percentage INTEGER NOT NULL,
    completion_time INTEGER NOT NULL,
    created_at INTEGER
  );
`);

export { db };
