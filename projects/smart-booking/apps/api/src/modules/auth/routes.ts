import { createHash } from "node:crypto";
import { Router } from "express";
import { z } from "zod";
import { db } from "../../db.js";
import { AppError } from "../../lib/errors.js";
import { parse } from "../../lib/validation.js";
import { verifyPassword } from "../../lib/password.js";
import { clearSessionCookie, createSession, requireAuth, sessionCookie } from "../../middleware/auth.js";
export const authRouter = Router();
authRouter.post("/login", async (req, res) => {
  const input = parse(z.object({ email: z.email().transform((value) => value.toLowerCase()), password: z.string().min(1).max(200) }), req.body);
  const user = await db.user.findUnique({ where: { email: input.email } });
  if (!user || !user.isActive || !(await verifyPassword(input.password, user.passwordHash))) throw new AppError(401, "INVALID_CREDENTIALS", "Email or password is incorrect.");
  const session = await createSession(user.id);
  res.setHeader("Set-Cookie", sessionCookie(session.token, session.maxAge));
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});
authRouter.post("/logout", requireAuth, async (req, res) => {
  const token = req.headers.cookie?.split(";").map((part) => part.trim()).find((part) => part.startsWith("sb_session="))?.slice("sb_session=".length);
  if (token) await db.session.deleteMany({ where: { tokenHash: createHash("sha256").update(token).digest("hex") } });
  res.setHeader("Set-Cookie", clearSessionCookie()); res.status(204).end();
});
authRouter.get("/me", requireAuth, (req, res) => res.json({ user: req.user }));
