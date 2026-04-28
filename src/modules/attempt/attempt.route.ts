import { Router } from "express";
import { createAttempts, getAttempts } from "./attempt.controller";

const router = Router();

router.post("/bulk", createAttempts);
router.get("/", getAttempts);

export default router;
