import { Router } from "express";
import { speak } from "./tts.controller";

const router = Router();

router.post("/speak", speak);

export default router;

