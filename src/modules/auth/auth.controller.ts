import { Request, Response } from "express";
import { createAdminSession, deleteSession, getSession } from "./auth.service";

export async function getAuthSession(req: Request, res: Response) {
  const token = req.cookies?.admin_session as string | undefined;
  const session = getSession(token);

  if (!session) {
    return res.status(200).json({ user: null, tokenExpiresAt: null });
  }

  res.json({ user: session.user, tokenExpiresAt: session.tokenExpiresAt });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body ?? {};

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return res.status(501).json({
      error: { code: "NOT_CONFIGURED", message: "Admin login not configured" },
      requiredEnv: ["ADMIN_EMAIL", "ADMIN_PASSWORD"],
    });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid credentials" } });
  }

  const session = createAdminSession();
  res.cookie("admin_session", session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.json({ ok: true, user: session.user, tokenExpiresAt: session.tokenExpiresAt });
}

export async function logout(req: Request, res: Response) {
  const token = req.cookies?.admin_session as string | undefined;
  deleteSession(token);

  res.clearCookie("admin_session", { path: "/" });
  res.json({ ok: true });
}

