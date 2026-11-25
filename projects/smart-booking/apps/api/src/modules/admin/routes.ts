import { Router } from "express";
import { z } from "zod";
import { db } from "../../db.js";
import { AppError } from "../../lib/errors.js";
import { hashPassword } from "../../lib/password.js";
import { isoDateSchema, parse } from "../../lib/validation.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";
export const adminRouter = Router();
adminRouter.use(requireAuth, requireRole("ADMIN"));
adminRouter.post("/users", async (req, res) => {
  const input = parse(z.object({ name: z.string().trim().min(1).max(100), email: z.email().transform((value) => value.toLowerCase()), password: z.string().min(12).max(200) }), req.body);
  const existing = await db.user.findUnique({ where: { email: input.email }, select: { id: true } });
  if (existing) throw new AppError(409, "EMAIL_ALREADY_EXISTS", "An account with this email already exists.");
  const user = await db.user.create({ data: { name: input.name, email: input.email, passwordHash: await hashPassword(input.password), role: "USER" }, select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true } });
  res.status(201).json({ user });
});
adminRouter.get("/usage", async (req, res) => {
  const query = parse(z.object({ from: isoDateSchema, to: isoDateSchema }), req.query);
  if (query.from >= query.to || query.to.getTime() - query.from.getTime() > 366 * 86_400_000) throw new AppError(400, "INVALID_DATE_RANGE", "Choose a valid range up to one year.");
  const bookings = await db.booking.findMany({ where: { startAt: { lt: query.to }, endAt: { gt: query.from }, status: { in: ["APPROVED", "COMPLETED"] } }, include: { resource: { select: { id: true, name: true, type: true } } } });
  const usage = new Map<string, { resource: { id: string; name: string; type: string }; bookings: number; bookedMinutes: number }>();
  for (const booking of bookings) {
    const item = usage.get(booking.resourceId) ?? { resource: booking.resource, bookings: 0, bookedMinutes: 0 };
    item.bookings += 1;
    item.bookedMinutes += Math.max(0, Math.min(booking.endAt.getTime(), query.to.getTime()) - Math.max(booking.startAt.getTime(), query.from.getTime())) / 60_000;
    usage.set(booking.resourceId, item);
  }
  res.json({ summary: { totalBookings: bookings.length, resourcesUsed: usage.size }, items: [...usage.values()] });
});
