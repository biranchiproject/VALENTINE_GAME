import { rooms, gameHistory, leaderboard, type Room, type InsertRoom, type GameHistory, type InsertGameHistory, type LeaderboardEntry, type InsertLeaderboardEntry } from "../shared/schema";
import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";

export interface IStorage {
  createRoom(room: InsertRoom): Promise<Room>;
  getRoomByCode(code: string): Promise<Room | undefined>;
  updateRoom(roomCode: string, gameData: any, player2?: string, status?: string, cancelledBy?: string): Promise<Room>;
  createGameHistory(history: InsertGameHistory): Promise<GameHistory>;
  getGameHistory(userName: string): Promise<GameHistory[]>;
  hasUserPlayedDay(userName: string, dayId: string): Promise<boolean>;
  createLeaderboardEntry(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry>;
  getLeaderboard(dayId: string): Promise<LeaderboardEntry[]>;
  getOverallLeaderboard(): Promise<LeaderboardEntry[]>;
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

  async updateRoom(roomCode: string, gameData: any, player2?: string, status?: string, cancelledBy?: string): Promise<Room> {
    const updateData: any = { gameData };
    if (player2) updateData.player2 = player2;
    if (status) updateData.status = status;
    if (cancelledBy !== undefined) updateData.cancelledBy = cancelledBy;

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

  async createLeaderboardEntry(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry> {
    const [newEntry] = await db.insert(leaderboard).values(entry).returning();
    return newEntry;
  }

  async getLeaderboard(dayId: string): Promise<LeaderboardEntry[]> {
    return await db
      .select()
      .from(leaderboard)
      .where(eq(leaderboard.dayId, dayId))
      .orderBy(desc(leaderboard.lovePercentage), asc(leaderboard.completionTime), asc(leaderboard.createdAt));
  }

  async getOverallLeaderboard(): Promise<LeaderboardEntry[]> {
    // Aggregate by player pair names.
    // Note: This casts the result back to LeaderboardEntry structure roughly, 
    // but calculated fields like lovePercentage will be averages.
    // We use raw sql because simple group by is cleaner there for this logic.
    const { sql } = await import("drizzle-orm");

    // We group by player names (case insensitive roughly, or just exact for now)
    // We'll take the MAX date as createdAt to keep types happy
    // We'll average the lovePercentage
    const result = await db.all(
      sql`
        SELECT 
          MAX(id) as id, 
          'overall' as day_id,
          player1_name, 
          player2_name, 
          CAST(AVG(love_percentage) AS INTEGER) as love_percentage, 
          CAST(SUM(completion_time) AS INTEGER) as completion_time,
          MAX(created_at) as created_at
        FROM leaderboard 
        GROUP BY player1_name, player2_name 
        ORDER BY love_percentage DESC, completion_time ASC
      `
    );

    // Map result to match LeaderboardEntry type if needed, but db.all usually returns any.
    // Drizzle's db.execute or similar might be safer typed, but for sqlite 'all' works well for raw.
    // We need to cast the result rows to LeaderboardEntry manually or trust the shape matches.
    return result.map((row: any) => ({
      id: row.id,
      dayId: 'overall',
      player1Name: row.player1_name,
      player2Name: row.player2_name,
      lovePercentage: row.love_percentage,
      completionTime: row.completion_time,
      createdAt: new Date(row.created_at)
    }));
  }
}

export const storage = new SqliteStorage();
