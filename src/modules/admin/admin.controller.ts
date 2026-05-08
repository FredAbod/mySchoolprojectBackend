import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../user/user.model";
import { Lesson } from "./lesson.model";
import { Reward } from "./reward.model";

function toPublicUser(u: any) {
  return {
    id: String(u._id),
    name: u.name,
    role: u.role ?? "student",
    ageGroup: u.ageGroup,
    createdAt: u.createdAt,
    lastActiveAt: u.lastActiveAt ?? null,
  };
}

export async function getAdminSummary(_req: Request, res: Response) {
  const [usersCount, lessonsCount, rewardsCount, recentUsers, lessons, rewards] = await Promise.all([
    User.countDocuments(),
    Lesson.countDocuments(),
    Reward.countDocuments(),
    User.find().sort({ createdAt: -1 }).limit(10),
    Lesson.find().sort({ updatedAt: -1 }).limit(50).select("id title published difficulty updatedAt"),
    Reward.find().sort({ updatedAt: -1 }).limit(50).select("id title costCoins enabled updatedAt"),
  ]);

  res.json({
    totals: { users: usersCount, lessons: lessonsCount, rewards: rewardsCount },
    recentUsers: recentUsers.map(toPublicUser),
    lessons: lessons.map((l: any) => ({
      id: l.id,
      title: l.title,
      published: l.published,
      difficulty: l.difficulty,
      updatedAt: l.updatedAt,
    })),
    rewards: rewards.map((r: any) => ({
      id: r.id,
      title: r.title,
      costCoins: r.costCoins,
      enabled: r.enabled,
      updatedAt: r.updatedAt,
    })),
  });
}

export async function listAdminUsers(req: Request, res: Response) {
  const q = typeof req.query.q === "string" ? req.query.q : "";
  const role = typeof req.query.role === "string" ? req.query.role : undefined;
  const limit = Math.min(Number(req.query.limit) || 25, 100);
  const cursor = typeof req.query.cursor === "string" ? req.query.cursor : undefined;

  const filter: any = {};
  if (q) filter.name = { $regex: q, $options: "i" };
  if (role) filter.role = role;
  if (cursor && mongoose.isValidObjectId(cursor)) filter._id = { $lt: cursor };

  const items = await User.find(filter).sort({ _id: -1 }).limit(limit + 1);
  const hasMore = items.length > limit;
  const page = hasMore ? items.slice(0, limit) : items;
  const nextCursor = hasMore && page.length > 0 ? String(page[page.length - 1]!._id) : null;

  res.json({ items: page.map(toPublicUser), nextCursor });
}

export async function adminCreateUser(req: Request, res: Response) {
  const { name, role, ageGroup } = req.body ?? {};
  if (!name || !role || !ageGroup) {
    return res.status(400).json({ error: { code: "BAD_REQUEST", message: "Invalid payload" } });
  }

  // avatar is required by the existing schema; use a default placeholder.
  const user = await User.create({ name, role, ageGroup, avatar: "default" });
  res.status(201).json(toPublicUser(user));
}

export async function adminGetUser(req: Request, res: Response) {
  const id = req.params.id as string;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: { code: "BAD_REQUEST", message: "Invalid user id" } });
  }

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: { code: "NOT_FOUND", message: "User not found" } });

  res.json({
    ...toPublicUser(user),
    progress: { xp: 0, level: 1, coins: 0 },
    badges: [],
  });
}

export async function adminPatchUser(req: Request, res: Response) {
  const id = req.params.id as string;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: { code: "BAD_REQUEST", message: "Invalid user id" } });
  }

  const update: any = {};
  for (const k of ["name", "role", "ageGroup", "lastActiveAt"]) {
    if (typeof (req.body ?? {})[k] !== "undefined") update[k] = (req.body ?? {})[k];
  }

  const user = await User.findByIdAndUpdate(id, update, { new: true });
  if (!user) return res.status(404).json({ error: { code: "NOT_FOUND", message: "User not found" } });
  res.json(toPublicUser(user));
}

export async function adminResetProgress(_req: Request, res: Response) {
  // Progress is not implemented server-side yet.
  res.json({ ok: true });
}

export async function listAdminLessons(req: Request, res: Response) {
  const q = typeof req.query.q === "string" ? req.query.q : "";
  const published = typeof req.query.published === "string" ? req.query.published : undefined;
  const limit = Math.min(Number(req.query.limit) || 25, 100);
  const cursor = typeof req.query.cursor === "string" ? req.query.cursor : undefined;

  const filter: any = {};
  if (q) filter.title = { $regex: q, $options: "i" };
  if (published === "true") filter.published = true;
  if (published === "false") filter.published = false;
  if (cursor && mongoose.isValidObjectId(cursor)) filter._id = { $lt: cursor };

  const items = await Lesson.find(filter).sort({ _id: -1 }).limit(limit + 1).select("id title summary published difficulty updatedAt");
  const hasMore = items.length > limit;
  const page = hasMore ? items.slice(0, limit) : items;
  const nextCursor = hasMore && page.length > 0 ? String(page[page.length - 1]!._id) : null;

  res.json({
    items: page.map((l: any) => ({
      id: l.id,
      title: l.title,
      summary: l.summary,
      published: l.published,
      difficulty: l.difficulty,
      updatedAt: l.updatedAt,
    })),
    nextCursor,
  });
}

