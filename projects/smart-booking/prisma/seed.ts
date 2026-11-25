import "dotenv/config";
import { db } from "../apps/api/src/db.js";
import { hashPassword } from "../apps/api/src/lib/password.js";
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
async function main(): Promise<void> {
  try {
    if (!email || !password || password.length < 12 || password === "change-this-local-password") {
      throw new Error("Set ADMIN_EMAIL and a private ADMIN_PASSWORD of at least 12 characters before seeding.");
    }

    const passwordHash = await hashPassword(password);
    await db.user.upsert({
      where: { email },
      update: { name: "Administrator", passwordHash, role: "ADMIN", isActive: true },
      create: { email, name: "Administrator", passwordHash, role: "ADMIN" },
    });

    for (const resource of [
      { name: "Meeting Room A", type: "ROOM", description: "Small meeting room", location: "Floor 1", capacity: 6 },
      { name: "Meeting Room B", type: "ROOM", description: "Large meeting room", location: "Floor 2", capacity: 12 },
      { name: "4K Projector", type: "EQUIPMENT", description: "Shared presentation projector", location: "IT desk", requiresApproval: true },
      { name: "Conference Camera", type: "EQUIPMENT", description: "USB conference camera", location: "IT desk" },
    ]) {
      const exists = await db.resource.findFirst({ where: { name: resource.name } });
      if (!exists) await db.resource.create({ data: resource });
    }
    console.log(`Admin account ensured for ${email}; sample resources inserted if missing.`);
  } finally {
    await db.$disconnect();
  }
}

void main().catch((error: unknown) => {
  console.error("Database seed failed:", error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
});
