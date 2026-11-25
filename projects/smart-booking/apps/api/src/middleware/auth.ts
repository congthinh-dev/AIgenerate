import { createHash, randomBytes } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { db } from "../db.js";
import { AppError } from "../lib/errors.js";
export type Role = "USER" | "ADMIN";
export interface AuthUser { id: string; email: string; name: string; role: Role }
declare global { namespace Express { interface Request { user?: AuthUser } } }
const COOKIE = "sb_session";
const secure = process.env.SESSION_COOKIE_SECURE === "true";
export const sessionCookie = (token: string, maxAge: number) => `${COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure ? "; Secure" : ""}`;
export const clearSessionCookie = () => `${COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure ? "; Secure" : ""}`;
export async function createSession(userId: string): Promise<{ token: string; maxAge: number }> {
  const token = randomBytes(32).toString("base64url");
  const maxAge = Math.max(1, Number(process.env.SESSION_TTL_HOURS ?? 168)) * 3600;
  await db.session.create({ data: { userId, tokenHash: createHash("sha256").update(token).digest("hex"), expiresAt: new Date(Date.now() + maxAge * 1000) } });
  return { token, maxAge };
}
export function requireAuth(request: Request, _response: Response, next: NextFunction): void {
  void (async () => {
    const token = request.headers.cookie?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
    if (!token) throw new AppError(401, "UNAUTHENTICATED", "Sign in to continue.");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const session = await db.session.findUnique({ where: { tokenHash }, include: { user: true } });
    if (!session || session.expiresAt <= new Date() || !session.user.isActive) throw new AppError(401, "UNAUTHENTICATED", "Sign in to continue.");
    request.user = { id: session.user.id, email: session.user.email, name: session.user.name, role: session.user.role as Role };
  })().then(() => next(), next);
}
export function requireRole(role: Role) {
  return (request: Request, _response: Response, next: NextFunction): void => {
    if (!request.user) return next(new AppError(401, "UNAUTHENTICATED", "Sign in to continue."));
    if (request.user.role !== role) return next(new AppError(403, "FORBIDDEN", "You do not have permission for this action."));
    next();
  };
}
