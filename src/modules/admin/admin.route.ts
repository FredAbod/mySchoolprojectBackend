import { Router } from "express";
import { requireAdmin } from "../auth/auth.middleware";
import {
  adminAnalyticsLesson,
  adminAnalyticsOverview,
  adminAnalyticsUser,
  adminCreateLesson,
  adminCreateReward,
  adminCreateUser,
  adminDeleteLesson,
  adminDeleteReward,
  adminGetLesson,
  adminGetReward,
  adminGetUser,
  adminPatchLesson,
  adminPatchReward,
  adminPatchUser,
  adminPublishLesson,
  adminResetProgress,
  adminUnpublishLesson,
  getAdminSummary,
  listAdminLessons,
  listAdminRewards,
  listAdminUsers,
} from "./admin.controller";
import { seedLessons } from "./seed.controller";

const router = Router();

router.use(requireAdmin);

router.get("/summary", getAdminSummary);

router.get("/users", listAdminUsers);
router.post("/users", adminCreateUser);
router.get("/users/:id", adminGetUser);
router.patch("/users/:id", adminPatchUser);
router.post("/users/:id/reset-progress", adminResetProgress);

router.get("/lessons", listAdminLessons);
router.post("/lessons", adminCreateLesson);
router.get("/lessons/:id", adminGetLesson);
router.patch("/lessons/:id", adminPatchLesson);
router.post("/lessons/:id/publish", adminPublishLesson);
router.post("/lessons/:id/unpublish", adminUnpublishLesson);
router.delete("/lessons/:id", adminDeleteLesson);

router.get("/rewards", listAdminRewards);
router.post("/rewards", adminCreateReward);
router.get("/rewards/:id", adminGetReward);
router.patch("/rewards/:id", adminPatchReward);
router.delete("/rewards/:id", adminDeleteReward);

router.get("/analytics/overview", adminAnalyticsOverview);
router.get("/analytics/lesson/:lessonId", adminAnalyticsLesson);
router.get("/analytics/user/:userId", adminAnalyticsUser);

router.post("/seed/lessons", seedLessons);

export default router;

