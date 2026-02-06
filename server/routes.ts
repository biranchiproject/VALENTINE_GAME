import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertRoomSchema } from "../shared/schema";
import { isDayUnlocked } from "../shared/valentineConfig";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // POST /api/room/create
  // POST /api/room/create
  app.post("/api/room/create", async (req, res) => {
    try {
      if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ message: "Invalid request body" });
      }

      const { playerName, day, language } = req.body;

      if (!playerName || typeof playerName !== 'string' || !playerName.trim()) {
        return res.status(400).json({ message: "Player name is required" });
      }

      // Day Validation
      const selectedDay = day || "rose_day";
      const selectedLanguage = language || "en";

      if (!isDayUnlocked(selectedDay)) {
        // Allow if it is development or maybe just fail
        // For now, strict fail
        return res.status(403).json({ message: "This day is not yet unlocked! 💖" });
      }

      // Generate 6-digit code
      const roomCode = Math.floor(100000 + Math.random() * 900000).toString();

      try {
        // Create Room
        const room = await storage.createRoom({
          roomCode,
          player1: playerName.trim(),
          status: "waiting",
          day: selectedDay,
          language: selectedLanguage
        });

        console.log(`[CREATE] Room created: ${roomCode} by ${playerName} for ${selectedDay}`);
        res.status(201).json({ roomCode, success: true });
      } catch (storageError) {
        console.error("[CREATE] Storage Error:", storageError);
        res.status(500).json({ message: "Failed to create room in database" });
      }
    } catch (e) {
      console.error("[CREATE] Unexpected Error:", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // POST /api/room/submit
  app.post("/api/room/submit", async (req, res) => {
    try {
      const { roomCode, playerName, day, response } = req.body;
      const room = await storage.getRoomByCode(roomCode);

      if (!room) return res.status(404).json({ message: "Room not found" });

      const gameData = room.gameData as any; // Type assertion

      // Update answers
      if (!gameData.answers) gameData.answers = {};
      gameData.answers[playerName] = response;

      // Update submission status
      if (!gameData.submissionStatus) gameData.submissionStatus = {};
      gameData.submissionStatus[playerName] = true;

      // Check if both players submitted
      const p1 = room.player1;
      const p2 = room.player2;

      console.log(`[SUBMIT] Player: ${playerName}, Room: ${roomCode}`);
      console.log(`[SUBMIT] P1: ${p1}, P2: ${p2}`);
      console.log(`[SUBMIT] Status:`, gameData.submissionStatus);

      if (p1 && p2 && gameData.submissionStatus[p1] && gameData.submissionStatus[p2]) {
        gameData.bothSubmitted = true;
        console.log(`[SUBMIT] BOTH SUBMITTED! Setting flag.`);
      } else {
        console.log(`[SUBMIT] Waiting for other player...`);
      }

      await storage.updateRoom(roomCode, gameData);

      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).send("Server Error");
    }
  });

  // POST /api/room/review
  app.post("/api/room/review", async (req, res) => {
    try {
      const { roomCode, playerName, reviews } = req.body;
      const room = await storage.getRoomByCode(roomCode);

      if (!room) return res.status(404).json({ message: "Room not found" });

      const gameData = room.gameData as any;

      console.log(`[REVIEW] Player: ${playerName}, Room: ${roomCode}`);
      console.log(`[REVIEW] Reviews payload:`, reviews);

      // Update reviews
      if (!gameData.reviews) gameData.reviews = {};
      gameData.reviews[playerName] = reviews;

      // Check if both players reviewed
      const p1 = room.player1;
      const p2 = room.player2;

      console.log(`[REVIEW] Check: P1=${p1}, P2=${p2}`);
      console.log(`[REVIEW] P1 Reviews:`, gameData.reviews[p1] ? "Present" : "Missing");
      console.log(`[REVIEW] P2 Reviews:`, (p2 && gameData.reviews[p2]) ? "Present" : "Missing");

      if (p1 && p2 && gameData.reviews[p1] && gameData.reviews[p2]) {
        gameData.bothReviewed = true;
        console.log(`[REVIEW] BOTH REVIEWED! Setting flag.`);
      } else {
        console.log(`[REVIEW] Waiting for other player...`);
      }

      await storage.updateRoom(roomCode, gameData);

      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).send("Server Error");
    }
  });

  // POST /api/room/join
  app.post("/api/room/join", async (req, res) => {
    try {
      const { roomCode, playerName, day } = req.body;
      const room = await storage.getRoomByCode(roomCode);

      if (!room) return res.status(404).json({ message: "Invalid room code" });

      // Day Validation
      if (day && room.day !== day) {
        return res.status(400).json({
          message: `This room is for ${room.day.replace('_', ' ').toUpperCase()}. You selected ${day.replace('_', ' ').toUpperCase()}.`
        });
      }

      // Check if day is unlocked (Double check, though create should have handled it)
      if (!isDayUnlocked(room.day)) {
        return res.status(403).json({ message: "This day is locked! 💖" });
      }

      if (room.player2 && room.player2 !== playerName) {
        return res.status(409).json({ message: "Room full" });
      }

      // If re-joining or new join
      if (!room.player2) {
        await storage.updateRoom(roomCode, room.gameData, playerName, "ready");
        console.log(`${playerName} joined room ${roomCode}`);
      }

      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).send("Server Error");
    }
  });

  // POST /api/history
  app.post("/api/history", async (req, res) => {
    try {
      const { roomCode, dayId, player1Name, player2Name, finalPercentage } = req.body;

      if (!roomCode || !dayId || !player1Name || !player2Name) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      console.log(`[HISTORY] Saving for Room: ${roomCode}, Day: ${dayId}, Users: ${player1Name} & ${player2Name}`);

      const history = await storage.createGameHistory({
        roomCode,
        dayId,
        player1Name,
        player2Name,
        lovePercentage: finalPercentage || 0
      });

      res.status(201).json({ success: true, history });
    } catch (e) {
      console.error("[HISTORY] Save Error:", e);
      res.status(500).json({ message: "Failed to save history" });
    }
  });

  // GET /api/history/:username
  app.get("/api/history/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const history = await storage.getGameHistory(username);
      res.json(history);
    } catch (e) {
      console.error("[HISTORY] Fetch Error:", e);
      res.status(500).json({ message: "Failed to fetch history" });
    }
  });

  // GET /api/history/check/:username/:dayId
  app.get("/api/history/check/:username/:dayId", async (req, res) => {
    try {
      const { username, dayId } = req.params;
      const played = await storage.hasUserPlayedDay(username, dayId);
      res.json({ played });
    } catch (e) {
      console.error("[HISTORY] Check Error:", e);
      res.status(500).json({ message: "Failed to check history" });
    }
  });

  // POST /api/room/cancel
  app.post("/api/room/cancel", async (req, res) => {
    try {
      const { roomCode, playerName } = req.body;
      const room = await storage.getRoomByCode(roomCode);

      if (!room) return res.status(404).json({ message: "Room not found" });

      if (room.player1 !== playerName && room.player2 !== playerName) {
        return res.status(403).json({ message: "You are not in this room" });
      }

      await storage.updateRoom(roomCode, room.gameData, undefined, "cancelled", playerName);
      console.log(`[CANCEL] Room ${roomCode} cancelled by ${playerName}`);

      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).send("Server Error");
    }
  });

  // GET /api/room/:roomCode
  app.get("/api/room/:roomCode", async (req, res) => {
    try {
      const { roomCode } = req.params;
      const room = await storage.getRoomByCode(roomCode);

      if (!room) return res.status(404).json({ message: "Room not found" });

      res.json({
        player1: room.player1,
        player2: room.player2,
        status: room.status,
        day: room.day,
        language: room.language,
        gameData: room.gameData,
        cancelledBy: (room as any).cancelledBy
      });
    } catch (e) {
      console.error(e);
      res.status(500).send("Server Error");
    }
  });

  return httpServer;
}
