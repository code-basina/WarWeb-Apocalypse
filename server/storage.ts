import { type User, type InsertUser, type GameProgress, type InsertGameProgress } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getGameProgress(userId: string): Promise<GameProgress | undefined>;
  createGameProgress(progress: InsertGameProgress): Promise<GameProgress>;
  updateGameProgress(userId: string, progress: Partial<GameProgress>): Promise<GameProgress>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private gameProgress: Map<string, GameProgress>;

  constructor() {
    this.users = new Map();
    this.gameProgress = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getGameProgress(userId: string): Promise<GameProgress | undefined> {
    return Array.from(this.gameProgress.values()).find(
      (progress) => progress.userId === userId,
    );
  }

  async createGameProgress(insertProgress: InsertGameProgress): Promise<GameProgress> {
    const id = randomUUID();
    const progress: GameProgress = {
      ...insertProgress,
      id,
      lastPlayed: new Date(),
    };
    this.gameProgress.set(id, progress);
    return progress;
  }

  async updateGameProgress(userId: string, updates: Partial<GameProgress>): Promise<GameProgress> {
    const existing = await this.getGameProgress(userId);
    if (!existing) {
      throw new Error("Game progress not found");
    }
    
    const updated: GameProgress = {
      ...existing,
      ...updates,
      lastPlayed: new Date(),
    };
    
    this.gameProgress.set(existing.id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
