import { Request, Response } from "express";
import { LESSONS_VERSION, SEEDED_LESSONS } from "./lessons.seed";
import { Lesson } from "../admin/lesson.model";

export function getLessonsManifest(_req: Request, res: Response) {
  res.json({ version: LESSONS_VERSION });
}

export async function getLessons(_req: Request, res: Response) {
  const lessons = await Lesson.find({ published: true }).select("-_id id title summary ageGroup challenges difficulty published updatedAt");
  if (lessons.length > 0) return res.json(lessons);
  res.json(SEEDED_LESSONS);
}

export function getLessonById(req: Request, res: Response) {
  const lessonId = req.params.lessonId as string;
  const seeded = SEEDED_LESSONS.find((l) => l.id === lessonId);

  Lesson.findOne({ id: lessonId, published: true })
    .select("-_id id title summary ageGroup challenges difficulty published updatedAt")
    .then((dbLesson) => {
      if (dbLesson) return res.json(dbLesson);
      if (!seeded) return res.status(404).json({ message: "Lesson not found" });
      return res.json(seeded);
    })
    .catch(() => res.status(500).json({ message: "Server error" }));
}

