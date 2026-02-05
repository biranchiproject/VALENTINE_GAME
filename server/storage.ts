import { rooms, gameHistory, type Room, type InsertRoom, type GameHistory, type InsertGameHistory } from "../shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createRoom(room: InsertRoom): Promise<Room>;
  getRoomByCode(code: string): Promise<Room | undefined>;
  updateRoom(roomCode: string, gameData: any, player2?: string, status?: string): Promise<Room>;
  createGameHistory(history: InsertGameHistory): Promise<GameHistory>;
  getGameHistory(userName: string): Promise<GameHistory[]>;
  hasUserPlayedDay(userName: string, dayId: string): Promise<boolean>;
}

export class SqliteStorage implements IStorage {
  async createRoom(insertRoom: InsertRoom): Promise<Room> {
    const [room] = await db.insert(rooms).values(insertRoom).returning();
    return room;
  }

  async getRoomByCode(code: string): Promise<Room | undefined> {
    const [room] = await db.select().from(rooms).where(eq(rooms.roomCode, code));
    return room;
  }

  async updateRoom(roomCode: string, gameData: any, player2?: string, status?: string): Promise<Room> {
    const updateData: any = { gameData };
    if (player2) updateData.player2 = player2;
    if (status) updateData.status = status;

    const [updatedRoom] = await db
      .update(rooms)
      .set(updateData)
      .where(eq(rooms.roomCode, roomCode))
      .returning();
    return updatedRoom;
  }

  async createGameHistory(history: InsertGameHistory): Promise<GameHistory> {
    // Check if duplicate entry exists for this room to avoid double saving
    const [existing] = await db.select().from(gameHistory).where(eq(gameHistory.roomCode, history.roomCode));
    if (existing) return existing;

    const [newHistory] = await db.insert(gameHistory).values(history).returning();
    return newHistory;
  }

  async getGameHistory(userName: string): Promise<GameHistory[]> {
    // Find games where user was player1 or player2
    // Drizzle ORM 'or' query might be needed, or simple raw SQL/multiple queries
    // Let's use simple approach: select all and filter in memory if volume is low, 
    // BUT better to use OR condition if possible. 
    // Since we imported eq, let's import 'or' too in the file header if needed, 
    // or just execute a query closer to raw if complex.
    // Actually, let's keep it simple: Select by player1 OR player2

    // NOTE: We need to import 'or' from drizzle-orm
    const all = await db.select().from(gameHistory);
    return all.filter(g => g.player1Name === userName || g.player2Name === userName).sort((a, b) => b.playedAt!.getTime() - a.playedAt!.getTime());
  }

  async hasUserPlayedDay(userName: string, dayId: string): Promise<boolean> {
    const history = await this.getGameHistory(userName);
    return history.some(h => h.dayId === dayId);
  }
}

export const storage = new SqliteStorage();
