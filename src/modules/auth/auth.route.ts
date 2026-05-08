import { Router } from "express";
import { getAuthSession, login, logout } from "./auth.controller";

const router = Router();

router.get("/session", getAuthSession);
router.post("/login", login);
router.post("/logout", logout);

export default router;

