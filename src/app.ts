import express from "express";
import cors from "cors";
import attemptRoutes from "./modules/attempt/attempt.route";
import userRoutes from "./modules/user/user.route";
import lessonsRoutes from "./modules/lessons/lessons.route";
import campaignRoutes from "./modules/campaign/campaign.route";
import ttsRoutes from "./modules/tts/tts.route";

const app = express();

const allowList = (process.env.CORS_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    // Allow server-to-server (no Origin) and allowlist matches.
    if (!origin) return callback(null, true);
    if (allowList.length === 0) return callback(null, true);
    return callback(null, allowList.includes(origin));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
};

app.use(cors(corsOptions));
// Express 5 + path-to-regexp v6 doesn't accept "*" here; use a regex to match all.
app.options(/.*/, cors(corsOptions));
app.use(express.json());

app.use("/api/attempts", attemptRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lessons", lessonsRoutes);
app.use("/api/campaign", campaignRoutes);
app.use("/api/tts", ttsRoutes);

export default app;
