import { rooms, roomsPg, type Room, type InsertRoom } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createRoom(room: InsertRoom): Promise<Room>;
  getRoomByCode(code: string): Promise<Room | undefined>;
  updateRoom(roomCode: string, gameData: any, player2?: string, status?: string): Promise<Room>;
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
    // Construct update object dynamically
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
}

export class PostgresStorage implements IStorage {
  async createRoom(insertRoom: InsertRoom): Promise<Room> {
    const [room] = await db.insert(roomsPg).values(insertRoom).returning();
    return room;
  }

  async getRoomByCode(code: string): Promise<Room | undefined> {
    const [room] = await db.select().from(roomsPg).where(eq(roomsPg.roomCode, code));
    return room;
  }

  async updateRoom(roomCode: string, gameData: any, player2?: string, status?: string): Promise<Room> {
    const updateData: any = { gameData };
    if (player2) updateData.player2 = player2;
    if (status) updateData.status = status;

    const [updatedRoom] = await db
      .update(roomsPg)
      .set(updateData)
      .where(eq(roomsPg.roomCode, roomCode))
      .returning();
    return updatedRoom;
  }
}

export const storage = new (process.env.DATABASE_URL ? PostgresStorage : SqliteStorage)();
