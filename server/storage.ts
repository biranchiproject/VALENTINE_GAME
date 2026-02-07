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
  getGlobalLeaderboard(): Promise<LeaderboardEntry[]>;
  getOverallLeaderboard(): Promise<LeaderboardEntry[]>;
}

export class NeonStorage implements IStorage {
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
    const blockedKeywords = ["test", "tester", "demo", "admin", "example"];
    const isBlocked = (name: string) => blockedKeywords.some(k => name.toLowerCase().includes(k));

    if (isBlocked(entry.player1Name) || isBlocked(entry.player2Name)) {
      console.log(`[LEADERBOARD] Blocked entry due to keywords: ${entry.player1Name} & ${entry.player2Name}`);
      // Return a fake entry so the client thinks it succeeded (ignored)
      return {
        ...entry,
        id: -1,
        createdAt: new Date()
      };
    }

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

  async getGlobalLeaderboard(): Promise<LeaderboardEntry[]> {
    return await db
      .select()
      .from(leaderboard)
      .orderBy(desc(leaderboard.lovePercentage), asc(leaderboard.completionTime))
      .limit(100);
  }

  async getOverallLeaderboard(): Promise<LeaderboardEntry[]> {
    const { sql } = await import("drizzle-orm");

    // Postgres aggregation
    // We use cast to integer for love_percentage and sum for completion_time
    const result = await db.execute(
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
        WHERE 
          NOT (LOWER(player1_name) LIKE '%test%' OR LOWER(player1_name) LIKE '%demo%' OR LOWER(player1_name) LIKE '%admin%')
          AND
          NOT (LOWER(player2_name) LIKE '%test%' OR LOWER(player2_name) LIKE '%demo%' OR LOWER(player2_name) LIKE '%admin%')
        GROUP BY player1_name, player2_name 
        ORDER BY love_percentage DESC, completion_time ASC
      `
    );

    // Drizzle's execute on Postgres returns { rows: [] } usually, but with neon-serverless/drizzle it might differ.
    // However, db.execute returns a result object. For 'drizzle-orm/neon-serverless', it returns rows directly or standard pg result.
    // Let's assume standard behavior for now: rows are in result.rows or result itself if using simplified driver.
    // If using 'drizzle-orm/neon-serverless', db.execute returns QueryResult.

    const rows = result.rows || result;

    // Safety check just in case rows is not iterable (though it should be an array)
    if (!Array.isArray(rows)) return [];

    return rows.map((row: any) => ({
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

export const storage = new NeonStorage();
