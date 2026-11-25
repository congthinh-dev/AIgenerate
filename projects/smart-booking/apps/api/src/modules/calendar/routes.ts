import { Router } from "express";
import { z } from "zod";
import { db } from "../../db.js";
import { AppError } from "../../lib/errors.js";
import { isoDateSchema, parse } from "../../lib/validation.js";
import { requireAuth } from "../../middleware/auth.js";
export const calendarRouter = Router();
calendarRouter.use(requireAuth);
calendarRouter.get("/", async (req, res) => {
  const query = parse(z.object({ from: isoDateSchema, to: isoDateSchema, resourceId: z.string().optional() }), req.query);
  if (query.from >= query.to) throw new AppError(400, "INVALID_DATE_RANGE", "The end date must be after the start date.");
  if (query.to.getTime() - query.from.getTime() > 35 * 86_400_000) throw new AppError(400, "DATE_RANGE_TOO_LARGE", "Calendar ranges cannot exceed 35 days.");
  const items = await db.booking.findMany({ where: { startAt: { lt: query.to }, endAt: { gt: query.from }, status: { in: ["PENDING", "APPROVED", "COMPLETED"] }, ...(query.resourceId ? { resourceId: query.resourceId } : {}) }, include: { resource: { select: { id: true, name: true, type: true, location: true } } }, orderBy: { startAt: "asc" } });
  res.json({ items: items.map(({ requesterId, purpose, ...item }) => ({ ...item, purpose: requesterId === req.user?.id || req.user?.role === "ADMIN" ? purpose : "Đã đặt" })) });
});
