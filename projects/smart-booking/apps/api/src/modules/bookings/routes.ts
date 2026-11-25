import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { db } from "../../db.js";
import { AppError } from "../../lib/errors.js";
import { idSchema, isoDateSchema, parse } from "../../lib/validation.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";
export const bookingRouter = Router();
const withResource = { resource: { select: { id: true, name: true, type: true, location: true } } } as const;
bookingRouter.use(requireAuth);
bookingRouter.post("/", async (req, res) => {
  const input = parse(z.object({ resourceId: idSchema, startAt: isoDateSchema, endAt: isoDateSchema, purpose: z.string().trim().min(1).max(300) }), req.body);
  if (input.startAt >= input.endAt) throw new AppError(400, "INVALID_TIME_RANGE", "The end time must be after the start time.");
  if (input.startAt < new Date(Date.now() - 60_000)) throw new AppError(400, "BOOKING_IN_PAST", "Bookings must start in the future.");
  const resource = await db.resource.findUnique({ where: { id: input.resourceId } });
  if (!resource || !resource.isActive) throw new AppError(404, "RESOURCE_NOT_FOUND", "Resource was not found or is inactive.");
  const status = resource.type === "ROOM" || !resource.requiresApproval ? "APPROVED" : "PENDING";
  const item = await db.booking.create({ data: { ...input, requesterId: req.user!.id, status }, include: withResource });
  res.status(201).json({ item });
});
bookingRouter.get("/me", async (req, res) => {
  const items = await db.booking.findMany({ where: { requesterId: req.user!.id }, include: withResource, orderBy: { startAt: "desc" }, take: 200 }); res.json({ items });
});
bookingRouter.get("/pending", requireRole("ADMIN"), async (_req, res) => {
  const items = await db.booking.findMany({ where: { status: "PENDING" }, include: { ...withResource, requester: { select: { id: true, name: true, email: true } } }, orderBy: { createdAt: "asc" }, take: 200 }); res.json({ items });
});
async function decide(req: Request, res: Response, status: "APPROVED" | "REJECTED"): Promise<void> {
  const id = parse(idSchema, req.params.id);
  const { note } = parse(z.object({ note: z.string().trim().max(500).optional() }).default({}), req.body);
  const result = await db.booking.updateMany({ where: { id, status: "PENDING" }, data: { status, reviewedById: req.user!.id, reviewedAt: new Date(), reviewNote: note ?? null } });
  if (!result.count) {
    const exists = await db.booking.findUnique({ where: { id }, select: { id: true } });
    throw new AppError(exists ? 409 : 404, exists ? "INVALID_STATE_TRANSITION" : "NOT_FOUND", exists ? "This booking is no longer pending." : "Booking was not found.");
  }
  res.json({ item: await db.booking.findUnique({ where: { id }, include: withResource }) });
}
bookingRouter.post("/:id/approve", requireRole("ADMIN"), async (req, res) => decide(req, res, "APPROVED"));
bookingRouter.post("/:id/reject", requireRole("ADMIN"), async (req, res) => decide(req, res, "REJECTED"));
bookingRouter.post("/:id/cancel", async (req, res) => {
  const id = parse(idSchema, req.params.id);
  const result = await db.booking.updateMany({ where: { id, requesterId: req.user!.id, status: { in: ["PENDING", "APPROVED"] } }, data: { status: "CANCELLED" } });
  if (!result.count) {
    const item = await db.booking.findUnique({ where: { id }, select: { requesterId: true } });
    if (!item) throw new AppError(404, "NOT_FOUND", "Booking was not found.");
    if (item.requesterId !== req.user!.id) throw new AppError(403, "FORBIDDEN", "You can only cancel your own bookings.");
    throw new AppError(409, "INVALID_STATE_TRANSITION", "This booking can no longer be cancelled.");
  }
  res.json({ item: await db.booking.findUnique({ where: { id }, include: withResource }) });
});
