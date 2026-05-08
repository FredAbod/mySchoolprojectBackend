import { NextFunction, Request, Response } from "express";
import { getSession } from "./auth.service";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.admin_session as string | undefined;
  const session = getSession(token);

  if (!session) {
    return res.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Not authenticated" } });
  }

  if (session.user.role !== "admin") {
    return res.status(403).json({ error: { code: "FORBIDDEN", message: "Admin access required" } });
  }

  (req as any).session = session;
  next();
}

