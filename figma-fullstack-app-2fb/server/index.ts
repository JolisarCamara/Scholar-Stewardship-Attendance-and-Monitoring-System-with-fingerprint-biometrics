import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleLogin, handleRegister, handleGetMe } from "./routes/auth";
import { handleGetScholars, handleGetScholarStats, handleDeleteScholar } from "./routes/scholars";
import { handleGetAdmins, handleGetSuperAdmins, handleDeleteAdmin } from "./routes/admins";
import { handleGetActivityLogs, handleCreateActivityLog, handleUpdateActivityLogStatus } from "./routes/activityLogs";
import { authenticateToken, authorizeRoles } from "./middleware/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Public routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth routes
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/register", handleRegister);
  app.get("/api/auth/me", authenticateToken, handleGetMe);

  // Scholar routes (protected)
  app.get("/api/scholars", authenticateToken, handleGetScholars);
  app.get("/api/scholars/stats", authenticateToken, handleGetScholarStats);
  app.delete("/api/scholars/:id", authenticateToken, authorizeRoles('super_admin', 'admin'), handleDeleteScholar);

  // Admin routes (protected)
  app.get("/api/admins", authenticateToken, authorizeRoles('super_admin'), handleGetAdmins);
  app.get("/api/super-admins", authenticateToken, authorizeRoles('super_admin'), handleGetSuperAdmins);
  app.delete("/api/admins/:id", authenticateToken, authorizeRoles('super_admin'), handleDeleteAdmin);

  // Activity logs routes (protected)
  app.get("/api/activity-logs", authenticateToken, handleGetActivityLogs);
  app.post("/api/activity-logs", authenticateToken, handleCreateActivityLog);
  app.patch("/api/activity-logs/:id/status", authenticateToken, handleUpdateActivityLogStatus);

  return app;
}
