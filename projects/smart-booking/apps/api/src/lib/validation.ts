import { z } from "zod";
import { AppError } from "./errors.js";
export const idSchema = z.string().min(1).max(100);
export const isoDateSchema = z.iso.datetime({ offset: true }).transform((value) => new Date(value));
export function parse<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw new AppError(400, "VALIDATION_ERROR", "Request contains invalid fields.");
  return result.data;
}
