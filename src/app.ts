import express from "express";
import cors from "cors";
import attemptRoutes from "./modules/attempt/attempt.route";
import userRoutes from "./modules/user/user.route";
import lessonsRoutes from "./modules/lessons/lessons.route";
import campaignRoutes from "./modules/campaign/campaign.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/attempts", attemptRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lessons", lessonsRoutes);
app.use("/api/campaign", campaignRoutes);

export default app;
