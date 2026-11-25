import "dotenv/config";
import { app } from "./app.js";
import { db } from "./db.js";
import { completeExpiredBookings } from "./jobs/complete-expired-bookings.js";
const port = Number(process.env.PORT ?? 3001);
await completeExpiredBookings();
const timer = setInterval(() => void completeExpiredBookings().catch((error: unknown) => console.error("Completion task failed", error instanceof Error ? error.message : "Unknown error")), 60_000);
timer.unref();
const server = app.listen(port, "127.0.0.1", () => console.log(`Smart Booking API listening on http://127.0.0.1:${port}`));
async function shutdown() { clearInterval(timer); server.close(() => void db.$disconnect().then(() => process.exit(0))); }
process.on("SIGINT", () => void shutdown()); process.on("SIGTERM", () => void shutdown());
