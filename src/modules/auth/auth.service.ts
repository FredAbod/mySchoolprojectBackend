import crypto from "crypto";

type Session = {
  token: string;
  user: { id: string; name: string; role: "admin" };
  tokenExpiresAt: string;
};

const sessions = new Map<string, Session>();

export function createAdminSession() {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session: Session = {
    token,
    user: { id: "admin", name: "Admin", role: "admin" },
    tokenExpiresAt: expires.toISOString(),
  };

  sessions.set(token, session);
  return session;
}

export function getSession(token: string | undefined) {
  if (!token) return null;
  const s = sessions.get(token);
  if (!s) return null;
  if (Date.parse(s.tokenExpiresAt) < Date.now()) {
    sessions.delete(token);
    return null;
  }
  return s;
}

export function deleteSession(token: string | undefined) {
  if (!token) return;
  sessions.delete(token);
}

