import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "./user.model";

export async function createUser(req: Request, res: Response) {
  try {
    const { name, avatar, ageGroup } = req.body;

    if (!name || !avatar || !ageGroup) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const user = await User.create({ name, avatar, ageGroup });

    res.status(201).json({ userId: user._id });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await User.findById(userId).select("name avatar ageGroup createdAt updatedAt");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}
