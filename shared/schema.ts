import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Single table approach for simplicity as requested
export const rooms = sqliteTable("rooms", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roomCode: text("room_code").notNull().unique(),
  player1: text("player1").notNull(),
  player2: text("player2"), // Nullable initially
  status: text("status").notNull().default("waiting"), // waiting | ready
  day: text("day").notNull().default("rose_day"), // selected valentine day
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  gameData: text("game_data", { mode: "json" }).$type<{
    answers: Record<string, Record<string, string>>; // player -> { qId: answer }
    reviews: Record<string, Record<string, boolean>>; // player -> { qId: correct/incorrect }
    submissionStatus: Record<string, boolean>; // player -> submitted
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

