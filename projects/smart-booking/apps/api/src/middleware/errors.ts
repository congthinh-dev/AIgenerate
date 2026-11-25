import type { ErrorRequestHandler } from "express";
import { AppError } from "../lib/errors.js";
export const errorHandler: ErrorRequestHandler = (error: unknown, req, res, _next) => {
  if (error instanceof AppError) { res.status(error.status).json({ error: { code: error.code, message: error.message } }); return; }
  const message = error instanceof Error ? error.message : "";
  const prismaCode = typeof error === "object" && error !== null && "code" in error ? error.code : undefined;
  if (message.includes("RESOURCE_TIME_CONFLICT") || (req.originalUrl.startsWith("/api/v1/bookings") && prismaCode === "P2003")) {
    res.status(409).json({ error: { code: "RESOURCE_TIME_CONFLICT", message: "This resource is already booked for part of that time." } }); return;
  }
  if (message.includes("SQLITE_BUSY") || message.includes("database is locked")) { res.status(503).json({ error: { code: "DATABASE_BUSY", message: "The booking service is busy. Please retry shortly." } }); return; }
  console.error("Unhandled request error", { name: error instanceof Error ? error.name : "UnknownError", code: prismaCode ?? "UNCLASSIFIED" });
  res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred." } });
};
