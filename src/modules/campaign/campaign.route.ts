import { Router } from "express";
import { getCampaign } from "./campaign.controller";

const router = Router();

router.get("/", getCampaign);

export default router;

