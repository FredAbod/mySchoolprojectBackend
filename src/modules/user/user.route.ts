import { Router } from "express";
import { createUser, getUser } from "./user.controller";

const router = Router();

router.post("/", createUser);
router.get("/:userId", getUser);

export default router;