export async function adminCreateLesson(req: Request, res: Response) {
  const { title, summary } = req.body ?? {};
  if (!title) return res.status(400).json({ error: { code: "BAD_REQUEST", message: "Invalid payload" } });

  const id = `lesson_${new mongoose.Types.ObjectId().toString()}`;
  const lesson = await Lesson.create({
    id,
    title,
    summary: summary ?? "",
    published: false,
    difficulty: "easy",
    ageGroup: "kid",
    challenges: [],
  });

  res.status(201).json({ id: lesson.id });
}

export async function adminGetLesson(req: Request, res: Response) {
  const id = req.params.id as string;
  const lesson = await Lesson.findOne({ id: id as string });
  if (!lesson) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Lesson not found" } });
  res.json(lesson);
}

export async function adminPatchLesson(req: Request, res: Response) {
  const id = req.params.id as string;
  const update = req.body ?? {};
  const lesson = await Lesson.findOneAndUpdate({ id: id as string }, update, { new: true });
  if (!lesson) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Lesson not found" } });
  res.json(lesson);
}

export async function adminPublishLesson(req: Request, res: Response) {
  const id = req.params.id as string;
  const lesson = await Lesson.findOneAndUpdate({ id: id as string }, { published: true }, { new: true });
  if (!lesson) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Lesson not found" } });
  res.json({ ok: true });
}

export async function adminUnpublishLesson(req: Request, res: Response) {
  const id = req.params.id as string;
  const lesson = await Lesson.findOneAndUpdate({ id: id as string }, { published: false }, { new: true });
  if (!lesson) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Lesson not found" } });
  res.json({ ok: true });
}

export async function adminDeleteLesson(req: Request, res: Response) {
  const id = req.params.id as string;
  const r = await Lesson.deleteOne({ id: id as string });
  if (r.deletedCount === 0) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Lesson not found" } });
  res.json({ ok: true });
}

export async function listAdminRewards(req: Request, res: Response) {
  const q = typeof req.query.q === "string" ? req.query.q : "";
  const enabled = typeof req.query.enabled === "string" ? req.query.enabled : undefined;
  const limit = Math.min(Number(req.query.limit) || 25, 100);
  const cursor = typeof req.query.cursor === "string" ? req.query.cursor : undefined;

  const filter: any = {};
  if (q) filter.title = { $regex: q, $options: "i" };
  if (enabled === "true") filter.enabled = true;
  if (enabled === "false") filter.enabled = false;
  if (cursor && mongoose.isValidObjectId(cursor)) filter._id = { $lt: cursor };

  const items = await Reward.find(filter).sort({ _id: -1 }).limit(limit + 1);
  const hasMore = items.length > limit;
  const page = hasMore ? items.slice(0, limit) : items;
  const nextCursor = hasMore && page.length > 0 ? String(page[page.length - 1]!._id) : null;

  res.json({
    items: page.map((r: any) => ({
      id: r.id,
      title: r.title,
      costCoins: r.costCoins,
      enabled: r.enabled,
      updatedAt: r.updatedAt,
    })),
    nextCursor,
  });
}

export async function adminCreateReward(req: Request, res: Response) {
  const { title, costCoins, enabled } = req.body ?? {};
  if (!title || typeof costCoins !== "number") {
    return res.status(400).json({ error: { code: "BAD_REQUEST", message: "Invalid payload" } });
  }

  const id = `reward_${new mongoose.Types.ObjectId().toString()}`;
  const reward = await Reward.create({ id, title, costCoins, enabled: enabled ?? true });
  res.status(201).json({ id: reward.id });
}

export async function adminGetReward(req: Request, res: Response) {
  const id = req.params.id as string;
  const reward = await Reward.findOne({ id: id as string });
  if (!reward) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Reward not found" } });
  res.json(reward);
}

export async function adminPatchReward(req: Request, res: Response) {
  const id = req.params.id as string;
  const reward = await Reward.findOneAndUpdate({ id: id as string }, req.body ?? {}, { new: true });
  if (!reward) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Reward not found" } });
  res.json(reward);
}

export async function adminDeleteReward(req: Request, res: Response) {
  const id = req.params.id as string;
  const r = await Reward.deleteOne({ id: id as string });
  if (r.deletedCount === 0) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Reward not found" } });
  res.json({ ok: true });
}

export async function adminAnalyticsOverview(_req: Request, res: Response) {
  res.json({ ok: true, kpis: [], trends: [] });
}

export async function adminAnalyticsLesson(_req: Request, res: Response) {
  res.json({ ok: true });
}

export async function adminAnalyticsUser(_req: Request, res: Response) {
  res.json({ ok: true });
}

