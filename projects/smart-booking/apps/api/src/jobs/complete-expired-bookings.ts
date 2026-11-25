import { db } from "../db.js";
export async function completeExpiredBookings(): Promise<void> {
  await db.booking.updateMany({ where: { status: "APPROVED", endAt: { lte: new Date() } }, data: { status: "COMPLETED" } });
}
