import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// SQLite only schema
export const rooms = sqliteTable("rooms", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roomCode: text("room_code").notNull().unique(),
  player1: text("player1").notNull(),
  player2: text("player2"),
  status: text("status").notNull().default("waiting"),
  day: text("day").notNull().default("rose_day"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  gameData: text("game_data", { mode: "json" }).$type<{
    answers: Record<string, Record<string, string>>;
    reviews: Record<string, Record<string, boolean>>;
    submissionStatus: Record<string, boolean>;
    bothSubmitted: boolean;
  }>().default({
    answers: {},
    reviews: {},
    submissionStatus: {},
    bothSubmitted: false
  }),
});

export const insertRoomSchema = createInsertSchema(rooms).pick({
  roomCode: true,
  player1: true,
  player2: true,
  status: true
});

export type Room = typeof rooms.$inferSelect;
export type InsertRoom = typeof rooms.$inferInsert;
