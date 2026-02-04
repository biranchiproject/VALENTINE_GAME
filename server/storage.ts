import { db } from "./db";
import { rooms, players, answers, type Room, type Player, type Answer, type CreateRoomRequest, type JoinRoomRequest, type SubmitAnswerRequest } from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Room ops
  createRoom(code: string): Promise<Room>;
  getRoomByCode(code: string): Promise<Room | undefined>;
  
  // Player ops
  addPlayer(roomCode: string, name: string): Promise<Player>;
  getPlayers(roomCode: string): Promise<Player[]>;
  
  // Answer ops
  submitAnswer(answer: SubmitAnswerRequest): Promise<Answer>;
  getAnswers(roomCode: string): Promise<Answer[]>;
}

export class DatabaseStorage implements IStorage {
  async createRoom(code: string): Promise<Room> {
    const [room] = await db.insert(rooms).values({ code }).returning();
    return room;
  }

  async getRoomByCode(code: string): Promise<Room | undefined> {
    const [room] = await db.select().from(rooms).where(eq(rooms.code, code));
    return room;
  }

  async addPlayer(roomCode: string, name: string): Promise<Player> {
    const [player] = await db.insert(players).values({ roomCode, name }).returning();
    return player;
  }

  async getPlayers(roomCode: string): Promise<Player[]> {
    return await db.select().from(players).where(eq(players.roomCode, roomCode));
  }

  async submitAnswer(answer: SubmitAnswerRequest): Promise<Answer> {
    const [submitted] = await db.insert(answers).values(answer).returning();
    return submitted;
  }

  async getAnswers(roomCode: string): Promise<Answer[]> {
    return await db.select().from(answers).where(eq(answers.roomCode, roomCode));
  }
}

export const storage = new DatabaseStorage();
