import { Request, Response } from "express";
import { SEEDED_LESSONS } from "../lessons/lessons.seed";
import { Lesson } from "./lesson.model";

export async function seedLessons(_req: Request, res: Response) {
  for (const l of SEEDED_LESSONS) {
    await Lesson.updateOne(
      { id: l.id },
      {
        $set: {
          id: l.id,
          title: l.title,
          summary: l.summary,
          ageGroup: l.ageGroup,
          published: true,
          challenges: l.challenges,
        },
        $setOnInsert: { difficulty: "easy" },
      },
      { upsert: true }
    );
  }

  res.json({ ok: true, seededLessons: SEEDED_LESSONS.length });
}

