import { Router } from "express";
import { getLessonById, getLessons, getLessonsManifest } from "./lessons.controller";

const router = Router();

router.get("/manifest", getLessonsManifest);
router.get("/", getLessons);
router.get("/:lessonId", getLessonById);

export default router;

