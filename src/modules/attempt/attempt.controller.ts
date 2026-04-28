import { Request, Response } from "express";
import mongoose from "mongoose";
import { Attempt } from "./attempt.model";

// Bulk insert attempts
export async function createAttempts(req: Request, res: Response) {
  try {
    const { userId, attempts } = req.body;

    if (!userId || !Array.isArray(attempts) || typeof userId !== "string") {
      return res.status(400).json({ message: "Invalid payload" });
    }

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    if (attempts.length > 500) {
      return res.status(400).json({ message: "Too many attempts" });
    }

    for (const a of attempts) {
      const attemptType = a?.type ?? "grid";
      const validType = attemptType === "grid" || attemptType === "quiz";

      if (!a?.id || !a?.challengeId || typeof a?.success !== "boolean" || !validType) {
        return res.status(400).json({ message: "Invalid attempt data" });
      }

      if (attemptType === "quiz" && typeof a?.answer === "undefined") {
        return res.status(400).json({ message: "Invalid attempt data" });
      }
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const docs = attempts.map((a: any) => ({
      ...a,
      userId: userObjectId,
      type: a?.type ?? "grid",
      movesUsed: typeof a?.movesUsed === "number" ? a.movesUsed : 0,
      createdAt:
        typeof a?.createdAt === "number"
          ? new Date(a.createdAt)
          : a?.createdAt instanceof Date
            ? a.createdAt
            : undefined,
    }));

    let stored = 0;
    let ignored = 0;

    try {
      const result = await Attempt.insertMany(docs, { ordered: false });
      stored = result.length;
    } catch (err: any) {
      if (err?.writeErrors) {
        const dupCount = err.writeErrors.filter((e: any) => e?.code === 11000).length;
        const otherErrors = err.writeErrors.length - dupCount;
        if (otherErrors > 0) {
          throw err;
        }

        ignored = dupCount;
        stored = docs.length - ignored;
      } else {
        throw err;
      }
    }

    res.status(201).json({
      ok: true,
      stored,
      ignored,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// Get attempts by user
export async function getAttempts(req: Request, res: Response) {
  try {
    const userId = typeof req.query.userId === "string" ? req.query.userId : undefined;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const attempts = await Attempt.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({
      createdAt: 1,
    });

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
