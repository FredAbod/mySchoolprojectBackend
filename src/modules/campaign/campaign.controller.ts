import { Request, Response } from "express";
import { SEEDED_CAMPAIGN } from "./campaign.seed";

export function getCampaign(_req: Request, res: Response) {
  res.json(SEEDED_CAMPAIGN);
}

