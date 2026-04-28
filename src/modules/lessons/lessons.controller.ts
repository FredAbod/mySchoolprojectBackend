import { Request, Response } from "express";
import { LESSONS_VERSION, SEEDED_LESSONS } from "./lessons.seed";

export function getLessonsManifest(_req: Request, res: Response) {
  res.json({ version: LESSONS_VERSION });
}

export function getLessons(_req: Request, res: Response) {
  res.json(SEEDED_LESSONS);
}

export function getLessonById(req: Request, res: Response) {
  const { lessonId } = req.params;
  const lesson = SEEDED_LESSONS.find((l) => l.id === lessonId);

  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found" });
  }

  res.json(lesson);
}

