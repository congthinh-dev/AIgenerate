import { Router } from "express";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { db } from "../../db.js";
import { AppError } from "../../lib/errors.js";
import { idSchema, parse } from "../../lib/validation.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";
export const resourceRouter = Router();
const resourceInput = z.object({ name: z.string().trim().min(1).max(100), type: z.enum(["ROOM", "EQUIPMENT"]), description: z.string().max(500).default(""), location: z.string().max(160).nullable().optional(), capacity: z.number().int().positive().nullable().optional(), requiresApproval: z.boolean().default(false), isActive: z.boolean().optional() }).refine((v) => v.type !== "ROOM" || !v.requiresApproval);
resourceRouter.use(requireAuth);
resourceRouter.get("/", async (req, res) => {
  const type = req.query.type;
  if (type !== undefined && type !== "ROOM" && type !== "EQUIPMENT") throw new AppError(400, "VALIDATION_ERROR", "Invalid resource type.");
  const includeInactive = req.query.includeInactive === "true" && req.user?.role === "ADMIN";
  const items = await db.resource.findMany({ where: { ...(includeInactive ? {} : { isActive: true }), ...(type ? { type } : {}) }, orderBy: [{ type: "asc" }, { name: "asc" }] });
  res.json({ items });
});
resourceRouter.post("/", requireRole("ADMIN"), async (req, res) => {
  const input = parse(resourceInput, req.body);
  const item = await db.resource.create({ data: { ...input, location: input.location ?? null, capacity: input.capacity ?? null, isActive: input.isActive ?? true } }); res.status(201).json({ item });
});
resourceRouter.patch("/:id", requireRole("ADMIN"), async (req, res) => {
  const id = parse(idSchema, req.params.id);
  const input = parse(resourceInput.partial().refine((v) => Object.keys(v).length > 0), req.body);
  const old = await db.resource.findUnique({ where: { id } });
  if (!old) throw new AppError(404, "NOT_FOUND", "Resource was not found.");
  if ((input.type ?? old.type) === "ROOM" && (input.requiresApproval ?? old.requiresApproval)) throw new AppError(400, "VALIDATION_ERROR", "Meeting rooms are automatically approved.");
  const data: Prisma.ResourceUpdateInput = {};
  if (input.name !== undefined) data.name = input.name;
  if (input.type !== undefined) data.type = input.type;
  if (input.description !== undefined) data.description = input.description;
  if (input.location !== undefined) data.location = input.location;
  if (input.capacity !== undefined) data.capacity = input.capacity;
  if (input.requiresApproval !== undefined) data.requiresApproval = input.requiresApproval;
  if (input.isActive !== undefined) data.isActive = input.isActive;
  const item = await db.resource.update({ where: { id }, data }); res.json({ item });
});
