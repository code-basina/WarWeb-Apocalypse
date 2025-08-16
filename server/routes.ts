import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameProgressSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get game progress for user
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const progress = await storage.getGameProgress(userId);
      
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      
      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create or update game progress
  app.post("/api/progress", async (req, res) => {
    try {
      const progressData = insertGameProgressSchema.parse(req.body);
      
      // Check if progress already exists
      const existing = await storage.getGameProgress(progressData.userId || "anonymous");
      
      if (existing) {
        const updated = await storage.updateGameProgress(
          progressData.userId || "anonymous", 
          progressData
        );
        res.json(updated);
      } else {
        const created = await storage.createGameProgress(progressData);
        res.json(created);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
